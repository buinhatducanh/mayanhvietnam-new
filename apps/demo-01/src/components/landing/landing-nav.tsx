'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/san-pham', active: true },
  { label: 'Thương hiệu', href: '/thuong-hieu' },
  { label: 'Tin tức', href: '/blog' },
  { label: 'Liên hệ', href: '/thong-tin-lien-he' },
];

export function LandingNav() {
  return (
    <nav className="landing-nav" aria-label="Điều hướng chính">
      <Link href="/" className="landing-nav__logo" aria-label="Camera Store — Về trang chủ">
        <span className="landing-nav__logo-icon" aria-hidden="true">C</span>
        <span>
          CAMERA<br />
          <span style={{ fontSize: 10, letterSpacing: '0.15em', opacity: 0.6 }}>STORE</span>
        </span>
      </Link>

      <ul className="landing-nav__links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`landing-nav__link ${link.active ? 'landing-nav__link--active' : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="landing-nav__actions">
        <div className="landing-nav__search" role="searchbox" aria-label="Tìm kiếm sản phẩm">
          <Search size={16} aria-hidden="true" />
          <span>Tìm kiếm...</span>
        </div>
        <button className="landing-nav__icon-btn" aria-label="Giỏ hàng — 3 sản phẩm">
          <ShoppingCart size={20} />
          <span className="landing-nav__cart-badge">3</span>
        </button>
        <button className="landing-nav__icon-btn" aria-label="Tài khoản">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}
