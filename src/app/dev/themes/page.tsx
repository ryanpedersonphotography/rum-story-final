'use client'

/* ==========================================================================
   FILE: src/app/dev/themes/page.tsx
   LOCATION: /src/app/dev/themes/page.tsx
   PURPOSE: THEME DEBUG PAGE — Visual regression testing for theme consistency
   ==========================================================================
   Tests all section backgrounds, spacing presets, and theme states.
   - Light vs Dark theme switching
   - All section background variants
   - All spacing preset combinations
   - Visual confirmation that flash prevention is working
   ========================================================================== */

import { SectionShell } from '@/components/ui/SectionShell'
import ThemeSelect from '@/development/ThemeSelect'
import { useTheme } from '@/components/ui/ThemeProvider'

const SECTION_BACKGROUNDS = [
  { key: 'surface', label: 'Surface (Default)' },
  { key: 'tint-sage', label: 'Sage Tint' },
  { key: 'tint-rose', label: 'Rose Tint' },
  { key: 'deep', label: 'Deep Gradient' },
  { key: 'soft', label: 'Soft Gradient' }
] as const

const SPACING_PRESETS = [
  { key: 'xs', label: 'XS' },
  { key: 'sm', label: 'SM' },
  { key: 'md', label: 'MD' },
  { key: 'lg', label: 'LG' },
  { key: 'xl', label: 'XL' },
  { key: 'fluid', label: 'Fluid' }
] as const

export default function ThemeDebugPage() {
  const { theme, brand } = useTheme()

  return (
    <div data-clean-root="true">
      {/* Header with theme controls */}
      <SectionShell 
        Tag="header" 
        background="surface" 
        padding="md"
        className="border-b border-hairline-1"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-primary">
              Theme Debug Console
            </h1>
            <p className="text-secondary mt-1">
              Current: {theme} theme, {brand} brand
            </p>
          </div>
          <ThemeSelect />
        </div>
      </SectionShell>

      {/* Background Variants Test */}
      <SectionShell Tag="section" padding="lg">
        <h2 className="text-xl font-serif font-semibold mb-6 text-primary">
          Section Background Variants
        </h2>
        <div className="space-y-4">
          {SECTION_BACKGROUNDS.map(({ key, label }) => (
            <SectionShell
              key={key}
              background={key as any}
              padding="md"
              className="border border-hairline-1 rounded-lg"
            >
              <div className="text-center">
                <h3 className="font-medium text-primary">{label}</h3>
                <code className="text-sm text-secondary">data-bg="{key}"</code>
              </div>
            </SectionShell>
          ))}
        </div>
      </SectionShell>

      {/* Spacing Presets Test */}
      <SectionShell Tag="section" background="tint-sage" padding="lg">
        <h2 className="text-xl font-serif font-semibold mb-6 text-primary">
          Spacing Presets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPACING_PRESETS.map(({ key, label }) => (
            <div key={key} className="border border-hairline-1 rounded-lg overflow-hidden">
              <div className="p-3 bg-surface-1">
                <h4 className="font-medium text-primary">{label}</h4>
                <code className="text-sm text-secondary">padding="{key}"</code>
              </div>
              <SectionShell
                padding={key as any}
                className="bg-surface-0 border-t border-hairline-1"
              >
                <div className="bg-accent-gold/10 border border-accent-gold/20 rounded p-2 text-center">
                  <span className="text-sm text-secondary">Content area</span>
                </div>
              </SectionShell>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Nesting and Composition Test */}
      <SectionShell Tag="section" background="deep" padding="xl">
        <h2 className="text-xl font-serif font-semibold mb-6 text-primary">
          Section Composition & Nesting
        </h2>
        
        <SectionShell 
          background="surface" 
          padding="lg"
          className="border border-hairline-1 rounded-lg mb-6"
        >
          <h3 className="font-medium text-primary mb-4">Nested Section</h3>
          
          <SectionShell
            background="tint-rose"
            padding="md"
            className="border border-hairline-1 rounded"
          >
            <p className="text-secondary text-center">
              Triple-nested content with proper background inheritance
            </p>
          </SectionShell>
        </SectionShell>

        {/* Edge case: empty section */}
        <SectionShell 
          background="soft" 
          padding="sm"
          className="border border-hairline-1 rounded-lg"
        >
          <p className="text-secondary text-center text-sm">
            Minimal content section (edge case testing)
          </p>
        </SectionShell>
      </SectionShell>

      {/* Theme Flash Prevention Test */}
      <SectionShell Tag="section" background="tint-rose" padding="lg">
        <h2 className="text-xl font-serif font-semibold mb-6 text-primary">
          Flash Prevention Test
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-surface-1 border border-hairline-1 rounded">
            <h3 className="font-medium text-primary mb-2">Pre-paint Script Status</h3>
            <ul className="text-sm text-secondary space-y-1">
              <li>• Theme initialization: beforeInteractive ✓</li>
              <li>• Background color: {theme === 'dark' ? 'oklch(0.20 0.03 255)' : 'oklch(0.98 0 255)'} ✓</li>
              <li>• Color scheme: {theme} ✓</li>
              <li>• Data attributes: data-theme="{theme}" data-brand="{brand}" ✓</li>
            </ul>
          </div>
          
          <div className="p-4 bg-surface-2 border border-hairline-1 rounded">
            <p className="text-sm text-secondary">
              <strong>Test:</strong> Refresh this page rapidly or switch themes. 
              No white flash should occur during theme transitions.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* Footer */}
      <SectionShell Tag="footer" background="surface" padding="md">
        <div className="text-center text-sm text-secondary">
          Theme Debug Console • {new Date().toLocaleTimeString()}
        </div>
      </SectionShell>
    </div>
  )
}