# Implementation Action Plan: Nova Section System
**Rum River Wedding Barn - Full Component Implementation**

## 🎯 Objective
Convert Nova's architecture specs into working React + token-driven CSS components using mock data, following the Section System API v1.0 specification.

## 📁 Folder Structure Target
```
src/
├── components/
│   ├── layout/
│   │   └── Section.tsx
│   ├── leaf/
│   │   ├── Hero.tsx
│   │   ├── DiscoverSpaces.tsx
│   │   ├── WhyChoose.tsx
│   │   ├── Experience.tsx
│   │   ├── Gallery.tsx
│   │   ├── PricingPlans.tsx
│   │   ├── MapSection.tsx
│   │   ├── FAQAccordion.tsx
│   │   └── Footer.tsx
│   └── primitives/
│       ├── Card.tsx
│       └── Media.tsx
├── styles/
│   ├── components/
│   │   ├── section.css
│   │   ├── card.css
│   │   ├── pricing.css
│   │   ├── map-section.css
│   │   └── faq.css
│   └── tokens/theme.tokens.css
└── content-mocks/
    └── home.json
```

## 🔄 Implementation Sequence

### Phase 1: Foundation Layer
1. **✅ Section.tsx** - Implement layout component per API spec
2. **✅ Card.tsx + Media.tsx** - Build primitive components
3. **✅ section.css + card.css** - Token-driven styling

### Phase 2: Leaf Components (One-by-One)
4. **Hero.tsx + hero.css** - Full-screen hero with CTA
5. **DiscoverSpaces.tsx + spaces.css** - Interactive venue showcase  
6. **WhyChoose.tsx + alternating.css** - Alternating feature blocks
7. **Experience.tsx + experience.css** - Two-column feature layout
8. **Gallery.tsx + gallery.css** - Wedding photo grid
9. **PricingPlans.tsx + pricing.css** - Pricing card layout
10. **MapSection.tsx + map-section.css** - Location/contact section
11. **FAQAccordion.tsx + faq.css** - Expandable FAQ section
12. **Footer.tsx + footer.css** - Site footer

### Phase 3: Integration & Testing  
13. **home.json** - Complete mock data structure
14. **/demo/sections route** - Preview all sections in sequence
15. **Lint + Build validation** - Ensure clean compilation

## 📋 Implementation Rules

### ✅ Must Follow
- **Implement exactly per Section System API v1.0**
- **Use only existing design tokens** (no hex colors/magic numbers)
- **Each component gets .tsx + .css files together**  
- **Mock data only** (no Storyblok adapters yet)
- **Stop after each section to validate render**

### ❌ Must Avoid
- **No !important in CSS**
- **No inline styles**
- **No hardcoded values**
- **No Storyblok integration** (comes later)

## 🎨 Design Token Usage
Components must use tokens from `theme.tokens.css`:
- **Colors:** `--theme-*`, `--surface-*`, `--accent-*`
- **Spacing:** `--space-*`, `--section-*`
- **Typography:** `--font-*`, `--size-*`, `--weight-*`
- **Shadows:** `--theme-shadow-*`
- **Borders:** `--theme-border-*`

## 📊 Deliverables Per Section

### For Each Component:
1. **Component.tsx** - React implementation
2. **component.css** - Token-driven styles  
3. **Test render snippet** - Validation code
4. **Token usage report** - Which tokens were used

### Final Deliverables:
1. **Build summary** - Compilation status
2. **Token gaps report** - Missing tokens to add
3. **Demo route** - Full section preview
4. **Mock data** - Complete content structure

## 🚀 Execution Flow

### Step-by-Step Process:
1. **Implement Section.tsx** → Validate API compliance
2. **Build primitives** → Test Card/Media components  
3. **For each leaf section:**
   - Write .tsx component with mock data
   - Write .css with token-driven styles
   - Test render and validate spacing/elevation
   - Report token usage
4. **Create demo route** → Preview all sections
5. **Final validation** → Lint + build check

### Quality Gates:
- ✅ Each section renders correctly with mock data
- ✅ No CSS compilation errors  
- ✅ TypeScript type safety maintained
- ✅ Section API props work as specified
- ✅ Dark mode support via tokens
- ✅ Responsive behavior intact

## 📝 Ready to Execute

**Current Status:** Implementation ready to begin
**Next Action:** Start with Section.tsx implementation
**Input Required:** Feed each section specification as we go
**Expected Output:** Working component system with demo route

---

*This plan ensures clean, token-driven React components that follow Nova's architecture while providing a clear path from specification to working implementation.*