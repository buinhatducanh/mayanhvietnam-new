import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products, getProductBySlug } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug || '') || products[0]
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('specs')
  const [activeImg, setActiveImg] = useState(0)

  const imgs = [product.image, ...products.slice(1, 4).map(p => p.image)]
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4)

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
          {/* Images */}
          <div>
            <div style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--color-card-bg)', aspectRatio: '4/3', marginBottom: 12 }}>
              <img src={imgs[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {imgs.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{
                  width: 72, height: 72, borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                  border: `2px solid ${activeImg === i ? 'var(--color-secondary)' : 'rgba(255,255,255,0.08)'}`
                }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 24 }}>Sản Phẩm Liên Quan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {(related.length >= 4 ? related : [...related, ...products.slice(0, 4 - related.length)]).slice(0, 4).map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
