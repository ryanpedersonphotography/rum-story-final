import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react'

type ClusterGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ClusterAlign = 'start' | 'center' | 'end' | 'baseline'
type ClusterJustify = 'start' | 'center' | 'end' | 'between' | 'around'

interface ClusterOwnProps {
  children: ReactNode
  gap?: ClusterGap
  align?: ClusterAlign
  justify?: ClusterJustify
  as?: ElementType
  className?: string
}

type ClusterProps<E extends ElementType = 'div'> = ClusterOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof ClusterOwnProps>

export function Cluster<E extends ElementType = 'div'>({
  children,
  gap,
  align,
  justify,
  as,
  className = '',
  ...rest
}: ClusterProps<E>) {
  const Component = as || 'div'
  
  return (
    <Component
      className={`Cluster ${className}`.trim()}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Cluster
