import { useState, useEffect, useRef } from 'react'
import { SharedNavbar } from '../homepage/SharedNavbar'
import { Footer } from '../homepage/Footer'
import { useSEO } from '../../hooks/useSEO'
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { heroSlides, categoryBanners } from '@mayanhvietnam/mock-data'
import { categories } from '@mayanhvietnam/mock-data'
import { cameras } from '@mayanhvietnam/mock-data'
import { lenses } from '@mayanhvietnam/mock-data'
import { cinema } from '@mayanhvietnam/mock-data'
import { actionCameras } from '@mayanhvietnam/mock-data'
import { flycam } from '@mayanhvietnam/mock-data'
import { studio } from '@mayanhvietnam/mock-data'
import { accessories } from '@mayanhvietnam/mock-data'
import { used } from '@mayanhvietnam/mock-data'
import { HOTLINE } from '@mayanhvietnam/mock-data'

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
  onAddToCart?: (p?: any) => void
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

        {/* ── REVIEWS SẢN PHẨM ── */}
        {(() => {
          const videoReviews = [
            { id: 1, title: 'NHẮC FUJIFILM AI', author: 'Máy Ảnh Việt Nam', thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=700', link: 'https://www.youtube.com/@benhvienmayanhvietnam950/shorts' },
            { id: 2, title: 'CHỊ KHÁCH XINH G', author: 'Máy Ảnh Việt Nam', thumbnail: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=400&h=700', link: 'https://www.youtube.com/@benhvienmayanhvietnam950/shorts' },
            { id: 3, title: 'CẦM 200 TRIỆU ĐI MUA', author: 'Máy Ảnh Việt Nam', thumbnail: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=400&h=700', link: 'https://www.youtube.com/@benhvienmayanhvietnam950/shorts' },
            { id: 4, title: 'NAY KHÁCH GHÉ MUA', author: 'Máy Ảnh Việt Nam', thumbnail: 'https://images.unsplash.com/photo-1520390116612-4c2747190b41?auto=format&fit=crop&q=80&w=400&h=700', link: 'https://www.youtube.com/@benhvienmayanhvietnam950/shorts' },
            { id: 5, title: 'KASE 85MM CHẤT LƯỢNG', author: 'Máy Ảnh Việt Nam', thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=400&h=700', link: 'https://www.youtube.com/@benhvienmayanhvietnam950/shorts' },
          ];

          return (
            <section style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1A3B5C', textTransform: 'uppercase', margin: 0 }}>
                    REVIEWS SẢN PHẨM
                  </h2>
                  <svg viewBox="0 0 24 24" fill="#FF0000" style={{ width: '28px', height: '28px' }}>
                    <path d="M17.77,10.32l-1.2-.53L17,9.17A3.6,3.6,0,0,0,16.43,2.5,3.65,3.65,0,0,0,12,3.13L4.45,6.62A3.59,3.59,0,0,0,2.55,10.8a3.62,3.62,0,0,0,2.37,1.69l1.2.52-.43.62a3.6,3.6,0,0,0,.57,6.67,3.65,3.65,0,0,0,4.4-1.63l7.55-3.49a3.59,3.59,0,0,0,1.9-4.18A3.62,3.62,0,0,0,17.77,10.32ZM10,14.56V9.44l4.5,2.56Z" />
                  </svg>
                </div>
                <a href="https://www.youtube.com/@benhvienmayanhvietnam950" target="_blank" rel="noreferrer" style={{ color: '#E86A24', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Xem youtube <ChevronRight size={16} />
                </a>
              </div>

              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {videoReviews.map(video => (
                  <a href={video.link} target="_blank" rel="noreferrer" key={video.id} style={{ flex: '0 0 auto', width: '220px', height: '390px', borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'block', textDecoration: 'none' }}>
                    <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} className="hover:scale-105" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)' }} />
                    
                    <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ background: '#2196F3', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                      </div>
                      <div>
                        <div style={{ color: '#FFF', fontSize: '14px', fontWeight: 700, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                          {video.title}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '2px' }}>{video.author}</div>
                      </div>
                    </div>

                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                      <svg viewBox="0 0 24 24" fill="#FF0000" style={{ width: '64px', height: '64px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                        <path d="M17.77,10.32l-1.2-.53L17,9.17A3.6,3.6,0,0,0,16.43,2.5,3.65,3.65,0,0,0,12,3.13L4.45,6.62A3.59,3.59,0,0,0,2.55,10.8a3.62,3.62,0,0,0,2.37,1.69l1.2.52-.43.62a3.6,3.6,0,0,0,.57,6.67,3.65,3.65,0,0,0,4.4-1.63l7.55-3.49a3.59,3.59,0,0,0,1.9-4.18A3.62,3.62,0,0,0,17.77,10.32ZM10,14.56V9.44l4.5,2.56Z" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                .hover\\:scale-105:hover { transform: scale(1.05); }
              `}} />
            </section>
          );
        })()}

      </main>
      <Footer />
    </div>
  )
}
