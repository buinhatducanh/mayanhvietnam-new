'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { products, getProductsByCategory, allProducts } from '@/lib/adapter';
import { HeroSlider } from '@/components/hero-slider';
import { CategoryGrid } from '@/components/category-grid';
import { FlashSaleSection } from '@/components/flash-sale-section';
import { ProductSection } from '@/components/product-section';
import { ScrollExperience } from '@/components/scroll-experience';
import { StickyBuyBar } from '@/components/sticky-buy-bar';

export default function Page() {
  const [productIndex, setProductIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const product = products[productIndex];
  const bodyColor = product?.colors[colorIndex]?.hex ?? product?.colors[0]?.hex ?? '#1c1c1c';

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

  // Grouped products for sections
  const cameras = getProductsByCategory('may-anh');
  const lenses = getProductsByCategory('ong-kinh');
  const flycams = getProductsByCategory('flycam');
  const actionCams = getProductsByCategory('action-camera');

  return (
    <main className="bg-background">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Category Grid */}
      <CategoryGrid />

      {/* 3. Flash Sale */}
      <FlashSaleSection />

      {/* 4. 3D Showcase — Featured Product */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Trải nghiệm 3D tương tác
          </p>
          <h2 className="mt-2 text-balance text-2xl font-extralight text-foreground md:text-4xl">
            Xem máy ảnh 360° trước khi mua
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Cuộn xuống để khám phá mô hình 3D tương tác — xoay, phóng to, chọn màu trực tiếp.
          </p>
        </div>
        {product && (
          <ScrollExperience product={product} bodyColor={bodyColor} />
        )}
      </section>

      {/* 5. Product Sections by Category */}
      <ProductSection
        title="Top Máy Ảnh"
        subtitle="Máy ảnh"
        products={cameras}
        viewAllHref="/danh-muc/may-anh"
      />

      <ProductSection
        title="Ống Kính Nổi Bật"
        subtitle="Ống kính"
        products={lenses}
        viewAllHref="/danh-muc/ong-kinh"
      />

      <ProductSection
        title="Flycam & Drone"
        subtitle="Flycam"
        products={flycams}
        viewAllHref="/danh-muc/flycam"
      />

      <ProductSection
        title="Action Camera"
        subtitle="Camera hành động"
        products={actionCams}
        viewAllHref="/danh-muc/action-camera"
      />

      {/* Sticky buy bar for 3D showcase */}
      {product && <StickyBuyBar product={product} visible={showBuyBar} />}
    </main>
  );
}
