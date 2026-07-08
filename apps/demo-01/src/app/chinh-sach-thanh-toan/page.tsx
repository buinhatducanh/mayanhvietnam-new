import { Metadata } from 'next';
import { CreditCard } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Chính sách thanh toán',
  description: 'Các phương thức thanh toán được hỗ trợ tại Máy Ảnh Việt Nam.',
};

export default function PaymentPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Chính sách thanh toán' }]} />
      <FadeIn>
        <div className="flex items-center gap-3 mt-6 mb-8">
          <CreditCard className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Chính sách thanh toán</h1>
        </div>
      </FadeIn>

      <div className="space-y-6">
        <FadeIn>
          <div className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-base font-semibold text-foreground mb-3">Phương thức thanh toán</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                ['💵 Thanh toán khi nhận hàng (COD)', 'Thanh toán bằng tiền mặt khi nhân viên giao hàng giao kiện hàng. Phù hợp đơn dưới 20 triệu.'],
                ['🏦 Chuyển khoản ngân hàng', 'Chuyển khoản trực tiếp qua STK của shop. Đơn hàng được xử lý ngay khi nhận xác nhận.'],
                ['💳 VNPAY / Thẻ tín dụng', 'Hỗ trợ VISA, MasterCard, JCB, NAPAS. An toàn — mã hóa SSL 256-bit.'],
                ['📱 Ví MoMo', 'Thanh toán nhanh qua ứng dụng MoMo. Hỗ trợ QR code.'],
                ['🔄 Trả góp qua thẻ tín dụng', 'Trả góp 0% lãi suất qua Visa, MasterCard — kỳ hạn 6, 9 hoặc 12 tháng.'],
              ].map(([title, desc]) => (
                <div key={title}>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
