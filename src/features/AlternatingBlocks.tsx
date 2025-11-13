'use client'

import Image from 'next/image'
import React from 'react'
import SectionShell from '@/components/ui/SectionShell'
import styles from './AlternatingBlocks.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

interface Block {
  _uid?: string
  number?: string
  title?: string
  lead?: string
  content?: Array<{ text?: string } | string>
  image?: { filename?: string } | string
  image_alt?: string
  is_reverse?: boolean
}

const defaultBlocks: Block[] = [
  {
    number: '01',
    title: 'Unforgettable Scenery',
    lead: 'Our barn is set on a stunning property with breathtaking views of the Rum River, providing a picturesque backdrop for your ceremony and photos.',
    image: '/images/barn-interior-ceiling-beams-lighting.jpg',
    image_alt: 'Interior of the barn with high ceilings and beautiful lighting.',
    is_reverse: false,
  },
  {
    number: '02',
    title: 'Flexible Spaces',
    lead: 'From our grand main hall to our intimate outdoor spaces, we offer a variety of options to customize your wedding day to your exact vision.',
    image: '/images/property-field-wildflowers-natural.jpg',
    image_alt: 'Wildflowers in a field on the property.',
    is_reverse: true,
  },
  {
    number: '03',
    title: 'All-Inclusive Packages',
    lead: 'We offer comprehensive packages that include everything you need for a seamless and stress-free wedding day, from tables and chairs to on-site coordination.',
    image: '/images/wedding-party-celebrating-outdoors.jpg',
    image_alt: 'A wedding party celebrating outdoors.',
    is_reverse: false,
  },
]

export default function AlternatingBlocks() {
  const paddingSize = 'lg'
  const backgroundVariant = 'surface'

  return (
    <SectionShell
      paddingY={paddingSize}
      spacing="hero-start"
      container="content"
      tone="auto"
      background={backgroundVariant}
      header={{
        scriptAccent: 'Your Perfect Venue',
        title: 'Why Choose Rum River Barn',
        lead: 'Discover what makes our venue the perfect setting for your unforgettable celebration',
        align: 'center',
      }}
      className={styles.alternatingBlocks}
      data-section="alternating-blocks"
    >
      <div className={styles.container}>
        {defaultBlocks.map((block, index) => {
          const imageUrl =
            typeof block.image === 'object' && block.image?.filename
              ? block.image.filename
              : typeof block.image === 'string' && block.image.trim() !== ''
              ? block.image
              : ''

          return (
            <div
              key={block._uid || index}
              className={`${styles.item}${block.is_reverse ? ` ${styles.itemReverse}` : ''}`}
            >
              <div className={styles.content}>
                <Typography as="div" variant="h1" className={styles.number}>
                  {block.number || `0${index + 1}`}
                </Typography>
                <Typography as="h3" variant="h2" className={styles.title}>
                  {block.title || 'Block Title'}
                </Typography>
                <Text size="lg" className={styles.lead}>
                  {block.lead || 'Block lead text'}
                </Text>
                {(block.content || []).map((paragraph, pIndex) => {
                  const text =
                    typeof paragraph === 'object' && paragraph.text
                      ? paragraph.text
                      : String(paragraph)

                  return (
                    <Text
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
    </SectionShell>
  )
}
