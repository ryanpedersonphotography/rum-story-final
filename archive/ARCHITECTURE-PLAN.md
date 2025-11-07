# High-Level Architecture Plan
## Rum River Wedding Venue Website
**Based on SRS v1.0** | **Date: November 6, 2024**

---

## Table of Contents
1. [System Architecture Overview](#1-system-architecture-overview)
2. [Folder/Module Structure](#2-foldermodule-structure)
3. [Component-Type Assignment](#3-component-type-assignment)
4. [Theme Integration Architecture](#4-theme-integration-architecture)
5. [Storyblok Hook Layer](#5-storyblok-hook-layer)
6. [Implementation Roadmap](#6-implementation-roadmap)

---

## 1. System Architecture Overview

### 1.1 High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                              │
├─────────────────────────────────────────────────────────────────────┤
│  Theme Detection  │  Next.js App Router  │  Storyblok Visual Editor │
│  (Pre-paint)      │  (SSR + Hydration)   │  (iframe + Bridge)       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        NETLIFY EDGE LAYER                          │
├─────────────────────────────────────────────────────────────────────┤
│  Theme Edge Function  │  CDN Caching  │  Build Optimization        │
│  (FOUC Prevention)    │  (Static Assets) │  (SSG + Functions)      │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       NEXT.JS APPLICATION                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │  Server Side    │    │   Client Side   │    │   Static Layer  │ │
│  │                 │    │                 │    │                 │ │
│  │ • Page Routes   │    │ • Theme Provider│    │ • CSS Tokens    │ │
│  │ • API Routes    │    │ • Dev Toolbar   │    │ • Design System │ │
│  │ • RSC Components│    │ • Interactions  │    │ • Static Assets │ │
│  │ • Storyblok API │    │ • Visual Bridge │    │ • Bundle Output │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        STORYBLOK CMS                               │
├─────────────────────────────────────────────────────────────────────┤
│  Content Delivery API  │  Management API  │  Visual Editor         │
│  (Published Content)   │  (Webhooks)      │  (Real-time Preview)   │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Data Flow Architecture

```
Storyblok CMS ──┐
                │
                ▼
┌─────────────────────────────────┐
│     Content Delivery API       │
│  ┌─────────────────────────────┐│
│  │ Stories: home, pages, etc.  ││
│  │ Assets: images, documents   ││
│  │ Schema: component types     ││
│  └─────────────────────────────┘│
└─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────┐    ┌─────────────────────────────────┐
│      Server Components         │    │      Client Components         │
│  ┌─────────────────────────────┐│    │  ┌─────────────────────────────┐│
│  │ • fetchStory()             ││    │  │ • useStoryblok()           ││
│  │ • Static Generation        ││    │  │ • Bridge Integration       ││
│  │ • SEO Optimization         ││    │  │ • Live Preview             ││
│  │ • Performance Caching      ││    │  │ • Theme Switching          ││
│  └─────────────────────────────┘│    │  └─────────────────────────────┘│
└─────────────────────────────────┘    └─────────────────────────────────┘
                │                                        │
                └─────────────┬──────────────────────────┘
                              ▼
                ┌─────────────────────────────────┐
                │      Rendered Components        │
                │  ┌─────────────────────────────┐│
                │  │ • Hero Section             ││
                │  │ • Gallery Grid             ││
                │  │ • Alternating Blocks       ││
                │  │ • Contact Forms            ││
                │  │ • Testimonials             ││
                │  └─────────────────────────────┘│
                └─────────────────────────────────┘
```

---

## 2. Folder/Module Structure

### 2.1 Complete Project Structure

```
rum-river-venue/
├── 📁 src/
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📄 layout.js                 # Root layout with theme script
│   │   ├── 📄 page.tsx                  # Homepage (Server Component)
│   │   ├── 📄 globals.css               # Global CSS imports
│   │   ├── 📄 fonts.ts                  # Font definitions
│   │   └── 📁 api/                      # API Routes
│   │       ├── 📄 health/route.ts       # Health check
│   │       ├── 📄 preview/route.ts      # Draft mode toggle
│   │       ├── 📄 revalidate/route.ts   # ISR revalidation
│   │       └── 📄 storyblok-story/route.ts # Webhook handler
│   │
│   ├── 📁 components/
│   │   ├── 📁 clean/                    # Production Components (Server)
│   │   │   ├── 📄 Hero.tsx              # Hero section (RSC)
│   │   │   ├── 📄 Gallery.tsx           # Image gallery (RSC)
│   │   │   ├── 📄 AlternatingBlocks.tsx # Content blocks (RSC)
│   │   │   ├── 📄 ScheduleForm.tsx      # Contact form (Client)
│   │   │   ├── 📄 Navbar.tsx            # Navigation (Client)
│   │   │   └── 📄 Footer.tsx            # Footer (RSC)
│   │   │
│   │   ├── 📁 dev/                      # Development Tools (Client)
│   │   │   ├── 📄 ThemeSelect.tsx       # Theme switcher toolbar
│   │   │   ├── 📄 GlassToolbar.tsx      # Future: Glass design toolbar
│   │   │   └── 📄 DebugPanel.tsx        # Future: Debug information
│   │   │
│   │   ├── 📁 storyblok/               # CMS Integration Components
│   │   │   ├── 📄 Page.tsx             # Page wrapper (RSC)
│   │   │   ├── 📄 *Editor.tsx          # Visual Editor components
│   │   │   └── 📁 client/
│   │   │       └── 📄 StoryblokBridge.tsx # Bridge client component
│   │   │
│   │   ├── 📁 ui/                      # Base UI Components
│   │   │   ├── 📄 ThemeProvider.tsx    # Theme context (Client)
│   │   │   ├── 📄 Section.tsx          # Section wrapper (RSC)
│   │   │   └── 📄 Button.tsx           # Button primitive (RSC)
│   │   │
│   │   ├── 📁 gallery/                 # Gallery-specific Components
│   │   │   ├── 📄 MasonryGallery.tsx   # Masonry layout (Client)
│   │   │   └── 📄 WeddingGalleryModal.tsx # Lightbox modal (Client)
│   │   │
│   │   ├── 📁 primitives/              # Design System Primitives
│   │   │   ├── 📄 PropsSlot.tsx        # Composition helper
│   │   │   ├── 📄 SectionLayout.tsx    # Section container
│   │   │   └── 📄 Surface.tsx          # Background surfaces
│   │   │
│   │   └── 📄 StoryblokProvider.jsx    # Main Storyblok integration
│   │
│   ├── 📁 lib/                         # Utility Libraries
│   │   ├── 📄 storyblok.ts             # Storyblok API client
│   │   ├── 📄 react-interop.ts         # React utilities
│   │   └── 📁 theme/
│   │       └── 📄 registry.ts          # Theme definitions
│   │
│   └── 📁 styles/                      # CSS Architecture
│       ├── 📁 tokens/                  # Design Tokens (Atomic)
│       │   ├── 📄 theme.css            # Color, typography tokens
│       │   └── 📄 spacing.css          # Spacing, layout tokens
│       │
│       ├── 📁 primitives/              # Base Styles
│       │   ├── 📄 index.css            # Global primitives
│       │   ├── 📄 layout.css           # Layout utilities
│       │   └── 📄 typography.css       # Text styles
│       │
│       ├── 📁 components/              # Component Styles
│       │   ├── 📄 hero.css             # Hero-specific styles
│       │   ├── 📄 gallery.css          # Gallery layout
│       │   ├── 📄 navbar.css           # Navigation styles
│       │   └── 📄 glass-toolbar.css    # Future: Glass toolbar
│       │
│       ├── 📁 system/                  # System-level Styles
│       │   ├── 📄 section-presets.css  # Section configurations
│       │   └── 📄 layout.css           # Layout system
│       │
│       └── 📄 globals.css              # Global reset & base
│
├── 📁 netlify/                         # Netlify Configuration
│   └── 📁 edge-functions/
│       └── 📄 theme.ts                 # Theme edge function
│
├── 📁 public/                          # Static Assets
│   ├── 📁 images/                      # Optimized images
│   ├── 📁 fonts/                       # Font files
│   └── 📄 favicon.ico                  # Site icon
│
├── 📁 tests/                           # Test Suite
│   ├── 📁 components/                  # Component tests
│   ├── 📁 accessibility/               # A11y tests
│   └── 📁 performance/                 # Performance tests
│
├── 📁 docs/                           # Documentation
│   ├── 📄 SRS-RumRiverVenue-v1.0.md   # Requirements spec
│   └── 📄 ARCHITECTURE-PLAN.md        # This document
│
├── 📄 package.json                     # Dependencies
├── 📄 next.config.mjs                  # Next.js configuration
├── 📄 netlify.toml                     # Deployment config
└── 📄 tsconfig.json                    # TypeScript config
```

### 2.2 Module Responsibility Matrix

| Module | SRS Requirement | Responsibility | Dependencies |
|--------|-----------------|----------------|--------------|
| `/app/layout.js` | FR-003, NFR-009 | Theme initialization, SEO | Theme script, fonts |
| `/components/clean/` | FR-007, FR-009 | Production components | Storyblok content |
| `/components/dev/` | FR-011 | Development tools | Theme registry |
| `/components/storyblok/` | FR-004, FR-005 | CMS integration | Storyblok SDK |
| `/components/ui/` | FR-001, FR-002 | Core UI primitives | React context |
| `/styles/tokens/` | NFR-002, NFR-006 | Design system foundation | CSS variables |
| `/lib/storyblok.ts` | FR-006, INT-001 | Content API client | Environment config |
| `/netlify/edge-functions/` | FR-003, NFR-001 | FOUC prevention | Request headers |

---

## 3. Component-Type Assignment

### 3.1 Server Components (RSC)
**Purpose**: SEO, performance, initial content delivery

```typescript
// Server Components - Rendered on server, no interactivity
interface ServerComponentPattern {
  rendering: 'server-side'
  hydration: false
  storyblokContent: true
  performance: 'optimized'
  seoFriendly: true
}
```

**Components:**
- `📄 Hero.tsx` - Static hero content with background images
- `📄 Gallery.tsx` - Image grid with metadata (initial render)
- `📄 AlternatingBlocks.tsx` - Content sections with rich text
- `📄 Footer.tsx` - Static footer content and links
- `📄 Page.tsx` - Page wrapper and SEO meta tags
- `📄 Section.tsx` - Layout containers and spacing
- `📄 Button.tsx` - Static buttons (when no onClick needed)

### 3.2 Client Components
**Purpose**: Interactivity, real-time updates, user preferences

```typescript
// Client Components - Hydrated in browser, interactive
interface ClientComponentPattern {
  rendering: 'client-side'
  hydration: true
  interactivity: true
  stateManagement: 'local' | 'context'
  performance: 'lazy-loaded'
}
```

**Components:**
- `📄 ThemeProvider.tsx` - Theme state management and persistence
- `📄 ThemeSelect.tsx` - Development toolbar with theme controls
- `📄 ScheduleForm.tsx` - Form validation and submission
- `📄 Navbar.tsx` - Mobile menu and navigation interactions
- `📄 MasonryGallery.tsx` - Gallery layout and interactions
- `📄 WeddingGalleryModal.tsx` - Lightbox and modal functionality
- `📄 StoryblokBridge.tsx` - Visual Editor communication
- `📄 GlassToolbar.tsx` - Future: Advanced dev tools

### 3.3 CSS Token Architecture

```
CSS Layers Architecture:
┌─────────────────┐
│ @layer utilities│ ← Utility classes, overrides
├─────────────────┤
│ @layer components│ ← Component-specific styles  
├─────────────────┤
│ @layer base     │ ← Global reset, typography
├─────────────────┤
│ @layer tokens   │ ← Design tokens, variables
└─────────────────┘
```

**Atomic Tokens (`/styles/tokens/`)**:
```css
/* Atomic Design Tokens - Single responsibility */
:root {
  /* Color Primitives */
  --p-rose-60: oklch(65% 0.06 10);
  --p-walnut-50: oklch(53% 0.08 37);
  
  /* Semantic Tokens */
  --surface-0: var(--p-cream-98);
  --text-primary: var(--p-chocolate-25);
  
  /* Component Tokens */
  --hero-bg: var(--surface-0);
  --hero-text: var(--text-primary);
}
```

**Component Styles Pattern**:
```css
/* Component CSS - Uses tokens exclusively */
[data-clean-root="true"] .hero {
  --_bg: var(--hero-bg, var(--surface-0));
  --_text: var(--hero-text, var(--text-primary));
  
  background: var(--_bg);
  color: var(--_text);
}
```

---

## 4. Theme Integration Architecture

### 4.1 No-Flash Theme System (FOUC Prevention)

```
Theme Application Flow:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Request  │ ──▶│  Netlify Edge   │ ──▶│  Pre-paint JS   │
│                 │    │   Function      │    │    (Layout)     │
│  • Headers      │    │                 │    │                 │
│  • Cookies      │    │ • Read cookies  │    │ • Set data-*    │
│  • User-Agent   │    │ • Detect OS     │    │ • Before React  │
│  • Geo location │    │ • Set headers   │    │ • Prevent FOUC  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ CSS Variables   │ ◀──│  Theme Context  │ ◀──│  React Hydration│
│                 │    │                 │    │                 │
│ • data-theme    │    │ • State sync    │    │ • Client ready  │
│ • data-brand    │    │ • LocalStorage  │    │ • Event binding │
│ • Token updates │    │ • Cross-tab     │    │ • Interactive   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 4.2 Implementation Detail

**Step 1: Netlify Edge Function**
```typescript
// netlify/edge-functions/theme.ts
export default async function handler(request: Request) {
  const url = new URL(request.url);
  const response = await fetch(request);
  
  // Read theme preferences
  const cookies = request.headers.get('Cookie') || '';
  const savedTheme = extractCookie(cookies, 'rr.theme');
  const savedBrand = extractCookie(cookies, 'rr.brand');
  
  // Detect OS preference from headers
  const userAgent = request.headers.get('User-Agent') || '';
  const osPrefersDark = detectDarkMode(userAgent);
  
  // Determine final theme
  const theme = savedTheme || (osPrefersDark ? 'dark' : 'light');
  const brand = savedBrand || 'romantic';
  
  // Inject into HTML before first paint
  const html = await response.text();
  const injectedHtml = html.replace(
    '<html',
    `<html data-theme="${theme}" data-brand="${brand}"`
  );
  
  return new Response(injectedHtml, {
    headers: response.headers
  });
}
```

**Step 2: Pre-paint Script (Layout)**
```javascript
// src/app/layout.js - Inline script (before React)
const themeScript = `
(function(){
  try {
    var d = document.documentElement;
    var params = new URLSearchParams(window.location.search);
    
    // URL override support
    var themeOverride = params.get('theme');
    var brandOverride = params.get('brand');
    
    if (themeOverride) {
      d.setAttribute('data-theme', themeOverride);
      localStorage.setItem('rr.theme', themeOverride);
    }
    
    if (brandOverride) {
      d.setAttribute('data-brand', brandOverride);
      localStorage.setItem('rr.brand', brandOverride);
    }
  } catch(e) {
    // Graceful fallback
    console.warn('Theme initialization error:', e);
  }
})();
`;
```

**Step 3: React Theme Provider**
```typescript
// src/components/ui/ThemeProvider.tsx
'use client'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [brand, setBrand] = useState<'romantic' | 'modern'>('romantic');
  
  useEffect(() => {
    // Sync with DOM attributes set by edge function
    const htmlElement = document.documentElement;
    setTheme(htmlElement.getAttribute('data-theme') as any || 'light');
    setBrand(htmlElement.getAttribute('data-brand') as any || 'romantic');
    setMounted(true);
    
    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rr.theme') {
        const newTheme = e.newValue as 'light' | 'dark';
        setTheme(newTheme);
        htmlElement.setAttribute('data-theme', newTheme);
      }
      if (e.key === 'rr.brand') {
        const newBrand = e.newValue as 'romantic' | 'modern';
        setBrand(newBrand);
        htmlElement.setAttribute('data-brand', newBrand);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Theme switching functions...
  const updateTheme = useCallback((newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('rr.theme', newTheme);
  }, []);
  
  // Prevent hydration mismatch
  if (!mounted) {
    return <div>{children}</div>;
  }
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, brand, setBrand }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 4.3 Theme Performance Requirements

| Metric | Target | Implementation |
|--------|--------|----------------|
| FOUC Prevention | 0ms flash | Edge function + pre-paint |
| Theme Switch Speed | <100ms | CSS variables only |
| Cross-tab Sync | <50ms | Storage event listeners |
| Theme Bundle Size | <5KB | CSS variables, no JS themes |

---

## 5. Storyblok Hook Layer

### 5.1 Content-to-Component Flow

```
Storyblok Story Structure:
┌─────────────────────────────────────────────────────────────────────┐
│                        Story: "home"                                │
├─────────────────────────────────────────────────────────────────────┤
│ content: {                                                          │
│   component: "page",                                                │
│   body: [                                                           │
│     {                                                               │
│       component: "home_hero_section",        ─────┐                │
│       title: "Rum River Wedding Barn",             │                │
│       subtitle: "Where Dreams Begin",               │                │
│       background_image: { filename: "..." }        │                │
│     },                                              │                │
│     {                                               │                │
│       component: "alternating_blocks_section", ────┼────┐           │
│       blocks: [                                     │    │           │
│         {                                           │    │           │
│           title: "Rustic Charm",                   │    │           │
│           content: "...",                          │    │           │
│           image: { filename: "..." }               │    │           │
│         }                                          │    │           │
│       ]                                            │    │           │
│     },                                             │    │           │
│     {                                              │    │           │
│       component: "love_stories_gallery",    ──────┼────┼────┐      │
│       title: "Real Weddings",                     │    │    │      │
│       stories: [                                  │    │    │      │
│         {                                         │    │    │      │
│           couple_name: "Sarah & Mike",            │    │    │      │
│           wedding_date: "2023-06-15",            │    │    │      │
│           images: [...]                          │    │    │      │
│         }                                        │    │    │      │
│       ]                                         │    │    │      │
│     }                                           │    │    │      │
│   ]                                             │    │    │      │
│ }                                               │    │    │      │
└─────────────────────────────────────────────────┼────┼────┼──────┘
                                                  │    │    │
                                                  ▼    ▼    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Component Resolution                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ StoryblokProvider.jsx:                                              │
│ components: {                                                       │
│   "home_hero_section": Hero,          ◀─────────────────────┐      │
│   "alternating_blocks_section": AlternatingBlocks, ◀────────┼─┐    │
│   "love_stories_gallery": Gallery     ◀─────────────────────┼─┼─┐  │
│ }                                                            │ │ │  │
│                                                              │ │ │  │
│ Renders: <StoryblokComponent blok={block} />                │ │ │  │
└──────────────────────────────────────────────────────────────┼─┼─┼──┘
                                                              │ │ │
                                                              ▼ ▼ ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Rendered Components                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────┐ │
│ │    Hero.tsx     │ │AlternatingBlocks│ │     Gallery.tsx         │ │
│ │                 │ │    .tsx         │ │                         │ │
│ │ • Background    │ │                 │ │ • Masonry layout        │ │
│ │ • Title/subtitle│ │ • Text blocks   │ │ • Modal lightbox        │ │
│ │ • CTA button    │ │ • Images        │ │ • Wedding stories       │ │
│ │ • Scroll arrow  │ │ • Alternating   │ │ • Couple metadata       │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Component Registration System

**Server-Side Registration (RSC)**:
```typescript
// src/lib/storyblok.ts - Server Components
storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: {
    // Page containers
    page: Page,                           // Wrapper component
    
    // Content sections (Server Components)
    home_hero_section: Hero,              // FR-007: Hero section
    alternating_blocks_section: AlternatingBlocks, // Content blocks
    love_stories_gallery: Gallery,        // FR-009: Gallery display
    testimonials_section: Testimonials,   // Social proof
    pricing_section: Pricing,             // Pricing tables
    schedule_form: ScheduleForm,           // FR-010: Form handling
    map_section: Map,                     // Location information
    footer_section: Footer,               // Site footer
    
    // Nested components
    testimonial_item: TestimonialItem,    // Individual testimonials
    location_item: LocationItem,          // Map locations
    pricing_tier: PricingTier,            // Pricing options
  }
});
```

**Client-Side Registration (Interactive)**:
```typescript
// src/components/StoryblokProvider.jsx - Client Components
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  bridge: process.env.NODE_ENV !== 'production', // Visual Editor
  components: {
    // Same component mapping but for client-side rendering
    // Used for Visual Editor and interactive previews
    page: Page,
    home_hero_section: Hero,
    // ... same mapping as server
  }
});
```

### 5.3 Content Transformation Pipeline

```
Storyblok Content → Component Props:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Raw Storyblok   │ ──▶│   Transformer   │ ──▶│ Component Props │
│ Field Data      │    │    Functions    │    │   (Typed)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘

Example: Hero Section
{                        assetUrl()           title: string
  title: "...",      ──▶ assetAlt()      ──▶  subtitle: string
  background_image:      fieldMapping()       backgroundImage: string
  { filename: "..." }    validation()         backgroundAlt: string
}                                             ctaText: string
```

**Content Transformation Functions**:
```typescript
// src/components/clean/Hero.tsx - Content processing
function assetUrl(asset: SBAsset): string | undefined {
  if (!asset) return undefined;
  if (typeof asset === 'string') return asset;
  return asset.filename;
}

function processHeroContent(blok: HeroBlok) {
  return {
    title: blok.title || 'Default Title',
    subtitle: blok.kicker || 'Default Subtitle',
    description: blok.description || '',
    backgroundImage: assetUrl(blok.background_image) || '/images/default-hero.jpg',
    backgroundAlt: assetAlt(blok.background_image, 'Wedding venue'),
    ctaText: blok.primary_cta_text || 'Learn More',
    scrollText: blok.scroll_text || 'Discover More'
  };
}
```

### 5.4 Webhook Integration (Future)

```
Content Publish Flow:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Editor hits   │ ──▶│  Storyblok API  │ ──▶│ Webhook Trigger │
│   "Publish"     │    │  processes      │    │  (HTTP POST)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Netlify Build  │ ◀──│  Next.js ISR    │ ◀──│ /api/revalidate │
│   Triggered     │    │  Revalidation   │    │   Route Handler │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Planned Webhook Handler**:
```typescript
// src/app/api/revalidate/route.ts - ISR webhook
export async function POST(request: Request) {
  const body = await request.json();
  const { story, action } = body;
  
  // Validate webhook signature
  const signature = request.headers.get('webhook-signature');
  if (!validateSignature(body, signature)) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  try {
    // Revalidate specific paths
    if (story.full_slug === 'home') {
      await revalidatePath('/');
    }
    
    // Revalidate story-specific pages
    await revalidatePath(`/${story.full_slug}`);
    
    return Response.json({ 
      revalidated: true, 
      slug: story.full_slug,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ 
      error: 'Revalidation failed' 
    }, { status: 500 });
  }
}
```

---

## 6. Implementation Roadmap

### 6.1 Priority-Ordered Implementation Plan

### **Phase 1: Foundation & Core Architecture (Week 1-2)**
**Priority: CRITICAL** | **SRS Requirements: NFR-001, NFR-009, FR-003**

#### 1.1 Theme System Stabilization
```bash
# Priority: P0 (Blocking)
□ Fix Storyblok environment variable naming consistency
□ Test theme switching across all browsers
□ Verify FOUC prevention on slow connections
□ Document theme token usage patterns
```

#### 1.2 Component Architecture Audit
```bash
# Priority: P0 (Blocking)  
□ Verify Server/Client component boundaries
□ Test RSC with Storyblok content loading
□ Validate CSS layer cascade order
□ Ensure token-based styling consistency
```

#### 1.3 Performance Baseline
```bash
# Priority: P1 (High)
□ Run Lighthouse audits on deployed site
□ Measure current CSS/JS bundle sizes
□ Test Core Web Vitals on real devices
□ Establish performance monitoring
```

**Deliverables:**
- ✅ Theme system working without FOUC
- ✅ Component architecture validated
- ✅ Performance baseline documented

---

### **Phase 2: Storyblok Integration Optimization (Week 3-4)**
**Priority: HIGH** | **SRS Requirements: FR-004, FR-005, FR-006**

#### 2.1 Content Management Workflow
```bash
# Priority: P1 (High)
□ Test Visual Editor integration thoroughly
□ Verify component mapping completeness  
□ Test draft vs published content access
□ Validate content transformation pipeline
```

#### 2.2 Content Delivery Optimization
```bash
# Priority: P1 (High)
□ Implement efficient Storyblok caching
□ Add ISR (Incremental Static Regeneration)
□ Test content updates in production
□ Monitor Storyblok API rate limits
```

#### 2.3 CMS Developer Experience
```bash
# Priority: P2 (Medium)
□ Document content schema requirements
□ Create component preview templates
□ Add content validation helpers
□ Build CMS field mapping documentation
```

**Deliverables:**
- ✅ Visual Editor fully functional
- ✅ Content caching optimized
- 📖 CMS integration documented

---

### **Phase 3: Performance & Accessibility Compliance (Week 5-6)**
**Priority: HIGH** | **SRS Requirements: NFR-001-NFR-014**

#### 3.1 Performance Optimization
```bash
# Priority: P0 (Blocking)
□ Achieve LCP < 2s target
□ Reduce CSS bundle to < 150KB  
□ Implement image optimization strategy
□ Add performance monitoring dashboard
```

#### 3.2 Accessibility Implementation
```bash
# Priority: P0 (Blocking)  
□ Achieve WCAG 2.1 AA compliance
□ Implement proper focus management
□ Test with screen readers (NVDA, JAWS)
□ Validate color contrast ratios
```

#### 3.3 Browser Compatibility
```bash
# Priority: P1 (High)
□ Test on Chrome, Firefox, Safari, Edge
□ Verify mobile responsiveness
□ Test progressive enhancement
□ Validate graceful degradation
```

**Deliverables:**
- ⚡ Performance targets achieved
- ♿ WCAG 2.1 AA compliance
- 🌐 Cross-browser compatibility

---

### **Phase 4: Advanced Features & Developer Tools (Week 7-8)**
**Priority: MEDIUM** | **SRS Requirements: FR-011, FR-012**

#### 4.1 Development Toolbar Enhancement
```bash
# Priority: P2 (Medium)
□ Implement GlassToolbar component
□ Add component isolation tools
□ Build responsive design testing
□ Create accessibility testing panel
```

#### 4.2 Content Management Tooling
```bash
# Priority: P2 (Medium)
□ Add content preview improvements
□ Implement bulk content operations
□ Create content validation tools
□ Build SEO preview functionality
```

#### 4.3 Testing Infrastructure
```bash
# Priority: P1 (High)
□ Expand automated test coverage
□ Add visual regression testing
□ Implement performance regression tests
□ Create accessibility automation
```

**Deliverables:**
- 🛠️ Enhanced developer tools
- 📝 Content management improvements  
- 🧪 Comprehensive test suite

---

### **Phase 5: Production Optimization & Monitoring (Week 9-10)**
**Priority: MEDIUM** | **SRS Requirements: NFR-013, NFR-014**

#### 5.1 Security Hardening
```bash
# Priority: P1 (High)
□ Implement strict CSP headers
□ Add security header validation
□ Test for XSS vulnerabilities
□ Validate environment security
```

#### 5.2 Monitoring & Analytics
```bash
# Priority: P2 (Medium)
□ Set up performance monitoring
□ Add error tracking and logging
□ Implement user experience analytics
□ Create deployment health checks
```

#### 5.3 Documentation & Handoff
```bash
# Priority: P1 (High)
□ Complete technical documentation
□ Create deployment runbooks
□ Document troubleshooting procedures
□ Train team on new architecture
```

**Deliverables:**
- 🔒 Production security validated
- 📊 Monitoring and analytics active
- 📚 Complete documentation

---

### 6.2 Risk Assessment & Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|-------------------|
| FOUC on slow connections | High | Medium | Edge function + aggressive pre-paint |
| Storyblok API rate limits | Medium | Medium | Implement caching + ISR |
| Component hydration issues | High | Low | Thorough RSC/Client boundary testing |
| Performance regression | Medium | Medium | Continuous monitoring + CI gates |
| Accessibility violations | High | Low | Automated testing + manual validation |
| Browser compatibility | Medium | Low | Progressive enhancement + testing |

### 6.3 Success Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Lighthouse Performance | TBD | >90 | Phase 3 |
| LCP (Largest Contentful Paint) | TBD | <2s | Phase 3 |
| CSS Bundle Size | TBD | <150KB | Phase 3 |
| WCAG 2.1 AA Compliance | TBD | 100% | Phase 3 |
| Visual Editor Functionality | Partial | 100% | Phase 2 |
| Cross-browser Support | TBD | 100% | Phase 3 |
| Developer Productivity | Baseline | +50% | Phase 4 |

---

## 7. Conclusion

This architecture plan provides a comprehensive roadmap for implementing the SRS requirements with clear priorities and measurable outcomes. The modular structure supports both immediate needs and future scalability while maintaining performance and accessibility standards.

**Key Benefits:**
- 🎯 **Clear Implementation Path**: Step-by-step roadmap with priorities
- 🏗️ **Scalable Architecture**: Modular design supporting future growth  
- ⚡ **Performance First**: Built-in optimization and monitoring
- ♿ **Accessibility Compliant**: WCAG 2.1 AA from the ground up
- 🔧 **Developer Experience**: Enhanced tooling and documentation
- 📊 **Measurable Success**: Clear metrics and acceptance criteria

The implementation should follow the priority order, with Phase 1 being critical for foundation stability and Phase 5 ensuring production readiness.

---

## 8. Deployment Architecture

### 8.1 Netlify Build Configuration

#### Build Process Overview
```
Git Push → Netlify Build → Edge Deployment
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Source Code   │ ──▶│  Build Process  │ ──▶│   Live Deploy   │
│                 │    │                 │    │                 │
│ • Feature branch│    │ • npm ci        │    │ • Global CDN    │
│ • Main branch   │    │ • npm run build │    │ • Edge Functions│
│ • Manual deploy │    │ • Optimization  │    │ • Asset caching │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### Current Build Configuration (`netlify.toml`)
```toml
# Simplified build configuration following best practices
[build]
  command = "npm ci && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18.17.0"
  NEXT_TELEMETRY_DISABLED = "1"

# Essential security headers only
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.storyblok.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.storyblok.com; frame-src 'self' https://app.storyblok.com;"

# Static asset caching
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 8.2 Build Hooks & Webhooks

#### Netlify Build Hooks Setup
```bash
# Create build hook for content updates
curl -X POST https://api.netlify.com/api/v1/sites/SITE_ID/build_hooks \
  -H "Authorization: Bearer NETLIFY_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Storyblok Content Update",
    "branch": "main"
  }'

# Returns build hook URL:
# https://api.netlify.com/build_hooks/BUILD_HOOK_ID
```

#### Storyblok Webhook Configuration
**Location**: Storyblok Space Settings → Webhooks

| Trigger Event | Webhook URL | Method | Purpose |
|---------------|-------------|--------|---------|
| Story Published | `https://api.netlify.com/build_hooks/BUILD_HOOK_ID` | POST | Full site rebuild |
| Story Unpublished | `https://rum-story-final.netlify.app/api/revalidate` | POST | ISR revalidation |
| Asset Updated | `https://rum-story-final.netlify.app/api/revalidate` | POST | Cache invalidation |

#### Webhook Payload Processing
```typescript
// Future: src/app/api/revalidate/route.ts
export async function POST(request: Request) {
  const signature = request.headers.get('webhook-signature');
  const body = await request.json();
  
  // Validate Storyblok signature
  if (!validateStoryblokSignature(body, signature)) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const { story, action } = body;
  
  try {
    // Selective revalidation based on story
    if (story.full_slug === 'home') {
      await revalidatePath('/');
    } else {
      await revalidatePath(`/${story.full_slug}`);
    }
    
    // Trigger build for major changes
    if (action === 'published' && story.is_startpage) {
      await triggerBuild();
    }
    
    return Response.json({ 
      revalidated: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### 8.3 Edge Functions Configuration

#### Theme Edge Function Architecture
```typescript
// netlify/edge-functions/theme.ts - Production Implementation
import { Context } from "https://edge.netlify.com";

interface ThemeConfig {
  theme: 'light' | 'dark';
  brand: 'romantic' | 'modern';
  source: 'cookie' | 'header' | 'default';
}

export default async function themeHandler(
  request: Request, 
  context: Context
) {
  const response = await context.next();
  
  // Only process HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }
  
  const themeConfig = detectThemePreferences(request);
  const html = await response.text();
  
  // Inject theme attributes before first paint
  const themedHtml = injectThemeAttributes(html, themeConfig);
  
  return new Response(themedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...response.headers,
      'cache-control': 'public, max-age=0, must-revalidate', // Dynamic content
    }
  });
}

function detectThemePreferences(request: Request): ThemeConfig {
  const cookies = parseCookies(request.headers.get('cookie') || '');
  const userAgent = request.headers.get('user-agent') || '';
  
  // Priority: Cookie → OS Preference → Default
  const savedTheme = cookies['rr.theme'] as 'light' | 'dark';
  const savedBrand = cookies['rr.brand'] as 'romantic' | 'modern';
  
  const osPrefersDark = userAgent.includes('prefers-color-scheme: dark');
  
  return {
    theme: savedTheme || (osPrefersDark ? 'dark' : 'light'),
    brand: savedBrand || 'romantic',
    source: savedTheme ? 'cookie' : osPrefersDark ? 'header' : 'default'
  };
}

// Edge function configuration
export const config = {
  path: ["/*"],
  excludedPath: [
    "/api/*",
    "/_next/*", 
    "/images/*",
    "/fonts/*"
  ]
};
```

#### Edge Function Performance
| Metric | Target | Implementation |
|--------|--------|----------------|
| Cold Start | <50ms | Minimal dependencies, optimized code |
| Theme Injection | <5ms | Simple string replacement |
| Memory Usage | <10MB | Stateless function, no large objects |
| Geographic Latency | <100ms | Global edge network deployment |

### 8.4 Caching Strategy

#### Multi-Layer Caching Architecture
```
Client Browser ←→ Netlify Edge ←→ Origin Server
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Browser     │   │ Edge Cache  │   │ Next.js     │
│ Cache       │   │             │   │ Server      │
│             │   │ • Static    │   │             │
│ • HTML: 0s  │   │ • Dynamic   │   │ • ISR       │
│ • CSS: 1yr  │   │ • Edge Fn   │   │ • API Cache │
│ • Images:   │   │ • Geo-dist  │   │ • Build     │
│   30 days   │   │             │   │   Cache     │
└─────────────┘   └─────────────┘   └─────────────┘
```

#### Detailed Caching Headers Configuration

**Static Assets (Immutable)**:
```toml
# CSS, JS, Fonts - Immutable with hash-based filenames
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Vary = "Accept-Encoding"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Access-Control-Allow-Origin = "*"
```

**Images and Media**:
```toml
# Images - Long cache with revalidation
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000, stale-while-revalidate=86400"
    Vary = "Accept-Encoding"
```

**Dynamic HTML Content**:
```toml
# HTML pages - No cache, always fresh from ISR
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    Vary = "Accept-Encoding, Cookie"
```

**API Routes**:
```toml
# API endpoints - Short cache with revalidation
[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "public, max-age=300, stale-while-revalidate=60"
    Vary = "Accept-Encoding, Authorization"
```

#### Next.js ISR Configuration
```typescript
// src/app/page.tsx - Homepage with ISR
export const revalidate = 3600; // 1 hour

export default async function HomePage() {
  // Server Component with ISR
  const story = await fetchStory('home', 'published');
  
  return (
    <StoryblokStory story={story} />
  );
}

// src/app/[slug]/page.tsx - Dynamic pages
export async function generateStaticParams() {
  const stories = await fetchStories({
    version: 'published',
    starts_with: ''
  });
  
  return stories.map((story) => ({
    slug: story.slug,
  }));
}
```

### 8.5 Environment Configuration

#### Production Environment Variables
```bash
# Storyblok Integration
STORYBLOK_PREVIEW_TOKEN=sb-****-preview     # Server-side content access
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=sb-**** # Client-side Visual Editor
STORYBLOK_WEBHOOK_SECRET=webhook-****       # Webhook validation

# Build Configuration
NODE_VERSION=18.17.0                        # Stable Node version
NEXT_TELEMETRY_DISABLED=1                   # Disable analytics
NODE_ENV=production                         # Production optimizations

# Performance Monitoring
LIGHTHOUSE_API_KEY=****                     # Performance tracking
SENTRY_DSN=****                            # Error monitoring (future)
```

#### Environment-Specific Configuration
```typescript
// next.config.mjs - Environment-aware settings
const nextConfig = {
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: true, // Remove console.log in production
    },
    experimental: {
      optimizeCss: true,   // CSS optimization
      bundleAnalyzer: false, // Disable in production
    }
  }),
  
  // Development enhancements
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      bundleAnalyzer: true, // Bundle analysis in dev
    }
  })
};
```

### 8.6 Deployment Monitoring & Alerts

#### Build Success Monitoring
```bash
# Netlify CLI - Monitor deployments
netlify api listSiteDeploys --site-id=$SITE_ID | jq '.[] | select(.state == "ready") | .created_at'

# Performance budget enforcement
lighthouse https://rum-story-final.netlify.app \
  --budget-path=lighthouse-budget.json \
  --output=json \
  --quiet
```

#### Deployment Health Checks
```typescript
// src/app/api/health/route.ts - Deployment verification
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV,
    storyblok: {
      connected: !!process.env.STORYBLOK_PREVIEW_TOKEN,
      region: 'US' // Based on API endpoint
    },
    performance: {
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }
  };
  
  return Response.json(health);
}
```

#### Alert Configuration (Planned)
| Alert Type | Trigger | Action |
|------------|---------|--------|
| Build Failure | Exit code ≠ 0 | Email notification |
| Performance Regression | LCP > 2.5s | Slack alert |
| High Error Rate | >1% 5xx responses | PagerDuty incident |
| Storyblok API Errors | API failure rate >5% | Development team notification |

### 8.7 Disaster Recovery & Rollback

#### Deployment Rollback Strategy
```bash
# Quick rollback to previous deployment
netlify api restoreSiteDeploy --site-id=$SITE_ID --deploy-id=$PREVIOUS_DEPLOY_ID

# Branch-based rollback
git revert HEAD~1
git push origin main  # Triggers new build with reverted changes
```

#### Content Recovery
```typescript
// Emergency content fallback
const FALLBACK_CONTENT = {
  hero: {
    title: "Rum River Wedding Barn",
    subtitle: "Where Dreams Begin",
    description: "Experience your perfect wedding day...",
    backgroundImage: "/images/default-hero.jpg"
  }
  // ... additional fallback content
};

export default function Hero({ blok }: { blok: HeroBlok | null }) {
  // Graceful degradation if Storyblok content unavailable
  const content = blok || FALLBACK_CONTENT.hero;
  
  return (
    <section className="hero" style={{ '--hero-bg-url': `url("${content.backgroundImage}")` }}>
      {/* Component implementation */}
    </section>
  );
}
```

---

## Deployment Summary

The deployment architecture ensures **high availability**, **optimal performance**, and **seamless content updates** through:

- **🚀 Automated Build Pipeline**: Git-based deployment with build hooks
- **⚡ Edge Optimization**: Theme injection and global CDN distribution  
- **💾 Intelligent Caching**: Multi-layer strategy optimizing for performance
- **🔄 Content Synchronization**: Webhook-driven updates with ISR fallback
- **📊 Monitoring & Alerts**: Health checks and performance tracking
- **🛡️ Disaster Recovery**: Automated rollback and content fallback systems

This deployment strategy aligns with **SRS requirements NFR-001 through NFR-014**, ensuring production-ready performance, security, and reliability.