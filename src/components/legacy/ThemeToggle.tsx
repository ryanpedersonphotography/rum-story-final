"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, forcedTheme } = useTheme()

  const handleClick = React.useCallback(() => {
    const root = document.documentElement
    const current = root.getAttribute("data-theme")

    const next = current === "dark" ? "light" : "dark"
    // constrain to known themes
    setTheme(next === "dark" ? "dark" : "light")
  }, [setTheme])

  if (forcedTheme) return null

  return (
    <button
      type="button"
      className="glass-toolbar__theme-toggle"
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      {/* Visible when theme is NOT light (so user can go TO light) */}
      <span data-hide-on-theme="light" aria-hidden="true">
        <MoonIcon className="glass-toolbar__theme-icon" />
      </span>

      {/* Visible when theme is NOT dark (so user can go TO dark) */}
      <span data-hide-on-theme="dark" aria-hidden="true">
        <SunIcon className="glass-toolbar__theme-icon" />
      </span>
    </button>
  )
}