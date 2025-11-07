# Glass Toolbar Customization Guide

## 🎯 Complete Reference for Styling & Modifications

This guide provides comprehensive instructions for customizing the Glass Toolbar component based on our premium walnut & gold implementation.

---

## 📐 Width & Dimensions

### Rail Width
The toolbar width is controlled by CSS variables in `src/styles/components/glass-toolbar.css`:

```css
:root {
  --glass-toolbar-rail-width: 135px;     /* Desktop width */
  --glass-toolbar-panel-width: 380px;    /* Expanded panel width */
}

/* Mobile responsive */
@media (max-width: 900px) {
  :root {
    --glass-toolbar-rail-width: 68px;    /* Mobile width */
    --glass-toolbar-panel-width: min(280px, calc(100vw - 68px));
  }
}
```

**Width Guidelines:**
- **Minimum**: 68px (mobile baseline)
- **Standard**: 88-110px (original range)
- **Premium**: 130-140px (luxury presence)
- **Maximum**: 160px (before proportions break)

**When changing width:**
1. Update `--glass-toolbar-rail-width`
2. Layout automatically adjusts (no React changes needed)
3. Consider icon scaling for proportional balance

### Icon Scaling Formula
When changing rail width, scale icons proportionally:

```css
/* Current premium scale (135px rail) */
.glass-toolbar__pill-icon-wrapper {
  width: 64px;   /* Base: 56px */
  height: 36px;  /* Base: 32px */
}

.glass-toolbar__pill-icon-wrapper svg {
  width: 28px;   /* Base: 24px */
  height: 28px;
}

.glass-toolbar__mark {
  width: 48px;   /* Base: 40px */
  height: 48px;
}
```

**Scaling Calculator:**
- New icon size = Base size × (New rail width ÷ 88px)
- Example: 150px rail = 24px × (150 ÷ 88) = ~41px icons

---

## 🎨 Color Themes

### Premium Walnut & Gold Theme
Current implementation uses rich walnut with gold accents:

```css
:root {
  /* Color Palette */
  --walnut-dark: #191410;
  --walnut-darker: #0f0c0a;
  --walnut-darkest: #080605;
  --walnut-medium: #2a201a;
  --walnut-highlight: #3d2f25;
  --toolbar-gold: oklch(0.88 0.07 88);
  --toolbar-gold-bright: oklch(0.92 0.09 88);
  --toolbar-gold-muted: oklch(0.75 0.06 88);
}
```

### Creating New Color Themes

**1. Define Your Palette**
```css
:root {
  /* Example: Ocean Blue Theme */
  --ocean-dark: #0a1629;
  --ocean-medium: #1a2b47;
  --ocean-light: #2d4663;
  --ocean-accent: #4a90e2;
  --ocean-bright: #6bb6ff;
  --ocean-muted: #2c5282;
}
```

**2. Update Frost Variables**
```css
/* Dark theme */
--glass-toolbar-frost-tint: 10, 22, 41;        /* ocean-dark RGB */
--glass-toolbar-frost-accent: 74, 144, 226;    /* ocean-accent RGB */
--glass-toolbar-rail-border: var(--ocean-accent);
--glass-toolbar-panel-border: var(--ocean-muted);
```

**3. Update Gradients**
```css
--glass-toolbar-rail-bg: linear-gradient(
  90deg,
  rgba(10, 22, 41, 0.92) 0%,        /* ocean-dark */
  rgba(26, 43, 71, 0.88) 30%,       /* ocean-medium */
  rgba(45, 70, 99, 0.85) 70%,       /* ocean-light */
  rgba(10, 22, 41, 0.95) 100%
);
```

### Theme Templates

**Minimalist Gray:**
```css
--frost-tint: 128, 128, 128;
--accent-color: oklch(0.7 0.02 180);
--rail-bg: rgba(128, 128, 128, 0.15);
```

**Forest Green:**
```css
--forest-dark: #0d1b0d;
--forest-accent: #22c55e;
--frost-tint: 13, 27, 13;
--accent-color: oklch(0.7 0.15 140);
```

**Sunset Orange:**
```css
--sunset-base: #1a0f0a;
--sunset-accent: #ff6b35;
--frost-tint: 26, 15, 10;
--accent-color: oklch(0.75 0.18 45);
```

---

## ✨ Glassmorphism Effects

### Layer System
The premium glass effect uses multiple shadow layers:

```css
.glass-toolbar__rail {
  /* Complex multi-layer depth shadows */
  box-shadow: 
    inset 2px 0 3px rgba(255, 255, 255, 0.05),    /* Inner highlight */
    inset -2px 0 4px rgba(0, 0, 0, 0.3),          /* Inner shadow */
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),    /* Top edge */
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),          /* Bottom edge */
    4px 0 24px rgba(0, 0, 0, 0.4),                /* Outer shadow */
    2px 0 8px rgba(0, 0, 0, 0.3);                 /* Close shadow */
}
```

### Backdrop Filter Settings
```css
backdrop-filter: blur(20px) saturate(1.4) contrast(1.05);
-webkit-backdrop-filter: blur(20px) saturate(1.4) contrast(1.05);
```

**Effect Parameters:**
- **Blur**: 16px (subtle) → 20px (standard) → 24px (heavy)
- **Saturate**: 1.0 (natural) → 1.4 (vibrant) → 1.8 (intense)
- **Contrast**: 1.0 (flat) → 1.05 (subtle) → 1.2 (dramatic)

### Glass Intensity Levels

**Subtle Glass:**
```css
backdrop-filter: blur(12px) saturate(1.1) contrast(1.0);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

**Standard Glass:**
```css
backdrop-filter: blur(16px) saturate(1.3) contrast(1.05);
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
```

**Heavy Glass:**
```css
backdrop-filter: blur(24px) saturate(1.6) contrast(1.1);
box-shadow: 0 20px 64px rgba(0, 0, 0, 0.25);
```

---

## ⚡ Special Effects

### Gold Accent Stripe
The glowing vertical accent line:

```css
.glass-toolbar__rail::after {
  content: '';
  position: absolute;
  top: 20%;           /* Start position */
  bottom: 20%;        /* End position */
  right: -1px;        /* Edge placement */
  width: 2px;         /* Stripe width */
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--toolbar-gold-muted) 15%,
    var(--toolbar-gold) 50%,        /* Peak brightness */
    var(--toolbar-gold-muted) 85%,
    transparent 100%
  );
  opacity: 0.9;
  filter: drop-shadow(0 0 4px var(--toolbar-gold));
}
```

**Customization Options:**
- **Width**: 1px (subtle) → 3px (bold)
- **Position**: `top: 10%` (longer) → `top: 30%` (shorter)
- **Glow**: `drop-shadow(0 0 2px ...)` (soft) → `drop-shadow(0 0 8px ...)` (intense)

### Overlay Patterns
Add texture with overlay gradients:

```css
.glass-toolbar__rail::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(25, 20, 16, 0.15) 40%,
    rgba(61, 47, 37, 0.1) 100%
  );
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

---

## 🔧 Interactive States

### Hover Effects
```css
.glass-toolbar__pill:hover .glass-toolbar__pill-icon-wrapper {
  background: var(--glass-toolbar-pill-hover-bg);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.12),
    0 3px 10px rgba(0, 0, 0, 0.15);
}
```

### Active States
```css
.glass-toolbar__pill.is-active .glass-toolbar__pill-icon-wrapper {
  background: var(--glass-toolbar-pill-active-bg);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.1),
    0 4px 16px rgba(var(--glass-toolbar-frost-tint), 0.3);
}
```

### Custom Interaction Variables
```css
:root {
  --pill-hover-intensity: 0.1;      /* Hover background opacity */
  --pill-active-intensity: 0.15;    /* Active background opacity */
  --transition-speed: 180ms;        /* Hover transition duration */
  --glow-intensity: 0.3;           /* Active glow opacity */
}
```

---

## 📱 Responsive Behavior

### Breakpoint System
```css
/* Desktop: Full experience */
@media (min-width: 901px) {
  :root {
    --glass-toolbar-rail-width: 135px;
    --glass-toolbar-panel-width: 380px;
  }
}

/* Tablet: Reduced width */
@media (max-width: 900px) and (min-width: 641px) {
  :root {
    --glass-toolbar-rail-width: 80px;
    --glass-toolbar-panel-width: 300px;
  }
}

/* Mobile: Minimal */
@media (max-width: 640px) {
  :root {
    --glass-toolbar-rail-width: 68px;
    --glass-toolbar-panel-width: calc(100vw - 68px);
  }
  
  .glass-toolbar-layout__content {
    padding-left: 0;
  }
}
```

### Touch Optimizations
```css
@media (hover: none) {
  .glass-toolbar__pill-icon-wrapper {
    min-height: 44px;  /* iOS touch target */
  }
  
  .glass-toolbar__toggle {
    min-width: 44px;
    min-height: 44px;
  }
}
```

---

## 🛠️ Architecture Overview

### File Structure
```
src/
├── components/dev/
│   └── GlassToolbar.tsx          # React component
├── styles/components/
│   └── glass-toolbar.css         # All styling
└── app/page.tsx                  # Usage example
```

### CSS Variable System
All customization flows through CSS custom properties:

```css
:root {
  /* Dimensions */
  --glass-toolbar-rail-width
  --glass-toolbar-panel-width
  
  /* Colors */
  --glass-toolbar-frost-tint
  --glass-toolbar-frost-accent
  --glass-toolbar-rail-border
  
  /* Effects */
  --glass-toolbar-rail-bg
  --glass-toolbar-rail-blur
  --glass-toolbar-shadow
  
  /* Timing */
  --glass-toolbar-duration
  --glass-toolbar-ease
}
```

### React Integration
The component reads CSS variables dynamically:

```tsx
// Auto-calculates layout from CSS variables
const railWidth = styles.getPropertyValue('--glass-toolbar-rail-width').trim()
const panelWidth = styles.getPropertyValue('--glass-toolbar-panel-width').trim()
const expandedWidth = `calc(${railWidth} + ${panelWidth})`
root.style.setProperty('--glass-toolbar-offset', expanded ? expandedWidth : railWidth)
```

---

## 🎯 Quick Customization Recipes

### Recipe 1: Premium Walnut & Gold Theme (Dark)
Complete premium dark theme with rich walnut tones and gold accents:

```css
:root {
  /* Premium walnut & gold theme colors */
  --walnut-dark: #191410;
  --walnut-darker: #0f0c0a;
  --walnut-darkest: #080605;
  --walnut-medium: #2a201a;
  --walnut-highlight: #3d2f25;
  --toolbar-gold: oklch(0.88 0.07 88);
  --toolbar-gold-bright: oklch(0.92 0.09 88);
  --toolbar-gold-muted: oklch(0.75 0.06 88);
  
  --glass-toolbar-rail-width: 135px;
  
  /* Premium dark theme with walnut & gold */
  --glass-toolbar-frost-tint: 25, 20, 16; /* Walnut base */
  --glass-toolbar-frost-accent: 216, 179, 130; /* Gold accent */
  --glass-toolbar-frost-dark: 0, 0, 0; /* Shadow base */
  
  /* Premium rail with walnut gradient background */
  --glass-toolbar-rail-bg: linear-gradient(
    90deg,
    rgba(25, 20, 16, 0.92) 0%,
    rgba(25, 20, 16, 0.88) 30%,
    rgba(42, 32, 26, 0.85) 70%,
    rgba(15, 12, 10, 0.95) 100%
  );
  --glass-toolbar-rail-border: var(--toolbar-gold-muted);
  --glass-toolbar-rail-text: rgba(255, 255, 255, 0.92);
  --glass-toolbar-rail-label: rgba(255, 255, 255, 0.45);
  
  /* Premium panel with walnut gradient */
  --glass-toolbar-panel-bg: linear-gradient(
    90deg,
    rgba(15, 12, 10, 0.88) 0%,
    rgba(25, 20, 16, 0.82) 50%,
    rgba(8, 6, 5, 0.9) 100%
  );
  --glass-toolbar-panel-border: var(--toolbar-gold-muted);
}

/* Enhanced glassmorphism effects */
.glass-toolbar__rail {
  backdrop-filter: blur(20px) saturate(1.4) contrast(1.05);
  box-shadow: 
    inset 2px 0 3px rgba(255, 255, 255, 0.05),
    inset -2px 0 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),
    4px 0 24px rgba(0, 0, 0, 0.4),
    2px 0 8px rgba(0, 0, 0, 0.3);
}

/* Glowing gold accent stripe */
.glass-toolbar__rail::after {
  content: '';
  position: absolute;
  top: 20%;
  bottom: 20%;
  right: -1px;
  width: 2px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--toolbar-gold-muted) 15%,
    var(--toolbar-gold) 50%,
    var(--toolbar-gold-muted) 85%,
    transparent 100%
  );
  opacity: 0.9;
  filter: drop-shadow(0 0 4px var(--toolbar-gold));
}
```

### Recipe 2: Clean White Glass Theme (Light)
Elegant light theme with pristine white glass and gold accents:

```css
:root:not([data-theme="dark"]) .glass-toolbar,
html[data-theme="light"] .glass-toolbar {
  /* Light theme with clean white/glass tones */
  --glass-toolbar-frost-tint: 255, 255, 255; /* Pure white base */
  --glass-toolbar-frost-accent: 216, 179, 130; /* Gold accent */
  
  /* Clean white glass rail */
  --glass-toolbar-rail-bg: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.65) 30%,
    rgba(248, 248, 248, 0.70) 70%,
    rgba(255, 255, 255, 0.80) 100%
  );
  --glass-toolbar-rail-overlay: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(248, 248, 248, 0.2) 40%,
    rgba(255, 255, 255, 0.3) 100%
  );
  --glass-toolbar-rail-border: var(--toolbar-gold);
  --glass-toolbar-rail-text: rgba(0, 0, 0, 0.85);
  --glass-toolbar-rail-label: rgba(0, 0, 0, 0.45);
  
  /* Clean white glass panel */
  --glass-toolbar-panel-bg: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(248, 248, 248, 0.80) 50%,
    rgba(255, 255, 255, 0.90) 100%
  );
  --glass-toolbar-panel-border: var(--toolbar-gold);
  
  /* Interactive elements */
  --glass-toolbar-mark-bg: rgba(255, 255, 255, 0.20);
  --glass-toolbar-pill-bg: rgba(255, 255, 255, 0.15);
  --glass-toolbar-pill-hover-bg: rgba(255, 255, 255, 0.30);
  --glass-toolbar-pill-active-bg: rgba(255, 255, 255, 0.40);
  
  /* Text colors for white backgrounds */
  --glass-toolbar-panel-text: rgba(0, 0, 0, 0.85);
  --glass-toolbar-panel-muted: rgba(0, 0, 0, 0.58);
  --glass-toolbar-subnav-text: rgba(0, 0, 0, 0.88);
  --glass-toolbar-subnav-subtext: rgba(0, 0, 0, 0.58);
  --glass-toolbar-subnav-hover-bg: rgba(255, 255, 255, 0.20);
  --glass-toolbar-footer-bg: rgba(255, 255, 255, 0.15);
  --glass-toolbar-footer-hover-bg: rgba(255, 255, 255, 0.25);
}
```

### Recipe 3: Complete Dual-Theme Setup
Implement both premium themes with automatic theme switching:

```css
:root {
  /* Global theme colors */
  --walnut-dark: #191410;
  --walnut-darker: #0f0c0a;
  --walnut-darkest: #080605;
  --walnut-medium: #2a201a;
  --walnut-highlight: #3d2f25;
  --toolbar-gold: oklch(0.88 0.07 88);
  --toolbar-gold-bright: oklch(0.92 0.09 88);
  --toolbar-gold-muted: oklch(0.75 0.06 88);
  
  --glass-toolbar-rail-width: 135px;
  --glass-toolbar-panel-width: 380px;
  
  /* Dark theme (default) - Premium walnut */
  --glass-toolbar-frost-tint: 25, 20, 16;
  --glass-toolbar-frost-accent: 216, 179, 130;
  --glass-toolbar-frost-dark: 0, 0, 0;
  
  --glass-toolbar-rail-bg: linear-gradient(
    90deg,
    rgba(25, 20, 16, 0.92) 0%,
    rgba(25, 20, 16, 0.88) 30%,
    rgba(42, 32, 26, 0.85) 70%,
    rgba(15, 12, 10, 0.95) 100%
  );
  --glass-toolbar-panel-bg: linear-gradient(
    90deg,
    rgba(15, 12, 10, 0.88) 0%,
    rgba(25, 20, 16, 0.82) 50%,
    rgba(8, 6, 5, 0.9) 100%
  );
  --glass-toolbar-rail-border: var(--toolbar-gold-muted);
  --glass-toolbar-rail-text: rgba(255, 255, 255, 0.92);
}

/* Light theme override - Clean white glass */
:root:not([data-theme="dark"]) .glass-toolbar,
html[data-theme="light"] .glass-toolbar {
  --glass-toolbar-frost-tint: 255, 255, 255;
  
  --glass-toolbar-rail-bg: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.65) 30%,
    rgba(248, 248, 248, 0.70) 70%,
    rgba(255, 255, 255, 0.80) 100%
  );
  --glass-toolbar-panel-bg: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(248, 248, 248, 0.80) 50%,
    rgba(255, 255, 255, 0.90) 100%
  );
  --glass-toolbar-rail-border: var(--toolbar-gold);
  --glass-toolbar-rail-text: rgba(0, 0, 0, 0.85);
  --glass-toolbar-pill-bg: rgba(255, 255, 255, 0.15);
  --glass-toolbar-pill-hover-bg: rgba(255, 255, 255, 0.30);
  --glass-toolbar-pill-active-bg: rgba(255, 255, 255, 0.40);
}

/* Enhanced glassmorphism for both themes */
.glass-toolbar__rail {
  backdrop-filter: blur(20px) saturate(1.4) contrast(1.05);
  box-shadow: 
    inset 2px 0 3px rgba(255, 255, 255, 0.05),
    inset -2px 0 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),
    4px 0 24px rgba(0, 0, 0, 0.4),
    2px 0 8px rgba(0, 0, 0, 0.3);
}

/* Gold accent stripe for both themes */
.glass-toolbar__rail::after {
  content: '';
  position: absolute;
  top: 20%;
  bottom: 20%;
  right: -1px;
  width: 2px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--toolbar-gold-muted) 15%,
    var(--toolbar-gold) 50%,
    var(--toolbar-gold-muted) 85%,
    transparent 100%
  );
  opacity: 0.9;
  filter: drop-shadow(0 0 4px var(--toolbar-gold));
}
```

**Usage:**
- Automatically switches between walnut (dark) and white (light) themes
- Maintains gold accents and premium effects in both modes
- Perfect for sites with theme toggle functionality

### Recipe 4: Wider Rail
```css
:root {
  --glass-toolbar-rail-width: 150px;
}

/* Scale icons proportionally */
.glass-toolbar__pill-icon-wrapper {
  width: 68px;   /* 64 × (150/135) */
  height: 38px;  /* 36 × (150/135) */
}

.glass-toolbar__pill-icon-wrapper svg {
  width: 31px;   /* 28 × (150/135) */
  height: 31px;
}
```

### Recipe 2: Different Color Theme
```css
:root {
  --glass-toolbar-frost-tint: 20, 30, 40;        /* Your RGB */
  --glass-toolbar-frost-accent: 100, 150, 255;   /* Your accent RGB */
  --toolbar-primary: oklch(0.8 0.1 220);         /* Your main color */
  --glass-toolbar-rail-border: var(--toolbar-primary);
  --glass-toolbar-panel-border: var(--toolbar-primary);
}
```

### Recipe 3: Minimal Glass Effect
```css
.glass-toolbar__rail {
  backdrop-filter: blur(8px) saturate(1.0);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}
```

### Recipe 4: No Accent Stripe
```css
.glass-toolbar__rail::after {
  display: none;
}
```

---

## 🚀 Advanced Techniques

### Custom Animations
```css
@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 4px var(--toolbar-gold)); }
  50% { filter: drop-shadow(0 0 12px var(--toolbar-gold)); }
}

.glass-toolbar__rail::after {
  animation: pulse-glow 3s ease-in-out infinite;
}
```

### Dynamic Themes
```css
/* Theme switching via data attributes */
[data-toolbar-theme="ocean"] {
  --glass-toolbar-frost-tint: 10, 22, 41;
  --glass-toolbar-frost-accent: 74, 144, 226;
}

[data-toolbar-theme="sunset"] {
  --glass-toolbar-frost-tint: 26, 15, 10;
  --glass-toolbar-frost-accent: 255, 107, 53;
}
```

### Performance Optimizations
```css
.glass-toolbar__rail {
  will-change: transform;           /* GPU acceleration hint */
  transform: translateZ(0);         /* Force hardware acceleration */
  contain: layout style;            /* Optimize rendering */
}
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Icons appear too small/large**
- Check rail width and scale icons proportionally
- Use scaling formula: new size = base × (rail width ÷ 88px)

**2. Glass effect not visible**
- Ensure backdrop-filter support
- Check browser compatibility
- Add fallback background colors

**3. Layout shifts on expand/collapse**
- Verify `--glass-toolbar-offset` is updating
- Check CSS calc() syntax
- Ensure container uses the offset variable

**4. Mobile responsiveness broken**
- Check media query breakpoints
- Verify mobile width variables
- Test touch target sizes (min 44px)

### Browser Support
- **Backdrop-filter**: Chrome 76+, Safari 14+, Firefox 103+
- **CSS custom properties**: All modern browsers
- **CSS calc()**: Universal support

### Fallbacks
```css
.glass-toolbar__rail {
  background: rgba(25, 20, 16, 0.9);  /* Fallback */
  background: var(--glass-toolbar-rail-bg);  /* Modern */
}

/* Fallback for no backdrop-filter support */
@supports not (backdrop-filter: blur(1px)) {
  .glass-toolbar__rail {
    background: rgba(25, 20, 16, 0.95);
  }
}
```

---

## 📚 Further Reading

- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [OKLCH Color Space](https://oklch.com/)
- [Glassmorphism Design Principles](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)

---

*This guide covers the complete Glass Toolbar customization system. All techniques have been tested in the premium walnut & gold implementation.*