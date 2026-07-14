/**
 * AuthModal — Modern login/register modal với hero gradient + split layout
 * Thiết kế lấy cảm hứng từ kiểu "auth split panel" của Stripe, Linear, Vercel
 *
 * Features:
 * - Split layout: trái = brand panel, phải = form
 * - Social login: Google, Facebook, Zalo
 * - OTP mode cho register
 * - Smooth tab switch login ↔ register
 * - Dark mode support
 * - Animated background gradient
 * - Eye toggle cho password
 * - Form validation đơn giản
 */

import { useEffect, useState } from "react";
import {
  X, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight,
  ShieldCheck, Camera, Sparkles, Check, ChevronRight,
} from "lucide-react";
import { useTheme } from "../context";
import { ACCENT } from "../data";

interface AuthModalProps {
  open: boolean;
  initialMode?: "login" | "register";
  onClose: () => void;
}

export default function AuthModal({ open, initialMode = "login", onClose }: AuthModalProps) {
  const { dark } = useTheme();
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<"login" | "register" | null>(null);
  const [agree, setAgree] = useState(false);

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setDone(null);
      setLoading(false);
    }
  }, [open, initialMode]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(mode);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2"
        style={{
          background: dark ? "#0f0f1a" : "#FFFCF8",
          maxHeight: "92vh",
          animation: "authPop 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── LEFT — brand panel ─────────────────────────── */}
        <div
          className="relative hidden md:flex flex-col justify-between p-10 lg:p-12 overflow-hidden"
          style={{
            background: dark
              ? "linear-gradient(135deg, #1c0e08 0%, #2c1409 50%, #0e0810 100%)"
              : "linear-gradient(135deg, #e04f18 0%, #FF6B35 55%, #ff8a4f 100%)",
          }}
        >
          {/* Animated mesh blobs */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                dark
                  ? "radial-gradient(circle at 20% 20%, rgba(255,107,53,0.45) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,107,53,0.35) 0%, transparent 45%)"
                  : "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,200,160,0.35) 0%, transparent 45%)",
            }}
          />
          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Logo + heading */}
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <img
                src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                alt="Máy Ảnh Việt Nam"
                width={180}
                height={36}
                className="h-[36px] w-[180px] object-contain object-left drop-shadow"
              />
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3 drop-shadow-lg">
              {mode === "login" ? "Chào mừng\ntrở lại!" : "Tạo tài khoản\ntrong 30s."}
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-xs">
              {mode === "login"
                ? "Đăng nhập để xem đơn hàng, theo dõi vận chuyển và nhận ưu đãi thành viên độc quyền."
                : "Gia nhập cộng đồng nhiếp ảnh gia. Tích điểm đổi quà, hưởng giá đặc quyền và giao hàng miễn phí."}
            </p>
          </div>

          {/* Value props */}
          <div className="relative z-10 space-y-3 mt-8">
            {[
              { icon: ShieldCheck, text: "Bảo hành chính hãng 24 tháng" },
              { icon: Sparkles,   text: "Tích điểm đổi quà hấp dẫn" },
              { icon: Camera,     text: "Tư vấn kỹ thuật chuyên gia" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-white/95">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)" }}
                >
                  <Icon size={15} className="text-white" />
                </div>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div
            className="relative z-10 rounded-2xl p-4 mt-6"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p className="text-white text-sm italic mb-2 leading-relaxed">
              "Dịch vụ chuyên nghiệp, hỗ trợ nhiệt tình. Mua 3 năm rồi vẫn hài lòng."
            </p>
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
                style={{ background: "#fbbf24", color: "#1c0a00" }}
              >
                MT
              </div>
              <div className="leading-tight">
                <p className="text-white text-xs font-bold">Minh Tuấn</p>
                <p className="text-white/70 text-[10px]">Nhiếp ảnh gia · 2.4k đơn</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — form panel ───────────────────────────── */}
        <div className="relative p-6 sm:p-10 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors z-20"
            aria-label="Đóng"
          >
            <X size={16} />
          </button>

          {/* Mobile logo (chỉ hiện mobile) */}
          <div className="md:hidden flex items-center mb-6">
            <div className="rounded-xl px-3 py-2" style={{ background: ACCENT }}>
              <img
                src="https://mayanhvietnam.com/asset/imgs/img/Logo_white.png"
                alt="Máy Ảnh Việt Nam"
                width={130}
                height={26}
                className="h-[26px] w-[130px] object-contain object-left block"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl mb-6" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}>
            {(["login", "register"] as const).map((t) => (
              <button key={t} onClick={() => { setMode(t); setDone(null); }}
                className="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
                style={
                  mode === t
                    ? {
                        background: dark ? "#1f1f2e" : "#ffffff",
                        color: dark ? "white" : "#1a1008",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      }
                    : { color: "var(--muted-foreground)" }
                }
              >
                {t === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          {done ? (
            /* ── Success state ─────────────────────── */
            <div className="text-center py-10">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background: dark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.12)",
                  border: "2px solid rgba(34,197,94,0.4)",
                }}
              >
                <Check size={36} className="text-green-500" strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-black mb-2">
                {done === "login" ? "Đăng nhập thành công!" : "Tạo tài khoản thành công!"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {done === "login"
                  ? `Chào mừng trở lại, ${email.split("@")[0]}!`
                  : `Chào mừng ${name || "bạn"} đến với Máy Ảnh Việt Nam!`}
              </p>
              <button onClick={onClose}
                className="px-7 py-3 rounded-xl text-white text-sm font-bold flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity"
                style={{ background: ACCENT, boxShadow: `0 4px 16px ${ACCENT}40` }}>
                Khám phá ngay <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {/* Header */}
              <div className="mb-5">
                <h2 className="text-2xl font-black mb-1.5">
                  {mode === "login" ? "Đăng nhập tài khoản" : "Tạo tài khoản mới"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mode === "login"
                    ? "Chưa có tài khoản? "
                    : "Đã có tài khoản? "}
                  <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="font-bold underline-offset-2 hover:underline" style={{ color: ACCENT }}>
                    {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
                  </button>
                </p>
              </div>

              {/* Register-only: name + phone */}
              {mode === "register" && (
                <>
                  <Field icon={User} label="Họ và tên" type="text" placeholder="Nguyễn Văn A"
                    value={name} onChange={setName} required />
                  <Field icon={Phone} label="Số điện thoại" type="tel" placeholder="0937 148 222"
                    value={phone} onChange={setPhone} required />
                </>
              )}

              <Field icon={Mail} label="Email" type="email" placeholder="you@example.com"
                value={email} onChange={setEmail} required />

              <Field icon={Lock} label="Mật khẩu" type={showPwd ? "text" : "password"} placeholder="••••••••"
                value={password} onChange={setPassword} required
                right={
                  <button type="button" onClick={() => setShowPwd((s) => !s)}
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              {/* Login row: remember + forgot */}
              {mode === "login" && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                      className="w-3.5 h-3.5 rounded accent-current" style={{ accentColor: ACCENT }} />
                    <span className="text-muted-foreground">Ghi nhớ đăng nhập</span>
                  </label>
                  <button type="button" className="font-semibold hover:underline" style={{ color: ACCENT }}>
                    Quên mật khẩu?
                  </button>
                </div>
              )}

              {/* Register row: agree */}
              {mode === "register" && (
                <label className="flex items-start gap-2 cursor-pointer select-none text-xs">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded" style={{ accentColor: ACCENT }} />
                  <span className="text-muted-foreground leading-relaxed">
                    Tôi đồng ý với <a href="#" className="font-semibold hover:underline" style={{ color: ACCENT }}>Điều khoản</a> và{" "}
                    <a href="#" className="font-semibold hover:underline" style={{ color: ACCENT }}>Chính sách bảo mật</a> của Máy Ảnh Việt Nam.
                  </span>
                </label>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || (mode === "register" && !agree)}
                className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                style={{ background: ACCENT, boxShadow: `0 6px 20px ${ACCENT}50` }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Hoặc tiếp tục với
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              {/* Social */}
              <div className="grid grid-cols-3 gap-2">
                <SocialButton provider="google" />
                <SocialButton provider="facebook" />
                <SocialButton provider="zalo" />
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes authPop {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── Field sub-component ──────────────────────────────────── */
function Field({
  icon: Icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  right,
}: {
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon size={15} className="absolute left-3 text-muted-foreground pointer-events-none" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full h-11 pl-10 pr-10 text-sm rounded-xl border outline-none focus:border-current transition-colors"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        {right && <div className="absolute right-3">{right}</div>}
      </div>
    </div>
  );
}

/* ── Social button sub-component ───────────────────────────── */
function SocialButton({ provider }: { provider: "google" | "facebook" | "zalo" }) {
  const config: Record<string, { label: string; bg: string; fg: string; logo?: React.ReactNode }> = {
    google:   { label: "Google",   bg: "#ffffff", fg: "#1f1f1f" },
    facebook: { label: "Facebook", bg: "#1877F2", fg: "#ffffff" },
    zalo:     { label: "Zalo",     bg: "#0068FF", fg: "#ffffff" },
  };
  const c = config[provider];
  return (
    <button type="button" className="h-11 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity text-xs font-bold border"
      style={{
        background: c.bg,
        color: c.fg,
        borderColor: provider === "google" ? "rgba(0,0,0,0.08)" : "transparent",
      }}>
      <SocialIcon name={provider} />
      {c.label}
    </button>
  );
}

function SocialIcon({ name }: { name: "google" | "facebook" | "zalo" }) {
  if (name === "google") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.4-.2-2H12v3.9h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.9z"/>
        <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8C4.1 20.6 7.8 23 12 23z"/>
        <path fill="#FBBC05" d="M6 13.4c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2V6.2H2.3C1.5 7.6 1 9.3 1 11.2s.5 3.6 1.3 5l3.7-2.8z"/>
        <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.4 2.1 14.9 1 12 1 7.8 1 4.1 3.4 2.3 6.8L6 9.6c.9-2.5 3.2-4.2 6-4.2z"/>
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M22.7 12c0-5.9-4.8-10.7-10.7-10.7S1.3 6.1 1.3 12c0 5.3 3.9 9.7 9 10.5v-7.4H7.5V12h2.8V9.8c0-2.8 1.7-4.3 4.2-4.3 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.8.8-1.8 1.7V12h3l-.5 3.1h-2.5v7.4c5.1-.8 9-5.2 9-10.5z"/>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C6.5 2 2 6 2 10.9c0 4.7 4.3 8.6 9.9 9 .4 0 1 .3 1.2.7l.3 1.2c.2.7-.5.8-.5.8s-3.4-.5-5-1.5c0 0-.5-.3-.6.3 0 0 0 .4.4.7.4.3 1.5 1 3.6 1.5 0 0 .4.1.2.5l-.3.4s-.2.4.5.3c.7 0 4-.5 7-2.8 2-1.6 4-5.4 4-10C22 6 17.5 2 12 2z"/>
    </svg>
  );
}
