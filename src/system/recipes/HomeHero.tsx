"use client"

import styles from './HomeHero.module.css';

interface HomeHeroProps {
  kicker?: string
  title: string
  lede: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  meta?: string
}

export function HomeHero({
  kicker,
  title,
  lede,
  primaryCtaLabel,
  secondaryCtaLabel,
  meta,
}: HomeHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        {kicker && <p className={styles.kicker}>{kicker}</p>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{lede}</p>
        
        {(primaryCtaLabel || secondaryCtaLabel) && (
          <div className={styles['cta-group']}>
            {primaryCtaLabel && (
              <button className={styles.primaryCta}>{primaryCtaLabel}</button>
            )}
            {secondaryCtaLabel && (
              <button className={styles.secondaryCta}>{secondaryCtaLabel}</button>
            )}
          </div>
        )}

        {meta && <p className={styles.meta}>{meta}</p>}
      </div>
    </div>
  );
}

export default HomeHero;
