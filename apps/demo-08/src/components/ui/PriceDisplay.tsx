import { formatPrice, getDiscountPercent } from '@/data/products';
import styles from './PriceDisplay.module.css';

interface PriceDisplayProps {
  price?: number;
  priceText?: string;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscount?: boolean;
  showInstallment?: boolean;
  installmentMonths?: number;
  className?: string;
  layout?: 'row' | 'column';
}

export function PriceDisplay({
  price = 0,
  priceText,
  originalPrice,
  size = 'md',
  showDiscount = true,
  showInstallment = false,
  installmentMonths = 12,
  className = '',
  layout = 'column',
}: PriceDisplayProps) {
  const hasDiscount = Boolean(price && originalPrice && originalPrice > price);
  const discountPercent = hasDiscount ? getDiscountPercent(price, originalPrice!) : 0;
  const installmentAmount = price > 0 ? Math.round(price / installmentMonths) : 0;

  return (
    <div className={[styles.price_wrap, styles[`price--${layout}`], styles[`price--${size}`], className].filter(Boolean).join(' ')}>
      <div className={styles.price_main}>
        <span className={styles.current}>{formatPrice(price, priceText)}</span>
        {hasDiscount && (
          <>
            <span className={styles.original}>{formatPrice(originalPrice!)}</span>
            {showDiscount && (
              <span className={styles.discount}>-{discountPercent}%</span>
            )}
          </>
        )}
      </div>
      {showInstallment && price > 0 && (
        <div className={styles.installment}>
          Trả góp 0% từ <strong>{formatPrice(installmentAmount)}</strong>/tháng x {installmentMonths} tháng
        </div>
      )}
    </div>
  );
}
