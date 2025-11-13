'use client'
import { MapPinIcon, ClockIcon, PhoneIcon, EnvelopeIcon, HomeIcon, CakeIcon } from '@heroicons/react/24/outline'
import SectionShell from '@/components/ui/SectionShell'
import styles from './Map.module.css'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

interface Location {
  icon?: string
  title?: string
  description?: string
}

export default function Map() {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    map: MapPinIcon,
    clock: ClockIcon,
    phone: PhoneIcon,
    email: EnvelopeIcon,
    home: HomeIcon,
    cake: CakeIcon
  }

  const defaultLocations = [
    {
      icon: 'map',
      title: 'Our Location',
      description: '12345 Rum River Road, Princeton, MN 55371'
    },
    {
      icon: 'clock',
      title: 'Tour Hours',
      description: 'Mon-Sat: 10am - 5pm, Sun: By Appointment'
    },
    {
      icon: 'phone',
      title: 'Call Us',
      description: '(763) 555-0123'
    },
    {
      icon: 'email',
      title: 'Email',
      description: 'info@rumriverbarn.com'
    },
    {
      icon: 'home',
      title: 'Indoor & Outdoor',
      description: 'Beautiful spaces for any weather'
    },
    {
      icon: 'cake',
      title: 'Full Catering',
      description: 'Professional kitchen and dining facilities'
    }
  ]

  const locations = defaultLocations
  const title = 'Visit Rum River Barn'
  const subtitle = 'Find Us'
  const description = 'Located in the heart of Minnesota, easily accessible from the Twin Cities'
  const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.5!2d-93.5!3d45.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMwJzAwLjAiTiA5M8KwMzAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890'

  return (
    <SectionShell
      paddingY="lg"
      spacing="content-flow"
      container="wide"
      background="surface"
      tone="auto"
      header={{
        scriptAccent: subtitle,
        title: title,
        lead: description,
        align: 'center'
      }}
      className={styles.mapSection}
      data-section="map"
    >
      <div className={styles.mapContentGrid}>
        {locations.slice(0, 3).map((location, index) => {
          const IconComponent = iconMap[location.icon || 'map'] || MapPinIcon
          return (
            <div key={index} className={styles.locationItem}>
              <div className={styles.locationIcon}>
                <IconComponent className={styles.icon} />
              </div>
              <div className={styles.locationText}>
                <Typography as="h4" variant="h3">{location.title}</Typography>
                <Text size="sm">{location.description}</Text>
              </div>
            </div>
          );
        })}

        <div className={styles.mapEmbed}>
          <iframe
            src={mapEmbedUrl}
            width="650"
            height="650"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rum River Barn Location"
          />
        </div>

        {locations.slice(3).map((location, index) => {
          const IconComponent = iconMap[location.icon || 'map'] || MapPinIcon
          return (
            <div key={index + 3} className={styles.locationItem}>
              <div className={styles.locationIcon}>
                <IconComponent className={styles.icon} />
              </div>
              <div className={styles.locationText}>
                <Typography as="h4" variant="h3">{location.title}</Typography>
                <Text size="sm">{location.description}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
