# Mobile-First UX Optimization - Implementation Tasks

## Phase 1: Foundation and Horizontal Carousel

### 1. Create mobile carousel CSS foundation ✅
- Add mobile-specific media query section in `src/pages/index.astro` or new `src/styles/mobile-carousel.css`
- Implement `.widget-carousel` container styles with `overflow-x: auto`
- Add `scroll-snap-type: x mandatory` for snap behavior
- Configure `-webkit-overflow-scrolling: touch` for iOS momentum
- Set `scroll-behavior: smooth` with reduced motion fallback
- Test horizontal scrolling with touch gestures on physical device

**Validates**: mobile-carousel-navigation requirements (horizontal scroll, CSS scroll snap)

### 2. Adapt widget boxes for horizontal layout ✅
- Modify `.widget-box` styles within mobile breakpoint only
- Set `flex: 0 0 85vw` to fix widget width at 85% viewport
- Apply `scroll-snap-align: center` for centering
- Add `scroll-snap-stop: always` to prevent scroll skipping
- Test that widgets snap to center on scroll stop
- Verify desktop grid layout remains unchanged

**Validates**: mobile-carousel-navigation requirements (widget card mobile adaptation)

### 3. Wrap widgets in carousel container ✅
- Update `src/pages/index.astro` structure within mobile breakpoint
- Wrap `.widget-tools`, `.widget-github`, `.widget-feature-writing` in carousel container
- Ensure profile card and socials remain outside carousel (vertical)
- Add appropriate spacing and padding to carousel
- Test that only widgets below socials are in horizontal scroll
- Verify layout with 3+ widgets

**Validates**: mobile-carousel-navigation requirements (carousel structure, mobile-only isolation)

### 4. Implement keyboard navigation for carousel ✅
- Create or update carousel JavaScript handler in `src/scripts/carousel-handler.ts`
- Add event listeners for arrow keys (Left, Right, Home, End)
- Implement `scrollToWidget(index)` function using `scrollIntoView` or scroll position
- Ensure keyboard nav only activates on mobile breakpoint
- Test keyboard navigation with screen reader
- Test that Tab maintains logical focus order

**Validates**: mobile-carousel-navigation requirements (keyboard navigation support)

## Phase 2: Scroll Call-to-Action

### 5. Create ScrollCTA component ✅
- Create `src/components/ScrollCTA.astro` component file
- Implement component structure with button and Phosphor icon
- Add Phosphor `arrow-right` icon with appropriate sizing
- Include text "Swipe to explore" or similar
- Position above carousel container with appropriate spacing
- Ensure component only renders on mobile breakpoints

**Validates**: scroll-cta requirements (Apple HIG-compliant CTA)

### 6. Style ScrollCTA with Apple HIG compliance ✅
- Apply `var(--blue)` background color
- Set white or `var(--text-on-primary)` text color
- Add border-radius (12-16px) for rounded corners
- Implement minimum 44x44pt touch target with padding
- Add subtle shadow (`var(--shadow-2)`) for elevation
- Ensure styling adapts to light/dark themes
- Test contrast ratios meet WCAG requirements

**Validates**: scroll-cta requirements (CTA visual design, proper sizing for touch)

### 7. Implement CTA pulse animation ✅
- Create CSS keyframes for subtle horizontal pulse animation
- Animate icon translateX by 4-6px
- Set animation duration to 2-3 seconds with infinite loop
- Use smooth easing (cubic-bezier)
- Add GPU acceleration with `transform` and `will-change`
- Disable animation for `prefers-reduced-motion`
- Test animation smoothness on low-end devices

**Validates**: scroll-cta requirements (animated scroll hint, reduced motion support)

### 8. Implement smart CTA dismissal logic ✅
- Add JavaScript to handle CTA dismissal on carousel interaction
- Listen for scroll/swipe events in carousel
- Listen for CTA button click/tap events
- Implement 300ms fade-out transition on dismissal
- Store dismissal state in `sessionStorage`
- Prevent CTA from reappearing in same session
- Test dismissal after first swipe and after timeout (5 seconds)

**Validates**: scroll-cta requirements (smart CTA dismissal)

### 9. Add CTA accessibility features ✅
- Add `role="button"` to CTA element
- Implement `aria-label="Scroll left to view more widgets"`
- Set icon `aria-hidden="true"` (decorative)
- Add keyboard support (Enter/Space to trigger scroll)
- Implement visible focus ring meeting WCAG contrast
- Test with VoiceOver (iOS) and TalkBack (Android)

**Validates**: scroll-cta requirements (CTA accessibility)

### 10. Implement CTA touch feedback ✅
- Add touchstart/touchend event listeners
- Scale CTA to 0.95 on touch
- Reduce opacity to 0.8 on touch
- Restore scale and opacity on touch end (50ms transition)
- Ensure feedback works across touch devices
- Test with fast taps and long presses

**Validates**: scroll-cta requirements (CTA interaction feedback), touch-optimizations requirements (touch feedback)

## Phase 3: Scroll Progress Indicator

### 11. Create ScrollIndicator component ✅
- Create `src/components/ScrollIndicator.astro` component file
- Implement dots or segmented bar structure
- Dynamically generate dots based on widget count (3 initially)
- Position below carousel with appropriate spacing (12-16px)
- Horizontally center indicator
- Ensure component only renders on mobile breakpoints

**Validates**: scroll-progress-indicator requirements (Apple HIG-compliant indicator)

### 12. Style progress indicator with HIG compliance ✅
- Style inactive dots with `var(--text-tertiary)` at reduced opacity
- Style active dot with `var(--blue)` or `var(--color-primary)` at full opacity
- Add smooth transitions between states (200-300ms)
- Ensure dots adapt to light/dark themes
- Add minimum 44x44pt touch targets with transparent padding
- Add 8px spacing between dots

**Validates**: scroll-progress-indicator requirements (indicator style, proper hit targets)

### 13. Implement real-time scroll position tracking ✅
- Create JavaScript function to track carousel scroll position
- Use Intersection Observer API to detect visible widget
- Update active dot based on centered widget
- Use passive event listeners for scroll events
- Debounce/throttle updates to max 60fps using requestAnimationFrame
- Test smooth transitions between dots during scroll

**Validates**: scroll-progress-indicator requirements (real-time position tracking, performance optimization)

### 14. Implement interactive indicator navigation ✅
- Add click/tap event listeners to each dot
- Implement `navigateToWidget(index)` function
- Smoothly scroll carousel to selected widget on tap
- Animate scroll duration proportional to distance (max 500ms)
- Update indicator immediately on navigation
- Test rapid tapping and edge cases (first/last widget)

**Validates**: scroll-progress-indicator requirements (interactive navigation)

### 15. Add indicator accessibility features ✅
- Add `role="tablist"` to indicator container
- Add `role="tab"` to each dot
- Set `aria-selected="true"` for active dot, `false` for others
- Add descriptive `aria-label` to each dot (e.g., "View Tools widget, page 1 of 3")
- Ensure keyboard navigation (Tab, Enter/Space) works
- Test with screen readers for position announcements

**Validates**: scroll-progress-indicator requirements (accessibility)

### 16. Implement indicator visual states ✅
- Add hover state for dots (brightness increase, scale 1.1)
- Add pointer cursor on hover
- Implement visible focus ring for keyboard navigation
- Ensure focus ring differs from active state
- Add smooth transitions for all state changes (100-200ms)
- Test hover, focus, and active states together

**Validates**: scroll-progress-indicator requirements (visual states and feedback)

## Phase 4: Touch Optimizations

### 17. Implement touch-specific focus rings ✅
- Add CSS for touch device detection using `@media (hover: none) and (pointer: coarse)`
- Implement 3px focus ring with 4px offset for touch devices
- Use `var(--blue)` or `var(--focus-color)` for ring color
- Ensure 2px/2px offset for pointer devices
- Verify WCAG 2.1 contrast requirements (3:1 minimum)
- Test on both touch and pointer devices

**Validates**: touch-optimizations requirements (touch-specific focus rings)

### 18. Verify and enforce minimum touch targets ✅
- Audit all interactive elements for 44x44pt minimum size
- Add transparent padding where needed to meet minimum
- Verify CTA, indicator dots, and widget interactive areas
- Ensure 8px spacing between adjacent targets
- Use browser DevTools to visualize hit areas
- Test with accessibility auditing tools

**Validates**: touch-optimizations requirements (minimum touch target sizing)

### 19. Implement universal touch feedback animations ✅
- Add global CSS for interactive element touch feedback
- Scale elements to 0.95-0.98 on touchstart
- Reduce opacity to 0.8-0.9 on touchstart
- Use 50-100ms transition duration
- Restore on touchend with spring easing
- Disable for `prefers-reduced-motion`
- Test across widget cards, CTA, and indicator dots

**Validates**: touch-optimizations requirements (touch feedback animations)

### 20. Optimize touch event handling ✅
- Ensure all touch listeners use `{ passive: true }` where possible
- Implement debouncing/throttling for scroll handlers (60fps max)
- Use `requestAnimationFrame` for visual updates
- Avoid `preventDefault()` unless necessary
- Add `touch-action: pan-x` to carousel
- Add `touch-action: manipulation` to buttons/links
- Test scroll performance with Chrome DevTools Performance tab

**Validates**: touch-optimizations requirements (touch event optimization)

### 21. Apply touch-specific CSS optimizations ✅
- Add `touch-action: pan-x` to carousel container
- Add `touch-action: manipulation` to interactive elements
- Set `-webkit-tap-highlight-color: transparent` globally for mobile
- Ensure `-webkit-overflow-scrolling: touch` on carousel
- Add `user-select: none` to prevent text selection during swipe
- Add `-webkit-user-drag: none` to prevent image dragging
- Test native scroll feel on iOS Safari

**Validates**: touch-optimizations requirements (touch-specific CSS optimizations)

### 22. Implement GPU-accelerated animations ✅
- Ensure all animations use `transform` (translate, scale, rotate) only
- Use `opacity` changes where needed
- Avoid animating position, margin, padding, width, height
- Add `will-change` hints to actively animating elements
- Remove `will-change` when animation completes
- Test frame rate with FPS meter on low-end devices
- Verify 60fps maintained during all animations

**Validates**: touch-optimizations requirements (touch-optimized animations)

## Phase 5: Testing and Validation

### 23. Cross-browser and cross-device testing
- Test on iOS Safari (iPhone 14, 15)
- Test on Chrome Android (Galaxy S22, Pixel 7)
- Test on Samsung Internet browser
- Test in both portrait and landscape orientations
- Verify carousel behavior with 3, 4, and 5+ widgets
- Test with slow 3G network throttling
- Document any device-specific issues and workarounds

**Validates**: All requirements across target devices

### 24. Accessibility audit and compliance
- Run axe-core accessibility tests on mobile viewport
- Run WAVE accessibility evaluation
- Verify all touch targets meet 44x44pt minimum
- Test with iOS VoiceOver (swipe navigation, announcements)
- Test with Android TalkBack
- Verify keyboard navigation works completely
- Ensure all ARIA labels are descriptive and accurate
- Test with color contrast analyzer for WCAG 2.1 AA compliance

**Validates**: Accessibility requirements across all specs

### 25. Performance benchmarking
- Run Lighthouse mobile audit (target: 90+ performance score)
- Measure scroll depth reduction (target: 60%+ improvement)
- Verify horizontal swipe gesture completion rate
- Test frame rate during animations (target: locked 60fps)
- Measure Time to Interactive (TTI) on mobile
- Verify no performance regression on desktop
- Document performance metrics before and after

**Validates**: Performance requirements, success metrics from proposal

### 26. Desktop isolation verification
- Load page on desktop (viewport > 767px)
- Verify no carousel appears
- Verify vertical grid layout unchanged
- Verify no horizontal scroll bars
- Test window resize from mobile to desktop and vice versa
- Ensure no JavaScript errors in desktop viewport
- Document that desktop experience is 100% unchanged

**Validates**: mobile-only isolation requirements across all specs

### 27. Reduced motion compliance
- Enable "prefers-reduced-motion" in browser/OS settings
- Verify all animations are disabled or simplified
- Test CTA pulse animation is removed
- Test indicator transitions are instant
- Test carousel scroll is instant (no smooth scroll)
- Test touch feedback animations are disabled
- Ensure functionality remains intact without animations

**Validates**: Reduced motion requirements across all specs

## Phase 6: Documentation and Finalization

### 28. Update component documentation
- Document ScrollCTA component with props and usage
- Document ScrollIndicator component with props and usage
- Add inline CSS comments explaining mobile-specific behavior
- Update main README with mobile navigation section
- Create troubleshooting guide for common issues
- Document browser compatibility and known limitations

**Validates**: Maintenance and extensibility from design.md

### 29. Code review and optimization
- Review all mobile-only media queries for leaks
- Remove any debug code or console logs
- Minify and optimize CSS for production
- Verify no new dependencies were added
- Ensure code follows project style guide
- Run linting and formatting tools
- Address any code review feedback

**Validates**: Code quality and maintainability

### 30. Final validation and sign-off
- Run OpenSpec validate command
- Verify all requirements have passing scenarios
- Create demo video showing mobile UX improvements
- Measure and document final success metrics
- Compare before/after scroll depth and user flow
- Get stakeholder approval on mobile experience
- Mark change as ready for deployment

**Validates**: All requirements and success metrics from proposal

---

## Task Dependencies

- Tasks 1-4: Can be done in parallel (Phase 1 foundation)
- Tasks 5-10: Depend on tasks 1-3 (CTA needs carousel to exist)
- Tasks 11-16: Depend on tasks 1-3 (indicator needs carousel to exist)
- Tasks 17-22: Can be done in parallel with phases 2-3, or after
- Tasks 23-27: Must be done after all implementation complete
- Tasks 28-30: Must be done after testing phase complete

## Parallelizable Work

The following task groups can be worked on in parallel:
- **Group A**: Phase 1 (tasks 1-4) - Carousel foundation
- **Group B**: Phase 2 (tasks 5-10) - CTA component (requires Group A complete)
- **Group C**: Phase 3 (tasks 11-16) - Progress indicator (requires Group A complete)
- **Group D**: Phase 4 (tasks 17-22) - Touch optimizations (can overlap with B and C)

## Estimated Effort

- Phase 1: 4-6 hours
- Phase 2: 4-5 hours
- Phase 3: 4-5 hours
- Phase 4: 3-4 hours
- Phase 5: 6-8 hours
- Phase 6: 2-3 hours

**Total**: 23-31 hours
