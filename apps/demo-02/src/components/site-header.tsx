'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Aperture,
  Camera,
  ChevronDown,
  Drone,
  Headphones,
  Lightbulb,
  Menu,
  Package,
  Phone,
  RefreshCcw,
  Search,
  ShoppingCart,
  User,
  Video,
  X,
} from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import { ThemeToggle } from '@/components/theme-toggle'
import { HOTLINE, formatVND, products } from '@/lib/products'

const navItems = [
  { name: 'Máy ảnh', slug: 'may-anh', icon: Camera },
  { name: 'Ống kính', slug: 'ong-kinh', icon: Aperture },
  { name: 'Máy quay phim', slug: 'may-quay-phim', icon: Video },
  { name: 'Flycam', slug: 'flycam', icon: Drone },
  { name: 'Phụ kiện', slug: 'phu-kien', icon: Package },
  { name: 'Thiết bị Studio', slug: 'thiet-bi-studio', icon: Lightbulb },
  { name: 'Sản phẩm cũ', slug: 'san-pham-cu', icon: RefreshCcw },
]

export function SiteHeader() {
  const { totalCount, openCart } = useCart()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const results = useMemo(() => {
    if (query.trim().length < 2) return []
    const q = query.toLowerCase()
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 5)
  }, [query])

  const handleMegaEnter = (slug: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(slug)
  }
  const handleMegaLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 150)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        {/* Top bar */}
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>

          <Link href="/" className="flex shrink-0 items-center">
            <span className="brand-glow flex items-center rounded-xl bg-primary px-3 py-2">
              <img
                src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                alt="Máy Ảnh Việt Nam"
                width={145}
                height={29}
                className="h-[29px] w-[145px] object-contain object-left"
              />
            </span>
          </Link>

          {/* Search */}
          <div className="relative mx-auto hidden max-w-lg flex-1 md:block">
            <div className="flex items-center rounded-full border border-border bg-secondary px-4">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                placeholder="Bạn cần tìm gì hôm nay?"
                aria-label="Tìm kiếm sản phẩm"
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </div>
            {searchOpen && results.length > 0 && (
              <div className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
                <ul>
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/san-pham/${p.slug}`}
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary"
                      >
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image src={p.image || '/placeholder.svg'} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="font-mono text-xs text-primary">
                            {formatVND(p.discountPrice ?? p.price)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <a
              href={`tel:${HOTLINE.replace(/\./g, '')}`}
              className="hidden items-center gap-2 xl:flex"
            >
              <Phone className="size-4 text-primary" aria-hidden="true" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Hotline
                </span>
                <span className="font-mono text-sm font-semibold">{HOTLINE}</span>
              </span>
            </a>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Tài khoản"
              className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <User className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Giỏ hàng, ${totalCount} sản phẩm`}
              className="relative rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ShoppingCart className="size-4" aria-hidden="true" />
              {totalCount > 0 && (
                <span className="brand-glow absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-bold text-primary-foreground">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category nav */}
        <nav
          aria-label="Danh mục sản phẩm"
          className="hidden border-t border-border lg:block"
          onMouseLeave={handleMegaLeave}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.slug} onMouseEnter={() => handleMegaEnter(item.slug)}>
                  <Link
                    href={`/danh-muc/${item.slug}`}
                    className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3.5 text-[13px] font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    <item.icon className="size-4" aria-hidden="true" />
                    {item.name}
                    <ChevronDown className="size-3 opacity-50" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/setup-studio"
              className="flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-wide text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <Headphones className="size-4" aria-hidden="true" />
              Setup phòng Studio
            </Link>
          </div>

          {/* Megamenu */}
          {megaOpen && (
            <div
              onMouseEnter={() => handleMegaEnter(megaOpen)}
              className="absolute inset-x-0 top-full border-b border-border bg-popover/95 shadow-2xl backdrop-blur-xl"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 px-8 py-8">
                <div className="col-span-1">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                    {navItems.find((n) => n.slug === megaOpen)?.name}
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <li>
                      <Link href={`/danh-muc/${megaOpen}`} className="transition-colors hover:text-primary">
                        Tất cả sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link href={`/danh-muc/${megaOpen}`} className="transition-colors hover:text-primary">
                        Hàng mới về
                      </Link>
                    </li>
                    <li>
                      <Link href={`/danh-muc/${megaOpen}`} className="transition-colors hover:text-primary">
                        Đang khuyến mãi
                      </Link>
                    </li>
                    <li>
                      <Link href="/kiem-tra-ong-kinh" className="transition-colors hover:text-primary">
                        Kiểm tra tương thích ngàm
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-4">
                  {products
                    .filter((p) => p.categorySlug === megaOpen)
                    .slice(0, 3)
                    .map((p) => (
                      <Link
                        key={p.slug}
                        href={`/san-pham/${p.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/50"
                      >
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image src={p.image || '/placeholder.svg'} alt="" fill sizes="56px" className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-snug group-hover:text-primary">
                            {p.name}
                          </p>
                          <p className="font-mono text-xs text-primary">
                            {formatVND(p.discountPrice ?? p.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  {products.filter((p) => p.categorySlug === megaOpen).length === 0 && (
                    <p className="col-span-3 text-sm text-muted-foreground">
                      Khám phá toàn bộ sản phẩm trong danh mục này.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav aria-label="Menu di động" className="border-t border-border bg-background lg:hidden">
            <ul className="px-4 py-2">
              {navItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/danh-muc/${item.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 border-b border-border py-3 text-sm text-muted-foreground last:border-0"
                  >
                    <item.icon className="size-4 text-primary" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/setup-studio"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-semibold text-primary"
                >
                  <Headphones className="size-4" aria-hidden="true" />
                  Setup phòng Studio
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <CartDrawer />
    </>
  )
}
