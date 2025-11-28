import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react'

type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type StackAlign = 'start' | 'center' | 'end' | 'stretch'

interface StackOwnProps {
  children: ReactNode
  gap?: StackGap
  align?: StackAlign
  as?: ElementType
  className?: string
}

type StackProps<E extends ElementType = 'div'> = StackOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof StackOwnProps>

export function Stack<E extends ElementType = 'div'>({
  children,
  gap,
  align,
  as,
  className = '',
  ...rest
}: StackProps<E>) {
  const Component = as || 'div'
  
  return (
    <Component
      className={`Stack ${className}`.trim()}
      data-gap={gap}
      data-align={align}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Stack
