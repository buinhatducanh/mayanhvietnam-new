'use client';

import Link from "next/link";
import { ChevronRight, CreditCard, Smartphone, Building2, Truck, Shield } from "lucide-react";

export default function PaymentPage() {
  const methods = [
    { icon: <Truck size={18} />, name: "COD", desc: "Thanh toán khi nhận hàng (Cash on Delivery)", detail: "Áp dụng cho đơn hàng dưới 10.000.000đ" },
    { icon: <Building2 size={18} />, name: "Chuyển khoản ngân hàng", desc: "Chuyển khoản qua Vietcombank, VPBank, Techcombank, Sacombank", detail: "Gửi biên lai chuyển khoản để xác nhận đơn hàng nhanh hơn" },
    { icon: <CreditCard size={18} />, name: "Thẻ tín dụng / Ghi nợ", desc: "Hỗ trợ VISA, MasterCard, JCB, NAPAS", detail: "Trả góp 0% lãi suất 6-12 tháng qua thẻ tín dụng" },
    { icon: <Smartphone size={18} />, name: "Ví MoMo", desc: "Thanh toán nhanh qua ví điện tử MoMo", detail: "Quét QR code MoMo để thanh toán" },
    { icon: <CreditCard size={18} />, name: "HomePayLater", desc: "Trả góp 0% qua HomePayLater", detail: "Kỳ hạn 6-12 tháng, phê duyệt trong 5 phút" },
  ];

  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-4">
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
          <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-700 font-medium">Chính sách thanh toán</span>
        </nav>

        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff6b00]">
              <CreditCard size={20} />
            </div>
            <h1 className="text-xl font-bold text-zinc-900">Chính sách thanh toán</h1>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-4">Phương thức thanh toán</h2>
              <div className="space-y-3">
                {methods.map((m) => (
                  <div key={m.name} className="flex gap-4 items-start p-4 rounded-xl border border-zinc-100 hover:border-orange-100 transition-colors">
                    <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center text-[#ff6b00] shrink-0">{m.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">{m.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{m.desc}</p>
                      <p className="text-[11px] text-zinc-400 mt-1 italic">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-zinc-50 rounded-xl p-5">
              <h2 className="text-base font-bold text-zinc-800 mb-3">Thông tin chuyển khoản</h2>
              <div className="space-y-1 text-sm text-zinc-600">
                <p><strong>Ngân hàng:</strong> Vietcombank — Chi nhánh TP.HCM</p>
                <p><strong>Số TK:</strong> 1234 5678 9012</p>
                <p><strong>Chủ TK:</strong> CÔNG TY TNHH LENS PRO VIETNAM</p>
                <p><strong>Nội dung CK:</strong> [Họ tên] + [Mã đơn hàng]</p>
              </div>
            </section>

            <section className="bg-orange-50 rounded-xl p-5 flex gap-3 items-start">
              <Shield size={18} className="text-[#ff6b00] shrink-0 mt-0.5" />
              <div className="text-sm text-zinc-600">
                <p className="font-semibold text-zinc-800 mb-1">Bảo mật thanh toán</p>
                <p className="text-xs">Tất cả giao dịch đều được mã hóa SSL 256-bit. LENS PRO không lưu trữ thông tin thẻ tín dụng của khách hàng.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}