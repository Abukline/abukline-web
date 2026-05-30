'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Mail, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const contactIcons = [Mail, ArrowUpRight]
const contactValues = ['hello@abukline.com', 'partners@abukline.com']

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/35 focus:bg-white/[0.05] transition-all duration-300'

const labelClass = 'block text-[10px] text-white/30 uppercase tracking-widest mb-2'

export default function ContactSection() {
  const { t, lang } = useLanguage()
  const c = t.contact
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    type: '',
    subject: '',
    message: '',
    honeypot: '', // anti-spam hidden field
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function update(field: string, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, language: lang }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? c.error)
      }

      setStatus('success')
      setFormState({ name: '', email: '', company: '', type: '', subject: '', message: '', honeypot: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : c.error)
      // Reset to idle after 6 s so user can retry
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  return (
    <section id="contact" className="relative py-20 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/[0.05] rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#050505] to-transparent" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <motion.span
            key={`badge-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="inline-block text-[11px] text-blue-400 uppercase tracking-[0.2em] font-medium border border-blue-400/20 bg-blue-400/[0.05] px-3 py-1.5 rounded-full mb-6"
          >
            {c.badge}
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
            {c.headlinePre}
            <br />
            <span className="gradient-text">{c.headlineEmphasis}</span>
          </motion.h2>
          <motion.p
            key={`desc-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.15 }}
            className="text-white/40 text-lg leading-relaxed"
          >
            {c.desc}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

          {/* ── Left: Form ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">

              {/* ── Success state ── */}
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.025] p-10 flex flex-col items-center justify-center text-center min-h-[420px] gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white/85 font-semibold text-base mb-2 tracking-tight">
                      {lang === 'it' ? 'Messaggio ricevuto.' : lang === 'es' ? 'Mensaje recibido.' : 'Message received.'}
                    </p>
                    <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                      {c.success}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-[10px] text-white/25 uppercase tracking-widest hover:text-white/50 transition-colors duration-200"
                  >
                    {lang === 'it' ? 'Invia un altro messaggio' : lang === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </motion.div>
              ) : (

                /* ── Form ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {/* Honeypot — visually hidden, must stay empty */}
                  <div aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.honeypot}
                      onChange={(e) => update('honeypot', e.target.value)}
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{c.labels.name}</label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={formState.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder={c.placeholders.name}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{c.labels.email}</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={formState.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder={c.placeholders.email}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Company + Type */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{c.labels.company}</label>
                      <input
                        type="text"
                        autoComplete="organization"
                        value={formState.company}
                        onChange={(e) => update('company', e.target.value)}
                        placeholder={c.placeholders.company}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{c.labels.type}</label>
                      <select
                        value={formState.type}
                        onChange={(e) => update('type', e.target.value)}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled style={{ background: '#111' }}>{c.placeholders.type}</option>
                        {c.types.map((opt) => (
                          <option key={opt} value={opt} style={{ background: '#111' }}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className={labelClass}>{c.labels.subject}</label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      placeholder={c.placeholders.subject}
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>{c.labels.message}</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder={c.placeholders.message}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {status === 'error' && errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/[0.06] border border-red-500/20"
                      >
                        <AlertCircle size={14} className="text-red-400/80 flex-shrink-0" />
                        <span className="text-red-400/80 text-xs leading-relaxed">{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/50 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span className="text-white/60">
                          {lang === 'it' ? 'Invio in corso...' : lang === 'es' ? 'Enviando...' : 'Sending...'}
                        </span>
                      </>
                    ) : (
                      <>
                        {c.submit}
                        <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}

            </AnimatePresence>
          </motion.div>

          {/* ── Right: Contact info ── */}
          <motion.div
            key={`contacts-${lang}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delay: 0.3 }}
            className="space-y-6 lg:pt-8"
          >
            {c.contacts.map((contact, i) => {
              const Icon = contactIcons[i]
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 border border-white/[0.07] group hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">
                        {contact.label}
                      </p>
                      <p className="text-white/70 text-sm font-medium mb-2 group-hover:text-white/90 transition-colors">
                        {contactValues[i]}
                      </p>
                      <p className="text-white/25 text-xs leading-relaxed">
                        {contact.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Location note */}
            <div className="px-6 py-5">
              <p className="text-white/20 text-xs leading-relaxed whitespace-pre-line">
                {c.footerNote}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
