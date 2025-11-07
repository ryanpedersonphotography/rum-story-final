import { CardProps, CARD_DEFAULTS } from '../../types/card'
import './Card.css'

export default function Card({
  variant = CARD_DEFAULTS.variant,
  size = CARD_DEFAULTS.size,
  border = CARD_DEFAULTS.border,
  as: Component = CARD_DEFAULTS.as,
  className = '',
  id,
  style,
  children,
  clickable = false,
  href,
  target,
  'data-stack': stack,
  'data-align': align
}: CardProps) {
  const rootClassName = `card ${className}`.trim()

  // Build data attributes object, only including defined values
  const dataAttributes: Record<string, string | boolean> = {
    'data-variant': variant,
    'data-size': size,
    'data-border': border,
    'data-clickable': clickable
  }

  // Add optional data attributes only when defined
  if (stack) dataAttributes['data-stack'] = stack
  if (align) dataAttributes['data-align'] = align

  // If href is provided, render as anchor
  if (href) {
    return (
      <a
        href={href}
        target={target}
        id={id}
        className={rootClassName}
        style={style}
        {...dataAttributes}
      >
        <div className="card__inner">
          {children}
        </div>
      </a>
    )
  }

  return (
    <Component
      id={id}
      className={rootClassName}
      style={style}
      {...dataAttributes}
    >
      <div className="card__inner">
        {children}
      </div>
    </Component>
  )
}