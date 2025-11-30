// src/app/page.tsx
import { HeroSection } from '@/system/recipes'
import { Type } from '@/system/atoms'

export default function Page() {
  return (
    <HeroSection variant="warm" minHeight="100vh" centerVertical>
      <Type as="h1" size="hero" tone="inherit">
        Blank Slate
      </Type>
      <Type as="p" size="body" tone="inherit">
        Design system archived. Ready for primitive redesign.
      </Type>
    </HeroSection>
  )
}