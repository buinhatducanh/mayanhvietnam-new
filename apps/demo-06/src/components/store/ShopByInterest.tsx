"use client";
import { products } from "@/lib/data";

const categories = [
  { id: "weddings", label: "Chụp ảnh cưới", icon: "💍", count: 24 },
  { id: "portrait", label: "Chân dung", icon: "👤", count: 18 },
  { id: "landscape", label: "Phong cảnh", icon: "🏔️", count: 32 },
  { id: "wildlife", label: "Động vật hoang dã", icon: "🦅", count: 15 },
];

const recommendedProducts = (categoryId: string) => {
  switch (categoryId) {
    case "weddings":
      return products.filter((p) => p.category === "lens").slice(0, 3);
    case "portrait":
      return products.filter((p) => p.category === "camera" || p.category === "lens").slice(0, 3);
    case "landscape":
      return products.filter((p) => p.category === "flycam").slice(0, 3);
    case "wildlife":
      return products.filter((p) => p.name.toLowerCase().includes("sigma") || p.category === "lens").slice(0, 3);
    default:
      return [];
  }
};

export default function ShopByInterest() {
  return (
    <section className="bg-zinc-950 py-14 px-6 border-t border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">
              Mua theo nhu cầu
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Bạn chụp ảnh gì?
            </h2>
          </div>
          <a href="#" className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors">
            Tư vấn miễn phí →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const recs = recommendedProducts(cat.id);
            return (
              <div
                key={cat.id}
                className="group bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center text-center p-6 relative">
                  <div className="text-5xl mb-3">{cat.icon}</div>
                  <h3 className="text-white font-bold text-lg">{cat.label}</h3>
                  <p className="text-zinc-500 text-xs mt-1">{cat.count} sản phẩm gợi ý</p>
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors" />
                </div>

                <div className="p-4 space-y-2 border-t border-zinc-800">
                  {recs.length === 0 ? (
                    <p className="text-xs text-zinc-500 text-center py-2">Đang cập nhật...</p>
                  ) : (
                    recs.map((p) => (
                      <a
                        key={p.id}
                        href={`/${p.category}/${p.slug}`}
                        className="flex items-center gap-2 hover:bg-zinc-800/50 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                      >
                        <div className="w-10 h-10 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white font-medium line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-orange-500 font-bold">
                            {p.callForPrice ? "Liên hệ" : new Intl.NumberFormat("vi-VN").format(p.price) + "₫"}
                          </p>
                        </div>
                        <svg className="w-3 h-3 text-zinc-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}