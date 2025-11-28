/**
 * Zen System 7.0 - HeroSection Recipe
 * Full-width hero section with gradient background and centered content.
 * 
 * Use for page heroes, feature sections, CTAs.
 * Combines Surface, Layout, and Motion for animated hero layouts.
 */

import { Surface } from '../atoms/Surface'
import { Layout } from '../atoms/Layout'
import { Motion } from '../atoms/Motion'
import { ReactNode } from 'react'
import styles from './HeroSection.module.css'
import clsx from 'clsx'

type HeroVariant = 'warm' | 'dusk' | 'sunset' | 'glass'

interface HeroSectionProps {
  /** Child elements */
  children: ReactNode
  /** Visual variant (gradient/glass) */
  variant?: HeroVariant
  /** Minimum height */
  minHeight?: string
  /** Center content vertically */
  centerVertical?: boolean
  /** Enable fade-up animation */
  animate?: boolean
  /** Additional class names */
  className?: string
  /** HTML id attribute */
  id?: string
}

export function HeroSection({
  children,
  variant = 'warm',
  minHeight = '60vh',
  centerVertical = true,
  animate = true,
  className,
  id,
}: HeroSectionProps) {
  const content = (
    <div className={styles.inner}>
      {children}
    </div>
  )

  return (
    <Surface
      as="section"
      tone="transparent"
      className={clsx(
        styles.hero,
        styles[`variant-${variant}`],
        className,
      )}
      style={{ minHeight }}
      id={id}
    >
      <Layout
        type="stack"
        padding={12}
        align="center"
        justify={centerVertical ? 'center' : 'start'}
        className={styles.layout}
      >
        {animate ? (
          <Motion mode="fade-up">
            {content}
          </Motion>
        ) : (
          content
        )}
      </Layout>
    </Surface>
  )
}
