'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ABUKLINE — Official Grid Logo System · v2.0
//
// Source files: /Abukline/Logos/abukline-grid-*
// Geometry (icon): ViewBox 40×40 · Cell 10×10 · Gap 2 · Edge 3 · rx 1.2
// Opacity: 7-level semantic system — Future → Established → North Star (TC)
// Full logo: ViewBox 248×44 · Mark + 14u gap · Wordmark Inter 200 · ls 5
//
// Dark variant (#EFEFEF fills) for all dark/black site backgrounds.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

// Official cells — dark variant, exact values from abukline-grid-icon-dark.svg
// Ordered for stagger animation: weakest opacity (future) → established → north-star
const CELLS = [
  { x: 3,  y: 27, fill: '#EFEFEF', opacity: 0.06 }, // BL · Future
  { x: 3,  y: 15, fill: '#EFEFEF', opacity: 0.14 }, // ML · Structural
  { x: 27, y: 3,  fill: '#EFEFEF', opacity: 0.14 }, // TR · Structural
  { x: 15, y: 27, fill: '#EFEFEF', opacity: 0.14 }, // BC · Structural
  { x: 27, y: 15, fill: '#EFEFEF', opacity: 0.28 }, // MR · Expanding
  { x: 27, y: 27, fill: '#EFEFEF', opacity: 0.46 }, // BR · Foundation
  { x: 15, y: 15, fill: '#EFEFEF', opacity: 0.55 }, // MC · Core Engine
  { x: 3,  y: 3,  fill: '#EFEFEF', opacity: 0.70 }, // TL · Established
  { x: 15, y: 3,  fill: '#3B82F6', opacity: 1.00 }, // TC · North Star ← last
] as const

// Wordmark typography — matches official SVG spec exactly
const WM = {
  x: 54, y: 22,
  fontFamily: "'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif",
  fontWeight: 200,
  fontSize: 18,
  letterSpacing: 5,
  fill: '#EFEFEF',
  dominantBaseline: 'middle',
} as const

// ─── Cell animation helpers ───────────────────────────────────────────────────

function cellDelay(i: number): number {
  const isNorthStar = i === CELLS.length - 1
  return isNorthStar ? (CELLS.length - 2) * 0.055 + 0.22 : i * 0.055
}

function cellDuration(i: number): number {
  return i === CELLS.length - 1 ? 0.65 : 0.38
}

function cellEase(i: number): [number, number, number, number] | string {
  return i === CELLS.length - 1 ? [0.16, 1, 0.3, 1] : 'easeOut'
}

// ─── GridMark ────────────────────────────────────────────────────────────────

interface GridMarkProps {
  size?: number
  animated?: boolean
  className?: string
}

export function GridMark({ size = 40, animated = false, className }: GridMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {CELLS.map(({ x, y, fill, opacity }, i) =>
        animated ? (
          <motion.rect
            key={i}
            x={x} y={y} width={10} height={10} rx={1.2} fill={fill}
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: cellDuration(i), delay: cellDelay(i), ease: cellEase(i) }}
          />
        ) : (
          <rect key={i} x={x} y={y} width={10} height={10} rx={1.2} fill={fill} opacity={opacity} />
        )
      )}
    </svg>
  )
}

// ─── Full Logo ────────────────────────────────────────────────────────────────

const SIZE_MAP = {
  xs: 24,  // compact / mobile nav
  sm: 30,  // standard nav
  md: 36,  // section headers
  lg: 44,  // native / display
} as const

interface LogoProps {
  variant?: 'full' | 'icon'
  size?: keyof typeof SIZE_MAP
  animated?: boolean
  className?: string
}

export default function Logo({
  variant = 'full',
  size = 'sm',
  animated = false,
  className,
}: LogoProps) {
  const h = SIZE_MAP[size]

  if (variant === 'icon') {
    return <GridMark size={h} animated={animated} className={className} />
  }

  // Full logo: 248×44 viewBox, auto-scale width from height
  const w = Math.round(h * 248 / 44)

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 248 44"
      fill="none"
      aria-label="ABUKLINE"
      className={className}
    >
      {/* Grid mark — translate(0,2) to vertically center in 44px canvas */}
      <g transform="translate(0, 2)">
        {CELLS.map(({ x, y, fill, opacity }, i) =>
          animated ? (
            <motion.rect
              key={i}
              x={x} y={y} width={10} height={10} rx={1.2} fill={fill}
              initial={{ opacity: 0 }}
              animate={{ opacity }}
              transition={{ duration: cellDuration(i), delay: cellDelay(i), ease: cellEase(i) }}
            />
          ) : (
            <rect key={i} x={x} y={y} width={10} height={10} rx={1.2} fill={fill} opacity={opacity} />
          )
        )}
      </g>

      {/* Wordmark — exact spec from official full logo SVG */}
      {animated ? (
        <motion.text
          {...WM}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          ABUKLINE
        </motion.text>
      ) : (
        <text {...WM}>ABUKLINE</text>
      )}
    </svg>
  )
}
