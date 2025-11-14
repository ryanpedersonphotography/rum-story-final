/* ==========================================================================
   FILE: src/components/ui/ThemeProvider.tsx
   LOCATION: /src/components/ui/ThemeProvider.tsx
   PURPOSE: THEME PROVIDER — React Context for Theme Management
   ==========================================================================
   DOM-Driven Theme Synchronization:
   - The pre-paint script in layout.tsx sets data-theme/data-brand before React loads
   - This provider syncs its initial state FROM the DOM (not the other way around)
   - First mount only reads DOM attributes, does NOT reapply styles (prevents flash)
   - After initial sync, manages theme changes normally
   ========================================================================== */

'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  THEME_REGISTRY,
  BRAND_REGISTRY,
  STORAGE_KEYS,
  preferredSystemTheme,
  type ThemeId,
  type BrandId
} from '@/lib/theme/registry'

type ThemeContextValue = {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  brand: BrandId
  setBrand: (brand: BrandId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initial SSR state - will be synced from DOM on client mount
  const [theme, setThemeState] = useState<ThemeId>('light')
  const [brand, setBrandState] = useState<BrandId>('romantic')
  
  // Track if we've mounted and synced from DOM
  const mountedRef = useRef(false)
  const themeRef = useRef<ThemeId>('light')
  const brandRef = useRef<BrandId>('romantic')

  // Initial DOM → state sync (runs once on client, does NOT re-apply styles)
  useEffect(() => {
    if (typeof document === 'undefined') return

    const domTheme = document.documentElement.getAttribute('data-theme') as ThemeId | null
    const domBrand = document.documentElement.getAttribute('data-brand') as BrandId | null

    // Sync state from DOM without applying styles
    if (domTheme && domTheme !== themeRef.current) {
      themeRef.current = domTheme
      setThemeState(domTheme)
    }

    if (domBrand && domBrand !== brandRef.current) {
      brandRef.current = domBrand
      setBrandState(domBrand)
    }

    // Mark as mounted - future changes will apply to DOM
    mountedRef.current = true
  }, [])

  // Keep refs in sync with state
  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    brandRef.current = brand
  }, [brand])

  /* Apply theme to DOM */
  const applyThemeToDom = useCallback((nextTheme: ThemeId) => {
    if (typeof document === 'undefined') return
    THEME_REGISTRY[nextTheme].apply(document.documentElement)
  }, [])

  const applyBrandToDom = useCallback((nextBrand: BrandId) => {
    if (typeof document === 'undefined') return
    BRAND_REGISTRY[nextBrand].apply(document.documentElement)
  }, [])

  /* Set theme: update state, DOM (after mount), and localStorage */
  const setTheme = useCallback((newTheme: ThemeId) => {
    if (themeRef.current === newTheme) return
    
    themeRef.current = newTheme
    setThemeState(newTheme)
    
    // Only apply to DOM if we've already mounted and synced
    if (mountedRef.current) {
      applyThemeToDom(newTheme)
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.theme, newTheme)
    }
  }, [applyThemeToDom])

  /* Set brand: update state, DOM (after mount), and localStorage */
  const setBrand = useCallback((newBrand: BrandId) => {
    if (brandRef.current === newBrand) return
    
    brandRef.current = newBrand
    setBrandState(newBrand)
    
    // Only apply to DOM if we've already mounted and synced
    if (mountedRef.current) {
      applyBrandToDom(newBrand)
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.brand, newBrand)
    }
  }, [applyBrandToDom])

  /* Sync across tabs and respond to OS preference changes */
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Cross-tab sync via storage events
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.theme && e.newValue) {
        const nextTheme = e.newValue as ThemeId
        if (nextTheme && nextTheme !== themeRef.current) {
          themeRef.current = nextTheme
          setThemeState(nextTheme)
          applyThemeToDom(nextTheme)
        }
      }
      if (e.key === STORAGE_KEYS.brand && e.newValue) {
        const nextBrand = e.newValue as BrandId
        if (nextBrand && nextBrand !== brandRef.current) {
          brandRef.current = nextBrand
          setBrandState(nextBrand)
          applyBrandToDom(nextBrand)
        }
      }
    }

    // OS preference change detection
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onMqlChange = () => {
      // Only auto-switch if user hasn't explicitly set a theme
      if (!localStorage.getItem(STORAGE_KEYS.theme)) {
        const systemTheme = preferredSystemTheme()
        if (systemTheme !== themeRef.current) {
          themeRef.current = systemTheme
          setThemeState(systemTheme)
          applyThemeToDom(systemTheme)
        }
      }
    }

    window.addEventListener('storage', onStorage)
    mql.addEventListener('change', onMqlChange)

    return () => {
      window.removeEventListener('storage', onStorage)
      mql.removeEventListener('change', onMqlChange)
    }
  }, [applyBrandToDom, applyThemeToDom])

  const value = useMemo(
    () => ({ theme, setTheme, brand, setBrand }),
    [theme, setTheme, brand, setBrand]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/* useTheme Hook — Access theme context */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}