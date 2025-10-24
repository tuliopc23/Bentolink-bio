## ADDED Requirements
### Requirement: Section Quick Navigation Bar

The page MUST render a Section Quick Nav that links to each primary content block (Profile, Tools, GitHub, Writing) without introducing new visual styles.

#### Scenario: Nav renders inline on desktop
- **Given** the viewport width is at least 768px
- **When** the hero and profile card are displayed
- **Then** the Section Quick Nav MUST render immediately beneath the hero content
- **And** it MUST lay out horizontally using existing spacing and typography tokens
- **And** each nav item MUST label its destination section (e.g., "Profile", "Tools")

#### Scenario: Nav collapses to pill row on mobile
- **Given** the viewport width is below 768px
- **When** the Section Quick Nav renders
- **Then** nav items MUST appear as pill-shaped chips inside a horizontally scrollable row
- **And** the row MUST use existing spacing, radius, and blur tokens (no new palette)
- **And** overflow indicators (fade masks or gradients) MUST hint that the row scrolls horizontally

#### Scenario: Back to top affordance appears after hero
- **Given** the user scrolls beyond the profile section
- **When** the Section Quick Nav is rendered
- **Then** the nav MUST reveal a “Top” chip within the nav bar
- **And** activating it MUST return the viewport to the hero anchor
- **And** the chip MUST disable or visually de-emphasize while the hero is already in view

### Requirement: Section Anchors and Focus Management

Each primary content block MUST expose a stable anchor target and manage focus for accessibility.

#### Scenario: Section headings have unique anchors
- **Given** the primary content blocks (Profile, Tools, GitHub, Writing) render
- **When** inspecting their markup
- **Then** each block MUST include a unique `id` on a heading-level element or section
- **And** `scroll-margin-top` MUST ensure the heading is fully visible after navigation

#### Scenario: Smooth scroll respects reduced motion
- **Given** the user activates a Section Quick Nav item
- **When** the user prefers reduced motion
- **Then** the page MUST jump immediately to the target anchor (no animation)
- **Else** the page MUST smooth-scroll using existing motion tokens
- **And** `prefers-reduced-motion` MUST be rechecked on every interaction

#### Scenario: Focus lands on target heading
- **Given** a user activates a Section Quick Nav item via keyboard
- **When** the browser scrolls to the target
- **Then** programmatic focus MUST move to the target section heading
- **And** assistive technology MUST announce the heading content once focused

### Requirement: Active Section Tracking

The Section Quick Nav MUST reflect the currently visible section using IntersectionObserver without harming performance.

#### Scenario: Active nav item updates on scroll
- **Given** the user scrolls between sections
- **When** a section intersects at least 50% of the viewport
- **Then** the corresponding nav item MUST receive an `aria-current="true"` state
- **And** all other nav items MUST clear `aria-current`
- **And** the visual highlight MUST reuse the existing primary tint tokens

#### Scenario: Observer detaches when nav hidden
- **Given** the Section Quick Nav is removed from the DOM (e.g., during hydration)
- **When** the IntersectionObserver would otherwise run
- **Then** the observer MUST disconnect to avoid memory leaks
- **And** reconnect once the nav rehydrates

### Requirement: Interaction Feedback and Performance

Navigation interactions MUST provide immediate feedback across input methods without regressing performance.

#### Scenario: Tap triggers light haptic feedback
- **Given** the device exposes the Vibration or Haptics API
- **When** the user taps a nav item or the “Top” control
- **Then** a light (≤ 15ms) haptic pulse MAY play
- **And** haptics MUST respect user/system preferences

#### Scenario: Keyboard navigation is linear
- **Given** the nav receives keyboard focus
- **When** the user presses ArrowLeft/ArrowRight (or ArrowDown/ArrowUp on mobile)
- **Then** focus MUST move to the previous or next nav item
- **And** Enter/Space MUST activate the target anchor
- **And** focus MUST remain visible according to existing focus ring tokens

#### Scenario: Horizontal nav scroll does not conflict with carousel gestures
- **Given** the nav pill row requires horizontal scrolling on mobile
- **When** the user performs a horizontal swipe over the nav
- **Then** the nav MUST scroll without interfering with the widget carousel underneath
- **And** each pill MUST retain a minimum 44x44pt hit area as defined in existing specs

#### Scenario: Script work stays under 16ms
- **Given** nav activation or scroll tracking runs
- **When** measuring the main thread cost
- **Then** work per frame MUST stay under 16ms
- **And** throttling/debouncing MUST be used where needed
- **And** no layout thrash (forced synchronous layouts) MUST occur
