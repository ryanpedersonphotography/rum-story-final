'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import SectionShell from '@/components/ui/SectionShell'
import styles from './Spaces.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

interface Feature {
  _uid: string
  component: 'feature'
  feature_title?: string
  feature_blurb?: string
}

interface Space {
  _uid: string
  component: 'space'
  space_name?: string
  space_photos?: Array<{ filename?: string; alt?: string }>
  space_description?: string
  space_features?: Feature[]
}

export default function Spaces() {
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const defaultSpaces = [
    {
      _uid: 'default-barn',
      component: 'space' as const,
      space_name: 'The Historic Barn',
      space_photos: [
        { filename: '/images/barn-exterior-full-deck-view-evening.jpg', alt: 'Historic Barn exterior' },
        { filename: '/images/real-weddings/anthony-and-linnea/photos/001.jpg', alt: 'Barn interior' },
        { filename: '/images/real-weddings/kyle-carrie/photos/015.jpg', alt: 'Barn event' }
      ],
      space_description: 'Our crown jewel, this beautifully restored barn features soaring ceilings, original timber beams, and modern amenities seamlessly integrated into its historic charm.',
      space_features: [
        { _uid: 'feat-1', component: 'feature' as const, feature_title: 'Capacity', feature_blurb: 'Up to 300 guests' },
        { _uid: 'feat-2', component: 'feature' as const, feature_title: 'Built', feature_blurb: '1920s architecture' },
        { _uid: 'feat-3', component: 'feature' as const, feature_title: 'Features', feature_blurb: 'Climate controlled' },
        { _uid: 'feat-4', component: 'feature' as const, feature_title: 'Style', feature_blurb: 'Rustic elegance' }
      ]
    },
    {
      _uid: 'default-bridal',
      component: 'space' as const,
      space_name: 'Bridal Suite',
      space_photos: [
        { filename: '/images/real-weddings/emily-and-barron-nixon/photos/020.jpg', alt: 'Bridal Suite' },
        { filename: '/images/real-weddings/mattea-courtney-photo-gallery/photos/015.jpg', alt: 'Bridal prep area' }
      ],
      space_description: 'A luxurious private space for the bride and bridal party to prepare for the big day.',
      space_features: [
        { _uid: 'feat-5', component: 'feature' as const, feature_title: 'Capacity', feature_blurb: 'Up to 8 people' },
        { _uid: 'feat-6', component: 'feature' as const, feature_title: 'Amenities', feature_blurb: 'Full mirror, seating' },
        { _uid: 'feat-7', component: 'feature' as const, feature_title: 'Natural Light', feature_blurb: 'Large windows' },
        { _uid: 'feat-8', component: 'feature' as const, feature_title: 'Privacy', feature_blurb: 'Separate entrance' }
      ]
    },
    {
      _uid: 'default-groom',
      component: 'space' as const,
      space_name: "Groom's Quarters",
      space_photos: [
        { filename: '/images/real-weddings/joshua-and-teri/photos/008.jpg', alt: "Groom's Quarters" },
        { filename: '/images/real-weddings/anthony-and-linnea/photos/025.jpg', alt: 'Groom prep area' }
      ],
      space_description: 'A comfortable retreat for the groom and groomsmen.',
      space_features: [
        { _uid: 'feat-9', component: 'feature' as const, feature_title: 'Capacity', feature_blurb: 'Up to 6 people' },
        { _uid: 'feat-10', component: 'feature' as const, feature_title: 'Atmosphere', feature_blurb: 'Relaxed and private' },
        { _uid: 'feat-11', component: 'feature' as const, feature_title: 'Amenities', feature_blurb: 'Comfortable seating' },
        { _uid: 'feat-12', component: 'feature' as const, feature_title: 'Access', feature_blurb: 'Separate entrance' }
      ]
    },
    {
      _uid: 'default-pavilion',
      component: 'space' as const,
      space_name: 'Garden Pavilion',
      space_photos: [
        { filename: '/images/real-weddings/loria-and-jason-rolstad-agape/photos/010.jpg', alt: 'Garden Pavilion' },
        { filename: '/images/real-weddings/kyle-carrie/photos/040.jpg', alt: 'Pavilion ceremony' }
      ],
      space_description: 'An enchanting outdoor space perfect for ceremonies or cocktail hours.',
      space_features: [
        { _uid: 'feat-13', component: 'feature' as const, feature_title: 'Setting', feature_blurb: 'Outdoor garden' },
        { _uid: 'feat-14', component: 'feature' as const, feature_title: 'Use', feature_blurb: 'Ceremonies, cocktails' },
        { _uid: 'feat-15', component: 'feature' as const, feature_title: 'Atmosphere', feature_blurb: 'Natural beauty' },
        { _uid: 'feat-16', component: 'feature' as const, feature_title: 'Capacity', feature_blurb: 'Up to 200 guests' }
      ]
    }
  ]

  const spacesData = defaultSpaces

  const getSpaceImages = (space: Space) => {
    if (!space || !space.space_photos) {
      return ['/images/barn-exterior-full-deck-view-evening.jpg'] // Safe fallback
    }
    
    if (Array.isArray(space.space_photos)) {
      if (space.space_photos.length > 0 && typeof space.space_photos[0] === 'object' && 'filename' in space.space_photos[0]) {
        return space.space_photos.map(img => img.filename || '')
      }
    }
    
    return ['/images/barn-exterior-full-deck-view-evening.jpg']
  }

  const title = 'Discover Our Spaces'
  const subtitle = 'Your Perfect Setting'
  const description = 'Every corner tells a story, every space creates memories'
  
  const backgroundVariant = 'tint-rose'
  const themeOverride = 'auto'
  const paddingSize = 'lg'

  const handleSpaceChange = (spaceIndex: number) => {
    setActiveSpaceIndex(spaceIndex)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    const currentSpace = spacesData[activeSpaceIndex]
    const images = getSpaceImages(currentSpace)
    setCurrentImageIndex((prev) =>
      (prev + 1) % images.length
    )
  }

  const prevImage = () => {
    const currentSpace = spacesData[activeSpaceIndex]
    const images = getSpaceImages(currentSpace)
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  return (
    <SectionShell
      header={{
        scriptAccent: subtitle,
        title: title,
        lead: description
      }}
      background={backgroundVariant}
      tone={themeOverride}
      paddingY={paddingSize}
      spacing="content-flow"
      divider="none"
      container="wide"
      data-discover="true"
      data-section="spaces"
    >
      <div className={styles.venueTabs}>
        {spacesData.map((space, index) => (
          <button
            key={space._uid}
            className={`${styles.venueTab} ${activeSpaceIndex === index ? styles.active : ''}`}
            onClick={() => handleSpaceChange(index)}
          >
            {space.space_name}
          </button>
        ))}
      </div>

      <div className={`${styles.spacesContent} ${styles.layoutClassic}`}>
          <div className={styles.venueMainImage}>
            {(() => {
              const currentSpace = spacesData[activeSpaceIndex]
              const images = getSpaceImages(currentSpace)
              const safeImageIndex = Math.min(currentImageIndex, (images?.length || 1) - 1)
              const imageSrc = images?.[safeImageIndex] || '/images/barn-exterior-full-deck-view-evening.jpg'
              
              return (
                <Image
                  src={imageSrc}
                  alt={currentSpace?.space_name || 'Space image'}
                  width={1200}
                  height={800}
                  className={styles.venueMainImageImg}
                  priority
                />
              )
            })()}
            <button className={`${styles.carouselArrow} ${styles.prev}`} onClick={prevImage}>←</button>
            <button className={`${styles.carouselArrow} ${styles.next}`} onClick={nextImage}>→</button>
          </div>

          <div className={styles.venueDetails}>
            {(() => {
              const currentSpace = spacesData[activeSpaceIndex]
              if (!currentSpace) return <div>Loading space details...</div>
              
              return (
                <>
                  <Typography as="h3" variant="h2">{currentSpace.space_name}</Typography>
                  <Text>{currentSpace.space_description}</Text>
                  <div className={styles.venueFeatures}>
                    {(currentSpace.space_features || []).map((feature) => (
                      <div key={feature._uid} className={styles.venueFeature}>
                        <Typography as="h5" variant="h3">{feature.feature_title}</Typography>
                        <Text size="sm">{feature.feature_blurb}</Text>
                      </div>
                    ))}
                  </div>
                </>
              )
            })()}
          </div>
        </div>
    </SectionShell>
  )
}