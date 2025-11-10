# Unified Section System Plan

## 🎯 Objective

To create a single, unified, and token-driven section system that is flexible, maintainable, and provides a consistent authoring experience in Storyblok. This plan supersedes the following documents:

*   `SECTION-SYSTEM-MASTER-PLAN.md`
*   `SECTION_SPACING_IMPROVEMENT_PLAN.md`
*   `TYPOGRAPHY_STANDARDIZATION_PLAN.md`

This new system will be based on the `SectionShell` component, which will be enhanced to include the best features of the `SectionWrapper` component.

## 🏗️ Architecture

The new unified section system will be based on a single component, `SectionShell`, which will be responsible for both the visual "frame" of the section and the orchestration of its content.

### `SectionShell` Component API

The enhanced `SectionShell` component will have the following props:

```typescript
export interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  // --- Layout ---
  align?: 'left' | 'center' | 'right';
  container?: 'prose' | 'content' | 'wide' | 'full';
  height?: 'auto' | 'screen';
  bleed?: boolean;

  // --- Spacing (from SectionWrapper) ---
  spacing?: 'hero-start' | 'content-flow' | 'feature-highlight' | 'compact-stack' | 'footer-approach' | 'none';
  paddingY?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  paddingX?: 'gutter' | 'none' | 'wide';

  // --- Theming ---
  tone?: 'auto' | 'light' | 'dark';
  background?: 'surface' | 'tint-rose' | 'tint-sage' | { kind: 'gradient'; token?: string } | { kind: 'image'; src: string; attachment?: 'fixed' | 'scroll'; fit?: 'cover' | 'contain'; position?: string; overlay?: 'none' | 'soft' | 'strong' };
  divider?: 'none' | 'hairline' | 'thread-gold';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg';

  // --- Content (from SectionWrapper) ---
  header?: {
    scriptAccent?: string;
    title?: string;
    lead?: string;
    align?: 'left' | 'center' | 'right';
  };

  // --- Advanced ---
  asChild?: boolean;
  as?: keyof JSX.IntrinsicElements;
  containerName?: string;
  stickiness?: { top?: string };
}
```

### Spacing System

The spacing system from `SECTION_SPACING_IMPROVEMENT_PLAN.md` will be implemented directly in `SectionShell`. This includes the `spacing` prop and the corresponding CSS classes.

### Typography System

The typography system from `TYPOGRAPHY_STANDARDIZATION_PLAN.md` will be implemented by migrating all section components to use the `Typography` and `Text` primitives. The `header` object in `SectionShell` will also use these primitives.

## 🚀 Implementation Plan

### Phase 1: Unify Section Components

1.  **Enhance `SectionShell.tsx`:**
    *   Add the `spacing` prop and the spacing preset logic from `SectionWrapper.tsx`.
    *   Add the `header` prop and the header rendering logic from `SectionWrapper.tsx`.
    *   Update the component to use the `Typography` and `Text` primitives for the header.
2.  **Update `SectionShell` styles:**
    *   Add the margin and padding classes from `SectionWrapper.module.css` to the `SectionShell`'s CSS.
3.  **Create a feature branch:** `git checkout -b feat/unify-section-system`
4.  **Commit changes:** `git commit -m "feat: Enhance SectionShell with spacing and header"`

### Phase 2: Migrate Feature Components

1.  **Replace `SectionWrapper` with `SectionShell`:**
    *   Go through each feature component in `src/features` (`AlternatingBlocks.tsx`, `Experience.tsx`, `Pricing.tsx`, etc.).
    *   Replace the `SectionWrapper` component with the new, enhanced `SectionShell` component.
    *   Map the props from the old `SectionWrapper` to the new `SectionShell`.
2.  **Commit changes for each component:** `git commit -m "refactor: Migrate [Component] to SectionShell"`
3.  **Validate server:** After migrating a few components, run `npm run dev` to ensure the site is still working.

### Phase 3: Migrate Typography

1.  **Migrate content to `Typography` and `Text`:**
    *   In each feature component, replace the remaining hardcoded typography with the `Typography` and `Text` primitives.
    *   Remove the old typography styles from the component's CSS module.
2.  **Commit changes for each component:** `git commit -m "refactor: Migrate [Component] typography to primitives"`
3.  **Validate server:** After migrating a few components, run `npm run dev` to ensure the site is still working.

### Phase 4: Cleanup

1.  **Delete `SectionWrapper.tsx` and `SectionWrapper.module.css`:**
    *   Once all components have been migrated, these files will no longer be needed.
2.  **Update documentation:**
    *   Update this plan to reflect the completion of the migration.
    *   Archive the old plan files.
3.  **Final commit:** `git commit -m "feat: Complete unification of section system"`
4.  **Merge to master:** After thorough testing, merge the feature branch into the `master` branch.

## 📝 Status Tracker

| # | Task | Status |
|---|---|---|
| 1 | Create `UNIFIED_SECTION_SYSTEM_PLAN.md` | ✅ Done |
| 2 | Enhance `SectionShell.tsx` | ⏳ Not Started |
| 3 | Update `SectionShell` styles | ⏳ Not Started |
| 4 | Create `feat/unify-section-system` branch | ⏳ Not Started |
| 5 | Migrate `AlternatingBlocks.tsx` | ⏳ Not Started |
| 6 | Migrate `Experience.tsx` | ⏳ Not Started |
| 7 | Migrate `Pricing.tsx` | ⏳ Not Started |
| 8 | ... (migrate other components) | ⏳ Not Started |
| 9 | Migrate typography in all components | ⏳ Not Started |
| 10 | Delete `SectionWrapper` | ⏳ Not Started |
| 11 | Final cleanup and documentation | ⏳ Not Started |
