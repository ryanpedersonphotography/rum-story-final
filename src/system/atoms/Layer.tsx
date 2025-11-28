/**
 * Zen System 7.0 - Layer Atom
 * Handles positioning: absolute/fixed elements with z-index.
 * 
 * Use this for overlays, floating elements, decorative positioning.
 * NOT for primary layout structure - use Layout instead.
 */

import { ReactNode, CSSProperties } from 'react'
import type { ZLayer } from '../tokens'

interface LayerProps {
  /** Position from top */
  top?: string
  /** Position from left */
  left?: string
  /** Position from right */
  right?: string
  /** Position from bottom */
  bottom?: string
  /** Z-index layer - uses z tokens */
  z?: ZLayer
  /** Position type */
  position?: 'absolute' | 'fixed' | 'sticky'
  /** Inset shorthand (sets all sides) */
  inset?: string
  /** Child elements */
  children: ReactNode
  /** Additional class names */
  className?: string
  /** Inline styles */
  style?: CSSProperties
}

export function Layer({
  top,
  left,
  right,
  bottom,
  z = 'base',
  position = 'absolute',
  inset,
  children,
  className,
  style,
}: LayerProps) {
  return (
    <div
      className={className}
      style={{
        position,
        top: inset ?? top,
        left: inset ?? left,
        right: inset ?? right,
        bottom: inset ?? bottom,
        zIndex: `var(--z-${z})`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
