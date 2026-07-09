import { RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/chinh-sach-doi-tra',
  title: 'Chính sách đổi trả — 7 ngày đổi ý miễn phí',
  description:
    'Chính sách đổi trả sản phẩm tại Máy Ảnh Việt Nam: 7 ngày đổi ý miễn phí, 30 ngày đổi bảo hành, quy trình đơn giản. Máy chính hãng like-new, phụ kiện còn nguyên hộp.',
  keywords: ['chính sách đổi trả', 'đổi ý miễn phí', 'trả hàng', 'hoàn tiền', 'Máy Ảnh Việt Nam'],
});

export default function ReturnPolicyPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Chính sách đổi trả' },
  ];

  const sections = [
    {
      title: 'Điều kiện đổi trả',
      items: [
        { text: 'Sản phẩm còn nguyên vẹn, đầy đủ phụ kiện và hộp đựng', ok: true },
        { text: 'Khách hàng gửi yêu cầu trong vòng 7 ngày kể từ khi nhận hàng', ok: true },
        { text: 'Sản phẩm like-new (không trầy xước, không va đập)', ok: true },
        { text: 'Sản phẩm đã qua sử dụng gây hư hỏng do lỗi người dùng', ok: false },
        { text: 'Sản phẩm không còn trong thời hạn đổi trả', ok: false },
        { text: 'Hàng سفارش đặt riêng theo yêu cầu khách hàng', ok: false },
      ],
    },
    {
      title: 'Quy trình đổi trả',
      steps: [
        'Liên hệ hotline 0937.148.222 hoặc inbox fanpage để thông báo yêu cầu đổi/trả',
        'Nhân viên xác nhận tình trạng sản phẩm và hướng dẫn đóng gói',
        'Gửi sản phẩm về địa chỉ cửa hàng hoặc mang trực tiếp đến 4 cửa hàng',
        'Nhận hoàn tiền qua tài khoản ngân hàng trong 3–5 ngày làm việc',
      ],
    },
    {
      title: 'Các hình thức hoàn tiền',
      items: [
        { text: 'Hoàn tiền vào tài khoản ngân hàng (3–5 ngày)', ok: true },
        { text: 'Hoàn tiền qua ví MoMo / VNPay (1–2 ngày)', ok: true },
        { text: 'Đổi sang sản phẩm khác cùng hoặc cao hơn giá trị (không hoàn tiền mặt)', ok: true },
        { text: 'Trừ phí vận chuyển hai chiều đối với đổi ý (không lỗi)', ok: true },
      ],
    },
    {
      title: 'Lưu ý quan trọng',
      content:
        'Sản phẩm mua tại chương trình flash sale hoặc giảm giá đặc biệt có thể không áp dụng đổi trả. Vui lòng đọc kỹ điều kiện trên trang sản phẩm trước khi đặt hàng. Sản phẩm bảo hành chính hãng được đổi mới trong 30 ngày đầu theo chính sách bảo hành.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumb items={breadcrumbItems} />
      <FadeIn>
        <div className="flex items-center gap-3 mt-6 mb-8">
          <RotateCcw className="h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground">Chính sách đổi trả</h1>
        </div>
      </FadeIn>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <FadeIn key={section.title} delay={i * 0.1}>
            <div className="rounded-lg bg-card border border-border p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">{section.title}</h2>

              {section.content && (
                <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
              )}

              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      {item.ok ? (
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-label="Được phép" />
                      ) : (
                        <XCircle className="h-4 w-4 text-error mt-0.5 shrink-0" aria-label="Không được phép" />
                      )}
                      <span className="text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.steps && (
                <ol className="space-y-3 list-decimal list-inside">
                  {section.steps.map((step, j) => (
                    <li key={j} className="text-sm text-muted-foreground pl-1">{step}</li>
                  ))}
                </ol>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
