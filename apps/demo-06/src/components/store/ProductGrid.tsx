"use client";
import { useState } from "react";
import {
  type Product,
  type ProductSectionMeta,
  getProductsByCategory,
  productSections,
} from "@/lib/data";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useUI } from "@/components/store/UIProvider";

// ─── HELPERS ────────────────────────────────────────────────────────────────

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

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
  Fujifilm: "bg-pink-600",
  Godox: "bg-amber-600",
  Nanlite: "bg-teal-600",
  Blackmagic: "bg-zinc-600",
  Panasonic: "bg-red-700",
  Billingham: "bg-stone-600",
};

// ─── PRODUCT CARD ───────────────────────────────────────────────────────────

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { openCart, openWishlist } = useUI();
  const isFav = has(product.id);

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  const onToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    if (!isFav) openWishlist();
  };

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
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase z-10">
            {product.badge}
          </span>
        )}

        {product.condition === "used" && (
          <span className="absolute top-3 right-3 bg-zinc-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full z-10">
            Hàng Cũ
          </span>
        )}

        <span
          className={`absolute bottom-3 left-3 ${brandColor[product.brand] ?? "bg-zinc-700"} text-white text-[10px] font-bold px-2 py-0.5 rounded z-10`}
        >
          {product.brand}
        </span>

        {/* Wishlist heart button */}
        <button
          onClick={onToggleFav}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 ${
            isFav ? "bg-red-500 text-white" : "bg-black/50 backdrop-blur-sm text-white hover:bg-red-500"
          } ${product.condition === "used" ? "top-12" : ""}`}
          aria-label={isFav ? "Bỏ yêu thích" : "Yêu thích"}
          title={isFav ? "Bỏ yêu thích" : "Yêu thích"}
        >
          <svg
            className="w-4 h-4"
            fill={isFav ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-3.5">
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

        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
          {product.callForPrice ? (
            <div className="text-xs text-orange-400 font-medium">Liên hệ để có giá tốt</div>
          ) : (
            <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
              <span className="text-base font-bold text-orange-500 truncate">{VND(product.price)}</span>
              {product.originalPrice && product.originalPrice !== product.price && (
                <span className="text-[10px] text-zinc-500 line-through flex-shrink-0">
                  {VND(product.originalPrice)}
                </span>
              )}
            </div>
          )}
          {/* Add to cart quick button */}
          <button
            onClick={onAddToCart}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
            aria-label="Thêm vào giỏ hàng"
            title="Thêm vào giỏ hàng"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </a>
  );
}

// ─── SINGLE PRODUCT SECTION ─────────────────────────────────────────────────

function ProductSection({ section }: { section: ProductSectionMeta }) {
  const products = getProductsByCategory(section.category, section.limit);

  if (products.length === 0) return null;

  return (
    <section
      className={`bg-zinc-950 py-12 px-6 border-t border-zinc-800 ${
        section.accent ? `bg-gradient-to-r ${section.accent}` : ""
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex items-start gap-3">
            {section.emoji && (
              <span className="text-3xl mt-0.5">{section.emoji}</span>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {section.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">{section.subtitle}</p>
            </div>
          </div>
          <a
            href={section.viewAllHref}
            className="flex-shrink-0 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            Xem tất cả
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ALL SECTIONS (MAIN EXPORT) ─────────────────────────────────────────────

export default function ProductGrid() {
  return (
    <div className="bg-zinc-950">
      {/* Flash Sale / Nổi bật tổng hợp — section đầu tiên */}
      <FeaturedHeroSection />

      {/* Các section riêng theo danh mục */}
      {productSections.map((section) => (
        <ProductSection key={section.id} section={section} />
      ))}
    </div>
  );
}

// ─── FEATURED HERO (top 4 mix) ──────────────────────────────────────────────

function FeaturedHeroSection() {
  const featured = [
    { id: "p3b", name: "Sony A7R VI" },
    { id: "f1", name: "DJI Mavic 4 Pro" },
    { id: "a1", name: "GoPro Hero 13" },
    { id: "p9", name: "Fujifilm X-H2S" },
  ];

  const allProducts = getProductsByCategory("camera", 999)
    .concat(getProductsByCategory("flycam", 999))
    .concat(getProductsByCategory("action", 999))
    .concat(getProductsByCategory("lens", 999));

  const hero = featured
    .map((f) => allProducts.find((p) => p.id === f.id))
    .filter(Boolean) as Product[];

  if (hero.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-12 px-6 border-t border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
              Sản phẩm nổi bật
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Sản phẩm nổi bật
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hero.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
