import { useEffect, useRef, useState } from 'react'

const BG = '/macro_lens.png'

export function Scene4() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [imgReady, setImgReady] = useState(false)

  // Parallax and interactive states
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 })
  const [centerHovered, setCenterHovered] = useState(false)

  // Intersection Observer for scroll-activation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
        }
      },
      { threshold: 0.45 }
    )
    if (sceneRef.current) observer.observe(sceneRef.current)
    return () => observer.disconnect()
  }, [])

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) - 0.5
      const y = (e.clientY / innerHeight) - 0.5
      setTargetMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth lerp animation for mouse parallax
  useEffect(() => {
    let frameId: number
    const update = () => {
      setMouse(prev => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.06,
        y: prev.y + (targetMouse.y - prev.y) * 0.06,
      }))
      frameId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(frameId)
  }, [targetMouse])

  const live = entered && imgReady

  // Add styles for keyframes dynamically if not present
  useEffect(() => {
    if (!document.getElementById('scene4-lens-styles')) {
      const style = document.createElement('style')
      style.id = 'scene4-lens-styles'
      style.innerHTML = `
        @keyframes lens-zoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.04); }
        }
        @keyframes coating-light-sweep {
          0% { transform: translate(-30%, -30%) rotate(0deg); opacity: 0.2; }
          50% { transform: translate(10%, 10%) rotate(180deg); opacity: 0.5; }
          100% { transform: translate(-30%, -30%) rotate(360deg); opacity: 0.2; }
        }
        @keyframes aperture-blade-breathe {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.05); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes soft-breathe {
          0% { filter: brightness(0.97) contrast(0.99); }
          50% { filter: brightness(1.02) contrast(1.01); }
          100% { filter: brightness(0.97) contrast(0.99); }
        }
        @keyframes dust-drift-fast {
          0% { transform: translateY(50px) translateX(-20px); opacity: 0; }
          20% { opacity: 0.35; }
          80% { opacity: 0.35; }
          100% { transform: translateY(-70px) translateX(20px); opacity: 0; }
        }
        @keyframes bokeh-glow-1 {
          0% { opacity: 0.1; transform: scale(0.9); }
          50% { opacity: 0.35; transform: scale(1.1); }
          100% { opacity: 0.1; transform: scale(0.9); }
        }
        @keyframes bokeh-glow-2 {
          0% { opacity: 0.15; transform: scale(1.1); }
          50% { opacity: 0.28; transform: scale(0.95); }
          100% { opacity: 0.15; transform: scale(1.1); }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  // Floating dust particles inside the light
  const lensDust = Array.from({ length: 12 }).map((_, i) => {
    const size = Math.random() * 2 + 1.2
    const delay = Math.random() * 8
    const duration = Math.random() * 8 + 8
    const left = Math.random() * 60 + 20
    const top = Math.random() * 50 + 20
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: '#FFE082',
          filter: 'blur(0.3px)',
          opacity: 0,
          animation: live ? `dust-drift-fast ${duration}s linear infinite` : 'none',
          animationDelay: `${delay}s`,
          pointerEvents: 'none',
          transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)`,
          transition: 'transform 0.25s ease-out',
        }}
      />
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
        background: '#0D0805', // Deep luxurious warm black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── BACKGROUND IMAGE (Extreme Macro Lens) with slow push-in & exposure breathe ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          animation: live ? 'lens-zoom 18s ease-in-out infinite alternate, soft-breathe 8s ease-in-out infinite' : 'none',
          transform: live ? `translate(${mouse.x * 2.5}px, ${mouse.y * 2.5}px)` : 'none',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img
          src={BG}
          alt="Macro lens coating and metallic rings details close-up"
          onLoad={() => setImgReady(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: live ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />
      </div>

      {/* ── CINEMAGRAPH LAYER 1: Aperture Blades Breathing (SVG overlay near center) ── */}
      {live && (
        <div
          style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            top: '42%',
            left: '48%',
            transform: `translate(-50%, -50%) translate(${mouse.x * 3.5}px, ${mouse.y * 3.5}px)`,
            transition: 'transform 0.3s ease-out',
            pointerEvents: 'none',
            opacity: 0.14,
            mixBlendMode: 'screen',
          }}
        >
          <svg
            viewBox="0 0 200 200"
            style={{
              width: '100%',
              height: '100%',
              animation: 'aperture-blade-breathe 14s ease-in-out infinite',
            }}
          >
            {/* 6 Overlapping aperture blades */}
            <path d="M100 20 L130 50 L110 90 L70 90 L50 60 Z" fill="none" stroke="#FFA726" strokeWidth="1.5" />
            <path d="M110 50 L140 80 L120 120 L80 120 L60 90 Z" fill="none" stroke="#FFA726" strokeWidth="1.5" transform="rotate(60 100 100)" />
            <path d="M110 50 L140 80 L120 120 L80 120 L60 90 Z" fill="none" stroke="#FFA726" strokeWidth="1.5" transform="rotate(120 100 100)" />
            <path d="M110 50 L140 80 L120 120 L80 120 L60 90 Z" fill="none" stroke="#FFA726" strokeWidth="1.5" transform="rotate(180 100 100)" />
            <path d="M110 50 L140 80 L120 120 L80 120 L60 90 Z" fill="none" stroke="#FFA726" strokeWidth="1.5" transform="rotate(240 100 100)" />
            <path d="M110 50 L140 80 L120 120 L80 120 L60 90 Z" fill="none" stroke="#FFA726" strokeWidth="1.5" transform="rotate(300 100 100)" />
          </svg>
        </div>
      )}

      {/* ── CINEMAGRAPH LAYER 2: Moving Light Reflection Sweep & Coating Glints ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 45% 45%, rgba(255, 172, 80, 0.08) 0%, transparent 60%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          animation: live ? 'coating-light-sweep 22s ease-in-out infinite alternate' : 'none',
        }}
      />

      {/* Interactive mouse reflections (Shifts 3 degrees max) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 190, 110, 0.06)',
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 210, 150, 0.05) 0%, transparent 55%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          transform: `translate(${mouse.x * 14}px, ${mouse.y * 14}px) rotate(${mouse.x * 3}deg)`,
          transition: 'transform 0.4s ease-out',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '25%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 60%, rgba(255, 150, 70, 0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
          mixBlendMode: 'color-dodge',
          transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px) rotate(${mouse.y * -2.5}deg)`,
          transition: 'transform 0.45s ease-out',
        }}
      />

      {/* ── CINEMAGRAPH LAYER 3: Volumetric Orange Light & Bokeh Background Circles ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(140deg, rgba(255, 140, 50, 0.12) 0%, transparent 50%, rgba(255, 190, 100, 0.06) 100%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      {/* Bokeh circles */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '25%',
          right: '20%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 180, 100, 0.05)',
          filter: 'blur(8px)',
          animation: live ? 'bokeh-glow-1 9s ease-in-out infinite alternate' : 'none',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(255, 200, 130, 0.03)',
          filter: 'blur(12px)',
          animation: live ? 'bokeh-glow-2 12s ease-in-out infinite alternate' : 'none',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient dust */}
      {lensDust}

      {/* ── HIDDEN DISCOVERY: "Made for Moments." ── */}
      <div
        onMouseEnter={() => setCenterHovered(true)}
        onMouseLeave={() => setCenterHovered(false)}
        style={{
          position: 'absolute',
          top: '42%',
          left: '48%',
          width: '100px',
          height: '100px',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          cursor: 'default',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255, 255, 255, 0.35)',
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.12em',
            whiteSpace: 'nowrap',
            opacity: centerHovered ? 0.8 : 0.04,
            transition: 'opacity 0.8s ease-out',
            pointerEvents: 'none',
          }}
        >
          Made for Moments.
        </span>
      </div>

      {/* ── TYPOGRAPHY LAYER (Centered, floating naturally in lower third) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '650px',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      >
        {/* Small Label */}
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '300ms',
          }}
        >
          ÁNH SÁNG
        </span>

        {/* Large Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.25,
            color: '#FFFAF0', // Warm white / champagne
            letterSpacing: '0.02em',
            margin: '0 auto 20px auto',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '500ms',
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}
        >
          Mọi câu chuyện<br />
          đều bắt đầu<br />
          từ ánh sáng.
        </h2>

        {/* Small Paragraph */}
        <p
          style={{
            color: 'rgba(255, 250, 240, 0.75)', // Champagne / warm white
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(12px, 1.1vw, 15px)',
            fontWeight: 300,
            lineHeight: '1.8',
            maxWidth: '480px',
            margin: '0 auto',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '750ms',
            textShadow: '0 1px 6px rgba(0,0,0,0.2)',
          }}
        >
          Trước màu sắc. Trước bố cục. Trước khi màn trập rung lên.<br />
          Chỉ có ánh sáng tồn tại.<br />
          Máy ảnh chỉ đơn giản là học cách lưu giữ nó mãi mãi.
        </p>
      </div>

      {/* Radial soft dark overlay to make text pop against bright centers */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 20%, rgba(13,8,5,0.4) 80%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
