import Section from '@/components/ui/Section'
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
      background="tint-rose" 
      contentWidth="content" 
      align="center" 
      className="elev-1"
      data-header-placement="inside"
      header={{
        scriptAccent,
        title,
        lead,
      }}
    >
      {/* mark a neutralization boundary for legacy CSS */}
      <div data-legacy-root>
        <Spaces {...props} />
      </div>
    </Section>
  )
}