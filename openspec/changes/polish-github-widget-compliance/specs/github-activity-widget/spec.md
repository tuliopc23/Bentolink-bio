## MODIFIED Requirements

### Requirement: Repository Card Visual Design
The GitHub repository cards SHALL match the page's `.widget-box` design quality and Apple HIG compliance standards.

**Visual Treatment:**
- Background: `color-mix(in srgb, var(--surface-elevated) 96%, transparent)`
- Border: `1px solid var(--panel-border)`
- Border-radius: `28px` (premium feel, matches larger widgets)
- Glassmorphism: `backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--glass-saturation-base))`
- Shadow system:
  - Layer 1: `var(--shadow-card)` (depth)
  - Layer 2: `var(--shadow-card-highlight)` (luminance)
  - Layer 3: `0 0 0 1px rgba(255, 255, 255, 0.04)` (edge definition)
  - Layer 4: `0 0 40px rgba(10, 132, 255, 0.05)` (blue glow accent)

**Spacing:**
- Padding: `clamp(20px, 2vw, 24px)` (responsive, generous)
- Internal gap: `clamp(var(--space-2), 1.2vw, var(--space-3))`
- Height: `clamp(180px, 16vw, 220px)` (compact but readable)

**Transitions:**
- Transform: `var(--motion-duration-base)` with `var(--spring-smooth)`
- Border/shadow: `var(--motion-duration-fast)` with `var(--motion-ease-out)`

#### Scenario: Repository card elevation matches widget-box quality
- **GIVEN** a user views the GitHub Activity widget
- **WHEN** they compare the repository card to other `.widget-box` widgets
- **THEN** the card SHALL have identical glassmorphism, shadow depth, and border treatment
- **AND** the visual quality SHALL be indistinguishable from the page standard

#### Scenario: Dark theme shadow enhancement
- **GIVEN** the user has dark theme enabled
- **WHEN** they view an active repository card
- **THEN** the card SHALL display enhanced blue glow shadows
- **AND** the glow SHALL use dual-layer shadows for depth: `0 0 8px rgba(10, 132, 255, 0.5), 0 0 16px rgba(10, 132, 255, 0.3)`

### Requirement: Typography System
All text within the GitHub widget SHALL use design system tokens for font sizing, weights, and spacing.

**Font Sizes (from `typography.css`):**
- Repository title: `var(--fs-subheadline)` with `var(--fw-semibold)`
- Repository description: `var(--fs-footnote)` with `line-height: 1.4`
- Commit message: `var(--fs-footnote)` with `var(--fw-medium)`
- Metadata (language, stars): `var(--fs-caption-1)`
- Commit meta chips (time, SHA): `var(--fs-caption-2)`

**Letter Spacing:**
- Titles: `var(--ls-title)` (tight, display-optimized)
- Body text: `var(--ls-body)` (readable)
- Captions: `var(--ls-caption)` (compact)

**Color Tokens:**
- Primary text: `var(--text-primary)`
- Secondary text: `var(--text-secondary)`
- Tertiary text: `var(--text-tertiary)`
- Links: `var(--blue)` on hover

#### Scenario: Responsive typography scales properly
- **GIVEN** a user resizes the browser window
- **WHEN** the viewport width changes from mobile to desktop
- **THEN** all text SHALL scale smoothly using `clamp()` functions
- **AND** no hardcoded pixel values SHALL exist in font sizing

#### Scenario: Text hierarchy is clear in compact layout
- **GIVEN** a repository card displays 3 commits
- **WHEN** the user scans the card content
- **THEN** the repository title SHALL be immediately distinguishable (semibold, subheadline)
- **AND** commit messages SHALL be readable at footnote size
- **AND** metadata SHALL be clearly secondary (caption sizes, tertiary color)

### Requirement: Phosphor Icon Integration
All icons in the GitHub widget SHALL use the Phosphor icon library consistently.

**Icon Mappings:**
- Repository identifier: `ph-git-branch` (16px)
- Programming language: `ph-code` (12px)
- Star count: `ph-star` (12px)
- Commit timestamp: `ph-clock` (10px)
- Commit SHA: `ph-hash` (10px)
- External link indicator: `ph-arrow-up-right` (14px, appears on hover)

**Icon Styling:**
- Decorative icons: `aria-hidden="true"`
- Size classes: Use font-size for sizing (12px metadata, 14px actions, 16px headers)
- Color: `var(--text-tertiary)` for decorative, inherit for interactive
- Spacing: `gap: 6px` for icon-text pairs (tight), `gap: 8px` for icon-label pairs

#### Scenario: Repository card displays language and stars with icons
- **GIVEN** a repository has a primary language and 10+ stars
- **WHEN** the card renders
- **THEN** the language SHALL display with `ph-code` icon (12px)
- **AND** the star count SHALL display with `ph-star` icon (12px)
- **AND** both icons SHALL have `aria-hidden="true"`

#### Scenario: Commit list item shows external link on hover
- **GIVEN** a user hovers over a commit list item
- **WHEN** the hover state activates
- **THEN** a `ph-arrow-up-right` icon (14px) SHALL fade in on the right
- **AND** the icon SHALL animate from `opacity: 0, transform: translateX(-4px)` to visible
- **AND** the transition SHALL use `var(--motion-duration-fast)` with `var(--motion-ease-out)`

### Requirement: Scroll Guidance CTA
The widget SHALL display a dismissible scroll guidance CTA to indicate horizontal navigation capability.

**CTA Design:**
- Text content: "Scroll left →" (blue accent, arrow symbol)
- Position: Above carousel track, below widget header
- Styling:
  - Background: `color-mix(in srgb, var(--surface-card) 40%, transparent)`
  - Border: `1px solid color-mix(in srgb, var(--panel-border) 30%, transparent)`
  - Border-radius: `12px`
  - Padding: `8px 12px`
  - Text color: `var(--blue)`
  - Font size: `var(--fs-footnote)`
  - Font weight: `var(--fw-medium)`

**Auto-Hide Behavior:**
- Dismiss trigger: First scroll interaction on carousel track
- Persistence: Store `github-widget-scroll-hint-seen: true` in localStorage
- Animation: Fade out over `200ms` with `var(--motion-ease-out)`
- Accessibility: `role="status"`, `aria-live="polite"`

**Visibility:**
- Display on all screen sizes (mobile + desktop)
- Only show if not previously dismissed

#### Scenario: First-time user sees scroll hint
- **GIVEN** a user visits the page for the first time
- **AND** localStorage does not contain `github-widget-scroll-hint-seen`
- **WHEN** the GitHub widget loads
- **THEN** the CTA SHALL display "Scroll left →" in blue
- **AND** the CTA SHALL be positioned above the carousel track
- **AND** the CTA SHALL have a subtle background and rounded corners

#### Scenario: CTA dismisses on first scroll
- **GIVEN** the scroll guidance CTA is visible
- **WHEN** the user scrolls the carousel track (any direction)
- **THEN** the CTA SHALL fade out over 200ms
- **AND** localStorage SHALL be set: `github-widget-scroll-hint-seen: true`
- **AND** the CTA SHALL not reappear on page reload

#### Scenario: Returning user does not see CTA
- **GIVEN** localStorage contains `github-widget-scroll-hint-seen: true`
- **WHEN** the user visits the page again
- **THEN** the scroll guidance CTA SHALL not render
- **AND** the carousel SHALL display without the hint

### Requirement: Pagination Dot Visual Fidelity
The carousel pagination dots SHALL display blue accent colors correctly and match `ScrollIndicator.astro` design patterns.

**Dot Specifications:**
- Inactive state:
  - Size: `8px` circle
  - Color: `var(--text-tertiary)` at `40% opacity`
  - Background: `var(--text-tertiary)`
- Active state:
  - Size: `10px` circle
  - Color: `var(--blue)` at `100% opacity`
  - Shadow: `0 0 8px rgba(10, 132, 255, 0.4)`
  - Dark theme enhancement: `0 0 8px rgba(10, 132, 255, 0.5), 0 0 16px rgba(10, 132, 255, 0.3)`

**Transitions:**
- Size/color change: `250ms` with `var(--motion-ease-out)`
- Hover scale (pointer devices): `transform: scale(1.3)` for inactive, `scale(1.2)` for active
- Active press: `transform: scale(0.9)` over `50ms`

**Touch Targets:**
- Button wrapper: `min-width: 44px`, `min-height: 44px`
- Padding: `12px` around dot
- Touch action: `manipulation`

**Accessibility:**
- Focus ring: `2px solid var(--blue)`, `outline-offset: 2px`
- Touch device focus: `3px outline`, `4px offset`
- ARIA: `aria-label="View repository {index} of {total}"`

#### Scenario: Active dot displays blue accent
- **GIVEN** a repository carousel with 5 repos
- **WHEN** the user scrolls to repository index 2
- **THEN** dot index 2 SHALL be 10px with blue background (`var(--blue)`)
- **AND** the dot SHALL display a blue glow shadow
- **AND** all other dots SHALL be 8px gray (`var(--text-tertiary)` at 40% opacity)

#### Scenario: Dot hover provides visual feedback
- **GIVEN** a user on a pointer device (desktop)
- **WHEN** they hover over an inactive dot
- **THEN** the dot SHALL scale to 1.3x over 250ms
- **AND** opacity SHALL increase to 70%
- **WHEN** they hover over the active dot
- **THEN** the dot SHALL scale to 1.2x
- **AND** opacity SHALL remain at 100%

#### Scenario: Dark theme enhances active dot glow
- **GIVEN** the user has dark theme enabled
- **WHEN** an active pagination dot is displayed
- **THEN** the dot SHALL have dual-layer blue shadows for enhanced visibility
- **AND** the glow SHALL be more pronounced than in light theme

## ADDED Requirements

### Requirement: Commit List Item Shadow Depth
Individual commit items within repository cards SHALL have enhanced shadow treatment for better visual hierarchy.

**Commit Item Styling:**
- Background: `color-mix(in srgb, var(--surface-card) 40%, transparent)`
- Border: `1px solid color-mix(in srgb, var(--panel-border) 30%, transparent)`
- Border-radius: `12px`
- Padding: `8px`
- Min-height: `44px` (touch target)

**Hover State:**
- Background: `color-mix(in srgb, var(--surface-card) 70%, transparent)`
- Border: `color-mix(in srgb, var(--panel-border) 60%, transparent)`
- Transform: `translateX(2px)` (subtle slide)
- Transition: `var(--motion-duration-fast)` with `var(--motion-ease-out)`

**Light Theme Enhancement:**
- Background: `color-mix(in srgb, white 60%, rgba(0, 0, 0, 0.02))`
- Hover background: `color-mix(in srgb, var(--surface-card) 85%, rgba(255, 255, 255, 0.4))`

#### Scenario: Commit items show depth within card
- **GIVEN** a repository card displays 3 commits
- **WHEN** the card is visible
- **THEN** each commit item SHALL have a subtle background and border
- **AND** the items SHALL appear slightly elevated from the card background
- **AND** there SHALL be 1px gap between items for separation

#### Scenario: Hover provides clear interactive feedback
- **GIVEN** a user hovers over a commit list item
- **WHEN** the hover state activates
- **THEN** the item SHALL slide 2px to the right
- **AND** the background SHALL become more opaque
- **AND** the `ph-arrow-up-right` icon SHALL fade in
- **AND** all transitions SHALL complete within 180ms

### Requirement: Carousel Background Polish
The carousel track area SHALL have subtle background treatment to distinguish it from the page background.

**Track Styling (optional, implement if needed):**
- Background: Very subtle tint, `color-mix(in srgb, var(--surface-card) 20%, transparent)`
- Border-radius: Match widget container (if applicable)
- Padding: Maintain current spacing tokens

**Scrollbar Theming:**
- Width: `4px` (thin, unobtrusive)
- Track: `transparent`
- Thumb: `rgba(10, 132, 255, 0.3)` (blue accent)
- Thumb border-radius: `2px`
- Thumb hover: `rgba(10, 132, 255, 0.5)`

#### Scenario: Scrollbar uses blue accent theme
- **GIVEN** a user scrolls the carousel on desktop
- **WHEN** the scrollbar thumb is visible
- **THEN** the thumb SHALL be blue with 30% opacity
- **AND** hovering the thumb SHALL increase opacity to 50%
- **AND** the scrollbar width SHALL be 4px (unobtrusive)

#### Scenario: Mobile carousel has no scrollbar
- **GIVEN** a user on a touch device
- **WHEN** they scroll the carousel
- **THEN** the scrollbar SHALL be hidden (scrollbar-width: none)
- **AND** smooth touch scrolling SHALL be enabled (-webkit-overflow-scrolling: touch)
