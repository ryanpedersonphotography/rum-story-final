/**
 * Zen System 7.0 - Surface Atom
 * Handles paint: background colors, elevation, radius, borders.
 * 
 * Use this for visual containers and cards.
 * DO NOT use raw background/box-shadow in pages - use Surface instead.
 */

import styles from './Surface.module.css'
import { ElementType, ReactNode, CSSProperties } from 'react'
import clsx from 'clsx'

type SurfaceTone = 'paper' | 'paper-raised' | 'accent' | 'transparent' | 'glass'
type SurfaceElevation = 'flat' | 'raised' | 'float'
type SurfaceRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

interface SurfaceProps {
  /** HTML element to render */
  as?: ElementType
  /** Background tone - uses color tokens */
  tone?: SurfaceTone
  /** Elevation level (box-shadow) */
  elevation?: SurfaceElevation
  /** Border radius */
  radius?: SurfaceRadius
  /** Show border */
  border?: boolean
  /** Child elements */
  children?: ReactNode
  /** Additional class names */
  className?: string
  /** Inline styles */
  style?: CSSProperties
  /** HTML id attribute */
  id?: string
}

export function Surface({
  as: Component = 'div',
  tone = 'paper',
  elevation = 'flat',
  radius = 'none',
  border = false,
  children,
  className,
  style,
  id,
}: SurfaceProps) {
  return (
    <Component
      id={id}
      className={clsx(
        styles.base,
        styles[`tone-${tone}`],
        styles[`elev-${elevation}`],
        styles[`rad-${radius}`],
        border && styles.border,
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  )
}
