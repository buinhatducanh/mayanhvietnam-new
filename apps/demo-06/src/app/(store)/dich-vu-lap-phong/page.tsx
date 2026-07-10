import PageHeader from "@/components/shared/PageHeader";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/store/ProductGrid";

export const metadata = { title: "Dịch vụ lắp phông studio — Máy Ảnh Việt Nam" };

export default function DichVuLapPhongPage() {
  const studioProducts = products.filter(p => p.category === "studio");
  return (
    <>
      <PageHeader title="🎬 Dịch vụ lắp phông studio" subtitle="Giải pháp phòng ảnh chuyên nghiệp — Tư vấn miễn phí · Lắp đặt tại nhà · Bảo hành 12 tháng" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ lắp phòng" }]} />
      <section className="bg-zinc-950 py-12 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "📐", title: "Tư vấn thiết kế", desc: "Đo đạc · Lựa chọn đèn · Thiết kế layout phù hợp không gian" },
              { icon: "🔧", title: "Lắp đặt chuyên nghiệp", desc: "Thi công hệ thống đèn · Phông nền · Tủ rack · Điện âm thanh" },
              { icon: "🛡️", title: "Bảo hành 12 tháng", desc: "Bảo trì định kỳ · Đổi mới thiết bị lỗi · Hỗ trợ kỹ thuật 24/7" },
            ].map((svc, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
                <span className="text-4xl mb-3 block">{svc.icon}</span>
                <h3 className="text-white font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-zinc-400 text-sm">{svc.desc}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">Thiết bị studio được ưa chuộng</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {studioProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
