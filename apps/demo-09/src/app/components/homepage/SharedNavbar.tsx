import { useState, useEffect } from 'react'
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Máy ảnh',    d: true  },
  { label: 'Ống kính',   d: true  },
  { label: 'Máy quay',   d: true  },
  { label: 'Action Camera', d: true  },
  { label: 'Flycam',     d: true  },
  { label: 'Thiết bị studio', d: true },
  { label: 'Phụ kiện',   d: true  },
  { label: 'Sản phẩm cũ', d: true },
  { label: 'Setup studio', d: false },
]

function NavItem({ label, hasDropdown, active, onClick }: { label: string; hasDropdown: boolean; active: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  const lit = active || hovered
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '6px 9px',
        color: lit ? '#E86A24' : '#2A2A2A',
        fontSize: '12.5px',
        fontFamily: 'var(--font-body)',
        fontWeight: active ? 600 : 500,
        background: 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid #E86A24' : '2px solid transparent',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        borderRadius: active ? '0' : '4px',
        marginBottom: active ? '-1px' : '0',
        transition: 'color 0.18s ease, background 0.18s ease',
      }}
    >
      {label}
      {hasDropdown && (
        <ChevronDown
          size={11}
          style={{ color: lit ? '#E86A24' : '#BBBBBB', marginTop: '1px', transition: 'color 0.18s ease' }}
        />
      )}
    </button>
  )
}

export function SharedNavbar({ 
  activeItem = 'Trang chủ',
  onNavigate,
  cartCount = 0
}: { 
  activeItem?: string,
  onNavigate?: (label: string) => void,
  cartCount?: number
}) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1100)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const iconStyle = (name: string) => ({
    background: hoveredIcon === name ? 'rgba(232, 106, 36, 0.1)' : 'transparent',
    border: '1.5px solid rgba(232, 106, 36, 0.25)',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#E86A24',
    padding: isMobile ? '8px 10px' : '7px 9px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.18s ease',
  })

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '0 20px' : '0 40px',
          gap: '0',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        }}
      >
        {/* ── LOGO ─────────────────────────────────────────── */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            onNavigate?.('Trang chủ');
            const container = document.getElementById('scroll-container');
            if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          style={{ textDecoration: 'none', flexShrink: 0, marginRight: isMobile ? '0' : '28px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <div style={{
            width: '36px', height: '36px',
            background: '#3B7DD8', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <div style={{ lineHeight: 1.05 }}>
            <div style={{
              color: '#E86A24',
              fontFamily: 'var(--font-display)',
              fontSize: '15px',
              fontWeight: 900,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}>
              Máy Ảnh
            </div>
            <div style={{
              color: '#2A2A2A',
              fontFamily: 'var(--font-display)',
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}>
              Việt Nam
            </div>
          </div>
        </a>

        {/* ── CENTER NAVIGATION (DESKTOP) ───────────────────── */}
        {!isMobile && (
          <nav style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            height: '100%',
          }}>
            {NAV_ITEMS.map(({ label, d }) => (
              <NavItem 
                key={label} 
                label={label} 
                hasDropdown={d} 
                active={label === activeItem} 
                onClick={() => onNavigate?.(label)}
              />
            ))}
          </nav>
        )}

        {/* ── RIGHT: search + cart + user + mobile menu ─────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '10px', flexShrink: 0, marginLeft: isMobile ? 'auto' : 0 }}>
          
          {/* Search bar (Desktop) */}
          {!isMobile && (
            <div style={{ position: 'relative' }}>
              <Search
                size={13}
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#E86A24',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Tìm máy ảnh, ống kính..."
                style={{
                  width: '230px',
                  height: '38px',
                  paddingLeft: '33px',
                  paddingRight: '12px',
                  background: 'rgba(255, 255, 255, 0.75)',
                  border: '1.5px solid rgba(232, 106, 36, 0.22)',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  color: '#2A2A2A',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#E86A24'
                  e.currentTarget.style.background = '#FFFFFF'
                }}
                onBlur={e  => {
                  e.currentTarget.style.borderColor = 'rgba(232, 106, 36, 0.22)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)'
                }}
              />
            </div>
          )}

          {/* User Account */}
          {!isMobile && (
            <button
              style={iconStyle('user')}
              onMouseEnter={() => setHoveredIcon('user')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <User size={17} />
            </button>
          )}

          {/* Cart */}
          <button
            style={{ ...iconStyle('cart'), position: 'relative' }}
            onClick={() => onNavigate?.('Giỏ hàng')}
            onMouseEnter={() => setHoveredIcon('cart')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <ShoppingCart size={isMobile ? 19 : 17} />
            {cartCount > 0 && (
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#E86A24',
                color: '#FFF',
                fontSize: '10px',
                fontWeight: 700,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(232,106,36,0.3)',
                animation: 'sf-fade-up 0.3s cubic-bezier(0.16,1,0.3,1)'
              }}>
                {cartCount}
              </div>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#141414',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Menu size={28} />
            </button>
          )}
        </div>
      </header>

      {/* ── MOBILE FULLSCREEN MENU OVERLAY ─────────────────── */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: '#FFF',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          animation: 'sf-fade-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Header */}
          <div style={{ 
            height: '72px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '0 20px', 
            borderBottom: '1px solid rgba(0,0,0,0.05)' 
          }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#E86A24', letterSpacing: '0.1em', fontFamily: 'var(--font-display)' }}>
              MÁY ẢNH VIỆT NAM
            </span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <X size={28} color="#141414" />
            </button>
          </div>
          
          {/* Mobile Search */}
          <div style={{ padding: '24px 20px 12px 20px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#E86A24' }} />
              <input 
                type="text" 
                placeholder="Tìm máy ảnh, ống kính..." 
                style={{ 
                  width: '100%', 
                  padding: '14px 14px 14px 44px', 
                  background: '#F8F8F8', 
                  border: '1px solid rgba(0,0,0,0.04)', 
                  borderRadius: '12px', 
                  fontSize: '15px', 
                  outline: 'none',
                  fontFamily: 'var(--font-body)'
                }} 
              />
            </div>
          </div>

          {/* Mobile Nav Items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 40px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {NAV_ITEMS.map(({ label, d }) => (
              <button
                key={label}
                onClick={() => {
                  onNavigate?.(label);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '18px 20px', 
                  background: label === activeItem ? 'rgba(232, 106, 36, 0.08)' : '#FAFAF8',
                  border: '1px solid',
                  borderColor: label === activeItem ? 'rgba(232, 106, 36, 0.2)' : 'transparent',
                  borderRadius: '14px',
                  color: label === activeItem ? '#E86A24' : '#141414',
                  fontSize: '15.5px', 
                  fontWeight: label === activeItem ? 600 : 500,
                  textAlign: 'left', 
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease'
                }}
              >
                {label}
                {d && <ChevronDown size={18} style={{ color: label === activeItem ? '#E86A24' : '#BBBBBB' }} />}
              </button>
            ))}

            {/* Mobile User Login/Account link at bottom */}
            <button
              style={{
                marginTop: '16px',
                display: 'flex', 
                alignItems: 'center',
                gap: '12px',
                padding: '18px 20px', 
                background: 'transparent',
                border: '1px solid #E86A24',
                borderRadius: '14px',
                color: '#E86A24',
                fontSize: '15.5px', 
                fontWeight: 600,
                textAlign: 'left', 
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              <User size={18} /> Đăng nhập / Đăng ký
            </button>
          </div>
        </div>
      )}
    </>
  )
}
