import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Đăng nhập — Máy Ảnh Việt Nam" };

export default function LoginPage() {
  return (
    <>
      <PageHeader
        title="Đăng nhập tài khoản"
        subtitle="Đăng nhập để theo dõi đơn hàng, lưu sản phẩm yêu thích và nhận ưu đãi độc quyền"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Đăng nhập" }]}
      />
      <section className="bg-zinc-950 py-12 px-6">
        <div className="max-w-md mx-auto">
          <form className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Email / Số điện thoại</label>
              <input type="text" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="email@example.com" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Mật khẩu</label>
              <input type="password" className="w-full mt-1 h-11 px-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-orange-500" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-400">
                <input type="checkbox" className="rounded border-zinc-700 bg-zinc-800" /> Ghi nhớ
              </label>
              <a href="#" className="text-orange-400 hover:text-orange-300">Quên mật khẩu?</a>
            </div>
            <button type="button" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors">Đăng nhập</button>
            <p className="text-center text-sm text-zinc-400 pt-2">
              Chưa có tài khoản? <a href="/dang-ky" className="text-orange-400 hover:text-orange-300 font-medium">Đăng ký ngay</a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
