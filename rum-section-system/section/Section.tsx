// src/components/layout/Section.tsx
import { ReactNode, ElementType } from 'react'

type SectionLayer = 'base' | 'partial' | 'isolated'
type SectionWidth = 'prose' | 'content' | 'wide' | 'full' 
type SectionAlign = 'left' | 'center' | 'right'
type SectionElevation = 0 | 1 | 2 | 3

interface SectionHeader {
  scriptAccent?: string
  title?: string
  lead?: string
  align?: 'left' | 'center' | 'right'
}

interface SectionProps {
  // Core layout props
  as?: ElementType
  layer?: SectionLayer
  width?: SectionWidth
  align?: SectionAlign
  elevation?: SectionElevation

  // Header configuration
  header?: SectionHeader
  headerWidth?: SectionWidth

  // Content configuration  
  contentWidth?: SectionWidth
  paddingY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid'
  background?: 'none' | 'surface' | 'tint-rose' | 'tint-sage' | 'gradient'

  // Standard React props
  children?: ReactNode
  className?: string
  id?: string

  // Data attributes for styling hooks
  'data-section'?: string
  [key: `data-${string}`]: any
}

// Simple className utility (replaces cn from utils)
function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Section({
  as: Component = 'section',
  layer = 'base',
  width = 'content', 
  align = 'center',
  elevation = 0,
  
  header,
  headerWidth = 'prose',
  
  contentWidth = 'content',
  paddingY = 'lg',
  background = 'none',
  
  children,
  className,
  id,
  
  'data-section': dataSection,
  ...dataProps
}: SectionProps) {
  
  // Build data attributes for CSS targeting
  const dataAttributes = {
    'data-layer': layer,
    'data-width': width,
    'data-align': align,
    'data-elevation': elevation,
    'data-padding-y': paddingY,
    'data-bg': background,
    'data-section': dataSection,
    ...dataProps
  }

  return (
    <Component
      id={id}
      className={classNames('section', className)}
      {...dataAttributes}
    >
      {header && (
        <header 
          className="section__header"
          data-header-width={headerWidth}
          data-header-align={header.align || 'center'}
        >
          <div className="section__header-container">
            {header.scriptAccent && (
              <div className="section__script-accent">
                {header.scriptAccent}
              </div>
            )}
            {header.title && (
              <h2 className="section__title">
                {header.title}
              </h2>
            )}
            {header.lead && (
              <p className="section__lead">
                {header.lead}
              </p>
            )}
          </div>
        </header>
      )}
      
      <div 
        className="section__content"
        data-content-width={contentWidth}
      >
        {children}
      </div>
    </Component>
  )
}