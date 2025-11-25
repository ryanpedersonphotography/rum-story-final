import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'pill' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

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
  variant,
  size,
  fullWidth,
  className = '',
  icon,
  iconPosition,
  as,
  ...rest
}: CTAButtonProps) {
  const classes = [
    'CTAButton',
    variant && `CTAButton--${variant}`,
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && <span className="CTAButton-icon">{icon}</span>}
      {children}
    </>
  )

  if (as === 'a') {
    const { href, ...linkRest } = rest as CTAButtonAsLink
    return (
      <a
        href={href}
        className={classes}
        data-variant={variant}
        data-size={size}
        data-width={fullWidth ? 'full' : undefined}
        data-icon-position={iconPosition}
        {...linkRest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={classes}
      data-variant={variant}
      data-size={size}
      data-width={fullWidth ? 'full' : undefined}
      data-icon-position={iconPosition}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}

export default CTAButton
