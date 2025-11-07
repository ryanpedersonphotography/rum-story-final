import Section from '@/components/layout/Section'
import Spaces from '@/components/clean/Spaces' // existing file

interface LegacySpacesAdapterProps {
  blok?: any
  [key: string]: any
}

export default function LegacySpacesAdapter(props: LegacySpacesAdapterProps) {
  const { blok } = props
  
  // Extract header data from blok
  const scriptAccent = blok?.script_accent || blok?.subtitle || 'Your Perfect Setting'
  const title = blok?.title || 'Discover Our Spaces'
  const lead = blok?.description || 'Every corner tells a story, every space creates memories'

  return (
    <Section 
      layer="partial" 
      width="content" 
      align="center" 
      elevation={1}
      data-header-placement="inside"
    >
      {/* Section header with proper typography */}
      <div className="section__header">
        <span className="section__script-accent">{scriptAccent}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__lead">{lead}</p>
      </div>

      {/* mark a neutralization boundary for legacy CSS */}
      <div data-legacy-root>
        <Spaces {...props} />
      </div>
    </Section>
  )
}