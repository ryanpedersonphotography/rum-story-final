# Rum River Wedding Barn – Project Documentation

> **Zen System 7.0** – A minimal, token-driven design system for the Rum River Wedding Barn website.

---

## Philosophy & Design Rules

### Core Principles

1. **Tokens are the Source of Truth**
   - All spacing, colors, typography, and motion are defined in `src/system/tokens/index.ts`
   - CSS uses only `var(--token-name)` – never raw values
   - Changes to design happen at the token level, not in component CSS

2. **Atoms are Dumb, Recipes are Smart**
   - **Atoms** (Layout, Surface, Type, Layer, Motion) handle one concern: geometry OR paint OR text OR position OR animation
   - **Recipes** compose atoms into opinionated patterns (Section, HeroSection, AutoGrid)
   - Neither atoms nor recipes know about business logic, data fetching, or brand copy

3. **CSS Modules Only**
   - No global CSS except tokens and base reset
   - Every component owns its styles via `.module.css`
   - Class names are never manually concatenated strings – use `clsx()`

4. **Server Components by Default**
   - Only add `'use client'` when you need interactivity
   - Motion atom is the only atom that requires client – it's the animation wrapper
   - All other atoms and recipes stay server-safe

5. **No Layout Hacks**
   - GlobalCanvas uses CSS Grid with a ghost column for the sidebar
   - Content area respects `--sidebar-width` without padding-left tricks
   - Sections, heroes, and cards all use the same max-width token

6. **Sidebar Width is Single Source of Truth**
   - `--sidebar-width` is defined in `theme.css` (from tokens) and controls BOTH:
     - The GlobalCanvas grid column width
     - The GlassToolbar rail width
   - `--glass-toolbar-rail-width` is a legacy alias: `var(--sidebar-width)`
   - **Never hardcode pixel widths** for toolbar or layout in `glass-toolbar.css` or elsewhere
   - Mobile override: change `--sidebar-width` in ONE media query (768px), both layout and toolbar update automatically
   - Breakpoint must match: GlobalCanvas and glass-toolbar.css both use `@media (max-width: 768px)`

### Naming Conventions

| Layer | Location | Example |
|-------|----------|---------|
| Tokens | `src/system/tokens/index.ts` | `spacing`, `colors`, `z` |
| Atoms | `src/system/atoms/` | `Layout.tsx`, `Surface.tsx`, `Type.tsx` |
| Recipes | `src/system/recipes/` | `Section.tsx`, `HeroSection.tsx` |
| Parts | `src/system/parts/` | `GlobalCanvas.tsx` (app-shell level) |
| Legacy | `src/components/legacy/` | Old components kept for reference |
| Archive | `src/_archive/` | Previous design system (do not use) |

### CSS Token Usage

```css
/* ✅ Correct */
.card {
  padding: var(--space-6);
  background: var(--color-paper-raised);
  border-radius: var(--radius-md);
}

/* ❌ Incorrect */
.card {
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
}
```

### Component Composition Pattern

```tsx
// ✅ Correct: Use atoms and recipes
<Section>
  <Layout type="stack" gap={6}>
    <Type as="h2" size="display">Title</Type>
    <Type as="p" size="body">Description</Type>
  </Layout>
</Section>

// ❌ Incorrect: Raw divs with inline styles
<section style={{ padding: '48px', maxWidth: '1200px' }}>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <h2 style={{ fontSize: '2.5rem' }}>Title</h2>
  </div>
</section>
```

---

## Architecture Overview

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with GlobalCanvas
│   ├── page.tsx            # Home page
│   ├── globals.css         # Base reset + body styles
│   ├── theme.css           # Generated token CSS (do not edit)
│   ├── theme-modes.css     # Light/dark mode overrides
│   └── zen-demo/           # Design system showcase
│       └── page.tsx
│
├── system/                 # Zen System 7.0 Design System
│   ├── tokens/             # Design tokens (source of truth)
│   │   └── index.ts        # spacing, colors, z-index, etc.
│   ├── atoms/              # Low-level primitives
│   │   ├── Layout.tsx      # Stack, cluster, grid
│   │   ├── Surface.tsx     # Background, elevation, radius
│   │   ├── Type.tsx        # Typography
│   │   ├── Layer.tsx       # Positioning
│   │   ├── Motion.tsx      # Animation (client-only)
│   │   └── index.ts
│   ├── recipes/            # Composed patterns
│   │   ├── Section.tsx     # Standard content section
│   │   ├── HeroSection.tsx # Full-width hero
│   │   ├── AutoGrid.tsx    # Responsive grid
│   │   └── index.ts
│   ├── parts/              # App-shell components
│   │   └── GlobalCanvas.tsx
│   └── theme/              # Theme utilities
│       └── initThemeScript.ts
│
├── components/
│   └── legacy/             # Old components (GlassToolbar, etc.)
│
├── styles/
│   └── glass-toolbar.css   # Legacy toolbar styles
│
└── _archive/               # Previous design system (reference only)
```

---

## Token System

### Spacing Scale

```ts
spacing: {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
}
```

### Color System

All colors reference semantic names (`paper`, `ink`, `accent`) that flip automatically in dark mode via `[data-theme='dark']`.

| Token | Light Mode | Dark Mode | Purpose |
|-------|------------|-----------|---------|
| `--color-paper` | cream-50 | charcoal-900 | Primary background |
| `--color-paper-raised` | white | charcoal-800 | Cards, modals |
| `--color-ink` | charcoal-900 | cream-50 | Primary text |
| `--color-muted` | charcoal-500 | cream-400 | Secondary text |
| `--color-accent` | gold-600 | gold-400 | Brand highlight |

### Z-Index Layers

```ts
z: {
  base: 0,
  dropdown: 10,
  sticky: 20,
  sidebar: 30,
  modal: 40,
  toast: 50,
}
```

### Typography Presets

| Size | Usage | Font Size |
|------|-------|-----------|
| `hero` | Page heroes | clamp(2.5rem, 5vw, 4.5rem) |
| `display` | Section headings | clamp(2rem, 4vw, 3.5rem) |
| `title` | Card titles | clamp(1.5rem, 3vw, 2.25rem) |
| `body` | Paragraphs | 1rem |
| `caption` | Labels, metadata | 0.875rem |

---

## Atoms Reference

### Layout

Handles geometry (flex/grid):

```tsx
<Layout type="stack" gap={4} align="center">
  {children}
</Layout>

<Layout type="cluster" gap={2} justify="between">
  {children}
</Layout>

<Layout type="grid" cols={3} gap={4}>
  {children}
</Layout>
```

Props:
- `type`: `'stack'` | `'cluster'` | `'grid'`
- `gap`: SpacingKey (0-24)
- `align`: `'start'` | `'center'` | `'end'` | `'stretch'`
- `justify`: `'start'` | `'center'` | `'end'` | `'between'`
- `padding`: SpacingKey
- `cols`: number (grid only)

### Surface

Handles paint (background, shadow, radius):

```tsx
<Surface tone="paper-raised" elevation="raised" radius="md">
  {children}
</Surface>
```

Props:
- `tone`: `'paper'` | `'paper-raised'` | `'accent'` | `'transparent'` | `'glass'`
- `elevation`: `'flat'` | `'raised'` | `'float'`
- `radius`: `'none'` | `'sm'` | `'md'` | `'lg'` | `'full'`
- `border`: boolean

### Type

Handles typography:

```tsx
<Type as="h1" size="hero" tone="ink">
  Welcome
</Type>

<Type as="p" size="body" tone="muted">
  Description text
</Type>
```

Props:
- `as`: `'h1'`-`'h6'` | `'p'` | `'span'` | `'div'`
- `size`: `'hero'` | `'display'` | `'title'` | `'body'` | `'caption'`
- `tone`: `'ink'` | `'muted'` | `'accent'` | `'inherit'`
- `weight`: `'normal'` | `'medium'` | `'semibold'` | `'bold'`
- `serif`: boolean (default true)
- `script`: boolean (Dancing Script font)

### Layer

Handles positioning:

```tsx
<Layer position="absolute" top="0" left="0" z="modal">
  {children}
</Layer>
```

Props:
- `position`: `'absolute'` | `'fixed'` | `'sticky'`
- `top`, `left`, `right`, `bottom`: string
- `inset`: string (shorthand for all sides)
- `z`: ZLayer (`'base'` | `'dropdown'` | `'sticky'` | `'sidebar'` | `'modal'` | `'toast'`)

### Motion

Handles animation (client-only):

```tsx
<Motion mode="fade-up" delay={0.1}>
  {children}
</Motion>
```

Props:
- `mode`: `'static'` | `'fade-up'` | `'fade-in'` | `'scale-in'`
- `delay`: number (seconds)
- `duration`: number (seconds, default 0.6)

---

## Recipes Reference

### Section

Standard content section with max-width constraint:

```tsx
<Section divider>
  <Type as="h2" size="display">Section Title</Type>
  <Type as="p">Content here...</Type>
</Section>
```

Props:
- `divider`: boolean (bottom border)
- `variant`: `'default'` | `'hero-warm'` | `'hero-dusk'` | `'hero-sunset'`

### HeroSection

Full-width hero with gradient background:

```tsx
<HeroSection variant="warm" minHeight="60vh" animate>
  <Type as="h1" size="hero" tone="inherit">
    Hero Title
  </Type>
</HeroSection>
```

Props:
- `variant`: `'warm'` | `'dusk'` | `'sunset'` | `'glass'`
- `minHeight`: string (default '60vh')
- `centerVertical`: boolean (default true)
- `animate`: boolean (default true)

### AutoGrid

Responsive grid with auto-fit:

```tsx
<AutoGrid gap={4} minItemWidth="280px">
  <Card />
  <Card />
  <Card />
</AutoGrid>
```

Props:
- `gap`: SpacingKey
- `minItemWidth`: string (default '280px')

---

## Theme System

### Light/Dark Mode

Theme is controlled via `data-theme` attribute on `<html>`:

```html
<html data-theme="light">  <!-- or "dark" -->
```

The `initThemeScript` runs before first paint to prevent flash:
1. Checks `localStorage.getItem('theme')`
2. Falls back to `prefers-color-scheme` media query
3. Sets `data-theme` attribute

### Adding New Tokens

1. Edit `src/system/tokens/index.ts`
2. Run `npm run generate:tokens`
3. New CSS variables appear in `src/app/theme.css`
4. Use via `var(--new-token-name)` in components

---

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Generate tokens (runs automatically before build)
npm run generate:tokens
```

### Key URLs

- Home: https://localhost:9999/
- Design System Demo: https://localhost:9999/zen-demo

---

## Migration Guide

When converting old components to Zen System:

1. **Replace raw divs** → Use `<Layout>`, `<Surface>`, `<Type>`
2. **Remove inline styles** → Use atoms with props
3. **Delete old className strings** → Use CSS modules
4. **Check dark mode** → Use `tone` props, not hardcoded colors
5. **Add animations** → Wrap in `<Motion>` instead of custom CSS

### Example Migration

**Before (legacy):**
```tsx
<section className="hero-section" style={{ background: 'linear-gradient(...)' }}>
  <div className="hero-content">
    <h1 className="hero-title">Title</h1>
  </div>
</section>
```

**After (Zen System):**
```tsx
<HeroSection variant="warm">
  <Type as="h1" size="hero" tone="inherit">
    Title
  </Type>
</HeroSection>
```

---

## File Ownership

| File/Folder | Owner | Notes |
|-------------|-------|-------|
| `src/system/tokens/` | Design System | Source of truth |
| `src/system/atoms/` | Design System | Do not modify for page-specific needs |
| `src/system/recipes/` | Design System | Compose, don't customize |
| `src/app/theme.css` | Generated | Do not edit manually |
| `src/components/legacy/` | Deprecated | Reference only |
| `src/_archive/` | Archived | Do not use |

---

## Git Branches

- `master` - Stable production (pre-Zen System)
- `primitive-redesign` - Zen System 7.0 implementation ← **current**
- Tag: `stable-hero-layout` - Last commit before Zen System

---

## Changelog

### Zen System 7.0 (2024-11-27)

- Phase 0: Token system + theme init
- Phase 1: GlobalCanvas + legacy migration
- Phase 2: Atoms (Layout, Surface, Type, Layer, Motion)
- Phase 3: Recipes (Section, HeroSection, AutoGrid)
- Phase 4: Demo page at /zen-demo

---

*Last updated: November 27, 2024*
