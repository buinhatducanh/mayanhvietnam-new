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
import { HOTLINE, HOTLINE_FULL, formatVND, products } from '@/lib/products'

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
      <header className="sticky top-0 z-50 flex flex-col border-b border-[#2a2a38] bg-[#0a0a0f]/[0.92] backdrop-blur-xl">
        {/* ── Top strip: hotline + CTA ─────────────────────────── */}
        <div className="border-b border-[#1e1e2a]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 lg:px-8">
            {/* Hotline */}
            <a
              href={`tel:${HOTLINE_FULL.replace(/-/g, '')}`}
              className="flex items-center gap-1.5 text-[#8888a0] transition-colors hover:text-[#00d4aa]"
              aria-label="Gọi hotline"
            >
              <Phone className="size-3.5 text-[#00d4aa]" aria-hidden="true" />
              <span className="hidden font-[JetBrains_Mono,Fira_Code,ui-monospace] text-xs font-bold tracking-wide text-[#f0f0f5] sm:block">
                {HOTLINE_FULL}
              </span>
              <span className="font-[JetBrains_Mono,Fira_Code,ui-monospace] text-xs text-[#55556a] sm:hidden">
                {HOTLINE}
              </span>
            </a>

            {/* Right CTAs */}
            <div className="flex items-center gap-4">
              <Link
                href="/setup-studio"
                className="hidden items-center gap-1.5 rounded-full border border-[#00d4aa]/40 bg-[#00d4aa]/5 px-3 py-0.5 text-[11px] font-semibold text-[#00d4aa] transition-all hover:bg-[#00d4aa] hover:text-[#0a0a0f] sm:flex"
              >
                <Headphones className="size-3" aria-hidden="true" />
                Setup phòng Studio
              </Link>
              <span className="hidden text-[10px] tracking-widest text-[#55556a] sm:block">
                MÁY ẢNH VIỆT NAM
              </span>
            </div>
          </div>
        </div>

        {/* ── Main bar: logo + search + actions ──────────────── */}
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#2a2a38] text-[#8888a0] transition-colors hover:border-[#00d4aa] hover:text-[#00d4aa] lg:hidden"
          >
            {mobileOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
              alt="Máy Ảnh Việt Nam"
              width={180}
              height={45}
              className="h-7 w-auto object-contain sm:h-8 lg:h-10"
            />
          </Link>

          {/* Search */}
          <div className="relative flex-1">
            <div className="flex items-center rounded-lg border border-[#2a2a38] bg-[#16161f] transition-colors focus-within:border-[#00d4aa]/60">
              <Search className="ml-3 size-4 shrink-0 text-[#55556a]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                placeholder="Tìm máy ảnh, ống kính, phụ kiện…"
                aria-label="Tìm kiếm sản phẩm"
                className="w-full bg-transparent py-2.5 pl-2.5 pr-4 text-sm text-[#f0f0f5] outline-none placeholder:text-[#55556a]"
              />
            </div>
            {searchOpen && results.length > 0 && (
              <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#2a2a38] bg-[#1c1c28] shadow-2xl shadow-black/50">
                <ul>
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/san-pham/${p.slug}`}
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#2a2a38]"
                      >
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-[#0a0a0f]">
                          <Image src={p.image || '/placeholder.svg'} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#f0f0f5]">{p.name}</p>
                          <p className="font-[JetBrains_Mono,Fira_Code,ui-monospace] text-xs font-bold text-[#00d4aa]">
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
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Tài khoản"
              className="flex size-8 items-center justify-center rounded-full border border-[#2a2a38] text-[#8888a0] transition-colors hover:border-[#00d4aa] hover:text-[#00d4aa] sm:size-10"
            >
              <User className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Giỏ hàng, ${totalCount} sản phẩm`}
              className="relative flex size-8 items-center justify-center rounded-full border border-[#2a2a38] text-[#8888a0] transition-colors hover:border-[#00d4aa] hover:text-[#00d4aa] sm:size-10"
            >
              <ShoppingCart className="size-4" aria-hidden="true" />
              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#00d4aa] font-[JetBrains_Mono,Fira_Code,ui-monospace] text-[9px] font-bold text-[#0a0a0f] sm:size-5 sm:text-[10px]">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Category nav ───────────────────────────────────── */}
        <nav
          aria-label="Danh mục sản phẩm"
          className="hidden border-t border-[#1e1e2a] lg:block"
          onMouseLeave={handleMegaLeave}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.slug} onMouseEnter={() => handleMegaEnter(item.slug)}>
                  <Link
                    href={`/danh-muc/${item.slug}`}
                    className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-3 text-[12px] font-medium text-[#8888a0] transition-all hover:border-[#00d4aa] hover:text-[#00d4aa]"
                  >
                    <item.icon className="size-3.5" aria-hidden="true" />
                    {item.name}
                    <ChevronDown className="size-2.5 opacity-50" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/setup-studio"
              className="ml-4 flex items-center gap-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 px-3 py-1 text-[11px] font-semibold text-[#00d4aa] transition-all hover:bg-[#00d4aa] hover:text-[#0a0a0f]"
            >
              <Headphones className="size-3" aria-hidden="true" />
              Setup Studio
            </Link>
          </div>

          {/* Megamenu */}
          {megaOpen && (
            <div
              onMouseEnter={() => handleMegaEnter(megaOpen)}
              className="absolute inset-x-0 top-full z-40 border-b border-[#2a2a38] bg-[#1c1c28]/[0.97] shadow-2xl shadow-black/60 backdrop-blur-xl"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 px-8 py-8">
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#00d4aa]">
                    {navItems.find((n) => n.slug === megaOpen)?.name}
                  </p>
                  <ul className="flex flex-col gap-2.5 text-sm text-[#8888a0]">
                    <li>
                      <Link href={`/danh-muc/${megaOpen}`} className="transition-colors hover:text-[#00d4aa]">
                        Tất cả sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link href={`/danh-muc/${megaOpen}`} className="transition-colors hover:text-[#00d4aa]">
                        Hàng mới về
                      </Link>
                    </li>
                    <li>
                      <Link href={`/danh-muc/${megaOpen}`} className="transition-colors hover:text-[#00d4aa]">
                        Đang khuyến mãi
                      </Link>
                    </li>
                    <li>
                      <Link href="/kiem-tra-ong-kinh" className="transition-colors hover:text-[#00d4aa]">
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
                        className="group flex items-center gap-3 rounded-xl border border-[#1e1e2a] bg-[#16161f] p-3 transition-all hover:border-[#00d4aa]/40 hover:shadow-lg hover:shadow-black/40"
                      >
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#0a0a0f]">
                          <Image src={p.image || '/placeholder.svg'} alt="" fill sizes="56px" className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-snug text-[#f0f0f5] transition-colors group-hover:text-[#00d4aa]">
                            {p.name}
                          </p>
                          <p className="font-[JetBrains_Mono,Fira_Code,ui-monospace] text-xs font-bold text-[#00d4aa]">
                            {formatVND(p.discountPrice ?? p.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  {products.filter((p) => p.categorySlug === megaOpen).length === 0 && (
                    <p className="col-span-3 text-sm text-[#55556a]">
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
          <nav
            aria-label="Menu di động"
            className="border-t border-[#1e1e2a] bg-[#0a0a0f] lg:hidden"
          >
            <ul className="px-4 py-2">
              {navItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/danh-muc/${item.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 border-b border-[#1e1e2a] py-3 text-sm text-[#8888a0] last:border-0"
                  >
                    <item.icon className="size-4 text-[#00d4aa]" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/setup-studio"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 border-b border-[#1e1e2a] py-3 text-sm font-semibold text-[#00d4aa]"
                >
                  <Headphones className="size-4" aria-hidden="true" />
                  Setup phòng Studio
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${HOTLINE_FULL.replace(/-/g, '')}`}
                  className="flex items-center gap-3 py-3 text-sm font-semibold text-[#00d4aa]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Gọi hotline: {HOTLINE_FULL}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <CartDrawer />
    </>
  )
}
