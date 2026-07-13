'use client'

import Image from 'next/image'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatVND } from '@/lib/products'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-label="Giỏ hàng">
      <button
        type="button"
        aria-label="Đóng giỏ hàng"
        onClick={closeCart}
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
      />
      <aside className="animate-rise-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="size-5 text-primary" aria-hidden="true" />
            Giỏ hàng của bạn
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Đóng"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" aria-hidden="true" />
            <p className="text-muted-foreground">Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.variantName}`}
                  className="flex gap-4 border-b border-border py-4 last:border-0"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image src={item.image || '/placeholder.svg'} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.variantName}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                        <button
                          type="button"
                          aria-label="Giảm số lượng"
                          onClick={() => updateQuantity(item.slug, item.variantName, item.quantity - 1)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-5 text-center font-mono text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Tăng số lượng"
                          onClick={() => updateQuantity(item.slug, item.variantName, item.quantity + 1)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-mono text-sm text-primary">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Xóa ${item.name}`}
                    onClick={() => removeItem(item.slug, item.variantName)}
                    className="self-start rounded p-1 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tạm tính</span>
                <span className="font-mono text-lg font-semibold text-primary">
                  {formatVND(totalPrice)}
                </span>
              </div>
              <button
                type="button"
                className="brand-glow w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
