import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Flycam / Drone — Máy Ảnh Việt Nam" };

export default function FlycamPage() {
  const list = products.filter((p) => p.category === "flycam");
  return (
    <>
      <PageHeader
        title="Flycam / Drone"
        subtitle="DJI Mavic · Mini · Air · Avata — Bay tự do, quay phim 4K/6K cinematic"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Flycam" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={list} />
        </div>
      </section>
    </>
  );
}
