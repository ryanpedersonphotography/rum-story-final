/**
 * FILE: src/components/ui/SectionShell.tsx
 * LOCATION: /src/components/ui/SectionShell.tsx
 * PURPOSE: Section shell component without Radix dependencies
 */

import * as React from 'react'
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
  | 'deep'
  | 'soft'
  | { kind: 'gradient'; token?: string }
  | {
      kind: 'image'
      src: string
      attachment?: 'fixed' | 'scroll'
      fit?: 'cover' | 'contain'
      position?: string
      overlay?: 'none' | 'soft' | 'strong'
    }

export type Divider = 'none' | 'hairline' | 'thread-gold'
export type Height = 'auto' | 'screen'

// --- Spacing Preset System ---
export type SpacingPreset =
  | 'hero-start'
  | 'content-flow'
  | 'feature-highlight'
  | 'compact-stack'
  | 'footer-approach'
  | 'none'

const spacingPresets: Record<
  SpacingPreset,
  { marginTop?: MarginY; marginBottom?: MarginY; paddingY?: PaddingY }
> = {
  'hero-start': { marginTop: 'xl', paddingY: 'lg' },
  'content-flow': { marginTop: 'lg', paddingY: 'lg' },
  'feature-highlight': { marginTop: 'xl', paddingY: 'xl' },
  'compact-stack': { marginTop: 'sm', paddingY: 'md' },
  'footer-approach': { marginTop: 'lg', marginBottom: 'xl', paddingY: 'lg' },
  none: { marginTop: 'none', paddingY: 'none' },
}

// --- Component Props Interface ---
export interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  // NOTE: asChild removed – just use `as` for semantics
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
    scriptAccent?: string
    title?: string
    lead?: string
    align?: 'left' | 'center' | 'right'
  }

  // --- Advanced ---
  containerName?: string
  stickiness?: { top?: string }
}

export const SectionShell = React.forwardRef<HTMLElement, SectionShellProps>(
  (
    {
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
    // --- Resolve Spacing ---
    const resolvedSpacing = spacingPresets[spacing] || spacingPresets.none
    const finalPaddingY = paddingY ?? resolvedSpacing.paddingY ?? 'none'
    const finalMarginTop = marginTop ?? resolvedSpacing.marginTop ?? 'none'
    const finalMarginBottom = marginBottom ?? resolvedSpacing.marginBottom ?? 'none'

    // --- Dev-only warning for spacing preset overrides ---
    if (process.env.NODE_ENV === 'development' && spacing !== 'none') {
      const hasOverrides = paddingY || marginTop || marginBottom
      if (hasOverrides) {
        console.warn(
          `SectionShell: Using spacing preset "${spacing}" with manual overrides. ` +
          `Consider updating the preset or using spacing="none" for full manual control.`
        )
      }
    }

    // --- Background mapping ---
    const bgKind = typeof background === 'string' ? background : background.kind
    const bgDataAttribute = typeof background === 'string' ? background : undefined

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

    const Comp = Tag as any

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
        data-bg={bgDataAttribute}
        data-bg-kind={bgKind}
        data-divider={divider}
        data-radius={radius}
        data-shadow={shadow}
        data-container-name={containerName}
        className={composedClassName}
        style={sectionStyle}
        {...rest}
      >
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
                <Typography variant="script" color="accent" align={header.align || 'center'}>
                  {header.scriptAccent}
                </Typography>
              )}
              {header.title && (
                <Typography as="h2" variant="h1" align={header.align || 'center'}>
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
          <div className="section-content">{children}</div>
        </div>

        {divider !== 'none' && (
          <div className="section-shell__divider" data-divider={divider} aria-hidden="true" />
        )}
      </Comp>
    )
  }
)

SectionShell.displayName = 'SectionShell'

// --- Composition Components (for future flexibility) ---

/**
 * Section content wrapper - just the inner content container
 * Useful when you need custom header/layout but want consistent content spacing
 */
export function SectionBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className ? `section-content ${className}` : 'section-content'}>
      {children}
    </div>
  )
}

/**
 * Section header component - the scriptAccent/title/lead orchestration
 * Useful when you need the header logic outside of SectionShell
 */
export function SectionHeader({ 
  scriptAccent, 
  title, 
  lead, 
  align = 'center',
  className 
}: {
  scriptAccent?: string
  title?: string
  lead?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}) {
  return (
    <header className={className ? `section-header ${className}` : 'section-header'} data-align={align}>
      {scriptAccent && (
        <Typography variant="script" color="accent" align={align}>
          {scriptAccent}
        </Typography>
      )}
      {title && (
        <Typography as="h2" variant="h1" align={align}>
          {title}
        </Typography>
      )}
      {lead && (
        <Text
          size="lg"
          maxWidth="prose"
          align={align}
          color="secondary"
        >
          {lead}
        </Text>
      )}
    </header>
  )
}

SectionBody.displayName = 'SectionBody'
SectionHeader.displayName = 'SectionHeader'

export default SectionShell