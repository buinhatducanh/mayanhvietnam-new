import { cn, formatVND, calcDiscountPercent } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showInstallment?: boolean;
  installmentMonths?: number;
  showDiscountPercent?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: { price: 'text-base', original: 'text-xs' },
  md: { price: 'text-lg', original: 'text-sm' },
  lg: { price: 'text-2xl', original: 'text-base' },
  xl: { price: 'text-4xl', original: 'text-lg' },
};

export function PriceDisplay({
  price,
  originalPrice,
  size = 'md',
  showInstallment = false,
  installmentMonths = 12,
  showDiscountPercent = true,
  className,
}: PriceDisplayProps) {
  const discountPercent = calcDiscountPercent(price, originalPrice);
  const styles = sizeStyles[size];
  const monthly = Math.round(price / installmentMonths);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            'font-mono font-bold text-white',
            styles.price,
            originalPrice && 'text-primary'
          )}
        >
          {formatVND(price)}
        </span>
        {originalPrice && originalPrice > price && showDiscountPercent && (
          <span className="rounded badge-discount px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
            -{discountPercent}%
          </span>
        )}
      </div>
      {originalPrice && originalPrice > price && (
        <span
          className={cn('text-muted-foreground line-through font-mono', styles.original)}
        >
          {formatVND(originalPrice)}
        </span>
      )}
      {showInstallment && (
        <p className="text-xs text-muted-foreground">
          Hoặc <span className="font-mono font-semibold text-primary">{formatVND(monthly)}</span>/tháng ×{' '}
          {installmentMonths} tháng
        </p>
      )}
    </div>
  );
}
