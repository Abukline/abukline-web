'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, Link2, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const missionIcons = [Cpu, Link2, TrendingUp]

export default function AboutSection() {
  const { t, lang } = useLanguage()
  const a = t.about
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="about" className="relative z-10 py-20 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute right-0 top-0 w-[700px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[130px]" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[400px] bg-violet-700/[0.03] rounded-full blur-[110px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Core statement */}
        <div className="mb-16 lg:mb-28">
          <div className="max-w-4xl mb-12 lg:mb-16">
            <motion.span
              key={`badge-${lang}`}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="inline-block text-[11px] text-blue-400 uppercase tracking-[0.22em] font-medium border border-blue-400/20 bg-blue-400/[0.05] px-3 py-1.5 rounded-full mb-8"
            >
              {a.badge}
            </motion.span>

            <motion.h2
              key={`h-${lang}`}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ delay: 0.08 }}
              className="text-[30px] lg:text-6xl font-bold text-white leading-[1.06] mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              {a.h1}
              <br />
              {a.h2}
              <br />
              <span className="gradient-text">{a.h3}</span>
            </motion.h2>

            <motion.p
              key={`p1-${lang}`}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ delay: 0.16 }}
              className="text-lg lg:text-xl text-white/40 leading-relaxed max-w-2xl mb-4"
            >
              {a.p1}
            </motion.p>

            <motion.p
              key={`p2-${lang}`}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ delay: 0.22 }}
              className="text-lg lg:text-xl text-white/70 font-medium leading-relaxed max-w-2xl"
              style={{ letterSpacing: '-0.01em' }}
            >
              {a.p2}
            </motion.p>
          </div>

          {/* Fact blocks */}
          <motion.div
            key={`facts-${lang}`}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }, hidden: {} }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04] rounded-2xl overflow-hidden"
          >
            {a.facts.map((fact, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#050505] p-6 lg:p-7 group hover:bg-[#080808] transition-colors duration-400 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <p className="text-[10px] text-blue-400/60 font-mono uppercase tracking-widest mb-4">
                  {fact.num}
                </p>
                <h4 className="text-white/85 font-semibold text-sm mb-2 tracking-tight">
                  {fact.title}
                </h4>
                <p className="text-white/28 text-xs leading-relaxed">
                  {fact.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission: Build · Connect · Evolve */}
        <motion.div
          key={`mission-${lang}`}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } }, hidden: {} }}
          className="grid md:grid-cols-3 gap-5 mb-16 lg:mb-28"
        >
          {a.mission.map((dim, i) => {
            const Icon = missionIcons[i]
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group glass rounded-2xl p-7 glow-border shine transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors duration-300">
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <span className="text-white font-bold text-base tracking-tight">{dim.verb}</span>
                </div>
                <p className="text-white/35 text-sm leading-relaxed">{dim.body}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Values + Status card */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Values */}
          <motion.div
            key={`values-${lang}`}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } }, hidden: {} }}
            className="space-y-4"
          >
            <motion.p variants={fadeUp} className="text-[11px] text-white/25 uppercase tracking-[0.2em] mb-6">
              {a.valuesTitle}
            </motion.p>
            {a.values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 py-4 border-b border-white/[0.04] group"
              >
                <div className="w-1 h-1 rounded-full bg-blue-400/50 mt-2 flex-shrink-0 group-hover:bg-blue-400 transition-colors duration-300" />
                <div>
                  <p className="text-white/75 text-sm font-medium mb-0.5">{v.label}</p>
                  <p className="text-white/30 text-xs leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Systems status card */}
          <motion.div
            key={`systems-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-8 border border-blue-500/[0.15] bg-blue-500/[0.02]"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] text-emerald-400/70 uppercase tracking-widest font-medium">
                {a.systemsStatus}
              </span>
            </div>

            <h3 className="text-white font-bold text-xl mb-2 tracking-tight">{a.systemsName}</h3>
            <p className="text-blue-400/80 text-xs uppercase tracking-widest mb-5">{a.systemsDiv}</p>
            <p className="text-white/35 text-sm leading-relaxed mb-6">{a.systemsDesc}</p>

            <div className="border-l-2 border-blue-500/25 pl-4">
              <p className="text-white/25 text-xs italic leading-relaxed whitespace-pre-line">
                {a.systemsQuote}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
