'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ABUKLINE — Minimal Loading Screen
//
// Appears once per session (sessionStorage gate).
// Grid builds cell by cell (future→established→north-star), then fades out.
// Uses official GridMark at 80px — same geometry, proportionally scaled.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GridMark } from './Logo'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('abk_loaded')
    if (!seen) {
      sessionStorage.setItem('abk_loaded', '1')
      setVisible(true)
      // Grid completes ~1.2s · hold · fade → dismiss at 2500ms
      const t = setTimeout(() => setVisible(false), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Official grid mark at 80px — animated build */}
          <GridMark size={80} animated />

          {/* Brand name — fades in after grid completes */}
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-white uppercase"
            style={{
              fontSize: 12,
              fontWeight: 200,
              letterSpacing: '0.32em',
            }}
          >
            ABUKLINE
          </motion.span>

          {/* Descriptor — appears last */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            transition={{ duration: 0.4, delay: 1.55 }}
            className="mt-1.5 text-white uppercase"
            style={{
              fontSize: 8,
              fontWeight: 400,
              letterSpacing: '0.26em',
            }}
          >
            Ecosystem Company
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
