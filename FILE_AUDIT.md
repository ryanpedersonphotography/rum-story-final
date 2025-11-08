# File Audit Report

This report documents the purpose and content of each file within the project's `src/` directory.

---
## src/app/api/revalidate/route.ts

The file `src/app/api/revalidate/route.ts` defines an API route for handling Storyblok webhooks to trigger content revalidation. The `POST` function verifies the incoming webhook signature using `STORYBLOK_WEBHOOK_SECRET` for security. Upon successful verification, it parses the webhook payload to identify the action and story details. It then triggers a Netlify build hook (configured via `NETLIFY_BUILD_HOOK`) to re-deploy the site, ensuring that updated content from Storyblok is reflected. A `GET` function is also provided for a health check, indicating if the webhook and build hook secrets are configured.

---
## src/app/api/storyblok-story/route.ts

The file `src/app/api/storyblok-story/route.ts` defines an API route for fetching a single Storyblok story by its UUID. The `GET` function extracts the `uuid` and an optional `version` (defaults to 'draft') from the request's search parameters. It constructs a Storyblok CDN API URL using the `NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN` and fetches the story. The response is then returned as JSON. It includes error handling for missing UUIDs, missing Storyblok token, and API fetch failures, providing appropriate HTTP status codes and logging. The `revalidate` option for `fetch` is set based on the `version` to control caching behavior.

---
## src/app/demo/sections/page.tsx

The file `src/app/demo/sections/page.tsx` serves as a demonstration page for various section components and their styling. It showcases the integration of "legacy" components (`Hero`, `Experience`, `Spaces`) through their respective adapter components (`LegacyHeroAdapter`, `LegacyExperienceAdapter`, `LegacySpacesAdapter`) using mock data. Additionally, it includes several `Section` components with different configurations (backgrounds, content widths, alignments, elevations, header placements, and overlap properties) to test and visualize the design system's capabilities and ensure consistent rendering. This page is crucial for development and testing of the UI components and their interaction with the styling system.

---
## src/app/faq/page.tsx

The file `src/app/faq/page.tsx` defines the Frequently Asked Questions (FAQ) page for the Rum River Barn website. It sets the page's metadata (title and description) and uses a `PageTemplate` for consistent layout. The component renders a list of predefined FAQs, each presented as an interactive `details`/`summary` element, allowing users to expand and collapse answers. The page also includes a call to action section encouraging users to contact the venue or schedule a tour if they have further questions.

---
## src/app/pricing/page.tsx

The file `src/app/pricing/page.tsx` defines a static pricing page for the Rum River Barn venue. It sets the page's metadata (title and description) and utilizes a `PageTemplate` for consistent layout. The page presents three distinct pricing packages: "Essential," "Premium" (highlighted as most popular), and "Luxury," each detailing included services and a price. It also includes a call to action for custom quotes. Notably, the content for this page is hardcoded within the component and is explicitly marked as "Developer-owned page (not in Storyblok)," indicating it's not managed through the CMS.

---
## src/components/StoryblokProvider.tsx

The file `src/components/StoryblokProvider.tsx` is a client-side component responsible for initializing the Storyblok SDK. It now uses centralized component maps from `src/lib/storyblok-component-map.ts`. Based on the current route, it conditionally initializes Storyblok with either the `cleanComponentMap` (for the main `/` route) or the `editorComponentMap` (for all other routes). This ensures that the public-facing site uses the new "clean" components while the Storyblok visual editor continues to function with the legacy "editor" components on other routes.

---
## src/components/ThemeToggle.tsx

The file `src/components/ThemeToggle.tsx` implements a client-side theme toggle component that allows users to switch between 'light', 'dark', and 'system' (prefers-color-scheme) modes. It uses React's `useState` and `useEffect` hooks to manage the current theme mode, persist it in `localStorage`, and apply it to the `data-theme` attribute on the `document.documentElement`. The component dynamically renders an icon (Sun, Moon, or Desktop) based on the active mode and provides accessibility features like `aria-label` and `title`. It also includes inline CSS for styling the toggle button and its icons, with variations for 'default' and 'toolbar' appearances. A hydration-safe mounting mechanism ensures the component doesn't render until fully mounted to prevent mismatches.

---
## src/components/examples/SectionDemo.tsx

The file `src/components/examples/SectionDemo.tsx` provides a comprehensive demonstration of the layered `Section` system, particularly its integration with Storyblok. It showcases how to wrap existing components (like `Hero`) and custom content within the `Section` primitive while maintaining full compatibility with the Storyblok Visual Editor using `storyblokEditable`. The file illustrates various `Section` configurations, including different backgrounds, content widths, alignments, and custom classes for elevation. It also presents "Migration Patterns" showing how to transition from older component structures to the new `Section`-based system, and "Advanced Examples" demonstrating semantic HTML usage and custom spacing/elevation through CSS variables. This file serves as a valuable reference and testing ground for developers working with the design system.

---
## src/components/faq/faq.css

The file `src/components/faq/faq.css` provides specific styling for the FAQ component. It defines styles for a `.faq-container` to control its maximum width, centering, padding, border-radius, and background color, utilizing CSS variables for design tokens. It also ensures proper vertical spacing between individual FAQ items using `margin-top`. Additionally, it includes a style adjustment to make the `.faq-container`'s background transparent when it is nested within a `.section-shell` that has a `data-bg="tint-sage"` attribute, indicating an integration with a broader section styling system.

---
## src/components/gallery/MasonryGallery.tsx

The file `src/components/gallery/MasonryGallery.tsx` implements a responsive masonry image gallery component with infinite scrolling and a lightbox feature. It takes an array of image objects, the number of columns, and an initial load count as props. Images are distributed across columns to create the masonry effect. It uses `IntersectionObserver` for infinite scrolling, loading more images as the user scrolls down. Clicking an image opens a full-screen lightbox using `yet-another-react-lightbox`. The component includes inline JSX styling for the masonry layout, hover effects, and a loading spinner, with media queries for responsive adjustments across different screen sizes.

---
## src/components/gallery/WeddingGalleryModal.tsx

The file `src/components/gallery/WeddingGalleryModal.tsx` implements a modal component designed to display a wedding photo gallery. It takes `isOpen`, `onClose`, and `wedding` data as props. When open, it renders a `MasonryGallery` component with images from the provided `wedding` data. The modal includes a header displaying wedding details (title, date, location) and a close button. It handles keyboard events (ESC key to close) and manages body scroll to prevent scrolling behind the modal. If no images are available, it displays a "Coming Soon" message. The component also includes inline JSX styling for the modal's appearance, animations, and responsiveness, with some props (`variant`, `showTestimonial`) prepared for future enhancements.

---
## src/components/storyblok/AlternatingBlocksEditor.tsx

The file `src/components/storyblok/AlternatingBlocksEditor.tsx` is a Storyblok editor component designed to render a section with alternating content blocks. It's specifically intended for use within the Storyblok visual editor, indicated by the `Editor` suffix and the use of `storyblokEditable`. The component displays a section header (script accent, title, description) and then iterates through an array of `blocks` provided via Storyblok. Each block can have an image, title, lead text, and rich text content. It uses fallback images if none are provided and applies alternating layout classes (`reverse`) based on the block's `is_reverse` property. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/BrandSocialProofEditor.tsx

The file `src/components/storyblok/BrandSocialProofEditor.tsx` is a Storyblok editor component designed to display brand social proof, combining a list of brands with a testimonial quote. It's marked for client-side rendering and Storyblok editing. The component parses a newline-separated string of brands from `blok.brands` and renders them. It also takes a `quote_text` string which can contain placeholders (`{highlight_1}`, `{highlight_2}`) that are replaced with content from `blok.highlight_1` and `blok.highlight_2`, rendered with a special `hotfix-highlight` class. This allows editors to easily manage and highlight key phrases within the testimonial. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/client/StoryblokBridge.tsx

The file `src/components/storyblok/client/StoryblokBridge.tsx` is a client-side component that initializes the Storyblok SDK and bridge for the visual editor. It now uses the centralized `editorComponentMap` from `src/lib/storyblok-component-map.ts` for its component registration. The component sets up the bridge to listen for `input`, `change`, and `published` events from Storyblok, enabling real-time content updates in the editor by updating its internal state and refreshing the router.

---
## src/components/storyblok/FAQAccordionEditor.tsx

The file `src/components/storyblok/FAQAccordionEditor.tsx` is a Storyblok editor component that renders an interactive FAQ accordion. It's designed for client-side use and Storyblok editing. The component displays a title and subtitle, and a list of FAQ items. If no FAQ items are provided via Storyblok, it uses a set of default FAQs. Each FAQ item is clickable, toggling its answer's visibility, and includes accessibility features like `role="button"` and `tabIndex`. The component manages the active state of each accordion item using React's `useState` hook. This component allows content editors to easily manage and display frequently asked questions on the website.

---
## src/components/storyblok/FeaturedWeddingsEditor.tsx

The file `src/components/storyblok/FeaturedWeddingsEditor.tsx` is a Storyblok editor component designed to display a grid of featured wedding stories. It fetches wedding data from Storyblok's API using UUIDs provided in `blok.featured_weddings`. Each wedding card displays a cover image, couple names, wedding date, and location. Clicking on a card opens a `WeddingGalleryModal` to showcase the full photo gallery for that wedding. The component includes error handling for failed fetches and missing content. It also provides a call-to-action button if configured in Storyblok. The component uses inline JSX styling with responsive adjustments and is marked for client-side rendering and Storyblok editing.

---
## src/components/storyblok/FooterEditor.tsx

The file `src/components/storyblok/FooterEditor.tsx` is a Storyblok editor component that renders the website's footer. It's designed for client-side use and Storyblok editing. The footer is structured into three columns: brand information (title and description), contact information (address, phone, email), and social media links (Facebook, Instagram). All content is dynamically pulled from the `blok` prop, with fallback default values if not provided. It uses Lucide React icons for visual representation of contact and social links. The component also includes a dynamic copyright year. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/HeroEditor.tsx

The file `src/components/storyblok/HeroEditor.tsx` is a Storyblok editor component that renders a hero section. It's designed for client-side use and Storyblok editing. The hero section displays a background image (with a fallback), a kicker text, a main title with an accent, a description, and a call-to-action button. All content is dynamically pulled from the `blok` prop, with fallback default values. It includes a scroll indicator that, when clicked, smoothly scrolls the page down by 90% of the viewport height using `requestAnimationFrame` and an ease-out-quad function for a smooth animation. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/HistoryCarouselEditor.tsx

The file `src/components/storyblok/HistoryCarouselEditor.tsx` is a Storyblok editor component that displays a historical timeline and image carousel. It's designed for client-side use and Storyblok editing. The component features a header (script accent, title, lead text) and a dynamic timeline with markers representing historical years. It uses `embla-carousel-react` with `Autoplay` plugin to create an image carousel, where each slide displays an image and associated historical data (year, title, description). The carousel automatically plays when the section becomes visible via `IntersectionObserver`. Users can navigate the carousel with previous/next buttons and toggle autoplay. The component includes extensive inline JSX styling for a "polaroid" card effect, timeline, and responsive adjustments. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/LoveStoriesGalleryEditor.tsx

The file `src/components/storyblok/LoveStoriesGalleryEditor.tsx` is a Storyblok editor component that displays a gallery of "love stories" (weddings). It's designed for client-side use and Storyblok editing. The component fetches detailed wedding data from Storyblok's API for each linked `wedding_story` UUID. It then renders a grid of gallery cards, each displaying a cover image (with a complex fallback logic prioritizing card-specific images, then wedding story images, then placeholders), couple names, season, and a "View Gallery" hint. Clicking a card opens a `WeddingGalleryModal` to show the full photo gallery. The component handles fetching linked stories, managing modal state, and includes error handling for API calls. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/MapSectionEditor.tsx

The file `src/components/storyblok/MapSectionEditor.tsx` is a Storyblok editor component that displays a map section with key location details. It's designed for client-side use and Storyblok editing. The component includes a section header (script accent, title, lead text) and a grid layout featuring an embedded Google Map (via `iframe`) surrounded by `LocationItem` components. The `LocationItem` sub-component displays an icon (dynamically chosen based on `icon_type`), a title, and content. Default location items are provided, and the component includes logic to trim and reorder these items for a balanced 6-item layout, even adding new "Parking" and "Year-Round" items if the Storyblok data is insufficient. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/Page.tsx

The file `src/components/storyblok/Page.tsx` is a foundational Storyblok editor component that serves as a container for other Storyblok components. It's designed for client-side use and Storyblok editing. This component takes a `blok` prop, which represents the Storyblok page content. It iterates through the `blok.body` array, rendering each nested Storyblok component using `StoryblokComponent`. This allows for dynamic page construction where the layout and content of a page are entirely managed within Storyblok by composing various blocks.

---
## src/components/storyblok/PricingEditor.tsx

The file `src/components/storyblok/PricingEditor.tsx` is a Storyblok editor component that displays wedding packages and pricing information. It's designed for client-side use and Storyblok editing. The component features a section header (script accent, title, hero line, description) and a grid of pricing cards. Each card represents a package ("Essentials," "Celebration," "Luxe Experience") with its name, price (weekend and weekday), a "popular" badge for the "Celebration" package, and a list of included features. It uses Lucide React icons for visual elements like checkmarks and a star. The content for the packages is hardcoded within the component, while the section header content is pulled from the `blok` prop with fallbacks. The component includes call-to-action buttons for checking availability and booking a tour.

---
## src/components/storyblok/RealWeddingEditor.tsx

The file `src/components/storyblok/RealWeddingEditor.tsx` is a Storyblok editor component designed to display a detailed "Real Wedding" page. It's designed for client-side use and Storyblok editing. The page features a compact hero section with a background image (selected from gallery photos or a fallback), wedding title, date, and location. It then presents an introduction text (rich text rendered from Storyblok) and, if available, a sidebar listing wedding vendors (photography, DJ, flowers, catering) with their names, websites, and descriptions. The core of the page is a `MasonryGallery` displaying all wedding photos. A `FooterEditor` component is also included at the bottom. The component uses extensive inline JSX styling with responsive adjustments. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/RumRiverExperienceEditor.tsx

The file `src/components/storyblok/RumRiverExperienceEditor.tsx` is a Storyblok editor component that highlights the "Rum River Experience" with a descriptive text, a list of features, and an accompanying image. It's designed for client-side use and Storyblok editing. The component displays a header (subtitle, title, description) and a grid of features, each with an icon (mapped from Heroicons), title, and description. Default features are provided if none are configured in Storyblok. An image, either from Storyblok or a placeholder, is displayed alongside the text content. All content is dynamically pulled from the `blok` prop with fallbacks.

---
## src/components/storyblok/ScheduleFormEditor.tsx

The file `src/components/storyblok/ScheduleFormEditor.tsx` is a Storyblok editor component that renders a form for scheduling a tour or inquiry. It's designed for client-side use and Storyblok editing. The component displays a section header (script accent, title, lead text) and a multi-field form. The form collects user's name, email, phone, proposed event date, preferred tour date and time, estimated guest count, and additional messages. It includes a hidden honeypot field for spam protection. Upon submission, the form data is posted to `/__forms.html` (likely handled by Netlify Forms) and then redirects to a thank-you page. The submit button text and thank-you URL are configurable via Storyblok. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/storyblok/Spaces.tsx

The file `src/components/storyblok/Spaces.tsx` is a Storyblok component that displays a section detailing various event spaces. It's designed for server-side rendering (indicated by `storyblokEditable` from `@storyblok/react/rsc`). The component renders an optional header (title and description) and a grid of individual `space` items. Each `space` item includes an image, title, description, a list of features, and an optional link. All content is dynamically pulled from the `blok` prop. This component is likely used on the public-facing site to showcase different areas of the venue.

---
## src/components/storyblok/SpacesEditor.tsx

The file `src/components/storyblok/SpacesEditor.tsx` is a Storyblok editor component that provides an interactive display of different venue spaces. It's designed for client-side use and Storyblok editing. The component features a section header (script accent, title, description) and a tabbed interface allowing users to select different venue areas (Barn, Bridal Suite, Groom's Quarters, Garden Pavilion). For each selected venue, it displays a main image (with a carousel for multiple images), a description, and a list of key features. The venue data, including images and descriptions, is hardcoded within the component. Users can navigate through images using previous/next arrows. All content for the section header is dynamically pulled from the `blok` prop with fallbacks.

---
## src/components/storyblok/TestimonialsEditor.tsx

The file `src/components/storyblok/TestimonialsEditor.tsx` is a Storyblok editor component that displays a section of testimonials from couples. It's designed for client-side use and Storyblok editing. The component features a header (script accent, title, lead text) and dynamically renders testimonials in two modes:
1. **Deluxe Weddings Mode:** If `blok.deluxe_weddings` (an array of UUIDs) is populated, it fetches detailed wedding stories from Storyblok's API. Each wedding is displayed as a card with a quote, a 5-star rating, an avatar/cover image, and the couple's name. Clicking a card opens a `WeddingGalleryModal` to show the full wedding gallery.
2. **Regular Testimonials Mode:** If `deluxe_weddings` is empty, it renders a grid of `TestimonialItem` components, which are nested Storyblok blocks.

The `TestimonialItem` sub-component displays a quote, customer name, avatar, and an optional link to a gallery. Both modes include a `StarRating` component. The component handles fetching linked stories, managing modal state, and includes error handling for API calls. The styling classes prefixed with `hotfix-` suggest this component might be part of a temporary or legacy styling solution.

---
## src/components/templates/PageTemplate.tsx

The file `src/components/templates/PageTemplate.tsx` defines a reusable page layout component. It takes `children` (the main content of the page) and an optional `className` as props. This template wraps the children with a `Navbar` at the top and a `Footer` at the bottom, providing a consistent header and footer across pages. It also includes a `GlassToolbar` component, likely for development or debugging purposes. The `data-clean-root="true"` attribute suggests its role in a "clean architecture" or design system.

---
## src/components/ui/Button.tsx

The file `src/components/ui/Button.tsx` defines a highly customizable and accessible `Button` component. It supports various visual styles (`variant`), sizes (`size`), corner radiuses (`corner`), and can be rendered as an icon-only button. Key features include:
- **Loading States:** Displays a spinner with optional `loadingText` and `spinnerPosition` (start, end, overlay), preventing layout shift by preserving width.
- **Accessibility:** Handles `aria-busy`, `aria-disabled`, and `tabIndex` for disabled/loading states, and requires `aria-label` for icon-only buttons.
- **`asChild` Prop:** Allows rendering as a child of another component (e.g., `Next.js Link`) while inheriting button styling and behavior, preserving semantic honesty.
- **Styling:** Uses `data-` attributes for CSS styling, enabling flexible theming and component-specific styles.
- **Event Handling:** Composes event handlers to ensure proper behavior when `asChild` is used.

This component is a foundational UI primitive designed for production-ready applications, emphasizing WCAG compliance and a robust developer experience.

---
## src/components/ui/Card/Card.css

The file `src/components/ui/Card/Card.css` defines the base styling for the `Card` UI component. It establishes CSS variables for various design tokens such as background, foreground color, border, border-radius, and padding, with fallback values. The `.card` class sets default styles including background, color, border, border-radius, box-shadow (elevation), and transitions for interactive effects. It supports different visual `variants` (elevated, outline, ghost), `elevation` levels (0-3), `padding` sizes (none, sm, md, lg), and `radius` sizes (sm, md, lg, xl) through `data-` attributes. Interactive states (`data-interactive="true"`) include hover and focus styles for accessibility. The file also defines styles for internal slots like `card__media`, `card__header`, `card__title`, `card__subtitle`, `card__body`, `card__actions`, and `card__footer`, providing a structured and flexible styling system for cards.

---
## src/components/ui/Card/Card.tsx

The file `src/components/ui/Card/Card.tsx` defines a composite `Card` component using React and Radix UI's `Slot` primitive for flexible rendering. It provides a `CardRoot` component that accepts props for `variant` (elevated, outline, ghost), `padding`, `radius`, `elevation`, and `interactive` behavior. The `asChild` prop allows the `Card` to render as a child of another element while inheriting its styling. The component also exports several sub-components (`Card.Header`, `Card.Media`, `Card.Body`, `Card.Footer`, `Card.Title`, `Card.Subtitle`, `Card.Actions`) to structure card content semantically. This modular design promotes reusability and consistent UI across the application, leveraging `data-` attributes for styling defined in `Card.css`.

---
## src/components/ui/Card/CardGroup.css

The file `src/components/ui/Card/CardGroup.css` provides styling for arranging `Card` components in a grid or flex layout. It defines CSS variables for various gap sizes (`sm`, `md`, `lg`, `xl`) and a minimum card width (`card-min`), with fallback values. The `.card-group` class establishes a default CSS Grid layout with a large gap. It supports different `gap` sizes, explicit `columns` (1-6), and responsive `auto-fit` columns using `minmax` via `data-` attributes. Alignment and justification within the grid can also be controlled. An `equal-height` option ensures all cards in the group have the same height. A flexbox fallback is also provided for older user agents or specific use cases. This stylesheet works in conjunction with `Card.tsx` and `Card.css` to create flexible and responsive card layouts.

---
## src/components/ui/Card/CardGroup.tsx

The file `src/components/ui/Card/CardGroup.tsx` defines a React component for grouping `Card` components into a flexible and responsive layout. It acts as a container that applies grid or flexbox styling to its children. Props include `columns` (explicit numbers 1-6 or 'auto' for responsive `minmax` behavior), `min` (minimum card width for 'auto' columns), `gap` (spacing between cards), `align` (cross-axis alignment), `justify` (main-axis distribution), `equalHeight` (to ensure all cards have the same height), and `wrap` (for flex mode). It uses `data-` attributes to pass styling configurations to `CardGroup.css`, allowing for declarative control over the layout.

---
## src/components/ui/Card/index.ts

The file `src/components/ui/Card/index.ts` serves as an entry point for the `Card` component module. It re-exports the `Card` component from `./Card.tsx`, making it easier to import the `Card` and its associated sub-components (like `Card.Header`, `Card.Body`, etc.) from a single path. The commented-out lines suggest that while individual sub-components could be re-exported for tree-shaking benefits, the current compound API approach (where sub-components are properties of the main `Card` object) is preferred for developer experience.

---
## src/components/ui/Heading.tsx

The file `src/components/ui/Heading.tsx` defines a versatile `Heading` primitive component for semantic and token-driven typography. It allows specifying the semantic HTML heading level (`as` prop, e.g., `h1` to `h6`) independently from its visual size (`size` prop, e.g., `xs` to `xl`). Other features include text alignment (`align`), text balancing (`balance`) to prevent orphaned words, an optional `muted` style, and an `blockMargin` prop to control block margins. By default, it has zero margins to promote composition. The component uses `data-` attributes for styling, enabling a flexible and consistent typography system across the application.

---
## src/components/ui/PropsSlot.tsx

The file `src/components/ui/PropsSlot.tsx` defines a utility component called `PropsSlot`. This component is designed to inject props into its single child element, facilitating a pattern similar to Radix UI's `Slot` but with explicit prop merging logic. It's particularly useful for scenarios where a component needs to pass its own props (like `className`, `style`, `ref`, and event handlers) down to a child element, especially when that child might be a custom component or a native HTML element. It intelligently merges `className` and `style` attributes, composes `ref`s, and ensures that event handlers from both the parent and child are executed, with the child's handler running first. This allows for flexible component composition while maintaining proper prop inheritance and event flow.

---
## src/components/ui/section-types.ts

The file `src/components/ui/section-types.ts` defines TypeScript type definitions for various properties used in section components, particularly for the `Section` UI primitive. It exports types for:
- `Align`: Text alignment options ('left', 'center', 'right').
- `Width`: Content width options ('prose', 'content', 'wide', 'full').
- `PaddingY`: Vertical padding options ('xs', 'sm', 'md', 'lg', 'xl', 'fluid').
- `Background`: Background styling options ('surface', 'tint-rose', 'tint-sage', 'dark-gradient', 'image').
- `Tone`: Color tone options ('light', 'dark', 'auto').
- `Divider`: Divider style options ('none', 'hairline', 'thread-gold').
- `Height`: Section height options ('auto', 'screen').
- `Container`: Container type options ('rails', 'wrapper').
- `Variant`: Named layout presets for common section configurations.
- `SectionHeaderProps`: Interface for header content.
- `SectionImageProps`: Interface for background image properties.
- `SectionSlots`: Interface for props to be passed to various content slots within a section.

These types ensure consistency and type safety when configuring section components throughout the application.

---
## src/components/ui/Section.tsx

The file `src/components/ui/Section.tsx` defines a powerful and flexible `Section` component, serving as a core UI primitive for layout and content structuring. It implements a token-driven design system, allowing extensive customization through props for:
- **Layout:** `align`, `headerWidth`, `contentWidth`, `paddingY`, `height`, `bleed`, `container` (either 'rails' for a dual-rail system or 'wrapper' for a simple centered container).
- **Visuals:** `background`, `tone`, `divider`, `image` (for background images with attachment and position), and `overlay`.
- **Content:** `header` (with script accent, title, lead), `actions`, and `children`.

It supports named `variant` presets (e.g., 'home-hero-2024', 'alternating-blocks-luxe') for quick configuration of common patterns. The component uses `data-` attributes extensively for CSS targeting, ensuring a robust and maintainable styling approach. It also includes logic for deep-merging header props and resolving default values based on presets and explicit props. This component is central to building consistent and responsive page sections.

---
## src/components/ui/SectionShell.tsx

The file `src/components/ui/SectionShell.tsx` defines a foundational `SectionShell` component, acting as a visual "frame" for sections. It's designed to separate visual concerns (theming, spacing, bleed, overlays) from content orchestration. It uses Radix UI's `Slot` for flexible element rendering (`asChild` prop) and supports various semantic HTML elements (`as` prop). Key props include:
- **Layout:** `align`, `container` (content width), `paddingY`, `paddingX`, `height`, `bleed`.
- **Visuals:** `tone`, `background` (supporting string tokens, gradients, or image objects with attachment, fit, position, and overlay), `divider`, `radius`, `shadow`.
- **Advanced:** `containerName` (for CSS container queries) and `stickiness`.

The component extensively uses `data-` attributes for CSS targeting and applies inline styles for background images and stickiness. It wraps its children within a `section-shell__rail` div and can render an optional overlay and divider. This component provides a robust and highly configurable base for building consistent and visually appealing sections.

---
## src/components/ui/SpinnerSVG.tsx

The file `src/components/ui/SpinnerSVG.tsx` defines a simple React component that renders an SVG spinner. It's designed to be a lightweight and customizable loading indicator. The SVG uses two `circle` and `path` elements to create the spinner animation, with `currentColor` for stroke, allowing it to inherit the parent's text color. It includes `aria-hidden="true"` and `focusable="false"` for accessibility, ensuring it's ignored by assistive technologies. The component accepts standard SVG props, making it flexible for sizing and styling.

---
## src/components/ui/Surface.tsx

The file `src/components/ui/Surface.tsx` defines a generic `Surface` component, designed to act as a flexible container for content, often used for sections or visual blocks. It allows specifying the underlying HTML element (`as` prop, defaulting to `section`). Key features include:
- **Background Images:** Supports setting a background image with properties like `src`, `attachment`, `position`, and an optional `overlay`.
- **Styling:** Merges provided `className` and `style` props, and accepts `dataAttributes` for CSS targeting.
- **Flexibility:** Can render as any HTML element, making it highly adaptable.

This component provides a basic building block for creating visually distinct areas on a page, particularly useful for applying background treatments and overlays.

---
## src/components/ui/Text.tsx

The file `src/components/ui/Text.tsx` defines a versatile `Text` primitive component for rendering body text with semantic HTML and token-driven typography. It allows specifying the underlying HTML element (`as` prop, e.g., `p`, `span`, `div`) and visual size (`size` prop, e.g., `xs` to `lg`). Other features include text alignment (`align`), an optional `muted` style for secondary text, and an `blockMargin` prop to control block margins. By default, it has zero margins to promote composition. The component uses `data-` attributes for styling, enabling a flexible and consistent typography system across the application, and supports true polymorphic typing for element-specific props and refs.

---
## src/components/ui/ThemeProvider.tsx

The file `src/components/ui/ThemeProvider.tsx` implements a React Context Provider for managing the application's theme (light/dark) and brand (romantic/modern) states. It's a client-side component that:
- **Initializes State:** Reads initial theme and brand from `document.documentElement` attributes (set by a pre-paint script in `layout.js`) or defaults.
- **Manages State:** Provides `theme`, `setTheme`, `brand`, and `setBrand` values via a React Context.
- **Persists State:** Updates `localStorage` when theme or brand changes.
- **Applies Styles:** Modifies `document.documentElement` attributes to apply theme/brand-specific CSS classes, which are then picked up by the `THEME_REGISTRY` and `BRAND_REGISTRY` (defined in `lib/theme/registry.ts`).
- **Syncs Across Tabs:** Listens to `storage` events to synchronize theme/brand changes across multiple tabs.
- **Responds to OS Preferences:** Detects changes in the user's operating system's color scheme preference (`prefers-color-scheme`) and updates the theme accordingly, unless a theme has been explicitly set by the user.

This provider ensures a consistent and responsive theming experience across the application, with a focus on user preferences and cross-tab synchronization. It also exports a `useTheme` hook for easy consumption of the theme context.

---
## src/components/ui/types.ts

The file `src/components/ui/types.ts` serves as a central location for shared TypeScript type definitions used across multiple UI primitive components. Currently, it exports the `Align` type, which defines text alignment options ('start', 'center', 'end'). This centralization helps prevent type drift and ensures consistent API definitions across components like `Heading` and `Text`.

---
## src/development/GlassToolbar.tsx

The file `src/development/GlassToolbar.tsx` implements a "Glass Toolbar" component, likely intended as a development or administrative navigation tool. It's a client-side component that provides a collapsible sidebar with primary navigation sections and secondary sub-items. Key features include:
- **Expand/Collapse:** The toolbar can be manually pinned or automatically expands on hover/focus.
- **Sections & Items:** Organizes navigation into `ToolbarSection`s (e.g., Overview, Experience, Settings, Dev Tools) each with an icon and optional `ToolbarItem`s.
- **Framer Motion:** Uses `framer-motion` for smooth animations when expanding/collapsing and transitioning between sub-menus, with reduced motion support.
- **Accessibility:** Includes `aria-label`, `aria-expanded`, and `aria-controls` for improved accessibility.
- **Dynamic Styling:** Adjusts CSS variables (`--glass-toolbar-offset`) to manage layout based on its expanded state.
- **Event Handling:** Manages complex hover, focus, and pointer events to control its expanded state and prevent unintended collapses.

This component provides a sophisticated and interactive navigation overlay, primarily for internal use or specific user roles, offering quick access to different parts of the application or development tools.

---
## src/development/ThemeSelect.tsx

The file `src/development/ThemeSelect.tsx` implements a UI component for developers or administrators to dynamically switch between different color schemes (themes) and brand palettes. It's a client-side component, explicitly marked as "Dev/Admin Only," and is typically rendered conditionally in development environments. It utilizes the `useTheme` hook from `src/components/ui/ThemeProvider.tsx` to access and modify the application's theme and brand states. The component presents buttons for each available theme (e.g., 'light', 'dark') and brand (e.g., 'romantic', 'modern'), allowing real-time preview of styling changes. It also displays color swatches for each brand. The component uses inline styles for its layout and appearance, and provides informational text about persistence and public site limitations.

---
## src/features/AlternatingBlocks.tsx

The file `src/features/AlternatingBlocks.tsx` implements a feature component that displays content in alternating blocks, typically with text on one side and an image on the other. It's designed for server-side rendering and Storyblok integration. The component uses the `Section` UI primitive to define its overall layout and styling, allowing customization of background, theme tone, padding, and a divider. It supports various `variant` presets for fine-grained control over header and content width. The component iterates through an array of `blocks` from Storyblok, rendering each with a number, title, lead text, rich text content, and an image (with fallback options). The layout alternates based on the `is_reverse` property of each block.

---
## src/features/BrandProof.tsx

The file `src/features/BrandProof.tsx` implements a feature component for displaying brand social proof, combining a list of recognized brands with a testimonial quote. It's designed for client-side rendering and Storyblok integration. The component uses the `Section` UI primitive for its layout and styling, with a `tint-rose` background and medium vertical padding. It parses a newline-separated string of brands from `blok.brands` and renders them. The `quote_text` can contain placeholders (`{highlight_1}`, `{highlight_2}`) which are replaced by content from `blok.highlight_1` and `blok.highlight_2`, rendered with a `highlight` class. This allows content editors to easily manage and emphasize key phrases within the testimonial.

---
## src/features/CleanStatic.tsx

The file `src/features/CleanStatic.tsx` defines a static composition of various feature components, intended as a fallback or a demonstration of a "clean" page structure. It imports and renders a sequence of core feature components: `Navbar`, `Hero`, `Spaces`, `AlternatingBlocks`, `Experience`, `Gallery`, `BrandProof`, `ScheduleForm`, `Map`, `FAQ`, `Pricing`, and `Footer`. This component is likely used when dynamic content fetching (e.g., from Storyblok) fails, or for a simplified, hardcoded version of the homepage, as suggested by the comment "Optional: a static clean stack for /clean?static=1 or fetch failures".

---
## src/features/CleanStoryblokBridge.tsx

The file `src/features/CleanStoryblokBridge.tsx` is a client-side component responsible for integrating the Storyblok Visual Editor bridge into the application. It dynamically loads the `@storyblok/preview-bridge` only when in Storyblok preview mode (determined by a `_storyblok` query parameter in the URL). The bridge enables real-time updates in the visual editor. It listens for `input` and `published` events from Storyblok:
- On `input` events, it attempts to update the `data-bg` attribute of relevant section elements based on `background_variant` changes in Storyblok content, providing immediate visual feedback.
- On `published` events or if real-time updates fail, it triggers a full page reload.
A fallback to a legacy Storyblok bridge script is included if the modern preview bridge fails to load. This component is crucial for the seamless content editing experience within Storyblok.

---
## src/features/CleanStoryblokProvider.tsx

The file `src/features/CleanStoryblokProvider.tsx` is a client-side component designed to bootstrap the Storyblok client-side API. Its primary purpose is to ensure that the Storyblok API is initialized on the client, which is necessary for the Storyblok Visual Editor and its bridge functionality to work correctly. It calls `getStoryblokApi()` from `@/lib/clean-storyblok` to perform this initialization. This component simply renders its children, acting as a wrapper to provide the necessary Storyblok context for client-side interactions.

---
## src/features/CleanStoryRenderer.tsx

The file `src/features/CleanStoryRenderer.tsx` is a client-side component responsible for initializing the Storyblok SDK and rendering the main content of a Storyblok story. It now uses the centralized `cleanComponentMap` from `src/lib/storyblok-component-map.ts` for its component registration. This strategy allows for a gradual migration to a "clean" architecture while maintaining compatibility with existing Storyblok content. It also includes a development-mode warning for unmapped root components. Finally, it renders the story's content using `StoryblokComponent` and includes `CleanStoryblokBridge` for visual editor integration.

---
## src/features/Experience.tsx

The file `src/features/Experience.tsx` implements a feature component that showcases the "Rum River Experience" with a two-column layout, featuring a descriptive text, a grid of features, and an accompanying image. It's designed for client-side rendering and Storyblok integration. The component uses `ExperienceLayout` (a wrapper around `Section`) to define its overall layout and styling, with a `surface` background and extra-large vertical padding. It displays a header (subtitle, title, description) and a grid of features, each with an icon (mapped from Heroicons), title, and description. Default features are provided if none are configured in Storyblok. An image, either from Storyblok or a placeholder, is displayed alongside the text content. All content is dynamically pulled from the `blok` prop with fallbacks.

---
## src/features/ExperienceLayout.tsx

The file `src/features/ExperienceLayout.tsx` defines a layout component specifically for "Experience" sections. It acts as a wrapper around the generic `Section` UI primitive, pre-configuring it with a consistent design philosophy: a clean background (`surface`), generous vertical padding (`xl`), and a content wrapper for readability, with centered alignment. It accepts `children` to render within the section and can take a `header` prop to populate the section's title, script accent, and lead text, providing default values if not supplied. Other design props like `background`, `tone`, `paddingY`, and `divider` can be overridden. It also passes through Storyblok editable props, making it compatible with the visual editor. This component ensures a consistent look and feel for all "Experience" sections while leveraging the flexibility of the `Section` primitive.

---
## src/features/FAQ.tsx

The file `src/features/FAQ.tsx` implements a "clean" FAQ (Frequently Asked Questions) feature component with robust Storyblok integration and per-item fallbacks. It's a client-side component that renders an interactive accordion. The component uses the `Section` UI primitive for its layout and styling, with a `surface` background and large vertical padding. It dynamically retrieves FAQ items from the `blok` prop, intelligently searching for common field names (`faq_items`, `items`, `faqs`, etc.) and providing fallback items if none are found. Each FAQ item's question and answer are extracted, with rich text answers rendered using `renderRichText`. The component manages the open/closed state of each FAQ item, includes accessibility attributes, and provides a toggle mechanism. It also includes a development-mode warning for unmapped root components.

---
## src/features/Footer.tsx

The file `src/features/Footer.tsx` implements a "clean" footer feature component for the website. It's designed for client-side rendering and Storyblok integration. The footer is structured into three columns: brand information (title and description), contact information (address, phone, email), and social media links (Facebook, Instagram). All content is dynamically pulled from the `blok` prop, with robust fallback default values if not provided. It uses Lucide React icons for visual representation of contact and social links. The component also includes a dynamic copyright year. This component ensures a consistent and editable footer across the application.

---
## src/features/Gallery.tsx

The file `src/features/Gallery.tsx` implements a "clean" gallery feature component that displays a collection of "love stories" (weddings). It's designed for client-side rendering and Storyblok integration. The component uses the `Section` UI primitive for its layout and styling, with configurable background, tone, and padding. It dynamically fetches detailed wedding data from Storyblok's API for each linked `wedding_story` UUID, using `useEffect` and `AbortController` for efficient data fetching and cleanup. It renders a grid of gallery cards, each displaying a cover image (with complex fallback logic), couple names, season, and a "View Gallery" hint. Clicking a card opens a `WeddingGalleryModal` to show the full photo gallery. Robust error handling and fallback content (hardcoded `FALLBACK_GALLERIES`) are included. This component ensures a dynamic and interactive display of wedding galleries.

---
## src/features/Hero.tsx

The file `src/features/Hero.tsx` implements a "clean" hero section component, designed for client-side rendering and Storyblok integration. It displays a prominent background image (with robust fallback logic for various Storyblok asset types), a kicker text, a main title with an accent, a descriptive lead text, and a call-to-action button. All content is dynamically pulled from the `blok` prop, with comprehensive fallback default values. The component supports layout control through `contentAlign`, `contentWidth`, and `useRailSystem` props, which are mapped to `data-` attributes for CSS styling. It also includes a smooth scroll animation function, though the scroll indicator is currently commented out. This component is a key visual element for the landing page, providing an engaging introduction to the website.

---
## src/features/HistoryCarousel.tsx

The file `src/features/HistoryCarousel.tsx` implements a client-side history carousel component. It displays a series of historical slides, each featuring an image, year, title, and description. The component includes navigation buttons (previous/next), autoplay functionality with a toggle, and progress dots to indicate the current slide. The slide content is hardcoded within the component. It uses `useState` to manage the current slide index and autoplay state. The carousel transitions between slides using CSS transforms. This component provides a visually engaging way to present the history of the Rum River Barn.

---
## src/features/Map.tsx

The file `src/features/Map.tsx` implements a "clean" map feature component that displays an embedded map alongside key location details. It's designed for client-side rendering and Storyblok integration. The component uses the `Section` UI primitive for its layout and styling, with a `surface` background and large vertical padding. It displays a header (subtitle, title, description) and a grid layout featuring an embedded Google Map (via `iframe`) surrounded by `location-item` details. Each `location-item` displays an icon (mapped from Heroicons), a title, and a description. Default location details are provided if none are configured in Storyblok. The map embed URL and location details are dynamically pulled from the `blok` prop with fallbacks.

---
## src/features/Navbar.tsx

The file `src/features/Navbar.tsx` implements a "clean" navigation bar component for the website. It's designed for client-side rendering and Storyblok integration. The navbar features a logo, a set of navigation links, a `ThemeToggle` component, and an optional call-to-action button. It includes both desktop and mobile menu implementations. The mobile menu is a collapsible drawer that appears on button click. The component dynamically updates its appearance based on scroll position (`isScrolled` state) and handles smooth scrolling for anchor links within the page. All content (logo text, nav items, CTA) is dynamically pulled from the `blok` prop with robust fallback default values.

---
## src/features/Pricing.tsx

The file `src/features/Pricing.tsx` implements a "clean" pricing feature component that displays wedding packages and their pricing. It's designed for client-side rendering and Storyblok integration. The component features a section header (script accent, title, hero line, description) and a grid of pricing cards. Each card represents a package with its name, label (e.g., "Most Popular"), weekend and weekday prices, and a list of included features. It uses Lucide React icons for visual elements like checkmarks and a star. The content for the pricing tiers is dynamically pulled from the `blok` prop, with robust fallback default values. Each card includes call-to-action buttons for checking availability and booking a tour. The component also incorporates accessibility attributes for screen readers.

---
## src/features/ScheduleForm.tsx

The file `src/features/ScheduleForm.tsx` implements a "clean" schedule form feature component. It's designed for client-side rendering and Storyblok integration. The component displays a section header (subtitle, title, description) and a multi-field form for users to schedule a tour or make an inquiry. The form collects user's name, email, phone, preferred date, estimated guest count, and a message. It uses React's `useState` hook to manage form data and `handleChange` for input updates. The form submission logic is currently logged to the console, indicating that actual submission to a backend would be implemented here. All content (header text, submit button text) is dynamically pulled from the `blok` prop with robust fallback default values.

---
## src/features/Spaces.tsx

The file `src/features/Spaces.tsx` implements a "clean" feature component for showcasing different venue spaces. It's designed for client-side rendering and Storyblok integration. The component uses `SpacesLayout` (a wrapper around `Section`) to define its overall layout and styling, with configurable background, theme tone, and padding. It displays a section header (subtitle, title, description) and an interactive interface allowing users to select different venue areas (e.g., Barn, Bridal Suite). For each selected space, it displays a main image (with a carousel for multiple images), a description, and a list of key features. The space data is dynamically pulled from the `blok` prop, with robust fallback default values if not provided. Users can navigate through images using previous/next arrows. This component ensures a dynamic and engaging presentation of the venue's offerings.

---
## src/features/SpacesLayout.tsx

The file `src/features/SpacesLayout.tsx` defines a layout component specifically for "Spaces" or "Venue" sections. It acts as a wrapper around the generic `Section` UI primitive, pre-configuring it with a consistent design philosophy: a warm rose-tinted background, generous vertical padding, and a content wrapper for readability, with centered alignment. It accepts `children` to render within the section and can take a `header` prop to populate the section's title, script accent, and lead text, providing default values if not supplied. Other design props like `background`, `tone`, `paddingY`, and `divider` can be overridden. It also passes through Storyblok editable props, making it compatible with the visual editor. This component ensures a consistent look and feel for all "Spaces" sections while leveraging the flexibility of the `Section` primitive.

---
## src/lib/clean-storyblok.ts

The file `src/lib/clean-storyblok.ts` is responsible for initializing the Storyblok SDK for server-side rendering (RSC). It now uses the centralized `cleanComponentMap` from `src/lib/storyblok-component-map.ts` for its component registration. This ensures that the RSC environment uses the same "clean" component mappings as the main application, promoting consistency and maintainability.

---
## src/lib/react-interop.ts

The file `src/lib/react-interop.ts` provides utility functions for React component interoperability and common patterns. It exports:
- `composeRefs`: A function that takes multiple React refs and returns a single ref callback. This allows a component to forward a ref while also attaching its own internal ref to the same DOM node.
- `composeHandlers`: A function that composes multiple event handlers. It ensures that the first handler is executed, and if `event.defaultPrevented` is not true, the second handler is also executed. This is useful for creating flexible event handling logic where a child component's handler can prevent a parent's handler from running.
- `cx`: A simple utility function for conditionally joining CSS class names, filtering out `undefined`, `false`, and `null` values.

These utilities enhance component reusability and maintainability by providing standardized ways to handle common React patterns.

---
## src/lib/storyblok.ts

The file `src/lib/storyblok.ts` is responsible for initializing the Storyblok SDK and providing utility functions for interacting with the Storyblok API. It now uses the centralized `editorComponentMap` from `src/lib/storyblok-component-map.ts` for its component registration. It exports `getStoryblokApi` to retrieve the initialized Storyblok API instance, `fetchStory` to fetch a single story by slug, and `fetchStories` to fetch multiple stories with filtering and sorting capabilities. Both fetch functions include logic for cache control, particularly disabling caching for draft content to support the Visual Editor.

---
## src/lib/storyblok-component-map.ts

The file `src/lib/storyblok-component-map.ts` serves as the single source of truth for Storyblok component mappings. It exports two maps:
- `cleanComponentMap`: The primary component map using "clean" components. This is used for the main public-facing routes and server-side rendering.
- `editorComponentMap`: The legacy component map using "editor" components. This is used for the Storyblok visual editor on non-main routes to ensure continued functionality during the migration.
This centralization is a key part of the codebase cleanup, reducing redundancy and making the Storyblok integration easier to maintain.

---
## src/lib/theme/registry.ts

The file `src/lib/theme/registry.ts` acts as the single source of truth for defining and managing themes and brand variants within the application. It exports:
- `ThemeId` and `BrandId` types for strict typing of theme and brand identifiers.
- `ThemeDef` and `BrandDef` interfaces, which define the structure for theme and brand definitions, including an `apply` method to set the corresponding `data-theme` or `data-brand` attribute on the root HTML element.
- `THEME_REGISTRY`: An object mapping `ThemeId`s ('light', 'dark') to their definitions.
- `BRAND_REGISTRY`: An object mapping `BrandId`s ('romantic', 'modern') to their definitions, including `swatches` for visual preview.
- `STORAGE_KEYS`: A constant object defining keys for storing theme and brand preferences in `localStorage`.
- `preferredSystemTheme()`: A helper function to detect the user's operating system's color scheme preference.

This registry centralizes theme and brand management, ensuring that token values (defined in CSS) respond correctly to these attributes, and provides a clear API for theme switching.

---
## src/storyblok/clean-rsc-impl.tsx

The file `src/storyblok/clean-rsc-impl.tsx` is responsible for initializing the Storyblok SDK specifically for Server Components (RSC) within a "clean" architecture context. It dynamically imports the `FAQ` component (which is a client component) to ensure it's loaded correctly in an RSC environment. It defines a `CleanPage` component to render nested Storyblok blocks and a `Null` component as a placeholder for blocks that are not yet migrated or are intentionally hidden. The `initCleanStoryblokRsc` function initializes Storyblok, registering `CleanPage` as the main page component and `FAQ` as a clean component. All other Storyblok components are temporarily mapped to `Null` components, indicating a phased migration strategy where components are gradually replaced with their "clean" RSC-compatible versions.

---
## src/storyblok/clean-rsc.ts

The file `src/storyblok/clean-rsc.ts` serves as an entry point for the Storyblok RSC initialization logic. It simply re-exports `initCleanStoryblokRsc` from `./clean-rsc-impl.tsx`. This pattern provides a cleaner import path and separates the public API from internal implementation details.

---
## src/styles/components/alternating-blocks.css

The file `src/styles/components/alternating-blocks.css` provides the styling for the "Alternating Blocks" component, which is used to display content in a zigzag layout with text and images. This CSS file focuses specifically on the grid layout and card styling, as the overall section layout, header, spacing, and background are handled by the unified `Section` component. It defines styles for the container, individual block items (including alternating margins for the zigzag effect), and their content (number, title, lead, paragraphs) and images. Responsive adjustments are included for tablet and mobile views, collapsing the grid to a single column. It also includes styles for dark mode, though some glassmorphism card effects are temporarily commented out. The styles utilize CSS variables for design tokens, ensuring consistency with the overall design system.

---
## src/styles/components/brand-proof.css

The file `src/styles/components/brand-proof.css` provides the styling for the "Brand Social Proof" section. This CSS file focuses on the visual presentation of brand logos and a testimonial quote, while the overall section layout, padding, and background are handled by the unified `Section` component. It applies glassmorphic effects (backdrop filter, borders, shadows) to the section, along with subtle gradient overlays and noise textures for depth and realism. Styles are defined for the brand logos (uppercase, letter-spacing, hover effects) and the testimonial quote (font sizing, line height, highlighting specific text within the quote). The stylesheet includes comprehensive dark mode styling, both forced (`html[data-theme="dark"]`) and auto (`@media (prefers-color-scheme: dark)`), utilizing CSS variables for design tokens. Responsive adjustments are also provided for various screen sizes.

---
## src/styles/components/buttons.css

The file `src/styles/components/buttons.css` defines a unified button styling system, scoped to elements within `[data-clean-root="true"]`. It establishes base styles for `.btn` elements, including padding, border-radius, font properties, and transition effects, all driven by CSS variables (design tokens). It then defines several variants:
- `btn--primary`: A solid gold button with a prominent shadow.
- `btn--secondary`: An outline button with a subtle shadow.
- `btn--on-image`: An outline button with a semi-transparent background and backdrop filter, designed for better contrast over images.
- `btn-rose`: A solid rose-colored button.
- `btn-outline-gold`: An outline gold button, suitable for dark backgrounds.
- `btn-ghost`: A transparent button that inherits text color.

The stylesheet also includes focus and active states for accessibility and visual feedback. All styles are token-driven and designed for consistency across the application.

---
## src/styles/components/experience.css

The file `src/styles/components/experience.css` provides the styling for the "Rum River Experience" section. This CSS file focuses on the two-column grid layout and the internal styling of the content and features, as the overall section layout, padding, and background are handled by the unified `Section` component. It defines CSS variables for theme-related colors, icon styling, and visual properties, all utilizing global theme tokens. The layout features a gold thread divider at the bottom and a two-column grid for content and an image. Styles are defined for the section header (script, title, description) and a grid of interactive feature cards, each with an icon, title, and description. Responsive adjustments are included for tablet and mobile views, collapsing the grid to a single column. Comprehensive dark mode styling, both forced and auto, is provided, enhancing the gold divider and adding a subtle vignette.

---
## src/styles/components/faq.css

The file `src/styles/components/faq.css` provides the styling for the FAQ accordion component. This CSS file focuses on the appearance and behavior of the individual FAQ items and their accordion functionality, as the overall section layout, padding, background, and header are handled by the unified `Section` component. It defines styles for the FAQ list, individual items (with a bottom border), and the interactive question and answer elements. The question is styled as a button with a toggle icon that rotates when the answer is open. The answer content is initially hidden and then revealed with a smooth transition using `max-height` and `opacity`. Styles are also provided for rich text content coming from Storyblok. Dark mode styles are included, ensuring proper color contrast. Responsive adjustments are made for smaller screens. All styles are token-driven and scoped to `[data-clean-root="true"]`.

---
## src/styles/components/footer.css

The file `src/styles/components/footer.css` provides the styling for the "clean" footer component. It's scoped to elements within `[data-clean-root="true"]`. It's token-driven, utilizing CSS variables for colors, fonts, and spacing. The footer features a dark linear gradient background and defines local private tokens for its specific color scheme. It supports dark mode, with overrides for background and text colors. The layout is a responsive flexbox grid, stacking vertically on smaller screens. Styles are defined for the main content sections (brand info, contact info, social links), section titles (with accent dividers), descriptive text, and interactive elements like phone and social links (including hover and focus states). The file ensures a consistent and accessible footer across the application.

---
## src/styles/components/gallery.css

The file `src/styles/components/gallery.css` provides the styling for the "Love Stories Gallery" component. This CSS file focuses on the grid layout and card styling of the gallery items, as the overall section layout, header, spacing, and background are handled by the unified `Section` component. It defines a responsive CSS Grid for the `wedding-gallery`, with specific items spanning multiple columns/rows for a dynamic layout. Each `gallery-item` is styled as a card with a background image, an overlay containing couple names, season, and gallery details. Interactive hover/focus states include transform, box-shadow, and overlay opacity changes, along with a subtle shimmer effect. Comprehensive dark mode styling, both forced and auto, is provided, utilizing CSS variables for design tokens. Special considerations for touch devices (always visible overlay, no transforms) and reduced motion preferences are also included. Responsive adjustments are made for tablet and mobile views, collapsing the grid to a single column.

---
## src/styles/components/glass-toolbar.css

The file `src/styles/components/glass-toolbar.css` defines the comprehensive styling for a "glassmorphic" toolbar component, likely used for development or administrative purposes rather than the public-facing website. It establishes a rich set of CSS variables for a "premium walnut & gold" theme, including colors, dimensions, shadows, and animation properties. The toolbar consists of a fixed "rail" (left sidebar) and an expandable "panel." Both elements feature intricate glassmorphic effects with background gradients, backdrop filters, multiple box-shadows for depth, and subtle texture overlays. Styles are defined for interactive elements like a brand mark, navigation "pills" (with active, hover, and focus states), and a toggle button to expand/collapse the panel. The stylesheet also includes a light theme override for all these variables, ensuring the glassmorphic effect adapts to different theme contexts. Responsive adjustments are provided for smaller screens, reducing the rail width and adjusting panel dimensions. A `prefers-reduced-motion` media query is included to disable transitions for accessibility.

---
## src/styles/components/hero.css

The file `src/styles/components/hero.css` provides the styling for the "clean" hero component, scoped to elements within `[data-clean-root="true"]`. It's token-driven, utilizing CSS variables for colors, fonts, and spacing, and defines local "private" CSS properties for its specific color scheme and overlay. The hero section features a full-bleed background image (set via `--hero-bg-url`) with a fixed attachment for a parallax-like effect (disabled on mobile for performance). A glassmorphic-tinted gradient overlay (`::after` pseudo-element) sits above the image, providing contrast for the content. The content itself (eyebrow, title, accent, lead, and CTAs) is centered by default and includes a `fadeInUp` animation. The stylesheet defines styles for primary and secondary call-to-action buttons, including hover effects and a subtle shimmer. A scroll indicator with a bounce animation is also included.

Crucially, this CSS file also implements a "Hero Layout Control System" using `data-` attributes (`data-content-align`, `data-content-width`, `data-use-rails`). This system allows for flexible positioning of the hero content (left, center, right) and control over its maximum width (prose, content, wide), enabling a "rail" alignment system. Responsive adjustments are made for tablet and mobile views, ensuring the layout adapts gracefully, including disabling parallax and forcing content centering on small screens. Comprehensive dark mode styling, both forced and auto, is provided, overriding colors and overlay properties to maintain visual harmony.

---
## src/styles/components/legacy-shim.css

The file `src/styles/components/legacy-shim.css` provides a set of CSS rules designed to neutralize or adjust the styling of older, "legacy" components when they are rendered within the new unified `Section` system. This is crucial for maintaining visual consistency during a migration phase. The shim targets elements with `[data-legacy-root]` inside a `.section` and overrides their `max-width`, `width`, `margin`, and `padding` to allow the `Section` component to control the overall layout. It also harmonizes heading and paragraph spacing, ensures images are responsive, and explicitly sets background properties to `transparent` to prevent conflicts with the `Section`'s background layers. Specific adjustments are made for "alternating" layouts to prevent conflicts and for the "Experience" image to control its size within the legacy block. This file acts as a bridge, allowing legacy components to coexist within the new design system without breaking the layout.

---
## src/styles/components/map.css

The file `src/styles/components/map.css` provides the styling for the "Map Section" component. This CSS file focuses on the unique grid layout that positions location details around a central circular embedded map, as the overall section layout and header are handled by the unified `Section` component. It defines a 3-column, 3-row CSS Grid where the map spans the center column and all rows, and location items are placed in the left and right columns, with a "flush offset" to visually overlap the map's circular edge. Styles are defined for individual `location-item`s, including icons, titles, and descriptions, with hover effects. The embedded map is styled as a perfect circle with a shadow and an overlay for theme blending. Comprehensive dark mode styling, both forced and auto, is provided, adjusting colors and overlay properties. Responsive adjustments are made for tablet and mobile views, collapsing the grid to a single column and centering all elements, while also adjusting map size and removing the flush offset.

---
## src/styles/components/navbar.css

The file `src/styles/components/navbar.css` provides the styling for the "clean" navigation bar component, scoped to elements within `[data-clean-root="true"]`. It's token-driven, utilizing CSS variables for colors, fonts, and spacing, and defines local "private" CSS properties for its specific color scheme. The navbar is initially transparent and becomes "glassy" (with a background, backdrop filter, border, and shadow) when scrolled. It features a logo, desktop navigation links with hover underlines, a call-to-action button, and a theme toggle. For mobile, it includes a hamburger menu button that opens a full-screen overlay drawer with navigation links and a mobile CTA. Comprehensive dark mode styling is provided, adjusting colors and text shadows. Responsive adjustments are made for various screen sizes, controlling the visibility of desktop vs. mobile navigation and adjusting spacing. Accessibility is considered with focus states for interactive elements.

---
## src/styles/components/pricing.css

The file `src/styles/components/pricing.css` provides the styling for the "Pricing" section, scoped to elements within `[data-clean-root="true"]`. It's token-driven, utilizing CSS variables for colors, fonts, and spacing. The section features a header with a script accent, title, hero line, and lead text. The core of the section is a responsive CSS Grid displaying pricing cards. Each `pricing-card` is styled with a background, border, and shadow, and includes a package name, price display (weekend/weekday), a list of features with check icons, and call-to-action buttons. A special "popular" variant for cards is also defined, featuring a badge and distinct styling. Interactive hover states are included for cards and buttons. Comprehensive dark mode styling, both forced and auto, is provided, transforming cards into glassmorphic elements with gold accents and shadows. Accessibility is considered with focus states and reduced motion preferences.

---
## src/styles/components/schedule-form.css

The file `src/styles/components/schedule-form.css` provides the styling for the "Schedule Form" section. This CSS file focuses on the visual presentation of the form and its surrounding elements. It defines a full-width breakout for the section, ensuring it spans the entire viewport, and includes a subtle rotating radial gradient background decoration. The form itself is styled as a card with a background, border, and shadow, and contains a header (script, title, description) and various input fields (text, email, phone, date, select, textarea). All form elements are token-driven, utilizing CSS variables for colors, fonts, and spacing, and include focus states for accessibility. The submit button is styled with a rose background, uppercase text, and a shimmer effect on hover. Comprehensive dark mode styling, both forced and auto, is provided, transforming the form card into a glassmorphic element and adjusting input field styles. Responsive adjustments are made for various screen sizes, adapting padding, font sizes, and collapsing form rows.

---
## src/styles/components/section-layered.css

The file `src/styles/components/section-layered.css` defines a robust "Layered Section System" for the application, providing foundational styling for content sections. It establishes base layout tokens for responsive gutters, vertical rhythm, and elevation shadows. The system introduces a `page-base` for the overall canvas and a `rail-aware` class to account for a potential left-hand toolbar (like the glass toolbar).

The core of this system is the `.rr-section` class, which serves as a base for all content sections. It defines various "layer variants" (`--base`, `--partial`, `--isolated`) that control the section's background, border, `backdrop-filter`, and `box-shadow`, creating distinct visual layers. It also includes "width controls" (`--content`, `--wide`, `--full`) and "alignment controls" (`--align-left`, `--align-right`, `--align-center`) to precisely position content within these sections.

Additionally, the stylesheet provides utilities for media elements (`media--pull-left`, `media--pull-right`, `media--inset`), flexible card grids (`cards`, `cards--2up`, `cards--3up`, `cards--4up`), and alternating content layouts (`alt`, `alt--reverse`). Responsive design ensures that sections adapt to mobile screens, including centering content and stacking alternating layouts. Dark mode adjustments are also included for the layered section variants, ensuring visual consistency across themes. This file is a critical part of the application's design system, enabling consistent and flexible content presentation.

---
## src/styles/components/section.css

The file `src/styles/components/section.css` defines the core styling for the generic `Section` UI primitive, which serves as a foundational layout component for various content blocks across the application. It establishes site-wide layout tokens for gutters, rail height, and elevation shadows.

The `.section` class provides a responsive, full-width container with configurable vertical padding. It supports different "layers" (`data-layer="base"`, `"partial"`, `"isolated"`) to control background, border, `backdrop-filter`, and `box-shadow`, creating visual depth and separation. Content width (`data-width="prose"`, `"content"`, `"wide"`, `"full"`) and alignment (`data-align="left"`, `"center"`, `"right"`) can be controlled via `data-` attributes. It also includes elevation styling (`data-elevation="0"` to `"3"`), optional rail offset (`data-rail-offset="true"`), and overlap effects (`data-overlap="top"`, `"bottom"`). A `data-float="true"` attribute allows sections to float above others.

The stylesheet also defines styles for a standardized section header (`.section__header`), including a script accent, title, and lead text, with alignment options. Responsive adjustments are made for mobile, reducing padding, border-radius, and elevation, and adjusting rail offset. This file is central to the application's design system, providing a flexible and consistent framework for structuring page content.

---
## src/styles/components/section.legacy-wrapper.css

The file `src/styles/components/section.legacy-wrapper.css` provides a specific styling rule for a legacy content wrapper, scoped to elements within `[data-clean-root]` and specifically targeting `[data-legacy-wrapper="true"]`. This rule sets a maximum width of 1200px for the content wrapper, centers it horizontally, and applies responsive horizontal padding. This CSS is likely used to ensure that older content wrappers, when integrated into the new "clean" architecture, maintain a consistent maximum width and padding, preventing them from breaking the layout or appearing too wide.

---
## src/styles/components/section.variants.css

The file `src/styles/components/section.variants.css` extends the core `Section` component with various visual and layout "flourishes" and specific use-case variants. It defines utility keyframes for animations (`float-subtle`, `pulse-glow`, `gallery-in`) and a reusable `u-vignette` helper.

The stylesheet then details several predefined `Section` variants:
- `legacy-centered`: Replicates an older "everything centered" look.
- `header-center-content-left`: Centers the header while snapping content to a left rail.
- `home-hero-2024`: Provides specific styling for the home hero, including multi-layer overlays, parallax effects (desktop only), title/lead text shadows, and a scroll cue animation.
- `alternating-blocks-luxe`: Enhances alternating blocks with card polish, a "gold thread" divider, zig-zag layout on wide screens, image masks, and number badges.
- `gallery-rose-grid`: Styles the gallery with rose-tinted hover effects and an optional staggered reveal animation for gallery items.

Additionally, it introduces "stackable variants" that can be combined via `data-variant~=""` attributes for fine-grained control:
- `centered-content-rails`: Centers content rails.
- `header-center-wide`: Removes max-width clamp on centered headers.
- `tone-auto-inherit`: Ensures `color: inherit` for `tone="auto"` sections.
- `box-sizing-content`: Overrides `box-sizing` to `content-box`.
- `lead-full-width`: Removes max-width constraint on lead text.
- `spaces-layout`: Provides a full-width centered layout matching the "Discover Our Spaces" section.

A `rail-container-math` variant is included to fix content area calculations, and a `debug-rails` variant helps visualize rail boundaries during development. Finally, it incorporates "Container Query Refinements" for progressive enhancement, allowing typography and grid layouts to adapt based on the container's width rather than the viewport, using `@container` rules. This file significantly enhances the flexibility and visual richness of the `Section` component.

---
## src/styles/components/section.wrapper.css

The file `src/styles/components/section.wrapper.css` provides styling for the `Section` component when it's configured to use a "wrapper" container mode (`container="wrapper"`). This mode offers a simpler, centered container alternative to the more complex "rails" system, ideal for editorial or content-heavy sections.

It defines default wrapper sizing using CSS custom properties (`--wrapper-max`, `--wrapper-gutter`) and applies these to the `.section__wrapper` element, ensuring a consistent maximum width and responsive horizontal padding. The stylesheet also includes rules for aligning content (header, general content, actions) within this wrapper, allowing for left, center, or right alignment.

Furthermore, it ensures compatibility with existing stackable variants (like `header-center-wide`, `lead-full-width`, `tone-auto-inherit`, `box-sizing-content`) and introduces new preset variants specifically for wrapper mode:
- `spaces-2024`: Matches the exact measures of the "Discover Our Spaces" component.
- `content-wrapper-compat`: Provides perfect compatibility with the legacy `.content-wrapper` class.
- `wrapper-wide`, `wrapper-prose`, `wrapper-full`, `wrapper-tight`: Offer different maximum widths and gutter sizes for various content needs.

Responsive adjustments are included to reduce the gutter on mobile devices. This file enhances the flexibility of the `Section` component, providing a straightforward option for content containment and alignment.

---
## src/styles/components/spaces.css

The file `src/styles/components/spaces.css` provides the styling for the "Spaces" section, focusing on its interactive elements like tabs, image carousel, and venue details. The overall section wrapper, background, padding, and header styles are handled by the unified `Section` component.

This CSS defines styles for:
- **Venue Tabs:** A flexbox layout for navigation tabs, with distinct styles for active, hover, and focus states, utilizing token-driven colors and borders.
- **Content Grid:** A responsive CSS Grid (`spaces-content`) that adapts to different layouts (`layout-classic`, `layout-split`, `layout-stacked`, `layout-carousel`).
- **Main Image/Carousel:** Styles for the primary image display, including a subtle overlay, box-shadows, and interactive carousel navigation arrows with hover effects.
- **Venue Details:** Typography and spacing for the space's name, description, and a grid of individual features.

Comprehensive dark mode styling, both forced and auto, is provided, adjusting colors, backgrounds, borders, and shadows to maintain visual harmony. Responsive adjustments are made for mobile views, collapsing the content grid and feature grid to single columns and adjusting image heights.

---
## src/styles/globals.css

The file `src/styles/globals.css` provides a clean global reset and base styling for the entire application. It's designed to load after theme tokens to ensure proper cascade. Key aspects include:
- **Modern Reset:** Uses a low-specificity approach (`*`, `*::before`, `*::after`) to apply `box-sizing: border-box` and reset margins.
- **Scrollbar Gutter:** `scrollbar-gutter: stable both-edges` is set on `html` to prevent layout shifts when scrollbars appear.
- **Font Rendering Polish:** Includes `font-variation-settings` and `font-synthesis-weight` for improved variable font rendering.
- **Body Styling:** Sets `height: 100%`, `line-height`, font smoothing, and applies `background`, `color`, `font-family`, and `font-size` using CSS variables (design tokens).
- **Media Defaults:** Ensures `img`, `picture`, `video`, `canvas`, `svg` are block-level and responsive.
- **Text Overflows:** `overflow-wrap: anywhere` is applied to text elements to prevent overflows.
- **Headings:** Provides minimal base styling for headings, expecting components to define specific sizes.
- **Links:** Sets default link styling to inherit color and removes underlines, adding them on hover.
- **Focus Styles:** Defines consistent `:focus-visible` styles using CSS variables for accessibility.
- **Selection:** Styles the text selection color using `color-mix` and design tokens.
- **Reduced Motion:** Includes a global `@media (prefers-reduced-motion: reduce)` query to disable all animations and transitions for users who prefer reduced motion, scoped to `[data-clean-root="true"]`.

This file establishes a solid, accessible, and token-driven foundation for the application's styling.

---
## src/styles/primitives/button.css

The file `src/styles/primitives/button.css` defines a comprehensive, production-ready button primitive. It's scoped within `@layer components` and uses a `[data-ui="button"]` attribute for targeting, ensuring low specificity and easy integration.

Key features include:
- **Base Styling:** Resets browser defaults, sets `box-sizing: border-box`, and defines core layout (inline-flex, gap), typography (inherits font, color, letter-spacing), and interaction properties (user-select, cursor). It enforces a WCAG-compliant minimum hit target of 44x44px.
- **Token-Driven:** Uses internal CSS variables (`--_pad-y`, `--_pad-x`, `--_radius`, etc.) which are themselves derived from global design tokens, allowing for flexible customization.
- **Sizes:** Defines `xs`, `sm`, `md`, `lg` sizes by scaling base padding and font size.
- **Corners:** Provides `round`, `pill`, and `square` options for `border-radius`.
- **Variants:** Implements `solid`, `outline`, `subtle`, and `ghost` visual styles, each with distinct background, color, and border properties.
- **Icon-Only:** Supports square aspect ratio for icon-only buttons.
- **States:** Styles for `disabled` (native and `data-disabled="true"` for `asChild` components) and `loading` states (disables pointer events).
- **Focus Styles:** Defers to a global focus system for consistent accessibility.
- **High Contrast Mode (HCM):** Includes `@media (forced-colors: active)` rules to ensure buttons remain visible and usable in Windows High Contrast Mode.
- **Hover & Active States:** Implements subtle `transform` and `filter` effects for hover and active states, respecting `prefers-reduced-motion` preferences.
- **Loading Spinner & Content Composition:** Provides CSS for integrating a loading spinner, including `btn__content` for stable layout, `btn__row` for horizontal alignment, and `btn__spinner-overlay` for centering a spinner over content while hiding the label. A `btn__width-ghost` is used to preserve button width during loading.
- **Screen Reader Only Text:** Includes a `.sr-only` utility for accessibility.

This primitive is highly configurable, accessible, and designed for robust use across the application.

---
## src/styles/primitives/index.css

The file `src/styles/primitives/index.css` serves as an aggregator for all primitive CSS modules within the project. It's designed to be imported once in the application's layout, centralizing the inclusion of foundational styling. The architecture emphasizes:
- **One file per primitive:** Promotes modularity and focused changes.
- **Token-driven:** Ensures themeability and testability through the use of design tokens.
- **Minimal styling:** Focuses on core behavior and resets rather than visual mutations.

It imports the following primitive CSS modules:
- `./layout.css`: For layout primitives like stack, cluster, and grid.
- `./typography.css`: For typography primitives such as headings, text, and fluid scales.
- `./button.css`: For button primitives, including variants, sizes, loading states, and accessibility features.

This file is crucial for establishing a consistent and maintainable design system by organizing and importing core, reusable styling components.

---
## src/styles/primitives/layout.css

The file `src/styles/primitives/layout.css` defines a set of minimal, composable layout utilities designed to work within existing components, particularly the `Section` component. These primitives are intentionally unlayered (not within `@layer components`) to ensure higher cascade priority and predictable behavior.

It includes:
- **Stack:** A vertical flexbox layout (`display: flex; flex-direction: column;`) with a customizable `gap` controlled by the `--stack-gap` CSS variable. It offers:
    - `is-fluid` variant for macro layout.
    - **Semantic Rhythm Variants:** `is-rhythm-prose` (tight spacing for reading), `is-rhythm-section` (standard content section spacing), and `is-rhythm-macro` (large spacing for page-level layout), all using fluid spacing tokens.
    - **Density Presets:** `is-tight`, `is-compact`, `is-loose`, `is-airy` for fine-tuned spacing control.
- **Cluster:** A horizontal wrapping flexbox layout (`display: flex; flex-wrap: wrap;`) with a customizable `gap` controlled by `--cluster-gap`. It supports `data-justify` attributes (`between`, `center`, `end`) and `data-align` attributes (`start`, `end`, `baseline`) for alignment.
- **Grid:** A basic CSS Grid layout (`display: grid;`) with a customizable `gap` controlled by `--grid-gap` and `grid-template-columns` controlled by `--grid-cols`. It also includes an `is-auto-fit` variant for responsive grids without explicit media queries, using `minmax` for column sizing.

These layout primitives provide a flexible and token-driven foundation for building consistent and responsive UI structures.

---
## src/styles/primitives/typography.css

The file `src/styles/primitives/typography.css` defines a token-driven typography system for headings and text, scoped within `@layer components`. It aims for fluid, semantic, and accessible text presentation.

Key features include:
- **Fluid Type Scale:** Uses `clamp()` to define responsive font sizes (`ts-xs` to `ts-4xl`), providing Utopia-style scaling.
- **Line Height Tokens:** Defines `lh-tight`, `lh-normal`, and `lh-loose` for consistent leading.
- **Font Weight Tokens:** Standardizes `fw-regular`, `fw-medium`, `fw-semibold`, and `fw-bold`.
- **Text Color Tokens:** Includes a `text-muted` token using `color-mix` for better perceptual control.
- **Utility Classes:**
    - `t-balance`: Applies `text-wrap: balance` for aesthetically pleasing multi-line headings.
    - `t-eyebrow`: Styles for uppercase, tracked overlines.
    - `t-block-margin`: Optional block margins.
- **Heading Primitive (`[data-ui="heading"]`)**: Resets margins/padding, applies serif font, semibold weight, tight line height, and `text-wrap: balance` by default. Supports `size` variants (`xs` to `xl`), `align` variants (`start`, `center`, `end`), and a `muted` color variant.
- **Text Primitive (`[data-ui="text"]`)**: Resets margins/padding, applies sans-serif font, regular weight, and normal line height. Supports `size` variants (`xs` to `lg`), `align` variants, and a `muted` color variant.
- **Progressive Enhancement:** Includes `@supports not (text-wrap: balance)` for hyphenation fallback.
- **Container-Aware Typography:** Leverages `@container` queries to enable responsive heading sizes based on the content rail's width, not just the viewport.
- **Measure Utilities:** Defines `measure`, `measure--tight`, and `measure--loose` for optimal reading line lengths (character count).
- **Dark Mode Adaptations:** Adjusts `text-muted` color for better contrast in dark mode.

This file provides a robust and flexible system for managing typography, ensuring consistency, responsiveness, and accessibility across the application.

---
## src/styles/system/layout.css

The file `src/styles/system/layout.css` defines utility overrides for unifying containers and creating a consistent left rail across various sections of the application. It's designed to load *after* all component CSS and is scoped to `[data-clean-root="true"]`. Layout tokens are assumed to be defined in `theme.css`.

Key utility overrides include:
- **Unified Header Blocks:** Applies `max-width`, `margin-inline: auto`, and `padding-inline` to various header-like elements (`.section-header`, `.alternating-blocks__container`, etc.) to ensure consistent centering and responsiveness.
- **Left-Rail Alignment:** Introduces a `[data-align="left"]` attribute to control text alignment and content positioning. On larger screens, it aligns content to a left rail with a specific offset, while on smaller screens, it centers the content.
- **Unified Core Containers:** Applies `max-width`, `margin-inline: auto`, and `padding-inline` to core containers (`.navbar__container`, `.footer-content`, etc.) to standardize their sizing and spacing.
- **Wide Grids Alignment:** Ensures wide grids (`.venue-grid`, `.gallery-grid`, etc.) align to the same gutters and have consistent maximum widths.
- **Prose Measure:** Applies a `max-width` of `65ch` to paragraphs and lead text within left-aligned sections for improved readability.
- **Padding Discrepancy Fix:** Normalizes padding on various header elements on smaller screens to prevent layout drifts.

This file plays a crucial role in establishing a consistent and responsive layout system across the application by overriding and unifying disparate container and header styles.

---
## src/styles/system/primitives.css

The file `src/styles/system/primitives.css` defines a set of minimal, composable layout primitives, scoped within `@layer components`. These utilities are designed to work within existing components, particularly the `Section` component, providing foundational layout patterns.

It includes:
- **Stack:** A vertical flexbox layout (`display: flex; flex-direction: column;`) with a customizable `gap` controlled by the `--stack-gap` CSS variable. It also offers an `is-fluid` variant for macro layout.
- **Cluster:** A horizontal wrapping flexbox layout (`display: flex; flex-wrap: wrap;`) with a customizable `gap` controlled by `--cluster-gap`. It supports `data-justify` attributes (`between`, `center`, `end`) for horizontal alignment.

This file provides basic, token-driven layout building blocks that can be composed to create more complex UI structures, ensuring consistency and maintainability.

---
## src/styles/system/section-presets.css

The file `src/styles/system/section-presets.css` defines a collection of utility classes and presets for `Section` components, scoped to `[data-clean-root="true"]`. It's placed within `@layer utilities` for predictable specificity. These presets primarily focus on enhancing dark mode aesthetics and providing reusable visual treatments.

Key utilities and presets include:
- **Section Background Presets (Dark Mode):** A series of classes (`section--deep`, `section--soft`, `section--rose`, `section--sage`, `section--gold`, `section--surface-0` to `section--surface-4`) that apply specific gradient or solid background colors, derived from design tokens, to sections in dark mode. These are designed to create smooth tonal progressions and visual hierarchy.
- **Glassmorphism Card Utility (`card-dark`, `card-dark-subtle`):** Provides pre-configured glassmorphic styling for cards in dark mode, including `backdrop-filter`, borders, and shadows, with a more subtle variant available.
- **Section Edge Gradient Utility (`section-edge`, `section-edge-top`):** Adds subtle hairline gradients to the bottom or top edges of sections, enhancing visual separation.

All these utilities are mirrored for auto dark mode (`@media (prefers-color-scheme: dark)`) to ensure consistent appearance based on user preferences. This file allows developers to quickly apply complex, token-driven visual styles to sections and cards, especially in dark mode, without repeating extensive CSS.

---
## src/styles/tokens/spacing.css

The file `src/styles/tokens/spacing.css` defines a comprehensive system of spacing tokens and density presets, scoped within `@layer tokens`. This system provides a consistent and flexible approach to managing spacing throughout the application.

Key features include:
- **Core Static Scale:** A fixed scale of `space-0` to `space-6xl` (0px to 96px) for precise, non-fluid spacing.
- **Fluid Scale:** Uses `clamp()` to define responsive fluid spacing tokens (`space-fluid-sm` to `space-fluid-2xl`), adapting to different viewport sizes.
- **Semantic Aliases:** Provides semantic aliases for common spacing contexts like `gap-inline`, `gap-stack`, `gap-grid`, `pad-chip`, `pad-field`, `pad-card`, and `pad-section`.
- **Section Padding Scale:** Defines specific padding tokens for sections (`pad-section-xs` to `pad-section-fluid`) that map to `paddingY` tokens.
- **Density Presets:** Allows for density switching via `data-density` attributes (`compact`, `cozy`, `comfy`, `spacious`), which override the default semantic aliases to adjust spacing globally or locally. An `auto` density option is also provided, which uses container queries to adapt spacing based on container width.
- **Lightweight Utility Helpers:** Includes utility classes (`u-gap-inline`, `u-gap-stack`, `u-pad-card`, `u-pad-section`) within `@layer utilities` for quick application of semantic spacing.

This file is fundamental to the design system, ensuring consistent visual rhythm, responsiveness, and maintainability of spacing across all components.

---
## src/styles/tokens/theme.css

The file `src/styles/tokens/theme.css` serves as the single source of truth for all design tokens related to color, typography, spacing, and motion. It implements a layered token architecture, supporting both "Romantic" (default) and "Modern" brand themes, along with light and dark mode variations.

Key sections include:
- **Primitives (Raw Hues):** Defines foundational color values using OKLCH for precise control, including "Romantic" anchors (rose, gold, sage, cream), a neutral ladder, and "Modern" anchors (ink, brass, stone, slate).
- **Motion, Typography, Spacing Primitives:** Defines tokens for animation durations, easing functions, font stacks (sans, serif, script, mono), font sizes, line heights, font weights, border radii, and a comprehensive spacing scale (static and fluid). It also includes layout-related tokens like `page-max`, `gutter`, and `rail-offset`.
- **Semantic Tokens (Romantic Default):** Maps primitive values to semantic tokens (e.g., `surface-0`, `text-primary`, `accent-rose`, `border-subtle`, `shadow-elev-1`). These semantic tokens are then used to define component-specific aliases (e.g., `hero-bg`, `navbar-text`, `footer-link`). This section also includes the light mode definitions.
- **Romantic Dark Mode:** Overrides the semantic tokens for dark mode, adjusting colors for optimal contrast and visual appeal.
- **Brand Overrides (Modern):** Provides a complete set of semantic token overrides for the "Modern" brand theme, including its own light and dark mode variations. This allows for a complete visual transformation of the application based on the selected brand.

This file is critical for maintaining design consistency, enabling easy theming, and ensuring accessibility across the entire application. It leverages CSS custom properties and `color-mix()` for powerful and flexible token management.

---
## src/styles/tokens/theme.tokens.css

The file `src/styles/tokens/theme.tokens.css` defines a crucial layer of design tokens, specifically designed as a safe migration path from legacy tokens to a new, clean section system. It uses `@layer tokens` to ensure it loads after existing tokens but before components, creating clean shadow aliases.

Key sections include:
- **Section System Tokens:** Defines a clean namespace for the new architecture's layout system. This includes:
    - `section-layer-base`, `section-layer-partial`, `section-layer-isolated`: For different background layers.
    - `section-width-prose`, `section-width-content`, `section-width-wide`, `section-width-full`: For controlling content maximum widths.
    - `section-align-left`, `section-align-center`, `section-align-right`: For content alignment.
    - `section-elevation-0` to `section-elevation-3`: For glass-aware shadows.
    - `section-glass-subtle`, `section-glass-medium`, `section-glass-strong`: For backdrop integration.
    - `section-pad-xs` to `section-pad-fluid`: For rail-aware section padding.
    - `rail-toolbar-height`, `rail-gutter`, `rail-prose`, `rail-content`, `rail-wide`, `rail-full`: For glass toolbar integration and rail system dimensions.
- **Primitive Shadows (Legacy Token Mapping):** This section is critical for migration. It aliases existing semantic tokens (defined in `theme.css`) to a new, cleaner namespace (e.g., `color-primary` maps to `text-primary`, `background-base` maps to `bg-surface`). This allows components to gradually adopt the new token names without breaking existing styles. It includes mappings for colors, backgrounds, borders, typography, spacing, motion, and radii.
- **Component-Specific Tokens:** Defines building blocks for leaf components, such as button heights, padding, font sizes, and color variants, as well as card backgrounds, borders, shadows, and radii.
- **Theme Adaptations:** Provides dark mode and "Modern" brand adaptations for these new tokens, ensuring they respond correctly to theme changes.

Finally, the file also includes **SECTION COMPONENT BASE STYLES** within `@layer components`, defining the foundational CSS for the `.section` class, including its layout, layer variants, width variants, alignment variants, and responsive adjustments. This ensures that the `Section` component itself is styled using the new token system.

This file is a cornerstone of the design system's migration strategy, enabling a smooth transition to a more organized and maintainable token architecture.

---
## src/styles/utilities/ornate-divider.css

The file `src/styles/utilities/ornate-divider.css` defines a utility class for an elegant gold section divider with ornamental flourishes, scoped within `@layer utilities`.

Key features include:
- **Token-Driven Color:** Uses the `--divider-gold` CSS variable (which defaults to `--accent-gold`) for its color, ensuring consistency with the theme.
- **Base Styling:** Sets default width, height, margin, display, and opacity for the `.ornate-divider` element.
- **Container:** Provides an `.ornate-divider-container` for centering the divider and applying consistent margins.
- **Hover Effect:** Includes a subtle hover effect that increases opacity and applies a slight scale transformation.
- **Size Variants:** Offers `ornate-divider--sm` and `ornate-divider--lg` for different sizes, and `ornate-divider--detailed` for a specific square design.
- **Theme Variations:** Adapts its color and opacity based on the active theme (`data-clean-root="true"`) and includes specific dark mode styling (both forced and auto) with a `drop-shadow` filter for enhanced visual depth.
- **Responsive Sizing:** Adjusts the maximum width and height of the divider for various screen sizes.

This utility provides a reusable and theme-aware decorative element for visually separating sections of content.

---
## src/types/layout.ts

The file `src/types/layout.ts` defines TypeScript types and interfaces related to the application's layout system, specifically for the `Section` component.

It exports:
- `SectionLayer`: A union type defining the possible visual layers for a section (`'base'`, `'partial'`, `'isolated'`).
- `SectionWidth`: A union type defining the content width options for a section (`'prose'`, `'content'`, `'wide'`, `'full'`).
- `SectionAlign`: A union type defining the content alignment options for a section (`'left'`, `'center'`, `'right'`).
- `SectionElevation`: A union type defining the elevation (shadow) levels for a section (`0`, `1`, `2`, `3`).
- `SectionProps`: An interface defining the props for the `Section` component. It includes optional properties for `layer`, `width`, `align`, `elevation`, `as` (HTML element type), `className`, `id`, `style`, and `children`. It also includes advanced layout options as `data-` attributes (`data-rail-offset`, `data-overlap`, `data-float`, `data-header-placement`).
- `SECTION_DEFAULTS`: A constant object providing default values for key `SectionProps`, ensuring consistency when props are not explicitly provided.

This file is crucial for type-checking and providing clear documentation for how the `Section` component's layout and appearance can be controlled programmatically.