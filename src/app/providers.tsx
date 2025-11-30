'use client'

import type { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ProvidersProps {
  children: ReactNode
}



export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      storageKey="zen-theme"
      defaultTheme="light"     // or "dark", whatever you want as default
      enableSystem={false}     // <— turn off system so there’s no system→stored bounce
      enableColorScheme
      disableTransitionOnChange
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  )
}
