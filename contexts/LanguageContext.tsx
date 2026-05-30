'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { translations, type Language, type Translations } from '@/locales/translations'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    // Persist preference across page refreshes
    if (typeof window !== 'undefined') {
      localStorage.setItem('abukline_lang', next)
    }
  }, [])

  // Hydrate from localStorage on first render
  // (done via useEffect to keep SSR clean)
  const t = translations[lang] as Translations

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'es', label: 'Español', flag: 'ES' },
]
