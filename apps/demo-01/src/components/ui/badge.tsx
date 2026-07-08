import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'sale' | 'hot' | 'used' | 'instock' | 'outofstock' | 'preorder';

const badgeStyles: Record<BadgeVariant, string> = {
  new:      'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  sale:     'bg-red-500/20 text-red-400 border-red-500/30',
  hot:      'bg-orange-500/20 text-orange-400 border-orange-500/30',
  used:     'bg-purple-500/20 text-purple-400 border-purple-500/30',
  instock:  'bg-accent/20 text-accent border-accent/30',
  outofstock: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  preorder: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

interface BadgeProps {
  variant: BadgeVariant | string;
  label?: string;
  className?: string;
}

export function Badge({ variant, label, className }: BadgeProps) {
  const style = badgeStyles[variant as BadgeVariant] ?? badgeStyles.hot;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold leading-tight tracking-wide uppercase',
        style,
        className
      )}
    >
      {label ?? variant}
    </span>
  );
}
