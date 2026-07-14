import { useEffect, useRef, useState } from 'react'

const BG = '/landscape_reflection.png'

// Autofocus point interface
interface FocusPoint {
  id: number
  top: string
  left: string
}

const FOCUS_SPOTS: FocusPoint[] = [
  { id: 1, top: '35%', left: '30%' }, // Mountain peak
  { id: 2, top: '48%', left: '50%' }, // Horizon line
  { id: 3, top: '65%', left: '25%' }, // Reflection center
  { id: 4, top: '55%', left: '75%' }, // Lake side
]

export function Scene5() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [imgReady, setImgReady] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Mouse Parallax coordinates
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 })

  // Active autofocus point state
  const [activeFocusId, setActiveFocusId] = useState<number | null>(null)
  const [focusTimeout, setFocusTimeout] = useState<NodeJS.Timeout | null>(null)

  // Intersection observer to activate entry animations
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

  // Binds scroll monitoring to turn RAW image into finished image
  useEffect(() => {
    const container = document.getElementById('scroll-container')
    const handleScroll = () => {
      if (!sceneRef.current || !container) return
      const rect = sceneRef.current.getBoundingClientRect()
      const containerHeight = container.clientHeight
      // Progress calculations (0 when entering, 1 when fully centered)
      const progress = Math.max(0, Math.min(1, (containerHeight - rect.top) / containerHeight))
      setScrollProgress(progress)
    }
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll()
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)
    }
  }, [entered])

  // Mouse Move listener (skipped for reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) - 0.5
      const y = (e.clientY / innerHeight) - 0.5
      setTargetMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Lerp parallax values
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frameId: number
    const update = () => {
      setMouse(prev => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.07,
        y: prev.y + (targetMouse.y - prev.y) * 0.07,
      }))
      frameId = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(frameId)
  }, [targetMouse])

  const live = entered && imgReady

  // Scene keyframes live in styles/story.css

  // Handle focusing points logic
  const triggerFocus = (id: number) => {
    if (focusTimeout) clearTimeout(focusTimeout)
    setActiveFocusId(id)
    const timeout = setTimeout(() => {
      setActiveFocusId(null)
    }, 1100)
    setFocusTimeout(timeout)
  }

  // Staggered metadata text values
  const metaItems = [
    'Sony A7R V',
    '24-70mm GM II',
    'f/8',
    'ISO 100',
    '1/160 sec',
  ]

  // Soft bottom-masked duplicates of the same image for parallax layers
  const foregroundMask = 'radial-gradient(ellipse at bottom, black 35%, transparent 75%)'

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0B0806',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── BACKGROUND LAYER: Clouds & Mountains (shifts 2px) ── */}
      <div
        style={{
          position: 'absolute',
          inset: '-2%',
          width: '104%',
          height: '104%',
          transform: live ? `translate(${mouse.x * 2}px, ${mouse.y * 2}px)` : 'none',
          transition: 'transform 0.3s ease-out',
          animation: live ? 'cloud-drift-slow 35s ease-in-out infinite alternate' : 'none',
        }}
      >
        <img
          src={BG}
          alt="Breathtaking mountain landscape with mist and water reflection"
          onLoad={() => setImgReady(true)}
          onError={() => setImgReady(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: live ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.25, 1, 0.5, 1)',
            // Scroll progression transitions RAW color to rich warmth
            filter: `
              saturate(${0.6 + scrollProgress * 0.55})
              contrast(${0.85 + scrollProgress * 0.35})
              brightness(${0.9 + scrollProgress * 0.12})
              sepia(${scrollProgress * 0.08})
            `,
          }}
        />
      </div>

      {/* ── FOREGROUND LAYER: Lake Shore & Grass (shifts 6px) ── */}
      <div
        style={{
          position: 'absolute',
          inset: '-2%',
          width: '104%',
          height: '104%',
          pointerEvents: 'none',
          transform: live ? `translate(${mouse.x * 6}px, ${mouse.y * 6}px)` : 'none',
          transition: 'transform 0.45s ease-out',
          maskImage: foregroundMask,
          WebkitMaskImage: foregroundMask,
        }}
      >
        <img
          src={BG}
          aria-hidden
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: `
              saturate(${0.6 + scrollProgress * 0.55})
              contrast(${0.85 + scrollProgress * 0.35})
              brightness(${0.9 + scrollProgress * 0.12})
              sepia(${scrollProgress * 0.08})
            `,
          }}
        />
      </div>

      {/* ── CINEMAGRAPH EFFECT: Slowly moving fog ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-20%',
          right: '-20%',
          height: '40%',
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.12) 0%, transparent 100%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          filter: 'blur(35px)',
          animation: live ? 'fog-move 28s ease-in-out infinite' : 'none',
        }}
      />

      {/* ── CINEMAGRAPH EFFECT: Lake Surface Ripple ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'radial-gradient(ellipse at center, rgba(255, 235, 205, 0.08) 0%, transparent 70%)',
          mixBlendMode: 'soft-light',
          pointerEvents: 'none',
          animation: live ? 'lake-ripple 15s ease-in-out infinite' : 'none',
        }}
      />

      {/* ── CINEMAGRAPH EFFECT: Birds flying far in the distance ── */}
      {live && (
        <svg
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '400px',
            height: '100px',
            pointerEvents: 'none',
          }}
          viewBox="0 0 400 100"
        >
          {/* Bird 1 */}
          <path
            d="M 0 50 Q 15 35 30 50 Q 45 65 60 50"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{
              animation: 'bird-fly-path 38s linear infinite',
              animationDelay: '2s',
            }}
          />
          {/* Bird 2 */}
          <path
            d="M 10 60 Q 22 48 34 60 Q 46 72 58 60"
            fill="none"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.0"
            strokeLinecap="round"
            style={{
              animation: 'bird-fly-path 44s linear infinite',
              animationDelay: '10s',
            }}
          />
        </svg>
      )}

      {/* ── HIDDEN DISCOVERY: Focus Point Hotspots ── */}
      {FOCUS_SPOTS.map(spot => (
        <div
          key={spot.id}
          onMouseEnter={() => triggerFocus(spot.id)}
          style={{
            position: 'absolute',
            top: spot.top,
            left: spot.left,
            width: '120px',
            height: '120px',
            transform: 'translate(-50%, -50%)',
            cursor: 'crosshair',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Autofocus Bracket Indicator */}
          {activeFocusId === spot.id && (
            <div
              style={{
                width: '42px',
                height: '42px',
                border: '1.2px solid rgba(255, 255, 255, 0.85)',
                position: 'relative',
                animation: 'focus-ping 1.1s ease-out forwards',
                pointerEvents: 'none',
              }}
            >
              {/* Central small focus dot */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                }}
              />
              {/* Corner tick cutouts for focus bracket */}
              <div style={{ position: 'absolute', top: '8px', bottom: '8px', left: '-2px', width: '46px', borderLeft: '1.2px solid transparent', borderRight: '1.2px solid transparent' }} />
            </div>
          )}
        </div>
      ))}

      {/* ── FLOATING CAMERA METADATA (Film end credit style) ── */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        {metaItems.map((item, index) => (
          <span
            key={index}
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.45)',
              letterSpacing: '0.15em',
              fontWeight: 300,
              opacity: entered ? 0.75 : 0,
              transform: entered ? 'translateX(0)' : 'translateX(15px)',
              transition: 'opacity 1s ease, transform 1s ease',
              transitionDelay: `${500 + index * 200}ms`,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* ── EDITORIAL TYPOGRAPHY (Lower third centered) ── */}
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
          zIndex: 20,
        }}
      >
        {/* Film-slate marker */}
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
            fontFamily: 'var(--font-mono-brand)',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 1.2s var(--ease-standard), transform 1.2s var(--ease-standard)',
            transitionDelay: '400ms',
          }}
        >
          05 — Tác phẩm
        </span>

        {/* Headline — the image develops: blurred negative → sharp print */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: '#FFFFFF',
            letterSpacing: '0.01em',
            margin: '0 auto 20px auto',
            opacity: entered ? 1 : 0,
            filter: entered ? 'blur(0)' : 'blur(11px)',
            transform: entered ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 1.5s var(--ease-standard), filter 1.9s var(--ease-standard), transform 1.5s var(--ease-standard)',
            transitionDelay: '600ms',
            textShadow: '0 2px 15px rgba(0,0,0,0.4)',
          }}
        >
          Máy ảnh<br />
          không tạo ra cái đẹp.<br />
          Nó lưu giữ cái đẹp.
        </h2>

        {/* Small Paragraph */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.75)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(12px, 1.1vw, 15px)',
            fontWeight: 300,
            lineHeight: '1.8',
            maxWidth: '520px',
            margin: '0 auto',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '900ms',
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          Mỗi bức ảnh là một ký ức từ chối biến mất.<br />
          Nhiếp ảnh đơn giản là giữ lại ánh sáng lâu thật lâu sau khi khoảnh khắc đã trôi qua.
        </p>
      </div>

      {/* Ambient shadow gradient at bottom to enhance readability */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 45%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
