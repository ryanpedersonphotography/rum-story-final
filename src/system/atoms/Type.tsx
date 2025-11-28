/**
 * Zen System 7.0 - Type Atom
 * Handles typography: headings, body text, captions.
 * 
 * Use this for all text rendering.
 * DO NOT use raw font-size/line-height in pages - use Type instead.
 */

import styles from './Type.module.css'
import { ElementType, ReactNode } from 'react'
import clsx from 'clsx'

type TypeSize = 'hero' | 'display' | 'title' | 'body' | 'caption'
type TypeTone = 'ink' | 'muted' | 'accent' | 'inherit'
type TypeAlign = 'left' | 'center' | 'right'
type TypeWeight = 'normal' | 'medium' | 'semibold' | 'bold'

interface TypeProps {
  /** HTML element to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  /** Text size preset */
  size?: TypeSize
  /** Text color tone */
  tone?: TypeTone
  /** Text alignment */
  align?: TypeAlign
  /** Font weight */
  weight?: TypeWeight
  /** Use serif (Playfair) or sans font */
  serif?: boolean
  /** Use script (Dancing Script) font */
  script?: boolean
  /** Additional class names */
  className?: string
  /** Child elements */
  children: ReactNode
}

export function Type({
  as: Component = 'p',
  size = 'body',
  tone = 'ink',
  align = 'left',
  weight,
  serif = true,
  script = false,
  className,
  children,
}: TypeProps) {
  return (
    <Component
      className={clsx(
        styles.base,
        styles[`size-${size}`],
        styles[`tone-${tone}`],
        weight && styles[`weight-${weight}`],
        script ? styles.script : (serif ? styles.serif : styles.sans),
        className,
      )}
      style={{ textAlign: align }}
    >
      {children}
    </Component>
  )
}
