// src/app/page.tsx
import CleanStoryRenderer from '@/components/clean/CleanStoryRenderer'
import GlassToolbar from '@/components/dev/GlassToolbar'
import { validateStoryblokEnv, fetchWithRetry } from '@/lib/fetch-utils'
import type { StoryblokApiResponse, StoryblokStory } from '@/types/storyblok'

export const dynamic = 'force-dynamic'

/**
 * Fetches a story from Storyblok with retry logic and proper error handling
 * @param slug - The story slug to fetch
 * @returns The story data
 * @throws Error if the fetch fails after retries
 */
async function fetchStory(slug: string): Promise<StoryblokStory> {
  // Validate environment variables first
  const token = validateStoryblokEnv()

  // Determine version based on environment
  const version = process.env.NODE_ENV === 'production' ? 'published' : 'draft'

  // Build URL - only use cache busting (cv) in development for draft content
  const params = new URLSearchParams({
    version,
    token,
  })

  // Only add cache busting for draft content to enable live editing
  if (version === 'draft') {
    params.append('cv', Date.now().toString())
  }

  const url = `https://api.storyblok.com/v2/cdn/stories/${slug}?${params.toString()}`

  try {
    // Use retry logic for better resilience
    // Note: Next.js extends RequestInit with 'next' property for caching
    const data = await fetchWithRetry<StoryblokApiResponse>(url, {
      // Use Next.js cache control
      cache: version === 'draft' ? 'no-store' : 'force-cache',
      next: {
        // Revalidate published content every 5 minutes
        revalidate: version === 'published' ? 300 : undefined,
        tags: [`story-${slug}`],
      },
    } as RequestInit)

    if (!data.story) {
      throw new Error(`Story not found: ${slug}`)
    }

    return data.story
  } catch (error) {
    // Enhanced error logging
    console.error(`[fetchStory] Failed to fetch story "${slug}":`, error)

    // Re-throw with context for better debugging
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to fetch Storyblok story "${slug}": ${message}`)
  }
}

export default async function HomePage() {
  const story = await fetchStory('home')

  return (
    <div className="glass-toolbar-layout">
      <GlassToolbar />
      <main className="glass-toolbar-layout__content">
        <CleanStoryRenderer story={story} />
      </main>
    </div>
  )
}