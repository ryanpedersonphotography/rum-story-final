'use client'

import { useTheme } from '@/lib/theme'

interface ThemeToggleProps {
  className?: string
}

/**
 * Accessible theme toggle button component.
 * Uses the useTheme hook to manage light/dark mode switching.
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className={`ThemeToggle ${className}`.trim()}
        aria-label="Toggle theme"
        disabled
        style={{
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-bg-elevated)',
          cursor: 'not-allowed',
          opacity: 0.5,
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>◑</span>
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`ThemeToggle ${className}`.trim()}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      title={`Currently ${theme} mode. Click to switch.`}
      style={{
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-bg-elevated)',
        color: 'var(--color-text)',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <span 
        style={{ 
          fontSize: '1.25rem',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
        }}
        aria-hidden="true"
      >
        {isDark ? '🌙' : '🌞'}
      </span>
    </button>
  )
}

export default ThemeToggle
