'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { formatVND, type Product } from '@/lib/products';

type StickyBuyBarProps = {
  product: Product;
  visible: boolean;
};

export function StickyBuyBar({ product, visible }: StickyBuyBarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/85 backdrop-blur-lg"
          role="region"
          aria-label="Thanh mua hàng nhanh"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-12">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative hidden size-12 shrink-0 overflow-hidden rounded-lg border border-border sm:block">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Star className="size-3 fill-primary text-primary" aria-hidden />
                  {product.rating} · {product.soldCount} đã bán
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-lg font-medium text-foreground">{formatVND(product.price)}</p>
                <p className="text-xs text-muted-foreground line-through">
                  {formatVND(product.originalPrice)}
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_24px_-4px] hover:shadow-primary/60"
              >
                <ShoppingCart className="size-4" aria-hidden />
                Mua ngay
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
