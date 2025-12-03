import type { Metadata } from "next"

import "./botanical-luxe.css"
import "./theme.css"
import "./theme-modes.css"
import "./globals.css"

import { Playfair_Display, Dancing_Script, Montserrat } from "next/font/google"
import { GlobalCanvas } from "@/system/parts/GlobalCanvas"
import GlassToolbar from "@/components/legacy/GlassToolbar"
import { Providers } from "./providers"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
  display: "swap",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rum River Wedding Barn",
  description: "Romantic riverside Minnesota wedding venue.",
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
      className={`${playfair.variable} ${dancing.variable} ${montserrat.variable}`}
    >
      <body>
        <Providers>
          <GlobalCanvas sidebar={<GlassToolbar />}>
            {children}
          </GlobalCanvas>
          <div id="portal-root" />
        </Providers>
      </body>
    </html>
  )
}