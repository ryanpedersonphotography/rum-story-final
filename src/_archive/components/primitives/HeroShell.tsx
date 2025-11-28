import { ReactNode } from 'react'
import { SectionShell } from './SectionShell'
import { Overlap, OverlapBase, OverlapBaseMedia, OverlapForeground } from './Overlap'
import { MediaBlock } from './MediaBlock'

interface HeroShellProps {
  mediaSrc: string
  mediaAlt: string
  children: ReactNode // The foreground card content
  overlayType?: 'darken' | 'gradient-bottom' | 'vignette'
}

export function HeroShell({
  mediaSrc,
  mediaAlt,
  children,
  overlayType = 'vignette'
}: HeroShellProps) {
  return (
    <SectionShell
      width="full-under-toolbar"
      variant="hero"
      surface="brand-soft"
      elevation={0}
    >
      <Overlap foreground="center" overlap="lg">
        <OverlapBase>
          <OverlapBaseMedia>
            {/* Hero media is always full bleed/viewport via SectionShell logic */}
            <div className="MediaBlock" style={{ height: '100vh', width: '100%' }}>
              <img
                className="MediaBlock-img"
                src={mediaSrc}
                alt={mediaAlt}
                style={{ objectFit: 'cover' }}
              />
              {overlayType && (
                <div className="MediaBlock-overlay" data-type={overlayType} />
              )}
            </div>
          </OverlapBaseMedia>
        </OverlapBase>

        <OverlapForeground>
          {children}
        </OverlapForeground>
      </Overlap>
    </SectionShell>
  )
}
