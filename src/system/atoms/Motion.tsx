/**
 * Zen System 7.0 - Motion Atom
 * Handles animation: fade, slide, scale effects.
 * 
 * This is the ONLY atom that imports framer-motion.
 * All other atoms/recipes stay server-safe.
 * 
 * If a recipe needs animation, wrap its content in <Motion>.
 */

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type MotionMode = 'static' | 'fade-up' | 'fade-in' | 'scale-in'

interface MotionProps {
  /** Animation mode */
  mode?: MotionMode
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Animation duration (seconds) */
  duration?: number
  /** Child elements */
  children: ReactNode
  /** Additional class names */
  className?: string
}

const variants = {
  'fade-up': {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
  },
  'fade-in': {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-50px' },
  },
  'scale-in': {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-50px' },
  },
}

export function Motion({
  mode = 'static',
  delay = 0,
  duration = 0.6,
  children,
  className,
}: MotionProps) {
  // Static mode: no animation, just render children
  if (mode === 'static') {
    return <>{children}</>
  }

  const v = variants[mode] ?? variants['fade-up']

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={v.viewport}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.61, 0.35, 1], // matches --motion-ease-out
      }}
    >
      {children}
    </motion.div>
  )
}
