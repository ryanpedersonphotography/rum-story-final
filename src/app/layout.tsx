import type { Metadata } from 'next'
import '../styles/tokens/core.css'
import '../styles/primitives.css'
import '../styles/glass-toolbar.css'
import { initThemeScript } from '@/lib/theme-script'
import Script from 'next/script'
import { Playfair_Display, Dancing_Script } from 'next/font/google'
import GlassToolbar from '@/components/GlassToolbar'

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

export const metadata: Metadata = {
  title: 'Rum River Wedding Barn',
  description: 'Romantic riverside Minnesota wedding venue.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      data-theme="light"
      className={`${playfair.variable} ${dancing.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initThemeScript() }} />
      </head>
      <body>
        <div className="glass-toolbar-layout">
          <GlassToolbar />
          <div className="glass-toolbar-layout__content">
            <div className="MainCanvas">
              {children}
            </div>
          </div>
        </div>
        
        <Script
          src="//instant.page/5.2.0"
          strategy="lazyOnload"
          integrity="sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z"
        />
      </body>
    </html>
  )
}
