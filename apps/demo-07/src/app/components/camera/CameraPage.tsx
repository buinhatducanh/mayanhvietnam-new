import { useState, useEffect } from 'react'
import { SharedNavbar } from '../homepage/SharedNavbar'
import { Footer } from '../homepage/Footer'
import { useSEO } from '../../hooks/useSEO'
import { Star, ShoppingCart, Aperture, ChevronLeft, ChevronRight } from 'lucide-react'
import { cameras } from '@mayanhvietnam/mock-data'

// Data
const HERO_SLIDES = [
  {
    brand: 'Canon',
    product: 'EOS R6 Mark II',
    tagline: 'Hiệu năng cao, tốc độ chụp nhanh và hình ảnh sống động, lý tưởng cho nhiếp ảnh gia chuyên nghiệp.',
    img: cameras[0].thumbnail,
  },
  {
    brand: 'Sony',
    product: 'Alpha A7 IV',
    tagline: 'Cảm biến 33MP BSI Exmor R. Trí tuệ nhân tạo thế hệ mới.',
    img: cameras[1].thumbnail,
  },
  {
    brand: 'Canon',
    product: 'EOS R50',
    tagline: 'Nhỏ gọn, mạnh mẽ, dành cho creator bắt đầu hành trình.',
    img: cameras[2].thumbnail,
  },
  {
    brand: 'Nikon',
    product: 'Z6 Mark III',
    tagline: 'Hybrid flagship tầm trung với cảm biến Partially Stacked.',
    img: cameras[3].thumbnail,
  }
]

const BRANDS = ['Canon', 'Sony', 'Fujifilm', 'Nikon', 'Lumix', 'OM System', 'Sigma']

const FILTERS = [
  { group: 'Mức giá', options: ['Dưới 10 triệu', '10–20 triệu', '20–40 triệu', 'Trên 40 triệu'] }
]



export function CameraPage({ 
  onNavigate,
  onAddToCart,
  cartCount = 0
}: { 
  onNavigate?: (label: string, id?: string) => void,
  onAddToCart?: () => void,
  cartCount?: number
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animatingProducts, setAnimatingProducts] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  useSEO(
    'Máy ảnh Chính hãng | Máy Ảnh Việt Nam',
    'Khám phá bộ sưu tập máy ảnh đa dạng từ Canon, Sony, Nikon, Fujifilm. Các dòng máy ảnh chuyên nghiệp, máy ảnh Mirrorless, DSLR chính hãng giá tốt.'
  )

  // Auto slide Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
  }
  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)
  }

  // Simulate filtering rearrangement
  const handleBrandClick = () => {
    setAnimatingProducts(true)
    setTimeout(() => {
      setAnimatingProducts(false)
    }, 400)
  }

  const toggleFilter = (opt: string) => {
    setActiveFilters(prev => prev.includes(opt) ? prev.filter(f => f !== opt) : [...prev, opt])
  }

  return (
    <div style={{
      background: '#FAFAF8',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
      color: '#141414',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* ── GIANT WATERMARK ── */}
      <div style={{
        position: 'fixed',
        top: '15%',
        right: '-10%',
        opacity: 0.02,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <Aperture size={1000} strokeWidth={0.5} color="#141414" />
      </div>

      {/* ── NAVBAR ── */}
      <SharedNavbar activeItem="Máy ảnh" onNavigate={onNavigate} cartCount={cartCount} />

      <main style={{ paddingTop: '72px', position: 'relative', zIndex: 10 }}>
        
        {/* ── HERO SLIDER ── */}
        <section style={{ height: '80vh', position: 'relative', overflow: 'hidden', background: '#F6F6F2' }}>
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              opacity: i === currentSlide ? 1 : 0,
              transition: 'opacity 1.4s ease-in-out, transform 8s linear',
              transform: i === currentSlide ? 'scale(1)' : 'scale(1.05)'
            }}>
               <div
                 className="camera-hero-text"
                 style={{
                   flex: '0 0 35%',
                   padding: '100px 8vw',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'center',
                   zIndex: 10,
                   background: 'linear-gradient(to right, #F6F6F2 80%, transparent)'
                 }}
               >
                  <span style={{
                    fontSize: '14px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#8C8C8C',
                    marginBottom: '16px'
                  }}>
                    {slide.brand}
                  </span>
                  <h2 style={{
                    fontSize: 'clamp(48px, 5vw, 72px)',
                    fontWeight: 300,
                    fontFamily: 'var(--font-display)',
                    marginBottom: '24px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em'
                  }}>
                    {slide.product}
                  </h2>
                  <p style={{
                    fontSize: '18px',
                    color: '#6B6B6B',
                    fontWeight: 300,
                    marginBottom: '48px',
                    lineHeight: 1.6,
                    maxWidth: '400px'
                  }}>
                    {slide.tagline}
                  </p>
                  <button style={{
                    background: '#E86A24',
                    color: '#FFF',
                    padding: '16px 48px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    alignSelf: 'flex-start',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(232, 106, 36, 0.25)'
                  }}
                  className="hover:bg-[#d45d1d] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(232,106,36,0.35)]"
                  >
                    Khám phá ngay
                  </button>
               </div>
               <div className="camera-hero-image" style={{ flex: '1', position: 'relative' }}>
                  <img src={slide.img} style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    filter: 'sepia(0.1) contrast(1.05)' // Slight sunset feel
                  }} />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to right, #F6F6F2 0%, transparent 40%)' 
                  }} />
                  {/* Subtle warm sunset light overlay */}
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'radial-gradient(ellipse at 80% 50%, rgba(232,106,36,0.06) 0%, transparent 60%)',
                    mixBlendMode: 'screen'
                  }} />
               </div>
            </div>
          ))}

          {/* ── ARROWS ── */}
          <button onClick={handlePrevSlide} style={{
            position: 'absolute', left: '4vw', top: '50%', transform: 'translateY(-50%)',
            width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            border: 'none', zIndex: 20, transition: 'all 0.3s ease', color: '#141414',
            backdropFilter: 'blur(10px)'
          }} className="hover:bg-[#E86A24] hover:text-[#FFF] hover:scale-110">
            <ChevronLeft size={24} />
          </button>
          
          <button onClick={handleNextSlide} style={{
            position: 'absolute', right: '4vw', top: '50%', transform: 'translateY(-50%)',
            width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            border: 'none', zIndex: 20, transition: 'all 0.3s ease', color: '#141414',
            backdropFilter: 'blur(10px)'
          }} className="hover:bg-[#E86A24] hover:text-[#FFF] hover:scale-110">
            <ChevronRight size={24} />
          </button>
        </section>

        {/* ── LOGO THƯƠNG HIỆU ── */}
        <section style={{ padding: '80px 4vw 40px 4vw' }}>
          <h3 style={{ 
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 400, 
            fontFamily: 'var(--font-display)', 
            marginBottom: '48px', 
            color: '#3A3A3A' 
          }}>
            Chọn thương hiệu bạn yêu thích
          </h3>
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
             {BRANDS.map(brand => (
               <div
                 key={brand}
                 className="group camera-brand-card"
                 style={{
                   background: '#FFF',
                   padding: '24px 48px',
                   borderRadius: '20px',
                   border: '1.5px solid transparent',
                   cursor: 'pointer',
                   transition: 'all 0.4s ease',
                   boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
                 }} 
                 onClick={handleBrandClick}
               >
                 <span className="group-hover:text-[#E86A24] camera-brand-text" style={{
                   fontSize: '22px',
                   fontWeight: 700,
                   fontFamily: 'var(--font-display)',
                   color: '#8C8C8C',
                   transition: 'all 0.4s ease',
                   letterSpacing: '0.05em'
                 }}
                 >
                   {brand}
                 </span>
                 <style>{`
                   .group:hover {
                     border-color: rgba(232, 106, 36, 0.4) !important;
                     transform: scale(1.02) translateY(-2px);
                     box-shadow: 0 12px 32px rgba(232, 106, 36, 0.08) !important;
                   }
                 `}</style>
               </div>
             ))}
          </div>
        </section>

        {/* ── THANH FILTER ── */}
        <section style={{ padding: '20px 4vw 60px 4vw', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '24px' 
          }}>
            {FILTERS.map(f => (
              <div key={f.group} style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: '#8C8C8C', 
                  width: '140px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  paddingTop: '10px'
                }}>
                  {f.group}
                </span>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {f.options.map(opt => {
                    const isActive = activeFilters.includes(opt)
                    return (
                      <button 
                        key={opt} 
                        onClick={() => toggleFilter(opt)}
                        style={{
                          background: isActive ? '#E86A24' : '#FFF', 
                          border: isActive ? '1px solid #E86A24' : '1px solid #EBEBEB', 
                          padding: '8px 24px', 
                          borderRadius: '32px', 
                          fontSize: '14px', 
                          fontWeight: 500,
                          color: isActive ? '#FFF' : '#3A3A3A', 
                          cursor: 'pointer', 
                          transition: 'all 0.3s ease'
                        }}
                        className={`hover:border-[#E86A24] ${!isActive && 'hover:text-[#E86A24]'}`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRODUCT GALLERY ── */}
        <section style={{ 
          padding: '0 4vw 120px 4vw', 
          maxWidth: '1800px', 
          margin: '0 auto',
          opacity: animatingProducts ? 0 : 1,
          transform: animatingProducts ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease'
        }}>
          <div className="camera-product-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '40px'
          }}>
            {cameras.map(p => (
               <div key={p.id} className="product-card group camera-product-card" style={{
                 background: '#FFF',
                 borderRadius: '24px',
                 padding: '48px 40px',
                 display: 'flex',
                 flexDirection: 'column',
                 position: 'relative',
                 cursor: 'pointer',
                 transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                 boxShadow: '0 4px 32px rgba(0,0,0,0.02)'
               }}>
                 {/* Badge */}
                 {p.badges && p.badges.length > 0 && (
                   <span style={{ 
                     position: 'absolute', 
                     top: '32px', 
                     left: '32px', 
                     background: '#FAFAF8', 
                     color: '#6B6B6B', 
                     fontSize: '11px', 
                     padding: '6px 14px', 
                     borderRadius: '16px', 
                     textTransform: 'uppercase', 
                     fontWeight: 600, 
                     letterSpacing: '0.05em' 
                   }}>
                     {p.badges[0].label}
                   </span>
                 )}
                 
                 {/* Image */}
                 <div className="camera-product-img" style={{
                   flex: '1',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   marginBottom: '48px',
                   height: '320px'
                 }}>
                   <img 
                     src={p.thumbnail} 
                     style={{ 
                       width: '100%', 
                       height: '100%', 
                       objectFit: 'contain', 
                       transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
                     }} 
                     className="group-hover:scale-105" 
                   />
                 </div>
                 
                 {/* Info */}
                 <div style={{ transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }} className="group-hover:-translate-y-2">
                   <h4 style={{ 
                     fontSize: '20px', 
                     fontWeight: 400, 
                     fontFamily: 'var(--font-display)', 
                     marginBottom: '12px', 
                     color: '#141414', 
                     lineHeight: 1.4 
                   }}>
                     {p.name}
                   </h4>
                   
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                     <div style={{ display: 'flex', color: '#E86A24' }}>
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={14} 
                           fill={i < Math.floor(p.rating?.average || 5) ? 'currentColor' : 'none'} 
                           strokeWidth={i < Math.floor(p.rating?.average || 5) ? 0 : 2}
                         />
                       ))}
                     </div>
                     <span style={{ fontSize: '13px', color: '#8C8C8C' }}>({p.rating?.count || 0})</span>
                   </div>
                   
                   <div style={{ 
                     fontSize: '22px', 
                     fontWeight: 600, 
                     color: '#141414', 
                     marginBottom: '32px' 
                   }}>
                     {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
                   </div>
                   
                   {/* Actions */}
                   <div style={{ display: 'flex', gap: '12px' }}>
                      <button 
                        onClick={() => onNavigate?.('Product Detail', p.id)}
                        style={{ 
                          flex: 1, 
                          padding: '16px 0', 
                          border: '1px solid #EBEBEB', 
                          background: 'transparent', 
                          color: '#3A3A3A', 
                          borderRadius: '12px', 
                          fontWeight: 500, 
                          fontSize: '14px', 
                          transition: 'all 0.3s ease' 
                        }} 
                        className="hover:border-[#E86A24] hover:text-[#E86A24]"
                      >
                        Xem chi tiết
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
                        style={{ 
                        padding: '16px 24px', 
                        background: '#E86A24', 
                        color: '#FFF', 
                        border: 'none', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        transition: 'all 0.3s ease' 
                      }} 
                      className="hover:bg-[#d45d1d] hover:shadow-[0_4px_16px_rgba(232,106,36,0.3)]"
                      >
                        <ShoppingCart size={18} />
                      </button>
                   </div>
                 </div>

                 <style>{`
                   .product-card:hover {
                     box-shadow: 0 16px 48px rgba(0,0,0,0.06) !important;
                     background: #FFFFFF !important;
                     z-index: 2;
                   }
                 `}</style>
               </div>
            ))}
          </div>
        </section>

        {/* ── PHÂN TRANG ── */}
        <section style={{ paddingBottom: '120px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF', border: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#3A3A3A' }} className="hover:border-[#E86A24] hover:text-[#E86A24]">
            <ChevronLeft size={20} />
          </button>
          
          {[1, 2, 3, 4].map(page => (
            <button key={page} style={{ 
              width: '48px', height: '48px', borderRadius: '50%', 
              background: page === 1 ? '#E86A24' : '#FFF', 
              border: page === 1 ? '1px solid #E86A24' : '1px solid #EBEBEB', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: 'pointer', transition: 'all 0.3s ease', 
              color: page === 1 ? '#FFF' : '#3A3A3A',
              fontSize: '15px', fontWeight: 500
            }} className={`hover:border-[#E86A24] ${page !== 1 && 'hover:text-[#E86A24]'}`}>
              {page}
            </button>
          ))}

          <button style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF', border: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#3A3A3A' }} className="hover:border-[#E86A24] hover:text-[#E86A24]">
            <ChevronRight size={20} />
          </button>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>

    </div>
  )
}
