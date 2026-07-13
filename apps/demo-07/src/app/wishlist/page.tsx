'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { allProducts } from '@mayanhvietnam/mock-data';

const initialWishlist = [
  { id: allProducts[2].slug, brand: allProducts[2].brand, name: allProducts[2].name, price: allProducts[2].price, img: allProducts[2].thumbnail, date: '10/07/2026' },
  { id: allProducts[3].slug, brand: allProducts[3].brand, name: allProducts[3].name, price: allProducts[3].price, img: allProducts[3].thumbnail, date: '09/07/2026' },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setWishlist(prev => prev.filter(item => item.id !== id));
      setRemovingId(null);
    }, 400); // Wait for animation to finish
  };

  return (
    <>
      <Header />
      <main style={{ 
        paddingTop: 100, 
        minHeight: '100vh',
        background: '#FAFCFF',
        paddingBottom: 80
      }}>
        <div className="container-xl" style={{ padding: '40px 24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A2444', marginBottom: 8 }}>Sản Phẩm Yêu Thích</h1>
              <p style={{ color: '#6B7A99' }}>Bạn đang có {wishlist.length} sản phẩm trong danh sách</p>
            </div>
            {wishlist.length > 0 && (
              <button 
                onClick={() => setWishlist([])}
                style={{ background: 'transparent', border: '1px solid #D2D8E8', color: '#6B7A99', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#D32F2F', e.currentTarget.style.color = '#D32F2F')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#D2D8E8', e.currentTarget.style.color = '#6B7A99')}
              >
                Xóa tất cả
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 20px', background: '#fff', borderRadius: 24, border: '1px dashed #D2D8E8' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#F0F5FF', color: '#005EB8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <h2 style={{ fontSize: '1.5rem', color: '#1A2444', marginBottom: 16 }}>Danh sách trống</h2>
              <p style={{ color: '#6B7A99', marginBottom: 32 }}>Bạn chưa lưu bất kỳ sản phẩm nào vào danh sách yêu thích.</p>
              <a href="/category" style={{ display: 'inline-block', background: '#003087', color: '#fff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Tiếp Tục Mua Sắm</a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {wishlist.map((item) => (
                <div key={item.id} style={{ 
                  background: '#fff', 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  border: '1px solid #E9EDF5',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: removingId === item.id ? 0 : 1,
                  transform: removingId === item.id ? 'scale(0.9) translateY(20px)' : 'scale(1) translateY(0)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s', cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <button 
                      onClick={() => handleRemove(item.id)}
                      style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', color: '#D32F2F', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#D32F2F', e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.9)', e.currentTarget.style.color = '#D32F2F')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                  
                  <div style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#005EB8', textTransform: 'uppercase' }}>{item.brand}</span>
                      <span style={{ fontSize: '0.8rem', color: '#A8B3C9' }}>Đã lưu: {item.date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A2444', marginBottom: 12, lineHeight: 1.4 }}>{item.name}</h3>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D32F2F', marginBottom: 24 }}>
                      {item.price.toLocaleString('vi-VN')}₫
                    </div>
                    
                    <button style={{ width: '100%', background: '#F0F5FF', color: '#003087', padding: '12px 0', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#003087', e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#F0F5FF', e.currentTarget.style.color = '#003087')}
                    >
                      Thêm Vào Giỏ Hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
