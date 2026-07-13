import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'new' | 'sale' | 'hot' | 'used' | 'instock' | 'outofstock' | 'preorder' | 'custom' | 'flash';
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const VARIANT_LABELS: Record<string, string> = {
  new: 'Mới',
  sale: 'Giảm giá',
  hot: 'Hot',
  used: 'Đã dùng',
  instock: 'Còn hàng',
  outofstock: 'Hết hàng',
  preorder: 'Đặt trước',
  flash: 'Flash Sale',
};

export function Badge({ variant = 'new', label, size = 'sm', className = '' }: BadgeProps) {
  const displayLabel = label ?? VARIANT_LABELS[variant] ?? variant;

  return (
    <span
      className={[styles.badge, styles[`badge--${variant}`], styles[`badge--${size}`], className]
        .filter(Boolean)
        .join(' ')}
    >
      {variant === 'flash' && <span className={styles.flash_dot} aria-hidden="true" />}
      {displayLabel}
    </span>
  );
}

// Multi-badge display
interface BadgeListProps {
  badges: string[];
  isUsed?: boolean;
  flashSale?: boolean;
  size?: 'sm' | 'md';
  max?: number;
}

export function BadgeList({ badges, isUsed, flashSale, size = 'sm', max = 3 }: BadgeListProps) {
  const allBadges: { label: string; variant: BadgeProps['variant'] }[] = [];

  if (flashSale) allBadges.push({ label: 'Flash Sale', variant: 'flash' });
  if (isUsed) allBadges.push({ label: 'Cũ', variant: 'used' });

  badges.slice(0, max).forEach(b => {
    if (b === 'Chính hãng') allBadges.push({ label: b, variant: 'new' });
    else if (b === 'Flash Sale' || b === 'Giảm giá') allBadges.push({ label: b, variant: 'sale' });
    else if (b === 'Bestseller' || b === 'Hot') allBadges.push({ label: b, variant: 'hot' });
    else allBadges.push({ label: b, variant: 'custom' });
  });

  return (
    <div className={styles.badge_list}>
      {allBadges.slice(0, max).map((badge, i) => (
        <Badge key={i} variant={badge.variant} label={badge.label} size={size} />
      ))}
    </div>
  );
}
