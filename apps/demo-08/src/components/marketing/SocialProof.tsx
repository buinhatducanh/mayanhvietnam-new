'use client';

import { reviews, reviewStats } from '@/data/reviews';
import { brands } from '@/data/misc';
import { StarRating } from '@/components/ui/StarRating';
import { Users, PackageCheck, Star, Store, ShoppingBag, CheckCircle2 } from 'lucide-react';
import styles from './SocialProof.module.css';

export function SocialProof() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* Stats */}
        <div className={styles.stats_row}>
          {[
            { value: reviewStats.totalCustomers.toLocaleString('vi-VN'), label: 'Khách hàng tin tưởng', icon: <Users size={28} color="#0d6efd" /> },
            { value: reviewStats.totalOrders.toLocaleString('vi-VN'), label: 'Đơn hàng thành công', icon: <PackageCheck size={28} color="#10b981" /> },
            { value: `${reviewStats.averageRating}/5`, label: 'Đánh giá trung bình', icon: <Star size={28} color="#f59e0b" fill="#f59e0b" /> },
            { value: '4+', label: 'Cửa hàng toàn quốc', icon: <Store size={28} color="#8b5cf6" /> },
          ].map(stat => (
            <div key={stat.label} className={styles.stat_item}>
              <span className={styles.stat_icon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</span>
              <span className={styles.stat_value}>{stat.value}</span>
              <span className={styles.stat_label}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className={styles.reviews_header}>
          <h2 className={styles.reviews_title}>Khách hàng nói gì về chúng tôi</h2>
          <div className={styles.overall_rating}>
            <StarRating rating={reviewStats.averageRating} size="lg" showCount={false} />
            <span className={styles.rating_text}>{reviewStats.averageRating}/5</span>
            <span className={styles.reviews_total}>({reviewStats.totalReviews.toLocaleString('vi-VN')} đánh giá)</span>
          </div>
        </div>

        <div className={styles.reviews_grid}>
          {reviews.slice(0, 6).map(review => (
            <div key={review.id} className={styles.review_card}>
              <div className={styles.review_header}>
                <img
                  src={review.avatar}
                  alt={review.authorName}
                  className={styles.avatar}
                  width={44}
                  height={44}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.authorName)}&background=FFF7ED&color=EA580C&bold=true`;
                  }}
                />
                <div>
                  <div className={styles.reviewer_name}>{review.authorName}</div>
                  <StarRating rating={review.rating} size="sm" showCount={false} />
                </div>
                {review.verified && (
                  <span className={styles.verified_badge} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} color="#10b981" /> Đã xác thực
                  </span>
                )}
              </div>
              <p className={styles.review_text}>&ldquo;{review.comment}&rdquo;</p>
              <div className={styles.review_product} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShoppingBag size={15} color="#6b7280" /> {review.productPurchased}
              </div>
              <div className={styles.review_date}>{new Date(review.date).toLocaleDateString('vi-VN')}</div>
            </div>
          ))}
        </div>

        {/* Brands */}
        <div className={styles.brands_section}>
          <h3 className={styles.brands_title}>Thương hiệu uy tín phân phối</h3>
          <div className={styles.brands_grid}>
            {brands.slice(0, 8).map(brand => (
              <div key={brand.id} className={styles.brand_item}>
                <span className={styles.brand_name}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
