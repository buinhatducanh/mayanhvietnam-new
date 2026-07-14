import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getNewProducts } from '@mayanhvietnam/mock-data'
import type { ProductSummary } from '@mayanhvietnam/mock-data'

const RAW = getNewProducts(8)

interface DisplayProduct extends ProductSummary {
  spec: string
  isNew: boolean
}

const NEW_PRODUCTS: DisplayProduct[] = RAW.map((p) => ({
  ...p,
  spec: (p.shortSpecs || []).slice(0, 3).join(' · '),
  isNew: p.badges?.some((b) => b.type === 'new') ?? true,
}))

export function NewArrivals() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
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
    setWishlisted((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div className="mx-auto px-12 mb-8" style={{ maxWidth: '1320px' }}>
        <div
          className={`flex items-end justify-between transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
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
              onClick={() => router.push('/category')}
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

      <div
        ref={trackRef}
        onScroll={checkScroll}
        className={`flex gap-4 overflow-x-auto scrollbar-hide transition-all duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          paddingLeft: '80px',
          paddingRight: '80px',
          scrollSnapType: 'x mandatory',
          transitionDelay: '80ms',
        }}
      >
        {NEW_PRODUCTS.map((product) => (
          <div
            key={product.slug}
            onClick={() => router.push(`/products/${product.slug}`)}
            className="flex-shrink-0 group cursor-pointer"
            style={{ width: '220px', scrollSnapAlign: 'start' }}
          >
            <div className="relative overflow-hidden bg-[#F5F4F1] mb-4" style={{ height: '220px' }}>
              <img
                src={product.thumbnail}
                alt={`${product.brand} ${product.name}`}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.05]"
              />
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
              <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product.slug) }}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Heart
                  size={14}
                  className={wishlisted.includes(product.slug) ? 'fill-[#E8611E] text-[#E8611E]' : 'text-[#3A3A3A]'}
                />
              </button>
            </div>

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
                {product.name}
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
                {product.price.toLocaleString('vi-VN')}₫
              </p>
            </div>
          </div>
        ))}

        <div className="flex-shrink-0 w-10" />
      </div>
    </section>
  )
}
