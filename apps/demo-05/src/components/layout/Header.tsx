'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Phone, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { REAL_ASSETS, REAL_CATEGORIES } from '@/lib/real-products';

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
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-white'
      )}
    >
      {/* TOP BAR */}
      <div className="hidden border-b border-border md:block">
        <div className="mx-auto max-w-[1280px] px-6 flex items-center justify-between py-1.5 text-[11px] text-muted-foreground">
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
      </div>

      {/* MAIN HEADER */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1280px] flex h-16 items-center justify-between px-4 md:px-6 gap-4">
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >
            {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo — white text on blue background */}
          <Link href="/" className="flex shrink-0 items-center">
            <div className="flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 shadow-sm">
              <img src={REAL_ASSETS.logoFull} alt="Máy Ảnh Việt Nam" className="h-8 w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm máy ảnh, ống kính, flycam..."
                className="w-full h-10 pl-10 pr-12 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md bg-primary text-white flex items-center justify-center hover:bg-primary-deep transition-colors">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-muted-foreground md:hidden"
            aria-label="Tìm kiếm"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            <Link
              href="/account/login"
              className="hidden items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors md:flex"
            >
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">Tài khoản</span>
            </Link>

            <Link
              href="/products"
              className="hidden items-center gap-2 rounded-lg bg-primary/5 border border-primary/15 px-3 py-2.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors md:flex"
            >
              <span>★</span>
              <span className="hidden lg:inline">Hot deal</span>
            </Link>

            <button
              onClick={toggleDrawer}
              className="relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden lg:inline">Giỏ hàng</span>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white bg-primary">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="border-b border-border md:hidden">
          <div className="mx-auto max-w-[1280px] px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border border-border text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY NAV */}
      <nav className="hidden border-b border-border md:block">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="flex h-11 items-center gap-1 overflow-x-auto">
            {REAL_CATEGORIES.filter((c) => !c.slug.startsWith('san-pham-')).map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileMenu(false)} />
          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto border-r border-border bg-white shadow-2xl md:hidden animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="text-sm font-semibold text-foreground">Menu</span>
              <button onClick={() => setMobileMenu(false)} aria-label="Đóng">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4">
              <a href="tel:+84937148222" className="mb-4 flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/15 p-3 text-sm font-semibold text-primary">
                <Phone className="h-4 w-4" />
                Gọi ngay: 0937.148.222
              </a>
              {REAL_CATEGORIES.filter((c) => !c.slug.startsWith('san-pham-')).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/danh-muc/${cat.slug}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <span>{cat.name}</span>
                </Link>
              ))}
              <div className="mt-4 border-t border-border pt-4 space-y-1">
                <Link href="/account/login" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-muted">
                  <User className="h-4 w-4" />
                  Tài khoản
                </Link>
                <Link href="/he-thong-cua-hang" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-muted">
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
