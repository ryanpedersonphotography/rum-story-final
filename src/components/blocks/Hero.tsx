import { Stack, Display, DisplayAccent, ArchText, CTAButton, Cluster } from '@/components/primitives'

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
    <section className={`Hero ${className}`.trim()}>
      {/* Background Image - Full viewport, behind toolbar */}
      <div className="Hero-media">
        <img 
          className="Hero-media-img"
          src={backgroundImage} 
          alt={title}
        />
        {/* Vignette overlay */}
        <div className="Hero-media-overlay" data-type="vignette" />
        {/* Glassmorphic "behind glass" effect */}
        <div className="Hero-glass-layer" />
      </div>

      {/* Content - Positioned to avoid toolbar */}
      <div className="Hero-content">
        <Stack gap="lg" align="center" className="text-center">
          
          {/* Accent Text */}
          <ArchText 
            text={tagline} 
            color="var(--brand-dusty-rose)" 
          />

          {/* Title Group */}
          <Display 
            as="h1" 
            size="hero"
            className="DisplayHeading"
            style={{ color: 'var(--brand-text-dark)', textShadow: 'none' }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <DisplayAccent style={{ color: 'var(--brand-text-dark)' }}>{titleAccent}</DisplayAccent>
              </>
            )}
          </Display>

          {/* CTAs */}
          <Cluster gap="md" justify="center">
            <CTAButton as="a" href="/contact" variant="primary" size="lg">
              Schedule a Tour
            </CTAButton>
            <CTAButton as="a" href="#spaces" variant="ghost" size="lg">
              Discover Our Spaces
            </CTAButton>
          </Cluster>

        </Stack>
      </div>
    </section>
  )
}

export default Hero
