'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { products } from '@/lib/products';
import { SiteHeader } from '@/components/site-header';
import { ScrollExperience } from '@/components/scroll-experience';
import { ProductDetails } from '@/components/product-details';
import { StickyBuyBar } from '@/components/sticky-buy-bar';

export default function Page() {
  const [productIndex, setProductIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const product = products[productIndex];
  const bodyColor = product.colors[colorIndex]?.hex ?? product.colors[0].hex;

  const handleSelectProduct = useCallback((index: number) => {
    setProductIndex(index);
    setColorIndex(0);
  }, []);

  const buyRef = useRef<HTMLDivElement>(null);
  const [showBuyBar, setShowBuyBar] = useState(false);

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBuyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-background">
      <SiteHeader />
      <ScrollExperience product={product} bodyColor={bodyColor} />
      <ProductDetails
        ref={buyRef}
        product={product}
        colorIndex={colorIndex}
        onSelectProduct={handleSelectProduct}
        onSelectColor={setColorIndex}
      />
      <footer className="border-t border-border bg-background py-10 text-center">
        <p className="text-sm text-muted-foreground">
          LUMEN Camera — Máy ảnh chính hãng, bảo hành toàn quốc.
        </p>
      </footer>
      <StickyBuyBar product={product} visible={showBuyBar} />
    </main>
  );
}
