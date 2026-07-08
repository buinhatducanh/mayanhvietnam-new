import { Metadata } from 'next';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật thông tin khách hàng',
  description: 'Chính sách bảo mật thông tin tại Máy Ảnh Việt Nam — Cam kết bảo vệ quyền riêng tư khách hàng.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Chính sách bảo mật' }]} />
      <FadeIn>
        <h1 className="text-2xl font-bold text-foreground mt-6 mb-8">Chính sách bảo mật thông tin</h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="rounded-lg bg-card border border-border p-6 text-sm text-muted-foreground space-y-4 leading-relaxed">
          <p>Máy Ảnh Việt Nam cam kết bảo vệ tuyệt đối thông tin cá nhân của khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu.</p>
          <h3 className="text-base font-semibold text-foreground">1. Thu thập thông tin</h3>
          <p>Chúng tôi thu thập thông tin cần thiết để xử lý đơn hàng: họ tên, số điện thoại, địa chỉ giao hàng, email (nếu cung cấp).</p>
          <h3 className="text-base font-semibold text-foreground">2. Sử dụng thông tin</h3>
          <p>Thông tin chỉ được sử dụng cho mục đích: xử lý đơn hàng, liên hệ giao hàng, hỗ trợ khách hàng và cải thiện dịch vụ.</p>
          <h3 className="text-base font-semibold text-foreground">3. Không chia sẻ bên thứ ba</h3>
          <p>Chúng tôi không bán hoặc cho thuê thông tin khách hàng cho bất kỳ bên thứ ba nào.</p>
          <h3 className="text-base font-semibold text-foreground">4. Liên hệ</h3>
          <p>Mọi thắc mắc vui lòng liên hệ: <a href="mailto:info@mayanhvietnam.com" className="text-primary underline">info@mayanhvietnam.com</a> hoặc hotline 0937.148.222</p>
        </div>
      </FadeIn>
    </div>
  );
}
