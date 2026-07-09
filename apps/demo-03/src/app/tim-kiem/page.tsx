'use client';

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { allProducts, categories } from "@mayanhvietnam/mock-data";
import ProductCard from "@/app/components/product/ProductCard";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const query = q.toLowerCase().trim();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.mount?.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <div className="bg-[#f8f8f8] pb-16 min-h-[50vh]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 py-4">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Trang chủ</Link>
          <span className="text-zinc-300">›</span>
          <span className="text-zinc-700 font-medium">Tìm kiếm</span>
        </nav>

        {q ? (
          <div>
            <h1 className="text-xl font-bold text-zinc-900 mb-1">
              Kết quả cho &ldquo;<span className="text-[#ff6b00]">{q}</span>&rdquo;
            </h1>
            <p className="text-sm text-zinc-400 mb-6">{results.length} sản phẩm được tìm thấy</p>

            {results.length === 0 ? (
              <div className="text-center py-16">
                <SearchIcon size={48} className="text-zinc-200 mx-auto mb-4" />
                <p className="text-zinc-500 text-sm mb-2">Không tìm thấy sản phẩm nào cho &ldquo;{q}&rdquo;</p>
                <p className="text-zinc-400 text-xs mb-6">Thử tìm kiếm với từ khóa khác hoặc xem danh mục bên dưới.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.slice(0, 6).map((cat) => (
                    <Link key={cat.slug} href={`/danh-muc/${cat.slug}`} className="text-xs bg-white border border-zinc-200 rounded-full px-4 py-2 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors">
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <SearchIcon size={48} className="text-zinc-200 mx-auto mb-4" />
            <p className="text-zinc-500 text-sm">Nhập từ khóa để tìm kiếm sản phẩm</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-zinc-200 border-t-[#ff6b00] rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}