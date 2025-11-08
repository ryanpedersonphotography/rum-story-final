'use client'
import { storyblokEditable } from '@storyblok/react'
import type { SbBlokData } from '@storyblok/react'
import { Check, Calendar, Star } from 'lucide-react'
import styles from './Pricing.module.css'

interface PricingTierStoryblok extends SbBlokData {
  name?: string
  label?: string
  price?: string
  weekday_price?: string
  is_popular?: boolean
  features?: string[]
  cta_url?: string
  tour_url?: string
}

interface PricingStoryblok extends SbBlokData {
  script_accent?: string
  title?: string
  hero_line?: string
  description?: string
  tiers?: PricingTierStoryblok[]
}

export default function Pricing({ blok }: { blok: PricingStoryblok }) {
  const defaultTiers: PricingTierStoryblok[] = [
    {
      name: 'Essentials',
      label: 'Perfect Start',
      price: '$4,500',
      weekday_price: '$3,800',
      is_popular: false,
      features: [
        'Venue rental for 8 hours',
        'Tables, chairs & linens included',
        'Setup & breakdown service',
        'On-site coordination',
        'Bridal suite access',
        'Sound system & microphones',
        'Basic lighting package'
      ],
      cta_url: '#schedule',
      tour_url: '#contact'
    },
    {
      name: 'Celebration',
      label: 'Most Popular',
      price: '$6,200',
      weekday_price: '$5,500',
      is_popular: true,
      features: [
        'Everything in Essentials',
        'Extended 10-hour venue rental',
        'Upgraded lighting & ambiance',
        "Groom's quarters access",
        'Complimentary rehearsal',
        'Premium bar setup included',
        'Vendor coordination service',
        'Late-night snack station'
      ],
      cta_url: '#schedule',
      tour_url: '#contact'
    },
    {
      name: 'Luxe Experience',
      label: 'Ultimate Celebration',
      price: '$8,800',
      weekday_price: '$7,900',
      is_popular: false,
      features: [
        'Everything in Celebration',
        'Full weekend access',
        'Garden pavilion ceremony',
        'Professional photography areas',
        'Premium floral arrangements',
        'Champagne welcome service',
        'Dedicated day-of planner',
        'Transportation coordination'
      ],
      cta_url: '#schedule',
      tour_url: '#contact'
    }
  ]

  const tiers = blok?.tiers?.length ? blok.tiers : defaultTiers

  return (
    <section
      id="packages"
      className={styles.pricingSection}
      data-section="pricing"
      {...storyblokEditable(blok)}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.scriptAccent}>
            {blok?.script_accent || 'Investment in Forever'}
          </div>
          <h2 className={styles.sectionTitle}>
            {blok?.title || 'Wedding Packages & Pricing'}
          </h2>
          <div className={styles.heroPricingLine}>
            {blok?.hero_line || 'Saturdays from $6,200 • Fridays/Sundays from $5,500 • Weekdays from $4,500'}
          </div>
          <p className={styles.lead}>
            {blok?.description || 'Transparent pricing with no hidden fees. Every package includes tables, chairs, setup, teardown, and on-site coordination.'}
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {tiers.map((tier, index) => (
            <article
              key={tier._uid || index}
              className={`${styles.pricingCard} ${tier.is_popular ? styles.popular : ''}`}
              aria-label={`${tier.name} package`}
            >
              {tier.is_popular && (
                <div className={styles.popularBadge} aria-label="Most popular">
                  <Star size={14} aria-hidden="true" />
                  <span className={styles.srOnly}>Most Popular: </span>{tier.label}
                </div>
              )}

              <header className={styles.pricingHeader}>
                <h3 className={styles.packageName}>{tier.name}</h3>
                <div className={styles.pricingDisplay} aria-describedby={`price-desc-${index}`}>
                  <div className={styles.weekendPrice} role="text">
                    <span className={styles.amount}>{tier.price}</span>
                    <span className={styles.priceLabel}>Fri–Sun</span>
                  </div>
                  <div className={styles.weekdayPrice} role="text">
                    <span className={styles.amount}>{tier.weekday_price}</span>
                    <span className={styles.label}>Weekdays</span>
                  </div>
                </div>
                <p id={`price-desc-${index}`} className={styles.srOnly}>
                  Weekend price listed for Friday through Sunday; weekday price listed for Monday through Thursday.
                </p>
              </header>

              <ul className={styles.featuresList}>
                {(tier.features || []).map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.featureItem}>
                    <Check size={16} className={styles.checkIcon} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.pricingActions}>
                <a
                  href={tier.cta_url || '#schedule'}
                  className={`${styles.ctaButton} ${tier.is_popular ? styles.primary : styles.secondary}`}
                  data-testid="pricing-cta"
                >
                  <Calendar size={16} aria-hidden="true" />
                  <span>Check Your Date</span>
                </a>
                <a
                  href={tier.tour_url || '#contact'}
                  className={styles.linkButton}
                  data-testid="pricing-tour"
                >
                  Book a Tour
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
