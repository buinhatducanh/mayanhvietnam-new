import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 — Không tìm thấy trang',
};

// Custom 404 — return proper HTTP 404 (không soft 404)
export const dynamic = 'force-static';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-8xl font-bold text-primary font-mono mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Không tìm thấy trang
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors min-h-11"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
          <Link
            href="/san-pham"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-border text-foreground text-sm font-semibold hover:border-primary transition-colors min-h-11"
          >
            <Search className="h-4 w-4" />
            Tìm sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
