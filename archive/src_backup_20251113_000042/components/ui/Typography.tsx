import React from 'react';
import styles from './Typography.module.css';

export type TypographyVariant = 
  | 'display'    // Hero/banner titles
  | 'h1'         // Main section headings
  | 'h2'         // Subsection headings  
  | 'h3'         // Card/block headings
  | 'script'     // Decorative script text
  | 'body-lg'    // Lead paragraphs
  | 'body'       // Standard body text
  | 'body-sm'    // Small body text
  | 'caption';   // Image captions, labels

export type FontFamily = 'serif' | 'sans' | 'script' | 'inherit';
export type TextColor = 'primary' | 'secondary' | 'accent' | 'inverse' | 'inherit';
export type TextAlign = 'left' | 'center' | 'right' | 'inherit';
export type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'inherit';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  font?: FontFamily;
  color?: TextColor;
  align?: TextAlign;
  weight?: FontWeight;
  className?: string;
  children?: React.ReactNode;
}

// Variant configuration with defaults
const variantConfig: Record<TypographyVariant, {
  defaultTag: keyof JSX.IntrinsicElements;
  defaultFont: FontFamily;
  defaultWeight: FontWeight;
  sizeVar: string;
  leadingVar: string;
}> = {
  display: { 
    defaultTag: 'h1', 
    defaultFont: 'serif', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-display)',
    leadingVar: 'var(--leading-display)'
  },
  h1: { 
    defaultTag: 'h2', 
    defaultFont: 'serif', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-h1)',
    leadingVar: 'var(--leading-heading)'
  },
  h2: { 
    defaultTag: 'h3', 
    defaultFont: 'serif', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-h2)',
    leadingVar: 'var(--leading-heading)'
  },
  h3: { 
    defaultTag: 'h4', 
    defaultFont: 'serif', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-h3)',
    leadingVar: 'var(--leading-heading)'
  },
  script: { 
    defaultTag: 'span', 
    defaultFont: 'script', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-script)',
    leadingVar: 'var(--leading-script)'
  },
  'body-lg': { 
    defaultTag: 'p', 
    defaultFont: 'sans', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-body-lg)',
    leadingVar: 'var(--leading-body)'
  },
  body: { 
    defaultTag: 'p', 
    defaultFont: 'sans', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-body)',
    leadingVar: 'var(--leading-body)'
  },
  'body-sm': { 
    defaultTag: 'p', 
    defaultFont: 'sans', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-body-sm)',
    leadingVar: 'var(--leading-body)'
  },
  caption: { 
    defaultTag: 'span', 
    defaultFont: 'sans', 
    defaultWeight: 'regular',
    sizeVar: 'var(--type-caption)',
    leadingVar: 'var(--leading-body)'
  }
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  as,
  font,
  color = 'inherit',
  align = 'inherit',
  weight,
  className = '',
  children,
  style,
  ...rest
}) => {
  const config = variantConfig[variant];
  const Tag = as || config.defaultTag;
  
  // Use defaults from config if not specified
  const finalFont = font || config.defaultFont;
  const finalWeight = weight || config.defaultWeight;
  
  // Build class names
  const classes = [
    styles.typography,
    styles[`variant-${variant}`],
    styles[`font-${finalFont}`],
    styles[`color-${color}`],
    styles[`align-${align}`],
    styles[`weight-${finalWeight}`],
    className,
  ].filter(Boolean).join(' ');
  
  // Apply size and line-height via style
  const inlineStyle: React.CSSProperties = {
    fontSize: config.sizeVar,
    lineHeight: config.leadingVar,
    ...style,
  };

  return (
    <Tag className={classes} style={inlineStyle} {...rest}>
      {children}
    </Tag>
  );
};

export default Typography;