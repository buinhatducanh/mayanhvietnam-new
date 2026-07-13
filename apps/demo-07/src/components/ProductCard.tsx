'use client';

import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: 'new' | 'sale' | 'hot';
  rating: number;
  reviewCount: number;
  imageColor: string;
  imageUrl?: string;
  specs: string[];
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24"
            fill={i <= Math.round(rating) ? '#F59E0B' : 'none'}
            stroke={i <= Math.round(rating) ? '#F59E0B' : '#D1D5DB'}
            strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      <span style={{ fontSize: '0.75rem', color: '#6B7A99' }}>({count})</span>
    </div>
  );
}

function CameraIllustration({ color, brand }: { color: string; brand: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="30" y="55" width="160" height="100" rx="10" fill={color} opacity="0.9"/>
      {/* Top hump */}
      <rect x="65" y="40" width="70" height="25" rx="6" fill={color}/>
      {/* Grip */}
      <rect x="168" y="60" width="22" height="80" rx="6" fill={color} opacity="0.75"/>
      {/* Lens barrel */}
      <ellipse cx="110" cy="108" rx="42" ry="42" fill="#1a1a2e" opacity="0.9"/>
      <ellipse cx="110" cy="108" rx="36" ry="36" fill="#0a0a1a"/>
      <ellipse cx="110" cy="108" rx="28" ry="28" fill="#111827"/>
      <ellipse cx="110" cy="108" rx="18" ry="18" fill="#1e3a5f" opacity="0.8"/>
      <ellipse cx="110" cy="108" rx="10" ry="10" fill="#0d2137"/>
      {/* Lens reflection */}
      <ellipse cx="104" cy="101" rx="5" ry="3" fill="white" opacity="0.15" transform="rotate(-30, 104, 101)"/>
      {/* Mode dial */}
      <circle cx="155" cy="52" r="12" fill="#b0bec5"/>
      <circle cx="155" cy="52" r="8" fill="#90a4ae"/>
      {/* Shutter */}
      <circle cx="172" cy="50" r="7" fill="#d32f2f"/>
      {/* Viewfinder */}
      <rect x="86" y="41" width="28" height="18" rx="4" fill={color} opacity="0.6"/>
      <rect x="89" y="44" width="22" height="12" rx="3" fill="#0a0a1a" opacity="0.7"/>
      {/* LCD screen indicator */}
      <rect x="42" y="62" width="52" height="36" rx="4" fill="#1a2e4a" opacity="0.7"/>
      {/* Brand text */}
      <text x="110" y="167" textAnchor="middle" fontSize="11" fill="#6B7A99" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="600" letterSpacing="1">{brand.toUpperCase()}</text>
    </svg>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [carted, setCarted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Badges */}
      <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {product.badge === 'new' && <span className="badge badge-new">Mới</span>}
        {product.badge === 'sale' && discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
        {product.badge === 'hot' && <span className="badge badge-hot">🔥 Hot</span>}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => setWished(!wished)}
        style={{
          position: 'absolute', top: 14, right: 14, zIndex: 2,
          width: 34, height: 34,
          background: wished ? '#003087' : 'rgba(255,255,255,0.9)',
          border: '1px solid ' + (wished ? '#003087' : '#E9EDF5'),
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        aria-label={wished ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      >
        <svg width="15" height="15" viewBox="0 0 24 24"
          fill={wished ? '#fff' : 'none'}
          stroke={wished ? '#fff' : '#6B7A99'}
          strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>

      <a href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        {/* Image area */}
        <div style={{
          background: '#fff',
          height: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '12px 24px',
          borderBottom: '1px solid #F0F4FA',
        }}>
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <CameraIllustration color={product.imageColor} brand={product.brand} />
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '16px 18px 0' }}>
          {/* Brand */}
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#005EB8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            {product.brand} · {product.category}
          </div>

          {/* Name */}
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A2444', marginBottom: 8, lineHeight: 1.35 }}>
            {product.name}
          </h3>
        </div>
      </a>

      {/* Remaining Content (Specs, Rating, Price, CTA) */}
      <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

        {/* Specs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {product.specs.map(spec => (
            <span key={spec} style={{
              fontSize: '0.6875rem', fontWeight: 500, color: '#6B7A99',
              background: '#F4F6FA', padding: '3px 8px', borderRadius: 4,
            }}>
              {spec}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div style={{ marginBottom: 12 }}>
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14, marginTop: 'auto' }}>
          <span className="price-current">{product.price.toLocaleString('vi-VN')}₫</span>
          {product.originalPrice && (
            <span className="price-original">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => setCarted(true)}
          style={{
            width: '100%',
            background: carted ? '#1B8B4B' : '#003087',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '11px 0',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.25s, transform 0.15s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
          onMouseEnter={e => !carted && ((e.currentTarget as HTMLElement).style.background = '#005EB8')}
          onMouseLeave={e => !carted && ((e.currentTarget as HTMLElement).style.background = '#003087')}
        >
          {carted ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Đã Thêm Vào Giỏ
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Thêm Vào Giỏ
            </>
          )}
        </button>
      </div>
    </div>
  );
}
