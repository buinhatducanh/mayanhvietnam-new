'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, ChevronRight } from 'lucide-react';
import { cn, formatVND, calcDiscountPercent } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { flashSaleData } from '@/lib/mock-data';
import type { ProductSummary } from '@mayanhvietnam/mock-data';

type FlashProduct = ProductSummary & { soldPercent: number };

function Countdown({ endTime }: { endTime: string }) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const tick = () => setDiff(Math.max(0, new Date(endTime).getTime() - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [endTime]);

  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-white">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-white/20">{pad(h)}</span>
      <span>:</span>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-white/20">{pad(m)}</span>
      <span>:</span>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-white/20">{pad(s)}</span>
    </div>
  );
}

function FlashCard({ product }: { product: FlashProduct }) {
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? calcDiscountPercent(product.price, product.originalPrice)
    : 0;

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted rounded-t-xl">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="200px"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-error px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3 gap-1.5">
        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground truncate">
          {product.brand}
        </p>
        <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug min-h-[2rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-auto pt-1">
          <p className="price-mono text-sm font-bold text-primary">
            {formatVND(product.price)}
          </p>
          {product.originalPrice && (
            <p className="price-strike text-[11px]">{formatVND(product.originalPrice)}</p>
          )}
        </div>

        {/* Sold bar */}
        <div className="mt-1.5">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-0.5">
            <span>Đã bán {product.soldPercent}%</span>
            <span>{product.soldPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-error transition-all"
              style={{ width: `${Math.min(product.soldPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FlashSale() {
  const products = flashSaleData.products.slice(0, 6);

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 items-center gap-2 rounded-xl px-4 py-2 bg-primary"
            >
              <Zap className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white">Flash Sale</span>
            </div>
            <Countdown endTime={flashSaleData.endTime} />
          </div>
          <Link
            href="/san-pham"
            className="hidden items-center gap-1.5 text-xs font-medium text-primary transition-opacity hover:opacity-80 sm:flex"
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {products.map((p) => (
            <FlashCard key={p.id} product={p} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-5 flex justify-center sm:hidden">
          <Link
            href="/san-pham"
            className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium text-primary transition-colors"
            style={{ borderColor: 'rgba(255,107,53,0.4)' }}
          >
            Xem tất cả <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
