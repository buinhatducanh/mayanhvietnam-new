import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Chính sách vận chuyển — Máy Ảnh Việt Nam" };

export default function VanChuyenPage() {
  return (
    <>
      <PageHeader title="Chính sách vận chuyển" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Chính sách vận chuyển" }]} />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[800px] mx-auto space-y-8 text-zinc-300 text-sm leading-relaxed">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">1. Miễn phí giao hàng</h3>
            <p>Miễn phí ship cho đơn hàng từ <strong className="text-white">2.000.000đ</strong> trên toàn quốc. Đơn dưới 2 triệu phí ship 30.000đ.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">2. Thời gian giao hàng</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nội thành TP.HCM: <strong className="text-white">1-2 ngày</strong></li>
              <li>Miền Nam: <strong className="text-white">2-3 ngày</strong></li>
              <li>Miền Trung: <strong className="text-white">3-4 ngày</strong></li>
              <li>Miền Bắc: <strong className="text-white">3-5 ngày</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">3. Đơn vị vận chuyển</h3>
            <p>Giao hàng nhanh qua GHTK, GHN, J&T Express, hoặc Viettel Post. Đơn hàng giá trị cao (trên 20 triệu) được giao qua保 hiểm vận chuyển đặc biệt.</p>
          </div>
        </div>
      </section>
    </>
  );
}
