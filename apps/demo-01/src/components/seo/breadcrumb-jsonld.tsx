/**
 * BreadcrumbList JSON-LD — Tier 3.1 (medium-impact crawlability)
 *
 * Render JSON-LD script chứa BreadcrumbList cho Google.
 * Google sẽ thay URL dài dòng trên SERP thành breadcrumb gọn gàng, tăng CTR ~10-15%.
 *
 * Bổ sung (không thay thế) microdata đã có trong Breadcrumb.tsx.
 * Cả hai cùng valid — Google ưu JSON-LD.
 */

const SITE_URL = 'https://mayanhvietnam.com';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .filter((it) => it.href)
      .map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.label,
        item: `${SITE_URL}${it.href}`,
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
