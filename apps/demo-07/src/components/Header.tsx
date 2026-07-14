'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { REAL_ASSETS, REAL_CATEGORIES } from '@/lib/real-products';

const NAV_CATEGORIES = REAL_CATEGORIES.filter(
  (category) => !category.slug.startsWith('san-pham-')
);

const TOP_NAV = [
  { label: 'Xem tất cả', href: '/category' },
  { label: 'Sản phẩm mới', href: '/category?filter=new' },
  { label: 'Sản phẩm cũ', href: '/category?filter=used' },
];

const HOTLINE = '0937.148.222';

const categoryHref = (slug: string) => `/category?category=${encodeURIComponent(slug)}`;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setActiveCategory(query.get('category') ?? '');
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() => {
      drawerRef.current?.querySelector<HTMLElement>('button, a')?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-primary-surface">
          <div className="container-xl header-primary">
            <button
              ref={menuButtonRef}
              type="button"
              className="header-menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở menu"
              aria-controls="mobile-navigation"
              aria-expanded={mobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <a href="/" className="header-logo" aria-label="Máy Ảnh Việt Nam - Trang chủ">
              <img src={REAL_ASSETS.logoFull} alt="Máy Ảnh Việt Nam" />
            </a>

            <form action="/category" method="get" role="search" className="header-search">
              <div className="header-search-field">
                <svg className="header-search-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  name="q"
                  aria-label="Tìm kiếm sản phẩm"
                  className="header-search-input"
                  placeholder="Tìm máy ảnh, ống kính, phụ kiện..."
                />
                <button type="submit" className="header-search-button">
                  Tìm kiếm
                </button>
              </div>
            </form>

            <div className="header-actions" aria-label="Tiện ích mua sắm">
              <a href={`tel:+84${HOTLINE.replace(/\./g, '')}`} className="header-action-link header-phone" aria-label={`Gọi ${HOTLINE}`}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .91h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006.18 6.18l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span className="header-hotline-number">{HOTLINE}</span>
              </a>

              <a href="/wishlist" className="header-action-link header-wishlist" aria-label="Danh sách yêu thích">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                <span className="header-action-text">Yêu thích</span>
              </a>

              <a href="/cart" className="header-action-link header-cart" aria-label="Giỏ hàng, chưa có sản phẩm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="header-action-text">Giỏ hàng</span>
                <span className="header-cart-count" aria-hidden="true">0</span>
              </a>

              <a href="/login" className="header-login-link">
                Đăng nhập
              </a>
            </div>
          </div>
        </div>

        <div className="header-secondary">
          <div className="container-xl header-category-scroll">
            <nav className="header-category-nav" aria-label="Danh mục sản phẩm">
              {NAV_CATEGORIES.map((category) => (
                <a
                  key={category.slug}
                  href={categoryHref(category.slug)}
                  className="header-nav-link"
                  aria-current={activeCategory === category.slug ? 'page' : undefined}
                >
                  {category.name}
                </a>
              ))}
            </nav>

            <nav className="header-quick-nav" aria-label="Liên kết nhanh">
              {TOP_NAV.map((item) => (
                <a key={item.label} href={item.href} className="header-quick-link">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <button type="button" className="header-drawer-overlay" onClick={closeDrawer} aria-label="Đóng menu" />
          <aside
            ref={drawerRef}
            id="mobile-navigation"
            className="header-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
          >
            <div className="header-drawer-head">
              <img src={REAL_ASSETS.logoFull} alt="Máy Ảnh Việt Nam" />
              <button type="button" className="header-drawer-close" onClick={closeDrawer} aria-label="Đóng menu">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="header-drawer-content">
              <a href={`tel:+84${HOTLINE.replace(/\./g, '')}`} className="header-drawer-link header-drawer-hotline">
                <span>Hotline tư vấn</span>
                <strong>{HOTLINE}</strong>
              </a>

              <span className="header-drawer-section-label">Danh mục sản phẩm</span>
              <nav aria-label="Danh mục sản phẩm trên di động">
                {NAV_CATEGORIES.map((category) => (
                  <a
                    key={category.slug}
                    href={categoryHref(category.slug)}
                    className="header-drawer-link"
                    aria-current={activeCategory === category.slug ? 'page' : undefined}
                    onClick={closeDrawer}
                  >
                    <span>{category.name}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
              </nav>

              <span className="header-drawer-section-label">Mua sắm nhanh</span>
              <nav aria-label="Liên kết mua sắm nhanh">
                {TOP_NAV.map((item) => (
                  <a key={item.label} href={item.href} className="header-drawer-link" onClick={closeDrawer}>
                    <span>{item.label}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
                <a href="/wishlist" className="header-drawer-link" onClick={closeDrawer}>Sản phẩm yêu thích</a>
                <a href="/login" className="header-drawer-link" onClick={closeDrawer}>Đăng nhập / Đăng ký</a>
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
