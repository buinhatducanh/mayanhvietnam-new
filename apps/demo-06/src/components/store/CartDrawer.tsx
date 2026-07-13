"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/context/CartContext";
import { useUI } from "@/components/store/UIProvider";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "đ";

export default function CartDrawer() {
  const { drawer, close } = useUI();
  const { items, totalItems, subtotal, updateQuantity, removeItem, clear } = useCart();
  const open = drawer === "cart";

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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">
            Giỏ hàng {totalItems > 0 && <span className="text-orange-500">({totalItems})</span>}
          </h2>
          <button onClick={close} className="text-zinc-400 hover:text-white" aria-label="Đóng">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-10">
            <span className="text-6xl mb-4">🛒</span>
            <p className="text-white font-semibold mb-1">Giỏ hàng trống</p>
            <p className="text-zinc-500 text-sm mb-6">Thêm sản phẩm để tiếp tục mua sắm</p>
            <button
              onClick={close}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <Link
                    href={`/${item.product.category}/${item.product.fullSlug}`}
                    onClick={close}
                    className="w-20 h-20 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${item.product.category}/${item.product.fullSlug}`}
                      onClick={close}
                      className="text-sm font-medium text-white line-clamp-2 hover:text-orange-400 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.product.brand}</p>
                    <p className="text-sm font-bold text-orange-500 mt-1">
                      {item.product.price === 0 ? "Liên hệ" : VND(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-zinc-800 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 text-white text-sm hover:text-orange-400"
                        >−</button>
                        <span className="w-7 text-center text-sm text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 text-white text-sm hover:text-orange-400"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-zinc-500 hover:text-red-500"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="border-t border-zinc-800 p-5 space-y-3">
              <button
                onClick={clear}
                className="w-full text-xs text-zinc-500 hover:text-red-400 text-left"
              >
                Xóa toàn bộ giỏ hàng
              </button>
              <div className="flex justify-between text-sm text-zinc-300">
                <span>Tạm tính</span>
                <span className="font-semibold text-white">{VND(subtotal)}</span>
              </div>
              <p className="text-xs text-zinc-500">Phí vận chuyển tính ở bước thanh toán</p>
              <Link
                href="/gio-hang"
                onClick={close}
                className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold rounded-full text-sm transition-colors"
              >
                Xem giỏ hàng chi tiết
              </Link>
              <button
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-full text-sm transition-colors"
              >
                Thanh toán ngay
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
