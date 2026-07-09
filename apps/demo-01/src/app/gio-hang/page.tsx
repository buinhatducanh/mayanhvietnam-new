import { ShoppingCart } from 'lucide-react';
import { CartContent } from '@/components/cart/cart-content';
import { buildPageMetadata } from '@/lib/seo';

// Server component — metadata export hợp lệ
export const metadata = buildPageMetadata({
  path: '/gio-hang',
  title: 'Giỏ hàng',
  description: 'Xem và quản lý sản phẩm trong giỏ hàng tại Máy Ảnh Việt Nam',
  indexable: false,
});

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
        <ShoppingCart className="h-6 w-6 text-primary" aria-hidden="true" />
        Giỏ hàng
      </h1>
      <CartContent />
    </div>
  );
}
