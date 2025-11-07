# Primitives Audit Report
**Assessment of existing components for Section System integration**

Date: November 7, 2025  
Scope: `src/components/ui/` and `src/components/primitives/` evaluation

---

## 📋 Legend

🟢 **KEEP** = Use as-is  
🟡 **WRAP** = Thin wrapper or small refactor  
🔴 **REBUILD** = Replace entirely

---

## 🎯 Audit Criteria

### KEEP (Use as-is)
- ✅ **Tokenized** - Uses `--space-*`, `--color-*` design tokens
- ✅ **Accessible** - Proper roles, labels, focus management
- ✅ **Composable** - No hardcoded margins/layout that fight Section system

### WRAP (Thin wrapper around existing)
- 🔄 **CSS classes exist** - Good styles but need React component
- 🔄 **Mostly accessible** - Minor improvements needed
- 🔄 **Compatible** - Can work with Section system

### REBUILD (Start fresh)
- ❌ **Layout coupling** - Owns margins/width/positioning
- ❌ **Accessibility issues** - Poor focus, contrast, or keyboard support
- ❌ **Legacy patterns** - Fights new architecture

---

## 📊 Assessment Results

### Typography Components

| Component | Location | Status | Action | Reasoning |
|-----------|----------|--------|---------|-----------|
| **Text** | `src/components/ui/Text.tsx` | ✅ **KEEP** | Use as-is | • Excellent polymorphic typing<br>• Token-driven sizing (`data-size`)<br>• Zero margins by default<br>• Accessible semantic HTML<br>• Perfect for Section system |
| **Heading** | `src/components/ui/Heading.tsx` | ✅ **KEEP** | Use as-is | • Semantic levels (h1-h6) separate from visual size<br>• Text balancing built-in<br>• Token-driven typography<br>• Zero layout coupling<br>• Excellent accessibility |

**Analysis:** Both typography primitives are **production-ready** and perfectly aligned with our goals. They use data attributes for styling, have zero layout side effects, and comprehensive TypeScript support.

### Button Components

| Component | Location | Status | Action | Reasoning |
|-----------|----------|--------|---------|-----------|
| **Button** | `src/components/primitives/Button.tsx` | ✅ **KEEP** | Use as-is | • Comprehensive accessibility<br>• Loading states with spinner<br>• asChild pattern for semantic links<br>• WCAG 44px minimum hit targets<br>• Multiple variants (solid, outline, ghost)<br>• No layout coupling |
| **Button CSS** | `src/styles/components/buttons.css` | 🔄 **INTEGRATE** | Merge with primitive | • Good token-driven styles<br>• Need to connect with React component<br>• Some variants missing in primitive |

**Analysis:** The Button primitive is **exceptionally well-built** with loading states, accessibility, and semantic flexibility. The CSS has good token usage that should be integrated with the primitive.

### Section/Layout Components  

| Component | Location | Status | Action | Reasoning |
|-----------|----------|--------|---------|-----------|
| **Section** | `src/components/ui/Section.tsx` | ❌ **REPLACE** | Build new | • Complex variant system conflicts with our simple approach<br>• 360 lines with preset coupling<br>• "Alternating blocks" concepts we're removing<br>• Dual rail system too complex for current needs |
| **SectionShell** | `src/components/ui/SectionShell.tsx` | 🔄 **STUDY** | Extract patterns | • Good Radix Slot integration<br>• Clean data attribute approach<br>• Some useful layout concepts<br>• But adds complexity we don't need |
| **SectionEnhanced** | `src/components/ui/SectionEnhanced.tsx` | ❌ **REPLACE** | Build new | • Legacy wrapper features we don't want<br>• Container queries add complexity<br>• Multiple competing approaches |

**Analysis:** The existing section components are **too complex** for our needs and include the alternating logic we're removing. We need a **simpler, cleaner Section** wrapper.

### Missing Primitives

| Primitive | Current State | Action Needed |
|-----------|---------------|---------------|
| **Media/Image** | Scattered implementations | **BUILD** - Wrapper around next/image with ratio, fit, priority |
| **Card** | None found | **BUILD** - Card, CardHeader, CardMedia, CardBody, CardFooter |
| **Pills/Chips** | None found | **BUILD** - For filters and tags |
| **Form Fields** | None found | **DEFER** - Not needed for initial sections |
| **Icon** | None found | **DEFER** - Can use Heroicons directly for now |

---

## 🎨 CSS Assessment

### Token-Driven CSS (Good)

| File | Assessment | Integration |
|------|------------|-------------|
| `buttons.css` | ✅ Uses `--btn-*` tokens | Merge with Button primitive |
| `hero.css` | ✅ Uses `--hero-*` tokens | Keep (already optimized) |
| `glass-toolbar.css` | ✅ Uses `--glass-toolbar-*` tokens | Keep (working well) |

### Legacy CSS (Problematic)

| File | Issues | Action |
|------|--------|--------|
| `alternating-blocks.css` | ❌ nth-child coupling, sibling dependencies | **DELETE** after migration |
| `section.css` | ❌ Multiple competing approaches | **REPLACE** with new Section CSS |
| `section.variants.css` | ❌ Complex variant system | **SIMPLIFY** or remove |
| `section.wrapper.css` | ❌ Legacy wrapper patterns | **REMOVE** |

---

## 🔍 Key Findings

### Strengths
1. **Typography primitives are excellent** - Can use immediately
2. **Button primitive is production-ready** - Comprehensive accessibility
3. **Token system is solid** - Good foundation for new components
4. **CSS architecture is clean** - Proper layering and scoping

### Weaknesses  
1. **Section components are over-engineered** - Multiple competing approaches
2. **Missing core primitives** - Need Media, Card components
3. **Legacy alternating logic** - Throughout section CSS files
4. **Complex variant systems** - More than needed for current goals

### Opportunities
1. **Reuse excellent primitives** - Text, Heading, Button are ready
2. **Clean slate for Section** - Simple wrapper without baggage
3. **Leverage token system** - Extend existing `--space-*`, `--color-*` tokens
4. **Build missing pieces** - Media and Card primitives needed

---

## 🔗 Dependency Graph

**For migration sequencing and build order:**

```
Text → used by Heading, Button, Card
Heading → used by Section, Card  
Button → used by all leaf components
Section → wraps everything
Card → depends on Media, Text, Heading
Media → base image primitive for Card and Hero
```

**Build Order:** Text/Heading/Button (✅ ready) → Media → Section → Card → Leaf Components

---

## 🗂️ Naming Convention

| Type | File/Folder | Example |
|------|-------------|---------|
| UI primitives | `/ui/` | Text.tsx, Heading.tsx |
| Structural primitives | `/layout/` | Section.tsx, Stack.tsx |
| Content primitives | `/content/` | Card.tsx, Media.tsx |

---

## 📋 Recommendations

### Phase 1: Use What Works
- ✅ **Text.tsx** - Use immediately in leaf components
- ✅ **Heading.tsx** - Use immediately in leaf components  
- ✅ **Button.tsx** - Use immediately for CTAs

### Phase 2: Build What's Missing
- 🔧 **Section.tsx** - New simple wrapper (layer/width/align/elevation)
- 🔧 **Media.tsx** - Wrapper around next/image with aspect ratios
- 🔧 **Card primitives** - CardHeader, CardMedia, CardBody for leaf components

### Phase 3: Clean Up
- 🗑️ **Remove alternating CSS** - After section migration complete
- 🗑️ **Remove old Section components** - After new system proven
- 🔧 **Merge button CSS** - Connect styles with primitive

**Deprecation Protocol:** Mark old files with `@deprecated` JSDoc tags and move to `/legacy/` folder. Add ESLint rule to block imports from `/legacy/` after migration.

---

## 🎯 Implementation Strategy

### Immediate Actions
1. **Import existing primitives** - Text, Heading, Button into leaf components
2. **Build new Section wrapper** - Simple props API without complexity
3. **Create Media primitive** - For image handling in sections

### Future Actions
1. **Card primitives** - When leaf components need structured layouts
2. **Form primitives** - When contact forms need building
3. **Icon wrapper** - When icon consistency becomes issue

---

## 🔗 Integration with Section System

### Compatible Existing Components
```typescript
// These work immediately with Section system
import { Text } from '@/components/ui/Text'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/primitives/Button'

// Example usage in leaf component
<Section layer="partial" width="content">
  <article className="why-card">
    <Heading as={2} size="lg">Why Choose Us</Heading>
    <Text size="md">Beautiful venue description...</Text>
    <Button variant="solid" size="md">Book Now</Button>
  </article>
</Section>
```

### Components to Build
```typescript
// Need these for complete leaf components
<Section layer="isolated" width="wide">
  <Card>
    <CardMedia>
      <Media src="/venue.jpg" ratio="16/9" alt="Venue" />
    </CardMedia>
    <CardBody>
      <Heading as={3} size="md">Ceremony Space</Heading>
      <Text muted>Perfect for outdoor ceremonies...</Text>
    </CardBody>
  </Card>
</Section>
```

---

## ✅ Next Steps

1. **Use Text, Heading, Button** immediately - They're production ready
2. **Build simple Section wrapper** - Clean props API for layer/width/align
3. **Create Media primitive** - Image wrapper with ratios and optimization
4. **Build first leaf component** - WhyCard using existing primitives
5. **Iterate based on needs** - Add Card primitives as patterns emerge

Once the Section system stabilizes, consolidate all primitives under a unified `/foundations/` namespace to serve as the single source of truth for all design tokens and low-level components.

**Bottom Line:** We have excellent typography and button primitives ready to use. The section components need replacement, but that aligns perfectly with our goals. Overall assessment: **Strong foundation, clean path forward.** 🚀