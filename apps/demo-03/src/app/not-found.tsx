import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="text-[120px] font-black text-[#ff6b00] leading-none mb-2">404</div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Không tìm thấy trang</h1>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Hãy thử tìm kiếm sản phẩm hoặc quay về trang chủ.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#ff6b00] hover:bg-[#e85f00] text-white font-semibold px-5 py-3 rounded-xl transition-colors"
          >
            <Home size={16} /> Về trang chủ
          </Link>
          <Link
            href="/tim-kiem"
            className="inline-flex items-center justify-center gap-2 border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-semibold px-5 py-3 rounded-xl transition-colors"
          >
            <Search size={16} /> Tìm kiếm <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}