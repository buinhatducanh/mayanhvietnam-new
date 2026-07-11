'use client';

import Link from 'next/link';
import Image from 'next/image';
import { categories, type Category } from '@/lib/adapter';

const CDN = 'https://mayanhvietnam.com';

/** Only show the 9 "real" categories (not flash sale / khuyến mãi) */
const DISPLAY_CATEGORIES = categories.filter(
  (c) => !['san-pham-flash-sale', 'san-pham-khuyen-mai'].includes(c.slug),
);

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Danh mục sản phẩm
        </p>
        <h2 className="mt-2 text-balance text-2xl font-extralight text-foreground md:text-4xl">
          Khám phá thế giới nhiếp ảnh
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {DISPLAY_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/danh-muc/${cat.slug}`}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/50 p-4 transition-all hover:border-primary/30 hover:shadow-[0_0_20px_-6px] hover:shadow-primary/20"
          >
            <div className="relative size-14 sm:size-16">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  sizes="64px"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-2xl">
                  {cat.icon}
                </span>
              )}
            </div>
            <span className="text-center text-xs font-medium text-foreground sm:text-sm">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
