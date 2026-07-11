import PageHeader from "@/components/shared/PageHeader";
import { products, getProductsByCategory, parseSlug } from "@/lib/data";

export const metadata = { title: "404 — Không tìm thấy trang | Máy Ảnh Việt Nam" };

const VND = (n: number) => n > 0 ? new Intl.NumberFormat("vi-VN").format(n) + "đ" : "Vui lòng gọi";

/** Lấy 4 sản phẩm nổi bật nhất làm gợi ý trên trang 404 */
function getHotProducts() {
  const hotIds = [
    "may-anh-canon-eos-r50-black-kem-lens-rfs-1845-chinh-hang",
    "may-anh-sony-a7-mark-v-a7m5-chinh-hang",
    "flycam-dji-mavic-4-pro-512gb-creator-combo",
    "gopro-hero-13-black",
  ];
  return hotIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;
}

export default function NotFound() {
  const hotProducts = getHotProducts();

  return (
    <>
      <PageHeader
        title="Không tìm thấy trang"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "404" }]}
      />

      <section className="bg-zinc-950 py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          {/* ─── Hero 404 ─── */}
          <div className="relative max-w-4xl mx-auto text-center mb-16">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20">
              <div className="w-[500px] h-[500px] bg-orange-500 rounded-full blur-[120px]" />
            </div>

            {/* Big 404 number */}
            <p className="text-[10rem] md:text-[14rem] font-black leading-none text-zinc-800 select-none">
              404
            </p>

            {/* Illustration: camera SVG inline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center rotate-[-6deg] shadow-2xl shadow-black/60">
                  {/* Camera body */}
                  <div className="relative">
                    {/* Lens */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-zinc-600 bg-zinc-800 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-orange-500 bg-zinc-900 flex items-center justify-center">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-500/60" />
                      </div>
                    </div>
                    {/* Flash */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-zinc-600 rounded-t-sm" />
                    {/* Red dot */}
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  </div>
                </div>
                {/* Cross mark overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-7xl text-red-500/80 font-black rotate-12 drop-shadow-lg">
                      ×
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <h1 className="relative -mt-6 md:-mt-4 text-3xl md:text-4xl font-bold text-white mb-3">
              Ống kính lấy nhầm chỗ rồi!
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mx-auto mb-2">
              Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
            </p>
            <p className="text-zinc-500 text-sm mb-8">
              Đừng lo — quay lại trang chủ hoặc chọn một sản phẩm hot bên dưới nhé.
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                Về trang chủ
              </a>
              <a
                href="tel:0907215252"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-orange-500 text-white font-semibold rounded-full transition-colors"
              >
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi tư vấn: 0907.215.252
              </a>
              <a
                href="/tim-kiem"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white font-semibold rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Tìm kiếm sản phẩm
              </a>
            </div>
          </div>

          {/* ─── GỢI Ý SẢN PHẨM ─── */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-1">
                Đang tìm gì đó?
              </p>
              <h2 className="text-2xl font-bold text-white">
                Sản phẩm đang được quan tâm
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotProducts.map((p) => (
                <a
                  key={p.id}
                  href={`/san-pham/${parseSlug(p.fullSlug)}`}
                  className="group block bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10"
                >
                  <div className="relative aspect-square bg-zinc-950 overflow-hidden">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase z-10">
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                      {p.brand}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-orange-400 transition-colors min-h-[2.5rem]">
                      {p.name}
                    </h3>
                    <p className="text-base font-bold text-orange-500 mt-2">
                      {VND(p.price)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
