"use client"

import { useTheme } from '@/lib/theme-hooks'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="glass-toolbar__theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <MoonIcon className="glass-toolbar__theme-icon" />
      ) : (
        <SunIcon className="glass-toolbar__theme-icon" />
      )}
    </button>
  )
}