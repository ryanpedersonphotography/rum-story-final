import React from 'react';
import Typography, { type TypographyProps } from './Typography';
import styles from './Text.module.css';

export type TextSize = 'sm' | 'base' | 'lg';
export type TextMaxWidth = 'prose' | 'narrow' | 'wide' | 'full';

export interface TextProps extends Omit<TypographyProps, 'variant'> {
  size?: TextSize;
  maxWidth?: TextMaxWidth;
  opacity?: number;
  variant?: never; // Prevent variant prop since Text sets it internally
}

// Map size to Typography variants
const sizeToVariant = {
  sm: 'body-sm',
  base: 'body',
  lg: 'body-lg'
} as const;

/**
 * Text Component - Semantic wrapper for body text
 * 
 * Features:
 * - Optimized for readability with max-width control
 * - Three size variants (sm, base, lg)
 * - Automatic prose width for better reading experience
 * - Opacity control for secondary text
 * 
 * Usage:
 * ```tsx
 * <Text size="lg" maxWidth="prose">
 *   Lead paragraph with optimal reading width
 * </Text>
 * 
 * <Text size="sm" opacity={0.8}>
 *   Secondary description text
 * </Text>
 * ```
 */
const Text: React.FC<TextProps> = ({
  size = 'base',
  maxWidth = 'full',
  opacity,
  className = '',
  style,
  children,
  as = 'p',
  font = 'sans',
  color = 'inherit',
  align = 'inherit',
  weight = 'regular',
  ...rest
}) => {
  const typographyVariant = sizeToVariant[size];
  
  // Build wrapper classes for max-width control
  const wrapperClasses = [
    styles.textWrapper,
    styles[`maxWidth-${maxWidth}`],
    align !== 'inherit' ? styles[`align-${align}`] : '',
  ].filter(Boolean).join(' ');
  
  // Apply opacity via style
  const textStyle = {
    ...style,
    ...(opacity !== undefined ? { opacity } : {})
  };

  // If maxWidth is set, wrap in div for width control
  if (maxWidth !== 'full') {
    return (
      <div className={wrapperClasses}>
        <Typography
          variant={typographyVariant}
          as={as}
          font={font}
          color={color}
          align={align}
          weight={weight}
          className={className}
          style={textStyle}
          {...rest}
        >
          {children}
        </Typography>
      </div>
    );
  }

  // Otherwise render Typography directly
  return (
    <Typography
      variant={typographyVariant}
      as={as}
      font={font}
      color={color}
      align={align}
      weight={weight}
      className={className}
      style={textStyle}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Text;