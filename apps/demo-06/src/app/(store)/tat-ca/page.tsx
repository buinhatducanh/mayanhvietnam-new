import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Xem tất cả sản phẩm — Máy Ảnh Việt Nam" };

export default function TatCaPage() {
  return (
    <>
      <PageHeader title="Tất cả sản phẩm" subtitle="Máy ảnh · Ống kính · Flycam · Action Cam · Studio · Phụ kiện chính hãng" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm" }]} />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={products} />
        </div>
      </section>
    </>
  );
}
