"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatVND, getProductUrl } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-[rgba(22,19,15,0.55)] backdrop-blur-[4px] animate-[fadeIn_0.2s_ease-out]"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 bottom-0 z-[70] w-full sm:w-[420px] bg-white shadow-[-24px_0_60px_-15px_rgba(22,19,15,0.35)] animate-[slideInRight_0.28s_cubic-bezier(0.32,0.72,0,1)] flex flex-col font-sans"
        role="dialog"
        aria-label="Giỏ hàng"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e9e6e1]">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <h2 className="m-0 text-[15px] font-bold tracking-[-0.01em] text-[#16130f]">
              Giỏ hàng {items.length > 0 && <span className="text-[#a39d94] font-medium">({items.length})</span>}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full border-none bg-transparent text-[#7a746c] cursor-pointer flex items-center justify-center transition-all hover:bg-[#f5f2ed] hover:text-[#16130f]"
            aria-label="Đóng"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#f7f4ef] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a39d94" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <p className="m-0 text-[14px] font-semibold text-[#16130f] mb-1">Giỏ hàng trống</p>
              <p className="m-0 text-[12.5px] text-[#a39d94] mb-5">Hãy thêm sản phẩm vào giỏ nhé!</p>
              <Link
                href="/danh-muc"
                onClick={closeDrawer}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl bg-[#ff6a00] text-white no-underline text-[13px] font-bold tracking-[0.01em] shadow-[0_6px_18px_-6px_rgba(255,106,0,0.5)] transition-all hover:bg-[#ea5e00] hover:-translate-y-[1px]"
              >
                Khám phá sản phẩm
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl border border-[#e9e6e1] bg-[#faf9f7] transition-all hover:border-[#d4cec5]"
                >
                  <Link
                    href={`/${getProductUrl(item.product.slug)}`}
                    onClick={closeDrawer}
                    className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-white border border-[#f1eee9] shrink-0"
                  >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <Link
                      href={`/${getProductUrl(item.product.slug)}`}
                      onClick={closeDrawer}
                      className="text-[13px] font-medium text-[#16130f] leading-[1.35] line-clamp-2 no-underline hover:text-[#ff6a00]"
                    >
                      {item.product.name}
                    </Link>
                    <p className="m-0 mt-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#a39d94]">
                      {item.product.brand}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-[#e2ddd6] rounded-lg bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQty(item.product.id, item.qty - 1)}
                          className="w-7 h-7 border-none bg-transparent text-[#7a746c] cursor-pointer flex items-center justify-center hover:text-[#ff6a00]"
                          aria-label="Giảm"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-[12.5px] font-bold text-[#16130f] border-l border-r border-[#e9e6e1]">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.product.id, item.qty + 1)}
                          className="w-7 h-7 border-none bg-transparent text-[#7a746c] cursor-pointer flex items-center justify-center hover:text-[#ff6a00]"
                          aria-label="Tăng"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                      </div>
                      <p className="m-0 text-[14px] font-extrabold text-[#ff6a00]">
                        {formatVND(item.product.price * item.qty)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="self-start w-8 h-8 rounded-lg border-none bg-transparent text-[#a39d94] cursor-pointer flex items-center justify-center transition-all hover:bg-[rgba(226,72,61,0.08)] hover:text-[#e2483d]"
                    aria-label="Xóa"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e9e6e1] px-6 py-5 bg-[#faf9f7]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] text-[#7a746c]">Tạm tính:</span>
              <span className="text-[18px] font-black tracking-[-0.01em] text-[#ff6a00]">
                {formatVND(subtotal)}
              </span>
            </div>
            <p className="m-0 mb-4 text-[11px] text-[#a39d94]">
              {subtotal >= 5000000
                ? "✓ Đủ điều kiện freeship"
                : `Mua thêm ${formatVND(5000000 - subtotal)} để được freeship`}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/gio-hang"
                onClick={closeDrawer}
                className="h-11 rounded-xl border border-[#e2ddd6] bg-white text-[#16130f] no-underline text-[13px] font-bold flex items-center justify-center transition-all hover:border-[#ff6a00] hover:text-[#ff6a00]"
              >
                Xem giỏ hàng
              </Link>
              <Link
                href="/thanh-toan"
                onClick={closeDrawer}
                className="h-11 rounded-xl bg-[#ff6a00] text-white no-underline text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-[0_8px_22px_-8px_rgba(255,106,0,0.55)] transition-all hover:bg-[#ea5e00] hover:-translate-y-[1px]"
              >
                Thanh toán
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}