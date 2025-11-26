import { SectionShell } from '@/components/primitives/SectionShell'
import { Stack, Display, DisplayAccent, ArchText, CTAButton } from '@/components/primitives'

interface HeroProps {
  tagline?: string
  title: string
  titleAccent?: string
  backgroundImage: string
  className?: string
}

export function Hero({
  tagline = 'Where Dreams Begin',
  title = 'Rum River',
  titleAccent = 'Wedding Barn',
  backgroundImage = '/images/hero-dreams-begin.jpg',
  className = '',
}: HeroProps) {
  return (
    <SectionShell 
      width="full-under-toolbar" 
      variant="hero" 
      surface="brand-soft" 
      elevation={0}
      className={className}
      style={{ zIndex: 10 }}
    >
      <div className="relative" style={{ height: '100vh', width: '100%' }}>
        {/* Background Image */}
        <div className="MediaBlock absolute inset-0" style={{ height: '100%', width: '100%' }}>
          <img 
            className="MediaBlock-img"
            src={backgroundImage} 
            alt={title}
            style={{ objectFit: 'cover' }}
          />
          <div className="MediaBlock-overlay" data-type="vignette" />
        </div>

        {/* Top-Right Text Content (In the Sky) */}
        <div className="Positioner" data-position="overlay" data-align="top-right">
          <Stack gap="lg" align="center" className="text-center relative">
            
            {/* Title Group */}
            <div className="relative">
              <div style={{ position: 'absolute', top: '-70px', left: '50%', transform: 'translateX(-50%)', width: '340px' }}>
                <ArchText text={tagline} color="var(--brand-dusty-rose)" />
              </div>

              <Display 
                as="h1" 
                size="hero"
                className="DisplayHeading"
                style={{ color: 'var(--brand-text-dark)', textShadow: 'none', marginTop: '40px' }}
              >
                {title}
                {titleAccent && (
                  <>
                    <br />
                    <DisplayAccent style={{ color: 'var(--brand-text-dark)' }}>{titleAccent}</DisplayAccent>
                  </>
                )}
              </Display>
            </div>

            {/* CTAs */}
            <div className="Cluster" data-gap="md">
              <CTAButton as="a" href="/contact" variant="primary" size="lg">
                Schedule a Tour
              </CTAButton>
              <CTAButton as="a" href="#spaces" variant="ghost" size="lg">
                Discover Our Spaces
              </CTAButton>
            </div>

          </Stack>
        </div>
      </div>
    </SectionShell>
  )
}

export default Hero
