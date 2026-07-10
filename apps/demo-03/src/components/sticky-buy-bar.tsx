'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Zap } from 'lucide-react'
import { formatVND, type Product } from '@/lib/products'

type StickyBuyBarProps = {
  product: Product
  visible: boolean
}

export function StickyBuyBar({ product, visible }: StickyBuyBarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-lg"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{product.name}</p>
              <p className="text-sm font-bold text-primary">{formatVND(product.price)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-primary/50 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:glow-amber"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Thêm vào giỏ</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-zinc-950 transition-transform hover:scale-105 glow-amber"
              >
                <Zap className="h-4 w-4" />
                Mua ngay
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
