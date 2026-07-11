"use client";
import Link from "next/link";
import { products } from "@/lib/data";
import type { Product, Category } from "@/lib/data";
import { ProductCard } from "./ProductGrid";

interface CategorySectionProps {
  /** Slug hiển thị ("may-anh") */
  catSlug: string;
  /** Tiêu đề hiển thị */
  title: string;
  /** Category enum trong data layer */
  category: Category;
  /** Subtitle ngắn */
  subtitle?: string;
  /** Emoji trang trí */
  emoji?: string;
  /** Link "Xem tất cả" */
  viewAllHref: string;
  /** Số product tối đa hiển thị */
  limit?: number;
}

/**
 * Category section lặp lại theo danh mục — pattern chuẩn demo-05.
 * Header: vạch cam + tiêu đề + link "Xem tất cả →"
 * Body: grid 4 sản phẩm đầu tiên thuộc category.
 */
export default function CategorySection({
  catSlug,
  title,
  subtitle,
  emoji,
  category,
  viewAllHref,
  limit = 4,
}: CategorySectionProps) {
  const items: Product[] = products
    .filter((p) => p.category === category)
    .slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className="relative bg-zinc-950 border-t border-zinc-800">
      {/* Vạch accent gradient nhạt */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-orange-500" />
            {emoji && <span className="text-2xl">{emoji}</span>}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
              {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            Xem tất cả
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Product Grid 4 cột */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
