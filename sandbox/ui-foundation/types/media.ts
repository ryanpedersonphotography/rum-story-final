import { ReactNode, CSSProperties } from 'react'

export type MediaType = 'image' | 'video' | 'embed'
export type MediaAspect = '16/9' | '4/3' | '1/1' | '3/2' | 'auto'
export type MediaFit = 'cover' | 'contain' | 'fill'
export type MediaPosition = 'center' | 'top' | 'bottom' | 'left' | 'right'

export interface MediaProps {
  type?: MediaType
  src: string
  alt?: string
  aspect?: MediaAspect
  fit?: MediaFit
  position?: MediaPosition
  as?: keyof JSX.IntrinsicElements
  className?: string
  id?: string
  style?: CSSProperties
  loading?: 'lazy' | 'eager'
  // Video specific
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  // Responsive options
  sizes?: string
  srcSet?: string
  // Overlay content
  overlay?: ReactNode
  'data-priority'?: 'high' | 'low'
  'data-blur'?: 'true' | 'false'
}

export const MEDIA_DEFAULTS: Required<Pick<MediaProps, 'type' | 'aspect' | 'fit' | 'position' | 'as' | 'loading'>> = {
  type: 'image',
  aspect: '16/9',
  fit: 'cover',
  position: 'center',
  as: 'div',
  loading: 'lazy'
}