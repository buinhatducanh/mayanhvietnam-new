import { Metadata } from 'next';
import Link from 'next/link';
import { ProductFilterBar } from '@/components/product/product-filter-bar';
import { allProducts } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld';

const SITE_URL = 'https://mayanhvietnam.com';

export const metadata: Metadata = {
  title: 'Tất cả sản phẩm — Máy ảnh, Ống kính, Flycam, Phụ kiện',
  description:
    'Tất cả sản phẩm máy ảnh, ống kính, flycam, phụ kiện chính hãng tại Máy Ảnh Việt Nam. Giá tốt · Bảo hành 24 tháng · Freeship từ 5 triệu · Trả góp 0%. 1000+ sản phẩm.',
  keywords: [
    'máy ảnh',
    'ống kính',
    'flycam',
    'phụ kiện máy ảnh',
    'thiết bị nhiếp ảnh',
    'Canon',
    'Sony',
    'Nikon',
  ],
  alternates: {
    canonical: `${SITE_URL}/san-pham`,
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: `${SITE_URL}/san-pham`,
    title: 'Tất cả sản phẩm — Máy Ảnh Việt Nam',
    description: '1000+ máy ảnh, ống kính, flycam chính hãng · Giá tốt · Freeship',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tất cả sản phẩm' }],
  },
};

export default function AllProductsPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tất cả sản phẩm' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-4 mb-6">
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
        >
          Tất cả sản phẩm
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hơn 1.000+ sản phẩm máy ảnh, ống kính, flycam, phụ kiện chính hãng.
        </p>
      </div>
      <ProductFilterBar products={allProducts} />
      <div className="text-center py-12 mt-8">
        <Link href="/" className="text-sm text-primary hover:underline font-medium">
          ← Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
