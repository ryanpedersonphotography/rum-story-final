// src/lib/clean-storyblok.ts
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import { cleanComponentMap } from './storyblok-component-map'


let _inited = false

export function initCleanStoryblok() {
  if (_inited) return

  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || '',
    use: [apiPlugin],

    // Gracefully render unknown components instead of erroring
    enableFallbackComponent: true,

    components: cleanComponentMap,
  })

  _inited = true
}

// Also export default (some imports use default)
export default initCleanStoryblok