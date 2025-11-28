import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react'

// ==========================================================================
// EYEBROW / KICKER
// ==========================================================================

type KickerSize = 'xs' | 'sm' | 'md'
type KickerColor = 'default' | 'text' | 'accent'

interface KickerOwnProps {
  children: ReactNode
  size?: KickerSize
  color?: KickerColor
  as?: ElementType
  className?: string
}

type KickerProps<E extends ElementType = 'span'> = KickerOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof KickerOwnProps>

export function Kicker<E extends ElementType = 'span'>({
  children,
  size,
  color,
  as,
  className = '',
  ...rest
}: KickerProps<E>) {
  const Component = as || 'span'
  
  return (
    <Component
      className={`Kicker ${className}`.trim()}
      data-size={size}
      data-color={color}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function Eyebrow<E extends ElementType = 'span'>({
  children,
  size,
  color,
  as,
  className = '',
  ...rest
}: KickerProps<E>) {
  const Component = as || 'span'
  
  return (
    <Component
      className={`Eyebrow ${className}`.trim()}
      data-size={size}
      data-color={color}
      {...rest}
    >
      {children}
    </Component>
  )
}

// ==========================================================================
// SCRIPT ACCENT
// ==========================================================================

type ScriptSize = 'sm' | 'md' | 'lg' | 'xl' | 'hero'
type ScriptColor = 'rose' | 'gold' | 'cream' | 'accent' | 'muted'

interface ScriptAccentOwnProps {
  children: ReactNode
  size?: ScriptSize
  color?: ScriptColor
  shadow?: boolean
  as?: ElementType
  className?: string
}

type ScriptAccentProps<E extends ElementType = 'span'> = ScriptAccentOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof ScriptAccentOwnProps>

export function ScriptAccent<E extends ElementType = 'span'>({
  children,
  size,
  color,
  shadow = false,
  as,
  className = '',
  ...rest
}: ScriptAccentProps<E>) {
  const Component = as || 'span'
  
  return (
    <Component
      className={`ScriptAccent ${className}`.trim()}
      data-size={size}
      data-color={color}
      data-shadow={shadow || undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}

// ==========================================================================
// BODY / LEAD / PROSE
// ==========================================================================

type BodySize = 'sm' | 'md' | 'lg' | 'xl'
type BodyColor = 'default' | 'muted' | 'accent'
type BodyWidth = 'prose' | 'narrow' | 'wide' | 'full'

interface BodyOwnProps {
  children: ReactNode
  size?: BodySize
  color?: BodyColor
  width?: BodyWidth
  as?: ElementType
  className?: string
}

type BodyProps<E extends ElementType = 'p'> = BodyOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof BodyOwnProps>

export function Body<E extends ElementType = 'p'>({
  children,
  size,
  color,
  width,
  as,
  className = '',
  ...rest
}: BodyProps<E>) {
  const Component = as || 'p'
  
  return (
    <Component
      className={`Body ${className}`.trim()}
      data-size={size}
      data-color={color}
      data-width={width}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function Lead<E extends ElementType = 'p'>({
  children,
  size,
  color,
  width,
  as,
  className = '',
  ...rest
}: BodyProps<E>) {
  const Component = as || 'p'
  
  return (
    <Component
      className={`Lead ${className}`.trim()}
      data-size={size}
      data-color={color}
      data-width={width}
      {...rest}
    >
      {children}
    </Component>
  )
}
