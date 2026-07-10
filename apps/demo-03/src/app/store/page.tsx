'use client'

import { useEffect, useRef, useState } from 'react'
import { products } from '@/lib/products'
import { CameraCanvas } from '@/components/camera-canvas'
import { ProductDetails } from '@/components/product-details'
import { StickyBuyBar } from '@/components/sticky-buy-bar'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  const [productIndex, setProductIndex] = useState(0)
  const [colorIndex, setColorIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showBuyBar, setShowBuyBar] = useState(false)
  const buyButtonsRef = useRef<HTMLDivElement>(null)

  const product = products[productIndex]
  const selectedColor = product.colors[colorIndex] ?? product.colors[0]

  const handleProductChange = (index: number) => {
    setProductIndex(index)
    setColorIndex(0)
    setQuantity(1)
  }

  useEffect(() => {
    // Read the ref lazily on each scroll: AnimatePresence remounts the buy
    // buttons after product switches, so an IntersectionObserver would go stale.
    const check = () => {
      const el = buyButtonsRef.current
      if (!el) return
      setShowBuyBar(el.getBoundingClientRect().bottom < 0)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Product switcher */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Chọn sản phẩm">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === productIndex}
              onClick={() => handleProductChange(i)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                i === productIndex
                  ? 'border-primary/60 bg-primary/10 text-primary glow-amber'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main content: 2 columns on desktop */}
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column: sticky 3D viewer (55%) */}
          <div className="lg:w-[55%]">
            <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
              <div className="flex h-[480px] flex-col lg:h-full">
                <CameraCanvas
                  bodyColor={selectedColor.hex}
                  lensSpec={product.lensSpec}
                  screenSpec={product.screenSpec}
                />
              </div>
            </div>
          </div>

          {/* Right column: product info (45%) */}
          <div className="lg:w-[45%]">
            <ProductDetails
              ref={buyButtonsRef}
              product={product}
              selectedColorIndex={colorIndex}
              onColorChange={setColorIndex}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>
      </main>

      <SiteFooter />
      <StickyBuyBar product={product} visible={showBuyBar} />
    </div>
  )
}
