import { 
  Section, 
  SectionInner,
  Stack, 
  Kicker, 
  Display,
  Lead,
  CTAButton
} from '@/components/primitives'

interface CTASectionProps {
  kicker?: string
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  surface?: 'canvas' | 'neutral-1' | 'neutral-2' | 'neutral-3'
  elevation?: '0' | '1' | '2' | '3'
  className?: string
}

export function CTASection({
  kicker = 'Est. 2024',
  title = 'Your story starts on the river.',
  description = 'We are currently accepting bookings for the 2025-2026 wedding seasons. Experience the magic of Rum River Barn in person.',
  buttonText = 'Inquire Now',
  buttonHref,
  surface = 'neutral-2',
  elevation = '1',
  className = '',
}: CTASectionProps) {
  return (
    <Section 
      width="standard"
      surface={surface}
      elevation={elevation}
      className={className}
    >
      <SectionInner>
        <Stack gap="xl" align="center" className="text-center" style={{ paddingBlock: 'var(--space-8)' }}>
          <Kicker>{kicker}</Kicker>
          <Display style={{ maxWidth: '12ch' }}>
            {title}
          </Display>
          <Lead color="muted" size="lg" style={{ maxWidth: '60ch' }}>
            {description}
          </Lead>
          {buttonHref ? (
            <CTAButton 
              variant="pill"
              as="a"
              href={buttonHref}
              style={{ marginTop: 'var(--space-4)' }}
            >
              {buttonText}
            </CTAButton>
          ) : (
            <CTAButton 
              variant="pill"
              style={{ marginTop: 'var(--space-4)' }}
            >
              {buttonText}
            </CTAButton>
          )}
        </Stack>
      </SectionInner>
    </Section>
  )
}

export default CTASection
