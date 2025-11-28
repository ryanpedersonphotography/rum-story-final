import type { Metadata } from 'next'
// CSS imports in correct order: 1) tokens, 2) mode overrides, 3) globals
import './theme.css'
import './theme-modes.css'
import './globals.css'

import Script from 'next/script'
import { Playfair_Display, Dancing_Script } from 'next/font/google'
import { initThemeScript } from '@/system/theme/initThemeScript'
import GlassToolbar from '@/components/GlassToolbar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600'],
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400'],
  display: 'swap',
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
      suppressHydrationWarning
      className={`${playfair.variable} ${dancing.variable}`}
    >
      <head>
        <Script
          id="zen-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: initThemeScript }}
        />
      </head>
      <body>
        <div className="glass-toolbar-layout">
          <GlassToolbar />
          <div className="glass-toolbar-layout__content">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
