import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Camera, Aperture, Video, Activity, Navigation, Lightbulb, Layers, RefreshCw, Monitor } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { ProductCard } from '@/components/product/ProductCard';
import { StudioSetupService } from '@/components/marketing/StudioSetupService';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory, products } from '@/data/products';
import styles from './page.module.css';

function CategoryVectorIcon({ iconKey, size = 36 }: { iconKey: string; size?: number }) {
  const props = { size, strokeWidth: 2 };
  switch (iconKey) {
    case 'camera': return <Camera {...props} />;
    case 'aperture': return <Aperture {...props} />;
    case 'video': return <Video {...props} />;
    case 'activity': return <Activity {...props} />;
    case 'navigation': return <Navigation {...props} />;
    case 'lightbulb': return <Lightbulb {...props} />;
    case 'layers': return <Layers {...props} />;
    case 'refresh-cw': return <RefreshCw {...props} />;
    case 'monitor': return <Monitor {...props} />;
    default: return <Camera {...props} />;
  }
}

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ brand?: string; price?: string; sort?: string; page?: string }>;
}

export async function generateStaticParams() {
  return categories.map(cat => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Không tìm thấy' };
  return {
    title: `${category.name} | Máy Ảnh Việt Nam`,
    description: `Mua ${category.name} chính hãng tại Máy Ảnh Việt Nam. ${category.description}. Bảo hành dài hạn, giao hàng toàn quốc.`,
    alternates: { canonical: `https://mayanhvietnam.com/danh-muc/${slug}` },
    openGraph: {
      title: `${category.name} | Máy Ảnh Việt Nam`,
      description: category.description,
    },
  };
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'newest', label: 'Mới nhất' },
];

const PRICE_RANGES = [
  { label: 'Dưới 5 triệu', value: '0-5000000' },
  { label: '5 - 15 triệu', value: '5000000-15000000' },
  { label: '15 - 30 triệu', value: '15000000-30000000' },
  { label: '30 - 50 triệu', value: '30000000-50000000' },
  { label: 'Trên 50 triệu', value: '50000000-999999999' },
];

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { brand: brandFilter, price: priceFilter, sort = 'default' } = await searchParams;

  const category = getCategoryBySlug(slug);

  // Handle special service article slug
  if (slug === 'lap-phong-studio') {
    return (
      <>
        <Header />
        <CartDrawer />
        <main id="main-content">
          <StudioSetupService />
        </main>
        <Footer />
        <FloatingCTA />
      </>
    );
  }

  // Handle flash sale and promo slugs
  if (slug === 'san-pham-flash-sale') {
    const flashProducts = products.filter(p => p.flashSale);
    return (
      <>
        <Header />
        <CartDrawer />
        <main>
          <div className={styles.hero} style={{ background: 'linear-gradient(135deg, #1c1917, #3b1f0a)' }}>
            <div className="container">
              <h1 className={styles.hero_title} style={{ color: '#f97316' }}>⚡ Flash Sale</h1>
              <p className={styles.hero_desc} style={{ color: 'rgba(255,255,255,0.8)' }}>
                Ưu đãi cực shock — {flashProducts.length} sản phẩm đang giảm giá
              </p>
            </div>
          </div>
          <div className="container" style={{ padding: '32px 16px' }}>
            <div className={styles.products_grid}>
              {flashProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </main>
        <Footer />
        <FloatingCTA />
      </>
    );
  }

  if (!category) notFound();

  let categoryProducts = getProductsByCategory(slug);

  // Filter by brand
  const availableBrands = [...new Set(categoryProducts.map(p => p.brand))];
  if (brandFilter) {
    categoryProducts = categoryProducts.filter(p => p.brand === brandFilter);
  }

  // Filter by price
  if (priceFilter) {
    const [min, max] = priceFilter.split('-').map(Number);
    categoryProducts = categoryProducts.filter(p => p.price >= min && p.price <= max);
  }

  // Sort
  switch (sort) {
    case 'price_asc': categoryProducts.sort((a, b) => a.price - b.price); break;
    case 'price_desc': categoryProducts.sort((a, b) => b.price - a.price); break;
    case 'rating': categoryProducts.sort((a, b) => b.rating.average - a.rating.average); break;
    case 'newest': categoryProducts.sort((a, b) => b.id.localeCompare(a.id)); break;
  }

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: category.name, href: `/danh-muc/${slug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.label,
          item: `https://mayanhvietnam.com${crumb.href}`,
        })),
      })}} />

      <Header />
      <CartDrawer />

      <main>
        {/* Hero */}
        <div className={styles.hero} style={{ background: `linear-gradient(135deg, ${category.color}22 0%, ${category.bgColor} 100%)` }}>
          <div className="container">
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href}>
                  {i > 0 && <span className={styles.breadcrumb_sep}>›</span>}
                  {i === breadcrumbs.length - 1
                    ? <span className={styles.breadcrumb_current}>{crumb.label}</span>
                    : <Link href={crumb.href} className={styles.breadcrumb_link}>{crumb.label}</Link>}
                </span>
              ))}
            </nav>
            <div className={styles.hero_content}>
              <span className={styles.hero_icon}>
                <CategoryVectorIcon iconKey={category.icon} size={40} />
              </span>
              <div>
                <h1 className={styles.hero_title}>{category.name}</h1>
                <p className={styles.hero_desc}>{category.description}</p>
                <span className={styles.product_count}>{categoryProducts.length} sản phẩm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.layout}>
            {/* Sidebar Filters */}
            <aside className={styles.sidebar}>
              <div className={styles.filter_box}>
                <h2 className={styles.filter_title}>Bộ lọc</h2>

                {/* Price Filter */}
                <div className={styles.filter_group}>
                  <h3 className={styles.filter_group_title}>Khoảng giá</h3>
                  <div className={styles.filter_options}>
                    <Link
                      href={`/danh-muc/${slug}`}
                      className={[styles.filter_option, !priceFilter ? styles.filter_active : ''].join(' ')}
                    >
                      Tất cả
                    </Link>
                    {PRICE_RANGES.map(range => (
                      <Link
                        key={range.value}
                        href={`/danh-muc/${slug}?price=${range.value}${brandFilter ? `&brand=${brandFilter}` : ''}`}
                        className={[styles.filter_option, priceFilter === range.value ? styles.filter_active : ''].join(' ')}
                      >
                        {range.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                {availableBrands.length > 1 && (
                  <div className={styles.filter_group}>
                    <h3 className={styles.filter_group_title}>Thương hiệu</h3>
                    <div className={styles.filter_options}>
                      <Link
                        href={`/danh-muc/${slug}${priceFilter ? `?price=${priceFilter}` : ''}`}
                        className={[styles.filter_option, !brandFilter ? styles.filter_active : ''].join(' ')}
                      >
                        Tất cả
                      </Link>
                      {availableBrands.map(brand => (
                        <Link
                          key={brand}
                          href={`/danh-muc/${slug}?brand=${brand}${priceFilter ? `&price=${priceFilter}` : ''}`}
                          className={[styles.filter_option, brandFilter === brand ? styles.filter_active : ''].join(' ')}
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {(brandFilter || priceFilter) && (
                  <Link href={`/danh-muc/${slug}`} className={styles.clear_filters}>
                    ✕ Xóa bộ lọc
                  </Link>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className={styles.main}>
              {/* Sort Bar */}
              <div className={styles.sort_bar}>
                <span className={styles.result_count}>
                  <strong>{categoryProducts.length}</strong> sản phẩm
                </span>
                <div className={styles.sort_wrap}>
                  <span className={styles.sort_label}>Sắp xếp:</span>
                  <div className={styles.sort_options}>
                    {SORT_OPTIONS.map(opt => (
                      <Link
                        key={opt.value}
                        href={`/danh-muc/${slug}?sort=${opt.value}${brandFilter ? `&brand=${brandFilter}` : ''}${priceFilter ? `&price=${priceFilter}` : ''}`}
                        className={[styles.sort_opt, sort === opt.value ? styles.sort_active : ''].join(' ')}
                      >
                        {opt.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products */}
              {categoryProducts.length === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.empty_icon}>🔍</div>
                  <h2>Không tìm thấy sản phẩm</h2>
                  <p>Hãy thử điều chỉnh bộ lọc hoặc <Link href={`/danh-muc/${slug}`}>xem tất cả</Link></p>
                </div>
              ) : (
                <div className={styles.products_grid}>
                  {categoryProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} priority={idx < 8} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </>
  );
}
