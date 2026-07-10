'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Camera, ShoppingCart } from 'lucide-react'

type SiteHeaderProps = {
  transparent?: boolean
}

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const pathname = usePathname()

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        transparent
          ? 'absolute top-0 left-0 right-0 bg-transparent border-none'
          : 'sticky top-0 border-b border-border bg-background/80 backdrop-blur-lg'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
            <Camera className="h-4 w-4 text-zinc-950" />
          </span>
          <span className="text-base font-bold tracking-tight text-foreground">
            Máy Ảnh <span className="text-primary">Việt Nam</span>
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Menu chính">
          <Link
            href="/"
            className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Trang chủ
          </Link>
          <Link
            href="/store"
            className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
              pathname === '/store' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Cửa hàng 3D
          </Link>
          <a
            href="#specs-section"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            Thông số
          </a>
          <a
            href="#contact"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            Liên hệ
          </a>
        </nav>

        {/* Cart */}
        <button
          type="button"
          aria-label="Giỏ hàng"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary bg-background/40 backdrop-blur-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            0
          </span>
        </button>
      </div>
    </header>
  )
}
