import { 
  Hero, 
  ArchitectureSection, 
  GroundsSection, 
  CTASection 
} from '@/components/blocks'

export default function Page() {
  return (
    <main className="MainCanvas">
      {/* 1. FULL VIEWPORT HERO */}
      <Hero
        tagline="Where Dreams Begin"
        title="Rum River"
        titleAccent="Wedding Barn"
        backgroundImage="/images/hero-dreams-begin.jpg"
      />

      {/* 2. ARCHITECTURE SECTION: EdgeSplit Layout */}
      <ArchitectureSection
        eyebrow="The Architecture"
        title="Designed for"
        titleAccent="the moment."
        description="Floor-to-ceiling windows, open rafters, and a riverside tree line give you layered compositions from sunrise to blue hour."
        image="/images/barn-interior-ceiling-beams-lighting.jpg"
        imageAlt="Barn Interior with Beams"
      />

      {/* 3. GROUNDS SECTION: Overlap Layout */}
      <GroundsSection
        kicker="The Grounds"
        title="Nature is the ultimate backdrop."
        description="Step out onto the sprawling deck overlooking the Rum River. Our grounds feature native wildflowers, manicured lawns for lawn games, and secluded paths perfect for a private first look."
        image="/images/property-field-wildflowers-natural.jpg"
        imageAlt="Wildflowers field"
        ctaText="Explore the map"
      />

      {/* 4. CTA SECTION: Editorial Typography */}
      <CTASection
        kicker="Est. 2024"
        title="Your story starts on the river."
        description="We are currently accepting bookings for the 2025-2026 wedding seasons. Experience the magic of Rum River Barn in person."
        buttonText="Inquire Now"
        surface="neutral-2"
        elevation="1"
      />
    </main>
  )
}
