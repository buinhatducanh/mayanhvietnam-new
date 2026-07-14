import { useEffect, useState } from 'react'

// One entry per scene, in scroll order. The rail is the film-strip
// counter for the story: it tells the visitor how long the sequence
// is, where they are, and lets them jump.
const SCENES = [
  'Ánh nhìn',
  'Ánh sáng kể chuyện',
  'Phía sau bức ảnh',
  'Ánh sáng',
  'Tác phẩm',
  'Thế giới của bạn',
  'Khoảnh khắc',
]

export function StoryRail() {
  const [active, setActive]   = useState(0)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  // Track which scene is snapped into view
  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight)
      setActive(Math.max(0, Math.min(SCENES.length - 1, idx)))
    }
    onScroll()
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  // Only on viewports wide enough that the rail doesn't crowd content
  useEffect(() => {
    const onResize = () => setVisible(window.innerWidth >= 900)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const jump = (idx: number) => {
    const container = document.getElementById('scroll-container')
    if (!container) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    container.scrollTo({ top: idx * container.clientHeight, behavior: reduced ? 'auto' : 'smooth' })
  }

  if (!visible) return null

  return (
    <nav
      aria-label="Tiến trình câu chuyện"
      style={{
        position: 'fixed',
        right: '22px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '18px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
        {SCENES.map((name, idx) => {
          const isActive  = idx === active
          const isHovered = idx === hovered
          return (
            <button
              key={idx}
              onClick={() => jump(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Cảnh ${idx + 1}: ${name}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '10px',
                padding: '5px 0',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              {/* Scene name — whispers in on hover */}
              <span style={{
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'var(--font-mono-brand)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textShadow: '0 1px 4px rgba(0,0,0,0.45)',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
                transition: 'opacity 0.25s var(--ease-standard), transform 0.25s var(--ease-standard)',
                pointerEvents: 'none',
              }}>
                {name}
              </span>
              {/* Frame tick — grows leftward from its right edge */}
              <span aria-hidden style={{
                display: 'block',
                width: '26px',
                height: '2px',
                transformOrigin: 'right center',
                transform: isActive ? 'scaleX(1)' : 'scaleX(0.46)',
                background: isActive
                  ? 'var(--brand-orange)'
                  : isHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.38)',
                boxShadow: isActive
                  ? '0 0 8px rgba(232,97,30,0.55), 0 1px 3px rgba(0,0,0,0.4)'
                  : '0 1px 3px rgba(0,0,0,0.4)',
                transition: 'transform 0.4s var(--ease-standard), background 0.25s ease',
              }} />
            </button>
          )
        })}
      </div>

      {/* Film-counter readout */}
      <span style={{
        color: 'rgba(255,255,255,0.55)',
        fontFamily: 'var(--font-mono-brand)',
        fontSize: '10px',
        letterSpacing: '0.22em',
        textShadow: '0 1px 4px rgba(0,0,0,0.45)',
        userSelect: 'none',
      }}>
        {String(active + 1).padStart(2, '0')}·07
      </span>
    </nav>
  )
}
