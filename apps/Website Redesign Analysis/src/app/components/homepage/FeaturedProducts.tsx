import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight, Heart, ShoppingBag, Star, Zap } from 'lucide-react'

const PRODUCTS = [
  {
    id: 'sony-a7iv',
    brand: 'Sony',
    model: 'Alpha A7 IV',
    subtitle: 'Full-frame · 33MP · 4K60p',
    positioning: 'Lý tưởng cho creator nội dung chuyên nghiệp',
    price: '33.990.000',
    priceInstall: '2.830.000',
    img: 'https://images.unsplash.com/photo-1525288953762-38996f06cf0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
    badge: 'Bestseller',
    badgeType: 'hot',
    rating: 4.9,
    reviews: 127,
    size: 'dominant',
  },
  {
    id: 'nikon-z6iii',
    brand: 'Nikon',
    model: 'Z6 III',
    subtitle: 'Full-frame · 24.5MP · 6K RAW',
    positioning: 'Hybrid hoàn hảo cho ảnh và video',
    price: '52.990.000',
    priceInstall: '4.410.000',
    img: 'https://images.unsplash.com/photo-1617468264204-92588bd6485a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    badge: 'Mới về',
    badgeType: 'new',
    rating: 4.8,
    reviews: 43,
    size: 'stacked',
  },
  {
    id: 'sony-fe-35mm',
    brand: 'Sony',
    model: 'FE 35mm f/1.4 GM',
    subtitle: 'Prime Lens · G Master',
    positioning: 'Chuẩn mực vàng cho ảnh đường phố & chân dung',
    price: '23.990.000',
    priceInstall: '1.999.000',
    img: 'https://images.unsplash.com/photo-1552315551-4084e78d722c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    badge: null,
    badgeType: null,
    rating: 4.9,
    reviews: 89,
    size: 'stacked',
  },
]

function formatVND(price: string) {
  return `${price}₫`
}

function BeforeAfterSlider({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dividerX, setDividerX] = useState(50)
  const dragging = useRef(false)

  const updateDivider = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setDividerX(pct)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updateDivider(e.clientX) }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [updateDivider])

  const onTouchMove = (e: React.TouchEvent) => {
    updateDivider(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{ aspectRatio: '4/3', cursor: 'ew-resize' }}
      onTouchMove={onTouchMove}
    >
      {/* Processed (colour) — full image behind */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* RAW (desaturated) — clipped to left side of divider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${dividerX}%` }}
      >
        <img
          src={src}
          alt={`${alt} RAW`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            width: `${10000 / dividerX}%`,
            filter: 'grayscale(1) contrast(1.05)',
          }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20"
        style={{ left: `${dividerX}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg z-30"
          onMouseDown={onMouseDown}
        >
          <div className="flex gap-0.5">
            <div className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-[#141414]" />
            <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[6px] border-l-[#141414]" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-3 z-10 pointer-events-none"
        style={{ left: `${Math.min(dividerX - 2, 5)}%`, opacity: dividerX > 15 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        <span
          className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-white/90 text-[#141414]"
          style={{ fontFamily: 'var(--font-mono-brand)' }}
        >
          RAW
        </span>
      </div>
      <div
        className="absolute top-3 right-3 z-10 pointer-events-none"
        style={{ opacity: dividerX < 85 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        <span
          className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-[#E8611E] text-white"
          style={{ fontFamily: 'var(--font-mono-brand)' }}
        >
          EDIT
        </span>
      </div>
    </div>
  )
}

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [wishlisted, setWishlisted] = useState<string[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleWishlist = (id: string) => {
    setWishlisted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const dominant = PRODUCTS[0]
  const stacked = PRODUCTS.slice(1)

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ paddingTop: '0', paddingBottom: '96px' }}
    >
      {/* Orange accent header strip */}
      <div className="bg-[#E8611E] mb-12">
        <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <Zap size={20} className="text-white" fill="white" />
              <div>
                <p
                  className="text-white/70 text-[10px] tracking-[0.2em] uppercase mb-0.5"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Được chọn lọc kỹ càng
                </p>
                <h2
                  className="text-white"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.2vw, 28px)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Sản phẩm nổi bật
                </h2>
              </div>
            </div>
            <button
              className="flex items-center gap-2 text-white text-sm font-semibold group border border-white/30 px-5 py-2.5 hover:bg-white hover:text-[#E8611E] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Xem tất cả
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-12" style={{ maxWidth: '1320px' }}>
        {/* Grid: 7/12 dominant + 5/12 stacked */}
        <div className="flex gap-8 items-start">

          {/* DOMINANT product — 7/12 */}
          <div
            className={`group transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ flex: '7', transitionDelay: '0ms' }}
          >
            {/* Image container — Before/After RAW draggable divider */}
            <div className="relative bg-[#F5F4F1]">
              <BeforeAfterSlider
                src={dominant.img}
                alt={`${dominant.brand} ${dominant.model}`}
              />

              {dominant.badge && (
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span
                    className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white bg-[#E8611E]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {dominant.badge}
                  </span>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(dominant.id)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FEF0E8]"
              >
                <Heart
                  size={16}
                  className={wishlisted.includes(dominant.id) ? 'fill-[#E8611E] text-[#E8611E]' : 'text-[#3A3A3A]'}
                />
              </button>

              {/* Drag hint — fades after first interaction */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <p
                  className="text-white/70 text-[10px] tracking-[0.15em] uppercase bg-black/30 backdrop-blur-sm px-2.5 py-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Kéo để so sánh RAW ↔ Edit
                </p>
              </div>

              {/* Bottom strip on image */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E8611E] z-10" />
            </div>

            {/* Product info */}
            <div className="pt-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p
                    className="text-[#8C8C8C] text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {dominant.brand}
                  </p>
                  <h3
                    className="text-[#141414]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(22px, 2.2vw, 32px)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {dominant.model}
                  </h3>
                </div>
                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.floor(dominant.rating) ? 'fill-[#E8611E] text-[#E8611E]' : 'text-[#D4D4D4]'}
                    />
                  ))}
                  <span
                    className="text-xs text-[#6B6B6B] ml-1"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    ({dominant.reviews})
                  </span>
                </div>
              </div>

              <p
                className="text-[#6B6B6B] text-sm mb-1"
                style={{ fontFamily: 'var(--font-mono-brand)' }}
              >
                {dominant.subtitle}
              </p>

              <p
                className="text-[#3A3A3A] text-sm mb-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {dominant.positioning}
              </p>

              <p
                className="text-[#8C8C8C] text-xs mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Hàng chính hãng · Bảo hành 24 tháng
              </p>

              {/* Price + CTAs */}
              <div className="flex items-center gap-6">
                <div>
                  <span
                    className="text-[#E8611E] block"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(22px, 2vw, 30px)',
                      fontWeight: 800,
                    }}
                  >
                    {formatVND(dominant.price)}
                  </span>
                  <span
                    className="text-[#8C8C8C] text-xs"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Trả góp 0% từ {dominant.priceInstall}₫/tháng
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <button
                    className="flex-1 h-11 bg-[#E8611E] text-white text-sm font-semibold hover:bg-[#C44E14] transition-colors duration-200 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <ShoppingBag size={15} />
                    Thêm vào giỏ
                  </button>
                  <button
                    className="h-11 px-5 border-2 border-[#141414] text-[#141414] text-sm font-semibold hover:bg-[#141414] hover:text-white transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Khám phá
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stacked products — 5/12 */}
          <div className="flex flex-col gap-6" style={{ flex: '5' }}>
            {stacked.map((product, idx) => (
              <div
                key={product.id}
                className={`group flex gap-5 p-5 border border-transparent hover:border-[#E8611E]/25 hover:bg-[#FEF0E8]/30 transition-all duration-300 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${120 + idx * 80}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-[#F5F4F1] flex-shrink-0" style={{ width: '156px', height: '156px' }}>
                  <img
                    src={product.img}
                    alt={`${product.brand} ${product.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-white ${
                          product.badgeType === 'new' ? 'bg-[#141414]' : 'bg-[#E8611E]'
                        }`}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute bottom-2 right-2 w-7 h-7 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart
                      size={13}
                      className={wishlisted.includes(product.id) ? 'fill-[#E8611E] text-[#E8611E]' : 'text-[#3A3A3A]'}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 pt-1 flex-1">
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
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontWeight: 700,
                    }}
                  >
                    {product.model}
                  </h4>
                  <p
                    className="text-[#6B6B6B] text-[11px]"
                    style={{ fontFamily: 'var(--font-mono-brand)' }}
                  >
                    {product.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < Math.floor(product.rating) ? 'fill-[#E8611E] text-[#E8611E]' : 'text-[#D4D4D4]'}
                      />
                    ))}
                    <span className="text-[10px] text-[#8C8C8C] ml-1" style={{ fontFamily: 'var(--font-body)' }}>
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="mt-2">
                    <span
                      className="text-[#E8611E] font-bold block"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px, 1.5vw, 22px)' }}
                    >
                      {formatVND(product.price)}
                    </span>
                    <span className="text-[#8C8C8C] text-[11px]" style={{ fontFamily: 'var(--font-body)' }}>
                      Trả góp từ {product.priceInstall}₫/tháng
                    </span>
                  </div>

                  <button
                    className="mt-3 w-full h-9 bg-[#141414] text-white text-xs font-semibold hover:bg-[#E8611E] transition-colors duration-200 flex items-center justify-center gap-1.5"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Khám phá
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
