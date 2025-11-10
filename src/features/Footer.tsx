'use client'
import React from 'react'
import { storyblokEditable } from '@storyblok/react'
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'
import SectionShell from '@/components/ui/SectionShell'
import styles from './Footer.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

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
      <SectionShell
        as="div"
        paddingY="lg"
        container="content"
        background="transparent"
        tone="auto"
        blok={blok}
      >
        <div className={styles.content}>
          {/* Column 1: Brand & Description */}
          <div className={styles.section}>
            <Typography as="h3" variant="h3" className={styles.title}>{brandTitle}</Typography>
            <Text size="sm" className={styles.description}>{brandDescription}</Text>
          </div>

          {/* Column 2: Contact Information */}
          <div className={styles.section}>
            <Typography as="h4" variant="h4" className={styles.sectionTitle}>Contact Information</Typography>
            <div className={styles.contact}>
              <Text size="sm" className={styles.address}>
                <MapPin className={styles.socialIcon} size={18} />
                {address}
              </Text>
              {phone && (
                <Text as="a" size="sm" href={`tel:${phone.replace(/[^0-9]/g, '')}`} className={styles.phoneLink}>
                  <Phone className={styles.socialIcon} size={18} />
                  {phone}
                </Text>
              )}
              {email && (
                <Text as="a" size="sm" href={`mailto:${email}`} className={styles.phoneLink}>
                  <Mail className={styles.socialIcon} size={18} />
                  {email}
                </Text>
              )}
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className={styles.section}>
            <Typography as="h4" variant="h4" className={styles.sectionTitle}>Connect With Us</Typography>
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
          <Text size="sm" className={styles.copyright}>
            &copy; {currentYear} {brandTitle}. All rights reserved.
          </Text>
        </div>
      </SectionShell>
    </footer>
  )
}
