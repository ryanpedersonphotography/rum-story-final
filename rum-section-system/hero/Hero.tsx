// src/components/leaf/Hero.tsx
import Section from '../layout/Section'
import Media from '../primitives/Media'

interface HeroProps {
  scriptAccent?: string
  title?: string
  titleAccent?: string
  lead?: string
  backgroundImage?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  scrollHint?: string
}

// Simple className utility
function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Hero({
  scriptAccent = 'A Rustic Romance',
  title = 'Rum River Wedding Barn',
  titleAccent = 'Your Perfect Day',
  lead = 'Nestled along the scenic Rum River, our restored 1920s barn offers the perfect blend of rustic charm and modern elegance for your special day.',
  backgroundImage = '/images/hero-barn-sunset.jpg',
  primaryCTA = {
    text: 'Schedule Your Tour',
    href: '#contact'
  },
  secondaryCTA = {
    text: 'View Packages',
    href: '#pricing'
  },
  scrollHint = 'Scroll to explore'
}: HeroProps) {
  
  return (
    <Section
      as="section"
      id="hero"
      width="full"
      paddingY="none"
      background="none"
      className="hero"
      data-section="hero"
    >
      <div className="hero__background">
        <Media
          src={backgroundImage}
          alt="Rum River Wedding Barn at sunset"
          aspectRatio="auto"
          objectFit="cover"
          loading="eager"
          className="hero__background-image"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>
      
      <div className="hero__content">
        <header className="hero__header">
          {scriptAccent && (
            <div className="hero__script-accent">
              {scriptAccent}
            </div>
          )}
          
          <h1 className="hero__title">
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="hero__title-accent">{titleAccent}</span>
              </>
            )}
          </h1>
          
          {lead && (
            <p className="hero__lead">
              {lead}
            </p>
          )}
        </header>
        
        <div className="hero__actions">
          <a 
            href={primaryCTA.href}
            className="hero__cta hero__cta--primary"
            data-testid="hero-primary-cta"
          >
            {primaryCTA.text}
          </a>
          
          <a 
            href={secondaryCTA.href}
            className="hero__cta hero__cta--secondary"
            data-testid="hero-secondary-cta"
          >
            {secondaryCTA.text}
          </a>
        </div>
      </div>
      
      {scrollHint && (
        <div className="hero__scroll-hint">
          <span className="hero__scroll-text">{scrollHint}</span>
          <div className="hero__scroll-arrow" aria-hidden="true">↓</div>
        </div>
      )}
    </Section>
  )
}