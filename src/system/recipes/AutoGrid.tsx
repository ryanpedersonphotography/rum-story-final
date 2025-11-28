/**
 * Zen System 7.0 - AutoGrid Recipe
 * Responsive grid that auto-fits items based on min width.
 * 
 * Use for card grids, feature lists, photo galleries.
 * Uses CSS auto-fit for responsive columns without media queries.
 */

import { Layout } from '../atoms/Layout'
import type { SpacingKey } from '../tokens'
import { ReactNode, CSSProperties } from 'react'

interface AutoGridProps {
  /** Child elements (grid items) */
  children: ReactNode
  /** Gap between items - uses spacing tokens */
  gap?: SpacingKey
  /** Minimum width for each item before wrapping */
  minItemWidth?: string
  /** Additional class names */
  className?: string
}

export function AutoGrid({
  children,
  gap = 4,
  minItemWidth = '280px',
  className,
}: AutoGridProps) {
  const style = {
    gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
  } as CSSProperties

  return (
    <Layout type="grid" gap={gap} style={style} className={className}>
      {children}
    </Layout>
  )
}
