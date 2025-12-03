/**
 * Zen System 7.0 - Design Tokens
 * Single source of truth for all design values.
 * DO NOT use magic numbers in components - use these tokens.
 */

const baseSpacing = {
  0: '0px',
  '0.5': '2px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  20: '80px',
  32: '128px',
  40: '160px',
} as const;

export const tokens = {
  spacing: {
    ...baseSpacing,
    'text-tight': baseSpacing[1],
    'text-stack': baseSpacing[4],
    'text-block': baseSpacing[8],
  },

  colors: {
    // 1. Core Brand Palette (Base Hex Colors)
    'forest-ink': '#1A281F',
    'ivory-canvas': '#F7F5F1',
    'eucalyptus-sage': '#8FA093',
    'antique-gold': '#C5A059',
    'soft-rose': '#D8A7B1',
    'charcoal': '#22201F',
    'line-greige': '#D7D2C9',
    'overlay-ink': '#101613',
    'error-red': '#B4443A',
    'success-green': '#3D6A4D',



    // Derived Core Tones
    'ivory-strong': '#F1EEE7',
    'sage-soft': '#A4B2A6',
    'sage-deep': '#6F8478',
    'gold-soft': 'rgba(197, 160, 89, 0.18)',
    'ink-soft': 'rgba(26, 40, 31, 0.85)',

    // 2. Semantic Tokens (The API for components)
    // Backgrounds
    'bg-page': 'var(--rr-bg-page)',
    'bg-canvas-soft': 'var(--rr-bg-canvas-soft)',
    'bg-surface': 'var(--rr-bg-surface)',
    'bg-surface-alt': 'var(--rr-bg-surface-alt)',
    'bg-hero': 'var(--rr-bg-hero)',
    'bg-footer': 'var(--rr-bg-footer)',

    // Text
    'text-main': 'var(--rr-text-main)',
    'text-soft': 'var(--rr-text-soft)',
    'text-on-dark': 'var(--rr-text-on-dark)',
    'text-accent': 'var(--rr-text-accent)',
    'text-meta': 'var(--rr-text-meta)',
    'text-error': 'var(--rr-text-error)',

    // Borders
    'border-subtle': 'var(--rr-border-subtle)',
    'border-strong': 'var(--rr-border-strong)',
    'border-subtle-strong': 'var(--rr-border-strong)',
    'feature-shell-outline': 'rgba(247, 245, 241, 0.2)',

    // Accents
    'accent-primary': 'var(--rr-accent-primary)',
    'accent-secondary': 'var(--rr-accent-secondary)',
    'accent-tertiary': 'var(--rr-accent-tertiary)',
    'accent-focus-ring': 'var(--rr-accent-focus-ring)',

    // States
    'state-hover': 'var(--rr-state-hover)',
    'state-pressed': 'var(--rr-state-pressed)',
    'state-selected': 'var(--rr-state-selected)',
    'state-disabled': 'var(--rr-state-disabled)',

    // Overlays
    'overlay-scrim': 'var(--rr-overlay-scrim)',

        // Legacy / Compatibility Mapping (Deprecated but needed for build)
        ink: 'var(--rr-text-main)',               // Mapped to text-main
        paper: 'var(--rr-bg-page)',             // Mapped to bg-page
        'paper-raised': 'var(--rr-bg-surface)',    // Mapped to bg-surface
        accent: 'var(--rr-accent-primary)',            // Mapped to accent-primary (Gold)
        'accent-contrast': 'var(--rr-text-main)', // Dark text on gold
        muted: 'var(--rr-text-meta)',             // Mapped to accent-secondary (Sage)        
        // Old Palettes (remapped to new values per spec)
        'warm-walnut': '#1A281F',     // forest-ink
        'dusty-rose': '#D8A7B1',      // soft-rose
        'sage-green': '#8FA093',      // eucalyptus-sage
        'accent-gold': '#C5A059',     // antique-gold
        'champagne-gold': '#C5A059',  // antique-gold
        'romantic-ivory': '#F7F5F1',  // ivory-canvas
        'cream-pearl': '#F1EEE7',     // ivory-strong
        'blush-pink': '#D8A7B1',      // soft-rose (approx)
        'deep-brown': '#141915',      // bg-footer
        'text-dark': '#1A281F',       // forest-ink
    
      },

  z: {
    base: 0,
    float: 10,
    overlay: 100,
    toolbar: 500,
    modal: 1000,
  },

  layout: {
    sidebarWidth: '135px',
    contentWidth: '1200px',
  },

  shadows: {
    flat: 'none',
    raised: '0 8px 24px rgba(0, 0, 0, 0.12)',
    float: '0 16px 40px rgba(0, 0, 0, 0.18)',
    'float-heavy': '0 20px 50px rgba(0, 0, 0, 0.08)',
  },

  radius: {
    none: '0',
    sm: '4px',
    md: '12px',
    lg: '24px',
    full: '9999px',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  fonts: {
    display: "'Playfair Display', serif",
    body: "'Montserrat', sans-serif",
    script: "'Dancing Script', cursive",
    // Legacy aliases to prevent breaking changes immediately, mapped to new tokens
    sans: "'Montserrat', sans-serif",
    serif: "'Playfair Display', serif",
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem',
    '5xl': '2.5rem',
    '6xl': '3rem',
    hero: 'clamp(3rem, 8vw, 5.5rem)',
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  motion: {
    easeOut: 'cubic-bezier(0.21, 0.61, 0.35, 1)',
    durationNormal: '0.8s',
  },

  gradients: {
    heroWarm: 'linear-gradient(135deg, #6B4E3D 0%, #4A3426 100%)',     // warm-walnut -> deep-brown
    heroDusk: 'linear-gradient(135deg, #4A3426 0%, #2C2416 100%)',     // deep-brown -> text-dark
    heroSunset: 'linear-gradient(135deg, #9D6B7B 0%, #6B4E3D 100%)',   // dusty-rose -> warm-walnut
    'hero-gradient': 'var(--rr-hero-gradient)',
    // Recipe tokens for HeroSection
    'hero-bg-warm': 'var(--rr-hero-gradient)',
    'hero-bg-glass-light': 'rgba(247, 245, 241, 0.7)', // ivory @ 70%
    'hero-bg-glass-dark': 'rgba(26, 40, 31, 0.5)',    // forest-ink @ 50%
    'feature-shell-spotlight': 'radial-gradient(circle at top, rgba(247, 245, 241, 0.35), rgba(16, 22, 19, 0.65))',
  },
} as const;

// Type exports for use in atoms/recipes
export type SpacingKey = keyof typeof tokens.spacing;
export type ZLayer = keyof typeof tokens.z;
export type GradientKey = keyof typeof tokens.gradients;
export type ColorKey = keyof typeof tokens.colors;
export type FontSizeKey = keyof typeof tokens.fontSize;
export type FontWeightKey = keyof typeof tokens.fontWeight;
export type FontKey = keyof typeof tokens.fonts;
export type ShadowKey = keyof typeof tokens.shadows;
export type RadiusKey = keyof typeof tokens.radius;
export type BreakpointKey = keyof typeof tokens.breakpoints;