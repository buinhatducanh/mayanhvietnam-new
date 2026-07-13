import PageHeader from "@/components/shared/PageHeader";
import CategoryGrid from "@/components/shared/CategoryGrid";
import { products } from "@/lib/data";

export const metadata = { title: "Action Camera & Pocket — Máy Ảnh Việt Nam" };

export default function ActionCameraPage() {
  const list = products.filter((p) => p.category === "action");
  return (
    <>
      <PageHeader
        title="Action Camera & Pocket"
        subtitle="GoPro · DJI Osmo · Insta360 — Quay hành trình chống rung HyperSmooth"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Action Camera" }]}
      />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <CategoryGrid products={list} />
        </div>
      </section>
    </>
  );
}
