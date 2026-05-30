import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import StatementSection from '@/components/StatementSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import PositioningSection from '@/components/PositioningSection'
import EcosystemSection from '@/components/EcosystemSection'
import FutureVisionSection from '@/components/FutureVisionSection'
import ProjectPreviewSection from '@/components/ProjectPreviewSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <HeroSection />
      <StatementSection />
      <AboutSection />
      <ServicesSection />
      <PositioningSection />
      <EcosystemSection />
      <FutureVisionSection />
      <ProjectPreviewSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
