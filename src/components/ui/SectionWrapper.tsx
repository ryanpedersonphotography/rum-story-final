import React from 'react';
import styles from './SectionWrapper.module.css';

// Type definitions for Storyblok integration
export type PaddingY = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type MarginY = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type MaxWidth = 'narrow' | 'standard' | 'wide' | 'full';
export type Theme = 'light' | 'dark' | 'inherit';
export type Background = 'transparent' | 'surface-1' | 'surface-2' | 'surface-3' | 'surface-4';

// Spacing preset system for consistent section rhythm
export type SpacingPreset = 
  | 'hero-start'        // First section after hero
  | 'content-flow'      // Standard content sections
  | 'feature-highlight' // Feature sections needing emphasis
  | 'compact-stack'     // Tightly coupled sections
  | 'footer-approach'   // Last section before footer
  | 'none';            // No spacing

// Preset definitions
const spacingPresets = {
  'hero-start': { 
    marginTop: 'xl' as MarginY,    // Extra space after hero
    paddingY: 'lg' as PaddingY 
  },
  'content-flow': { 
    marginTop: 'lg' as MarginY,    // Standard gap
    paddingY: 'lg' as PaddingY
  },
  'feature-highlight': { 
    marginTop: 'xl' as MarginY,    // More breathing room
    paddingY: 'xl' as PaddingY
  },
  'compact-stack': { 
    marginTop: 'sm' as MarginY,    // Tight coupling
    paddingY: 'md' as PaddingY
  },
  'footer-approach': { 
    marginTop: 'lg' as MarginY,
    marginBottom: 'xl' as MarginY, // Extra space before footer
    paddingY: 'lg' as PaddingY
  },
  'none': { 
    marginTop: 'none' as MarginY,
    paddingY: 'none' as PaddingY
  }
};

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  // Storyblok props
  paddingY?: PaddingY;
  marginY?: MarginY;
  marginTop?: MarginY;      // Override top margin
  marginBottom?: MarginY;   // Override bottom margin
  maxWidth?: MaxWidth;
  theme?: Theme;
  background?: Background;
  spacing?: SpacingPreset;  // Use spacing preset
  
  // Component props
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  blok?: any; // Storyblok data passthrough
  
  // Optional header configuration (for sections that need it)
  header?: {
    scriptAccent?: string;
    title?: string;
    lead?: string;
    align?: 'left' | 'center' | 'right';
  };
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  as: Tag = 'section',
  paddingY = 'lg',
  marginY = 'none',
  marginTop,
  marginBottom,
  spacing,
  maxWidth = 'standard',
  theme = 'inherit',
  background = 'transparent',
  children,
  className = '',
  blok,
  header,
  style,
  ...rest
}) => {
  // Resolve spacing from preset or manual props
  const resolvedSpacing = spacing ? spacingPresets[spacing] : null;
  
  // Extract Storyblok props if available (prioritize blok props)
  const finalPaddingY = blok?.paddingY || resolvedSpacing?.paddingY || paddingY;
  const finalMarginTop = blok?.marginTop || marginTop || resolvedSpacing?.marginTop || 'none';
  const finalMarginBottom = blok?.marginBottom || marginBottom || resolvedSpacing?.marginBottom || 'none';

  // Debug logging for alternating blocks
  if (className?.includes('alternatingBlocks')) {
    console.log('[SectionWrapper Debug] AlternatingBlocks:', {
      spacing,
      resolvedSpacing,
      finalMarginTop,
      finalMarginBottom,
      finalPaddingY
    });
  }
  const finalMaxWidth = blok?.maxWidth || maxWidth;
  const finalTheme = blok?.theme || theme;
  const finalBackground = blok?.background || background;

  // Build class names
  const sectionClasses = [
    styles.section,
    styles[`paddingY-${finalPaddingY}`],
    styles[`marginTop-${finalMarginTop}`],
    styles[`marginBottom-${finalMarginBottom}`],
    styles[`maxWidth-${finalMaxWidth}`],
    styles[`theme-${finalTheme}`],
    styles[`background-${finalBackground}`],
    className,
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.wrapper,
    styles[`maxWidth-${finalMaxWidth}`],
  ].filter(Boolean).join(' ');

  const headerClasses = [
    styles.header,
    header?.align ? styles[`align-${header.align}`] : styles['align-center'],
  ].filter(Boolean).join(' ');

  return (
    <Tag className={sectionClasses} style={style} {...rest}>
      <div className={wrapperClasses}>
        {header && (
          <header className={headerClasses}>
            {header.scriptAccent && (
              <span className={styles.scriptAccent}>{header.scriptAccent}</span>
            )}
            {header.title && (
              <h2 className={styles.title}>{header.title}</h2>
            )}
            {header.lead && (
              <p className={styles.lead}>{header.lead}</p>
            )}
          </header>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </Tag>
  );
};

export default SectionWrapper;