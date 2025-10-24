## MODIFIED Requirements
### Requirement: Tools Grid Presentation

The tools widget MUST present each link using the shared glass card treatment without altering tile sizing.

#### Scenario: Tile styling aligns with global tokens
- **Given** the tools widget renders
- **When** inspecting a tile
- **Then** the tile MUST keep its existing footprint and corner radius (≈22px)
- **And** it MUST use the shared glass shadow stack (`var(--shadow-card)` + highlight/glow) instead of bespoke drop shadows
- **And** padding MUST remain symmetric so icon and label spacing matches the writing cards

#### Scenario: Title remains inline
- **Given** the tile displays the tool label
- **When** hovering or focusing the tile
- **Then** the label MUST remain as inline text (no additional pill) while hover feedback relies on color-mix overlays and shared motion tokens

#### Scenario: Responsive layout preserves gutters
- **Given** the viewport width changes
- **When** on ≥1024px screens
- **Then** the grid MUST keep its current column count and ≥24px gutters with no clipping
- **When** below 768px
- **Then** tiles MUST stack just as before with the refreshed styling applied

### Requirement: Accessibility and Interaction

Tiles MUST remain accessible across input methods while respecting the updated motion language.

#### Scenario: Tap targets remain 44x44pt
- **Given** the user taps on a tile
- **When** measuring the interactive surface
- **Then** the hit area MUST stay ≥44x44pt without relying on new overflow wrappers

#### Scenario: Motion respects reduced motion
- **Given** prefers-reduced-motion is enabled
- **When** the tile gains hover or focus
- **Then** scale/translate animations MUST be disabled, falling back to color/outline feedback only
