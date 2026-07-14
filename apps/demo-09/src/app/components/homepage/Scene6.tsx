import { useEffect, useRef, useState } from 'react'

interface WorldPanel {
  id: number
  name: string
  viName: string
  bg: string
  camera: string
  desc: string
}

const WORLDS: WorldPanel[] = [
  { id: 0, name: 'Mountains', viName: 'Núi rừng',  bg: '/landscape_reflection.png', camera: 'Sony A7R V',      desc: 'Bình minh vàng. Mây trôi chậm. Sương mù trôi. Cỏ chuyển động.' },
  { id: 1, name: 'Ocean',     viName: 'Đại dương', bg: '/ocean.png',                camera: 'Canon EOS R5 II', desc: 'Hoàng hôn cam. Sóng êm đềm. Chim bay. Phản chiếu ấm áp.' },
  { id: 2, name: 'Forest',    viName: 'Rừng sâu',  bg: '/forest.png',               camera: 'Sony A7R V',      desc: 'Ánh sáng qua kẽ lá. Bụi mịn bay. Gió thoảng.' },
  { id: 3, name: 'City',      viName: 'Phố thị',   bg: '/city.png',                 camera: 'Canon EOS R5 II', desc: 'Mưa rơi. Ánh đèn chuyển động. Đèn giao thông. Phản chiếu neon.' },
  { id: 4, name: 'Night Sky', viName: 'Bầu trời đêm', bg: '/nightsky.png',          camera: 'Sony A7R V',      desc: 'Ngôi sao lấp lánh. Dải Ngân Hà. Mây trôi nhẹ. Sao băng.' },
  { id: 5, name: 'Portrait',  viName: 'Chân dung', bg: '/portrait.png',             camera: 'Fujifilm X100VI', desc: 'Bóng đen huyền bí. Tóc bay nhẹ trong gió. Không thấy mặt.' },
]

export function Scene6() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [showRecIdx, setShowRecIdx] = useState<number | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Intersection Observer
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

  // Mouse Move listener (Parallax) — skipped for reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) - 0.5
      const y = (e.clientY / innerHeight) - 0.5
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Hover timer logic (2s delay for recommendation reveal)
  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setShowRecIdx(idx)
    }, 2000)
  }

  const handleMouseLeave = () => {
    setHoveredIdx(null)
    setShowRecIdx(null)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  // Scene keyframes live in styles/story.css

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#FAF8F5',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* ── SIX CINEMATIC PHOTOGRAPHY PANELS (Fills screen edge-to-edge) ── */}
      {WORLDS.map((world, idx) => {
        const isHovered = hoveredIdx === idx
        const isAnyHovered = hoveredIdx !== null
        const isRecShown = showRecIdx === idx

        // flex width transitions: expand hovered, contract neighbors
        let flexVal = 1
        if (isAnyHovered) {
          flexVal = isHovered ? 2.5 : 0.7
        }

        return (
          <div
            key={world.id}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            style={{
              flex: flexVal,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              // `flex` transition drives hover expansion; the entrance is a
              // separate CSS animation so the two never fight.
              transition: 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              borderRight: idx < 5 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
              opacity: entered ? 1 : 0,
              animation: entered ? 's6-panel-reveal 0.85s var(--ease-standard) both' : 'none',
              animationDelay: entered ? `${idx * 90}ms` : '0ms',
            }}
          >
            {/* ── CINEMATIC PUSH-IN / PARALLAX CONTAINER ── */}
            <div
              style={{
                position: 'absolute',
                inset: '-5%',
                width: '110%',
                height: '110%',
                // Subconscious cinematic push-in (Ken Burns)
                animation: entered ? 'lens-zoom 15s ease-in-out infinite alternate' : 'none',
                // Mouse parallax shift
                transform: isHovered ? `translate(${mouse.x * 8}px, ${mouse.y * 8}px)` : 'none',
                transition: 'transform 0.35s ease-out',
              }}
            >
              <img
                src={world.bg}
                alt={world.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isAnyHovered && !isHovered ? 'brightness(0.55) grayscale(0.2)' : 'brightness(0.95)',
                  transition: 'filter 0.7s ease',
                }}
              />

              {/* ── LENS GLINTS & REFLECTIONS Sweep (Only on hovered panel) ── */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 35% 35%, rgba(255, 180, 100, 0.1) 0%, transparent 60%)',
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* ── WORLD-SPECIFIC CINEMAGRAPH EFFECTS ── */}
            
            {/* 1. Mountains (Fog layer) */}
            {world.id === 0 && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(255, 255, 255, 0.12) 0%, transparent 60%)',
                  mixBlendMode: 'screen',
                  filter: 'blur(20px)',
                  opacity: isHovered ? 0.35 : 0.15,
                  transition: 'opacity 0.7s ease',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* 2. Ocean (Water sway) */}
            {world.id === 1 && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(255, 150, 70, 0.08) 80%)',
                  mixBlendMode: 'soft-light',
                  animation: 'water-sway 12s ease-in-out infinite',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* 3. Forest (Leaf wind sway simulation) */}
            {world.id === 2 && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at top right, rgba(255, 240, 200, 0.1) 0%, transparent 60%)',
                  mixBlendMode: 'color-dodge',
                  animation: 'forest-sway 14s ease-in-out infinite',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* 4. City (Rain animation) */}
            {world.id === 3 && isHovered && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '15px 30px',
                  animation: 'rain-fall 1.5s linear infinite',
                  pointerEvents: 'none',
                  opacity: 0.45,
                }}
              />
            )}

            {/* 5. Night Sky (Star twinkle & occasional shooting star) */}
            {world.id === 4 && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                }}
              >
                {/* Twinkling star */}
                <div style={{ position: 'absolute', top: '25%', left: '40%', width: '3px', height: '3px', borderRadius: '50%', background: '#FFFFFF', animation: 'star-twinkle 3s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '15%', left: '70%', width: '2px', height: '2px', borderRadius: '50%', background: '#FFFFFF', animation: 'star-twinkle 4s ease-in-out infinite', animationDelay: '1.2s' }} />
                {/* Shooting star */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      left: '30%',
                      height: '2px',
                      background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
                      animation: 'shooting-star 6s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
            )}

            {/* 6. Portrait (Hair movement sway simulation) */}
            {world.id === 5 && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(255,230,200,0.04) 0%, transparent 60%)',
                  animation: 'portrait-hair 10s ease-in-out infinite',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* ── ALWAYS-VISIBLE WORLD LABEL ──
                The name of each world, on the panel. Gives way to the
                recommendation card once the visitor lingers. */}
            <div
              style={{
                position: 'absolute',
                bottom: '7%',
                left: 0,
                right: 0,
                textAlign: 'center',
                padding: '0 8px',
                pointerEvents: 'none',
                zIndex: 18,
                opacity: entered ? (isRecShown ? 0 : (isAnyHovered && !isHovered ? 0.55 : 1)) : 0,
                transform: entered ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s var(--ease-standard), transform 0.8s var(--ease-standard)',
                transitionDelay: entered ? `${idx * 90 + 350}ms` : '0ms',
              }}
            >
              <span style={{
                display: 'inline-block',
                transformOrigin: 'bottom center',
                transform: isHovered ? 'scale(1.32)' : 'scale(1)',
                transition: 'transform 0.55s var(--ease-standard)',
              }}>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(15px, 1.5vw, 22px)',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  textShadow: '0 2px 14px rgba(0,0,0,0.6)',
                }}>
                  {world.viName}
                </span>
                <span style={{
                  display: 'block',
                  marginTop: '5px',
                  fontFamily: 'var(--font-mono-brand)',
                  fontSize: '8.5px',
                  fontWeight: 400,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.62)',
                  textShadow: '0 1px 6px rgba(0,0,0,0.55)',
                }}>
                  {world.name}
                </span>
              </span>
            </div>

            {/* ── RECOMMENDED COMPANION CARD (Triggered after 2s hover) ── */}
            <div
              style={{
                position: 'absolute',
                bottom: '12%',
                left: '50%',
                textAlign: 'center',
                width: '90%',
                pointerEvents: 'none',
                zIndex: 20,
                opacity: isRecShown ? 1 : 0,
                transformOrigin: 'bottom center',
                transform: isRecShown ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(12px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.65)',
                  fontSize: '9.5px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px',
                  textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }}
              >
                Bạn đồng hành khuyên dùng
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(16px, 1.6vw, 24px)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                {world.camera}
              </span>
            </div>

            {/* Dark overlay at bottom of each panel to support legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(13,8,5,0.45) 0%, transparent 35%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        )
      })}

      {/* ── CENTRAL FLOATING EDITORIAL TYPOGRAPHY ── */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '700px',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 25,
        }}
      >
        {/* Film-slate marker */}
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
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
            transitionDelay: '300ms',
            textShadow: '0 1px 6px rgba(0,0,0,0.15)',
          }}
        >
          06 — Chọn thế giới của bạn
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3vw, 42px)',
            fontWeight: 400,
            lineHeight: 1.35,
            color: '#FFFFFF',
            letterSpacing: '0.01em',
            margin: '0 auto 16px auto',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '500ms',
            textShadow: '0 2px 16px rgba(0,0,0,0.45)',
          }}
        >
          Mỗi nhiếp ảnh gia<br />
          đều tìm thấy<br />
          một loại ánh sáng khác nhau.
        </h2>

        {/* Small Paragraph */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(12px, 1vw, 14.5px)',
            fontWeight: 300,
            lineHeight: '1.7',
            maxWidth: '520px',
            margin: '0 auto',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '800ms',
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          Thế giới bạn yêu thích<br />
          sẽ âm thầm nói cho bạn biết chiếc máy ảnh nào thuộc về bạn.
        </p>
      </div>

      {/* Subtle top vignette shadow to support header text and navbar readability */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: 'linear-gradient(to bottom, rgba(13,8,5,0.4) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  )
}
