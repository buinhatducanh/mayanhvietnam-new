import { useEffect, useState } from 'react'
import { ArrowRight, Camera, ShoppingBag } from 'lucide-react'

const HERO_IMG =
  'https://images.unsplash.com/photo-1488724485310-bd445f3faff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920'

const BRAND_PARTNERS = ['Sony', 'Canon', 'Nikon', 'DJI', 'Fujifilm']

const SHOT_ON_THIS = {
  camera: 'Sony Alpha A7 IV',
  lens: '35mm f/1.4 GM',
  exif: 'f/1.8 · 1/1000s · ISO 200',
  link: '#',
}

export function Hero() {
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [shutterFired, setShutterFired] = useState(false)
  const [kenBurnsActive, setKenBurnsActive] = useState(false)
  const [shotOnThisVisible, setShotOnThisVisible] = useState(false)

  useEffect(() => {
    if (!photoLoaded) return
    // Text stagger starts 200ms after photo loads (after clip-path begins)
    const t1 = setTimeout(() => setTextVisible(true), 200)
    // Ken Burns starts when clip-path completes (1300ms)
    const t2 = setTimeout(() => setKenBurnsActive(true), 1300)
    // Shutter micro-beat fires 200ms after clip-path completes
    const t3 = setTimeout(() => setShutterFired(true), 1400)
    // Shot on This information gap — 2200ms after load
    const t4 = setTimeout(() => setShotOnThisVisible(true), 2200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [photoLoaded])

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{ height: '100vh', minHeight: '700px' }}
    >
      {/* Orange top accent bar — draws left-to-right on load */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-[#E8611E] z-10"
        style={{
          animation: 'accent-bar-draw 0.6s ease-out forwards',
          transformOrigin: 'left',
        }}
      />

      {/* Orange surface catch — warm glow beneath accent bar */}
      <div
        className="absolute top-0 left-0 z-10 pointer-events-none"
        style={{
          width: '44%',
          height: '60px',
          background: 'linear-gradient(180deg, rgba(232,97,30,0.05) 0%, transparent 100%)',
        }}
      />

      <div className="flex h-full">
        {/* ── LEFT — white brand panel ──────────────────────────── */}
        <div
          className="relative flex flex-col justify-center bg-white z-10"
          style={{
            width: '44%',
            paddingLeft: 'clamp(48px, 6vw, 96px)',
            paddingRight: 'clamp(32px, 4vw, 64px)',
          }}
        >
          {/* Eyebrow badge */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-500 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '0ms',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <span
              className="px-3 py-1 bg-[#E8611E] text-white text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Đại lý ủy quyền chính thức
            </span>
          </div>

          {/* Brand name — line 1 */}
          <div
            className={`transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transitionDelay: '80ms',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <h1
              className="text-[#141414] leading-[1.0] mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 5.5vw, 80px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              Máy ảnh
            </h1>
          </div>

          {/* Brand name — line 2 (orange, arrives 120ms after line 1) */}
          <div
            className={`transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <h1
              className="text-[#E8611E] leading-[1.0] mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 5.5vw, 80px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              Việt Nam
            </h1>
          </div>

          {/* Tagline */}
          <div
            className={`transition-all duration-600 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '340ms',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <p
              className="text-[#3A3A3A] mb-10 leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                maxWidth: '360px',
              }}
            >
              Nơi mỗi khoảnh khắc trở thành tác phẩm — thiết bị chính hãng, tư vấn từ nhiếp ảnh gia thật.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex items-center gap-3 mb-12 transition-all duration-600 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '460ms',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <button
              className="cta-primary flex items-center gap-2.5 px-7 bg-[#E8611E] text-white text-sm font-semibold hover:bg-[#C44E14] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-body)', height: '52px' }}
            >
              <ShoppingBag size={16} />
              Khám phá ngay
            </button>
            <button
              className="flex items-center gap-2 px-7 border-2 border-[#141414] text-[#141414] text-sm font-semibold hover:bg-[#141414] hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'var(--font-body)', height: '52px' }}
            >
              Xem sản phẩm
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Brand partners */}
          <div
            className={`transition-all duration-600 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{
              transitionDelay: '580ms',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <p
              className="text-[#8C8C8C] text-[11px] tracking-[0.18em] uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Đối tác chính hãng
            </p>
            <div className="flex items-center gap-4">
              {BRAND_PARTNERS.map((brand) => (
                <span
                  key={brand}
                  className="text-[#3A3A3A] text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Right-edge divider line */}
          <div className="absolute top-0 right-0 w-px h-full bg-[#E8611E]/12" />
        </div>

        {/* ── RIGHT — cinematic photography panel ──────────────── */}
        <div className="relative flex-1 overflow-hidden cursor-photography">

          {/* Photo with clip-path reveal (shutter-opening metaphor) */}
          <div
            className="absolute inset-0"
            style={
              photoLoaded
                ? {
                    animation:
                      'hero-photo-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }
                : { clipPath: 'inset(0 100% 0 0)' }
            }
          >
            <img
              src={HERO_IMG}
              alt="Creator nhiếp ảnh Việt Nam — khoảnh khắc thật"
              loading="eager"
              onLoad={() => setPhotoLoaded(true)}
              className="w-full h-full object-cover object-center"
              style={
                kenBurnsActive
                  ? {
                      animation: 'ken-burns 10s linear infinite alternate',
                      transformOrigin: 'center center',
                    }
                  : {}
              }
            />
          </div>

          {/* Shutter micro-beat — fires once at 1400ms */}
          <div
            className="absolute inset-0 bg-white pointer-events-none z-10"
            style={{
              opacity: 0,
              animation: shutterFired
                ? 'shutter-flash 80ms ease-out forwards'
                : 'none',
            }}
          />

          {/* Subtle left-edge gradient into white panel */}
          <div
            className="absolute inset-y-0 left-0 w-28 pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,0.55), transparent)',
            }}
          />

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(to top, rgba(10,9,9,0.5), transparent)',
            }}
          />

          {/* Stat badges — bottom left */}
          <div
            className={`absolute bottom-8 left-8 z-30 transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '620ms',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            <div className="flex gap-3">
              {[
                { num: '10+', label: 'năm kinh nghiệm' },
                { num: '4', label: 'showroom' },
                { num: '50K+', label: 'khách hàng' },
              ].map((stat) => (
                <div
                  key={stat.num}
                  className="bg-white/90 backdrop-blur-sm px-4 py-3 border-b-2 border-[#E8611E]"
                >
                  <div
                    className="text-[#E8611E] leading-none mb-0.5"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 800,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="text-[#6B6B6B] text-[11px]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shot on This — information gap reveal at 2200ms */}
          <div
            className={`absolute bottom-8 right-8 z-30 transition-all duration-700 ${
              shotOnThisVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-standard)' }}
          >
            <div className="bg-white/95 backdrop-blur-sm border-l-[3px] border-[#E8611E] px-4 py-3 max-w-[220px]">
              <p
                className="text-[#8C8C8C] text-[9px] tracking-[0.22em] uppercase mb-1.5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Shot on This
              </p>
              <div className="flex items-center gap-1.5 mb-1">
                <Camera size={11} className="text-[#E8611E] flex-shrink-0" />
                <p
                  className="text-[#141414] text-xs font-semibold leading-tight"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {SHOT_ON_THIS.camera}
                </p>
              </div>
              <p
                className="text-[#6B6B6B] text-[10px] mb-2.5"
                style={{ fontFamily: 'var(--font-mono-brand)' }}
              >
                {SHOT_ON_THIS.lens} · {SHOT_ON_THIS.exif}
              </p>
              <a
                href={SHOT_ON_THIS.link}
                className="inline-flex items-center gap-1 text-[#E8611E] text-[11px] font-semibold tracking-wide uppercase hover:underline group"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Xem sản phẩm
                <ArrowRight
                  size={11}
                  className="group-hover:translate-x-0.5 transition-transform duration-150"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
