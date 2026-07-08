import { Metadata } from 'next';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/lib/mock-data';
import { formatVND } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Giỏ hàng',
  description: 'Xem và quản lý sản phẩm trong giỏ hàng tại Máy Ảnh Việt Nam',
};

export default function CartPage() {
  // Mock cart — 2 items
  const cartItems = [
    { product: allProducts[0], variant: 'Kit 18-45mm', qty: 1 },
    { product: allProducts[6], variant: null, qty: 2 },
  ];
  const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.qty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
        <ShoppingCart className="h-6 w-6 text-primary" />
        Giỏ hàng
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => (
            <div
              key={`${item.product.id}-${item.variant}`}
              className="flex gap-4 p-4 rounded-lg bg-card border border-border"
            >
              <img
                src={item.product.thumbnail}
                alt={item.product.name}
                className="h-24 w-24 rounded object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary font-medium">{item.product.brand}</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {item.product.name}
                </p>
                {item.variant && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm font-mono font-bold text-primary">
                    {formatVND(item.product.price)}
                    <span className="text-muted-foreground font-normal text-xs ml-2">× {item.qty}</span>
                  </p>
                  <button className="text-muted-foreground hover:text-error transition-colors p-1" aria-label="Xóa">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-lg bg-card border border-border p-6 h-fit lg:sticky lg:top-48">
          <h2 className="text-sm font-semibold text-foreground mb-4">Tóm tắt đơn hàng</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tạm tính</span>
              <span className="font-mono text-foreground">{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí vận chuyển</span>
              <span className="text-primary text-xs">Tính sau</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between text-base">
                <span className="font-semibold text-foreground">Tổng cộng</span>
                <span className="font-mono font-bold text-primary">{formatVND(subtotal)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
              TIẾN HÀNH THANH TOÁN
            </Button>
            <Button variant="ghost" size="md" className="w-full" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
