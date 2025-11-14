/**
 * FILE: src/types/layout.ts
 * LOCATION: /src/types/layout.ts
 * PURPOSE: Layout type definitions for section components
 */

import { ReactNode, CSSProperties } from 'react'

export type SectionLayer = 'base' | 'partial' | 'isolated'
export type SectionWidth = 'prose' | 'content' | 'wide' | 'full'
export type SectionAlign = 'left' | 'center' | 'right'
export type SectionElevation = 0 | 1 | 2 | 3

export interface SectionProps {
  layer?: SectionLayer
  width?: SectionWidth
  align?: SectionAlign
  elevation?: SectionElevation
  as?: keyof JSX.IntrinsicElements
  className?: string
  id?: string
  style?: CSSProperties
  children: ReactNode
  // Advanced layout options
  'data-rail-offset'?: 'true' | 'false'
  'data-overlap'?: 'top' | 'bottom'
  'data-float'?: 'true' | 'false'
  'data-header-placement'?: 'outside' | 'inside'
}

export const SECTION_DEFAULTS: Required<Pick<SectionProps, 'layer' | 'width' | 'align' | 'elevation' | 'as'>> = {
  layer: 'base',
  width: 'content',
  align: 'center',
  elevation: 0,
  as: 'section'
}