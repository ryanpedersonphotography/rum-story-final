import React from 'react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import type { PaddingY, Theme, Background, SpacingPreset } from '@/components/ui/SectionWrapper'

interface SpacesLayoutProps {
  children: React.ReactNode
  
  // Header configuration
  header?: {
    scriptAccent?: string
    title?: string
    lead?: string
  }
  
  // Design customization based on our token system
  background?: Background  // 'surface' | 'tint-rose' | 'tint-sage' | 'dark-gradient' | 'image'
  tone?: Tone              // 'light' | 'dark' | 'auto'
  paddingY?: PaddingY      // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid'
  spacing?: SpacingPreset  // Spacing preset for consistent rhythm
  divider?: Divider        // 'none' | 'hairline' | 'thread-gold'
  
  // Layout options
  useContentWrapper?: boolean  // Whether to use 1200px content wrapper
  variant?: string | string[]  // Additional variant classes
  
  // HTML attributes
  className?: string
  id?: string
  
  // Pass through any additional props to Section
  [key: string]: any
}

/**
 * SpacesLayout - Flexible layout component for venue/spaces sections
 * 
 * Features:
 * - Configurable background (surface, tint-rose, tint-sage, dark-gradient)
 * - Adjustable tone for light/dark themes
 * - Flexible padding and dividers
 * - Optional content wrapper for consistent width
 * - Full customization while maintaining defaults
 * 
 * Default Design (Spaces/Venue):
 * - Rose tint background for warmth
 * - Large padding for breathing room
 * - Content wrapper for consistent width
 * - Centered alignment
 * 
 * Examples:
 * ```tsx
 * // Default rose-tinted spaces section
 * <SpacesLayout header={header}>
 *   {content}
 * </SpacesLayout>
 * 
 * // Dark luxury variant
 * <SpacesLayout 
 *   background="dark-gradient" 
 *   tone="dark"
 *   divider="thread-gold"
 * >
 *   {content}
 * </SpacesLayout>
 * 
 * // Light minimal variant
 * <SpacesLayout 
 *   background="surface" 
 *   paddingY="sm"
 *   useContentWrapper={false}
 * >
 *   {content}
 * </SpacesLayout>
 * ```
 */
export default function SpacesLayout({ 
  children, 
  header,
  
  // Design props with sensible defaults
  background = 'tint-rose',  // Default: warm rose tint
  tone = 'auto',              // Auto-detect based on background
  paddingY = 'lg',            // Generous padding
  spacing,                    // Spacing preset (pass through)
  divider = 'none',           // No divider by default
  
  // Layout props
  useContentWrapper = true,   // Use consistent 1200px width by default
  variant,
  
  // HTML props
  className = '',
  id = 'venue',
  
  // Rest of props
  ...rest 
}: SpacesLayoutProps) {
  
  // Build header with defaults
  const resolvedHeader = header ? {
    scriptAccent: header.scriptAccent || 'Your Perfect Setting',
    title: header.title || 'Discover Our Spaces',
    lead: header.lead || 'Every corner tells a story, every space creates memories',
    align: 'center' as const
  } : undefined

  // Build section props
  const sectionProps = {
    as: 'section' as const,
    id,
    
    // Design configuration
    background,
    theme: tone as Theme,
    paddingY,
    spacing,  // Pass through spacing preset
    
    // Header
    header: resolvedHeader,
    
    // Custom styling
    className: `spaces-section ${className}`.trim(),
    
    // Pass through remaining props
    ...rest
  }

  return (
    <SectionWrapper {...sectionProps}>
      {children}
    </SectionWrapper>
  )
}