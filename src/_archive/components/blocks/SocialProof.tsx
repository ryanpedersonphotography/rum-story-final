import { SectionShell } from '@/components/primitives/SectionShell'
import { Stack, CopyBlock, ScriptAccent } from '@/components/primitives'

export function SocialProof() {
  return (
    <SectionShell surface="neutral-1" elevation={1} width="wide">
      <Stack gap="xl">
        
        <CopyBlock
          eyebrow="Love Stories"
          heading="Kind Words"
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="Frame" data-tone="neutral" data-elevation="1" style={{ padding: 'var(--space-7)' }}>
            <Stack gap="lg">
              <ScriptAccent size="lg">"Pure magic"</ScriptAccent>
              <div className="ty-body" style={{ fontStyle: 'italic' }}>
                "The most magical day of our lives. The team at Rum River Barn took care of every detail."
              </div>
              <div className="ty-h3" style={{ fontSize: 'var(--fs-body)' }}>— Sarah & Michael</div>
            </Stack>
          </div>

          {/* Testimonial 2 */}
          <div className="Frame" data-tone="neutral" data-elevation="1" style={{ padding: 'var(--space-7)' }}>
            <Stack gap="lg">
              <ScriptAccent size="lg">"Stunning"</ScriptAccent>
              <div className="ty-body" style={{ fontStyle: 'italic' }}>
                "Our guests couldn't stop talking about how beautiful the grounds were. Truly stunning."
              </div>
              <div className="ty-h3" style={{ fontSize: 'var(--fs-body)' }}>— Emily & James</div>
            </Stack>
          </div>

          {/* Testimonial 3 */}
          <div className="Frame" data-tone="neutral" data-elevation="1" style={{ padding: 'var(--space-7)' }}>
            <Stack gap="lg">
              <ScriptAccent size="lg">"Unforgettable"</ScriptAccent>
              <div className="ty-body" style={{ fontStyle: 'italic' }}>
                "From the bridal suite to the final dance, everything was perfect. Highly recommended."
              </div>
              <div className="ty-h3" style={{ fontSize: 'var(--fs-body)' }}>— Jessica & Tom</div>
            </Stack>
          </div>
        </div>

      </Stack>
    </SectionShell>
  )
}
