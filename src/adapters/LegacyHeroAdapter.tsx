import Section from '@/components/layout/Section'
import Hero from '@/components/clean/Hero' // existing file

interface LegacyHeroAdapterProps {
  blok?: any
  [key: string]: any
}

export default function LegacyHeroAdapter(props: LegacyHeroAdapterProps) {
  return (
    <Section 
      layer="base" 
      width="full" 
      align="center" 
      elevation={0}
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