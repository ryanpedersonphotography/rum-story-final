import { ReactNode } from 'react'

type OverlapForegroundPosition = 'left' | 'center' | 'right'
type OverlapAmount = 'sm' | 'md' | 'lg' | 'none'

interface OverlapProps {
  children: ReactNode
  foreground?: OverlapForegroundPosition
  overlap?: OverlapAmount
  className?: string
}

/**
 * Overlap - Hero image with floating foreground card overlay.
 * 
 * Usage:
 * <Overlap foreground="right" overlap="lg">
 *   <OverlapBase>
 *     <OverlapBaseMedia ratio="21-9">
 *       <MediaBlock src="/image.jpg" variant="rounded" />
 *     </OverlapBaseMedia>
 *   </OverlapBase>
 *   <OverlapForeground>
 *     <Stack gap="lg">
 *       <h2>Title</h2>
 *       <p>Description</p>
 *     </Stack>
 *   </OverlapForeground>
 * </Overlap>
 */
export function Overlap({
  children,
  foreground,
  overlap,
  className = '',
}: OverlapProps) {
  return (
    <div
      className={`Overlap ${className}`.trim()}
      data-foreground={foreground}
      data-overlap={overlap}
    >
      {children}
    </div>
  )
}

interface OverlapChildProps {
  children: ReactNode
  className?: string
}

export function OverlapBase({ children, className = '' }: OverlapChildProps) {
  return (
    <div className={`Overlap-base ${className}`.trim()}>
      {children}
    </div>
  )
}

type OverlapBaseMediaRatio = '16-9' | '21-9' | '4-3' | '3-2'

interface OverlapBaseMediaProps {
  children: ReactNode
  ratio?: OverlapBaseMediaRatio
  minHeight?: string
  className?: string
}

export function OverlapBaseMedia({ 
  children, 
  ratio,
  minHeight,
  className = '' 
}: OverlapBaseMediaProps) {
  return (
    <div 
      className={`Overlap-baseMedia ${className}`.trim()}
      data-ratio={ratio}
      style={minHeight ? { minHeight } : undefined}
    >
      {children}
    </div>
  )
}

export function OverlapForeground({ children, className = '' }: OverlapChildProps) {
  return (
    <div className={`Overlap-foreground ${className}`.trim()}>
      {children}
    </div>
  )
}

export default Overlap
