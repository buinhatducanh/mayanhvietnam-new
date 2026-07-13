import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const categories = ['Tất cả', 'Máy ảnh', 'Ống kính', 'Flycam', 'Action Camera', 'Phụ kiện', 'Bài viết']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [query, setQuery] = useState(q)

  const results = q
    ? products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()))
    : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams({ q: query })
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>Tìm Kiếm{q ? `: "${q}"` : ''}</span>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ marginBottom: 32 }}>
          <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm kiếm máy ảnh, ống kính, flycam..."
              style={{
                width: '100%', padding: '16px 56px 16px 20px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 16, color: '#fff', fontSize: 16, outline: 'none', fontFamily: 'Inter'
              }}
            />
            <button type="submit" style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', border: 'none',
              borderRadius: 10, padding: '8px 16px', cursor: 'pointer', color: '#fff', fontSize: 16
            }}>🔍</button>
          </div>
        </form>

        {q && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-soft)', marginBottom: 24, fontSize: 14 }}>
            Tìm thấy <strong style={{ color: 'var(--color-accent)' }}>{results.length}</strong> kết quả cho "{q}"
          </p>
        )}

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 18px', borderRadius: 20, border: `1px solid ${activeCategory === cat ? 'var(--color-secondary)' : 'rgba(255,255,255,0.12)'}`,
              background: activeCategory === cat ? 'rgba(227,30,36,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeCategory === cat ? 'var(--color-secondary)' : 'var(--color-text-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer'
            }}>{cat}</button>
          ))}
        </div>

        {/* Results */}
        {!q ? (
          <div style={{ textAlign: 'center', padding: '40px 0 24px' }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 20, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 24 }}>Sản Phẩm Phổ Biến</h2>
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 8 }}>Không tìm thấy kết quả</h2>
            <p style={{ color: 'var(--color-text-soft)', marginBottom: 24 }}>Hãy thử từ khóa khác hoặc xem danh mục sản phẩm</p>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 600, color: 'var(--color-text-strong)', marginBottom: 20 }}>Có thể bạn muốn tìm:</h3>
          </div>
        ) : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {(results.length > 0 ? results : products).map(p => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  )
}
