import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'inline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface CTAButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

type CTAButtonAsButton = CTAButtonBaseProps & 
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
    href?: never
  }

type CTAButtonAsLink = CTAButtonBaseProps & 
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
  }

type CTAButtonProps = CTAButtonAsButton | CTAButtonAsLink

export function CTAButton({
  children,
  variant = 'primary',
  size,
  fullWidth,
  className = '',
  icon,
  iconPosition,
  as,
  ...rest
}: CTAButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  )

  if (as === 'a') {
    const { href, ...linkRest } = rest as CTAButtonAsLink
    return (
      <a
        href={href}
        className={classes}
        style={fullWidth ? { width: '100%' } : undefined}
        {...linkRest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={classes}
      style={fullWidth ? { width: '100%' } : undefined}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}

export default CTAButton
