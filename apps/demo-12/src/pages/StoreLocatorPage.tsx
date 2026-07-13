import { useState } from 'react'
import { Link } from 'react-router-dom'

const branches = [
  {
    id: 1, city: 'TP. Hồ Chí Minh', name: 'Chi Nhánh Hồ Chí Minh',
    address: '123 Điện Biên Phủ, Phường 15, Quận Bình Thạnh, TP.HCM',
    phone: '028 3899 1234', hotline: '0901 111 234',
    hours: '8:00 - 21:00 (Thứ 2 - Chủ nhật)',
    open: true,
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3!2d106.698!3d10.791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzI3LjYiTiAxMDbCsDQxJzUyLjgiRQ!5e0!3m2!1svi!2svn!4v1234567890',
  },
  {
    id: 2, city: 'TP. Cần Thơ', name: 'Chi Nhánh Cần Thơ',
    address: '456 Trần Hưng Đạo, Phường An Nghiệp, Quận Ninh Kiều, TP. Cần Thơ',
    phone: '0292 3999 456', hotline: '0901 222 456',
    hours: '8:00 - 20:30 (Thứ 2 - Chủ nhật)',
    open: true,
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3!2d105.767!3d10.034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAyJzEyLjAiTiAxMDXCsDQ2JzAxLjIiRQ!5e0!3m2!1svi!2svn!4v1234567890',
  },
  {
    id: 3, city: 'An Giang', name: 'Chi Nhánh An Giang',
    address: '789 Trần Hưng Đạo, Phường Mỹ Long, TP. Long Xuyên, An Giang',
    phone: '0296 3888 789', hotline: '0901 333 789',
    hours: '8:00 - 20:00 (Thứ 2 - Chủ nhật)',
    open: false,
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.3!2d105.423!3d10.380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDIyJzQ4LjAiTiAxMDXCsDI1JzIyLjgiRQ!5e0!3m2!1svi!2svn!4v1234567890',
  },
  {
    id: 4, city: 'Đồng Tháp', name: 'Chi Nhánh Đồng Tháp',
    address: '321 Nguyễn Huệ, Phường 1, TP. Cao Lãnh, Đồng Tháp',
    phone: '0277 3777 321', hotline: '0901 444 321',
    hours: '8:00 - 20:00 (Thứ 2 - Chủ nhật)',
    open: true,
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.3!2d105.633!3d10.460!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI3JzM2LjAiTiAxMDXCsDM3JzU4LjgiRQ!5e0!3m2!1svi!2svn!4v1234567890',
  },
]

export default function StoreLocatorPage() {
  const [selected, setSelected] = useState(0)

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>Hệ Thống Cửa Hàng</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 40, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 12 }}>Hệ Thống Cửa Hàng</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>4 chi nhánh trải rộng tại miền Nam, sẵn sàng phục vụ bạn</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 24 }}>
          {/* Branch list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {branches.map((branch, i) => (
              <div key={branch.id} onClick={() => setSelected(i)} style={{
                background: selected === i ? 'rgba(227,30,36,0.1)' : 'var(--color-card-bg)',
                border: `1px solid ${selected === i ? 'rgba(227,30,36,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 16, padding: 20, cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>📍</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-strong)', fontFamily: 'Plus Jakarta Sans' }}>{branch.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>{branch.city}</div>
                    </div>
                  </div>
                  <span style={{
                    padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                    background: branch.open ? 'rgba(16,185,129,0.15)' : 'rgba(113,128,150,0.15)',
                    border: `1px solid ${branch.open ? 'rgba(16,185,129,0.3)' : 'rgba(113,128,150,0.3)'}`,
                    color: branch.open ? '#10B981' : 'var(--color-text-soft)'
                  }}>{branch.open ? '● Đang mở' : '● Đã đóng'}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 8, lineHeight: 1.5 }}>📍 {branch.address}</p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--color-text-soft)' }}>
                  <span>📞 {branch.phone}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-soft)', marginTop: 4 }}>🕐 {branch.hours}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <a href={`tel:${branch.hotline.replace(/ /g, '')}`} style={{ flex: 1, padding: '8px', borderRadius: 8, textDecoration: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontSize: 12, fontWeight: 700, textAlign: 'center' }}>Gọi ngay</a>
                  <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--color-text-strong)', fontSize: 12, cursor: 'pointer' }}>🗺 Chỉ đường</button>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 500 }}>
            <iframe
              src={branches[selected].map}
              width="100%" height="100%" style={{ border: 'none', position: 'absolute', inset: 0 }}
              loading="lazy"
              title={`Bản đồ ${branches[selected].name}`}
            />
            <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(10,22,40,0.9)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-strong)', fontFamily: 'Plus Jakarta Sans', marginBottom: 2 }}>{branches[selected].name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>{branches[selected].city}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
