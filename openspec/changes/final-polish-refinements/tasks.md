# Final Polish Refinements - Tasks

## Implementation Tasks

### 1. Fix ProfileCard Bio Line-Height
- [ ] Update `src/components/ProfileCard.astro:293`
- [ ] Change `line-height: var(--lh-base)` to `line-height: 1.5`
- [ ] Verify bio text readability improved

### 2. Fix ProfileCard Hover Lift
- [ ] Update `src/components/ProfileCard.astro:173`
- [ ] Change `translate3d(0, -4px, 0)` to `translate3d(0, -2px, 0)`
- [ ] Verify hover elevation hierarchy (profile: -2px, widgets: -6px)

### 3. Fix Mobile Contact Chips Touch Targets
- [ ] Update `src/components/ProfileCard.astro:504-506`
- [ ] Add `padding: 8px 10px` to mobile contact chips
- [ ] Add `min-height: 44px` to meet Apple HIG standards
- [ ] Verify touch targets meet 44pt minimum on mobile devices

### 4. Fix Blog CTA Shadow Opacity
- [ ] Update `src/styles/feature-writing-widget.css:233`
- [ ] Change shadow opacity from `0.28` to `0.32`
- [ ] Verify hover feedback is more prominent

### 5. Fix Section Nav Padding
- [ ] Update `src/components/SectionQuickNav.astro:441`
- [ ] Change `padding: 10px 16px` to `padding: 10px 15px`
- [ ] Verify visual balance improved

## Validation
- [ ] All 5 changes applied successfully
- [ ] No layout shifts or regressions
- [ ] Design system consistency maintained
- [ ] Mobile touch targets meet accessibility standards
- [ ] Typography and spacing improved

## Status
- **Created:** 2025-10-25
- **Status:** In Progress
- **Files Modified:** 3 components, 1 CSS file
