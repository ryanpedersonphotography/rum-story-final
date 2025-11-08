import React from 'react';
import styles from './Section.module.css';

// Type definitions
export type Align = 'left' | 'center' | 'right';
export type Width = 'prose' | 'content' | 'wide' | 'full';
export type PaddingY = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
export type Background = 'surface' | 'subtle' | 'image';
export type Tone = 'light' | 'dark' | 'auto';
export type Variant = 'centered' | 'home-hero';

export interface SectionHeaderProps {
  scriptAccent?: string;
  title?: string;
  lead?: string;
  align?: Align;
}

export interface SectionImageProps {
  src: string;
  alt?: string;
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  variant?: Variant;
  align?: Align;
  width?: Width;
  paddingY?: PaddingY;
  background?: Background;
  tone?: Tone;
  image?: SectionImageProps;
  header?: SectionHeaderProps;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  as: Tag = 'section',
  id,
  variant,
  align = 'center',
  width = 'content',
  paddingY = 'lg',
  background = 'surface',
  tone = 'auto',
  image,
  header,
  children,
  className = '',
  style,
  ...rest
}) => {
  const primaryVariant = Array.isArray(variant) ? variant[0] : variant;

  const sectionClasses = [
    styles.section,
    primaryVariant ? styles[`variant${primaryVariant.charAt(0).toUpperCase() + primaryVariant.slice(1)}`] : '',
    styles[`background${background.charAt(0).toUpperCase() + background.slice(1)}`],
    styles[`tone${tone.charAt(0).toUpperCase() + tone.slice(1)}`],
    styles[`paddingY${paddingY.toUpperCase()}`],
    className,
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.wrapper,
    styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
    styles[`width${width.charAt(0).toUpperCase() + width.slice(1)}`],
  ].filter(Boolean).join(' ');

  const headerClasses = [
    styles.header,
    header?.align ? styles[`align${header.align.charAt(0).toUpperCase() + header.align.slice(1)}`] : '',
  ].filter(Boolean).join(' ');

  const sectionStyle: React.CSSProperties = {
    ...style,
    ...(image && { backgroundImage: `url(${image.src})` }),
  };

  return (
    <Tag id={id} className={sectionClasses} style={sectionStyle} {...rest}>
      <div className={wrapperClasses}>
        {header && (
          <header className={headerClasses}>
            {header.scriptAccent && <span className={styles.scriptAccent}>{header.scriptAccent}</span>}
            {header.title && <h2 className={styles.title}>{header.title}</h2>}
            {header.lead && <p className={styles.lead}>{header.lead}</p>}
          </header>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </Tag>
  );
};

export default Section;
