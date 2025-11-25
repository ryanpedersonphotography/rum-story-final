'use client'

import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * Get the initial theme based on localStorage or system preference.
 * Safe to call during SSR (returns 'light' as fallback).
 */
export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return systemPrefersDark ? 'dark' : 'light'
}

/**
 * Apply theme to the document and persist to localStorage.
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  localStorage.setItem(STORAGE_KEY, theme)
}

/**
 * Toggle between light and dark themes.
 */
export function toggleTheme(): Theme {
  const current = document.documentElement.dataset.theme as Theme
  const next: Theme = current === 'light' ? 'dark' : 'light'
  applyTheme(next)
  return next
}

/**
 * Get the current theme from the document.
 */
export function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return (document.documentElement.dataset.theme as Theme) || 'light'
}

/**
 * React hook for theme management.
 * Returns the current theme and a function to toggle it.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Sync with document on mount
  useEffect(() => {
    setMounted(true)
    const currentTheme = getCurrentTheme()
    setTheme(currentTheme)
  }, [])

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no explicit user preference stored
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const newTheme: Theme = e.matches ? 'dark' : 'light'
        applyTheme(newTheme)
        setTheme(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mounted])

  const toggle = useCallback(() => {
    const next = toggleTheme()
    setTheme(next)
  }, [])

  const setThemeValue = useCallback((newTheme: Theme) => {
    applyTheme(newTheme)
    setTheme(newTheme)
  }, [])

  return {
    theme,
    toggleTheme: toggle,
    setTheme: setThemeValue,
    mounted, // Useful for avoiding hydration mismatch
  }
}

/**
 * Inline script for no-flash theme initialization.
 * Include this in <head> via Next.js Script component with strategy="beforeInteractive"
 * or as a raw <script> in layout.tsx.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`
