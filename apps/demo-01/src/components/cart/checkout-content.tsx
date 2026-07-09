'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { formatVND } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function CheckoutContent() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-muted-foreground mb-4">
          Giỏ hàng trống — không thể thanh toán.
        </p>
        <Link href="/san-pham">
          <Button variant="primary">Khám phá sản phẩm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Shipping */}
        <div className="rounded-lg bg-card border border-border p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Thông tin giao hàng
          </h2>
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
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Phương thức thanh toán
          </h2>
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
                <input
                  type="radio"
                  name="payment"
                  value={id}
                  className="accent-[#00d4aa]"
                  defaultChecked={id === 'cod'}
                />
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
          {items.map((item) => (
            <div
              key={`${item.product.id}::${item.variant ?? ''}`}
              className="flex items-center gap-3"
            >
              <Image
                src={item.product.thumbnail}
                alt={item.product.name}
                width={56}
                height={56}
                sizes="56px"
                loading="lazy"
                className="h-14 w-14 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{item.product.name}</p>
                {item.variant && (
                  <p className="text-[10px] text-muted-foreground">{item.variant}</p>
                )}
                <p className="text-xs text-muted-foreground">×{item.qty}</p>
              </div>
              <p className="text-xs font-mono text-foreground">
                {formatVND(item.product.price * item.qty)}
              </p>
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
            <span className="text-primary text-xs">
              {subtotal >= 5_000_000 ? 'Miễn phí' : '~35.000₫'}
            </span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex justify-between text-base">
              <span className="font-semibold text-foreground">Tổng cộng</span>
              <span className="font-mono font-bold text-primary">{formatVND(subtotal)}</span>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full mt-6"
          onClick={() => {
            clearCart();
            router.push('/dat-hang-thanh-cong');
          }}
        >
          ĐẶT HÀNG
        </Button>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Bằng việc đặt hàng, bạn đồng ý với{' '}
          <Link href="/chinh-sach-thanh-toan" className="text-primary underline">
            điều khoản mua hàng
          </Link>
        </p>
      </div>
    </div>
  );
}
