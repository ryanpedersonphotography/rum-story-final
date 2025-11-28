import { SectionShell } from '@/components/primitives/SectionShell'
import { Stack, CopyBlock, CTAButton } from '@/components/primitives'
import { SparklesIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline'

const FEATURES = [
  {
    id: 'capacity',
    title: '250 Guests',
    icon: UserGroupIcon,
    description: 'Ample space for your entire guest list in our climate-controlled main hall.',
  },
  {
    id: 'hours',
    title: '12+ Hour Access',
    icon: ClockIcon,
    description: 'Relax and enjoy your day from early setup through late-night dancing.',
  },
  {
    id: 'amenities',
    title: 'Modern Amenities',
    icon: SparklesIcon,
    description: 'Professional sound system, bridal suite, and ADA accessibility throughout.',
  },
]

export function MoreThanVenue() {
  return (
    <SectionShell surface="neutral-2" elevation={1} width="standard">
      <Stack gap="xl">
        
        {/* Header */}
        <CopyBlock
          heading="More Than A Venue"
          lead="We provide the foundation for a flawless celebration."
          align="center"
        />

        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          {FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="Frame" 
              data-tone="neutral-3" 
              data-elevation="1"
              style={{ padding: 'var(--space-7)' }}
            >
              <Stack gap="md" align="start">
                <div style={{ 
                  color: 'var(--color-accent)', 
                  width: '32px', 
                  height: '32px' 
                }}>
                  <feature.icon />
                </div>
                <div className="ty-h3">{feature.title}</div>
                <div className="ty-body" style={{ color: 'var(--color-text-muted)' }}>
                  {feature.description}
                </div>
              </Stack>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <CTAButton variant="ghost">View Full Amenities</CTAButton>
        </div>

      </Stack>
    </SectionShell>
  )
}
