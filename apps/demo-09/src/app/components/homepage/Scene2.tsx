import { useEffect, useRef, useState } from 'react'

// ── Landscape ──────────────────────────────────────────────────
// Hieu Do Quang — misty rolling hills, warm Vietnamese sunrise
const BG = 'https://images.unsplash.com/photo-1775151189004-4fac685cc7f7?fit=crop&w=1920&q=92'

// ── Headline lines (each enters separately, 220ms apart) ───────
const H1 = ['Khi bạn dừng lại,', 'ánh sáng bắt đầu kể chuyện.']

// ── Editorial paragraph lines ──────────────────────────────────
const PARA = [
  'Có những khoảnh khắc không thể tạo ra.',
  'Chỉ có thể chờ.',
  'Và khi chúng xuất hiện,',
  'mọi lần bấm máy đều trở nên xứng đáng.',
]

export function Scene2() {
  const sceneRef   = useRef<HTMLDivElement>(null)
  const [entered,  setEntered]  = useState(false)
  const [imgReady, setImgReady] = useState(false)

  // Trigger when scene snaps into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setEntered(true) },
      { threshold: 0.45 },
    )
    if (sceneRef.current) observer.observe(sceneRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        background: '#1A1208',
        fontFamily: 'var(--font-body)',
      }}
    >

      {/* ══════════════════════════════════════════════════════
          THE PHOTOGRAPH
          Fades in + rises 30px on scene enter.
          Then breathes forever with imperceptible Ken Burns.
      ══════════════════════════════════════════════════════ */}
      <img
        src={BG}
        alt="Misty Vietnamese hills bathed in golden sunrise — silence and wonder"
        onLoad={() => setImgReady(true)}
        onError={() => setImgReady(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 42%',
          opacity:   entered && imgReady ? 1 : 0,
          transform: entered && imgReady ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1.4s var(--ease-standard), transform 1.4s var(--ease-standard)',
          animation:  entered && imgReady
            ? 'scene2-ken-burns 24s ease-in-out infinite alternate'
            : 'none',
          transformOrigin: 'center center',
        }}
      />

      {/* Very subtle dark vignette at bottom so text is readable
          (not a gradient — just a shadow cast by the earth itself) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(14,10,5,0.72) 0%, rgba(14,10,5,0.28) 28%, transparent 52%)',
          pointerEvents: 'none',
        }}
      />

      {/* ══════════════════════════════════════════════════════
          EDITORIAL TEXT
          Floats over the dark lower portion of the image.
          White — near-white — the light already in the scene.
      ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          left: '72px',
          bottom: '10%',
          right: '40%',
          pointerEvents: 'none',
        }}
      >
        {/* Film-slate marker — the story is a numbered sequence */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px',
          opacity:   entered ? 1 : 0,
          transition: 'opacity 1.0s var(--ease-standard)',
          transitionDelay: '400ms',
        }}>
          <div style={{
            width: '32px',
            height: '2px',
            background: 'var(--brand-orange)',
            transformOrigin: 'left center',
            transform: entered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.9s var(--ease-standard)',
            transitionDelay: '500ms',
          }} />
          <span style={{
            color: 'rgba(255,255,255,0.60)',
            fontSize: '10px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono-brand)',
            fontWeight: 400,
          }}>
            02 — Về nhiếp ảnh
          </span>
        </div>

        {/* Headline — each line rises out of its own mask */}
        <div style={{ marginBottom: '32px' }}>
          {H1.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden', padding: '0.08em 0' }}>
              <div
                style={{
                  display: 'block',
                  color: i === 1 ? '#FFFFFF' : 'rgba(255,255,255,0.88)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.8vw, 58px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.14,
                  transform: entered ? 'translateY(0)' : 'translateY(115%)',
                  transition: 'transform 1.1s var(--ease-heavy)',
                  transitionDelay: `${600 + i * 180}ms`,
                }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* Editorial paragraph — lines settle one after another */}
        <div>
          {PARA.map((line, i) => (
            <div
              key={i}
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.62)',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1.05vw, 16px)',
                fontWeight: 300,
                lineHeight: 2.0,
                letterSpacing: '0.04em',
                opacity:   entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.9s var(--ease-standard), transform 0.9s var(--ease-standard)',
                transitionDelay: `${1150 + i * 110}ms`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
