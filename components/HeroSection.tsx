'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Background ──────────────────────────────────────────────────────────────
// Mobile: only the main glow + grid (reduced opacity). No floating orbs,
// no accent lines, no particles — reduces visual noise on small screens.
// Desktop (sm+): full cinematic layer stack restored.

function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid — reduced on mobile */}
      <div className="absolute inset-0 bg-grid opacity-30 sm:opacity-100" />

      {/* Main glow — smaller radius on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[1000px] h-[380px] sm:h-[650px] bg-blue-600/[0.07] rounded-full blur-[100px] sm:blur-[140px]" />

      {/* Floating orbs — desktop only */}
      <div className="hidden sm:block absolute top-1/3 left-1/3 w-[550px] h-[420px] bg-violet-700/[0.05] rounded-full blur-[110px] animate-float" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-[380px] h-[300px] bg-blue-500/[0.04] rounded-full blur-[90px] animate-float-delayed" />

      {/* Edge vignettes */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#050505] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-[#050505] to-transparent" />

      {/* Side vignettes — desktop only (not needed on narrow screens) */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="hidden sm:block absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#050505] to-transparent" />

      {/* Accent lines — desktop only */}
      <div className="hidden sm:block absolute top-[38%] right-[11%] w-px h-20 bg-gradient-to-b from-transparent via-blue-400/25 to-transparent animate-float" />
      <div className="hidden sm:block absolute bottom-[32%] left-[11%] w-px h-14 bg-gradient-to-b from-transparent via-violet-400/25 to-transparent animate-float-delayed" />

      {/* Particles — desktop only */}
      <div className="hidden sm:block absolute top-[42%] left-[7%] w-1 h-1 rounded-full bg-blue-400/50 animate-pulse" />
      <div className="hidden sm:block absolute top-[58%] right-[9%] w-1 h-1 rounded-full bg-violet-400/45 animate-pulse-slow" />
    </div>
  )
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { t, lang } = useLanguage()
  const h = t.hero

  return (
    <section className="relative z-0 min-h-[100svh] sm:min-h-screen flex flex-col items-center justify-start sm:justify-center overflow-hidden bg-[#050505] sm:pt-24 lg:pt-28">
      <Background />

      <motion.div
        key={lang}
        variants={container}
        initial="hidden"
        animate="show"
        // Mobile: starts below fixed navbar via pt-[88px] on the content wrapper.
        // Desktop: justify-center centers within the section. The section itself
        // has sm:pt-24 lg:pt-28 to shift the centering origin below the fixed
        // navbar (h-16/h-[68px]) and guarantee ≥40px breathing room at all heights.
        className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center w-full pt-[88px] pb-28 sm:pt-0 sm:pb-20"
      >

        {/* ── Badge ── */}
        <motion.div variants={item} className="mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
            </span>
            <span className="text-[10px] sm:text-[11px] text-white/45 uppercase tracking-[0.2em] sm:tracking-[0.22em] font-medium">
              {h.badge}
            </span>
            {/* Est. year — hidden on mobile to reduce badge clutter */}
            <span className="hidden sm:inline text-white/15">·</span>
            <span className="hidden sm:inline text-[11px] text-white/25 uppercase tracking-[0.15em]">{h.est}</span>
          </div>
        </motion.div>

        {/* ── Headline ── */}
        {/* Mobile: 34px, tight leading — reads as 2 clean lines.
            Tablet (sm): 64px. Desktop (lg): 90px. */}
        <motion.h1
          variants={item}
          className="text-[34px] sm:text-[64px] lg:text-[90px] font-bold text-white leading-[1.07] sm:leading-[1.02] mb-2 sm:mb-3"
          style={{ letterSpacing: '-0.03em' }}
        >
          {h.h1}
          <br />
          <span className="gradient-text">{h.h2}</span>
        </motion.h1>

        {/* ── Subline ── */}
        {/* Slightly smaller tracking on mobile to prevent overflow */}
        <motion.p
          variants={item}
          className="text-[10px] sm:text-lg text-white/30 uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium mb-5 sm:mb-8 mt-1.5 sm:mt-2"
        >
          {h.subline}
        </motion.p>

        {/* ── Description ── */}
        {/* Narrower max-width on mobile so text doesn't feel orphaned */}
        <motion.p
          variants={item}
          className="text-[15px] sm:text-lg lg:text-xl text-white/40 max-w-[300px] sm:max-w-xl mx-auto leading-relaxed mb-7 sm:mb-10"
        >
          {h.desc}
        </motion.p>

        {/* ── CTAs ── */}
        {/* Always side-by-side (flex-row). flex-wrap only kicks in on
            screens < 320px where both buttons genuinely can't fit.
            whitespace-nowrap prevents label text from breaking mid-word.
            min-h-[44px] guarantees Apple/WCAG touch-target size. */}
        <motion.div
          variants={item}
          className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-14"
        >
          <a
            href="/ecosystem"
            className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-[13px] sm:text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:scale-[1.02] whitespace-nowrap"
          >
            {h.cta1}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
          </a>
          <a
            href="/solutions"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-xl border border-white/[0.09] bg-white/[0.03] hover:bg-white/[0.06] text-white/75 hover:text-white font-medium text-[13px] sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
          >
            {h.cta2}
          </a>
        </motion.div>

        {/* ── Phase indicators ── */}

        {/* Desktop version: full dot-connector-label layout */}
        <motion.div variants={item} className="hidden sm:flex items-center gap-0 mb-16">
          {h.phases.map((phase, i, arr) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  i === 0
                    ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                    : 'bg-white/15'
                }`} />
                <span className={`text-[9px] uppercase tracking-widest ${
                  i === 0 ? 'text-blue-400/80' : 'text-white/20'
                }`}>
                  {phase}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="w-16 h-px bg-white/[0.07] mx-2 mb-4" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Mobile version: 2×2 grid layout — removes horizontal pressure,
            keeps all 4 phases readable on narrow viewports (360px / 320px).
            tracking reduced to [0.07em] — editorial/premium on small text. */}
        <motion.div
          variants={item}
          className="flex sm:hidden flex-col items-center gap-2 mb-10"
        >
          {/* Row 1: phases 0 and 1 */}
          <div className="flex items-center gap-2">
            <span className="text-[8px] uppercase tracking-[0.07em] text-blue-400/65">
              {h.phases[0]}
            </span>
            <span className="text-white/[0.09] leading-none text-[8px]">·</span>
            <span className="text-[8px] uppercase tracking-[0.07em] text-white/20">
              {h.phases[1]}
            </span>
          </div>
          {/* Row 2: phases 2 and 3 */}
          {h.phases.length > 2 && (
            <div className="flex items-center gap-2">
              <span className="text-[8px] uppercase tracking-[0.07em] text-white/13">
                {h.phases[2]}
              </span>
              {h.phases.length > 3 && (
                <>
                  <span className="text-white/[0.06] leading-none text-[8px]">·</span>
                  <span className="text-[8px] uppercase tracking-[0.07em] text-white/10">
                    {h.phases[3]}
                  </span>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Ecosystem strip — desktop only ── */}
        {/* Too dense for mobile at 9px. Hidden below sm. */}
        <motion.div
          variants={item}
          className="hidden sm:flex items-center gap-5 text-[9px] uppercase tracking-[0.22em] text-white/20"
        >
          <span className="text-white/10">An ecosystem of</span>
          {h.ecosystemStrip.map((label, i) => (
            <div key={i} className="flex items-center gap-5">
              <span>{label}</span>
              {i < h.ecosystemStrip.length - 1 && (
                <span className="text-white/[0.08]">·</span>
              )}
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* ── Scroll indicator ── */}
      {/* Visible on both mobile and desktop — functional, cinematic. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 z-10"
      >
        <span className="text-[8px] sm:text-[9px] text-white/18 uppercase tracking-[0.28em]">Scroll</span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-white/15 to-transparent" />
        <ChevronDown size={10} className="text-white/15 animate-bounce" />
      </motion.div>
    </section>
  )
}
