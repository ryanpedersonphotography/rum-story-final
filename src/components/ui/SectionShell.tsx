import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import Typography from './Typography'
import Text from './Text'

/* ============================================================================
   SECTION SHELL COMPONENT (UNIFIED)
   - Token-driven layout system
   - Visual "frame" for sections (semantics, theming, spacing, bleed, overlays)
   - Includes content orchestration for a unified header
   ============================================================================ */

// --- Core Types ---
export type Align = 'left' | 'center' | 'right'
export type Container = 'prose' | 'content' | 'wide' | 'full'
export type PaddingY = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid' | 'none'
export type MarginY = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'
export type Tone = 'auto' | 'light' | 'dark'
export type Background =
  | 'surface'
  | 'tint-rose'
  | 'tint-sage'
  | { kind: 'gradient'; token?: string }
  | { kind: 'image'; src: string; attachment?: 'fixed' | 'scroll'; fit?: 'cover' | 'contain'; position?: string; overlay?: 'none' | 'soft' | 'strong' }

export type Divider = 'none' | 'hairline' | 'thread-gold'
export type Height = 'auto' | 'screen'

// --- Spacing Preset System (from SectionWrapper) ---
export type SpacingPreset = 
  | 'hero-start'
  | 'content-flow'
  | 'feature-highlight'
  | 'compact-stack'
  | 'footer-approach'
  | 'none';

const spacingPresets = {
  'hero-start': { marginTop: 'xl' as MarginY, paddingY: 'lg' as PaddingY },
  'content-flow': { marginTop: 'lg' as MarginY, paddingY: 'lg' as PaddingY },
  'feature-highlight': { marginTop: 'xl' as MarginY, paddingY: 'xl' as PaddingY },
  'compact-stack': { marginTop: 'sm' as MarginY, paddingY: 'md' as PaddingY },
  'footer-approach': { marginTop: 'lg' as MarginY, marginBottom: 'xl' as MarginY, paddingY: 'lg' as PaddingY },
  'none': { marginTop: 'none' as MarginY, paddingY: 'none' as PaddingY }
};

// --- Component Props Interface ---
export interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
  as?: keyof JSX.IntrinsicElements
  id?: string
  role?: 'region' | 'complementary' | 'navigation' | 'main' | 'contentinfo' | 'none'
  'aria-labelledby'?: string
  'aria-label'?: string

  // --- Layout & Spacing ---
  align?: Align
  container?: Container
  height?: Height
  bleed?: boolean
  spacing?: SpacingPreset
  paddingY?: PaddingY
  paddingX?: 'gutter' | 'none' | 'wide'
  marginTop?: MarginY
  marginBottom?: MarginY

  // --- Theming & Style ---
  tone?: Tone
  background?: Background
  divider?: Divider
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg'

  // --- Content Orchestration ---
  header?: {
    scriptAccent?: string;
    title?: string;
    lead?: string;
    align?: 'left' | 'center' | 'right';
  };

  // --- Advanced ---
  containerName?: string
  stickiness?: { top?: string }
}

export const SectionShell = React.forwardRef<HTMLElement, SectionShellProps>(
  (
    {
      asChild,
      as: Tag = 'section',
      align = 'center',
      container = 'content',
      paddingY,
      paddingX = 'gutter',
      marginTop,
      marginBottom,
      spacing = 'none',
      height = 'auto',
      bleed = false,
      tone = 'auto',
      background = 'surface',
      divider = 'none',
      radius = 'none',
      shadow = 'none',
      header,
      containerName,
      stickiness,
      style,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : Tag

    // --- Resolve Spacing ---
    const resolvedSpacing = spacingPresets[spacing] || spacingPresets.none;
    const finalPaddingY = paddingY || resolvedSpacing.paddingY || 'none';
    const finalMarginTop = marginTop || resolvedSpacing.marginTop || 'none';
    const finalMarginBottom = marginBottom || resolvedSpacing.marginBottom || 'none';

    // --- Normalize Background ---
    const bgKind = typeof background === 'string' ? background : background.kind

    // --- Dynamic Styles ---
    const sectionStyle: React.CSSProperties = {
      ...style,
      ...(stickiness && { position: 'sticky', top: stickiness.top }),
      ...(containerName && { ['--container-name' as any]: containerName }),
      ...(typeof background === 'object' &&
        background.kind === 'image' && {
          backgroundImage: `url(${background.src})`,
          backgroundAttachment: background.attachment ?? 'scroll',
          backgroundSize: background.fit ?? 'cover',
          backgroundPosition: background.position ?? 'center',
          backgroundRepeat: 'no-repeat',
        }),
    }

    const baseClass = 'section section-shell'
    const composedClassName = className ? `${baseClass} ${className}` : baseClass

    return (
      <Comp
        ref={ref}
        data-clean-root="true"
        data-section="shell"
        data-align={align}
        data-container={container}
        data-padding-y={finalPaddingY}
        data-padding-x={paddingX}
        data-margin-top={finalMarginTop}
        data-margin-bottom={finalMarginBottom}
        data-height={height}
        data-bleed={bleed ? 'true' : undefined}
        data-tone={tone}
        data-bg={typeof background === 'string' ? background : undefined}
        data-bg-kind={bgKind}
        data-divider={divider}
        data-radius={radius}
        data-shadow={shadow}
        data-container-name={containerName}
        className={composedClassName}
        style={sectionStyle}
        {...rest}
      >
        {/* Optional overlay for bg images/gradients */}
        {typeof background === 'object' &&
          background.kind === 'image' &&
          background.overlay &&
          background.overlay !== 'none' && (
            <div
              className="section-shell__overlay"
              data-overlay={background.overlay}
              aria-hidden="true"
            />
          )}

        <div className="section-shell__rail" data-rail="container">
          {header && (
            <header className="section-header" data-align={header.align || 'center'}>
              {header.scriptAccent && (
                <Typography 
                  variant="script" 
                  color="accent" 
                  align={header.align || 'center'}
                >
                  {header.scriptAccent}
                </Typography>
              )}
              {header.title && (
                <Typography 
                  as="h2" 
                  variant="h1" 
                  align={header.align || 'center'}
                >
                  {header.title}
                </Typography>
              )}
              {header.lead && (
                <Text 
                  size="lg" 
                  maxWidth="prose" 
                  align={header.align || 'center'}
                  color="secondary"
                >
                  {header.lead}
                </Text>
              )}
            </header>
          )}
          <div className="section-content">
            {children}
          </div>
        </div>

        {divider !== 'none' && (
          <div
            className="section-shell__divider"
            data-divider={divider}
            aria-hidden="true"
          />
        )}
      </Comp>
    )
  }
)

SectionShell.displayName = 'SectionShell'

export default SectionShell