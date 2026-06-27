'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

export default function PositioningSection() {
  const { t, lang } = useLanguage()
  const p = t.positioning
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section className="relative z-10 py-20 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d0d]">
        <div className="absolute inset-0 bg-grid-fine opacity-25" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-violet-700/[0.03] rounded-full blur-[110px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <motion.span
            key={`badge-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="inline-block text-[11px] text-violet-400 uppercase tracking-[0.22em] font-medium border border-violet-400/20 bg-violet-400/[0.05] px-3 py-1.5 rounded-full mb-6"
          >
            {p.badge}
          </motion.span>
          <motion.h2
            key={`h-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.08 }}
            className="text-[30px] lg:text-5xl font-bold text-white mb-6"
            style={{ letterSpacing: '-0.025em' }}
          >
            {p.headlinePre}
            <br />
            <span className="gradient-text">{p.headlineEmphasis}</span>
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — statement + body */}
          <motion.div
            key={`left-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.15 }}
          >
            <p
              className="text-xl lg:text-2xl font-semibold text-white/85 leading-snug mb-7"
              style={{ letterSpacing: '-0.015em' }}
            >
              {p.statement.split(p.statementAccent)[0]}
              <span className="text-blue-400">{p.statementAccent}</span>
              {p.statement.split(p.statementAccent)[1]}
            </p>
            <p className="text-white/38 text-base leading-relaxed mb-5">
              {p.body1}
            </p>
            <p className="text-white/38 text-base leading-relaxed">
              {p.body2}
            </p>
          </motion.div>

          {/* Right — contrast table */}
          <motion.div
            key={`right-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.25 }}
          >
            <p className="text-[10px] text-white/25 uppercase tracking-[0.22em] mb-6">
              {p.contrastLabel}
            </p>

            <div className="space-y-0">
              {p.contrasts.map((row, i) => (
                <motion.div
                  key={`${lang}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-[1fr_28px_1fr] items-center gap-3 py-3.5 border-b border-white/[0.05] group last:border-b-0"
                >
                  <span className="text-sm text-white/22 line-through decoration-white/10 tracking-wide">
                    {row.no}
                  </span>
                  <div className="flex items-center justify-center">
                    <ArrowRight size={11} className="text-blue-400/40 group-hover:text-blue-400/70 transition-colors duration-300" />
                  </div>
                  <span className="text-sm text-white/80 font-medium tracking-wide">
                    {row.yes}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Brand line footer — grid mirrors contrast rows so quote aligns with the "yes" column */}
            <div className="mt-8 pt-6 border-t border-white/[0.05] grid grid-cols-[1fr_28px_1fr] gap-3">
              <div className="col-start-3">
                <p className="text-[10px] text-white/18 italic tracking-wide leading-relaxed">
                  {p.brandQuote}
                </p>
                <p className="text-[9px] text-white/12 uppercase tracking-widest mt-1.5">ABUKLINE</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
