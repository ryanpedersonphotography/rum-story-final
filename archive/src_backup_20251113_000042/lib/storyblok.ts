import { storyblokInit, apiPlugin, getStoryblokApi as getSbApi } from '@storyblok/react/rsc'
import { editorComponentMap } from './storyblok-component-map'

// Initialize Storyblok with component registration
// Use PREVIEW token for draft content access
storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: process.env.STORYBLOK_REGION || 'eu' },
  components: editorComponentMap,
})

// Export API helper
export function getStoryblokApi() {
  return getSbApi()
}

// Fetch story using the SDK with aggressive cache control
export async function fetchStory(slug: string, version: 'draft' | 'published') {
  const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, {
    version,
    // Disable caching for draft content (Visual Editor)
    cv: version === 'draft' ? Date.now() : undefined,
  })
  return data.story
}

// Fetch multiple stories with filtering and sorting
export async function fetchStories(params: any) {
  const { data } = await getStoryblokApi().get('cdn/stories', {
    version: params.version || 'published',
    ...params,
  })
  return data.stories
}
