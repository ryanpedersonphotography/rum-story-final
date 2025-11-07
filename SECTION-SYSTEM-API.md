# Section System API - Single Source of Truth

**Status:** 🎯 **ACTIVE SPECIFICATION** - All implementation must follow this document  
**Version:** 1.0  
**Date:** November 7, 2025

---

## 🎯 Core Principle

**One Section Component. Four Props. Infinite Possibilities.**

```typescript
<Section layer="isolated" width="content" align="center" elevation={2}>
  {children}
</Section>
```

---

## 📋 Complete API Specification

### Props Interface

```typescript
interface SectionProps {
  // Layout System
  layer?: 'base' | 'partial' | 'isolated'
  width?: 'prose' | 'content' | 'wide' | 'full'
  align?: 'left' | 'center' | 'right'
  elevation?: 0 | 1 | 2 | 3
  
  // Future-proofing
  variant?: string  // "hero" | "gallery" | "cta" - for Storyblok/analytics targeting
  
  // HTML Attributes
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: React.ReactNode
  
  // Standard HTML props
  id?: string
  style?: React.CSSProperties
  onClick?: () => void
  // ... other HTML attributes
}

/**
 * Props override any CSS-injected defaults (theme or parent), ensuring deterministic behavior.
 */
```

### Default Values

```typescript
const DEFAULTS = {
  layer: 'base',
  width: 'content', 
  align: 'center',
  elevation: 0,
  as: 'section'
}
```

---

## 🎨 Design Token Mappings

### Layer System
```css
--section-layer-base: var(--surface-0);      /* Page canvas */
--section-layer-partial: var(--surface-1);   /* Subtle elevation */
--section-layer-isolated: var(--surface-2);  /* Clear separation */
```

### Width System
```css
--section-width-prose: min(65ch, 100vw - var(--gutter) * 2);
--section-width-content: min(1200px, 100vw - var(--gutter) * 2);
--section-width-wide: min(1400px, 100vw - var(--gutter) * 2);
--section-width-full: 100vw;
```

### Alignment System
```css
--section-align-left: flex-start;
--section-align-center: center;
--section-align-right: flex-end;
```

### Elevation System
```css
--section-elevation-0: none;
--section-elevation-1: var(--shadow-elev-1);
--section-elevation-2: 0 12px 28px oklch(0 0 0 / var(--elevation-opacity, 0.15));
--section-elevation-3: var(--shadow-elev-3);

/* Elevation opacity scales across themes */
--elevation-opacity: 0.15;
html[data-theme="dark"] {
  --elevation-opacity: 0.25;
}
```

---

## 🏗️ Implementation Requirements

### File Structure
```
src/
├── components/
│   └── layout/
│       └── Section.tsx          # Main component
├── styles/
│   ├── tokens/
│   │   └── theme.tokens.css     # Token definitions (✅ DONE)
│   └── components/
│       └── section-system.css   # Dedicated section CSS (replaces all legacy section.*.css)
└── types/
    └── layout.ts                # TypeScript interfaces
```

### CSS Structure & Container Pattern

```html
<section data-layer="partial" data-width="content" class="section">
  <div class="section__container">{children}</div>
</section>
```

```css
/* Base section with predictable overflow handling */
.section {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* Container provides consistent gutters and centering */
.section__container {
  width: var(--section-width);
  max-width: var(--section-width);
  margin-inline: auto;
  padding-inline: var(--space-component-lg);
}

/* Data attribute targeting with fallbacks */
.section[data-layer="base"] {
  background: var(--section-layer-base, var(--surface-0, #fff));
}

.section[data-layer="partial"] {
  background: var(--section-layer-partial, var(--surface-1, #f9f9f9));
  box-shadow: var(--section-elevation-1, 0 2px 4px oklch(0 0 0 / 0.1));
}

.section[data-layer="isolated"] {
  background: var(--section-layer-isolated, var(--surface-2, #f0f0f0));
  box-shadow: var(--section-elevation-2, 0 8px 16px oklch(0 0 0 / 0.15));
  border-radius: var(--radius-medium, 12px);
  margin-inline: var(--space-component-md, 16px);
}

/* Width variants control container max-width */
.section[data-width="prose"] .section__container {
  --section-width: var(--section-width-prose);
}

.section[data-width="content"] .section__container {
  --section-width: var(--section-width-content);
}

.section[data-width="wide"] .section__container {
  --section-width: var(--section-width-wide);
}

.section[data-width="full"] .section__container {
  --section-width: var(--section-width-full);
  padding-inline: 0; /* Full width = no gutters */
}

/* Alignment affects flex alignment */
.section[data-align="left"] {
  align-items: var(--section-align-left, flex-start);
}

.section[data-align="center"] {
  align-items: var(--section-align-center, center);
}

.section[data-align="right"] {
  align-items: var(--section-align-right, flex-end);
}

/* Elevation overrides (for layer="base" with custom elevation) */
.section[data-elevation="0"] {
  box-shadow: var(--section-elevation-0, none);
}

.section[data-elevation="3"] {
  box-shadow: var(--section-elevation-3, 0 16px 32px oklch(0 0 0 / 0.2));
}
```

### Rail System Integration
```css
.section {
  /* Glass toolbar integration - opt-in per section */
  margin-top: calc(var(--rail-toolbar-height, 135px) * var(--enable-rail-offset, 1) * -1);
  padding-top: calc(var(--rail-toolbar-height, 135px) * var(--enable-rail-offset, 1));
  
  /* Default: rail offset enabled */
  --enable-rail-offset: 1;
  
  /* Mobile: no toolbar offset */
  @media (max-width: 768px) {
    --enable-rail-offset: 0;
    padding-top: var(--space-component-md);
  }
}

/* Disable rail offset for specific sections */
.section[data-no-rail] {
  --enable-rail-offset: 0;
}
```

### Design Constraints
- **Layer + Elevation Rule:** `elevation` implies `isolated` layer to prevent conflicting combinations
- If `elevation > 0` is set, `layer` automatically becomes `"isolated"`
- Use `layer="base" elevation={0}` for flat background sections
- Use `layer="partial" elevation={1}` for subtle elevation  
- Use `layer="isolated" elevation={2-3}` for prominent cards

---

## 📚 Usage Examples

### Basic Sections
```typescript
// Page canvas section
<Section>
  <WhyCard />
</Section>

// Elevated section
<Section layer="partial">
  <VenueHighlight />
</Section>

// Isolated card-like section
<Section layer="isolated" elevation={2}>
  <ExperienceFeature />
</Section>
```

### Width Control
```typescript
// Text-optimized reading width
<Section width="prose">
  <article>Long form content...</article>
</Section>

// Standard content width (1200px max)
<Section width="content">
  <div className="feature-grid">...</div>
</Section>

// Wide layout (1400px max)
<Section width="wide">
  <div className="gallery">...</div>
</Section>

// Full viewport width
<Section width="full">
  <div className="hero-banner">...</div>
</Section>
```

### Alignment Control
```typescript
// Left-aligned content
<Section align="left">
  <nav>...</nav>
</Section>

// Center-aligned content (default)
<Section align="center">
  <header>...</header>
</Section>

// Right-aligned content
<Section align="right">
  <aside>...</aside>
</Section>
```

### Complex Combinations
```typescript
// Card-like feature section
<Section 
  layer="isolated" 
  width="content" 
  align="center" 
  elevation={2}
  className="feature-showcase"
>
  <FeatureGrid />
</Section>

// Wide gallery with subtle elevation
<Section 
  layer="partial" 
  width="wide" 
  align="center" 
  elevation={1}
>
  <GalleryComponent />
</Section>

// Full-width hero
<Section 
  layer="base" 
  width="full" 
  align="center" 
  elevation={0}
  as="header"
>
  <Hero />
</Section>
```

---

## 🧩 Primitive Integration

### Text Component (✅ Ready)
```typescript
<Section layer="partial">
  <Text size="lg">Welcome to our venue</Text>
  <Text size="md" muted>Perfect for your special day</Text>
</Section>
```

### Heading Component (✅ Ready)
```typescript
<Section layer="isolated" elevation={1}>
  <Heading as={2} size="xl">Why Choose Us</Heading>
  <Text>Beautiful grounds and exceptional service</Text>
</Section>
```

### Button Component (✅ Ready)
```typescript
<Section layer="base" align="center">
  <Heading as={2} size="lg">Ready to Book?</Heading>
  <Button variant="solid" size="lg">Schedule Tour</Button>
</Section>
```

---

## 🎭 Leaf Component Patterns

### WhyCard Pattern
```typescript
<Section layer="partial" width="content" align="center" elevation={1}>
  <article className="why-card">
    <Heading as={3} size="lg">Exceptional Service</Heading>
    <Text size="md">Our dedicated team ensures every detail...</Text>
    <Button variant="outline" size="md">Learn More</Button>
  </article>
</Section>
```

### VenueHighlight Pattern
```typescript
<Section layer="isolated" width="wide" align="center" elevation={2}>
  <div className="venue-highlight">
    <Media src="/venue.jpg" ratio="16/9" alt="Ceremony space" />
    <div className="content">
      <Heading as={3} size="md">Ceremony Space</Heading>
      <Text muted>Perfect for outdoor ceremonies up to 150 guests</Text>
    </div>
  </div>
</Section>
```

### ExperienceFeature Pattern
```typescript
<Section layer="base" width="content" align="left" elevation={0}>
  <div className="experience-feature">
    <header>
      <Heading as={2} size="xl">Your Perfect Day</Heading>
      <Text size="lg">Every detail crafted with care</Text>
    </header>
    <div className="feature-grid">
      {features.map(feature => (
        <Card key={feature.id}>
          <CardBody>
            <Heading as={3} size="md">{feature.title}</Heading>
            <Text>{feature.description}</Text>
          </CardBody>
        </Card>
      ))}
    </div>
  </div>
</Section>
```

---

## 🔧 Missing Primitives (To Build)

### Media Component
```typescript
interface MediaProps {
  src: string
  alt: string
  ratio?: '1/1' | '4/3' | '16/9' | '21/9'
  fit?: 'cover' | 'contain' | 'fill'
  priority?: boolean
  className?: string
}

// Usage
<Media 
  src="/venue-ceremony.jpg" 
  ratio="16/9" 
  alt="Outdoor ceremony space" 
  priority={true}
/>
```

### Card Components
```typescript
// Card system
<Card>
  <CardHeader>
    <Heading as={3} size="md">Feature Title</Heading>
  </CardHeader>
  <CardMedia>
    <Media src="/feature.jpg" ratio="4/3" alt="Feature" />
  </CardMedia>
  <CardBody>
    <Text>Feature description text...</Text>
  </CardBody>
  <CardFooter>
    <Button variant="outline">Learn More</Button>
  </CardFooter>
</Card>
```

---

## 🚀 Implementation Plan

### Phase 1: Foundation (Current)
- [x] Shadow token layer (`theme.tokens.css`)
- [ ] Type definitions (`types/layout.ts`)
- [ ] Section component (`components/layout/Section.tsx`)
- [ ] Media primitive (`components/primitives/Media.tsx`)

### Phase 2: Leaf Components
- [ ] WhyCard component
- [ ] VenueHighlight component  
- [ ] ExperienceFeature component
- [ ] Card primitives (Card, CardHeader, CardMedia, CardBody, CardFooter)

### Phase 3: Demo & Integration
- [ ] Demo route (`/demo/sections`)
- [ ] Mock data setup
- [ ] Integration testing
- [ ] Documentation examples

### Phase 4: Migration
- [ ] Tag legacy sections with `@deprecated` JSDoc
- [ ] Move legacy files to `/legacy/` folder  
- [ ] Add ESLint import restriction:
```json
"no-restricted-imports": [
  "error", 
  { 
    "patterns": [
      "@/components/ui/Section*", 
      "@/styles/components/section*"
    ],
    "message": "Use @/components/layout/Section from the new section system"
  }
]
```
- [ ] Replace existing sections one-by-one
- [ ] Remove alternating blocks CSS
- [ ] Clean up legacy section components

---

## ✅ Success Criteria

### Technical Requirements
- [ ] Section component accepts all 4 core props
- [ ] CSS data attributes map correctly to design tokens
- [ ] Glass toolbar integration works on desktop
- [ ] Mobile responsive without toolbar offset
- [ ] TypeScript types are complete and accurate
- [ ] Works with existing primitives (Text, Heading, Button)

### Design Requirements  
- [ ] Layer system creates proper visual hierarchy
- [ ] Width system handles all content types
- [ ] Alignment system works with all layouts
- [ ] Elevation system integrates with glass effects
- [ ] Consistent spacing and typography
- [ ] Accessible markup and focus management

### Developer Experience
- [ ] Simple 4-prop API is intuitive
- [ ] Clear TypeScript intellisense
- [ ] Composable with all existing primitives
- [ ] Good error messages for invalid props
- [ ] Comprehensive usage examples
- [ ] Easy to extend for new patterns

---

## 🎯 Next Actions

1. **Create TypeScript interfaces** (`src/types/layout.ts`)
2. **Build Section component** (`src/components/layout/Section.tsx`)  
3. **Create Media primitive** (`src/components/primitives/Media.tsx`)
4. **Build first leaf component** (WhyCard with mock data)
5. **Create demo route** to showcase all combinations

---

**This document is the definitive specification. All implementation must reference this API.**