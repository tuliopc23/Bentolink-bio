# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

All commands use **Bun** as the package manager (see `bun.lock` at root).

**Development:**
- `bun run dev` – Start Astro dev server (runs on `http://localhost:4321` or next available port)

**Build & Preview:**
- `bun run build` – Create production build to `./dist/`
- `bun run preview` – Preview the built site locally

**Code Quality (Biome):**
- `bun run lint` – Lint all files (TypeScript, JSX, JSON)
- `bun run format` – Format and fix code according to Biome rules
- `bun run check` – Alias for Biome check with write mode

**Environment Setup (fish):**
```fish
env PUBLIC_GITHUB_TOKEN=<your-token> PUBLIC_GITHUB_USERNAME=<your-username> bun run dev
```

## High-Level Architecture

### Astro + SolidJS Islands

The site uses Astro (v5.14.6) with SolidJS integration for interactive components. Pages are `.astro` files (static SSR), and interactive islands are SolidJS components (`.tsx`) hydrated with `client:load` (see `src/pages/index.astro:139` for example: `<GitHubActivity username="tuliopc23" client:load />`).

**Route convention:** Astro file-based routing from `src/pages/` directory (currently single page at `src/pages/index.astro`).

### Design Tokens (src/styles/tokens/)

All design values—colors, typography, spacing, motion, shadows, materials—are defined as CSS custom properties in token files:
- `colors.css` – Theme colors (dark/light modes)
- `typography.css` – Font sizes, line heights, letter spacing
- `spacing.css` – 8px baseline grid
- `animations.css` – Spring easing curves
- `materials.css` – Glass blur/saturation values
- `shadows.css` – Elevation shadows

Tokens are imported globally in `src/styles/theme.css:1-6` and consumed in component scoped styles. Example token usage from `theme.css:10`:
```css
:root {
  --font-sans: "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --fs-hero: var(--fs-large-title);
  --glass-blur-base: 28px;
  ...
}
```

### Components

**Structure:**
- `src/components/` – Reusable Astro and SolidJS components
  - Astro: `ProfileCard.astro`, `Card.astro`, `DockLink.astro`, `IconTile.astro`, `ProfileHeader.astro`
  - SolidJS: `GitHubActivity.tsx`, `FeatureWritingWidget.tsx` (client-side interactivity)
- `src/layouts/` – `Base.astro` – root layout with theme toggle and motion scripts
- `src/scripts/` – `motion.ts` (scroll-reveal via IntersectionObserver), `theme.ts` (dark/light switching)

**No path aliases**; imports use relative paths.

### GitHub Activity Integration

**Location:** `src/components/GitHubActivity.tsx` – SolidJS component

**Runtime:** Client-side fetch (hydrated with `client:load`). Data is fetched on every page load via GitHub REST API with 5-minute auto-refresh interval (line 184-190).

**Environment variables:**
```
PUBLIC_GITHUB_TOKEN=ghp_... (Personal Access Token)
PUBLIC_GITHUB_USERNAME=tuliopc23 (Display username)
```

**Behavior:**
- Fetches user events from `https://api.github.com/users/{username}/events?per_page=100`
- Filters push events from last 3 months
- Returns: total commits, unique repos, latest commit date, and first 3 commit messages
- **Error handling:** Falls back to `{ totalCommits: 0, repositories: 0, lastCommitDate: "N/A" }` on API errors (401, 403, etc.)
- **No caching** – each load triggers fresh API call. Rate limit: 60 req/hr (unauthenticated) or 5000 req/hr (authenticated).

## Configuration & Design

### .env

No `.env.example` file in repository. Create `.env` manually with:
```
PUBLIC_GITHUB_TOKEN=<your-github-personal-access-token>
PUBLIC_GITHUB_USERNAME=<your-github-username>
```

The `PUBLIC_` prefix makes these available to the browser at build time via `import.meta.env`.

### Biome Setup

**Config file:** `biome.json` (v2.2.6)

**Key settings:**
- Formatter: tab indentation, 100 char line width
- Linter: recommended rules + custom rule overrides (off: `a11y/noSvgWithoutTitle`, `complexity/noForEach`, `style/useTemplate`)
- VCS integration: enabled (respects `.gitignore`)

**Execution via package.json scripts** (preferred); direct CLI also works.

### Tooling & Versions

- **Package manager:** Bun 1.3.0 (or higher)
- **Node:** No explicit engine constraint in `package.json`
- **Astro:** 5.14.6
- **SolidJS:** 1.9.9
- **TypeScript:** 5.9.3 (strict mode via `tsconfig.json extends astro/tsconfigs/strict`)

### Design Principles

- **Apple HIG alignment:** SF Pro Display and SF Mono typography, rounded-square icons (16px border radius), color gradients
- **Glass morphism:** Backdrop-filter with dynamic blur and saturation (see `src/styles/tokens/materials.css`)
- **Spring-based motion:** Custom cubic-bezier easing (e.g., `cubic-bezier(0.28, 0.88, 0.42, 1.08)`) for smooth, responsive animations
- **Scroll-reveal animations:** Intersection Observer (`src/scripts/motion.ts`) with staggered `data-reveal` attributes on components
- **Accessibility:** Respects `prefers-reduced-motion` (motion.ts:9-16); semantic HTML and ARIA labels throughout

## Icon System (Phosphor Icons)

**Library:** `@phosphor-icons/web` (v2.1.2) – SF Symbol-like web components

**Apple HIG Compliance:**
- ✅ Rounded strokes (stroke-linecap: round, stroke-linejoin: round)
- ✅ 24×24px base grid with optical sizing
- ✅ Weight system matching SF Symbols (Regular = 2px stroke)
- ✅ Color inheritance via `currentColor`
- ✅ Smooth antialiasing and transitions

### Usage

**Direct CSS classes (in .astro files):**
```astro
<!-- Regular weight (default) -->
<i class="ph ph-github-logo" aria-hidden="true"></i>

<!-- Bold weight -->
<i class="ph-bold ph-heart" aria-hidden="true"></i>

<!-- Fill style -->
<i class="ph-fill ph-star" aria-hidden="true"></i>

<!-- Custom size via font-size -->
<i class="ph ph-arrow-right" style="font-size: 24px;" aria-hidden="true"></i>
```

**Icon wrapper component (recommended for consistency):**
```astro
---
import Icon from '../components/Icon.astro';
---
<Icon name="arrow-up-right" size={20} weight="regular" />
<Icon name="heart" size={24} weight="bold" color="var(--color-primary)" />
```

**Available weights:**
- `thin` (1px stroke) – Delicate UI elements
- `light` (1.5px stroke) – Secondary icons
- `regular` (2px stroke) – **Primary/default** (SF Symbol Regular equivalent)
- `bold` (2.5px stroke) – Emphasis
- `fill` – Solid fills
- `duotone` – Two-tone style

**Size tokens** (`src/styles/theme.css`):
```css
--icon-size-xs: 16px;  /* Small inline icons */
--icon-size-sm: 20px;  /* Body text level */
--icon-size-md: 22px;  /* Heading level (title-2) */
--icon-size-lg: 24px;  /* Large headings */
--icon-size-xl: 28px;  /* Hero elements */
```

**Spacing tokens:**
```css
--icon-gap: 8px;        /* Standard icon-text gap (8px grid) */
--icon-gap-tight: 6px;  /* Tight layouts */
--icon-gap-loose: 12px; /* Loose layouts */
```

### Best Practices

**✅ DO use Phosphor for:**
- UI utility icons (arrows, chevrons, status indicators)
- Navigation hints (external link arrows)
- System icons (search, settings, info)
- Inline decorative icons (like GitHub widget header)

**❌ DON'T replace:**
- Brand logos (Ghostty, Neovim, Xcode, etc.) – keep custom SVGs
- Social media icons – maintain current assets
- Profile imagery or illustrations

**Global import:** Icons are auto-loaded in `src/layouts/Base.astro:4` – no per-component imports needed.

**Browse icons:** https://phosphoricons.com/

## References

**External Docs:**
- Astro: https://docs.astro.build
- SolidJS: https://docs.solidjs.com/latest
- Biome: https://biomejs.dev/reference/
- GitHub REST API: https://docs.github.com/en/rest

**Local Docs:**
- `README.md` – Generic Astro starter info (can be updated)
- `apple hig guide.md` – Design reference document in repo root
- Recent refactor: `PROFILE_CARD_REFACTOR_SUMMARY.md` – layout and component changes

---

**Last verified:** 2025-10-19  
**Commands tested:** `bun run dev`, `bun run build`, `bun run lint`
