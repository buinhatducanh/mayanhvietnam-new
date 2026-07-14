"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/lib/cart-context";
import { formatVND, getProductUrl } from "@/lib/products";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const shippingFee = subtotal >= 5000000 ? 0 : 30000;
  const discount = promoApplied ? Math.round(subtotal * 0.05) : 0;
  const finalTotal = subtotal + shippingFee - discount;

  if (items.length === 0) {
    return (
      <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-[1280px] px-8 py-24 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-white border border-[#e9e6e1] flex items-center justify-center mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a39d94" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h1 className="m-0 text-[20px] font-bold text-[#16130f] mb-2">Giỏ hàng trống</h1>
          <p className="m-0 text-[13.5px] text-[#a39d94] mb-8">
            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.
          </p>
          <Link
            href="/danh-muc"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#ff6a00] text-white no-underline text-[13.5px] font-bold shadow-[0_8px_22px_-8px_rgba(255,106,0,0.5)] transition-all hover:bg-[#ea5e00] hover:-translate-y-[2px]"
          >
            Khám phá sản phẩm
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-[1280px] px-8 pt-6 pb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12.5px] text-[#a39d94] mb-6">
          <Link href="/" className="text-[#a39d94] no-underline hover:text-[#ff6a00]">Trang chủ</Link>
          <span>/</span>
          <span className="text-[#16130f] font-semibold">Giỏ hàng</span>
        </nav>

        <div className="flex items-end justify-between mb-6">
          <h1 className="m-0 text-[28px] sm:text-[32px] font-bold tracking-[-0.015em] text-[#16130f]">
            Giỏ hàng <span className="text-[#a39d94] text-[22px] font-medium">({items.length} sản phẩm)</span>
          </h1>
          <button
            type="button"
            onClick={clearCart}
            className="m-0 border-none bg-transparent text-[12.5px] font-semibold text-[#e2483d] cursor-pointer transition-colors hover:text-[#c03b30]"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Items list */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 bg-white border border-[#e9e6e1] rounded-2xl transition-all hover:border-[#d4cec5]"
              >
                <Link
                  href={`/${getProductUrl(item.product.slug)}`}
                  className="w-[96px] h-[96px] rounded-xl border border-[#f1eee9] bg-[#faf9f7] shrink-0 overflow-hidden"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-2"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${getProductUrl(item.product.slug)}`}
                    className="text-[14px] font-medium text-[#16130f] leading-[1.35] line-clamp-2 no-underline hover:text-[#ff6a00]"
                  >
                    {item.product.name}
                  </Link>
                  <p className="m-0 mt-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#a39d94]">
                    {item.product.brand}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#e2ddd6] rounded-lg bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQty(item.product.id, item.qty - 1)}
                        className="w-9 h-9 border-none bg-transparent text-[#7a746c] cursor-pointer flex items-center justify-center hover:text-[#ff6a00]"
                        aria-label="Giảm số lượng"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                          <path d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="w-11 text-center text-[14px] font-bold text-[#16130f] border-l border-r border-[#e9e6e1]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.product.id, item.qty + 1)}
                        className="w-9 h-9 border-none bg-transparent text-[#7a746c] cursor-pointer flex items-center justify-center hover:text-[#ff6a00]"
                        aria-label="Tăng số lượng"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </button>
                    </div>
                    <p className="m-0 text-[16px] font-extrabold text-[#ff6a00]">
                      {formatVND(item.product.price * item.qty)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="self-start w-9 h-9 rounded-lg border-none bg-transparent text-[#a39d94] cursor-pointer flex items-center justify-center transition-all hover:bg-[rgba(226,72,61,0.08)] hover:text-[#e2483d]"
                  aria-label="Xóa sản phẩm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-[140px]">
            <div className="bg-white border border-[#e9e6e1] rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="m-0 text-[15px] font-bold text-[#16130f]">Tóm tắt đơn hàng</h2>

              {/* Promo code */}
              <div>
                <p className="m-0 text-[11px] font-semibold text-[#7a746c] mb-2">Mã giảm giá</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a39d94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Nhập mã..."
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[13px] text-[#16130f] placeholder:text-[#b0a99f] outline-none transition-all focus:border-[#ff6a00] focus:bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (promoCode.toUpperCase() === "GIAM5") setPromoApplied(true);
                    }}
                    className="h-10 px-5 rounded-xl bg-[#ff6a00] text-white border-none text-[13px] font-bold cursor-pointer transition-all hover:bg-[#ea5e00]"
                  >
                    Áp dụng
                  </button>
                </div>
                {promoApplied && (
                  <p className="m-0 mt-2 text-[11.5px] font-semibold text-[#1a9e5c]">
                    ✓ Mã GIAM5 đã áp dụng — giảm 5%!
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="flex flex-col gap-3 text-[13.5px]">
                <div className="flex justify-between">
                  <span className="text-[#7a746c]">Tạm tính</span>
                  <span className="font-semibold text-[#16130f]">{formatVND(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a746c]">Phí vận chuyển</span>
                  <span className={`font-semibold ${shippingFee === 0 ? "text-[#1a9e5c]" : "text-[#16130f]"}`}>
                    {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between">
                    <span className="text-[#7a746c]">Giảm giá (5%)</span>
                    <span className="font-semibold text-[#1a9e5c]">-{formatVND(discount)}</span>
                  </div>
                )}
                <div className="border-t border-[#e9e6e1] pt-3 flex justify-between">
                  <span className="font-bold text-[#16130f]">Tổng cộng</span>
                  <span className="text-[20px] font-black tracking-[-0.01em] text-[#ff6a00]">
                    {formatVND(finalTotal)}
                  </span>
                </div>
              </div>

              <Link
                href="/thanh-toan"
                className="w-full h-12 rounded-2xl bg-[#ff6a00] text-white no-underline text-[14px] font-bold flex items-center justify-center gap-2 shadow-[0_10px_28px_-8px_rgba(255,106,0,0.55)] transition-all hover:bg-[#ea5e00] hover:-translate-y-[1px]"
              >
                Tiến hành thanh toán
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { label: "Bảo hành 24T", icon: "🛡" },
                { label: "Freeship > 5tr", icon: "🚚" },
                { label: "Trả góp 0%", icon: "💳" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-xl bg-white border border-[#e9e6e1]">
                  <span className="text-[16px]">{s.icon}</span>
                  <p className="m-0 mt-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#a39d94]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}