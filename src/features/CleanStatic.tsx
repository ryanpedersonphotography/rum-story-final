// ==============================
// File: src/features/CleanStatic.tsx
// Optional: a static clean stack for /clean?static=1 or fetch failures
// ==============================
import Navbar from '@/features/Navbar'
import Hero from '@/features/Hero'
import AlternatingBlocks from '@/features/AlternatingBlocks'
import Spaces from '@/features/Spaces'
import Experience from '@/features/Experience'
import Gallery from '@/features/Gallery'
import BrandProof from '@/features/BrandProof'
import ScheduleForm from '@/features/ScheduleForm'
import Map from '@/features/Map'
import FAQ from '@/features/FAQ'
import Pricing from '@/features/Pricing'
import Footer from '@/features/Footer'

export default function CleanStatic() {
  return (
    <>
      <Navbar />
      <Hero />
      <Spaces />
      <AlternatingBlocks />
      <Experience />
      <Gallery />
      <BrandProof />
      <ScheduleForm />
      <Map />
      <FAQ />
      <Pricing />
      <Footer />
    </>
  )
}