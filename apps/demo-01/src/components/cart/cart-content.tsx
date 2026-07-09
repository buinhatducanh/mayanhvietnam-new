'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { formatVND } from '@/lib/utils';

export function CartContent() {
  const { items, removeItem, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Giỏ hàng trống</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Bạn chưa có sản phẩm nào trong giỏ hàng.
        </p>
        <Link href="/san-pham">
          <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Khám phá sản phẩm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items */}
      <div className="lg:col-span-2 space-y-3">
        {items.map((item) => (
          <div
            key={`${item.product.id}::${item.variant ?? ''}`}
            className="flex gap-4 p-4 rounded-lg bg-card border border-border"
          >
            <Link href={`/san-pham/${item.product.slug}`}>
              <Image
                src={item.product.thumbnail}
                alt={item.product.name}
                width={96}
                height={96}
                sizes="96px"
                loading="lazy"
                className="h-24 w-24 rounded object-cover shrink-0"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary font-medium">{item.product.brand}</p>
              <Link
                href={`/san-pham/${item.product.slug}`}
                className="text-sm font-semibold text-foreground truncate hover:text-primary transition-colors block"
              >
                {item.product.name}
              </Link>
              {item.variant && (
                <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
              )}
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm font-mono font-bold text-primary">
                  {formatVND(item.product.price * item.qty)}
                  <span className="text-muted-foreground font-normal text-xs ml-2">× {item.qty}</span>
                </p>
                <button
                  onClick={() => removeItem(item.product.id, item.variant)}
                  className="text-muted-foreground hover:text-error transition-colors p-1"
                  aria-label="Xóa sản phẩm"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {/* Qty controls */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQty(item.product.id, item.variant, item.qty - 1)}
                  className="h-7 w-7 rounded border border-border flex items-center justify-center text-xs hover:border-primary/50 transition-colors"
                >
                  −
                </button>
                <span className="font-mono text-sm w-8 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.product.id, item.variant, item.qty + 1)}
                  className="h-7 w-7 rounded border border-border flex items-center justify-center text-xs hover:border-primary/50 transition-colors"
                >
                  +
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
            <span className="text-primary text-xs">
              {subtotal >= 5_000_000 ? 'Miễn phí' : 'Tính sau'}
            </span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between text-base">
              <span className="font-semibold text-foreground">Tổng cộng</span>
              <span className="font-mono font-bold text-primary">{formatVND(subtotal)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <Link href="/don-dat-hang">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              TIẾN HÀNH THANH TOÁN
            </Button>
          </Link>
          <Link href="/san-pham">
            <Button
              variant="ghost"
              size="md"
              className="w-full"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
