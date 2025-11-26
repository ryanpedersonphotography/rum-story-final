import './globals.css'
import GlassToolbar from '@/components/GlassToolbar'
import { Playfair_Display, Dancing_Script } from 'next/font/google'
import Script from 'next/script'
import { initThemeScript } from '@/lib/theme'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${dancing.variable}`}
      // Default to light/system, script overrides
      suppressHydrationWarning
    >
      <head>
        {/* Theme init script - runs before paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: initThemeScript() }} />
      </head>
      <body>
        <GlassToolbar />
        
        <div className="MainCanvas">
          <main>{children}</main>
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
