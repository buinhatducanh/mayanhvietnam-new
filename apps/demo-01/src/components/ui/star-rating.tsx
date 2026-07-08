import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  count,
  size = 'sm',
  showCount = true,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: { star: 'h-3 w-3', text: 'text-xs' },
    md: { star: 'h-4 w-4', text: 'text-sm' },
    lg: { star: 'h-5 w-5', text: 'text-base' },
  };

  const filled = Math.floor(rating);
  const half = rating - filled >= 0.5;

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex" aria-label={`${rating} sao`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-primary">
            {i < filled ? (
              <Star className={cn(sizes[size].star, 'fill-primary')} />
            ) : i === filled && half ? (
              <StarHalf className={cn(sizes[size].star, 'fill-primary')} />
            ) : (
              <Star className={cn(sizes[size].star, 'text-muted-foreground/40')} />
            )}
          </span>
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className={cn('text-muted-foreground', sizes[size].text)}>({count})</span>
      )}
    </div>
  );
}