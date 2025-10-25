## Why
- On mobile, the Feature Writing widget feels cramped: cards inherit desktop sizing, resulting in narrow columns and truncated content.
- Article metadata (date, read time, badges) is visually dense and hard to parse in one glance.
- The existing component spec folder is empty, so high-level requirements for mobile behavior are undocumented.

## What Changes
- Redesign the mobile presentation to show a single, larger card per slide with full-width content, improved hierarchy, and richer glass depth.
- Introduce a dedicated metadata bar that uses icon+label chips sized for touch, and ensure the “Read” affordance remains aligned to HIG guidelines.
- Refresh spacing, typography, and shadows using existing design tokens—no new color palettes or style primitives.
- Add suporting micro-interactions (parallax tilt, depth glow) gated behind reduced-motion preferences.
- Document the responsive behavior (card sizes, pagination feel, “New” badge treatment) in a real spec so future iterations have a reference.

## Impact
- Updates to `FeatureWritingWidget.tsx` for new markup structure and state (e.g., metadata chips, optional parallax).
- New/updated CSS in `index.astro` (or extracted module) to support enlarged cards, slide spacing, and motion tokens.
- Potential addition of a small helper script for parallax tilt (touch safe, accessible).
- Fresh spec requirements under `feature-writing-widget`.

## Open Questions
- Should we preload hero imagery per article to support richer cards, or keep text-only until we add CMS thumbnails?
- Is the “Read” CTA expected to remain link-only, or do we need a button-style chip for better affordance?
