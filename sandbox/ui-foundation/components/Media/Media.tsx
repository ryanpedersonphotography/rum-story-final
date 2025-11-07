import { MediaProps, MEDIA_DEFAULTS } from '../../types/media'
import './Media.css'

export default function Media({
  type = MEDIA_DEFAULTS.type,
  src,
  alt = '',
  aspect = MEDIA_DEFAULTS.aspect,
  fit = MEDIA_DEFAULTS.fit,
  position = MEDIA_DEFAULTS.position,
  as: Component = MEDIA_DEFAULTS.as,
  className = '',
  id,
  style,
  loading = MEDIA_DEFAULTS.loading,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = false,
  sizes,
  srcSet,
  overlay,
  'data-priority': priority,
  'data-blur': blur
}: MediaProps) {
  const rootClassName = `media ${className}`.trim()

  // Build data attributes object, only including defined values
  const dataAttributes: Record<string, string | boolean> = {
    'data-type': type,
    'data-aspect': aspect,
    'data-fit': fit,
    'data-position': position
  }

  // Add optional data attributes only when defined
  if (priority) dataAttributes['data-priority'] = priority
  if (blur) dataAttributes['data-blur'] = blur

  const renderMedia = () => {
    switch (type) {
      case 'video':
        return (
          <video
            className="media__element"
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            controls={controls}
            preload={loading === 'lazy' ? 'metadata' : 'auto'}
          />
        )
      case 'embed':
        return (
          <iframe
            className="media__element"
            src={src}
            title={alt}
            loading={loading}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      case 'image':
      default:
        return (
          <img
            className="media__element"
            src={src}
            alt={alt}
            loading={loading}
            sizes={sizes}
            srcSet={srcSet}
          />
        )
    }
  }

  return (
    <Component
      id={id}
      className={rootClassName}
      style={style}
      {...dataAttributes}
    >
      <div className="media__container">
        {renderMedia()}
        {overlay && <div className="media__overlay">{overlay}</div>}
      </div>
    </Component>
  )
}