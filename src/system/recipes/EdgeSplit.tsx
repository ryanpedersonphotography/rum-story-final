/**
 * Zen System 7.0 - EdgeSplit Recipe
 * Sticky rail + flowing content with container-aware behavior.
 *
 * Use for: hero intros, “how it works”, story layouts.
 */

import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './EdgeSplit.module.css'

export interface EdgeSplitProps {
  /** Left/right rail content (label, mini-nav, metrics, etc.) */
  rail: ReactNode
  /** Main flowing content */
  children: ReactNode
  /** Mirror layout so rail is on the right on wide screens */
  flip?: boolean
  /** Optional additional className */
  className?: string
}

/**
 * EdgeSplit
 *
 * - Desktop: two-column grid, sticky rail, flowing content.
 * - Narrow containers: collapses to stacked layout, rail scrolls normally.
 */
export function EdgeSplit({
  rail,
  children,
  flip = false,
  className,
}: EdgeSplitProps) {
  return (
    <section
      className={clsx(styles.edgeSplit, flip && styles.flip, className)}
      data-layout="edge-split"
    >
      <div className={styles.rail}>{rail}</div>
      <div className={styles.main}>{children}</div>
    </section>
  )
}