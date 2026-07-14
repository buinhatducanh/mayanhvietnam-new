"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/lib/cart-context";
import { formatVND, getProductUrl } from "@/lib/products";

type Step = "shipping" | "payment" | "confirm" | "done";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    note: "",
  });
  const [payment, setPayment] = useState<"cod" | "bank" | "card">("cod");

  const shippingFee = subtotal >= 5000000 ? 0 : 30000;
  const finalTotal = subtotal + shippingFee;

  const handlePlaceOrder = () => {
    clearCart();
    setStep("done");
  };

  const [orderId] = useState(() => Math.floor(10000 + Math.random() * 90000));

  // Empty cart
  if (items.length === 0 && step !== "done") {
    return (
      <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-[560px] px-8 py-24 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-white border border-[#e9e6e1] flex items-center justify-center mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a39d94" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h1 className="m-0 text-[20px] font-bold text-[#16130f] mb-2">Không có sản phẩm</h1>
          <Link href="/danh-muc" className="inline-block mt-4 text-[13.5px] font-bold text-[#ff6a00] no-underline hover:text-[#ea5e00]">
            Tiếp tục mua sắm →
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  // Order success
  if (step === "done") {
    return (
      <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-[560px] px-8 py-24 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-[rgba(26,158,92,0.1)] flex items-center justify-center mb-6">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a9e5c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="m-0 text-[28px] font-black tracking-[-0.015em] text-[#16130f] mb-3">
            Đặt hàng thành công!
          </h1>
          <p className="m-0 text-[14px] text-[#7a746c] mb-1">
            Đơn hàng <span className="font-bold text-[#ff6a00]">#{orderId}</span> đang được xử lý.
          </p>
          <p className="m-0 text-[12.5px] text-[#a39d94] mb-8">
            Chúng tôi sẽ liên hệ bạn trong 30 phút để xác nhận.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="h-11 px-6 rounded-xl bg-[#ff6a00] text-white no-underline text-[13.5px] font-bold flex items-center justify-center gap-2 shadow-[0_8px_22px_-8px_rgba(255,106,0,0.5)] transition-all hover:bg-[#ea5e00]"
            >
              Về trang chủ
            </Link>
            <Link
              href="/danh-muc"
              className="h-11 px-6 rounded-xl bg-white border border-[#e2ddd6] text-[#16130f] no-underline text-[13.5px] font-semibold flex items-center justify-center gap-2 transition-all hover:border-[#ff6a00]"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const stepList: { key: Step; label: string }[] = [
    { key: "shipping", label: "Giao hàng" },
    { key: "payment", label: "Thanh toán" },
    { key: "confirm", label: "Xác nhận" },
  ];
  const currentStepIdx = stepList.findIndex((s) => s.key === step);

  return (
    <div className="font-sans bg-[#fafaf8] text-[#16130f] min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-[1280px] px-8 pt-6 pb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12.5px] text-[#a39d94] mb-6">
          <Link href="/" className="text-[#a39d94] no-underline hover:text-[#ff6a00]">Trang chủ</Link>
          <span>/</span>
          <Link href="/gio-hang" className="text-[#a39d94] no-underline hover:text-[#ff6a00]">Giỏ hàng</Link>
          <span>/</span>
          <span className="text-[#16130f] font-semibold">Thanh toán</span>
        </nav>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {stepList.map((s, i) => {
            const done = i < currentStepIdx;
            const active = s.key === step;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 transition-all ${
                    active
                      ? "bg-[#ff6a00] text-white"
                      : done
                        ? "bg-[#1a9e5c] text-white"
                        : "bg-white border border-[#e9e6e1] text-[#a39d94]"
                  }`}
                >
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-[12.5px] font-semibold hidden sm:inline ${active ? "text-[#16130f]" : "text-[#a39d94]"}`}>
                  {s.label}
                </span>
                {i < stepList.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${i < currentStepIdx ? "bg-[#1a9e5c]" : "bg-[#e9e6e1]"} hidden sm:block`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div>
            {/* Shipping form */}
            {step === "shipping" && (
              <section className="bg-white border border-[#e9e6e1] rounded-2xl p-7">
                <h2 className="m-0 text-[16px] font-bold text-[#16130f] mb-6">Thông tin giao hàng</h2>
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#7a746c] mb-1.5">Họ và tên *</label>
                      <input
                        type="text"
                        value={shipping.name}
                        onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[14px] text-[#16130f] placeholder:text-[#b0a99f] outline-none transition-all focus:border-[#ff6a00] focus:bg-white"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#7a746c] mb-1.5">Số điện thoại *</label>
                      <input
                        type="tel"
                        value={shipping.phone}
                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[14px] text-[#16130f] placeholder:text-[#b0a99f] outline-none transition-all focus:border-[#ff6a00] focus:bg-white"
                        placeholder="0912 345 678"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-semibold text-[#7a746c] mb-1.5">Địa chỉ *</label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[14px] text-[#16130f] placeholder:text-[#b0a99f] outline-none transition-all focus:border-[#ff6a00] focus:bg-white"
                      placeholder="Số nhà, đường..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#7a746c] mb-1.5">Tỉnh / Thành *</label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[14px] text-[#16130f] placeholder:text-[#b0a99f] outline-none transition-all focus:border-[#ff6a00] focus:bg-white"
                        placeholder="TP.HCM"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#7a746c] mb-1.5">Quận / Huyện *</label>
                      <input
                        type="text"
                        value={shipping.district}
                        onChange={(e) => setShipping({ ...shipping, district: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[14px] text-[#16130f] placeholder:text-[#b0a99f] outline-none transition-all focus:border-[#ff6a00] focus:bg-white"
                        placeholder="Quận 3"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-semibold text-[#7a746c] mb-1.5">Ghi chú</label>
                    <textarea
                      value={shipping.note}
                      onChange={(e) => setShipping({ ...shipping, note: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#e2ddd6] bg-[#faf9f7] text-[14px] text-[#16130f] placeholder:text-[#b0a99f] outline-none resize-none transition-all focus:border-[#ff6a00] focus:bg-white"
                      placeholder="Ghi chú đơn hàng..."
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="h-12 px-8 rounded-2xl bg-[#ff6a00] text-white border-none text-[14px] font-bold cursor-pointer transition-all hover:bg-[#ea5e00] hover:-translate-y-[1px]"
                  >
                    Tiếp tục
                  </button>
                </div>
              </section>
            )}

            {/* Payment method */}
            {step === "payment" && (
              <section className="bg-white border border-[#e9e6e1] rounded-2xl p-7">
                <h2 className="m-0 text-[16px] font-bold text-[#16130f] mb-6">Phương thức thanh toán</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { key: "cod" as const, title: "Thanh toán khi nhận hàng (COD)", desc: "Trả tiền mặt cho shipper", iconPath: "M17 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4m-4-3h4m-4 0-2 2m6-2-2-2" },
                    { key: "bank" as const, title: "Chuyển khoản ngân hàng", desc: "Chuyển khoản trước khi giao", iconPath: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" },
                    { key: "card" as const, title: "Thẻ tín dụng / ATM", desc: "Visa, MasterCard, JCB", iconPath: "M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Zm-9 12H7m4-4H7" },
                  ].map((m) => (
                    <label
                      key={m.key}
                      className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                        payment === m.key
                          ? "border-[#ff6a00] bg-[rgba(255,106,0,0.04)] shadow-[0_0_0_2px_rgba(255,106,0,0.12)]"
                          : "border-[#e9e6e1] bg-white hover:border-[#d4cec5]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          payment === m.key ? "border-[#ff6a00]" : "border-[#d4cec5]"
                        }`}
                      >
                        {payment === m.key && <div className="w-2.5 h-2.5 rounded-full bg-[#ff6a00]" />}
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a746c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={m.iconPath} />
                      </svg>
                      <div>
                        <p className="m-0 text-[14px] font-semibold text-[#16130f]">{m.title}</p>
                        <p className="m-0 mt-0.5 text-[11.5px] text-[#a39d94]">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="h-12 px-6 rounded-2xl bg-white border border-[#e2ddd6] text-[#7a746c] text-[13.5px] font-semibold cursor-pointer flex items-center gap-2 transition-all hover:border-[#ff6a00] hover:text-[#ff6a00]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5" />
                      <path d="m12 19-7-7 7-7" />
                    </svg>
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("confirm")}
                    className="h-12 px-8 rounded-2xl bg-[#ff6a00] text-white border-none text-[14px] font-bold cursor-pointer transition-all hover:bg-[#ea5e00] hover:-translate-y-[1px]"
                  >
                    Tiếp tục
                  </button>
                </div>
              </section>
            )}

            {/* Confirm */}
            {step === "confirm" && (
              <section className="bg-white border border-[#e9e6e1] rounded-2xl p-7">
                <h2 className="m-0 text-[16px] font-bold text-[#16130f] mb-6">Xác nhận đơn hàng</h2>
                <div className="flex flex-col gap-4">
                  <div className="bg-[#faf9f7] rounded-xl p-5 text-[13.5px]">
                    <p className="m-0 font-bold text-[#16130f] mb-1">Thông tin giao hàng</p>
                    <p className="m-0 text-[#7a746c]">
                      {shipping.name || "—"} · {shipping.phone || "—"}
                    </p>
                    <p className="m-0 text-[#7a746c]">
                      {shipping.address || "—"}, {shipping.district || "..."}, {shipping.city || "..."}
                    </p>
                    {shipping.note && <p className="m-0 mt-1 text-[#a39d94] text-[12px]">Ghi chú: {shipping.note}</p>}
                  </div>
                  <div className="bg-[#faf9f7] rounded-xl p-5 text-[13.5px]">
                    <p className="m-0 font-bold text-[#16130f] mb-1">Thanh toán</p>
                    <p className="m-0 text-[#7a746c]">
                      {payment === "cod" ? "Thanh toán khi nhận hàng (COD)" : payment === "bank" ? "Chuyển khoản ngân hàng" : "Thẻ tín dụng / ATM"}
                    </p>
                  </div>
                  <div className="bg-[#faf9f7] rounded-xl p-5">
                    <p className="m-0 font-bold text-[#13.5px] text-[#16130f] mb-3">Sản phẩm ({items.length})</p>
                    <div className="flex flex-col gap-3">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg border border-[#e9e6e1] bg-white overflow-hidden shrink-0">
                            <img src={item.product.thumbnail} alt="" className="w-full h-full object-contain p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="m-0 text-[12.5px] font-medium text-[#16130f] truncate">{item.product.name}</p>
                            <p className="m-0 text-[11px] text-[#a39d94]">x{item.qty}</p>
                          </div>
                          <p className="m-0 font-mono text-[12.5px] font-bold text-[#16130f] shrink-0">
                            {formatVND(item.product.price * item.qty)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="h-12 px-6 rounded-2xl bg-white border border-[#e2ddd6] text-[#7a746c] text-[13.5px] font-semibold cursor-pointer flex items-center gap-2 transition-all hover:border-[#ff6a00] hover:text-[#ff6a00]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5" />
                      <path d="m12 19-7-7 7-7" />
                    </svg>
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="h-12 px-8 rounded-2xl bg-[#ff6a00] text-white border-none text-[14px] font-bold cursor-pointer flex items-center gap-2 shadow-[0_10px_28px_-8px_rgba(255,106,0,0.55)] transition-all hover:bg-[#ea5e00] hover:-translate-y-[1px]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Đặt hàng · {formatVND(finalTotal)}
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:sticky lg:top-[140px]">
            <div className="bg-white border border-[#e9e6e1] rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="m-0 text-[15px] font-bold text-[#16130f]">Đơn hàng của bạn</h3>
              <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg border border-[#e9e6e1] bg-[#faf9f7] overflow-hidden shrink-0">
                      <img src={item.product.thumbnail} alt="" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="m-0 text-[12.5px] font-medium text-[#16130f] truncate leading-tight">
                        {item.product.name}
                      </p>
                      <p className="m-0 text-[11px] text-[#a39d94]">x{item.qty}</p>
                    </div>
                    <p className="m-0 font-mono text-[12.5px] font-bold text-[#ff6a00] shrink-0">
                      {formatVND(item.product.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e9e6e1] pt-4 flex flex-col gap-2.5 text-[13.5px]">
                <div className="flex justify-between">
                  <span className="text-[#7a746c]">Tạm tính</span>
                  <span className="font-semibold text-[#16130f]">{formatVND(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a746c]">Phí ship</span>
                  <span className={`font-semibold ${shippingFee === 0 ? "text-[#1a9e5c]" : "text-[#16130f]"}`}>
                    {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                  </span>
                </div>
                <div className="border-t border-[#e9e6e1] pt-3 flex justify-between">
                  <span className="font-bold text-[#16130f]">Tổng cộng</span>
                  <span className="text-[20px] font-black tracking-[-0.01em] text-[#ff6a00]">{formatVND(finalTotal)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 px-1">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p className="m-0 text-[11px] text-[#a39d94] leading-tight">
                Thông tin được bảo mật tuyệt đối.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}