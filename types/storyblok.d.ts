declare module '@storyblok/react' {
  export type SbBlokData = Record<string, unknown>;
  export type ISbStoryData = Record<string, unknown>;
  export function storyblokEditable(input: unknown): Record<string, unknown>;
  export function storyblokInit(config: unknown): void;
  export function apiPlugin(): unknown;
  export function StoryblokComponent(props: { blok: unknown }): JSX.Element | null;
}

declare module '@storyblok/react/rsc' {
  export type SbBlokData = Record<string, unknown>;
  export type ISbStoryData = Record<string, unknown>;
  export function storyblokEditable(input: unknown): Record<string, unknown>;
  export function storyblokInit(config: unknown): void;
  export function apiPlugin(): unknown;
  export function StoryblokComponent(props: { blok: unknown }): JSX.Element | null;
}

// Storyblok API Response Types
export interface StoryblokStory {
  id: number
  uuid: string
  name: string
  slug: string
  full_slug: string
  created_at: string
  published_at: string | null
  content: Record<string, any>
  is_startpage: boolean
  parent_id: number | null
  group_id: string
  position: number
  tag_list: string[]
  alternates: Array<{
    id: number
    name: string
    slug: string
    published: boolean
    full_slug: string
    is_folder: boolean
    parent_id: number | null
  }>
}

export interface StoryblokApiResponse {
  story: StoryblokStory
  cv?: number
  rels?: any[]
  links?: any[]
}

export interface StoryblokErrorResponse {
  error?: string
  message?: string
  status?: number
}
