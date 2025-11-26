import { useEffect, useState } from 'react'

// Types
export type Theme = 'light' | 'dark'

// 1. No-flash script to run in <head>
// This reads localStorage and system preference to set data-theme immediately
export function initThemeScript(): string {
  return `
    (function() {
      try {
        var local = localStorage.getItem('theme');
        var support = window.matchMedia('(prefers-color-scheme: dark)');
        var theme = local ? local : (support.matches ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (e) {}
    })()
  `
}

// 2. React Hook for Theme Toggling
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