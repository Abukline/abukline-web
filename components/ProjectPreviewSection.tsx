'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Activity, Users, TrendingUp, Calendar, CheckCircle, BarChart2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

/* ── Mini Dashboard Mockup ── */
function DashboardMockup() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/[0.07] bg-[#0a0a0e]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#0d0d12]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-4 rounded-md bg-white/[0.04] border border-white/[0.04] flex items-center px-2">
            <span className="text-[8px] text-white/20 truncate">dashboard.abukline.com</span>
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-4 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Activity, label: 'Active Users', value: '2,847', change: '+12.5%', up: true },
            { icon: TrendingUp, label: 'Revenue', value: '€47.2K', change: '+8.3%', up: true },
            { icon: Users, label: 'Total Accounts', value: '14,392', change: '+3.1%', up: true },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3">
                <div className="flex items-center justify-between mb-2">
                  <Icon size={12} className="text-white/30" />
                  <span className="text-[8px] text-emerald-400/80">{stat.change}</span>
                </div>
                <div className="text-sm font-bold text-white/80">{stat.value}</div>
                <div className="text-[7px] text-white/25 mt-0.5">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Chart area */}
        <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[9px] text-white/50 font-medium">Activity Overview</p>
            </div>
            <BarChart2 size={11} className="text-white/20" />
          </div>
          {/* Fake chart bars */}
          <div className="flex items-end gap-1 h-16">
            {[30, 55, 40, 70, 45, 80, 60, 90, 65, 85, 50, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className="rounded-sm bg-gradient-to-t from-blue-500/40 to-blue-400/20"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
              <span key={m} className="text-[6px] text-white/15">{m}</span>
            ))}
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-1.5">
          {[
            { text: 'API Integration deployed', done: true },
            { text: 'User onboarding flow updated', done: true },
            { text: 'Analytics module — in review', done: false },
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/[0.03]">
              <CheckCircle size={10} className={task.done ? 'text-emerald-400/70' : 'text-white/20'} />
              <span className={`text-[9px] ${task.done ? 'text-white/35 line-through' : 'text-white/50'}`}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Event Platform Mockup ── */
function EventMockup() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/[0.07] bg-[#0a0a0e]">
      {/* Header */}
      <div className="px-4 py-4 bg-gradient-to-r from-rose-950/40 to-[#0a0a0e] border-b border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white/80">BAILEMOS Platform</p>
            <p className="text-[9px] text-rose-400/60 mt-0.5">Event Management System</p>
          </div>
          <Calendar size={14} className="text-rose-400/60" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Event cards */}
        {[
          { name: 'Miami Salsa Fest', date: 'Dec 15', attendees: '1,240', status: 'Live', color: 'emerald' },
          { name: 'Jazz & Culture Night', date: 'Dec 22', attendees: '380', status: 'Upcoming', color: 'amber' },
          { name: 'New Year\'s Gala', date: 'Dec 31', attendees: '2,800', status: 'Selling', color: 'sky' },
        ].map((event, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-white/50">{event.date.split(' ')[1]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-white/70 truncate">{event.name}</p>
              <p className="text-[8px] text-white/25">{event.attendees} attendees · {event.date}</p>
            </div>
            <span className={`text-[8px] px-2 py-0.5 rounded-full bg-${event.color}-400/10 text-${event.color}-400/80 border border-${event.color}-400/20`}>
              {event.status}
            </span>
          </div>
        ))}

        {/* Check-in stats */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3 text-center">
            <p className="text-lg font-black text-white/60">89%</p>
            <p className="text-[8px] text-white/25">Avg. Check-in Rate</p>
          </div>
          <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3 text-center">
            <p className="text-lg font-black text-rose-400/70">4.4K</p>
            <p className="text-[8px] text-white/25">Tickets Sold This Month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Analytics Mockup ── */
function AnalyticsMockup() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/[0.07] bg-[#0a0a0e]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-white/[0.05] flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-white/70">Analytics Core</p>
          <p className="text-[9px] text-white/25">Real-time intelligence dashboard</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] text-emerald-400/60">Live</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Donut-like visual */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="url(#grad)" strokeWidth="10"
                strokeDasharray="125 188" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white/60">66%</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { label: 'Software', pct: '66%', color: 'bg-blue-400/60' },
              { label: 'Events', pct: '21%', color: 'bg-rose-400/60' },
              { label: 'Media', pct: '13%', color: 'bg-fuchsia-400/60' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${row.color}`} />
                <span className="text-[8px] text-white/35 flex-1">{row.label}</span>
                <span className="text-[8px] text-white/50 font-medium">{row.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sparkline rows */}
        {[
          { label: 'API calls / sec', value: '2.4K' },
          { label: 'System uptime', value: '99.98%' },
          { label: 'Avg. response', value: '48ms' },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-[9px] text-white/30">{row.label}</span>
            <span className="text-[10px] font-bold text-white/60">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const projectMeta = [
  { tagColor: 'text-blue-400', tech: ['Next.js', 'PostgreSQL', 'REST API'], mockup: DashboardMockup },
  { tagColor: 'text-rose-400', tech: ['React', 'Node.js', 'Live Systems'], mockup: EventMockup },
  { tagColor: 'text-blue-400', tech: ['Python', 'Next.js', 'WebSockets'], mockup: AnalyticsMockup },
]

export default function ProjectPreviewSection() {
  const { t, lang } = useLanguage()
  const p = t.projects
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="projects" className="relative py-20 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            key={`badge-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="inline-block text-[11px] text-blue-400 uppercase tracking-[0.22em] font-medium border border-blue-400/20 bg-blue-400/[0.05] px-3 py-1.5 rounded-full mb-6"
          >
            {p.badge}
          </motion.span>
          <motion.h2
            key={`h-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
            className="text-[30px] lg:text-5xl font-bold text-white mb-4"
            style={{ letterSpacing: '-0.025em' }}
          >
            {p.headlinePre}
            <br />
            <span className="gradient-text">{p.headlineEmphasis}</span>
          </motion.h2>
          <motion.p
            key={`desc-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.15 }}
            className="text-white/40 text-lg leading-relaxed"
          >
            {p.desc}
          </motion.p>
        </div>

        {/* Projects grid */}
        <motion.div
          key={`grid-${lang}`}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            hidden: {},
          }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {p.items.map((project, i) => {
            const meta = projectMeta[i]
            const Mockup = meta.mockup
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group glass rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.12] transition-all duration-500 flex flex-col"
              >
                {/* Mockup preview */}
                <div className="relative p-4 bg-gradient-to-b from-white/[0.02] to-transparent border-b border-white/[0.04]">
                  <Mockup />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className={`text-[10px] font-medium ${meta.tagColor} mb-1 uppercase tracking-widest`}>
                        {project.tag}
                      </p>
                      <h3 className="text-white/90 font-semibold text-base">
                        {project.label}
                      </h3>
                    </div>
                    <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/50 transition-colors mt-1" />
                  </div>

                  <p className="text-white/35 text-sm leading-relaxed mb-4 flex-1">
                    {project.desc}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {meta.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] text-white/30 border border-white/[0.07] px-2.5 py-1 rounded-full tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
