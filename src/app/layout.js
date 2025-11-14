/* ==========================================================================
   FILE: src/app/layout.js
   LOCATION: /src/app/layout.js
   PURPOSE: ROOT LAYOUT — Next.js App Router Layout
   ==========================================================================
   Pre-Paint Theme Initialization:
   - Theme is decided by inline script BEFORE React/CSS loads (prevents flash)
   - Script uses next/script with beforeInteractive strategy
   - React ThemeProvider only syncs to the pre-set DOM state
   ========================================================================== */

// 1. TOKENS - Design tokens (OKLCH colors, surfaces, gradients, spacing)
import '@/styles/tokens/theme.css'
import '@/styles/tokens/spacing.css'

// 2. UTILITIES - Section presets and layout utilities (@layer utilities)
import '@/styles/system/section-presets.css'
import '@/styles/system/layout.css'
import '@/styles/utilities/ornate-divider.css'

// 3. GLOBALS - Base styles
import '@/styles/globals.css'

// 4. COMPONENTS - Component-specific styles (@layer components)
import '@/styles/components/navbar.css'

import Script from 'next/script'
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { playfairDisplay, montserrat, dancingScript } from './fonts';
import Navbar from '@/features/Navbar';
import ThemeSelect from '@/development/ThemeSelect';

const isDev = process.env.NODE_ENV !== 'production'

const THEME_INIT_CODE = `
(function () {
  try {
    var d = document.documentElement;
    var params = new URLSearchParams(window.location.search);

    // THEME: URL param -> localStorage -> system
    var theme = params.get('theme');
    var allowedTheme =
      theme === 'dark' || theme === 'light' ? theme : null;

    if (!allowedTheme) {
      try {
        allowedTheme = localStorage.getItem('rr.theme');
      } catch (_) {}

      if (!allowedTheme) {
        var prefersDark =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        allowedTheme = prefersDark ? 'dark' : 'light';
      }
    } else {
      try {
        localStorage.setItem('rr.theme', allowedTheme);
      } catch (_) {}
    }

    var isDark = allowedTheme === 'dark';
    // MUST match tokens + registry
    var bgColor = isDark
      ? 'oklch(0.16 0.03 252)'
      : 'oklch(0.98 0 255)';

    d.style.backgroundColor = bgColor;
    d.style.colorScheme = isDark ? 'dark' : 'light';
    d.setAttribute('data-theme', allowedTheme);

    // BRAND: URL param -> localStorage -> default romantic
    var brandParam = params.get('brand');
    var allowedBrand =
      brandParam === 'romantic' || brandParam === 'modern'
        ? brandParam
        : null;

    if (!allowedBrand) {
      try {
        allowedBrand = localStorage.getItem('rr.brand') || 'romantic';
      } catch (_) {
        allowedBrand = 'romantic';
      }
    } else {
      try {
        localStorage.setItem('rr.brand', allowedBrand);
      } catch (_) {}
    }

    d.setAttribute('data-brand', allowedBrand);
  } catch (e) {
    // Failsafe
    var d2 = document.documentElement;
    d2.setAttribute('data-theme', 'light');
    d2.setAttribute('data-brand', 'romantic');
    d2.style.backgroundColor = 'oklch(0.98 0 255)';
    d2.style.colorScheme = 'light';
  }
})();
`

export const metadata = {
  title: 'Rum River Barn | Wedding Venue',
  description:
    'Experience your dream wedding at Rum River Barn, a romantic venue in Minnesota',
}

/*
 * DEV SERVER: http://localhost:6666
 * CLEAN ARCHITECTURE: All components migrated to clean tokenized system
 * - All sections use clean design tokens and components
 * - Responsive design with semantic styling
 */

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${montserrat.variable} ${dancingScript.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="rr-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_CODE }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div data-clean-root="true">
            <Navbar />
            {children}
          </div>
          {isDev ? <ThemeSelect /> : null}
        </ThemeProvider>
        <script
          src="//instant.page/5.2.0"
          type="module"
          integrity="sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z"
          async
        ></script>
      </body>
    </html>
  )
}