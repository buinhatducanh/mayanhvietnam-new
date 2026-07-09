import { MapPin, Phone, Clock } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld';
import { CountUp } from '@/components/animations/section-divider';
import { stores } from '@/lib/mock-data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/he-thong-cua-hang',
  title: 'Hệ thống 4 cửa hàng — TP.HCM, Cần Thơ, An Giang, Tiền Giang',
  description:
    '4 cửa hàng Máy Ảnh Việt Nam tại TP.HCM, Cần Thơ, An Giang, Tiền Giang. Trải nghiệm thực tế trước khi mua · Hotline 0937.148.222.',
  keywords: [
    'cửa hàng máy ảnh',
    'máy ảnh TP.HCM',
    'cần thơ máy ảnh',
    'tiền giang máy ảnh',
    'an giang máy ảnh',
    'Máy Ảnh Việt Nam',
  ],
});

// JSON-LD LocalBusiness cho tất cả cửa hàng — Tier 4.2 (Trust signals)
const SITE_URL = 'https://mayanhvietnam.com';

function StoreJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Máy Ảnh Việt Nam',
    telephone: '+84-937-148-222',
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: stores[0]?.address || '',
      addressLocality: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      'https://www.youtube.com/@mayanhvietnam',
      'https://www.tiktok.com/@mayanhvietnam',
      'https://www.facebook.com/mayanhvietnam',
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function StoresPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Hệ thống cửa hàng' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <StoreJsonLd />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumb items={breadcrumbItems} />
      <FadeIn>
        <h1 className="text-2xl font-bold text-foreground mt-6 mb-2">
          Hệ thống cửa hàng
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          <CountUp end={4} className="font-mono font-bold text-primary" /> cửa
          hàng · Trải nghiệm thực tế trước khi mua
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((store, i) => (
          <FadeIn key={store.id} delay={i * 0.1}>
            <article
              className="rounded-lg bg-card border border-border p-6 hover:border-primary/30 transition-all"
              id={store.id}
            >
              <h2 className="text-base font-semibold text-foreground mb-3">
                {store.name}
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+84937148222"
                    className="hover:text-primary transition-colors"
                  >
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span>{store.hours}</span>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
