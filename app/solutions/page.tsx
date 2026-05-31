import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ServicesSection from '@/components/ServicesSection'
import PositioningSection from '@/components/PositioningSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Solutions — ABUKLINE',
  description: 'Capabilities and services built across the ABUKLINE ecosystem. Software, platforms, events, analytics, and more.',
}

export default function SolutionsPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <div className="pt-16 lg:pt-[68px]">
        <ServicesSection />
        <PositioningSection />
      </div>
      <Footer />
    </main>
  )
}
