# Section Spacing Standardization Plan

## 🎯 OBJECTIVE
Implement consistent, predictable spacing between all sections while maintaining flexibility for editorial control through Storyblok.

## 📊 CURRENT STATUS TRACKER

### Migration Progress: 0/15 Tasks (0%)

| # | Task | Status | Verified |
|---|------|--------|----------|
| 1 | Analyze current spacing patterns | ⏳ Not Started | ❌ |
| 2 | Create spacing preset system | ⏳ Not Started | ❌ |
| 3 | Update SectionWrapper component | ⏳ Not Started | ❌ |
| 4 | Update SectionWrapper CSS | ⏳ Not Started | ❌ |
| 5 | Update Hero section spacing | ⏳ Not Started | ❌ |
| 6 | Update Spaces section spacing | ⏳ Not Started | ❌ |
| 7 | Update AlternatingBlocks spacing | ⏳ Not Started | ❌ |
| 8 | Update Experience section spacing | ⏳ Not Started | ❌ |
| 9 | Update Gallery section spacing | ⏳ Not Started | ❌ |
| 10 | Update BrandProof section spacing | ⏳ Not Started | ❌ |
| 11 | Update HistoryCarousel spacing | ⏳ Not Started | ❌ |
| 12 | Update ScheduleForm spacing | ⏳ Not Started | ❌ |
| 13 | Update Map section spacing | ⏳ Not Started | ❌ |
| 14 | Update FAQ section spacing | ⏳ Not Started | ❌ |
| 15 | Update Pricing section spacing | ⏳ Not Started | ❌ |

## 🏗️ IMPLEMENTATION STRATEGY

### Solution: Hybrid Spacing System
1. **Base**: Automatic section-to-section spacing
2. **Presets**: Named spacing patterns for common scenarios
3. **Overrides**: Manual control via Storyblok props when needed

## 🔧 STEP-BY-STEP EXECUTION PLAN

### PHASE 1: Analysis & Planning

#### Step 1.1: Document Current Spacing
```bash
# ACTION: Analyze each section's current spacing
For each section component:
1. Check current paddingY value
2. Check if marginTop/marginBottom exists
3. Note any custom spacing in CSS modules
4. Document in spacing audit table
```

**Expected Output:**
```markdown
| Section | Current PaddingY | Custom Margin | Notes |
|---------|-----------------|---------------|-------|
| Hero | none | 0 | Full viewport |
| Spaces | lg | 0 | Needs gap above |
| AlternatingBlocks | fluid | 0 | Too close to previous |
```

#### Step 1.2: Define Spacing Tokens
```bash
# ACTION: Add new spacing tokens to SectionWrapper
```

**New Tokens to Add:**
```css
/* Section-to-section gaps */
--section-gap-sm: clamp(24px, 4vw, 48px);
--section-gap-md: clamp(40px, 6vw, 80px);
--section-gap-lg: clamp(64px, 8vw, 120px);
--section-gap-xl: clamp(80px, 10vw, 160px);

/* Special gaps */
--gap-after-hero: clamp(48px, 8vw, 96px);
--gap-before-footer: clamp(64px, 8vw, 120px);
```

### PHASE 2: Create Spacing Preset System

#### Step 2.1: Define Spacing Presets
```bash
# ACTION: Create spacing preset types in SectionWrapper.tsx
```

**Add to SectionWrapper.tsx:**
```typescript
export type SpacingPreset = 
  | 'hero-start'        // First section after hero
  | 'content-flow'      // Standard content sections
  | 'feature-highlight' // Feature sections needing emphasis
  | 'compact-stack'     // Tightly coupled sections
  | 'footer-approach'   // Last section before footer
  | 'none'             // No spacing

// Preset definitions
const spacingPresets = {
  'hero-start': { 
    marginTop: 'xl',    // Extra space after hero
    paddingY: 'lg' 
  },
  'content-flow': { 
    marginTop: 'lg',    // Standard gap
    paddingY: 'lg' 
  },
  'feature-highlight': { 
    marginTop: 'xl',    // More breathing room
    paddingY: 'xl' 
  },
  'compact-stack': { 
    marginTop: 'sm',    // Tight coupling
    paddingY: 'md' 
  },
  'footer-approach': { 
    marginTop: 'lg',
    marginBottom: 'xl', // Extra space before footer
    paddingY: 'lg' 
  },
  'none': { 
    marginTop: 'none',
    paddingY: 'none' 
  }
}
```

#### Step 2.2: Update SectionWrapper Props
```bash
# ACTION: Modify SectionWrapper interface
Edit file: /src/components/ui/SectionWrapper.tsx
```

**Update Interface:**
```typescript
export interface SectionWrapperProps {
  // Existing props...
  
  // NEW: Spacing control
  spacing?: SpacingPreset;        // Use preset
  marginTop?: MarginY;            // Override top margin
  marginBottom?: MarginY;         // Override bottom margin
  
  // Keep existing
  paddingY?: PaddingY;
  // ...
}
```

### PHASE 3: Implement CSS Changes

#### Step 3.1: Add Margin Classes
```bash
# ACTION: Add margin variant classes to SectionWrapper.module.css
Edit file: /src/components/ui/SectionWrapper.module.css
```

**Add CSS Classes:**
```css
/* ===== MARGIN TOP VARIANTS ===== */
.marginTop-none { margin-top: 0; }
.marginTop-sm { margin-top: var(--section-gap-sm); }
.marginTop-md { margin-top: var(--section-gap-md); }
.marginTop-lg { margin-top: var(--section-gap-lg); }
.marginTop-xl { margin-top: var(--section-gap-xl); }

/* ===== MARGIN BOTTOM VARIANTS ===== */
.marginBottom-none { margin-bottom: 0; }
.marginBottom-sm { margin-bottom: var(--section-gap-sm); }
.marginBottom-md { margin-bottom: var(--section-gap-md); }
.marginBottom-lg { margin-bottom: var(--section-gap-lg); }
.marginBottom-xl { margin-bottom: var(--section-gap-xl); }

/* ===== AUTOMATIC SECTION SPACING ===== */
.section + .section {
  margin-top: var(--section-gap-md); /* Default gap */
}

/* Special case: After hero */
[data-section="hero"] + .section {
  margin-top: var(--gap-after-hero);
}

/* Special case: Before footer */
.section:has(+ footer) {
  margin-bottom: var(--gap-before-footer);
}
```

#### Step 3.2: Update Component Logic
```bash
# ACTION: Update SectionWrapper.tsx to handle spacing
Edit file: /src/components/ui/SectionWrapper.tsx
```

**Update Component:**
```typescript
const SectionWrapper: React.FC<SectionWrapperProps> = ({
  spacing,
  marginTop,
  marginBottom,
  paddingY = 'lg',
  // ... other props
}) => {
  // Resolve spacing from preset or manual
  const resolvedSpacing = spacing ? spacingPresets[spacing] : null;
  const finalMarginTop = marginTop || resolvedSpacing?.marginTop || 'none';
  const finalMarginBottom = marginBottom || resolvedSpacing?.marginBottom || 'none';
  const finalPaddingY = paddingY || resolvedSpacing?.paddingY || 'lg';

  const sectionClasses = [
    styles.section,
    styles[`marginTop-${finalMarginTop}`],
    styles[`marginBottom-${finalMarginBottom}`],
    styles[`paddingY-${finalPaddingY}`],
    // ... rest
  ].filter(Boolean).join(' ');
```

### PHASE 4: Update Each Section

#### Step 4.1: Update Sections After Hero
```bash
# Spaces (first after hero)
Edit: /src/features/Spaces.tsx
Change: <SpacesLayout>
To: <SpacesLayout spacing="hero-start">

# OR if using SectionWrapper directly:
<SectionWrapper spacing="hero-start">
```

#### Step 4.2: Update Content Flow Sections
```bash
# AlternatingBlocks, Experience, Gallery, etc.
Edit each file:
Add: spacing="content-flow"
```

#### Step 4.3: Update Special Sections
```bash
# Pricing (before footer)
Edit: /src/features/Pricing.tsx
Add: spacing="footer-approach"

# BrandProof (compact with previous)
Edit: /src/features/BrandProof.tsx
Add: spacing="compact-stack"
```

### PHASE 5: Testing & Validation

#### Step 5.1: Visual Testing Checklist
```bash
# Test each scenario:
□ Hero → First section gap
□ Section → Section standard gap
□ Feature sections have extra breathing room
□ Compact sections stay tight
□ Last section → Footer gap
□ Mobile responsive spacing
□ Dark mode appearance
```

#### Step 5.2: Storyblok Testing
```bash
# Verify Storyblok props work:
1. Change spacing preset in Storyblok
2. Verify visual update
3. Test manual marginTop/marginBottom overrides
4. Ensure paddingY still works
```

## ✅ VERIFICATION CHECKLIST

After implementation:
- [ ] All sections have consistent gaps
- [ ] No sections appear cramped
- [ ] Hero → content transition feels natural
- [ ] Content → footer has adequate space
- [ ] Spacing scales properly on mobile
- [ ] Storyblok editors can override when needed
- [ ] Dark/light modes both look good

## 🚨 ROLLBACK PLAN

If spacing causes issues:
1. `git stash` to save current work
2. `git checkout -- src/components/ui/SectionWrapper.*`
3. Remove spacing props from sections
4. Investigate issue before retry

## 📈 SUCCESS METRICS

- **Before**: Inconsistent gaps, some sections cramped
- **After**: Predictable rhythm, all sections breathe
- **Visual**: Harmonious vertical rhythm throughout page
- **Code**: Single source of truth for spacing

## 🤖 AI INSTRUCTION NOTES

**For AI Implementation:**

1. **DO** analyze current spacing FIRST before making changes
2. **DO** test after EACH section update
3. **DO** preserve any intentional custom spacing
4. **DO NOT** apply spacing preset to Hero or Footer
5. **DO** use "hero-start" for first section after hero
6. **DO** use "footer-approach" for last content section
7. **IF** unsure about a section, use "content-flow" as default

## 📝 COMMIT MESSAGE TEMPLATE

After each phase:
```
feat: Implement section spacing system - Phase [X]

- [Specific changes made]
- [Sections affected]
- Improved vertical rhythm consistency
```

Final commit:
```
feat: Standardize section spacing with preset system

- Added spacing presets (hero-start, content-flow, etc.)
- Implemented automatic section-to-section gaps
- Updated all 15 sections with appropriate spacing
- Maintains Storyblok override capability
- Improves visual rhythm and consistency
```

## 🏁 COMPLETION CRITERIA

Implementation is complete when:
1. All sections use spacing presets or explicit values
2. No visual cramping between sections
3. Consistent rhythm throughout page
4. All tests pass
5. Storyblok integration verified

---

**ESTIMATED TIME**: 1-2 hours
**COMPLEXITY**: Medium
**RISK**: Low (purely visual changes)