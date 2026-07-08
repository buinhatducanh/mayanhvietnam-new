import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';

export const metadata: Metadata = {
  title: 'Đặt hàng thành công',
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-lg mx-auto px-4 md:px-6 py-16 min-h-screen flex items-center">
      <FadeIn className="w-full text-center">
        <div className="rounded-lg bg-card border border-border p-8">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Cảm ơn bạn đã mua hàng tại Máy Ảnh Việt Nam
          </p>

          <div className="rounded-md bg-background p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Mã đơn hàng: <span className="font-mono text-primary">#MAVN-2026-001</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Đơn hàng sẽ được xử lý và giao trong vòng 2–5 ngày làm việc.
              <br />Bạn sẽ nhận SMS xác nhận từ số 0937.148.222.
            </p>
          </div>

          <div className="space-y-2">
            <Link href="/">
              <Button variant="primary" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
