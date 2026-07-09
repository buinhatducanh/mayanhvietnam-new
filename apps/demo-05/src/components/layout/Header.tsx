'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Phone, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/mock-data';
import { useCart } from '@/lib/cart-context';

const TOP_NAV = [
  { label: 'Xem tất cả', href: '/san-pham' },
  { label: 'Sản phẩm mới', href: '/san-pham?filter=new' },
  { label: 'Sản phẩm cũ', href: '/san-pham?filter=used' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, toggleDrawer } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-border' : 'bg-background border-b border-transparent'
      )}
    >
      {/* TOP BAR */}
      <div className="hidden items-center justify-between border-b border-border px-6 py-1.5 text-[11px] text-muted-foreground md:flex">
        <div className="flex items-center gap-4">
          <a href="tel:+84937148222" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="h-3 w-3" />
            <span>0937.148.222</span>
          </a>
          <span className="text-border">|</span>
          <span>Freeship đơn từ 5.000.000₫</span>
        </div>
        <div className="flex items-center gap-4">
          {TOP_NAV.map((n) => (
            <Link key={n.label} href={n.href} className="hover:text-foreground transition-colors">
              {n.label}
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <button
          type="button"
          className="-ml-2 p-2 text-muted-foreground md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Menu"
        >
          {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-md"
            style={{ background: '#FF6B35' }}
          >
            <span className="text-sm font-black text-white">M</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-foreground">MÁY ẢNH</p>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em] leading-tight"
              style={{ color: '#FF6B35' }}
            >
              VIỆT NAM
            </p>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="mx-6 hidden md:flex flex-1 max-w-2xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm máy ảnh, ống kính, flycam..."
              className="w-full h-10 pl-10 pr-12 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-deep transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-2 text-muted-foreground md:hidden"
          aria-label="Tìm kiếm"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Link
            href="/account/login"
            className="hidden items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-card hover:text-foreground transition-colors md:flex"
          >
            <User className="h-5 w-5" />
            <span className="hidden lg:inline">Tài khoản</span>
          </Link>

          <Link
            href="/products"
            className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:bg-card hover:text-primary transition-colors md:flex"
          >
            <span style={{ color: '#FF6B35' }}>★</span>
            <span className="hidden lg:inline">Hot deal</span>
          </Link>

          <button
            onClick={toggleDrawer}
            className="relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden lg:inline">Giỏ hàng</span>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: '#FF6B35' }}>
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="border-t border-border p-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* CATEGORY NAV */}
      <nav className="hidden border-t border-border md:block">
        <div className="flex h-11 items-center gap-1 overflow-x-auto px-4 md:px-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/danh-muc/${cat.slug}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-card/50 hover:text-primary transition-colors"
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="text-[10px] text-muted-foreground/60 font-mono">({cat.productCount})</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMobileMenu(false)} />
          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto border-r border-border bg-background md:hidden">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="text-sm font-semibold text-foreground">Menu</span>
              <button onClick={() => setMobileMenu(false)} aria-label="Đóng">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4">
              <a href="tel:+84937148222" className="mb-4 flex items-center gap-2 rounded-lg p-3 text-sm font-semibold" style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35' }}>
                <Phone className="h-4 w-4" />
                Gọi ngay: 0937.148.222
              </a>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/danh-muc/${cat.slug}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
              <div className="mt-4 border-t border-border pt-4 space-y-1">
                <Link href="/account/login" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-card">
                  <User className="h-4 w-4" />
                  Tài khoản
                </Link>
                <Link href="/he-thong-cua-hang" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-card">
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