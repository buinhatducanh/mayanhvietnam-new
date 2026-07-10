'use client';

import { Aperture, ShoppingCart } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <a href="#" className="flex items-center gap-2">
          <Aperture className="size-6 text-primary" aria-hidden />
          <span className="text-lg font-light tracking-[0.2em] text-foreground">LUMEN</span>
        </a>
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-8 md:flex">
          <a
            href="#san-pham"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sản phẩm
          </a>
          <a
            href="#san-pham"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Thông số
          </a>
        </nav>
        <button
          type="button"
          aria-label="Giỏ hàng"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:border-primary/40 hover:shadow-[0_0_16px_-4px] hover:shadow-primary/50"
        >
          <ShoppingCart className="size-4" aria-hidden />
        </button>
      </div>
    </header>
  );
}
