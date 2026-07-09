"use client";
import { useState } from "react";
import { Product, products } from "@/lib/data";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

const categoryLabel: Record<string, string> = {
  camera: "Máy Ảnh",
  lens: "Ống Kính",
  flycam: "Flycam",
  action: "Action Cam",
  camcorder: "Camcorder",
  accessory: "Phụ Kiện",
  used: "Hàng Cũ",
};

const brandColor: Record<string, string> = {
  Canon: "bg-red-600",
  Nikon: "bg-yellow-500",
  Sony: "bg-blue-600",
  DJI: "bg-zinc-700",
  Sigma: "bg-zinc-800",
  Tamron: "bg-emerald-600",
  Viltrox: "bg-purple-600",
  Kase: "bg-cyan-600",
  GoPro: "bg-blue-700",
  Insta360: "bg-zinc-600",
};

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/${product.category}/${product.slug}`}
      className="group block bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square bg-zinc-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105"
          style={{ opacity: hovered && product.hoverImage ? 0 : 1 }}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} hover`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        )}

        {product.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
            {product.badge}
          </span>
        )}

        {product.condition === "used" && (
          <span className="absolute top-3 right-3 bg-zinc-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            Hàng Cũ
          </span>
        )}

        <span className={`absolute bottom-3 left-3 ${brandColor[product.brand] ?? "bg-zinc-700"} text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
          {product.brand}
        </span>
      </div>

      <div className="p-3.5">
        <p className="text-[10px] text-orange-500 font-semibold uppercase tracking-wider mb-1">
          {categoryLabel[product.category]}
        </p>
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-orange-400 transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.specs && product.specs.length > 0 && (
          <ul className="mt-2 space-y-0.5">
            {product.specs.slice(0, 2).map((s, i) => (
              <li key={i} className="text-[11px] text-zinc-500 flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-zinc-700 mt-1.5 flex-shrink-0" />
                <span className="line-clamp-1">{s}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 pt-3 border-t border-zinc-800">
          {product.callForPrice ? (
            <div className="text-xs text-orange-400 font-medium">Liên hệ để có giá tốt</div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-orange-500">{VND(product.price)}</span>
              <span className="text-[10px] text-zinc-500">Giá từ</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

const tabs = [
  { id: "all", label: "Tất cả" },
  { id: "camera", label: "Máy Ảnh" },
  { id: "lens", label: "Ống Kính" },
  { id: "flycam", label: "Flycam" },
  { id: "action", label: "Action Cam" },
] as const;

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("all");

  const filtered = activeTab === "all" ? products : products.filter((p) => p.category === activeTab);

  return (
    <section className="bg-zinc-950 py-12 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
              Sản phẩm nổi bật
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Khám phá sản phẩm
            </h2>
          </div>

          {/* Tab filter */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar bg-zinc-900/50 p-1 rounded-full border border-zinc-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}