import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const categories = [
  { name: 'Máy Ảnh', slug: 'may-anh' },
  { name: 'Ống Kính', slug: 'ong-kinh' },
  { name: 'Máy Quay', slug: 'may-quay' },
  { name: 'Action Camera', slug: 'action-camera' },
  { name: 'Flycam', slug: 'flycam' },
  { name: 'Studio', slug: 'studio' },
  { name: 'Phụ Kiện', slug: 'phu-kien' },
  { name: 'Máy Cũ', slug: 'may-cu' },
]

export default function Header() {
  const [search, setSearch] = useState('')
  const [cartCount] = useState(2)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) navigate(`/tim-kiem?q=${encodeURIComponent(search)}`)
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
    }}>
      {/* Top Bar */}
      <div style={{
        backgroundColor: '#1A1A1A',
        padding: isScrolled ? '0 24px' : '8px 24px',
        height: isScrolled ? 0 : 'auto',
        opacity: isScrolled ? 0 : 1,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Inter',
        width: '100%',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 500
        }}>
          <span>🎁 Mua hàng online - Giao toàn quốc - Hỗ trợ trả góp 0%</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>📞 1900 1234</span>
            <Link to="/he-thong-cua-hang" style={{ color: '#fff', textDecoration: 'none' }}>Hệ thống cửa hàng</Link>
            <Link to="/tra-gop" style={{ color: '#fff', textDecoration: 'none' }}>Trả góp</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="glass-dark" style={{
        padding: isScrolled ? '8px 24px' : '16px 24px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.15)' : 'none',
        width: '100%',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
              }}>📷</div>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1 }}>
                  Máy Ảnh
                </div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 16, lineHeight: 1 }}
                  className="gradient-text">Việt Nam</div>
              </div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 500, minWidth: 200 }}>
            <div style={{ position: 'relative' }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm máy ảnh, ống kính, flycam..."
                style={{
                  width: '100%', padding: '10px 44px 10px 16px',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none',
                  fontFamily: 'Inter'
                }}
              />
              <button type="submit" style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                border: 'none',
                borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: '#fff', fontSize: 14
              }}>🔍</button>
            </div>
          </form>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <Link to="/tai-khoan" style={{ color: '#aaa', textDecoration: 'none', fontSize: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 20 }}>👤</span>
              <span style={{ fontSize: 11 }}>Tài khoản</span>
            </Link>
            <Link to="/so-sanh" style={{ color: '#aaa', textDecoration: 'none', fontSize: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 20 }}>⚖️</span>
              <span style={{ fontSize: 11 }}>So sánh</span>
            </Link>
            <Link to="/gio-hang" style={{ position: 'relative', color: '#aaa', textDecoration: 'none', fontSize: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 20 }}>🛒</span>
              <span style={{ fontSize: 11 }}>Giỏ hàng</span>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  background: '#FF6B00', color: '#fff', borderRadius: '50%',
                  width: 18, height: 18, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                }}>{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Nav Categories */}
      <nav style={{
        backgroundColor: '#1A1A1A',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px',
        width: '100%',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          justifyContent: 'flex-start',
        }}>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/danh-muc/${cat.slug}`}
              style={{
                padding: '12px 18px',
                color: '#CBD5E0',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                const target = e.currentTarget
                target.style.color = '#FF8A3C'
                target.style.borderBottomColor = '#FF6B00'
                target.style.background = 'rgba(255,255,255,0.04)'
              }}
              onMouseLeave={e => {
                const target = e.currentTarget
                target.style.color = '#CBD5E0'
                target.style.borderBottomColor = 'transparent'
                target.style.background = 'transparent'
              }}
            >
              {cat.name}
            </Link>
          ))}

          <Link
            to="/dich-vu-phong-studio"
            style={{
              padding: '12px 18px',
              background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              borderBottom: '2px solid transparent',
              transition: 'all 0.2s ease',
              fontFamily: 'Inter, sans-serif',
              position: 'relative',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const target = e.currentTarget
              target.style.borderBottomColor = '#FF6B00'
              target.style.background = 'rgba(255,255,255,0.04)'
            }}
            onMouseLeave={e => {
              const target = e.currentTarget
              target.style.borderBottomColor = 'transparent'
              target.style.background = 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)'
              target.style.WebkitBackgroundClip = 'text'
              target.style.WebkitTextFillColor = 'transparent'
              target.style.backgroundClip = 'text'
            }}
          >
            ✨ Dịch vụ Studio
          </Link>
        </div>
      </nav>
    </header>
  )
}