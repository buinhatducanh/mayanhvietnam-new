'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center font-black text-white text-xl mb-4" style={{ background: '#FF6B35' }}>M</div>
          <h1 className="text-2xl font-black text-foreground mb-1">Đăng nhập</h1>
          <p className="text-sm text-muted-foreground">Chào mừng bạn quay trở lại!</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email hoặc SĐT</label>
            <input type="text" required placeholder="email@example.com" className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Mật khẩu</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} required placeholder="••••••••" className="w-full h-11 px-4 pr-11 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none transition-colors" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              <span className="text-xs text-muted-foreground">Ghi nhớ</span>
            </label>
            <a href="#" className="text-xs text-primary hover:underline">Quên mật khẩu?</a>
          </div>
          <button type="submit" disabled={loading} className="w-full h-12 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-opacity" style={{ background: '#FF6B35' }}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
          <div className="relative flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">hoặc</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <button type="button" className="w-full h-11 rounded-lg bg-background border border-border text-sm font-semibold text-foreground hover:border-muted-foreground transition-colors">
            Tiếp tục với Google
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Chưa có tài khoản? <Link href="/account/register" className="text-primary font-semibold hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}