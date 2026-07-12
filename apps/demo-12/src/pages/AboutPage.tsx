import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>Giới Thiệu</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: 'rgba(227,30,36,0.15)', border: '1px solid rgba(227,30,36,0.3)', color: 'var(--color-secondary)', marginBottom: 20 }}>
            VỀ CHÚNG TÔI
          </span>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 48, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 16 }}>Máy Ảnh Việt Nam</h1>
          <p className="gradient-text" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
            "Vì Lợi Ích Khách Hàng"
          </p>
          <p style={{ fontSize: 18, color: 'var(--color-text-muted)', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
            Hơn 10 năm phục vụ cộng đồng nhiếp ảnh Việt Nam, chúng tôi tự hào là địa chỉ tin cậy
            cho hàng chục ngàn nhiếp ảnh gia, videographer và content creator.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 64 }}>
          {[['10+', 'Năm kinh nghiệm'], ['50,000+', 'Khách hàng tin dùng'], ['4', 'Chi nhánh toàn quốc'], ['1,000+', 'Sản phẩm chính hãng']].map(([num, label]) => (
            <div key={label} style={{
              background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 28, textAlign: 'center'
            }}>
              <div className="gradient-text" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 800, marginBottom: 6 }}>{num}</div>
              <div style={{ fontSize: 14, color: 'var(--color-text-soft)' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64, alignItems: 'center' }}>
          <div>
            <img src="https://mayanhvietnam.com/asset/imgs/img/danhMuc_MayAnh.webp"
              alt="Cửa hàng Máy Ảnh Việt Nam" style={{ width: '100%', borderRadius: 20, aspectRatio: '4/3', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 20 }}>Câu Chuyện Của Chúng Tôi</h2>
            <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              Máy Ảnh Việt Nam được thành lập vào năm 2012 với sứ mệnh mang những thiết bị nhiếp ảnh chất lượng cao,
              chính hãng đến tay người dùng Việt với giá tốt nhất.
            </p>
            <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              Từ một cửa hàng nhỏ tại TP. Hồ Chí Minh, chúng tôi đã phát triển thành chuỗi 4 chi nhánh
              trải rộng khắp miền Nam, phục vụ hơn 50,000 khách hàng.
            </p>
            <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              Với đội ngũ nhân viên am hiểu về kỹ thuật nhiếp ảnh và dịch vụ hậu mãi tận tâm,
              chúng tôi không chỉ bán sản phẩm mà còn đồng hành cùng bạn trong hành trình sáng tạo.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800, color: 'var(--color-text-strong)', textAlign: 'center', marginBottom: 40 }}>Giá Trị Cốt Lõi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '🛡️', title: 'Chính Hãng 100%', desc: 'Mọi sản phẩm đều có tem nhãn, chứng từ nhập khẩu và bảo hành chính hãng từ nhà sản xuất.' },
              { icon: '💝', title: 'Vì Khách Hàng', desc: 'Chúng tôi đặt lợi ích khách hàng lên hàng đầu — từ tư vấn trung thực đến hỗ trợ sau bán hàng.' },
              { icon: '🔧', title: 'Hỗ Trợ Kỹ Thuật', desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm sẵn sàng hỗ trợ sử dụng, bảo trì và nâng cấp thiết bị.' },
            ].map(v => (
              <div key={v.title} style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-soft)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '48px', background: 'rgba(227,30,36,0.08)', border: '1px solid rgba(227,30,36,0.2)', borderRadius: 20 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 28, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 12 }}>Hãy Đến Trải Nghiệm Trực Tiếp</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, fontSize: 16 }}>Ghé thăm chi nhánh gần nhất — chúng tôi sẵn sàng tư vấn miễn phí</p>
          <Link to="/he-thong-cua-hang" style={{ padding: '14px 32px', borderRadius: 12, textDecoration: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'Plus Jakarta Sans' }}>
            Hệ Thống Cửa Hàng →
          </Link>
        </div>
      </div>
    </div>
  )
}