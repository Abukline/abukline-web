'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { translations, type Language, type Translations } from '@/locales/translations'

const VALID_LANGS: Language[] = ['en', 'it', 'es']

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  // Hydrate from localStorage after mount (keeps SSR/client renders in sync)
  useEffect(() => {
    const saved = localStorage.getItem('abukline_lang') as Language | null
    if (saved && VALID_LANGS.includes(saved)) {
      setLangState(saved)
    }
  }, [])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    localStorage.setItem('abukline_lang', next)
  }, [])

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
