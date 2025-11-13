import GlassToolbar from '@/development/GlassToolbar'
import Navbar from '@/features/Navbar'
import Hero from '@/features/Hero'
import Spaces from '@/features/Spaces'
import Experience from '@/features/Experience'
import AlternatingBlocks from '@/features/AlternatingBlocks'
import Gallery from '@/features/Gallery'
import Pricing from '@/features/Pricing'
import FAQ from '@/features/FAQ'
import Map from '@/features/Map'
import ScheduleForm from '@/features/ScheduleForm'
import Footer from '@/features/Footer'

export default function HomePage() {
  return (
    <div className="glass-toolbar-layout">
      <GlassToolbar />
      <Navbar />
      <main className="glass-toolbar-layout__content">
        <Hero />
        <Spaces />
        <Experience />
        <AlternatingBlocks />
        <Gallery />
        <Pricing />
        <FAQ />
        <Map />
        <ScheduleForm />
        <Footer />
      </main>
    </div>
  )
}