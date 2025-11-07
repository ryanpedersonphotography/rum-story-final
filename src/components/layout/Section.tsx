import * as React from 'react';
import { cx } from '@/lib/react-interop';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Render as different HTML element */
  as?: keyof JSX.IntrinsicElements;
  /** Visual layer depth - how the section sits on the base canvas */
  layer?: 'base' | 'partial' | 'isolated';
  /** Content width constraint */
  width?: 'content' | 'wide' | 'full';
  /** Content alignment within the section */
  align?: 'left' | 'center' | 'right';
};

/**
 * Bullet-proof Section component with Storyblok integration
 * 
 * Features:
 * - Preserves all Storyblok editable attributes via props spreading
 * - Renders to real DOM element (not React component) for Visual Editor
 * - Merges className and forwards all unknown props
 * - Rail-aware layout system with layered backgrounds
 * 
 * Usage with Storyblok:
 * <Section layer="partial" width="content" {...storyblokEditable(blok)}>
 *   <YourComponent blok={blok} />
 * </Section>
 */
export default function Section({
  as: Tag = 'section',
  layer = 'base',
  width = 'content', 
  align = 'center',
  className,
  children,
  ...rest  // ← Storyblok editable attrs (data-blok-*) flow through
}: SectionProps) {
  return (
    <Tag
      className={cx(
        'rr-section',
        `rr-section--${layer}`,
        `rr-section--${width}`,
        `rr-section--align-${align}`,
        className
      )}
      {...rest}
    >
      <div className="rr-section__inner">{children}</div>
    </Tag>
  );
}

export type { SectionProps };