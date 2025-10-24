## Why
- The current page relies on swipe guidance and a dot indicator, which makes discovery of each widget slower, especially on mobile.
- There is no lightweight way to jump between hero, tools, GitHub, and writing sections once the user scrolls.
- The project needs a final UX refinement pass before production that improves navigation without overhauling the existing visual style.

## What Changes
- Add a Section Quick Nav that lists the four primary content groups (Profile, Tools, GitHub, Writing) and smooth-scrolls to each anchor.
- Keep the nav inline beneath the hero on all breakpoints; on narrow viewports it becomes a compact pill row with horizontal scroll, avoiding sticky chrome.
- Highlight the active section with IntersectionObserver updates, syncing `aria-current` and providing optional light haptics on supported devices.
- Include a “Back to top” chip inside the nav so users can quickly return to the hero without introducing new UI chrome.
- Respect reduced-motion preferences and reuse existing design tokens instead of introducing a new style language.

## Impact
- New `SectionQuickNav` component plus associated script for section tracking.
- Updates to `src/pages/index.astro` to add section anchors and integrate the quick nav.
- Minor adjustments to existing touch optimizations so the inline nav behaves well with the carousel and maintains 44x44pt hit areas.

## Open Questions
- Should the “Back to top” chip stay visible at all times or only after the user scrolls past the hero?
- Do we need analytics tracking on nav interactions before launch?
