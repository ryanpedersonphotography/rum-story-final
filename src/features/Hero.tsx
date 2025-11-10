// ───────────────────────────────────────────────────────────────────────────────
// 1) CLEAN HERO (Storyblok-ready)  src/components/clean/Hero.tsx
// - storyblokEditable(blok) for inline editing
// - Field mapping for clean architecture (kicker/title/title_accent/description/bg_image)
// - Safe image handling (asset object or string)
// - Sets --hero-bg-url for CSS layer
// ───────────────────────────────────────────────────────────────────────────────
'use client'
import React from 'react'
import { storyblokEditable } from '@storyblok/react'
import styles from './Hero.module.css'
import SectionShell from '@/components/ui/SectionShell'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

type SBAsset = { filename?: string; alt?: string } | string | undefined

interface HeroBlok {
  _uid?: string
  component?: string
  // common field aliases for content mapping:
  kicker?: string
  title?: string
  title_accent?: string
  description?: string
  background_image?: SBAsset
  hero_image?: SBAsset
  bg_image?: SBAsset
  primary_cta_text?: string
  scroll_text?: string
  [key: string]: any
}

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

function assetUrl(a: SBAsset): string | undefined {
  if (!a) return undefined
  if (typeof a === 'string') return a
  return a.filename
}
function assetAlt(a: SBAsset, fallback: string): string {
  if (!a) return fallback
  if (typeof a === 'string') return fallback
  return a.alt || fallback
}

export default function Hero({ 
  blok,
  contentAlign = 'center',
  contentWidth = 'content', 
  useRailSystem = false 
}: { blok: HeroBlok } & HeroLayoutProps) {
  const bg =
    assetUrl(blok.background_image) ||
    assetUrl(blok.hero_image) ||
    assetUrl(blok.bg_image) ||
    '/images/barn-exterior-full-deck-view-evening.jpg'

  const bgAlt =
    assetAlt(blok.background_image, '') ||
    assetAlt(blok.hero_image, '') ||
    assetAlt(blok.bg_image, 'Rum River Wedding Barn')

  const kicker = blok.kicker || 'Where Dreams Begin'
  const title = blok.title || 'Rum River'
  const titleAccent = blok.title_accent || 'Wedding Barn'
  const lead =
    blok.description ||
    "Nestled along Minnesota's scenic Rum River, our historic barn offers the perfect blend of rustic charm and modern elegance for your once-in-a-lifetime celebration."
  const ctaLabel = blok.primary_cta_text || 'Schedule Your Visit'
  const scrollText = blok.scroll_text || 'Discover Your Perfect Day'

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
      {...storyblokEditable(blok)}
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