// ─────────────────────────────────────────────────────────────────────────────
// ABUKLINE — Apple Touch Icon (auto-detected by Next.js App Router)
// 180×180 PNG · Official app icon geometry adapted for 180px
//
// Source: abukline-grid-appicon.svg (ViewBox 1024×1024)
// Official spec: cell=180, gap=36, edge=206 → grid 612px in 1024px canvas
// Adapted for 180×180: cell=36, gap=7, → grid 122px
// Edge: (180 - 122) / 2 = 29px
//
// Opacity system preserved from official file (same as icon mark).
// Background: #000000 (matches official app icon spec)
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const CELL = 36
const GAP = 7
const EDGE = 29

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

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', width: 180, height: 180, display: 'flex' }}>
          {CELLS.map(({ row, col, fill, opacity }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: EDGE + col * (CELL + GAP),
                top: EDGE + row * (CELL + GAP),
                width: CELL,
                height: CELL,
                borderRadius: 5,
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
