import { useParams, Link } from 'react-router-dom'

const policies: Record<string, { title: string; content: Array<{ heading: string; text: string }> }> = {
  'bao-hanh': {
    title: 'Chính Sách Bảo Hành',
    content: [
      { heading: '1. Thời Gian Bảo Hành', text: 'Máy ảnh: 24 tháng chính hãng. Ống kính: 12-24 tháng. Flycam DJI: 12 tháng. Action Camera: 12 tháng. Thiết bị studio: 12 tháng.' },
      { heading: '2. Điều Kiện Bảo Hành', text: 'Sản phẩm còn trong thời hạn bảo hành. Có phiếu bảo hành hoặc hóa đơn mua hàng. Lỗi do nhà sản xuất, không phải do người dùng gây ra. Sản phẩm không bị can thiệp bởi trung tâm bảo hành không được ủy quyền.' },
      { heading: '3. Các Trường Hợp Không Được Bảo Hành', text: 'Hư hỏng do va đập, rơi vỡ, ngấm nước (trừ sản phẩm có khả năng chống nước). Hư hỏng do sử dụng nguồn điện không đúng. Sản phẩm đã bị tháo dỡ hoặc sửa chữa không ủy quyền. Mất phụ kiện đi kèm.' },
      { heading: '4. Quy Trình Bảo Hành', text: 'Bước 1: Liên hệ hotline 1900 1234 hoặc đến trực tiếp cửa hàng. Bước 2: Cung cấp phiếu bảo hành / hóa đơn. Bước 3: Nhận phiếu tiếp nhận bảo hành. Bước 4: Nhận lại sản phẩm sau khi sửa chữa (thường 7-14 ngày làm việc).' },
    ]
  },
  'doi-tra': {
    title: 'Chính Sách Đổi Trả',
    content: [
      { heading: '1. Thời Gian Đổi Trả', text: 'Khách hàng có thể đổi/trả sản phẩm trong vòng 30 ngày kể từ ngày mua hàng.' },
      { heading: '2. Điều Kiện Đổi Trả', text: 'Sản phẩm còn nguyên vẹn, chưa qua sử dụng. Đầy đủ hộp, phụ kiện, tài liệu kèm theo. Có hóa đơn mua hàng. Sản phẩm lỗi do nhà sản xuất.' },
      { heading: '3. Quy Trình Đổi Trả', text: 'Liên hệ bộ phận CSKH qua hotline hoặc Zalo. Cung cấp ảnh/video mô tả lỗi. Gửi hàng về kho theo hướng dẫn (phí ship do Máy Ảnh Việt Nam chi trả nếu lỗi nhà sản xuất). Nhận hàng đổi/hoàn tiền trong 3-7 ngày.' },
    ]
  },
  'van-chuyen': {
    title: 'Chính Sách Vận Chuyển',
    content: [
      { heading: '1. Khu Vực Giao Hàng', text: 'Giao hàng toàn quốc 63 tỉnh thành. Đến tận địa chỉ khách hàng qua các đơn vị vận chuyển uy tín: GHN, GHTK, J&T Express.' },
      { heading: '2. Phí Vận Chuyển', text: 'Miễn phí giao hàng cho đơn hàng từ 5.000.000₫. Đơn dưới 5 triệu: phí theo biểu cước của đơn vị vận chuyển (thường 25.000 - 50.000₫). Giao hàng tốc độ (trong 2h): thêm 50.000₫ (chỉ áp dụng nội thành TP.HCM và Cần Thơ).' },
      { heading: '3. Thời Gian Giao Hàng', text: 'Nội thành TP.HCM, Cần Thơ: 2-4 giờ (đặt trước 15:00). Tỉnh thành lân cận: 1-2 ngày. Tỉnh thành xa: 2-5 ngày. Sản phẩm đặt trước (pre-order): theo thông báo riêng.' },
    ]
  },
  'bao-mat': {
    title: 'Chính Sách Bảo Mật',
    content: [
      { heading: '1. Thu Thập Thông Tin', text: 'Chúng tôi thu thập thông tin cá nhân khi bạn đăng ký tài khoản, đặt hàng, liên hệ hỗ trợ hoặc đăng ký nhận bản tin. Thông tin thu thập bao gồm: họ tên, email, số điện thoại, địa chỉ giao hàng.' },
      { heading: '2. Sử Dụng Thông Tin', text: 'Thông tin được sử dụng để xử lý đơn hàng, liên hệ hỗ trợ, gửi thông báo khuyến mãi (nếu đăng ký). Chúng tôi cam kết không bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba.' },
      { heading: '3. Bảo Mật Thông Tin', text: 'Website sử dụng giao thức HTTPS mã hóa SSL. Thông tin thẻ tín dụng được xử lý qua cổng thanh toán bảo mật, không lưu trữ trên hệ thống của chúng tôi.' },
    ]
  },
  'dieu-khoan': {
    title: 'Điều Khoản Sử Dụng',
    content: [
      { heading: '1. Điều Khoản Chung', text: 'Bằng cách truy cập và sử dụng website mayanhvietnam.com, bạn đồng ý tuân theo các điều khoản và điều kiện này.' },
      { heading: '2. Quyền Sở Hữu Trí Tuệ', text: 'Toàn bộ nội dung trên website (hình ảnh, văn bản, logo) là tài sản của Máy Ảnh Việt Nam và được bảo vệ bởi luật sở hữu trí tuệ.' },
      { heading: '3. Giới Hạn Trách Nhiệm', text: 'Máy Ảnh Việt Nam không chịu trách nhiệm về các thiệt hại phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ do các nguyên nhân ngoài tầm kiểm soát.' },
    ]
  },
}

export default function PolicyPage() {
  const { type } = useParams<{ type: string }>()
  const policy = policies[type || 'bao-hanh'] || policies['bao-hanh']

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, fontSize: 13, color: 'var(--color-text-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <Link to="/chinh-sach/bao-hanh" style={{ color: 'var(--color-text-soft)', textDecoration: 'none' }}>Chính sách</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-accent)' }}>{policy.title}</span>
        </div>

        {/* Policy nav */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          {Object.entries(policies).map(([key, p]) => (
            <Link key={key} to={`/chinh-sach/${key}`} style={{
              padding: '8px 16px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500,
              background: type === key ? 'rgba(227,30,36,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${type === key ? 'rgba(227,30,36,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: type === key ? 'var(--color-secondary)' : 'var(--color-text-muted)'
            }}>{p.title}</Link>
          ))}
        </div>

        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 800, color: 'var(--color-text-strong)', marginBottom: 40 }}>
          {policy.title}
        </h1>

        <div style={{ background: 'var(--color-card-bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 40 }}>
          {policy.content.map((section, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 700, color: 'var(--color-secondary)', marginBottom: 12 }}>
                {section.heading}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.8 }}>{section.text}</p>
            </div>
          ))}

          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 12 }}>
            <Link to="/lien-he" style={{ padding: '12px 24px', borderRadius: 10, textDecoration: 'none', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', color: '#fff', fontWeight: 700, fontSize: 14 }}>
              Liên hệ hỗ trợ
            </Link>
            <Link to="/hoi-dap" style={{ padding: '12px 24px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--color-text-strong)', fontSize: 14 }}>
              Câu hỏi thường gặp
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
