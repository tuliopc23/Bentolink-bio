## 1. Implementation
- [x] 1.1 Audit current FeatureWritingWidget markup/styles and carve out reusable CSS module for widget-specific rules.
- [x] 1.2 Implement enlarged mobile card layout: single-slide width, widened padding, updated typography hierarchy.
- [x] 1.3 Replace metadata footer with icon+label chips and ensure badges / CTA respect 44x44pt tap targets.
- [x] 1.4 Add optional depth interaction (parallax / hover) gated behind reduced-motion preference check.
- [x] 1.5 Refresh carousel spacing and snap behavior so the larger cards feel centered and don’t clip content.

## 2. Quality
- [x] 2.1 Add automated regression coverage for the post transformation logic (excerpt truncation, metadata) supporting the refreshed layout.
- [ ] 2.2 Manual QA on iOS Safari and Android Chrome to confirm readability, snap feel, and reduced-motion fallback.

## 3. Documentation
- [x] 3.1 Add/Update `feature-writing-widget` spec to capture responsive card sizing, metadata presentation, and motion behavior.
