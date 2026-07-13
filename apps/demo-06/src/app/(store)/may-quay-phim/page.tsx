import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Máy quay phim Cinema — Máy Ảnh Việt Nam" };

export default function MayQuayPhimPage() {
  const list = products.filter((p) => p.category === "camcorder");
  return (
    <>
      <PageHeader
        title="Máy quay phim Cinema"
        subtitle="Sony FX · Canon Cinema · Blackmagic · DJI Ronin 4D"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Máy quay phim" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={list} />
        </div>
      </section>
    </>
  );
}
