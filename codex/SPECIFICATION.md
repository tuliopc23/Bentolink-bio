# Bentolink Project Specification

**Status**: Initial  
**Date**: January 2025  
**Framework**: Astro 5.x (latest stable)  
**Package Manager**: Bun  
**Inspired by**: tulio-personal-website (Apple HIG aesthetic, Tahoe 26 liquid glass)

---

## Project Overview

Bentolink is a **single-page, mobile-first link-in-bio web app** built with Astro. The design is deeply inspired by Apple's Human Interface Guidelines, featuring:

- Clean Apple-inspired aesthetics with liquid glass materials (Tahoe 26 spec)
- Smooth spring-based animations and motion system
- Mobile-first responsive layout with excellent desktop presentation
- Single root page (no multi-page routing)
- Dark/light theme toggle with persistent storage
- Local icon assets (no external icon fetching)

---

## Core Requirements

### Tech Stack
- **Framework**: Astro 5.x (latest)
- **Package Manager**: Bun (1.2.x+)
- **Styling**: CSS-in-Astro (using design tokens, no Tailwind/UnoCSS)
- **Fonts**: SF Pro Display and SF Mono via CDN (fontapi.ir) with system font fallbacks
  - SF Pro Display: Main UI font for all text
  - SF Mono: Monospace font for GitHub widget and code
- **No external dependencies** for icons—all stored in `/public`

### File Structure
```
Bentolink/
├── public/
│   ├── icons/              # Local SVG/WEBP icons for links and tools
│   ├── favicon-dark.svg
│   └── favicon-light.svg
├── src/
│   ├── pages/
│   │   └── index.astro     # Single root page (link-in-bio layout)
│   ├── layouts/
│   │   └── Base.astro      # Base layout with head, minimal topbar, footer, theme system
│   ├── components/
│   │   ├── ProfileHeader.astro  # Centered profile with avatar, name, title
│   │   ├── Card.astro      # Link card component (link-in-bio style)
│   │   ├── IconTile.astro  # Icon wrapper with tint system
│   │   └── LiquidThemeToggle.astro  # Draggable/tappable theme toggle
│   ├── styles/
│   │   ├── theme.css       # Design tokens, typography, spacing, motion
│   │   ├── tokens/
│   │   │   ├── colors.css  # Color system (dark/light modes)
│   │   │   └── shadows.css # Shadow token definitions
│   │   ├── motion.css      # Animation utilities and reveal system
│   │   └── section.css     # Section/container layout utilities
│   └── scripts/
│       ├── theme.ts        # Theme controller (localStorage + system pref)
│       ├── motion.ts       # Scroll reveal and motion utilities
│       └── web-vitals.ts   # Performance monitoring (dev)
├── astro.config.mjs
├── package.json
├── bun.lockb
└── tsconfig.json
```

---

## Design System

### Colors (Dark Mode Default)

Based on `tulio-personal-website/src/styles/tokens/colors.css`:

**Base colors:**
- `--bg`: #050505 (deepest background)
- `--surface`: #161618 (elevated surface)
- `--surface-elevated`: #1d1d20 (cards)
- `--text`: #f5f5f7 (primary text)
- `--muted`: rgba(235, 235, 245, 0.65) (secondary text)
- `--panel-border`: rgba(255, 255, 255, 0.12) (subtle borders)

**Apple system colors (vibrant):**
- `--blue`: #0d8aff
- `--green`: #30d948
- `--indigo`: #5e5ce8
- `--teal`: #5fd4ff
- `--orange`: #ffa00d
- `--pink`: #ff3861
- `--purple`: #c25bf4
- `--red`: #ff473c
- `--yellow`: #ffd70d
- `--brown`: #ac8e68
- `--cyan`: #5ac8fa

**Tint system:**
Each link card can specify a `tint` prop (e.g., `"blue"`, `"orange"`, `"indigo"`) which applies matching icon tile background and hover accent.

### Typography

**Font loading from CDN (fontapi.ir):**

Load fonts in `<head>` of `Base.astro` using these exact links:

```html
<!-- SF Pro Display (main UI font) -->
<link rel="preconnect" href="//fdn.fontcdn.ir">
<link rel="preconnect" href="//v1.fontapi.ir">
<link href="https://v1.fontapi.ir/css/SFProDisplay" rel="stylesheet">

<!-- SF Mono (monospace for code/GitHub widget) -->
<link rel="preconnect" href="//fdn.fontcdn.ir">
<link rel="preconnect" href="//v1.fontapi.ir">
<link href="https://v1.fontapi.ir/css/SFMono" rel="stylesheet">
```

**Alternative @import syntax** (if using in CSS):
```css
@import url('https://v1.fontapi.ir/css/SFProDisplay');
@import url('https://v1.fontapi.ir/css/SFMono');
```

**Font stack** (in `theme.css`):
```css
--font-sans: "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-mono: "SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace;
```

**Usage:**
- **SF Pro Display**: All UI text (headings, body, buttons, labels)
- **SF Mono**: GitHub widget, code blocks, monospace contexts

**Font families in CSS:**
```css
/* For main UI */
font-family: "SF Pro Display", sans-serif;

/* For GitHub widget and code */
font-family: "SF Mono", sans-serif;
```

**Scales:**
- `--fs-hero`: clamp(2.4rem, 4.2vw + 1.3rem, 3.25rem) — large display title
- `--fs-h2`: clamp(1.75rem, 2.4vw + 1.15rem, 2.55rem)
- `--fs-h3`: clamp(1.24rem, 1.5vw + 0.98rem, 1.88rem)
- `--fs-0`: clamp(1.0625rem, 1vw + 0.95rem, 1.2rem) — body baseline (17px iOS)
- `--fs--1`: clamp(0.875rem, 0.8vw + 0.75rem, 1rem) — small text
- `--fs--2`: clamp(0.75rem, 0.6vw + 0.6875rem, 0.875rem) — caption

**Line heights:**
- `--lh-hero`: 1.08 (tight for large display)
- `--lh-heading`: 1.2 (standard heading)
- `--lh-base`: 1.65 (long-form reading)
- `--lh-compact`: 1.45 (UI text)

**Letter spacing (Apple HIG WWDC 2020):**
- `--ls-hero`: -0.039em
- `--ls-h2`: -0.025em
- `--ls-h3`: -0.015em
- `--ls-body`: -0.010em
- `--ls-eyebrow`: 0.06em (uppercase labels)

### Spacing (8px baseline grid)

```
--space-xxs: 8px   (1x)
--space-xs:  12px  (1.5x)
--space-sm:  16px  (2x)
--space-md:  24px  (3x)
--space-lg:  32px  (4x)
--space-xl:  48px  (6x)
--space-2xl: 64px  (8x)
--space-3xl: 80px  (10x)
```

Golden ratio multipliers also available (`--space-golden-1` through `--space-golden-4`).

### Border Radius (Tahoe 26)

```
--radius-xs: 6px
--radius-sm: 12px
--radius-md: 20px
--radius-lg: 32px
--radius-xl: 40px
```

### Motion System (Spring-based, WWDC 2023/2025)

**Durations:**
- `--motion-duration-instant`: 100ms
- `--motion-duration-xs`: 120ms
- `--motion-duration-sm`: 180ms
- `--motion-duration-md`: 240ms
- `--motion-duration-lg`: 280ms

**Spring durations (longer for natural physics):**
- `--motion-duration-spring-xs`: 240ms
- `--motion-duration-spring-sm`: 320ms
- `--motion-duration-spring-md`: 420ms
- `--motion-duration-spring-lg`: 520ms

**Easing curves:**
- `--motion-ease-out`: cubic-bezier(0.2, 0.68, 0.32, 1)
- `--spring-snappy`: cubic-bezier(0.16, 1.04, 0.32, 0.98)
- `--spring-bouncy`: cubic-bezier(0.18, 0.89, 0.32, 1.28)
- `--spring-smooth`: cubic-bezier(0.28, 0.88, 0.42, 1.08)
- `--spring-responsive`: cubic-bezier(0.22, 0.94, 0.38, 1.12)

**Transforms:**
- `--motion-scale-card`: 1.024 (hover lift)
- `--motion-scale-active`: 0.984 (press-down)

**Respect `prefers-reduced-motion: reduce`** — disable all animations for accessibility.

### Glass Materials (Tahoe 26 Liquid Glass)

**Base glass (regular):**
- `--glass-blur-base`: 28px
- `--glass-opacity-base`: 72%
- `--glass-saturation-base`: 2.1

**Variants:**
- **Ultra-thin**: blur 12px, opacity 60%, saturation 1.6
- **Thin**: blur 20px, opacity 68%, saturation 1.9
- **Regular**: blur 28px, opacity 72%, saturation 2.1
- **Thick**: blur 36px, opacity 80%, saturation 2.3
- **Ultra-thick**: blur 48px, opacity 90%, saturation 2.5
- **Frosted**: blur 64px, opacity 92%, saturation 2.8 (intense)
- **Crystal**: blur 18px, opacity 65%, saturation 2.6, brightness 1.08

**Apply using:**
```css
backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--glass-regular-saturation));
background: rgba(29, 29, 32, var(--glass-regular-opacity));
```

### Shadows (`tokens/shadows.css`)

Cards should use:
- `--shadow-card`: subtle elevation shadow
- `--shadow-card-hover`: deeper shadow on hover

---

## Page Layout & Components

### Root Page (`index.astro`)

**Link-in-Bio Best Practices:**

Following industry standards (Linktree, Beacons, Bento, etc.), the page uses a **centered, vertical layout** optimized for mobile-first viewing:

**Structure:**

1. **Profile Header** (centered):
   - **Avatar**: Circular profile image (120-160px diameter)
     - Placeholder until user provides image
     - Border with subtle shadow for depth
     - Responsive sizing (smaller on mobile)
   - **Name**: "Tulio Cunha" (bold, large text)
     - Font: SF Pro Display, Semibold/Bold
     - Size: `--fs-h2` (clamp responsive)
   - **Title/Description**: "Full Stack Developer" (medium weight)
     - Font: SF Pro Display, Regular/Medium
     - Size: `--fs-0` or `--fs--1`
     - Muted color for hierarchy
   - Optional: Brief bio line (1-2 sentences max)

2. **Links Section** (primary content):
   - **Vertical stack** of interactive `Card` components on mobile
   - **Grid layout** (2-3 columns) on desktop/tablet
   - Each card has:
     - `title`: Link label (e.g., "GitHub", "Portfolio", "Blog")
     - `body`: Short description (1 line recommended)
     - `href`: External or internal URL
     - `tint`: Color accent ("blue", "indigo", "orange", etc.)
     - `icon` or `iconAsset`: path to local icon in `/public/icons/`
     - Optional `cta`: Call-to-action text (e.g., "Visit →")
   - Cards are full-width on mobile with consistent height
   - Smooth scroll reveals with stagger effect

**Link-in-Bio Layout Best Practices:**
- **Centered alignment**: All content centered horizontally for focus
- **Generous spacing**: Use `--space-lg` to `--space-xl` between sections
- **Mobile-first**: Single column, full-width cards on mobile
- **Desktop enhancement**: 2-3 column grid on larger screens (>768px)
- **Clear hierarchy**: Profile → Links → Footer
- **Minimal chrome**: No heavy navigation, focus on links
- **Fast loading**: Optimize images, use system fonts

**Example Profile Data:**
```js
const profile = {
  name: "Tulio Cunha",
  title: "Full Stack Developer",
  bio: "Building elegant solutions with code.", // Optional
  avatarSrc: "/avatar.jpg", // Placeholder until provided
};
```

**Example Card Data:**
```js
const linkCards = [
  {
    title: "GitHub",
    body: "Explore my open source projects.",
    href: "https://github.com/tuliopc23",
    tint: "indigo",
    iconAsset: "/github-dark.svg",
  },
  {
    title: "Portfolio",
    body: "View my professional work.",
    href: "https://portfolio.tuliocunha.dev",
    tint: "cyan",
    iconAsset: "/portfolio-macos.svg",
  },
  {
    title: "Instagram",
    body: "Follow my creative journey.",
    href: "https://instagram.com/tuliopinheirocunha",
    tint: "pink",
    iconAsset: "/instagram-light.svg",
  },
  {
    title: "LinkedIn",
    body: "Connect professionally.",
    href: "https://linkedin.com/in/tuliocunha",
    tint: "blue",
    iconAsset: "/linkedin-light.svg",
  },
  {
    title: "Email",
    body: "Get in touch.",
    href: "mailto:contact@tuliocunha.dev",
    tint: "orange",
    iconAsset: "/Email.webp",
  },
];
```

### Base Layout (`Base.astro`)

**Responsibilities:**
- HTML head with meta tags, Open Graph, structured data.
- Theme system initialization (inline script before CSS to prevent FOUC).
- CDN font links (exact syntax from fontapi.ir):
  ```html
  <link rel="preconnect" href="//fdn.fontcdn.ir">
  <link rel="preconnect" href="//v1.fontapi.ir">
  <link href="https://v1.fontapi.ir/css/SFProDisplay" rel="stylesheet">
  <link href="https://v1.fontapi.ir/css/SFMono" rel="stylesheet">
  ```
- Topbar with branding and theme toggle.
- Footer with copyright and links.
- Import motion, theme, and web-vitals scripts.

**Topbar:**
- Personal icon/avatar or brand logo.
- Name and subtitle.
- Theme toggle button (liquid draggable toggle component).

**Footer:**
- Brief about paragraph.
- Links to key pages/sections.
- Copyright notice.

### ProfileHeader Component (`ProfileHeader.astro`)

**Props:**
- `name: string` — Full name (e.g., "Tulio Cunha")
- `title: string` — Professional title/tagline (e.g., "Full Stack Developer")
- `bio?: string` — Optional brief description (1-2 sentences)
- `avatarSrc?: string` — Path to avatar image (defaults to placeholder)

**Layout:**
- Centered container with max-width constraint
- Vertical flex column with centered alignment
- Avatar at top (circular, 120-160px)
- Name below (large, bold)
- Title below (medium, muted)
- Optional bio below (small, more muted)

**Styling:**
- Avatar: circular with border and subtle shadow
- Spacing: `--space-md` to `--space-lg` between elements
- Text alignment: center
- Responsive: smaller avatar and text on mobile

### Card Component (`Card.astro`)

**Props:**
- `href?: string` — if provided, render as `<a>`, else `<div>` with `role="presentation"` and `.card--static` class.
- `title: string`
- `body: string`
- `tint: string` — maps to CSS variable (e.g., `--blue`, `--orange`).
- `icon?: string` — icon name (for icon library, if used).
- `iconAsset?: string` — path to local asset in `/public`.
- `cta?: string` — call-to-action text (e.g., "Visit →").
- `revealGroup?: string`, `revealOrder?: number` — for scroll-reveal animation.

**Behavior:**
- Hover: lift transform (`translateY(-2px)`), deeper shadow, subtle scale.
- Click: ripple effect (if not `prefers-reduced-motion`).
- Focus: visible outline for accessibility.
- Full-width on mobile for easy tapping

**Styling:**
- Border radius: `--radius-md` (20px).
- Border: `--panel-border` (dark mode), `--color-light-border` (light mode).
- Background: translucent surface with optional glass blur.
- Padding: `clamp(var(--space-sm), 2vw, var(--space-md))`.
- Min-height for consistent card sizing
- Link-in-bio specific: horizontal layout (icon left, content right)

### IconTile Component (`IconTile.astro`)

**Props:**
- `tint: string`
- `label: string` (for accessibility)
- `icon?: string | null`
- `asset?: string | null` (path to local icon)

**Rendering:**
- Small colored tile (e.g., 56px × 56px) with border-radius `--radius-sm`.
- Background: tint color at low opacity (e.g., `rgba(var(--blue-rgb), 0.12)`).
- Icon: centered, white or tint-colored.
- If `asset` provided, render as `<img src={asset}>`.

### Theme Toggle (`LiquidThemeToggle.astro`)

**Features:**
- Interactive button that can be tapped or dragged horizontally.
- Visual fill percentage (`--complete`) animates from 0% (light) to 100% (dark).
- On tap: instant toggle.
- On drag: draggable slider, sets theme based on final position (threshold at 50%).
- Persists choice to `localStorage.theme`.
- Respects `prefers-color-scheme` if no stored preference.
- Respects `prefers-reduced-motion`: disables drag animation if reduced motion is preferred.

**Implementation:**
- See `tulio-personal-website/src/layouts/Base.astro` lines 661–854 for full ThemeController and initLiquidThemeToggle logic.
- Controller exposed as `window.themeController` with:
  - `getTheme()`: returns `"light"` or `"dark"`
  - `setTheme(theme, { persist: boolean })`
  - `toggleTheme({ persist: boolean })`
  - `subscribe(callback)`: listen to theme changes

---

## Scroll Reveal System

**From `motion.css` and `motion.ts` scripts:**

Components can opt into scroll-triggered animations using data attributes:
- `data-reveal`: marks element for reveal animation.
- `data-reveal-type`: `"scale"`, `"slide"`, or `"fade"` (default).
- `data-reveal-group`: group name for coordinated reveals.
- `data-reveal-order`: numeric order within group (for staggered reveals).

**Intersection Observer** watches elements with `data-reveal` and adds `.is-revealed` class when entering viewport.

**Default behavior:**
- Elements start with reduced opacity and slight transform.
- On reveal: animate to full opacity and no transform.
- Timing: `--motion-duration-md` with `--spring-smooth` easing.

**Respect `prefers-reduced-motion: reduce`**: reveal instantly without animation.

---

## Icons and Assets

### Local Icons in `/public`

Bentolink uses **local SVG and WEBP icons only**—no external icon libraries or CDN fetches.

**Current assets in `/public`:**
```
Apple Containerization_upscayl_2x_digital-art-4x.svg
calendar-light.svg
Codeedit_upscayl_2x_digital-art-4x_wrapped.svg
Email.webp
fiverr.svg
Ghostty Dark_upscayl_2x_digital-art-4x_wrapped.svg
github-dark.svg
instagram-light.svg
kaleidospoce_upscayl_2x_digital-art-4x.svg
linkedin-dark.svg
linkedin-light.svg
Location.svg
neovimlight_upscayl_2x_digital-art-4x_wrapped.svg
portfolio-macos.svg
Tower.svg
Transmit_upscayl_2x_digital-art-4x.svg
xcodelogh_upscayl_2x_digital-art-4x.svg
```

**Naming conventions:**
- Use kebab-case (e.g., `github-dark.svg`, `email.webp`).
- Add `-light` or `-dark` suffix if theme-specific.

**Loading:**
Cards reference icons like:
```astro
<Card
  title="GitHub"
  iconAsset="/github-dark.svg"
  ...
/>
```

No need for `<img>` imports or icon components—render directly as `<img src={iconAsset}>` inside `IconTile`.

---

## Scripts and Utilities

### Theme System (`scripts/theme.ts`)

**Responsibilities:**
- Initialize theme from `localStorage.theme` or `prefers-color-scheme`.
- Apply `data-theme` attribute to `<html>` (`"dark"` or `"light"`).
- Add corresponding class (`.dark` or `.light`) to `<html>` for any conditional styling.
- Update favicon based on theme (`/favicon-dark.svg` vs `/favicon-light.svg`).
- Expose `window.themeController` API for components.

**Inline script in `<head>`:**
Must run **before** CSS to prevent FOUC (Flash of Unstyled Content).

### Motion System (`scripts/motion.ts`)

**Responsibilities:**
- Set up Intersection Observer for `[data-reveal]` elements.
- Add `.is-revealed` class when element enters viewport (with threshold, e.g., 10%).
- Handle `data-reveal-group` and `data-reveal-order` for staggered reveals.
- Respect `prefers-reduced-motion: reduce`—skip animations.

**Parallax scrolling (optional):**
If hero section has gradient background, apply scroll-linked parallax:
```js
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const parallaxOffset = scrollY * 0.3; // velocity factor
  hero.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
}, { passive: true });
```

### Web Vitals (`scripts/web-vitals.ts`)

**Optional, dev-only:**
Monitor Core Web Vitals (LCP, FID, CLS) using `web-vitals` library or manual `PerformanceObserver`.

Log results to console for performance debugging.

---

## Responsive Design

### Breakpoints (implicit, fluid)

Use `clamp()` and relative units to achieve mobile-first fluid design without hard breakpoints where possible.

**Common media query thresholds (from tulio-personal-website):**
- `max-width: 1100px` — tablet layout adjustments
- `max-width: 820px` — mobile layout (single-column grids)
- `max-width: 520px` — compact mobile (reduce padding, font sizes)

### Grid Layout

**Link-in-Bio Layout:**

**Mobile (default, <768px):**
- Single column, full-width cards
- Vertical stack with consistent gaps (`--space-md`)
- Profile header centered at top
- Cards: `width: 100%`, `max-width: 600px`, centered
- No horizontal scrolling needed

**Tablet (768px-1024px):**
- 2-column card grid: `repeat(2, 1fr)`
- Profile header remains centered
- Gap: `clamp(var(--space-sm), 2vw, var(--space-md))`
- Cards maintain aspect ratio

**Desktop (>1024px):**
- 2-3 column card grid: `repeat(auto-fit, minmax(280px, 1fr))`
- Max container width: 1000px, centered
- Profile header slightly larger
- Gap: `var(--space-md)` to `var(--space-lg)`

**Profile Header:**
- Always centered horizontally
- Avatar scales: 100px (mobile) → 140px (tablet) → 160px (desktop)
- Text scales with viewport using `clamp()`
- Spacing below: `--space-xl` to `--space-2xl`

---

## Accessibility

- **Semantic HTML:** Use `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`.
- **ARIA labels:** All interactive elements have `aria-label` or visible text.
- **Keyboard navigation:** Cards are focusable with visible focus ring.
- **Color contrast:** Meet WCAG AA standards (minimum 4.5:1 for text).
- **Reduced motion:** Respect `prefers-reduced-motion: reduce` — disable animations and transitions.
- **Screen readers:** Include sr-only skip-to-content link.

---

## Build & Deploy

### Scripts (from `package.json` inspiration)

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "tsc --noEmit",
    "lint": "biome lint .",
    "lint:fix": "biome lint --write .",
    "format": "biome format --write .",
    "format:check": "biome format .",
    "check": "biome check --write . && bun run typecheck && bun run build"
  }
}
```

### Dependencies (minimal)

**Runtime:**
- `astro` (latest 5.x)
- No external CSS framework (styles are hand-crafted).
- No JS framework needed (pure Astro components).

**Dev:**
- `@biomejs/biome` (linter + formatter, faster than ESLint + Prettier).
- `typescript` (for type checking).

**Optional:**
- `@astrojs/mdx` if you plan to include markdown content.

---

## Implementation Checklist

1. **Bootstrap Astro project:**
   ```sh
   bun create astro@latest . -- --template minimal --typescript strict --git
   ```

2. **Set up directory structure:**
   - Create `/src/layouts/`, `/src/components/`, `/src/styles/`, `/src/scripts/`.
   - Create `/public/icons/` (move existing icons there if needed).

3. **Port design tokens:**
   - Copy `theme.css`, `tokens/colors.css`, `tokens/shadows.css` from tulio-personal-website.
   - Adjust paths and imports for Bentolink structure.

4. **Port Base layout:**
   - `Base.astro` with head setup, theme initialization, topbar, footer.
   - Include CDN font links (fontapi.ir for SF Pro Display, SF UI Text, SF Mono).
   - Import theme, motion, web-vitals scripts.

5. **Port Card and IconTile components:**
   - `Card.astro` with props for href, title, body, tint, icon, cta, reveal attributes.
   - `IconTile.astro` for icon rendering with tint system.

6. **Port LiquidThemeToggle component:**
   - `LiquidThemeToggle.astro` with draggable/tappable toggle logic.
   - Integrate with theme controller in Base layout.

7. **Build root page (`index.astro`):**
   - Hero section (optional).
   - ProfileCard section (optional, if desired).
   - Links section: grid of Card components with local icon assets and hrefs.

8. **Port motion system:**
   - `motion.css` with reveal animations.
   - `motion.ts` script for Intersection Observer and scroll reveal.

9. **Port theme system:**
   - Inline script in `<head>` to prevent FOUC.
   - `theme.ts` for ThemeController and localStorage management.

10. **Test and verify:**
    - Run `bun run dev` and verify all cards render correctly.
    - Test theme toggle (tap and drag).
    - Test scroll reveal animations.
    - Test on mobile devices (responsive layout).
    - Test with `prefers-reduced-motion: reduce`.

11. **Optimize and deploy:**
    - Run `bun run build` to generate static site.
    - Deploy to hosting (Vercel, Netlify, Cloudflare Pages, etc.).

---

## Open Questions & Next Steps

**Content Structure (Confirmed):**
- ✅ Centered profile header with avatar, name ("Tulio Cunha"), and title ("Full Stack Developer")
- ✅ Vertical stack of link cards (mobile-first)
- ✅ Grid layout on larger screens (2-3 columns)
- ✅ No heavy navigation or sidebar (link-in-bio focused)
- ✅ Optional: Simple footer with copyright

**Profile Data:**
- **Name**: Tulio Cunha
- **Title**: Full Stack Developer
- **Avatar**: Placeholder initially (circular, 120-160px)
- **Optional bio**: Brief 1-2 line description

**Next actions:**
1. Set up Astro project and directory scaffolding.
2. Port design tokens and components from tulio-personal-website.
3. Create ProfileHeader component with centered layout.
4. Create simplified Card component for link-in-bio style.
5. Build root page with profile + links structure.
6. Populate with user's actual links and local icons.
7. Test responsive layout (mobile → tablet → desktop).
8. Verify theme toggle and animations work correctly.

---

**End of Specification**

This document serves as the complete blueprint for initializing and building the Bentolink project. All design decisions are aligned with the tulio-personal-website aesthetic and optimized for a mobile-first, single-page link-in-bio experience.
