## Context

The GitHub Activity widget currently shows 1 commit from the 3 most recently-pushed repositories, rendered as large stacked cards. This design:
- Caused the widget to grow vertically, breaking bento grid harmony
- Forced the Tools widget to upsize, leaving blank space
- Limited activity visibility (only 3 commits across all repositories)

The redesign addresses this by creating a **repository carousel** that:
- Shows **all public repos** in a horizontal scrollable carousel
- Displays **3 commits per repository** within compact cards
- Maintains the **original widget footprint** to restore page balance

## Goals / Non-Goals

**Goals:**
- Increase commit visibility (3 commits × N repos vs 3 total commits)
- Restore widget to original vertical footprint
- Implement carousel UX matching the Writing widget pattern
- Maintain design system compliance (glass materials, shadows, motion)

**Non-Goals:**
- Real-time commit streaming (5-minute refresh interval is sufficient)
- Branch-specific filtering (main branch commits only)
- Contribution graph or calendar view (out of scope)

## Decisions

### 1. Repository Carousel Pattern

**Decision:** Use horizontal scroll carousel with snap points (1 repo visible at a time)

**Rationale:**
- Matches existing Writing widget carousel UX (consistency)
- Allows browsing all repos without vertical expansion
- Familiar swipe interaction on mobile

**Alternatives considered:**
- Grid layout (2×2 repos): Still increases widget height, doesn't solve the problem
- Tabbed interface: More clicks required, less discoverable
- Dropdown selector: Hides repository names, poor UX

### 2. Data Fetching Strategy

**Decision:** Fetch all public repositories, then fetch 3 commits per repo (with 12-repo pagination limit initially)

**API Calls:**
```typescript
// Step 1: Fetch all public repos (sorted by pushed_at)
GET /users/{username}/repos?sort=pushed&per_page=12

// Step 2: For each repo, fetch 3 commits
GET /repos/{owner}/{repo}/commits?per_page=3
```

**Rationale:**
- GitHub API allows 60 requests/hour (unauthenticated) or 5000/hour (authenticated with token)
- 12 repos × 1 commit call + 1 repo call = 13 API calls per load
- With 5-minute refresh interval: ~156 calls/hour (well under authenticated limit)
- Token is already configured via `PUBLIC_GITHUB_TOKEN`

**Alternatives considered:**
- Use Events API (`/users/{username}/events`): Doesn't guarantee commits, includes other events
- Fetch only top 5 repos: Still limits visibility, doesn't solve the core issue
- Server-side caching (SSR): Adds complexity, not needed with current rate limits

**Migration:** Add client-side LRU cache to reduce re-fetching on component remount.

### 3. Compact Layout Design

**Decision:** Repository card structure:

```
┌──────────────────────────────────────┐
│ [Repo Icon] RepoName          [⭐ 42]│  ← Header
├──────────────────────────────────────┤
│ • Commit message (truncated)   [2h] │  ← Commit 1
│ • Commit message (truncated)   [5h] │  ← Commit 2  
│ • Commit message (truncated)  [12h] │  ← Commit 3
└──────────────────────────────────────┘
     [• • •]  ← Carousel indicators
```

**Sizing:**
- Card width: Fill widget interior (match carousel item width)
- Card height: `clamp(180px, 16vw, 220px)` (compact, avoids vertical growth)
- Commit entries: List items with minimal padding (8px vertical)

**Rationale:**
- Vertical commit list within card is more scannable than horizontal
- Repository context (name, stars) stays visible while browsing commits
- Maintains glass card treatment while reducing footprint

**Alternatives considered:**
- Horizontal commit carousel within repo card: Too nested, confusing UX
- Accordion-style (click to expand commits): Requires extra interaction, hides data
- Timeline view: Requires more vertical space

### 4. Carousel Navigation

**Decision:** Implement scroll snap + optional arrow buttons + dot indicators

**Implementation:**
```css
.github-repo-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: var(--space-3);
  padding: 0 var(--space-2);
}

.github-repo-card {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
```

**Interactions:**
- Touch/trackpad: Swipe left/right
- Mouse: Scroll horizontally or click arrow buttons (optional)
- Keyboard: Arrow keys scroll to next/previous repo
- Indicators: Dot navigation below carousel

**Rationale:**
- Native scroll performance (no JavaScript scroll libraries)
- Matches existing mobile carousel pattern
- Accessible via keyboard and assistive technologies

### 5. Repository Ordering & Filtering

**Decision:** Sort by `pushed_at` (most recently updated first), limit to public repos with commits

**Filtering:**
```typescript
const repos = await fetchRepos()
  .filter(repo => !repo.private && repo.size > 0)
  .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
  .slice(0, 12); // Pagination limit
```

**Rationale:**
- Shows most active repositories first
- Skips empty repos (no commits to display)
- Excludes private repos (API token may not have access)

**Alternatives considered:**
- Sort by stars: Doesn't reflect recent activity
- Show all repos (no pagination): Risk hitting rate limits, slow load times

### 6. Performance Optimization

**Decision:** Implement client-side caching with 5-minute TTL

```typescript
const repoCache = new Map<string, { data: Repo[], timestamp: number }>();
const CACHE_TTL = 300000; // 5 minutes

function getCachedRepos(username: string) {
  const cached = repoCache.get(username);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}
```

**Rationale:**
- Reduces API calls on component remount
- Aligns with existing 5-minute auto-refresh interval
- Improves perceived performance

**Alternatives considered:**
- SWR/React Query: Adds dependency, overkill for simple cache
- Server-side cache (Cloudflare KV): Over-engineering for this use case

## Risks / Trade-offs

### Risk 1: API Rate Limiting
**Mitigation:**
- Use authenticated token (`PUBLIC_GITHUB_TOKEN` already configured)
- Implement exponential backoff on 429 errors
- Show friendly error message: "Too many requests. Refresh in X minutes."
- Client-side cache reduces redundant calls

### Risk 2: Slow Loading on Users with Many Repos
**Mitigation:**
- Paginate to 12 repos initially (13 API calls total)
- Show skeleton loaders during fetch
- Consider lazy-loading repos (fetch next batch on scroll)

### Risk 3: Layout Shift During Load
**Mitigation:**
- Set fixed height on carousel container: `min-height: 220px`
- Skeleton loaders match final card dimensions
- Use CSS `aspect-ratio` to reserve space

### Risk 4: Mobile Performance (Horizontal Scroll)
**Mitigation:**
- Use native CSS scroll-snap (no JS libraries)
- GPU-accelerated transforms (`translateZ(0)`)
- Limit carousel to 12 items initially

## Migration Plan

### Phase 1: Component Refactor
1. Update `GitHubActivity.tsx` to fetch all repos
2. Implement repository carousel structure
3. Add commit list within each repo card
4. Preserve existing glass styling

### Phase 2: Styling & Layout
1. Remove stacked grid layout from CSS
2. Add carousel container styles
3. Compact commit list styling
4. Add navigation indicators

### Phase 3: Testing & Refinement
1. Test with various repo counts (0, 5, 20+)
2. Validate layout harmony (original widget footprint restored)
3. Cross-browser testing
4. Performance audit

### Rollback Plan
If the redesign introduces issues:
- Revert to existing stacked card layout (preserved in git history)
- Cherry-pick API improvements (caching) if needed
- File follow-up issue for carousel iteration

## Open Questions

1. **Should we show repository language badge?**
   - Proposal: Yes, adds context without much space
   - Location: Next to repo name in header

2. **Should we show commit author avatars?**
   - Proposal: No, keeps layout compact and author is usually the user
   - Revisit if users request this feature

3. **Should we add "View all commits" link per repo?**
   - Proposal: Yes, small link in card footer → `github.com/{user}/{repo}/commits`
   - Improves discoverability

4. **Should carousel auto-play (rotate repos)?**
   - Proposal: No, auto-play can be annoying and reduces user control
   - Keep manual navigation only
