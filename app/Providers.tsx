'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import LoadingScreen from '@/components/LoadingScreen'
import type { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LoadingScreen />
      {children}
    </LanguageProvider>
  )
}
