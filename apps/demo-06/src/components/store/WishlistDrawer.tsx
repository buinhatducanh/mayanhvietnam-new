"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useUI } from "@/components/store/UIProvider";
import { useCart } from "@/lib/context/CartContext";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "đ";

export default function WishlistDrawer() {
  const { drawer, close } = useUI();
  const { items, count, remove } = useWishlist();
  const { addItem } = useCart();
  const open = drawer === "wishlist";

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const moveToCart = (productId: string) => {
    const product = items.find((p) => p.id === productId);
    if (product) {
      addItem(product);
      remove(productId);
    }
  };

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">
            Yêu thích {count > 0 && <span className="text-orange-500">({count})</span>}
          </h2>
          <button onClick={close} className="text-zinc-400 hover:text-white" aria-label="Đóng">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-10">
            <svg className="w-16 h-16 text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-white font-semibold mb-1">Chưa có sản phẩm yêu thích</p>
            <p className="text-zinc-500 text-sm mb-6">Lưu lại sản phẩm bạn quan tâm để xem sau</p>
            <button
              onClick={close}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium transition-colors"
            >
              Khám phá sản phẩm
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {items.map((product) => (
              <div key={product.id} className="flex gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <Link
                  href={`/${product.category}/${product.fullSlug}`}
                  onClick={close}
                  className="w-20 h-20 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${product.category}/${product.fullSlug}`}
                    onClick={close}
                    className="text-sm font-medium text-white line-clamp-2 hover:text-orange-400 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-zinc-500 mt-0.5">{product.brand}</p>
                  <p className="text-sm font-bold text-orange-500 mt-1">
                    {product.price === 0 ? "Liên hệ" : VND(product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => moveToCart(product.id)}
                      className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-full transition-colors"
                    >
                      Thêm vào giỏ
                    </button>
                    <button
                      onClick={() => remove(product.id)}
                      className="px-3 py-1 text-zinc-500 hover:text-red-500 text-xs transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
