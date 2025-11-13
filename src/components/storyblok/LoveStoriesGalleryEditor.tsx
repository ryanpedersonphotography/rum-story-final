'use client'

import Image from 'next/image'
import React, { useState } from 'react'

interface LoveStoriesGalleryEditorProps {
  blok: any
}

export default function LoveStoriesGalleryEditor({ blok }: LoveStoriesGalleryEditorProps) {
  return (
      <section id="gallery" className="hotfix-love-stories-gallery" data-section="gallery">
        <div className="hotfix-love-stories-content">
        <div className="hotfix-love-stories-header">
          <div className="hotfix-script-accent">
            {blok.script_accent || 'Real Love Stories'}
          </div>
          <h2 className="hotfix-love-section-title">
            {blok.title || 'Weddings at the Barn'}
          </h2>
          <p className="hotfix-love-lead">
            {blok.description || 'Every celebration tells a unique story of love, laughter, and happily ever after.'}
          </p>
        </div>

        <div className="hotfix-wedding-gallery">
          {(blok.galleries || []).map((gallery: any, index: number) => {
            let imageUrl = '/wedding-photos/placeholder.jpg'

            if (gallery.card_cover_image) {
              imageUrl = typeof gallery.card_cover_image === 'string'
                ? gallery.card_cover_image
                : gallery.card_cover_image?.filename || imageUrl
            } else if (gallery.image) {
              imageUrl = typeof gallery.image === 'string'
                ? gallery.image
                : gallery.image?.filename || imageUrl
            }

            const cardTitle = gallery.card_title || gallery.couple_names || 'Couple Names'
            const cardSubtitle = gallery.card_subtitle || gallery.season || 'Summer 2024'
            const cardLocation = gallery.card_location || gallery.venue || 'Rum River Barn'
            const photoCount = gallery.photo_count || 0

            return (
              <div
                key={gallery._uid || index}
                className="hotfix-gallery-item"
                role="button"
                tabIndex={0}
                data-discover="true"
              >
                <Image
                  src={imageUrl}
                  alt={`${cardTitle} at ${cardLocation}`}
                  width={800}
                  height={800}
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 90vw"
                  loading="lazy"
                />
                <div className="hotfix-gallery-overlay">
                  <div className="hotfix-gallery-couple-names">
                    {cardTitle}
                  </div>
                  <div className="hotfix-gallery-season">
                    {cardSubtitle}
                  </div>
                  <div className="hotfix-gallery-details">
                    {`${photoCount} Photos • View Gallery →`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
