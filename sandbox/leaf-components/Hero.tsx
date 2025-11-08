import { Section } from '../ui-foundation/components/Section'

export default function Hero() {
  return (
    <Section 
      layer="base" 
      width="full" 
      align="center"
      elevation={0}
      className="hero"
      data-header-placement="inside"
      data-rail-offset="true"
      data-float="true"
    >
      <div className="hero__media" aria-hidden="true" />
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">
          Your Perfect Wedding{' '}
          <span className="hero__accent">Starts Here</span>
        </h1>
        <p className="hero__blurb">
          Experience elegance and romance at Rum River Venue — where every detail is
          crafted to make your special day unforgettable.
        </p>
import Button from '@/components/ui/Button';
// ...
<div className="hero-actions">
  <Button as="a" href="#schedule-form" variant="primary">Book Your Tour</Button>
  <Button as="a" href="#gallery" variant="ghost">View Gallery</Button>
</div>
        
        {/* Feature highlights */}
        <div className="hero__highlights">
          {[
            '150+ Weddings Hosted',
            'Award-Winning Venue', 
            'Full-Service Planning'
          ].map((feature, index) => (
            <div key={index} className="hero__highlight">
              <span className="hero__highlight-dot" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: min(100svh, 900px);
          isolation: isolate;
          color: var(--text-on-hero, white);
        }

        .hero :global(.section__container) {
          /* ensure content width is constrained even though width="full" */
          max-width: var(--width-content, 1200px);
        }

        .hero__media {
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1519167758481-83f29c8e8d4b?w=1920&h=1080&fit=crop') center/cover no-repeat;
          filter: saturate(0.95) contrast(1.05);
          z-index: -2;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(1200px 600px at 70% 40%, rgb(0 0 0 / .15), transparent 60%),
            linear-gradient(to bottom, rgb(0 0 0 / .35), rgb(0 0 0 / .45));
          z-index: -1;
        }

        .hero__content {
          padding-block: clamp(4rem, 12vh, 16rem);
          display: grid;
          gap: var(--space-24, 1.5rem);
          text-align: center;
        }

        .hero__title {
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.08;
          font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
          margin: 0;
        }

        .hero__accent {
          display: inline-block;
          background: linear-gradient(
            90deg,
            oklch(70% 0.12 330) 0%,
            oklch(70% 0.12 10) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: saturate(.9);
        }

        .hero__blurb {
          max-width: 65ch;
          margin-inline: auto;
          color: oklch(95% 0.02 260 / .92);
          line-height: 1.6;
          letter-spacing: 0.005em;
          font-size: 1.25rem;
        }

        .hero__actions {
          display: inline-flex;
          gap: var(--space-20, 1.25rem);
          margin-top: var(--space-8, 0.5rem);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: .9rem 1.5rem;
          border-radius: var(--radius-24, 999px);
          font-weight: 600;
          line-height: 1;
          border: 1px solid transparent;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s ease;
          font-size: 1.1rem;
          min-width: 180px;
        }

        .btn--primary {
          background: linear-gradient(90deg, #f093fb, #f5576c);
          color: white;
          box-shadow: 0 10px 24px rgb(0 0 0 / .25);
        }
        
        .btn--primary:hover { 
          transform: translateY(-1px); 
        }

        .btn--ghost {
          background: transparent;
          color: white;
          border-color: rgb(255 255 255 / .35);
          backdrop-filter: saturate(120%) blur(2px);
        }

        .hero__highlights {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: var(--space-32, 2rem);
          flex-wrap: wrap;
        }

        .hero__highlight {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.85;
        }

        .hero__highlight-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f093fb;
          flex-shrink: 0;
        }

        @media (max-width: 720px) {
          .hero__actions { 
            gap: var(--space-12, 0.75rem); 
            flex-direction: column;
            align-items: center;
          }
          
          .btn { 
            width: 100%; 
            max-width: 22rem; 
          }
          
          .hero__highlights {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        }
      `}</style>
    </Section>
  )
}