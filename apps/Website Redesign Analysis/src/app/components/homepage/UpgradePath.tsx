import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const UPGRADE_TIERS = [
  {
    level: '01',
    tier: 'Người bắt đầu',
    camera: 'Sony ZV-E10 II',
    desc: 'Nhẹ, thông minh, lý tưởng cho content creator mới vào nghề.',
    price: 'từ 12.990.000₫',
    color: '#8C8C8C',
    link: '#',
  },
  {
    level: '02',
    tier: 'Nhiếp ảnh gia phát triển',
    camera: 'Sony Alpha A7C II',
    desc: 'Full-frame compact. Khi bạn sẵn sàng đi xa hơn.',
    price: 'từ 42.990.000₫',
    color: '#E8611E',
    link: '#',
    featured: true,
  },
  {
    level: '03',
    tier: 'Chuyên nghiệp',
    camera: 'Sony Alpha A1 II',
    desc: 'Đỉnh cao kỹ thuật. Không giới hạn nào cả.',
    price: 'từ 89.990.000₫',
    color: '#141414',
    link: '#',
  },
]

export function UpgradePath() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [lineWidth, setLineWidth] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start: number
    const duration = 900
    const tick = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setLineWidth(eased * 100)
      if (progress < 1) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible])

  return (
    <section
      ref={sectionRef}
      className="bg-[#141414] overflow-hidden"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>

        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-standard)' }}
        >
          <div
            className="h-[2px] bg-[#E8611E] origin-left"
            style={{
              width: '24px',
              animation: visible ? 'upgrade-line-draw 0.4s ease-out forwards' : 'none',
            }}
          />
          <p
            className="text-[#E8611E] text-[10px] tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Lộ trình nâng cấp
          </p>
        </div>

        {/* Headline */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '60ms', transitionTimingFunction: 'var(--ease-standard)' }}
        >
          <h2
            className="text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Bạn đang ở đâu<br />
            <span className="text-[#E8611E]">trong hành trình của mình?</span>
          </h2>
        </div>

        {/* Tier cards with connecting line */}
        <div className="relative">

          {/* Connecting line — draws left-to-right on scroll */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '38px',
              left: '2.5%',
              right: '2.5%',
              height: '1px',
              backgroundColor: '#2A2A2A',
              zIndex: 0,
            }}
          >
            <div
              ref={lineRef}
              className="absolute top-0 left-0 h-full bg-[#E8611E]"
              style={{ width: `${lineWidth}%` }}
            />
          </div>

          {/* Three tier columns */}
          <div className="grid grid-cols-3 gap-8 relative z-10">
            {UPGRADE_TIERS.map((tier, idx) => (
              <div
                key={tier.level}
                className={`transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${200 + idx * 120}ms`,
                  transitionTimingFunction: 'var(--ease-standard)',
                }}
              >
                {/* Level dot */}
                <div className="flex items-center mb-6">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors duration-500"
                    style={{
                      backgroundColor: visible ? tier.color : '#2A2A2A',
                      borderColor: tier.color,
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className={`group relative p-6 border transition-all duration-300 cursor-pointer ${
                    tier.featured
                      ? 'border-[#E8611E]/60 bg-[#E8611E]/5 hover:bg-[#E8611E]/10'
                      : 'border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/6'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E8611E]" />
                  )}

                  <p
                    className="mb-1"
                    style={{
                      fontFamily: 'var(--font-mono-brand)',
                      fontSize: '11px',
                      color: tier.color,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {tier.level}
                  </p>

                  <p
                    className="text-white/50 text-xs uppercase tracking-widest mb-3"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {tier.tier}
                  </p>

                  <h3
                    className="text-white mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(18px, 1.8vw, 24px)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {tier.camera}
                  </h3>

                  <p
                    className="text-white/50 text-sm leading-relaxed mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {tier.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-white/70 text-sm"
                      style={{ fontFamily: 'var(--font-mono-brand)' }}
                    >
                      {tier.price}
                    </span>
                    <a
                      href={tier.link}
                      className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: tier.featured ? '#E8611E' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      Xem máy
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className={`mt-12 flex items-center justify-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '560ms', transitionTimingFunction: 'var(--ease-standard)' }}
        >
          <button
            className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors duration-200 group"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="border-b border-white/20 pb-0.5 group-hover:border-white/60 transition-colors">
              Không chắc bắt đầu từ đâu? Tư vấn miễn phí
            </span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  )
}
