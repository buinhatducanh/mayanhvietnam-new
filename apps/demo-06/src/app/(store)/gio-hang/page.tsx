"use client";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { useCart } from "@/lib/context/CartContext";

const VND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "đ";

export default function CartPage() {
  const { items, totalItems, subtotal, updateQuantity, removeItem, clear } = useCart();

  return (
    <>
      <PageHeader
        title={`Giỏ hàng của bạn${totalItems > 0 ? ` (${totalItems})` : ""}`}
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1200px] mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <p className="text-5xl mb-3">🛒</p>
              <p className="text-zinc-400 text-lg">Giỏ hàng trống</p>
              <Link href="/" className="mt-4 inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium transition-colors">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex gap-4">
                    <Link href={`/${item.product.category}/${item.product.fullSlug}`} className="w-24 h-24 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/${item.product.category}/${item.product.fullSlug}`} className="text-sm font-semibold text-white line-clamp-2 mb-1 hover:text-orange-400 transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-zinc-500 mb-2">{item.product.brand}</p>
                      <p className="text-orange-500 font-bold">
                        {item.product.price === 0 ? "Liên hệ" : VND(item.product.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.product.id)} className="text-zinc-500 hover:text-red-500 text-xs transition-colors">
                        Xóa
                      </button>
                      <div className="flex items-center bg-zinc-800 rounded-full">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 text-white text-sm hover:text-orange-400 transition-colors">
                          −
                        </button>
                        <span className="w-8 text-center text-sm text-white font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 text-white text-sm hover:text-orange-400 transition-colors">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={clear} className="text-xs text-zinc-500 hover:text-red-400 transition-colors ml-1">
                  Xóa toàn bộ giỏ hàng
                </button>
              </div>

              <aside className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 h-fit space-y-4 sticky top-32">
                <h3 className="text-white font-bold">Tóm tắt đơn hàng</h3>
                <div className="space-y-2 text-sm border-t border-zinc-800 pt-3">
                  <div className="flex justify-between text-zinc-300">
                    <span>Tạm tính ({totalItems} sản phẩm)</span>
                    <span>{VND(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Vận chuyển</span>
                    <span className="text-emerald-500">Miễn phí</span>
                  </div>
                </div>
                <div className="flex justify-between border-t border-zinc-800 pt-3">
                  <span className="text-white font-bold">Tổng cộng</span>
                  <span className="text-orange-500 font-bold text-lg">{VND(subtotal)}</span>
                </div>
                <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors text-sm">
                  Tiến hành thanh toán
                </button>
                <Link href="/" className="block text-center text-xs text-zinc-400 hover:text-orange-400 transition-colors">
                  ← Tiếp tục mua sắm
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
