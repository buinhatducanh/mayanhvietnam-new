'use client';

import { useState } from 'react';
import ProductCard, { type Product } from './ProductCard';

const tabs = ['Tất Cả', 'Mirrorless', 'DSLR', 'Ống Kính', 'Flycam'];

import { allProducts } from '@mayanhvietnam/mock-data';

const products: Product[] = allProducts.slice(0, 8).map((p, i) => ({
  id: p.slug,
  name: p.name,
  brand: p.brand,
  category: p.category,
  price: p.price,
  originalPrice: p.originalPrice,
  badge: p.badges?.[0]?.type === 'new' ? 'new' : p.badges?.[0]?.type === 'sale' ? 'sale' : 'hot',
  rating: p.rating?.average || 5,
  reviewCount: p.rating?.count || Math.floor(Math.random() * 100),
  imageColor: ['#1a237e', '#b71c1c', '#1b5e20', '#37474f'][i % 4],
  imageUrl: p.thumbnail,
  specs: p.shortSpecs || [],
}));

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('Tất Cả');

  const filtered = activeTab === 'Tất Cả'
    ? products
    : products.filter(p => p.category.includes(activeTab));

  return (
    <section id="featured" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%), url("https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2560")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div className="container-xl">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="section-label">Sản Phẩm Nổi Bật</span>
            <div className="divider-blue"/>
            <h2 className="section-title">Bộ Sưu Tập <span>Được Yêu Thích</span></h2>
          </div>
          <a href="#" className="btn-ghost">
            Xem tất cả sản phẩm
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '9px 22px',
                borderRadius: 24,
                border: activeTab === tab ? 'none' : '1.5px solid #D2D8E8',
                background: activeTab === tab ? '#003087' : 'transparent',
                color: activeTab === tab ? '#fff' : '#6B7A99',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab) {
                  (e.currentTarget as HTMLElement).style.borderColor = '#003087';
                  (e.currentTarget as HTMLElement).style.color = '#003087';
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== tab) {
                  (e.currentTarget as HTMLElement).style.borderColor = '#D2D8E8';
                  (e.currentTarget as HTMLElement).style.color = '#6B7A99';
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
