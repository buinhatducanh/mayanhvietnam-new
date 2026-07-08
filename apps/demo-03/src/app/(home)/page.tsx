import { Link } from "react-router";
import { Star, ArrowRight, Tag, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react";

const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";
const disc = (orig: number, sale: number) => Math.round((1 - sale / orig) * 100);

const FEATURED = {
  id: "canon-eos-r50",
  name: "Canon EOS R50 Kit 18-45mm",
  price: 17500000,
  orig: 19900000,
  img: "https://images.unsplash.com/photo-1603208234872-619ffa1209cb?w=900&q=90&auto=format&fit=crop",
  tag: "Best Seller",
};

const PRODUCTS = [
  { id: "canon-eos-r50", name: "Canon EOS R50 Kit 18-45mm (Black)", price: 17500000, orig: 19900000, img: "https://images.unsplash.com/photo-1603208234872-619ffa1209cb?w=500&q=80&auto=format&fit=crop", rating: 4.8, reviews: 124, badge: "Best Seller" },
  { id: "sony-a6700", name: "Sony Alpha A6700 Body | Chính Hãng", price: 34990000, orig: 38000000, img: "https://images.unsplash.com/photo-1614746480983-377658e91422?w=500&q=80&auto=format&fit=crop", rating: 4.9, reviews: 88, badge: "Hot" },
  { id: "nikon-z50ii", name: "Nikon Z50 II Kit 16-50mm + 50-250mm", price: 26900000, orig: 29000000, img: "https://images.unsplash.com/photo-1599664223843-9349c75196bc?w=500&q=80&auto=format&fit=crop", rating: 4.7, reviews: 55, badge: null },
  { id: "fuji-xt30", name: "Fujifilm X-T30 II Body | Chính Hãng", price: 24900000, orig: 27000000, img: "https://images.unsplash.com/photo-1580835719614-f302b70e19f9?w=500&q=80&auto=format&fit=crop", rating: 4.9, reviews: 73, badge: "Mới" },
  { id: "sony-a7iv", name: "Sony Alpha A7 IV Body | Chính Hãng", price: 67900000, orig: 72000000, img: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500&q=80&auto=format&fit=crop", rating: 4.9, reviews: 211, badge: "Hot" },
  { id: "canon-r8", name: "Canon EOS R8 Body | Chính Hãng", price: 28900000, orig: 31000000, img: "https://images.unsplash.com/photo-1509255806757-ca81636763ce?w=500&q=80&auto=format&fit=crop", rating: 4.8, reviews: 33, badge: null },
  { id: "dji-mini4", name: "DJI Mini 4 Pro Fly More Combo Plus", price: 21900000, orig: 24500000, img: "https://images.unsplash.com/photo-1651922118429-9fad760bb430?w=500&q=80&auto=format&fit=crop", rating: 4.9, reviews: 160, badge: "Hot" },
  { id: "sandisk-256", name: "SanDisk Extreme Pro 256GB V30 UHS-I", price: 1290000, orig: 1590000, img: "https://images.unsplash.com/photo-1602526432604-029a709e131c?w=500&q=80&auto=format&fit=crop", rating: 4.7, reviews: 412, badge: null },
];

function StarRow({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-zinc-200"} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#f8f8f8] pb-16">
      <div className="max-w-[1440px] mx-auto px-8 pt-6 space-y-10">

        {/* ── HERO ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
          {/* Main banner */}
          <Link to="/product/canon-eos-r50" className="group relative bg-zinc-900 rounded-2xl overflow-hidden min-h-[340px] flex items-end">
            <img
              src={FEATURED.img}
              alt={FEATURED.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
            />
            <div className="relative z-10 p-8">
              <span className="inline-block bg-[#ff6b00] text-white text-xs font-bold px-2.5 py-1 rounded-lg mb-3">
                {FEATURED.tag}
              </span>
              <h2 className="text-3xl font-black text-white leading-tight mb-2 max-w-xs">{FEATURED.name}</h2>
              <p className="text-2xl font-bold text-[#ff6b00] mb-4">{fmt(FEATURED.price)}</p>
              <span className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors">
                Xem chi tiết <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          {/* Side banners */}
          <div className="flex flex-col gap-4">
            {[
              { title: "Sony Alpha A7 IV", sub: "Full-frame 33MP + 4K120p", img: "https://images.unsplash.com/photo-1614746480983-377658e91422?w=500&q=80&auto=format&fit=crop", color: "from-slate-900" },
              { title: "DJI Mini 4 Pro", sub: "4K Omnidirectional Sensing", img: "https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=500&q=80&auto=format&fit=crop", color: "from-zinc-800" },
            ].map(b => (
              <Link key={b.title} to="/" className="group relative bg-zinc-800 rounded-2xl overflow-hidden flex-1 min-h-[156px] flex items-end">
                <img src={b.img} alt={b.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-r ${b.color} to-transparent opacity-70`} />
                <div className="relative z-10 p-5">
                  <p className="text-white font-bold text-base leading-tight">{b.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{b.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── TRUST STRIP ──────────────────────── */}
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-100">
          {[
            { icon: <Truck size={18} className="text-[#ff6b00]" />, title: "Giao hàng miễn phí", sub: "Đơn từ 500.000đ" },
            { icon: <Shield size={18} className="text-emerald-500" />, title: "BH chính hãng 24th", sub: "Canon / Sony / Nikon..." },
            { icon: <Tag size={18} className="text-blue-500" />, title: "Giá tốt nhất", sub: "Cam kết hoàn tiền" },
            { icon: <RotateCcw size={18} className="text-amber-500" />, title: "Đổi trả 30 ngày", sub: "Không cần lý do" },
          ].map(p => (
            <div key={p.title} className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">{p.icon}</div>
              <div>
                <p className="text-sm font-semibold text-zinc-800 leading-tight">{p.title}</p>
                <p className="text-xs text-zinc-400">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── PRODUCTS GRID ────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-[#ff6b00] rounded-full" />
              <h2 className="text-xl font-bold text-zinc-900">Sản phẩm nổi bật</h2>
            </div>
            <a href="#" className="text-sm text-[#ff6b00] hover:underline flex items-center gap-1">
              Xem tất cả <ChevronRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCTS.map(p => (
              <Link
                key={p.id}
                to={p.id === "canon-eos-r50" ? "/product/canon-eos-r50" : "/"}
                className="group bg-white rounded-2xl border border-zinc-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-100/50 transition-all overflow-hidden"
              >
                <div className="aspect-square bg-zinc-50 overflow-hidden relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg">
                    -{disc(p.orig, p.price)}%
                  </span>
                  {p.badge && (
                    <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg ${p.badge === "Hot" ? "bg-red-600" : p.badge === "Mới" ? "bg-emerald-600" : "bg-[#ff6b00]"}`}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-zinc-800 line-clamp-2 mb-2 min-h-[40px] leading-snug">{p.name}</p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <StarRow rating={p.rating} />
                    <span className="text-[11px] text-zinc-400">({p.reviews})</span>
                  </div>
                  <p className="text-base font-bold text-[#ff6b00]">{fmt(p.price)}</p>
                  <p className="text-xs text-zinc-400 line-through">{fmt(p.orig)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
