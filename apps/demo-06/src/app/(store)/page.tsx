import HeroBanner from "@/components/store/HeroBanner";
import BrandStrip from "@/components/store/BrandStrip";
import GraphicNavigation from "@/components/store/GraphicNavigation";
import TrustBar from "@/components/store/TrustBar";
import CategorySection from "@/components/store/CategorySection";
import ReviewVideos from "@/components/store/ReviewVideos";
import StoreFooter from "@/components/store/StoreFooter";
import { storeLocations, brandAssets, paymentMethods } from "@/lib/data";

const CATEGORY_SECTIONS = [
  { catSlug: "may-anh",      category: "camera"  as const, title: "Máy ảnh",            emoji: "📷", viewAllHref: "/danh-muc/may-anh",          limit: 4 },
  { catSlug: "ong-kinh",     category: "lens"    as const, title: "Ống kính",            emoji: "🔭", viewAllHref: "/danh-muc/ong-kinh",         limit: 4 },
  { catSlug: "flycam",       category: "flycam"  as const, title: "Flycam",              emoji: "🚁", viewAllHref: "/danh-muc/flycam",            limit: 4 },
  { catSlug: "action-camera",category: "action"  as const, title: "Camera hành động",    emoji: "🏃", viewAllHref: "/danh-muc/action-camera",     limit: 4 },
  { catSlug: "thiet-bi-studio", category: "studio" as const, title: "Thiết bị studio",   emoji: "💡", viewAllHref: "/danh-muc/thiet-bi-studio",   limit: 4 },
  { catSlug: "phu-kien",     category: "accessory" as const, title: "Phụ kiện",          emoji: "🎒", viewAllHref: "/danh-muc/phu-kien",          limit: 4 },
];

export default function Home() {
  return (
    <>
      {/* ── 1. HERO CAROUSEL — panoramic 3:1 ── */}
      <HeroBanner />

      {/* ── 2. TRUST STRIP ── */}
      <TrustBar />

      {/* ── 3. BRAND STRIP ── */}
      <BrandStrip />

      {/* ── 4. CATEGORY GRID — icon nav ── */}
      <GraphicNavigation />

      {/* ── 5. CATEGORY SECTIONS — mỗi category có banner + products ── */}
      {CATEGORY_SECTIONS.map((sec) => (
        <CategorySection
          key={sec.catSlug}
          catSlug={sec.catSlug}
          category={sec.category}
          title={sec.title}
          emoji={sec.emoji}
          viewAllHref={sec.viewAllHref}
          limit={sec.limit}
        />
      ))}

      {/* ── 6. YOUTUBE REVIEWS ── */}
      <ReviewVideos />

      {/* ── 7. VÌ SAO CHỌN CHÚNG TÔI ── */}
      <section className="bg-zinc-950 py-12 px-6 border-t border-zinc-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900 p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-5 rounded-full bg-orange-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Tại sao chọn mayanhvietnam.com?</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🛡️", title: "100% Chính hãng", desc: "Cam kết chính hãng, có hóa đơn VAT và bảo hành toàn quốc." },
                { icon: "🎯", title: "Tư vấn chuyên sâu", desc: "Đội ngũ nhiếp ảnh gia kinh nghiệm tư vấn free." },
                { icon: "🚚", title: "Giao hàng nhanh", desc: "Freeship đơn từ 5 triệu, đổi trả 7 ngày." },
                { icon: "💳", title: "Trả góp linh hoạt", desc: "0% lãi suất qua thẻ tín dụng, thủ tục nhanh gọn." },
              ].map((f) => (
                <div key={f.title} className="flex flex-col items-center text-center">
                  <span className="text-3xl mb-3">{f.icon}</span>
                  <h3 className="text-sm font-bold text-white mb-1.5">{f.title}</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. BỘ CÔNG THƯƠNG + PAYMENT ICONS ── */}
      <section className="bg-zinc-950 pb-12 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={brandAssets.logoBCT} alt="Bộ Công Thương" className="h-14 w-auto shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Đã đăng ký Bộ Công Thương</p>
                <p className="text-[11px] text-zinc-400">Website TMĐT chính thức · Giao dịch an toàn</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {Object.values(brandAssets.paymentIcons).map((icon) => (
                <div
                  key={icon}
                  className="relative h-9 w-14 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden"
                >
                  <img src={icon} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-contain p-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
