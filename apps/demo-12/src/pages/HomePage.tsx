import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import HeroSlider from '../components/HeroSlider'
import { products, getProductsByCategory } from '../data/products'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Máy Ảnh',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    slug: 'may-anh',
    count: '120+',
    color: '#FF6B00'
  },
  {
    name: 'Ống Kính',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    slug: 'ong-kinh',
    count: '200+',
    color: '#FF8A3C'
  },
  {
    name: 'Flycam',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" />
        <path d="M12 9v10" />
        <path d="M8 12l-2 2a4 4 0 0 0 5.66 5.66L12 19" />
        <path d="M16 12l2 2a4 4 0 0 1-5.66 5.66L12 19" />
      </svg>
    ),
    slug: 'flycam',
    count: '45+',
    color: '#0EA5E9'
  },
  {
    name: 'Action Camera',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M22 12h-2" />
        <path d="M4 12H2" />
      </svg>
    ),
    slug: 'action-camera',
    count: '30+',
    color: '#10B981'
  },
  {
    name: 'Máy Quay',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    slug: 'may-quay',
    count: '60+',
    color: '#8B5CF6'
  },
  {
    name: 'Thiết Bị Studio',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21c.5-3 3.5-3 5-3s4.5 0 5 3" />
        <circle cx="12" cy="12" r="4" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    slug: 'studio',
    count: '80+',
    color: '#F59E0B'
  },
  {
    name: 'Phụ Kiện',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="15" r="1" />
        <circle cx="15" cy="15" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="12" cy="9" r="1" />
        <circle cx="12" cy="5" r="1" />
        <path d="M12 2a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" />
      </svg>
    ),
    slug: 'phu-kien',
    count: '500+',
    color: '#EC4899'
  },
  {
    name: 'Máy Cũ',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    slug: 'may-cu',
    count: '150+',
    color: '#6B7280'
  },
]

const brands = [
  { name: 'Canon', color: '#FF6B00', bg: 'rgba(255,107,0,0.08)' },
  { name: 'Sony', color: '#1A1A1A', bg: 'rgba(26,26,26,0.06)' },
  { name: 'Nikon', color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)' },
  { name: 'DJI', color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
  { name: 'GoPro', color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
  { name: 'Insta360', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
  { name: 'Sigma', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  { name: 'Fujifilm', color: '#EC4899', bg: 'rgba(236,72,153,0.08)' },
  { name: 'Tamron', color: '#06B6D4', bg: 'rgba(6,182,212,0.08)' },
  { name: 'Godox', color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
]

const testimonials = [
  { name: 'Nguyễn Văn Minh', role: 'Nhiếp ảnh gia chuyên nghiệp', text: 'Mua Sony A7 IV tại đây, sản phẩm chính hãng, nhân viên tư vấn nhiệt tình. Giá tốt nhất thị trường!', rating: 5 },
  { name: 'Trần Thị Lan', role: 'Youtuber / Content Creator', text: 'Dịch vụ lắp phông studio tuyệt vời. Đội ngũ chuyên nghiệp, lắp đặt nhanh chóng, giá hợp lý.', rating: 5 },
  { name: 'Phạm Hoàng Nam', role: 'Drone Pilot / Filmmaker', text: 'Mua DJI Mini 4 Pro, có tư vấn bay thử tại shop. Chế độ bảo hành rõ ràng, rất tin tưởng.', rating: 5 },
]

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from('.category-grid', {
      scrollTrigger: {
        trigger: '.category-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.product-grid', {
      scrollTrigger: {
        trigger: '.product-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    })

    gsap.from('.brand-grid', {
      scrollTrigger: {
        trigger: '.brand-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
  }, [])

  // Lọc sản phẩm theo danh mục
  const flycamProducts = getProductsByCategory('flycam').slice(0, 4)
  const actionProducts = getProductsByCategory('action-camera').slice(0, 4)
  const flycamAndAction = [...flycamProducts, ...actionProducts].slice(0, 8)

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <HeroSlider />

      <div style={{
        background: 'rgba(255,107,0,0.04)',
        borderTop: '1px solid rgba(255,107,0,0.08)',
        borderBottom: '1px solid rgba(255,107,0,0.08)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          {[
            ['🛡️', 'Bảo hành chính hãng', '12-24 tháng'],
            ['🚚', 'Giao hàng toàn quốc', 'Trong 24h'],
            ['💳', 'Trả góp 0% lãi', '3-12 tháng'],
            ['🔄', 'Đổi trả dễ dàng', '30 ngày']
          ].map(([icon, title, sub]) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans' }}>
                  {title}
                </div>
                <div style={{ fontSize: 11, color: '#666666' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 800, color: '#1A1A1A', marginBottom: 8 }}>
            Danh Mục Sản Phẩm
          </h2>
          <p style={{ color: '#666666', fontSize: 16 }}>Khám phá hàng ngàn sản phẩm chính hãng</p>
        </div>
        <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {categories.map(cat => (
            <Link key={cat.slug} to={`/danh-muc/${cat.slug}`} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.05,
                  rotate: 2.5,
                  borderColor: cat.color + '80',
                  boxShadow: `0 12px 32px ${cat.color}15`
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  background: '#F8F6F3',
                  border: '1px solid #E8E4DE',
                  borderRadius: 16,
                  padding: 24,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div style={{
                  fontSize: 32,
                  marginBottom: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  color: cat.color,
                  width: '100%',
                  height: 44,
                }}>
                  {cat.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans', marginBottom: 4 }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: 12, color: cat.color }}>{cat.count} sản phẩm</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>
              Sản Phẩm Nổi Bật
            </h2>
            <p style={{ color: '#666666', fontSize: 15 }}>Được yêu thích và đánh giá cao nhất</p>
          </div>
          <Link
            to="/danh-muc/may-anh"
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              textDecoration: 'none',
              border: '1px solid #FF6B00',
              color: '#FF6B00',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FF6B00'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#FF6B00'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {products.slice(0, 8).map(p => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* Studio Service Banner */}
      <section style={{ maxWidth: 1200, margin: '64px auto 0', padding: '0 24px' }}>
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #404040 100%)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            backgroundImage: 'url(https://mayanhvietnam.com/asset/imgs/img/danhMuc_setupPhong.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(26,26,26,0.92) 0%, rgba(45,45,45,0.85) 50%, rgba(64,64,64,0.7) 100%)',
          }} />

          <div style={{
            position: 'relative',
            padding: '48px 56px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                padding: '4px 16px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                Dịch vụ đặc biệt
              </div>

              <h3 style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 36,
                fontWeight: 800,
                color: '#fff',
                marginBottom: 12,
                lineHeight: 1.2,
              }}>
                Lắp Đặt Phòng Studio <br />
                <span style={{
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Chuyên Nghiệp</span>
              </h3>

              <p style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: 24,
                lineHeight: 1.7,
                maxWidth: '90%',
              }}>
                Từ tư vấn thiết kế đến lắp đặt hoàn thiện, chúng tôi mang đến giải pháp phòng studio
                tối ưu cho mọi nhu cầu chụp ảnh và quay phim chuyên nghiệp.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginBottom: 28,
              }}>
                {[
                  { icon: '🎯', label: 'Tư vấn miễn phí', desc: 'Đội ngũ chuyên gia giàu kinh nghiệm' },
                  { icon: '📐', label: 'Thiết kế riêng biệt', desc: 'Phù hợp với không gian của bạn' },
                  { icon: '⚡', label: 'Lắp đặt nhanh chóng', desc: 'Hoàn thiện trong 3-5 ngày' },
                  { icon: '🛠️', label: 'Bảo trì trọn đời', desc: 'Hỗ trợ kỹ thuật 24/7' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/dich-vu-phong-studio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 36px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 15,
                  fontFamily: 'Plus Jakarta Sans',
                  boxShadow: '0 8px 24px rgba(255,107,0,0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.3)'
                }}
              >
                Nhận tư vấn ngay
                <span style={{ fontSize: 18 }}>→</span>
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}>
              {[
                { number: '150+', label: 'Dự án đã hoàn thành', icon: '🏗️' },
                { number: '98%', label: 'Khách hàng hài lòng', icon: '⭐' },
                { number: '24/7', label: 'Hỗ trợ kỹ thuật', icon: '🔄' },
                { number: '5⭐', label: 'Đánh giá cao nhất', icon: '🏆' },
              ].map((stat, idx) => (
                <div key={idx} style={{
                  padding: '20px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Plus Jakarta Sans',
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FLYCAM & ACTION CAMERA - ĐÃ SỬA ============ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A1A1A' }}>
              Flycam & Action Camera
            </h2>
            <p style={{ color: '#666666', fontSize: 14, marginTop: 4 }}>
              Thiết bị bay và camera hành động chính hãng
            </p>
          </div>
          <Link
            to="/danh-muc/flycam"
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              textDecoration: 'none',
              border: '1px solid #FF6B00',
              color: '#FF6B00',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FF6B00'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#FF6B00'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {flycamAndAction.length > 0 ? (
            flycamAndAction.map(p => (
              <ProductCard key={p.id} {...p} />
            ))
          ) : (
            // Fallback nếu không có sản phẩm
            products.slice(8, 16).map(p => (
              <ProductCard key={p.id} {...p} />
            ))
          )}
        </div>
      </section>

      {/* Brands */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: '#1A1A1A', textAlign: 'center', marginBottom: 12 }}>
          Thương Hiệu Phân Phối
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#666666',
          fontSize: 15,
          marginBottom: 40
        }}>
          Các thương hiệu camera và thiết bị nhiếp ảnh hàng đầu thế giới
        </p>
        <div className="brand-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 16,
          alignItems: 'center'
        }}>
          {brands.map((brand) => (
            <div
              key={brand.name}
              style={{
                background: brand.bg,
                border: `1px solid ${brand.color}20`,
                borderRadius: 14,
                padding: '20px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
                height: '64px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = brand.color
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = `0 12px 32px ${brand.color}20`
                el.style.background = brand.color + '15'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = brand.color + '20'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
                el.style.background = brand.bg
              }}
            >
              <span style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 15,
                fontWeight: 700,
                color: brand.color,
                letterSpacing: '0.02em',
              }}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        background: 'linear-gradient(135deg, #F8F6F3 0%, #F0EDE8 100%)',
        borderTop: '1px solid #E8E4DE',
        borderBottom: '1px solid #E8E4DE',
        padding: '64px 24px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: '#1A1A1A', textAlign: 'center', marginBottom: 40 }}>
            Khách Hàng Nói Gì?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E8E4DE',
                  borderRadius: 16,
                  padding: 28
                }}
              >
                <div style={{ color: '#FF6B00', fontSize: 16, marginBottom: 12 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontSize: 15, color: '#666666', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff'
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#999999' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}