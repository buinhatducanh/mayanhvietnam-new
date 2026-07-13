'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/products';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={styles.drawer} role="dialog" aria-label="Giỏ hàng" aria-modal="true">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.header_title}>
            <CartIcon />
            <h2>Giỏ hàng</h2>
            {itemCount > 0 && <span className={styles.count_badge}>{itemCount}</span>}
          </div>
          <button onClick={closeCart} className={styles.close_btn} aria-label="Đóng giỏ hàng">✕</button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.empty_icon}>🛒</div>
            <h3>Giỏ hàng trống</h3>
            <p>Hãy thêm sản phẩm vào giỏ hàng</p>
            <Link href="/" className={styles.continue_btn} onClick={closeCart}>
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <Link href={`/san-pham/${item.slug}`} onClick={closeCart} className={styles.item_img_link}>
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className={styles.item_img}
                      width={72}
                      height={72}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85';
                      }}
                    />
                  </Link>
                  <div className={styles.item_info}>
                    <Link href={`/san-pham/${item.slug}`} onClick={closeCart} className={styles.item_name}>
                      {item.name}
                    </Link>
                    {item.variantName && (
                      <span className={styles.item_variant}>{item.variantName}</span>
                    )}
                    <div className={styles.item_price_row}>
                      <span className={styles.item_price}>{formatPrice(item.price)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className={styles.item_orig}>{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                    <div className={styles.item_actions}>
                      <div className={styles.qty_control}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.qty_btn}
                          aria-label="Giảm số lượng"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className={styles.qty_value}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.qty_btn}
                          aria-label="Tăng số lượng"
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.remove_btn}
                        aria-label="Xóa khỏi giỏ"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className={styles.summary}>
              <div className={styles.shipping_note}>
                🚚 Miễn phí vận chuyển cho đơn hàng từ <strong>2.000.000đ</strong>
              </div>
              <div className={styles.subtotal_row}>
                <span>Tạm tính ({itemCount} sản phẩm)</span>
                <span className={styles.subtotal}>{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/don-dat-hang"
                className={styles.checkout_btn}
                onClick={closeCart}
              >
                Thanh toán ngay
              </Link>
              <Link href="/gio-hang" className={styles.view_cart_btn} onClick={closeCart}>
                Xem giỏ hàng
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
