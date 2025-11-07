import { Section } from '../ui-foundation/components/Section'
import { Card } from '../ui-foundation/components/Card'
import { Media } from '../ui-foundation/components/Media'

export default function Experience() {
  const experiences = [
    {
      title: 'Ceremony',
      subtitle: 'Say "I Do" in Style',
      description: 'Exchange vows in our stunning ceremony spaces, from our garden pavilion surrounded by lush landscaping to our elegant indoor chapel with soaring ceilings.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      features: ['Multiple ceremony locations', 'Professional sound system', 'Bridal suite preparation area', 'Photography staging areas']
    },
    {
      title: 'Reception',
      subtitle: 'Celebrate in Elegance',
      description: 'Dance the night away in our grand ballroom featuring crystal chandeliers, hardwood floors, and panoramic windows overlooking the river valley.',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
      features: ['Grand ballroom', 'Full bar service', 'Professional lighting', 'Climate controlled comfort']
    },
    {
      title: 'Dining',
      subtitle: 'Culinary Excellence',
      description: 'Our award-winning culinary team creates memorable dining experiences using locally sourced ingredients and customizable menus for every taste.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      features: ['Farm-to-table cuisine', 'Customizable menus', 'Dietary accommodations', 'Professional service staff']
    }
  ]

  return (
    <Section layer="base" width="wide" align="center">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '600',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ff9a8b 0%, #ad5389 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          The Complete Experience
        </h2>
        <p style={{ 
          fontSize: '1.2rem',
          color: 'var(--text-secondary, #666)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          From intimate ceremonies to grand celebrations, we provide everything 
          needed to create your perfect wedding day from start to finish.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '4rem'
      }}>
        {experiences.map((experience, index) => (
          <div 
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            {/* Content */}
            <div style={{ 
              order: index % 2 === 0 ? 1 : 2,
              padding: '2rem'
            }}>
              <Card 
                variant="ghost" 
                size="lg"
                data-align="start"
              >
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #ff9a8b 0%, #ad5389 100%)',
                  color: 'white',
                  borderRadius: 'var(--radius-4, .25rem)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1.5rem'
                }}>
                  {experience.title}
                </div>

                <h3 style={{ 
                  fontSize: '2rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--text-primary, #333)'
                }}>
                  {experience.subtitle}
                </h3>

                <p style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary, #666)',
                  marginBottom: '2rem'
                }}>
                  {experience.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem'
                }}>
                  {experience.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary, #666)'
                      }}
                    >
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff9a8b 0%, #ad5389 100%)',
                        flexShrink: 0
                      }} />
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Image */}
            <div style={{ 
              order: index % 2 === 0 ? 2 : 1 
            }}>
              <Card 
                variant="ghost" 
                size="sm"
                style={{ overflow: 'hidden' }}
              >
                <Media
                  src={experience.image}
                  alt={`${experience.title} at Rum River Venue`}
                  aspect="4/3"
                  fit="cover"
                  style={{
                    borderRadius: 'var(--radius-12, .75rem)',
                    boxShadow: '0 20px 40px rgba(0,0,0,.1)'
                  }}
                />
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center',
        marginTop: '4rem',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, rgba(255, 154, 139, 0.1) 0%, rgba(173, 83, 137, 0.1) 100%)',
        borderRadius: 'var(--radius-12, .75rem)'
      }}>
        <h3 style={{ 
          fontSize: '1.75rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: 'var(--text-primary, #333)'
        }}>
          Ready to Experience Rum River?
        </h3>
        <p style={{ 
          fontSize: '1.1rem',
          color: 'var(--text-secondary, #666)',
          marginBottom: '2rem',
          maxWidth: '500px',
          margin: '0 auto 2rem auto'
        }}>
          Schedule a private tour to see our spaces and discuss your vision with our planning team.
        </p>

        <Card
          as="button"
          variant="filled"
          size="lg"
          clickable
          style={{
            background: 'linear-gradient(135deg, #ff9a8b 0%, #ad5389 100%)',
            color: 'white',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            minWidth: '200px'
          }}
        >
          Schedule Your Tour
        </Card>
      </div>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="order"] {
            order: unset !important;
          }
        }
      `}</style>
    </Section>
  )
}