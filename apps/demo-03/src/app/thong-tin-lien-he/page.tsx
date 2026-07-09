'use client';

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
import { stores } from "@mayanhvietnam/mock-data";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setForm({ name: "", phone: "", email: "", message: "" });
      setSent(false);
    }, 3000);
  };

  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 py-4">
          <Link href="/" className="hover:text-[#ff6b00]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-700 font-medium">Liên hệ</span>
        </nav>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Liên hệ với LENS PRO</h1>
          <p className="text-sm text-zinc-500 max-w-md mx-auto">
            Đội ngũ tư vấn sẵn sàng hỗ trợ bạn chọn sản phẩm phù hợp. Phản hồi trong vòng 30 phút (giờ làm việc).
          </p>
        </div>

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <a href="tel:0937148222" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-5 hover:shadow-md hover:border-orange-100 transition-all">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff6b00] mb-3">
              <Phone size={20} />
            </div>
            <p className="text-sm font-semibold text-zinc-800">Hotline</p>
            <p className="text-base font-bold text-[#ff6b00] mt-1">0937 148 222</p>
            <p className="text-xs text-zinc-400 mt-1">Miễn phí cước gọi</p>
          </a>
          <a href="mailto:info@lenspro.vn" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-5 hover:shadow-md hover:border-orange-100 transition-all">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff6b00] mb-3">
              <Mail size={20} />
            </div>
            <p className="text-sm font-semibold text-zinc-800">Email</p>
            <p className="text-base font-bold text-[#ff6b00] mt-1 break-all">info@lenspro.vn</p>
            <p className="text-xs text-zinc-400 mt-1">Phản hồi trong 24h</p>
          </a>
          <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-5">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff6b00] mb-3">
              <MessageCircle size={20} />
            </div>
            <p className="text-sm font-semibold text-zinc-800">Chat trực tiếp</p>
            <p className="text-base font-bold text-[#ff6b00] mt-1">Zalo / Messenger</p>
            <p className="text-xs text-zinc-400 mt-1">8:00 - 22:00 mỗi ngày</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6">
            <h2 className="text-base font-bold text-zinc-900 mb-4">Gửi tin nhắn cho chúng tôi</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Họ tên *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1.5">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1.5">Nội dung *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tôi quan tâm đến sản phẩm…"
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff6b00] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                className="w-full sm:w-auto bg-[#ff6b00] hover:bg-[#e85f00] disabled:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {sent ? "✓ Đã gửi thành công" : (<><Send size={14} /> Gửi tin nhắn</>)}
              </button>
            </form>
          </div>

          {/* Stores list */}
          <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6">
            <h2 className="text-base font-bold text-zinc-900 mb-4">Địa chỉ cửa hàng</h2>
            <div className="space-y-4">
              {stores.map((store) => (
                <div key={store.id} className="pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                  <h3 className="text-sm font-semibold text-zinc-800">{store.name}</h3>
                  <div className="mt-2 space-y-1.5 text-xs text-zinc-500">
                    <div className="flex items-start gap-2">
                      <MapPin size={12} className="mt-0.5 shrink-0 text-zinc-400" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="shrink-0 text-zinc-400" />
                      <span className="text-[#ff6b00]">{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="shrink-0 text-zinc-400" />
                      <span>{store.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/he-thong-cua-hang"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff6b00] hover:underline"
            >
              Xem bản đồ cửa hàng <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}