'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, Film, Ticket, Sparkles, Building, UtensilsCrossed } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

// Static: icons + colors + phases (not translated)
const divisionMeta = [
  { icon: Cpu, color: 'blue', phase: 'active', phaseLabel: { en: 'Live', it: 'Attivo', es: 'Activo' } },
  { icon: Film, color: 'violet', phase: 'active', phaseLabel: { en: 'Live', it: 'Attivo', es: 'Activo' } },
  { icon: Ticket, color: 'rose', phase: 'building', phaseLabel: { en: 'Building', it: 'In costruzione', es: 'En construcción' } },
  { icon: Building, color: 'sky', phase: 'vision', phaseLabel: { en: 'Vision', it: 'Visione', es: 'Visión' } },
  { icon: UtensilsCrossed, color: 'emerald', phase: 'vision', phaseLabel: { en: 'Vision', it: 'Visione', es: 'Visión' } },
  { icon: Sparkles, color: 'amber', phase: 'vision', phaseLabel: { en: 'Vision', it: 'Visione', es: 'Visión' } },
]

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' },
  violet: { border: 'border-violet-500/28', bg: 'bg-violet-500/10', text: 'text-violet-400', dot: 'bg-violet-400' },
  rose: { border: 'border-rose-500/28', bg: 'bg-rose-500/10', text: 'text-rose-400', dot: 'bg-rose-400' },
  sky: { border: 'border-sky-500/25', bg: 'bg-sky-500/10', text: 'text-sky-400', dot: 'bg-sky-400' },
  emerald: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
}

const statusDot: Record<string, string> = {
  active: 'bg-emerald-400',
  building: 'bg-amber-400',
  vision: 'bg-violet-400/60',
}

export default function EcosystemSection() {
  const { t, lang } = useLanguage()
  const e = t.ecosystem
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="ecosystem" className="relative z-10 py-20 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-grid-fine opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[700px] bg-violet-700/[0.04] rounded-full blur-[160px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.span
            key={`badge-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="inline-block text-[11px] text-violet-400 uppercase tracking-[0.22em] font-medium border border-violet-400/20 bg-violet-400/[0.05] px-3 py-1.5 rounded-full mb-6"
          >
            {e.badge}
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
            {e.headlinePre}
            <br />
            <span className="gradient-text">{e.headlineEmphasis}</span>
          </motion.h2>
          <motion.p
            key={`desc-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.14 }}
            className="text-white/40 text-lg leading-relaxed"
          >
            {e.desc}
          </motion.p>
        </div>

        {/* Parent label */}
        <motion.div
          key={`parent-${lang}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-3 glass rounded-xl px-4 py-2.5 border border-white/[0.07]">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
              {e.parentLabel}
            </span>
          </div>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </motion.div>

        {/* Divisions grid */}
        <motion.div
          key={`grid-${lang}`}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } }, hidden: {} }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {e.divisions.map((div, i) => {
            const meta = divisionMeta[i]
            const Icon = meta.icon
            const colors = colorMap[meta.color]
            const dotBg = statusDot[meta.phase]
            const isFuture = meta.phase === 'vision'
            const phaseLabel = meta.phaseLabel[lang as keyof typeof meta.phaseLabel]

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`group relative glass rounded-2xl p-6 border ${colors.border} transition-all duration-500 ${
                  i === 0 ? 'border-blue-500/35 bg-blue-500/[0.025] shadow-[0_0_40px_rgba(59,130,246,0.06)]' : ''
                } ${isFuture ? 'opacity-55 hover:opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <Icon size={16} className={colors.text} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`relative w-1.5 h-1.5 rounded-full ${dotBg}`}>
                      {!isFuture && (
                        <div className={`absolute inset-0 rounded-full ${dotBg} animate-ping opacity-55`} />
                      )}
                    </div>
                    <span className={`text-[9px] uppercase tracking-widest ${isFuture ? 'text-white/20' : 'text-white/38'}`}>
                      {phaseLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-white/92 font-bold text-sm mb-1 tracking-tight">{div.label}</h3>
                <p className={`text-[10px] ${colors.text} opacity-70 mb-3 tracking-wide leading-tight`}>{div.sublabel}</p>
                <p className="text-white/28 text-xs leading-relaxed mb-4">{div.desc}</p>

                {div.caps.length > 0 && (
                  <div className="space-y-1.5">
                    {div.caps.map((cap, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className={`w-0.5 h-0.5 rounded-full ${colors.dot} mt-1.5 flex-shrink-0 opacity-60`} />
                        <span className="text-[9px] text-white/22 leading-relaxed">{cap}</span>
                      </div>
                    ))}
                  </div>
                )}

                {isFuture && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[8px] text-white/15 uppercase tracking-widest border border-white/[0.08] px-2 py-0.5 rounded-full">
                      {e.futureTag}
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* GROUP TREE — structural visualization */}
        <motion.div
          key={`tree-${lang}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.75 }}
          className="mt-16 lg:mt-20"
        >
          <p className="text-[10px] text-white/20 uppercase tracking-[0.22em] text-center mb-8">
            {e.treeTitle}
          </p>

          {/* Root node */}
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center justify-center mb-0">
              <div className="w-full px-6 py-4 border border-blue-500/25 bg-blue-500/[0.03] rounded-t-xl flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-blue-400/70 uppercase tracking-[0.2em] mb-1">{e.treeRootLabel}</p>
                  <p className="text-white font-bold text-base tracking-tight" style={{ letterSpacing: '-0.02em' }}>ABUKLINE GROUP</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{e.treeRootSub}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  <span className="text-[9px] text-blue-400/70 uppercase tracking-widest">Parent</span>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
              <div className="w-px h-5 bg-white/[0.06]" />
            </div>
            <div className="flex justify-center mb-0">
              <div className="w-3/4 h-px bg-white/[0.06]" />
            </div>

            {/* Branch nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04]">
              {e.treeBranches.map((branch, i) => {
                const isActive = i === 0
                const isBuilding = i === 1
                const isFuture = i >= 3
                const statusColor = isActive
                  ? 'text-emerald-400/70'
                  : isBuilding
                  ? 'text-violet-400/70'
                  : 'text-white/20'
                const dotColor = isActive
                  ? 'bg-emerald-400'
                  : isBuilding
                  ? 'bg-violet-400'
                  : 'bg-white/15'
                return (
                  <div
                    key={i}
                    className={`bg-[#050505] p-4 lg:p-5 border-t border-white/[0.04] ${
                      i === 0 ? 'sm:rounded-bl-xl' : i === 2 ? 'rounded-b-xl sm:rounded-bl-none sm:rounded-br-xl' : ''
                    } ${isFuture ? 'opacity-40' : ''}`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className={`w-1 h-1 rounded-full ${dotColor}`} />
                      <span className={`text-[8px] uppercase tracking-widest ${statusColor}`}>
                        {branch.status}
                      </span>
                    </div>
                    <p className="text-white/80 font-bold text-xs tracking-tight mb-0.5">
                      {branch.name}
                    </p>
                    <p className="text-white/25 text-[9px]">{branch.role}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          key={`quote-${lang}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delay: 0.9 }}
          className="mt-14 flex items-center gap-6"
        >
          <div className="h-px flex-1 bg-white/[0.04]" />
          <div className="text-center">
            <p className="text-white/18 text-xs italic leading-relaxed max-w-sm">{e.quoteText}</p>
            <p className="text-white/10 text-[9px] uppercase tracking-widest mt-2">{e.quoteSource}</p>
          </div>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </motion.div>
      </div>
    </section>
  )
}
