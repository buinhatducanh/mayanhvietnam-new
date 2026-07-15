import { useState, useEffect } from 'react'
import { SharedNavbar } from '../homepage/SharedNavbar'
import { Footer } from '../homepage/Footer'
import { useSEO } from '../../hooks/useSEO'
import { Star, ShoppingCart, ChevronRight, Check, ShieldCheck, Truck, ArrowLeft } from 'lucide-react'
import { allProducts } from '../../../../lib/mock-data'

export function ProductDetailPage({ 
  onNavigate,
  onAddToCart,
  cartCount = 0,
  productId
}: { 
  onNavigate?: (label: string, id?: string) => void,
  onAddToCart?: (p?: any) => void,
  cartCount?: number,
  productId?: string | null
}) {
  const PRODUCT = allProducts.find(p => p.id === productId) || allProducts[0]
  const [activeImage, setActiveImage] = useState(0)
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)

  const getNavLabel = (categorySlug: string) => {
    switch (categorySlug) {
      case 'ong-kinh': return 'Ống kính'
      case 'may-quay-phim': return 'Máy quay'
      case 'action-camera': return 'Action Camera'
      case 'flycam': return 'Flycam'
      case 'thiet-bi-studio': return 'Thiết bị studio'
      case 'phu-kien': return 'Phụ kiện'
      case 'san-pham-cu': return 'Sản phẩm cũ'
      case 'lap-phong-studio': return 'Setup studio'
      case 'may-anh':
      default: return 'Máy ảnh'
    }
  }
  
  const navLabel = getNavLabel(PRODUCT.category)

  useSEO(
    `${PRODUCT.name} | Máy Ảnh Việt Nam`,
    PRODUCT.description || 'Mua ngay sản phẩm chính hãng với giá tốt nhất tại Máy Ảnh Việt Nam.'
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleOpenCheckout = () => {
    setCheckoutStep(1)
    setShowCheckout(true)
  }

  const handleCloseCheckout = () => {
    setShowCheckout(false)
    setTimeout(() => setCheckoutStep(1), 300)
  }

  return (
    <div style={{
      background: '#FAFAF8',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
      color: '#141414',
      overflowX: 'hidden'
    }}>
      <style>{`
        .pdp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .pdp-img-container {
          aspect-ratio: 1 / 1;
          max-height: 560px;
          padding: 32px;
          box-sizing: border-box;
        }
        .pdp-img-container img {
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          margin: auto;
        }
        .pdp-title { font-size: 42px; }
        .pdp-price { font-size: 36px; }
        .pdp-sticky { position: sticky; top: 120px; }
        .pdp-thumbs {
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .pdp-thumbs button {
          width: 80px; height: 80px; flex-shrink: 0;
        }
        .pdp-breadcrumb { flex-wrap: wrap; }
        .pdp-trust { flex-wrap: wrap; }
        .pdp-modal { padding: 40px; }
        .pdp-checkout-form-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        @media (max-width: 1024px) {
          .pdp-grid { gap: 48px; }
          .pdp-img-container { max-height: 480px; padding: 24px; }
        }
        @media (max-width: 900px) {
          .pdp-grid { grid-template-columns: 1fr; gap: 32px; }
          .pdp-sticky { position: relative; top: 0; }
          .pdp-img-container { max-height: 420px; }
          .pdp-title { font-size: 32px; }
          .pdp-price { font-size: 28px; }
          .pdp-modal { padding: 24px; }
        }
        @media (max-width: 600px) {
          .pdp-img-container { max-height: 320px; padding: 16px; }
          .pdp-title { font-size: 24px; }
          .pdp-price { font-size: 24px; }
          .pdp-thumbs button { width: 60px; height: 60px; }
          .pdp-checkout-form-grid { grid-template-columns: 1fr; }
          .pdp-modal { padding: 16px; }
        }
      `}</style>
      <SharedNavbar activeItem={navLabel} onNavigate={onNavigate} cartCount={cartCount} />

      <main style={{ paddingTop: '72px', paddingBottom: '120px' }}>
        {/* Breadcrumb */}
        <div className="pdp-breadcrumb" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '40px 4vw 20px 4vw',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          color: '#8C8C8C'
        }}>
          <button 
            onClick={() => onNavigate?.('Trang chủ')} 
            className="hover:text-[#E86A24]"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
          >
            Trang chủ
          </button>
          <ChevronRight size={14} />
          <button 
            onClick={() => onNavigate?.(navLabel)} 
            className="hover:text-[#E86A24]"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
          >
            {navLabel}
          </button>
          <ChevronRight size={14} />
          <span style={{ color: '#141414', fontWeight: 500 }}>{PRODUCT.name}</span>
        </div>

        {/* Back button */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4vw 40px 4vw' }}>
          <button 
            onClick={() => onNavigate?.(navLabel)}
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'transparent', border: 'none', color: '#6B6B6B', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
            }}
            className="hover:text-[#E86A24]"
          >
            <ArrowLeft size={16} /> Quay lại danh mục
          </button>
        </div>

        {/* Product Layout */}
        <div className="pdp-grid" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 4vw'
        }}>
          {/* Left: Images */}
          <div className="pdp-sticky">
            <div className="pdp-img-container" style={{ 
              background: '#FFF', 
              borderRadius: '24px', 
              boxShadow: '0 8px 40px rgba(0,0,0,0.02)',
              marginBottom: '24px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img 
                src={PRODUCT.images[activeImage]?.url} 
                alt={PRODUCT.images[activeImage]?.alt || PRODUCT.name}
              />
            </div>
            {/* Thumbnails */}
            <div className="pdp-thumbs">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  style={{ 
                    background: '#FFF', borderRadius: '12px',
                    border: activeImage === idx ? '2px solid #E86A24' : '2px solid transparent',
                    padding: '8px', cursor: 'pointer', transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  className="hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                >
                  <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div style={{ paddingTop: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8C8C8C', marginBottom: '16px' }}>
              {PRODUCT.brand}
            </div>
            <h1 className="pdp-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: '#141414', marginBottom: '24px', lineHeight: 1.2 }}>
              {PRODUCT.name}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', color: '#E86A24' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(PRODUCT.rating?.average || 5) ? 'currentColor' : 'none'} strokeWidth={i < Math.floor(PRODUCT.rating?.average || 5) ? 0 : 2} />
                ))}
              </div>
              <span style={{ fontSize: '14px', color: '#6B6B6B' }}>({PRODUCT.rating?.count || 0} đánh giá)</span>
            </div>

            <div className="pdp-price" style={{ fontWeight: 600, color: '#E86A24', marginBottom: '40px' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT.price)}
            </div>

            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#6B6B6B', marginBottom: '48px' }}>
              {PRODUCT.description}
            </p>

            <div style={{ background: '#FFF', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.02)', marginBottom: '48px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', color: '#141414' }}>Tính năng nổi bật</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {PRODUCT.highlights?.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '12px', color: '#3A3A3A', fontSize: '15px' }}>
                    <div style={{ color: '#E86A24', marginTop: '2px' }}><Check size={18} /></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
              <button 
                onClick={handleOpenCheckout}
                style={{ 
                flex: 1, padding: '20px 0', background: '#E86A24', color: '#FFF', 
                border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, 
                cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(232, 106, 36, 0.25)'
              }} className="hover:bg-[#d45d1d] hover:shadow-[0_8px_32px_rgba(232,106,36,0.35)] hover:-translate-y-1">
                Mua ngay
              </button>
              <button 
                onClick={() => onAddToCart?.(PRODUCT)}
                style={{ 
                padding: '20px 32px', background: '#FFF', color: '#3A3A3A', 
                border: '1.5px solid #EBEBEB', borderRadius: '12px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease'
              }} className="hover:border-[#E86A24] hover:text-[#E86A24]">
                <ShoppingCart size={22} />
              </button>
            </div>

            {/* Trust Policies */}
            <div className="pdp-trust" style={{ display: 'flex', gap: '24px', borderTop: '1px solid #EBEBEB', paddingTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6B6B6B' }}>
                <ShieldCheck size={20} style={{ color: '#E86A24', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Bảo hành chính hãng 24 tháng</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6B6B6B' }}>
                <Truck size={20} style={{ color: '#E86A24', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Miễn phí vận chuyển toàn quốc</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
          backdropFilter: 'blur(4px)'
        }} onClick={handleCloseCheckout}>
          <div className="pdp-modal" style={{
            background: '#FFF', borderRadius: '16px', width: '800px', maxWidth: '90vw',
            maxHeight: '90vh', overflowY: 'auto',
            animation: 'sf-fade-up 0.4s cubic-bezier(0.16,1,0.3,1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: checkoutStep >= 1 ? '#E86A24' : '#F4F3F0', color: checkoutStep >= 1 ? '#FFF' : '#8C8C8C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>1</div>
                <div style={{ fontSize: '14px', color: checkoutStep >= 1 ? '#3A3A3A' : '#8C8C8C', fontWeight: checkoutStep >= 1 ? 500 : 400 }}>Thông tin</div>
                <div style={{ flex: 1, height: '1px', background: checkoutStep >= 2 ? '#E86A24' : '#EBEBEB' }} />
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: checkoutStep >= 2 ? '#E86A24' : '#F4F3F0', color: checkoutStep >= 2 ? '#FFF' : '#8C8C8C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>2</div>
                <div style={{ fontSize: '14px', color: checkoutStep >= 2 ? '#3A3A3A' : '#8C8C8C', fontWeight: checkoutStep >= 2 ? 500 : 400 }}>Đặt hàng</div>
                <div style={{ flex: 1, height: '1px', background: checkoutStep >= 3 ? '#E86A24' : '#EBEBEB' }} />
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: checkoutStep >= 3 ? '#E86A24' : '#F4F3F0', color: checkoutStep >= 3 ? '#FFF' : '#8C8C8C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>3</div>
                <div style={{ fontSize: '14px', color: checkoutStep >= 3 ? '#3A3A3A' : '#8C8C8C', fontWeight: checkoutStep >= 3 ? 500 : 400 }}>Hoàn tất</div>
              </div>
            </div>

            {checkoutStep === 1 && (
              <>
                <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '24px' }}>Thông tin giao hàng</h3>

                <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="gender" value="anh" defaultChecked style={{ accentColor: '#E86A24', width: '16px', height: '16px' }} /> Anh
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="gender" value="chi" style={{ accentColor: '#E86A24', width: '16px', height: '16px' }} /> Chị
                  </label>
                </div>

                <div className="pdp-checkout-form-grid" style={{ marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Họ và tên <span style={{ color: '#E86A24' }}>*</span></label>
                    <input type="text" style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Số điện thoại <span style={{ color: '#E86A24' }}>*</span></label>
                    <input type="text" style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Địa chỉ nhận hàng</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Email (nếu có)</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#6B6B6B', marginBottom: '8px' }}>Ghi chú (nếu có)</label>
                  <textarea placeholder="Ví dụ: Nhận hàng trong giờ hành chính." style={{ width: '100%', padding: '12px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', outline: 'none', height: '100px', resize: 'vertical', fontFamily: 'var(--font-body)' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                  <button onClick={handleCloseCheckout} style={{ padding: '16px 32px', background: '#F4F3F0', color: '#3A3A3A', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
                    Hủy
                  </button>
                  <button onClick={() => setCheckoutStep(2)} style={{ padding: '16px 40px', background: '#E86A24', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(232,106,36,0.3)' }}>
                    Tiếp tục
                  </button>
                </div>
              </>
            )}

            {checkoutStep === 2 && (
              <>
                <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '24px' }}>Phương thức thanh toán</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '16px', border: '1px solid #E86A24', borderRadius: '8px', background: 'rgba(232,106,36,0.04)' }}>
                    <input type="radio" name="payment" defaultChecked style={{ accentColor: '#E86A24', width: '18px', height: '18px' }} />
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#141414' }}>Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '16px', border: '1px solid #EBEBEB', borderRadius: '8px' }}>
                    <input type="radio" name="payment" style={{ accentColor: '#E86A24', width: '18px', height: '18px' }} />
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#3A3A3A' }}>Chuyển khoản qua Ngân hàng</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '16px', border: '1px solid #EBEBEB', borderRadius: '8px' }}>
                    <input type="radio" name="payment" style={{ accentColor: '#E86A24', width: '18px', height: '18px' }} />
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#3A3A3A' }}>Thanh toán qua thẻ Visa / MasterCard</span>
                  </label>
                </div>

                <div style={{ background: '#FAFAF8', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Tóm tắt đơn hàng</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#6B6B6B' }}>
                    <span>{PRODUCT.name}</span>
                    <span style={{ fontWeight: 500 }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT.price)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#6B6B6B' }}>
                    <span>Phí vận chuyển</span>
                    <span style={{ fontWeight: 500 }}>Miễn phí</span>
                  </div>
                  <div style={{ height: '1px', background: '#EBEBEB', margin: '16px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600, color: '#E86A24' }}>
                    <span>Tổng cộng</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(PRODUCT.price)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => setCheckoutStep(1)} style={{ padding: '16px 0', background: 'transparent', color: '#6B6B6B', border: 'none', fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
                    &larr; Quay lại
                  </button>
                  <button onClick={() => setCheckoutStep(3)} style={{ padding: '16px 40px', background: '#E86A24', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(232,106,36,0.3)' }}>
                    Xác nhận đặt hàng
                  </button>
                </div>
              </>
            )}

            {checkoutStep === 3 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E86A24', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', animation: 'sf-fade-up 0.5s ease-out' }}>
                  <Check size={40} strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: '28px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '16px', color: '#141414', animation: 'sf-fade-up 0.5s ease-out 0.1s both' }}>Đặt hàng thành công!</h3>
                <p style={{ fontSize: '16px', color: '#6B6B6B', marginBottom: '8px', animation: 'sf-fade-up 0.5s ease-out 0.2s both' }}>Mã đơn hàng của bạn là <strong style={{ color: '#141414' }}>#MAVN-89234</strong>.</p>
                <p style={{ fontSize: '16px', color: '#6B6B6B', marginBottom: '40px', animation: 'sf-fade-up 0.5s ease-out 0.3s both' }}>Chúng tôi sẽ liên hệ với bạn qua số điện thoại trong thời gian sớm nhất để xác nhận.</p>
                
                <button onClick={handleCloseCheckout} style={{ padding: '16px 40px', background: '#F4F3F0', color: '#141414', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', animation: 'sf-fade-up 0.5s ease-out 0.4s both' }}>
                  Trở về trang sản phẩm
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
