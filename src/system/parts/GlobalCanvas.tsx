/**
 * Zen System 7.0 - GlobalCanvas
 * App shell that provides the two-column layout with sidebar ghost.
 * 
 * The sidebar ghost column reserves space for the fixed GlassToolbar.
 * On mobile, the grid collapses to single column and toolbar hides.
 */

import styles from './GlobalCanvas.module.css'
import { ReactNode } from 'react'

interface GlobalCanvasProps {
  sidebar: ReactNode
  children: ReactNode
}

export function GlobalCanvas({ sidebar, children }: GlobalCanvasProps) {
  return (
    <div className={styles.canvas}>
      <aside className={styles.sidebarGhost}>{sidebar}</aside>
      <main className={styles.content}>{children}</main>
    </div>
  )
}
