import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Sản phẩm mới — Máy Ảnh Việt Nam" };

export default function SanPhamMoiPage() {
  const newProducts = products.filter(p => p.condition !== "used");
  return (
    <>
      <PageHeader title="Sản phẩm mới" subtitle="100% chính hãng · Bảo hành lên đến 5 năm · Giao hàng toàn quốc" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm mới" }]} />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto"><CategoryGrid products={newProducts} /></div>
      </section>
    </>
  );
}
