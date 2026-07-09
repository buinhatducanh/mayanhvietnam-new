'use client';

import Link from "next/link";
import { ChevronRight, Shield, CheckCircle, Phone } from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-4">
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
          <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-700 font-medium">Chính sách bảo hành</span>
        </nav>

        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Shield size={20} />
            </div>
            <h1 className="text-xl font-bold text-zinc-900">Chính sách bảo hành</h1>
          </div>

          <div className="prose prose-sm max-w-none text-zinc-600 space-y-6 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">1. Bảo hành chính hãng</h2>
              <ul className="space-y-2">
                {[
                  "Máy ảnh, ống kính: Bảo hành chính hãng theo quy định của từng thương hiệu (Canon, Sony, Nikon, Fujifilm, DJI…)",
                  "Phụ kiện: Bảo hành 6-12 tháng tùy sản phẩm",
                  "Thời hạn bảo hành bắt đầu từ ngày mua hàng trên hóa đơn",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">2. Bảo hành mở rộng từ LENS PRO</h2>
              <ul className="space-y-2">
                {[
                  "LENS PRO bổ sung thêm 6 tháng bảo hành cho tất cả sản phẩm máy ảnh và ống kính",
                  "Tổng thời gian bảo hành lên đến 30 tháng cho thân máy ảnh",
                  "Dịch vụ vệ sinh cảm biến miễn phí trong thời gian bảo hành",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-[#ff6b00] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">3. Điều kiện bảo hành</h2>
              <ul className="space-y-1 list-disc list-inside text-zinc-600 text-sm">
                <li>Sản phẩm còn trong thời hạn bảo hành</li>
                <li>Hóa đơn mua hàng còn nguyên vẹn</li>
                <li>Sản phẩm bị lỗi do nhà sản xuất (không bảo hành lỗi do rơi vỡ, vào nước, thiên tai)</li>
                <li>Số serial/IMEI trên sản phẩm phải trùng khớp với phiếu bảo hành</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">4. Thời gian xử lý</h2>
              <p>Kiểm tra và xử lý bảo hành trong vòng <strong>5-10 ngày làm việc</strong>. Trong trường hợp cần gửi về hãng, thời gian có thể lên đến 15-20 ngày.</p>
            </section>

            <section className="bg-emerald-50 rounded-xl p-4">
              <p className="text-sm text-zinc-700 font-medium">
                📞 Hotline bảo hành: <a href="tel:0937148222" className="text-[#ff6b00] font-bold">0937 148 222</a>
              </p>
              <p className="text-xs text-zinc-500 mt-1">Hoặc mang sản phẩm trực tiếp đến cửa hàng gần nhất.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}