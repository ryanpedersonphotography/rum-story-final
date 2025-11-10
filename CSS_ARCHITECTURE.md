# CSS Architecture & Token System Documentation

## Overview
This Next.js application uses a sophisticated layered CSS architecture with design tokens, CSS custom properties, and a theme system supporting both light/dark modes and romantic/modern brand variations.

## CSS Import Order (from `/src/app/layout.js`)

The CSS files are imported in a specific order to ensure proper cascade and specificity:

```javascript
// 1. TOKENS - Design tokens (OKLCH colors, surfaces, gradients, spacing)
import '@/styles/tokens/theme.css'
import '@/styles/tokens/spacing.css'

// 2. PRIMITIVES - Layout primitives and component primitives
import '@/styles/primitives/index.css'

// 3. UTILITIES - Section presets and layout utilities
import '@/styles/system/section-presets.css'
import '@/styles/system/layout.css'
import '@/styles/utilities/ornate-divider.css'

// 4. GLOBALS - Base styles
import '@/styles/globals.css'

// 5. COMPONENTS - Component-specific styles
import '@/styles/components/navbar.css'
```

## CSS Layer System

The application uses CSS `@layer` for cascade control:

```css
@layer base, tokens, components, utilities;
```

### Layer Hierarchy:
1. **`base`** - Resets and fundamental styles
2. **`tokens`** - Design tokens and CSS custom properties
3. **`components`** - Component-specific styles
4. **`utilities`** - Helper classes and overrides

## Token Architecture

### 1. Color System (`/src/styles/tokens/theme.css`)

#### Color Space: OKLCH
The entire color system uses OKLCH color space for perceptually uniform colors:
```css
/* Example: Rose color with 74% lightness, 6% chroma, 15° hue */
--p-rose-60: oklch(0.74 0.06 15);
```

#### Primitive Colors (Raw Hues)
```css
/* Romantic Palette */
--p-rose-60:  oklch(0.74 0.06 15);
--p-rose-40:  oklch(0.85 0.04 15);
--p-gold-50:  oklch(0.88 0.07 88);
--p-sage-55:  oklch(0.78 0.05 160);
--p-cream-95: oklch(0.95 0.02 25);

/* Neutral Ladder */
--n-98: oklch(0.98 0 255);  /* Near white */
--n-95: oklch(0.95 0 255);
--n-92: oklch(0.92 0 255);
--n-88: oklch(0.88 0 255);
--n-84: oklch(0.84 0 255);
--n-28: oklch(0.28 0.03 260);  /* Dark gray */
--n-20: oklch(0.20 0.03 255);
--n-16: oklch(0.16 0.03 252);
--n-14: oklch(0.14 0.04 252);
--n-11: oklch(0.11 0.04 255);  /* Near black */

/* Modern Palette */
--m-ink-45:   oklch(0.45 0.05 262);
--m-brass-65: oklch(0.70 0.08 85);
--m-stone-70: oklch(0.68 0.04 105);
```

#### Semantic Tokens
Semantic tokens reference primitives and adapt to theme:
```css
/* Light Mode (Default) */
--surface-0: var(--n-98);
--surface-1: var(--n-95);
--text-primary: var(--n-28);
--text-secondary: color-mix(in oklch, var(--text-primary) 60%, var(--surface-2) 40%);
--accent-rose: var(--p-rose-60);
--accent-gold: var(--p-gold-50);
--accent-sage: var(--p-sage-55);
```

#### Component Aliases
Each major component has themed aliases:
```css
/* Hero Section */
--hero-bg: var(--surface-4);
--hero-text: var(--text-primary);
--hero-accent: var(--accent-rose);
--hero-overlay-start: oklch(0.98 0.01 95 / 0.75);

/* Navbar */
--navbar-bg: color-mix(in oklch, var(--surface-1) 92%, white 8%);
--navbar-text: var(--text-primary);
--navbar-accent: var(--accent-sage);

/* Footer */
--footer-bg: var(--surface-3);
--footer-text: var(--text-inverse);
--footer-link: var(--accent-gold);
```

### 2. Spacing System (`/src/styles/tokens/spacing.css`)

#### Core Scale
```css
--space-0: 0px;
--space-px: 1px;
--space-2xs: 4px;   /* 0.25rem */
--space-xs: 8px;    /* 0.5rem */
--space-sm: 12px;   /* 0.75rem */
--space-md: 16px;   /* 1rem */
--space-lg: 24px;   /* 1.5rem */
--space-xl: 32px;   /* 2rem */
--space-2xl: 40px;  /* 2.5rem */
--space-3xl: 48px;  /* 3rem */
--space-4xl: 64px;  /* 4rem */
--space-5xl: 80px;  /* 5rem */
--space-6xl: 96px;  /* 6rem */
```

#### Fluid Spacing
Responsive spacing that scales with viewport:
```css
--space-fluid-sm: clamp(8px, 1.4vw, 16px);
--space-fluid-md: clamp(12px, 2vw, 24px);
--space-fluid-lg: clamp(16px, 3vw, 32px);
--space-fluid-xl: clamp(24px, 4vw, 48px);
--space-fluid-2xl: clamp(32px, 6vw, 64px);
```

#### Semantic Aliases
```css
/* Gap variants */
--gap-inline: var(--space-sm);
--gap-stack: var(--space-md);
--gap-grid: var(--space-lg);

/* Padding variants */
--pad-chip: var(--space-xs);
--pad-field: var(--space-md);
--pad-card: var(--space-lg);
--pad-section: var(--space-fluid-xl);
```

#### Density System
Adaptive spacing based on context:
```css
/* Default: Comfy */
--density-gap: var(--space-md);
--density-pad: var(--space-lg);
--density-stack: var(--space-lg);

/* Overrides via data attribute */
[data-density="compact"] {
  --density-gap: var(--space-xs);
  --density-pad: var(--space-sm);
}
```

### 3. Typography System

#### Font Stacks
```css
--font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto;
--font-serif: "Playfair Display", Georgia, Cambria, "Times New Roman";
--font-script: "Dancing Script", "Brush Script MT", cursive;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;
```

#### Type Scale
```css
--size-sm: 0.875rem;   /* 14px */
--size-base: 1rem;     /* 16px */
--size-lg: 1.125rem;   /* 18px */
--size-xl: 1.25rem;    /* 20px */
--size-2xl: 1.5rem;    /* 24px */
--size-3xl: 1.75rem;   /* 28px */
--size-4xl: 2rem;      /* 32px */
--size-5xl: 2.5rem;    /* 40px */
--size-6xl: 3rem;      /* 48px */
```

#### Line Heights
```css
--line-tight: 1.2;   /* Headings */
--line-normal: 1.5;  /* Body text */
--line-loose: 1.8;   /* Prose */
```

### 4. Motion & Effects

#### Animation Timing
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 420ms;
```

#### Easing Functions
```css
--ease-smooth: cubic-bezier(0.22, 0.61, 0.36, 1);
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
--ease-snap: cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### Visual Effects
```css
/* Blur values */
--blur-sm: 6px;
--blur-md: 10px;
--blur-lg: 14px;
--blur-xl: 22px;

/* Alpha channels */
--alpha-subtle: 0.20;
--alpha-mid: 0.32;
--alpha-strong: 0.45;
--alpha-heavy: 0.60;

/* Saturation */
--saturate-low: 1.05;
--saturate-med: 1.15;
--saturate-high: 1.25;
```

### 5. Layout System

#### Container Widths
```css
--page-max: 1200px;      /* Standard max width */
--page-wide: 1400px;     /* Wide layouts */
--gutter: clamp(16px, 4vw, 64px);  /* Responsive gutters */
--prose-max: 68ch;       /* Reading width */
```

#### Shadows
```css
--shadow-elev-1: 0 8px 18px oklch(0 0 0 / 0.10);
--shadow-elev-3: 0 16px 38px oklch(0 0 0 / 0.18);
```

## Theme System Implementation

### Theme Detection & Storage
From `/src/app/layout.js`, themes are managed via:

1. **URL Parameters**: `?theme=dark&brand=modern`
2. **LocalStorage**: `rr.theme` and `rr.brand`
3. **System Preference**: `prefers-color-scheme`

```javascript
// Theme script (runs before React hydration)
var theme = params.get('theme');
if(!allowedTheme){
  allowedTheme = localStorage.getItem('rr.theme');
  if(!allowedTheme){
    allowedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
d.setAttribute('data-theme', allowedTheme);
```

### Theme Variations

#### Light Mode (Default)
```css
:root,
html[data-theme="light"] {
  --surface-0: var(--n-98);
  --text-primary: var(--n-28);
  /* ... */
}
```

#### Dark Mode
```css
html[data-theme="dark"] {
  --surface-0: var(--n-11);
  --text-primary: var(--n-92);
  /* ... */
}
```

#### Romantic Brand (Default)
```css
html[data-brand="romantic"] {
  --accent-rose: var(--p-rose-60);
  --accent-gold: var(--p-gold-50);
  /* Script fonts enabled */
}
```

#### Modern Brand
```css
html[data-brand="modern"] {
  --accent-rose: var(--m-brass-65);
  --accent-gold: var(--m-brass-45);
  /* Sans-serif only */
}
```

## Global Styles (`/src/styles/globals.css`)

### CSS Reset
Modern, lightweight reset in the `base` layer:
```css
@layer base {
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; }
  
  /* Scrollbar space reservation */
  html {
    scrollbar-gutter: stable both-edges;
  }
  
  /* Font smoothing */
  body {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
}
```

### Focus Styles
Consistent focus indicators:
```css
:focus-visible {
  outline: var(--focus-width) solid var(--focus-ring);
  outline-offset: var(--focus-offset);
}
```

### Reduced Motion
Accessibility support:
```css
@media (prefers-reduced-motion: reduce) {
  [data-clean-root="true"] * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Primitives System (`/src/styles/primitives/`)

Modular primitive components:
- **layout.css** - Stack, Cluster, Grid primitives
- **typography.css** - Heading, Text, Fluid scales
- **button.css** - Button variants and states

## Component Styles

### CSS Modules vs Global CSS
- **CSS Modules**: Most feature components (`AlternatingBlocks.module.css`)
- **Global CSS**: Navbar, GlassToolbar (`/styles/components/`)

### BEM vs Module Classes
- **BEM**: Global components (`.navbar__container`)
- **Module**: Feature components (`.heroContent`)

## Architecture Benefits

1. **Maintainability**: Clear separation of concerns
2. **Themability**: Complete theme control via CSS properties
3. **Performance**: CSS layers prevent specificity wars
4. **Accessibility**: Built-in reduced motion, focus states
5. **Scalability**: Token-based system scales easily
6. **Type Safety**: Consistent naming conventions

## Best Practices

1. **Use semantic tokens** over primitive values
2. **Prefer fluid spacing** for responsive design
3. **Leverage CSS layers** for specificity control
4. **Follow token naming** conventions
5. **Test all theme variations**
6. **Maintain cascade order** in imports

## Common Patterns

### Full-Width Sections
```css
width: 100vw;
margin-left: calc(-50vw + 50%);
```

### Glass Morphism
```css
backdrop-filter: blur(var(--blur-md)) saturate(var(--saturate-med));
background: color-mix(in oklch, var(--surface-1) 80%, transparent);
```

### Responsive Typography
```css
font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem);
```

### Theme-Aware Shadows
```css
box-shadow: 0 8px 18px oklch(0 0 0 / var(--alpha-mid));
```