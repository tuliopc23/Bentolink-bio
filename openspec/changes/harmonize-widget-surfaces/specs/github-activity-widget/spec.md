## MODIFIED Requirements
### Requirement: Commit Card Layout

GitHub activity entries MUST render as stacked cards using the shared glass treatment while keeping the widget footprint unchanged.

#### Scenario: Card styling matches global language
- **Given** the widget renders commits
- **When** inspecting a commit entry
- **Then** the entry MUST sit inside a rounded card (≈28px radius) with the shared glass shadow stack and color-mix background
- **And** card width MUST match the widget’s interior width (no new horizontal scroll)

#### Scenario: Metadata uses inline chips
- **Given** the card shows repo name, relative time, and SHA
- **When** viewing the footer row
- **Then** repo/time/sha MUST be presented as inline chips styled with the shared chip tokens
- **And** the external-link CTA MUST remain a circular chip respecting the 44x44pt touch target

### Requirement: Interaction and Accessibility

Commit cards MUST honour the shared motion tokens while keeping interactions accessible on touch and pointer devices.

#### Scenario: Motion mirrors global tokens
- **Given** the user hovers or focuses a commit card
- **When** prefers-reduced-motion is disabled
- **Then** the card MAY lift using the shared motion tokens (translateY ≤ 4px)
- **And** when prefers-reduced-motion is enabled the card MUST fall back to color/outline changes only

#### Scenario: Tap targets remain accessible
- **Given** the user interacts via touch
- **When** tapping the CTA chip
- **Then** the hit area MUST be ≥44x44pt and inherit the existing touch feedback/haptic behaviour

### Requirement: Loading Feedback

The loading state MUST preserve the final card geometry so layout remains stable during hydration.

#### Scenario: Skeleton matches card sizing
- **Given** the GitHub data is still loading
- **When** the skeleton state renders
- **Then** placeholder elements MUST reuse the card radius and width so layout does not shift on hydrate
