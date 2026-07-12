import type { Metadata } from 'next';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { HeroSlider } from '@/components/marketing/HeroSlider';
import { CategoryIconGrid } from '@/components/marketing/CategoryIconGrid';
import { FlashSaleSection } from '@/components/marketing/FlashSaleSection';
import { ProductSection } from '@/components/marketing/ProductSection';
import { SocialProof } from '@/components/marketing/SocialProof';
import { LensCompatibilityChecker } from '@/components/widgets/LensCompatibilityChecker';
import { TradeInWidget } from '@/components/widgets/TradeInWidget';
import { YouTubeReviewsSection } from '@/components/marketing/YouTubeReviewsSection';

export const metadata: Metadata = {
  title: 'Máy Ảnh Việt Nam — Hệ Thống Bán Máy Ảnh Chính Hãng Cần Thơ',
  description: 'Mua máy ảnh Canon, Sony, Nikon, flycam DJI, action camera GoPro chính hãng tại Cần Thơ. Bảo hành 12-24 tháng, giao hàng toàn quốc, trả góp 0% lãi suất.',
  alternates: { canonical: 'https://mayanhvietnam.com' },
  openGraph: {
    title: 'Máy Ảnh Việt Nam — Máy Ảnh Chính Hãng Giá Tốt Cần Thơ',
    description: 'Hệ thống cửa hàng máy ảnh uy tín tại Cần Thơ, HCM, An Giang, Tiền Giang.',
    url: 'https://mayanhvietnam.com',
  },
};

const PRODUCT_SECTIONS = [
  {
    title: 'Máy Ảnh Mirrorless',
    subtitle: 'Canon, Sony, Nikon, Fujifilm — Chính hãng bảo hành 12-24 tháng',
    categorySlug: 'may-anh',
    viewAllHref: '/danh-muc/may-anh',
    showUsedTab: true,
  },
  {
    title: 'Ống Kính Lens',
    subtitle: 'Canon RF, Sony E, Nikon Z, Sigma Art, Tamron — Đủ chủng loại',
    categorySlug: 'ong-kinh',
    viewAllHref: '/danh-muc/ong-kinh',
    showUsedTab: false,
  },
  {
    title: 'Flycam & Drone',
    subtitle: 'DJI Mini, Mavic, Air, Avata — Flycam chính hãng DJI',
    categorySlug: 'flycam',
    viewAllHref: '/danh-muc/flycam',
    showUsedTab: false,
  },
  {
    title: 'Action Camera',
    subtitle: 'GoPro, DJI Osmo Action, Insta360 — Camera hành động',
    categorySlug: 'action-camera',
    viewAllHref: '/danh-muc/action-camera',
    showUsedTab: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Máy Ảnh Việt Nam',
            url: 'https://mayanhvietnam.com',
            logo: 'https://mayanhvietnam.com/logo.png',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+84-937-148-222',
              contactType: 'customer service',
              areaServed: 'VN',
              availableLanguage: 'Vietnamese',
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Đường 30/4, Phường Xuân Khánh',
              addressLocality: 'Cần Thơ',
              addressCountry: 'VN',
            },
            sameAs: [
              'https://facebook.com/mayanhvietnam',
              'https://youtube.com/@mayanhvietnam',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://mayanhvietnam.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://mayanhvietnam.com/tim-kiem?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <Header />
      <CartDrawer />

      <main id="main-content">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Category Grid */}
        <CategoryIconGrid />

        {/* Flash Sale */}
        <FlashSaleSection />

        {/* Exclusive Interactive Widget 1: Lens Compatibility Checker */}
        <div className="container">
          <LensCompatibilityChecker />
        </div>

        {/* Product Sections */}
        {PRODUCT_SECTIONS.map(section => (
          <ProductSection
            key={section.categorySlug}
            title={section.title}
            subtitle={section.subtitle}
            categorySlug={section.categorySlug}
            viewAllHref={section.viewAllHref}
            showUsedTab={section.showUsedTab}
            maxItems={4}
          />
        ))}

        {/* Exclusive Interactive Widget 2: Trade-In Valuation Widget */}
        <div className="container">
          <TradeInWidget />
        </div>

        {/* Promo Banner */}
        <section style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          padding: '48px 0',
        }}>
          <div className="container" style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '16px', borderRadius: '50%', display: 'inline-flex' }}>
                <Clapperboard size={36} color="white" />
              </div>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '8px' }}>
              Dịch Vụ Lắp Phông Studio Chuyên Nghiệp
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '24px', opacity: 0.9 }}>
              Thiết kế và lắp đặt studio ảnh tại nhà — Tư vấn miễn phí · Báo giá nhanh
            </p>
            <Link
              href="/dich-vu-lap-phong"
              style={{
                display: 'inline-block',
                background: 'white',
                color: '#ea580c',
                padding: '14px 32px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              Tìm hiểu ngay →
            </Link>
          </div>
        </section>

        {/* Social Proof */}
        <SocialProof />

        {/* YouTube Reviews Sản Phẩm (Để cuối trang) */}
        <YouTubeReviewsSection />
      </main>

      <Footer />
      <FloatingCTA />
    </>
  );
}
