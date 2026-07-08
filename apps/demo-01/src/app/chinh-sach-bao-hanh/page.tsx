import { Metadata } from 'next';
import { Shield, CheckCircle2, XCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Chính sách bảo hành',
  description: 'Chính sách bảo hành sản phẩm tại Máy Ảnh Việt Nam — Bảo hành chính hãng lên đến 36 tháng.',
};

export default function WarrantyPolicyPage() {
  const policies = [
    {
      title: 'Thời hạn bảo hành',
      content: 'Tất cả sản phẩm chính hãng tại Máy Ảnh Việt Nam được bảo hành từ 12–36 tháng tùy thương hiệu. Máy cũ được bảo hành 6–12 tháng.',
    },
    {
      title: 'Điều kiện bảo hành',
      items: [
        { text: 'Sản phẩm còn trong thời hạn bảo hành', ok: true },
        { text: 'Phiếu bảo hành còn nguyên vẹn, không tẩy xóa', ok: true },
        { text: 'Hư hỏng do lỗi kỹ thuật của nhà sản xuất', ok: true },
        { text: 'Sản phẩm bị hư do tác động vật lý, nước, cháy', ok: false },
        { text: 'Sản phẩm đã qua sửa chữa không qua trung tâm bảo hành', ok: false },
      ],
    },
    {
      title: 'Quy trình bảo hành',
      steps: [
        'Liên hệ hotline 0937.148.222 hoặc mang sản phẩm đến cửa hàng',
        'Nhân viên kiểm tra, xác nhận lỗi và thời hạn bảo hành',
        'Tiến hành sửa chữa hoặc đổi mới theo chính sách',
        'Thông báo kết quả và giao sản phẩm cho khách hàng',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Chính sách bảo hành' }]} />
      <FadeIn>
        <div className="flex items-center gap-3 mt-6 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Chính sách bảo hành</h1>
        </div>
      </FadeIn>

      <div className="space-y-8">
        {policies.map((section, i) => (
          <FadeIn key={section.title} delay={i * 0.1}>
            <div className="rounded-lg bg-card border border-border p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">{section.title}</h2>

              {section.content && <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>}

              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      {item.ok ? (
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-error mt-0.5 shrink-0" />
                      )}
                      <span className={item.ok ? 'text-muted-foreground' : 'text-muted-foreground'}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.steps && (
                <ol className="space-y-3 list-decimal list-inside">
                  {section.steps.map((step, j) => (
                    <li key={j} className="text-sm text-muted-foreground pl-1">
                      {step}
                    </li>
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
