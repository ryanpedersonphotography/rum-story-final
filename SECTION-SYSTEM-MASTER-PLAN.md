# Section System Master Plan
**Complete Documentation & Implementation Guide**

## 🎯 Project Vision

Transform the Rum River website from a coupled "alternating blocks" system to an independent, reorderable section system with layered depth and consistent spacing.

### Core Philosophy
- **Kill all coupling** - Every section is independent and reorderable
- **Explicit layout control** - No nth-child tricks or sibling dependencies  
- **Layered depth system** - Base canvas with sections at different elevations
- **Rail-aware positioning** - Content respects the glass toolbar offset
- **Token-driven consistency** - Single source of truth for spacing/colors

---

## 🏗️ Architecture Overview

### Layer Stack (Bottom to Top)
```
Base Canvas (100vw, overflow: visible)
├── Rail-Aware Content Area (offset by glass toolbar)
├── Section Wrapper (layer/width/align/elevation props)
├── Independent Leaf Components (WhyCard, VenueHighlight, etc.)
└── No alternating logic - explicit mediaPosition per section
```

### Layout Control System
```typescript
interface SectionLayoutProps {
  layer: 'base' | 'partial' | 'isolated'        // Visual depth
  width: 'content' | 'wide' | 'full'            // Content constraint  
  align: 'left' | 'center' | 'right'            // Rail positioning
  elevation: 0 | 1 | 2 | 3                      // Shadow depth
  mediaPosition?: 'start' | 'end' | 'top' | 'bottom'  // Replaces alternating
  floatAboveRail?: boolean                       // Rare hero moments
  editableAttrs?: Record<string, string>         // Reserved for Storyblok
}
```

---

## 🎨 Token Strategy: Shadow Layer Approach

### Problem
- Need new clean token namespace
- Must maintain existing design consistency
- Require safe migration path with rollback capability

### Solution: Shadow Token Mapping
```css
/* src/styles/tokens/theme.tokens.css */
@layer tokens {
  :root[data-clean-root="true"] {
    /* Shadow tokens mapped to legacy values */
    --color-surface-0: var(--surface-0);
    --color-surface-1: var(--surface-1);
    --color-text-primary: var(--text-primary);
    --space-xs: var(--space-xs);
    --space-md: var(--space-md);
    
    /* New typography tokens */
    --font-family-sans: var(--font-sans, ui-sans-serif, system-ui);
    --font-family-serif: var(--font-serif, Georgia, serif);
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    /* Semantic sizes (clamped) */
    --text-xs: clamp(.78rem, .75vw, .82rem);
    --text-sm: clamp(.9rem, .9vw, .98rem);
    --text-md: clamp(1rem, 1vw, 1.075rem);
    --text-lg: clamp(1.125rem, 1.6vw, 1.35rem);
    --text-xl: clamp(1.35rem, 2vw, 1.75rem);
    --display-sm: clamp(1.8rem, 3vw, 2.4rem);
    --display-lg: clamp(2.4rem, 5vw, 3.2rem);
    
    /* Line heights */
    --leading-tight: 1.15;
    --leading-normal: 1.35;
    --leading-relaxed: 1.55;
  }
}
```

### Token Namespace Migration
| Old Tokens (legacy) | New Tokens (SSOT) | Purpose |
|---------------------|-------------------|---------|
| `--theme-*` | `--color-*` | Clarity |
| `--spacing-*` | `--space-*` | Consistency |
| `--border-*` | `--radius-*`, `--stroke-*` | Separation of concerns |
| `--text-*` | `--font-*`, `--line-*` | Typography |
| `--theme-accent-*` | `--accent-*` | Simpler theming |

---

## 🎯 Depth & Elevation System

### Shadow Tokens
```css
:root {
  --elev-0: none;
  --elev-1: 0 10px 28px rgba(0,0,0,.12);
  --elev-2: 0 18px 48px rgba(0,0,0,.18);
  --elev-3: 0 28px 72px rgba(0,0,0,.22);
}
```

### Layer Behaviors
- **Base**: Sits directly on canvas, transparent background
- **Partial**: Subtle panel with `--color-surface-1` background
- **Isolated**: Distinct elevated surface with borders and stronger shadows

### Mobile Performance Guards
```css
@media (max-width: 768px) {
  .elev-3 { box-shadow: var(--elev-2); }  /* Reduce heavy shadows */
  .elev-2 { box-shadow: var(--elev-1); }
}
```

### Critical Depth Rules
1. **Base canvas**: `overflow: visible` (allow shadows to bleed)
2. **Sections**: Apply shadows to wrapper, not inner media
3. **Avoid clipping**: No `overflow: hidden` on elevated sections
4. **Z-index strategy**: Rail at z-index 10, sections at 0-3

---

## 📁 File Structure

### New Architecture
```
src/
├── components/
│   ├── layout/
│   │   ├── Section.tsx                 # Main wrapper component
│   │   └── Section.types.ts           # Type definitions
│   ├── primitives/                    # New namespace
│   │   ├── Text.tsx                   # Typography primitive
│   │   ├── Heading.tsx               # Heading primitive
│   │   ├── Button.tsx                # Button primitive
│   │   └── Media.tsx                 # Image/media primitive
│   ├── leaf/                         # Independent section components
│   │   ├── WhyCard.tsx
│   │   ├── VenueHighlight.tsx
│   │   └── ExperienceFeature.tsx
│   └── examples/
│       └── SectionDemo.tsx           # Usage examples
├── styles/
│   ├── tokens/
│   │   ├── theme.tokens.css          # New SSOT tokens
│   │   └── legacy/                   # Moved legacy tokens
│   │       ├── theme.old.css
│   │       └── spacing.old.css
│   ├── primitives/                   # Primitive-specific styles
│   │   ├── section.css
│   │   ├── text.css
│   │   └── button.css
│   └── system/
│       └── layout.css                # Enhanced with Section rules
├── content-mocks/
│   └── home.json                     # Realistic mock data
└── app/
    └── (demo)/
        └── layout-system/
            └── page.tsx              # Demo route
```

---

## 🚀 Implementation Plan

### Phase 1A: Shadow Token Layer
**Files to create:**
- `src/styles/tokens/theme.tokens.css` - Shadow token mappings
- Move existing tokens to `src/styles/tokens/legacy/`
- Wire new tokens into `layout.js`

**Success criteria:** New tokens available, no visual changes

### Phase 1B: Section System Foundation
**Files to create:**
- `src/components/layout/Section.tsx` - Main wrapper
- `src/components/layout/Section.types.ts` - Type definitions
- `src/styles/primitives/section.css` - Section styling rules

**Props API:**
```typescript
interface SectionLayoutProps {
  layer: 'base' | 'partial' | 'isolated';
  width: 'content' | 'wide' | 'full';
  align?: 'left' | 'center' | 'right';
  elevation?: 0 | 1 | 2 | 3;
  floatAboveRail?: boolean;
  className?: string;
  style?: React.CSSProperties;
  editableAttrs?: Record<string, string>;
  as?: keyof JSX.IntrinsicElements;
}
```

### Phase 2: Core Primitives (Shims)
**Strategy:** Create thin wrappers around existing CSS classes

**Text.tsx:**
```typescript
interface TextProps {
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  leading?: 'tight' | 'normal' | 'relaxed';
  tone?: 'primary' | 'secondary' | 'muted';
  children: React.ReactNode;
}
```

**Button.tsx:** 
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}
```

### Phase 3: Leaf Components
**Files to create:**
- `src/components/leaf/WhyCard.tsx`
- `src/components/leaf/VenueHighlight.tsx` 
- `src/components/leaf/ExperienceFeature.tsx`
- `src/content-mocks/home.json`

**Mock data structure:**
```json
{
  "sections": [
    {
      "type": "WhyCard",
      "layout": { 
        "layer": "partial", 
        "width": "wide", 
        "align": "left", 
        "elevation": 2 
      },
      "props": {
        "kicker": "Why Choose Us",
        "title": "Your Perfect Venue",
        "lead": "Romance, light, and space to breathe.",
        "image": { "src": "/images/venue.jpg", "alt": "Venue" },
        "cta": { "label": "Tour the spaces", "href": "#spaces" }
      }
    }
  ]
}
```

### Phase 4: Demo Route
**File:** `src/app/(demo)/layout-system/page.tsx`

**Purpose:** Showcase all section combinations with mock data, zero Storyblok

---

## 💀 What Dies (Purge Plan)

### Components to Remove
- `AlternatingBlocks.tsx` - Coupled alternating logic
- Any nth-child alternating CSS
- Components with hardcoded margins/layout
- "reverse" flags and sibling order dependencies

### CSS to Remove
```bash
# Safety check before removal
git grep -n "alternating-blocks\|nth-child(odd)\|nth-child(even)"
git grep -n "theme-\|spacing-"  # Legacy token usage
```

### Purge Strategy
1. **Tag repo** before removal for rollback safety
2. **Remove unused components** after migration complete
3. **Delete legacy token files** when `git grep --count theme-` hits zero
4. **CI guardrail** to prevent legacy token regression

---

## 📝 Current State Assessment

### Decisions Made

**D1 - Audit Strategy:** Quick audit of `src/components/ui/` and `src/styles/components/*.css`, keep tokenized/accessible/composable components

**D2 - Typography:** No stable `Text.tsx`/`Heading.tsx` exist yet, will create new primitives

**D3 - Buttons:** Have `buttons.css` classes, will create thin `<Button/>` wrapper

**D4 - Phase A Scope:** Section system + primitive shims first, then enhance internals

**D5 - Implementation Order:** Option A - Section + leafs with existing styles, then replace internals

**D6 - File Organization:** New namespace `src/components/primitives/` for clean separation

**D7 - CSS Organization:** Short term reuse existing classes, medium term move to `styles/primitives/`

**D8 - Token Strategy:** Shadow layer approach with namespace migration

### Primitive Assessment Matrix

| Component | Current State | Action | Reasoning |
|-----------|---------------|---------|-----------|
| Typography | Scattered inline styles | REBUILD | No unified system |
| Buttons | CSS classes only | WRAP | Existing classes work |
| Media/Images | Mixed implementation | WRAP | Build around next/image |
| Pills/Chips | Unknown | AUDIT FIRST | Need to evaluate |
| Cards | Mixed | REBUILD | As primitives |
| Forms | Unknown | AUDIT FIRST | Need to evaluate |

---

## 🎯 Success Criteria

### Phase A Definition of Done
- `/app/(demo)/layout-system` renders homepage blocks with mock data
- Uses `Section` with all layout props working
- Uses `Text`, `Heading`, `Button`, `Media` primitives (thin shims)
- Zero Storyblok code in demo route
- No global CSS regressions
- Lighthouse still green (no CSS bloat)
- Documentation files committed: `PRIMITIVES-AUDIT.md`, `MIGRATION.md`

### Performance Budgets
- Additional CSS ≤ 18KB gzipped
- LCP ≤ 2.5s mobile
- CLS ≤ 0.05
- Mobile elevation attenuation working

### Editorial Experience Goals
- Sections reorderable without visual breaks
- No coupled "alternating" behavior in CMS
- All layout decisions local to section
- Consistent spacing across all sections

---

## 🔍 Testing Checklist

### Visual Editor Compatibility
- [ ] Storyblok highlighting works on Section wrapper
- [ ] Inline editing preserves through `editableAttrs`
- [ ] No breaking changes to existing content

### Accessibility
- [ ] Semantic HTML structure maintained
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Proper ARIA labels/roles
- [ ] 4.5:1 contrast ratios maintained

### Responsive Design
- [ ] Mobile centers all content appropriately
- [ ] Elevation reduces on mobile for performance
- [ ] Rail offset disabled on mobile
- [ ] Touch targets ≥ 44px

### Performance
- [ ] No layout jitter (CLS)
- [ ] Images reserve proper space
- [ ] Backdrop filters limited on mobile
- [ ] CSS load time acceptable

---

## 🚧 Migration Strategy

### Rollout Order (Low Risk)
1. **Build new system** alongside existing (no conflicts)
2. **Create staging page** with new sections
3. **Validate in Visual Editor** 
4. **Ship to production**
5. **Migrate remaining pages** one by one
6. **Remove old code** after full migration

### Rollback Plan
- Git tag before each major removal
- Legacy CSS preserved until migration complete
- Shadow tokens provide safe fallback path
- Demo route tests all functionality independently

---

## 🎯 Next Action Items

### Immediate Tasks (Phase 1A)
1. **Audit existing primitives** - Create `PRIMITIVES-AUDIT.md`
2. **Create shadow token layer** - Map legacy to new namespace
3. **Build Section component** - Core wrapper with layout props
4. **Create primitive shims** - Text, Heading, Button, Media
5. **Build leaf components** - WhyCard, VenueHighlight, ExperienceFeature  
6. **Create demo route** - Showcase all combinations with mock data

### Success Metrics
- `git grep --count theme-` trending toward zero
- Demo route fully functional
- All layout combinations working
- Mobile performance maintained
- Preparation for Storyblok integration complete

---

## 🔗 Key References

### Hero Layout Control (Completed)
- Already implemented content positioning props
- Serves as proof-of-concept for Section system
- `contentAlign`, `contentWidth`, `useRailSystem` working

### Glass Toolbar Integration  
- `--glass-toolbar-offset: 135px` for rail calculations
- Z-index: 1100 for toolbar, sections use 0-70
- Rail-aware positioning critical

### Existing Token System
- OKLCH color space implementation
- Comprehensive design tokens in place
- CSS layers architecture (`@layer tokens`, `@layer components`)

---

*This document serves as the complete source of truth for the Section System implementation. All decisions, rationale, and implementation details are captured here for reference throughout development.*