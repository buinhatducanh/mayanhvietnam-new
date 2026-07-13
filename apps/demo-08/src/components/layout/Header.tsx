'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, Aperture, Video, Activity, Navigation, Lightbulb, Layers, RefreshCw, Monitor, LogIn, LogOut, User, PackageSearch, RefreshCcw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/categories';
import { searchProducts, formatPrice } from '@/data/products';
import styles from './Header.module.css';

function CategoryIcon({ iconKey, size = 16 }: { iconKey: string; size?: number }) {
  const props = { size, strokeWidth: 2.2 };
  switch (iconKey) {
    case 'camera': return <Camera {...props} />;
    case 'aperture': return <Aperture {...props} />;
    case 'video': return <Video {...props} />;
    case 'activity': return <Activity {...props} />;
    case 'navigation': return <Navigation {...props} />;
    case 'lightbulb': return <Lightbulb {...props} />;
    case 'layers': return <Layers {...props} />;
    case 'refresh-cw': return <RefreshCw {...props} />;
    case 'monitor': return <Monitor {...props} />;
    default: return <Camera {...props} />;
  }
}

export function Header() {
  const { itemCount, openCart } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megamenuOpen, setMegamenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      setSearchResults(searchProducts(q, 6));
    } else {
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchResults([]);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbar_inner}`}>
          <div className={styles.topbar_left}>
            <span>🎯 Flash Sale hàng tuần — Giảm đến 30%</span>
            <Link href="/danh-muc/san-pham-flash-sale" className={styles.topbar_cta}>Xem ngay →</Link>
          </div>
          <div className={styles.topbar_right}>
            <a href="tel:0937148222" className={styles.topbar_phone}>
              📞 0937.148.222
            </a>
            <span className={styles.divider}>|</span>
            <Link href="/lien-he">Cửa hàng</Link>
            <span className={styles.divider}>|</span>
            <Link href="/chinh-sach/bao-hanh">Bảo hành</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={[styles.header, isScrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
        <div className={`container ${styles.header_inner}`}>
          {/* Logo bọc trong Orange Brand Pill (tone Cam - Trắng) để hiển thị nổi bật 100% trên nền trắng */}
          <Link href="/" aria-label="Máy Ảnh Việt Nam - Trang chủ" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              padding: '6px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.28)',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <img
                src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
                alt="Máy Ảnh Việt Nam"
                style={{ height: '34px', width: 'auto', display: 'block' }}
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className={styles.search_wrap} ref={searchRef}>
            <div className={[styles.search_box, searchOpen ? styles.search_open : ''].filter(Boolean).join(' ')}>
              <button
                className={styles.search_icon_btn}
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Tìm kiếm"
              >
                <SearchIcon />
              </button>
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Tìm máy ảnh, ống kính, flycam..."
                className={styles.search_input}
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery) {
                    window.location.href = `/tim-kiem?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                aria-label="Tìm kiếm sản phẩm"
              />
              {searchQuery && (
                <button
                  className={styles.search_clear}
                  onClick={() => { setSearchQuery(''); setSearchResults([]); searchInputRef.current?.focus(); }}
                  aria-label="Xóa tìm kiếm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {searchResults.length > 0 && (
              <div className={styles.search_dropdown} role="listbox">
                {searchResults.map(product => (
                  <Link
                    key={product.id}
                    href={`/san-pham/${product.slug}`}
                    className={styles.search_result}
                    onClick={() => { setSearchOpen(false); setSearchResults([]); setSearchQuery(''); }}
                    role="option"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className={styles.search_result_img}
                      width={40}
                      height={40}
                    />
                    <div className={styles.search_result_info}>
                      <span className={styles.search_result_name}>{product.name}</span>
                      <span className={styles.search_result_price}>{formatPrice(product.price)}</span>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/tim-kiem?q=${encodeURIComponent(searchQuery)}`}
                  className={styles.search_see_all}
                  onClick={() => { setSearchOpen(false); setSearchResults([]); setSearchQuery(''); }}
                >
                  Xem tất cả kết quả cho &quot;{searchQuery}&quot; →
                </Link>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* User Account Button — changes when logged in */}
            {isLoggedIn ? (
              <div ref={userDropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <button
                  className={styles.action_btn}
                  onClick={() => setUserDropdown(!userDropdown)}
                  aria-label="Tài khoản"
                >
                  {/* Avatar circle — same 20px as icons */}
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(249,115,22,0.4)',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '11px', lineHeight: 1 }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className={styles.action_label} style={{ color: '#f97316', fontWeight: 700, maxWidth: '56px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name?.split(' ').pop()}
                  </span>
                </button>
                {/* Dropdown */}
                {userDropdown && (
                  <div
                    style={{
                      position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                      background: 'white', borderRadius: '16px',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.14)',
                      border: '1px solid #e5e7eb', minWidth: '220px',
                      overflow: 'hidden', zIndex: 999,
                    }}
                    onMouseLeave={() => setUserDropdown(false)}
                  >
                    {/* User info */}
                    <div style={{ padding: '16px 18px', background: 'linear-gradient(135deg,#fff7ed,#fef3c7)', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#111' }}>{user?.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{user?.phone}</div>
                    </div>
                    {/* Links */}
                    <div style={{ padding: '8px 0' }}>
                      {[
                        { href: '/tai-khoan', label: 'Quản lý tài khoản', icon: User },
                        { href: '/theo-doi-don-hang', label: 'Theo dõi đơn hàng', icon: PackageSearch },
                        { href: '/trade-in', label: 'Thu mua & Trade-in', icon: RefreshCcw },
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setUserDropdown(false)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 18px', fontSize: '13px', fontWeight: 600,
                              color: '#374151', textDecoration: 'none',
                              transition: 'background .15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            <Icon size={15} color="#9ca3af" />
                            {item.label}
                          </Link>
                        );
                      })}
                      <hr style={{ margin: '6px 0', border: 'none', borderTop: '1px solid #f3f4f6' }} />
                      <button
                        onClick={() => { logout(); setUserDropdown(false); router.push('/'); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          width: '100%', padding: '10px 18px', fontSize: '13px', fontWeight: 600,
                          color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer',
                          textAlign: 'left', transition: 'background .15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <LogOut size={15} color="#dc2626" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/dang-nhap" className={styles.action_btn} aria-label="Đăng nhập">
                <LogIn size={22} />
                <span className={styles.action_label}>Đăng nhập</span>
              </Link>
            )}
            <button
              className={styles.action_btn}
              onClick={openCart}
              aria-label={`Giỏ hàng (${itemCount} sản phẩm)`}
              id="cart-btn"
            >
              <div className={styles.cart_icon_wrap}>
                <CartIcon />
                {itemCount > 0 && (
                  <span className={styles.cart_badge} aria-label={`${itemCount} sản phẩm`}>
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className={styles.action_label}>Giỏ hàng</span>
            </button>
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={[styles.ham_line, mobileMenuOpen ? styles.ham_open : ''].filter(Boolean).join(' ')} />
              <span className={[styles.ham_line, mobileMenuOpen ? styles.ham_open : ''].filter(Boolean).join(' ')} />
              <span className={[styles.ham_line, mobileMenuOpen ? styles.ham_open : ''].filter(Boolean).join(' ')} />
            </button>
          </div>
        </div>

        {/* Category Nav with Megamenu */}
        <nav
          className={styles.category_nav}
          aria-label="Danh mục sản phẩm"
          onMouseLeave={() => setMegamenuOpen(false)}
        >
          <div className={`container ${styles.category_nav_wrapper}`}>
            <div className={styles.category_nav_inner}>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={cat.slug === 'lap-phong-studio' ? '/dich-vu-lap-phong' : `/danh-muc/${cat.slug}`}
                  className={[styles.cat_link, cat.slug === 'lap-phong-studio' ? styles.cat_link_highlight : ''].filter(Boolean).join(' ')}
                  onMouseEnter={() => setMegamenuOpen(false)}
                >
                  <span className={styles.cat_icon}>
                    <CategoryIcon iconKey={cat.icon} size={15} />
                  </span>
                  <span>{cat.slug === 'lap-phong-studio' ? '🔥 Setup Phòng Studio' : cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {megamenuOpen && (
            <div className={styles.megamenu_panel} onMouseEnter={() => setMegamenuOpen(true)}>
              <div className={styles.megamenu_grid}>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={cat.slug === 'lap-phong-studio' ? '/dich-vu-lap-phong' : `/danh-muc/${cat.slug}`}
                    className={styles.megamenu_card}
                    onClick={() => setMegamenuOpen(false)}
                  >
                    <div className={styles.megamenu_thumb} style={{ background: cat.bgColor, color: cat.color }}>
                      <CategoryIcon iconKey={cat.icon} size={20} />
                    </div>
                    <div>
                      <div className={styles.megamenu_title}>{cat.name}</div>
                      <div className={styles.megamenu_desc}>{cat.description}</div>
                      <div className={styles.megamenu_badge}>{cat.productCount} sản phẩm →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div className={styles.mobile_overlay} onClick={() => setMobileMenuOpen(false)} />
          <div className={styles.mobile_drawer}>
            <div className={styles.mobile_header}>
              <img
                src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
                alt="Máy Ảnh Việt Nam"
                style={{ height: '28px', width: 'auto' }}
              />
              <button onClick={() => setMobileMenuOpen(false)} className={styles.mobile_close} aria-label="Đóng">✕</button>
            </div>
            <div className={styles.mobile_search}>
              <input
                type="search"
                placeholder="Tìm kiếm..."
                className={styles.mobile_search_input}
                onChange={e => {
                  if (e.target.value.length >= 2) {
                    window.location.href = `/tim-kiem?q=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
            </div>
            <nav className={styles.mobile_nav}>
              {categories.map(cat => {
                const isSpecial = cat.slug === 'lap-phong-studio';
                return (
                  <Link
                    key={cat.id}
                    href={isSpecial ? '/dich-vu-lap-phong' : `/danh-muc/${cat.slug}`}
                    className={[styles.mobile_nav_item, isSpecial ? styles.mobile_nav_item_cta : ''].filter(Boolean).join(' ')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={styles.mobile_nav_left}>
                      <span className={styles.cat_icon}>
                        <CategoryIcon iconKey={cat.icon} size={18} />
                      </span>
                      <span>{isSpecial ? '🔥 Setup Phòng Studio' : cat.name}</span>
                    </div>
                    {!isSpecial && <span className={styles.mobile_chevron}>›</span>}
                  </Link>
                );
              })}
            </nav>
            <div className={styles.mobile_footer}>
              <a href="tel:0937148222" className={styles.mobile_phone}>📞 0937.148.222</a>
              <Link href="/lien-he" className={styles.mobile_stores} onClick={() => setMobileMenuOpen(false)}>
                📍 4 Cửa hàng toàn quốc
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Spacer */}
      <div className={styles.spacer} />

      {/* Bottom Mobile Bar */}
      <div className={styles.bottom_bar} role="navigation" aria-label="Navigation chính">
        <Link href="/" className={styles.bottom_item} aria-label="Trang chủ">
          <HomeIcon />
          <span>Trang chủ</span>
        </Link>
        <Link href="/danh-muc/may-anh" className={styles.bottom_item} aria-label="Danh mục">
          <GridIcon />
          <span>Danh mục</span>
        </Link>
        <button className={styles.bottom_item} onClick={openCart} aria-label="Giỏ hàng">
          <div className={styles.cart_icon_wrap}>
            <CartIcon />
            {itemCount > 0 && <span className={styles.cart_badge}>{itemCount}</span>}
          </div>
          <span>Giỏ hàng</span>
        </button>
        <Link href="/dang-nhap" className={styles.bottom_item} aria-label="Tài khoản">
          <UserIcon />
          <span>Tài khoản</span>
        </Link>
      </div>
    </>
  );
}

// Icons
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
