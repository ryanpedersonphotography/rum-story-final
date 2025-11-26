// ==========================================================================
// PRIMITIVES INDEX
// Re-export all primitive components for easy importing
// 
// All primitives accept `children` and variant props.
// They are the LEGO blocks to build any layout.
// ==========================================================================

// Layout
export { Section, SectionInner, SectionContent } from './Section'
export { EdgeSplit, EdgeSplitText, EdgeSplitMedia } from './EdgeSplit'
export { Overlap, OverlapBase, OverlapBaseMedia, OverlapForeground } from './Overlap'

// Composition
export { Stack } from './Stack'
export { Cluster } from './Cluster'
export { CopyBlock } from './CopyBlock'

// Media
export { MediaBlock, MediaBlockImg } from './MediaBlock'

// Typography
export { Display, DisplayAccent } from './Display'
export { Kicker, Eyebrow, ScriptAccent, Body, Lead } from './Typography'
export { ArchText } from './ArchText'

// Controls
export { CTAButton } from './CTAButton'

// Default export for convenience
export { Section as default } from './Section'
