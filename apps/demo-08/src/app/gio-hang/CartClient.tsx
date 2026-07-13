'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import styles from './CartClient.module.css';

export function CartClient() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME100') {
      setDiscount(100000);
      setCouponMsg('✓ Giảm 100.000đ cho đơn hàng');
    } else if (code === 'VIP500') {
      setDiscount(500000);
      setCouponMsg('✓ Giảm 500.000đ thành viên VIP');
    } else {
      setDiscount(0);
      setCouponMsg('❌ Mã không hợp lệ (Thử WELCOME100)');
    }
  };

  const finalAmount = Math.max(0, subtotal - discount);

  if (items.length === 0) {
    return (
      <div className={styles.wrap}>
        <div className="container">
          <div className={styles.empty_wrap}>
            <div className={styles.empty_icon}>🛒</div>
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy khám phá hàng ngàn thiết bị nhiếp ảnh chính hãng với ưu đãi tốt nhất ngay hôm nay!</p>
            <Link href="/danh-muc/may-anh" className={styles.continue_btn}>
              Khám phá sản phẩm ngay →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className="container">
        <h1 className={styles.title}>Giỏ Hàng Của Bạn ({itemCount} sản phẩm)</h1>

        <div className={styles.layout}>
          {/* Danh sách sản phẩm */}
          <div className={styles.items_card}>
            <div className={styles.items_header}>
              <span className={styles.items_count}>Sản phẩm trong giỏ</span>
              <button onClick={clearCart} className={styles.clear_btn}>
                ✕ Xóa tất cả
              </button>
            </div>

            {items.map(item => (
              <div key={item.id} className={styles.item_row}>
                <Link href={`/san-pham/${item.slug}`} className={styles.item_img_wrap}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className={styles.item_img}
                  />
                </Link>

                <div className={styles.item_info}>
                  <Link href={`/san-pham/${item.slug}`} className={styles.item_name}>
                    {item.name}
                  </Link>
                  {item.variantName && (
                    <span className={styles.item_variant}>{item.variantName}</span>
                  )}
                  <div className={styles.item_price_unit}>{formatPrice(item.price)}</div>
                </div>

                <div className={styles.qty_group}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.qty_btn}
                    aria-label="Giảm"
                  >
                    −
                  </button>
                  <span className={styles.qty_val}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.qty_btn}
                    aria-label="Tăng"
                  >
                    +
                  </button>
                </div>

                <div className={styles.item_total}>
                  {formatPrice(item.price * item.quantity)}
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.remove_btn}
                  aria-label="Xóa sản phẩm"
                  title="Xóa"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Tóm tắt thanh toán */}
          <div className={styles.summary_card}>
            <h2 className={styles.summary_title}>Tóm tắt đơn hàng</h2>

            <div className={styles.summary_row}>
              <span>Tạm tính ({itemCount} món):</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className={styles.summary_row}>
              <span>Phí vận chuyển:</span>
              <strong style={{ color: '#16a34a' }}>Miễn phí toàn quốc</strong>
            </div>

            {discount > 0 && (
              <div className={styles.summary_row}>
                <span>Giảm giá từ mã:</span>
                <strong style={{ color: '#dc2626' }}>-{formatPrice(discount)}</strong>
              </div>
            )}

            {/* Mã giảm giá */}
            <div style={{ marginTop: '16px' }}>
              <div className={styles.coupon_box}>
                <input
                  type="text"
                  placeholder="Nhập mã (WELCOME100)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className={styles.coupon_input}
                />
                <button onClick={handleApplyCoupon} className={styles.coupon_btn}>
                  Áp dụng
                </button>
              </div>
              {couponMsg && (
                <div
                  style={{
                    fontSize: '12px',
                    color: discount > 0 ? '#16a34a' : '#dc2626',
                    marginBottom: '12px',
                  }}
                >
                  {couponMsg}
                </div>
              )}
            </div>

            <div className={styles.summary_row_total}>
              <span>Tổng thanh toán:</span>
              <span className={styles.summary_total_price}>{formatPrice(finalAmount)}</span>
            </div>

            <Link href="/don-dat-hang" className={styles.checkout_btn}>
              Tiến Hành Thanh Toán →
            </Link>

            <div className={styles.trust_list}>
              <div className={styles.trust_item}>🛡️ Bảo mật thanh toán SSL 256-bit</div>
              <div className={styles.trust_item}>📦 Kiểm tra hàng trước khi thanh toán</div>
              <div className={styles.trust_item}>🔄 Đổi trả miễn phí trong 7 ngày</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
