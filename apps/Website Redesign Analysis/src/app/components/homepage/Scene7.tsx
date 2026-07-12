import { useEffect, useRef, useState } from 'react'

const BG = '/scene7_final.png'

// Bird flight states
type BirdState = 'waiting' | 'flying' | 'gone'

export function Scene7({ onEnterCamera }: { onEnterCamera?: () => void }) {
  const sceneRef  = useRef<HTMLDivElement>(null)
  const [imgReady, setImgReady]   = useState(false)
  const [entered,  setEntered]    = useState(false)
  const [birdState, setBirdState] = useState<BirdState>('waiting')
  const [showText,  setShowText]  = useState(false)
  const [showCTA,   setShowCTA]   = useState(false)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 })

  // ── Intersection Observer ────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setEntered(true) },
      { threshold: 0.4 }
    )
    if (sceneRef.current) observer.observe(sceneRef.current)
    return () => observer.disconnect()
  }, [])

  // ── Cinematic story sequence (runs once when scene enters + img ready) ─
  useEffect(() => {
    if (!entered || !imgReady) return

    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    let t3: ReturnType<typeof setTimeout>
    let t4: ReturnType<typeof setTimeout>

    // 2s pause → bird flies
    t1 = setTimeout(() => setBirdState('flying'), 2000)
    // Bird crosses in ~2600ms → gone
    t2 = setTimeout(() => setBirdState('gone'),   4600)
    // 700ms after bird gone → headline fades in
    t3 = setTimeout(() => setShowText(true),      5400)
    // 1400ms after text → CTA appears
    t4 = setTimeout(() => setShowCTA(true),       6800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [entered, imgReady])

  // ── Subtle mouse parallax ────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      setTargetMouse({ x: (e.clientX / w) - 0.5, y: (e.clientY / h) - 0.5 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    let id: number
    const lerp = () => {
      setMouse(p => ({
        x: p.x + (targetMouse.x - p.x) * 0.055,
        y: p.y + (targetMouse.y - p.y) * 0.055,
      }))
      id = requestAnimationFrame(lerp)
    }
    lerp()
    return () => cancelAnimationFrame(id)
  }, [targetMouse])

  // ── CSS keyframes (injected once) ────────────────────────────────────
  useEffect(() => {
    if (document.getElementById('s7-final-styles')) return
    const s = document.createElement('style')
    s.id = 's7-final-styles'
    s.innerHTML = `
      /* ─ Background ─ */
      @keyframes sf-ken {
        0%   { transform: scale(1.00); }
        100% { transform: scale(1.04); }
      }
      @keyframes sf-breathe {
        0%,100% { filter: brightness(0.88) saturate(1.08); }
        50%      { filter: brightness(0.95) saturate(1.14); }
      }
      @keyframes sf-expose-up {
        from { filter: brightness(0.88) saturate(1.08); }
        to   { filter: brightness(1.06) saturate(1.2);  }
      }

      /* ─ Cinemagraph overlays ─ */
      @keyframes sf-cloud {
        0%   { transform: translateX(-4%) scale(1.03); opacity: 0.20; }
        50%  { transform: translateX(3%)  scale(1.06); opacity: 0.32; }
        100% { transform: translateX(-4%) scale(1.03); opacity: 0.20; }
      }
      @keyframes sf-ripple {
        0%,100% { opacity: 0.08; transform: scaleY(1);     }
        50%      { opacity: 0.22; transform: scaleY(1.04); }
      }
      @keyframes sf-grass {
        0%,100% { transform: skewX(0deg)   scaleY(1);    opacity: 0.10; }
        50%      { transform: skewX(0.6deg) scaleY(1.02); opacity: 0.20; }
      }
      @keyframes sf-sun-flicker {
        0%,100% { opacity: 0.06; }
        33%      { opacity: 0.14; }
        66%      { opacity: 0.08; }
      }

      /* ─ Bird: horizontal flight across screen ─ */
      @keyframes sf-bird-fly {
        0%   { transform: translateX(-130px); opacity: 0; }
        5%   { opacity: 1; }
        95%  { opacity: 1; }
        100% { transform: translateX(calc(100vw + 130px)); opacity: 0; }
      }
      /* Bird: subtle vertical bob (rises then falls naturally during flap) */
      @keyframes sf-bird-bob {
        0%   { top: 31%; }
        30%  { top: 29%; }
        65%  { top: 31.5%; }
        100% { top: 30%; }
      }
      /* Left wing: rotates around shoulder — up-stroke to down-stroke */
      @keyframes sf-wing-left {
        0%   { transform: rotate(-38deg); }
        50%  { transform: rotate(18deg); }
        100% { transform: rotate(-38deg); }
      }
      /* Right wing: mirror of left */
      @keyframes sf-wing-right {
        0%   { transform: rotate(38deg); }
        50%  { transform: rotate(-18deg); }
        100% { transform: rotate(38deg); }
      }

      /* ─ Typography ─ */
      @keyframes sf-focus {
        0%   { filter: blur(10px); opacity: 0; transform: translateY(12px); }
        60%  { filter: blur(1.5px); opacity: 0.85; }
        100% { filter: blur(0);    opacity: 1;    transform: translateY(0); }
      }
      @keyframes sf-fade-up {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* ─ CTA: blur → sharp → glow ─ */
      @keyframes sf-cta-appear {
        0%   { filter: blur(8px);  opacity: 0;   transform: scale(0.96); box-shadow: none; }
        55%  { filter: blur(1px);  opacity: 0.9; transform: scale(1.01); }
        80%  { filter: blur(0);    opacity: 1;   transform: scale(1);    box-shadow: 0 0 30px rgba(232,97,30,0.5); }
        100% { filter: blur(0);    opacity: 1;   transform: scale(1);    box-shadow: 0 4px 20px rgba(232,97,30,0.3); }
      }
      @keyframes sf-cta-sweep {
        from { left: -70%; }
        to   { left: 160%; }
      }

      /* ─ Dust motes ─ */
      @keyframes sf-dust {
        0%   { transform: translateY(18px) translateX(-10px); opacity: 0; }
        20%  { opacity: 0.4; }
        80%  { opacity: 0.4; }
        100% { transform: translateY(-50px) translateX(10px); opacity: 0; }
      }
    `
    document.head.appendChild(s)
  }, [])

  const live = entered && imgReady

  // ── Dust motes ───────────────────────────────────────────────────────
  const dust = Array.from({ length: 16 }).map((_, i) => {
    const sz  = Math.random() * 2 + 0.8
    const del = Math.random() * 14
    const dur = Math.random() * 8 + 12
    return (
      <div key={i} style={{
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top:  `${Math.random() * 70 + 10}%`,
        width: `${sz}px`, height: `${sz}px`,
        borderRadius: '50%',
        background: 'rgba(255, 215, 130, 0.9)',
        opacity: 0,
        animation: live ? `sf-dust ${dur}s linear infinite` : 'none',
        animationDelay: `${del}s`,
        pointerEvents: 'none',
        transform: `translate(${mouse.x * -4}px, ${mouse.y * -4}px)`,
        transition: 'transform 0.3s ease-out',
      }} />
    )
  })

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#100804',
      }}
    >
      {/* ══════════════════════════════════════════════════════
          LAYER 0 — BACKGROUND IMAGE
      ══════════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute',
        inset: '-4%',
        width: '108%',
        height: '108%',
        animation: live ? 'sf-ken 30s ease-in-out infinite alternate' : 'none',
        transform: `translate(${mouse.x * 2}px, ${mouse.y * 2}px)`,
        transition: 'transform 0.4s ease-out',
      }}>
        <img
          src={BG}
          alt="Golden sunset over a quiet lake"
          onLoad={() => setImgReady(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            opacity: live ? 1 : 0,
            transition: 'opacity 2400ms cubic-bezier(0.25, 1, 0.5, 1)',
            animation: live
              ? ctaHovered
                ? 'sf-expose-up 0.5s ease forwards'
                : 'sf-breathe 12s ease-in-out infinite'
              : 'none',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 1 — CLOUD DRIFT (fog-like overlay top half)
      ══════════════════════════════════════════════════════ */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,230,190,0.12) 0%, transparent 50%)',
        filter: 'blur(28px)',
        mixBlendMode: 'screen',
        animation: live ? 'sf-cloud 32s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════════════
          LAYER 2 — LAKE RIPPLE (bottom 42%)
      ══════════════════════════════════════════════════════ */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '42%',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(255,190,80,0.14) 0%, transparent 70%)',
        mixBlendMode: 'soft-light',
        animation: live ? 'sf-ripple 9s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════════════
          LAYER 3 — GRASS SWAY (bottom band)
      ══════════════════════════════════════════════════════ */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '18%',
        background: 'linear-gradient(to top, rgba(60,100,30,0.07) 0%, transparent 100%)',
        animation: live ? 'sf-grass 20s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════════════
          LAYER 4 — SUNLIGHT FLICKER (golden burst near horizon)
      ══════════════════════════════════════════════════════ */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '40%', left: '30%', right: '30%',
        height: '22%',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,200,80,0.25) 0%, transparent 70%)',
        mixBlendMode: 'screen',
        filter: 'blur(18px)',
        animation: live ? 'sf-sun-flicker 6s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════════════
          LAYER 5 — WARM AMBIENT TINT (very light)
      ══════════════════════════════════════════════════════ */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(255,120,30,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }} />

      {/* Subtle warm vignette — not black */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 38%, rgba(40,18,4,0.30) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Soft bottom gradient for text */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(20,10,4,0.60) 0%, rgba(20,10,4,0.06) 38%, transparent 62%)',
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════════════
          DUST MOTES
      ══════════════════════════════════════════════════════ */}
      {dust}

      {/* ══════════════════════════════════════════════════════
          THE BIRD — flies once, never repeats
          SVG bird with flapping wings via animateTransform
      ══════════════════════════════════════════════════════ */}
      {birdState === 'flying' && (
        /*
         * Outer wrapper: handles horizontal flight + vertical bob.
         * Inner SVG: pure silhouette bird, ~110px wide.
         */
        <div
          aria-hidden
          style={{
            position: 'absolute',
            /* Horizontal flight */
            animation:
              'sf-bird-fly 2600ms cubic-bezier(0.38, 0, 0.62, 1) forwards,' +
              'sf-bird-bob 2600ms ease-in-out forwards',
            zIndex: 18,
            pointerEvents: 'none',
            /* Motion blur feel */
            filter: 'drop-shadow(0 2px 6px rgba(18,8,4,0.35))',
          }}
        >
          <svg
            viewBox="0 0 110 52"
            width="110"
            height="52"
            aria-hidden
            style={{ display: 'block', overflow: 'visible' }}
          >
            {/*
             * BIRD ANATOMY (silhouette, dark against sunset sky)
             *  ─ Body: central elongated ellipse
             *  ─ Head: smaller ellipse at front-right
             *  ─ Beak: small pointed triangle
             *  ─ Tail: fan shape at rear-left
             *  ─ Left wing: rotates around shoulder at (46,26)
             *  ─ Right wing: rotates around shoulder at (64,26)
             */}

            {/* BODY */}
            <ellipse cx="55" cy="30" rx="16" ry="6"
              fill="rgba(14,7,3,0.90)" />

            {/* HEAD */}
            <ellipse cx="72" cy="26" rx="7" ry="6.5"
              fill="rgba(14,7,3,0.90)" />

            {/* BEAK — pointing right */}
            <path d="M79 25 L89 24.5 L79 28 Z"
              fill="rgba(14,7,3,0.90)" />

            {/* TAIL — fan at left */}
            <path d="M39 30 L22 24 L24 36 Z"
              fill="rgba(14,7,3,0.88)" />

            {/* LEFT WING — rotates at shoulder (46, 26) */}
            <g style={{
              transformOrigin: '46px 26px',
              animation: 'sf-wing-left 0.48s ease-in-out infinite',
            }}>
              {/* Filled wing silhouette — sweeps up-left */}
              <path
                d="M46 26 Q28 4 2 12 Q20 22 46 26 Z"
                fill="rgba(14,7,3,0.86)"
              />
            </g>

            {/* RIGHT WING — rotates at shoulder (64, 26) */}
            <g style={{
              transformOrigin: '64px 26px',
              animation: 'sf-wing-right 0.48s ease-in-out infinite',
            }}>
              {/* Mirror — sweeps up-right */}
              <path
                d="M64 26 Q82 4 108 12 Q90 22 64 26 Z"
                fill="rgba(14,7,3,0.86)"
              />
            </g>
          </svg>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TYPOGRAPHY — appears only AFTER bird is gone
      ══════════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute',
        bottom: '9%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '640px',
        textAlign: 'center',
        zIndex: 25,
        pointerEvents: 'none',
      }}>
        {/* Label */}
        <span style={{
          color: 'rgba(255,255,255,0.52)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '20px',
          opacity: 0,
          animation: showText ? 'sf-fade-up 1s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
          animationDelay: '0ms',
        }}>
          NHIẾP ẢNH VIỆT NAM
        </span>

        {/* Headline — blur → sharp (camera focus effect) */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 3.2vw, 46px)',
          fontWeight: 400,
          lineHeight: 1.35,
          color: '#FFFFFF',
          letterSpacing: '0.01em',
          margin: '0 auto 14px auto',
          textShadow: '0 2px 20px rgba(0,0,0,0.2)',
          opacity: 0,
          animation: showText ? 'sf-focus 1.8s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
          animationDelay: '150ms',
        }}>
          Một số khoảnh khắc<br />
          chỉ xuất hiện một lần.
        </h2>

        {/* Sub-headline */}
        <p style={{
          color: 'rgba(255,255,255,0.72)',
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px, 1.15vw, 16px)',
          fontWeight: 300,
          lineHeight: '1.75',
          maxWidth: '480px',
          margin: '0 auto 32px auto',
          opacity: 0,
          animation: showText ? 'sf-fade-up 1s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
          animationDelay: '500ms',
          textShadow: '0 1px 8px rgba(0,0,0,0.18)',
        }}>
          Bạn sẽ chỉ có một cơ hội để lưu giữ chúng.
        </p>

        {/* ── CTA BUTTON — blur → sharp → glow ── */}
        <div style={{ pointerEvents: 'auto', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={onEnterCamera}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '15px 44px',
              background: '#E8611E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '34px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              boxShadow: ctaHovered
                ? '0 8px 40px rgba(232,97,30,0.62), 0 0 0 1px rgba(255,255,255,0.08)'
                : '0 4px 22px rgba(232,97,30,0.35)',
              transform: ctaHovered ? 'scale(1.046)' : 'scale(1)',
              transition: 'box-shadow 0.35s ease, transform 0.3s ease',
              opacity: 0,
              animation: showCTA ? 'sf-cta-appear 1.4s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
              animationDelay: '0ms',
            }}
          >
            {/* Hover shimmer sweep */}
            <span aria-hidden style={{
              position: 'absolute', top: 0,
              left: '-70%', width: '45%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
              animation: ctaHovered ? 'sf-cta-sweep 0.65s ease-out forwards' : 'none',
              pointerEvents: 'none',
            }} />
            Khám phá chiếc máy ảnh dành cho bạn
          </button>

          {/* Caption below button */}
          <span style={{
            color: 'rgba(255,255,255,0.38)',
            fontSize: '11.5px',
            fontWeight: 300,
            letterSpacing: '0.04em',
            opacity: 0,
            animation: showCTA ? 'sf-fade-up 1s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
            animationDelay: '400ms',
          }}>
            Bắt đầu hành trình nhiếp ảnh của bạn
          </span>
        </div>
      </div>
    </div>
  )
}
