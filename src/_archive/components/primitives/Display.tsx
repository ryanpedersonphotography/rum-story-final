import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react'

type DisplaySize = 'sm' | 'md' | 'lg' | '2xl' | '3xl' | 'hero'
type DisplayWeight = 'regular' | 'medium' | 'bold'
type DisplayColor = 'default' | 'muted' | 'accent'

interface DisplayOwnProps {
  children: ReactNode
  size?: DisplaySize
  weight?: DisplayWeight
  color?: DisplayColor
  as?: ElementType
  className?: string
}

type DisplayProps<E extends ElementType = 'h2'> = DisplayOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof DisplayOwnProps>

export function Display<E extends ElementType = 'h2'>({
  children,
  size,
  weight,
  color,
  as,
  className = '',
  ...rest
}: DisplayProps<E>) {
  const Component = as || 'h2'
  
  return (
    <Component
      className={`Display ${className}`.trim()}
      data-size={size}
      data-weight={weight}
      data-color={color}
      {...rest}
    >
      {children}
    </Component>
  )
}

// Accent span for highlighted text within Display
interface DisplayAccentProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode
  className?: string
}

export function DisplayAccent({ children, className = '', ...rest }: DisplayAccentProps) {
  return (
    <span className={`Display-accent ${className}`.trim()} {...rest}>
      {children}
    </span>
  )
}

export default Display
