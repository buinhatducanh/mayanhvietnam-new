'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { useAuth } from '@/contexts/AuthContext';
import { PackageCheck, Clock, Truck, CheckCircle2, ShoppingBag, MapPin, Phone, User } from 'lucide-react';

// Mock order data
const MOCK_ORDERS = [
  {
    id: 'MAVN-240710-001',
    date: '2026-07-10',
    total: 23990000,
    status: 'shipping',
    statusLabel: 'Đang giao hàng',
    statusColor: '#f59e0b',
    items: [
      { name: 'Canon EOS R50 Body', qty: 1, price: 18990000, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&q=80' },
    ],
    address: '123 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ',
    estimatedDelivery: '11/07/2026',
  },
  {
    id: 'MAVN-240705-002',
    date: '2026-07-05',
    total: 9990000,
    status: 'delivered',
    statusLabel: 'Đã giao thành công',
    statusColor: '#10b981',
    items: [
      { name: 'Ống kính Canon RF 50mm f/1.8 STM', qty: 1, price: 9990000, img: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=80&q=80' },
    ],
    address: '123 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ',
    estimatedDelivery: '07/07/2026',
  },
  {
    id: 'MAVN-240628-003',
    date: '2026-06-28',
    total: 4590000,
    status: 'delivered',
    statusLabel: 'Đã giao thành công',
    statusColor: '#10b981',
    items: [
      { name: 'Godox V860III Flash', qty: 1, price: 4590000, img: 'https://images.unsplash.com/photo-1515371399765-b23d45a8bd3f?w=80&q=80' },
    ],
    address: '123 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ',
    estimatedDelivery: '30/06/2026',
  },
];

const STATUS_STEPS = [
  { key: 'pending', label: 'Xác nhận đơn', icon: PackageCheck },
  { key: 'processing', label: 'Đang xử lý', icon: Clock },
  { key: 'shipping', label: 'Đang giao', icon: Truck },
  { key: 'delivered', label: 'Đã giao', icon: CheckCircle2 },
];

function OrderCard({ order }: { order: typeof MOCK_ORDERS[0] }) {
  const [expanded, setExpanded] = useState(false);

  const stepIndex = STATUS_STEPS.findIndex(s => s.key === order.status);
  const activeStep = stepIndex === -1 ? STATUS_STEPS.length - 1 : stepIndex;

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      transition: 'box-shadow .2s',
    }}>
      {/* Header */}
      <div
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 24px', cursor: 'pointer', userSelect: 'none',
          background: '#fafafa', borderBottom: expanded ? '1px solid #e5e7eb' : 'none',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
            Mã đơn hàng
          </div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#111', fontFamily: 'monospace' }}>
            #{order.id}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Ngày đặt</div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{order.date}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Tổng tiền</div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#f97316' }}>
            {order.total.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            padding: '5px 14px',
            background: `${order.statusColor}18`,
            color: order.statusColor,
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '12px',
            border: `1px solid ${order.statusColor}40`,
          }}>
            {order.statusLabel}
          </span>
          <span style={{ color: '#9ca3af', transition: 'transform .2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{ padding: '24px' }}>
          {/* Progress steps */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '28px' }}>
            <div style={{
              position: 'absolute', top: '18px', left: '12%', right: '12%',
              height: '2px', background: '#e5e7eb', zIndex: 0,
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #f97316, #ea580c)',
                width: `${(activeStep / (STATUS_STEPS.length - 1)) * 100}%`,
                transition: 'width .5s ease',
              }} />
            </div>
            {STATUS_STEPS.map((step, i) => {
              const StepIcon = step.icon;
              const done = i <= activeStep;
              return (
                <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: done ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'white',
                    border: `2px solid ${done ? '#f97316' : '#e5e7eb'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: done ? '0 2px 8px rgba(249,115,22,0.3)' : 'none',
                    transition: 'all .3s',
                  }}>
                    <StepIcon size={15} color={done ? 'white' : '#9ca3af'} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: done ? '#f97316' : '#9ca3af', textAlign: 'center' }}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingBag size={14} /> Sản phẩm đã đặt
            </div>
            {order.items.map(item => (
              <div key={item.name} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '12px', background: '#f9fafb', borderRadius: '12px', marginBottom: '8px' }}>
                <img src={item.img} alt={item.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#111', marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>SL: {item.qty}</div>
                </div>
                <div style={{ fontWeight: 700, color: '#f97316', fontSize: '14px' }}>{item.price.toLocaleString('vi-VN')}đ</div>
              </div>
            ))}
          </div>

          {/* Info row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <MapPin size={14} color="#6b7280" style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>
                <div style={{ color: '#6b7280', marginBottom: '2px' }}>Địa chỉ nhận hàng</div>
                <div style={{ fontWeight: 600, color: '#374151' }}>{order.address}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Truck size={14} color="#6b7280" style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>
                <div style={{ color: '#6b7280', marginBottom: '2px' }}>Ngày giao dự kiến</div>
                <div style={{ fontWeight: 600, color: '#374151' }}>{order.estimatedDelivery}</div>
              </div>
            </div>
          </div>

          {order.status === 'delivered' && (
            <div style={{ marginTop: '16px', padding: '12px 16px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #6ee7b740', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span style={{ fontSize: '13px', color: '#065f46', fontWeight: 600 }}>Đơn hàng đã giao thành công. Cảm ơn bạn đã mua hàng tại Máy Ảnh Việt Nam!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/dang-nhap?redirect=/theo-doi-don-hang');
    }
  }, [mounted, isLoggedIn, router]);

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

  return (
    <>
      <Header />
      <main style={{ background: '#f9fafb', minHeight: '70vh', padding: '40px 0 80px' }}>
        <div className="container">
          {/* Page header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <div style={{
                width: '42px', height: '42px', background: 'linear-gradient(135deg,#f97316,#ea580c)',
                borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(249,115,22,.3)',
              }}>
                <PackageCheck size={22} color="white" />
              </div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111', margin: 0 }}>Theo Dõi Đơn Hàng</h1>
                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>Xin chào, <strong>{user?.name}</strong>! Đây là các đơn hàng của bạn.</p>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '14px', marginBottom: '28px' }}>
            {[
              { label: 'Tổng đơn hàng', value: MOCK_ORDERS.length, icon: ShoppingBag, color: '#6366f1' },
              { label: 'Đang giao', value: MOCK_ORDERS.filter(o => o.status === 'shipping').length, icon: Truck, color: '#f59e0b' },
              { label: 'Đã nhận', value: MOCK_ORDERS.filter(o => o.status === 'delivered').length, icon: CheckCircle2, color: '#10b981' },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} style={{
                  background: 'white', borderRadius: '16px', padding: '16px 18px',
                  border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '14px',
                }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '11px',
                    background: `${stat.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={18} color={stat.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#111', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {MOCK_ORDERS.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Support section */}
          <div style={{
            marginTop: '32px', background: 'white', borderRadius: '20px',
            border: '1px solid #e5e7eb', padding: '24px',
            display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={20} color="#3b82f6" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>Cần hỗ trợ về đơn hàng?</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Gọi CSKH: <strong>0937.148.222</strong> (8:00 – 21:00)</div>
              </div>
            </div>
            <Link
              href="/lien-he"
              style={{
                padding: '10px 22px', background: 'linear-gradient(135deg,#f97316,#ea580c)',
                color: 'white', fontWeight: 700, borderRadius: '12px',
                textDecoration: 'none', fontSize: '13px',
              }}
            >
              Liên hệ CSKH →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
