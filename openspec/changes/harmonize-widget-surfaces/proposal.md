## Why
- The Tools widget and the socials row still use older, heavier drop-shadows and tight padding that clash with the refreshed writing widget cards.
- GitHub activity entries present as narrow list rows with cramped metadata, breaking the cohesive card language and touch ergonomics established elsewhere.
- Bringing these legacy surfaces in line with the new glass tokens will improve visual harmony without altering overall widget footprints.

## What Changes
- Refine `DockLink` and shared `IconTile` styling to use the updated glass material/shadow tokens while keeping existing tile sizing.
- Apply the same refinements to the socials icon row so both grids stay visually synced.
- Redesign the GitHub activity list into stacked cards with generous padding, metadata chips, and consistent hover/touch behaviour—keeping the widget’s bounding box unchanged.

## Impact
- Styling updates across `src/components/DockLink.astro`, `src/components/IconTile.astro`, shared shadow tokens, and the GitHub activity component/CSS.
- Removal of legacy GitHub list styles from `src/pages/index.astro` in favour of a dedicated stylesheet.

## Open Questions
- None—scope limited to aesthetic refinements and markup structure within existing widgets.
