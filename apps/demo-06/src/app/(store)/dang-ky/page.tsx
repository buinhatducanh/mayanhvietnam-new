import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Đăng ký tài khoản — Máy Ảnh Việt Nam" };

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        title="Đăng ký tài khoản"
        subtitle="Tạo tài khoản để nhận ngay ưu đãi 5% cho đơn hàng đầu tiên"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Đăng ký" }]}
      />
      <section className="bg-zinc-950 py-12 px-6">
        <div className="max-w-md mx-auto">
          <form className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Họ</label>
                <input type="text" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="Nguyễn" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Tên</label>
                <input type="text" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="Văn A" />
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Email</label>
              <input type="email" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="email@example.com" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Số điện thoại</label>
              <input type="tel" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="0907.xxx.xxx" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Mật khẩu</label>
              <input type="password" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="Tối thiểu 8 ký tự" />
            </div>
            <label className="flex items-start gap-2 text-xs text-zinc-400">
              <input type="checkbox" className="rounded border-zinc-700 bg-zinc-800 mt-0.5" />
              <span>Tôi đồng ý với <a href="#" className="text-orange-400 hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-orange-400 hover:underline">Chính sách bảo mật</a></span>
            </label>
            <button type="button" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors">Đăng ký</button>
            <p className="text-center text-sm text-zinc-400 pt-2">
              Đã có tài khoản? <a href="/dang-nhap" className="text-orange-400 hover:text-orange-300 font-medium">Đăng nhập</a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
