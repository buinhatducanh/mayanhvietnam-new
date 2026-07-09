'use client';

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Truck, Phone } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || `LP${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg w-full">
        {/* Success icon */}
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25" />
          <div className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-2xl font-black text-zinc-900 mb-2">Đặt hàng thành công!</h1>
        <p className="text-sm text-zinc-500 mb-1">Cảm ơn bạn đã đặt hàng tại LENS PRO.</p>
        <p className="text-sm text-zinc-500 mb-8">
          Mã đơn hàng:{" "}
          <span className="font-bold text-[#ff6b00] font-mono">{orderNumber}</span>
        </p>

        {/* Order info cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: <Phone size={20} />, title: "Xác nhận", desc: "Gọi xác nhận trong 30 phút" },
            { icon: <Package size={20} />, title: "Đóng gói", desc: "Chuẩn bị trong 1-2h" },
            { icon: <Truck size={20} />, title: "Giao hàng", desc: "2-4 ngày toàn quốc" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-black/[0.06] p-4 text-center">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-[#ff6b00]">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-zinc-800">{item.title}</p>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-orange-50 rounded-2xl border border-orange-100 p-4 mb-6 text-sm text-zinc-600">
          <p>Hotline hỗ trợ: <a href="tel:0937148222" className="font-bold text-[#ff6b00]">0937 148 222</a></p>
          <p className="text-xs text-zinc-400 mt-1">Hoặc nhắn tin qua Zalo / Messenger để được hỗ trợ nhanh nhất.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#ff6b00] hover:bg-[#e85f00] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            href="/danh-muc/may-anh"
            className="inline-flex items-center justify-center gap-2 border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Xem thêm sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-zinc-200 border-t-[#ff6b00] rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}