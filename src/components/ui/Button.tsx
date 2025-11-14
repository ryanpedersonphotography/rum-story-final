/**
 * FILE: src/components/ui/Button.tsx
 * LOCATION: /src/components/ui/Button.tsx
 * PURPOSE: Button component with multiple variants and Link support
 */

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'onImage' | 'rose' | 'outlineGold' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button' | 'a';
  href?: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ as = 'button', href, variant = 'primary', children, className, ...props }, ref) => {
    const variantClass = variant ? styles[variant] : styles.primary;
    const combinedClassName = `${styles.btn} ${variantClass} ${className || ''}`.trim();

    if (as === 'a') {
      return (
        <Link href={href || ''} passHref>
          <a className={combinedClassName} ref={ref as React.Ref<HTMLAnchorElement>} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
            {children}
          </a>
        </Link>
      );
    }

    return (
      <button className={combinedClassName} ref={ref as React.Ref<HTMLButtonElement>} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;