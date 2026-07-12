import { useState, useEffect } from 'react'
import { SharedNavbar } from '../homepage/SharedNavbar'
import { Footer } from '../homepage/Footer'
import { useSEO } from '../../hooks/useSEO'
import { ArrowLeft, Trash2, Check } from 'lucide-react'

export function CartPage({
  onNavigate,
  cartItems,
  setCartItems,
  cartCount
}: {
  onNavigate?: (label: string, id?: string) => void
  cartItems: any[]
  setCartItems: (items: any[]) => void
  cartCount: number
}) {
  useSEO('Giỏ hàng | Máy Ảnh Việt Nam', 'Xem giỏ hàng và tiến hành thanh toán.')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [checkoutStep, setCheckoutStep] = useState(1)

  const handleRemoveItem = (index: number) => {
    const newItems = [...cartItems]
    newItems.splice(index, 1)
    setCartItems(newItems)
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price || 0), 0)

  const handleCheckout = () => {
    setCartItems([]) // Reset cart
    setCheckoutStep(3) // Go to success step
  }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: 'var(--font-body)', color: '#141414', overflowX: 'hidden' }}>
      <SharedNavbar activeItem="Giỏ hàng" onNavigate={onNavigate} cartCount={cartCount} />
      
      <main style={{ paddingTop: '100px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '4vw', paddingRight: '4vw' }}>
        <div style={{ marginBottom: '40px' }}>
          <button 
            onClick={() => onNavigate?.('Cửa hàng')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#6B6B6B', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}
            className="hover:text-[#E86A24]"
          >
            <ArrowLeft size={16} /> Tiếp tục mua sắm
          </button>
        </div>

        <h1 style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 400, color: '#141414', marginBottom: '40px' }}>
          Giỏ hàng của bạn
        </h1>

        {cartItems.length === 0 && checkoutStep === 1 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', background: '#FFF', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
            <p style={{ fontSize: '18px', color: '#6B6B6B', marginBottom: '24px' }}>Giỏ hàng của bạn đang trống.</p>
            <button 
              onClick={() => onNavigate?.('Cửa hàng')}
              style={{ padding: '16px 40px', background: '#E86A24', color: '#FFF', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232, 106, 36, 0.25)' }}
            >
              Khám phá sản phẩm
            </button>
          </div>
        ) : checkoutStep === 3 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', background: '#FFF', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E86A24', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', animation: 'sf-fade-up 0.5s ease-out' }}>
              <Check size={40} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '16px', color: '#141414', animation: 'sf-fade-up 0.5s ease-out 0.1s both' }}>Đặt hàng thành công!</h3>
            <p style={{ fontSize: '16px', color: '#6B6B6B', marginBottom: '8px', animation: 'sf-fade-up 0.5s ease-out 0.2s both' }}>Cảm ơn bạn đã mua sắm tại Máy Ảnh Việt Nam.</p>
            <p style={{ fontSize: '16px', color: '#6B6B6B', marginBottom: '40px', animation: 'sf-fade-up 0.5s ease-out 0.3s both' }}>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
            <button 
              onClick={() => onNavigate?.('Trang chủ')}
              style={{ padding: '16px 40px', background: '#F4F3F0', color: '#141414', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', animation: 'sf-fade-up 0.5s ease-out 0.4s both' }}
            >
              Trở về trang chủ
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }} className="cart-grid">
            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 900px) {
                .cart-grid { grid-template-columns: 1fr !important; }
              }
            `}} />
            
            {/* Left: Cart Items */}
            <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #EBEBEB' }}>
                Sản phẩm ({cartItems.length})
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '20px', paddingBottom: '24px', borderBottom: index < cartItems.length - 1 ? '1px solid #EBEBEB' : 'none' }}>
                    <div style={{ width: '100px', height: '100px', background: '#FAFAF8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.thumbnail || (item.images && item.images[0]?.url)} alt={item.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.brand}</div>
                      <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#141414', marginBottom: '8px', lineHeight: 1.4 }}>{item.name}</h3>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#E86A24' }}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      style={{ background: 'transparent', border: 'none', color: '#BBBBBB', cursor: 'pointer', padding: '8px', alignSelf: 'flex-start', transition: 'color 0.2s ease' }}
                      className="hover:text-[#FF3B30]"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Checkout Summary */}
            <div>
              <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.02)', position: 'sticky', top: '100px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Thông tin đơn hàng</h2>
                
                {checkoutStep === 1 ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#6B6B6B', fontSize: '15px' }}>
                      <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                      <span style={{ color: '#141414', fontWeight: 500 }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#6B6B6B', fontSize: '15px' }}>
                      <span>Phí vận chuyển</span>
                      <span style={{ color: '#141414', fontWeight: 500 }}>Miễn phí</span>
                    </div>
                    <div style={{ height: '1px', background: '#EBEBEB', marginBottom: '24px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '18px', fontWeight: 600, color: '#141414' }}>
                      <span>Tổng cộng</span>
                      <span style={{ color: '#E86A24', fontSize: '22px' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                    </div>
                    
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      style={{ width: '100%', padding: '18px', background: '#E86A24', color: '#FFF', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232, 106, 36, 0.25)', transition: 'all 0.3s ease' }}
                      className="hover:bg-[#d45d1d] hover:shadow-[0_8px_32px_rgba(232,106,36,0.3)]"
                    >
                      Tiến hành đặt hàng
                    </button>
                  </>
                ) : checkoutStep === 2 ? (
                  <>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Họ và tên <span style={{ color: '#E86A24' }}>*</span></label>
                      <input type="text" style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Số điện thoại <span style={{ color: '#E86A24' }}>*</span></label>
                      <input type="text" style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                      <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Địa chỉ nhận hàng</label>
                      <input type="text" style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '16px', fontWeight: 600, color: '#141414' }}>
                      <span>Cần thanh toán</span>
                      <span style={{ color: '#E86A24' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      style={{ width: '100%', padding: '18px', background: '#E86A24', color: '#FFF', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232, 106, 36, 0.25)', transition: 'all 0.3s ease', marginBottom: '16px' }}
                      className="hover:bg-[#d45d1d] hover:shadow-[0_8px_32px_rgba(232,106,36,0.3)]"
                    >
                      Xác nhận thanh toán
                    </button>
                    <button 
                      onClick={() => setCheckoutStep(1)}
                      style={{ width: '100%', padding: '16px', background: 'transparent', color: '#6B6B6B', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease' }}
                      className="hover:bg-[#F4F3F0]"
                    >
                      Quay lại giỏ hàng
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
