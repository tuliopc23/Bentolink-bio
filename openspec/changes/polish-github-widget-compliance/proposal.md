## Why

The GitHub Activity widget carousel functions correctly but deviates from the page's overall design quality and Apple HIG compliance standards:
- **Inconsistent materials** - Card glassmorphism and shadows don't fully match the `.widget-box` premium treatment
- **Typography misalignment** - Font sizing and spacing don't leverage the complete design token hierarchy
- **Missing visual polish** - Navigation dots lack proper accent animation, commit cards need enhanced depth
- **Icon inconsistency** - Using text placeholders instead of proper Phosphor icons
- **Missing guidance CTA** - No visual cue to indicate horizontal scroll capability (especially for first-time users)
- **Blue accent bug** - Active pagination dots not showing blue accent color properly

## What Changes

Comprehensively polish and elevate the GitHub widget to production-ready, HIG-compliant quality:

1. **Enhanced Card Materials & Shadows**
   - Upgrade `.github-repo-card` to match `.widget-box` elevation system
   - Apply `--shadow-card`, `--shadow-card-highlight`, `--shadow-card-glow` layering
   - Use `--surface-elevated` (96% opacity) with `--glass-regular-blur`
   - Enhance commit list item shadows and borders for better depth perception
   - Increase border-radius to 28px for premium feel

2. **Typography Excellence**
   - Apply design tokens: `--fs-subheadline`, `--fs-footnote`, `--fs-caption-1`, `--fs-caption-2`
   - Use proper font weights: `--fw-semibold`, `--fw-medium`
   - Apply letter-spacing: `--ls-title`, `--ls-body`
   - Optimize line-height for readability within compact cards

3. **Phosphor Icon Integration**
   - Replace placeholder icons with proper Phosphor icons:
     - `ph-git-branch` for repository
     - `ph-code` for language
     - `ph-star` for stargazers
     - `ph-clock` for commit time
     - `ph-hash` for commit SHA
     - `ph-arrow-up-right` for external links
   - Consistent icon sizing (12px metadata, 14px actions, 16px headers)

4. **Scroll Guidance CTA**
   - Add minimal, non-intrusive CTA above carousel: "Scroll left →"
   - Design: Blue text (`var(--blue)`), subtle arrow icon, light background
   - Auto-hide after first scroll interaction (localStorage persistence)
   - Mobile + desktop visibility (carousel enabled on all screen sizes)
   - Reference design: Clean, inline text prompt with arrow

5. **Pagination Dot Enhancement**
   - Fix blue accent rendering bug (ensure `var(--blue)` applies correctly)
   - Enhance active state: 10px dot with blue glow shadow
   - Smooth scale transitions (1.3x hover, 1.2x active hover)
   - Proper dark theme glow amplification
   - Visible on all screen sizes (remove mobile-only restriction)

6. **Background & Container Polish**
   - Subtle background treatment for carousel track area
   - Enhanced scroll indicators with proper color contrast
   - Smooth scrollbar theming (blue accent on thumb)
   - Touch-optimized scroll behavior preserved

## Impact

**Affected Components:**
- `src/components/GitHubActivity.tsx` - Add CTA component, fix icon rendering, enhance scroll tracking
- `src/styles/github-activity-widget.css` - Comprehensive style overhaul for compliance
- `src/pages/index.astro` - No changes (unless CTA requires Astro component extraction)

**Affected Specs:**
- Modified: `github-activity-widget` - Add polish requirements to existing carousel spec

**Design System Alignment:**
- Uses tokens from: `colors.css`, `typography.css`, `spacing.css`, `shadows.css`, `materials.css`
- Matches patterns from: `ProfileCard.astro`, `ScrollIndicator.astro`, `.widget-box` styles
- Follows conventions in: `openspec/project.md` (Apple HIG section)

**No Breaking Changes:**
- Pure visual enhancement, no API or data structure changes
- Maintains existing carousel navigation behavior
- Preserves accessibility attributes and keyboard navigation

## Success Criteria

- [ ] All GitHub widget cards match `.widget-box` material quality
- [ ] Typography uses design tokens throughout (no hardcoded sizes)
- [ ] All icons are proper Phosphor icons (no placeholders)
- [ ] Scroll CTA appears and auto-hides after interaction
- [ ] Blue accent dots visible and animated correctly
- [ ] Passes Biome lint/format checks
- [ ] Passes TypeScript strict mode checks
- [ ] Visual QA: Widget indistinguishable from page quality standard
