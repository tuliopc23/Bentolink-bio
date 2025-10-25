## ADDED Requirements
### Requirement: Mobile Card Layout Refresh

The Feature Writing widget MUST render mobile slides as enlarged, full-width cards that surface article metadata clearly.

#### Scenario: Single slide view on mobile
- **Given** the viewport width is below 768px
- **When** the carousel initializes
- **Then** only one article card MUST be fully visible at a time
- **And** the card width MUST use at least 88vw while keeping 16px min gutter on both sides
- **And** scroll-snap points MUST stay centered so cards do not clip

#### Scenario: Card spacing and padding scale up
- **Given** an article card renders on mobile
- **When** inspecting its padding and typography
- **Then** horizontal padding MUST be at least 20px and vertical padding at least 24px
- **And** the title MUST use the same typography token as hero subheadlines (no smaller than `--fs-title-3`)
- **And** the excerpt MUST allow 3-4 lines before truncation with comfortable line height

### Requirement: Metadata and CTA Presentation

Metadata MUST be grouped into touch-friendly chips and align with existing Apple HIG-inspired tokens.

#### Scenario: Metadata chips meet touch target
- **Given** the article date and read time are rendered
- **When** measuring their tappable region
- **Then** each metadata chip MUST meet the 44x44pt minimum hit area
- **And** icons MUST sit inside the chip with 8px padding
- **And** the chips MUST reuse existing surface/blur tokens (no brand-new colors)

#### Scenario: CTA remains prominent
- **Given** the “Read” affordance is shown
- **When** the card is displayed on mobile
- **Then** the CTA MUST be styled as a pill/label that passes 3:1 contrast
- **And** it MUST sit on the same baseline as metadata chips
- **And** the arrow icon MUST retain the existing icon set

#### Scenario: “New” badge adapts to layout
- **Given** an article qualifies as new
- **When** the badge renders on mobile
- **Then** the badge MUST align with the card header without overlapping
- **And** the badge text MUST remain legible (min 12px font size)

### Requirement: Motion and Interaction Enhancements

The refreshed cards MUST support optional depth interactions while respecting performance and accessibility constraints.

#### Scenario: Parallax tilts respond to pointer/touch
- **Given** the device supports pointer hover or motion sensors
- **When** the user hovers or drags on the card
- **Then** the card MAY tilt/translate up to 4 degrees/6px
- **And** the interaction MUST run at 60fps using GPU transforms
- **And** the effect MUST disable automatically when `prefers-reduced-motion` is set

#### Scenario: Reduced motion fallback
- **Given** a user prefers reduced motion
- **When** viewing the widget
- **Then** all parallax and pulse animations MUST be disabled
- **And** hover/tap still provides scale/opacity feedback already defined in touch specs

#### Scenario: Performance guardrails
- **Given** the carousel scrolls with the new card size
- **When** capturing performance traces on mid-tier mobile hardware
- **Then** frame times MUST remain under 16ms
- **And** the parallax/scroll observers MUST clean up when the widget unmounts to avoid leaks
