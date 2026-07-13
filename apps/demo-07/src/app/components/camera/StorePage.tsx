import { useState, useEffect, useRef } from 'react'
import { SharedNavbar } from '../homepage/SharedNavbar'
import { Footer } from '../homepage/Footer'
import { useSEO } from '../../hooks/useSEO'
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import {
  heroSlides,
  categoryBanners,
  categories,
  cameras,
  lenses,
  cinema,
  actionCameras,
  flycam,
  studio,
  accessories,
  used,
  HOTLINE
} from '@mayanhvietnam/mock-data'

// Map category slugs to nav labels for onNavigate
const SLUG_TO_NAV: Record<string, string> = {
  'may-anh': 'Máy ảnh',
  'ong-kinh': 'Ống kính',
  'may-quay-phim': 'Máy quay',
  'action-camera': 'Action Camera',
  'flycam': 'Flycam',
  'thiet-bi-studio': 'Thiết bị studio',
  'phu-kien': 'Phụ kiện',
  'san-pham-cu': 'Sản phẩm cũ',
  'lap-phong-studio': 'Setup studio',
}

// Map category slugs to product arrays
const SLUG_TO_PRODUCTS: Record<string, any[]> = {
  'may-anh': cameras,
  'ong-kinh': lenses,
  'may-quay-phim': cinema,
  'action-camera': actionCameras,
  'flycam': flycam,
  'thiet-bi-studio': studio,
  'phu-kien': accessories,
  'san-pham-cu': used,
}

// The main display categories (exclude flash-sale, khuyen-mai, lap-phong-studio)
const DISPLAY_CATEGORIES = categories.filter(c =>
  !['san-pham-flash-sale', 'san-pham-khuyen-mai', 'lap-phong-studio'].includes(c.slug)
)

// ── Hero Slider Component ────────────────────────────────────
function HeroSlider({ onNavigate }: { onNavigate?: (label: string, id?: string) => void }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slides = heroSlides

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [slides.length])

  const go = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setCurrent(p => (p + dir + slides.length) % slides.length)
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
  }

  const s = slides[current]

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '21 / 9', minHeight: '280px', borderRadius: '24px', overflow: 'hidden', background: '#141414' }}>
      {/* Slide image */}
      <img
        key={s.id}
        src={s.image}
        alt={s.title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#000', transition: 'opacity 0.6s ease' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />

      {/* Content */}
      <div style={{ position: 'absolute', top: '50%', left: '48px', transform: 'translateY(-50%)', zIndex: 10, maxWidth: '420px' }}>
        <h2 style={{ color: '#FFF', fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '16px', lineHeight: 1.2 }}>{s.title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px', whiteSpace: 'pre-line' }}>{s.subtitle}</p>
        <button
          onClick={() => onNavigate?.('Máy ảnh')}
          style={{ background: '#E86A24', color: '#FFF', padding: '12px 32px', borderRadius: '28px', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(232,106,36,0.3)', transition: 'all 0.3s ease' }}
        >
          {s.ctaLabel} <ArrowRight size={16} />
        </button>
      </div>

      {/* Nav arrows */}
      <button onClick={() => go(-1)} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', zIndex: 20 }}><ChevronLeft size={20} /></button>
      <button onClick={() => go(1)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', zIndex: 20 }}><ChevronRight size={20} /></button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 20 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setCurrent(i); timerRef.current = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000) }}
            style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? '#E86A24' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  )
}

// ── Category Banner Slider ───────────────────────────────────
function CategoryBannerSlider({ slug }: { slug: string }) {
  const banners = categoryBanners[slug] || []
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (banners.length <= 1) return
    timerRef.current = setInterval(() => setIdx(p => (p + 1) % banners.length), 4000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [banners.length])

  if (banners.length === 0) return null
  const b = banners[idx]

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 1', minHeight: '160px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', background: '#FAFAF8' }}>
      <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.5s ease' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '20px', color: '#FFF', fontSize: '14px', fontWeight: 600, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>{b.title}</div>
      {banners.length > 1 && (
        <div style={{ position: 'absolute', bottom: '12px', right: '16px', display: 'flex', gap: '5px' }}>
          {banners.map((_, i) => (
            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === idx ? '#E86A24' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Product Card ─────────────────────────────────────────────
function ProductCard({ product, onNavigate }: { product: any, onNavigate?: (label: string, id?: string) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onNavigate?.('Product Detail', product.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF', borderRadius: '16px', padding: '16px', cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.04)', boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.02)',
        transition: 'all 0.3s ease', transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      <div style={{ height: '180px', background: '#FAFAF8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', overflow: 'hidden' }}>
        <img src={product.thumbnail} alt={product.name} style={{
          width: '75%', height: '75%', objectFit: 'contain', mixBlendMode: 'multiply',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)', transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }} />
      </div>
      <div style={{ color: '#E86A24', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>{product.brand}</div>
      <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#141414', marginBottom: '12px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#E86A24' }}>{product.price.toLocaleString('vi-VN')}đ</div>
        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#999', fontSize: '12px' }}>
            <Star size={12} fill="#E86A24" stroke="#E86A24" /> {product.rating.average}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main StorePage ───────────────────────────────────────────
export function StorePage({
  onNavigate,
  onAddToCart,
  cartCount = 0,
}: {
  onNavigate?: (label: string, id?: string) => void
  onAddToCart?: () => void
  cartCount?: number
}) {
  useSEO(
    'Máy Ảnh Việt Nam — Cửa Hàng Máy Ảnh, Ống Kính, Phụ Kiện Chính Hãng',
    'Máy Ảnh Việt Nam cung cấp máy ảnh, ống kính, máy quay, flycam, phụ kiện máy ảnh, thiết bị phòng studio giá tốt chất lượng cao. Giao hàng toàn quốc.'
  )

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: 'var(--font-body)', color: '#141414' }}>
      <SharedNavbar activeItem="Cửa hàng" onNavigate={onNavigate} cartCount={cartCount} />

      <main style={{ paddingTop: '88px', maxWidth: '1400px', margin: '0 auto', padding: '88px 4vw 0 4vw' }}>

        {/* ── HERO SLIDER ── */}
        <HeroSlider onNavigate={onNavigate} />

        {/* ── DANH MỤC NHANH ── */}
        <section style={{ padding: '64px 0 48px 0' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E86A24', marginBottom: '32px' }}>Danh Mục Sản Phẩm</h2>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
            {DISPLAY_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => onNavigate?.(SLUG_TO_NAV[cat.slug] || cat.name)}
                style={{
                  flex: '0 0 auto', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px',
                  padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                  cursor: 'pointer', minWidth: '130px', transition: 'all 0.3s ease', boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
                }}
                className="hover:border-[#E86A24] hover:shadow-[0_4px_20px_rgba(232,106,36,0.08)]"
              >
                <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#141414', whiteSpace: 'nowrap' }}>{cat.name}</span>
                <span style={{ fontSize: '11px', color: '#999' }}>{cat.productCount} sản phẩm</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── CATEGORY SECTIONS ── */}
        {DISPLAY_CATEGORIES.filter(c => SLUG_TO_PRODUCTS[c.slug]).map(cat => {
          const products = SLUG_TO_PRODUCTS[cat.slug] || []
          const display = products.slice(0, 5)
          const navLabel = SLUG_TO_NAV[cat.slug] || cat.name
          const hasBanners = categoryBanners[cat.slug] && categoryBanners[cat.slug].length > 0

          return (
            <section key={cat.id} style={{ marginBottom: '80px' }}>
              {/* Section header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                  <div>
                    <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', fontWeight: 400, color: '#141414', margin: 0 }}>{cat.name}</h2>
                    <p style={{ fontSize: '13px', color: '#999', margin: '4px 0 0 0' }}>{cat.description}</p>
                  </div>
                </div>
                <button onClick={() => onNavigate?.(navLabel)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #E86A24',
                  color: '#E86A24', padding: '10px 24px', borderRadius: '28px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                }} className="hover:bg-[#E86A24] hover:text-[#FFF]">
                  Xem tất cả <ArrowRight size={14} />
                </button>
              </div>

              {/* Category banner */}
              {hasBanners && <CategoryBannerSlider slug={cat.slug} />}

              {/* Products grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '20px' }}>
                {display.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
              </div>
            </section>
          )
        })}

        {/* ── THÔNG TIN CỬA HÀNG ── */}
        <section style={{ marginBottom: '80px', background: '#E86A24', borderRadius: '24px', padding: '64px 48px', color: '#FFF', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '24px' }}>Máy Ảnh Việt Nam</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.7, opacity: 0.9, marginBottom: '32px' }}>
                Đơn vị tiên phong trong lĩnh vực phân phối và bán lẻ các sản phẩm máy ảnh tại thị trường Việt Nam. Chúng tôi cam kết mang đến những sản phẩm chính hãng, giá tốt nhất cùng dịch vụ bảo hành chuyên nghiệp.
              </p>
              <button style={{ background: '#FFF', color: '#E86A24', padding: '14px 36px', borderRadius: '28px', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} className="hover:scale-105">
                Hotline: {HOTLINE}
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { num: '10+', label: 'Năm kinh nghiệm' },
                { num: '50K+', label: 'Khách hàng tin dùng' },
                { num: '1000+', label: 'Sản phẩm chính hãng' },
                { num: '100%', label: 'Bảo hành uy tín' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>{s.num}</div>
                  <div style={{ fontSize: '13px', opacity: 0.8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
