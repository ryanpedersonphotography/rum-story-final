'use client'

import Image from 'next/image'
import React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import SectionWrapper from '@/components/ui/SectionWrapper'
import styles from './AlternatingBlocks.module.css'

interface AlternatingBlocksBlok {
  _uid?: string
  component?: string
  script_accent?: string
  title?: string
  description?: string
  background_variant?: 'surface' | 'tint-rose' | 'tint-sage' | 'dark-gradient'
  theme_override?: 'auto' | 'light' | 'dark'
  padding_size?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid'
  blocks?: Array<{
    _uid?: string
    number?: string
    title?: string
    lead?: string
    content?: Array<{ text?: string } | string>
    image?: { filename?: string } | string
    image_alt?: string
    is_reverse?: boolean
  }>
  [key: string]: any
}

export default function AlternatingBlocks({ blok }: { blok: AlternatingBlocksBlok }) {
  // Fallback images to alternate between
  const fallbackImages = [
    '/images/barn-interior-ceiling-beams-lighting.jpg',
    '/images/property-field-wildflowers-natural.jpg',
  ]

  // Get styling from Storyblok or use defaults
  const backgroundVariant = blok.background_variant || 'tint-rose'
  const themeOverride = blok.theme_override || 'auto'
  // Map 'fluid' to 'lg' since we don't have a fluid padding variant
  const rawPaddingSize = blok.padding_size || 'lg'
  const paddingSize = rawPaddingSize === 'fluid' ? 'lg' : rawPaddingSize

  return (
    <SectionWrapper
        paddingY={paddingSize as any}
        spacing="hero-start"
        maxWidth="standard"
        theme="inherit"
        background={backgroundVariant === 'surface' ? 'surface-1' : backgroundVariant === 'tint-rose' ? 'surface-2' : 'transparent'}
        header={{
          scriptAccent: blok.script_accent || 'Your Perfect Venue',
          title: blok.title || 'Why Choose Rum River Barn',
          lead: blok.description || 'Discover what makes our venue the perfect setting for your unforgettable celebration',
          align: 'center'
        }}
        className={styles.alternatingBlocks}
        blok={blok}
        data-section="alternating-blocks"
        {...storyblokEditable(blok)}
      >
      <div className={styles.container}>
        {(blok.blocks || []).map((block, index) => {
          // Use alternating fallback images based on index
          const fallbackImage = fallbackImages[index % fallbackImages.length]

          // Handle image field - could be Storyblok asset object, string, or empty
          const imageUrl = typeof block.image === 'object' && block.image?.filename
            ? block.image.filename
            : typeof block.image === 'string' && block.image.trim() !== ''
            ? block.image
            : fallbackImage

          return (
            <div
              key={block._uid || index}
              className={`${styles.item}${block.is_reverse ? ` ${styles.itemReverse}` : ''}`}
              {...(block._uid ? storyblokEditable(block) : {})}
            >
              <div className={styles.content}>
                <div className={styles.number}>
                  {block.number || `0${index + 1}`}
                </div>
                <h3 className={styles.title}>
                  {block.title || 'Block Title'}
                </h3>
                <p className={styles.lead}>
                  {block.lead || 'Block lead text'}
                </p>
                {(block.content || []).map((paragraph, pIndex) => {
                  const text = typeof paragraph === 'object' && paragraph.text
                    ? paragraph.text
                    : String(paragraph)

                  return (
                    <p
                      key={pIndex}
                      className={styles.paragraph}
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  )
                })}
              </div>
              <div className={styles.image}>
                <Image
                  src={imageUrl}
                  alt={block.image_alt || 'Venue image'}
                  width={800}
                  height={500}
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 90vw"
                />
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
