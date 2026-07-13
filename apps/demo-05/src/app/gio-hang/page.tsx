'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Tag, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatVND } from '@/lib/utils';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const shippingFee = subtotal >= 5000000 ? 0 : 30000;
  const discount = promoApplied ? Math.round(subtotal * 0.05) : 0;
  const finalTotal = subtotal + shippingFee - discount;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-card border border-border flex items-center justify-center mb-5">
          <ShoppingCart className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">Giỏ hàng trống</h1>
        <p className="text-sm text-muted-foreground mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
        <Link href="/san-pham" className="inline-flex items-center gap-2 h-11 px-6 rounded-lg text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background: '#2563eb' }}>
          Khám phá sản phẩm <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
        <span>/</span>
        <span className="text-foreground">Giỏ hàng</span>
      </nav>

      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Giỏ hàng ({items.length})</h1>
        <button onClick={clearCart} className="text-xs text-error hover:text-error/70 font-semibold">Xóa tất cả</button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.product.id}::${item.variant ?? ''}`} className="flex gap-4 p-4 bg-card border border-border rounded-xl">
              <Link href={`/san-pham/${item.product.slug}`} className="relative w-24 h-24 rounded-lg overflow-hidden bg-elevated shrink-0">
                <Image src={item.product.thumbnail} alt={item.product.name} fill sizes="96px" className="object-contain p-1" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/san-pham/${item.product.slug}`} className="text-sm font-medium text-foreground line-clamp-1 hover:text-primary">
                  {item.product.name}
                </Link>
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">{item.product.brand}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-md">
                    <button onClick={() => updateQty(item.product.id, item.variant, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-foreground border-x border-border">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, item.variant, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="price-mono text-base font-bold">{formatVND(item.product.price * item.qty)}</p>
                </div>
              </div>
              <button onClick={() => removeItem(item.product.id, item.variant)} className="self-start w-8 h-8 rounded-md text-muted-foreground hover:text-error hover:bg-error/10 flex items-center justify-center transition-colors" aria-label="Xóa">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-28 self-start">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-foreground">Tóm tắt đơn hàng</h2>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Mã giảm giá</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Nhập mã..."
                    className="w-full h-10 pl-9 pr-3 rounded-md bg-background border border-border text-xs text-foreground"
                  />
                </div>
                <button
                  onClick={() => { if (promoCode.toUpperCase() === 'GIAM5') setPromoApplied(true); }}
                  className="h-10 px-4 rounded-md text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity" style={{ background: '#2563eb' }}
                >
                  Áp dụng
                </button>
              </div>
              {promoApplied && <p className="text-[11px] text-success mt-1.5">✅ Mã GIAM5 đã áp dụng!</p>}
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span className="font-mono font-semibold text-foreground">{formatVND(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phí vận chuyển</span><span className={`font-mono font-semibold ${shippingFee === 0 ? 'text-success' : 'text-foreground'}`}>{shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}</span></div>
              {promoApplied && <div className="flex justify-between"><span className="text-muted-foreground">Giảm giá (5%)</span><span className="font-mono font-semibold text-success">-{formatVND(discount)}</span></div>}
              <div className="border-t border-border pt-2.5 flex justify-between">
                <span className="font-bold text-foreground">Tổng cộng</span>
                <span className="price-mono text-lg font-black">{formatVND(finalTotal)}</span>
              </div>
            </div>

            <Link href="/thanh-toan" className="w-full h-12 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: '#2563eb' }}>
              Tiến hành thanh toán <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {[{ icon: ShieldCheck, label: 'Bảo hành 24T' }, { icon: Truck, label: 'Freeship > 5tr' }, { icon: CreditCard, label: 'Trả góp 0%' }].map((s) => (
              <div key={s.label} className="text-center p-2 rounded-md bg-card border border-border">
                <s.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] font-mono font-semibold text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}