import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Chính sách bảo hành — Máy Ảnh Việt Nam" };

export default function BaoHanhPage() {
  return (
    <>
      <PageHeader title="Chính sách bảo hành" breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Chính sách bảo hành" }]} />
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-[800px] mx-auto prose-invert">
          <div className="space-y-8 text-zinc-300 text-sm leading-relaxed">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">1. Bảo hành chính hãng</h3>
              <p>Tất cả sản phẩm máy ảnh, ống kính, flycam, action camera tại Máy Ảnh Việt Nam đều được bảo hành chính hãng theo quy định của từng hãng sản xuất. Thời hạn bảo hành từ <strong className="text-white">12 đến 60 tháng</strong> tùy sản phẩm.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">2. Thời hạn bảo hành</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Máy ảnh Canon, Sony, Nikon, Fujifilm: <strong className="text-white">24 tháng</strong></li>
                <li>Ống kính: <strong className="text-white">24 tháng</strong></li>
                <li>Flycam DJI: <strong className="text-white">12 tháng</strong></li>
                <li>Action Camera (GoPro, DJI Osmo, Insta360): <strong className="text-white">12 tháng</strong></li>
                <li>Phụ kiện: <strong className="text-white">6 tháng</strong></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">3. Điều kiện bảo hành</h3>
              <p>Sản phẩm còn trong thời hạn bảo hành, có phiếu bảo hành hợp lệ, lỗi do nhà sản xuất (không phải lỗi người dùng).</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">4. Liên hệ bảo hành</h3>
              <p>Đem sản phẩm đến cửa hàng gần nhất hoặc gọi hotline <strong className="text-orange-500">0937.148.222</strong> để được hỗ trợ.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
