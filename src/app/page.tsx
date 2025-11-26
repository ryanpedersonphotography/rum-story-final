import { 
  Hero, 
  DiscoverSpaces, 
  WhyChoose, 
  MoreThanVenue,
  WeddingsGallery,
  SocialProof,
  ScheduleTour,
  Footer 
} from '@/components/blocks'

export default function Page() {
  return (
    <main className="MainCanvas">
      <Hero 
        tagline="Where Dreams Begin"
        title="Rum River"
        titleAccent="Wedding Barn"
        backgroundImage="/images/hero-dreams-begin.jpg"
      />
      <DiscoverSpaces />
      <WhyChoose />
      <MoreThanVenue />
      <WeddingsGallery />
      <SocialProof />
      <ScheduleTour />
      <Footer />
    </main>
  )
}