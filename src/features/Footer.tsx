'use client'
import React from 'react'
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'
import SectionShell from '@/components/ui/SectionShell'
import styles from './Footer.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Default values for clean implementation
  const brandTitle = 'Rum River Wedding Barn'
  const brandDescription = "Where dreams come to life along Minnesota's scenic Rum River. Historic charm meets modern elegance for your perfect celebration."
  const address = '42618 78th Street, Hillman, MN 56338'
  const phone = '320-123-4567'
  const email = 'info@rumriverbarn.com'
  const facebookUrl = 'https://www.facebook.com/rumriverbarn'
  const instagramUrl = 'https://www.instagram.com/rumriverbarn'

  return (
    <footer
      className={styles.footer}
      data-section="footer"
    >
      <SectionShell
        as="div"
        paddingY="lg"
        container="content"
        background="transparent"
        tone="auto"
      >
        <div className={styles.content}>
          {/* Column 1: Brand & Description */}
          <div className={styles.section}>
            <Typography as="h3" variant="h3" className={styles.title}>{brandTitle}</Typography>
            <Text size="sm" className={styles.description}>{brandDescription}</Text>
          </div>

          {/* Column 2: Contact Information */}
          <div className={styles.section}>
            <Typography as="h4" variant="h3" className={styles.sectionTitle}>Contact Information</Typography>
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
            <Typography as="h4" variant="h3" className={styles.sectionTitle}>Connect With Us</Typography>
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
