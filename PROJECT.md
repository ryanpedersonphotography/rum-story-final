# Project Overview: Rum River Storyblock Archives (Admin Dashboard Shell)

## Introduction
This project is a **Next.js 15** application serving as a shell for an admin panel or client dashboard, specifically designed for managing wedding venue content ("Rum River"). 

**Current State:** The project is currently in an **incomplete/prototype state**. It features a sophisticated, animated side-navigation component (`GlassToolbar`) but lacks the functional content pages and data fetching logic required for a full application.

## Technology Stack

### Core Frameworks
- **Next.js:** v15.0.3 (App Router)
- **React:** v19.0.0-rc (Release Candidate)
- **TypeScript:** v5

### UI & Animation
- **Framer Motion:** For complex animations (likely used in `GlassToolbar`).
- **Embla Carousel:** Included in dependencies (likely for future photo galleries).
- **Yet Another React Lightbox:** Included in dependencies.
- **Tailwind CSS:** Not explicitly seen in standard config, but likely intended or partially used via PostCSS/styling setup.

### Content & Data
- **Contentful:** `next.config.mjs` is configured to allow images from Contentful (`images.ctfassets.net`), suggesting this is the intended Headless CMS.
- **Data Fetching:** Currently unimplemented in the visible source code.

### Tools & Quality
- **ESLint & Prettier:** For code linting and formatting.
- **Playwright:** For end-to-end testing (`playwright.config.ts` exists).
- **Pa11y CI:** For accessibility testing.

## Key Components

### `src/components/GlassToolbar.tsx`
This is the primary visual component implemented so far. It is a complex, stateful side-navigation bar.
- **Functionality:** Manages navigation between intended sections like "Dashboard", "Storyboard", "Timeline", and "Settings".
- **Status:** The UI logic exists, but it is currently disconnected from actual routes or content views.

### `src/app/page.tsx`
The main entry point. currently, it **only** renders the `GlassToolbar` component, serving as a container for the navigation shell.

## Project Structure

```
/
├── .claude/            # AI agent context files
├── .github/            # GitHub workflows (Accessibility, etc.)
├── netlify/            # Netlify edge functions (Deployment target)
├── public/             # Static assets (Images, icons, extensive 'history' and 'real-weddings' folders)
├── scripts/            # Build/utility scripts (e.g., 'capture-exact-static.js')
├── src/
│   ├── app/            # Next.js App Router pages and layouts
│   ├── components/     # React components (GlassToolbar)
│   ├── styles/         # CSS Architecture
│   │   ├── tokens/     # Design Tokens
│   │   │   ├── core.css        # Theme-agnostic foundations (spacing, typography, brand primitives)
│   │   │   ├── theme-dark.css  # Dark mode implementation
│   │   │   └── theme-light.css # Light mode implementation
│   │   ├── primitives/ # CSS Primitives
│   │   │   ├── layout.*.css
│   │   │   ├── composition.*.css
│   │   │   ├── media.*.css
│   │   │   ├── surface.*.css
│   │   │   └── typography.*.css
│   │   ├── primitives.css # Index for primitives cascade
│   │   └── tokens.css     # Index for tokens cascade
└── ... config files
```

## Architecture: Semantic CSS System

To keep the system semantic and future-proof, follow these strict rules:

### 1. Tokens only in `tokens/`
All colors, radii, shadows, glass settings, breakpoints, etc., must be defined as tokens in `src/styles/tokens/`.
- **Core (`core.css`):** Defines theme-agnostic values (spacing, typography, layout).
- **Themes (`theme-*.css`):** Defines semantic mappings (`--color-bg-page`, `--color-text`) to brand primitives.
- **Rule:** Primitives (even in separate files) must **only ever call `var(--...)`**. They should never contain raw hex codes or magic numbers.

### 2. Each primitive file is “dumb” and scoped
- **Frame (`surface.Frame.css`):** Owns card “physics” – radius, shadow, background using tokens (`--surface-*`, `--elevation-*`).
- **MediaBlock (`media.MediaBlock.css`):** Owns image “physics” – glass tokens (`--glass-*`), radius tokens (`--radius-*`).
- **Section (`layout.Section.css`):** Owns width modes (`standard`, `full`, `full-under-toolbar`) + surface/elevation mapping via `data-*` attributes. It does **not** own raw colors.

### 3. Order is explicit in index files
`src/styles/primitives.css` and `src/styles/tokens.css` act as the **cascade choreography**.
- **Rule:** If you see weird overrides, fix the import order in these index files. Do NOT add `!important` inside primitive files.

### 4. GLASS TOOLBAR IS SACRED
- **DO NOT TOUCH:** `src/components/GlassToolbar.tsx` or `src/styles/glass-toolbar.css`.
- These files are a completed "black box" implementation. Any modifications risk breaking the complex animation state.
- You may only assume its width (`--toolbar-width`) for layout offsets.

## Known Issues / Missing Parts
1.  **Missing Pages:** The sections defined in `GlassToolbar` (Dashboard, Storyboard, etc.) do not have corresponding page routes or components implemented in `src/app`.
2.  **Missing Build Script:** References were found to a design token system, but the build scripts for generating these tokens appear to be missing or incomplete.
3.  **Content Connection:** While Contentful is configured in Next.js, there is no code actively fetching or rendering data from it.

## Deployment
- **Netlify:** The presence of `netlify.toml` and `netlify/` directory indicates this project is deployed to Netlify.
- **Static Generation:** A script `scripts/capture-exact-static.js` (using Puppeteer) suggests a custom static site generation workflow, possibly to work around specific constraints or for snapshotting.