import { SectionProps, SECTION_DEFAULTS } from '../../types/layout'
import './Section.css'

export default function Section({
  layer = SECTION_DEFAULTS.layer,
  width = SECTION_DEFAULTS.width,
  align = SECTION_DEFAULTS.align,
  elevation = SECTION_DEFAULTS.elevation,
  as: Component = SECTION_DEFAULTS.as,
  className = '',
  id,
  style,
  children,
  'data-rail-offset': railOffset,
  'data-overlap': overlap,
  'data-float': float,
  'data-header-placement': headerPlacement = 'inside',
  ...rest
}: SectionProps) {
  const rootClassName = `section ${className}`.trim()

  // Build data attributes object, only including defined values
  const dataAttributes: Record<string, string | boolean | number | undefined> = {
    'data-layer': layer,
    'data-width': width,
    'data-align': align,
    'data-elevation': elevation,
    'data-header-placement': headerPlacement
  }

  // Add optional data attributes only when truthy (avoid data-rail-offset="false")
  if (railOffset) dataAttributes['data-rail-offset'] = railOffset
  if (overlap) dataAttributes['data-overlap'] = overlap
  if (float) dataAttributes['data-float'] = float

  return (
    <Component
      id={id}
      className={rootClassName}
      style={style}
      {...dataAttributes}
      {...rest}
    >
      <div className="section__inner">
        <div className="section__container">
          {children}
        </div>
      </div>
    </Component>
  )
}