'use client'
import { Check, Calendar, Star } from 'lucide-react'
import SectionShell from '@/components/ui/SectionShell'
import styles from './Pricing.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

interface PricingTier {
  name?: string
  label?: string
  price?: string
  weekday_price?: string
  is_popular?: boolean
  features?: string[]
  cta_url?: string
  tour_url?: string
  _uid?: string
}

export default function Pricing() {
  const defaultTiers: PricingTier[] = [
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

  const tiers = defaultTiers

  return (
    <SectionShell
      id="packages"
      paddingY="lg"
      spacing="footer-approach"
      container="content"
      background="surface"
      tone="auto"
      className={styles.pricingSection}
      data-section="pricing"
      header={{
        scriptAccent: 'Investment in Forever',
        title: 'Wedding Packages & Pricing',
        lead: 'Transparent pricing with no hidden fees. Every package includes tables, chairs, setup, teardown, and on-site coordination.',
        align: 'center'
      }}
    >
      <div className={styles.contentWrapper}>
        <Text size="lg" align="center" className={styles.heroPricingLine}>
          {'Saturdays from $6,200 • Fridays/Sundays from $5,500 • Weekdays from $4,500'}
        </Text>

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
                  <Text as="span" size="sm" weight="semibold">{tier.label}</Text>
                </div>
              )}

              <header className={styles.pricingHeader}>
                <Typography as="h3" variant="h3" className={styles.packageName}>{tier.name}</Typography>
                <div className={styles.pricingDisplay} aria-describedby={`price-desc-${index}`}>
                  <div className={styles.weekendPrice} role="text">
                    <Typography as="span" variant="h2" className={styles.amount}>{tier.price}</Typography>
                    <Text as="span" size="sm" className={styles.priceLabel}>Fri–Sun</Text>
                  </div>
                  <div className={styles.weekdayPrice} role="text">
                    <Typography as="span" variant="h3" className={styles.amount}>{tier.weekday_price}</Typography>
                    <Text as="span" size="sm" className={styles.label}>Weekdays</Text>
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
                    <Text as="span" size="sm">{feature}</Text>
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
                  <Text as="span" weight="semibold">Check Your Date</Text>
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
    </SectionShell>
  )
}
