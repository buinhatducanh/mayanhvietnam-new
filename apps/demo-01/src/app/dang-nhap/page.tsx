import { Metadata } from 'next';
import Link from 'next/link';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';

export const metadata: Metadata = {
  title: 'Đăng nhập tài khoản',
  description: 'Đăng nhập hoặc đăng ký tài khoản tại Máy Ảnh Việt Nam để theo dõi đơn hàng, lưu wishlist và nhận ưu đãi thành viên.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 md:px-6 py-12 min-h-screen flex flex-col justify-center">
      <FadeIn>
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,107,53,0.12)' }}
          >
            <User className="h-7 w-7 text-primary" />
          </div>
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Đăng nhập
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Theo dõi đơn hàng, lưu wishlist & nhận ưu đãi thành viên
          </p>
        </div>

        <div className="rounded-xl bg-card border border-border p-6 space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground font-medium" htmlFor="email">
              Email hoặc số điện thoại
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="nhap@email.com"
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground font-medium" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input type="checkbox" className="accent-[#00d4aa]" />
              Ghi nhớ đăng nhập
            </label>
            <a href="#" className="text-primary hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
            ĐĂNG NHẬP
          </Button>

          <div className="relative flex items-center gap-3 my-2">
            <div className="flex-1 border-t border-border" />
            <span className="text-[11px] text-muted-foreground">hoặc</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <button
            type="button"
            className="w-full h-11 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-card transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Tiếp tục với Google
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Chưa có tài khoản?{' '}
          <Link href="/dang-ky" className="text-primary font-medium hover:underline">
            Đăng ký ngay
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            ← Quay lại trang chủ
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
