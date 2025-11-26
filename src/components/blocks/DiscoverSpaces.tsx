import { useState } from 'react'
import { SectionShell } from '@/components/primitives/SectionShell'
import { Stack, Cluster, CopyBlock, MediaBlock, CTAButton } from '@/components/primitives'

type SpaceFilter = 'All' | 'The Barn' | 'The Lawn' | 'The Loft'

const SPACES = [
  {
    id: 'barn',
    category: 'The Barn',
    title: 'Rustic Elegance',
    image: '/images/barn-interior-ceiling-beams-lighting.jpg',
    description: 'Original timber beams, climate control, and space for 250 guests.',
  },
  {
    id: 'lawn',
    category: 'The Lawn',
    title: 'Riverside Ceremony',
    image: '/images/property-field-wildflowers-natural.jpg',
    description: 'Say "I do" with the Rum River as your witness.',
  },
  // Placeholder for Loft if image exists, otherwise reusing barn
  {
    id: 'loft',
    category: 'The Loft',
    title: 'Bridal Suite',
    image: '/images/barn-exterior-full-deck-view-evening.jpg',
    description: 'A private sanctuary for preparation and quiet moments.',
  },
]

export function DiscoverSpaces() {
  const [filter, setFilter] = useState<SpaceFilter>('All')

  const visibleSpaces = filter === 'All' 
    ? SPACES 
    : SPACES.filter(s => s.category === filter)

  return (
    <SectionShell
      id="spaces"
      width="wide"
      surface="neutral-1"
      elevation={1}
    >
      <Stack gap="xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <CopyBlock
            eyebrow="Discover Our Spaces"
            heading="More Than A Venue"
            lead="From the grand barn to the intimate riverbank, every corner is designed for connection."
            align="center"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-center">
          <div className="Cluster" data-gap="sm">
            {(['All', 'The Barn', 'The Lawn', 'The Loft'] as const).map((f) => (
              <button
                key={f}
                className={`pill ${filter === f ? 'pill--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          {visibleSpaces.map((space) => (
            <div key={space.id} className="Frame" data-tone="neutral" data-elevation="1">
              <MediaBlock 
                src={space.image} 
                alt={space.title} 
                variant="rounded" 
                ratio="4-3"
              />
              <div style={{ padding: 'var(--space-6)' }}>
                <Stack gap="sm">
                  <div className="ty-h3">{space.title}</div>
                  <div className="ty-body" style={{ color: 'var(--color-text-muted)' }}>
                    {space.description}
                  </div>
                  <CTAButton variant="inline" href={`/spaces/${space.id}`} as="a">
                    Explore {space.category}
                  </CTAButton>
                </Stack>
              </div>
            </div>
          ))}
        </div>
      </Stack>
    </SectionShell>
  )
}
