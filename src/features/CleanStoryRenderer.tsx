// =============================================
// File: src/features/CleanStoryRenderer.tsx
// Client component: initializes Storyblok (non-RSC) and renders the blok tree.
// =============================================
'use client'

import { storyblokInit, apiPlugin, StoryblokComponent } from '@storyblok/react'
import { cleanComponentMap } from '@/lib/storyblok-component-map'
import CleanStoryblokBridge from '@/features/CleanStoryblokBridge'


let inited = false
function ensureInit() {
  if (inited) return
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || '',
    use: [apiPlugin],
    components: cleanComponentMap,
  })
  inited = true
}

export default function CleanStoryRenderer({ story }: { story: any }) {
  ensureInit()

  // Dev mode guardrail: warn if root component isn't mapped
  if (process.env.NODE_ENV !== 'production') {
    const root = story?.content?.component
    const known = new Set(['page', 'home', 'landing_page'])
    if (root && !known.has(root)) {
      console.warn(
        `[Storyblok] ⚠️  Unmapped root component: "${root}". Add it to storyblokInit.components in CleanStoryRenderer.tsx`,
        story.content
      )
    }
  }

  return (
    <>
      <StoryblokComponent blok={story.content} />
      <CleanStoryblokBridge />
    </>
  )
}