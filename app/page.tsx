import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import StatementSection from '@/components/StatementSection'
import EcosystemSection from '@/components/EcosystemSection'
import ProjectPreviewSection from '@/components/ProjectPreviewSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <HeroSection />
      <StatementSection />
      <EcosystemSection />
      <ProjectPreviewSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
