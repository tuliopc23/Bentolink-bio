## 1. Data Fetching & API Integration
- [ ] 1.1 Update `fetchRecentCommits` to fetch all public repositories
- [ ] 1.2 Implement pagination for repositories (limit to 12 repos initially)
- [ ] 1.3 For each repository, fetch 3 most recent commits
- [ ] 1.4 Add repository metadata (name, description, language, stars, url)
- [ ] 1.5 Implement client-side caching to reduce API calls
- [ ] 1.6 Add error handling for rate limits and failed requests

## 2. Component Architecture
- [ ] 2.1 Refactor `GitHubActivity.tsx` to use repository-based state
- [ ] 2.2 Create repository carousel structure with scroll container
- [ ] 2.3 Build repository card component with header (repo name, meta)
- [ ] 2.4 Nest 3 commit entries within each repository card
- [ ] 2.5 Add carousel navigation indicators (dots/progress)
- [ ] 2.6 Implement scroll snap behavior for repository cards

## 3. Styling & Layout
- [ ] 3.1 Remove existing stacked card grid from `github-activity-widget.css`
- [ ] 3.2 Add carousel container styles (horizontal scroll, snap points)
- [ ] 3.3 Design compact repository card layout (fills 1 card width)
- [ ] 3.4 Style commit entries as compact list items within repo card
- [ ] 3.5 Add repository metadata styling (language badge, star count)
- [ ] 3.6 Ensure widget maintains original vertical footprint
- [ ] 3.7 Implement carousel navigation indicators
- [ ] 3.8 Add scroll-left/right affordances (fade gradients)

## 4. Interaction & Accessibility
- [ ] 4.1 Enable keyboard navigation (arrow keys to scroll repos)
- [ ] 4.2 Ensure touch swipe works on mobile
- [ ] 4.3 Add ARIA labels for carousel navigation
- [ ] 4.4 Preserve 44x44pt touch targets for commit links
- [ ] 4.5 Test prefers-reduced-motion fallback

## 5. Loading & Empty States
- [ ] 5.1 Update skeleton to show carousel structure
- [ ] 5.2 Show 3 commit skeletons within card frame
- [ ] 5.3 Handle empty repos (no commits) gracefully
- [ ] 5.4 Add error state for API failures
- [ ] 5.5 Add rate limit warning message

## 6. Testing & Validation
- [ ] 6.1 Test with accounts having varying repo counts (0, 5, 20+)
- [ ] 6.2 Verify carousel scroll behavior on mobile and desktop
- [ ] 6.3 Test API rate limiting scenarios
- [ ] 6.4 Validate layout harmony (widget footprint matches original size)
- [ ] 6.5 Cross-browser testing (Safari, Chrome, Firefox)
- [ ] 6.6 Lighthouse performance audit

## 7. Code Quality
- [ ] 7.1 Run `bun check` (Biome lint + format)
- [ ] 7.2 Run `bun astro check` (TypeScript validation)
- [ ] 7.3 Review console for warnings/errors
