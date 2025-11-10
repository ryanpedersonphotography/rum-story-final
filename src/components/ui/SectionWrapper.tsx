import React from 'react';
import styles from './SectionWrapper.module.css';

// Type definitions for Storyblok integration
export type PaddingY = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type MarginY = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type MaxWidth = 'narrow' | 'standard' | 'wide' | 'full';
export type Theme = 'light' | 'dark' | 'inherit';
export type Background = 'transparent' | 'surface-1' | 'surface-2' | 'surface-3' | 'surface-4';

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  // Storyblok props
  paddingY?: PaddingY;
  marginY?: MarginY;
  maxWidth?: MaxWidth;
  theme?: Theme;
  background?: Background;
  
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
  // Extract Storyblok props if available (prioritize blok props)
  const finalPaddingY = blok?.paddingY || paddingY;
  const finalMarginY = blok?.marginY || marginY;
  const finalMaxWidth = blok?.maxWidth || maxWidth;
  const finalTheme = blok?.theme || theme;
  const finalBackground = blok?.background || background;

  // Build class names
  const sectionClasses = [
    styles.section,
    styles[`paddingY-${finalPaddingY}`],
    styles[`marginY-${finalMarginY}`],
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