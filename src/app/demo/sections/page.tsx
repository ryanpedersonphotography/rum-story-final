import Section from '@/components/layout/Section'

export default function SectionsDemo() {
  return (
    <>
      <Section layer="base" width="content" align="center" elevation={0}>
        <div style={{padding:'2rem 0'}}>
          <h2>Section System Smoke Test</h2>
          <p>Layer=base · width=content · align=center · elevation=0</p>
        </div>
      </Section>

      <Section layer="partial" width="wide" align="center" elevation={1}>
        <div style={{padding:'2rem 0'}}>
          <h3>Partial Layer + Wide</h3>
          <p>Check background, spacing, and container max-width.</p>
        </div>
      </Section>

      <Section layer="isolated" width="content" align="center" elevation={2}>
        <div style={{padding:'2rem 0'}}>
          <h3>Isolated Layer + Elevation 2</h3>
          <p>Should render with shadow/elevation styling.</p>
        </div>
      </Section>
      
      <Section layer="isolated" width="prose" align="left" elevation={1} data-header-placement="outside">
        <div style={{padding:'2rem 0'}}>
          <h3>Magazine Style with Outside Header</h3>
          <p>Header placement outside with prose width and left alignment. The header should sit above the background layer.</p>
        </div>
      </Section>

      <Section layer="base" width="full" align="center" elevation={0} data-rail-offset="true" data-float="true">
        <div style={{
          padding:'4rem 2rem',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3>Full Width Hero Style</h3>
          <p>Rail offset + float for hero sections. Should offset for navigation rail and float above.</p>
        </div>
      </Section>

      <Section layer="partial" width="content" align="center" elevation={1} data-overlap="top">
        <div style={{padding:'2rem 0'}}>
          <h3>Overlap Top</h3>
          <p>Magazine-style overlap with the section above for layered composition.</p>
        </div>
      </Section>
    </>
  )
}