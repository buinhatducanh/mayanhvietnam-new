import PageHeader from "@/components/shared/PageHeader";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/store/ProductGrid";

export const metadata = { title: "Sản phẩm khuyến mãi — Máy Ảnh Việt Nam" };

export default function KhuyenMaiPage() {
  const promoProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);
  return (
    <>
      <PageHeader title="Sản phẩm khuyến mãi" subtitle="Giảm giá sốc — Canon, Sony, Nikon, DJI chính hãng" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Khuyến mãi" }]}>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
          <span className="text-red-400 text-sm font-semibold">🔥 Đang có {promoProducts.length} sản phẩm khuyến mãi</span>
        </div>
      </PageHeader>
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          {promoProducts.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
              <p className="text-4xl mb-3">🎁</p>
              <p className="text-zinc-400">Hiện chưa có khuyến mãi nào. Theo dõi fanpage để nhận thông báo!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {promoProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
