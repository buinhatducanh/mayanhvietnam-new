"use client";
import { products } from "@/lib/data";
import { ProductCard } from "./ProductGrid";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

const usedProducts = products.filter((p) => p.category === "used");
const lensProducts = products.filter((p) => p.category === "lens");

export default function AccessoriesSection() {
  return (
    <>
      {/* Lenses showcase */}
      <section className="bg-zinc-950 py-14 px-6 border-t border-zinc-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
                Ống kính chính hãng
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Nâng cấp bộ ống kính của bạn
              </h2>
            </div>
            <a href="#" className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
              Xem tất cả
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lensProducts.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Used cameras */}
      {usedProducts.length > 0 && (
        <section className="bg-zinc-950 py-14 px-6 border-t border-zinc-800">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs text-emerald-500 font-semibold uppercase tracking-widest mb-2">
                  Hàng cũ chất lượng
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Sản phẩm đã qua sử dụng — Bảo hành 6 tháng
                </h2>
              </div>
              <a href="#" className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
                Xem thêm
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {usedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}