'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import { stores } from '@/data/stores';
import styles from './CheckoutClient.module.css';

export function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    deliveryMethod: 'home' as 'home' | 'store',
    storeId: stores[0]?.id || 'store-1',
    paymentMethod: 'cod' as 'cod' | 'banking' | 'installment',
  });

  const [error, setError] = useState('');

  const handleInputChange = (field: string, val: string) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) {
      setError('Vui lòng nhập họ tên và số điện thoại để tiếp tục.');
      return;
    }
    if (form.deliveryMethod === 'home' && !form.address) {
      setError('Vui lòng nhập địa chỉ nhận hàng.');
      return;
    }

    const orderCode = `MAV-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      code: orderCode,
      createdAt: new Date().toISOString(),
      items: items.map(item => ({
        product: { name: item.name },
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: subtotal,
      customer: form,
    };

    localStorage.setItem('last_order', JSON.stringify(orderData));
    clearCart();

    router.push(`/xac-nhan-don?code=${orderCode}`);
  };

  if (items.length === 0) {
    return (
      <div className={styles.wrap}>
        <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Giỏ hàng đang trống</h2>
          <p style={{ margin: '16px 0', color: '#737373' }}>
            Vui lòng chọn sản phẩm trước khi vào trang đặt hàng.
          </p>
          <a
            href="/danh-muc/may-anh"
            style={{
              display: 'inline-block',
              background: '#f97316',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontWeight: 700,
            }}
          >
            Quay lại mua sắm →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className="container">
        <h1 className={styles.title}>Đơn Đặt Hàng & Thanh Toán</h1>

        <form onSubmit={handleSubmit} className={styles.layout}>
          {/* Thông tin Khách hàng */}
          <div>
            <div className={styles.form_section}>
              <h2 className={styles.section_title}><span>👤</span> 1. Thông Tin Khách Hàng</h2>
              <div className={styles.grid_2}>
                <div className={styles.field}>
                  <label className={styles.label}>Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={form.fullName}
                    onChange={e => handleInputChange('fullName', e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0937 xxx xxx"
                    value={form.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email nhận thông tin đơn hàng</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Hình thức giao hàng */}
            <div className={styles.form_section}>
              <h2 className={styles.section_title}><span>🚚</span> 2. Hình Thức Nhận Hàng</h2>

              <div className={styles.radio_grid} style={{ marginBottom: '16px' }}>
                <label className={[styles.radio_item, form.deliveryMethod === 'home' ? styles.radio_active : ''].join(' ')}>
                  <input
                    type="radio"
                    name="delivery"
                    checked={form.deliveryMethod === 'home'}
                    onChange={() => handleInputChange('deliveryMethod', 'home')}
                    className={styles.radio_input}
                  />
                  <div className={styles.radio_label}>
                    <span className={styles.radio_title}>Giao hàng tận nơi toàn quốc</span>
                    <span className={styles.radio_desc}>Miễn phí vận chuyển cho tất cả đơn máy ảnh & ống kính</span>
                  </div>
                </label>

                <label className={[styles.radio_item, form.deliveryMethod === 'store' ? styles.radio_active : ''].join(' ')}>
                  <input
                    type="radio"
                    name="delivery"
                    checked={form.deliveryMethod === 'store'}
                    onChange={() => handleInputChange('deliveryMethod', 'store')}
                    className={styles.radio_input}
                  />
                  <div className={styles.radio_label}>
                    <span className={styles.radio_title}>Nhận tại chi nhánh cửa hàng</span>
                    <span className={styles.radio_desc}>Kiểm tra máy trực tiếp, hỗ trợ dán màn hình miễn phí</span>
                  </div>
                </label>
              </div>

              {form.deliveryMethod === 'home' ? (
                <div className={styles.field}>
                  <label className={styles.label}>Địa chỉ giao hàng đầy đủ *</label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                    value={form.address}
                    onChange={e => handleInputChange('address', e.target.value)}
                    className={styles.input}
                  />
                </div>
              ) : (
                <div className={styles.field}>
                  <label className={styles.label}>Chọn chi nhánh bạn đến nhận *</label>
                  <select
                    value={form.storeId}
                    onChange={e => handleInputChange('storeId', e.target.value)}
                    className={styles.select}
                  >
                    {stores.map(store => (
                      <option key={store.id} value={store.id}>
                        {store.name} — {store.address}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className={styles.field} style={{ marginTop: '12px' }}>
                <label className={styles.label}>Ghi chú đơn hàng (tuỳ chọn)</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Giao giờ hành chính, cần xuất hóa đơn VAT..."
                  value={form.note}
                  onChange={e => handleInputChange('note', e.target.value)}
                  className={styles.textarea}
                />
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className={styles.form_section}>
              <h2 className={styles.section_title}><span>💳</span> 3. Phương Thức Thanh Toán</h2>

              <div className={styles.radio_grid}>
                <label className={[styles.radio_item, form.paymentMethod === 'cod' ? styles.radio_active : ''].join(' ')}>
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === 'cod'}
                    onChange={() => handleInputChange('paymentMethod', 'cod')}
                    className={styles.radio_input}
                  />
                  <div className={styles.radio_label}>
                    <span className={styles.radio_title}>Thanh toán tiền mặt khi nhận hàng (COD)</span>
                    <span className={styles.radio_desc}>Kiểm tra hàng chính hãng trước khi thanh toán</span>
                  </div>
                </label>

                <label className={[styles.radio_item, form.paymentMethod === 'banking' ? styles.radio_active : ''].join(' ')}>
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === 'banking'}
                    onChange={() => handleInputChange('paymentMethod', 'banking')}
                    className={styles.radio_input}
                  />
                  <div className={styles.radio_label}>
                    <span className={styles.radio_title}>Chuyển khoản Vietcombank / MBBank (Giảm thêm 1%)</span>
                    <span className={styles.radio_desc}>Hệ thống tự động xác nhận qua mã QR nhanh chóng</span>
                  </div>
                </label>

                <label className={[styles.radio_item, form.paymentMethod === 'installment' ? styles.radio_active : ''].join(' ')}>
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === 'installment'}
                    onChange={() => handleInputChange('paymentMethod', 'installment')}
                    className={styles.radio_input}
                  />
                  <div className={styles.radio_label}>
                    <span className={styles.radio_title}>Trả góp 0% qua thẻ tín dụng / CCCD</span>
                    <span className={styles.radio_desc}>Hỗ trợ HD Saison, Home Credit, Visa/Mastercard</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className={styles.summary_box}>
            <h2 className={styles.section_title}>Đơn Hàng ({items.length} sản phẩm)</h2>

            <div className={styles.order_items}>
              {items.map(item => (
                <div key={item.id} className={styles.order_item}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className={styles.order_img}
                  />
                  <div className={styles.order_info}>
                    <div className={styles.order_name}>{item.name}</div>
                    <div className={styles.order_qty}>SL: {item.quantity}</div>
                  </div>
                  <div className={styles.order_price}>{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span>Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span>Phí vận chuyển:</span>
                <strong style={{ color: '#16a34a' }}>Miễn phí</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#f97316' }}>
                <span>Tổng cộng:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '8px', fontSize: '13px', marginTop: '12px' }}>
                {error}
              </div>
            )}

            <button type="submit" className={styles.submit_btn}>
              HOÀN TẤT ĐẶT HÀNG →
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#737373', marginTop: '12px' }}>
              Bằng việc đặt hàng, bạn đồng ý với chính sách bảo hành & đổi trả của Máy Ảnh Việt Nam.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
