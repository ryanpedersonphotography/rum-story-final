'use client'
import React from 'react'
import styles from './Hero.module.css'
import SectionShell from '@/components/ui/SectionShell'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

// Layout Control System (Phase 1: Content Positioning)
export interface HeroLayoutProps {
  /** Content alignment - where to position the hero content */
  contentAlign?: 'left' | 'center' | 'right'
  /** Content width constraint for typography and readability */
  contentWidth?: 'prose' | 'content' | 'wide'
  /** Use modern rail-based positioning system */
  useRailSystem?: boolean
  // Phase 2 (Future): fullViewport?: boolean  // Full-screen slideshow experience
}

export default function Hero({
  contentAlign = 'center',
  contentWidth = 'content',
}: HeroLayoutProps) {
  const bg = '/images/barn-exterior-full-deck-view-evening.jpg'
  const bgAlt = 'Rum River Wedding Barn'
  const kicker = 'Where Dreams Begin'
  const title = 'Rum River'
  const titleAccent = 'Wedding Barn'
  const lead =
    "Nestled along Minnesota's scenic Rum River, our historic barn offers the perfect blend of rustic charm and modern elegance for your once-in-a-lifetime celebration."
  const ctaLabel = 'Schedule Your Visit'
  const scrollText = 'Discover Your Perfect Day'

  // smooth scroll (no Bridge conflicts)
  const onScrollClick = () => {
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    const start = window.pageYOffset
    const amount = window.innerHeight * 0.9
    const duration = 850
    const t0 = performance.now()
    const ease = (t: number) => t * (2 - t)
    const step = (t1: number) => {
      const p = Math.min((t1 - t0) / duration, 1)
      window.scrollTo({ top: start + amount * ease(p), behavior: 'auto' })
      if (p < 1) requestAnimationFrame(step)
      else html.style.scrollBehavior = prev
    }
    requestAnimationFrame(step)
  }

  return (
    <SectionShell 
      height="screen"
      background={{ kind: 'image', src: bg, attachment: 'fixed' }}
      className={styles.hero} 
      data-section="hero" 
      align={contentAlign}
      container={contentWidth}
    >
      <span className={styles.srOnly}>{bgAlt}</span>

      <div className={styles.heroContent}>
        <Typography as="div" variant="script" className={styles.eyebrow}>{kicker}</Typography>

        <Typography as="h1" variant="display" className={styles.title}>
          {title}
          <br />
          <span className={styles.titleAccent}>{titleAccent}</span>
        </Typography>

        <Text size="lg" className={styles.lead}>{lead}</Text>

        <div className={styles.ctas}>
          <a href="#contact" className={`${styles.cta} ${styles.ctaSecondary}`}>
            {ctaLabel}
          </a>
        </div>
      </div>

      {/* <div className={styles.scroll} onClick={onScrollClick}>
        <div className={styles.scrollText}>{scrollText}</div>
        <div className={styles.scrollArrow}>↓</div>
      </div> */}
    </SectionShell>
  )
}