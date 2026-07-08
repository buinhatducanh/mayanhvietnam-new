import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getProductsByCategory, getCategoryBySlug } from '@/lib/mock-data';
import { ProductGrid } from '@/components/product/product-grid';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FadeIn } from '@/components/animations/fade-in';
import { TabSwitcher } from '@/components/product/tab-switcher';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: 'Không tìm thấy danh mục' };

  return {
    title: `${cat.name} — Giá tốt nhất | Máy Ảnh Việt Nam`,
    description: `Mua ${cat.name} chính hãng tại Máy Ảnh Việt Nam. ${cat.productCount}+ sản phẩm · Giá tốt · Freeship · Bảo hành chính hãng.`,
    openGraph: {
      title: `${cat.name} — Máy Ảnh Việt Nam`,
      description: `${cat.name} chính hãng · Giá tốt · Freeship từ 5 triệu`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const products = getProductsByCategory(slug, true);
  const usedProducts = getProductsByCategory(slug, false);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Danh mục', href: '/san-pham' },
            { label: cat.name },
          ]}
        />
      </div>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {cat.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {cat.productCount}+ sản phẩm
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Tabs: New / Used */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <TabSwitcher
          tabs={[
            { id: 'new', label: 'Sản phẩm mới', count: products.length },
            ...(usedProducts.length > 0
              ? [{ id: 'used', label: 'Sản phẩm cũ', count: usedProducts.length }]
              : []),
          ]}
          initial="new"
        />
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4">📷</p>
            <p className="text-sm text-muted-foreground">
              Chưa có sản phẩm nào trong danh mục này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
