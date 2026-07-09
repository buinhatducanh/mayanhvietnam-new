'use client';

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
          <nav className="text-xs text-gray-400 mb-3 flex gap-2">
            <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-700">Liên hệ</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-gray-500 text-sm mt-1">Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
        {/* Info cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { Icon:MapPin, title:"Địa chỉ", lines:["123 Nguyễn Huệ, Quận 1", "TP. Hồ Chí Minh"], color:"bg-orange-50 text-orange-500" },
            { Icon:Phone, title:"Hotline", lines:["1800 6789 (Miễn phí)", "024 1234 5678 (Hà Nội)"], color:"bg-blue-50 text-blue-500" },
            { Icon:Mail, title:"Email", lines:["support@camerastorevn.com", "sales@camerastorevn.com"], color:"bg-green-50 text-green-500" },
            { Icon:Clock, title:"Giờ làm việc", lines:["Thứ 2 – Thứ 7: 8:00–20:00", "Chủ nhật: 9:00–18:00"], color:"bg-purple-50 text-purple-500" },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${c.color.split(" ")[0]} flex items-center justify-center mb-3`}>
                <c.Icon size={18} className={c.color.split(" ")[1]} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">{c.title}</h3>
              {c.lines.map(l => <p key={l} className="text-xs text-gray-500">{l}</p>)}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
              Gửi Tin Nhắn
            </h2>
            <p className="text-sm text-gray-500 mb-6">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>

            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Gửi thành công!</h3>
                <p className="text-gray-500 text-sm">Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.</p>
                <button onClick={() => { setSent(false); setForm({ name:"",email:"",phone:"",subject:"",message:"" }); }}
                  className="mt-6 text-orange-500 font-bold text-sm hover:underline">Gửi tin nhắn khác</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Họ và tên *</label>
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Số điện thoại</label>
                    <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                      placeholder="0901 234 567"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                    placeholder="email@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Chủ đề</label>
                  <select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="">-- Chọn chủ đề --</option>
                    <option>Tư vấn sản phẩm</option>
                    <option>Đặt hàng & Vận chuyển</option>
                    <option>Bảo hành & Sửa chữa</option>
                    <option>Đổi trả hàng</option>
                    <option>Hợp tác kinh doanh</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nội dung *</label>
                  <textarea required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                    placeholder="Nhập nội dung tin nhắn..."
                    rows={5}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:bg-white transition-all resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-orange-200">
                  <Send size={15} /> Gửi tin nhắn
                </button>
              </form>
            )}
          </div>

          {/* Map placeholder + store info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=400&fit=crop&auto=format"
                  alt="Store location map"
                  className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-300 mb-2">
                    <MapPin size={22} className="text-white" />
                  </div>
                  <span className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-md">
                    123 Nguyễn Huệ, Quận 1, TP.HCM
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                CÁC CHI NHÁNH
              </h3>
              <div className="space-y-4">
                {[
                  { city:"TP. Hồ Chí Minh", addr:"123 Nguyễn Huệ, Quận 1", tel:"028 1234 5678", hours:"8:00 – 20:00" },
                  { city:"Hà Nội", addr:"456 Hoàn Kiếm, Quận Hoàn Kiếm", tel:"024 1234 5678", hours:"8:00 – 19:00" },
                  { city:"Đà Nẵng", addr:"789 Trần Phú, Hải Châu", tel:"0236 123 4567", hours:"9:00 – 18:00" },
                ].map(s => (
                  <div key={s.city} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{s.city}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.addr}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.tel} · {s.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
