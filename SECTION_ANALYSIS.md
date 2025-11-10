# Section Analysis Documentation

## 1. Home Hero Section
**File**: `/src/features/Hero.tsx` + `Hero.module.css`

### Component Hierarchy
```
<section> (CUSTOM IMPLEMENTATION - No Section wrapper!)
├── Background (::before pseudo-element with image)
├── Overlay (::after pseudo-element with gradient)
└── .heroContent
    ├── .eyebrow (script accent)
    ├── .title with .titleAccent
    ├── .lead (description)
    └── .ctas
        └── .ctaSecondary (button)
```

### Storyblok Props
**Flexible field mapping for multiple aliases:**
- `kicker` (default: "Where Dreams Begin")
- `title` (default: "Rum River")
- `title_accent` (default: "Wedding Barn")
- `description` (default: "Nestled along Minnesota's scenic...")
- Background image (searches multiple fields):
  - `background_image`, `hero_image`, `bg_image`
- `primary_cta_text` (default: "Schedule Your Visit")
- `scroll_text` (default: "Discover Your Perfect Day")

### Layout Control System
**Custom layout props (not from Storyblok):**
```typescript
interface HeroLayoutProps {
  contentAlign?: 'left' | 'center' | 'right'
  contentWidth?: 'prose' | 'content' | 'wide'
  useRailSystem?: boolean  // Rail-based positioning
}
```

### CSS Architecture
**Custom Implementation - No Section Wrapper**
- CSS Module with local scoped variables
- NO Section wrapper usage ❌
- Full viewport height (`min-height: 100vh`)
- CSS custom property for background image
- Pseudo-elements for layered background
- Fixed background attachment (parallax effect)
- Animation on load (`fadeInUp`)

### Spacing Control
- Hero padding: `var(--space-3xl) var(--space-2xl)`
- Content max-width: `800px` (adjustable via props)
- Margin: `0 var(--gutter)`
- CTA gap: `var(--space-md)`
- Lead margin: `var(--space-3xl)`

### CSS Variables Used
```css
/* Local scoped variables */
--_text: var(--hero-text)
--_accent: var(--hero-accent)
--_cta-text: var(--hero-cta-text)
--_cta-hover-text: var(--hero-cta-hover-text)
--_overlay-start: var(--hero-overlay-start)
--_overlay-mid: var(--hero-overlay-mid)
--_overlay-end: var(--hero-overlay-end)
--_bg-attach: var(--hero-bg-attach, fixed)

/* Typography */
--font-script: Dancing Script
--font-serif: Playfair Display
--font-sans: System font

/* Spacing */
--space-md, --space-xl, --space-2xl, --space-3xl
--gutter: Side margins

/* Layout (for rail system) */
--page-max: 1400px
--rail-offset: 120px
```

### Theme Variations

#### Light Mode + Romantic
```css
Overlay: Semi-transparent gradient with warm tones
--hero-text: Light text on dark overlay
--hero-accent: Gold accent (#E4C896)
Script font for eyebrow
Glass morphism CTA button
```

#### Dark Mode + Romantic
```css
Enhanced overlay opacity
Text shadows for depth (0 2px 4px rgba(0,0,0,0.3))
Maintained accent colors
White text with !important override
```

#### Light Mode + Modern
```css
Could remove script font
Sharper CTA button corners
Faster animations
No text shadows
```

#### Dark Mode + Modern
```css
High contrast overlay
Crisp edges
Minimal decoration
Strong text shadows
```

### Key Features
- ❌ NO Section wrapper usage
- ✅ Full Storyblok integration with flexible field detection
- ✅ Custom layout control system (alignment & width)
- ✅ Rail-based positioning system (advanced layout)
- ✅ Smooth scroll implementation (custom JS)
- ✅ Parallax background effect (fixed attachment)
- ✅ Animated entrance effects
- ✅ Screen reader support (srOnly class)
- ⚠️ Custom container implementation

### Issues & Legacy Patterns
1. **No Section Wrapper**: Uses plain `<section>` instead of Section component
2. **Custom Container**: Implements own content wrapper instead of Section's container
3. **Local CSS Variables**: Uses `--_variable` pattern (inconsistent with other sections)
4. **Inline Styles**: Sets `--hero-bg-url` via inline style attribute
5. **Complex Layout System**: Rail-based positioning adds complexity
6. **Parallax Performance**: Fixed background attachment can cause performance issues

### Notable Implementation Details
1. **Asset Handling**: Robust image URL extraction from multiple possible fields
2. **Smooth Scroll**: Custom JS implementation to avoid conflicts with Storyblok Bridge
3. **Rail System**: Advanced positioning for left/right aligned content
4. **Animation**: CSS keyframes for fadeInUp entrance
5. **Glass Morphism**: CTA button uses backdrop-filter and blur
6. **Responsive Breakpoints**: Disables fixed attachment on mobile for performance

### Recommendations
- Consider using Section wrapper for consistency
- Could benefit from Section's container system
- Background image could use Next.js Image optimization
- Rail system adds complexity - evaluate if needed
- Consider performance impact of fixed background

---

## 2. Navbar Section
**File**: `/src/features/Navbar.tsx` + `/src/styles/components/navbar.css`

### Component Hierarchy
```
<nav> (CUSTOM IMPLEMENTATION - No wrapper!)
├── .navbar__container
│   ├── .navbar__logo
│   │   ├── .navbar__logo-icon (RR)
│   │   └── .navbar__logo-text
│   ├── .navbar__nav (desktop)
│   │   ├── .navbar__link (multiple)
│   │   ├── ThemeToggle component
│   │   └── .navbar__cta
│   └── .navbar__mobile-btn
└── .navbar__mobile-menu (overlay)
    ├── .navbar__mobile-close
    ├── .navbar__link (mobile versions)
    ├── ThemeToggle component
    └── .navbar__cta-mobile
```

### Storyblok Props
- `logo_text` (default: "Rum River Barn")
- `nav_items[]` - Array of navigation items:
  - `label` - Display text
  - `href` - Link URL (supports anchors)
  - `_uid` - Unique identifier
- `show_cta` (default: true)
- `cta_label` (default: "Book Now")
- `cta_url` (default: "#schedule-form")

### CSS Architecture
**Global CSS File - Not Module!**
- Global CSS file at `/src/styles/components/navbar.css`
- NOT a CSS Module ❌
- Uses BEM naming convention
- Scoped with `[data-clean-root="true"]` selector
- Uses `@layer components` for cascade control
- **CRITICAL**: Currently hidden with `display: none !important`

### Spacing Control
- Fixed positioning with z-index: 1000/1001
- Padding normal: `var(--space-24) 0`
- Padding scrolled: `var(--space-16) 0`
- Container max-width: `1400px`
- Container padding: `0 var(--space-32)`
- Nav gap desktop: `var(--space-32)` to `var(--space-40)`
- Mobile menu padding: `var(--space-80) var(--space-32) var(--space-32)`

### CSS Variables Used
```css
/* Navbar-specific tokens */
--navbar-bg: Background color
--navbar-scroll-bg: Scrolled state background
--navbar-text: Default text color
--navbar-link: Link color
--navbar-link-hover: Link hover color
--navbar-accent: Accent color
--navbar-cta-bg: CTA background
--navbar-cta-text: CTA text color
--navbar-logo-grad: Logo gradient
--navbar-underline: Border color

/* Spacing */
--space-8, --space-12, --space-16, --space-24, --space-32, --space-40, --space-48, --space-80

/* Effects */
--shadow-text-soft: Text shadow
--shadow-elev-1, --shadow-elev-2, --shadow-elev-3: Box shadows
--focus-width, --focus-ring, --focus-offset: Focus states
```

### Theme Variations

#### Light Mode + Romantic
```css
Transparent initially
Glass morphism on scroll
Warm text colors
Gradient underline on hover
Soft shadows
```

#### Dark Mode + Romantic
```css
Enhanced glass effect
Maintained token system
Text shadows for depth
Same accent colors
```

#### Light Mode + Modern
```css
Clean lines
Minimal shadows
Sharp focus states
No gradients
```

#### Dark Mode + Modern
```css
High contrast
Crisp edges
Strong shadows
Clear affordances
```

### Key Features
- ✅ Full Storyblok integration
- ✅ Smooth scroll implementation for anchors
- ✅ Scroll-based state changes (glass morphism)
- ✅ Mobile responsive drawer
- ✅ Theme toggle integration
- ✅ Accessible ARIA labels
- ✅ Focus states for keyboard navigation
- ❌ NOT using CSS Modules
- ❌ Currently hidden with `display: none !important`
- ⚠️ Global CSS with complex scoping

### Issues & Legacy Patterns
1. **Global CSS**: Not using CSS Modules like other components
2. **Hidden by Default**: `display: none !important` at line 10
3. **Complex Scoping**: Uses `[data-clean-root="true"]` prefix everywhere
4. **Inline Styles**: Mobile backdrop uses inline styles
5. **No Container Component**: Direct implementation without wrapper
6. **BEM Naming**: Uses BEM convention instead of CSS Modules

### Notable Implementation Details
1. **Smooth Scroll**: Custom JS to handle anchor navigation
2. **Scroll Detection**: Changes appearance when scrolled > 50px
3. **Mobile Drawer**: Full-screen overlay with backdrop
4. **Theme Toggle**: Integrated theme switcher component
5. **Anchor Handling**: Searches by ID and data-section attribute
6. **Animation**: Custom easeOutQuad for scroll animation

### Critical Issue
**THE NAVBAR IS HIDDEN!** Line 10 of the CSS:
```css
[data-clean-root="true"] .navbar {
  display: none !important;
}
```
This completely hides the navbar despite all the functionality being implemented.

### Recommendations
1. **Remove `display: none !important`** to make navbar visible
2. Consider converting to CSS Module for consistency
3. Remove complex `[data-clean-root="true"]` scoping
4. Use Section or similar wrapper pattern
5. Replace inline styles with CSS classes
6. Align with component architecture of other sections

---

## 3. GlassToolbar (Active Navigation Component)
**File**: `/src/development/GlassToolbar.tsx` + `/src/styles/components/glass-toolbar.css`

### Component Hierarchy
```
<aside> (.glass-toolbar)
├── .glass-toolbar__rail (Fixed left rail)
│   ├── .glass-toolbar__rail-top
│   │   ├── .glass-toolbar__logo
│   │   │   └── Image (barn-logo.svg)
│   │   └── .glass-toolbar__rail-label
│   ├── .glass-toolbar__primary (nav)
│   │   └── .glass-toolbar__pill (multiple sections)
│   │       ├── .glass-toolbar__pill-icon-wrapper
│   │       └── .glass-toolbar__pill-label
│   └── .glass-toolbar__rail-footer
│       ├── ThemeToggle placeholder
│       └── .glass-toolbar__toggle (expand/collapse)
└── .glass-toolbar__panel (Animated with Framer Motion)
    ├── .glass-toolbar__panel-body
    │   └── .glass-toolbar__subnav (AnimatePresence)
    │       └── Dynamic items based on active section
    └── .glass-toolbar__footer
        └── .glass-toolbar__footer-cta (FAQ, Sign out)
```

### Props (NOT from Storyblok!)
**This is a development component, not Storyblok-integrated:**
```typescript
interface GlassToolbarProps {
  sections?: ToolbarSection[]
  activeSectionId?: string
  onSectionChange?: (sectionId: string) => void
  onItemSelect?: (sectionId: string, itemId: string) => void
  initialExpanded?: boolean
  className?: string
  style?: React.CSSProperties
}
```

Default sections: Overview, Experience, Settings, Dev Tools

### CSS Architecture
**Premium Glass Morphism Implementation**
- Global CSS file at `/src/styles/components/glass-toolbar.css`
- NOT a CSS Module ❌
- NO Storyblok integration ❌
- Advanced glass morphism with multiple layers
- Premium "walnut & gold" theme
- Complex shadow and blur effects
- Framer Motion for animations

### Spacing Control
- Fixed positioning: `top: 0, bottom: 0, left: 0`
- Rail width: `--glass-toolbar-rail-width: 135px`
- Panel width: `--glass-toolbar-panel-width: 380px`
- Rail padding: `20px 0 16px`
- Panel padding: `24px`
- Z-index: 1100 (above navbar at 1000)
- Dynamic offset: Sets `--glass-toolbar-offset` CSS variable

### CSS Variables Used
```css
/* Premium Theme Colors */
--walnut-dark: #191410
--walnut-darker: #0f0c0a
--walnut-darkest: #080605
--walnut-medium: #2a201a
--walnut-highlight: #3d2f25
--toolbar-gold: oklch(0.88 0.07 88)
--toolbar-gold-bright: oklch(0.92 0.09 88)
--toolbar-gold-muted: oklch(0.75 0.06 88)

/* Dimensions */
--glass-toolbar-rail-width: 135px
--glass-toolbar-panel-width: 380px
--glass-toolbar-offset: dynamic

/* Glass Effects */
--glass-toolbar-rail-blur: 20px
--glass-toolbar-panel-blur: 16px
--glass-toolbar-shadow: 0 24px 56px rgba(0,0,0,0.12)

/* Animations */
--glass-toolbar-duration: 300ms
--glass-toolbar-ease: cubic-bezier(0.2,0,0,1)
```

### Theme Variations

#### Dark Mode (Default)
```css
Walnut gradient backgrounds
Gold accent borders and highlights
Complex multi-layer shadows
High contrast glass morphism
Premium depth effects
```

#### Light Mode
```css
Clean white glass effects
Gold accents maintained
Softer shadows
Higher opacity backgrounds
Black text on white glass
```

### Key Features
- ✅ **Advanced glass morphism** with multiple blur layers
- ✅ **Framer Motion animations** for smooth transitions
- ✅ **Complex interaction states** (hover, focus, pointer tracking)
- ✅ **Expandable panel** with auto/manual modes
- ✅ **Responsive breakpoints** (collapses at 900px)
- ✅ **Accessibility** with ARIA attributes
- ✅ **Reduced motion support**
- ❌ **NO Storyblok integration** - hardcoded sections
- ❌ **NOT using CSS Modules**
- ⚠️ **Development/experimental component**

### Advanced Features
1. **Multi-layer Glass Effects**: 
   - Base gradient background
   - Blur and saturate filters
   - Overlay gradients with mix-blend-mode
   - Complex box shadows (6+ layers)

2. **Smart Expansion Logic**:
   - Manual pinning
   - Pointer inside tracking
   - Focus inside tracking  
   - Hover lock for persistent hover
   - Transient hover with timeout

3. **Animation System**:
   - Framer Motion for panel sliding
   - Spring physics for expansion
   - Reduced motion variants
   - AnimatePresence for content transitions

4. **Premium Visual Effects**:
   - Gold accent stripe with glow
   - Walnut wood-like gradients
   - Depth shadows and insets
   - Filter effects on hover

### Issues & Concerns
1. **Not Production-Ready**: Located in `/src/development/` folder
2. **No CMS Integration**: Hardcoded sections, no Storyblok
3. **Complex State Management**: Multiple hover/focus states
4. **Performance Overhead**: Heavy blur and filter effects
5. **Experimental UI**: May not align with main site design

### Notable Implementation Details
1. **Replaces Navbar**: This is why Navbar is hidden
2. **Premium Design Language**: Walnut & gold theme
3. **Advanced Interactions**: Pointer gates, focus management
4. **Dynamic CSS Variables**: Sets layout offset dynamically
5. **Barn Logo Integration**: Uses actual barn logo image

### Recommendations
1. **Consider Performance**: Heavy glass effects may impact performance
2. **Evaluate UX**: Complex interactions may confuse users
3. **Add Storyblok Integration**: Make sections configurable via CMS
4. **Move to Production**: Currently in development folder
5. **Simplify States**: Reduce complexity of hover/focus logic
6. **Test Accessibility**: Ensure screen reader compatibility

---

## 4. "Your Perfect Venue" Section (AlternatingBlocks)

### Component Hierarchy
```
AlternatingBlocks (Feature Component) - /src/features/AlternatingBlocks.tsx
  └── Section (Base UI Component) - /src/components/ui/Section.tsx
       ├── Header (script accent, title, lead)
       └── Content (alternating blocks with images)
```

### Storyblok Integration

#### Data Flow
1. **Page Loading**: `src/app/page.tsx` fetches "home" story from Storyblok API
2. **Component Mapping**: Via `src/lib/storyblok-component-map.ts`, `alternating_blocks_section` maps to `AlternatingBlocks` component
3. **Props Interface**: `AlternatingBlocksBlok` interface defines the data structure

#### Configurable Props from Storyblok
```typescript
interface AlternatingBlocksBlok {
  script_accent?: string         // Default: "Your Perfect Venue"
  title?: string                 // Default: "Why Choose Rum River Barn"
  description?: string           // Default: "Discover what makes our venue..."
  background_variant?: 'surface' | 'tint-rose' | 'tint-sage' | 'dark-gradient'  // Default: 'tint-rose'
  theme_override?: 'auto' | 'light' | 'dark'  // Default: 'auto'
  padding_size?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid'  // Default: 'fluid'
  blocks?: Array<{
    number?: string              // Block number (01, 02, etc.)
    title?: string               // Block heading
    lead?: string                // Block subtitle
    content?: Array<string>      // Paragraph content
    image?: string               // Image URL
    image_alt?: string           // Image alt text
    is_reverse?: boolean         // Reverse layout
  }>
}
```

#### Fallback Data
- Component includes fallback images that alternate between barn interior and field photos
- Automatic numbering if not provided (01, 02, 03...)

### Section Spacing & Container Structure

#### Container Hierarchy
1. **Section Component** (`src/components/ui/Section.tsx`)
   - Base container with padding and background
   - Default padding: `padding-block: var(--section-y, clamp(48px, 7vw, 120px))`
   - Uses `fluid` padding for this section (dynamic vertical spacing)

2. **Wrapper Element** (`.wrapper` class)
   - Controls content width: `--wrapper-max: 1200px`
   - Gutter: `--wrapper-gutter: clamp(50px, 5vw, 80px)`
   - Centers content with `margin: 0 auto`

3. **Block Layout** (`.item` class)
   - 2-column grid on desktop: `grid-template-columns: 1fr 1fr`
   - Gap between columns: `clamp(2rem, 5vw, 5rem)`
   - Bottom margin: `clamp(3.5rem, 7vw, 7.5rem)`
   - Max-width: 90% for visual offset
   - Padding: `clamp(1.25rem, 2.5vw, 1.75rem)`

#### Spacing Variables Used
```css
/* Section Level */
--section-y: clamp(48px, 7vw, 120px)  /* Vertical section padding */

/* Content Spacing (from AlternatingBlocks.module.css) */
--space-8: 0.5rem
--space-12: 0.75rem
--space-16: 1rem

/* Grid & Layout */
gap: clamp(2rem, 5vw, 5rem)           /* Column gap */
margin-bottom: clamp(3.5rem, 7vw, 7.5rem)  /* Block spacing */
padding: clamp(1.25rem, 2.5vw, 1.75rem)    /* Block padding */

/* Typography Spacing */
margin-bottom: var(--space-16)        /* Paragraph spacing */
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/AlternatingBlocks.module.css`** (154 lines)
   - Component-specific styles
   - Grid layout for alternating blocks
   - Responsive breakpoints
   - Dark mode overrides
   - Typography and spacing

2. **`src/components/ui/Section.module.css`** (157 lines)
   - Base section layout and spacing
   - Background variants
   - Header typography
   - Container width control

3. **`src/styles/tokens/theme.css`** (global tokens)
   - Defines `--why-*` prefixed variables for this section
   - Color values for different themes

#### CSS Variables & Design Tokens

##### Component-Specific Variables (--why-* prefix)
```css
/* Light Mode */
--why-number: (derived from theme)    /* Block numbers */
--why-text: var(--text-primary)       /* Main text */
--why-text-soft: color-mix(in oklch, var(--text-primary) 70%, var(--surface-2) 30%)  /* Soft text */
--why-bg-start: color-mix(in oklch, var(--surface-0) 92%, var(--accent-gold) 8%)
--why-bg-end: color-mix(in oklch, var(--surface-0) 88%, var(--accent-rose) 12%)
--why-card: var(--surface-1)
--why-border: var(--border-subtle)
--why-shadow: var(--shadow-elev-1)
```

##### Typography
```css
--font-serif: 'Playfair Display', serif  /* Numbers and titles */
--font-sans: system-ui, sans-serif       /* Body text */
```

### Layout Behavior

#### Responsive Design
- **Desktop (>900px)**: 2-column alternating grid
  - Odd items: left-aligned
  - Even items: right-aligned
  - Reverse option for image/text swap
- **Tablet/Mobile (<900px)**: Single column stack
  - All items center-aligned
  - Image always on top (order: -1)
- **Mobile (<480px)**: Reduced padding, smaller images (300px height)

#### Special Features
- **Alternating Alignment**: Odd blocks align left, even blocks align right (90% width)
- **Reverse Layout**: `is_reverse` prop flips content/image order using `direction: rtl`
- **Hover Effects**: Images scale to 1.02 and increase shadow on hover
- **Gold Thread Divider**: `divider="thread-gold"` adds decorative element

### Visual Editing Support
- `storyblokEditable(blok)` on main component
- `storyblokEditable(block)` on individual blocks
- Real-time preview updates

### Performance Considerations
- Next.js `Image` component with responsive sizes
- Lazy loading for off-screen images
- CSS modules for scoped styles
- Minimal JavaScript (no carousel/animation scripts)

## Theme Variations - "Your Perfect Venue"

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Component Colors */
--why-text: #6B4E3D                   /* Dark brown text */
--why-text-soft: rgba(107,78,61,0.7)  /* Softer brown for descriptions */
--why-number: (accent color)          /* Numbers use accent colors */

/* Backgrounds */
--why-bg-start: mix(#FFFCF8 92%, #E4C896 8%)   /* Subtle gold tint */
--why-bg-end: mix(#FFFCF8 88%, #9D6B7B 12%)    /* Subtle rose tint */
--why-card: #FFFFFF                             /* White cards */

/* Borders & Shadows */
--why-border: rgba(0,0,0,0.08)
--why-shadow: 0 12px 30px rgba(0,0,0,0.10)

/* Image Treatment */
.image {
  box-shadow: 0 12px 30px rgba(0,0,0,0.10);
  border-radius: 12px;
}

.item:hover .image {
  box-shadow: 0 16px 40px rgba(0,0,0,0.14);
}
```

#### Dark Mode
```css
/* Component Colors */
--why-text: #F5E6D3                    /* Cream text */
--why-text-soft: mix(#F5E6D3 65%, #F0D9A8 35%)  /* Gold-tinted soft text */
--why-number: (lighter accent)         /* Brighter accent for dark mode */

/* Backgrounds */
--why-bg-start: mix(#1A1410 72%, #7B9D8B 28%)  /* Deeper sage tint */
--why-bg-end: mix(#1A1410 70%, #D89BAE 30%)    /* Deeper rose tint */
--why-card: mix(#3D2F22 80%, black 20%)        /* Dark brown cards */

/* Borders & Shadows */
--why-border: rgba(255,255,255,0.08)
--why-shadow: 0 20px 50px rgba(0,0,0,0.50)

/* Image Treatment */
.item:hover .image {
  box-shadow: 0 20px 50px rgba(0,0,0,0.50);
}

/* Text Color Overrides */
.title, .paragraph, .lead {
  color: var(--why-text);  /* Ensures proper contrast */
}
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default)
```css
/* Color Palette */
--accent-rose: #9D6B7B        /* Dusty rose */
--accent-gold: #E4C896        /* Warm gold */
--accent-sage: #7B9D8B        /* Sage green */

/* Typography */
--font-serif: 'Playfair Display', serif  /* Elegant serif for numbers/titles */
font-size: clamp(2rem, 6vw, 3rem)        /* Large fluid numbers */
font-weight: 700                         /* Bold numbers */

/* Section Styling */
background: 'tint-rose'                  /* Warm rose tinted background */
padding_size: 'fluid'                    /* Dynamic padding */
divider: 'thread-gold'                   /* Decorative gold divider */

/* Visual Style */
- Warm color mixing for soft text
- Rounded corners (12px border-radius)
- Smooth transitions (600ms ease)
- Elegant shadow effects
- 90% max-width for visual rhythm
```

#### Modern Brand
```css
/* Color Palette (from theme.css) */
--accent-brass: #B8956F       /* Modern brass replaces rose/gold */
--accent-stone: #8B8B8B       /* Cool stone gray */

/* Component Overrides */
--why-bg-start: mix(#F8F8F8 90%, #8B8B8B 10%)   /* Stone tint */
--why-bg-end: mix(#F8F8F8 88%, #B8956F 12%)     /* Brass tint */
--why-text-soft: mix(text 60%, #B8956F 40%)     /* Brass-tinted text */

/* Typography */
--font-serif: 'Georgia', serif           /* Simpler serif */
font-weight: 600                         /* Slightly lighter */

/* Visual Style */
- Cooler, more neutral colors
- Potentially sharper corners
- Faster transitions
- Flatter shadow effects
- More geometric layout
```

### Background Variant Options

The AlternatingBlocks component supports these background variants via Storyblok:

1. **`surface`** - Clean neutral background
2. **`tint-rose`** - Warm romantic rose tint (default)
3. **`tint-sage`** - Natural sage green tint  
4. **`dark-gradient`** - Dark gradient for luxury feel

Each variant automatically adjusts text colors and shadows for optimal contrast.

---

## "The Rum River Experience" Section

### Component Hierarchy
```
Experience (Feature Component) - /src/features/Experience.tsx
  └── ExperienceLayout (Layout Wrapper) - /src/features/ExperienceLayout.tsx
       └── Section (Base UI Component) - /src/components/ui/Section.tsx
            ├── Header (script accent, title, lead) - NOT USED
            └── Content (two-column with features grid)
```

### Storyblok Integration

#### Data Flow
1. **Page Loading**: `src/app/page.tsx` fetches "home" story from Storyblok API
2. **Component Mapping**: Via `src/lib/storyblok-component-map.ts`, `rum_river_experience` maps to `Experience` component
3. **Props Interface**: `ExperienceStoryblok` interface defines the data structure

#### Configurable Props from Storyblok
```typescript
interface ExperienceStoryblok extends SbBlokData {
  title?: string           // Default: "More Than a Venue"
  subtitle?: string         // Default: "The Rum River Experience"
  description?: string      // Default: Full paragraph about the venue
  features?: Array<{
    icon?: string          // Icon key: 'sparkles', 'home', 'heart', 'check'
    title?: string         // Feature heading
    description?: string   // Feature description
  }>
  image?: {
    filename?: string      // Storyblok image URL
    alt?: string          // Alt text
  }
}
```

#### Fallback Data
- 4 default features with Heroicons: Natural Beauty, Authentic Charm, Personal Touch, Complete Experience
- Default image if not provided via Storyblok

### Section Spacing & Container Structure

#### Container Hierarchy
1. **Section Component** (`src/components/ui/Section.tsx`)
   - Base container with padding and background
   - Uses `xl` padding: `clamp(44px, 6vw, 72px)`
   - Background: `surface` (clean professional)

2. **Wrapper Element** (`.wrapper` class)
   - Controls content width: `--wrapper-max: 1200px`
   - Gutter: `--wrapper-gutter: clamp(50px, 5vw, 80px)`
   - Centers content with `margin: 0 auto`

3. **Grid Layout** (`.container` class)
   - 2-column grid: `grid-template-columns: 1fr 1fr`
   - Gap: `--space-64` (64px)
   - Features grid: 2x2 with `gap: 3rem`

#### Spacing Variables Used
```css
/* Section Level */
--pad-section-xl: clamp(44px, 6vw, 72px)  /* XL padding */

/* Component Spacing (from spacing.css) */
--space-8: 8px
--space-16: 16px
--space-24: 24px
--space-32: 32px
--space-48: 48px
--space-64: 64px
--space-80: 80px

/* Grid Gaps */
.container: gap: var(--space-64)    /* Main grid gap */
.features: gap: 3rem                /* Features grid gap */
.feature: gap: var(--space-16)      /* Icon to text gap */
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/Experience.module.css`** (253 lines)
   - Component-specific styles
   - Two-column grid layout
   - Feature cards with hover effects
   - Gold divider decoration (::after)
   - Dark mode overrides

2. **`src/features/ExperienceLayout.tsx`** (inline configuration)
   - Props-based styling
   - Background, tone, padding configuration
   - Passes through to Section component

3. **`src/components/ui/Section.module.css`** (157 lines)
   - Base section layout and spacing
   - Background variants
   - Container width control

#### CSS Variables & Design Tokens

##### Theme Colors
```css
--theme-accent-rose: #9D6B7B
--theme-accent-gold: #E4C896
--theme-bg-primary: #FFFCF8
--theme-bg-card: rgba(0, 0, 0, 0.02)  /* Subtle card background */
--theme-text-primary: #6B4E3D
--theme-bg-secondary: #2C2416
--theme-border-subtle: transparent
--theme-border-medium: rgba(0, 0, 0, 0.08)
--theme-shadow-sm: 0 8px 16px rgba(0, 0, 0, 0.08)
```

##### Typography
```css
--font-script: 'Dancing Script', cursive    /* Script accent */
--font-serif: 'Playfair Display', serif     /* Title */
--font-sans: 'Montserrat', sans-serif       /* Body text */
```

### Layout Behavior

#### Responsive Design
- **Desktop (>1024px)**: 2-column grid (content | image)
- **Tablet (<1024px)**: Single column, image on top
- **Mobile (<768px)**: Features become single column
- **Small Mobile (<480px)**: Reduced padding and font sizes

#### Special Features
- **Gold Divider**: Linear gradient at bottom with 70% opacity
- **Feature Cards**: Subtle background with hover lift effect
- **Image Aspect Ratio**: 4:5 on desktop, 16:9 on mobile
- **Hover Effects**: Image scales to 1.05, features lift with shadow

### Visual Editing Support
- `storyblokEditable(blok)` enables visual editor
- Real-time preview updates
- Icon mapping for dynamic icon selection

### Performance Considerations
- Next.js `Image` component with priority loading
- Heroicons for consistent icon library
- CSS modules for scoped styles
- Smooth CSS transitions (0.3s cubic-bezier)

## Theme Variations - "The Rum River Experience"

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Component Colors */
--theme-text-primary: #6B4E3D         /* Dark brown text */
--theme-accent-rose: #9D6B7B          /* Dusty rose accent */
--theme-accent-gold: #E4C896          /* Gold divider */
--theme-bg-card: rgba(0,0,0,0.02)     /* Very subtle card bg */

/* Feature Cards */
.feature {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid transparent;
  box-shadow: none;  /* No shadow by default */
}

.feature:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  border-color: rgba(0,0,0,0.08);
}

/* Gold Divider */
::after {
  background: linear-gradient(90deg,
    transparent,
    color-mix(#E4C896 50%, transparent),
    #E4C896,
    color-mix(#E4C896 50%, transparent),
    transparent);
  opacity: 0.7;
}

/* Image */
box-shadow: 0 25px 50px rgba(0,0,0,0.3);
```

#### Dark Mode
```css
/* Component Colors */
--theme-text-primary: #F5E6D3         /* Cream text */
--theme-accent-rose: #D89BAE          /* Lighter rose */
--theme-accent-gold: #F0D9A8          /* Brighter gold */
--theme-bg-card: #3D2F22              /* Dark brown cards */
--theme-bg-secondary: #2C2416         /* Secondary dark bg */

/* Background Treatment */
background: var(--surface-2);  /* Darker surface */

/* Feature Cards */
.feature {
  background: #3D2F22;
  border-color: rgba(255,255,255,0.08);
}

.feature:hover {
  border-color: rgba(255,255,255,0.12);
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
}

/* Gold Divider Enhanced */
::after {
  opacity: 0.8;
  box-shadow: 0 0 20px color-mix(#F0D9A8 40%, transparent);
}

/* Additional Gradient Effect */
::before {
  background: radial-gradient(ellipse at bottom,
    transparent,
    color-mix(#2C2416 15%, transparent));
  height: 200px;
}

/* Icon Color */
.iconSvg {
  color: #D89BAE;  /* Lighter rose for contrast */
}
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default)
```css
/* Color Palette */
--accent-rose: #9D6B7B        /* Dusty rose for icons */
--accent-gold: #E4C896        /* Warm gold for divider */

/* Typography */
font-family: 'Dancing Script'  /* Script for subtitle */
font-family: 'Playfair Display'  /* Serif for title */
font-family: 'Montserrat'      /* Sans for body */
font-size: 3rem                /* Large title */
font-size: 1.75rem             /* Prominent script */

/* Visual Style */
- Soft card backgrounds with transparency
- Smooth hover transitions (0.3s cubic-bezier)
- Rounded corners (12px border-radius)
- Elegant gold divider decoration
- Warm color temperature throughout
```

#### Modern Brand
```css
/* Color Palette (projected) */
--accent-brass: #B8956F       /* Brass replaces rose */
--accent-stone: #8B8B8B       /* Stone gray accents */

/* Typography Changes */
font-family: system-ui         /* System font for body */
font-family: 'Georgia'         /* Simpler serif */
No script font                /* Remove decorative script */

/* Visual Style Adjustments */
- Flatter card design (no bg on cards)
- Sharper corners (8px radius or less)
- Faster transitions (0.2s)
- Simpler divider or none
- More geometric, less ornamental
```

### Background Variant Options

The ExperienceLayout component defaults to these settings:
- **`background='surface'`** - Clean professional background (default)
- `paddingY='xl'` - Extra breathing room
- `divider='none'` - No divider (gold line is custom)

The component could support these variants via Storyblok:
1. **`surface`** - Clean neutral (current default)
2. **`tint-rose`** - Warm romantic tint
3. **`tint-sage`** - Natural green tint
4. **`dark-gradient`** - Luxury gradient

---

## "Real Love Stories" Section (Gallery)

### Component Hierarchy
```
Gallery (Feature Component) - /src/features/Gallery.tsx
  └── Section (Base UI Component) - /src/components/ui/Section.tsx
       ├── Header (script accent, title, lead)
       ├── Content (wedding gallery grid)
       └── WeddingGalleryModal (popup modal)
```

### Storyblok Integration

#### Data Flow
1. **Page Loading**: `src/app/page.tsx` fetches "home" story from Storyblok API
2. **Component Mapping**: Via `src/lib/storyblok-component-map.ts`, `love_stories_gallery` maps to `Gallery` component
3. **Dynamic Fetching**: Component fetches linked wedding stories via API
4. **Props Interface**: Gallery items include wedding_story UUID references

#### Configurable Props from Storyblok
```typescript
interface GalleryBlok {
  title?: string              // Default: "Weddings at the Barn"
  script_accent?: string      // Default: "Real Love Stories"
  description?: string        // Default: "Every celebration tells a unique story..."
  background_variant?: 'surface' | 'tint-rose' | 'tint-sage' | 'dark-gradient'  // Default: 'surface'
  theme_override?: 'auto' | 'light' | 'dark'  // Default: 'auto'
  section_variant?: string    // Default: 'gallery-rose-grid'
  galleries?: Array<{
    _uid?: string
    wedding_story?: string    // UUID reference to wedding story
    card_cover_image?: string // Override image
    card_title?: string       // Override title
    card_subtitle?: string    // Override date
    card_location?: string    // Override location
    modal_title?: string      // Modal override
    modal_date?: string       // Modal override
    modal_location?: string   // Modal override
    href?: string            // Link to full story
    photo_count?: number     // Number of photos
  }>
}
```

#### Fallback Data
- 6 hardcoded wedding galleries with Storyblok image URLs
- Automatic image resolution from wedding story if not overridden
- Placeholder image as final fallback

### Section Spacing & Container Structure

#### Container Hierarchy
1. **Section Component** (`src/components/ui/Section.tsx`)
   - Base container with padding and background
   - Default padding: `lg` - `clamp(36px, 5vw, 56px)`
   - Background: `surface` (clean neutral)

2. **Wrapper Element** (`.wrapper` class)
   - Controls content width: `--wrapper-max: 1200px`
   - Gutter: `--wrapper-gutter: clamp(50px, 5vw, 80px)`
   - Centers content with `margin: 0 auto`

3. **Gallery Grid** (`.weddingGallery` class)
   - 4-column CSS Grid: `grid-template-columns: repeat(4, 1fr)`
   - Auto rows: `grid-auto-rows: 300px`
   - Gap: `clamp(12px, 1.6vw, 16px)`
   - Special sizing: First item spans 2x2, 6th item spans 2 columns

#### Spacing Variables Used
```css
/* Section Level */
--pad-section-lg: clamp(36px, 5vw, 56px)  /* LG padding */

/* Component Spacing */
--space-4: 0.25rem
--space-8: 0.5rem
--space-16: 1rem
--space-20: 1.25rem

/* Grid Layout */
gap: clamp(12px, 1.6vw, 16px)         /* Responsive grid gap */
margin-top: clamp(2rem, 4vw, 3rem)    /* Space after header */
grid-auto-rows: 300px                  /* Fixed row height */

/* Overlay Padding */
padding: clamp(1rem, 2.5vw, 2rem)     /* Text overlay padding */
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/Gallery.module.css`** (224 lines)
   - Component-specific styles
   - CSS Grid layout with special positioning
   - Complex hover effects and animations
   - Glass morphism effects
   - Dark mode overrides

2. **`src/components/ui/Section.module.css`** (157 lines)
   - Base section layout and spacing
   - Background variants
   - Header typography
   - Container width control

3. **`src/styles/tokens/theme.css`** (global tokens)
   - Defines `--gallery-*` prefixed variables
   - Color values for different themes

#### CSS Variables & Design Tokens

##### Component-Specific Variables (--gallery-* prefix)
```css
/* Light Mode */
--gallery-rose: var(--accent-rose)           /* #9D6B7B */
--gallery-gold: var(--accent-gold)           /* #E4C896 */
--gallery-on-dark: var(--text-inverse)       /* #FFF8E7 */
--gallery-card-bg: var(--surface-1)          /* #FFFFFF */
--gallery-border: var(--border-subtle)       /* rgba(0,0,0,.08) */
--gallery-border-strong: rgba(255,255,255,.15)
```

##### Typography
```css
--font-script: 'Dancing Script', cursive    /* Couple names */
--font-serif: 'Playfair Display', serif     /* Season text */
--font-sans: 'Montserrat', sans-serif       /* Details text */
```

### Layout Behavior

#### Responsive Design
- **Desktop (>1024px)**: 4-column grid with special sizing
- **Tablet (<1024px)**: All items become 1x1 (no special sizing)
- **Mobile (<768px)**: Single column, all items 300px tall

#### Special Features
- **Asymmetric Grid**: First item 2x2, 6th item 2-wide
- **Glass Morphism**: Backdrop blur effects on cards
- **Shimmer Animation**: Light sweep on hover (::before)
- **Gradient Overlay**: Rose-tinted gradient on hover
- **Focus States**: Double border ring for accessibility
- **Modal Integration**: Click to open photo gallery modal

### Visual Editing Support
- `storyblokEditable(blok)` on section
- `storyblokEditable(gallery)` on individual items
- Dynamic loading states for wedding stories
- Real-time preview updates

### Performance Considerations
- Lazy loading for all images
- Responsive image sizes with Next.js `Image`
- Async fetching of linked wedding stories
- AbortController for cleanup on unmount
- CSS-based animations (no JavaScript)

## Theme Variations - "Real Love Stories"

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Card Styling */
.item {
  background: color-mix(in srgb, #FFFFFF 5%, transparent);
  border: 1px solid color-mix(in srgb, rgba(0,0,0,.08) 40%, transparent);
  box-shadow: 0 12px 28px rgba(0,0,0,.18);
}

.item:hover {
  box-shadow: 0 20px 48px rgba(0,0,0,.24);
  border-color: color-mix(in srgb, rgba(0,0,0,.12) 70%, transparent);
}

/* Overlay Gradient */
.overlay {
  background: linear-gradient(to top,
    color-mix(in srgb, black 40%, transparent) 0%,
    color-mix(in srgb, #9D6B7B 22%, transparent) 40%,
    transparent 68%);
  opacity: 0;  /* Hidden until hover */
}

/* Text Colors */
.coupleNames {
  color: #FFF8E7;  /* Cream on dark overlay */
  font-family: 'Dancing Script';
  font-size: clamp(1.35rem, 1rem + 1.2vw, 1.75rem);
}

.season {
  color: #E4C896;  /* Gold accent */
  font-family: 'Playfair Display';
}

.details {
  color: #FFF8E7;  /* Cream text */
  font-family: 'Montserrat';
}

/* Shimmer Effect */
::before {
  background: linear-gradient(90deg,
    transparent,
    color-mix(#FFF8E7 30%, transparent) 50%,
    transparent);
}
```

#### Dark Mode
```css
/* Card Styling */
.item {
  background: color-mix(in srgb, #3D2F22 15%, transparent);
  border-color: rgba(255,255,255,.12);
  box-shadow: 0 25px 50px rgba(0,0,0,.6);
}

.item:hover {
  border-color: rgba(255,255,255,.25);
  box-shadow: 0 30px 60px rgba(0,0,0,.6);
}

/* Overlay Gradient - Darker */
.overlay {
  background: linear-gradient(to top,
    rgba(10,8,6,.82) 0%,
    rgba(18,14,11,.6) 40%,
    transparent 75%);
  border-color: rgba(255,255,255,.18);
}

/* Text Colors */
.season {
  color: #F0D9A8;  /* Brighter gold for contrast */
}

/* Gallery Variables (from theme.css) */
--gallery-card-bg: color-mix(in oklch, var(--surface-1) 85%, black 15%)
--gallery-text-soft: color-mix(in oklch, var(--text-primary) 72%, var(--accent-gold) 28%)
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default)
```css
/* Color Palette */
--gallery-rose: #9D6B7B        /* Rose overlay tint */
--gallery-gold: #E4C896        /* Gold season text */

/* Typography */
font-family: 'Dancing Script'   /* Flowing couple names */
font-family: 'Playfair Display' /* Elegant season text */
font-size: clamp(1.35rem, 1rem + 1.2vw, 1.75rem)  /* Fluid script */

/* Visual Style */
- Soft rose-tinted overlay gradient
- Glass morphism with backdrop blur
- Smooth hover transitions (0.35s cubic-bezier)
- Rounded corners (14px border-radius)
- Shimmer animation on hover
- Warm, romantic color temperature
```

#### Modern Brand
```css
/* Color Palette (from theme.css) */
--gallery-rose: var(--accent-brass)  /* #B8956F brass replaces rose */
--gallery-gold: var(--accent-stone)  /* #8B8B8B stone replaces gold */

/* Typography Changes */
No script fonts                      /* Remove Dancing Script */
font-family: system-ui               /* Clean sans for names */
font-family: 'Georgia'              /* Simpler serif */

/* Visual Style Adjustments */
- Brass/stone tinted overlay (less pink)
- Less blur, more contrast
- Faster transitions (0.25s)
- Sharper corners possible (10px radius)
- No shimmer effect
- Cooler, more architectural feel
```

### Special Effects

#### Hover Animation Sequence
1. Card lifts: `translateY(-6px)`
2. Image scales: `scale(1.1)` over 1.2s
3. Overlay fades in: `opacity: 0 → 1`
4. Shimmer sweeps across: `left: -100% → 100%`
5. Shadow deepens and border darkens

#### Accessibility Features
- Focus visible states with double ring
- Touch-friendly on mobile (no hover required)
- Prefers-reduced-motion: disables all animations
- Proper ARIA labels and semantic HTML

### Background Variant Options

The Gallery component supports these background variants via Storyblok:
1. **`surface`** - Clean neutral background (default)
2. **`tint-rose`** - Warm romantic tint
3. **`tint-sage`** - Natural green tint
4. **`dark-gradient`** - Dark luxury gradient

---

## BrandProof Section

### Component Hierarchy
```
BrandProof (Feature Component) - /src/features/BrandProof.tsx
  └── Section (Base UI Component) - /src/components/ui/Section.tsx
       ├── Header - NOT USED
       └── Content (brand logos + testimonial quote)
```

### Storyblok Integration

#### Data Flow
1. **Page Loading**: `src/app/page.tsx` fetches "home" story from Storyblok API
2. **Component Mapping**: Via `src/lib/storyblok-component-map.ts`, `brand_proof` maps to `BrandProof` component
3. **Props Interface**: `BrandProofStoryblok` interface defines the data structure

#### Configurable Props from Storyblok
```typescript
interface BrandProofStoryblok extends SbBlokData {
  brands?: string              // Textarea, one brand per line
  quote_text?: string          // Quote with {highlight_1} and {highlight_2} placeholders
  highlight_1?: string         // First highlighted phrase
  highlight_2?: string         // Second highlighted phrase
}
```

#### Default Data
- **Brands**: THE KNOT, WEDDINGWIRE, MARTHA STEWART, MINNESOTA BRIDE
- **Quote**: "Rum River Barn isn't just a venue—it's {highlight_1}. Their commitment to saying 'yes' to every couple's vision sets them apart as {highlight_2}."
- **Highlight 1**: "where dreams come to life"
- **Highlight 2**: "Minnesota's most accommodating wedding destination"

### Section Spacing & Container Structure

#### Container Hierarchy
1. **Section Component** (`src/components/ui/Section.tsx`)
   - Base container with padding and background
   - Uses `md` padding: `clamp(28px, 4vw, 40px)` - compact spacing
   - Background: `tint-rose` (warm romantic tint)

2. **Wrapper Element** (`.wrapper` class)
   - Controls content width: `--wrapper-max: 1200px`
   - Gutter: `--wrapper-gutter: clamp(50px, 5vw, 80px)`
   - Centers content with `margin: 0 auto`

3. **Content Container** (`.content` class)
   - Additional max-width: 1200px (redundant but explicit)
   - Text align: center
   - Quote max-width: 850px for readability

#### Spacing Variables Used
```css
/* Section Level */
--pad-section-md: clamp(28px, 4vw, 40px)  /* MD padding - compact */

/* Component Spacing */
--space-16: 1rem
--space-20: 1.25rem
--space-32: 2rem
--space-40: 2.5rem
--space-56: 3.5rem
--gutter: (side padding variable)

/* Layout */
.logos gap: var(--space-56)           /* Large gap between brands */
margin-bottom: var(--space-40)        /* Space below logos */
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/BrandProof.module.css`** (165 lines)
   - Component-specific styles
   - Glass morphism effects (backdrop-filter)
   - Noise texture overlay
   - Gradient overlays
   - Dark mode overrides

2. **`src/components/ui/Section.module.css`** (157 lines)
   - Base section layout and spacing
   - Background variants (tint-rose)
   - Container width control

#### CSS Variables & Design Tokens

##### Theme Colors
```css
--theme-text-primary: #6B4E3D
--theme-text-on-dark: #FFF8E7
--theme-accent-rose: #9D6B7B
--theme-accent-gold: #E4C896
--theme-border-subtle: rgba(0, 0, 0, 0.08)
--theme-border-medium: rgba(255, 255, 255, 0.12)
--theme-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12)
```

##### Typography
```css
/* Brand Logos */
font-family: 'Montserrat', sans-serif
font-size: 0.875rem
letter-spacing: 2.5px
text-transform: uppercase
font-weight: 600

/* Quote Text */
font-family: 'Playfair Display', serif
font-size: 1.875rem
line-height: 1.6
font-weight: 400

/* Highlights */
font-style: italic
font-weight: 500
```

### Layout Behavior

#### Responsive Design
- **Desktop (>1024px)**: Horizontal brand logos, 1.875rem quote
- **Tablet (<1024px)**: Smaller gaps, 1.75rem quote
- **Mobile (<768px)**: 1.5rem quote, reduced spacing
- **Small Mobile (<480px)**: Vertical brand stack, 1.25rem quote

#### Special Features
- **Glass Morphism**: `backdrop-filter: blur(18px) saturate(180%)`
- **Noise Texture**: SVG turbulence filter at 3% opacity
- **Gradient Overlays**: Subtle top/bottom gradients
- **Hover Effects**: Brands lift and change color on hover
- **Dynamic Highlights**: Placeholders replaced with styled spans

### Visual Effects

#### Layered Background
1. **Base**: Rose tinted background from Section
2. **Borders**: Top/bottom 1px borders
3. **Gradient Overlay** (::before): Subtle vertical gradient
4. **Noise Texture** (::after): SVG turbulence for texture
5. **Backdrop Blur**: Glass effect with 180% saturation

### Performance Considerations
- Inline SVG for noise texture (no network request)
- CSS-based hover effects (no JavaScript)
- Simple text replacement for highlights
- Minimal component with no external dependencies

## Theme Variations - BrandProof

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Background & Borders */
background: tint-rose (from Section)
border-color: rgba(0, 0, 0, 0.08)
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12)

/* Brand Logos */
.logo {
  color: #6B4E3D;
  font-weight: 600;
}

.logo:hover {
  color: #E4C896;  /* Gold on hover */
  transform: translateY(-2px) scale(1.05);
}

/* Quote Text */
.quoteText {
  color: #6B4E3D;
  font-family: 'Playfair Display';
}

/* Highlights */
.highlight {
  color: #9D6B7B;  /* Rose accent */
  font-style: italic;
}

.highlight:hover {
  color: #E4C896;  /* Gold on hover */
}

/* Glass Effect */
backdrop-filter: blur(18px) saturate(180%);
```

#### Dark Mode
```css
/* Background & Borders */
background: var(--surface-3, #4A3A2A)
border-color: rgba(255, 255, 255, 0.12)

/* Brand Logos */
.logo {
  color: #FFF8E7;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.logo:hover {
  color: #F0D9A8;  /* Brighter gold */
}

/* Quote Text */
.quoteText {
  color: #FFF8E7;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

/* Highlights */
.highlight {
  color: #D89BAE;  /* Lighter rose for contrast */
}

.highlight:hover {
  color: #F0D9A8;  /* Brighter gold */
}
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default)
```css
/* Color Palette */
--accent-rose: #9D6B7B        /* Highlight color */
--accent-gold: #E4C896        /* Hover accent */

/* Typography */
font-family: 'Playfair Display'  /* Elegant serif for quote */
font-family: 'Montserrat'        /* Clean sans for brands */
font-style: italic               /* Romantic emphasis */

/* Visual Style */
- Rose-tinted background (tint-rose)
- Glass morphism with high blur
- Smooth hover transitions (0.3s ease)
- Letter spacing for elegance
- Warm color temperature
- Soft noise texture
```

#### Modern Brand
```css
/* Color Palette (projected) */
--accent-brass: #B8956F       /* Brass replaces rose */
--accent-stone: #8B8B8B       /* Stone gray accents */

/* Typography Changes */
font-family: system-ui         /* System font for brands */
font-family: 'Georgia'         /* Simpler serif for quote */
No italics on highlights       /* Cleaner emphasis */

/* Visual Style Adjustments */
- Surface or neutral background
- Less blur, more contrast
- Faster transitions (0.2s)
- Reduced letter spacing
- No noise texture
- Cooler, more minimal feel
```

### Special Design Elements

#### Glass Morphism Stack
1. **Base blur**: 18px blur with 180% saturation
2. **Gradient overlay**: Subtle vertical light/dark
3. **Noise texture**: 3% opacity turbulence
4. **Border definition**: 1px top/bottom borders
5. **Shadow depth**: Large soft shadow

#### Typography Hierarchy
1. **Brands**: Small caps effect via uppercase + letter spacing
2. **Quote**: Large serif for authority
3. **Highlights**: Italic + color for emphasis

### Background Variant Options

The BrandProof component hardcodes these settings:
- **`background='tint-rose'`** - Warm romantic tint (default)
- `paddingY='md'` - Compact vertical spacing
- `container='wrapper'` - Standard content width

Could potentially support via Storyblok:
1. **`surface`** - Clean neutral
2. **`tint-sage`** - Natural green tint
3. **`dark-gradient`** - Luxury gradient

---

## HistoryCarousel Section

### ⚠️ IMPORTANT ADDENDUM
**This section is an outlier in the codebase.** The analysis below is for the standalone `HistoryCarousel.tsx` which exists but is NOT used. The actual implementation uses `HistoryCarouselEditor.tsx` which:
- ✅ **HAS full Storyblok integration** (accepts blok prop)
- ✅ Maps to `history_carousel` in component map
- ✅ Accepts configurable text fields (`script_accent`, `section_title`, `lead_text`)
- ❌ Uses inline styled-jsx instead of CSS modules (hotfix pattern)
- ❌ Uses "hotfix-" prefixed class names throughout
- ❌ Has 31 hardcoded local images at `/images/history/`
- ❌ Contains 837 lines with embedded styles

**The analysis below is preserved for reference but does NOT reflect the actual implementation in use.**

---

### Component Hierarchy (Unused HistoryCarousel.tsx)
```
HistoryCarousel (Feature Component) - /src/features/HistoryCarousel.tsx
  └── NO Section wrapper - custom implementation
       ├── Header (script accent, title, lead)
       ├── Carousel viewport with slides
       ├── Navigation controls
       ├── Progress dots
       └── Slide counter
```

### Storyblok Integration (Unused Component)

**⚠️ NO STORYBLOK INTEGRATION** - The standalone component has hardcoded data and no `blok` prop.

#### Hardcoded Data (Unused Component)
```javascript
const slides = [
  { year: '2010', title: 'The Beginning', description: '...', image: 'storyblok URL' },
  { year: '2015', title: 'Expansion & Growth', description: '...', image: 'storyblok URL' },
  { year: '2018', title: 'Award Recognition', description: '...', image: 'storyblok URL' },
  { year: '2024', title: 'A Decade of Love', description: '...', image: 'storyblok URL' }
]
```

### Legacy CSS Patterns Identified

#### 1. **Full-Width Breakout Hack**
```css
.history {
  width: 100vw;
  max-width: none;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}
```
**Issue**: Uses negative margin trick instead of Section component's container system

#### 2. **Manual Container Implementation**
```css
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;  /* Hardcoded gutters */
}
```
**Issue**: Recreates wrapper functionality that Section provides

#### 3. **Hardcoded Padding Values**
```css
.history {
  padding: 100px 0;  /* Fixed instead of responsive */
}
```
**Issue**: Not using standardized `--pad-section-*` variables

#### 4. **Inline Styles in JSX**
```jsx
style={{
  transform: `translateX(-${currentSlide * 100}%)`,
  transition: 'transform 0.5s ease-in-out'
}}
```
**Issue**: Animation logic mixed with markup instead of CSS classes

#### 5. **Inconsistent Spacing Units**
```css
margin-bottom: 4rem;   /* Using rem */
padding: 100px 0;      /* Using px */
gap: 0.75rem;         /* Using rem */
```
**Issue**: Not using consistent `--space-*` variables

#### 6. **Direct Color Values**
```css
rgba(0, 0, 0, 0.60)  /* Hardcoded black overlays */
rgba(107, 78, 61, 0.6)  /* Hardcoded brand color */
```
**Issue**: Not always using theme variables

### Section Spacing & Container Structure

#### Current Structure (Non-Standard)
1. **History Section** (`.history`)
   - Fixed padding: `100px 0` (not responsive)
   - Full viewport width hack
   - Background directly applied

2. **Content Container** (`.content`)
   - Max-width: 1200px (matches standard)
   - Padding: `0 2rem` (hardcoded)
   - Manual centering with margin auto

3. **Carousel Structure**
   - Viewport: overflow hidden container
   - Container: flex display with translateX
   - Slides: `flex: 0 0 100%` for sizing

#### Spacing Variables Used
```css
/* Mixed Units - Not Standardized */
padding: 100px 0              /* Fixed section padding */
padding: 0 2rem               /* Content gutters */
margin-bottom: 4rem           /* Header spacing */
margin-top: 3rem              /* Carousel spacing */
gap: 0.75rem                  /* Dots gap */
padding: 2rem                 /* Text overlay padding */

/* Should use: */
--pad-section-lg
--wrapper-gutter
--space-64, --space-48, etc.
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/HistoryCarousel.module.css`** (409 lines)
   - All component styles
   - Full-width breakout hack
   - Glass morphism effects
   - Dark mode overrides
   - No Section.module.css integration

#### Missing Standard Integration
- No `Section` component wrapper
- No `ExperienceLayout` or similar wrapper
- Direct implementation without abstraction

### Layout Behavior

#### Responsive Design
- **Desktop**: 100px vertical padding, 60px nav buttons
- **Tablet (<1024px)**: 50px nav buttons, smaller fonts
- **Mobile (<768px)**: 80px padding, 1rem content padding
- **Small Mobile (<480px)**: 60px padding only

#### Special Features
- **Glass Morphism Navigation**: 60% opacity with blur
- **Badge Year Indicator**: Gold pill with shadow
- **Gradient Overlay**: 4-stop gradient on images
- **Autoplay Toggle**: Play/pause control
- **Progress Dots**: Scale animation on active
- **Slide Counter**: Shows current/total

### Performance Considerations
- Priority loading only for current slide
- CSS transitions for smooth sliding
- Inline styles for dynamic transform
- No lazy loading for non-visible slides
- Heavy use of backdrop-filter (performance cost)

## Theme Variations - HistoryCarousel

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Background */
background: #FFFCF8

/* Typography */
.script { color: #9D6B7B }
.title { color: #6B4E3D }
.lead { color: #6B4E3D; opacity: 0.8 }

/* Navigation Controls */
.nav {
  background: color-mix(in srgb, #FFFFFF 60%, transparent);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #6B4E3D;
}

.nav:hover {
  background: #9D6B7B;
  color: #FFF8E7;
}

/* Year Badge */
.badge span {
  background: #E4C896;
  color: #6B4E3D;
}

/* Image Gradient */
.gradient {
  background: linear-gradient(to top,
    rgba(0, 0, 0, 0.60) 0%,
    rgba(0, 0, 0, 0.22) 50%,
    rgba(0, 0, 0, 0.06) 80%,
    transparent 100%);
}

/* Progress Dots */
.dot {
  background: rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.dotActive {
  background: #9D6B7B;
  transform: scale(1.25);
}
```

#### Dark Mode
```css
/* Background */
background: #2C2416

/* Typography */
.script { color: #D89BAE }
.title { color: #F5E6D3 }
.lead { color: #E8D4BC }

/* Navigation Controls */
.nav {
  background: color-mix(in srgb, #3D2F22 75%, transparent);
  color: #F5E6D3;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* Year Badge */
.badge span {
  background: #F0D9A8;
  color: #1A1410;
}

/* Image Gradient - Much Darker */
.gradient {
  background: linear-gradient(to top,
    rgba(10, 8, 6, 0.92) 0%,
    rgba(20, 16, 13, 0.75) 45%,
    rgba(26, 20, 16, 0.40) 75%,
    transparent 100%);
}

/* Progress Dots */
.dot {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.08);
}

.dotActive {
  background: #D89BAE;
}

/* Image Border */
.imageWrapper {
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default - Implied)
```css
/* Typography */
font-family: 'Dancing Script'    /* Script accent */
font-family: 'Playfair Display'  /* Title */
font-family: 'Montserrat'        /* Body text */

/* Visual Style */
- Glass morphism on controls
- Smooth animations (0.3s ease)
- Rose accent colors
- Gold year badges
- Rounded elements (border-radius: 9999px)
```

#### Modern Brand (Projected)
Would require updates for:
- Remove Dancing Script
- Use system fonts
- Replace rose with brass
- Replace gold with stone
- Sharper corners
- Faster transitions

### Issues to Address

#### 1. **Section Integration**
Should wrap in Section component:
```jsx
<Section
  paddingY="lg"
  background="surface"
  container="wrapper"
>
  {/* Carousel content */}
</Section>
```

#### 2. **Storyblok Connection**
Add blok prop and interface:
```typescript
interface HistoryCarouselBlok {
  slides?: Array<{
    year: string
    title: string
    description: string
    image: AssetStoryblok
  }>
  autoplay?: boolean
  show_counter?: boolean
}
```

#### 3. **Spacing Standardization**
Replace hardcoded values:
```css
/* From: */
padding: 100px 0;
margin-bottom: 4rem;

/* To: */
padding: var(--pad-section-lg) 0;
margin-bottom: var(--space-64);
```

#### 4. **Remove Inline Styles**
Move transform logic to CSS:
```css
.container[data-slide="0"] { transform: translateX(0); }
.container[data-slide="1"] { transform: translateX(-100%); }
/* Or use CSS custom properties */
```

### Legacy Pattern Summary

This component exhibits several legacy patterns:
1. **No Section wrapper** - Custom implementation
2. **No Storyblok integration** - Hardcoded data
3. **Full-width hack** - Uses negative margins
4. **Mixed units** - px, rem, no variables
5. **Inline styles** - Animation in JSX
6. **Manual container** - Recreates wrapper
7. **Inconsistent theming** - Some hardcoded colors

Recommended for refactoring to align with modern component patterns.

---

## "Plan Your Visit / Schedule a Tour" Section (ScheduleForm)

### Component Hierarchy
```
ScheduleForm (Feature Component) - /src/features/ScheduleForm.tsx
  └── NO Section wrapper - custom implementation
       ├── Header (script accent, title, description)
       └── Form (contact fields, date picker, message)
```

### Storyblok Integration

#### Data Flow
1. **Page Loading**: `src/app/page.tsx` fetches "home" story from Storyblok API
2. **Component Mapping**: Via `src/lib/storyblok-component-map.ts`, `schedule_form` maps to `ScheduleForm` component
3. **Props Interface**: `ScheduleFormStoryblok` interface defines the data structure

#### Configurable Props from Storyblok
```typescript
interface ScheduleFormStoryblok extends SbBlokData {
  title?: string         // Default: "Schedule a Tour"
  subtitle?: string      // Default: "Plan Your Visit" 
  description?: string   // Default: "Experience the magic of Rum River Barn..."
  submit_text?: string   // Default: "Schedule Your Tour"
}
```

### Legacy CSS Patterns Identified

#### 1. **Full-Width Breakout Hack (Again)**
```css
.scheduleTour {
  width: 100vw;
  max-width: none;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}
```
**Issue**: Uses negative margin trick instead of Section component's container system

#### 2. **Animated Background Effect**
```css
.scheduleTour::before {
  background: radial-gradient(circle, ...);
  animation: rotate 30s linear infinite;
}
```
**Issue**: Performance-heavy continuous animation

### Section Spacing & Container Structure

#### Current Structure (Non-Standard)
1. **Schedule Tour Section** (`.scheduleTour`)
   - Padding: `clamp(var(--space-56), 6vw, var(--space-96)) 0`
   - Full viewport width hack
   - Gradient background with animated radial overlay

2. **Form Container** (`.formContainer`)
   - Max-width: 800px (narrower than standard)
   - Padding: `0 var(--gutter)`
   - Manual centering with margin auto

3. **Form Card** (`.tourForm`)
   - Background: white card on gradient
   - Padding: `var(--space-48)` 
   - Border-radius: 20px
   - Box-shadow for depth

#### Spacing Variables Used
```css
/* Good - Uses CSS Variables */
padding: clamp(var(--space-56), 6vw, var(--space-96)) 0
margin-bottom: clamp(var(--space-32), 4vw, var(--space-48))
padding: var(--space-48)
gap: var(--space-32)

/* Component Spacing */
--space-8: 0.5rem
--space-12: 0.75rem
--space-16: 1rem
--space-20: 1.25rem
--space-32: 2rem
--space-40: 2.5rem
--space-48: 3rem
--space-56: 3.5rem
--space-64: 4rem
--space-80: 5rem
--space-96: 6rem
--gutter: (side padding)
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/ScheduleForm.module.css`** (278 lines)
   - Component-specific styles
   - Full-width breakout hack
   - Animated radial gradient
   - Form styling with hover effects
   - Dark mode overrides

#### Missing Standard Integration
- No `Section` component wrapper
- No layout wrapper like other sections
- Direct implementation without abstraction

### Layout Behavior

#### Responsive Design
- **Desktop**: 2-column form fields, 48px padding
- **Tablet (<768px)**: Single column, 32px padding
- **Mobile (<480px)**: 20px padding, smaller fonts

#### Special Features
- **Animated Gradient**: Rotating radial gradient background
- **Form Card**: Floating white card with shadow
- **Gold Border Focus**: Focus states with gold accents
- **Submit Button Animation**: Shimmer effect on hover
- **Script Typography**: Dancing Script for subtitle

### Visual Effects

#### Form Styling
- **Inputs**: 2px gold-tinted borders, 12px radius
- **Focus States**: 3px gold shadow ring
- **Submit Button**: Rose background, pill shape, hover lift
- **Placeholder**: Muted text color

### Performance Considerations
- Continuous CSS animation (30s rotation)
- No actual form submission logic (console.log only)
- Client-side component ('use client')
- Heavy box-shadows on card

## Theme Variations - Schedule Form

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Background */
background: linear-gradient(135deg, #F4E4E1 0%, #FFF8E7 100%)

/* Form Card */
.tourForm {
  background: #FFFCF8;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

/* Typography */
.formScript { color: #E4C896 }  /* Gold */
.formTitle { color: #6B4E3D }   /* Brown */
.formDescription { color: #7B5E4E }  /* Lighter brown */

/* Form Fields */
.formInput {
  border: 2px solid color-mix(#E4C896 30%, transparent);
  background: #FFFCF8;
  color: #2C2416;
}

.formInput:focus {
  border-color: #E4C896;
  box-shadow: 0 0 0 3px color-mix(#E4C896 20%, transparent);
}

/* Submit Button */
.formSubmit {
  background: #9D6B7B;  /* Rose */
  color: #FFF8E7;
  border: 2px solid #9D6B7B;
}

.formSubmit:hover {
  background: #3D2F22;  /* Dark brown */
  box-shadow: 0 8px 25px color-mix(#9D6B7B 40%, transparent);
}
```

#### Dark Mode
```css
/* Background */
background: linear-gradient(135deg, var(--surface-2), var(--surface-1))

/* Form Card */
.tourForm {
  background: color-mix(in oklch, var(--surface-1) 80%, white 20%);
  backdrop-filter: blur(12px) saturate(1.12);
  border: 1px solid color-mix(in oklch, #E4C896 35%, transparent);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.60);
}

/* Typography */
.formLabel { color: #F5E6D3 }

/* Form Fields */
.formInput {
  background: #2C2416;
  border-color: rgba(255,255,255,0.12);
  color: #F5E6D3;
}

.formInput:focus {
  border-color: #F0D9A8;
  background: #3D2F22;
}

/* Placeholder */
::placeholder {
  color: rgba(245, 230, 211, 0.5);
}
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default)
```css
/* Typography */
font-family: 'Dancing Script'    /* Script subtitle */
font-family: 'Playfair Display'  /* Serif title */
font-family: 'Montserrat'        /* Sans for form */

/* Visual Style */
- Gradient background (rose to cream)
- Animated radial gold accent
- Rounded corners (20px card, 12px inputs)
- Rose submit button
- Smooth transitions (0.3s ease)
- Letter spacing on labels
```

#### Modern Brand (Projected)
Would require updates for:
- Remove Dancing Script
- Use system fonts
- Replace rose/gold with brass/stone
- Sharper corners (8-12px)
- Remove animation
- Flat backgrounds
- Faster transitions

### Issues to Address

#### 1. **Section Integration**
Should wrap in Section component:
```jsx
<Section
  paddingY="lg"
  background="tint-rose"
  container="wrapper"
>
  {/* Form content */}
</Section>
```

#### 2. **Form Functionality**
Currently non-functional:
```javascript
// Form submission logic would go here
console.log('Form submitted:', formData);
```
Needs actual submission handling, validation, success/error states

#### 3. **Performance**
Remove or make optional the continuous animation:
```css
animation: rotate 30s linear infinite; /* Heavy */
```

#### 4. **Accessibility**
- Add proper ARIA labels
- Error message handling
- Required field indicators beyond just *

### Summary

This section exhibits legacy patterns similar to HistoryCarousel:
1. **No Section wrapper** - Custom implementation
2. **Full-width hack** - Uses negative margins
3. **Performance issues** - Continuous animation
4. **Non-functional form** - No real submission
5. **Mixed patterns** - Some CSS variables, some not

The form styling is well-executed but needs infrastructure improvements for production use.

---

## "Visit Rum River Barn" Section (Map)

### Component Hierarchy
```
Map (Feature Component) - /src/features/Map.tsx
  └── Section (Base UI Component) - /src/components/ui/Section.tsx
       ├── Header (script accent, title, lead)
       └── Content (map grid with location items)
```

### Storyblok Integration

#### Data Flow
1. **Page Loading**: `src/app/page.tsx` fetches "home" story from Storyblok API
2. **Component Mapping**: Via `src/lib/storyblok-component-map.ts`, `map` component
3. **Props Interface**: `MapStoryblok` interface defines the data structure

#### Configurable Props from Storyblok
```typescript
interface MapStoryblok extends SbBlokData {
  title?: string              // Default: "Visit Rum River Barn"
  subtitle?: string           // Default: "Find Us"
  description?: string        // Default: "Located in the heart of Minnesota..."
  locations?: Array<{
    icon?: string            // Icon key: 'map', 'clock', 'phone', 'email', 'home', 'cake'
    title?: string           // Location title
    description?: string     // Location description
  }>
  map_embed_url?: string     // Google Maps embed URL
}
```

#### Fallback Data
- 6 default location items (Address, Hours, Phone, Email, Indoor/Outdoor, Catering)
- Default Google Maps embed URL (generic coordinates)

### Section Spacing & Container Structure

#### ✅ PROPERLY USES SECTION WRAPPER
This component correctly uses the Section component!

1. **Section Component** (`src/components/ui/Section.tsx`)
   - Properly wrapped with Section
   - Uses `paddingY="lg"` - standard spacing
   - Background: `surface` (clean neutral)
   - Container: `wrapper` (1200px max)

2. **Map Content Grid** (`.mapContentGrid`)
   - Custom 3-column grid: `1fr min-content 1fr`
   - Center column: 650px circular map
   - Side columns: location info items
   - Complex nth-child positioning

#### Unique Grid Layout
```css
/* 3x3 Grid with centered map */
grid-template-columns: 1fr min-content 1fr;
grid-template-rows: repeat(3, calc(var(--map-size) / 3));

/* Items 1-3: Left side, right-aligned */
.locationItem:nth-child(-n+3) {
  grid-column: 1;
  flex-direction: row-reverse;
  text-align: right;
}

/* Item 4: Center map */
.mapEmbed {
  grid-column: 2;
  grid-row: 1 / 4;
}

/* Items 5-7: Right side, left-aligned */
.locationItem:nth-child(n+5) {
  grid-column: 3;
  flex-direction: row;
  text-align: left;
}
```

#### Spacing Variables Used
```css
/* Good - Uses CSS Variables */
--map-size: 650px
--flush-offset: -12px
--space-8: 0.5rem
--space-16: 1rem
--space-32: 2rem
--space-64: 4rem

/* Component Spacing */
padding: var(--space-64) 0      /* Grid padding */
gap: var(--space-16)            /* Icon to text gap */
margin-bottom: var(--space-8)   /* Title margin */
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/Map.module.css`** (249 lines)
   - Component-specific styles
   - Complex grid positioning
   - Circular map embed
   - Hover effects
   - Dark mode overrides

2. **`src/components/ui/Section.module.css`** (157 lines)
   - Base section layout and spacing
   - Background variants
   - Header typography
   - Container width control

### Layout Behavior

#### Responsive Design
- **Desktop**: 3-column grid with 650px circular map
- **Tablet (<1024px)**: Single column, 400px map
- **Mobile (<768px)**: 350px map
- **Small Mobile (<480px)**: 300px map

#### Special Features
- **Circular Map**: `border-radius: 50%` on iframe container
- **Symmetrical Layout**: Items mirror on left/right sides
- **Flush Offset**: `-12px` offset for visual alignment
- **Hover Effects**: Items lift with `translateY(-4px)`
- **Icon System**: Uses Heroicons with dynamic mapping
- **Map Overlay**: 50% opacity overlay for branding

### Visual Effects

#### Map Styling
```css
.mapEmbed {
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.mapEmbed::after {
  /* Semi-transparent overlay */
  background: color-mix(in srgb, #FFFCF8 50%, transparent);
}
```

#### Location Items
- Icons: 28px Heroicons with rose color
- Hover: Icon scales, item lifts
- Text: Montserrat font family
- Alignment: Contextual based on position

### Performance Considerations
- Lazy loading iframe: `loading="lazy"`
- Icon components dynamically imported
- Proper Section wrapper (no full-width hack!)
- CSS Grid for complex layout

## Theme Variations - Visit Rum River Barn

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Typography */
.locationText h4 { color: #6B4E3D }
.locationText p { color: #6B4E3D; opacity: 0.75 }

/* Icons */
.icon {
  color: #9D6B7B;  /* Rose accent */
}

.locationItem:hover .icon {
  color: #D89BAE;  /* Light rose */
}

/* Map Overlay */
.mapEmbed::after {
  background: color-mix(in srgb, #FFFCF8 50%, transparent);
}

/* Map Shadow */
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
```

#### Dark Mode
```css
/* Typography */
.locationText h4,
.locationText p {
  color: #F5E6D3;  /* Cream text */
}

/* Map Overlay - Darker */
.mapEmbed::after {
  background: color-mix(in srgb, #1A1410 50%, transparent);
}

/* Icons remain rose for contrast */
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default)
```css
/* Typography */
font-family: 'Montserrat', sans-serif

/* Visual Style */
- Circular map (unique design choice)
- Rose colored icons
- Soft shadows
- Smooth hover transitions (0.3s ease)
- Script accent in header
```

#### Modern Brand (Projected)
Would require updates for:
- Square map instead of circle
- Brass/stone icon colors
- System fonts
- Sharper shadows
- Faster transitions

### Unique Design Elements

#### Circular Map Design
The circular map is a distinctive design choice:
```css
border-radius: 50%;  /* Makes map circular */
width: 650px;
height: 650px;
```
This creates visual interest and differentiates from standard rectangular embeds.

#### Symmetrical Grid Layout
Location items are precisely positioned:
- Left items: Right-aligned with reversed flex
- Right items: Left-aligned with normal flex
- Creates balanced composition around central map

#### Dynamic Icon Mapping
```typescript
const iconMap = {
  map: MapPinIcon,
  clock: ClockIcon,
  phone: PhoneIcon,
  email: EnvelopeIcon,
  home: HomeIcon,
  cake: CakeIcon
}
```
Allows Storyblok to control which icons appear.

### Best Practices Demonstrated

This section shows several good patterns:

1. **✅ Proper Section wrapper** - No full-width hack needed
2. **✅ CSS Variables** - Consistent spacing
3. **✅ Storyblok integration** - Full prop support
4. **✅ Fallback data** - Sensible defaults
5. **✅ Responsive design** - Graceful degradation
6. **✅ Accessibility** - Proper iframe title
7. **✅ Performance** - Lazy loading

### Summary

The Map section is well-implemented with:
- **Proper Section usage** (unlike Schedule Form and HistoryCarousel)
- **Creative circular design** for visual interest
- **Complex but maintainable** grid layout
- **Good Storyblok integration** with fallbacks
- **Consistent theming** with CSS variables

This is one of the better-structured sections in the codebase, demonstrating how components should ideally be built.

---

## "Discover Our Spaces" Section

### Component Hierarchy
```
Spaces (Feature Component) - /src/features/Spaces.tsx
  └── SpacesLayout (Layout Wrapper) - /src/features/SpacesLayout.tsx
       └── Section (Base UI Component) - /src/components/ui/Section.tsx
            ├── Header (script accent, title, lead)
            └── Content (venue tabs, carousel, details)
```

### Storyblok Integration

#### Data Flow
1. **Page Loading**: `src/app/page.tsx` fetches "home" story from Storyblok API
2. **Component Mapping**: Via `src/lib/storyblok-component-map.ts`, `spaces_section` maps to `Spaces` component
3. **Props Interface**: `SpacesStoryblok` interface defines the data structure

#### Configurable Props from Storyblok
```typescript
interface SpacesStoryblok {
  title?: string                    // Default: "Discover Our Spaces"
  subtitle?: string                  // Default: "Your Perfect Setting"
  script_accent?: string             // Overrides subtitle if provided
  description?: string               // Default: "Every corner tells a story..."
  background_variant?: 'surface' | 'tint-rose' | 'tint-sage' | 'dark-gradient'  // Default: 'tint-rose'
  theme_override?: 'auto' | 'light' | 'dark'  // Default: 'auto'
  padding_size?: 'sm' | 'md' | 'lg' | 'xl'    // Default: 'lg'
  spaces?: SpaceStoryblok[]         // Array of space data
}
```

#### Fallback Data
- Component includes hardcoded default spaces if Storyblok data is empty
- Default spaces: Historic Barn, Bridal Suite, Groom's Quarters, Garden Pavilion

### Section Spacing & Container Structure

#### Container Hierarchy
1. **Section Component** (`src/components/ui/Section.tsx`)
   - Base container with padding and background
   - Default padding: `padding-block: var(--section-y, clamp(48px, 7vw, 120px))`
   - Responsive: min 48px, preferred 7vw, max 120px

2. **Wrapper Element** (`.wrapper` class)
   - Controls content width and gutters
   - Default: `--wrapper-max: 1200px`
   - Gutter: `--wrapper-gutter: clamp(50px, 5vw, 80px)`
   - Centers content with `margin: 0 auto`

3. **SpacesLayout Configuration**
   - Sets `useContentWrapper = true` by default (1200px max width)
   - Applies `paddingY = 'lg'` (large vertical padding)
   - Background: `tint-rose` by default

#### Spacing Variables Used
```css
/* Section Level */
--section-y: clamp(48px, 7vw, 120px)  /* Vertical section padding */

/* Content Spacing (from Spaces.module.css) */
--space-8: 0.5rem
--space-12: 0.75rem
--space-16: 1rem
--space-20: 1.25rem
--space-24: 1.5rem
--space-32: 2rem

/* Header Spacing */
margin-bottom: clamp(2rem, 4vw, 3rem)  /* Space below header */
```

### CSS Files & Style Control

#### Primary Style Files
1. **`src/features/Spaces.module.css`** (247 lines)
   - Component-specific styles
   - Tab navigation, carousel, feature grid
   - Dark mode overrides
   - Variables: spacing, transitions, colors

2. **`src/components/ui/Section.module.css`** (157 lines)
   - Base section layout and spacing
   - Background variants
   - Header typography
   - Container width control

3. **`src/features/SpacesLayout.tsx`** (inline configuration)
   - Props-based styling
   - Background, tone, padding configuration
   - Passes through to Section component

#### CSS Variables & Design Tokens

##### Theme Colors
```css
--theme-accent-rose: #9D6B7B
--theme-accent-gold: #E4C896
--theme-bg-primary: #FFFCF8
--theme-bg-card: #FFFFFF
--theme-text-primary: #6B4E3D
--theme-text-secondary: #666
--theme-border-subtle: rgba(0,0,0,0.08)
--theme-border-medium: rgba(0,0,0,0.15)
--theme-shadow-sm: 0 25px 50px rgba(0, 0, 0, 0.3)
--theme-shadow-lg: 0 30px 60px rgba(0, 0, 0, 0.35)
```

##### Typography
```css
--font-script: 'Dancing Script', cursive
--font-serif: 'Playfair Display', serif
--font-sans: system-ui, sans-serif
```

##### Dark Mode Adjustments
- Image overlay: Changed to 80% opacity with `mix-blend-mode: multiply`
- Image filter: `brightness(0.85) contrast(1.1)`
- Text colors switch to light variants
- Borders use white with low opacity

### Layout Behavior

#### Responsive Design
- **Desktop**: 2-column grid (image + details)
- **Mobile (<768px)**: Single column stack
- **Image height**: 400px desktop, 250px mobile
- **Features grid**: 2 columns desktop, 1 column mobile

#### Container Constraints
- Max content width: 1200px (configurable)
- Side gutters: clamp(50px, 5vw, 80px)
- Section padding: clamp(48px, 7vw, 120px)
- Header max-width: 900px (centered)

### Interactive Features
- Tab navigation between spaces
- Image carousel with prev/next arrows
- Hover effects on tabs and images
- Smooth transitions (0.3s ease)

### Visual Editing Support
- `storyblokEditable(blok)` enables visual editor
- Real-time preview updates
- Component mapping via `cleanComponentMap`

### Performance Considerations
- Images use Next.js `Image` component with optimization
- Priority loading on main carousel image
- CSS modules for scoped styles
- Minimal JavaScript for interactivity

## Theme Variations

### Light/Dark Mode Variations

#### Light Mode (Default)
```css
/* Component Colors */
--theme-accent-rose: #9D6B7B       /* Rose accent for script text */
--theme-accent-gold: #E4C896       /* Gold for highlights */
--theme-bg-primary: #FFFCF8        /* Warm off-white background */
--theme-bg-card: #FFFFFF           /* White card backgrounds */
--theme-text-primary: #6B4E3D      /* Dark brown text */
--theme-text-secondary: #666       /* Gray secondary text */

/* Borders & Shadows */
--theme-border-subtle: rgba(0,0,0,0.08)
--theme-border-medium: rgba(0,0,0,0.15)
--theme-shadow-sm: 0 25px 50px rgba(0, 0, 0, 0.3)
--theme-shadow-lg: 0 30px 60px rgba(0, 0, 0, 0.35)

/* Image Overlay */
.venueMainImage::after {
  background: linear-gradient(135deg,
    rgba(44,36,22,0.12),     /* 12% brown tint */
    rgba(107,78,61,0.08),    /* 8% medium brown */
    rgba(58,74,60,0.10));    /* 10% sage */
}

/* Tab Styling */
.venueTab {
  background: color-mix(in srgb, #FFFFFF 10%, transparent);
  border: 1px solid rgba(0,0,0,0.08);
  color: #6B4E3D;
}

.venueTab.active {
  background: color-mix(in srgb, #9D6B7B 22%, white 78%);
  border: 2px solid rgba(0,0,0,0.15);
}
```

#### Dark Mode
```css
/* Component Colors */
--theme-accent-rose: #D89BAE       /* Lighter rose for dark mode */
--theme-accent-gold: #F0D9A8       /* Brighter gold */
--theme-bg-primary: #1A1410        /* Deep brown background */
--theme-bg-card: #3D2F22           /* Dark brown cards */
--theme-text-primary: #F5E6D3      /* Cream text */
--theme-text-secondary: #E8D4BC    /* Light tan secondary */

/* Borders & Shadows */
--theme-border-subtle: rgba(255,255,255,0.08)
--theme-border-medium: rgba(255,255,255,0.15)
--theme-shadow-dark-sm: 0 25px 50px rgba(0, 0, 0, 0.6)
--theme-shadow-dark-lg: 0 30px 60px rgba(0, 0, 0, 0.7)

/* Image Treatment */
.venueMainImage img {
  filter: brightness(0.85) contrast(1.1);  /* Subtle darkening */
}

.venueMainImage::after {
  background: linear-gradient(135deg,
    rgba(10,8,6,0.8),        /* 80% opacity dark overlay */
    rgba(26,20,16,0.8),
    rgba(15,12,10,0.8));
  mix-blend-mode: multiply;  /* Natural blending */
}

/* Tab Styling */
.venueTab {
  background: color-mix(in srgb, #3D2F22 10%, transparent);
  border: 1px solid rgba(255,255,255,0.08);
  color: #F5E6D3;
}

.venueTab.active {
  background: color-mix(in srgb, #D89BAE 14%, transparent);
  color: #FFF8E7;
  border: 1px solid rgba(255,255,255,0.15);
}
```

### Romantic/Modern Brand Variations

#### Romantic Brand (Default)
```css
/* Color Palette */
--accent-rose: #9D6B7B        /* Dusty rose */
--accent-gold: #E4C896        /* Warm gold */
--accent-sage: #7B9D8B        /* Sage green */

/* Typography */
--font-script: 'Dancing Script', cursive    /* Flowing script */
--font-serif: 'Playfair Display', serif     /* Elegant serif */

/* Section Backgrounds */
background: 'tint-rose'        /* Default warm rose tint */

/* Visual Style */
- Soft gradients with warm overlay tints
- Rounded corners (20px border-radius)
- Elegant transitions (0.3s ease)
- Script accents for headers
- Warm color temperature throughout
```

#### Modern Brand
```css
/* Color Palette (from theme.css) */
--accent-brass: #B8956F       /* Modern brass replaces rose/gold */
--accent-stone: #8B8B8B       /* Cool stone gray replaces sage */
--accent-ink: #2C2C2C         /* Deep ink black */

/* Typography */
--font-sans: system-ui, sans-serif         /* Clean sans-serif */
--font-serif: 'Georgia', serif             /* Simplified serif */

/* Component Overrides */
--theme-accent-rose: var(--accent-brass)   /* Brass instead of rose */
--theme-accent-gold: var(--accent-brass)   /* Unified brass accent */
--theme-accent-sage: var(--accent-stone)   /* Stone gray accent */

/* Section Backgrounds */
--bg-surface: #F8F8F8         /* Cooler neutral gray */
--bg-tint-rose: color-mix(in oklch, #F8F8F8 88%, #B8956F 12%)  /* Brass tint */
--bg-tint-sage: color-mix(in oklch, #F8F8F8 88%, #8B8B8B 12%)  /* Stone tint */

/* Visual Style */
- Minimal gradients, flatter design
- Sharper corners possible
- Faster transitions (0.2s)
- No script fonts
- Cooler, more neutral color temperature
```

### Background Variant Options

The SpacesLayout component supports these background variants via Storyblok:

1. **`surface`** - Clean neutral background
2. **`tint-rose`** - Warm romantic rose tint (default)
3. **`tint-sage`** - Natural sage green tint
4. **`dark-gradient`** - Dark gradient for luxury feel

Each variant automatically adjusts text colors and shadows for optimal contrast.

---

## 11. Frequently Asked Questions (FAQ Section)
**File**: `/src/features/FAQ.tsx` + `FAQ.module.css`

### Component Hierarchy
```
Section (wrapper - PROPER USAGE!)
└── .faqContent
    └── .faqList
        └── .item (multiple)
            ├── .question (button)
            │   ├── h3 (question text)
            │   └── .toggle (arrow indicator)
            └── .answer
                └── .answerBody (rich text)
```

### Storyblok Props
**Flexible field detection!**
- `title` (default: "Frequently Asked Questions")
- `subtitle` (default: "Everything You Need to Know")
- FAQ items array (multiple field names supported):
  - `faq_items`, `items`, `faqs`, `faq`, `accordion_items`
- Each item supports multiple field names:
  - Question: `question`, `title`, `heading`, `label`
  - Answer: `answer`, `rich_text`, `body`, `text`, `copy`, `description`

### CSS Architecture
**Clean Modern Approach**
- CSS Module with semantic classes
- CSS custom properties for spacing
- Smooth accordion animations
- No legacy patterns or hacks
- Proper focus states

### Spacing Control
- Section padding: `paddingY="lg"` via Section wrapper
- Question padding: `var(--density-stack, var(--space-xl))`
- Answer padding when open: `var(--density-stack, var(--space-xl))`
- Inline gap: `var(--gap-inline, var(--space-lg))`
- Paragraph spacing: `var(--gap-stack, var(--space-md))`

### CSS Variables Used
```css
/* Spacing */
--space-xl, --space-lg, --space-md
--density-stack, --gap-inline, --gap-stack

/* Colors */
--text-primary, --text-secondary
--accent-rose, --border-subtle

/* Typography */
--font-sans, --size-base, --line-loose

/* Animation */
--duration-fast (150ms)
--duration-normal (300ms)  
--duration-slow (400ms)

/* Focus */
--focus-width, --focus-ring, --focus-offset
```

### Theme Variations

#### Light Mode + Romantic
```css
--text-primary: #6B4E3D (warm brown)
--text-secondary: #7B5E4E (softer brown)
--accent-rose: #9D6B7B (dusty rose for toggle)
--border-subtle: rgba(0,0,0,0.08)
Soft transitions, elegant feel
```

#### Dark Mode + Romantic
```css
--text-primary: #F5E6D3 (warm cream)
--text-secondary: rgba(245,230,211,0.8)
--accent-rose: #D89BAE (light rose)
--border-subtle: rgba(255,255,255,0.12)
Maintained warmth in dark theme
```

#### Light Mode + Modern
```css
Clean sans-serif typography
Minimal decoration
Sharp focus states
Fast animations (150ms)
```

#### Dark Mode + Modern
```css
High contrast text
Crisp borders
No ornamental elements
Efficient transitions
```

### Key Features
- ✅ Proper Section wrapper usage
- ✅ Full Storyblok integration with flexible field detection
- ✅ Rich text support via `renderRichText`
- ✅ Fallback content system
- ✅ Accessible ARIA attributes
- ✅ Auto-open first item on mount
- ✅ Smooth accordion animations
- ✅ Clean CSS architecture
- ✅ No full-width hacks or legacy patterns

### Notable Implementation Details
1. **Flexible Field Detection**: Searches multiple possible field names for compatibility
2. **Rich Text Handling**: Proper conversion of Storyblok rich text to HTML
3. **Fallback System**: Shows default FAQs if no content provided
4. **Accessibility**: Proper ARIA expanded/controls/live regions
5. **State Management**: Clean React hooks for accordion state
6. **Type Safety**: Loose typing with `Blok = Record<string, any>` for flexibility

---

## 12. Investment in Forever (Pricing Section)
**File**: `/src/features/Pricing.tsx` + `Pricing.module.css`

### Component Hierarchy
```
<section> (CUSTOM IMPLEMENTATION - No Section wrapper!)
└── .contentWrapper
    ├── .sectionHeader
    │   ├── .scriptAccent
    │   ├── .sectionTitle
    │   ├── .heroPricingLine
    │   └── .lead
    └── .pricingGrid
        └── .pricingCard (multiple)
            ├── .popularBadge (conditional)
            ├── .pricingHeader
            │   ├── .packageName
            │   └── .pricingDisplay
            │       ├── .weekendPrice
            │       └── .weekdayPrice
            ├── .featuresList
            └── .pricingActions
                ├── .ctaButton
                └── .linkButton
```

### Storyblok Props
**Main Block:**
- `script_accent` (default: "Investment in Forever")
- `title` (default: "Wedding Packages & Pricing")
- `hero_line` (default: pricing summary line)
- `description` (default: "Transparent pricing...")
- `tiers[]` - Array of pricing tiers

**Each Tier:**
- `name` - Package name
- `label` - Badge label
- `price` - Weekend price
- `weekday_price` - Weekday price
- `is_popular` - Boolean for highlighting
- `features[]` - Array of feature strings
- `cta_url` - Main CTA link
- `tour_url` - Secondary link

### CSS Architecture
**Mixed Approach - Some Issues**
- CSS Module with semantic classes
- NO Section wrapper usage ❌
- Custom container implementation
- Grid-based card layout
- Screen reader-only utility class
- Hover lift effects on cards

### Spacing Control
- Section padding: `clamp(3rem, 6vw, 6rem) 0`
- Content wrapper: `max-width: 1200px`
- Grid gap: `clamp(1rem, 3vw, 2rem)`
- Card padding: `clamp(1.25rem, 3vw, 1.75rem)`
- Header margin: `clamp(2rem, 6vw, 4rem)`

### CSS Variables Used
```css
/* Custom Pricing Variables */
--pricing-bg: #FFFFFF
--pricing-text: #2B2B2B
--price-accent: var(--accent-gold, #E4C896)
--pricing-card-bg: #FFFFFF
--pricing-card-border: rgba(0,0,0,.10)
--pricing-popular-bg: #FFF5D9
--pricing-cta-bg: #E4C896
--pricing-cta-text: #2C241A

/* Typography */
--font-script: 'Dancing Script', cursive
--font-serif: 'Playfair Display', serif

/* Spacing */
--space-2, --space-4, --space-8, --space-12, --space-16

/* Focus States */
--focus-width: 3px
--focus-ring: var(--price-accent)
--focus-offset: 3px
```

### Theme Variations

#### Light Mode + Romantic
```css
background: #FFFFFF
--price-accent: #E4C896 (gold)
Popular card: #FFF5D9 (warm yellow tint)
Soft shadows, elegant transitions
Script accent font
```

#### Dark Mode + Romantic
```css
background: var(--grad-section-soft)
Cards: Glass morphism with blur/saturate
Gold borders with glow effect
Popular card: Gold-tinted glass
Enhanced shadows for depth
```

#### Light Mode + Modern
```css
Clean card borders
Sharp shadows
No script fonts (use sans)
Faster transitions (160ms)
Minimal decoration
```

#### Dark Mode + Modern
```css
High contrast borders
Crisp glass effects
No glow effects
Efficient transitions
```

### Key Features
- ❌ NO Section wrapper usage
- ✅ Full Storyblok integration
- ✅ Responsive 3-column grid
- ✅ Popular tier highlighting
- ✅ Accessible ARIA labels
- ✅ Screen reader support
- ✅ Reduced motion support
- ⚠️ Custom container implementation

### Issues & Legacy Patterns
1. **No Section Wrapper**: Uses plain `<section>` instead of Section component
2. **Custom Container**: Implements own `.contentWrapper` instead of using Section's container
3. **Inline Padding**: Hardcoded padding instead of Section's paddingY prop
4. **Background Handling**: Custom background variable instead of Section's background prop
5. **Inconsistent Spacing**: Mix of clamp() and custom variables

### Recommendations
- Should refactor to use Section wrapper
- Would benefit from Section's built-in container system
- Could use Section's background variants
- Should align with standardized spacing system

---

## 13. Footer Section
**File**: `/src/features/Footer.tsx` + `Footer.module.css`

### Component Hierarchy
```
<footer> (CUSTOM IMPLEMENTATION - No Section wrapper!)
└── .container
    ├── .content
    │   ├── .section (Brand column)
    │   │   ├── .title
    │   │   └── .description
    │   ├── .section (Contact column)
    │   │   ├── .sectionTitle
    │   │   └── .contact
    │   │       ├── .address
    │   │       └── .phoneLink (multiple)
    │   └── .section (Social column)
    │       ├── .sectionTitle
    │       └── .socialLinks
    │           └── .socialLink (multiple)
    └── .bottom
        └── .copyright
```

### Storyblok Props
- `brand_title` (default: "Rum River Wedding Barn")
- `brand_description` (default: "Where dreams come to life...")
- `address` (default: "42618 78th Street, Hillman, MN 56338")
- `phone` (optional)
- `email` (optional)
- `facebook_url` (optional)
- `instagram_url` (optional)

### CSS Architecture
**Custom Implementation - No Section Wrapper**
- CSS Module with semantic classes
- NO Section wrapper usage ❌
- Custom container implementation
- Local CSS custom properties (--_bg, --_text, etc.)
- Three-column flex layout
- Gradient background

### Spacing Control
- Footer padding: `var(--space-56) 0 var(--space-32)`
- Container: `max-width: 1200px`
- Content gap: `var(--space-64)`
- Bottom border-top margin: `var(--space-24)`
- Section margins: Various --space-* variables

### CSS Variables Used
```css
/* Local scoped variables */
--_bg: var(--footer-bg, #1E1A16)
--_text: var(--footer-text, #FFF8E7)
--_link: var(--footer-link, #E4C896)
--_link-hover: var(--footer-link-hover, #FFF8E7)
--_border: var(--footer-border, rgba(255, 255, 255, 0.15))
--_accent: var(--footer-accent, #E4C896)

/* Global variables */
--footer-text: #FFF8E7
--footer-link: #E4C896
--footer-accent: #E4C896

/* Spacing */
--space-8, --space-12, --space-16, --space-20, --space-24, --space-32, --space-40, --space-56, --space-64

/* Typography */
--font-serif: 'Playfair Display', serif
--font-sans: 'Montserrat', sans-serif
```

### Theme Variations

#### Light Mode + Romantic
```css
background: linear-gradient(135deg, #2C2416 0%, #1F1A11 100%)
--footer-text: #FFF8E7 (warm cream)
--footer-accent: #E4C896 (gold)
Decorative underlines on titles
Serif font for titles
Italic description text
```

#### Dark Mode + Romantic
```css
background: var(--grad-section-deep)
Maintains warm color palette
Same accent colors
Glass morphism for social buttons
```

#### Light Mode + Modern
```css
Could use solid background instead of gradient
Sans-serif throughout
No italic styling
Sharper corners on social buttons
```

#### Dark Mode + Modern
```css
Higher contrast text
Crisp borders
No gradient overlays
Minimal decoration
```

### Key Features
- ❌ NO Section wrapper usage
- ✅ Full Storyblok integration
- ✅ Responsive 3-column layout
- ✅ Accessible ARIA labels
- ✅ Focus states for keyboard navigation
- ✅ Conditional rendering for optional fields
- ⚠️ Custom container implementation
- ⚠️ Hardcoded gradient background

### Issues & Legacy Patterns
1. **No Section Wrapper**: Uses plain `<footer>` instead of Section component
2. **Custom Container**: Implements own `.container` instead of Section's container system
3. **Inline Gradient**: Hardcoded gradient background instead of using Section variants
4. **Local CSS Properties**: Uses --_variable pattern for local scoping (unusual pattern)
5. **Centered Column Layout**: Middle column has special centering styles (brittle)

### Notable Implementation Details
1. **Local CSS Variables**: Uses `--_` prefix for component-scoped variables
2. **Conditional Fields**: All contact/social fields are optional with conditional rendering
3. **Dynamic Year**: Uses JavaScript to show current year
4. **Decorative Elements**: CSS ::after pseudo-elements for title underlines
5. **Hover Effects**: Transform and background transitions on social links

### Recommendations
- Should consider using Section wrapper for consistency
- Could benefit from Section's container system
- Background should use Section's background variants
- Consider removing local CSS variable pattern
- Align with standardized spacing system