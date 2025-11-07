# Media

A versatile media component supporting images, videos, and embeds with responsive aspect ratios, object fitting, and overlay content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'image' \| 'video' \| 'embed'` | `'image'` | Media type to render |
| `src` | `string` | - | Media source URL (required) |
| `alt` | `string` | `''` | Alt text for images/title for embeds |
| `aspect` | `'16/9' \| '4/3' \| '1/1' \| '3/2' \| 'auto'` | `'16/9'` | Aspect ratio constraint |
| `fit` | `'cover' \| 'contain' \| 'fill'` | `'cover'` | How media fits container |
| `position` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Media positioning |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Loading behavior |

## Video Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `poster` | `string` | - | Video poster image |
| `autoPlay` | `boolean` | `false` | Auto-play video |
| `muted` | `boolean` | `false` | Mute video |
| `loop` | `boolean` | `false` | Loop video |
| `controls` | `boolean` | `false` | Show video controls |

## Advanced Options

| Prop | Type | Description |
|------|------|-------------|
| `sizes` | `string` | Responsive image sizes attribute |
| `srcSet` | `string` | Responsive image source set |
| `overlay` | `ReactNode` | Content to overlay on hover |
| `data-priority` | `'high' \| 'low'` | Loading priority hint |
| `data-blur` | `'true' \| 'false'` | Blur effect with hover reveal |

## Usage

```tsx
import { Media } from '@/components/Media'

// Basic image
<Media 
  src="/hero-image.jpg" 
  alt="Beautiful venue" 
  aspect="16/9" 
/>

// Video with poster
<Media 
  type="video"
  src="/venue-tour.mp4" 
  poster="/video-poster.jpg"
  controls
  muted
/>

// Image with overlay
<Media 
  src="/gallery-1.jpg" 
  alt="Gallery image"
  aspect="1/1"
  overlay={
    <div>
      <h4>Wedding Gallery</h4>
      <p>Click to view full size</p>
    </div>
  }
/>

// Responsive image with priorities
<Media 
  src="/hero.jpg"
  srcSet="/hero-480w.jpg 480w, /hero-800w.jpg 800w, /hero-1200w.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 33vw"
  data-priority="high"
  loading="eager"
/>

// YouTube embed
<Media 
  type="embed"
  src="https://www.youtube.com/embed/VIDEO_ID"
  alt="Venue tour video"
  aspect="16/9"
/>
```

## Features

- **Multi-Type**: Support for images, videos, and iframe embeds
- **Responsive**: Built-in aspect ratios and responsive image support
- **Performance**: Lazy loading and priority hints
- **Interactive**: Hover overlays and blur effects
- **Accessible**: Proper alt text and loading states
- **Optimized**: Shimmer loading animation and mobile adaptations