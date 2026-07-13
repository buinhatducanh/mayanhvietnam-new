'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck, Phone, Lock, Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get('redirect') || '/tai-khoan';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) { setError('Vui lòng nhập số điện thoại'); return; }
    setLoading(true);
    setError('');
    // Simulate async login
    await new Promise(r => setTimeout(r, 600));
    login({
      name: 'Khách hàng VIP',
      phone: phone,
      email: `${phone}@mayanhvietnam.com`,
    });
    router.push(redirect);
  };

  return (
    <div style={{
      maxWidth: '440px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '24px',
      border: '1px solid #e5e7eb',
      padding: '40px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          width: '60px', height: '60px',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          borderRadius: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px',
          boxShadow: '0 6px 20px rgba(249,115,22,0.35)',
        }}>
          <ShieldCheck size={28} color="white" />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111', margin: '0 0 6px' }}>
          Đăng Nhập Tài Khoản
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
          Đăng nhập để theo dõi đơn hàng &amp; nhận ưu đãi VIP
        </p>
      </div>

      {error && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fca5a5',
          borderRadius: '12px', padding: '12px 16px',
          color: '#dc2626', fontSize: '13px', marginBottom: '16px',
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Phone */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '7px', color: '#374151' }}>
            Số điện thoại *
          </label>
          <div style={{ position: 'relative' }}>
            <Phone size={16} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="tel"
              required
              placeholder="0937.148.222"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 42px',
                borderRadius: '12px', border: '1.5px solid #e5e7eb',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                transition: 'border-color .2s',
              }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '7px', color: '#374151' }}>
            Mật khẩu <span style={{ color: '#9ca3af', fontWeight: 400 }}>(demo: nhập bất kỳ)</span>
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
              style={{
                width: '100%', padding: '12px 42px 12px 42px',
                borderRadius: '12px', border: '1.5px solid #e5e7eb',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9ca3af' }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '14px',
            background: loading ? '#fed7aa' : 'linear-gradient(135deg, #f97316, #ea580c)',
            color: 'white', fontWeight: 700, fontSize: '15px',
            borderRadius: '14px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '4px', boxShadow: '0 4px 16px rgba(249,115,22,0.3)',
            transition: 'transform .15s, box-shadow .15s',
          }}
          onMouseEnter={e => { if (!loading) (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
        >
          {loading ? '⏳ Đang xử lý...' : 'ĐĂNG NHẬP NGAY →'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6b7280' }}>
        Chưa có tài khoản?{' '}
        <Link href="/dang-nhap" style={{ color: '#f97316', fontWeight: 600 }}>
          Liên hệ hotline 0937.148.222
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '60px 0 80px', background: '#f9fafb', minHeight: '70vh' }}>
        <div className="container">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>Đang tải...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
