"use client";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useCart } from "@/lib/context/CartContext";
import { useUI } from "@/components/store/UIProvider";
import { ProductCard } from "@/components/store/ProductGrid";

export default function WishlistPage() {
  const { items, count, remove } = useWishlist();
  const { addItem } = useCart();
  const { openCart } = useUI();

  const moveToCart = (productId: string) => {
    const product = items.find((p) => p.id === productId);
    if (product) {
      addItem(product, 1);
      remove(productId);
      openCart();
    }
  };

  return (
    <>
      <PageHeader
        title={`Sản phẩm yêu thích${count > 0 ? ` (${count})` : ""}`}
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Yêu thích" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <svg className="w-16 h-16 mx-auto text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-zinc-400 text-lg">Chưa có sản phẩm yêu thích</p>
              <p className="text-zinc-500 text-sm mt-2 mb-6">Nhấn ♡ trên sản phẩm để lưu lại</p>
              <Link href="/" className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium transition-colors">
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {items.map((p) => (
                <div key={p.id} className="relative">
                  <ProductCard product={p} />
                  <button
                    onClick={() => moveToCart(p.id)}
                    className="absolute bottom-3 left-3 right-3 py-2 bg-orange-500/90 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors z-30"
                  >
                    Chuyển vào giỏ hàng
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
