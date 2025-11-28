/**
 * Zen System 7.0 - Section Recipe
 * Standard narrative section with max-width, padding, and optional dividers.
 * 
 * Use this for page content sections.
 * Combines Surface + Layout atoms with content constraints.
 */

import { Surface } from '../atoms/Surface'
import { Layout } from '../atoms/Layout'
import { ReactNode } from 'react'
import styles from './Section.module.css'
import clsx from 'clsx'

type SectionVariant = 'default' | 'hero-warm' | 'hero-dusk' | 'hero-sunset'

interface SectionProps {
  /** Child elements */
  children: ReactNode
  /** Show bottom divider line */
  divider?: boolean
  /** Visual variant (gradient backgrounds) */
  variant?: SectionVariant
  /** Additional class names */
  className?: string
  /** HTML id attribute */
  id?: string
}

export function Section({
  children,
  divider,
  variant = 'default',
  className,
  id,
}: SectionProps) {
  return (
    <Surface
      as="section"
      tone="transparent"
      className={clsx(
        divider && styles.dividerBottom,
        styles[`variant-${variant}`],
        className,
      )}
      id={id}
    >
      <Layout type="stack" padding={12}>
        <div className={styles.inner}>
          {children}
        </div>
      </Layout>
    </Surface>
  )
}
