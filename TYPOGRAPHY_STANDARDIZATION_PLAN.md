# Typography Standardization Plan

## 🎯 OBJECTIVE
Create a unified typography system that maintains the existing design aesthetic while eliminating inconsistencies and improving maintainability through reusable primitives.

## 📊 CURRENT STATUS TRACKER

### ✅ Phase 1: Foundation (4/4 tasks) ✅ COMPLETE
- [x] Audit & document current typography patterns
- [x] Create typography token system in globals.css
- [x] Build Typography primitive component
- [x] Create Text component for body text

### ✅ Phase 2: Core Components (1/3 tasks)
- [x] Update SectionWrapper to use Typography
- [ ] Migrate Hero section typography
- [ ] Test responsive scaling and dark mode

### ✅ Phase 3: Section Components (0/10 tasks)
- [ ] Migrate AlternatingBlocks typography
- [ ] Migrate Spaces typography
- [ ] Migrate Experience typography
- [ ] Migrate Gallery typography
- [ ] Migrate BrandProof typography
- [ ] Migrate HistoryCarousel typography
- [ ] Migrate Pricing typography
- [ ] Migrate FAQ typography
- [ ] Migrate Map typography
- [ ] Migrate ScheduleForm typography

### ✅ Phase 4: Supporting Components (0/3 tasks)
- [ ] Migrate Footer typography
- [ ] Update Button component typography
- [ ] Update any remaining text styles

### ✅ Phase 5: Cleanup (0/3 tasks)
- [ ] Remove redundant typography CSS
- [ ] Document typography system usage
- [ ] Final testing across all breakpoints

**Overall Progress: 5/23 tasks completed (22%)**

## 🏗️ IMPLEMENTATION STRATEGY

### Solution: Three-Layer Typography System
1. **Tokens**: Extend existing CSS custom properties
2. **Primitives**: Typography & Text components
3. **Semantic**: Variant props that map to design patterns

## 🔧 STEP-BY-STEP EXECUTION PLAN

### PHASE 1: Audit & Documentation

#### Step 1.1: Create Typography Audit ✅
- [x] Analyze font-family usage across components
- [x] Document all font-size patterns
- [x] Map line-height values
- [x] List font-weight variations
- [x] Note color applications

**Current Patterns Found:**
```markdown
| Element | Component | Font | Size | Line Height | Weight |
|---------|-----------|------|------|-------------|---------|
| Hero Title | Hero | Playfair | clamp(3rem, 8vw, 5.5rem) | 1.2 | 400 |
| Section Title | SectionWrapper | Playfair | clamp(2.25rem, 4.8vw, 3rem) | 1.2 | 400 |
| Script Accent | Multiple | Dancing Script | clamp(1.5rem, 3.2vw, 1.75rem) | 1.5 | 400 |
| Body Text | Multiple | Montserrat | 1.125rem | 1.7-1.8 | 400 |
| Button | Button | Montserrat | 1rem | 1.5 | 500-600 |
```

### PHASE 2: Create Typography Token System

#### Step 2.1: Extend Token System ✅
**Execution Tasks:**
- [x] Add typography tokens to globals.css
- [x] Define responsive type scale
- [x] Set up line-height system
- [x] Configure font-weight scale
- [x] Add letter-spacing values
- [x] Test token inheritance

**New Typography Tokens:**
```css
:root {
  /* Type Scale with Responsive Clamp */
  --type-display: clamp(3rem, 8vw, 5.5rem);      /* Hero titles */
  --type-h1: clamp(2.25rem, 4.8vw, 3rem);        /* Section titles */
  --type-h2: clamp(1.75rem, 3.5vw, 2.25rem);     /* Subsection titles */
  --type-h3: clamp(1.5rem, 3vw, 1.75rem);        /* Card titles */
  --type-script: clamp(1.5rem, 3.2vw, 1.75rem);  /* Script accents */
  --type-body-lg: clamp(1rem, 2.4vw, 1.125rem);  /* Lead paragraphs */
  --type-body: clamp(0.95rem, 2vw, 1rem);        /* Body text */
  --type-body-sm: clamp(0.875rem, 1.8vw, 0.9375rem); /* Small text */
  --type-caption: clamp(0.8125rem, 1.6vw, 0.875rem); /* Captions */
  
  /* Font Stacks (already exist, for reference) */
  --font-serif: "Playfair Display", Georgia, serif;
  --font-script: "Dancing Script", cursive;
  --font-sans: "Montserrat", system-ui, sans-serif;
  
  /* Line Heights by Context */
  --leading-display: 1.1;     /* Very tight for large display text */
  --leading-heading: 1.2;     /* Tight for headings */
  --leading-script: 1.4;      /* Relaxed for script */
  --leading-body: 1.7;        /* Comfortable for reading */
  --leading-relaxed: 1.8;     /* Extra space for emphasis */
  
  /* Font Weights */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  
  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-wider: 0.04em;
}
```

### PHASE 3: Create Typography Component

#### Step 3.1: Build Typography Primitive ✅
**Implementation Steps:**
- [x] Create Typography.tsx component file
- [x] Define TypeScript interfaces
- [x] Build variant mapping system
- [x] Implement responsive sizing
- [x] Add color prop handling
- [x] Set up alignment options
- [x] Create Typography.module.css
- [x] Test all variants render correctly

**Component Structure:**
```typescript
// Typography.tsx
export interface TypographyProps {
  variant: 'display' | 'h1' | 'h2' | 'h3' | 'script' | 'body-lg' | 'body' | 'body-sm' | 'caption';
  as?: keyof JSX.IntrinsicElements;
  font?: 'serif' | 'sans' | 'script' | 'inherit';
  color?: 'primary' | 'secondary' | 'accent' | 'inverse' | 'inherit';
  align?: 'left' | 'center' | 'right' | 'inherit';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'inherit';
  className?: string;
  children?: React.ReactNode;
}

const variantMap = {
  display: { size: 'var(--type-display)', leading: 'var(--leading-display)', defaultFont: 'serif' },
  h1: { size: 'var(--type-h1)', leading: 'var(--leading-heading)', defaultFont: 'serif' },
  h2: { size: 'var(--type-h2)', leading: 'var(--leading-heading)', defaultFont: 'serif' },
  h3: { size: 'var(--type-h3)', leading: 'var(--leading-heading)', defaultFont: 'serif' },
  script: { size: 'var(--type-script)', leading: 'var(--leading-script)', defaultFont: 'script' },
  'body-lg': { size: 'var(--type-body-lg)', leading: 'var(--leading-body)', defaultFont: 'sans' },
  body: { size: 'var(--type-body)', leading: 'var(--leading-body)', defaultFont: 'sans' },
  'body-sm': { size: 'var(--type-body-sm)', leading: 'var(--leading-body)', defaultFont: 'sans' },
  caption: { size: 'var(--type-caption)', leading: 'var(--leading-body)', defaultFont: 'sans' },
}
```

#### Step 3.2: Create Typography Styles
```bash
# ACTION: Create /src/components/ui/Typography.module.css
```

**CSS Module:**
```css
/* Base typography */
.typography {
  margin: 0;
  transition: color 200ms ease;
}

/* Font families */
.font-serif { font-family: var(--font-serif); }
.font-sans { font-family: var(--font-sans); }
.font-script { font-family: var(--font-script); }

/* Colors */
.color-primary { color: var(--text-primary); }
.color-secondary { color: var(--text-secondary); }
.color-accent { color: var(--accent-rose); }
.color-inverse { color: var(--text-inverse); }

/* Alignments */
.align-left { text-align: left; }
.align-center { text-align: center; }
.align-right { text-align: right; }

/* Weights */
.weight-light { font-weight: var(--weight-light); }
.weight-regular { font-weight: var(--weight-regular); }
.weight-medium { font-weight: var(--weight-medium); }
.weight-semibold { font-weight: var(--weight-semibold); }
.weight-bold { font-weight: var(--weight-bold); }
```

### PHASE 4: Create Text Component

#### Step 4.1: Build Text Component for Paragraphs
```bash
# ACTION: Create /src/components/ui/Text.tsx
```

**Purpose:** Semantic wrapper for body text with max-width control
```typescript
interface TextProps {
  size?: 'sm' | 'base' | 'lg';
  maxWidth?: 'prose' | 'narrow' | 'wide' | 'full';
  opacity?: number;
  className?: string;
  children?: React.ReactNode;
}
```

### PHASE 5: Update SectionWrapper

#### Step 5.1: Use Typography Component
```bash
# ACTION: Update SectionWrapper to use Typography primitive
```

**Before:**
```jsx
<span className={styles.scriptAccent}>{header.scriptAccent}</span>
<h2 className={styles.title}>{header.title}</h2>
<p className={styles.lead}>{header.lead}</p>
```

**After:**
```jsx
<Typography variant="script" color="accent" align={header.align}>
  {header.scriptAccent}
</Typography>
<Typography as="h2" variant="h1" align={header.align}>
  {header.title}
</Typography>
<Text size="lg" maxWidth="prose" align={header.align}>
  {header.lead}
</Text>
```

### PHASE 6: Migrate Components

#### Step 6.1-6.17: Update Each Component
```bash
# ACTION: Systematically update each component
For each component:
1. Import Typography/Text components
2. Replace hardcoded typography with primitives
3. Remove local typography styles
4. Test visual consistency
```

**Migration Map:**
```typescript
// Example: Hero.tsx
// BEFORE:
<h1 className={styles.title}>...</h1>

// AFTER:
<Typography variant="display" as="h1" color="inverse">...</Typography>
```

### PHASE 7: Cleanup & Documentation

#### Step 7.1: Remove Redundant Styles
```bash
# ACTION: Delete duplicate typography definitions
Files to clean:
- Experience.module.css (remove .script, .title classes)
- Gallery.module.css (remove typography classes)
- etc...
```

#### Step 7.2: Create Typography Documentation
```bash
# ACTION: Create /docs/TYPOGRAPHY_SYSTEM.md
```

## ✅ VERIFICATION CHECKLIST

### After Typography Component Creation:
- [ ] All variants render correctly
- [ ] Responsive clamp() values work
- [ ] Font families load properly
- [ ] Colors apply correctly
- [ ] Dark mode switching works

### After Each Component Migration:
- [ ] Visual appearance unchanged
- [ ] Typography scales correctly (mobile → desktop)
- [ ] Dark mode colors work
- [ ] Line heights match original
- [ ] No style regressions
- [ ] Storyblok text renders correctly

### After Full Migration:
- [ ] All sections have consistent typography
- [ ] No duplicate font definitions remain
- [ ] Build succeeds without warnings
- [ ] Lighthouse performance unchanged/improved
- [ ] Cross-browser testing passes

## 🚨 ROLLBACK PLAN

If issues arise:
1. Keep original styles commented during migration
2. Git stash changes if needed
3. Revert Typography component usage
4. Restore local styles

## 📈 SUCCESS METRICS

- **Before**: 15+ files with typography definitions
- **After**: 2 typography components + token file
- **Code Reduction**: ~60% less typography CSS
- **Consistency**: 100% adherence to type scale

## 🤖 AI EXECUTION NOTES

**For AI Implementation:**

1. **DO** preserve existing visual design exactly
2. **DO** use the existing token system where possible
3. **DO** test each component after migration
4. **DO NOT** change font sizes without matching current design
5. **DO NOT** modify color values
6. **DO** maintain Storyblok compatibility
7. **IF** a component has unique typography needs, document why

## 📝 COMMIT MESSAGE TEMPLATES

After Phase 3 (Typography Component):
```
feat: Create Typography primitive component system

- Added comprehensive typography tokens
- Built Typography component with variants
- Created Text component for body content
- Maintains existing design system
```

After Phase 6 (Migration):
```
refactor: Migrate [Component] to Typography primitives

- Replaced hardcoded styles with Typography component
- Removed redundant CSS definitions
- Improved consistency with design system
- No visual changes
```

Final commit:
```
feat: Complete typography standardization

- Unified 15+ components under single Typography system
- Reduced typography CSS by 60%
- Improved consistency and maintainability
- Full Storyblok compatibility maintained
```

## 🏁 COMPLETION CRITERIA

Implementation is complete when:
1. All components use Typography/Text primitives
2. No duplicate typography definitions remain
3. Dark mode works consistently
4. All responsive breakpoints tested
5. Storyblok preview functions correctly
6. Documentation is complete

---

**ESTIMATED TIME**: 2-3 hours
**COMPLEXITY**: Medium
**RISK**: Low (styles only, no logic changes)
**BENEFIT**: High (major consistency improvement)