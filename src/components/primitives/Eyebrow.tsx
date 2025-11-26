import { ReactNode, ComponentPropsWithoutRef } from 'react'

interface EyebrowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  className?: string
}

export function Eyebrow({ children, className = '', ...rest }: EyebrowProps) {
  return (
    <div 
      className={`Eyebrow ${className}`.trim()} 
      {...rest}
    >
      {children}
    </div>
  )
}
