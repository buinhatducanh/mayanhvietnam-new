'use client';

import Link from "next/link";
import { ChevronRight, Truck, MapPin, Clock, Package, CheckCircle } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-4">
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
          <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-700 font-medium">Chính sách vận chuyển</span>
        </nav>

        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Truck size={20} />
            </div>
            <h1 className="text-xl font-bold text-zinc-900">Chính sách vận chuyển</h1>
          </div>

          <div className="prose prose-sm max-w-none text-zinc-600 space-y-6 leading-relaxed">
            {/* Free shipping */}
            <section className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
              <p className="text-sm font-bold text-emerald-700 mb-2">🚚 Miễn phí giao hàng toàn quốc</p>
              <p className="text-sm text-zinc-600">Đơn hàng từ <strong className="text-emerald-700">500.000đ</strong> được miễn phí giao hàng trên toàn quốc. Đơn dưới 500.000đ phí giao hàng cố định 50.000đ.</p>
            </section>

            {/* Delivery times */}
            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-4">Thời gian giao hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <Clock size={16} className="text-blue-500" />, area: "Hà Nội & TP.HCM", time: "Trong ngày", note: "Đặt trước 15h" },
                  { icon: <Clock size={16} className="text-blue-500" />, area: "Tỉnh thành gần", time: "1-2 ngày", note: "Miễn phí ship đơn từ 500K" },
                  { icon: <Clock size={16} className="text-blue-500" />, area: "Miền Trung & Tây Nguyên", time: "2-3 ngày", note: "Miễn phí ship đơn từ 500K" },
                  { icon: <Clock size={16} className="text-blue-500" />, area: "Miền Bắc & Nam (xa)", time: "3-4 ngày", note: "Miễn phí ship đơn từ 500K" },
                ].map((item) => (
                  <div key={item.area} className="flex gap-3 items-start p-3 rounded-xl border border-zinc-100">
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">{item.area}</p>
                      <p className="text-sm text-[#ff6b00] font-medium">{item.time}</p>
                      <p className="text-[11px] text-zinc-400">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Express shipping */}
            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">Giao hàng hỏa tốc</h2>
              <ul className="space-y-2">
                {[
                  "Áp dụng tại Hà Nội và TP.HCM",
                  "Đặt trước 10:00 sáng → giao trong ngày",
                  "Phí giao hàng hỏa tốc: 80.000đ (không miễn phí)",
                  "Gọi hotline 0937 148 222 để đặt giao hỏa tốc",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Self pickup */}
            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">Nhận tại cửa hàng (Click & Collect)</h2>
              <p className="text-sm">Đặt hàng online và nhận tại cửa hàng gần nhất của LENS PRO (4 cửa hàng trên toàn quốc). Phí vận chuyển: <strong>0đ</strong>.</p>
            </section>

            {/* Packaging */}
            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">Đóng gói & Bảo hiểm</h2>
              <ul className="space-y-1 list-disc list-inside text-sm">
                <li>Sản phẩm được đóng gói cẩn thận với bubble wrap + thùng cứng</li>
                <li>Sản phẩm trên 1 triệu đồng được mua bảo hiểm vận chuyển (bồi thường 100% nếu bị hư hại)</li>
                <li>Kiểm tra hàng trước khi thanh toán (đối với COD)</li>
              </ul>
            </section>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-zinc-700">
                📞 Hotline vận chuyển: <a href="tel:0937148222" className="text-[#ff6b00] font-bold">0937 148 222</a> (8h–22h hàng ngày)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}