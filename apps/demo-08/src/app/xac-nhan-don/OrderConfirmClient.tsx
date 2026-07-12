'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/data/products';
import styles from './OrderConfirmClient.module.css';

interface OrderData {
  code: string;
  createdAt: string;
  totalAmount: number;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address?: string;
    deliveryMethod: string;
    paymentMethod: string;
  };
  items: Array<{
    product: { name: string };
    quantity: number;
    price: number;
  }>;
}

export function OrderConfirmClient() {
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('last_order');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!codeParam || parsed.code === codeParam) {
          setOrder(parsed);
          return;
        }
      } catch {
        // ignore
      }
    }
    if (codeParam) {
      setOrder({
        code: codeParam,
        createdAt: new Date().toISOString(),
        totalAmount: 18990000,
        customer: {
          fullName: 'Khách hàng Máy Ảnh Việt Nam',
          phone: '0937148222',
          deliveryMethod: 'home',
          paymentMethod: 'cod',
        },
        items: [],
      });
    }
  }, [codeParam]);

  const displayCode = order?.code || codeParam || 'MAV-889922';

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.success_icon}>✓</div>
          <h1 className={styles.title}>Đặt Hàng Thành Công!</h1>
          <p className={styles.subtitle}>
            Cảm ơn bạn đã tin tưởng Máy Ảnh Việt Nam. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
          </p>

          <div className={styles.code_box}>
            <div className={styles.code_label}>Mã đơn hàng của bạn</div>
            <div className={styles.code_val}>{displayCode}</div>
          </div>

          {order && (
            <>
              <div className={styles.info_grid}>
                <div className={styles.info_group}>
                  <span className={styles.info_label}>Người nhận:</span>
                  <span className={styles.info_val}>{order.customer.fullName} — {order.customer.phone}</span>
                </div>
                <div className={styles.info_group}>
                  <span className={styles.info_label}>Hình thức giao:</span>
                  <span className={styles.info_val}>
                    {order.customer.deliveryMethod === 'home' ? 'Giao tận nhà toàn quốc' : 'Nhận tại cửa hàng'}
                  </span>
                </div>
                <div className={styles.info_group}>
                  <span className={styles.info_label}>Thanh toán:</span>
                  <span className={styles.info_val}>
                    {order.customer.paymentMethod === 'cod'
                      ? 'Tiền mặt khi nhận (COD)'
                      : order.customer.paymentMethod === 'banking'
                      ? 'Chuyển khoản Vietcombank/MB'
                      : 'Trả góp 0%'}
                  </span>
                </div>
                <div className={styles.info_group}>
                  <span className={styles.info_label}>Ngày đặt:</span>
                  <span className={styles.info_val}>
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              {order.items.length > 0 && (
                <div className={styles.items_list}>
                  <div className={styles.items_title}>Chi tiết sản phẩm đã mua:</div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className={styles.item_row}>
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className={styles.total_row}>
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              )}
            </>
          )}

          <div className={styles.actions}>
            <Link href="/" className={styles.btn_primary}>
              ← Về Trang Chủ
            </Link>
            <Link href="/danh-muc/may-anh" className={styles.btn_secondary}>
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
