'use client'

import Image from 'next/image'
import { SparklesIcon, HeartIcon, CheckBadgeIcon, StarIcon } from '@heroicons/react/24/outline'
import SectionShell from '@/components/ui/SectionShell'
import styles from './Experience.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

interface Feature {
  icon: React.ComponentType<any>
  title: string
  description: string
}

export default function Experience() {
  const defaultFeatures: Feature[] = [
    { icon: SparklesIcon, title: 'Natural Beauty', description: 'Surrounded by pristine woodlands and the scenic Rum River' },
    { icon: SparklesIcon, title: 'Authentic Charm', description: 'Rustic elegance that captures the spirit of Minnesota' },
    { icon: HeartIcon, title: 'Personal Touch', description: 'Dedicated team committed to bringing your vision to life' },
    { icon: CheckBadgeIcon, title: 'Complete Experience', description: 'Everything you need for an unforgettable celebration' }
  ]

  const features: Feature[] = defaultFeatures

  return (
    <SectionShell
      paddingY="xl"
      spacing="content-flow"
      container="content"
      background="surface"
      tone="auto"
      className={styles.experienceSection}
      data-section="experience"
      header={{
        scriptAccent: 'The Rum River Experience',
        title: 'More Than a Venue',
        lead: 'At Rum River Barn, we believe your wedding day should be more than just beautiful—it should be unforgettable. Nestled along the banks of the historic Rum River, our venue offers a unique blend of rustic charm and natural elegance that creates the perfect backdrop for your love story.',
        align: 'center'
      }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>
                  <feature.icon className={styles.iconSvg} />
                </div>
                <div className={styles.featureText}>
                  <Typography as="h3" variant="h3" className={styles.featureTitle}>
                    {feature.title}
                  </Typography>
                  <Text size="sm" className={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.image}>
          <Image
            className={styles.img}
            alt={'Wedding celebration at Rum River Barn'}
            width={960}
            height={640}
            src={'/images/placeholder-barn.jpg'}
          />
        </div>
      </div>
    </SectionShell>
  )
}
