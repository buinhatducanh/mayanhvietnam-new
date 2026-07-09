'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Phone, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/mock-data';
import { useCart } from '@/lib/cart-context';
import { LOGO } from '@/lib/image-constants';
import { ModeToggle } from './mode-toggle';
import { SearchBar } from './search-bar';

const TOP_NAV = [
  { label: 'Xem tất cả', href: '/san-pham' },
  { label: 'Sản phẩm mới', href: '/san-pham?filter=new' },
  { label: 'Sản phẩm cũ', href: '/san-pham?filter=used' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-lg' : 'bg-background/95 backdrop-blur-sm'
      )}
    >
      {/* TOP BAR */}
      <div className="hidden items-center justify-between border-b border-border px-6 py-1 text-[11px] text-muted-foreground md:flex">
        <div className="flex items-center gap-4">
          <a
            href="tel:+84937148222"
            className="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Phone className="h-3 w-3" />
            <span>0937.148.222</span>
          </a>
          <span className="text-border">|</span>
          <span>Freeship đơn từ 5.000.000₫</span>
        </div>
        <div className="flex items-center gap-3">
          {TOP_NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile menu toggle */}
        <button
          type="button"
          className="-ml-2 p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Menu"
        >
          {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-md bg-white/5">
            <Image
              src={LOGO.white}
              alt="Máy Ảnh Việt Nam"
              width={36}
              height={36}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-foreground">MÁY ẢNH</p>
            <p
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: '#FF6B35' }}
            >
              VIỆT NAM
            </p>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="mx-8 hidden md:flex flex-1 justify-center">
          <SearchBar />
        </div>

        {/* Mobile search toggle */}
        <button
          type="button"
          onClick={() => setMobileSearch(!mobileSearch)}
          className="p-2 text-muted-foreground md:hidden"
          aria-label="Tìm kiếm"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Link
            href="/dang-nhap"
            className="hidden items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground md:flex"
          >
            <User className="h-5 w-5" />
            <span className="hidden lg:inline">Tài khoản</span>
          </Link>

          <Link
            href="/san-pham-can-ban"
            className="hidden items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/50 hover:bg-card hover:text-primary md:flex"
          >
            <span style={{ color: '#FF6B35' }}>★</span>
            <span className="hidden lg:inline">Sản phẩm hot</span>
          </Link>

          <Link
            href="/gio-hang"
            className="relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden lg:inline">Giỏ hàng</span>
            {itemCount > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: '#FF6B35' }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          <ModeToggle />
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearch && (
        <div className="border-t border-border p-3 md:hidden">
          <SearchBar />
        </div>
      )}

      {/* CATEGORY NAV */}
      <nav className="hidden border-t border-border md:block">
        <div className="flex h-11 items-center justify-center gap-1 overflow-x-auto px-4 no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/danh-muc/${cat.slug}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-card/50 hover:text-primary"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setMobileMenu(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto border-r border-border bg-background md:hidden">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="text-sm font-semibold text-foreground">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenu(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <a
                href="tel:+84937148222"
                className="mb-4 flex items-center gap-2 rounded-lg p-3 text-sm font-semibold"
                style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35' }}
              >
                <Phone className="h-4 w-4" />
                Gọi ngay: 0937.148.222
              </a>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/danh-muc/${cat.slug}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
              <div className="mt-4 border-t border-border pt-4 space-y-1">
                <Link
                  href="/dang-nhap"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-card"
                >
                  <User className="h-4 w-4" />
                  Tài khoản
                </Link>
                <Link
                  href="/he-thong-cua-hang"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-card"
                >
                  <Phone className="h-4 w-4" />
                  Hệ thống cửa hàng
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
