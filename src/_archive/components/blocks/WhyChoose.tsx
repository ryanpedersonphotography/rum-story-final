import { SectionShell } from '@/components/primitives/SectionShell'
import { EdgeSplit, EdgeSplitText, EdgeSplitMedia } from '@/components/primitives/EdgeSplit'
import { MediaBlock } from '@/components/primitives/MediaBlock'
import { CopyBlock } from '@/components/primitives/CopyBlock'
import { Stack } from '@/components/primitives/Stack'

export function WhyChoose() {
  return (
    <SectionShell width="standard" surface="canvas" elevation={0}>
      <Stack gap="xl">
        
        {/* Row 1: Text Left */}
        <EdgeSplit layout="text-image" edge="right">
          <EdgeSplitText>
            <CopyBlock
              eyebrow="The Architecture"
              heading="Designed for the Moment"
              body="Floor-to-ceiling windows, open rafters, and a riverside tree line give you layered compositions from sunrise to blue hour."
            />
          </EdgeSplitText>
          <EdgeSplitMedia>
            <MediaBlock 
              src="/images/barn-interior-ceiling-beams-lighting.jpg" 
              alt="Interior"
              variant="rounded"
              ratio="4-3"
              className="MediaBlock--nearFlushRight"
            />
          </EdgeSplitMedia>
        </EdgeSplit>

        {/* Row 2: Image Left */}
        <EdgeSplit layout="image-text" edge="left">
          <EdgeSplitMedia>
            <MediaBlock 
              src="/images/property-field-wildflowers-natural.jpg" 
              alt="Wildflowers"
              variant="rounded"
              ratio="4-3"
              className="MediaBlock--nearFlushLeft"
            />
          </EdgeSplitMedia>
          <EdgeSplitText>
            <CopyBlock
              eyebrow="The Grounds"
              heading="Nature as Your Backdrop"
              body="Step out onto the sprawling deck overlooking the Rum River. Our grounds feature native wildflowers, manicured lawns for lawn games, and secluded paths."
            />
          </EdgeSplitText>
        </EdgeSplit>

      </Stack>
    </SectionShell>
  )
}
