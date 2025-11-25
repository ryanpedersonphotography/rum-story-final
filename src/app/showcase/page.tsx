import { 
  Section, 
  SectionInner, 
  SectionContent,
  EdgeSplit,
  EdgeSplitText,
  EdgeSplitMedia,
  Overlap,
  OverlapBase,
  OverlapBaseMedia,
  OverlapForeground,
  Stack, 
  Cluster,
  MediaBlock,
  Display, 
  DisplayAccent,
  Eyebrow,
  Kicker, 
  ScriptAccent,
  ArchText,
  Body,
  Lead,
  CTAButton
} from '@/components/primitives'

export default function ShowcasePage() {
  return (
    <main className="MainCanvas">
      
      {/* ================================================================
          LAYOUT 1: Full-Bleed Hero with Glassmorphic Title Box (Desktop: Top Right)
          ================================================================ */}
      <Section width="full-under-toolbar" variant="flush">
        <div className="relative" style={{ height: '100vh' }}>
          <div className="MediaBlock absolute inset-0">
            <img 
              className="MediaBlock-img"
              src="/images/hero-dreams-begin.jpg" 
              alt="Hero Background"
            />
            <div className="MediaBlock-overlay" data-type="vignette" />
          </div>
          
          {/* Top-Right Text Content (In the Sky) */}
          <div className="Positioner" data-position="overlay" data-align="top-right">
            <Stack gap="sm" align="center" className="text-center relative">
              
              {/* Arched Text positioned absolutely relative to the stack top */}
              <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '300px' }}>
                <ArchText text="Where Dreams Begin" color="var(--brand-dusty-rose)" />
              </div>

              <Display 
                as="h1" 
                size="2xl"
                className="DisplayHeading"
                style={{ textShadow: 'none', color: 'var(--brand-text-dark)', marginTop: '40px' }}
              >
                Rum River <br />
                <DisplayAccent style={{ color: 'var(--brand-text-dark)' }}>Wedding Barn</DisplayAccent>
              </Display>
            </Stack>
          </div>
        </div>
      </Section>

      {/* ================================================================
          LAYOUT 2: EdgeSplit - Text Left, Image Right (Rounded)
          ================================================================ */}
      <Section width="full" surface="canvas" bleedBg>
        <SectionInner>
          <SectionContent>
            <EdgeSplit layout="text-image" edge="right">
              <EdgeSplitText>
                <Stack gap="lg">
                  <Stack gap="sm">
                    <Eyebrow>The Architecture</Eyebrow>
                    <Display size="3xl">
                      Designed for<br />
                      <DisplayAccent>the moment.</DisplayAccent>
                    </Display>
                  </Stack>
                  <Lead color="muted" width="narrow">
                    Floor-to-ceiling windows, open rafters, and a riverside 
                    tree line give you layered compositions from sunrise to blue hour.
                  </Lead>
                  <CTAButton variant="ghost">Learn More</CTAButton>
                </Stack>
              </EdgeSplitText>
              <EdgeSplitMedia>
                <MediaBlock 
                  src="/images/barn-interior-ceiling-beams-lighting.jpg"
                  alt="Barn Interior"
                  variant="rounded"
                  ratio="16-10"
                />
              </EdgeSplitMedia>
            </EdgeSplit>
          </SectionContent>
        </SectionInner>
      </Section>

      {/* ================================================================
          LAYOUT 3: EdgeSplit - Image Left, Text Right (Reversed)
          ================================================================ */}
      <Section width="full" surface="neutral-1">
        <SectionInner>
          <SectionContent>
            <EdgeSplit layout="image-text" edge="left">
              <EdgeSplitMedia>
                <MediaBlock 
                  src="/images/property-field-wildflowers-natural.jpg"
                  alt="Wildflowers"
                  variant="rounded"
                  ratio="4-3"
                />
              </EdgeSplitMedia>
              <EdgeSplitText>
                <Stack gap="lg">
                  <Stack gap="sm">
                    <Kicker>The Grounds</Kicker>
                    <Display size="2xl">
                      40 Acres of<br />
                      <DisplayAccent>Natural Beauty</DisplayAccent>
                    </Display>
                  </Stack>
                  <Body color="muted">
                    Rolling hills, ancient oaks, and meandering paths create 
                    endless photo opportunities. Every season brings new colors 
                    to your celebration.
                  </Body>
                </Stack>
              </EdgeSplitText>
            </EdgeSplit>
          </SectionContent>
        </SectionInner>
      </Section>

      {/* ================================================================
          LAYOUT 4: Overlap - Image with Floating Card (Right)
          ================================================================ */}
      <Section width="full-under-toolbar">
        <SectionContent>
          <Overlap foreground="right">
            <OverlapBase>
              <OverlapBaseMedia ratio="21-9" minHeight="50vh">
                <MediaBlock 
                  src="/images/property-field-wildflowers-natural.jpg"
                  alt="Venue Grounds"
                  variant="rounded"
                />
              </OverlapBaseMedia>
            </OverlapBase>
            <OverlapForeground>
              <Stack gap="lg">
                <Kicker>The Experience</Kicker>
                <Display size="2xl">
                  Nature is the<br />ultimate backdrop.
                </Display>
                <Body color="muted">
                  Step out onto the sprawling deck overlooking the Rum River. 
                  Our grounds feature native wildflowers and secluded paths.
                </Body>
                <Cluster>
                  <CTAButton variant="primary" size="sm">Explore</CTAButton>
                  <CTAButton variant="ghost" size="sm">View Map</CTAButton>
                </Cluster>
              </Stack>
            </OverlapForeground>
          </Overlap>
        </SectionContent>
      </Section>

      {/* ================================================================
          LAYOUT 5: Overlap - Image with Floating Card (Left)
          ================================================================ */}
      <Section width="full">
        <SectionContent>
          <Overlap foreground="left">
            <OverlapBase>
              <OverlapBaseMedia ratio="16-9" minHeight="45vh">
                <MediaBlock 
                  src="/images/barn-interior-ceiling-beams-lighting.jpg"
                  alt="Interior"
                  variant="rounded"
                />
              </OverlapBaseMedia>
            </OverlapBase>
            <OverlapForeground>
              <Stack gap="lg">
                <ScriptAccent size="lg" color="gold">Celebrate</ScriptAccent>
                <Display size="2xl">
                  Your Perfect<br />Venue Awaits
                </Display>
                <Body color="muted">
                  Host up to 250 guests in our stunning barn space, 
                  complete with climate control and modern amenities.
                </Body>
              </Stack>
            </OverlapForeground>
          </Overlap>
        </SectionContent>
      </Section>

      {/* ================================================================
          LAYOUT 6: Overlap - Image with Floating Card (Center)
          ================================================================ */}
      <Section width="full" surface="neutral-2">
        <SectionContent>
          <Overlap foreground="center" overlap="lg">
            <OverlapBase>
              <OverlapBaseMedia ratio="21-9" minHeight="40vh">
                <MediaBlock 
                  src="/images/hero-dreams-begin.jpg"
                  alt="Venue at Sunset"
                  variant="soft"
                />
              </OverlapBaseMedia>
            </OverlapBase>
            <OverlapForeground>
              <Stack gap="md" align="center" className="text-center">
                <Kicker>Limited Dates</Kicker>
                <Display size="2xl">2025 Season</Display>
                <Body color="muted" style={{ maxWidth: '40ch' }}>
                  Only a few prime dates remain for next year. 
                  Schedule your private tour today.
                </Body>
                <CTAButton variant="pill">Book Now</CTAButton>
              </Stack>
            </OverlapForeground>
          </Overlap>
        </SectionContent>
      </Section>

      {/* ================================================================
          LAYOUT 7: Centered Editorial CTA Section
          ================================================================ */}
      <Section width="standard" surface="neutral-2" elevation="1">
        <SectionInner>
          <Stack gap="xl" align="center" className="text-center" style={{ paddingBlock: 'var(--space-8)' }}>
            <Kicker>Est. 2024</Kicker>
            <Display style={{ maxWidth: '12ch' }}>
              Your story starts on the river.
            </Display>
            <Lead color="muted" size="lg" style={{ maxWidth: '60ch' }}>
              We are currently accepting bookings for the 2025-2026 wedding seasons. 
              Experience the magic of Rum River Barn in person.
            </Lead>
            <Cluster gap="md">
              <CTAButton variant="pill">Inquire Now</CTAButton>
              <CTAButton variant="ghost">Virtual Tour</CTAButton>
            </Cluster>
          </Stack>
        </SectionInner>
      </Section>

      {/* ================================================================
          LAYOUT 8: Three Feature Cards (Cluster of Stacks)
          ================================================================ */}
      <Section width="wide" surface="canvas">
        <SectionInner>
          <Stack gap="xl">
            <Stack gap="sm" align="center" className="text-center">
              <Eyebrow>What We Offer</Eyebrow>
              <Display size="2xl">Everything You Need</Display>
            </Stack>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: 'var(--space-6)' 
            }}>
              {/* Card 1 */}
              <div className="Frame" data-tone="neutral-2" data-elevation="1" data-pad="md">
                <Stack gap="md">
                  <Eyebrow color="accent">Capacity</Eyebrow>
                  <Display size="3xl">250</Display>
                  <Body color="muted">
                    Guests can gather in our climate-controlled barn space.
                  </Body>
                </Stack>
              </div>
              {/* Card 2 */}
              <div className="Frame" data-tone="neutral-2" data-elevation="1" data-pad="md">
                <Stack gap="md">
                  <Eyebrow color="accent">Acres</Eyebrow>
                  <Display size="3xl">40</Display>
                  <Body color="muted">
                    Sprawling grounds with multiple ceremony locations.
                  </Body>
                </Stack>
              </div>
              {/* Card 3 */}
              <div className="Frame" data-tone="neutral-2" data-elevation="1" data-pad="md">
                <Stack gap="md">
                  <Eyebrow color="accent">Hours</Eyebrow>
                  <Display size="3xl">12+</Display>
                  <Body color="muted">
                    Exclusive access from setup through late-night dancing.
                  </Body>
                </Stack>
              </div>
            </div>
          </Stack>
        </SectionInner>
      </Section>

      {/* ================================================================
          LAYOUT 9: Quote/Testimonial Section
          ================================================================ */}
      <Section width="standard" surface="brand-soft">
        <SectionInner>
          <Stack gap="lg" align="center" className="text-center" style={{ paddingBlock: 'var(--space-6)' }}>
            <ScriptAccent size="xl" color="gold">"</ScriptAccent>
            <Display size="2xl" style={{ maxWidth: '20ch', fontStyle: 'italic' }}>
              The most magical day of our lives.
            </Display>
            <Stack gap="xs" align="center">
              <Body>— Sarah & Michael</Body>
              <Kicker>June 2024</Kicker>
            </Stack>
          </Stack>
        </SectionInner>
      </Section>

      {/* ================================================================
          LAYOUT 10: Two-Column Split (50/50)
          ================================================================ */}
      <Section width="full">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)',
          minHeight: '60vh'
        }}>
          {/* Left: Image */}
          <div className="MediaBlock" style={{ height: '100%' }}>
            <img 
              className="MediaBlock-img"
              src="/images/barn-interior-ceiling-beams-lighting.jpg"
              alt="Venue Interior"
            />
          </div>
          {/* Right: Content */}
          <div style={{ 
            background: 'var(--surface-neutral-2)', 
            display: 'flex', 
            alignItems: 'center',
            padding: 'var(--space-8)'
          }}>
            <Stack gap="lg">
              <Eyebrow>The Barn</Eyebrow>
              <Display size="2xl">
                Rustic Elegance<br />
                <DisplayAccent>Meets Modern</DisplayAccent>
              </Display>
              <Body color="muted" style={{ maxWidth: '45ch' }}>
                Original timber beams pair with modern amenities including 
                full climate control, professional sound system, and 
                customizable lighting.
              </Body>
              <CTAButton variant="outline">View Gallery</CTAButton>
            </Stack>
          </div>
        </div>
      </Section>

      {/* ================================================================
          LAYOUT 11: Stacked Full-Width Images with Text Overlays
          ================================================================ */}
      <Section width="full-under-toolbar" variant="flush">
        <Stack gap="none">
          {/* Image 1 */}
          <div className="relative" style={{ height: '50vh' }}>
            <div className="MediaBlock absolute inset-0">
              <img 
                className="MediaBlock-img"
                src="/images/property-field-wildflowers-natural.jpg"
                alt="Outdoor Ceremony"
              />
              <div className="MediaBlock-overlay" data-type="gradient-bottom" />
            </div>
            <div className="absolute" style={{ bottom: 'var(--space-6)', left: 'var(--space-6)', zIndex: 2 }}>
              <Stack gap="sm">
                <Kicker>Ceremonies</Kicker>
                <Display size="2xl">Say &ldquo;I Do&rdquo; Outdoors</Display>
              </Stack>
            </div>
          </div>
          {/* Image 2 */}
          <div className="relative" style={{ height: '50vh' }}>
            <div className="MediaBlock absolute inset-0">
              <img 
                className="MediaBlock-img"
                src="/images/barn-interior-ceiling-beams-lighting.jpg"
                alt="Reception"
              />
              <div className="MediaBlock-overlay" data-type="gradient-bottom" />
            </div>
            <div className="absolute" style={{ bottom: 'var(--space-6)', right: 'var(--space-6)', zIndex: 2, textAlign: 'right' }}>
              <Stack gap="sm" align="end">
                <Kicker>Receptions</Kicker>
                <Display size="2xl">Dance the Night Away</Display>
              </Stack>
            </div>
          </div>
        </Stack>
      </Section>

      {/* ================================================================
          LAYOUT 12: Image Gallery Grid
          ================================================================ */}
      <Section width="wide" surface="neutral-1">
        <SectionInner>
          <Stack gap="xl">
            <Stack gap="sm" align="center" className="text-center">
              <Kicker>Gallery</Kicker>
              <Display size="2xl">Captured Moments</Display>
            </Stack>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: 'var(--space-4)' 
            }}>
              <MediaBlock src="/images/history/history-00001.jpg" alt="Wedding 1" variant="rounded" ratio="1-1" />
              <MediaBlock src="/images/history/history-00002.jpg" alt="Wedding 2" variant="rounded" ratio="1-1" />
              <MediaBlock src="/images/history/history-00003.jpg" alt="Wedding 3" variant="rounded" ratio="1-1" />
              <MediaBlock src="/images/history/history-00004.jpg" alt="Wedding 4" variant="rounded" ratio="1-1" />
              <MediaBlock src="/images/history/history-00005.jpg" alt="Wedding 5" variant="rounded" ratio="1-1" />
              <MediaBlock src="/images/history/history-00006.jpg" alt="Wedding 6" variant="rounded" ratio="1-1" />
            </div>
            <Cluster justify="center">
              <CTAButton variant="ghost">View All Photos</CTAButton>
            </Cluster>
          </Stack>
        </SectionInner>
      </Section>

      {/* ================================================================
          LAYOUT 13: Simple Text Section (Prose)
          ================================================================ */}
      <Section width="standard" surface="canvas">
        <SectionInner>
          <Stack gap="lg" align="center" className="text-center">
            <ScriptAccent size="lg">Our Story</ScriptAccent>
            <Display size="2xl">A Family Legacy</Display>
            <Body color="muted" style={{ maxWidth: '65ch', textAlign: 'center' }}>
              For three generations, our family has stewarded this land along the Rum River. 
              When we decided to open our doors to couples seeking a meaningful place to 
              begin their journey together, we knew we wanted to preserve the authentic 
              character of our Minnesota homestead while creating a space that would host 
              celebrations for generations to come.
            </Body>
            <CTAButton variant="outline">Read Our Full Story</CTAButton>
          </Stack>
        </SectionInner>
      </Section>

      {/* ================================================================
          LAYOUT 14: Final CTA - Full Width with Gradient
          ================================================================ */}
      <Section width="full-under-toolbar" variant="flush">
        <div className="relative" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="MediaBlock absolute inset-0">
            <img 
              className="MediaBlock-img"
              src="/images/hero-dreams-begin.jpg"
              alt="Venue at Golden Hour"
            />
            <div className="MediaBlock-overlay" data-type="darken" />
          </div>
          <Stack gap="lg" align="center" className="text-center relative z-10">
            <ScriptAccent size="hero" color="cream">Ready to Begin?</ScriptAccent>
            <Display size="lg">
              Schedule Your<br />
              <DisplayAccent>Private Tour</DisplayAccent>
            </Display>
            <Lead style={{ maxWidth: '50ch', color: 'var(--cream-pearl)' }}>
              See firsthand why couples choose Rum River Barn for their most important day.
            </Lead>
            <Cluster gap="md">
              <CTAButton variant="primary" size="lg">Book a Tour</CTAButton>
              <CTAButton variant="ghost" size="lg">Contact Us</CTAButton>
            </Cluster>
          </Stack>
        </div>
      </Section>

    </main>
  )
}
