import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Ống kính chính hãng — Máy Ảnh Việt Nam" };

export default function OngKinhPage() {
  const list = products.filter((p) => p.category === "lens");
  return (
    <>
      <PageHeader
        title="Ống kính chính hãng"
        subtitle="Canon RF · Sony FE · Nikon Z · Sigma · Tamron · Viltrox · Kase"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Ống kính" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={list} />
        </div>
      </section>
    </>
  );
}
