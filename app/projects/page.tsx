import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ProjectPreviewSection from '@/components/ProjectPreviewSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Projects ABUKLINE',
  description: 'A look inside the platforms and digital products built across the ABUKLINE ecosystem.',
}

export default function ProjectsPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <div className="pt-16 lg:pt-[68px]">
        <ProjectPreviewSection />
      </div>
      <Footer />
    </main>
  )
}
