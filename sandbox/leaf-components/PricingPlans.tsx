import { Section } from '../ui-foundation/components/Section'
import { Card } from '../ui-foundation/components/Card'

export default function PricingPlans() {
  const plans = [
    {
      name: 'Essential',
      subtitle: 'Perfect for intimate celebrations',
      price: '$4,500',
      duration: 'Up to 75 guests',
      description: 'Everything you need for a beautiful, intimate wedding celebration.',
      features: [
        'Garden Pavilion or Riverside Terrace',
        '6-hour venue rental',
        'Tables, chairs & linens',
        'Basic sound system',
        'Bridal suite access',
        'Coordination assistance',
        'Parking for 50 vehicles'
      ],
      highlight: false,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      name: 'Signature',
      subtitle: 'Our most popular package',
      price: '$7,500',
      duration: 'Up to 150 guests',
      description: 'The complete wedding experience with premium amenities and services.',
      features: [
        'Grand Ballroom with garden access',
        '8-hour venue rental',
        'Premium tables, chairs & linens',
        'Professional sound & lighting',
        'Bridal & groom suites',
        'Day-of coordination',
        'Bar setup & glassware',
        'Ceremony & reception spaces',
        'Parking for 100 vehicles'
      ],
      highlight: true,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      name: 'Luxury',
      subtitle: 'The ultimate celebration',
      price: '$12,000',
      duration: 'Up to 250 guests',
      description: 'Premium all-inclusive experience with white-glove service and luxury amenities.',
      features: [
        'Full venue exclusive access',
        '12-hour venue rental',
        'Luxury tables, chairs & premium linens',
        'Professional A/V & uplighting',
        'Luxury bridal & groom suites',
        'Full wedding planning services',
        'Premium bar package included',
        'Multiple ceremony options',
        'Valet parking service',
        'Overnight accommodations',
        'Rehearsal dinner space'
      ],
      highlight: false,
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    }
  ]

  const addOns = [
    { name: 'Additional Hour', price: '$500' },
    { name: 'Extra 25 Guests', price: '$750' },
    { name: 'Cocktail Hour Extension', price: '$400' },
    { name: 'Late Night Snack Service', price: '$650' },
    { name: 'Enhanced Lighting Package', price: '$800' },
    { name: 'Ceremony Music Upgrade', price: '$300' }
  ]

  return (
    <Section 
      layer="partial" 
      width="content" 
      align="center"
      data-header-placement="outside"
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '600',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Wedding Packages
        </h2>
        <p style={{ 
          fontSize: '1.2rem',
          color: 'var(--text-secondary, #666)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Thoughtfully designed packages to suit every celebration, 
          from intimate gatherings to grand affairs.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {plans.map((plan, index) => (
          <Card 
            key={index}
            variant={plan.highlight ? "filled" : "default"}
            size="lg"
            clickable
            data-stack="vertical"
            style={{
              border: plan.highlight ? 'none' : '2px solid var(--border-subtle, #e5e5e5)',
              background: plan.highlight 
                ? plan.color 
                : 'var(--surface-2, Canvas)',
              color: plan.highlight ? 'white' : 'var(--text-primary, #333)',
              transform: plan.highlight ? 'scale(1.05)' : 'scale(1)',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            {plan.highlight && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'white',
                color: plan.color.split(' ')[2],
                padding: '0.5rem 1.5rem',
                borderRadius: 'var(--radius-6, .375rem)',
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 12px rgba(0,0,0,.1)'
              }}>
                Most Popular
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: plan.highlight ? 'white' : 'var(--text-primary, #333)'
              }}>
                {plan.name}
              </h3>
              <p style={{ 
                fontSize: '0.9rem',
                opacity: plan.highlight ? 0.9 : 0.7,
                marginBottom: '1.5rem'
              }}>
                {plan.subtitle}
              </p>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ 
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: plan.highlight ? 'white' : 'var(--text-primary, #333)'
                }}>
                  {plan.price}
                </span>
              </div>
              <p style={{ 
                fontSize: '0.9rem',
                opacity: plan.highlight ? 0.8 : 0.6,
                fontWeight: '500'
              }}>
                {plan.duration}
              </p>
            </div>

            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '2rem',
              opacity: plan.highlight ? 0.9 : 0.8,
              textAlign: 'center'
            }}>
              {plan.description}
            </p>

            <div style={{ flex: 1 }}>
              <h4 style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: plan.highlight ? 'white' : 'var(--text-primary, #333)'
              }}>
                What's Included:
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9rem',
                      opacity: plan.highlight ? 0.9 : 0.8
                    }}
                  >
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: plan.highlight ? 'white' : plan.color,
                      flexShrink: 0
                    }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Card
                as="button"
                variant={plan.highlight ? "outline" : "filled"}
                size="md"
                clickable
                style={{
                  width: '100%',
                  background: plan.highlight 
                    ? 'transparent' 
                    : plan.color,
                  border: plan.highlight 
                    ? '2px solid white' 
                    : 'none',
                  color: plan.highlight ? 'white' : 'white',
                  fontWeight: '600'
                }}
              >
                Choose {plan.name}
              </Card>
            </div>
          </Card>
        ))}
      </div>

      {/* Add-ons Section */}
      <Card 
        variant="outline" 
        size="lg"
        style={{ marginBottom: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.75rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Popular Add-Ons
          </h3>
          <p style={{ 
            color: 'var(--text-secondary, #666)',
            fontSize: '1rem'
          }}>
            Enhance your celebration with these premium services
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {addOns.map((addon, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'var(--surface-0, #fafafa)',
                borderRadius: 'var(--radius-6, .375rem)',
                border: '1px solid var(--border-subtle, #e5e5e5)'
              }}
            >
              <span style={{ fontWeight: '500' }}>{addon.name}</span>
              <span style={{ 
                fontWeight: '700',
                color: 'var(--accent-primary, #f093fb)'
              }}>
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ textAlign: 'center' }}>
        <Card
          as="button"
          variant="filled"
          size="lg"
          clickable
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            minWidth: '240px',
            marginBottom: '1rem'
          }}
        >
          Request Custom Quote
        </Card>
        
        <p style={{ 
          fontSize: '0.875rem',
          color: 'var(--text-tertiary, #888)'
        }}>
          All packages can be customized to fit your specific needs and budget
        </p>
      </div>
    </Section>
  )
}