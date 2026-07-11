'use client'

import { Phone, MessageCircle } from 'lucide-react'

export function StickyChatBar({ price, formattedPrice }: { price: number; formattedPrice: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.1)] lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Price */}
        <div>
          <p className="font-mono text-lg font-bold text-primary">{formattedPrice}</p>
          <p className="text-xs text-muted-foreground">Giá đã bao gồm VAT</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="tel:0907215252"
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            Gọi ngay
          </a>
          <a
            href="https://zalo.me/2875467351509223987"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-brightness hover:brightness-110"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Zalo
          </a>
        </div>
      </div>
    </div>
  )
}
