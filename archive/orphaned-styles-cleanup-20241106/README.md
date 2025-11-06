# Orphaned Styles Cleanup - November 6, 2024

## Overview
This archive contains CSS files that were identified as orphaned during the codebase cleanup.

## Files Archived

### `app-globals.css` (formerly `/src/app/globals.css`)
- **Status**: Orphaned (not imported anywhere)
- **Purpose**: Legacy Storyblok integration with OKLCH color system
- **Content**: 
  - Storyblok blueprint CSS import
  - DTCG design tokens with OKLCH colors
  - sRGB fallbacks for older browsers  
  - Progressive enhancement support
  - Accessibility features (motion, focus)
- **Reason for Removal**: 
  - Not imported in `layout.js`
  - Superseded by `/src/styles/globals.css`
  - Part of abandoned Storyblok integration approach

## Active CSS Architecture

The project now uses a clean, layered CSS architecture:

1. **Theme Tokens**: `/src/styles/tokens/theme.css` (OKLCH colors via CSS variables)
2. **Global Reset**: `/src/styles/globals.css` (modern reset, uses theme tokens)  
3. **Components**: `/src/styles/components/*.css` (component-specific styles)
4. **Primitives**: `/src/styles/primitives/*.css` (layout primitives)

## Restoration Instructions

If this file needs to be restored for any reason:

1. Copy `app-globals.css` back to `/src/app/globals.css`
2. Import it in `/src/app/layout.js` 
3. Consider conflicts with existing `/src/styles/globals.css`
4. Test theme system compatibility

## Analysis Date
November 6, 2024

## Cleanup Rationale
- File was not being used (no imports found)
- Duplicated functionality of active globals.css
- Legacy approach superseded by clean architecture
- Safe to remove with proper archival