'use client';

import Link from "next/link";
import { ChevronRight, Lock, Eye, Shield, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-4">
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
          <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-700 font-medium">Chính sách bảo mật</span>
        </nav>

        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Lock size={20} />
            </div>
            <h1 className="text-xl font-bold text-zinc-900">Chính sách bảo mật</h1>
          </div>

          <p className="text-sm text-zinc-500 mb-6">Cập nhật lần cuối: 01/01/2026</p>

          <div className="prose prose-sm max-w-none text-zinc-600 space-y-6 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">1. Thu thập thông tin</h2>
              <div className="space-y-2">
                <div className="flex gap-3 items-start p-3 rounded-xl border border-zinc-100">
                  <Eye size={16} className="text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">Thông tin cá nhân</p>
                    <p className="text-xs text-zinc-500">Họ tên, số điện thoại, email, địa chỉ giao hàng — chỉ thu thập khi bạn đặt hàng hoặc liên hệ.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-xl border border-zinc-100">
                  <Database size={16} className="text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">Thông tin kỹ thuật</p>
                    <p className="text-xs text-zinc-500">Địa chỉ IP, loại trình duyệt, cookies — để cải thiện trải nghiệm và thống kê truy cập.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">2. Mục đích sử dụng</h2>
              <ul className="space-y-1 list-disc list-inside text-sm">
                <li>Xử lý và giao đơn hàng</li>
                <li>Liên hệ hỗ trợ kỹ thuật và bảo hành</li>
                <li>Gửi thông báo về đơn hàng, khuyến mãi (nếu bạn đồng ý nhận)</li>
                <li>Cải thiện chất lượng dịch vụ và trải nghiệm website</li>
                <li>Báo cáo thống kê nội bộ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">3. Bảo vệ thông tin</h2>
              <ul className="space-y-1 list-disc list-inside text-sm">
                <li>Mã hóa SSL 256-bit cho tất cả giao dịch</li>
                <li>Không lưu trữ thông tin thẻ tín dụng</li>
                <li>Không mua bán thông tin cá nhân cho bên thứ ba</li>
                <li>Truy cập hệ thống được kiểm soát và ghi nhận log</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-800 mb-3">4. Quyền của khách hàng</h2>
              <ul className="space-y-1 list-disc list-inside text-sm">
                <li>Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân</li>
                <li>Từ chối nhận email marketing bất cứ lúc nào</li>
                <li>Yêu cầu giải thích cách dữ liệu được sử dụng</li>
              </ul>
            </section>

            <section className="bg-indigo-50 rounded-xl p-4">
              <p className="text-sm text-zinc-700">
                🔒 Nếu bạn có câu hỏi về bảo mật dữ liệu, liên hệ:{" "}
                <a href="mailto:privacy@lenspro.vn" className="text-[#ff6b00] font-bold">privacy@lenspro.vn</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}