'use client';

import { useState, useEffect, use } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getProductBySlug, ProductSummary } from '../../../../lib/mock-data';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'review'>('desc');
  const [quantity, setQuantity] = useState(1);
  const [cartState, setCartState] = useState<'idle' | 'adding' | 'added'>('idle');
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (resolvedParams.id) {
      const found = getProductBySlug(resolvedParams.id);
      if (found) {
        setProduct(found);
        setActiveImage(found.images?.[0]?.url || found.thumbnail);
      }
    }
    
    // Scroll reveal and sticky cart logic
    setIsVisible(true);
    const onScroll = () => {
      setShowStickyCart(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [resolvedParams.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (cartState !== 'idle') return;
    setCartState('adding');
    setTimeout(() => {
      setCartState('added');
      setTimeout(() => setCartState('idle'), 2500);
    }, 800);
  };

  if (!product) {
    return (
      <>
        <Header />
        <main style={{ paddingTop: 'var(--demo07-header-offset)', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Đang tải sản phẩm...</h2>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ 
        paddingTop: 'var(--demo07-header-offset)', 
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%), url("https://images.unsplash.com/photo-1553095066-5014ce727e93?q=80&w=2560")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div className="container-xl" style={{ padding: '40px 24px' }}>
          
          {/* Breadcrumbs */}
          <div style={{ fontSize: '0.875rem', color: '#6B7A99', marginBottom: 24, display: 'flex', gap: 8 }}>
            <a href="/" style={{ color: '#005EB8', textDecoration: 'none' }}>Trang chủ</a> / 
            <a href="/category" style={{ color: '#005EB8', textDecoration: 'none' }}>{product.category}</a> / 
            <span>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr', gap: 48, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, padding: 32, border: '1px solid rgba(0,48,135,0.06)', boxShadow: '0 10px 40px rgba(0, 48, 135, 0.04)' }}>
            
            {/* Gallery / Image */}
            <div className={`reveal ${isVisible ? 'is-visible' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div 
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                style={{ 
                  background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E9EDF5', height: 420, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'zoom-in', position: 'relative'
                }}
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  style={{ 
                    maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                    transform: isZooming ? 'scale(2)' : 'scale(1)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: isZooming ? 'none' : 'transform 0.3s ease'
                  }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {product.images?.slice(0, 4).map((img, i) => (
                  <div key={i} onClick={() => setActiveImage(img.url)} style={{ height: 80, border: activeImage === img.url ? '2px solid #005EB8' : '1px solid #E9EDF5', borderRadius: 8, background: '#fff', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <img src={img.url} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', opacity: activeImage === img.url ? 1 : 0.6 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#005EB8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                {product.brand} · {product.category}
              </span>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A2444', marginBottom: 12, lineHeight: 1.25 }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= Math.round(product.rating?.average || 5) ? '#F59E0B' : 'none'} stroke={star <= Math.round(product.rating?.average || 5) ? '#F59E0B' : '#D1D5DB'} strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A2444' }}>{product.rating?.average || '5.0'}</span>
                <span style={{ color: '#E9EDF5' }}>|</span>
                <span style={{ fontSize: '0.875rem', color: '#6B7A99' }}>{product.rating?.count || 0} Đánh giá</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, background: '#F8FAFF', padding: '16px 24px', borderRadius: 12, marginBottom: 24 }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#D32F2F' }}>
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: '1.25rem', textDecoration: 'line-through', color: '#A0AEC0' }}>
                    {product.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>

              {/* Short Specs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {product.shortSpecs?.slice(0, 5).map((spec, i) => (
                  <span key={i} style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', background: '#F0F4F8', padding: '6px 14px', borderRadius: 20 }}>
                    {spec}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <ul style={{ paddingLeft: 20, marginBottom: 24, color: '#4B5563', lineHeight: 1.6 }}>
                  {product.highlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D2D8E8', borderRadius: 8, overflow: 'hidden' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: '12px 18px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}>-</button>
                  <span style={{ padding: '12px 18px', fontSize: '1rem', fontWeight: 700, minWidth: 40, textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '12px 18px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}>+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  style={{ 
                    flex: 1, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: cartState === 'added' ? '#1B8B4B' : 'linear-gradient(135deg, #003087, #005EB8)', 
                    color: '#fff', border: 'none', borderRadius: 8, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: cartState === 'added' ? '0 10px 20px rgba(27, 139, 75, 0.2)' : '0 10px 20px rgba(0, 48, 135, 0.2)',
                    animation: cartState === 'added' ? 'buttonPop 0.4s ease' : 'none',
                  }}
                >
                  {cartState === 'adding' ? (
                    <span style={{ display: 'inline-block', width: 20, height: 20, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spinSlow 0.8s linear infinite' }}></span>
                  ) : cartState === 'added' ? (
                    <span style={{ animation: 'checkmarkGrow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>✓ Đã Thêm Vào Giỏ</span>
                  ) : 'Thêm Vào Giỏ Hàng'}
                </button>
              </div>

            </div>
          </div>

          {/* Details / Tabs */}
          <div style={{ marginTop: 64, background: '#fff', borderRadius: 16, padding: '40px', border: '1px solid rgba(0,48,135,0.06)' }}>
            <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid #E9EDF5', marginBottom: 32 }}>
              <button 
                onClick={() => setActiveTab('desc')}
                style={{ padding: '0 0 16px 0', border: 'none', background: 'none', fontSize: '1.1rem', fontWeight: 700, color: activeTab === 'desc' ? '#003087' : '#A8B3C9', borderBottom: activeTab === 'desc' ? '2px solid #003087' : '2px solid transparent', cursor: 'pointer' }}
              >Đặc Điểm Nổi Bật</button>
              <button 
                onClick={() => setActiveTab('specs')}
                style={{ padding: '0 0 16px 0', border: 'none', background: 'none', fontSize: '1.1rem', fontWeight: 700, color: activeTab === 'specs' ? '#003087' : '#A8B3C9', borderBottom: activeTab === 'specs' ? '2px solid #003087' : '2px solid transparent', cursor: 'pointer' }}
              >Thông Số Kỹ Thuật</button>
            </div>

            {activeTab === 'desc' && (
              <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#374151', maxWidth: 800 }}>
                {product.description?.split('\\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 16 }}>{para}</p>
                )) || <p>Đang cập nhật bài viết chi tiết.</p>}
              </div>
            )}

            {activeTab === 'specs' && (
              <div style={{ maxWidth: 800 }}>
                {product.specs ? product.specs.map((group, idx) => (
                  <div key={idx} style={{ marginBottom: 32 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A2444', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #E9EDF5' }}>{group.group}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {group.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', padding: '12px 16px', background: i % 2 === 0 ? '#F8FAFF' : '#fff', borderRadius: 8 }}>
                          <span style={{ width: 200, fontWeight: 600, color: '#374151' }}>{item.label}</span>
                          <span style={{ color: '#6B7A99', flex: 1 }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )) : <p>Chưa có thông số chi tiết.</p>}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Cart (Mobile/Scroll) */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
        borderTop: '1px solid #E9EDF5', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transform: showStickyCart ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', zIndex: 99
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={activeImage} alt="" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8, background: '#fff', border: '1px solid #E9EDF5' }} />
          <div>
            <div style={{ fontWeight: 700, color: '#1A2444' }}>{product.name}</div>
            <div style={{ color: '#D32F2F', fontWeight: 800 }}>{product.price.toLocaleString('vi-VN')}₫</div>
          </div>
        </div>
        <button 
          onClick={handleAddToCart} 
          style={{ 
            padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minWidth: 160,
            background: cartState === 'added' ? '#1B8B4B' : '#003087', 
            color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
            transition: 'background 0.3s ease',
            animation: cartState === 'added' ? 'buttonPop 0.4s ease' : 'none',
          }}
        >
          {cartState === 'adding' ? (
            <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spinSlow 0.8s linear infinite' }}></span>
          ) : cartState === 'added' ? (
            <span style={{ animation: 'checkmarkGrow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>✓ Đã Thêm</span>
          ) : 'Thêm Giỏ Hàng'}
        </button>
      </div>

      <Footer />
      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </>
  );
}
