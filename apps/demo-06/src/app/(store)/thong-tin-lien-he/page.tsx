import PageHeader from "@/components/shared/PageHeader";
import { storeLocations } from "@/lib/data";

export const metadata = { title: "Thông tin liên hệ — Máy Ảnh Việt Nam" };

export default function LienHePage() {
  return (
    <>
      <PageHeader title="Thông tin liên hệ" subtitle="Hệ thống 4 cửa hàng trên toàn quốc — Hotline: 0937.148.222" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]} />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {storeLocations.map(loc => (
              <div key={loc.city} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                  <h3 className="text-white font-bold text-lg">{loc.city}</h3>
                </div>
                <p className="text-zinc-300 text-sm mb-1">📍 {loc.address}</p>
                <p className="text-zinc-500 text-xs mb-1">🕐 {loc.hours}</p>
                <p className="text-orange-500 text-sm font-medium">📞 {loc.phone}</p>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-white font-bold text-xl mb-4">Liên hệ nhanh</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3 text-zinc-300">
                <p>📞 Hotline: <a href="tel:0907215252" className="text-orange-500 font-semibold">0907.215.252</a></p>
                <p>📞 Hotline: <a href="tel:0937148222" className="text-orange-500 font-semibold">0937.148.222</a></p>
                <p>✉️ <a href="mailto:info@mayanhvietnam.com" className="text-orange-400">info@mayanhvietnam.com</a></p>
              </div>
              <div className="space-y-3 text-zinc-300">
                <p>🌐 Website: <a href="https://mayanhvietnam.com" className="text-orange-400" target="_blank" rel="noopener noreferrer">mayanhvietnam.com</a></p>
                <p>💬 Zalo: <a href="https://zalo.me/0907215252" className="text-orange-400" target="_blank" rel="noopener noreferrer">Chat ngay</a></p>
                <p>📺 YouTube: <a href="https://youtube.com/@mayanhvietnam" className="text-orange-400" target="_blank" rel="noopener noreferrer">@mayanhvietnam</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
