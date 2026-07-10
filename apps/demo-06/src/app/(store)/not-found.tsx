import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "404 — Không tìm thấy trang" };

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="404 — Không tìm thấy trang"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "404" }]}
      />
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-7xl mb-4">📷</p>
          <p className="text-zinc-400 text-lg mb-2">Ống kính đã lấy nét nhầm chỗ — trang này không tồn tại.</p>
          <p className="text-zinc-500 text-sm mb-6">Có thể đường dẫn đã bị xóa hoặc bạn gõ sai. Quay lại trang chủ nhé.</p>
          <a href="/" className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors">Về trang chủ</a>
        </div>
      </section>
    </>
  );
}
