import { 
  Section, 
  SectionInner, 
  SectionContent,
  EdgeSplit,
  EdgeSplitText,
  EdgeSplitMedia,
  Stack, 
  Eyebrow, 
  Display, 
  DisplayAccent,
  Lead,
  MediaBlock
} from '@/components/primitives'

interface ArchitectureSectionProps {
  eyebrow?: string
  title?: string
  titleAccent?: string
  description?: string
  image?: string
  imageAlt?: string
  className?: string
}

export function ArchitectureSection({
  eyebrow = 'The Architecture',
  title = 'Designed for',
  titleAccent = 'the moment.',
  description = 'Floor-to-ceiling windows, open rafters, and a riverside tree line give you layered compositions from sunrise to blue hour.',
  image = '/images/barn-interior-ceiling-beams-lighting.jpg',
  imageAlt = 'Barn Interior with Beams',
  className = '',
}: ArchitectureSectionProps) {
  return (
    <Section 
      width="full" 
      surface="canvas" 
      elevation="0" 
      bleedBg 
      className={className}
    >
      <SectionInner>
        <SectionContent>
          <EdgeSplit layout="text-image" edge="right">
            <EdgeSplitText>
              <Stack gap="lg">
                <Stack gap="sm">
                  <Eyebrow>{eyebrow}</Eyebrow>
                  <Display size="3xl">
                    {title}
                    <br />
                    <DisplayAccent>{titleAccent}</DisplayAccent>
                  </Display>
                </Stack>
                <Lead color="muted" width="narrow" size="lg">
                  {description}
                </Lead>
              </Stack>
            </EdgeSplitText>
            
            <EdgeSplitMedia>
              <MediaBlock 
                src={image}
                alt={imageAlt}
                variant="rounded"
                edge="nearFlush"
                ratio="16-10"
              />
            </EdgeSplitMedia>
          </EdgeSplit>
        </SectionContent>
      </SectionInner>
    </Section>
  )
}

export default ArchitectureSection
