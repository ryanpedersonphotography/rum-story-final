import { ReactNode } from 'react'

type EdgeSplitLayout = 'text-image' | 'image-text'
type EdgeSplitEdge = 'left' | 'right'
type EdgeSplitAlign = 'start' | 'center' | 'end'
type EdgeSplitGap = 'sm' | 'md' | 'lg' | 'xl'

interface EdgeSplitProps {
  children: ReactNode
  layout?: EdgeSplitLayout
  edge?: EdgeSplitEdge
  align?: EdgeSplitAlign
  gap?: EdgeSplitGap
  className?: string
}

/**
 * EdgeSplit - Side-by-side layout for text and media content.
 * 
 * Usage:
 * <EdgeSplit layout="text-image" edge="right">
 *   <EdgeSplitText>
 *     <Stack gap="lg">
 *       <h2>Title</h2>
 *       <p>Description</p>
 *     </Stack>
 *   </EdgeSplitText>
 *   <EdgeSplitMedia>
 *     <MediaBlock src="/image.jpg" variant="rounded" />
 *   </EdgeSplitMedia>
 * </EdgeSplit>
 */
export function EdgeSplit({
  children,
  layout,
  edge,
  align,
  gap,
  className = '',
}: EdgeSplitProps) {
  return (
    <div
      className={`EdgeSplit ${className}`.trim()}
      data-layout={layout}
      data-edge={edge}
      data-align={align}
      data-gap={gap}
    >
      {children}
    </div>
  )
}

interface EdgeSplitChildProps {
  children: ReactNode
  className?: string
}

export function EdgeSplitText({ children, className = '' }: EdgeSplitChildProps) {
  return (
    <div className={`EdgeSplit-text ${className}`.trim()}>
      {children}
    </div>
  )
}

export function EdgeSplitMedia({ children, className = '' }: EdgeSplitChildProps) {
  return (
    <div className={`EdgeSplit-media ${className}`.trim()}>
      {children}
    </div>
  )
}

export default EdgeSplit
