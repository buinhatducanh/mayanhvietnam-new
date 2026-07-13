import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Máy ảnh Mirrorless — Máy Ảnh Việt Nam" };

export default function MayAnhPage() {
  const list = products.filter((p) => p.category === "camera");
  return (
    <>
      <PageHeader
        title="Máy ảnh Mirrorless"
        subtitle="Canon · Sony · Nikon · Fujifilm chính hãng — Tư vấn body, kit và lens combo phù hợp"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Máy ảnh Mirrorless" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={list} />
        </div>
      </section>
    </>
  );
}
