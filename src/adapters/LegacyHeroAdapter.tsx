import Section from '@/components/ui/Section'
import Hero from '@/features/Hero' // existing file

interface LegacyHeroAdapterProps {
  blok?: any
  [key: string]: any
}

export default function LegacyHeroAdapter(props: LegacyHeroAdapterProps) {
  return (
    <Section 
      background="surface" 
      contentWidth="full" 
      align="center" 
      data-rail-offset="true"
      data-float="true"
    >
      {/* mark a neutralization boundary for legacy CSS */}
      <div data-legacy-root>
        <Hero {...props} />
      </div>
    </Section>
  )
}