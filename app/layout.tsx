import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './Providers'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ABUKLINE — Ecosystem Company',
  description: 'We build the infrastructure the future runs on. Systems, platforms, and ecosystems engineered to compound.',
  keywords: ['ABUKLINE', 'ecosystem company', 'software development', 'digital infrastructure', 'systems architecture', 'technology'],
  openGraph: {
    title: 'ABUKLINE — Ecosystem Company',
    description: 'Born from software. Built for everything.',
    type: 'website',
    siteName: 'ABUKLINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABUKLINE — Ecosystem Company',
    description: 'Born from software. Built for everything.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-primary text-white antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
