/**
 * Zen System 7.0 - Layout Atom
 * Handles geometry: stack, cluster, and grid arrangements.
 * 
 * Use this for all spatial relationships between elements.
 * DO NOT use raw flexbox/grid in pages - use Layout instead.
 */

import styles from './Layout.module.css'
import { ElementType, ReactNode, CSSProperties } from 'react'
import type { SpacingKey } from '../tokens'
import clsx from 'clsx'

type LayoutType = 'stack' | 'cluster' | 'grid'
type AlignValue = 'start' | 'center' | 'end' | 'stretch'
type JustifyValue = 'start' | 'center' | 'end' | 'between'

interface LayoutProps {
  /** HTML element to render */
  as?: ElementType
  /** Layout type: stack (column), cluster (row wrap), grid */
  type?: LayoutType
  /** Gap between items - uses spacing tokens */
  gap?: SpacingKey
  /** Cross-axis alignment */
  align?: AlignValue
  /** Main-axis justification */
  justify?: JustifyValue
  /** Number of grid columns (only for type="grid") */
  cols?: number
  /** Padding around container - uses spacing tokens */
  padding?: SpacingKey
  /** Additional class names */
  className?: string
  /** Inline styles */
  style?: CSSProperties
  /** Child elements */
  children: ReactNode
}

export function Layout({
  as: Component = 'div',
  type = 'stack',
  gap = 4,
  align,
  justify,
  cols = 1,
  padding = 0,
  children,
  className,
  style: styleProp,
}: LayoutProps) {
  const style = {
    '--gap': `var(--space-${gap})`,
    '--pad': `var(--space-${padding})`,
    '--cols': cols,
    ...styleProp,
  } as CSSProperties

  return (
    <Component
      className={clsx(
        styles.base,
        styles[type],
        align && styles[`align-${align}`],
        justify && styles[`justify-${justify}`],
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  )
}
