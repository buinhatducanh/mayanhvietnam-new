'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatVND } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-fade-up" onClick={closeDrawer} />
      <aside className="fixed right-0 top-0 bottom-0 z-[70] w-full sm:w-[420px] bg-card border-l border-border shadow-2xl animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Giỏ hàng ({items.length})</h2>
          </div>
          <button onClick={closeDrawer} className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground" aria-label="Đóng">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">Giỏ hàng trống</p>
              <p className="text-xs text-muted-foreground mb-4">Hãy thêm sản phẩm vào giỏ nhé!</p>
              <Link href="/san-pham" onClick={closeDrawer} className="h-9 px-4 rounded-lg text-xs font-bold text-primary-foreground" style={{ background: '#FF6B35' }}>
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}::${item.variant ?? ''}`} className="flex gap-3 p-3 rounded-lg bg-background border border-border">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-elevated shrink-0 relative">
                    <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-contain p-1" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/san-pham/${item.product.slug}`} onClick={closeDrawer} className="text-xs font-medium text-foreground line-clamp-2 leading-tight hover:text-primary">
                      {item.product.name}
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-md">
                        <button onClick={() => updateQty(item.product.id, item.variant, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-foreground">{item.qty}</span>
                        <button onClick={() => updateQty(item.product.id, item.variant, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="price-mono text-sm font-bold">{formatVND(item.product.price * item.qty)}</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id, item.variant)} className="self-start w-7 h-7 rounded-md text-muted-foreground hover:text-error hover:bg-error/10 flex items-center justify-center transition-colors" aria-label="Xóa">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 bg-background">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Tổng cộng:</span>
              <span className="price-mono text-lg font-black">{formatVND(subtotal)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/gio-hang" onClick={closeDrawer} className="h-10 rounded-lg border border-border bg-card text-foreground text-xs font-bold flex items-center justify-center hover:border-primary/40 transition-colors">
                Xem giỏ hàng
              </Link>
              <Link href="/thanh-toan" onClick={closeDrawer} className="h-10 rounded-lg text-xs font-bold text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity" style={{ background: '#FF6B35' }}>
                Thanh toán
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}