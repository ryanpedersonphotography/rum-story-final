import { SectionShell } from '@/components/primitives/SectionShell'
import { Stack, MediaBlock, CopyBlock } from '@/components/primitives'

const GALLERY_IMAGES = [
  { src: '/images/history/history-00001.jpg', alt: 'Wedding moment 1', ratio: '1-1' },
  { src: '/images/history/history-00002.jpg', alt: 'Wedding moment 2', ratio: '1-1' },
  { src: '/images/history/history-00003.jpg', alt: 'Wedding moment 3', ratio: '1-1' },
  { src: '/images/history/history-00004.jpg', alt: 'Wedding moment 4', ratio: '1-1' },
  { src: '/images/history/history-00005.jpg', alt: 'Wedding moment 5', ratio: '1-1' },
  { src: '/images/history/history-00006.jpg', alt: 'Wedding moment 6', ratio: '1-1' },
]

export function WeddingsGallery() {
  return (
    <SectionShell surface="brand-strong" width="wide" elevation={0}>
      <Stack gap="xl">
        <div className="text-center" style={{ color: 'var(--color-text-on-dark)' }}>
          <CopyBlock
            eyebrow="Real Weddings"
            heading={<span style={{ color: 'var(--color-text-on-dark)' }}>Captured Moments</span>}
            align="center"
          />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--space-4)' 
        }}>
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className="cursor-pointer transition-transform hover:scale-[1.02]">
              <MediaBlock 
                src={img.src} 
                alt={img.alt} 
                variant="rounded" 
                ratio={img.ratio as any}
              />
            </div>
          ))}
        </div>
      </Stack>
    </SectionShell>
  )
}
