import { SectionShell } from '@/components/primitives/SectionShell'
import { Stack, CopyBlock, CTAButton } from '@/components/primitives'

export function ScheduleTour() {
  return (
    <SectionShell surface="brand-soft" elevation={2} width="standard">
      <Stack gap="xl">
        <div className="text-center">
          <CopyBlock
            eyebrow="Visit Us"
            heading="Start Your Journey"
            lead="We would love to show you around. Schedule a private tour to experience the magic in person."
            align="center"
          />
        </div>

        <div className="Frame" data-surface="neutral-3" data-elevation="1" style={{ padding: 'var(--space-7)', maxWidth: '600px', marginInline: 'auto' }}>
          <form className="Stack" data-gap="lg">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="Stack" data-gap="xs">
                <label className="ty-body" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Name</label>
                <input type="text" className="input" placeholder="Jane Doe" />
              </div>
              <div className="Stack" data-gap="xs">
                <label className="ty-body" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email</label>
                <input type="email" className="input" placeholder="jane@example.com" />
              </div>
            </div>
            
            <div className="Stack" data-gap="xs">
              <label className="ty-body" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Message</label>
              <textarea className="textarea" placeholder="Tell us about your dream wedding..."></textarea>
            </div>

            <CTAButton variant="primary" fullWidth>
              Request a Tour
            </CTAButton>
          </form>
        </div>
      </Stack>
    </SectionShell>
  )
}
