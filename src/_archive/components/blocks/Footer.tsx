import { SectionShell } from '@/components/primitives/SectionShell'
import { Stack, Cluster, ScriptAccent } from '@/components/primitives'

export function Footer() {
  return (
    <SectionShell 
      surface="brand-strong" 
      variant="flush" 
      elevation={0} 
      width="wide"
      className="ty-body"
      style={{ color: 'var(--color-text-on-dark)' }}
    >
      <div className="grid gap-12 md:grid-cols-4" style={{ paddingBlock: 'var(--space-8)' }}>
        
        {/* Brand Column */}
        <div className="md:col-span-1">
          <Stack gap="md">
            <ScriptAccent size="lg" style={{ color: 'var(--color-accent)' }}>Rum River</ScriptAccent>
            <div className="ty-body" style={{ opacity: 0.8 }}>
              Where dreams begin.<br/>
              Established 2024.
            </div>
          </Stack>
        </div>

        {/* Links 1 */}
        <div>
          <Stack gap="md">
            <div className="ty-h3" style={{ color: 'white' }}>Explore</div>
            <ul className="Stack" data-gap="sm" style={{ listStyle: 'none', padding: 0, opacity: 0.8 }}>
              <li><a href="#spaces" className="hover:text-accent transition-colors">The Spaces</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="#pricing" className="hover:text-accent transition-colors">Pricing</a></li>
            </ul>
          </Stack>
        </div>

        {/* Links 2 */}
        <div>
          <Stack gap="md">
            <div className="ty-h3" style={{ color: 'white' }}>Plan</div>
            <ul className="Stack" data-gap="sm" style={{ listStyle: 'none', padding: 0, opacity: 0.8 }}>
              <li><a href="#tour" className="hover:text-accent transition-colors">Schedule Tour</a></li>
              <li><a href="#faq" className="hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </Stack>
        </div>

        {/* Contact */}
        <div>
          <Stack gap="md">
            <div className="ty-h3" style={{ color: 'white' }}>Visit</div>
            <div className="ty-body" style={{ opacity: 0.8 }}>
              123 River Road<br/>
              Princeton, MN 55371<br/><br/>
              hello@rumriverbarn.com<br/>
              (555) 123-4567
            </div>
          </Stack>
        </div>

      </div>
      
      <div className="border-t border-white/10 py-8 text-center opacity-50 text-sm">
        © {new Date().getFullYear()} Rum River Barn. All rights reserved.
      </div>
    </SectionShell>
  )
}
