import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function StarRating({
  rating,
  count,
  size = 'md',
  showCount = true,
  interactive = false,
  onRate,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={[styles.wrapper, styles[`wrapper--${size}`]].join(' ')}>
      <div className={styles.stars} role="img" aria-label={`${rating} trên 5 sao`}>
        {stars.map(star => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star - 1 < rating;

          return (
            <span
              key={star}
              className={[
                styles.star,
                filled ? styles['star--filled'] : partial ? styles['star--partial'] : styles['star--empty'],
                interactive ? styles['star--interactive'] : '',
              ].filter(Boolean).join(' ')}
              onClick={interactive && onRate ? () => onRate(star) : undefined}
              aria-hidden="true"
            >
              ★
            </span>
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className={styles.count}>({count.toLocaleString('vi-VN')})</span>
      )}
    </div>
  );
}
