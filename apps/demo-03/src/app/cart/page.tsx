'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, Tag, Truck } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { formatVND } from "../../../lib/shared-utils";

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 flex flex-col items-center gap-4 text-center">
        <ShoppingBag size={64} className="text-zinc-200" />
        <h2 className="text-xl font-bold text-zinc-800">Giỏ hàng trống</h2>
        <p className="text-sm text-zinc-500 max-w-xs">Chưa có sản phẩm nào trong giỏ. Hãy khám phá và thêm sản phẩm bạn yêu thích.</p>
        <Link
          href="/"
          className="mt-2 bg-[#ff6b00] hover:bg-[#e85f00] text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
        >
          Tiếp tục mua sắm <ChevronRight size={16} />
        </Link>
      </div>
    );
  }

  const shipping = total >= 1_000_000 ? 0 : 50_000;
  const discount = Math.round(total * 0.05);
  const finalTotal = total - discount + shipping;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-zinc-400 mb-4">
        <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
        <ChevronRight size={12} />
        <span className="text-zinc-700 font-medium">Giỏ hàng</span>
      </nav>

      <h1 className="text-xl font-bold text-zinc-900 mb-4">Giỏ hàng ({items.length} sản phẩm)</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Items */}
        <div className="flex-1 space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-black/[0.06] p-4 flex gap-4">
              <Link href={`/san-pham/${item.slug}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-zinc-50"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/san-pham/${item.slug}`} className="text-sm font-medium text-zinc-800 hover:text-[#ff6b00] line-clamp-2">
                  {item.name}
                </Link>
                {item.variant && (
                  <p className="text-xs text-zinc-500 mt-0.5">Phân loại: {item.variant}</p>
                )}
                <p className="text-[#ff6b00] font-bold text-sm mt-1">{formatVND(item.price)}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden">
                    <button
                      className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 text-zinc-600 transition-colors"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 text-zinc-600 transition-colors"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <Link href="/" className="text-sm text-[#ff6b00] hover:underline flex items-center gap-1">
              <ChevronRight size={14} className="rotate-180" /> Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-[340px] shrink-0 space-y-3">
          {/* Coupon */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-4">
            <p className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Tag size={14} className="text-[#ff6b00]" /> Mã giảm giá</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Nhập mã" className="flex-1 border border-zinc-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff6b00]" />
              <button className="bg-[#ff6b00] text-white text-sm px-4 rounded-xl font-medium hover:bg-[#e85f00] transition-colors">
                Áp dụng
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-4">
            <h3 className="font-semibold text-base mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-zinc-700">
                <span>Tổng tiền hàng</span>
                <span>{formatVND(total)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Giảm giá (5%)</span>
                <span>-{formatVND(discount)}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>Phí giao hàng</span>
                <span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>
                  {shipping === 0 ? "Miễn phí" : formatVND(shipping)}
                </span>
              </div>
              {shipping === 0 && (
                <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1">
                  <Truck size={11} /> Miễn phí vận chuyển
                </div>
              )}
            </div>
            <div className="border-t border-zinc-100 pt-3 flex justify-between font-bold text-base">
              <span>Tổng cộng</span>
              <span className="text-[#ff6b00]">{formatVND(finalTotal)}</span>
            </div>

            <button
              onClick={() => router.push("/thanh-toan")}
              className="mt-4 w-full bg-[#ff6b00] hover:bg-[#e85f00] text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-orange-200"
            >
              THANH TOÁN NGAY
            </button>

            <div className="mt-3 text-center text-xs text-zinc-500">
              Bảo mật SSL · Giao hàng toàn quốc
            </div>
          </div>

          {/* Policies */}
          <div className="bg-orange-50 rounded-2xl border border-orange-100 p-3 space-y-2 text-xs text-zinc-600">
            {[
              "✓ Bảo hành chính hãng 24 tháng",
              "✓ Miễn phí giao hàng đơn từ 1 triệu",
              "✓ Đổi trả dễ dàng trong 30 ngày",
              "✓ Hỗ trợ kỹ thuật miễn phí trọn đời",
            ].map(p => <p key={p}>{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}