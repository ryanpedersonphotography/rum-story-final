import { ReactNode, CSSProperties } from 'react'

export type CardVariant = 'default' | 'outline' | 'ghost' | 'filled'
export type CardSize = 'sm' | 'md' | 'lg' | 'xl'
export type CardBorder = 'none' | 'subtle' | 'strong'

export interface CardProps {
  variant?: CardVariant
  size?: CardSize
  border?: CardBorder
  as?: keyof JSX.IntrinsicElements
  className?: string
  id?: string
  style?: CSSProperties
  children: ReactNode
  // Interactive options
  clickable?: boolean
  href?: string
  target?: string
  // Layout options
  'data-stack'?: 'vertical' | 'horizontal'
  'data-align'?: 'start' | 'center' | 'end'
}

export const CARD_DEFAULTS: Required<Pick<CardProps, 'variant' | 'size' | 'border' | 'as'>> = {
  variant: 'default',
  size: 'md',
  border: 'subtle',
  as: 'div'
}