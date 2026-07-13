'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatVND, type Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const finalPrice = product.discountPrice ?? product.price
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - finalPrice) / product.price) * 100)
    : 0

  return (
    <article className="shine card-tech group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50">
      <span aria-hidden="true" className="card-glow z-20" />
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Mới
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-md bg-destructive px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              -{discountPercent}%
            </span>
          )}
          {product.condition === 'USED' && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
              Đã qua SD
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={`Thêm ${product.name} vào yêu thích`}
          className="absolute right-3 top-3 rounded-full bg-background/60 p-2 text-muted-foreground opacity-0 backdrop-blur-sm transition-all hover:text-primary group-hover:opacity-100"
        >
          <Heart className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-medium leading-snug transition-colors group-hover:text-primary">
          <Link href={`/san-pham/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${i < Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
              />
            ))}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="font-mono text-xs text-muted-foreground line-through">
                {formatVND(product.price)}
              </span>
            )}
            <span className="font-mono text-base font-semibold text-primary">
              {formatVND(finalPrice)}
            </span>
          </div>
          <button
            type="button"
            aria-label={`Thêm ${product.name} vào giỏ hàng`}
            onClick={() =>
              addItem({
                slug: product.slug,
                name: product.name,
                variantName: product.variants[0]?.name ?? 'Tiêu chuẩn',
                price: finalPrice,
                image: product.image,
              })
            }
            className="relative z-10 rounded-full bg-primary p-2.5 text-primary-foreground transition-all hover:brightness-110 hover:brand-glow"
          >
            <ShoppingCart className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
