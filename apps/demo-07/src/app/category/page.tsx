'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { allProducts } from '@mayanhvietnam/mock-data';

const brands = ['Tất cả', 'Sony', 'Canon', 'Nikon', 'Fujifilm'];
const priceRanges = ['Tất cả', 'Dưới 30 triệu', '30 - 60 triệu', 'Trên 60 triệu'];

export default function CategoryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [selectedPrice, setSelectedPrice] = useState('Tất cả');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Filter logic
  const filteredProducts = allProducts.filter(p => {
    if (selectedBrand !== 'Tất cả' && p.brand !== selectedBrand) return false;
    if (selectedPrice === 'Dưới 30 triệu' && p.price >= 30000000) return false;
    if (selectedPrice === '30 - 60 triệu' && (p.price < 30000000 || p.price > 60000000)) return false;
    if (selectedPrice === 'Trên 60 triệu' && p.price <= 60000000) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main style={{ 
        paddingTop: 100, 
        minHeight: '100vh',
        background: '#FAFCFF',
      }}>
        {/* Banner */}
        <div style={{ height: 240, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', animation: 'fadeInUp 0.8s ease' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>Danh Mục Máy Ảnh</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Khám phá những thiết bị nhiếp ảnh hàng đầu thế giới</p>
          </div>
        </div>

        <div className="container-xl" style={{ padding: '40px 24px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          
          {/* Sidebar Filter */}
          <aside style={{ width: 280, flexShrink: 0, position: 'sticky', top: 100, background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #E9EDF5', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A2444', marginBottom: 24 }}>Bộ Lọc</h3>
            
            <div style={{ marginBottom: 32 }}>
              <h4 style={{ fontWeight: 700, color: '#374151', marginBottom: 16 }}>Thương Hiệu</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {brands.map(brand => (
                  <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', group: 'true' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: selectedBrand === brand ? '5px solid #003087' : '1px solid #D2D8E8', background: selectedBrand === brand ? '#003087' : '#fff', transition: 'all 0.2s' }} />
                    <input type="radio" name="brand" value={brand} checked={selectedBrand === brand} onChange={() => setSelectedBrand(brand)} style={{ display: 'none' }} />
                    <span style={{ fontSize: '0.95rem', color: selectedBrand === brand ? '#003087' : '#6B7A99', fontWeight: selectedBrand === brand ? 700 : 500 }}>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 700, color: '#374151', marginBottom: 16 }}>Mức Giá</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {priceRanges.map(price => (
                  <label key={price} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: selectedPrice === price ? '5px solid #003087' : '1px solid #D2D8E8', background: selectedPrice === price ? '#003087' : '#fff', transition: 'all 0.2s' }} />
                    <input type="radio" name="price" value={price} checked={selectedPrice === price} onChange={() => setSelectedPrice(price)} style={{ display: 'none' }} />
                    <span style={{ fontSize: '0.95rem', color: selectedPrice === price ? '#003087' : '#6B7A99', fontWeight: selectedPrice === price ? 700 : 500 }}>{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #E9EDF5' }}>
              <div style={{ color: '#6B7A99' }}>
                Hiển thị <strong style={{ color: '#1A2444' }}>{filteredProducts.length}</strong> sản phẩm
              </div>
              
              <div style={{ display: 'flex', gap: 8, background: '#fff', padding: 4, borderRadius: 8, border: '1px solid #E9EDF5' }}>
                <button 
                  onClick={() => setViewMode('grid')}
                  style={{ width: 36, height: 36, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', background: viewMode === 'grid' ? '#F0F5FF' : 'transparent', color: viewMode === 'grid' ? '#003087' : '#A8B3C9', transition: 'all 0.2s' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  style={{ width: 36, height: 36, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', background: viewMode === 'list' ? '#F0F5FF' : 'transparent', color: viewMode === 'list' ? '#003087' : '#A8B3C9', transition: 'all 0.2s' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
              </div>
            </div>

            {/* Product List */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#6B7A99' }}>
                Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
                gap: 24,
                transition: 'all 0.3s ease'
              }}>
                {filteredProducts.map((p, idx) => (
                  <a key={p.id} href={`/products/${p.slug}`} 
                    onMouseEnter={() => setHoveredProduct(p.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    style={{
                      display: viewMode === 'list' ? 'flex' : 'block',
                      background: '#fff',
                      borderRadius: 16,
                      border: '1px solid #E9EDF5',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredProduct === p.id ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow: hoveredProduct === p.id ? '0 20px 40px rgba(0,48,135,0.08)' : '0 4px 12px rgba(0,0,0,0.02)',
                      animation: `fadeInUp 0.5s ease forwards ${idx * 0.05}s`,
                      opacity: 0, // for animation
                    }}
                  >
                    <div style={{ 
                      width: viewMode === 'list' ? 240 : '100%', 
                      height: viewMode === 'list' ? 240 : 280, 
                      position: 'relative', 
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${p.thumbnail})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hoveredProduct === p.id ? 'scale(1.08)' : 'scale(1)',
                      }} />
                      {/* Floating actions */}
                      <div style={{
                        position: 'absolute', top: 16, right: 16,
                        width: 40, height: 40, borderRadius: '50%', background: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#A8B3C9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        opacity: hoveredProduct === p.id ? 1 : 0,
                        transform: hoveredProduct === p.id ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 0.3s ease',
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      </div>
                    </div>
                    
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#005EB8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{p.brand}</div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1A2444', marginBottom: 12, lineHeight: 1.4 }}>{p.name}</h3>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D32F2F', marginTop: 'auto' }}>
                        {p.price.toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
