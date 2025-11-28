import { ReactNode } from 'react'
import Image from 'next/image'

type MediaVariant = 'rounded' | 'fullBleed' | 'soft'
type MediaEdge = 'nearFlush' | 'flush'
type MediaRatio = '1-1' | '4-3' | '3-2' | '16-9' | '16-10' | '21-9'

interface MediaBlockProps {
  src: string
  alt: string
  variant?: MediaVariant
  edge?: MediaEdge
  ratio?: MediaRatio
  className?: string
  priority?: boolean
  width?: number
  height?: number
  overlay?: 'darken' | 'gradient-bottom' | 'gradient-top'
  children?: ReactNode
  /** Use Next.js Image with fill (requires parent constraints) */
  useNextImage?: boolean
}

/**
 * MediaBlock - Image presentation primitive
 * 
 * By default uses standard <img> for simplicity.
 * Set useNextImage={true} for Next.js Image optimization (requires container with defined height).
 */
export function MediaBlock({
  src,
  alt,
  variant,
  edge,
  ratio,
  className = '',
  priority = false,
  width,
  height,
  overlay,
  children,
  useNextImage = false,
}: MediaBlockProps) {
  const classes = [
    'MediaBlock',
    variant && `MediaBlock--${variant}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      data-variant={variant}
      data-edge={edge}
      data-ratio={ratio}
    >
      {useNextImage ? (
        // Next.js Image (optimized, requires container setup)
        width && height ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="MediaBlock-img"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="MediaBlock-img"
            style={{ objectFit: 'cover' }}
            priority={priority}
          />
        )
      ) : (
        // Standard img (simpler, always works)
        <img
          src={src}
          alt={alt}
          className="MediaBlock-img"
        />
      )}
      
      {overlay && (
        <div className="MediaBlock-overlay" data-type={overlay} />
      )}
      
      {children}
    </div>
  )
}

// Simple wrapper for legacy usage
interface MediaBlockImgProps {
  src: string
  alt: string
  className?: string
}

export function MediaBlockImg({ src, alt, className = '' }: MediaBlockImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`MediaBlock-img ${className}`.trim()}
    />
  )
}

export default MediaBlock
