import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact ABUKLINE',
  description: 'Get in touch with the ABUKLINE team. Partnerships, projects, and general inquiries.',
}

export default function ContactPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <div className="pt-16 lg:pt-[68px]">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
