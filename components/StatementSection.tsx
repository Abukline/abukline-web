'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StatementSection() {
  const { t, lang } = useLanguage()
  const s = t.statement
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="relative z-10 py-16 lg:py-36 overflow-hidden bg-[#0d0d0d] border-y border-white/[0.055]">
      {/* Subtle center glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-violet-700/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/[0.04] rounded-full blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          key={`label-${lang}`}
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12 lg:mb-16"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />
          <span className="text-[10px] text-blue-400/60 uppercase tracking-[0.28em] font-medium">
            {s.sectionLabel}
          </span>
        </motion.div>

        {/* Main quote */}
        <motion.p
          key={`q1-${lang}`}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-white/55 leading-[1.25] tracking-tight mb-8 lg:mb-10"
          style={{ letterSpacing: '-0.02em' }}
        >
          {s.quote1}
        </motion.p>

        {/* Divider rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-24 bg-gradient-to-r from-blue-400/50 to-violet-500/30 mb-8 lg:mb-10"
        />

        {/* Punchline */}
        <motion.p
          key={`q2-${lang}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-white leading-tight"
          style={{ letterSpacing: '-0.025em' }}
        >
          {s.quote2}
        </motion.p>
      </div>
    </section>
  )
}
