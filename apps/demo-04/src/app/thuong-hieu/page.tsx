'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "@/app/context";
import { ACCENT, vnd, BRANDS, PRODUCTS } from "@/app/data";
import { ProductCard } from "@/app/components/ui";

export default function Brands() {
  const router = useRouter();
  const { dark } = useTheme();
  const [active, setActive] = useState<string | null>(null);

  const activeBrand = active ? BRANDS.find(b => b.id === active) : null;
  const brandProducts = activeBrand
    ? PRODUCTS.filter(p => p.brand.toLowerCase() === activeBrand.name.toLowerCase()).slice(0, 4)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: dark ? "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,107,53,0.14) 0%, transparent 70%)" : "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,107,53,0.07) 0%, transparent 70%)" }} />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative text-center">
          <span className="inline-block text-[9px] font-mono font-bold tracking-[0.28em] px-3 py-1 rounded-sm mb-5" style={{ background: "rgba(255,107,53,0.13)", color: ACCENT, border: "1px solid rgba(255,107,53,0.28)" }}>THƯƠNG HIỆU</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Đối tác chính hãng</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Camera Store là đại lý uỷ quyền chính thức của 8 thương hiệu máy ảnh và thiết bị nhiếp ảnh hàng đầu thế giới.
          </p>
        </div>
      </section>

      {/* Brand grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {BRANDS.map(brand => (
              <div key={brand.id}
                onClick={() => setActive(active === brand.id ? null : brand.id)}
                className="group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: active === brand.id ? ACCENT : "var(--border)",
                  boxShadow: active === brand.id ? (dark ? "0 0 32px rgba(255,107,53,0.18)" : "0 8px 32px rgba(255,107,53,0.12)") : "",
                }}>
                {/* Image */}
                <div className="relative overflow-hidden bg-muted" style={{ height: 180 }}>
                  <img src={brand.img} alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
                  {/* Logo text on image */}
                  <div className="absolute bottom-3 left-4">
                    <p className="text-white font-mono font-black text-xl tracking-widest">{brand.name.toUpperCase()}</p>
                    <p className="text-white/55 text-[10px] font-mono">{brand.country} · Est. {brand.founded}</p>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4" style={{ background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.75)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">{brand.products} sản phẩm</span>
                    {active === brand.id && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm font-bold text-white" style={{ background: ACCENT }}>Đang xem</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{brand.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold" style={{ color: ACCENT }}>
                    Xem sản phẩm <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand spotlight */}
      {activeBrand && (
        <section className="border-t border-border py-10 sm:py-14" style={{ background: dark ? "rgba(255,107,53,0.04)" : "rgba(255,107,53,0.03)" }}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
            {/* Brand header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
              <div className="flex-1">
                <p className="text-[9px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-2">Thương hiệu nổi bật</p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">{activeBrand.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{activeBrand.desc}</p>
                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  {[
                    { label: "Thành lập", value: activeBrand.founded.toString() },
                    { label: "Quốc gia", value: activeBrand.country },
                    { label: "Sản phẩm", value: `${activeBrand.products}+` },
                    { label: "Bảo hành", value: "24 tháng" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col">
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
                      <span className="font-mono font-bold text-base" style={{ color: ACCENT }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full sm:w-72 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={activeBrand.img} alt={activeBrand.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
                  <p className="text-white font-mono font-black text-4xl tracking-widest">{activeBrand.name.toUpperCase()}</p>
                </div>
              </div>
            </div>

            {/* Brand products */}
            {brandProducts.length > 0 ? (
              <>
                <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-5">Sản phẩm {activeBrand.name}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {brandProducts.map(p => <ProductCard key={p.id} p={p} />)}
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p className="text-sm">Đang cập nhật sản phẩm {activeBrand.name}...</p>
              </div>
            )}
            <div className="flex justify-center">
              <button onClick={() => router.push("/san-pham")}
                className="px-7 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                style={{ background: ACCENT, boxShadow: dark ? "0 0 24px rgba(255,107,53,0.4)" : "0 4px 16px rgba(255,107,53,0.3)" }}>
                Xem tất cả sản phẩm {activeBrand.name} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Partner strip */}
      <section className="py-12 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-6">Cam kết của Camera Store</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { v: "100%", l: "Hàng chính hãng", d: "Có tem, invoice, serial check" },
              { v: "8",    l: "Thương hiệu đối tác", d: "Đại lý uỷ quyền chính thức" },
              { v: "24T",  l: "Bảo hành chính hãng", d: "Hỗ trợ bảo hành toàn quốc" },
              { v: "0₫",   l: "Chi phí vận chuyển", d: "Miễn phí giao hàng từ 500K" },
            ].map(({ v, l, d }) => (
              <div key={l} className="p-5 rounded-2xl border border-border text-center" style={{ background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.7)" }}>
                <p className="text-3xl font-mono font-black mb-1" style={{ color: ACCENT }}>{v}</p>
                <p className="text-xs font-bold mb-1">{l}</p>
                <p className="text-[10px] text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
