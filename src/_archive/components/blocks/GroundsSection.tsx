import { 
  Section, 
  SectionContent,
  Overlap,
  OverlapBase,
  OverlapBaseMedia,
  OverlapForeground,
  Stack, 
  Kicker, 
  Display, 
  Body,
  Cluster,
  MediaBlock
} from '@/components/primitives'

interface GroundsSectionProps {
  kicker?: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

export function GroundsSection({
  kicker = 'The Grounds',
  title = 'Nature is the ultimate backdrop.',
  description = 'Step out onto the sprawling deck overlooking the Rum River. Our grounds feature native wildflowers, manicured lawns for lawn games, and secluded paths perfect for a private first look.',
  image = '/images/property-field-wildflowers-natural.jpg',
  imageAlt = 'Wildflowers field',
  ctaText = 'Explore the map',
  ctaHref = '#',
  className = '',
}: GroundsSectionProps) {
  return (
    <Section width="full-under-toolbar" className={className}>
      <SectionContent>
        <Overlap foreground="right">
          <OverlapBase>
            <OverlapBaseMedia ratio="21-9" minHeight="60vh">
              <MediaBlock 
                src={image}
                alt={imageAlt}
                variant="rounded"
              />
            </OverlapBaseMedia>
          </OverlapBase>
          
          <OverlapForeground>
            <Stack gap="lg">
              <Kicker>{kicker}</Kicker>
              <Display size="2xl">
                {title.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </Display>
              <Body color="muted">
                {description}
              </Body>
              <Cluster>
                <a 
                  href={ctaHref}
                  style={{ 
                    color: 'var(--color-accent)', 
                    fontWeight: 500, 
                    borderBottom: '1px solid currentColor',
                    textDecoration: 'none'
                  }}
                >
                  {ctaText}
                </a>
              </Cluster>
            </Stack>
          </OverlapForeground>
        </Overlap>
      </SectionContent>
    </Section>
  )
}

export default GroundsSection
