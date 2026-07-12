import { useState } from 'react'
import { Link } from 'react-router-dom'

const groups = [
  {
    topic: 'Mua hàng & Thanh toán',
    icon: '🛒',
    items: [
      { q: 'Làm thế nào để đặt hàng online?', a: 'Chọn sản phẩm → Thêm vào giỏ hàng → Nhập thông tin giao hàng → Chọn phương thức thanh toán → Đặt hàng. Bạn sẽ nhận xác nhận qua SMS/email trong vài phút.' },
      { q: 'Có thể đặt hàng qua điện thoại không?', a: 'Có! Gọi hotline 1900 1234 (miễn phí, 8:00-21:00) hoặc nhắn Zalo 0901 234 567. Nhân viên sẽ hỗ trợ tư vấn và đặt hàng giúp bạn.' },
      { q: 'Sản phẩm có chính hãng không?', a: 'Tất cả sản phẩm tại Máy Ảnh Việt Nam đều chính hãng 100%, có tem nhãn nhà phân phối chính thức, đầy đủ hộp phụ kiện và phiếu bảo hành.' },
      { q: 'Các phương thức thanh toán nào được chấp nhận?', a: 'Chúng tôi chấp nhận: COD (tiền mặt khi nhận hàng), Thẻ VISA/MasterCard/JCB, ATM nội địa Napas, Ví MoMo, Home PayLater, và trả góp 0% qua thẻ tín dụng.' },
    ]
  },
  {
    topic: 'Bảo hành & Đổi trả',
    icon: '🛡️',
    items: [
      { q: 'Thời gian bảo hành bao lâu?', a: 'Máy ảnh: 24 tháng. Ống kính: 12-24 tháng. Flycam DJI: 12 tháng. Action camera: 12 tháng. Xem đầy đủ tại trang Chính sách bảo hành.' },
      { q: 'Muốn đổi trả sản phẩm thì làm sao?', a: 'Liên hệ hotline hoặc Zalo trong vòng 30 ngày kể từ ngày mua. Sản phẩm cần còn nguyên vẹn, đầy đủ phụ kiện và hóa đơn. Đổi trả miễn phí nếu lỗi nhà sản xuất.' },
      { q: 'Sản phẩm bị lỗi ngay khi nhận hàng, làm gì?', a: 'Quay video ngay khi mở hộp và liên hệ chúng tôi trong 48 giờ. Sản phẩm lỗi do vận chuyển sẽ được đổi mới hoàn toàn miễn phí.' },
    ]
  },
  {
    topic: 'Vận chuyển',
    icon: '🚚',
    items: [
      { q: 'Có giao hàng tận nơi không?', a: 'Có, chúng tôi giao toàn quốc. Nội thành TP.HCM và Cần Thơ giao trong 2-4 giờ (đặt trước 15:00). Tỉnh thành khác 1-5 ngày.' },
      { q: 'Phí vận chuyển bao nhiêu?', a: 'Miễn phí giao hàng cho đơn từ 5.000.000₫. Đơn dưới 5 triệu: phí theo biểu cước đơn vị vận chuyển (25.000-50.000₫).' },
      { q: 'Có thể nhận hàng tại cửa hàng không?', a: 'Có! Chọn "nhận tại cửa hàng" khi thanh toán để lấy hàng ngay tại 4 chi nhánh. Hàng thường có sẵn sau 1-2 giờ khi có đặt trước.' },
    ]
  },
  {
    topic: 'Trả góp',
    icon: '💳',
    items: [
      { q: 'Mua trả góp 0% như thế nào?', a: 'Chọn sản phẩm và phương thức "Trả góp" khi checkout. Cần có thẻ tín dụng VISA/MasterCard/JCB. Điền thông tin và duyệt ngay trong 5-10 phút.' },
      { q: 'Điều kiện để mua trả góp?', a: 'Có thẻ tín dụng còn hạn mức. Đơn hàng tối thiểu 5.000.000₫. Kỳ hạn từ 3-12 tháng. Lãi suất 0% với nhiều đơn vị phát hành thẻ.' },
    ]
  },
  {
    topic: 'Dịch vụ lắp phông Studio',
    icon: '🏢',
    items: [
      { q: 'Dịch vụ lắp studio phục vụ khu vực nào?', a: 'TP.HCM, Bình Dương, Đồng Nai, TP. Cần Thơ, An Giang và Đồng Tháp. Khu vực khác liên hệ để được tư vấn phụ phí.' },
      { q: 'Chi phí lắp đặt studio bao gồm những gì?', a: 'Bao gồm: khảo sát miễn phí, thiết kế layout, thiết bị (phông, đèn, tripod, backdrop stand), vận chuyển và lắp đặt, hướng dẫn sử dụng và bảo trì theo gói.' },
    ]
  },
]

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTopic, setActiveTopic] = useState('Tất cả')

  const filtered = groups.map(g => ({
    ...g,
    items: g.items.filter(item =>
      (activeTopic === 'Tất cả' || g.topic === activeTopic) &&
      (!searchTerm || item.q.toLowerCase().includes(searchTerm.toLowerCase()) || item.a.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(g => g.items.length > 0)

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>Câu Hỏi Thường Gặp</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 40, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 12 }}>Câu Hỏi Thường Gặp</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)', marginBottom: 24 }}>Tìm câu trả lời cho thắc mắc của bạn</p>
          <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm câu hỏi..."
              style={{ width: '100%', padding: '14px 44px 14px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, color: '#fff', fontSize: 15, outline: 'none' }}
            />
            <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--color-text-soft)' }}>🔍</span>
          </div>
        </div>

        {/* Topic filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {['Tất cả', ...groups.map(g => g.topic)].map(topic => (
            <button key={topic} onClick={() => setActiveTopic(topic)} style={{
              padding: '8px 16px', borderRadius: 20, border: `1px solid ${activeTopic === topic ? 'var(--color-secondary)' : 'rgba(255,255,255,0.12)'}`,
              background: activeTopic === topic ? 'rgba(227,30,36,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTopic === topic ? 'var(--color-secondary)' : 'var(--color-text-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer'
            }}>{topic}</button>
          ))}
        </div>

        {filtered.map(group => (
          <div key={group.topic} style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 20, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{group.icon}</span>
              {group.topic}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.items.map((item, i) => {
                const key = `${group.topic}-${i}`
                const isOpen = openItem === key
                return (
                  <div key={i} style={{ background: 'var(--color-card-bg)', border: `1px solid ${isOpen ? 'rgba(227,30,36,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                    <button onClick={() => setOpenItem(isOpen ? null : key)} style={{ width: '100%', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)', fontFamily: 'Plus Jakarta Sans' }}>{item.q}</span>
                      <span style={{ fontSize: 18, color: 'var(--color-secondary)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 20px 18px', fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.8 }}>{item.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div style={{ background: 'rgba(227,30,36,0.08)', border: '1px solid rgba(227,30,36,0.2)', borderRadius: 20, padding: 40, textAlign: 'center', marginTop: 48 }}>
          <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: 8 }}>Chưa tìm thấy câu trả lời?</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a href="tel:19001234" style={{ padding: '12px 24px', borderRadius: 10, textDecoration: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontWeight: 700, fontSize: 14 }}>📞 Gọi 1900 1234</a>
            <Link to="/lien-he" style={{ padding: '12px 24px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-text-strong)', fontSize: 14 }}>Gửi tin nhắn</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
