# Project Overview: Rum River Barn Website

This project is a Next.js application built with React, designed to showcase the Rum River Barn venue. It leverages Storyblok as a headless Content Management System (CMS) to manage and deliver dynamic content. The application features a robust design system defined by design tokens, ensuring a consistent and accessible user experience.

## Key Technologies:
*   **Framework:** Next.js (App Router)
*   **UI Library:** React
*   **CMS:** Storyblok
*   **Styling:** CSS Modules (inferred from `stylelint` config and common Next.js practices), Design Tokens (managed with Style Dictionary)
*   **Testing:** Playwright for end-to-end testing.
*   **Accessibility Testing:** Pa11y-CI, Axe-core, Lighthouse
*   **Animation:** Framer Motion
*   **Carousel:** Embla Carousel
*   **Icons:** Heroicons, Lucide React

## Architecture:
The application uses Next.js's App Router. The main entry point is `src/app/page.tsx`, which fetches content from Storyblok for the 'home' slug. This content is then rendered using the `CleanStoryRenderer` component. Design tokens are centrally defined in the `tokens/` directory and are likely transformed into CSS variables or similar for use throughout the application. The project is configured for deployment on Netlify.

## Building and Running:

*   **Development Server:**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```
    (Runs on `https://localhost:9999` with experimental HTTPS)

*   **Build for Production:**
    ```bash
    npm run build
    # or
    pnpm build
    ```

*   **Start Production Server:**
    ```bash
    npm run start
    # or
    pnpm start
    ```
    (Runs on `http://localhost:6666`)

*   **Linting (JavaScript/TypeScript):**
    ```bash
    npm run lint
    # or
    pnpm lint
    ```

*   **Linting (CSS):**
    ```bash
    npm run lint:css
    # or
    pnpm lint:css
    ```

*   **Fix CSS Linting Issues:**
    ```bash
    npm run lint:css:fix
    # or
    pnpm lint:css:fix
    ```

*   **Build Design Tokens:**
    ```bash
    npm run tokens:build
    # or
    pnpm tokens:build
    ```

*   **Watch Design Tokens for Changes:**
    ```bash
    npm run tokens:watch
    # or
    pnpm tokens:watch
    ```

*   **Run Accessibility Tests (Pa11y-CI):**
    ```bash
    npm run test:a11y
    # or
    pnpm test:a11y
    ```

*   **Run Lighthouse Accessibility Audit:**
    ```bash
    npm run lighthouse
    # or
    pnpm lighthouse
    ```

## Development Conventions:

*   **Design Tokens:** The project utilizes a comprehensive design token system for managing colors, typography, spacing, and other visual properties. Developers should use these tokens rather than hardcoding values.
*   **Storyblok Integration:** Content is managed via Storyblok. Components are designed to consume data provided by the Storyblok API.
*   **Accessibility:** A strong emphasis is placed on accessibility, with dedicated scripts and tools (`pa11y-ci`, `axe-core`, `lighthouse`) integrated into the development workflow.
*   **Code Style:** ESLint and Stylelint are configured to enforce consistent code style for JavaScript/TypeScript and CSS respectively.
*   **Path Aliases:** The project uses the `@/*` alias for `./src/*` to simplify import paths.
*   **Deployment:** The project is configured for deployment on Netlify, with specific build commands and caching headers defined in `netlify.toml`.
