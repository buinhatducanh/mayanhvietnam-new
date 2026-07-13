import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Phụ kiện máy ảnh — Máy Ảnh Việt Nam" };

export default function PhuKienPage() {
  const list = products.filter((p) => p.category === "accessory");
  return (
    <>
      <PageHeader
        title="Phụ kiện máy ảnh"
        subtitle="Túi Billingham · Filter · Tripod · Phụ kiện chính hãng"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Phụ kiện" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={list} />
        </div>
      </section>
    </>
  );
}
