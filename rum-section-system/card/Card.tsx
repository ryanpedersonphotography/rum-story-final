// src/components/primitives/Card.tsx
import { ReactNode, ElementType } from 'react'

interface CardProps {
  as?: ElementType
  children?: ReactNode
  className?: string
  elevation?: 0 | 1 | 2 | 3
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outlined' | 'filled'
  [key: string]: any
}

interface CardSlotProps {
  children?: ReactNode
  className?: string
  [key: string]: any
}

function CardHeader({ children, className, ...props }: CardSlotProps) {
  return (
    <header className={`card__header ${className || ''}`} {...props}>
      {children}
    </header>
  )
}

function CardBody({ children, className, ...props }: CardSlotProps) {
  return (
    <div className={`card__body ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ children, className, ...props }: CardSlotProps) {
  return (
    <footer className={`card__footer ${className || ''}`} {...props}>
      {children}
    </footer>
  )
}

// Simple className utility
function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

function Card({ 
  as: Component = 'div',
  children,
  className,
  elevation = 0,
  padding = 'md',
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <Component
      className={classNames('card', className)}
      data-elevation={elevation}
      data-padding={padding}
      data-variant={variant}
      {...props}
    >
      {children}
    </Component>
  )
}

// Compound component pattern
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card