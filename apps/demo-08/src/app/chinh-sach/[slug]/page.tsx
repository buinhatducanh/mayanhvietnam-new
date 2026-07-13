import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { TradeInWidget } from '@/components/widgets/TradeInWidget';
import styles from './Policy.module.css';

const POLICIES: Record<string, { title: string; content: string[] }> = {
  'trade-in': {
    title: 'Chính Sách Thu Mua & Đổi Máy Cũ Lấy Mới (Trade-in)',
    content: [
      'Định giá tự động chính xác theo tình trạng máy ảnh, ống kính cũ của bạn chỉ trong 30 giây.',
      'Trợ giá lên đời thêm đến 3.000.000đ khi đổi sang máy ảnh, ống kính mới tại Máy Ảnh Việt Nam.',
      'Thu mua giá cao nhất thị trường miền Tây — thủ tục định giá nhanh gọn, thanh toán ngay tiền mặt hoặc chuyển khoản 100%.',
    ],
  },
  'bao-hanh': {
    title: 'Chính Sách Bảo Hành Chính Hãng',
    content: [
      'Tất cả máy ảnh, ống kính và thiết bị phân phối tại Máy Ảnh Việt Nam đều là hàng chính hãng 100%, bảo hành 12 - 24 tháng theo quy định của hãng (Canon, Sony, Nikon, DJI...).',
      'Đổi mới miễn phí trong vòng 7 ngày đầu tiên nếu sản phẩm phát sinh lỗi kỹ thuật từ nhà sản xuất.',
      'Hỗ trợ vệ sinh cảm biến (sensor clean), kiểm tra và bảo dưỡng máy miễn phí trọn đời cho khách hàng.',
    ],
  },
  'doi-tra': {
    title: 'Chính Sách Đổi Trả & Hoàn Tiền',
    content: [
      'Thời gian đổi trả: 7 ngày kể từ khi khách hàng nhận được sản phẩm.',
      'Điều kiện áp dụng: Sản phẩm phải còn nguyên vẹn tem bảo hành, hộp giấy, sách hướng dẫn và phụ kiện đi kèm, không trầy xước hay va đập.',
      'Hoàn tiền 100% nếu phát hiện hàng giả, hàng nhái hoặc không đúng mô tả chính hãng.',
    ],
  },
  'van-chuyen': {
    title: 'Chính Sách Giao Hàng & Vận Chuyển',
    content: [
      'Miễn phí vận chuyển toàn quốc cho tất cả đơn hàng máy ảnh và ống kính.',
      'Giao hỏa tốc 2 giờ nội thành TP. Cần Thơ, TP. Hồ Chí Minh.',
      'Khách hàng được quyền kiểm tra sản phẩm nguyên seal trước khi thanh toán tiền mặt cho nhân viên giao hàng.',
    ],
  },
  'thanh-toan': {
    title: 'Chính Sách Thanh Toán & Trả Góp 0%',
    content: [
      'Hỗ trợ đa dạng hình thức thanh toán: Tiền mặt khi nhận hàng (COD), Chuyển khoản QR code Vietcombank/MBBank, Thẻ tín dụng Visa/Mastercard.',
      'Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng của 26 ngân hàng hoặc trả góp qua CCCD gắn chip (HD Saison, Home Credit).',
    ],
  },
  'bao-mat': {
    title: 'Chính Sách Bảo Mật Thông Tin Khách Hàng',
    content: [
      'Máy Ảnh Việt Nam cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng (họ tên, số điện thoại, địa chỉ, đơn hàng).',
      'Thông tin chỉ được sử dụng với mục đích xử lý đơn hàng, hỗ trợ bảo hành và gửi thông báo ưu đãi (nếu khách hàng đồng ý).',
    ],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(POLICIES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) return { title: 'Chính Sách | Máy Ảnh Việt Nam' };
  return {
    title: `${policy.title} | Máy Ảnh Việt Nam`,
    description: policy.content[0],
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();

  return (
    <>
      <Header />
      <main>
        {slug === 'trade-in' && <TradeInWidget />}
        <div className={styles.wrap}>
          <div className="container">
            <div className={styles.box}>
              <h1 className={styles.title}>{policy.title}</h1>
              <div className={styles.content}>
                <h2>Quy định chung</h2>
                {policy.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                <h2>Hỗ trợ giải đáp câu hỏi</h2>
                <p>
                  Mọi thắc mắc liên quan đến chính sách, quý khách vui lòng liên hệ Hotline CSKH: <strong>0937.148.222</strong> hoặc email chăm sóc khách hàng để được xử lý nhanh chóng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
