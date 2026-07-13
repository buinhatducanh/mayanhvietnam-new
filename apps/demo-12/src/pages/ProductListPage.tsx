import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const categoryNames: Record<string, string> = {
  'may-anh': 'Máy Ảnh', 'ong-kinh': 'Ống Kính', 'flycam': 'Flycam',
  'action-camera': 'Action Camera', 'may-quay': 'Máy Quay',
  'studio': 'Thiết Bị Studio', 'phu-kien': 'Phụ Kiện', 'may-cu': 'Máy Cũ',
}

const brands = ['Tất cả', 'Canon', 'Sony', 'Nikon', 'DJI', 'GoPro', 'Godox', 'Insta360', 'Sigma']
const sortOptions = [
  { value: 'popular', label: 'Phổ biến nhất' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'rating', label: 'Đánh giá cao' },
]

export default function ProductListPage() {
  const { slug } = useParams<{ slug: string }>()
  const [selectedBrand, setSelectedBrand] = useState('Tất cả')
  const [sort, setSort] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 100000000])
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const catName = categoryNames[slug || ''] || 'Sản Phẩm'

  let filtered = products.filter(p => !slug || p.categorySlug === slug)
  if (selectedBrand !== 'Tất cả') filtered = filtered.filter(p => p.brand === selectedBrand)
  filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>{catName}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
          {/* Sidebar filters */}
          <div>
            <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 16 }}>Thương Hiệu</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {brands.map(brand => (
                  <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <input
                      type="radio" name="brand" value={brand}
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      style={{ accentColor: 'var(--color-secondary)' }}
                    />
                    <span style={{ fontSize: 14, color: selectedBrand === brand ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 16 }}>Khoảng Giá</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[[0, 5000000, 'Dưới 5 triệu'], [5000000, 15000000, '5 - 15 triệu'], [15000000, 30000000, '15 - 30 triệu'], [30000000, 60000000, '30 - 60 triệu'], [60000000, 100000000, 'Trên 60 triệu']].map(([min, max, label]) => (
                  <label key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <input type="radio" name="price" onChange={() => setPriceRange([min as number, max as number])} style={{ accentColor: 'var(--color-secondary)' }} />
                    <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>{label as string}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 16 }}>Danh Mục Khác</h3>
              {Object.entries(categoryNames).map(([slug, name]) => (
                <Link key={slug} to={`/danh-muc/${slug}`} style={{
                  display: 'block', fontSize: 14, color: 'var(--color-text-muted)', textDecoration: 'none',
                  padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-accent)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--color-text-muted)'}
                >{name}</Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 4 }}>{catName}</h1>
                <p style={{ fontSize: 14, color: 'var(--color-text-soft)' }}>{filtered.length} sản phẩm</p>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <select
                  value={sort} onChange={e => setSort(e.target.value)}
                  style={{ padding: '8px 12px', background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: 'var(--color-text-strong)', fontSize: 13 }}
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div style={{ display: 'flex', gap: 4 }}>
                  {(['grid', 'list'] as const).map(v => (
                    <button key={v} onClick={() => setView(v)} style={{
                      padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)',
                      background: view === v ? 'rgba(227,30,36,0.2)' : 'var(--color-card-bg)',
                      color: view === v ? 'var(--color-secondary)' : 'var(--color-text-soft)', cursor: 'pointer', fontSize: 14
                    }}>{v === 'grid' ? '⊞' : '≡'}</button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-soft)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p style={{ fontSize: 18, marginBottom: 8, color: 'var(--color-text-muted)', fontFamily: 'Plus Jakarta Sans' }}>Không tìm thấy sản phẩm</p>
                <p style={{ fontSize: 14 }}>Thử điều chỉnh bộ lọc hoặc <Link to="/" style={{ color: 'var(--color-accent)' }}>về trang chủ</Link></p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {filtered.map(p => <ProductCard key={p.id} {...p} />)}
                {/* Pad with more products for demo */}
                {filtered.length < 6 && products.map(p => <ProductCard key={p.id + 100} {...p} slug={p.slug + '-2'} />).slice(0, 6 - filtered.length)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
