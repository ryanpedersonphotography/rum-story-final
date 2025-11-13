// FILE: src/components/clean/Gallery.tsx
'use client'

import Image from 'next/image'
import { useState, type HTMLAttributes } from 'react'
import SectionShell from '@/components/ui/SectionShell'
import styles from './Gallery.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

const FALLBACK_GALLERIES: Array<{ couple: string; season: string; image: string; alt: string; href?: string }> = [
  {
    couple: 'Anthony & Linnea',
    season: 'Summer 2024',
    image: '/images/real-weddings/anthony-and-linnea.jpg',
    alt: 'Anthony & Linnea at Rum River Barn',
    href: '/real-weddings/anthony-and-linnea'
  },
  {
    couple: 'Loria & Jason Rolstad',
    season: 'Summer 2024',
    image: '/images/real-weddings/loria-and-jason-rolstad.jpg',
    alt: 'Loria & Jason Rolstad at Rum River Barn',
    href: '/real-weddings/loria-and-jason-rolstad'
  },
  {
    couple: 'Mattea Courtney',
    season: 'Summer 2024',
    image: '/images/real-weddings/mattea-courtney.jpg',
    alt: 'Mattea Courtney at Rum River Barn',
    href: '/real-weddings/mattea-courtney'
  },
  {
    couple: 'Kyle Carrie',
    season: 'Summer 2024',
    image: '/images/real-weddings/kyle-carrie.jpg',
    alt: 'Kyle Carrie at Rum River Barn',
    href: '/real-weddings/kyle-carrie'
  },
  {
    couple: 'Emily & Barron Nixon',
    season: 'Summer 2024',
    image: '/images/real-weddings/emily-and-barron-nixon.jpg',
    alt: 'Emily & Barron Nixon at Rum River Barn',
    href: '/real-weddings/emily-barron-nixon'
  },
  {
    couple: 'Joshua & Teri',
    season: 'Summer 2024',
    image: '/images/real-weddings/joshua-and-teri.jpg',
    alt: 'Joshua & Teri at Rum River Barn',
    href: '/real-weddings/joshua-teri'
  }
]

export default function Gallery() {
  const sectionTitle = 'Weddings at the Barn'
  const sectionSubtitle = 'Real Love Stories'
  const sectionDescription = 'Every celebration tells a unique story of love, laughter, and happily ever after.'

  return (
    <>
      <SectionShell
        id="gallery"
        paddingY="lg"
        spacing="content-flow"
        container="wide"
        background={'transparent'}
        tone="auto"
        header={{
          scriptAccent: sectionSubtitle,
          title: sectionTitle,
          lead: sectionDescription,
          align: 'center'
        }}
        className={styles.loveStoriesGallery}
        data-section="gallery"
      >
        <div className={styles.weddingGallery} data-anim="stagger">
          {FALLBACK_GALLERIES.map((wedding, index) => (
                <a
                  key={`${wedding.couple}-${index}`}
                  className={styles.item}
                  href={wedding.href || '#'}
                  aria-label={`${wedding.couple}${wedding.season ? ` — ${wedding.season}` : ''}`}
                  data-testid="gallery-item"
                >
                  <Image
                    src={wedding.image}
                    alt={wedding.alt}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                  />
                  <div className={styles.overlay} aria-hidden="true">
                    <Typography as="div" variant="h3" className={styles.coupleNames}>{wedding.couple}</Typography>
                    <Text size="sm" className={styles.season}>{wedding.season}</Text>
                    <Text size="sm" className={styles.details}>View Gallery →</Text>
                  </div>
                </a>
              ))}
        </div>
      </SectionShell>
    </>
  )
}