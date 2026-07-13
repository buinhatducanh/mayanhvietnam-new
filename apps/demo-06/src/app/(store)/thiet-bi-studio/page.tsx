import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Thiết bị Studio — Máy Ảnh Việt Nam" };

export default function ThietBiStudioPage() {
  const list = products.filter((p) => p.category === "studio");
  return (
    <>
      <PageHeader
        title="Thiết bị Studio"
        subtitle="Godox · Nanlite · DJI Gimbal · Flash chuyên nghiệp"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Thiết bị Studio" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={list} />
        </div>
      </section>
    </>
  );
}
