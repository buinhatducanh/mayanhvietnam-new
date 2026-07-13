import { useState } from 'react';
import type { CartItem, Page } from '../types';
import { formatPrice } from '../data';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQty: (productId: number, delta: number) => void;
  onRemove: (productId: number) => void;
  onNavigate: (page: Page) => void;
}

const steps = ['Kiểm tra giỏ hàng', 'Thông tin giao hàng', 'Xác nhận thanh toán'] as const;
type Step = 0 | 1 | 2 | 3;

const shippingMethods = [
  { id: 'standard', label: 'Giao hàng Tiêu chuẩn', desc: 'Từ 2–4 ngày làm việc', price: 0, note: 'Miễn phí vận chuyển cho đơn hàng từ 5.000.000₫' },
  { id: 'express', label: 'Giao hàng Hỏa tốc (Express)', desc: 'Từ 1–2 ngày nhận ngay', price: 50000, note: 'Cam kết giao nhanh trong ngày tại nội thành TP.HCM & Hà Nội' },
  { id: 'sameday', label: 'Nhận tại Showroom cửa hàng', desc: 'Hàng sẵn sàng sau 30 phút', price: 0, note: 'Nhân viên hỗ trợ setup và dán cường lực máy trực tiếp' },
];

const paymentMethods = [
  { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: '💵', desc: 'Kiểm tra máy ảnh chuẩn chỉnh rồi mới thanh toán tiền mặt' },
  { id: 'bank', label: 'Chuyển khoản Ngân hàng (Qua mã QR)', icon: '🏦', desc: 'Hệ thống tự động duyệt đơn ngay lập tức sau khi quét mã QR thành công' },
  { id: 'installment', label: 'Trả góp qua thẻ tín dụng / HomePayLater', icon: '💳', desc: 'Hỗ trợ trả góp lãi suất 0% kỳ hạn linh hoạt đến 12 tháng' },
];

export default function CartPage({ cart, onUpdateQty, onRemove, onNavigate }: CartPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Khởi tạo các trường Form Việt hóa
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const activeShip = shippingMethods.find(s => s.id === shippingMethod);
  const shippingFee = activeShip ? activeShip.price : 0;
  const total = subtotal + shippingFee;

  if (cart.length === 0 && currentStep !== 3) {
    return (
      <div className="bg-cream min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto px-4 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <span className="text-5xl block mb-4">🛒</span>
          <h2 className="text-xl font-bold text-navy mb-1.5">Giỏ hàng của bạn đang trống</h2>
          <p className="text-sm text-gray-400 mb-6">Bạn chưa thêm bất kỳ thiết bị máy ảnh hay phụ kiện nào.</p>
          <button
            onClick={() => onNavigate('plp')}
            className="bg-orange hover:bg-orange-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-orange/20"
          >
            Tiếp tục mua sắm ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Progress Tracker Steps */}
        <div className="max-w-2xl mx-auto mb-10 relative flex justify-between items-center">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          {steps.map((step, idx) => (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                currentStep === idx
                  ? 'bg-orange border-orange text-white ring-4 ring-orange/10 scale-110'
                  : currentStep > idx
                    ? 'bg-navy border-navy text-white'
                    : 'bg-white border-gray-200 text-gray-400'
              }`}>
                {currentStep > idx ? '✓' : idx + 1}
              </div>
              <span className={`text-[11px] font-bold mt-2 whitespace-nowrap hidden sm:block ${currentStep === idx ? 'text-orange font-black' : 'text-navy/70'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Main Process Area */}
        {currentStep === 3 ? (
          <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm animate-fade-in">
            <span className="text-5xl block mb-4">🎉</span>
            <h2 className="text-xl font-extrabold text-navy mb-2">Đặt hàng thành công!</h2>
            <p className="text-xs text-gray-500 mb-1">Mã số đơn hàng: <span className="font-bold text-navy">#MAVN-20260709</span></p>
            <p className="text-xs text-gray-400 mb-6 px-4">Cảm ơn bạn đã tin tưởng Máy Ảnh Việt Nam. Chuyên viên của chúng tôi sẽ gọi điện xác nhận đơn hàng sớm nhất trong vòng 10 phút.</p>
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-navy hover:bg-navy-light text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-md"
            >
              Quay lại Trang chủ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Interaction Column */}
            <div className="lg:col-span-8 space-y-6">
              {currentStep === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-navy border-b border-gray-50 pb-3">Sản phẩm trong giỏ hàng</h2>
                  <div className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <div key={item.product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0 items-center">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover border border-gray-100 rounded-lg bg-cream/20 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-navy truncate">{item.product.name}</h4>
                          <p className="text-[11px] font-semibold text-gray-400 mt-0.5">Phiên bản: {item.variant || 'Mặc định'}</p>
                          <span className="text-sm font-bold text-orange block mt-1">{formatPrice(item.product.price)}</span>
                        </div>
                        {/* Bộ đếm số lượng */}
                        <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-cream/10">
                          <button onClick={() => onUpdateQty(item.product.id, -1)} className="px-2.5 py-1 text-gray-500 font-bold text-sm hover:bg-gray-50">-</button>
                          <span className="px-3 py-1 text-xs font-bold text-navy min-w-[28px] text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.product.id, 1)} className="px-2.5 py-1 text-gray-500 font-bold text-sm hover:bg-gray-50">+</button>
                        </div>
                        <button onClick={() => onRemove(item.product.id)} className="text-gray-300 hover:text-rose-500 text-sm p-1.5 transition-colors">🗑️</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
                  <h2 className="text-lg font-bold text-navy border-b border-gray-50 pb-3">Thông tin người nhận đơn hàng</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Họ và tên khách hàng *" placeholder="Ví dụ: Nguyễn Văn A" value={fullName} onChange={setFullName} />
                    <FormField label="Số điện thoại nhận hàng *" placeholder="Ví dụ: 0937xxxxxx" value={phone} onChange={setPhone} />
                    <FormField label="Địa chỉ Email (Nhận hóa đơn)" placeholder="khachhang@gmail.com" value={email} onChange={setEmail} />
                    <FormField label="Tỉnh / Thành phố *" placeholder="Ví dụ: TP. Hồ Chí Minh" value={city} onChange={setCity} />
                    <FormField label="Địa chỉ nhà cụ thể (Số nhà, Tên đường, Phường/Xã) *" placeholder="Số 123 đường X, Phường Y..." value={address} onChange={setAddress} className="sm:col-span-2" />
                    <FormField label="Ghi chú đơn hàng (Nếu có)" placeholder="Ví dụ: Giao ngoài giờ hành chính, gọi trước khi đến..." value={notes} onChange={setNotes} className="sm:col-span-2" />
                  </div>

                  {/* Phương thức giao hàng */}
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-navy uppercase tracking-wider mb-3.5">Hình thức vận chuyển giao hàng</h3>
                    <div className="space-y-2.5">
                      {shippingMethods.map(method => (
                        <label
                          key={method.id}
                          className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${shippingMethod === method.id ? 'border-orange bg-orange/5 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                        >
                          <input
                            type="radio"
                            name="ship-method"
                            checked={shippingMethod === method.id}
                            onChange={() => setShippingMethod(method.id)}
                            className="mt-1 text-orange focus:ring-orange w-4 h-4"
                          />
                          <div className="flex-1 text-xs">
                            <div className="flex items-center justify-between font-bold text-navy text-sm">
                              <span>{method.label}</span>
                              <span className="text-orange">{method.price === 0 ? 'Miễn phí' : formatPrice(method.price)}</span>
                            </div>
                            <p className="text-gray-500 mt-0.5 font-medium">{method.desc}</p>
                            <p className="text-[10px] text-gray-400 mt-1 font-medium">{method.note}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
                  <h2 className="text-lg font-bold text-navy border-b border-gray-50 pb-3">Chọn phương thức thanh toán</h2>
                  <div className="space-y-3">
                    {paymentMethods.map(pm => (
                      <label
                        key={pm.id}
                        className={`flex items-start gap-3.5 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === pm.id ? 'border-orange bg-orange/5 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                      >
                        <input
                          type="radio"
                          name="pay-method"
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="mt-1 text-orange focus:ring-orange w-4 h-4"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-navy text-sm flex items-center gap-1.5">
                            <span>{pm.icon}</span>
                            <span>{pm.label}</span>
                          </div>
                          <p className="text-gray-500 mt-1 leading-normal font-medium">{pm.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Điều khiển lùi tiến trang */}
              <div className="flex items-center justify-between pt-2">
                {currentStep > 0 ? (
                  <button
                    onClick={() => setCurrentStep(s => (s - 1) as Step)}
                    className="border border-gray-200 hover:border-navy text-navy font-bold text-xs px-5 py-3 rounded-xl transition-colors bg-white"
                  >
                    ← Quay lại bước trước
                  </button>
                ) : (
                  <button onClick={() => onNavigate('plp')} className="text-xs font-bold text-gray-500 hover:text-orange transition-colors">
                    ← Tiếp tục xem sản phẩm khác
                  </button>
                )}

                <button
                  onClick={() => {
                    if (currentStep === 1 && (!fullName || !phone || !address || !city)) {
                      alert('Vui lòng điền đầy đủ các trường thông tin có dấu (*) bắt buộc.');
                      return;
                    }
                    setCurrentStep(s => (s + 1) as Step);
                  }}
                  className="bg-orange hover:bg-orange-dark text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-orange/20"
                >
                  {currentStep === 2 ? 'Xác nhận đặt đơn hàng ✓' : 'Tiếp tục xử lý đơn →'}
                </button>
              </div>
            </div>

            {/* Right Invoice Column */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-navy text-base border-b border-gray-50 pb-2.5">Tóm tắt đơn hàng</h3>
                <div className="text-xs space-y-2.5 border-b border-gray-50 pb-3.5 font-medium text-gray-500">
                  <div className="flex justify-between">
                    <span>Tổng tiền sản phẩm ({cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm)</span>
                    <span className="text-navy font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển giao hàng</span>
                    <span className="text-navy font-bold">{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
                  </div>
                  {shippingMethod === 'standard' && subtotal >= 5000000 && (
                    <div className="flex justify-between text-emerald-500 font-bold text-[11px]">
                      <span>Ưu đãi miễn phí vận chuyển</span>
                      <span>-0₫</span>
                    </div>
                  )}
                </div>

                <div className="pt-1 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-navy">Thành tiền (Tổng hóa đơn)</span>
                    <span className="text-xl font-black text-orange">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 space-y-2">
                  {[
                    '🛡️ Hệ thống bảo mật thông tin SSL tuyệt đối.',
                    '✅ Cam kết sản phẩm phân phối 100% chính hãng.',
                    '🔄 Chính sách đổi trả linh hoạt 1 đổi 1 nếu lỗi.',
                  ].map(trust => (
                    <p key={trust} className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">{trust}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  className = '',
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-navy mb-1.5">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-navy placeholder:text-gray-400 outline-none focus:border-orange transition-colors bg-cream/10"
      />
    </div>
  );
}