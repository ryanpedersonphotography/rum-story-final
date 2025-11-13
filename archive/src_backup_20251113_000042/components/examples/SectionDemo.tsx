import { storyblokEditable } from '@storyblok/react'
import Section from '@/components/ui/Section'
import Hero from '@/features/Hero'

/**
 * Example usage of the layered Section system with Storyblok integration
 * 
 * This demonstrates how to wrap existing components with the new Section
 * primitive while preserving full Storyblok Visual Editor compatibility.
 */

// Example usage patterns
export function SectionDemoPage({ story }: { story: any }) {
  const sections = story.content?.sections || []

  return (
    <main className="page-base rail-aware">
      {/* Hero: Full-bleed background with rail-aware content */}
      <Section 
        as="header" 
        background="surface" 
        contentWidth="full" 
        {...storyblokEditable(story.content.hero)}
      >
        <Hero 
          blok={story.content.hero}
          contentAlign="left"
          contentWidth="prose" 
          useRailSystem={true}
        />
      </Section>

      {/* Discover Our Spaces: Base layer, left-aligned, wide content */}
      <Section 
        background="surface" 
        contentWidth="wide" 
        align="left"
        {...storyblokEditable(sections[0])}
      >
        {/* Your existing Spaces component */}
        <div className="media--inset">
          {/* Spaces content with inset images to prevent flush edges */}
        </div>
      </Section>

      {/* Your Perfect Venue: Partial background, alternating layout */}
      <Section 
        background="tint-rose" 
        contentWidth="content"
        className="elev-1"
        {...storyblokEditable(sections[1])}
      >
        <div className="alt">
          <div className="alt__content">
            {/* Text content */}
          </div>
          <div className="alt__media media--inset">
            {/* Image with controlled spacing */}
          </div>
        </div>
      </Section>

      {/* The Rum River Experience: Fully isolated surface */}
      <Section 
        background="tint-sage" 
        contentWidth="wide"
        className="elev-2"
        {...storyblokEditable(sections[2])}
      >
        {/* Experience content on elevated surface */}
      </Section>

      {/* Investment in Forever: Base layer with controllable card spacing */}
      <Section 
        background="surface" 
        contentWidth="content"
        {...storyblokEditable(sections[3])}
      >
        <div 
          className="cards cards--3up" 
          style={{ '--cards-gap': '48px' } as React.CSSProperties}
        >
          <div>Card 1</div>
          <div>Card 2</div>
          <div>Card 3</div>
        </div>
      </Section>
    </main>
  )
}

/* ===== Migration Patterns ===== */

// Before: Direct section with Storyblok
function OldPattern({ blok }: { blok: any }) {
  return (
    <section className="custom-section" {...storyblokEditable(blok)}>
      <div className="container">
        {/* content */}
      </div>
    </section>
  )
}

// After: Enhanced with layered system
function NewPattern({ blok }: { blok: any }) {
  return (
    <Section 
      background="tint-rose" 
      contentWidth="content" 
      align="center"
      className="custom-section"  // Keep existing styles if needed
      {...storyblokEditable(blok)}  // ← Preserves Storyblok integration
    >
      {/* content - container handled by Section */}
    </Section>
  )
}

/* ===== Advanced Examples ===== */

// Semantic HTML elements
export function SemanticSections({ blok }: { blok: any }) {
  return (
    <>
      <Section as="header" background="surface" contentWidth="full" {...storyblokEditable(blok.header)}>
        <Hero blok={blok.header} />
      </Section>
      
      <Section as="main" background="tint-rose" contentWidth="content" {...storyblokEditable(blok.main)}>
        {/* Main content */}
      </Section>
      
      <Section as="aside" background="tint-sage" contentWidth="wide" {...storyblokEditable(blok.sidebar)}>
        {/* Sidebar content */}
      </Section>
      
      <Section as="footer" background="surface" contentWidth="full" {...storyblokEditable(blok.footer)}>
        {/* Footer content */}
      </Section>
    </>
  )
}

// Custom spacing and elevation
export function CustomizedSection({ blok }: { blok: any }) {
  return (
    <Section 
      background="tint-sage"
      contentWidth="wide"
      align="left"
      className="elev-3"  // Custom elevation
      style={{ 
        '--section-y': '160px',  // Custom vertical spacing
        '--cards-gap': '64px'    // Custom card spacing
      } as React.CSSProperties}
      {...storyblokEditable(blok)}
    >
      {/* Content with custom spacing */}
    </Section>
  )
}

export default SectionDemoPage