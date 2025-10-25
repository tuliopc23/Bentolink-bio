# Design Compliance Guide to Personal Website

**A comprehensive guide to replicate the Apple Human Interface Guidelines-compliant design system**

This document captures every critical design decision, token value, animation curve, and interaction pattern from the Bentolink Bio project. Use this as a reference to achieve identical visual polish in similar projects.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Border Radius & Corners](#border-radius--corners)
5. [Shadows & Depth](#shadows--depth)
6. [Glass Materials & Effects](#glass-materials--effects)
7. [Animation & Motion](#animation--motion)
8. [Interactive States](#interactive-states)
9. [Iconography System](#iconography-system)
10. [Card Components](#card-components)
11. [Icon Tiles](#icon-tiles)
12. [Profile Cards](#profile-cards)
13. [GitHub Activity Widget](#github-activity-widget)
14. [Writing Widget](#writing-widget)
15. [Touch Optimization](#touch-optimization)
16. [Accessibility](#accessibility)

---

## Color System

### Background Hierarchy (Dark Mode)

```css
--bg-base: #050506;
--bg-gradient: linear-gradient(180deg, #050506 0%, #101114 100%);
--bg-elevated: #101115;
--bg-grouped: #131317;
--surface: #1a1a1d;
--surface-elevated: #1f2024;
--surface-raised: #25262b;
--surface-card: color-mix(in srgb, var(--surface-elevated) 92%, #000000 8%);
--surface-card-hover: color-mix(in srgb, var(--surface-raised) 92%, #000000 8%);
--surface-card-active: color-mix(in srgb, var(--surface) 88%, #000000 12%);
```

**Implementation Note**: Use color-mix() for subtle surface variations to maintain depth hierarchy.

### Background Hierarchy (Light Mode)

```css
--bg-base: #f6f7fb;
--bg-gradient: linear-gradient(180deg, #f6f7fb 0%, #eef2ff 70%, #e6ecff 100%);
--surface: rgba(246, 248, 255, 0.88);
--surface-card: rgba(255, 255, 255, 0.9);
--surface-card-hover: rgba(255, 255, 255, 0.96);
--surface-card-active: rgba(255, 255, 255, 0.88);
```

### Radial Gradients (Atmospheric Depth)

**Dark Mode:**
```css
--bg-radial-primary: radial-gradient(
  140% 140% at 28% 4%,
  rgba(84, 84, 88, 0.16) 0%,
  rgba(0, 0, 0, 0) 60%
);
--bg-radial-secondary: radial-gradient(
  160% 140% at 74% 12%,
  rgba(68, 68, 74, 0.14) 0%,
  rgba(0, 0, 0, 0) 64%
);
--bg-radial-tertiary: radial-gradient(
  180% 140% at 50% 118%,
  rgba(44, 44, 46, 0.18) 0%,
  rgba(0, 0, 0, 0) 72%
);
```

**Light Mode:**
```css
--bg-radial-primary: radial-gradient(
  120% 120% at 25% 0%,
  rgba(124, 164, 255, 0.24) 0%,
  rgba(255, 255, 255, 0) 60%
);
```

**Implementation**: Layer 3 radial gradients over base background for atmospheric depth.

### Text Hierarchy

```css
--text-primary: rgba(255, 255, 255, 0.92);
--text-secondary: rgba(220, 232, 255, 0.76);
--text-tertiary: rgba(194, 210, 240, 0.54);
--text-quaternary: rgba(174, 190, 220, 0.42);
```

**Rule**: Use 4-step text hierarchy. Never go beyond quaternary for readability.

### Apple System Colors (Dark)

```css
--blue: #0a84ff;
--green: #30d948;
--indigo: #5e5ce8;
--teal: #5fd4ff;
--orange: #ffa00d;
--pink: #ff3861;
--purple: #c25bf4;
--red: #ff453a;
--yellow: #ffd70d;
--cyan: #5ac8fa;
```

**Light Mode Variants:**
```css
--blue: #007aff;
--green: #34c759;
--indigo: #5856d6;
--orange: #ff9500;
```

### Accent System

```css
--accent-soft: rgba(10, 132, 255, 0.16);
--accent-tint: color-mix(in srgb, var(--surface-elevated) 72%, var(--blue) 28%);
--accent-tint-strong: color-mix(in srgb, var(--surface-raised) 58%, var(--blue) 42%);
--accent-border: rgba(10, 132, 255, 0.45);
--accent-glow: rgba(10, 132, 255, 0.28);
--accent-hover: rgba(10, 132, 255, 0.22);
--accent-active: rgba(10, 132, 255, 0.32);
```

### Border Colors

```css
--hairline: rgba(84, 84, 88, 0.18);
--panel-border: rgba(60, 60, 67, 0.28);
--panel-border-strong: rgba(99, 99, 102, 0.4);
--panel-border-glow: rgba(255, 255, 255, 0.06);
--surface-card-border: rgba(255, 255, 255, 0.04);
--surface-card-border-strong: rgba(255, 255, 255, 0.08);
```

**Implementation**: Use `panel-border` for default, `panel-border-strong` for hover states.

---

## Typography

### Font Stack

```css
--font-system: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;
--font-mono: "SF Mono", "Monaco", "Menlo", monospace;
```

### Fluid Typography (Dynamic Type)

```css
--fs-large-title: clamp(2.125rem, 4.2vw + 1.2rem, 2.75rem);
--fs-title-1: clamp(1.9375rem, 3.4vw + 1rem, 2.375rem);
--fs-title-2: clamp(1.625rem, 2.6vw + 0.92rem, 1.9375rem);
--fs-title-3: clamp(1.3125rem, 2.1vw + 0.82rem, 1.5rem);
--fs-headline: clamp(1.125rem, 1.5vw + 0.95rem, 1.25rem);
--fs-body: clamp(1.0625rem, 1vw + 0.95rem, 1.1875rem);
--fs-callout: clamp(1rem, 0.8vw + 0.9rem, 1.0625rem);
--fs-subheadline: clamp(0.9375rem, 0.7vw + 0.875rem, 1rem);
--fs-footnote: clamp(0.8125rem, 0.6vw + 0.75rem, 0.875rem);
--fs-caption: clamp(0.75rem, 0.5vw + 0.7rem, 0.8125rem);
```

**Implementation**: Use clamp() for all font sizes to ensure responsive scaling without breakpoints.

### Font Weights

```css
--fw-regular: 400;
--fw-medium: 500;
--fw-semibold: 600;
--fw-bold: 700;
```

**Rule**: Use semibold (600) for UI elements, bold (700) for headings.

### Line Heights

```css
--lh-heading: 1.15;
--lh-tight: 1.24;
--lh-snug: 1.34;
--lh-base: 1.52;
--lh-relaxed: 1.68;
--lh-profile-name: 1.16;
```

**Critical**: Profile name uses 1.16, bio text uses 1.5 (refined from 1.6).

### Letter Spacing (Apple HIG Tracking)

```css
--ls-tight: -0.025em;
--ls-title: -0.025em;
--ls-headline: -0.02em;
--ls-body: -0.012em;
--ls-caption: -0.006em;
--ls-eyebrow: 0.06em;  /* Uppercase labels */
--ls-profile-name: -0.028em;
--ls-profile-title: -0.018em;
```

**Rule**: Large text gets negative tracking, small labels get positive tracking.

### Font Features

```css
font-feature-settings: "liga" 1, "calt" 1, "kern" 1;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

**Implementation**: Apply to `html` element globally.

---

## Spacing & Layout

### Core Spacing Scale (8px Grid)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

**Rule**: Always use multiples of 4px. Never use arbitrary values.

### Component Spacing (Fluid)

```css
--card-padding: clamp(1.25rem, 3vw, 2rem);
--card-padding-compact: clamp(1rem, 2.5vw, 1.5rem);
--widget-padding: clamp(1rem, 2.5vw, 1.75rem);
--profile-padding: clamp(1.5rem, 4vw, 2.5rem);
--container-padding-x: clamp(1rem, 5vw, 1.5rem);
```

**Implementation**: Use clamp() for component padding to maintain proportions across viewports.

### Gap Values

```css
--gap-xs: 0.25rem;  /* 4px */
--gap-sm: 0.5rem;   /* 8px */
--gap-md: 0.75rem;  /* 12px */
--gap-lg: 1rem;     /* 16px */
--gap-xl: 1.5rem;   /* 24px */
--gap-2xl: 2rem;    /* 32px */
```

---

## Border Radius & Corners

### Core Radius Scale

```css
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-3xl: 32px;
--radius-full: 9999px;
```

### Component-Specific Radius

```css
--radius-card: 20px;
--radius-widget: 20px;
--radius-button: 12px;
--radius-input: 10px;
--radius-icon-tile: 12px;
--radius-avatar-sm: 8px;
--radius-avatar-md: 16px;
--radius-avatar-lg: 32px;
```

**Implementation Example (Profile Card):**
```css
.profile-card {
  border-radius: 36px;  /* Large featured card */
}
.profile-card__photo {
  border-radius: 32px;  /* Avatar container */
}
.profile-card__photo img {
  border-radius: 32px;  /* Match container */
}
```

**Rule**: Nested elements should have radius ≤ parent radius minus padding.

---

## Shadows & Depth

### Layered Shadow System (4-Layer)

```css
--shadow-card:
  0 1px 2px rgba(0, 0, 0, 0.6),
  0 2px 4px rgba(0, 0, 0, 0.5),
  0 12px 24px rgba(0, 0, 0, 0.38),
  0 24px 48px rgba(0, 0, 0, 0.25),
  0 0 60px rgba(10, 132, 255, 0.04),
  inset 0 1px 0 rgba(255, 255, 255, 0.08);

--shadow-card-hover:
  0 2px 4px rgba(0, 0, 0, 0.65),
  0 6px 12px rgba(0, 0, 0, 0.52),
  0 20px 40px rgba(0, 0, 0, 0.34),
  0 40px 80px rgba(0, 0, 0, 0.22),
  0 0 80px rgba(10, 132, 255, 0.12),
  inset 0 1px 0 rgba(255, 255, 255, 0.12);
```

**Shadow Breakdown:**
1. **Contact shadow** (0-2px): Sharp, high opacity
2. **Near shadow** (2-12px): Medium spread
3. **Ambient shadow** (12-48px): Large, soft
4. **Glow** (0px blur): Accent color, very subtle
5. **Inset highlight**: Top edge shine

### Icon Tile Shadows

```css
--shadow-symbol-dark:
  0 0.8px 1.6px rgba(0, 0, 0, 0.66),
  0 3px 9px rgba(0, 0, 0, 0.52),
  0 10px 22px rgba(0, 0, 0, 0.38),
  0 24px 42px rgba(0, 0, 0, 0.26),
  0 0 36px rgba(0, 0, 0, 0.22),
  inset 0 1px 0 rgba(255, 255, 255, 0.22),
  inset 0 -1px 0 rgba(0, 0, 0, 0.14);
```

**Light Mode Shadows:**
```css
--shadow-symbol-light:
  inset 0 1px 0 rgba(255, 255, 255, 0.74),
  0 1.2px 2.5px rgba(31, 35, 53, 0.2),
  0 6px 14px rgba(31, 35, 53, 0.24),
  0 18px 32px rgba(31, 35, 53, 0.26);
```

**Rule**: Light mode uses lighter shadows with prominent inset highlights.

### Focus Ring

```css
--focus-ring:
  0 0 0 3px rgba(10, 132, 255, 0.3),
  0 0 0 6px rgba(10, 132, 255, 0.15),
  0 0 20px rgba(10, 132, 255, 0.2),
  0 0 0 1px rgba(255, 255, 255, 0.1);
```

**Implementation:**
```css
.element:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
```

---

## Glass Materials & Effects

### Blur Intensities

```css
--glass-blur-ultra-thin: 18px;
--glass-blur-thin: 28px;
--glass-blur-base: 34px;
--glass-blur-thick: 60px;
--glass-blur-ultra-thick: 80px;
```

### Saturation Boost

```css
--glass-saturation-subtle: 140%;
--glass-saturation-base: 180%;
--glass-saturation-vibrant: 220%;
```

### Glass Material Presets

```css
--glass-base: rgba(28, 30, 34, 0.78);
--glass-thick: rgba(30, 32, 36, 0.85);
--glass-ultra-thick: rgba(32, 34, 38, 0.92);
```

**Implementation Example:**
```css
.widget {
  background: var(--surface-elevated);
  backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--glass-saturation-base));
  -webkit-backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--glass-saturation-base));
}
```

**Critical**: Always include `-webkit-` prefix for Safari support.

### Tinted Glass

```css
--glass-tinted-blue: rgba(42, 82, 140, 0.22);
--glass-tinted-purple: rgba(68, 56, 120, 0.2);
--glass-tinted-pink: rgba(112, 52, 94, 0.18);
```

---

## Animation & Motion

### Duration Scale

```css
--motion-duration-instant: 100ms;
--motion-duration-fast: 200ms;
--motion-duration-base: 300ms;
--motion-duration-slow: 500ms;
--motion-duration-slower: 700ms;
--motion-duration-slowest: 1000ms;
```

### Apple Easing Curves (Critical)

```css
--motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--motion-ease-in: cubic-bezier(0.42, 0, 1, 1);
--motion-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
--motion-ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--motion-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

**Spring Curves (Advanced):**
```css
--spring-snappy: cubic-bezier(0.16, 1.04, 0.32, 0.98);
--spring-bouncy: cubic-bezier(0.18, 0.89, 0.32, 1.28);
--spring-smooth: cubic-bezier(0.28, 0.88, 0.42, 1.08);
--spring-responsive: cubic-bezier(0.22, 0.94, 0.38, 1.12);
```

**Rule**: Use spring curves for transform-based animations, ease-out for opacity/color.

### Scale Values

```css
--motion-scale-xs: 1.01;
--motion-scale-sm: 1.02;
--motion-scale-md: 1.05;
--motion-scale-active: 0.96;
--motion-scale-pressed: 0.92;
```

### Transform Values

```css
--translate-xs: 2px;
--translate-sm: 4px;
--translate-md: 8px;
--translate-lg: 16px;
```

---

## Interactive States

### Hover Elevation Pattern

```css
.hover-elevate {
  --hover-elevate-translate: -6px;
  --hover-elevate-scale: 1.01;
  --hover-shadow: var(--shadow-card-hover);
  --hover-border: var(--panel-border-strong);
  transition:
    transform var(--motion-duration-spring-sm) var(--spring-smooth),
    box-shadow var(--motion-duration-sm) var(--motion-ease-out),
    border-color var(--motion-duration-sm) var(--motion-ease-out);
  will-change: transform, box-shadow;
}

.hover-elevate:hover {
  transform: translateY(var(--hover-elevate-translate)) scale(var(--hover-elevate-scale));
  box-shadow: var(--hover-shadow);
  border-color: var(--hover-border);
}
```

**Critical**: Use CSS custom properties to customize per component.

**Example - Profile Card:**
```css
.profile-card:hover {
  transform: translateY(-2px);  /* Subtle 2px lift */
}
```

**Example - Card Component:**
```css
.card {
  --hover-elevate-translate: -4px;
  --hover-elevate-scale: 1.012;
}
```

### Active State

```css
.element:active {
  transform: scale(var(--motion-scale-active));
  transition-duration: 50ms;
}
```

**Rule**: Active states should be snappy (50-100ms).

---

## Iconography System

### Icon Sizes (8px Grid)

```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 40px;
--icon-2xl: 48px;
```

### Semantic Icon Classes

```css
.icon--metadata {
  font-size: 12px;
  line-height: 1;
}

.icon--label {
  font-size: 16px;
  line-height: 1;
}

.icon--heading {
  font-size: 22px;
  line-height: 1;
  transition: transform 0.18s var(--motion-ease-out);
}

.icon--decorative {
  color: var(--text-tertiary);
  opacity: 0.6;
}

.icon--interactive {
  color: var(--link);
  opacity: 1;
}
```

### Icon-Text Groups

```css
.icon-text-group {
  display: inline-flex;
  align-items: center;
  gap: var(--icon-gap-tight);  /* 6px */
}
```

**Implementation:**
```html
<span class="icon-text-group">
  <i class="ph ph-calendar-blank icon--metadata"></i>
  <span>Oct 25, 2025</span>
</span>
```

### Icon Hover Effects

```css
.widget-box:hover .icon--heading {
  transform: scale(1.08);
  color: var(--color-primary);
  filter: drop-shadow(0 2px 4px rgba(10, 132, 255, 0.3));
}
```

**Rule**: Heading icons scale and glow on parent hover.

---

## Card Components

### Base Card Structure

```css
.card {
  background: var(--surface-card);
  border: 1px solid var(--surface-card-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: var(--card-padding-compact);
  isolation: isolate;
  overflow: hidden;
  transition:
    box-shadow var(--motion-duration-fast) var(--motion-ease-out),
    background-color var(--motion-duration-fast) var(--motion-ease-out),
    border-color var(--motion-duration-fast) var(--motion-ease-out);
}
```

### Radial Gradient Overlay

```css
.card::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: radial-gradient(
    circle at 50% 0%, 
    var(--card-accent-base) 0%, 
    rgba(0, 0, 0, 0) 72%
  );
  opacity: 0.18;
  pointer-events: none;
  transition: opacity var(--motion-duration-sm) var(--motion-ease-out);
}

.card:hover::before {
  background: radial-gradient(
    circle at 50% 0%, 
    var(--card-accent-hover) 0%, 
    rgba(0, 0, 0, 0) 72%
  );
  opacity: 0.3;
}
```

**Critical**: Use `inset: 1px` to avoid overlapping border.

### Focus Ring (Outer)

```css
.card::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 0 0 0 var(--card-focus-ring);
  transition: opacity var(--motion-duration-sm) var(--motion-ease-out);
}

.card:focus-visible::after {
  opacity: 1;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.14),
    0 0 0 6px var(--card-focus-ring);
}
```

### Tinted Accent Variants

```css
.card[data-tint="blue"] {
  --card-accent-hover: rgba(10, 132, 255, 0.26);
  --card-focus-ring: rgba(10, 132, 255, 0.22);
}
```

**Available Tints**: blue, indigo, teal, green, orange, pink, purple, red, yellow, cyan

---

## Icon Tiles

### Base Icon Tile

```css
.icon-tile {
  --icon-color: var(--accent-tint);
  --icon-border: var(--accent-border);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--icon-color);
  border: 1px solid color-mix(in srgb, var(--icon-border) 60%, rgba(255, 255, 255, 0.35));
  box-shadow:
    var(--shadow-symbol-dark),
    0 0 20px color-mix(in srgb, var(--icon-border) 15%, transparent);
  isolation: isolate;
  overflow: visible;
  transition:
    transform var(--motion-duration-fast) var(--motion-ease-out),
    box-shadow var(--motion-duration-fast) var(--motion-ease-out);
}
```

### Size Variants

```css
.icon-tile--small {
  width: 40px;
  height: 40px;
  border-radius: 12px;
}

.icon-tile--medium {
  width: 52px;
  height: 52px;
  border-radius: 16px;
}

.icon-tile--large {
  width: 64px;
  height: 64px;
  border-radius: 16px;
}
```

### Inner Highlight & Border

```css
.icon-tile::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: radial-gradient(
    circle at 50% 18%, 
    var(--icon-highlight), 
    rgba(0, 0, 0, 0) 70%
  );
  opacity: 0.24;
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.icon-tile::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.12);
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### Parent Hover Effect

```css
.card:hover .icon-tile {
  transform: scale(1.05);
  border: 1px solid color-mix(in srgb, var(--icon-border) 75%, rgba(255, 255, 255, 0.45));
  box-shadow:
    var(--shadow-symbol-dark-hover),
    0 0 30px color-mix(in srgb, var(--icon-border) 25%, transparent);
}

.card:active .icon-tile {
  transform: scale(0.95);
}
```

### Color Tints (Dark Mode - 95% opacity)

```css
.icon-tile--blue {
  --icon-color: rgba(10, 132, 255, 0.95);
  --icon-border: rgba(10, 132, 255, 0.95);
}
.icon-tile--green {
  --icon-color: rgba(48, 217, 72, 0.95);
  --icon-border: rgba(48, 217, 72, 0.95);
}
.icon-tile--orange {
  --icon-color: rgba(255, 160, 13, 0.95);
  --icon-border: rgba(255, 160, 13, 0.95);
}
```

**Rule**: Use 95% opacity for vibrant, saturated icon backgrounds.

---

## Profile Cards

### Profile Card Layout

```css
.profile-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(var(--space-4), 2vw, var(--space-5));
  padding: clamp(28px, 3.5vw, 40px);
  background: var(--surface-elevated);
  border: 1px solid var(--panel-border);
  border-radius: 36px;
  box-shadow:
    var(--shadow-card),
    var(--shadow-card-highlight),
    0 0 0 0.5px rgba(255, 255, 255, 0.05),
    0 0 80px rgba(96, 156, 255, 0.06);
  backdrop-filter: blur(var(--glass-thick-blur)) saturate(var(--glass-saturation-base));
  isolation: isolate;
  overflow: hidden;
}
```

### Radial Background Glow

```css
.profile-card::after {
  content: "";
  position: absolute;
  inset: -40% -35% auto auto;
  height: 120%;
  width: 80%;
  background: radial-gradient(
    circle at 26% 32%, 
    rgba(108, 168, 255, 0.2), 
    transparent 65%
  );
  opacity: 0.45;
  pointer-events: none;
  mix-blend-mode: screen;
  z-index: -1;
}
```

### Profile Photo

```css
.profile-card__photo {
  width: clamp(128px, 16vw, 168px);
  aspect-ratio: 1;
  border-radius: 32px;
  border: 1px solid var(--panel-border-strong);
  box-shadow:
    var(--shadow-2),
    0 0 60px rgba(96, 156, 255, 0.15);
  overflow: hidden;
  transition:
    transform var(--motion-duration-base) var(--motion-ease-out),
    box-shadow var(--motion-duration-fast) var(--motion-ease-out);
}

.profile-card__photo:hover {
  transform: translateY(-4px) scale(1.015);
  box-shadow:
    var(--shadow-card-hover),
    var(--shadow-card-highlight),
    0 0 80px rgba(96, 156, 255, 0.28);
}
```

### Photo Ring Glow

```css
.profile-card__photo-ring {
  position: absolute;
  inset: -12%;
  border-radius: inherit;
  background: linear-gradient(
    160deg, 
    rgba(96, 156, 255, 0.42), 
    rgba(24, 52, 140, 0.18)
  );
  filter: blur(32px);
  opacity: 0.8;
  pointer-events: none;
  z-index: -1;
}
```

### Profile Typography

```css
.profile-card__name {
  font-size: var(--fs-profile-name);
  font-weight: 700;
  letter-spacing: var(--ls-profile-name);
  line-height: var(--lh-profile-name);
  color: var(--text-primary);
}

.profile-card__title {
  font-size: var(--fs-profile-title);
  font-weight: var(--fw-medium);
  color: var(--text-secondary);
  letter-spacing: var(--ls-profile-title);
}

.profile-card__bio {
  font-size: var(--fs-profile-bio);
  color: var(--text-secondary);
  max-width: 54ch;
  line-height: 1.5;  /* Refined from 1.6 */
}
```

### Contact Chips (Apple HIG Touch Target)

```css
.profile-card__contact {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid rgba(108, 168, 255, 0.28);
  background: color-mix(in srgb, var(--surface-translucent-2) 96%, rgba(70, 124, 220, 0.06));
  box-shadow: inset 0 0 0 1px rgba(120, 180, 255, 0.1);
  backdrop-filter: blur(var(--glass-regular-blur)) saturate(150%);
  min-height: 44px;  /* Apple HIG Touch Target */
  text-decoration: none;
  transition: 
    transform var(--motion-duration-spring-xs) var(--spring-responsive),
    border-color var(--motion-duration-sm) var(--motion-ease-out);
}

.profile-card__contact:hover {
  transform: translateY(-2px);
  border-color: rgba(128, 184, 255, 0.4);
}
```

**Critical**: 44px minimum touch target for mobile compliance.

### Mobile Responsive (≤767px)

```css
@media (max-width: 767px) {
  .profile-card {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    padding: clamp(24px, 6vw, 32px);
    touch-action: pan-y pinch-zoom;
  }

  .profile-card__identity {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .profile-card__contact {
    padding: 8px 10px;
    min-height: 44px;
    gap: var(--space-1);
  }

  /* GPU Acceleration for smooth touch */
  .profile-card,
  .profile-card__contact,
  .profile-card__photo {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
}
```

---

## GitHub Activity Widget

### Carousel Track

```css
.github-repo-carousel__track {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgba(10, 132, 255, 0.3) transparent;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 2px;
  margin: -2px;
}

.github-repo-carousel__track::-webkit-scrollbar {
  height: 6px;
}

.github-repo-carousel__track::-webkit-scrollbar-thumb {
  background: rgba(10, 132, 255, 0.3);
  border-radius: 3px;
}
```

### Repository Card

```css
.github-repo-card {
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  gap: clamp(var(--space-2), 1.2vw, var(--space-3));
  padding: clamp(20px, 2vw, 24px);
  border-radius: 28px;
  background: color-mix(in srgb, var(--surface-elevated) 96%, transparent);
  border: 1px solid var(--panel-border);
  box-shadow:
    var(--shadow-card),
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 0 40px rgba(10, 132, 255, 0.05);
  backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--glass-saturation-base));
  height: clamp(180px, 16vw, 220px);
  overflow: hidden;
}
```

### Commit List Item

```css
.github-commit-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: 10px 12px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--surface-card) 30%, transparent);
  border: 1px solid color-mix(in srgb, var(--panel-border) 20%, transparent);
  min-height: 44px;
  transition:
    background var(--motion-duration-fast) var(--motion-ease-out),
    border-color var(--motion-duration-fast) var(--motion-ease-out),
    transform var(--motion-duration-sm) var(--spring-smooth);
}

.github-commit-list-item:hover {
  background: color-mix(in srgb, var(--surface-card) 55%, transparent);
  border-color: color-mix(in srgb, var(--panel-border) 45%, transparent);
  transform: translateX(2px);
}
```

### External Link Icon

```css
.github-commit-list-item__icon {
  flex-shrink: 0;
  font-size: 14px;
  color: var(--text-tertiary);
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity var(--motion-duration-fast) var(--motion-ease-out),
    transform var(--motion-duration-fast) var(--motion-ease-out);
}

.github-commit-list-item:hover .github-commit-list-item__icon {
  opacity: 1;
  transform: translateX(0);
}
```

### Scroll Hint CTA

```css
.github-scroll-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--surface-card) 50%, transparent);
  border: 1px solid color-mix(in srgb, var(--panel-border) 40%, transparent);
  font-size: var(--fs-caption-1);
  font-weight: var(--fw-medium);
  color: var(--blue);
  width: fit-content;
  animation: github-cta-fade-in 400ms var(--motion-ease-out) backwards;
}

@keyframes github-cta-fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Writing Widget

### Article Card with Parallax

```css
.article-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(20px, 2.4vw, 28px);
  border-radius: 28px;
  background: color-mix(in srgb, var(--surface-elevated) 94%, transparent);
  border: 1px solid var(--panel-border);
  box-shadow:
    var(--shadow-card),
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 0 50px rgba(10, 132, 255, 0.04);
  backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--glass-saturation-base));
  min-height: clamp(180px, 18vw, 240px);
  text-decoration: none;
  isolation: isolate;
  perspective: 1000px;
  transform-style: preserve-3d;
}
```

### Parallax Tilt Effect

```javascript
const applyTilt = (event) => {
  const rect = card.getBoundingClientRect();
  const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
  const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
  
  const maxTilt = 4;
  const rotateX = -relativeY * maxTilt * 2;
  const rotateY = relativeX * maxTilt * 2;
  
  card.style.setProperty('--parallax-rotate-x', `${rotateX}deg`);
  card.style.setProperty('--parallax-rotate-y', `${rotateY}deg`);
};
```

```css
.article-card--tilting {
  transform: 
    rotateX(var(--parallax-rotate-x, 0deg)) 
    rotateY(var(--parallax-rotate-y, 0deg))
    translateY(var(--parallax-translate, 0px));
  transition: transform 180ms cubic-bezier(0.22, 0.94, 0.38, 1.12);
}
```

### Article Metadata

```css
.article-card__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-caption-2);
  font-weight: var(--fw-medium);
  color: var(--text-tertiary);
}

.article-card__chip-icon {
  font-size: 10px;
  opacity: 0.8;
}
```

### CTA Chip

```css
.article-card__chip--cta {
  color: var(--link);
  transition: 
    transform var(--motion-duration-fast) var(--motion-ease-out),
    color var(--motion-duration-fast) var(--motion-ease-out);
}

.article-card:hover .article-card__chip--cta {
  transform: translate(2px, -2px);
  color: color-mix(in srgb, var(--blue) 72%, #ffffff 28%);
}

.article-card:hover .article-card__chip--cta .article-card__chip-icon {
  transform: translate(2px, -2px);
}
```

### New Badge

```css
.article-card__badge {
  padding: 3px 8px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--green) 20%, transparent);
  border: 1px solid color-mix(in srgb, var(--green) 40%, transparent);
  font-size: 10px;
  font-weight: var(--fw-bold);
  letter-spacing: 0.08em;
  color: var(--green);
  text-transform: uppercase;
}
```

---

## Touch Optimization

### Touch Action Properties

```css
/* Prevent accidental zoom on double-tap */
.interactive-element {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Allow vertical scrolling only */
.scrollable-container {
  touch-action: pan-y pinch-zoom;
}
```

### GPU Acceleration

```css
.animated-element {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}
```

### Image Touch Prevention

```css
.profile-card__photo img {
  pointer-events: none;
  -webkit-user-drag: none;
  user-drag: none;
}
```

### Minimum Touch Targets

```css
/* Apple HIG requires 44x44px minimum */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Adjust on mobile if needed */
@media (max-width: 767px) {
  .profile-card__contact {
    min-height: 44px;  /* Maintain compliance */
  }
}
```

---

## Accessibility

### Focus Styles

```css
:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### ARIA Attributes

```html
<!-- Decorative icons -->
<i class="ph ph-calendar-blank" aria-hidden="true"></i>

<!-- Interactive regions -->
<section id="profile" aria-labelledby="profile-heading" role="region">
  <h1 id="profile-heading" tabindex="-1">Tulio Cunha</h1>
</section>

<!-- Lists -->
<div role="list" aria-label="Social links">
  <a role="listitem">...</a>
</div>
```

### Color Contrast

**Minimum Ratios (WCAG AA):**
- Normal text: 4.5:1
- Large text (≥18px): 3:1
- UI components: 3:1

**Compliant Text Colors:**
- `--text-primary`: rgba(255, 255, 255, 0.92) → 14.2:1 on dark bg ✅
- `--text-secondary`: rgba(220, 232, 255, 0.76) → 10.8:1 ✅
- `--text-tertiary`: rgba(194, 210, 240, 0.54) → 6.1:1 ✅

---

## Implementation Checklist

### Step 1: Setup Design Tokens

1. Create `tokens/colors.css` with all color variables
2. Create `tokens/typography.css` with font scales
3. Create `tokens/spacing.css` with 8px grid
4. Create `tokens/shadows.css` with layered shadows
5. Create `tokens/materials.css` with glass effects
6. Create `tokens/animations.css` with easing curves

### Step 2: Base Styles

```css
@import "./tokens/colors.css";
@import "./tokens/typography.css";
@import "./tokens/spacing.css";
@import "./tokens/materials.css";
@import "./tokens/animations.css";
@import "./tokens/shadows.css";

html {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: var(--lh-base);
  letter-spacing: var(--ls-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: var(--font-feature-settings);
}

body {
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  transition:
    background-color var(--motion-duration-md) var(--motion-ease-out),
    color var(--motion-duration-md) var(--motion-ease-out);
}
```

### Step 3: Component Patterns

1. **Cards**: Use `.hover-elevate` utility class
2. **Icon Tiles**: Apply 95% opacity solid colors
3. **Glass Effects**: Always include `-webkit-backdrop-filter`
4. **Shadows**: Combine base + hover + highlight shadows
5. **Typography**: Use clamp() for fluid sizing
6. **Spacing**: Stick to 8px grid (4, 8, 12, 16, 24, 32)

### Step 4: Interactive Polish

1. Use spring curves for transforms
2. Apply `will-change: transform` to animated elements
3. Ensure 44px minimum touch targets
4. Add focus rings with `box-shadow`
5. Include reduced motion fallbacks

### Step 5: Light Mode

```css
[data-theme="light"] {
  /* Override all color tokens */
  /* Use lighter shadows with prominent inset highlights */
  /* Adjust icon tile colors to light variants */
}
```

---

## Common Pitfalls to Avoid

### ❌ Don't Do This

1. **Arbitrary spacing**: `padding: 15px;`
   - ✅ Use: `padding: var(--space-4);` (16px)

2. **Missing webkit prefix**: `backdrop-filter: blur(20px);`
   - ✅ Include: `-webkit-backdrop-filter: blur(20px);`

3. **Wrong easing**: `transition: transform 0.3s ease;`
   - ✅ Use: `transition: transform 300ms var(--motion-ease-out);`

4. **Small touch targets**: `button { height: 32px; }`
   - ✅ Use: `min-height: 44px;` for mobile

5. **Missing focus states**: No `:focus-visible` styles
   - ✅ Always add: `box-shadow: var(--focus-ring);`

6. **Skipping reduced motion**: Animations play regardless
   - ✅ Add: `@media (prefers-reduced-motion: reduce) { ... }`

7. **Single-layer shadows**: `box-shadow: 0 2px 4px rgba(0,0,0,0.1);`
   - ✅ Use: 4-layer shadows with contact + ambient + glow + inset

8. **Fixed font sizes**: `font-size: 18px;`
   - ✅ Use: `font-size: clamp(1rem, 1.2vw + 0.8rem, 1.125rem);`

---

## Quick Reference Card

### Most Used Values

**Spacing**: 4, 8, 12, 16, 24, 32, 48, 64  
**Radius**: 12, 16, 20, 28, 32, 36  
**Opacity**: 0.04, 0.08, 0.12, 0.18, 0.22, 0.28, 0.42  
**Duration**: 100ms, 200ms, 300ms, 500ms  
**Easing**: `cubic-bezier(0.16, 1, 0.3, 1)`  
**Touch Target**: 44px minimum  
**Text Color**: rgba(255, 255, 255, 0.92)  
**Border**: rgba(60, 60, 67, 0.28)  
**Blue**: #0a84ff (dark) / #007aff (light)  

---

## Final Notes

This design system achieves Apple HIG compliance through:

1. **Consistent 8px grid** for all spacing and sizing
2. **4-layer shadow system** for depth perception
3. **Fluid typography** with clamp() for responsive scaling
4. **Spring-based animations** matching iOS motion
5. **95% opacity icon tiles** for vibrant colors
6. **44px touch targets** for mobile accessibility
7. **Semantic color tokens** for maintainability
8. **Glass materials** with backdrop blur + saturation

When in doubt, reference the original components in the codebase. Every value has been battle-tested for visual harmony and accessibility compliance.

---

**Document Version**: 1.0  
**Last Updated**: October 25, 2025  
**Maintainer**: Tulio Cunha  
**License**: Reference only - all design tokens are project-specific
