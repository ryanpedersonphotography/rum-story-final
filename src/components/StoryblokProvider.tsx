'use client'

import { storyblokInit } from '@storyblok/react'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getStoryblokApi } from '@/lib/storyblok'
import { cleanComponentMap, editorComponentMap } from '@/lib/storyblok-component-map'

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const initialized = useRef(false)

  // CRITICAL: Use clean components on main route (/) to prevent conflicts
  const isMainRoute = pathname === '/'
  
  if (!initialized.current) {
    if (isMainRoute) {
      // Main route: Use CLEAN components to match CleanStoryRenderer
      storyblokInit({
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || '',
        components: cleanComponentMap,
      })
    } else {
      // Other routes: Use editor components
      storyblokInit({
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || '',
        components: editorComponentMap,
      })
    }
    initialized.current = true
  }

  // Keep your existing API touch if you need it
  try { getStoryblokApi() } catch {}

  return children
}