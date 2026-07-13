import PageHeader from "@/components/shared/PageHeader";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/store/ProductGrid";

export const metadata = { title: "Flash Sale — Máy Ảnh Việt Nam" };

export default function FlashSalePage() {
  const featured = ["p4", "f2", "a1", "p9", "l6", "s1"];
  const flashProducts = products.filter(p => featured.includes(p.id));
  return (
    <>
      <PageHeader title="⚡ Flash Sale — Ưu đãi cực sốc" subtitle="Số lượng có hạn — Mua ngay kẻo hết!" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Flash Sale" }]}>
        <div className="mt-4 flex items-center gap-4">
          <div className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold animate-pulse">HOT</div>
          <p className="text-orange-400 text-sm">Kết thúc trong: 02:34:15</p>
        </div>
      </PageHeader>
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {flashProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
