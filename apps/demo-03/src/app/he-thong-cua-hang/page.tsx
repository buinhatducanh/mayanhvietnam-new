'use client';

import Link from "next/link";
import { MapPin, Phone, Clock, ChevronRight, Navigation } from "lucide-react";
import { stores } from "@mayanhvietnam/mock-data";

export default function StoreLocatorPage() {
  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 py-4">
          <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-700 font-medium">Hệ thống cửa hàng</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Hệ thống cửa hàng</h1>
          <p className="text-sm text-zinc-500">
            {stores.length} cửa hàng trên toàn quốc — Trải nghiệm sản phẩm trực tiếp, nhận tư vấn tận tình từ đội ngũ LENS PRO.
          </p>
        </div>

        {/* Map placeholder */}
        <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl border border-zinc-200 h-[280px] sm:h-[360px] mb-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#ff6b00] rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#ff6b00] rounded-full" />
            <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-[#ff6b00] rounded-full" />
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#ff6b00] rounded-full" />
          </div>
          <div className="text-center relative z-10">
            <MapPin size={40} className="text-[#ff6b00] mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-700">Bản đồ cửa hàng LENS PRO</p>
            <p className="text-xs text-zinc-500 mt-1">Xem vị trí cửa hàng gần bạn nhất</p>
          </div>
        </div>

        {/* Store grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 leading-tight">{store.name}</h2>
                  <span className="inline-block text-[10px] font-semibold tracking-wider text-[#ff6b00] uppercase mt-1">
                    {store.city}
                  </span>
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 text-[#ff6b00]">
                  <MapPin size={18} />
                </div>
              </div>

              <div className="space-y-2.5 text-sm text-zinc-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-zinc-400 shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-zinc-400 shrink-0" />
                  <a href={`tel:${store.phone}`} className="text-[#ff6b00] hover:underline font-medium">
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={14} className="text-zinc-400 shrink-0" />
                  <span>Mở cửa: <strong className="text-zinc-800">{store.hours}</strong> (Tất cả các ngày)</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#ff6b00] border border-[#ff6b00] hover:bg-orange-50 rounded-xl px-3 py-2 transition-colors"
                >
                  <Navigation size={13} /> Chỉ đường
                </a>
                <a
                  href={`tel:${store.phone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-[#ff6b00] hover:bg-[#e85f00] rounded-xl px-3 py-2 transition-colors"
                >
                  <Phone size={13} /> Gọi ngay
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Đặt lịch trải nghiệm sản phẩm</h2>
          <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
            Bạn có thể đến trực tiếp cửa hàng để xem và cầm thử sản phẩm. Đội ngũ tư vấn sẽ hỗ trợ bạn chọn thiết bị phù hợp.
          </p>
          <Link
            href="/thong-tin-lien-he"
            className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e85f00] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Liên hệ tư vấn →
          </Link>
        </div>
      </div>
    </div>
  );
}