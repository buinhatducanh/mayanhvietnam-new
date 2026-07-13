import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, getProductBySlug } from '../data/products'
import ProductCard from '../components/ProductCard'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Đánh giá Sony A7R VI: Cảm biến 61MP có đáng để nâng cấp?',
    excerpt: 'Phân tích chi tiết hiệu năng, chất lượng ảnh và khả năng quay video của flagship Sony mới nhất.',
    image: 'https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/639103051286629766-Alpha-A7R-Mark-VI-png_may-anh-sony-alpha-a7r-vi.jpg',
    category: 'Đánh giá',
    author: 'Nguyễn Minh Khoa',
    date: '10/07/2026',
    readTime: '8 phút đọc',
  },
  {
    id: 2,
    title: 'Hướng dẫn chọn ống kính cho người mới bắt đầu',
    excerpt: 'Từ prime đến zoom, từ 35mm đến 70-200mm — cách chọn ống kính phù hợp với phong cách chụp và ngân sách.',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-24-70mm-f-2-8l-is-usm-chinh-hang.jpg',
    category: 'Hướng dẫn',
    author: 'Trần Hà Linh',
    date: '08/07/2026',
    readTime: '12 phút đọc',
  },
  {
    id: 3,
    title: 'Top 10 máy ảnh mirrorless đáng mua nhất 2026',
    excerpt: 'Cập nhật danh sách máy ảnh mirrorless tốt nhất theo từng phân khúc giá — từ entry-level đến chuyên nghiệp.',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg',
    category: 'Top List',
    author: 'Nguyễn Minh Khoa',
    date: '01/07/2026',
    readTime: '15 phút đọc',
  },
  {
    id: 4,
    title: 'Kinh nghiệm chụp ảnh đêm với máy ảnh full-frame',
    excerpt: 'Bí quyết cài đặt ISO, khẩu độ và tốc độ màn trập để có bức ảnh đêm sắc nét, ít noise nhất.',
    image: 'https://mayanhvietnam.com/image-data/san-pham/23-04/23-04-19/230419151242054/avatar/canon-eos-r8-6-500x500_may-anh-canon-eos-r8-body-only.jpg',
    category: 'Kỹ thuật',
    author: 'Phạm Thị Mai',
    date: '28/06/2026',
    readTime: '7 phút đọc',
  },
  {
    id: 5,
    title: 'So sánh DJI Mavic 4 Pro vs Mavic 3 Pro: Có nên nâng cấp?',
    excerpt: 'Phân tích 7 điểm khác biệt chính giữa 2 thế hệ flycam flagship từ DJI.',
    image: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg',
    category: 'So sánh',
    author: 'Lê Quang Đức',
    date: '25/06/2026',
    readTime: '10 phút đọc',
  },
]

function getRelatedPosts(categorySlug: string): BlogPost[] {
  if (categorySlug === 'may-anh') return blogPosts.filter(p => p.id !== 2).slice(0, 3)
  if (categorySlug === 'flycam') return [blogPosts[4], blogPosts[0], blogPosts[2]].filter(Boolean).slice(0, 3)
  return blogPosts.slice(0, 3)
}

function getMultiImages(product: any): string[] {
  if (product.images && product.images.length > 1) return product.images
  const sameCategory = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3)
  return [product.image, ...sameCategory.map(p => p.image)].slice(0, 4)
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug || '') || products[0]
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('specs')
  const [activeImg, setActiveImg] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const imgs = getMultiImages(product)
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4)
  const relatedPosts = getRelatedPosts(product.categorySlug)

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <Link to={`/danh-muc/${product.categorySlug}`} style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64 }}>
          {/* Images — multi-image gallery */}
          <div>
            <div
              style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--color-card-bg)', aspectRatio: '4/3', marginBottom: 12, cursor: 'zoom-in', position: 'relative' }}
              onClick={() => setLightboxOpen(true)}
            >
              <img src={imgs[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
              <span style={{
                position: 'absolute', bottom: 12, right: 12,
                background: 'rgba(255,255,255,0.8)', borderRadius: '50%', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#1A1A1A',
              }}>🔍</span>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {imgs.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: 72, height: 72, borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                    border: `2px solid ${activeImg === i ? 'var(--color-secondary)' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.2s',
                    opacity: activeImg === i ? 1 : 0.7,
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Multi-image grid */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${imgs.length}, 1fr)`, gap: 8 }}>
              {imgs.map((img, i) => (
                <div
                  key={i}
                  onClick={() => { setActiveImg(i); setLightboxOpen(true) }}
                  style={{
                    aspectRatio: '1', borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s',
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', marginBottom: 12 }}>{product.badge}</span>
            )}
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', lineHeight: 1.3, marginBottom: 16 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#F59E0B', fontSize: 16 }}>★★★★★</span>
                <span style={{ fontSize: 14, color: 'var(--color-text-soft)' }}>{product.rating} (128 đánh giá)</span>
              </div>
              <span style={{ color: '#10B981', fontSize: 13, fontWeight: 600 }}>✓ Còn hàng</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'Plus Jakarta Sans' }}>
                {product.price.toLocaleString('vi-VN')}₫
              </div>
              {product.originalPrice && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontSize: 16, color: 'var(--color-text-soft)', textDecoration: 'line-through' }}>
                    {product.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--color-secondary)', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Quick specs */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px', marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                <div key={key} style={{ flex: '1 1 40%' }}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-soft)', marginBottom: 2 }}>{key}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-strong)' }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>−</button>
                <span style={{ padding: '10px 20px', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)', minWidth: 50, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>+</button>
              </div>
              <span style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>Còn 15 sản phẩm</span>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <button style={{
                flex: 1, padding: '14px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff',
                fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans'
              }}>🛒 Thêm vào giỏ hàng</button>
              <Link to="/thanh-toan" style={{
                flex: 1, padding: '14px', borderRadius: 12, textDecoration: 'none',
                background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.3)', color: 'var(--color-accent)',
                fontWeight: 700, fontSize: 15, textAlign: 'center', fontFamily: 'Plus Jakarta Sans',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>⚡ Mua ngay</Link>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['🛡️', 'Bảo hành chính hãng 24 tháng'], ['🚚', 'Giao hàng miễn phí trong 24h'], ['🔄', 'Đổi trả trong 30 ngày'], ['💳', 'Trả góp 0% - Duyệt nhanh']].map(([icon, text]) => (
                <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{text as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 32 }}>
            {[['specs', 'Thông số kỹ thuật'], ['description', 'Mô tả sản phẩm'], ['reviews', 'Đánh giá (128)']].map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '14px 24px', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 15,
                color: activeTab === tab ? 'var(--color-secondary)' : 'var(--color-text-soft)',
                borderBottom: `2px solid ${activeTab === tab ? 'var(--color-secondary)' : 'transparent'}`,
                marginBottom: -1
              }}>{label as string}</button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {Object.entries(product.specs).map(([key, val], i) => (
                <div key={key} style={{
                  display: 'flex', padding: '14px 20px',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
                  borderRadius: 4
                }}>
                  <span style={{ flex: 1, fontSize: 14, color: 'var(--color-text-soft)' }}>{key}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--color-text-strong)' }}>{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'description' && (
            <div style={{ maxWidth: 720 }}>
              <p style={{ fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 16 }}>{product.description}</p>
              <p style={{ fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                Sản phẩm được phân phối chính thức bởi Máy Ảnh Việt Nam, có đầy đủ tem nhãn, hộp phụ kiện gốc, bảo hành theo chính sách nhà sản xuất. Nhân viên hỗ trợ tư vấn kỹ thuật miễn phí.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {[
                { name: 'Nguyễn Văn A', rating: 5, date: '15/12/2024', text: 'Sản phẩm chính hãng, đóng gói cẩn thận. Nhân viên hỗ trợ tận tình.' },
                { name: 'Trần Thị B', rating: 5, date: '10/12/2024', text: 'Giá tốt nhất thị trường, máy đẹp như quảng cáo. Sẽ mua lại.' },
                { name: 'Lê Văn C', rating: 4, date: '05/12/2024', text: 'Giao hàng nhanh, máy hoạt động tốt. Chỉ tiếc hộp bị móp nhẹ khi vận chuyển.' },
              ].map((r, i) => (
                <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                      {r.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-strong)', marginRight: 8 }}>{r.name}</span>
                          <span style={{ color: '#F59E0B', fontSize: 13 }}>{'★'.repeat(r.rating)}</span>
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>{r.date}</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 24 }}>Sản Phẩm Liên Quan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {(related.length >= 4 ? related : [...related, ...products.slice(0, 4 - related.length)]).slice(0, 4).map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 24 }}>📰 Bài Viết Liên Quan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {relatedPosts.map(post => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'var(--color-card-bg)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
              >
                <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <span style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 700, color: 'var(--color-accent)',
                    background: 'rgba(255,107,0,0.1)', padding: '3px 10px', borderRadius: 6, marginBottom: 8
                  }}>{post.category}</span>
                  <h3 style={{
                    fontFamily: 'Plus Jakarta Sans', fontSize: 15, fontWeight: 700, color: 'var(--color-text-strong)',
                    lineHeight: 1.4, marginBottom: 8,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>{post.title}</h3>
                  <p style={{
                    fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 12,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-soft)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
            }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', zIndex: 1001 }}
            >✕</button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImg(i => (i - 1 + imgs.length) % imgs.length) }}
              style={{
                position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 28,
                width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >‹</button>
            <img
              src={imgs[activeImg]}
              alt={product.name}
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '80vh', maxWidth: '85vw', objectFit: 'contain', borderRadius: 8 }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImg(i => (i + 1) % imgs.length) }}
              style={{
                position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 28,
                width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >›</button>
            <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
              {imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                  style={{
                    width: 56, height: 56, borderRadius: 10, overflow: 'hidden', border: `2px solid ${activeImg === i ? 'var(--color-secondary)' : 'rgba(255,255,255,0.3)'}`,
                    cursor: 'pointer', opacity: activeImg === i ? 1 : 0.6,
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
