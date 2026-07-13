import { useEffect, useRef, useState } from 'react'

const BG = '/workspace_desk.png'

export function Scene3() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [imgReady, setImgReady] = useState(false)
  
  // Parallax state
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 })

  // Hidden interaction states
  const [lensHovered, setLensHovered] = useState(false)
  const [filmHovered, setFilmHovered] = useState(false)
  const [coffeeHovered, setCoffeeHovered] = useState(false)

  // Intersection Observer to start animations
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

  // Mouse move handler for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalize mouse positions to -0.5 to 0.5
      const x = (e.clientX / innerWidth) - 0.5
      const y = (e.clientY / innerHeight) - 0.5
      setTargetMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth lerp for mouse coordinates
  useEffect(() => {
    let animationFrameId: number
    const updateParallax = () => {
      setMouse(prev => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.08,
        y: prev.y + (targetMouse.y - prev.y) * 0.08,
      }))
      animationFrameId = requestAnimationFrame(updateParallax)
    }
    updateParallax()
    return () => cancelAnimationFrame(animationFrameId)
  }, [targetMouse])

  const live = entered && imgReady

  // Add styles for keyframes dynamically if not present
  useEffect(() => {
    if (!document.getElementById('scene3-cinematic-styles')) {
      const style = document.createElement('style')
      style.id = 'scene3-cinematic-styles'
      style.innerHTML = `
        @keyframes push-in {
          0% { transform: scale(1.01); }
          100% { transform: scale(1.03); }
        }
        @keyframes exposure-breathe {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.02) contrast(1.01); }
          100% { filter: brightness(1); }
        }
        @keyframes dust-float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-120px) translateX(30px) rotate(360deg); opacity: 0; }
        }
        @keyframes volumetric-drift {
          0% { opacity: 0.15; transform: skewX(-5deg) translateX(-10px); }
          50% { opacity: 0.22; transform: skewX(-2deg) translateX(10px); }
          100% { opacity: 0.15; transform: skewX(-5deg) translateX(-10px); }
        }
        @keyframes lens-flare-glow {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.05); }
          100% { opacity: 0.2; transform: scale(1); }
        }
        @keyframes steam-rise-slow {
          0% { transform: translateY(10px) scale(0.9); opacity: 0; }
          15% { opacity: 0.18; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.12; }
          80% { opacity: 0.05; }
          100% { transform: translateY(-60px) scale(1.3); opacity: 0; }
        }
        @keyframes steam-rise-strong {
          0% { transform: translateY(10px) scale(0.9); opacity: 0; }
          15% { opacity: 0.35; }
          50% { transform: translateY(-40px) scale(1.3); opacity: 0.25; }
          80% { opacity: 0.1; }
          100% { transform: translateY(-80px) scale(1.6); opacity: 0; }
        }
        @keyframes reflection-sweep {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(200%) translateY(200%) rotate(45deg); }
        }
        @keyframes shadow-sway {
          0% { transform: translateY(0) translateX(0) scaleY(1); }
          50% { transform: translateY(5px) translateX(2px) scaleY(1.02); }
          100% { transform: translateY(0) translateX(0) scaleY(1); }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  // Render floating dust particles
  const dustParticles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 3 + 1.5
    const delay = Math.random() * 12
    const duration = Math.random() * 10 + 10
    const left = Math.random() * 80 + 10
    const top = Math.random() * 60 + 20
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
          background: '#FFE0B2',
          filter: 'blur(0.5px)',
          opacity: 0,
          animation: live ? `dust-float ${duration}s linear infinite` : 'none',
          animationDelay: `${delay}s`,
          pointerEvents: 'none',
          transform: `translate(${mouse.x * -10}px, ${mouse.y * -10}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />
    )
  })

  // Feathered mask definitions for parallax layers
  const cameraMask = 'radial-gradient(circle at 45% 55%, black 25%, transparent 55%)'
  const lensMask = 'radial-gradient(circle at 35% 60%, black 20%, transparent 50%)'
  const coffeeMask = 'radial-gradient(circle at 72% 62%, black 22%, transparent 52%)'

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#FAF8F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── CINEMATIC CAMERA MOTION & BASE LAYER ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transform: live ? `translate(${mouse.x * 2}px, ${mouse.y * 2}px)` : 'none',
          transition: 'transform 0.3s ease-out',
          animation: live ? 'push-in 14s ease-in-out infinite alternate' : 'none',
        }}
      >
        <img
          src={BG}
          alt="Photographer's warm golden hour studio desk"
          onLoad={() => setImgReady(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: live ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.25, 1, 0.5, 1)',
            animation: live ? 'exposure-breathe 9s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* ── PARALLAX LAYER: Camera Body (+2px extra shift) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          transform: live ? `translate(${mouse.x * 4}px, ${mouse.y * 4}px) scale(1.01)` : 'none',
          transition: 'transform 0.4s ease-out',
          maskImage: cameraMask,
          WebkitMaskImage: cameraMask,
        }}
      >
        <img
          src={BG}
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── PARALLAX LAYER: Lens (+1px extra shift) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          transform: live ? `translate(${mouse.x * 3}px, ${mouse.y * 3}px) scale(1.005)` : 'none',
          transition: 'transform 0.35s ease-out',
          maskImage: lensMask,
          WebkitMaskImage: lensMask,
        }}
      >
        <img
          src={BG}
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── PARALLAX LAYER: Coffee Cup (+3px extra shift) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          transform: live ? `translate(${mouse.x * 5}px, ${mouse.y * 5}px) scale(1.015)` : 'none',
          transition: 'transform 0.45s ease-out',
          maskImage: coffeeMask,
          WebkitMaskImage: coffeeMask,
        }}
      >
        <img
          src={BG}
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── CINEMAGRAPH EFFECT: Volumetric Window Light Rays & Swaying Tree Shadows ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-20%',
          background: 'linear-gradient(135deg, rgba(255, 200, 120, 0.28) 0%, transparent 60%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          transformOrigin: 'top left',
          animation: live ? 'volumetric-drift 18s ease-in-out infinite alternate' : 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 10% 20%, rgba(0,0,0,0.06), transparent 70%)',
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          animation: live ? 'shadow-sway 16s ease-in-out infinite' : 'none',
        }}
      />

      {/* ── CINEMAGRAPH EFFECT: Soft Lens Flare Glow ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,180,100,0.18) 0%, rgba(255,120,50,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          animation: live ? 'lens-flare-glow 10s ease-in-out infinite' : 'none',
        }}
      />

      {/* ── CINEMAGRAPH EFFECT: Rising Steam from Coffee Cup ── */}
      {live && (
        <svg
          style={{
            position: 'absolute',
            top: '44%', // Positioned precisely above the coffee cup layer area (approx. 72% left, 62% top)
            left: '70.5%',
            width: '60px',
            height: '90px',
            pointerEvents: 'none',
            transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)`,
            transition: 'transform 0.45s ease-out',
          }}
          viewBox="0 0 100 150"
        >
          <path
            d="M 50 130 Q 35 90 60 70 T 40 20"
            fill="none"
            stroke="rgba(255, 245, 230, 0.4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              animation: coffeeHovered 
                ? 'steam-rise-strong 5s ease-in-out infinite' 
                : 'steam-rise-slow 8s ease-in-out infinite',
              filter: 'blur(3px)',
            }}
          />
          <path
            d="M 60 130 Q 75 100 45 75 T 60 20"
            fill="none"
            stroke="rgba(255, 245, 230, 0.3)"
            strokeWidth="2.0"
            strokeLinecap="round"
            style={{
              animation: coffeeHovered 
                ? 'steam-rise-strong 6.5s ease-in-out infinite' 
                : 'steam-rise-slow 10s ease-in-out infinite',
              animationDelay: '3s',
              filter: 'blur(4.5px)',
            }}
          />
        </svg>
      )}

      {/* ── AMBIENT FLOATING DUST PARTICLES ── */}
      {dustParticles}

      {/* ── HIDDEN INTERACTION HOTSPOTS ── */}
      
      {/* 1. Camera Lens Hotspot */}
      <div
        onMouseEnter={() => setLensHovered(true)}
        onMouseLeave={() => setLensHovered(false)}
        style={{
          position: 'absolute',
          left: '32%',
          top: '55%',
          width: '8%',
          height: '10%',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        {/* Tiny moving reflection Sweep */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%)',
              animation: lensHovered ? 'reflection-sweep 1.2s ease-out forwards' : 'none',
              opacity: lensHovered ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          />
        </div>
      </div>

      {/* 2. Vintage Film Roll Hotspot */}
      <div
        onMouseEnter={() => setFilmHovered(true)}
        onMouseLeave={() => setFilmHovered(false)}
        style={{
          position: 'absolute',
          left: '18%',
          top: '60%',
          width: '6%',
          height: '8%',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        {/* Exposed Frame Preview Pop-up */}
        <div
          style={{
            position: 'absolute',
            bottom: '120%',
            left: '50%',
            width: '130px',
            padding: '6px',
            background: '#1A1A1A',
            border: '8px solid #1A1A1A',
            borderBottomWidth: '20px', // polaroid feel
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            opacity: filmHovered ? 1 : 0,
            visibility: filmHovered ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s',
            transformOrigin: 'bottom center',
            transform: filmHovered ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.9) translateY(10px)',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: '100%',
            height: '90px',
            background: 'url(/scene4.png) center center',
            backgroundSize: 'cover',
            filter: 'grayscale(1) contrast(1.2)',
          }} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '6px',
            fontSize: '6px',
            fontFamily: 'monospace',
            color: '#888888',
          }}>
            <span>FRAME #04</span>
            <span>LEICA M6</span>
          </div>
        </div>
      </div>

      {/* 3. Coffee Cup Hotspot */}
      <div
        onMouseEnter={() => setCoffeeHovered(true)}
        onMouseLeave={() => setCoffeeHovered(false)}
        style={{
          position: 'absolute',
          left: '68%',
          top: '55%',
          width: '9%',
          height: '13%',
          cursor: 'pointer',
          zIndex: 10,
        }}
      />

      {/* ── EDITORIAL TYPOGRAPHY (Lower Third Centered) ── */}
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
        {/* Label */}
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
            transition: 'opacity 1.2s ease, transform 1.2s ease',
            transitionDelay: '300ms',
          }}
        >
          PHÍA SAU MỖI BỨC ẢNH
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.25,
            color: '#FFFFFF',
            letterSpacing: '0.01em',
            margin: '0 auto 20px auto',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.4s ease, transform 1.4s ease',
            transitionDelay: '500ms',
            textShadow: '0 2px 10px rgba(0,0,0,0.15)',
          }}
        >
          Mỗi bức ảnh<br />
          đều bắt đầu từ rất lâu<br />
          trước khi bấm máy.
        </h2>

        {/* Small Paragraph */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.75)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(12px, 1.1vw, 15px)',
            fontWeight: 300,
            lineHeight: '1.8',
            maxWidth: '480px',
            margin: '0 auto',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 1.6s ease, transform 1.6s ease',
            transitionDelay: '800ms',
            textShadow: '0 1px 5px rgba(0,0,0,0.12)',
          }}
        >
          Nhiếp ảnh bắt đầu từ rất lâu trước khi bạn nhấn nút chụp.<br />
          Nó bắt đầu từ sự chờ đợi. Từ ánh sáng. Từ lòng kiên nhẫn.<br />
          Từ việc nhìn thấy những gì người khác vô tình bước qua.
        </p>
      </div>

      {/* Dark overlay for typography legibility */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,8,4,0.4) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
