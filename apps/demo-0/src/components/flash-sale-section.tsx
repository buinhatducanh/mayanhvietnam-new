'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { flashSaleData, formatVND, type ProductSummary } from '@/lib/adapter';
import { ProductCard } from './product-card';

function CountdownTimer({ endTime }: { endTime: string }) {
  const [remaining, setRemaining] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(endTime).getTime() - Date.now());
      setRemaining({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1">
      {[
        { v: remaining.h, l: 'giờ' },
        { v: remaining.m, l: 'phút' },
        { v: remaining.s, l: 'giây' },
      ].map(({ v, l }, i) => (
        <div key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-lg font-bold text-primary">:</span>}
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary sm:size-12">
            {pad(v)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlashSaleSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Zap className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">
              {flashSaleData.title}
            </h2>
            <p className="text-xs text-muted-foreground">Kết thúc sau</p>
          </div>
          <CountdownTimer endTime={flashSaleData.endTime} />
        </div>
        <Link
          href="/flash-sale"
          className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          Xem tất cả →
        </Link>
      </div>

      {/* Product grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {flashSaleData.products.map((p) => (
          <div key={p.id} className="relative">
            <ProductCard product={p} />
            {/* Sold progress */}
            <div className="mx-2 mb-2 mt-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-red-500 transition-all"
                  style={{ width: `${p.soldPercent}%` }}
                />
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Đã bán {p.soldPercent}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
