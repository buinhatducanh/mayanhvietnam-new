import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react'

const NEW_PRODUCTS = [
  {
    id: 'na-1',
    brand: 'DJI',
    model: 'Osmo Action 4',
    spec: '4K120fps · HDR · IPX8',
    price: '6.990.000',
    img: 'https://images.unsplash.com/photo-1571190144364-1da84d9ca448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: true,
  },
  {
    id: 'na-2',
    brand: 'Sony',
    model: 'Alpha A6700',
    spec: 'APS-C · 26MP · AI AF',
    price: '29.990.000',
    img: 'https://images.unsplash.com/photo-1525288953762-38996f06cf0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: true,
  },
  {
    id: 'na-3',
    brand: 'Canon',
    model: 'RF 50mm f/1.2L USM',
    spec: 'Prime · L-Series · IS',
    price: '39.990.000',
    img: 'https://images.unsplash.com/photo-1617468264204-92588bd6485a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: false,
  },
  {
    id: 'na-4',
    brand: 'DJI',
    model: 'Mini 4 Pro',
    spec: '4K HDR · 34min · 20km',
    price: '14.990.000',
    img: 'https://images.unsplash.com/photo-1568436144045-2be8984cac17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: true,
  },
  {
    id: 'na-5',
    brand: 'Godox',
    model: 'AD200Pro',
    spec: '200W · TTL · HSS',
    price: '8.990.000',
    img: 'https://images.unsplash.com/photo-1648740678671-c37d78567ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: false,
  },
  {
    id: 'na-6',
    brand: 'Sony',
    model: 'FE 24mm f/1.4 GM',
    spec: 'G Master · Ultra-wide',
    price: '25.990.000',
    img: 'https://images.unsplash.com/photo-1533746228171-962520811097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: false,
  },
  {
    id: 'na-7',
    brand: 'Peak Design',
    model: 'Capture V3',
    spec: 'Arca-Swiss · Titanium',
    price: '2.990.000',
    img: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: false,
  },
  {
    id: 'na-8',
    brand: 'Sony',
    model: 'ZV-E10 II',
    spec: 'APS-C · 26MP · Vlog',
    price: '14.990.000',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400',
    isNew: true,
  },
]

export function NewArrivals() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [wishlisted, setWishlisted] = useState<string[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const checkScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -500 : 500, behavior: 'smooth' })
    setTimeout(checkScroll, 350)
  }

  const toggleWishlist = (id: string) => {
    setWishlisted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Inner — container for header + arrows */}
      <div className="mx-auto px-12 mb-8" style={{ maxWidth: '1320px' }}>
        <div
          className={`flex items-end justify-between transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Left header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[3px] bg-[#E8611E]" />
              <div className="flex items-center gap-2">
                <p
                  className="text-[#E8611E] text-[11px] tracking-[0.22em] uppercase font-semibold"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Hàng mới về
                </p>
                {/* Live dot */}
                <div className="w-2 h-2 bg-[#E8611E] rounded-full animate-pulse" />
              </div>
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
              Mới nhất tuần này
            </h2>
          </div>

          {/* Arrows + see all */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 border flex items-center justify-center transition-colors duration-200 ${
                  canScrollLeft
                    ? 'border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white'
                    : 'border-[#D4D4D4] text-[#D4D4D4] cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 border flex items-center justify-center transition-colors duration-200 ${
                  canScrollRight
                    ? 'border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white'
                    : 'border-[#D4D4D4] text-[#D4D4D4] cursor-not-allowed'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <button
              className="flex items-center gap-1.5 text-[#3A3A3A] text-sm font-medium group"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="border-b border-[#D4D4D4] pb-px group-hover:border-[#E8611E] group-hover:text-[#E8611E] transition-colors">
                Xem tất cả
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable track — full bleed with padding */}
      <div
        ref={trackRef}
        onScroll={checkScroll}
        className={`flex gap-4 overflow-x-auto scrollbar-hide transition-all duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          paddingLeft: '80px', // aligns with container px-12 on 1320 max
          paddingRight: '80px',
          scrollSnapType: 'x mandatory',
          transitionDelay: '80ms',
        }}
      >
        {NEW_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 group"
            style={{ width: '220px', scrollSnapAlign: 'start' }}
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-[#F5F4F1] mb-4" style={{ height: '220px' }}>
              <img
                src={product.img}
                alt={`${product.brand} ${product.model}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              {/* New badge */}
              {product.isNew && (
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-0.5 bg-[#E8611E] text-white text-[9px] font-bold tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    MỚI
                  </span>
                </div>
              )}
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Heart
                  size={14}
                  className={wishlisted.includes(product.id) ? 'fill-[#E8611E] text-[#E8611E]' : 'text-[#3A3A3A]'}
                />
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
              <p
                className="text-[#8C8C8C] text-[10px] tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {product.brand}
              </p>
              <h4
                className="text-[#141414] leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                {product.model}
              </h4>
              <p
                className="text-[#8C8C8C] text-[11px]"
                style={{ fontFamily: 'var(--font-mono-brand)' }}
              >
                {product.spec}
              </p>
              <p
                className="text-[#E8611E] font-bold mt-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                }}
              >
                {product.price}₫
              </p>
            </div>
          </div>
        ))}

        {/* Right breathing room */}
        <div className="flex-shrink-0 w-10" />
      </div>
    </section>
  )
}
