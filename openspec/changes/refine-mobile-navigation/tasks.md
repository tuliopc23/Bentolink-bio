## 1. Implementation
- [x] 1.1 Tag Profile, Tools, GitHub, and Writing blocks with stable anchors and roles.
- [x] 1.2 Create `SectionQuickNav` component with inline layout and mobile pill-row treatment that reuse existing tokens.
- [x] 1.3 Add scroll/observer script to sync active state, manage `aria-current`, and trigger optional light haptics.
- [x] 1.4 Integrate the nav into `Base` layout flow and ensure smooth-scroll respects reduced-motion settings.
- [x] 1.5 Adjust touch-focused helpers so the nav pill row and carousel gestures remain conflict-free.

## 2. Quality
- [ ] 2.1 Add Playwright (or Astro integration) test to confirm nav scrolls to the correct section IDs.
- [ ] 2.2 Manually QA on iOS Safari and Android Chrome to confirm pill-row ergonomics and horizontal scroll affordance.

## 3. Documentation
- [ ] 3.1 Update relevant specs after implementation to reflect the new navigation capability.
