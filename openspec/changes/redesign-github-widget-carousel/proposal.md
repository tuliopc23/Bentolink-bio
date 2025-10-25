## Why

The current GitHub activity widget design introduced visual noise and layout imbalance:
- **Oversized commit cards** caused the GitHub widget to expand vertically, forcing the Tools widget to upsize and leaving blank space unfilled by DockLinks
- **Limited data visibility** - showing only 1 commit from 3 recently-pushed repos doesn't provide meaningful activity insight
- **Design noise** - while more compliant with the design system's glass treatment, the larger cards broke the page's visual harmony and bento grid proportions

## What Changes

Transform the GitHub Activity widget into a **repository carousel explorer** that is both compact and information-rich:

1. **Enhanced Data Fetching**
   - Fetch **all public repositories** (not just top 3)
   - For each repository, fetch the **3 most recent commits**
   - Cache repository metadata (name, description, language, stars)

2. **Horizontal Repository Navigation**
   - Implement a **scroll-left carousel** to browse repositories
   - Each repository displays as a single compact card
   - Show the **3 latest commits** within each repository card
   - Navigation indicates current repository position

3. **Compact Card Layout**
   - **1 repository card visible at a time** (like Writing widget pattern)
   - Vertical stacking of 3 commits within each card
   - Reduced padding and tighter typography
   - Restores widget to original footprint, re-harmonizing the page layout

4. **Visual Consistency**
   - Maintain glass material treatment and shadow tokens
   - Apply carousel scroll snap behavior (matches mobile pattern)
   - Preserve hover/touch interactions from design system

## Impact

**Affected Components:**
- `src/components/GitHubActivity.tsx` - complete component redesign
- `src/styles/github-activity-widget.css` - new carousel layout styles
- `src/pages/index.astro` - no changes needed (client:load directive stays)

**Affected Specs:**
- New spec: `openspec/specs/github-activity-widget/spec.md` (will be created from delta)
- Related: Touch optimizations remain compatible

**Breaking Changes:**
- **BREAKING**: Changes GitHub API fetching strategy (fetch all repos vs top 3)
- **BREAKING**: Removes existing stacked card layout in favor of carousel

**Performance Considerations:**
- Increased API calls (all repos × 3 commits each)
- Implement pagination or limit to first 10-15 repos
- Add client-side caching to reduce re-fetching

## Open Questions

- **GitHub API rate limits**: Should we limit total repository count (e.g., max 12 repos)? Current plan: fetch all public, paginate if needed
- **Loading states**: Should skeleton show carousel structure? Current plan: yes, show 3 commit skeletons within card frame
- **Empty states**: Handle repos with no commits or private repos? Current plan: skip repos with 0 commits
