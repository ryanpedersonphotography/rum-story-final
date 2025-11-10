'use client'

import { useEffect, useMemo, useState } from 'react'
import { storyblokEditable } from '@storyblok/react'
import { renderRichText } from '@storyblok/js'
import SectionWrapper from '@/components/ui/SectionWrapper'
import styles from './FAQ.module.css'

type Blok = Record<string, any>

const FALLBACK_ITEMS = [
  { _uid: '1', question: 'Can we bring our own vendors?', answer: 'Absolutely! Bring any caterer, photographer, florist, DJ, and more.' },
  { _uid: '2', question: `What's included with the venue?`, answer: 'Exclusive use of the barn, suites, ceremony sites, tables/chairs for 200, parking, setup time, and day-of assistance.' },
  { _uid: '3', question: 'Indoor & outdoor options?', answer: 'Yes—multiple ceremony sites, including garden pavilion, riverside clearing, and the barn.' },
  { _uid: '4', question: 'Lodging nearby?', answer: 'Partner hotels and B&Bs with group rates; we can provide a recommended list.' },
]

function toHTML(value: any): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  try {
    return renderRichText(value)
  } catch {
    try {
      return JSON.stringify(value)
    } catch {
      return ''
    }
  }
}

function firstArray(blok: Blok, keys: string[]): any[] | null {
  for (const k of keys) {
    const v = blok?.[k]
    if (Array.isArray(v) && v.length) return v
  }
  for (const k of keys) {
    if (Array.isArray(blok?.[k])) return []
  }
  return null
}

export default function FAQ({ blok }: { blok: Blok }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const rawList =
    firstArray(blok, ['faq_items', 'items', 'faqs', 'faq', 'accordion_items']) ??
    FALLBACK_ITEMS

  const items = useMemo(() => {
    return (rawList.length ? rawList : FALLBACK_ITEMS).map((it: any, i: number) => {
      const uid = it?._uid ?? String(i)
      const question =
        it?.question ?? it?.title ?? it?.heading ?? it?.label ?? 'Untitled question'

      const rawAnswer =
        it?.answer ??
        it?.rich_text ??
        it?.body ??
        it?.text ??
        it?.copy ??
        it?.description ??
        ''

      let answerHTML = toHTML(rawAnswer)

      if (!answerHTML || /^\s*$/.test(answerHTML)) {
        const fb = FALLBACK_ITEMS[i % FALLBACK_ITEMS.length]
        answerHTML = toHTML(fb.answer)
      }

      return { uid, question: String(question), answerHTML }
    })
  }, [rawList])

  useEffect(() => {
    if (items[0]) setOpen((s) => ({ ...s, [items[0].uid]: true }))
  }, [items])

  const title = blok?.title || 'Frequently Asked Questions'
  const subtitle = blok?.subtitle || 'Everything You Need to Know'
  const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }))

  return (
    <SectionWrapper
      paddingY="lg"
      spacing="content-flow"
      maxWidth="standard"
      background="surface-1"
      theme="inherit"
      className={styles.faqAccordion}
      data-section="faq"
      header={{
        scriptAccent: subtitle,
        title: title,
        align: 'center'
      }}
      blok={blok}
      {...storyblokEditable(blok)}
    >
      <div
        className={styles.faqContent}
        aria-label="Frequently asked questions list"
        style={{ scrollMarginTop: '80px' }}
      >
        <div className={styles.faqList}>
          {items.map((it) => {
            const isOpen = !!open[it.uid]
            return (
              <div key={it.uid} className={`${styles.item} ${isOpen ? styles.isOpen : ''}`}>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => toggle(it.uid)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${it.uid}`}
                >
                  <h3>{it.question}</h3>
                  <span className={styles.toggle} aria-hidden>↓</span>
                </button>

                <div
                  id={`answer-${it.uid}`}
                  className={styles.answer}
                  role="region"
                  aria-live="polite"
                >
                  <div className={styles.answerBody} dangerouslySetInnerHTML={{ __html: it.answerHTML }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}