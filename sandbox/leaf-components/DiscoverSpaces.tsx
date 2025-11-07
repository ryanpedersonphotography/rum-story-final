import { Section } from '../ui-foundation/components/Section'
import { Card } from '../ui-foundation/components/Card'
import { Media } from '../ui-foundation/components/Media'

export default function DiscoverSpaces() {
  const spaces = [
    {
      title: 'Grand Ballroom',
      capacity: 'Up to 200 guests',
      description: 'Our signature space featuring crystal chandeliers, hardwood floors, and floor-to-ceiling windows overlooking the gardens.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8d4b?w=600&h=400&fit=crop',
      features: ['Crystal Chandeliers', 'Garden Views', 'Dance Floor']
    },
    {
      title: 'Garden Pavilion',
      capacity: 'Up to 150 guests',
      description: 'An open-air pavilion surrounded by manicured gardens, perfect for outdoor ceremonies and cocktail receptions.',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
      features: ['Outdoor Setting', 'Garden Views', 'Natural Lighting']
    },
    {
      title: 'Riverside Terrace',
      capacity: 'Up to 80 guests',
      description: 'Intimate riverside setting with natural stone features and panoramic water views, ideal for smaller celebrations.',
      image: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=600&h=400&fit=crop',
      features: ['Riverside Views', 'Stone Features', 'Intimate Setting']
    }
  ]

  return (
    <Section layer="partial" width="content" align="center">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '600',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Discover Our Spaces
        </h2>
        <p style={{ 
          fontSize: '1.2rem',
          color: 'var(--text-secondary, #666)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Each of our unique venues offers its own character and charm, 
          designed to accommodate celebrations of every size and style.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {spaces.map((space, index) => (
          <Card 
            key={index}
            variant="default"
            size="lg"
            clickable
            data-stack="vertical"
          >
            <Media
              src={space.image}
              alt={space.title}
              aspect="16/9"
              fit="cover"
              style={{ 
                marginBottom: '1.5rem',
                borderRadius: 'var(--radius-8, .5rem)',
                overflow: 'hidden'
              }}
            />
            
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'start',
                marginBottom: '0.75rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  {space.title}
                </h3>
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--accent-primary, #f093fb)',
                  fontWeight: '500',
                  background: 'var(--surface-1, #f5f5f5)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-4, .25rem)',
                  whiteSpace: 'nowrap'
                }}>
                  {space.capacity}
                </span>
              </div>

              <p style={{ 
                color: 'var(--text-secondary, #666)',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {space.description}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {space.features.map((feature, featureIndex) => (
                  <span 
                    key={featureIndex}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.375rem 0.75rem',
                      background: 'var(--surface-0, #fafafa)',
                      border: '1px solid var(--border-subtle, #e5e5e5)',
                      borderRadius: 'var(--radius-4, .25rem)',
                      color: 'var(--text-tertiary, #888)'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Card
          as="button"
          variant="filled"
          size="lg"
          clickable
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            minWidth: '200px'
          }}
        >
          Schedule a Venue Tour
        </Card>
        
        <p style={{ 
          fontSize: '0.875rem',
          color: 'var(--text-tertiary, #888)',
          marginTop: '1rem'
        }}>
          See all spaces in person with our expert wedding coordinators
        </p>
      </div>
    </Section>
  )
}