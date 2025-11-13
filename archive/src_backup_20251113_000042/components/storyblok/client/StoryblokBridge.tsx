'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StoryblokComponent, loadStoryblokBridge, storyblokInit } from '@storyblok/react'
import { editorComponentMap } from '@/lib/storyblok-component-map'
import Navbar from '@/features/Navbar'

// Initialize Storyblok for client-side rendering
// Use PREVIEW token for draft content in Visual Editor
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN || '',
  components: editorComponentMap,
})

interface StoryblokBridgeProps {
  initialStory: any
}

export default function StoryblokBridge({ initialStory }: StoryblokBridgeProps) {
  const [story, setStory] = useState(initialStory)
  const router = useRouter()

  useEffect(() => {
    // Always load the bridge script; it's a no-op outside Visual Editor
    loadStoryblokBridge().then(() => {
      const connect = () => {
        // @ts-ignore
        const SB = (typeof window !== 'undefined') && window.StoryblokBridge
        if (!SB) return setTimeout(connect, 100)

        // @ts-ignore
        const bridge = new window.StoryblokBridge()

        bridge.on(['input', 'change', 'published'], (ev: any) => {
          if (ev?.story) {
            setStory(ev.story)  // instant client update
          }
          router.refresh()      // keep RSC data in sync
        })
      }
      connect()
    })
  }, [router])

  return (
    <>
      <Navbar />
      <div>
        {story?.content && <StoryblokComponent blok={story.content} />}
      </div>
    </>
  )
}
