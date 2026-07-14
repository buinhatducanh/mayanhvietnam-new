'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    address: '',
    city: 'hcm',
    payment: 'cod'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle = (fieldName: string) => ({
    width: '100%', 
    padding: '12px 16px', 
    border: focusedInput === fieldName ? '2px solid #005EB8' : '1px solid #D2D8E8', 
    borderRadius: 8, 
    outline: 'none',
    transition: 'border 0.2s',
    background: focusedInput === fieldName ? '#fff' : '#FAFCFF',
  });

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
        <div className="container-xl" style={{ padding: '40px 24px', maxWidth: 800 }}>
          
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A2444', marginBottom: 32, textAlign: 'center' }}>
            Thông Tin Thanh Toán
          </h1>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '64px 32px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, border: '1px solid rgba(0,48,135,0.06)' }}>
              <div style={{ width: 80, height: 80, background: '#E8F5E9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'fadeInUp 0.5s ease forwards' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '1.75rem', color: '#1A2444', marginBottom: 12 }}>Đặt hàng thành công!</h2>
              <p style={{ color: '#6B7A99', marginBottom: 32, fontSize: '1.1rem' }}>Cám ơn bạn đã lựa chọn CameraVietNam. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.</p>
              <a href="/" style={{ display: 'inline-block', background: '#003087', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '14px 32px', borderRadius: 8, transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#005EB8')}
                onMouseLeave={e => (e.currentTarget.style.background = '#003087')}
              >
                Quay Lại Trang Chủ
              </a>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, padding: 40, border: '1px solid rgba(0,48,135,0.06)', boxShadow: '0 10px 40px rgba(0, 48, 135, 0.04)' }}>
              
              {/* Stepper */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= 1 ? '#003087' : '#A8B3C9', fontWeight: 700 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= 1 ? '#003087' : '#E9EDF5', color: step >= 1 ? '#fff' : '#6B7A99', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>1</div>
                  <span>Thông tin</span>
                </div>
                <div style={{ width: 40, height: 2, background: step >= 2 ? '#003087' : '#E9EDF5' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= 2 ? '#003087' : '#A8B3C9', fontWeight: 700 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= 2 ? '#003087' : '#E9EDF5', color: step >= 2 ? '#fff' : '#6B7A99', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>2</div>
                  <span>Thanh toán</span>
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={handleNextStep} style={{ animation: 'fadeInUp 0.3s ease forwards' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 8, fontSize: '0.875rem' }}>Họ và tên *</label>
                      <input type="text" required value={formData.fullname} onChange={e => setFormData({ ...formData, fullname: e.target.value })} 
                        onFocus={() => setFocusedInput('fullname')} onBlur={() => setFocusedInput(null)}
                        style={inputStyle('fullname')} placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 8, fontSize: '0.875rem' }}>Số điện thoại *</label>
                      <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                        onFocus={() => setFocusedInput('phone')} onBlur={() => setFocusedInput(null)}
                        style={inputStyle('phone')} placeholder="0901234567" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 8, fontSize: '0.875rem' }}>Địa chỉ Email *</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} 
                      onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)}
                      style={inputStyle('email')} placeholder="email@example.com" />
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 8, fontSize: '0.875rem' }}>Địa chỉ giao hàng *</label>
                    <input type="text" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} 
                      onFocus={() => setFocusedInput('address')} onBlur={() => setFocusedInput(null)}
                      style={inputStyle('address')} placeholder="Số nhà, Tên đường, Phường/Xã..." />
                  </div>

                  <button type="submit" style={{ width: '100%', background: '#003087', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 0', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s, transform 0.1s', boxShadow: '0 4px 16px rgba(0, 48, 135, 0.15)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#005EB8')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#003087')}
                    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    Tiếp Tục Chuyển Sang Thanh Toán
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} style={{ animation: 'fadeInUp 0.3s ease forwards' }}>
                  <div style={{ marginBottom: 32 }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 16, fontSize: '1.05rem' }}>Chọn Phương Thức Thanh Toán</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: formData.payment === 'cod' ? '2px solid #005EB8' : '1px solid #E9EDF5', borderRadius: 8, cursor: 'pointer', background: formData.payment === 'cod' ? '#F0F5FF' : '#fff', transition: 'all 0.2s' }}>
                        <input type="radio" name="payment" value="cod" checked={formData.payment === 'cod'} onChange={() => setFormData({ ...formData, payment: 'cod' })} style={{ transform: 'scale(1.2)' }} />
                        <span style={{ fontWeight: 600, color: '#1A2444' }}>Thanh toán khi nhận hàng (COD)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: formData.payment === 'vnpay' ? '2px solid #005EB8' : '1px solid #E9EDF5', borderRadius: 8, cursor: 'pointer', background: formData.payment === 'vnpay' ? '#F0F5FF' : '#fff', transition: 'all 0.2s' }}>
                        <input type="radio" name="payment" value="vnpay" checked={formData.payment === 'vnpay'} onChange={() => setFormData({ ...formData, payment: 'vnpay' })} style={{ transform: 'scale(1.2)' }} />
                        <span style={{ fontWeight: 600, color: '#1A2444' }}>Thanh toán online qua cổng VNPay</span>
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 16 }}>
                    <button type="button" onClick={() => setStep(1)} style={{ width: '30%', background: '#fff', color: '#6B7A99', border: '1px solid #D2D8E8', borderRadius: 8, padding: '14px 0', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFF')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    >
                      Quay Lại
                    </button>
                    
                    <button type="submit" disabled={isSubmitting} style={{ width: '70%', background: '#003087', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 0', fontSize: '1rem', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s, transform 0.1s', boxShadow: '0 4px 16px rgba(0, 48, 135, 0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                      onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = '#005EB8')}
                      onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = '#003087')}
                    >
                      {isSubmitting ? (
                        <>
                          <div style={{ width: 20, height: 20, border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                          Đang xử lý...
                          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                        </>
                      ) : 'Xác Nhận Đặt Hàng'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
