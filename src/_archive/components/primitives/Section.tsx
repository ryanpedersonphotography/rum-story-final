import { ReactNode } from 'react'

type SectionWidth = 'standard' | 'wide' | 'full' | 'full-under-toolbar'
type SectionSurface = 'canvas' | 'neutral-1' | 'neutral-2' | 'neutral-3' | 'brand-soft' | 'brand-strong'
type SectionElevation = '0' | '1' | '2' | '3'
type SectionVariant = 'hero' | 'flush'

interface SectionProps {
  children: ReactNode
  width?: SectionWidth
  surface?: SectionSurface
  elevation?: SectionElevation
  variant?: SectionVariant
  bleedBg?: boolean
  className?: string
  id?: string
  style?: React.CSSProperties
}

export function Section({
  children,
  width,
  surface,
  elevation,
  variant,
  bleedBg = false,
  className = '',
  id,
  style,
}: SectionProps) {
  const classes = [
    'Section',
    bleedBg && 'Section--bleed-bg',
    className,
  ].filter(Boolean).join(' ')

  return (
    <section
      className={classes}
      data-width={width}
      data-surface={surface}
      data-elevation={elevation}
      data-variant={variant}
      id={id}
      style={style}
    >
      {children}
    </section>
  )
}

// Inner wrapper for constrained content
interface SectionInnerProps {
  children: ReactNode
  className?: string
}

export function SectionInner({ children, className = '' }: SectionInnerProps) {
  return (
    <div className={`Section-inner ${className}`.trim()}>
      {children}
    </div>
  )
}

// Content wrapper (used with full-width sections)
export function SectionContent({ children, className = '' }: SectionInnerProps) {
  return (
    <div className={`Section-content ${className}`.trim()}>
      {children}
    </div>
  )
}

export default Section
