'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Network, Bot, LayoutDashboard, Building2, Ticket, BarChart2, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const icons = [Code2, Network, Bot, LayoutDashboard, Ticket, BarChart2, Building2]

const tags = ['SYSTEMS', 'SYSTEMS', 'SYSTEMS', 'SYSTEMS', 'BAILEMOS', 'SYSTEMS', 'SYSTEMS']

const cardStyles = [
  { gradient: 'from-blue-500/15 to-blue-500/5', glow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.12)]', accent: 'text-blue-400', border: 'group-hover:border-blue-500/25' },
  { gradient: 'from-violet-500/15 to-violet-500/5', glow: 'group-hover:shadow-[0_0_50px_rgba(124,58,237,0.12)]', accent: 'text-violet-400', border: 'group-hover:border-violet-500/25' },
  { gradient: 'from-blue-500/15 to-violet-500/5', glow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]', accent: 'text-blue-300', border: 'group-hover:border-blue-500/20' },
  { gradient: 'from-violet-500/15 to-blue-500/5', glow: 'group-hover:shadow-[0_0_50px_rgba(124,58,237,0.1)]', accent: 'text-violet-300', border: 'group-hover:border-violet-500/20' },
  { gradient: 'from-rose-500/15 to-rose-500/5', glow: 'group-hover:shadow-[0_0_50px_rgba(244,63,94,0.1)]', accent: 'text-rose-400', border: 'group-hover:border-rose-500/25' },
  { gradient: 'from-sky-500/15 to-sky-500/5', glow: 'group-hover:shadow-[0_0_50px_rgba(14,165,233,0.1)]', accent: 'text-sky-400', border: 'group-hover:border-sky-500/25' },
  { gradient: 'from-blue-500/15 to-violet-500/5', glow: 'group-hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]', accent: 'text-blue-400', border: 'group-hover:border-blue-500/20' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function ServicesSection() {
  const { t, lang } = useLanguage()
  const s = t.services
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="solutions" className="relative z-10 py-20 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[160px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.span
            key={`badge-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="inline-block text-[11px] text-blue-400 uppercase tracking-[0.22em] font-medium border border-blue-400/20 bg-blue-400/[0.05] px-3 py-1.5 rounded-full mb-6"
          >
            {s.badge}
          </motion.span>

          <motion.h2
            key={`h-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.08 }}
            className="text-[30px] lg:text-5xl font-bold text-white mb-5"
            style={{ letterSpacing: '-0.025em' }}
          >
            {s.headlinePre}
            <br />
            <span className="gradient-text">{s.headlineEmphasis}</span>
          </motion.h2>

          <motion.p
            key={`desc-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.14 }}
            className="text-white/40 text-lg leading-relaxed"
          >
            {s.desc}
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          key={`grid-${lang}`}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } }, hidden: {} }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {s.capabilities.map((cap, i) => {
            const Icon = icons[i]
            const style = cardStyles[i]
            const tag = tags[i]
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`group relative glass rounded-2xl p-6 transition-all duration-500 ${style.glow} ${style.border} cursor-pointer shine`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-white/[0.1] transition-colors duration-300">
                      <Icon size={17} className={style.accent} />
                    </div>
                    <span className={`text-[9px] ${style.accent} opacity-50 uppercase tracking-widest border border-current/20 px-2.5 py-1 rounded-full font-medium`}>
                      {tag}
                    </span>
                  </div>
                  <h3 className="text-white/90 font-semibold text-sm mb-3 leading-snug tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-white/32 text-sm leading-relaxed mb-5">{cap.desc}</p>
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <ArrowUpRight size={12} className={`${style.accent} opacity-0 group-hover:opacity-60 transition-all duration-400 -translate-x-3 group-hover:translate-x-0`} />
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div
            variants={fadeUp}
            className="group glass rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-white/[0.12] transition-all duration-500 min-h-[200px] border border-white/[0.06]"
          >
            <p className="text-white/25 text-xs uppercase tracking-widest mb-3">{s.ctaDesc}</p>
            <p className="text-white/65 font-semibold text-base mb-6 leading-snug">{s.ctaHeadline}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-white border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              {s.ctaButton}
              <ArrowUpRight size={13} />
            </a>
          </motion.div>
        </motion.div>

        {/* Quote */}
        <motion.div
          key={`quote-${lang}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4 mt-14"
        >
          <div className="h-px flex-1 bg-white/[0.04]" />
          <p className="text-white/18 text-xs italic tracking-wide text-center">{s.quote}</p>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>
      </div>
    </section>
  )
}
