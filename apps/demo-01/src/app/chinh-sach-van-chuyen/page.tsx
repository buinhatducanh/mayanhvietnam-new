import { Truck } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/chinh-sach-van-chuyen',
  title: 'Chính sách vận chuyển — Freeship đơn từ 5 triệu toàn quốc',
  description:
    'Chính sách giao hàng tại Máy Ảnh Việt Nam — Freeship đơn từ 5 triệu · Giao hàng toàn quốc 1–7 ngày · Đối tác GHN, GHTK, J&T Express, AhaMove.',
  keywords: [
    'chính sách vận chuyển',
    'freeship',
    'giao hàng toàn quốc',
    'GHN',
    'GHTK',
    'J&T',
    'COD',
  ],
});

export default function ShippingPolicyPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Chính sách vận chuyển' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumb items={breadcrumbItems} />
      <FadeIn>
        <div className="flex items-center gap-3 mt-6 mb-8">
          <Truck className="h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground">
            Chính sách vận chuyển
          </h1>
        </div>
      </FadeIn>

      <div className="space-y-6">
        <FadeIn>
          <div className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-base font-semibold text-foreground mb-3">
              Miễn phí vận chuyển
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>
                Đơn hàng từ{' '}
                <span className="font-semibold text-primary">5.000.000₫</span>{' '}
                trở lên — Freeship toàn quốc
              </li>
              <li>Giao hàng trong TP.HCM: 1–2 ngày làm việc</li>
              <li>Giao hàng toàn quốc: 3–7 ngày làm việc</li>
              <li>Hỗ trợ COD — Thanh toán khi nhận hàng</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-base font-semibold text-foreground mb-3">
              Đơn dưới 5 triệu
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>TP.HCM: 20.000 – 30.000đ</li>
              <li>Nội thành các thành phố lớn: 30.000 – 50.000đ</li>
              <li>Ngoại thành: 40.000 – 80.000đ (tùy khu vực)</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-base font-semibold text-foreground mb-3">
              Đối tác vận chuyển
            </h2>
            <p className="text-sm text-muted-foreground">
              Giao hàng nhanh (GHN) · Giao hàng tiết kiệm (GHTK) · J&T Express
              · AhaMove (nội thành TP.HCM)
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
