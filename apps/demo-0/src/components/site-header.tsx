'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from './ui/image-with-fallback';
import { useRouter } from 'next/navigation';
import { Phone, Search, ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
import { categories, searchProducts, type Product, formatVND } from '@/lib/adapter';
import { motion, AnimatePresence } from 'framer-motion';

/** Only "real" product categories in the main nav */
const NAV_CATEGORIES = categories.filter(
  (c) => !['san-pham-flash-sale', 'san-pham-khuyen-mai', 'san-pham-cu', 'lap-phong-studio'].includes(c.slug),
);

const QUICK_LINKS = [
  { label: '⚡ Flash Sale', href: '/flash-sale' },
  { label: '🎁 Khuyến mãi', href: '/danh-muc/san-pham-khuyen-mai' },
  { label: '♻️ Sản phẩm cũ', href: '/danh-muc/san-pham-cu' },
];

export function SiteHeader() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Search state
  const [searchVal, setSearchVal] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (!searchVal.trim()) return [];
    return searchProducts(searchVal).slice(0, 5);
  }, [searchVal]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setShowDropdown(false);
      router.push(`/danh-muc/tat-ca?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Global hotkeys: Ctrl+K, Cmd+K, or "/"
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true');
      
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Reset keyboard active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchVal, showDropdown]);

  // Handle keyboard list navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (searchResults.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < searchResults.length) {
        e.preventDefault();
        const selected = searchResults[activeIndex];
        setShowDropdown(false);
        setSearchVal('');
        router.push(`/san-pham/${selected.slug}`);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-300">
        {/* Top bar */}
        <div className="border-b border-border bg-card/40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs lg:px-12">
            <a
              href="tel:0937148222"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Phone className="size-3" />
              <span className="font-medium">0937.148.222</span>
            </a>
            <div className="hidden items-center gap-4 sm:flex">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-primary duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-12">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center hover:opacity-85 active:scale-95 transition-all duration-200">
            <img
              src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
              alt="Máy Ảnh Việt Nam Logo"
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div
            ref={dropdownRef}
            className={`relative hidden md:block transition-all duration-300 ease-in-out ${
              isFocused || searchVal ? 'w-80 lg:w-96 flex-grow max-w-md' : 'w-56 lg:w-64 max-w-xs'
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => {
                  setShowDropdown(true);
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm máy ảnh, ống kính..."
                className="w-full h-10 pl-9 pr-12 rounded-xl border border-border bg-card/50 text-sm outline-none focus:border-primary focus:bg-card transition-all text-foreground shadow-sm"
              />
              {!isFocused && !searchVal && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none select-none flex items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground opacity-60">
                  <span>⌘</span>K
                </div>
              )}
            </form>

            {/* Instant Search Dropdown */}
            <AnimatePresence>
              {showDropdown && searchVal.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl overflow-hidden z-50 max-h-[350px] overflow-y-auto"
                >
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Không tìm thấy kết quả nào
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      <div className="px-3 py-1.5 bg-muted/30 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Gợi ý sản phẩm
                      </div>
                      {searchResults.map((p, index) => (
                        <Link
                          key={p.id}
                          href={`/san-pham/${p.slug}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchVal('');
                          }}
                          className={`flex items-center gap-3 p-3 transition-all duration-200 ${
                            index === activeIndex
                              ? 'bg-muted text-primary border-l-2 border-primary pl-2.5 font-medium'
                              : 'hover:bg-muted/40'
                          }`}
                        >
                          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-background border border-border/50">
                            <ImageWithFallback
                              src={p.thumbnail}
                              alt={p.name}
                              productName={p.name}
                              fill
                              className="object-contain p-1"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                              {p.brand}
                            </p>
                            <p className="text-sm font-medium text-foreground truncate">
                              {p.name}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            {p.callForPrice ? (
                              <span className="text-xs font-semibold text-primary">Liên hệ</span>
                            ) : (
                              <span className="text-xs font-semibold text-primary">
                                {formatVND(p.price)}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setShowDropdown(false);
                          router.push(`/danh-muc/tat-ca?q=${encodeURIComponent(searchVal.trim())}`);
                        }}
                        className="w-full p-2.5 text-center text-xs font-semibold text-primary hover:bg-muted transition-colors block"
                      >
                        Xem tất cả kết quả cho &ldquo;{searchVal}&rdquo;
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/danh-muc/${cat.slug}`}
                className="group relative rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{cat.name}</span>
                <span className="absolute bottom-1 left-3 right-3 h-0.5 scale-x-0 bg-primary transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/chinh-sach-bao-hanh"
              className="hidden rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground md:inline-flex"
            >
              Bảo hành
            </Link>
            <button
              type="button"
              aria-label="Giỏ hàng"
              className="relative flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:scale-105 active:scale-95 group"
            >
              <ShoppingCart className="size-4 transition-transform group-hover:rotate-6 group-hover:scale-110" />
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground transition-transform group-hover:-translate-y-0.5 group-hover:scale-110">
                0
              </span>
            </button>
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở menu"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground lg:hidden hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-80 overflow-y-auto border-l border-border bg-background p-6"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="shrink-0 flex items-center hover:opacity-85 transition-opacity"
                >
                  <img
                    src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                    alt="Máy Ảnh Việt Nam Logo"
                    className="h-7 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Đóng menu"
                  className="flex size-9 items-center justify-center rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Mobile Search input */}
              <div className="mt-6">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Tìm kiếm máy ảnh, phụ kiện..."
                    className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-card/50 text-sm outline-none focus:border-primary text-foreground shadow-sm transition-all"
                  />
                </form>

                {/* Mobile Instant Search Results */}
                <AnimatePresence>
                  {searchVal.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 rounded-xl border border-border bg-card/60 backdrop-blur-md shadow-lg overflow-hidden max-h-[300px] overflow-y-auto"
                    >
                      {searchResults.length === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground">
                          Không tìm thấy kết quả nào
                        </div>
                      ) : (
                        <div className="divide-y divide-border/50">
                          {searchResults.map((p) => (
                            <Link
                              key={p.id}
                              href={`/san-pham/${p.slug}`}
                              onClick={() => {
                                setMobileOpen(false);
                                setSearchVal('');
                              }}
                              className="flex items-center gap-3 p-2.5 hover:bg-muted/50 transition-colors"
                            >
                              <div className="relative size-8 shrink-0 overflow-hidden rounded-lg bg-background border border-border/50">
                                <ImageWithFallback
                                  src={p.thumbnail}
                                  alt={p.name}
                                  productName={p.name}
                                  fill
                                  className="object-contain p-1"
                                  sizes="32px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                                  {p.brand}
                                </p>
                                <p className="text-xs font-medium text-foreground truncate">
                                  {p.name}
                                </p>
                              </div>
                              <div className="shrink-0 text-right">
                                {p.callForPrice ? (
                                  <span className="text-xs font-semibold text-primary">Liên hệ</span>
                                ) : (
                                  <span className="text-xs font-semibold text-primary">
                                    {formatVND(p.price)}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setMobileOpen(false);
                              router.push(`/danh-muc/tat-ca?q=${encodeURIComponent(searchVal.trim())}`);
                            }}
                            className="w-full p-2 text-center text-xs font-semibold text-primary hover:bg-muted transition-colors block border-t border-border"
                          >
                            Xem tất cả kết quả
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 space-y-1">
                {NAV_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/danh-muc/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-card group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="group-hover:scale-110 transition-transform">{cat.icon}</span> {cat.name}
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-4">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary hover:pl-4 duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/chinh-sach-bao-hanh"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary hover:pl-4 duration-200"
                >
                  🛡️ Chính sách bảo hành
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-card/50 p-4">
                <p className="text-xs text-muted-foreground">Hotline đặt hàng</p>
                <a href="tel:0937148222" className="mt-1 text-lg font-bold text-primary hover:underline block">
                  0937.148.222
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
