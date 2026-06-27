import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import FutureVisionSection from '@/components/FutureVisionSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vision ABUKLINE',
  description: 'The strategic manifesto and long-term vision behind the ABUKLINE ecosystem.',
}

export default function VisionPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <div className="pt-16 lg:pt-[68px]">
        <FutureVisionSection />
      </div>
      <Footer />
    </main>
  )
}
