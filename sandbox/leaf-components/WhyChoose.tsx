import { Section } from '../ui-foundation/components/Section'
import { Card } from '../ui-foundation/components/Card'

export default function WhyChoose() {
  const features = [
    {
      icon: '✨',
      title: 'Award-Winning Venue',
      description: 'Recognized as Minnesota\'s premier wedding destination with multiple industry awards and accolades.',
      stats: '5-Star Reviews'
    },
    {
      icon: '👥',
      title: 'Expert Planning Team',
      description: 'Our experienced coordinators handle every detail, ensuring your day is flawless from start to finish.',
      stats: '15+ Years Experience'
    },
    {
      icon: '🍽️',
      title: 'Exceptional Catering',
      description: 'Farm-to-table cuisine crafted by our award-winning chefs using locally sourced, seasonal ingredients.',
      stats: 'Chef-Curated Menus'
    },
    {
      icon: '📸',
      title: 'Picture Perfect Setting',
      description: 'Stunning architecture and landscaped grounds provide countless photo opportunities in every season.',
      stats: '10+ Photo Locations'
    },
    {
      icon: '🎵',
      title: 'Premium Amenities',
      description: 'State-of-the-art sound systems, lighting, and facilities ensure your celebration exceeds expectations.',
      stats: 'Full A/V Included'
    },
    {
      icon: '💝',
      title: 'All-Inclusive Packages',
      description: 'Comprehensive packages that include everything you need, making planning simple and stress-free.',
      stats: 'No Hidden Fees'
    }
  ]

  return (
    <Section layer="isolated" width="content" align="center" elevation={1}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '600',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Why Choose Rum River?
        </h2>
        <p style={{ 
          fontSize: '1.2rem',
          color: 'var(--text-secondary, #666)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          More than just a venue — we're your partners in creating an unforgettable 
          celebration that reflects your unique love story.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {features.map((feature, index) => (
          <Card 
            key={index}
            variant="ghost"
            size="md"
            clickable
            data-align="start"
            style={{
              border: '1px solid var(--border-subtle, #e5e5e5)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {feature.icon}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: 0,
                  textAlign: 'left'
                }}>
                  {feature.title}
                </h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent-primary, #84fab0)',
                  fontWeight: '600',
                  background: 'var(--surface-0, #fafafa)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-4, .25rem)',
                  border: '1px solid var(--border-subtle, #e5e5e5)',
                  whiteSpace: 'nowrap'
                }}>
                  {feature.stats}
                </span>
              </div>

              <p style={{ 
                color: 'var(--text-secondary, #666)',
                lineHeight: '1.6',
                textAlign: 'left'
              }}>
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        borderRadius: 'var(--radius-12, .75rem)',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h3 style={{ 
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          Ready to Start Planning?
        </h3>
        <p style={{ 
          fontSize: '1.1rem',
          marginBottom: '2rem',
          opacity: 0.9,
          maxWidth: '500px',
          margin: '0 auto 2rem auto'
        }}>
          Let our team help you create the wedding of your dreams. 
          Schedule a consultation to discuss your vision.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Card
            as="button"
            variant="filled"
            size="lg"
            clickable
            style={{
              background: 'white',
              color: '#4a5568',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              minWidth: '180px'
            }}
          >
            Book Consultation
          </Card>
          
          <Card
            as="button"
            variant="outline"
            size="lg"
            clickable
            style={{
              backgroundColor: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '500',
              minWidth: '140px'
            }}
          >
            Call Us
          </Card>
        </div>

        <p style={{ 
          fontSize: '0.875rem',
          marginTop: '1.5rem',
          opacity: 0.8
        }}>
          📞 (555) 123-4567 | 📧 hello@rumrivervenue.com
        </p>
      </div>
    </Section>
  )
}