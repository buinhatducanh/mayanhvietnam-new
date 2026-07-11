'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, Clock } from 'lucide-react';
import { flashSaleData, formatVND } from '@/lib/adapter';
import { ProductCard } from '@/components/product-card';

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
    <div className="flex items-center gap-1.5 font-mono text-sm">
      <Clock className="size-4 text-primary" />
      <span className="text-muted-foreground mr-1 text-xs">Kết thúc sau:</span>
      <span className="rounded bg-primary/10 px-2 py-0.5 font-bold text-primary">
        {pad(remaining.h)}
      </span>
      <span className="text-primary font-bold">:</span>
      <span className="rounded bg-primary/10 px-2 py-0.5 font-bold text-primary">
        {pad(remaining.m)}
      </span>
      <span className="text-primary font-bold">:</span>
      <span className="rounded bg-primary/10 px-2 py-0.5 font-bold text-primary">
        {pad(remaining.s)}
      </span>
    </div>
  );
}

export default function FlashSalePage() {
  return (
    <main className="bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-12">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Flash Sale</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-extralight text-foreground md:text-4xl">
              <Zap className="size-8 fill-primary text-primary" />
              Flash Sale — Giá Sốc Mỗi Ngày
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Số lượng có hạn, nhanh tay sở hữu những thiết bị máy ảnh chất lượng nhất.
            </p>
          </div>
          <div className="rounded-xl border border-border p-3 bg-card/40 shrink-0">
            <CountdownTimer endTime={flashSaleData.endTime} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {flashSaleData.products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-2xl border border-border bg-card/30 p-2"
            >
              <ProductCard product={p} />
              <div className="px-2 pb-2 mt-3">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-red-500 transition-all"
                    style={{ width: `${p.soldPercent}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Đã bán {p.soldPercent}%</span>
                  <span className="font-medium text-foreground">
                    Chỉ còn {100 - p.soldPercent}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
