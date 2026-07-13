'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { User, PackageSearch, RefreshCcw, Star, ShieldCheck, Bell, LogOut } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/dang-nhap?redirect=/tai-khoan');
    }
  }, [mounted, isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!mounted || !isLoggedIn) {
    return (
      <>
        <Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
            <p style={{ fontWeight: 600 }}>Đang kiểm tra đăng nhập...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const quickLinks = [
    { href: '/theo-doi-don-hang', label: 'Theo dõi đơn hàng', icon: PackageSearch, desc: 'Kiểm tra trạng thái đơn', color: '#f97316' },
    { href: '/trade-in', label: 'Thu mua & Trade-in', icon: RefreshCcw, desc: 'Định giá thiết bị cũ', color: '#8b5cf6' },
    { href: '/danh-muc/san-pham-flash-sale', label: 'Flash Sale VIP', icon: Star, desc: 'Ưu đãi dành riêng', color: '#ef4444' },
    { href: '/chinh-sach/bao-hanh', label: 'Chính sách bảo hành', icon: ShieldCheck, desc: 'Tra cứu bảo hành', color: '#10b981' },
  ];

  return (
    <>
      <Header />
      <main style={{ background: '#f9fafb', minHeight: '70vh', padding: '40px 0 80px' }}>
        <div className="container">
          {/* Profile Card */}
          <div style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-40px', right: '80px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                {/* Avatar */}
                <div style={{
                  width: '68px', height: '68px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                  border: '3px solid rgba(255,255,255,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '26px', fontWeight: 800, color: 'white', flexShrink: 0,
                }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Thành viên VIP</div>
                  <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px', color: 'white' }}>{user?.name}</h1>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>📞 {user?.phone}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 18px', background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '999px', color: 'white', fontSize: '13px',
                  fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)',
                }}
              >
                <LogOut size={14} /> Đăng xuất
              </button>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            {quickLinks.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    background: 'white', borderRadius: '18px',
                    border: '1px solid #e5e7eb', padding: '18px 20px',
                    textDecoration: 'none', transition: 'transform .2s, box-shadow .2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: `${item.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={19} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{item.label}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{item.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Profile info card */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="#f97316" /> Thông tin tài khoản
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Họ và tên', value: user?.name },
                { label: 'Số điện thoại', value: user?.phone },
                { label: 'Email', value: user?.email },
                { label: 'Hạng thành viên', value: 'VIP Gold ⭐' },
              ].map(f => (
                <div key={f.label} style={{ background: '#f9fafb', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{f.label}</div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{f.value}</div>
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
