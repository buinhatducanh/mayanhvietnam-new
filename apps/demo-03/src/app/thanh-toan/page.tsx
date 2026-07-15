'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Truck, CreditCard, Smartphone, Building2, Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { formatVND } from "../../../lib/shared-utils";

type PaymentMethod = "cod" | "bank" | "card" | "momo";
type DeliveryMethod = "standard" | "express";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [delivery, setDelivery] = useState<DeliveryMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "TP. Hồ Chí Minh",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-[1000px] mx-auto px-4 py-16 text-center">
        <p className="text-zinc-500 mb-4">Giỏ hàng trống.</p>
        <Link href="/" className="text-[#ff6b00] hover:underline">← Quay về trang chủ</Link>
      </div>
    );
  }

  const shippingFee = delivery === "express" ? 80_000 : total >= 1_000_000 ? 0 : 50_000;
  const discount = Math.round(total * 0.05);
  const finalTotal = total - discount + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500)); // Simulate API call
    const orderNumber = `LP${Date.now().toString().slice(-8)}`;
    clearCart();
    router.push(`/don-hang-thanh-cong?order=${orderNumber}`);
  };

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const paymentMethods = [
    { id: "cod" as PaymentMethod, icon: <Truck size={18} />, label: "COD", sub: "Nhận hàng rồi trả tiền" },
    { id: "bank" as PaymentMethod, icon: <Building2 size={18} />, label: "Chuyển khoản", sub: "Ngân hàng Vietcombank, VPBank…" },
    { id: "card" as PaymentMethod, icon: <CreditCard size={18} />, label: "Thẻ tín dụng", sub: "VISA, Mastercard, JCB" },
    { id: "momo" as PaymentMethod, icon: <Smartphone size={18} />, label: "MoMo", sub: "Thanh toán qua ví MoMo" },
  ];

  const deliveryMethods = [
    { id: "standard" as DeliveryMethod, label: "Tiêu chuẩn", sub: "2-4 ngày", fee: total >= 1_000_000 ? 0 : 50_000 },
    { id: "express" as DeliveryMethod, label: "Hỏa tốc", sub: "Trong ngày (HN & HCM)", fee: 80_000 },
  ];

  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-screen">
      <div className="max-w-[1100px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-zinc-400 mb-4">
          <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
          <ChevronRight size={12} />
          <Link href="/cart" className="hover:text-[#ff6b00]">Giỏ hàng</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-700 font-medium">Thanh toán</span>
        </nav>

        <h1 className="text-xl font-bold text-zinc-900 mb-6">Thanh toán đơn hàng</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
          {/* Left: Form */}
          <div className="flex-1 space-y-4">

            {/* Shipping info */}
            <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6">
              <h2 className="text-base font-bold text-zinc-900 mb-4">Thông tin giao hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="0912 345 678"
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00] transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="email@example.com"
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00] transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Địa chỉ cụ thể *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={update("address")}
                    placeholder="123 Lý Chính Thắng, Phường 9, Quận 3"
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00] transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Tỉnh / Thành phố</label>
                  <select
                    value={form.city}
                    onChange={update("city")}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00] transition-colors bg-white"
                  >
                    {["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "An Giang", "Tiền Giang", "Khác"].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Ghi chú đơn hàng</label>
                  <textarea
                    value={form.note}
                    onChange={update("note")}
                    placeholder="Giao giờ hành chính, gọi trước khi giao…"
                    rows={2}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Delivery method */}
            <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6">
              <h2 className="text-base font-bold text-zinc-900 mb-4">Phương thức vận chuyển</h2>
              <div className="space-y-2">
                {deliveryMethods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      delivery === m.id ? "border-[#ff6b00] bg-orange-50" : "border-zinc-100 hover:border-zinc-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={m.id}
                      checked={delivery === m.id}
                      onChange={() => setDelivery(m.id)}
                      className="accent-[#ff6b00]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-zinc-800">{m.label}</p>
                      <p className="text-xs text-zinc-500">{m.sub}</p>
                    </div>
                    <span className="text-sm font-semibold text-zinc-700">
                      {m.fee === 0 ? "Miễn phí" : formatVND(m.fee)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6">
              <h2 className="text-base font-bold text-zinc-900 mb-4">Phương thức thanh toán</h2>
              <div className="space-y-2">
                {paymentMethods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      payment === m.id ? "border-[#ff6b00] bg-orange-50" : "border-zinc-100 hover:border-zinc-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="accent-[#ff6b00]"
                    />
                    <div className="w-9 h-9 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-600">
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-zinc-800">{m.label}</p>
                      <p className="text-xs text-zinc-500">{m.sub}</p>
                    </div>
                    {payment === m.id && <Check size={16} className="text-[#ff6b00]" />}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:w-[360px] shrink-0">
            <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 sticky top-24 space-y-4">
              <h2 className="font-bold text-base text-zinc-900">Đơn hàng của bạn</h2>

              {/* Items */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg bg-zinc-50 object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-700 line-clamp-2 leading-snug">{item.name}</p>
                      {item.variant && <p className="text-[11px] text-zinc-400">{item.variant}</p>}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] text-zinc-500">x{item.qty}</span>
                        <span className="text-sm font-semibold text-zinc-800">{formatVND(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Tổng tiền hàng</span>
                  <span>{formatVND(total)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Giảm giá</span>
                  <span>-{formatVND(discount)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Phí vận chuyển</span>
                  <span className={shippingFee === 0 ? "text-emerald-600 font-medium" : ""}>
                    {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                  </span>
                </div>
                <div className="border-t border-zinc-100 pt-2 flex justify-between font-bold text-base">
                  <span>Tổng cộng</span>
                  <span className="text-[#ff6b00]">{formatVND(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !form.name || !form.phone || !form.address}
                className="w-full bg-[#ff6b00] hover:bg-[#e85f00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý…
                  </>
                ) : (
                  <>ĐẶT HÀNG NGAY →</>
                )}
              </button>

              <p className="text-center text-xs text-zinc-400">
                Bằng cách đặt hàng, bạn đồng ý với{" "}
                <Link href="/chinh-sach-bao-mat" className="text-[#ff6b00] hover:underline">chính sách bảo mật</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}