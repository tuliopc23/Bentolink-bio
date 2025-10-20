# scroll-progress-indicator Specification

## Purpose
TBD - created by archiving change optimize-mobile-ux. Update Purpose after archive.
## Requirements
### Requirement: Apple HIG-Compliant Progress Indicator

The page MUST display an Apple HIG-compliant scroll progress indicator below the widget carousel on mobile that shows the current scroll position and total number of widgets.

#### Scenario: Progress indicator appears below carousel

**Given** the user is viewing the widget carousel on mobile
**When** the carousel is displayed
**Then** a progress indicator MUST be visible below the carousel
**And** the indicator MUST show the total number of widgets
**And** the indicator MUST highlight the currently visible widget
**And** the indicator MUST follow Apple HIG page control or progress bar patterns
**And** the indicator MUST have appropriate spacing above and below (12-16px)

#### Scenario: Indicator style matches design system

**Given** the progress indicator is rendered
**When** checking the visual design
**Then** the indicator MUST use dots or segmented bar style
**And** active elements MUST use `var(--blue)` or `var(--color-primary)`
**And** inactive elements MUST use `var(--text-tertiary)` with reduced opacity
**And** the indicator MUST adapt to light/dark themes
**And** the indicator MUST be horizontally centered

### Requirement: Real-Time Position Tracking

The progress indicator MUST update in real-time as the user scrolls through the carousel, accurately reflecting the current widget position.

#### Scenario: Indicator updates on scroll

**Given** the user is viewing the first widget in the carousel
**When** the user swipes to the second widget
**Then** the first dot/segment MUST become inactive
**And** the second dot/segment MUST become active
**And** the transition MUST be smooth and animated (200-300ms)
**And** the update MUST occur as the widget snaps into place

#### Scenario: Indicator reflects partial scroll

**Given** the user is scrolling between widgets
**When** the scroll position is between two widgets
**Then** the indicator MAY show a transition state (optional enhancement)
**Or** the indicator MUST show the closest/target widget as active
**And** the indicator MUST update immediately when scroll stops

#### Scenario: Scroll events are optimized

**Given** the carousel is being scrolled
**When** scroll events fire
**Then** the indicator update logic MUST use passive event listeners
**And** the updates MUST be debounced or throttled to max 60fps
**And** the updates MUST not cause layout thrashing
**And** Intersection Observer MUST be used when available

### Requirement: Interactive Navigation

The progress indicator MUST allow users to tap on dots/segments to jump directly to specific widgets.

#### Scenario: User taps indicator to navigate

**Given** the user is viewing widget 1 in the carousel
**When** the user taps the dot/segment for widget 3
**Then** the carousel MUST smoothly scroll to widget 3
**And** the scroll MUST be animated (unless reduced motion is preferred)
**And** the duration MUST be proportional to the distance (max 500ms)
**And** the indicator MUST update to show widget 3 as active

#### Scenario: Tapping indicators has proper hit targets

**Given** the progress indicator dots/segments are displayed
**When** measuring interactive areas
**Then** each dot/segment MUST have a minimum hit target of 44x44pt
**And** invisible padding MUST extend the touchable area if needed
**And** dots/segments MUST have appropriate spacing between them (min 8px)

#### Scenario: Keyboard navigation works with indicator

**Given** the user is navigating with a keyboard
**When** the user tabs to the progress indicator
**Then** each dot/segment MUST be focusable
**When** the user presses Enter or Space on a dot/segment
**Then** the carousel MUST scroll to that widget
**And** focus MUST move to that widget

### Requirement: Progress Indicator Accessibility

The indicator MUST be fully accessible to keyboard and assistive technology users.

#### Scenario: Indicator has proper ARIA attributes

**Given** the progress indicator is rendered
**When** checking the accessibility markup
**Then** the indicator container MUST have `role="tablist"`
**And** each dot/segment MUST have `role="tab"`
**And** the active dot/segment MUST have `aria-selected="true"`
**And** inactive dots/segments MUST have `aria-selected="false"`
**And** each dot/segment MUST have a descriptive `aria-label` (e.g., "View Tools widget, page 1 of 3")

#### Scenario: Screen readers announce position

**Given** a screen reader user is navigating the carousel
**When** the carousel scrolls to a new widget
**Then** the screen reader MUST announce the new position
**And** the announcement MUST include widget name and position (e.g., "GitHub widget, 2 of 3")
**And** the announcement MUST not be overly verbose

### Requirement: Visual States and Feedback

The progress indicator MUST provide clear visual states for different interaction modes.

#### Scenario: Indicator shows hover state

**Given** the user hovers over an inactive dot/segment with a pointer device
**When** the pointer enters the dot/segment
**Then** the dot/segment MUST increase in size or brightness
**And** the cursor MUST change to pointer
**And** the transition MUST be smooth (100-200ms)

#### Scenario: Indicator shows active state

**Given** the user is viewing a specific widget
**When** that widget is centered in the carousel
**Then** the corresponding dot/segment MUST be visually distinct
**And** the active state MUST use full opacity or larger size
**And** the active state MUST use the primary color (`var(--blue)`)
**And** the transition MUST be animated

#### Scenario: Indicator shows focus state

**Given** the user is navigating with a keyboard
**When** a dot/segment receives focus
**Then** a focus ring MUST be visible around the dot/segment
**And** the focus ring MUST meet WCAG contrast requirements (3:1)
**And** the focus ring MUST be clearly distinguishable from the active state

### Requirement: Performance Optimization

The progress indicator MUST be performant and not impact carousel scroll performance.

#### Scenario: Indicator updates use efficient selectors

**Given** the indicator is updating in response to scroll
**When** the JavaScript updates the active state
**Then** the updates MUST use class toggling (not inline styles)
**And** the updates MUST batch DOM changes
**And** the updates MUST not trigger layout recalculations
**And** the updates MUST complete in < 16ms (1 frame)

#### Scenario: Indicator uses CSS transforms for animations

**Given** the indicator transitions between states
**When** animating the active state
**Then** the animations MUST use CSS transforms (scale, translate)
**And** the animations MUST use opacity changes
**And** the animations MUST be GPU-accelerated
**And** no position, width, or margin properties MUST be animated

### Requirement: Responsive Behavior

The progress indicator MUST adapt to different numbers of widgets and screen sizes.

#### Scenario: Indicator handles varying widget counts

**Given** the carousel has 3 widgets
**When** the indicator is rendered
**Then** the indicator MUST show 3 dots/segments
**When** a widget is added or removed dynamically
**Then** the indicator MUST update to reflect the new count
**And** the layout MUST reflow appropriately

#### Scenario: Indicator scales for small screens

**Given** the user is on a very small mobile device (< 375px wide)
**When** the indicator is displayed with many widgets (5+)
**Then** the dots/segments MUST scale down appropriately
**Or** the indicator MUST use a more compact representation
**And** the indicator MUST remain usable and accessible
**And** hit targets MUST still meet minimum size requirements

### Requirement: Reduced Motion Support

The progress indicator MUST respect user preferences for reduced motion.

#### Scenario: Reduced motion disables transitions

**Given** the user has enabled "prefers-reduced-motion"
**When** the indicator updates
**Then** all transition animations MUST be disabled
**And** state changes MUST be instant
**And** the indicator MUST still function correctly
**And** tapping to navigate MUST still work (with instant scrolling)

