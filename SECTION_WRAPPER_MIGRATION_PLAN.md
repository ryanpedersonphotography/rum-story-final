# Section Wrapper Standardization Migration Plan

## 🎯 OBJECTIVE
Standardize all 13 sections to use a consistent `SectionWrapper` component for predictable spacing, theming, and Storyblok integration.

## 📊 CURRENT STATUS TRACKER

### Migration Progress: 0/13 Sections (0%)

| # | Section | Current State | Migration Status | Verified |
|---|---------|--------------|------------------|----------|
| 1 | Hero | ✅ Has Section wrapper | ⏳ Not Started | ❌ |
| 2 | Spaces | ✅ Has Section wrapper | ⏳ Not Started | ❌ |
| 3 | AlternatingBlocks | ✅ Has Section wrapper | ⏳ Not Started | ❌ |
| 4 | Experience | ❌ No wrapper (inline styles) | ⏳ Not Started | ❌ |
| 5 | Gallery | ❌ No wrapper (CSS modules) | ⏳ Not Started | ❌ |
| 6 | BrandProof | ❌ No wrapper (CSS modules) | ⏳ Not Started | ❌ |
| 7 | HistoryCarousel | ❌ No wrapper (inline styles) | ⏳ Not Started | ❌ |
| 8 | ScheduleForm | ✅ Has Section wrapper | ⏳ Not Started | ❌ |
| 9 | Map | ❌ No wrapper (hardcoded) | ⏳ Not Started | ❌ |
| 10 | FAQ | ✅ Has Section wrapper | ⏳ Not Started | ❌ |
| 11 | Pricing | ❌ No wrapper (CSS modules) | ⏳ Not Started | ❌ |
| 12 | Footer | ❌ No wrapper (semantic footer) | ⏳ Not Started | ❌ |
| 13 | GlassToolbar | ❌ No wrapper (fixed position) | ⏳ Not Started | ❌ |

## 🔧 STEP-BY-STEP EXECUTION PLAN

### PHASE 1: Create the Standardized SectionWrapper Component

#### Step 1.1: Read the existing Section component
```bash
# ACTION: Read the current Section component to understand its structure
Read file: /src/components/ui/Section.jsx
```

#### Step 1.2: Create enhanced SectionWrapper component
```bash
# ACTION: Create new SectionWrapper that accepts ALL Storyblok props
Create file: /src/components/ui/SectionWrapper.jsx
```

**Required Props to Support:**
- `paddingY` (xs, sm, md, lg, xl, none) - maps to CSS tokens
- `marginY` (xs, sm, md, lg, xl, none) - maps to CSS tokens  
- `maxWidth` (narrow, standard, wide, full) - maps to container widths
- `theme` (light, dark, inherit) - section-specific theme override
- `background` (transparent, surface-1, surface-2, etc.) - background color
- `className` - for additional CSS module classes
- `children` - section content
- `blok` - pass through Storyblok data

#### Step 1.3: Create SectionWrapper CSS module
```bash
# ACTION: Create CSS module with token-based styles
Create file: /src/components/ui/SectionWrapper.module.css
```

**CSS Must Include:**
```css
/* Padding Y variants - using tokens from spacing.css */
.paddingY-xs { padding-block: var(--pad-section-xs); }
.paddingY-sm { padding-block: var(--pad-section-sm); }
.paddingY-md { padding-block: var(--pad-section-md); }
.paddingY-lg { padding-block: var(--pad-section-lg); }
.paddingY-xl { padding-block: var(--pad-section-xl); }
.paddingY-none { padding-block: 0; }

/* Max width variants */
.maxWidth-narrow { --section-max-width: 800px; }
.maxWidth-standard { --section-max-width: 1200px; }
.maxWidth-wide { --section-max-width: 1400px; }
.maxWidth-full { --section-max-width: none; }
```

### PHASE 2: Migrate Sections WITH Existing Wrappers (Lower Risk)

#### Step 2.1: Migrate Hero Section
```bash
# ACTION 1: Read the Hero component
Read file: /src/features/Hero.tsx

# ACTION 2: Replace Section import with SectionWrapper
Edit file: /src/features/Hero.tsx
- import Section from '@/components/ui/Section'
+ import SectionWrapper from '@/components/ui/SectionWrapper'

# ACTION 3: Update JSX to use SectionWrapper
- <Section paddingY={blok?.paddingY || "none"}>
+ <SectionWrapper 
+   paddingY={blok?.paddingY || "none"}
+   maxWidth={blok?.maxWidth || "full"}
+   theme="inherit"
+   blok={blok}
+ >

# ACTION 4: Test that Hero still renders
Run: npm run dev
Navigate to: http://localhost:9999
Verify: Hero section displays correctly
```

#### Step 2.2: Migrate Spaces Section
```bash
# Same pattern as Hero - Read, Replace import, Update JSX, Test
```

#### Step 2.3: Migrate AlternatingBlocks Section
```bash
# Same pattern as Hero - Read, Replace import, Update JSX, Test
```

#### Step 2.4: Migrate ScheduleForm Section
```bash
# Same pattern as Hero - Read, Replace import, Update JSX, Test
```

#### Step 2.5: Migrate FAQ Section
```bash
# Same pattern as Hero - Read, Replace import, Update JSX, Test
```

### PHASE 3: Migrate Sections WITHOUT Wrappers (Higher Risk)

#### Step 3.1: Migrate Experience Section
```bash
# ACTION 1: Read the Experience component
Read file: /src/features/Experience.jsx

# ACTION 2: Import SectionWrapper
Add import: import SectionWrapper from '@/components/ui/SectionWrapper'

# ACTION 3: Wrap the entire component content
# BEFORE:
return (
  <section style={{ paddingBlock: '4rem' }}>
    {/* content */}
  </section>
)

# AFTER:
return (
  <SectionWrapper 
    paddingY={blok?.paddingY || "lg"}
    maxWidth={blok?.maxWidth || "standard"}
    blok={blok}
  >
    {/* content - NO MORE section tag */}
  </SectionWrapper>
)

# ACTION 4: Remove hardcoded padding styles from CSS module
Edit file: /src/features/Experience.module.css
Remove: padding, margin, max-width properties from root class

# ACTION 5: Test rendering
```

#### Step 3.2-3.7: Repeat for Gallery, BrandProof, HistoryCarousel, Map, Pricing, Footer
```bash
# Each follows same pattern:
1. Read component
2. Add SectionWrapper import
3. Wrap content with SectionWrapper
4. Remove hardcoded spacing from CSS
5. Test
```

### PHASE 4: Special Cases

#### Step 4.1: Footer Component
```bash
# Footer needs to remain a <footer> element
# Wrap the INNER content only:

<footer className={styles.footer}>
  <SectionWrapper paddingY="lg" maxWidth="standard">
    {/* footer content */}
  </SectionWrapper>
</footer>
```

#### Step 4.2: GlassToolbar (Skip)
```bash
# GlassToolbar is position:fixed - does NOT need wrapper
# Mark as N/A in tracker
```

### PHASE 5: Cleanup & Optimization

#### Step 5.1: Remove old Section component
```bash
# Only AFTER all migrations verified
Delete file: /src/components/ui/Section.jsx
Delete file: /src/components/ui/Section.module.css
```

#### Step 5.2: Remove redundant CSS
```bash
# Search for and remove from all .module.css files:
- Hardcoded padding-block values
- Hardcoded margin values  
- Hardcoded max-width values
- Container width styles
```

#### Step 5.3: Update Storyblok schemas
```bash
# Ensure all section components in Storyblok have:
- paddingY field (dropdown: xs, sm, md, lg, xl, none)
- marginY field (dropdown: xs, sm, md, lg, xl, none)
- maxWidth field (dropdown: narrow, standard, wide, full)
```

## ✅ VERIFICATION CHECKLIST

After each section migration, verify:
- [ ] Section renders without errors
- [ ] Spacing matches original design
- [ ] Storyblok props are respected when changed
- [ ] Theme variations work (test light/dark)
- [ ] Mobile responsiveness maintained
- [ ] No visual regressions

## 🚨 ROLLBACK PLAN

If a migration breaks:
1. `git diff` to see exact changes
2. `git checkout -- [filename]` to revert single file
3. `git reset --hard HEAD~1` to undo last commit (nuclear option)

## 📈 SUCCESS METRICS

- **Before**: 13 different spacing implementations, ~500 lines of redundant CSS
- **After**: 1 SectionWrapper component, 50 lines of reusable CSS
- **Result**: 90% reduction in spacing-related code

## 🤖 AI INSTRUCTION NOTES

**For Less Intelligent AI Systems:**

1. **DO NOT** attempt to migrate all sections at once
2. **DO** migrate one section completely before moving to next
3. **DO** run tests after EACH section migration
4. **DO** commit after each successful migration
5. **DO NOT** delete old Section component until ALL migrations complete
6. **DO** read each file before editing (no assumptions)
7. **DO** preserve all non-spacing related styles
8. **IF** confused, ask user before proceeding

## 📝 COMMIT MESSAGE TEMPLATE

After each section migration:
```
feat: Migrate [SectionName] to SectionWrapper

- Replaced custom spacing with SectionWrapper
- Connected Storyblok spacing props
- Removed [X] lines of redundant CSS
- Verified rendering and responsiveness
```

## 🏁 COMPLETION CRITERIA

Migration is complete when:
1. All 13 sections use SectionWrapper (or marked N/A)
2. Old Section component is deleted
3. All redundant spacing CSS is removed
4. All sections tested in browser
5. Final commit: "feat: Complete SectionWrapper standardization"

---

**CURRENT STATUS**: Ready to begin Phase 1
**NEXT ACTION**: Create SectionWrapper component
**TIME ESTIMATE**: 2-3 hours for complete migration