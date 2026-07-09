import { ProductLandingHero } from '@/components/landing/product-landing-hero';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld';
import { buildPageMetadata } from '@/lib/seo';
import './landing.css';

const SITE_URL = 'https://mayanhvietnam.com';

export const metadata = buildPageMetadata({
  path: '/san-pham-can-ban',
  title: 'Canon EOS R6 Mark II — Full-frame 24.2MP, 8K Video, AI Focus',
  description:
    'Canon EOS R6 Mark II chính hãng tại Máy Ảnh Việt Nam. Full-frame 24.2MP, 8K Video, AI Focus, Wi-Fi 6. Giá tốt · Trả góp 0% · Freeship từ 5 triệu · Bảo hành 24 tháng.',
  keywords: [
    'Canon EOS R6 Mark II',
    'Canon R6 Mark II',
    'máy ảnh full frame',
    'Canon mirrorless',
    'giá Canon R6 Mark II',
  ],
  ogImage:
    'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01.jpg',
});

export default function ProductLandingPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm nổi bật', href: '/san-pham' },
    { label: 'Canon EOS R6 Mark II' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductLandingHero />
    </>
  );
}
