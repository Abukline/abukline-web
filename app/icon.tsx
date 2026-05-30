// ─────────────────────────────────────────────────────────────────────────────
// ABUKLINE — Browser Favicon (auto-detected by Next.js App Router)
// 32×32 PNG · Official grid mark geometry scaled to 32px
//
// Source: abukline-grid-icon-dark.svg (ViewBox 40×40)
// Scale: 32/40 = 0.8 → cells 8×8, gap 1.6, edge 2.4
// Using clean integer values at this size for pixel precision.
//
// Opacity system preserved from official file.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Official 7-level opacity system — dark variant
// Cell layout at 32px: cell=8, gap=2, edge=2
// Col x: 2, 12, 22  (edge + 0×(cell+gap), 1×, 2×)
// Row y: 2, 12, 22
const CELL = 8
const GAP = 2
const EDGE = 2

type Cell = { row: number; col: number; fill: string; opacity: number }

const CELLS: Cell[] = [
  { row: 0, col: 0, fill: '#EFEFEF', opacity: 0.70 }, // TL · Established
  { row: 0, col: 1, fill: '#3B82F6', opacity: 1.00 }, // TC · North Star
  { row: 0, col: 2, fill: '#EFEFEF', opacity: 0.14 }, // TR · Structural
  { row: 1, col: 0, fill: '#EFEFEF', opacity: 0.14 }, // ML · Structural
  { row: 1, col: 1, fill: '#EFEFEF', opacity: 0.55 }, // MC · Core Engine
  { row: 1, col: 2, fill: '#EFEFEF', opacity: 0.28 }, // MR · Expanding
  { row: 2, col: 0, fill: '#EFEFEF', opacity: 0.06 }, // BL · Future
  { row: 2, col: 1, fill: '#EFEFEF', opacity: 0.14 }, // BC · Structural
  { row: 2, col: 2, fill: '#EFEFEF', opacity: 0.46 }, // BR · Foundation
]

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', width: 32, height: 32, display: 'flex' }}>
          {CELLS.map(({ row, col, fill, opacity }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: EDGE + col * (CELL + GAP),
                top: EDGE + row * (CELL + GAP),
                width: CELL,
                height: CELL,
                borderRadius: 1,
                background: fill,
                opacity,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
