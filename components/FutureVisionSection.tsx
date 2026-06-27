'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function FutureVisionSection() {
  const { t, lang } = useLanguage()
  const v = t.vision
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-5%' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative z-10 py-20 lg:py-52 overflow-hidden"
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-[#050505] to-violet-950/15" />

        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] bg-blue-600/[0.055] rounded-full blur-[160px]"
        />
        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-violet-700/[0.045] rounded-full blur-[110px]"
        />

        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#050505] to-transparent" />

        {/* Horizontal rule lines — cinematic detail */}
        <div className="absolute top-[22%] inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute bottom-[22%] inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          key={`badge-${lang}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] text-violet-400 uppercase tracking-[0.22em] font-medium border border-violet-400/20 bg-violet-400/[0.05] px-3 py-1.5 rounded-full">
            {v.badge}
          </span>
        </motion.div>

        {/* Manifesto (cinematic line-by-line) */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-28">
          {v.manifestoLines.map((line, i) => (
            <motion.p
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.85, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={`text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight mb-1 ${
                line.highlight ? 'gradient-text' : 'text-white/35'
              }`}
              style={{ letterSpacing: '-0.025em' }}
            >
              {line.text}
            </motion.p>
          ))}

          <motion.p
            key={`closing-${lang}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="text-sm text-white/20 uppercase tracking-[0.2em] mt-10"
          >
            {v.closingLine}
          </motion.p>
        </div>

        {/* Strategic Pillars */}
        <motion.div
          key={`pillars-${lang}`}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } }, hidden: {} }}
          className="grid md:grid-cols-3 gap-5 lg:gap-7 mb-24"
        >
          {v.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group glass rounded-2xl p-8 border border-white/[0.06] hover:border-blue-500/20 transition-all duration-500"
            >
              <div className="text-[60px] font-black text-white/[0.035] leading-none mb-5 select-none">
                {pillar.number}
              </div>
              <h3 className="text-white font-bold text-base mb-3 tracking-tight">{pillar.title}</h3>
              <p className="text-white/32 text-sm leading-relaxed">{pillar.body}</p>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-blue-400/0 via-blue-400/18 to-blue-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-600" />
            </motion.div>
          ))}
        </motion.div>

        {/* Business phases */}
        <motion.div
          key={`phases-${lang}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[10px] text-white/25 uppercase tracking-[0.22em] text-center mb-8">
            {v.phasesTitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {v.phases.map((phase, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border transition-all duration-300 ${
                  i === 0
                    ? 'border-blue-500/30 bg-blue-500/[0.04] shadow-[0_0_30px_rgba(59,130,246,0.06)]'
                    : 'border-white/[0.05] bg-white/[0.01] opacity-45'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono ${i === 0 ? 'text-blue-400/80' : 'text-white/25'} uppercase tracking-widest`}>
                    {v.phasePrefix} {phase.num}
                  </span>
                  {i === 0 && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
                    </span>
                  )}
                </div>
                <h4 className={`font-bold text-sm mb-2 ${i === 0 ? 'text-white/85' : 'text-white/30'}`}>
                  {phase.title}
                </h4>
                <p className={`text-xs leading-relaxed ${i === 0 ? 'text-white/30' : 'text-white/18'}`}>
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final statement */}
        <motion.div
          key={`quote-${lang}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="text-center mt-24 lg:mt-32"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent mx-auto mb-8" />
          <p className="text-white/50 text-sm lg:text-base font-light italic max-w-xl mx-auto leading-relaxed">
            {v.finalQuote}
          </p>
          <p className="text-white/28 text-[10px] uppercase tracking-widest mt-5">{v.finalSource}</p>
        </motion.div>
      </div>
    </section>
  )
}
