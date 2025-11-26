import { ReactNode, CSSProperties } from 'react'

type SectionWidth = 'standard' | 'wide' | 'full' | 'full-under-toolbar'
type SectionSurface = 'canvas' | 'neutral-1' | 'neutral-2' | 'neutral-3' | 'brand-soft' | 'brand-strong'
type SectionElevation = 0 | 1 | 2 | 3
type SectionVariant = 'hero' | 'flush'

interface SectionShellProps {
  children: ReactNode
  width?: SectionWidth
  surface?: SectionSurface
  elevation?: SectionElevation
  variant?: SectionVariant
  bleedBg?: boolean
  className?: string
  id?: string
  style?: CSSProperties
}

export function SectionShell({
  children,
  width,
  surface,
  elevation,
  variant,
  bleedBg = false,
  className = '',
  id,
  style,
}: SectionShellProps) {
  const classes = [
    'Section',
    bleedBg && 'Section--bleed-bg',
    className,
  ].filter(Boolean).join(' ')

  // Elevation must be string for data attribute
  const elevationStr = elevation !== undefined ? String(elevation) : undefined

  return (
    <section
      className={classes}
      data-width={width}
      data-surface={surface}
      data-elevation={elevationStr}
      data-variant={variant}
      id={id}
      style={style}
    >
      {/* 
        Logic for inner wrapper:
        - If 'full' or 'full-under-toolbar', use Section-content inside for text constraint.
        - Otherwise use Section-inner.
      */}
      {(width === 'full' || width === 'full-under-toolbar') ? (
        <div className="Section-inner">
          <div className="Section-content">{children}</div>
        </div>
      ) : (
        <div className="Section-inner">{children}</div>
      )}
    </section>
  )
}
