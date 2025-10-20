# Bentolink Bio - Project Context

**Project Name:** Bentolink Bio  
**Type:** Personal Link-in-Bio Page  
**Status:** Active Development  
**Last Updated:** 2025-10-20

## Overview

A modern, Apple HIG-compliant link-in-bio page built with Astro, featuring a bento-grid layout showcasing social links, tools, GitHub activity, and blog posts. The design emphasizes glassmorphism, smooth animations, and an exceptional mobile-first user experience.

## Tech Stack

### Core Framework
- **Astro 5.14.6** - Static site generator with SSR support
- **SolidJS 1.9.9** - Reactive UI components (via `@astrojs/solid-js`)
- **TypeScript 5.9.3** - Type safety and developer experience

### Deployment & Infrastructure
- **Cloudflare** - Serverless deployment adapter (`@astrojs/cloudflare`)
- **Output:** Server-side rendering (`output: 'server'`)

### Content & Data
- **Sanity CMS** - Headless CMS for blog posts
  - Project ID: `61249gtj`
  - Dataset: `production`
  - API Version: `2023-05-03`

### Development Tools
- **Biome 2.2.6** - Linter and formatter (replacing ESLint/Prettier)
  - Indent style: Tabs
  - Line width: 100 characters
  - Quote style: Double quotes
  - Trailing commas: Always
- **Bun** - Package manager and runtime

### UI & Styling
- **Custom CSS** - Token-based design system inspired by Apple HIG
- **Phosphor Icons 2.1.2** - Icon library (`@phosphor-icons/web`)
- **Lottie** - Animations (`@lottiefiles/dotlottie-web`)

## Architecture

### Directory Structure

```
src/
├── components/        # Astro and SolidJS components
│   ├── *.astro       # Static Astro components
│   └── *.tsx         # Interactive SolidJS components
├── layouts/          # Page layouts
├── pages/            # Route pages (file-based routing)
├── scripts/          # Client-side TypeScript
├── services/         # API integrations (Sanity, GitHub)
└── styles/           # CSS modules and tokens
    └── tokens/       # Design system tokens
```

### Component Architecture

**Astro Components** (`.astro`)
- Server-rendered by default
- Used for static content and layouts
- Examples: `ProfileCard`, `DockLink`, `ScrollCTA`, `Base`

**SolidJS Components** (`.tsx`)
- Interactive, client-rendered components
- Use `client:load` directive in Astro
- Examples: `FeatureWritingWidget`, `GitHubActivity`

**Hybrid Pattern:**
```astro
<FeatureWritingWidget posts={blogPosts} client:load />
```

## Design System

### Apple Human Interface Guidelines (HIG) Compliance

The project follows Apple HIG principles:

1. **Visual Design**
   - Glassmorphism with backdrop blur
   - Multi-layer shadow system
   - Subtle gradients and glows
   - Vibrancy and translucency

2. **Typography**
   - San Francisco-inspired font stack
   - Optical sizing and kerning
   - Clear hierarchy with font weights

3. **Interaction Design**
   - 44x44pt minimum touch targets
   - Spring-based animations
   - Reduced motion support
   - Touch-specific feedback

4. **Color System**
   - Semantic color tokens (primary, secondary, tertiary)
   - Automatic dark/light mode
   - Accessible contrast ratios
   - Tinted UI elements

### Design Tokens

Located in `src/styles/tokens/`:
- `colors.css` - Color palette and semantic tokens
- `typography.css` - Font sizes, weights, line heights
- `spacing.css` - Spacing scale and layout units
- `shadows.css` - Multi-layer shadow system
- `animations.css` - Motion tokens and spring curves
- `materials.css` - Glassmorphism and surface styles

### Motion Design

**Animation System:**
- Custom spring curves: `--spring-smooth`, `--spring-bounce`
- Duration tokens: `--motion-duration-instant`, `-fast`, `-base`, `-slow`
- Easing functions: `--motion-ease-in`, `-out`, `-smooth`
- `prefers-reduced-motion` support

**Performance:**
- GPU-accelerated transforms
- `will-change` for animated elements
- 60fps target for all animations

## Coding Conventions

### TypeScript

**File Naming:**
- Components: PascalCase (`ProfileCard.astro`, `GitHubActivity.tsx`)
- Scripts: kebab-case (`carousel-handler.ts`, `theme.ts`)
- Utilities: kebab-case

**Code Style:**
- Tabs for indentation (enforced by Biome)
- Double quotes for strings
- Trailing commas always
- No explicit `any` (warn level)

**Type Safety:**
- Strict mode enabled (`extends: "astro/tsconfigs/strict"`)
- Explicit interface exports
- Type imports when possible

### CSS

**Architecture:**
- Global tokens in `styles/tokens/`
- Component-scoped styles in `.astro` files
- `is:global` for shared patterns

**Naming Conventions:**
- BEM-inspired: `.widget-box`, `.widget-header`, `.widget-title`
- State classes: `.hover-elevate`, `.is-active`
- Utility classes: `.icon-text-group`, `.icon--decorative`

**Responsive Design:**
- Mobile-first approach
- Breakpoints:
  - `max-width: 767px` - Mobile
  - `max-width: 1023px` - Tablet
  - `max-width: 1199px` - Small desktop
  - `1200px+` - Full desktop

**Custom Properties:**
- Scoped variables: `--hover-elevate-translate`, `--hover-elevate-scale`
- Semantic tokens: `var(--text-primary)`, `var(--surface-elevated)`
- Mathematical expressions: `clamp()`, `color-mix()`

### Accessibility

**Standards:**
- WCAG 2.1 AA compliance target
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators

**Implementation:**
```astro
<button 
  aria-label="Descriptive label"
  role="button"
  tabindex="0"
>
```

**Icon Accessibility:**
```astro
<i class="ph ph-icon icon--decorative" aria-hidden="true"></i>
```

## Mobile Experience

### Carousel Navigation (Mobile)

On screens `<= 767px`:
- Widgets transform into horizontal carousel
- Scroll snap alignment: center
- Touch-optimized interactions
- Scroll indicators for navigation

**Implementation Pattern:**
```css
@media (max-width: 767px) {
  .widget-carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  .widget-box {
    flex: 0 0 85vw;
    scroll-snap-align: center;
  }
}
```

### Touch Optimizations

- `touch-action: manipulation` for interactive elements
- `-webkit-tap-highlight-color: transparent`
- Active state feedback: `scale(0.98)` on touch
- Thicker focus rings on touch devices
- Image drag prevention

## Git Workflow

**Branch Structure:**
- `main` - Production branch
- `feature/` - Feature branches (e.g., `feature/redirects-github-linkedin-blog`)

**Commit Style:**
- Conventional Commits format preferred
- Examples:
  - `feat: add mobile carousel navigation`
  - `fix: correct scroll snap alignment`
  - `refactor: simplify widget layout`
  - `docs: update project conventions`

## External Integrations

### Sanity CMS

**Purpose:** Blog post management

**Data Model:**
```typescript
interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  summary?: string;
  category?: string;
}
```

**Query Pattern:**
```javascript
const query = `*[_type == "post"] | order(publishedAt desc)[0..2] {
  _id, title, "slug": slug.current, publishedAt, summary, category
}`;
```

### GitHub Activity

**Purpose:** Display latest commits

**Implementation:** Client-side component fetching GitHub API data

## Commands

```bash
# Development
bun dev           # Start dev server at localhost:4321
bun build         # Build for production
bun preview       # Preview production build

# Code Quality
bun lint          # Lint with Biome
bun format        # Format with Biome
bun check         # Lint + format + fix

# Type Checking
bun astro check   # Type check Astro files
```

## Performance Goals

- **Lighthouse Score:** 95+ on all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Mobile Performance:** 60fps animations
- **Bundle Size:** Minimal JS payload

## Browser Support

- **Modern browsers:** Chrome, Safari, Firefox, Edge (last 2 versions)
- **iOS Safari:** 15+
- **Chrome Android:** Last 2 versions
- **Feature Detection:** Graceful degradation for older browsers

## Known Patterns

### Server-Side Data Fetching
```astro
---
import { fetchLatestPosts } from "../services/sanity";
const blogPosts = await fetchLatestPosts(3);
---
<Component data={blogPosts} />
```

### Client Interactivity
```astro
<SolidComponent data={serverData} client:load />
```

### Hover Effects
```css
.hover-elevate {
  transition: transform var(--motion-duration-base) var(--motion-ease-out);
}

.hover-elevate:hover {
  transform: translateY(var(--hover-elevate-translate));
}
```

### Glassmorphism
```css
.glass-surface {
  background: color-mix(in srgb, var(--surface-elevated) 92%, transparent);
  backdrop-filter: blur(20px) saturate(180%);
  border: 0.5px solid var(--hairline);
  box-shadow: var(--shadow-card), var(--shadow-card-highlight);
}
```

## Future Considerations

- Progressive enhancement for older browsers
- Service worker for offline support
- Image optimization pipeline
- Analytics integration
- A/B testing framework
- Internationalization (i18n)

## OpenSpec Integration

This project uses OpenSpec for spec-driven development:
- Specifications live in `openspec/specs/`
- Change proposals in `openspec/changes/`
- See `openspec/AGENTS.md` for workflow details

**Current Specs:**
- `feature-writing-widget` - Blog post carousel
- `scroll-progress-indicator` - Mobile scroll indicators
- `touch-optimizations` - Touch-specific enhancements
