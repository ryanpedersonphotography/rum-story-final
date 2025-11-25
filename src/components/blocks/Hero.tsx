import { Section } from '@/components/primitives'
import { Stack, ScriptAccent, Display, DisplayAccent, ArchText } from '@/components/primitives'

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
    <Section 
      width="full-under-toolbar" 
      variant="flush" 
      className={className}
      elevation="3"
      style={{ zIndex: 10 }}
    >
      <div className="relative" style={{ height: '100vh', width: '100%' }}>
        {/* Background Image */}
        <div className="MediaBlock absolute inset-0" style={{ height: '100%', width: '100%' }}>
          <img 
            className="MediaBlock-img"
            src={backgroundImage} 
            alt={title}
          />
          {/* Dark overlay for text readability */}
          <div className="MediaBlock-overlay" data-type="vignette" />
        </div>

        {/* Top-Right Text Content (In the Sky) */}
        <div className="Positioner" data-position="overlay" data-align="top-right">
          <Stack gap="sm" align="center" className="text-center relative">
            
            {/* Arched Text positioned absolutely relative to the stack top */}
            <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '300px' }}>
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
          </Stack>
        </div>
      </div>
    </Section>
  )
}

export default Hero
