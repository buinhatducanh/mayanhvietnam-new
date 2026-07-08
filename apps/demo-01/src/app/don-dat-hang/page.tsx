import { Metadata } from 'next';
import { allProducts } from '@/lib/mock-data';
import { formatVND } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Thanh toán đơn hàng',
  description: 'Hoàn tất đơn hàng tại Máy Ảnh Việt Nam',
};

export default function CheckoutPage() {
  const cartItems = [
    { product: allProducts[0], qty: 1 },
    { product: allProducts[6], qty: 2 },
  ];
  const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.qty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-foreground mb-2">Thanh toán</h1>
      <p className="text-sm text-muted-foreground mb-8">Hoàn tất thông tin giao hàng và thanh toán</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Thông tin giao hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Họ và tên *</label>
                <input className="w-full h-11 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 min-h-11" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Số điện thoại *</label>
                <input className="w-full h-11 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 min-h-11" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs text-muted-foreground">Địa chỉ *</label>
                <input className="w-full h-11 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 min-h-11" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Tỉnh/Thành phố *</label>
                <input className="w-full h-11 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 min-h-11" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Quận/Huyện *</label>
                <input className="w-full h-11 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 min-h-11" />
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Phương thức thanh toán</h2>
            <div className="space-y-2">
              {[
                ['cod', 'Thanh toán khi nhận hàng (COD)'],
                ['bank', 'Chuyển khoản ngân hàng'],
                ['vnpay', 'VNPAY (VISA, MasterCard, JCB, NAPAS)'],
                ['momo', 'Ví MoMo'],
                ['installment', 'Trả góp qua thẻ tín dụng (0%)'],
              ].map(([id, label]) => (
                <label
                  key={id}
                  className="flex items-center gap-3 p-3 rounded-md border border-border cursor-pointer hover:border-primary/30 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/[0.04]"
                >
                  <input type="radio" name="payment" value={id} className="accent-[#00d4aa]" defaultChecked={id === 'cod'} />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="rounded-lg bg-card border border-border p-6 h-fit lg:sticky lg:top-48">
          <h2 className="text-sm font-semibold text-foreground mb-4">Đơn hàng của bạn</h2>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.thumbnail} alt={item.product.name} className="h-14 w-14 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">×{item.qty}</p>
                </div>
                <p className="text-xs font-mono text-foreground">{formatVND(item.product.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tạm tính</span>
              <span className="font-mono">{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí vận chuyển</span>
              <span className="text-primary text-xs">Freeship</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between text-base">
                <span className="font-semibold">Tổng cộng</span>
                <span className="font-mono font-bold text-primary">{formatVND(subtotal)}</span>
              </div>
            </div>
          </div>

          <Button variant="primary" size="lg" className="w-full mt-6">
            ĐẶT HÀNG
          </Button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Bằng việc đặt hàng, bạn đồng ý với{' '}
            <a href="/chinh-sach-thanh-toan" className="text-primary underline">điều khoản mua hàng</a>
          </p>
        </div>
      </div>
    </div>
  );
}
