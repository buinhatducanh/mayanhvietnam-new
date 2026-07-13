'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const inputStyle = (name: string) => ({
    width: '100%',
    padding: '14px 16px',
    background: focusedInput === name ? '#fff' : 'rgba(255,255,255,0.6)',
    border: focusedInput === name ? '2px solid #005EB8' : '1px solid rgba(0,48,135,0.1)',
    borderRadius: 8,
    outline: 'none',
    transition: 'all 0.2s',
    fontSize: '0.95rem',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0a0a0a' }}>
      {/* Left side: Image */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'none' }} className="desktop-split">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=1400")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 60, color: '#fff', maxWidth: 400 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span style={{ color: 'white', fontWeight: 600 }}>Quay lại trang chủ</span>
          </a>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>Khám Phá Nghệ Thuật Nhiếp Ảnh.</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.5 }}>Đăng nhập để lưu lại các sản phẩm yêu thích và nhận thông tin khuyến mãi độc quyền.</p>
        </div>
      </div>
      <style>{`
        @media (min-width: 900px) {
          .desktop-split { display: block !important; }
        }
      `}</style>

      {/* Right side: Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: '#FAFCFF', overflow: 'hidden' }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,94,184,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -150, left: -50, width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,48,135,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        {/* 3D Flip Container */}
        <div style={{ perspective: 1000, width: '100%', maxWidth: 440, padding: 24, zIndex: 10 }}>
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            transition: 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
            transformStyle: 'preserve-3d',
            transform: isLogin ? 'rotateY(0deg)' : 'rotateY(180deg)'
          }}>
            
            {/* Login Card */}
            <div style={{ 
              background: 'rgba(255,255,255,0.85)', 
              backdropFilter: 'blur(20px)', 
              padding: 40, 
              borderRadius: 24, 
              boxShadow: '0 20px 60px rgba(0,48,135,0.08)', 
              border: '1px solid rgba(255,255,255,1)',
              backfaceVisibility: 'hidden',
              position: 'relative' // relative allows the container height to be determined by this card when visible
            }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A2444', marginBottom: 8 }}>Đăng Nhập</h1>
                <p style={{ color: '#6B7A99' }}>Chào mừng bạn quay trở lại!</p>
              </div>

              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: 8 }}>Email</label>
                  <input type="email" placeholder="Nhập địa chỉ email" style={inputStyle('login_email')} 
                    onFocus={() => setFocusedInput('login_email')} onBlur={() => setFocusedInput(null)} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Mật khẩu</label>
                    <a href="#" style={{ fontSize: '0.85rem', color: '#005EB8', textDecoration: 'none', fontWeight: 600 }}>Quên mật khẩu?</a>
                  </div>
                  <input type="password" placeholder="••••••••" style={inputStyle('login_pw')} 
                    onFocus={() => setFocusedInput('login_pw')} onBlur={() => setFocusedInput(null)} />
                </div>

                <button style={{ width: '100%', background: 'linear-gradient(135deg, #003087, #005EB8)', color: '#fff', padding: '14px 0', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 700, marginTop: 8, cursor: 'pointer', transition: 'transform 0.1s, boxShadow 0.2s', boxShadow: '0 8px 20px rgba(0,48,135,0.2)' }}
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                  onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Đăng Nhập
                </button>
              </form>

              <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.9rem', color: '#6B7A99' }}>
                Chưa có tài khoản? <span onClick={() => setIsLogin(false)} style={{ color: '#005EB8', fontWeight: 700, cursor: 'pointer' }}>Đăng ký ngay</span>
              </div>
            </div>

            {/* Register Card */}
            <div style={{ 
              background: 'rgba(255,255,255,0.85)', 
              backdropFilter: 'blur(20px)', 
              padding: 40, 
              borderRadius: 24, 
              boxShadow: '0 20px 60px rgba(0,48,135,0.08)', 
              border: '1px solid rgba(255,255,255,1)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              inset: 0,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A2444', marginBottom: 8 }}>Đăng Ký</h1>
                <p style={{ color: '#6B7A99' }}>Tạo tài khoản để nhận nhiều ưu đãi</p>
              </div>

              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: 8 }}>Họ và tên</label>
                  <input type="text" placeholder="Nguyễn Văn A" style={inputStyle('reg_name')} 
                    onFocus={() => setFocusedInput('reg_name')} onBlur={() => setFocusedInput(null)} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: 8 }}>Email</label>
                  <input type="email" placeholder="Nhập địa chỉ email" style={inputStyle('reg_email')} 
                    onFocus={() => setFocusedInput('reg_email')} onBlur={() => setFocusedInput(null)} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: 8 }}>Mật khẩu</label>
                  <input type="password" placeholder="••••••••" style={inputStyle('reg_pw')} 
                    onFocus={() => setFocusedInput('reg_pw')} onBlur={() => setFocusedInput(null)} />
                </div>

                <button style={{ width: '100%', background: 'linear-gradient(135deg, #1A2444, #374151)', color: '#fff', padding: '14px 0', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 700, marginTop: 8, cursor: 'pointer', transition: 'transform 0.1s, boxShadow 0.2s', boxShadow: '0 8px 20px rgba(26,36,68,0.2)' }}
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                  onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Tạo Tài Khoản
                </button>
              </form>

              <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.9rem', color: '#6B7A99' }}>
                Đã có tài khoản? <span onClick={() => setIsLogin(true)} style={{ color: '#005EB8', fontWeight: 700, cursor: 'pointer' }}>Đăng nhập</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
