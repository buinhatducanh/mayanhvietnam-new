import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { getFlashSaleProducts } from '@/data/products';
import { currentFlashSale } from '@/data/misc';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './FlashSaleSection.module.css';

export function FlashSaleSection() {
  // Chỉ hiển thị đúng 1 hàng (4 sản phẩm) trên trang chủ
  const flashProducts = getFlashSaleProducts().slice(0, 4);

  return (
    <section className={styles.section} aria-label="Flash Sale">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.header_left}>
            <div className={styles.title_wrap}>
              <div className={styles.flash_icon_wrap}>
                <Zap size={24} fill="currentColor" />
              </div>
              <h2 className={styles.title}>{currentFlashSale.title}</h2>
            </div>
            <p className={styles.subtitle}>Ưu đãi cực shock — Số lượng có hạn mỗi ngày!</p>
          </div>
          <div className={styles.header_right}>
            <span className={styles.ends_label}>⚡ KẾT THÚC SAU:</span>
            <CountdownTimer targetDate={currentFlashSale.endTime} size="md" />
          </div>
        </div>

        <div className={styles.products_scroll}>
          <div className={styles.products_inner}>
            {flashProducts.map((product, idx) => (
              <div key={product.id} className={styles.product_col}>
                <ProductCard product={product} priority={idx < 4} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.view_all}>
          <Link href="/danh-muc/san-pham-flash-sale" className={styles.view_all_btn} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '15px',
            textDecoration: 'none',
            boxShadow: '0 6px 20px rgba(234, 88, 12, 0.25)'
          }}>
            <span>Xem tất cả Flash Sale</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
