import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts, getProductBySlug, getRelatedProducts } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { PriceDisplay } from '@/components/ui/price-display';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductGrid } from '@/components/product/product-grid';
import { VariantSelector } from '@/components/product/variant-selector';
import { LensCompatibility } from '@/components/product/lens-compatibility';
import { ProductTabs } from '@/components/product/product-tabs';
import { AddToCartSection } from '@/components/product/add-to-cart-section';
import { ProductJsonLd } from '@/components/product/product-jsonld';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Không tìm thấy sản phẩm' };

  return {
    title: `${product.name} | Giá ${product.price.toLocaleString('vi-VN')}₫ — ${product.brand} chính hãng`,
    description: `${product.name} - ${product.shortSpecs?.join(', ') || product.brand} chính hãng tại Máy Ảnh Việt Nam. Bảo hành 24 tháng · Trả góp 0% · Freeship từ 5 triệu.`,
    openGraph: {
      title: product.name,
      description: `${product.name} chính hãng giá ${product.price.toLocaleString('vi-VN')}₫`,
      images: [{ url: product.thumbnail }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  // Mock specs
  const specs = [
    { group: 'Cảm biến', items: [
      { label: 'Độ phân giải', value: '24.2 MP' },
      { label: 'Loại cảm biến', value: 'CMOS APS-C' },
      { label: 'ISO', value: '100 - 32000 (mở rộng 51200)' },
    ]},
    { group: 'Quay phim', items: [
      { label: 'Video max', value: '4K 30fps' },
      { label: 'Slow-motion', value: '1080p 120fps' },
      { label: 'Codec', value: 'H.265 / HEVC' },
    ]},
    { group: 'Vật lý', items: [
      { label: 'Mount', value: product.mount || '—' },
      { label: 'Trọng lượng (body)', value: '375g' },
      { label: 'Kích thước', value: '116.3 x 85.5 x 68.8 mm' },
      { label: 'Pin', value: 'LP-E17 (~370 shots)' },
    ]},
  ];

  return (
    <div className="min-h-screen">
      <ProductJsonLd product={product} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: product.category.replace(/-/g, ' '), href: `/danh-muc/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <ProductGallery
              images={product.images.map((img) => ({
                url: img.url,
                alt: img.alt,
              }))}
            />
          </div>

          {/* INFO */}
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {product.brand}
              </p>
              <h1 className="mt-1 text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {product.name}
              </h1>
              {product.rating && (
                <div className="mt-2">
                  <StarRating
                    rating={product.rating.average}
                    count={product.rating.count}
                    size="md"
                  />
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badges?.map((b, i) => (
                <Badge key={i} variant={b.type} label={b.label} />
              ))}
              {product.availability === 'in_stock' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                  Còn hàng · 15 sản phẩm
                </span>
              )}
            </div>

            {/* Price */}
            <div className="rounded-lg bg-card border border-border p-5">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                size="xl"
                showInstallment
                installmentMonths={12}
              />
            </div>

            {/* Variants */}
            <VariantSelector
              variants={[
                { id: 'v1', name: 'Body Only', sku: 'CNR50-B', available: true },
                { id: 'v2', name: 'Kit 18-45mm', sku: 'CNR50-K1', available: true, priceAdjust: 3490000 },
                { id: 'v3', name: 'Kit 18-150mm', sku: 'CNR50-K2', available: false, priceAdjust: 6490000 },
              ]}
              label="Chọn kit"
            />

            {/* Lens Compatibility (domain-specific UX) */}
            {product.mount && (
              <LensCompatibility mountName={product.mount} currentProductName={product.name} />
            )}

            {/* Add to Cart */}
            <AddToCartSection
              productId={product.id}
              productName={product.name}
              price={product.price}
            />

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-base">🚚</span>
                Freeship đơn từ 5 triệu
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-base">🛡️</span>
                Bảo hành chính hãng 24 tháng
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-base">💳</span>
                Trả góp 0% qua thẻ tín dụng
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-base">🔄</span>
                Thu cũ đổi mới - Trợ giá 30%
              </div>
            </div>
          </div>
        </div>

        {/* TABS — Specs / Description / Reviews */}
        <div className="mt-12">
          <ProductTabs
            specs={specs}
            description={`${product.name} là lựa chọn hoàn hảo cho người mới bắt đầu cũng như photographer chuyên nghiệp. Với công nghệ tiên tiến nhất từ ${product.brand}, sản phẩm mang đến chất lượng hình ảnh vượt trội và trải nghiệm chụp ảnh đẳng cấp.`}
            productId={product.id}
          />
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="mt-12 pb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Sản phẩm liên quan
            </h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
