// src/components/primitives/Media.tsx
import { ReactNode } from 'react'

interface MediaProps {
  src: string
  alt: string
  width?: number
  height?: number
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | '21/9' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  loading?: 'lazy' | 'eager'
  className?: string
  overlay?: ReactNode
  rounded?: boolean
  shadow?: boolean
  [key: string]: any
}

// Simple className utility
function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Media({
  src,
  alt,
  width,
  height,
  aspectRatio = 'auto',
  objectFit = 'cover',
  loading = 'lazy',
  className,
  overlay,
  rounded = false,
  shadow = false,
  ...props
}: MediaProps) {
  const mediaClasses = classNames(
    'media',
    rounded && 'media--rounded',
    shadow && 'media--shadow',
    className
  )

  return (
    <div
      className="media-container"
      data-aspect-ratio={aspectRatio}
      data-object-fit={objectFit}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={mediaClasses}
        style={{
          objectFit,
          ...(aspectRatio !== 'auto' && {
            aspectRatio: aspectRatio.replace('/', ' / ')
          })
        }}
      />
      {overlay && (
        <div className="media-overlay">
          {overlay}
        </div>
      )}
    </div>
  )
}