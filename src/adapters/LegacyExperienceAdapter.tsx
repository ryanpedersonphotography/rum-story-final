import Section from '@/components/ui/Section'
import Experience from '@/components/clean/Experience' // existing file

interface LegacyExperienceAdapterProps {
  blok?: any
  [key: string]: any
}

export default function LegacyExperienceAdapter(props: LegacyExperienceAdapterProps) {
  return (
    <Section 
      background="tint-rose" 
      contentWidth="wide" 
      align="center" 
      className="elev-1"
      data-header-placement="outside"
    >
      {/* mark a neutralization boundary for legacy CSS */}
      <div data-legacy-root>
        <Experience {...props} />
      </div>
    </Section>
  )
}