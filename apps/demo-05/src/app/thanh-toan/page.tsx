'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Banknote, Landmark, Check, ArrowLeft, ShoppingBag, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatVND, cn } from '@/lib/utils';

type Step = 'shipping' | 'payment' | 'confirm' | 'done';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('shipping');
  const [shipping, setShipping] = useState({ name: '', phone: '', address: '', city: '', district: '', note: '' });
  const [payment, setPayment] = useState<'cod' | 'bank' | 'card'>('cod');

  const shippingFee = subtotal >= 5000000 ? 0 : 30000;
  const finalTotal = subtotal + shippingFee;

  const handlePlaceOrder = () => { clearCart(); setStep('done'); };

  if (items.length === 0 && step !== 'done') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-xl font-bold text-foreground mb-2">Không có sản phẩm</h1>
        <Link href="/san-pham" className="text-sm text-primary hover:underline">Tiếp tục mua sắm →</Link>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-success/15 text-success flex items-center justify-center mb-5"><Check className="w-10 h-10" /></div>
        <h1 className="text-2xl font-black text-foreground mb-3">Đặt hàng thành công!</h1>
        <p className="text-sm text-muted-foreground mb-2">Đơn hàng <span className="font-bold text-primary">#{Math.floor(Math.random() * 90000 + 10000)}</span> đang được xử lý.</p>
        <p className="text-xs text-muted-foreground mb-8">Chúng tôi sẽ liên hệ bạn trong 30 phút để xác nhận.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="h-11 px-6 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2 hover:opacity-90" style={{ background: '#2563eb' }}>Về trang chủ</Link>
          <Link href="/san-pham" className="h-11 px-6 rounded-lg bg-card border border-border text-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:border-primary/40">Tiếp tục mua sắm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link><span>/</span>
        <Link href="/gio-hang" className="hover:text-foreground transition-colors">Giỏ hàng</Link><span>/</span>
        <span className="text-foreground">Thanh toán</span>
      </nav>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {(['shipping', 'payment', 'confirm'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors', step === s ? 'text-white' : ['payment', 'confirm'].indexOf(step) > ['shipping', 'payment', 'confirm'].indexOf(s) ? 'bg-success text-white' : 'bg-card border border-border text-muted-foreground')} style={step === s ? { background: '#2563eb' } : {}}>
              {['payment', 'confirm'].indexOf(step) > ['shipping', 'payment', 'confirm'].indexOf(s) ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">{s === 'shipping' ? 'Giao hàng' : s === 'payment' ? 'Thanh toán' : 'Xác nhận'}</span>
            {i < 2 && <div className="w-8 h-px bg-border hidden sm:block" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div>
          {step === 'shipping' && (
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-base font-bold text-foreground mb-5">Thông tin giao hàng</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Họ và tên *</label><input type="text" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" placeholder="Nguyễn Văn A" /></div>
                  <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Số điện thoại *</label><input type="tel" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" placeholder="0912 345 678" /></div>
                </div>
                <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Địa chỉ *</label><input type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" placeholder="Số nhà, đường..." /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Tỉnh / Thành *</label><input type="text" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" placeholder="TP.HCM" /></div>
                  <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Quận / Huyện *</label><input type="text" value={shipping.district} onChange={(e) => setShipping({ ...shipping, district: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" placeholder="Quận 3" /></div>
                </div>
                <div><label className="block text-xs font-semibold text-muted-foreground mb-1.5">Ghi chú</label><textarea value={shipping.note} onChange={(e) => setShipping({ ...shipping, note: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none resize-none" placeholder="Ghi chú đơn hàng..." /></div>
              </div>
              <div className="flex justify-end mt-6"><button onClick={() => setStep('payment')} className="h-11 px-8 rounded-lg text-sm font-bold text-primary-foreground hover:opacity-90" style={{ background: '#2563eb' }}>Tiếp tục</button></div>
            </section>
          )}

          {step === 'payment' && (
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-base font-bold text-foreground mb-5">Phương thức thanh toán</h2>
              <div className="space-y-3">
                {[
                  { key: 'cod' as const, icon: Banknote, title: 'Thanh toán khi nhận hàng (COD)', desc: 'Trả tiền mặt cho shipper' },
                  { key: 'bank' as const, icon: Landmark, title: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản trước khi giao' },
                  { key: 'card' as const, icon: CreditCard, title: 'Thẻ tín dụng / ATM', desc: 'Visa, MasterCard, JCB' },
                ].map((m) => (
                  <label key={m.key} className={cn('flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors', payment === m.key ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground')}>
                    <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0', payment === m.key ? 'border-primary' : 'border-muted-foreground')}>
                      {payment === m.key && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <m.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div><p className="text-sm font-semibold text-foreground">{m.title}</p><p className="text-xs text-muted-foreground">{m.desc}</p></div>
                  </label>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={() => setStep('shipping')} className="h-11 px-6 rounded-lg bg-card border border-border text-muted-foreground font-semibold text-sm hover:border-primary/40 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
                <button onClick={() => setStep('confirm')} className="h-11 px-8 rounded-lg text-sm font-bold text-primary-foreground hover:opacity-90" style={{ background: '#2563eb' }}>Tiếp tục</button>
              </div>
            </section>
          )}

          {step === 'confirm' && (
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-base font-bold text-foreground mb-5">Xác nhận đơn hàng</h2>
              <div className="space-y-4">
                <div className="bg-background rounded-lg p-4 text-sm">
                  <p className="font-semibold text-foreground mb-1">Thông tin giao hàng</p>
                  <p className="text-muted-foreground">{shipping.name || '—'} · {shipping.phone || '—'}</p>
                  <p className="text-muted-foreground">{shipping.address || '—'}, {shipping.district || '...'}, {shipping.city || '...'}</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-sm">
                  <p className="font-semibold text-foreground mb-1">Thanh toán</p>
                  <p className="text-muted-foreground">{payment === 'cod' ? 'COD' : payment === 'bank' ? 'Chuyển khoản' : 'Thẻ tín dụng'}</p>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={`${item.product.id}::${item.variant ?? ''}`} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-elevated shrink-0"><Image src={item.product.thumbnail} alt="" fill sizes="48px" className="object-contain p-0.5" /></div>
                      <div className="flex-1 min-w-0"><p className="text-xs font-medium text-foreground line-clamp-1">{item.product.name}</p><p className="text-[11px] text-muted-foreground">x{item.qty}</p></div>
                      <p className="text-xs font-mono font-bold text-foreground">{formatVND(item.product.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={() => setStep('payment')} className="h-11 px-6 rounded-lg bg-card border border-border text-muted-foreground font-semibold text-sm hover:border-primary/40 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
                <button onClick={handlePlaceOrder} className="h-11 px-8 rounded-lg text-white font-bold text-sm flex items-center gap-2 hover:opacity-90" style={{ background: '#2563eb' }}><Lock className="w-4 h-4" /> Đặt hàng · {formatVND(finalTotal)}</button>
              </div>
            </section>
          )}
        </div>

        <div className="lg:sticky lg:top-28 self-start">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Đơn hàng của bạn</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.product.id}::${item.variant ?? ''}`} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden bg-elevated shrink-0"><Image src={item.product.thumbnail} alt="" fill sizes="56px" className="object-contain p-0.5" /></div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-medium text-foreground line-clamp-1">{item.product.name}</p><p className="text-[11px] text-muted-foreground">x{item.qty}</p></div>
                  <p className="text-xs font-mono font-bold text-primary shrink-0">{formatVND(item.product.price * item.qty)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span className="font-mono text-foreground">{formatVND(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phí ship</span><span className={cn('font-mono', shippingFee === 0 && 'text-success font-semibold')}>{shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between"><span className="font-bold text-foreground">Tổng cộng</span><span className="price-mono text-lg font-black">{formatVND(finalTotal)}</span></div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 px-2">
            <ShieldCheck className="w-4 h-4 text-success shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-tight">Thông tin được bảo mật tuyệt đối.</p>
          </div>
        </div>
      </div>
    </div>
  );
}