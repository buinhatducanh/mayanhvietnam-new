"use client";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { products, storeLocations } from "@/lib/data";
import PageHeader from "@/components/shared/PageHeader";
import { ProductCard } from "@/components/store/ProductGrid";
import { useCart } from "@/lib/context/CartContext";
import { useUI } from "@/components/store/UIProvider";
import ProductGallery from "@/components/product/ProductGallery";
import ProductArticle from "@/components/product/ProductArticle";

const VND = (n: number) => n > 0 ? new Intl.NumberFormat("vi-VN").format(n) + "đ" : "Liên hệ";

interface Props { product: Product; related: Product[]; }

type TabKey = "features" | "other" | "used" | "includes" | "specs";

const TABS: { id: TabKey; label: string }[] = [
  { id: "features", label: "Tính năng" },
  { id: "other", label: "Sản phẩm khác" },
  { id: "used", label: "Sản phẩm cũ" },
  { id: "includes", label: "Sản phẩm bao gồm" },
  { id: "specs", label: "Thông số kỹ thuật" },
];

const CATEGORY_LABEL: Record<string, string> = {
  camera: "Máy ảnh", lens: "Ống kính", flycam: "Flycam", action: "Action Camera",
  studio: "Thiết bị studio", accessory: "Phụ kiện", camcorder: "Máy quay phim", used: "Hàng cũ",
};

export default function ProductDetailClient({ product, related }: Props) {
  const { addItem } = useCart();
  const { openCart } = useUI();
  const [activeTab, setActiveTab] = useState<TabKey>("features");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const allImages = product.images?.length ? product.images : product.thumbnail ? [product.thumbnail] : [];
  const callForPrice = product.price === 0;
  const variants = product.variants || [];
  const currentVariant = variants[selectedVariant];
  const currentPrice = currentVariant?.price ?? product.price;

  // Group detailedSpecs by group
  const specGroups: Record<string, { label: string; value: string }[]> = {};
  if (product.detailedSpecs) {
    product.detailedSpecs.forEach((s) => {
      const g = s.group || "Thông số khác";
      if (!specGroups[g]) specGroups[g] = [];
      specGroups[g].push({ label: s.label, value: s.value });
    });
  }

  // Get "Other products" + "Used products" from IDs
  const otherProducts = (product.otherIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const usedProducts = (product.usedIds || [])
    .map((id) => {
      const p = products.find((p) => p.id === id);
      return p ? { ...p, condition: "used" as const } : null;
    })
    .filter(Boolean) as Product[];

  const hasArticle = !!product.article;

  return (
    <>
      <PageHeader
        title={product.name}
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: CATEGORY_LABEL[product.category] || product.category },
          { label: product.name },
        ]}
      />

      <section className="bg-zinc-950 py-8 px-6">
        <div className="max-w-[1440px] mx-auto">

          {/* ═══════════════════════════════════════════════════════
              ROW 1: GALLERY + INFO — Two-column hero
              ═══════════════════════════════════════════════════════ */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 mb-14">
            {/* Left — Product Gallery */}
            <ProductGallery images={allImages} alt={product.name} />

            {/* Right — Product Info Card */}
            <div className="space-y-5" id="mua-hang">
              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.badges.map((b, i) => (
                    <span key={i} className="bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {b}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">{product.name}</h1>

              <p className="text-sm text-zinc-400">
                Thương hiệu: <span className="text-white font-medium">{product.brand}</span>
                {product.stockStatus && (
                  <span className="ml-3">
                    <span className="text-emerald-500">●</span> {product.stockStatus}
                  </span>
                )}
              </p>

              {/* Price Card */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5" id="price">
                {callForPrice || currentPrice === 0 ? (
                  <div>
                    <p className="text-orange-400 font-semibold text-lg">📞 Vui lòng gọi để có giá tốt</p>
                    <p className="text-zinc-500 text-sm mt-1">
                      Hotline:{" "}
                      <a href="tel:0907215252" className="text-orange-400 hover:underline">0907.215.252</a>
                      {" — "}
                      <a href="tel:0937148222" className="text-orange-400 hover:underline">0937.148.222</a>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-3xl font-bold text-orange-500">{VND(currentPrice)}</span>
                      {product.originalPrice && product.originalPrice > currentPrice && (
                        <span className="text-base text-zinc-500 line-through">{VND(product.originalPrice)}</span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500">Giá giao động · Hỗ trợ trả góp 0%</p>
                  </div>
                )}
              </div>

              {/* Variants */}
              {variants.length > 1 && (
                <div>
                  <p className="text-sm font-bold text-white mb-2">Chọn tình trạng:</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(i)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                          i === selectedVariant ? "border-orange-500 bg-orange-500 text-white" : "border-zinc-700 bg-zinc-900 text-white hover:border-zinc-500"
                        }`}
                      >
                        <span className="font-medium">{v.condition}</span>
                        {v.price > 0 && (
                          <span className={`text-xs ${i === selectedVariant ? "text-white" : "text-zinc-400"}`}>
                            {VND(v.price)}
                          </span>
                        )}
                        {v.price === 0 && <span className="text-xs text-orange-400">Liên hệ</span>}
                        {v.quantity !== undefined && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            i === selectedVariant ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                          }`}>
                            ×{v.quantity}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Promotions */}
              {product.promotions && product.promotions.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                  <h3 className="text-sm font-bold text-red-400 mb-2">🎉 Khuyến mãi áp dụng</h3>
                  <ul className="space-y-1.5">
                    {product.promotions.map((p, i) => (
                      <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                        <span className="flex-shrink-0">🎁</span> {p.replace(/^[🎁⭐]\s*/, "")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 text-white text-lg hover:text-orange-400 transition-colors"
                    aria-label="Giảm số lượng"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 text-white text-lg hover:text-orange-400 transition-colors"
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => { addItem(product, quantity); openCart(); }}
                  className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors text-sm uppercase tracking-wide"
                >
                  🛒 Đặt hàng ngay
                </button>
              </div>

              {/* Secondary CTAs */}
              <div className="flex gap-2">
                <a
                  href="tel:0907215252"
                  className="flex-1 text-center py-2.5 border border-zinc-700 hover:border-orange-500 text-white rounded-full text-sm font-medium transition-colors"
                >
                  📞 Liên hệ
                </a>
                <a
                  href="https://zalo.me/2875467351509223987"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-colors"
                >
                  💬 Zalo
                </a>
                <a
                  href="https://www.facebook.com/mayanhvietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 bg-[#0084FF] hover:bg-[#0073E6] text-white rounded-full text-sm font-medium transition-colors"
                >
                  Messenger
                </a>
              </div>

              {/* Highlights quick-view */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Điểm nổi bật</p>
                  <ul className="space-y-1.5">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description excerpt (always visible) */}
              {product.description && (
                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              ROW 2: ARTICLE — Written directly on the page
              Only shown when the product has article content
              ═══════════════════════════════════════════════════════ */}
          {hasArticle && (
            <div className="mb-14 border-t border-zinc-800 pt-12">
              <ProductArticle
                product={{ name: product.name, thumbnail: product.thumbnail }}
                article={product.article!}
              />
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              ROW 3: TABS — Features / Other / Used / Includes / Specs
              (Overview tab removed — article renders above if present)
              ═══════════════════════════════════════════════════════ */}
          <div className="border-t border-zinc-800 pt-10 mb-14">
            <div className="flex gap-0 overflow-x-auto no-scrollbar border-b border-zinc-800 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id ? "border-orange-500 text-orange-400" : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: Tính năng */}
            {activeTab === "features" && (
              <div className="max-w-3xl space-y-6">
                {product.highlights && product.highlights.length > 0 && (
                  <div>
                    <h3 className="text-white font-bold text-base mb-3">Tính năng nổi bật</h3>
                    <ul className="space-y-2">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="text-orange-500 mt-0.5">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.pros && product.pros.length > 0 && (
                  <div>
                    <h3 className="text-emerald-400 font-bold text-base mb-3">✅ Ưu điểm</h3>
                    <ul className="space-y-2">
                      {product.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="text-emerald-500 mt-0.5">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.cons && product.cons.length > 0 && (
                  <div>
                    <h3 className="text-orange-400 font-bold text-base mb-3">⚠️ Nhược điểm</h3>
                    <ul className="space-y-2">
                      {product.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="text-orange-500 mt-0.5">−</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!product.highlights?.length && !product.pros?.length && (
                  <p className="text-zinc-500 text-sm">Đang cập nhật.</p>
                )}
              </div>
            )}

            {/* TAB: Sản phẩm khác */}
            {activeTab === "other" && (
              <div>
                {otherProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {otherProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">Đang cập nhật sản phẩm liên quan.</p>
                )}
              </div>
            )}

            {/* TAB: Sản phẩm cũ */}
            {activeTab === "used" && (
              <div>
                {usedProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {usedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                    <p className="text-3xl mb-2">♻️</p>
                    <p className="text-zinc-400 text-sm">Hiện chưa có sản phẩm cũ trong danh mục này.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Sản phẩm bao gồm */}
            {activeTab === "includes" && (
              <div className="max-w-3xl space-y-5">
                {product.packageIncludes && product.packageIncludes.length > 0 && (
                  <div>
                    <h3 className="text-white font-bold text-base mb-3">Bộ sản phẩm bao gồm</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.packageIncludes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5">
                          <span className="text-emerald-500 flex-shrink-0">✓</span>
                          <span className="text-sm text-zinc-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {product.promotions && product.promotions.length > 0 && (
                  <div>
                    <h3 className="text-red-400 font-bold text-base mb-3">🎁 Quà tặng kèm</h3>
                    <ul className="space-y-2">
                      {product.promotions.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="text-red-500 mt-0.5">🎁</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!product.packageIncludes?.length && !product.promotions?.length && (
                  <p className="text-zinc-500 text-sm">Đang cập nhật.</p>
                )}
              </div>
            )}

            {/* TAB: Thông số kỹ thuật */}
            {activeTab === "specs" && (
              <div className="space-y-6">
                {product.detailedSpecs && product.detailedSpecs.length > 0 ? (
                  Object.entries(specGroups).map(([group, specs]) => (
                    <div key={group}>
                      <h3 className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-3 bg-zinc-900/50 px-4 py-2 rounded-lg inline-block">
                        {group}
                      </h3>
                      <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
                        {specs.map((s, i) => (
                          <div key={i} className="flex flex-col sm:flex-row text-sm">
                            <span className="sm:w-1/3 sm:bg-zinc-900/50 px-4 py-2 sm:py-3 text-zinc-400 sm:flex-shrink-0 font-medium border-b border-zinc-800/50 sm:border-b-0">{s.label}</span>
                            <span className="flex-1 px-4 py-2 sm:py-3 text-white">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : product.specs && product.specs.length > 0 ? (
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                    <ul className="space-y-2">
                      {product.specs.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                          <span className="text-zinc-300">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">Thông số kỹ thuật đang được cập nhật.</p>
                )}
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════
              ROW 4: STORE CONTACTS
              ═══════════════════════════════════════════════════════ */}
          <div className="border-t border-zinc-800 pt-10 mb-14">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-500">📍</span> Liên hệ cửa hàng gần bạn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {storeLocations.map((loc) => (
                <div key={loc.city} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm font-bold text-white">{loc.city}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-2 min-h-[2.5em]">{loc.address}</p>
                  <p className="text-[11px] text-zinc-500 mb-2">🕐 {loc.hours}</p>
                  <p className="text-sm text-orange-500 font-bold mb-3">📞 {loc.phone}</p>
                  <div className="flex gap-1.5">
                    <a href={loc.zalo} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] rounded-md transition-colors">
                      Zalo
                    </a>
                    <a href={loc.messenger} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 bg-[#0084FF] hover:bg-[#0073E6] text-white text-[11px] rounded-md transition-colors">
                      Messenger
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              ROW 5: TAGS
              ═══════════════════════════════════════════════════════ */}
          {product.tags && product.tags.length > 0 && (
            <div className="border-t border-zinc-800 pt-8 mb-10">
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <a key={tag} href={`/tim-kiem?q=${encodeURIComponent(tag)}`} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-orange-500 hover:text-orange-400 px-3 py-1.5 rounded-full transition-colors">
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              ROW 6: RELATED PRODUCTS
              ═══════════════════════════════════════════════════════ */}
          {related.length > 0 && (
            <div className="border-t border-zinc-800 pt-10">
              <h2 className="text-2xl font-bold text-white mb-6">Sản phẩm cùng danh mục</h2>
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
