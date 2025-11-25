import './globals.css'
import GlassToolbar from '@/components/GlassToolbar'
import { Playfair_Display, Dancing_Script } from 'next/font/google'
import Script from 'next/script'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '600'],
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400'],
})

export const metadata = {
  title: 'Rum River Barn | Wedding Venue',
  description: 'Experience your dream wedding at Rum River Barn, a romantic venue in Minnesota',
}

// No-flash theme initialization script
// Runs before React hydration to prevent theme flicker
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${dancing.variable}`}
      // Default to light, but the script will override immediately
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        {/* Theme init script - runs before paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {/* 
            The GlassToolbar is fixed to the left.
            The main content (children) must use .MainCanvas to offset this width.
        */}
        <GlassToolbar />
        
        {children}
        
        <Script
          src="//instant.page/5.2.0"
          strategy="lazyOnload"
          integrity="sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z"
        />
      </body>
    </html>
  )
}
