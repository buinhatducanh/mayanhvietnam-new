import { CheckoutContent } from '@/components/cart/checkout-content';
import { buildPageMetadata } from '@/lib/seo';

// Server component — metadata export hợp lệ
export const metadata = buildPageMetadata({
  path: '/don-dat-hang',
  title: 'Thanh toán đơn hàng',
  description: 'Hoàn tất đơn hàng tại Máy Ảnh Việt Nam',
  indexable: false,
});

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-foreground mb-2">Thanh toán</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Hoàn tất thông tin giao hàng và thanh toán
      </p>
      <CheckoutContent />
    </div>
  );
}
