import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const STATS = [
  { num: '10+', label: 'Năm kinh nghiệm', sub: 'Đồng hành cùng cộng đồng nhiếp ảnh Việt Nam', target: 10, suffix: '+' },
  { num: '4', label: 'Showroom', sub: 'Hà Nội · TP.HCM · Đà Nẵng · Cần Thơ', target: 4, suffix: '' },
  { num: '50K+', label: 'Khách hàng', sub: 'Tin tưởng chọn mua tại Máy Ảnh Việt Nam', target: 50, suffix: 'K+' },
  { num: '900+', label: 'Sản phẩm', sub: 'Chính hãng, đủ thể loại, luôn sẵn kho', target: 900, suffix: '+' },
]

function useCountUp(target: number, duration: number, active: boolean, delay: number): number {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | undefined>(undefined)
  const startRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!active) return
    const timeout = setTimeout(() => {
      startRef.current = undefined
      const tick = (ts: number) => {
        if (!startRef.current) startRef.current = ts
        const progress = Math.min((ts - startRef.current) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setCount(target)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, target, duration, delay])

  return count
}

function StatCell({ stat, idx, active, visible }: {
  stat: typeof STATS[0]
  idx: number
  active: boolean
  visible: boolean
}) {
  const beatDelay = idx < 2 ? 0 : 120
  const count = useCountUp(stat.target, 1200, active, beatDelay)

  return (
    <div
      className={`bg-white px-8 py-10 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${idx * 80}ms`, transitionTimingFunction: 'var(--ease-standard)' }}
    >
      <div
        className="text-[#E8611E] leading-none mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 4.5vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}
      >
        {active ? `${count}${stat.suffix}` : stat.num}
      </div>
      <div
        className="text-[#141414] mb-1"
        style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}
      >
        {stat.label}
      </div>
      <div
        className="text-[#8C8C8C] text-sm leading-snug"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {stat.sub}
      </div>
    </div>
  )
}

export function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [countersActive, setCountersActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setTimeout(() => setCountersActive(true), 300)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>

        {/* Top row: eyebrow + statement + CTA */}
        <div className="flex items-end justify-between mb-16">
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-standard)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-[3px] bg-[#E8611E] origin-left"
                style={{
                  width: '32px',
                  animation: visible ? 'eyebrow-draw 0.3s ease-out forwards' : 'none',
                }}
              />
              <p
                className="text-[#E8611E] text-[11px] tracking-[0.22em] uppercase font-semibold"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Về chúng tôi
              </p>
            </div>

            <h2
              className="text-[#141414]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4vw, 60px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                maxWidth: '680px',
              }}
            >
              Công cụ cho<br />
              <span className="text-[#E8611E]">khoảnh khắc thật.</span>
            </h2>
          </div>

          <div
            className={`flex flex-col items-end gap-4 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '120ms', transitionTimingFunction: 'var(--ease-standard)' }}
          >
            <p
              className="text-[#6B6B6B] text-right leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontSize: '15px', maxWidth: '320px' }}
            >
              Không phải nhân viên bán hàng — đội ngũ của chúng tôi là nhiếp ảnh gia.
            </p>
            <button
              className="flex items-center gap-2 text-[#141414] text-sm font-semibold group"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="border-b-2 border-[#E8611E] pb-0.5 group-hover:text-[#E8611E] transition-colors">
                Câu chuyện của chúng tôi
              </span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#E8611E]" />
            </button>
          </div>
        </div>

        {/* Stats strip — 4 large count-up numbers */}
        <div className="grid grid-cols-4 gap-px bg-[#EBEBEB]">
          {STATS.map((stat, idx) => (
            <StatCell
              key={stat.label}
              stat={stat}
              idx={idx}
              active={countersActive}
              visible={visible}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
