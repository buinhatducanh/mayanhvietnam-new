import PageHeader from "@/components/shared/PageHeader";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/store/ProductGrid";

export const metadata = { title: "Sản phẩm cũ giá tốt — Máy Ảnh Việt Nam" };

export default function SanPhamCuPage() {
  const usedProducts = products.filter(p => p.condition === "used");
  return (
    <>
      <PageHeader title="Sản phẩm cũ giá tốt" subtitle="Máy ảnh đã qua sử dụng — Bảo hành 6 tháng · Thu cũ đổi mới" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm cũ" }]} />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          {usedProducts.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
              <p className="text-4xl mb-3">♻️</p>
              <p className="text-zinc-400 text-lg font-medium">Chưa có sản phẩm cũ</p>
              <p className="text-zinc-500 text-sm mt-2">Đang cập nhật — Liên hệ hotline để nhận thông báo sớm nhất</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {usedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
