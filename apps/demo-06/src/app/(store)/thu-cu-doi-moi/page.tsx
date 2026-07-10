import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Thu cũ đổi mới — Máy Ảnh Việt Nam" };

export default function TradeInPage() {
  return (
    <>
      <PageHeader
        title="Thu cũ đổi mới — Trả góp 0%"
        subtitle="Đánh giá máy cũ của bạn nhanh chóng — Lên đời máy mới giá tốt nhất"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Thu cũ đổi mới" }]}
      />
      <section className="bg-zinc-950 py-12 px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Quy trình 4 bước */}
          <h2 className="text-2xl font-bold text-white mb-6">Quy trình 4 bước</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { n: "01", t: "Đăng ký", d: "Gửi thông tin máy cũ qua form hoặc hotline 0937.148.222" },
              { n: "02", t: "Đánh giá", d: "Kỹ thuật viên kiểm tra & báo giá trong 24 giờ" },
              { n: "03", t: "Thanh toán", d: "Nhận tiền mặt hoặc trừ trực tiếp vào máy mới" },
              { n: "04", t: "Lên đời", d: "Nhận máy mới chính hãng với giá ưu đãi" },
            ].map(s => (
              <div key={s.n} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
                <span className="text-orange-500 text-3xl font-bold">{s.n}</span>
                <h3 className="text-white font-bold text-lg mt-2 mb-1">{s.t}</h3>
                <p className="text-zinc-400 text-sm">{s.d}</p>
              </div>
            ))}
          </div>

          {/* Form đăng ký */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold text-xl mb-4">Đăng ký thu cũ</h3>
            <form className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Họ tên</label>
                <input type="text" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Số điện thoại</label>
                <input type="tel" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="0907.xxx.xxx" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Loại máy</label>
                <select className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500">
                  <option>Máy ảnh</option>
                  <option>Ống kính</option>
                  <option>Flycam</option>
                  <option>Action Cam</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Hãng & Model</label>
                <input type="text" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="Canon EOS R6 II" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Tình trạng máy</label>
                <textarea rows={3} className="w-full mt-1 p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="Mô tả tình trạng máy: trầy xước, số shot, phụ kiện đi kèm..." />
              </div>
              <div className="md:col-span-2">
                <button type="button" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors">Gửi yêu cầu đánh giá</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
