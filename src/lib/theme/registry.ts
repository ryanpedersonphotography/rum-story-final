/* ==========================================================================
   FILE: src/lib/theme/registry.ts
   LOCATION: /src/lib/theme/registry.ts
   PURPOSE: THEME REGISTRY — Single Source of Truth
   ==========================================================================
   Defines all available themes and brand variants.
   Registry only sets attributes (data-theme, data-brand), never token values.
   Token values live in theme.css and respond to these attributes.
   ========================================================================== */

export type ThemeId = 'light' | 'dark'
export type BrandId = 'romantic' | 'modern'

export interface ThemeDef {
  id: ThemeId
  label: string
  apply(root: HTMLElement): void
}

export interface BrandDef {
  id: BrandId
  label: string
  apply(root: HTMLElement): void
}

export const THEME_REGISTRY: Record<ThemeId, ThemeDef> = {
  light: {
    id: 'light',
    label: 'Light',
    apply(root) {
      root.setAttribute('data-theme', 'light')
      root.style.colorScheme = 'light'
      // MUST match --surface-0 for light and script bgColor
      root.style.backgroundColor = 'oklch(0.98 0 255)'
    },
  },
  dark: {
    id: 'dark',
    label: 'Dark',
    apply(root) {
      root.setAttribute('data-theme', 'dark')
      root.style.colorScheme = 'dark'
      // MUST match --surface-0 for dark and script bgColor
      root.style.backgroundColor = 'oklch(0.20 0.03 255)'
    },
  },
}

export const STORAGE_KEYS = {
  theme: 'rr.theme',
  brand: 'rr.brand',
} as const

export const BRAND_REGISTRY: Record<BrandId, BrandDef> = {
  romantic: {
    id: 'romantic',
    label: 'Romantic',
    apply(root) {
      root.setAttribute('data-brand', 'romantic')
    },
  },
  modern: {
    id: 'modern',
    label: 'Modern',
    apply(root) {
      root.setAttribute('data-brand', 'modern')
    },
  },
}

export function preferredSystemTheme(): ThemeId {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}