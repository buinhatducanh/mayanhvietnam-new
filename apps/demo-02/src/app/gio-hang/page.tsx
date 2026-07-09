'use client';

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Shield, Tag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const fmtVND = (n: number) => n.toLocaleString("vi-VN") + " ₫";

export default function Cart() {
  const { items, remove, update, total, count } = useCart();
  const shipping = total > 5000000 ? 0 : 50000;
  const discount = Math.round(total * 0.05);
  const finalTotal = total + shipping - discount;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
          <nav className="text-xs text-gray-400 mb-3 flex gap-2">
            <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-700">Giỏ hàng</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
            Giỏ Hàng
          </h1>
          <p className="text-gray-500 text-sm mt-1">{count} sản phẩm trong giỏ</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <ShoppingBag size={56} className="mb-4 opacity-20" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Giỏ hàng trống</h2>
            <p className="text-sm mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link href="/san-pham"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 transition-colors">
              <ArrowRight size={15} /> Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Items list */}
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-start hover:shadow-md transition-shadow">
                  <Link href={`/san-pham/${item.id}`}>
                    <div className="w-24 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/san-pham/${item.id}`}>
                      <h3 className="text-sm font-bold text-gray-900 hover:text-orange-500 transition-colors line-clamp-2 leading-snug mb-1">{item.name}</h3>
                    </Link>
                    <p className="text-xs text-gray-400 mb-3">Hàng chính hãng · Còn hàng</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {/* Quantity control */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => update(item.id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                          <Minus size={13} className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">{item.qty}</span>
                        <button onClick={() => update(item.id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                          <Plus size={13} className="text-gray-600" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-base font-extrabold text-orange-500">{fmtVND(item.price * item.qty)}</span>
                        <button onClick={() => remove(item.id)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors group">
                          <Trash2 size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/san-pham"
                className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:underline mt-2">
                <ArrowRight size={14} className="rotate-180" /> Tiếp tục mua sắm
              </Link>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              {/* Promo code */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag size={15} className="text-orange-500" /> Mã giảm giá
                </h3>
                <div className="flex gap-2">
                  <input placeholder="Nhập mã khuyến mãi..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-all" />
                  <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                    Áp dụng
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính ({count} sản phẩm)</span>
                    <span className="font-semibold">{fmtVND(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : "font-semibold"}>
                      {shipping === 0 ? "Miễn phí" : fmtVND(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá (5%)</span>
                    <span className="font-semibold">-{fmtVND(discount)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-orange-500">{fmtVND(finalTotal)}</span>
                  </div>
                </div>

                <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-orange-200">
                  <ShoppingBag size={16} /> Tiến hành thanh toán
                </button>

                {/* Trust row */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {[
                    { Icon:Truck, label:"Giao hàng nhanh" },
                    { Icon:Shield, label:"Bảo hành chính hãng" },
                  ].map(b => (
                    <div key={b.label} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <b.Icon size={13} className="text-orange-500" /> {b.label}
                    </div>
                  ))}
                </div>

                {/* Payment icons */}
                <div className="flex justify-center gap-2 mt-4">
                  {["VISA","MC","MOMO","VNPAY","ZaloPay"].map(p => (
                    <span key={p} className="bg-gray-100 rounded px-2 py-1 text-[9px] font-bold text-gray-500">{p}</span>
                  ))}
                </div>
              </div>

              {/* Free shipping notice */}
              {shipping > 0 && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-xs text-orange-700">
                  <span className="font-bold">Miễn phí vận chuyển</span> cho đơn hàng từ 5.000.000 ₫.
                  Bạn còn thiếu <strong>{fmtVND(5000000 - total)}</strong> để được miễn phí ship.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
