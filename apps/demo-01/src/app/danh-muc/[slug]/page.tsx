import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getProductsByCategory, getCategoryBySlug } from '@/lib/mock-data';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductFilterBar } from '@/components/product/product-filter-bar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FadeIn } from '@/components/animations/fade-in';
import { TabSwitcher } from '@/components/product/tab-switcher';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld';

const SITE_URL = 'https://mayanhvietnam.com';

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

  const canonicalUrl = `${SITE_URL}/danh-muc/${cat.slug}`;

  return {
    title: `${cat.name} — Mua ${cat.name.toLowerCase()} chính hãng giá tốt nhất`,
    description: `Mua ${cat.name.toLowerCase()} chính hãng tại Máy Ảnh Việt Nam. ${cat.productCount}+ sản phẩm · Giá tốt · Freeship từ 5 triệu · Bảo hành chính hãng 24 tháng. Đầy đủ ${cat.name.toLowerCase()} Canon, Sony, Nikon, DJI.`,
    keywords: [
      cat.name.toLowerCase(),
      `mua ${cat.name.toLowerCase()}`,
      `${cat.name.toLowerCase()} chính hãng`,
      `${cat.name.toLowerCase()} giá rẻ`,
      `${cat.name.toLowerCase()} tại TP.HCM`,
      cat.slug,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: canonicalUrl,
      title: `${cat.name} — Máy Ảnh Việt Nam`,
      description: `${cat.name} chính hãng · ${cat.productCount}+ sản phẩm · Giá tốt · Freeship từ 5 triệu`,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: cat.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.name} — Máy Ảnh Việt Nam`,
      description: `${cat.name} chính hãng · ${cat.productCount}+ sản phẩm`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const products = getProductsByCategory(slug, true);
  const usedProducts = getProductsByCategory(slug, false);

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Danh mục', href: '/san-pham' },
    { label: cat.name },
  ];

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Category Header */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl" aria-hidden="true">
              {cat.icon}
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {cat.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {cat.productCount}+ sản phẩm chính hãng
              </p>
            </div>
          </div>
          {/* Mô tả ngắn cho SEO — Tier 1.5 content cho Heading-1 */}
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Khám phá <strong className="text-foreground">{cat.name.toLowerCase()}</strong> chính hãng từ các thương hiệu uy tín: Canon, Sony, Nikon, DJI, GoPro và nhiều hơn nữa. Tất cả sản phẩm được bảo hành chính hãng 24 tháng, freeship toàn quốc từ 5 triệu và hỗ trợ trả góp 0%.
          </p>
        </FadeIn>
      </section>

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

      {/* Product Grid with filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        {products.length > 0 ? (
          <ProductFilterBar products={products} initialCategory={slug} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4" aria-hidden="true">📷</p>
            <p className="text-sm text-muted-foreground">
              Chưa có sản phẩm nào trong danh mục này.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
