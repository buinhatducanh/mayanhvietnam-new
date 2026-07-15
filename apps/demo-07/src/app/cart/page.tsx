'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { allProducts } from '../../../lib/mock-data';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  brand: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: allProducts[0].slug,
      name: allProducts[0].name,
      brand: allProducts[0].brand,
      price: allProducts[0].price,
      imageUrl: allProducts[0].thumbnail,
      quantity: 1
    },
    {
      id: allProducts[1].slug,
      name: allProducts[1].name,
      brand: allProducts[1].brand,
      price: allProducts[1].price,
      imageUrl: allProducts[1].thumbnail,
      quantity: 2
    }
  ]);

  const updateQuantity = (id: string, q: number) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: Math.max(1, q) } : item))
    );
  };

  const [removingIds, setRemovingIds] = useState<string[]>([]);

  const removeItem = (id: string) => {
    setRemovingIds(prev => [...prev, id]);
    setTimeout(() => {
      setCartItems(items => items.filter(item => item.id !== id));
      setRemovingIds(prev => prev.filter(i => i !== id));
    }, 300); // match transition duration
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
          
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A2444', marginBottom: 32 }}>
            Giỏ Hàng Của Bạn
          </h1>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 32px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, border: '1px solid rgba(0,48,135,0.06)' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6B7A99" strokeWidth="1.5" style={{ marginBottom: 16 }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <h2 style={{ fontSize: '1.25rem', color: '#1A2444', marginBottom: 12 }}>Giỏ hàng của bạn đang trống</h2>
              <a href="/" style={{ display: 'inline-block', background: '#003087', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '12px 24px', borderRadius: 8 }}>
                Tiếp Tục Mua Sắm
              </a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 32 }}>
              
              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ 
                    display: 'flex', gap: 20, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 12, padding: 20, border: '1px solid rgba(0,48,135,0.06)', alignItems: 'center',
                    transition: 'all 0.3s ease',
                    opacity: removingIds.includes(item.id) ? 0 : 1,
                    transform: removingIds.includes(item.id) ? 'scale(0.9) translateX(-20px)' : 'scale(1) translateX(0)',
                  }}>
                    <div style={{ width: 100, height: 100, background: '#fff', borderRadius: 8, padding: 8, border: '1px solid #E9EDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#005EB8', textTransform: 'uppercase' }}>{item.brand}</span>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A2444', marginTop: 4, marginBottom: 8 }}>{item.name}</h3>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#D32F2F' }}>{item.price.toLocaleString('vi-VN')}₫</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D2D8E8', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '6px 12px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}>-</button>
                      <span style={{ padding: '6px 12px', fontWeight: 700, minWidth: 28, textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '6px 12px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}>+</button>
                    </div>

                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A0AEC0', padding: 8, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#D32F2F'} onMouseLeave={e => e.currentTarget.style.color = '#A0AEC0'} aria-label="Xóa sản phẩm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div style={{ position: 'sticky', top: 120, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, padding: 32, border: '1px solid rgba(0,48,135,0.06)', height: 'fit-content' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A2444', marginBottom: 24 }}>Tóm tắt đơn hàng</h2>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: '0.9375rem', color: '#6B7A99' }}>
                  <span>Tạm tính</span>
                  <span style={{ fontWeight: 600, color: '#1A2444' }}>{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: '0.9375rem', color: '#6B7A99' }}>
                  <span>Giao hàng</span>
                  <span style={{ fontWeight: 600, color: '#1B8B4B' }}>Miễn phí</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E9EDF5', paddingTop: 20, marginBottom: 32 }}>
                  <span style={{ fontWeight: 700, color: '#1A2444' }}>Tổng cộng</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#D32F2F' }}>{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>

                <a href="/checkout" style={{ display: 'block', background: '#003087', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '14px 0', borderRadius: 8, textAlign: 'center', transition: 'background 0.2s', boxShadow: '0 4px 16px rgba(0, 48, 135, 0.15)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#005EB8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#003087')}
                >
                  Tiến Hành Thanh Toán
                </a>
              </div>

            </div>
          )}

          {/* Upsell Section */}
          <div style={{ marginTop: 80 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A2444', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 24, background: '#005EB8', borderRadius: 2 }}></span>
              Có thể bạn sẽ thích
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #E9EDF5', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,48,135,0.08)' }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ height: 140, background: '#F8FAFF', borderRadius: 8, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop" alt="" style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A2444', marginBottom: 8 }}>Phụ kiện máy ảnh {i}</div>
                  <div style={{ fontWeight: 800, color: '#D32F2F' }}>1.290.000₫</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
