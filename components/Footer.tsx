'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Logo from '@/components/Logo'

const CURRENT_YEAR = new Date().getFullYear()

// Maps each group's labels (in translation order) to the correct page route.
// Company: About → /ecosystem (AboutSection lives there), Ecosystem → /ecosystem,
//          Vision & Strategy → /vision, Contact → /contact
// Systems: all capabilities are on /solutions
// Group: all divisions are on /ecosystem
const groupHrefs: Record<string, string[]> = {
  Company: ['/ecosystem', '/ecosystem', '/vision', '/contact'],
  Systems: ['/solutions', '/solutions', '/solutions', '/solutions', '/solutions'],
  Group: ['/ecosystem', '/ecosystem', '/ecosystem', '/ecosystem'],
}

// Social channels — not yet public. Rendered as non-interactive presence markers.
// Replace with real <a href="..."> entries once accounts are live.
const socials = ['LinkedIn', 'Instagram', 'GitHub', 'X']

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.05] overflow-hidden">
      {/* Brand blue top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main content */}
        <div className="py-12 lg:py-20 grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">

            {/* Logo — links back to homepage */}
            <a
              href="/"
              aria-label="ABUKLINE — Home"
              className="inline-block mb-6 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25"
            >
              <Logo size="sm" />
            </a>

            <p className="text-white/28 text-sm leading-relaxed mb-2 max-w-xs">
              {f.tagline}
            </p>
            <p className="text-white/16 text-xs leading-relaxed mb-5 max-w-xs">
              {f.sub}
            </p>

            {/* Email contact */}
            <a
              href="mailto:hello@abukline.com"
              className="inline-block text-[11px] text-white/25 hover:text-white/55 transition-colors duration-300 tracking-wide mb-7 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25"
            >
              hello@abukline.com
            </a>

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-55" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[9px] text-white/28 uppercase tracking-[0.18em]">
                {f.statusBadge}
              </span>
            </div>

            {/* Brand keywords */}
            <div className="flex flex-wrap gap-1.5">
              {f.keywords.map((kw) => (
                <span key={kw} className="text-[8px] text-white/15 border border-white/[0.05] px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(Object.keys(f.groups) as Array<keyof typeof f.groups>).map((group) => {
            const labels = f.groups[group]
            const hrefs = groupHrefs[group] ?? []
            return (
              <div key={group}>
                <p className="text-[9px] text-white/22 uppercase tracking-[0.22em] font-medium mb-5">
                  {group}
                </p>
                <ul className="space-y-3">
                  {labels.map((label, i) => (
                    <li key={i}>
                      <a
                        href={hrefs[i] ?? '/'}
                        className="text-sm text-white/30 hover:text-white/65 transition-colors duration-300 tracking-wide rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-[10px] text-white/18 tracking-wide">
              {f.copyright(CURRENT_YEAR)}
            </p>
            <span className="text-white/10 hidden sm:block">·</span>
            <p className="text-[10px] text-white/12 tracking-wide hidden sm:block">
              {f.brand}
            </p>
          </div>

          {/* Socials — pre-launch presence, non-interactive.
              aria-hidden: these carry no actionable purpose for assistive tech. */}
          <div className="flex items-center gap-5" aria-hidden="true">
            {socials.map((name) => (
              <span
                key={name}
                className="group relative text-[10px] text-white/[0.13] tracking-wide cursor-default select-none"
              >
                {name}
                {/* Tooltip */}
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[8px] text-white/35 bg-white/[0.05] border border-white/[0.07] uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Launching soon
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Large watermark */}
        <div className="relative overflow-hidden h-14 pointer-events-none select-none">
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[72px] lg:text-[96px] font-black text-white/[0.018] tracking-[0.12em] uppercase whitespace-nowrap leading-none">
            ABUKLINE
          </span>
        </div>
      </div>
    </footer>
  )
}
