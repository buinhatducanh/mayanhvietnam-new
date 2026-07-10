"use client";
import type { Product } from "@/lib/data";
import PageHeader from "@/components/shared/PageHeader";
import { ProductCard } from "@/components/store/ProductGrid";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "đ";

interface Props { product: Product; related: Product[]; }

export default function ProductDetailClient({ product, related }: Props) {
  return (
    <>
      <PageHeader
        title={product.name}
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: product.category, href: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Gallery */}
            <div>
              <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {product.badge && (
                <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{product.name}</h1>
              <p className="text-sm text-zinc-400">
                Thương hiệu: <span className="text-white font-medium">{product.brand}</span>
              </p>

              {/* Price */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                {product.callForPrice ? (
                  <div>
                    <p className="text-orange-400 font-semibold text-lg">📞 Liên hệ để có giá tốt</p>
                    <p className="text-zinc-500 text-sm mt-1">Hotline: 0907.215.252 — 0937.148.222</p>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-bold text-orange-500">{VND(product.price)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-base text-zinc-500 line-through">{VND(product.originalPrice)}</span>
                    )}
                    <span className="text-xs text-zinc-500">Giá từ</span>
                  </div>
                )}
              </div>

              {/* Specs */}
              {product.specs && product.specs.length > 0 && (
                <div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Thông số chính</h3>
                  <ul className="space-y-2">
                    {product.specs.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                        <span className="text-zinc-300">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-3 pt-4">
                <a
                  href="tel:0907215252"
                  className="flex-1 text-center py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors text-sm"
                >
                  📞 Gọi ngay: 0907.215.252
                </a>
                <a
                  href="https://zalo.me/0907215252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-colors text-sm"
                >
                  Chat Zalo
                </a>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
                {["Hàng chính hãng", "Giao hàng toàn quốc", "Bảo hành 24 tháng", "Thu cũ đổi mới"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="text-emerald-500">✓</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Sản phẩm liên quan</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
