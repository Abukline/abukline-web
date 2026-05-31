'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage, LANGUAGES } from '@/contexts/LanguageContext'
import { type Language } from '@/locales/translations'
import Logo from '@/components/Logo'

// ─── Mobile Language Row ─────────────────────────────────────────────────────

function MobileLangRow({ onClose }: { onClose: () => void }) {
  const { lang, setLang } = useLanguage()
  return (
    <div className="flex items-center gap-2 pt-4 pb-1">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => { setLang(l.code); onClose() }}
          className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-widest transition-all duration-200 border ${
            lang === l.code
              ? 'border-blue-500/40 bg-blue-500/10 text-blue-400'
              : 'border-white/[0.07] bg-white/[0.02] text-white/35 hover:text-white/60'
          }`}
        >
          {l.flag}
        </button>
      ))}
    </div>
  )
}

// ─── Language Switcher (Desktop dropdown) ────────────────────────────────────

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LANGUAGES.find((l) => l.code === lang)!
  const others = LANGUAGES.filter((l) => l.code !== lang)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300"
        aria-label="Switch language"
      >
        <span className="text-[11px] font-semibold text-white/60 group-hover:text-white/85 tracking-widest transition-colors">
          {current.flag}
        </span>
        <ChevronDown
          size={10}
          className={`text-white/30 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 min-w-[120px] rounded-xl border border-white/[0.08] bg-[#0d0d0d]/95 backdrop-blur-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-white/[0.06]">
              <span className="text-[11px] font-bold text-blue-400 tracking-widest">{current.flag}</span>
              <span className="text-[11px] text-white/50">{current.label}</span>
              <div className="ml-auto w-1 h-1 rounded-full bg-blue-400" />
            </div>
            {others.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false) }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-white/[0.04] transition-colors duration-200 group"
              >
                <span className="text-[11px] font-semibold text-white/40 group-hover:text-white/75 tracking-widest transition-colors">
                  {l.flag}
                </span>
                <span className="text-[11px] text-white/30 group-hover:text-white/55 transition-colors">{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export default function Navigation() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const hrefs = ['/solutions', '/ecosystem', '/vision', '/projects', '/contact']

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/88 backdrop-blur-2xl border-b border-white/[0.055]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo
                Mobile: icon-only (grid mark, 28px) — clean, uncluttered.
                Desktop (md+): full wordmark logo at sm size. */}
            <a href="/" aria-label="ABUKLINE — Home" className="flex-shrink-0">
              <Logo variant="icon" size="sm" className="md:hidden" />
              <Logo size="sm" className="hidden md:block" />
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {t.nav.links.map((label, i) => (
                <a
                  key={i}
                  href={hrefs[i]}
                  className="relative px-4 py-2 text-sm text-white/42 hover:text-white/88 transition-colors duration-300 tracking-wide group"
                >
                  {label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-blue-400 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* Right side: language switcher + CTA (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <LanguageSwitcher />

              <a
                href="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-white/[0.09] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-300 tracking-wide"
              >
                {t.nav.cta}
              </a>

              {/* Hamburger — slightly more breathing room on mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/55 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#060606]/97 backdrop-blur-2xl border-b border-white/[0.06] md:hidden"
          >
            <div className="px-5 pt-4 pb-6 flex flex-col">

              {/* Nav links — more generous spacing */}
              <nav className="flex flex-col">
                {t.nav.links.map((label, i) => (
                  <a
                    key={i}
                    href={hrefs[i]}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center text-white/50 hover:text-white/85 text-[15px] tracking-wide transition-colors duration-200 py-3 border-b border-white/[0.04] last:border-b-0"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              {/* Language switcher row */}
              <MobileLangRow onClose={() => setMobileOpen(false)} />

              {/* CTA */}
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 text-center px-5 py-3 rounded-xl text-sm font-medium text-white border border-white/[0.09] bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-200"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
