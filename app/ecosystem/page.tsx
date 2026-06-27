import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AboutSection from '@/components/AboutSection'
import EcosystemSection from '@/components/EcosystemSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Ecosystem ABUKLINE',
  description: 'The ABUKLINE group: a technology company with a growing ecosystem spanning software, creative media, events, real estate, and more.',
}

export default function EcosystemPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <div className="pt-16 lg:pt-[68px]">
        <AboutSection />
        <EcosystemSection />
      </div>
      <Footer />
    </main>
  )
}
