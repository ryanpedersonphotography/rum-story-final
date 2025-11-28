/**
 * Zen System 7.0 - Design Tokens
 * Single source of truth for all design values.
 * DO NOT use magic numbers in components - use these tokens.
 */

const baseSpacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  20: '80px',
} as const;

export const tokens = {
  spacing: {
    ...baseSpacing,
    'text-tight': baseSpacing[1],
    'text-stack': baseSpacing[4],
    'text-block': baseSpacing[8],
  },

  colors: {
    // Base semantics
    ink: '#1a1a1a',
    paper: '#F4F4F0',
    'paper-raised': '#ffffff',
    accent: '#3d5a45',
    'accent-contrast': '#ffffff',
    muted: '#888888',

    // Brand colors (from existing design)
    'brand-walnut': '#191410',
    'brand-gold': 'oklch(0.88 0.07 88)',
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

  fonts: {
    sans: 'var(--font-sans), system-ui, -apple-system, sans-serif',
    serif: 'var(--font-serif), "Playfair Display", serif',
    script: 'var(--font-script), "Dancing Script", cursive',
  },

  motion: {
    easeOut: 'cubic-bezier(0.21, 0.61, 0.35, 1)',
    durationNormal: '0.8s',
  },

  gradients: {
    heroWarm: 'linear-gradient(135deg, #6B4E3D 0%, #3D5A45 100%)',
    heroDusk: 'linear-gradient(135deg, #2b2c3b 0%, #5b3b3b 100%)',
    heroSunset: 'linear-gradient(135deg, oklch(0.75 0.12 60) 0%, oklch(0.45 0.08 30) 100%)',
  },
} as const;

// Type exports for use in atoms/recipes
export type SpacingKey = keyof typeof tokens.spacing;
export type ZLayer = keyof typeof tokens.z;
export type GradientKey = keyof typeof tokens.gradients;
export type ColorKey = keyof typeof tokens.colors;
