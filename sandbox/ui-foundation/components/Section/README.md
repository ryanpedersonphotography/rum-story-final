# Section

A foundational layout component with configurable layers, widths, alignment, elevation, and advanced placement options.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layer` | `'base' \| 'partial' \| 'isolated'` | `'base'` | Background layer style |
| `width` | `'prose' \| 'content' \| 'wide' \| 'full'` | `'content'` | Content container width |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Content alignment |
| `elevation` | `0 \| 1 \| 2 \| 3` | `0` | Shadow elevation level |
| `as` | `keyof JSX.IntrinsicElements` | `'section'` | HTML element to render |
| `children` | `ReactNode` | - | Content to render |

## Advanced Options

| Prop | Type | Description |
|------|------|-------------|
| `data-rail-offset` | `'true' \| 'false'` | Offset section top for fixed glass rail |
| `data-overlap` | `'top' \| 'bottom'` | Magazine-style section overlaps |
| `data-float` | `'true' \| 'false'` | Float section above base layer (z-index) |
| `data-header-placement` | `'outside' \| 'inside'` | Position header outside or inside section |

## Usage

```tsx
import { Section } from '@/components/Section'

// Basic usage
<Section layer="isolated" width="prose" elevation={2}>
  <h2>Section Content</h2>
  <p>Your content here</p>
</Section>

// Hero with rail offset
<Section layer="base" width="full" data-rail-offset="true" data-float="true">
  <Hero />
</Section>

// Magazine-style with outside header
<Section layer="partial" width="content" data-header-placement="outside" data-overlap="top">
  <h2>Feature Title</h2>
  <p>Content with header sitting outside the section background</p>
</Section>
```

## Features

- **Layers**: Control background styles from transparent to isolated
- **Width System**: Responsive max-width containers from prose to full-width
- **Elevation**: Consistent shadow system with mobile attenuation
- **Advanced Layout**: Rail offset, overlaps, float positioning
- **Header Placement**: Magazine-style headers that sit outside backgrounds
- **Mobile-First**: Responsive design with touch-optimized spacing