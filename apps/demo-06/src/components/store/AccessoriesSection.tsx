"use client";
import { products } from "@/lib/data";
import { ProductCard } from "./ProductGrid";

const accessoriesProducts = products.filter((p) => p.category === "accessory");

export default function AccessoriesSection() {
  if (accessoriesProducts.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-14 px-6 border-t border-zinc-800 bg-gradient-to-r from-stone-500/5 to-transparent">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl mt-0.5">🎒</span>
            <div>
              <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
                Phụ kiện cao cấp
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Túi máy ảnh Billingham
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Handmade UK — Bảo hành trọn đời
              </p>
            </div>
          </div>
          <a
            href="/phu-kien"
            className="flex-shrink-0 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            Xem tất cả
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {accessoriesProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}