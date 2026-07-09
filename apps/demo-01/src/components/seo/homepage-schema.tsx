/**
 * Organization + LocalBusiness + WebSite JSON-LD — Homepage SEO (Tier 1.3)
 *
 * Google dùng để:
 * - Hiển thị Brand Knowledge Panel trên SERP
 * - Hiển thị Sitelinks Searchbox
 * - Indexed Google Maps / Business Profile
 */

const SITE_URL = 'https://mayanhvietnam.com';
const BRAND = 'Máy Ảnh Việt Nam';

export function HomepageSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BRAND,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          'https://www.youtube.com/@mayanhvietnam',
          'https://www.tiktok.com/@mayanhvietnam',
          'https://www.facebook.com/mayanhvietnam',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+84-937-148-222',
          contactType: 'customer service',
          areaServed: 'VN',
          availableLanguage: ['Vietnamese'],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Số 123 Nguyễn Huệ',
          addressLocality: 'TP. Hồ Chí Minh',
          addressRegion: 'TP. Hồ Chí Minh',
          postalCode: '700000',
          addressCountry: 'VN',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: BRAND,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        telephone: '+84-937-148-222',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Số 123 Nguyễn Huệ',
          addressLocality: 'TP. Hồ Chí Minh',
          addressRegion: 'TP. Hồ Chí Minh',
          postalCode: '700000',
          addressCountry: 'VN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 10.7769,
          longitude: 106.7009,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:30',
            closes: '21:00',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Máy ảnh & Ống kính chính hãng',
          itemListElement: [
            { '@type': 'OfferCatalog', name: 'Máy ảnh', numberOfItems: 120 },
            { '@type': 'OfferCatalog', name: 'Ống kính', numberOfItems: 200 },
            { '@type': 'OfferCatalog', name: 'Flycam', numberOfItems: 30 },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND,
        description: 'Cửa hàng máy ảnh, ống kính, flycam chính hãng tại Việt Nam',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'vi-VN',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/tim-kiem?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb-home`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: SITE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
