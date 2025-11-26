"use client"

import { useEffect, useState } from 'react'

// Types
export type Theme = 'light' | 'dark'

// React Hook for Theme Toggling
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  // Sync with DOM on mount
  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme
    if (current) setTheme(current)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
  }

  return { theme, toggleTheme }
}
