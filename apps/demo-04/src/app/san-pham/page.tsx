import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useTheme } from "@/app/context";
import { ACCENT, PRODUCTS } from "@/app/data";
import { ProductCard } from "../components/ui";

const CATS = ["Tất cả", "Mirrorless", "DSLR", "Ống kính", "Drone", "Phụ kiện"];
const BRANDS_F = ["Tất cả", "Canon", "Sony", "Nikon", "Fujifilm", "DJI", "Sigma", "Godox"];
const SORTS = ["Nổi bật", "Giá tăng dần", "Giá giảm dần", "Mới nhất", "Đánh giá cao nhất"];

export default function Products() {
  const { dark } = useTheme();
  const [cat, setCat] = useState("Tất cả");
  const [brand, setBrand] = useState("Tất cả");
  const [sort, setSort] = useState("Nổi bật");
  const [showFilter, setShowFilter] = useState(false);

  let filtered = PRODUCTS.filter(p => {
    const catOk = cat === "Tất cả" || p.category === cat;
    const brandOk = brand === "Tất cả" || p.brand === brand;
    return catOk && brandOk;
  });

  if (sort === "Giá tăng dần") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "Giá giảm dần") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "Đánh giá cao nhất") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border py-8 sm:py-10" style={{ background: dark ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.55)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">Danh mục</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Tất cả sản phẩm</h1>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-border sticky top-14 z-40 backdrop-blur-xl" style={{ background: dark ? "rgba(10,10,15,0.94)" : "rgba(255,248,240,0.94)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-3 flex items-center gap-3 flex-wrap">
          {/* Category */}
          <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex-shrink-0"
                style={cat === c ? { background: ACCENT, color: "#fff", boxShadow: "0 4px 14px rgba(255,107,53,0.35)" } : { background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: dark ? "#9991a8" : "#5a4030" }}>
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative flex-shrink-0">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl text-xs font-medium border border-border bg-card text-foreground focus:outline-none cursor-pointer">
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          <button onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium border border-border hover:border-[rgba(255,107,53,0.4)] transition-colors flex-shrink-0"
            style={showFilter ? { borderColor: ACCENT, color: ACCENT } : {}}>
            <SlidersHorizontal size={12} /> Lọc
          </button>
        </div>

        {/* Extended filter panel */}
        {showFilter && (
          <div className="border-t border-border px-5 sm:px-8 py-4 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Thương hiệu:</p>
              {BRANDS_F.map(b => (
                <button key={b} onClick={() => setBrand(b)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  style={brand === b ? { background: ACCENT, color: "#fff" } : { background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: dark ? "#9991a8" : "#5a4030" }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-mono text-muted-foreground">{filtered.length} sản phẩm</p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg font-bold mb-2">Không tìm thấy sản phẩm</p>
            <p className="text-sm text-muted-foreground mb-5">Thử thay đổi bộ lọc để xem thêm sản phẩm.</p>
            <button onClick={() => { setCat("Tất cả"); setBrand("Tất cả"); }}
              className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm" style={{ background: ACCENT }}>
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </>
  );
}
