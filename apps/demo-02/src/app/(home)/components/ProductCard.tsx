'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import type { Product } from '@/app/data/products';
import { cn } from '@/app/components/ui/utils';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

const BADGE_STYLES: Record<string, string> = {
  NEW: 'bg-emerald-500 text-white',
  SALE: 'bg-rose-500 text-white',
  HOT: 'bg-orange-500 text-white',
  LIMITED: 'bg-purple-600 text-white',
  PRO: 'bg-[#1a1a2e] text-white',
};

interface ProductCardProps {
  p: Product;
}

export default function ProductCard({ p }: ProductCardProps) {
  const [wished, setWished] = useState(false);

  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
  const badgeCls = p.badge ? BADGE_STYLES[p.badge] ?? 'bg-gray-500 text-white' : null;

  return (
    <article className="group relative flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 hover:-translate-y-0.5 transition-all duration-200">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {badgeCls && (
          <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', badgeCls)}>
            {p.badge}
          </span>
        )}
        {discount && (
          <span className="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => setWished((v) => !v)}
        aria-label="Thêm vào yêu thích"
        className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
      >
        <Heart
          size={13}
          className={wished ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}
        />
      </button>

      {/* Image */}
      <Link
        href={`/san-pham/${p.id}`}
        className="relative aspect-square bg-gray-50 overflow-hidden block"
      >
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex items-center gap-1 text-[11px] font-semibold bg-white text-gray-800 px-3 py-1.5 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
            <Eye size={11} /> Xem nhanh
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          {p.brand}
        </p>
        <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 text-gray-800 hover:text-orange-500 transition-colors">
          <Link href={`/san-pham/${p.id}`}>{p.name}</Link>
        </h3>

        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex gap-px">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={10}
                className={
                  i <= p.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'
                }
              />
            ))}
          </span>
          <span className="text-[10px] text-gray-400">({p.reviews})</span>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-[15px] font-extrabold text-orange-600 tabular-nums">
              {fmt(p.price)}
            </span>
            {p.oldPrice && (
              <span className="text-[11px] line-through text-gray-400 tabular-nums">
                {fmt(p.oldPrice)}
              </span>
            )}
          </div>

          <button className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-2 rounded-md transition-colors">
            <ShoppingCart size={12} /> Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}
