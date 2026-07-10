import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Chính sách thanh toán — Máy Ảnh Việt Nam" };

export default function ThanhToanPage() {
  return (
    <>
      <PageHeader title="Chính sách thanh toán" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Chính sách thanh toán" }]} />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[800px] mx-auto space-y-8 text-zinc-300 text-sm leading-relaxed">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Phương thức thanh toán</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {["Visa", "MasterCard", "JCB", "NAPAS", "MoMo", "Home PayLater"].map(m => (
                <span key={m} className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-medium">{m}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">1. Thanh toán khi nhận hàng (COD)</h3>
            <p>Áp dụng cho đơn hàng dưới 50.000.000đ. Khách hàng thanh toán trực tiếp cho nhân viên giao hàng khi nhận sản phẩm.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">2. Chuyển khoản ngân hàng</h3>
            <p>Chuyển khoản trước khi giao hàng. Đơn hàng được xử lý trong vòng 2 giờ sau khi xác nhận thanh toán.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">3. Trả góp 0%</h3>
            <p>Hỗ trợ trả góp qua thẻ tín dụng Visa/MasterCard/JCB và Home PayLater. Thời hạn trả góp: 3, 6, 9, 12 tháng.</p>
          </div>
        </div>
      </section>
    </>
  );
}
