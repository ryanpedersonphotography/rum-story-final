/**
 * Zen System 7.0 - Demo Page
 * Showcases all atoms and recipes without legacy CSS.
 * 
 * Visit /zen-demo to test the design system.
 */

import { Layout, Surface, Type, Motion } from '@/system/atoms'
import { Section, AutoGrid, HeroSection } from '@/system/recipes'

export default function ZenDemoPage() {
  return (
    <>
      {/* Hero Section with gradient */}
      <HeroSection variant="warm" minHeight="50vh">
        <Type as="h1" size="hero" tone="inherit">
          Zen System 7.0
        </Type>
        <Type as="p" size="body" tone="inherit">
          A complete design system built from tokens, atoms, and recipes.
        </Type>
      </HeroSection>

      {/* Typography Section */}
      <Section divider>
        <Layout type="stack" gap={8}>
          <Type as="h2" size="display">Typography Scale</Type>
          
          <Layout type="stack" gap={4}>
            <Type as="h1" size="hero">Hero Text (clamp 2.5-4.5rem)</Type>
            <Type as="h2" size="display">Display Text (clamp 2-3.5rem)</Type>
            <Type as="h3" size="title">Title Text (clamp 1.5-2.25rem)</Type>
            <Type as="p" size="body">Body text at 1rem for regular content and paragraphs.</Type>
            <Type as="span" size="caption" tone="muted">Caption text at 0.875rem for metadata and labels</Type>
          </Layout>
        </Layout>
      </Section>

      {/* Surfaces Section */}
      <Section divider>
        <Layout type="stack" gap={8}>
          <Type as="h2" size="display">Surface Tones</Type>
          
          <AutoGrid gap={4} minItemWidth="200px">
            <Surface tone="paper" elevation="raised" radius="md" style={{ padding: '24px' }}>
              <Type size="body" weight="semibold">Paper</Type>
              <Type size="caption" tone="muted">Default background</Type>
            </Surface>
            
            <Surface tone="paper-raised" elevation="raised" radius="md" style={{ padding: '24px' }}>
              <Type size="body" weight="semibold">Paper Raised</Type>
              <Type size="caption" tone="muted">Card background</Type>
            </Surface>
            
            <Surface tone="accent" elevation="raised" radius="md" style={{ padding: '24px' }}>
              <Type size="body" weight="semibold" tone="inherit">Accent</Type>
              <Type size="caption" tone="inherit">Brand color</Type>
            </Surface>
            
            <Surface tone="glass" elevation="flat" radius="md" style={{ padding: '24px' }}>
              <Type size="body" weight="semibold">Glass</Type>
              <Type size="caption" tone="muted">Frosted effect</Type>
            </Surface>
          </AutoGrid>
        </Layout>
      </Section>

      {/* Layout Section */}
      <Section divider>
        <Layout type="stack" gap={8}>
          <Type as="h2" size="display">Layout Patterns</Type>
          
          <Layout type="stack" gap={4}>
            <Type as="h3" size="title">Stack (Column)</Type>
            <Layout type="stack" gap={2} style={{ background: 'var(--color-paper-raised)', padding: '16px', borderRadius: '8px' }}>
              <Surface tone="accent" radius="sm" style={{ padding: '8px 16px' }}>
                <Type tone="inherit" size="caption">Item 1</Type>
              </Surface>
              <Surface tone="accent" radius="sm" style={{ padding: '8px 16px' }}>
                <Type tone="inherit" size="caption">Item 2</Type>
              </Surface>
              <Surface tone="accent" radius="sm" style={{ padding: '8px 16px' }}>
                <Type tone="inherit" size="caption">Item 3</Type>
              </Surface>
            </Layout>
          </Layout>

          <Layout type="stack" gap={4}>
            <Type as="h3" size="title">Cluster (Row + Wrap)</Type>
            <Layout type="cluster" gap={2} style={{ background: 'var(--color-paper-raised)', padding: '16px', borderRadius: '8px' }}>
              <Surface tone="accent" radius="sm" style={{ padding: '8px 16px' }}>
                <Type tone="inherit" size="caption">Tag 1</Type>
              </Surface>
              <Surface tone="accent" radius="sm" style={{ padding: '8px 16px' }}>
                <Type tone="inherit" size="caption">Tag 2</Type>
              </Surface>
              <Surface tone="accent" radius="sm" style={{ padding: '8px 16px' }}>
                <Type tone="inherit" size="caption">Tag 3</Type>
              </Surface>
              <Surface tone="accent" radius="sm" style={{ padding: '8px 16px' }}>
                <Type tone="inherit" size="caption">Tag 4</Type>
              </Surface>
            </Layout>
          </Layout>

          <Layout type="stack" gap={4}>
            <Type as="h3" size="title">AutoGrid (Responsive)</Type>
            <AutoGrid gap={4} minItemWidth="150px">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Surface key={n} tone="paper-raised" elevation="raised" radius="md" style={{ padding: '24px', textAlign: 'center' }}>
                  <Type size="title" weight="bold">{n}</Type>
                </Surface>
              ))}
            </AutoGrid>
          </Layout>
        </Layout>
      </Section>

      {/* Animation Section */}
      <Section>
        <Layout type="stack" gap={8}>
          <Type as="h2" size="display">Motion (Scroll-triggered)</Type>
          
          <AutoGrid gap={4} minItemWidth="280px">
            <Motion mode="fade-up" delay={0}>
              <Surface tone="paper-raised" elevation="raised" radius="md" style={{ padding: '24px' }}>
                <Type size="title" weight="semibold">Fade Up 1</Type>
                <Type size="body" tone="muted">Slides up and fades in on scroll</Type>
              </Surface>
            </Motion>
            
            <Motion mode="fade-up" delay={0.1}>
              <Surface tone="paper-raised" elevation="raised" radius="md" style={{ padding: '24px' }}>
                <Type size="title" weight="semibold">Fade Up 2</Type>
                <Type size="body" tone="muted">With 0.1s delay</Type>
              </Surface>
            </Motion>
            
            <Motion mode="fade-up" delay={0.2}>
              <Surface tone="paper-raised" elevation="raised" radius="md" style={{ padding: '24px' }}>
                <Type size="title" weight="semibold">Fade Up 3</Type>
                <Type size="body" tone="muted">With 0.2s delay</Type>
              </Surface>
            </Motion>
          </AutoGrid>
        </Layout>
      </Section>

      {/* Dusk Hero variant */}
      <HeroSection variant="dusk" minHeight="40vh">
        <Type as="h2" size="display" tone="inherit">
          Hero Variant: Dusk
        </Type>
        <Type as="p" size="body" tone="inherit">
          Different gradient for variety.
        </Type>
      </HeroSection>
    </>
  )
}
