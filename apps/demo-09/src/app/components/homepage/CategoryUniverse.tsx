import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'may-anh',
    label: 'Máy ảnh',
    phrase: 'Khoảnh khắc quyết định',
    count: '186 sản phẩm',
    img: 'https://images.unsplash.com/photo-1758613656365-5195c3b96ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900',
    size: 'dominant',
    styles: ['portrait', 'wedding', 'street', 'landscape'],
  },
  {
    id: 'ong-kinh',
    label: 'Ống kính',
    phrase: 'Góc nhìn của bạn',
    count: '214 sản phẩm',
    img: 'https://images.unsplash.com/photo-1533746228171-962520811097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'stacked-top',
    styles: ['portrait', 'wedding', 'street', 'landscape'],
  },
  {
    id: 'san-pham-cu',
    label: 'Sản phẩm cũ',
    phrase: 'Lịch sử trong từng máy',
    count: '94 sản phẩm',
    img: 'https://images.unsplash.com/photo-1577056923568-aae7e99df387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'stacked-bottom',
    styles: ['street'],
  },
  {
    id: 'flycam',
    label: 'Flycam',
    phrase: 'Bầu trời không giới hạn',
    count: '67 sản phẩm',
    img: 'https://images.unsplash.com/photo-1695094412603-3340f1e72232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'quarter',
    styles: ['landscape'],
  },
  {
    id: 'action-camera',
    label: 'Action Camera',
    phrase: 'Chuyển động không chờ',
    count: '43 sản phẩm',
    img: 'https://images.unsplash.com/photo-1477160814815-7f4479b86c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'quarter',
    styles: ['street', 'landscape'],
  },
  {
    id: 'studio',
    label: 'Studio',
    phrase: 'Ánh sáng được kiểm soát',
    count: '129 sản phẩm',
    img: 'https://images.unsplash.com/photo-1648740678671-c37d78567ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'quarter',
    styles: ['portrait', 'wedding'],
  },
  {
    id: 'phu-kien',
    label: 'Phụ kiện',
    phrase: 'Chi tiết tạo khác biệt',
    count: '312 sản phẩm',
    img: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'quarter',
    styles: ['portrait', 'wedding', 'street', 'landscape'],
  },
  {
    id: 'camera-quay-phim',
    label: 'Camera/Quay phim',
    phrase: 'Mỗi khung hình là nghệ thuật',
    count: '58 sản phẩm',
    img: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'triple-wide',
    styles: ['portrait', 'wedding'],
  },
  {
    id: 'lap-phong',
    label: 'Lắp phông studio',
    phrase: 'Không gian sáng tạo',
    count: '38 sản phẩm',
    img: 'https://images.unsplash.com/photo-1647427854253-b92bb40c9330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'triple-mid',
    styles: ['portrait', 'wedding'],
  },
  {
    id: 'beginner',
    label: 'Mới bắt đầu?',
    phrase: 'Chúng tôi có lộ trình cho bạn',
    count: 'Xem gợi ý →',
    img: 'https://images.unsplash.com/photo-1772130204717-18bc9b65fe15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=700',
    size: 'triple-narrow',
    isBeginner: true,
    styles: ['portrait', 'wedding', 'street', 'landscape'],
  },
]

const STYLES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'portrait', label: 'Chân dung' },
  { id: 'wedding', label: 'Cưới hỏi' },
  { id: 'street', label: 'Đường phố' },
  { id: 'landscape', label: 'Phong cảnh' },
]

function CategoryCard({
  cat,
  className = '',
  style = {},
  dimmed,
  onHover,
  onLeave,
}: {
  cat: typeof CATEGORIES[0]
  className?: string
  style?: React.CSSProperties
  dimmed: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <a
      href="#"
      className={`group relative overflow-hidden block cursor-pointer ${className}`}
      style={{
        ...style,
        opacity: dimmed ? 0.35 : 1,
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      <img
        src={cat.img}
        alt={cat.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: cat.isBeginner
            ? 'linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0.65) 100%)'
            : 'linear-gradient(to bottom, rgba(10,9,9,0.05) 0%, rgba(10,9,9,0.72) 100%)',
        }}
      />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-[#E8611E]/0 group-hover:bg-[#E8611E]/12 transition-colors duration-400" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1.5">
        <p
          className="text-white/50 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-white/70"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {cat.count}
        </p>

        <h3
          className="text-white leading-tight transition-all duration-300"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(15px, 1.4vw, 20px)',
          }}
        >
          {cat.label}
        </h3>

        <p
          className="text-white/0 group-hover:text-white/80 text-sm leading-snug transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
        >
          {cat.phrase}
        </p>

        <div className="flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-medium" style={{ fontFamily: 'var(--font-body)' }}>
            Khám phá
          </span>
          <ArrowRight size={13} className="text-white" />
        </div>
      </div>

      {cat.isBeginner && (
        <div className="absolute top-4 left-4">
          <span
            className="px-2.5 py-1 bg-[#E8611E] text-white text-[10px] font-semibold tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Dành cho bạn
          </span>
        </div>
      )}
    </a>
  )
}

export function CategoryUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeStyle, setActiveStyle] = useState('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function isDimmed(cat: typeof CATEGORIES[0]): boolean {
    const styleDimmed = activeStyle !== 'all' && !cat.styles.includes(activeStyle)
    const hoverDimmed = hoveredId !== null && hoveredId !== cat.id
    return styleDimmed || hoverDimmed
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
    >
      <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>

        {/* Section header */}
        <div
          className={`flex items-end justify-between mb-8 transition-all duration-600 ${
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
                Danh mục sản phẩm
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
              Thế giới của bạn có ở đây
            </h2>
          </div>
          <button
            className="flex items-center gap-2 text-[#141414] text-sm font-semibold group"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="border-b-2 border-[#E8611E] pb-0.5 group-hover:text-[#E8611E] transition-colors duration-200">
              Xem tất cả danh mục
            </span>
            <ArrowRight size={15} className="text-[#E8611E] group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Shoot by Style toggle */}
        <div
          className={`flex items-center gap-2 mb-8 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: '60ms' }}
        >
          <span
            className="text-[#8C8C8C] text-[11px] tracking-[0.15em] uppercase mr-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Chụp theo phong cách
          </span>
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStyle(s.id)}
              className="px-3.5 py-1.5 text-xs font-semibold transition-all duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: activeStyle === s.id ? '#E8611E' : 'transparent',
                color: activeStyle === s.id ? '#FFFFFF' : '#6B6B6B',
                border: activeStyle === s.id ? '1px solid #E8611E' : '1px solid #D4D4D4',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* ROW 1: Dominant (7/12) + two stacked right (5/12) */}
        <div
          className={`flex gap-3 mb-3 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ height: '420px', transitionDelay: '80ms' }}
        >
          <CategoryCard
            cat={CATEGORIES[0]}
            style={{ flex: 7 }}
            dimmed={isDimmed(CATEGORIES[0])}
            onHover={() => setHoveredId(CATEGORIES[0].id)}
            onLeave={() => setHoveredId(null)}
          />
          <div className="flex flex-col gap-3" style={{ flex: 5 }}>
            <CategoryCard
              cat={CATEGORIES[1]}
              style={{ flex: 1 }}
              dimmed={isDimmed(CATEGORIES[1])}
              onHover={() => setHoveredId(CATEGORIES[1].id)}
              onLeave={() => setHoveredId(null)}
            />
            <CategoryCard
              cat={CATEGORIES[2]}
              style={{ flex: 1 }}
              dimmed={isDimmed(CATEGORIES[2])}
              onHover={() => setHoveredId(CATEGORIES[2].id)}
              onLeave={() => setHoveredId(null)}
            />
          </div>
        </div>

        {/* ROW 2: 4 equal cards */}
        <div
          className={`grid grid-cols-4 gap-3 mb-3 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ height: '260px', transitionDelay: '160ms' }}
        >
          {CATEGORIES.slice(3, 7).map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              style={{ height: '100%' }}
              dimmed={isDimmed(cat)}
              onHover={() => setHoveredId(cat.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* ROW 3: 3 unequal — Camera/Quay phim (5/12), Lắp phông (4/12), Beginner (3/12) */}
        <div
          className={`flex gap-3 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ height: '200px', transitionDelay: '240ms' }}
        >
          <CategoryCard
            cat={CATEGORIES[7]}
            style={{ flex: 5 }}
            dimmed={isDimmed(CATEGORIES[7])}
            onHover={() => setHoveredId(CATEGORIES[7].id)}
            onLeave={() => setHoveredId(null)}
          />
          <CategoryCard
            cat={CATEGORIES[8]}
            style={{ flex: 4 }}
            dimmed={isDimmed(CATEGORIES[8])}
            onHover={() => setHoveredId(CATEGORIES[8].id)}
            onLeave={() => setHoveredId(null)}
          />
          <CategoryCard
            cat={CATEGORIES[9]}
            style={{ flex: 3 }}
            dimmed={isDimmed(CATEGORIES[9])}
            onHover={() => setHoveredId(CATEGORIES[9].id)}
            onLeave={() => setHoveredId(null)}
          />
        </div>

      </div>
    </section>
  )
}
