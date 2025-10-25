## 1. Icon System Integration
- [ ] 1.1 Replace repository icon placeholder with `ph-git-branch`
- [ ] 1.2 Replace language icon with `ph-code`
- [ ] 1.3 Replace stars icon with `ph-star`
- [ ] 1.4 Replace commit time icon with `ph-clock`
- [ ] 1.5 Replace commit SHA icon with `ph-hash`
- [ ] 1.6 Add `ph-arrow-up-right` to commit list items for external link indication
- [ ] 1.7 Verify all icons render with proper sizing (12px, 14px, 16px classes)
- [ ] 1.8 Add `aria-hidden="true"` to all decorative icons

## 2. Typography Enhancement
- [ ] 2.1 Apply `--fs-subheadline` to repository titles
- [ ] 2.2 Apply `--fs-footnote` to commit messages and descriptions
- [ ] 2.3 Apply `--fs-caption-1` to metadata (language, stars)
- [ ] 2.4 Apply `--fs-caption-2` to commit meta chips (time, SHA)
- [ ] 2.5 Use `--fw-semibold` for repository titles
- [ ] 2.6 Use `--fw-medium` for commit messages
- [ ] 2.7 Apply `--ls-title` letter-spacing to headers
- [ ] 2.8 Verify line-height readability in compact layout

## 3. Card Material & Shadow System
- [ ] 3.1 Update `.github-repo-card` background to `color-mix(in srgb, var(--surface-elevated) 96%, transparent)`
- [ ] 3.2 Apply `backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--glass-saturation-base))`
- [ ] 3.3 Add multi-layer shadows: `var(--shadow-card)`, `var(--shadow-card-highlight)`, blue glow
- [ ] 3.4 Use `--panel-border` for card borders
- [ ] 3.5 Increase border-radius to 28px (from 22px)
- [ ] 3.6 Enhance `.github-commit-list-item` shadows and hover states
- [ ] 3.7 Add smooth spring transitions using `--spring-smooth`
- [ ] 3.8 Verify light/dark theme visual parity

## 4. Scroll Guidance CTA
- [ ] 4.1 Design CTA component structure (can be inline in GitHubActivity.tsx or separate)
- [ ] 4.2 Add "Scroll left →" text with blue accent color (`var(--blue)`)
- [ ] 4.3 Position above carousel track (below widget header)
- [ ] 4.4 Style: subtle background, rounded corners, minimal padding
- [ ] 4.5 Implement auto-hide on first scroll (localStorage: `github-widget-scroll-hint-seen`)
- [ ] 4.6 Add fade-out animation on dismiss
- [ ] 4.7 Ensure mobile + desktop visibility
- [ ] 4.8 Add accessibility: `role="status"`, `aria-live="polite"`

## 5. Pagination Dot Fix & Enhancement
- [ ] 5.1 Debug blue accent not appearing (verify CSS specificity and `var(--blue)` resolution)
- [ ] 5.2 Ensure `.github-repo-carousel__indicator--active::before` applies correctly
- [ ] 5.3 Verify active state: 10px size, blue background, glow shadow
- [ ] 5.4 Add smooth scale transitions (250ms ease-out)
- [ ] 5.5 Enhance dark theme glow: add secondary shadow layer
- [ ] 5.6 Remove mobile-only restriction (display on all screen sizes)
- [ ] 5.7 Test hover states on pointer devices (1.3x scale inactive, 1.2x active)
- [ ] 5.8 Verify reduced-motion compliance

## 6. Background & Container Polish
- [ ] 6.1 Add subtle background to `.github-repo-carousel__track` (optional, if needed)
- [ ] 6.2 Style scrollbar with blue accent thumb: `scrollbar-color: rgba(10, 132, 255, 0.3)`
- [ ] 6.3 Ensure smooth scroll behavior on all devices
- [ ] 6.4 Verify scroll-snap alignment (center)
- [ ] 6.5 Test touch scrolling performance on mobile
- [ ] 6.6 Add proper spacing tokens: `--space-3`, `--space-4`, `--space-5`
- [ ] 6.7 Verify carousel gap consistency across breakpoints

## 7. Code Quality & Validation
- [ ] 7.1 Run `bunx biome check --write .` and fix all issues
- [ ] 7.2 Run `bunx astro check` and resolve TypeScript errors
- [ ] 7.3 Verify no console warnings in browser DevTools
- [ ] 7.4 Test keyboard navigation (arrow keys)
- [ ] 7.5 Test screen reader announcements (NVDA/VoiceOver)
- [ ] 7.6 Visual regression test: compare with `.widget-box` quality
- [ ] 7.7 Performance test: verify 60fps scroll on mobile
- [ ] 7.8 Cross-browser test: Safari, Chrome, Firefox

## 8. Documentation
- [ ] 8.1 Add code comments for CTA auto-hide logic
- [ ] 8.2 Document icon size classes in component
- [ ] 8.3 Add inline comment for shadow layering rationale
- [ ] 8.4 Update CLAUDE.md if new conventions introduced
