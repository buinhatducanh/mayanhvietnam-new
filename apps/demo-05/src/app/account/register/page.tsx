'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
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
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center font-black text-white text-xl mb-4" style={{ background: '#2563eb' }}>M</div>
          <h1 className="text-2xl font-black text-foreground mb-1">Tạo tài khoản</h1>
          <p className="text-sm text-muted-foreground">Đăng ký để nhận ưu đãi dành riêng cho thành viên</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Họ</label><input type="text" required placeholder="Nguyễn" className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" /></div>
            <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Tên</label><input type="text" required placeholder="Văn A" className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" /></div>
          </div>
          <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email</label><input type="email" required placeholder="email@example.com" className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" /></div>
          <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Số điện thoại</label><input type="tel" required placeholder="0912 345 678" className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" /></div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Mật khẩu</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} required placeholder="Ít nhất 8 ký tự" className="w-full h-11 px-4 pr-11 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Ít nhất 8 ký tự', 'Có chữ hoa', 'Có số'].map((req) => (
                <span key={req} className="flex items-center gap-1 text-[10px] text-muted-foreground"><Check className="w-3 h-3 text-success" />{req}</span>
              ))}
            </div>
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" required className="accent-primary mt-0.5" />
            <span className="text-xs text-muted-foreground leading-relaxed">Tôi đồng ý với <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a></span>
          </label>
          <button type="submit" disabled={loading} className="w-full h-12 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-opacity" style={{ background: '#2563eb' }}>
            {loading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Đã có tài khoản? <Link href="/account/login" className="text-primary font-semibold hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}