import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Camera } from 'lucide-react'

const CREATORS = [
  {
    id: 'c1',
    name: 'Nguyễn Thành Long',
    title: 'Nhiếp ảnh gia cưới',
    location: 'Hà Nội',
    quote: 'Sony A7 IV giúp tôi bắt được khoảnh khắc thật — không diễn, không pose.',
    workImg: 'https://images.unsplash.com/photo-1741242493569-0ecc2290ada0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200',
    equipment: 'Sony Alpha A7 IV + 85mm f/1.4 GM',
    equipmentUrl: '#',
    exif: 'f/1.4 · 1/800s · ISO 200',
    layout: 'photo-left',
  },
  {
    id: 'c2',
    name: 'Trần Minh Huy',
    title: 'Nhiếp ảnh thiên nhiên',
    location: 'TP. Hồ Chí Minh',
    quote: 'A7R V ở ISO 12800 vẫn sạch như ISO 800 — đó là lý do tôi thức 3 giờ sáng để leo núi.',
    workImg: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200',
    equipment: 'Sony Alpha A7R V + 24-70mm f/2.8 GM II',
    equipmentUrl: '#',
    exif: 'f/8 · 1/250s · ISO 100',
    layout: 'text-left',
  },
]

function CreatorCard({ creator, globalVisible, delay }: {
  creator: typeof CREATORS[0]
  globalVisible: boolean
  delay: number
}) {
  const imgRef = useRef<HTMLDivElement>(null)
  const [imgVisible, setImgVisible] = useState(false)
  const [exifVisible, setExifVisible] = useState(false)
  const isPhotoLeft = creator.layout === 'photo-left'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImgVisible(true)
          // EXIF badge slides up 600ms after image starts developing
          setTimeout(() => setExifVisible(true), 600)
        }
      },
      { threshold: 0.3 }
    )
    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`flex gap-0 items-stretch transition-all duration-700 ${
        globalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Photo side — 62% */}
      <div
        ref={imgRef}
        className={`relative overflow-hidden group flex-shrink-0 ${isPhotoLeft ? 'order-1' : 'order-2'}`}
        style={{ flex: '62' }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <img
            src={creator.workImg}
            alt={`Tác phẩm của ${creator.name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* Film developing overlay — opaque initially, fades away on scroll-into-view */}
          <div
            className="absolute inset-0 bg-[#141414] pointer-events-none"
            style={{
              animation: imgVisible ? 'film-develop 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' : 'none',
              opacity: imgVisible ? undefined : 1,
            }}
          />

          {/* EXIF badge — slides up after film develops */}
          <div
            className="absolute bottom-5 left-5"
            style={{
              animation: exifVisible ? 'exif-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
              opacity: exifVisible ? undefined : 0,
              transform: exifVisible ? undefined : 'translateY(48px)',
            }}
          >
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 border-l-[3px] border-[#E8611E]">
              <Camera size={12} className="text-[#E8611E]" />
              <p
                className="text-[#141414] text-[11px] font-medium tracking-wider"
                style={{ fontFamily: 'var(--font-mono-brand)' }}
              >
                {creator.exif}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Text side — 38% */}
      <div
        className={`flex flex-col justify-center bg-white ${isPhotoLeft ? 'order-2' : 'order-1'}`}
        style={{
          flex: '38',
          padding: 'clamp(32px, 5vw, 64px)',
          borderTop: '4px solid #E8611E',
        }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="px-2.5 py-1 bg-[#FEF0E8] text-[#E8611E] text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Creator Story
          </span>
        </div>

        {/* Creator name */}
        <h3
          className="text-[#141414] mb-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.2vw, 30px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          {creator.name}
        </h3>
        <p
          className="text-[#6B6B6B] text-sm mb-8"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {creator.title} · {creator.location}
        </p>

        {/* Quote */}
        <blockquote
          className="text-[#141414] leading-[1.7] mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            fontWeight: 600,
            borderLeft: '3px solid #E8611E',
            paddingLeft: '20px',
          }}
        >
          "{creator.quote}"
        </blockquote>

        {/* Equipment CTA */}
        <div className="flex flex-col gap-2">
          <p
            className="text-[#8C8C8C] text-[11px] tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Thiết bị sử dụng
          </p>
          <a
            href={creator.equipmentUrl}
            className="group/pill inline-flex items-center gap-3 self-start bg-[#141414] text-white px-5 py-3 hover:bg-[#E8611E] transition-colors duration-250"
          >
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {creator.equipment}
            </span>
            <ArrowRight
              size={14}
              className="group-hover/pill:translate-x-0.5 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export function CreatorInspiration() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F4F1]"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      {/* Section header */}
      <div className="mx-auto px-12 mb-12" style={{ maxWidth: '1320px' }}>
        <div
          className={`flex items-end justify-between transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[3px] bg-[#E8611E]" />
              <p
                className="text-[#E8611E] text-[11px] tracking-[0.22em] uppercase font-semibold"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Cảm hứng từ cộng đồng
              </p>
            </div>
            <h2
              className="text-[#141414]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              Những người tạo ra khoảnh khắc
            </h2>
          </div>
          <button
            className="flex items-center gap-2 text-[#141414] text-sm font-semibold group"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="border-b-2 border-[#E8611E] pb-0.5 group-hover:text-[#E8611E] transition-colors">
              Chia sẻ tác phẩm của bạn
            </span>
            <ArrowRight size={15} className="text-[#E8611E] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Creator cards */}
      <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>
        <div className="flex flex-col gap-6">
          {CREATORS.map((creator, idx) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              globalVisible={visible}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
