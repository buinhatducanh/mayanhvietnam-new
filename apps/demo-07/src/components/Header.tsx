'use client';

import { useState, useEffect, useRef } from 'react';

const navLinks = [
  {
    label: 'Máy Ảnh',
    children: [
      { label: 'Máy Ảnh Mirrorless', href: '/category' },
      { label: 'Máy Ảnh DSLR', href: '/category' },
      { label: 'Máy Ảnh Compact', href: '/category' },
      { label: 'Máy Ảnh Cine', href: '/category' },
    ],
  },
  {
    label: 'Ống Kính',
    children: [
      { label: 'Ống Kính Sony', href: '/category' },
      { label: 'Ống Kính Canon', href: '/category' },
      { label: 'Ống Kính Nikon', href: '/category' },
      { label: 'Ống Kính Sigma', href: '/category' },
    ],
  },
  { label: 'Phụ Kiện', href: '/category' },
  { label: 'Khuyến Mãi', href: '/category' },
  { label: 'Blog', href: '/blog' },
];

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  // On home page, start hidden. On inner pages, start visible.
  const [visible, setVisible] = useState(!isHomePage);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // If we navigate to a new page, reset visibility properly
    if (!isHomePage) {
      setVisible(true);
    }
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (isHomePage) {
        if (currentScrollY <= 10) {
          // At the very top of home page → hide (hero covers full screen)
          setVisible(false);
        } else if (currentScrollY < lastScrollYRef.current - 5) {
          // Scrolling UP → show header
          setVisible(true);
        } else if (currentScrollY > lastScrollYRef.current + 5) {
          // Scrolling DOWN → hide header
          setVisible(false);
        }
      } else {
        // Inner pages: always visible.
        setVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  return (
    <>
      {/* Main Header — fixed, hidden by default, appears on scroll-up */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.0)',
          backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(0,48,135,0.10)' : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, box-shadow 0.3s ease',
          willChange: 'transform, opacity',
        }}
      >
        <div className="container-xl" style={{ display: 'flex', alignItems: 'center', gap: 32, height: 70 }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38,
                background: 'linear-gradient(135deg, #003087, #005EB8)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="14" rx="3" stroke="white" strokeWidth="1.8"/>
                  <circle cx="12" cy="13" r="3.5" stroke="white" strokeWidth="1.8"/>
                  <path d="M7 6V5a2 2 0 012-2h2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="18.5" cy="9.5" r="1" fill="white"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#003087', lineHeight: 1 }}>Camera</div>
                <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#005EB8', letterSpacing: '0.08em', lineHeight: 1 }}>VIỆT NAM</div>
              </div>
            </div>
          </a>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: 480 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="search"
                placeholder="Tìm kiếm máy ảnh, ống kính, phụ kiện..."
                style={{
                  width: '100%',
                  height: 42,
                  paddingLeft: 44,
                  paddingRight: 16,
                  border: '1.5px solid #D2D8E8',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  color: '#1A2444',
                  background: '#F8FAFF',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = '#005EB8')}
                onBlur={e => (e.target.style.borderColor = '#D2D8E8')}
              />
              <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6B7A99' }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map((link, i) => (
              <div key={i}
                style={{ position: 'relative' }}
                onMouseEnter={() => link.children && setActiveDropdown(i)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href || '#'}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '8px 14px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#1A2444',
                    textDecoration: 'none',
                    borderRadius: 6,
                    transition: 'color 0.2s, background 0.2s',
                    background: activeDropdown === i ? '#E8F1FB' : 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#003087';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#1A2444';
                  }}
                >
                  {link.label}
                  {link.children && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 4l4 4 4-4"/>
                    </svg>
                  )}
                </a>
                {link.children && activeDropdown === i && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: '#fff',
                    border: '1px solid #E9EDF5',
                    borderRadius: 10,
                    boxShadow: '0 8px 32px rgba(0,48,135,0.14)',
                    minWidth: 200,
                    padding: '8px 0',
                    zIndex: 100,
                  }}>
                    {link.children.map((child, j) => (
                      <a key={j} href={child.href}
                        style={{
                          display: 'block',
                          padding: '10px 20px',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#374161',
                          textDecoration: 'none',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = '#E8F1FB';
                          (e.currentTarget as HTMLElement).style.color = '#003087';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = '#374161';
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Wishlist */}
            <a href="/wishlist" style={{ display: 'inline-block', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#374161', borderRadius: 8, transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8F1FB')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              aria-label="Danh sách yêu thích">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </a>
            {/* Cart */}
            <a href="/cart" style={{ position: 'relative', display: 'inline-block', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#374161', borderRadius: 8, transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8F1FB')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              aria-label="Giỏ hàng">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 16, height: 16,
                background: '#003087', color: '#fff',
                borderRadius: '50%', fontSize: '0.625rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>3</span>
            </a>
            {/* Account */}
            <a href="/login" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem', textDecoration: 'none' }}>
              Đăng Nhập
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
