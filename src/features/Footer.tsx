'use client'
import React from 'react'
import { storyblokEditable } from '@storyblok/react'
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import styles from './Footer.module.css'

interface FooterBlok {
  _uid?: string
  component?: string
  brand_title?: string
  brand_description?: string
  address?: string
  phone?: string
  email?: string
  facebook_url?: string
  instagram_url?: string
  [key: string]: any
}

export default function Footer({ blok }: { blok?: FooterBlok }) {
  const currentYear = new Date().getFullYear()

  // Default values for clean implementation
  const brandTitle = blok?.brand_title || 'Rum River Wedding Barn'
  const brandDescription = blok?.brand_description || "Where dreams come to life along Minnesota's scenic Rum River. Historic charm meets modern elegance for your perfect celebration."
  const address = blok?.address || '42618 78th Street, Hillman, MN 56338'
  const phone = blok?.phone
  const email = blok?.email
  const facebookUrl = blok?.facebook_url
  const instagramUrl = blok?.instagram_url

  return (
    <footer
      className={styles.footer}
      data-section="footer"
      {...(blok ? storyblokEditable(blok) : {})}
    >
      <SectionWrapper
        as="div"
        paddingY="lg"
        maxWidth="standard"
        background="transparent"
        theme="inherit"
        blok={blok}
      >
        <div className={styles.content}>
          {/* Column 1: Brand & Description */}
          <div className={styles.section}>
            <h3 className={styles.title}>{brandTitle}</h3>
            <p className={styles.description}>{brandDescription}</p>
          </div>

          {/* Column 2: Contact Information */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contact Information</h4>
            <div className={styles.contact}>
              <p className={styles.address}>
                <MapPin className={styles.socialIcon} size={18} />
                {address}
              </p>
              {phone && (
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className={styles.phoneLink}>
                  <Phone className={styles.socialIcon} size={18} />
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className={styles.phoneLink}>
                  <Mail className={styles.socialIcon} size={18} />
                  {email}
                </a>
              )}
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Connect With Us</h4>
            <div className={styles.socialLinks}>
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className={styles.socialIcon} size={20} />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className={styles.socialIcon} size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom with Centered Copyright */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy; {currentYear} {brandTitle}. All rights reserved.
          </div>
        </div>
      </SectionWrapper>
    </footer>
  )
}
