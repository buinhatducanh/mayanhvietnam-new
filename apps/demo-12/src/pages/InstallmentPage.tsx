import { useState } from 'react'
import { Link } from 'react-router-dom'

const partners = [
  { name: 'VISA', color: '#1A1F71' },
  { name: 'MasterCard', color: '#EB001B' },
  { name: 'JCB', color: '#003087' },
  { name: 'Home PayLater', color: '#00A651' },
  { name: 'VPBank', color: '#006B3C' },
  { name: 'Techcombank', color: '#EF3024' },
]

export default function InstallmentPage() {
  const [price, setPrice] = useState(30000000)
  const [months, setMonths] = useState(12)
  const [partner, setPartner] = useState('VISA')

  const monthly = Math.ceil(price / months)

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>Trả Góp 0%</span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: 'rgba(227,30,36,0.15)', border: '1px solid rgba(227,30,36,0.3)', color: 'var(--color-secondary)', marginBottom: 16 }}>
            LÃI SUẤT 0%
          </span>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 44, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 12 }}>
            Mua Trước, Trả Sau
          </h1>
          <p style={{ fontSize: 18, color: 'var(--color-text-muted)' }}>Sở hữu thiết bị mơ ước ngay hôm nay — trả góp 0% lãi suất, duyệt nhanh trong 5 phút</p>
        </div>

        {/* Calculator */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 64 }}>
          <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 28 }}>🧮 Công Cụ Tính Trả Góp</h2>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8 }}>
                Giá trị sản phẩm: <span style={{ color: 'var(--color-accent)' }}>{price.toLocaleString('vi-VN')}₫</span>
              </label>
              <input
                type="range" min={2000000} max={100000000} step={500000}
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-secondary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-text-soft)', marginTop: 4 }}>
                <span>2 triệu</span>
                <span>100 triệu</span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 12 }}>Kỳ hạn</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[3, 6, 9, 12].map(m => (
                  <button key={m} onClick={() => setMonths(m)} style={{
                    flex: 1, padding: '12px', borderRadius: 10, border: `1px solid ${months === m ? 'var(--color-secondary)' : 'rgba(255,255,255,0.12)'}`,
                    background: months === m ? 'rgba(227,30,36,0.15)' : 'rgba(255,255,255,0.04)',
                    color: months === m ? 'var(--color-secondary)' : 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 700, fontSize: 15, fontFamily: 'Plus Jakarta Sans'
                  }}>{m}</button>
                ))}
              </div>
              <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-soft)', marginTop: 6 }}>tháng</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 12 }}>Đối tác thanh toán</label>
              <select value={partner} onChange={e => setPartner(e.target.value)} style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: 14 }}>
                {partners.map(p => <option key={p.name}>{p.name}</option>)}
              </select>
            </div>

            <Link to="/thanh-toan" style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 12, textDecoration: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'Plus Jakarta Sans' }}>
              Mua Trả Góp Ngay →
            </Link>
          </div>

          {/* Result card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(227,30,36,0.15), rgba(255,107,53,0.1))', border: '1px solid rgba(227,30,36,0.3)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 8 }}>Trả mỗi tháng</div>
              <div style={{ fontSize: 52, fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>
                {monthly.toLocaleString('vi-VN')}₫
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-text-soft)', marginTop: 8 }}>trong {months} tháng × lãi suất 0%</div>
            </div>

            <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 16 }}>Chi tiết thanh toán</h3>
              {[
                ['Giá sản phẩm', `${price.toLocaleString('vi-VN')}₫`],
                ['Lãi suất', '0%'],
                ['Phí dịch vụ', '0₫'],
                ['Số tháng', `${months} tháng`],
                ['Kỳ đầu', `${monthly.toLocaleString('vi-VN')}₫`],
                ['Đối tác', partner],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
                  <span style={{ color: 'var(--color-text-soft)' }}>{label}</span>
                  <span style={{ fontWeight: 600, color: label === 'Lãi suất' ? '#10B981' : 'var(--color-text-strong)' }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: 16, fontSize: 13, color: '#10B981' }}>
              ✓ Duyệt trong 5 phút · Không cần thế chấp · Không phí phát sinh ẩn
            </div>
          </div>
        </div>

        {/* Partners */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', textAlign: 'center', marginBottom: 32 }}>Đối Tác Trả Góp</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {partners.map(p => (
              <div key={p.name} style={{ padding: '16px 28px', background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, fontSize: 15, fontWeight: 700, color: '#fff' }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 24 }}>Điều Kiện & Hướng Dẫn</h2>
          {[
            { q: 'Điều kiện mua trả góp 0%?', a: 'Có thẻ tín dụng VISA/MasterCard/JCB/Home PayLater còn hạn mức. Đơn hàng tối thiểu 5.000.000₫. Không yêu cầu chứng minh thu nhập.' },
            { q: 'Thủ tục như thế nào?', a: 'Chọn sản phẩm → Chọn "Trả góp" → Điền thông tin thẻ → Chọn kỳ hạn → Duyệt tự động trong 5-10 phút. Đơn giản, nhanh chóng, không cần đến ngân hàng.' },
            { q: 'Nếu thanh toán sớm có phí phạt không?', a: 'Không! Bạn có thể tất toán khoản vay bất kỳ lúc nào mà không mất phí phạt trả trước hạn (tùy điều kiện từng đơn vị phát hành thẻ).' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 8 }}>❓ {item.q}</h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
