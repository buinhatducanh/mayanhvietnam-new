import { useEffect, useState } from 'react'

// ── Scene image ──────────────────────────────────────────────────
const BG = 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?fit=crop&w=1920&q=92'

// ── Frame rectangle (% of viewport) ─────────────────────────────
const FT = 19   // top edge
const FL = 25   // left edge
const FR = 25   // right edge inset  → right edge at 75%
const FB = 32   // bottom edge inset → bottom edge at 68%

// ── Corner bracket dimensions ────────────────────────────────────
const ARM  = 52   // arm length in px
const CTHK = 2    // line thickness in px
const CC   = 'rgba(255,255,255,0.78)'  // corner color

// ── Leaf particles ───────────────────────────────────────────────
const LEAVES = [
  { x: 50.6, delay: 1.4,  dur: 10.0, size: 7 },
  { x: 51.8, delay: 4.2,  dur: 13.5, size: 5 },
  { x: 49.3, delay: 7.8,  dur:  9.2, size: 6 },
  { x: 52.5, delay: 11.5, dur: 11.8, size: 4 },
  { x: 49.9, delay: 15.2, dur: 10.5, size: 7 },
  { x: 51.1, delay: 19.0, dur: 12.2, size: 5 },
]

// ── Both images share the SAME animation so they stay aligned ───
const IMG_ANIM: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 38%',
  animation: 'scene-breathe 26s ease-in-out infinite alternate',
  transformOrigin: 'center center',
}

// ── Leaf SVG ─────────────────────────────────────────────────────
function LeafParticle({ x, delay, dur, size }: { x: number; delay: number; dur: number; size: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: '-2%',
        animation: `s1-leaf-fall ${dur}s ${delay}s linear infinite`,
        pointerEvents: 'none',
      }}
    >
      <svg width={size} height={Math.round(size * 1.55)} viewBox="0 0 8 12" fill="none">
        <path
          d="M4 0 C7 1.5 8.5 4.5 7 8 C5.8 10.8 4 12 4 12 C4 12 2.2 10.8 1 8 C-0.5 4.5 1 1.5 4 0Z"
          fill="rgba(130,108,58,0.52)"
        />
        <line x1="4" y1="1" x2="4" y2="11" stroke="rgba(88,66,28,0.36)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

// ── TOP-RIGHT corner bracket ⌝ ───────────────────────────────────
// Anchored so its inner vertex lands at (75% from left, FT% from top)
function TopRightCorner({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        right: `${FR}%`,
        top:   `${FT}%`,
        width:  `${ARM}px`,
        height: `${ARM}px`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
      }}
    >
      {/* Horizontal bar — extends LEFT inward along the top edge */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: `${ARM}px`, height: `${CTHK}px`,
        background: CC,
      }} />
      {/* Vertical bar — extends DOWN inward along the right edge */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: `${CTHK}px`, height: `${ARM}px`,
        background: CC,
      }} />
    </div>
  )
}

// ── BOTTOM-LEFT corner bracket ⌞ ─────────────────────────────────
// Anchored so its inner vertex lands at (FL% from left, 68% from top)
function BottomLeftCorner({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left:   `${FL}%`,
        bottom: `${FB}%`,
        width:  `${ARM}px`,
        height: `${ARM}px`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
      }}
    >
      {/* Horizontal bar — extends RIGHT inward along the bottom edge */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: `${ARM}px`, height: `${CTHK}px`,
        background: CC,
      }} />
      {/* Vertical bar — extends UP inward along the left edge */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: `${CTHK}px`, height: `${ARM}px`,
        background: CC,
      }} />
    </div>
  )
}

// ── Main scene ───────────────────────────────────────────────────
export function CinematicScene({ onNavigate }: { onNavigate?: (label: string, id?: string) => void }) {
  const [frameFocused, setFrameFocused] = useState(false)
  const [textIn,       setTextIn]       = useState(false)
  const [hintIn,       setHintIn]       = useState(false)

  useEffect(() => {
    // Reduced motion: everything is simply there.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFrameFocused(true); setTextIn(true); setHintIn(true)
      return
    }
    // t = 1.2s — frame corners fade in, vivid window blooms
    const t1 = setTimeout(() => setFrameFocused(true), 1200)
    // t = 2.6s — one sentence rises out of the mist
    const t2 = setTimeout(() => setTextIn(true),       2600)
    // t = 4.2s — quiet invitation to scroll
    const t3 = setTimeout(() => setHintIn(true),       4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        background: '#080808',
        fontFamily: 'var(--font-body)',
        cursor: 'default',
      }}
    >

      {/* ── BASE IMAGE — the world as it is ─────────────────────── */}
      <img
        src={BG}
        alt="Lone tree in morning mist — the world waiting to be seen"
        style={{
          ...IMG_ANIM,
          filter: 'saturate(0.60) contrast(0.88) brightness(0.76)',
        }}
      />

      {/* ── FRAME WINDOW — the world the photographer chooses to see
          Clipped to the rectangle defined by the two corner brackets.
          Vivid, sharp — reality, heightened.
      ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(${FT}% ${FR}% ${FB}% ${FL}%)`,
          opacity: frameFocused ? 1 : 0,
          transition: 'opacity 2.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <img
          src={BG}
          alt=""
          style={{
            ...IMG_ANIM,
            filter: 'saturate(1.55) contrast(1.28) brightness(1.08)',
          }}
        />
      </div>

      {/* ── TWO CORNER BRACKETS — diagonal pair defining the frame ─
          Top-right ⌝  +  Bottom-left ⌞
          Together they imply a rectangle without drawing the full box.
      ──────────────────────────────────────────────────────────── */}
      <TopRightCorner   visible={frameFocused} />
      <BottomLeftCorner visible={frameFocused} />

      {/* ── LEAVES — wind is real ───────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {LEAVES.map((l, i) => (
          <LeafParticle key={i} {...l} />
        ))}
      </div>

      {/* ── THE ONLY SENTENCE — rises out of a mask, like a title card ── */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0,
          bottom: '12%',
          textAlign: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <p style={{
          margin: 0,
          color: 'rgba(255,255,255,0.82)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(13px, 1.35vw, 19px)',
          fontWeight: 300,
          letterSpacing: '0.16em',
          opacity:   textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(115%)',
          transition: 'opacity 1.6s var(--ease-standard), transform 1.6s var(--ease-standard)',
        }}>
          Mọi bức ảnh đều bắt đầu từ một ánh nhìn.
        </p>
      </div>

      {/* ── SCROLL INVITATION — a hairline of light falling ─────── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '3.5%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
          opacity: hintIn ? 1 : 0,
          transition: 'opacity 1.4s var(--ease-standard)',
        }}
      >
        <span style={{
          color: 'rgba(255,255,255,0.45)',
          fontFamily: 'var(--font-mono-brand)',
          fontSize: '9px',
          fontWeight: 400,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          Cuộn để bắt đầu
        </span>
        <div aria-hidden style={{
          width: '1px',
          height: '42px',
          background: 'rgba(255,255,255,0.16)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.85), transparent)',
            animation: hintIn ? 's1-hint-sweep 2.2s cubic-bezier(0.45, 0, 0.55, 1) infinite' : 'none',
          }} />
        </div>
      </div>

      {/* ── SKIP BUTTON ─────────────────────────────────────────── */}
      <button
        onClick={() => onNavigate?.('Cửa hàng')}
        style={{
          position: 'absolute',
          top: '80px',
          right: '4vw',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#FFF',
          padding: '8px 24px',
          borderRadius: '24px',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
        }}
      >
        Bỏ qua
      </button>

    </div>
  )
}
