# Card

A flexible card component with variant styles, sizes, and interactive options for displaying content in contained layouts.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'filled'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Card padding and spacing |
| `border` | `'none' \| 'subtle' \| 'strong'` | `'subtle'` | Border strength |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | HTML element to render |
| `children` | `ReactNode` | - | Card content |
| `clickable` | `boolean` | `false` | Enable hover/click effects |
| `href` | `string` | - | Makes card a link (renders as anchor) |
| `target` | `string` | - | Link target attribute |

## Layout Options

| Prop | Type | Description |
|------|------|-------------|
| `data-stack` | `'vertical' \| 'horizontal'` | Content stacking direction |
| `data-align` | `'start' \| 'center' \| 'end'` | Content alignment |

## Usage

```tsx
import { Card } from '@/components/Card'

// Basic card
<Card variant="default" size="md">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Clickable card with hover effects
<Card variant="outline" clickable data-align="center">
  <h4>Interactive Card</h4>
  <p>Hover to see the effect</p>
</Card>

// Link card
<Card href="/details" variant="filled" size="lg">
  <h3>Navigate somewhere</h3>
  <p>This entire card is clickable</p>
</Card>

// Horizontal layout card
<Card variant="default" size="md" data-stack="horizontal">
  <img src="avatar.jpg" alt="Profile" />
  <div>
    <h4>John Doe</h4>
    <p>Software Engineer</p>
  </div>
</Card>
```

## Features

- **Variants**: Multiple visual styles from ghost to filled
- **Interactive**: Clickable cards with hover animations
- **Link Support**: Automatic anchor rendering for href prop
- **Layout Control**: Horizontal/vertical stacking with alignment
- **Mobile-First**: Responsive design with mobile optimizations
- **Accessible**: Proper focus states and keyboard navigation