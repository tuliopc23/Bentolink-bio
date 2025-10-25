## ADDED Requirements

### Requirement: Repository Carousel Navigation

The GitHub Activity widget MUST display repositories in a horizontal carousel allowing users to browse all public repositories.

#### Scenario: Horizontal scroll through repositories
- **Given** the user has multiple public repositories
- **When** the widget loads
- **Then** repositories MUST be displayed in a horizontal scrollable carousel
- **And** scroll-snap behavior MUST align one repository card at a time
- **And** repositories MUST be sorted by most recently pushed first

#### Scenario: Repository carousel indicators
- **Given** the carousel contains multiple repositories
- **When** viewing the widget
- **Then** navigation indicators (dots) MUST be visible below the carousel
- **And** the active indicator MUST highlight the currently visible repository
- **And** users MAY click indicators to jump to specific repositories

#### Scenario: Keyboard navigation support
- **Given** the carousel has focus
- **When** the user presses left/right arrow keys
- **Then** the carousel MUST scroll to the previous/next repository
- **And** the scroll behavior MUST respect `scroll-behavior: smooth`

### Requirement: Enhanced Repository Data Fetching

The widget MUST fetch all public repositories and the 3 most recent commits for each repository.

#### Scenario: Fetch all public repositories
- **Given** a GitHub username is provided
- **When** the component initializes
- **Then** the widget MUST fetch all public repositories via `/users/{username}/repos?sort=pushed&per_page=12`
- **And** repositories MUST be filtered to exclude private repos and empty repos (size = 0)
- **And** repositories MUST be sorted by `pushed_at` descending

#### Scenario: Fetch 3 commits per repository
- **Given** repositories have been fetched
- **When** loading repository details
- **Then** for each repository, the widget MUST fetch the 3 most recent commits via `/repos/{owner}/{repo}/commits?per_page=3`
- **And** commit data MUST include SHA, message, author date, and html_url

#### Scenario: API rate limit handling
- **Given** the GitHub API rate limit is exceeded
- **When** fetching data
- **Then** the widget MUST display an error message: "Too many requests. Data will refresh in X minutes."
- **And** the widget MUST implement exponential backoff before retrying
- **And** the widget MUST use the `PUBLIC_GITHUB_TOKEN` for authenticated requests

### Requirement: Compact Repository Card Layout

Each repository card MUST display repository metadata and 3 commits in a compact, vertically-efficient layout.

#### Scenario: Repository card structure
- **Given** a repository with commits
- **When** rendering the repository card
- **Then** the card header MUST display the repository name as a clickable link
- **And** the card header MAY display repository metadata (language, star count)
- **And** the card body MUST contain a vertical list of 3 commits
- **And** the card footer MAY contain a "View all commits" link to the repository's commit history

#### Scenario: Commit list within card
- **Given** a repository card displays 3 commits
- **When** viewing the commit list
- **Then** each commit MUST display as a compact list item (≤60px height)
- **And** each commit MUST show the commit message (truncated to 1 line, max 80 characters)
- **And** each commit MUST show relative time (e.g., "2h ago", "Yesterday")
- **And** each commit MUST be a clickable link to the commit URL on GitHub

#### Scenario: Card maintains widget footprint
- **Given** the repository card is rendered
- **When** measuring the card dimensions
- **Then** the card height MUST be `clamp(180px, 16vw, 220px)` to avoid vertical expansion
- **And** the card width MUST fill the carousel item width (100% of container)
- **And** the widget's total vertical footprint MUST match the original design (before stacked cards)

### Requirement: Client-Side Caching

The widget MUST implement client-side caching to reduce redundant API calls and improve performance.

#### Scenario: Cache repository data
- **Given** repository data has been fetched
- **When** the data is stored
- **Then** the widget MUST cache repository and commit data with a 5-minute TTL
- **And** subsequent component mounts within 5 minutes MUST use cached data
- **And** after 5 minutes, the cache MUST expire and trigger a fresh fetch

#### Scenario: Cache invalidation on user action
- **Given** the user manually triggers a refresh (future enhancement)
- **When** the refresh action occurs
- **Then** the cache MUST be cleared immediately
- **And** fresh data MUST be fetched from the GitHub API

### Requirement: Loading and Empty States

The widget MUST provide clear feedback during loading and handle empty/error states gracefully.

#### Scenario: Carousel skeleton loader
- **Given** the widget is fetching data
- **When** the loading state is active
- **Then** a skeleton loader MUST display showing the carousel structure
- **And** the skeleton MUST show 3 commit placeholders within a card frame
- **And** the skeleton dimensions MUST match the final card dimensions to prevent layout shift

#### Scenario: Empty repository state
- **Given** a user has no public repositories with commits
- **When** the widget renders
- **Then** the widget MUST display a message: "No recent activity found."
- **And** the message MUST include a link to the user's GitHub profile

#### Scenario: API error state
- **Given** the GitHub API returns an error (non-rate-limit)
- **When** the fetch fails
- **Then** the widget MUST display: "Unable to load GitHub activity. Try again later."
- **And** the widget MUST log the error to the console for debugging

## MODIFIED Requirements

### Requirement: Interaction and Accessibility

Carousel navigation and commit links MUST honour shared motion tokens and remain accessible on touch and pointer devices.

#### Scenario: Motion respects global tokens
- **Given** the user hovers or focuses a repository card
- **When** `prefers-reduced-motion` is disabled
- **Then** the card MAY apply a subtle lift effect using shared motion tokens (translateY ≤ 2px)
- **And** when `prefers-reduced-motion` is enabled, the card MUST fall back to color/border changes only

#### Scenario: Tap targets remain accessible
- **Given** the user interacts via touch
- **When** tapping a commit link or navigation indicator
- **Then** the hit area MUST be ≥44x44pt
- **And** touch feedback MUST inherit existing design system behavior (scale, opacity)

#### Scenario: Keyboard accessibility
- **Given** the carousel has keyboard focus
- **When** using arrow keys to navigate
- **Then** focus MUST move to the next/previous repository card
- **And** pressing Enter/Space on a commit MUST open the commit URL
- **And** focus indicators MUST be visible (2px outline, 2px offset)

### Requirement: Glass Material Treatment

Repository cards and commit entries MUST use the shared glass material tokens for visual consistency.

#### Scenario: Card styling matches design system
- **Given** a repository card is rendered
- **When** inspecting the card styles
- **Then** the card MUST use `border-radius: 28px` (matches widget card radius)
- **And** the card background MUST use `color-mix(in srgb, var(--surface-card) 92%, transparent)`
- **And** the card MUST apply `backdrop-filter: blur(var(--glass-ultra-thin-blur)) saturate(var(--glass-saturation-base))`
- **And** the card MUST use the shared shadow stack: `var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.08)`

#### Scenario: Commit list items use subtle background
- **Given** commits are listed within a card
- **When** viewing commit entries
- **Then** each commit MAY use a subtle background: `color-mix(in srgb, var(--surface-elevated) 40%, transparent)`
- **And** commits MUST NOT use heavy borders or shadows (keep lightweight)

## REMOVED Requirements

### Requirement: Commit Card Layout

**Reason**: The stacked card layout caused vertical expansion and broke page harmony. Replaced by compact commit list within repository carousel cards.

**Migration**: Existing commit card styles will be removed from `github-activity-widget.css`. New compact list styles will be added under `.github-commit-list-item` class.

### Requirement: Loading Feedback (Skeleton matches card sizing)

**Reason**: Loading feedback requirements are superseded by the new carousel skeleton structure.

**Migration**: Replace with "Carousel skeleton loader" scenario under "Loading and Empty States" requirement. Skeleton now shows carousel structure instead of stacked cards.
