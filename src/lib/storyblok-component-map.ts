// src/lib/storyblok-component-map.ts

// This file serves as the single source of truth for Storyblok component mappings.

// --- Base and Legacy Components
import Page from '@/components/storyblok/Page'
import { TestimonialItem } from '@/components/storyblok/TestimonialsEditor'
import HistoryCarouselEditor from '@/components/storyblok/HistoryCarouselEditor'
import { LocationItem } from '@/components/storyblok/MapSectionEditor'
import RealWeddingEditor from '@/components/storyblok/RealWeddingEditor'
import FeaturedWeddingsEditor from '@/components/storyblok/FeaturedWeddingsEditor'

// --- Clean Components
import FAQ from '@/features/FAQ'
import Hero from '@/features/Hero'
import Footer from '@/features/Footer'
import AlternatingBlocks from '@/features/AlternatingBlocks'
import Experience from '@/features/Experience'
import BrandProof from '@/features/BrandProof'
import Pricing from '@/features/Pricing'
import Gallery from '@/features/Gallery'
import Spaces from '@/features/Spaces'
import ScheduleForm from '@/features/ScheduleForm'
import Map from '@/features/Map'

// --- Editor Components (for legacy routes/editor)
import HeroEditor from '@/components/storyblok/HeroEditor'
import AlternatingBlocksEditor from '@/components/storyblok/AlternatingBlocksEditor'
import RumRiverExperienceEditor from '@/components/storyblok/RumRiverExperienceEditor'
import LoveStoriesGalleryEditor from '@/components/storyblok/LoveStoriesGalleryEditor'
import BrandSocialProofEditor from '@/components/storyblok/BrandSocialProofEditor'
import TestimonialsEditor from '@/components/storyblok/TestimonialsEditor'
import ScheduleFormEditor from '@/components/storyblok/ScheduleFormEditor'
import MapSectionEditor from '@/components/storyblok/MapSectionEditor'
import FAQAccordionEditor from '@/components/storyblok/FAQAccordionEditor'
import PricingEditor from '@/components/storyblok/PricingEditor'
import FooterEditor from '@/components/storyblok/FooterEditor'
import SpacesEditor from '@/components/storyblok/SpacesEditor'


/**
 * The primary component map using "clean" components.
 * This is used for the main public-facing routes.
 */
export const cleanComponentMap = {
  // base
  page: Page,

  // sections used by "home" story (now using clean components)
  home_hero_section: Hero,
  alternating_blocks_section: AlternatingBlocks,
  rum_river_experience: Experience,
  love_stories_gallery: Gallery,
  brand_social_proof: BrandProof,
  testimonials_section: () => null, // Hidden - not rendering testimonials
  testimonial_item: TestimonialItem, // Still used by TestimonialsEditor
  history_carousel: HistoryCarouselEditor, // Not migrated yet
  history_slide: HistoryCarouselEditor, // Not migrated yet
  schedule_form: ScheduleForm,
  map_section: Map,
  location_item: LocationItem, // Still used by Map

  // override FAQ to your clean component
  faq_accordion: FAQ,

  pricing_section: Pricing,
  footer_section: Footer,
  real_wedding: RealWeddingEditor, // Not migrated yet
  featured_weddings_section: FeaturedWeddingsEditor, // Not migrated yet
  spaces_section: Spaces,
}

/**
 * The legacy component map using "editor" components.
 * This is used for the Storyblok visual editor on non-main routes.
 */
export const editorComponentMap = {
    page: Page,
    home_hero_section: HeroEditor,
    alternating_blocks_section: AlternatingBlocksEditor,
    rum_river_experience: RumRiverExperienceEditor,
    love_stories_gallery: LoveStoriesGalleryEditor,
    brand_social_proof: BrandSocialProofEditor,
    testimonials_section: TestimonialsEditor,
    testimonial_item: TestimonialItem,
    history_carousel: HistoryCarouselEditor,
    history_slide: HistoryCarouselEditor,
    schedule_form: ScheduleFormEditor,
    map_section: MapSectionEditor,
    location_item: LocationItem,
    faq_accordion: FAQ,
    pricing_section: PricingEditor,
    footer_section: FooterEditor,
    real_wedding: RealWeddingEditor,
    featured_weddings_section: FeaturedWeddingsEditor,
    spaces_section: SpacesEditor,
}
