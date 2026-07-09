'use client';

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ChevronDown } from "lucide-react";
import { useTheme } from "@/app/context";
import { ACCENT, STORES } from "@/app/data";

const FAQS = [
  { q: "Làm thế nào để kiểm tra sản phẩm có phải hàng chính hãng không?", a: "Tất cả sản phẩm tại Camera Store đều có tem chống giả của hãng, invoice VAT và serial number có thể tra cứu trực tiếp trên website của nhà sản xuất. Chúng tôi cam kết 100% hàng chính hãng." },
  { q: "Chính sách đổi trả như thế nào?", a: "Camera Store hỗ trợ đổi trả trong vòng 30 ngày kể từ ngày mua hàng, không cần lý do. Sản phẩm cần còn nguyên seal, đầy đủ phụ kiện và không có dấu hiệu đã qua sử dụng." },
  { q: "Có hỗ trợ trả góp không?", a: "Có. Chúng tôi hỗ trợ trả góp 0% lãi suất qua các ngân hàng liên kết (Sacombank, VPBank, Shinhan Bank) và ví điện tử MoMo, ZaloPay. Thủ tục duyệt nhanh trong 5 phút." },
  { q: "Dịch vụ bảo hành được thực hiện như thế nào?", a: "Bảo hành chính hãng 24 tháng tại tất cả trung tâm bảo hành của nhà sản xuất trên toàn quốc. Riêng sản phẩm DJI, Canon và Sony, chúng tôi có trung tâm bảo hành liên kết ngay tại cửa hàng." },
  { q: "Có thể đặt hàng online và nhận tại cửa hàng không?", a: "Có. Bạn có thể đặt hàng trực tuyến và chọn hình thức nhận tại bất kỳ cửa hàng nào trong 4 chi nhánh của chúng tôi. Thời gian chuẩn bị hàng thường trong vòng 2 giờ." },
];

export default function Contact() {
  const { dark } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [activeStore, setActiveStore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: dark ? "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(255,107,53,0.12) 0%, transparent 65%)" : "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(255,107,53,0.06) 0%, transparent 65%)" }} />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center relative">
          <span className="inline-block text-[9px] font-mono font-bold tracking-[0.28em] px-3 py-1 rounded-sm mb-5" style={{ background: "rgba(255,107,53,0.13)", color: ACCENT, border: "1px solid rgba(255,107,53,0.28)" }}>LIÊN HỆ</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Chúng tôi luôn sẵn sàng</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Cần tư vấn chọn máy, hỏi về chính sách hay cần hỗ trợ kỹ thuật? Đội ngũ chuyên gia của Camera Store luôn sẵn sàng giúp bạn.
          </p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="py-10 border-b border-border" style={{ background: dark ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.6)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, title: "Hotline", val: "1800 6789", sub: "Miễn phí · 8:00–21:00 mỗi ngày", color: ACCENT },
              { icon: Mail,  title: "Email",   val: "support@camerastore.vn", sub: "Phản hồi trong vòng 2 giờ", color: "#3b82f6" },
              { icon: MapPin,title: "Cửa hàng",val: "4 chi nhánh toàn quốc", sub: "HCM · Hà Nội · Đà Nẵng · Cần Thơ", color: "#22c55e" },
            ].map(({ icon: Icon, title, val, sub, color }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-2xl border border-border transition-all hover:border-[rgba(255,107,53,0.4)]"
                style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-0.5">{title}</p>
                  <p className="text-sm font-bold">{val}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + Stores */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Form */}
            <div>
              <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">Gửi tin nhắn</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Để lại thông tin</h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-border text-center"
                  style={{ background: dark ? "rgba(34,197,94,0.05)" : "rgba(34,197,94,0.05)", borderColor: "rgba(34,197,94,0.35)" }}>
                  <CheckCircle size={48} className="text-emerald-500" />
                  <h3 className="text-lg font-bold">Gửi thành công!</h3>
                  <p className="text-sm text-muted-foreground">Chúng tôi sẽ liên hệ lại với bạn trong vòng 2 giờ làm việc.</p>
                  <button onClick={() => setSent(false)} className="px-5 py-2 rounded-xl text-sm font-semibold text-white mt-2" style={{ background: ACCENT }}>
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "name",  label: "Họ và tên *",   type: "text",  ph: "Nguyễn Văn A" },
                      { key: "phone", label: "Số điện thoại *", type: "tel",   ph: "0909 123 456" },
                    ].map(({ key, label, type, ph }) => (
                      <div key={key}>
                        <label className="text-[10px] font-mono font-bold tracking-[0.15em] text-muted-foreground uppercase block mb-1.5">{label}</label>
                        <input type={type} required placeholder={ph}
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                          style={{ caretColor: ACCENT }}
                          onFocus={e => e.currentTarget.style.borderColor = "rgba(255,107,53,0.5)"}
                          onBlur={e => e.currentTarget.style.borderColor = ""} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold tracking-[0.15em] text-muted-foreground uppercase block mb-1.5">Email</label>
                    <input type="email" placeholder="email@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                      style={{ caretColor: ACCENT }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(255,107,53,0.5)"}
                      onBlur={e => e.currentTarget.style.borderColor = ""} />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold tracking-[0.15em] text-muted-foreground uppercase block mb-1.5">Chủ đề</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none transition-all appearance-none"
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(255,107,53,0.5)"}
                      onBlur={e => e.currentTarget.style.borderColor = ""}>
                      <option value="">Chọn chủ đề...</option>
                      <option>Tư vấn chọn sản phẩm</option>
                      <option>Hỗ trợ kỹ thuật</option>
                      <option>Chính sách bảo hành</option>
                      <option>Trả góp & thanh toán</option>
                      <option>Đặt hàng & giao hàng</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold tracking-[0.15em] text-muted-foreground uppercase block mb-1.5">Nội dung *</label>
                    <textarea required rows={5} placeholder="Nhập nội dung cần hỗ trợ..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all resize-none"
                      style={{ caretColor: ACCENT }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(255,107,53,0.5)"}
                      onBlur={e => e.currentTarget.style.borderColor = ""} />
                  </div>
                  <button type="submit"
                    className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: ACCENT, boxShadow: dark ? "0 0 24px rgba(255,107,53,0.4)" : "0 4px 16px rgba(255,107,53,0.3)" }}>
                    <Send size={15} /> Gửi tin nhắn
                  </button>
                </form>
              )}
            </div>

            {/* Stores */}
            <div>
              <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">Hệ thống cửa hàng</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">4 cửa hàng toàn quốc</h2>

              <div className="space-y-3 mb-6">
                {STORES.map((store, i) => (
                  <div key={store.city} onClick={() => setActiveStore(i)}
                    className="p-4 rounded-2xl border cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: activeStore === i ? ACCENT : "var(--border)",
                      background: activeStore === i ? (dark ? "rgba(255,107,53,0.07)" : "rgba(255,107,53,0.05)") : (dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.7)"),
                    }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-bold flex items-center gap-2">
                          {activeStore === i && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />}
                          {store.city}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1.5">
                          <MapPin size={11} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />{store.address}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-mono font-bold" style={{ color: ACCENT }}>{store.phone}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5 flex items-center gap-1 justify-end">
                          <Clock size={9} />{store.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl border border-border overflow-hidden relative" style={{ height: 240 }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.28)" }}>
                    <MapPin size={26} style={{ color: ACCENT }} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">{STORES[activeStore].city}</p>
                    <p className="text-xs text-muted-foreground">{STORES[activeStore].address}</p>
                  </div>
                  <button className="text-xs font-bold px-4 py-2 rounded-xl text-white hover:opacity-90 transition-all" style={{ background: ACCENT }}>
                    Mở Google Maps
                  </button>
                </div>
                {/* Grid dots decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                  style={{ backgroundImage: `radial-gradient(circle, ${ACCENT} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-12 sm:py-16" style={{ background: dark ? "rgba(255,255,255,0.016)" : "rgba(255,248,240,0.6)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Câu hỏi thường gặp</h2>
            </div>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden transition-all"
                  style={{ borderColor: openFaq === i ? "rgba(255,107,53,0.4)" : "var(--border)", background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.75)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
                    <p className="text-sm font-semibold leading-snug">{faq.q}</p>
                    <ChevronDown size={16} className="flex-shrink-0 text-muted-foreground transition-transform duration-200"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", color: openFaq === i ? ACCENT : "" }} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
