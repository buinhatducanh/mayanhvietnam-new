'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product, formatPrice, getDiscountPercent } from '@/data/products';
import { BadgeList } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  showQuickView?: boolean;
  priority?: boolean;
}

export function ProductCard({ product, layout = 'grid', priority = false }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const displayPrice = product.flashSalePrice ?? product.price;
  const discountPercent = product.originalPrice && product.price > 0
    ? getDiscountPercent(displayPrice, product.originalPrice)
    : 0;

  const isCallToOrder = !displayPrice || displayPrice === 0;

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isCallToOrder) {
      addItem(product);
    } else {
      window.location.href = 'tel:0937148222';
    }
  }, [addItem, product, isCallToOrder]);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  }, [toggle, product.id]);

  if (layout === 'list') {
    return (
      <article className={styles.card_list}>
        <Link href={`/san-pham/${product.slug}`} className={styles.list_img_link}>
          <img
            src={product.thumbnail}
            alt={product.name}
            className={styles.list_img}
            width={140}
            height={140}
            loading={priority ? 'eager' : 'lazy'}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85';
            }}
          />
        </Link>
        <div className={styles.list_info}>
          <div>
            <BadgeList badges={product.badges} isUsed={product.isUsed} flashSale={product.flashSale} />
            <Link href={`/san-pham/${product.slug}`} className={styles.list_name}>{product.name}</Link>
            <StarRating rating={product.rating.average} count={product.rating.count} size="sm" />
            <p className={styles.list_desc}>{product.shortDescription}</p>
          </div>
          <div className={styles.list_actions}>
            <div>
              <div className={styles.price_main}>{formatPrice(displayPrice, product.priceText)}</div>
              {product.originalPrice && product.originalPrice > displayPrice && product.price > 0 && (
                <div className={styles.price_orig}>{formatPrice(product.originalPrice)}</div>
              )}
            </div>
            {isCallToOrder ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className={styles.add_btn}
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: 'white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                📞 Gọi Mua Ngay
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className={[styles.add_btn, inCart ? styles.add_btn_active : ''].filter(Boolean).join(' ')}
                aria-label={inCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
              >
                {inCart ? '✓ Đã thêm' : 'Thêm vào giỏ'}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.card} itemScope itemType="https://schema.org/Product">
      <Link href={`/san-pham/${product.slug}`} className={styles.img_link} tabIndex={-1}>
        <div className={styles.img_wrap}>
          <img
            src={product.thumbnail}
            alt={product.name}
            className={styles.img}
            width={300}
            height={300}
            itemProp="image"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85';
            }}
          />
          {/* Availability overlay */}
          {product.availability === 'out_of_stock' && (
            <div className={styles.sold_out}>Hết hàng</div>
          )}
          {product.availability === 'pre_order' && (
            <div className={styles.pre_order}>Đặt trước</div>
          )}
          {/* Hover overlay */}
          <div className={styles.hover_overlay}>
            {isCallToOrder ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className={styles.quick_add}
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: 'white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                📞 Gọi hotline: 0937.148.222
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className={styles.quick_add}
                aria-label="Thêm vào giỏ hàng nhanh"
                disabled={product.availability === 'out_of_stock'}
              >
                🛒 Thêm vào giỏ
              </button>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className={styles.badges}>
          <BadgeList
            badges={product.badges}
            isUsed={product.isUsed}
            flashSale={product.flashSale}
            max={2}
          />
          {discountPercent > 0 && (
            <span className={styles.discount_badge}>-{discountPercent}%</span>
          )}
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        className={[styles.wishlist_btn, inWishlist ? styles.wishlist_active : ''].filter(Boolean).join(' ')}
        onClick={handleWishlist}
        aria-label={inWishlist ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
      >
        {inWishlist ? '♥' : '♡'}
      </button>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.info_top}>
          <div className={styles.brand} itemProp="brand">{product.brand}</div>
          <Link href={`/san-pham/${product.slug}`} className={styles.name} itemProp="name">
            {product.name}
          </Link>
        </div>
        <div className={styles.info_bottom}>
          <StarRating rating={product.rating.average} count={product.rating.count} size="sm" />
          <div className={styles.price_row} itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="VND" />
            <span className={styles.price} itemProp="price" content={String(displayPrice)}>
              {formatPrice(displayPrice, product.priceText)}
            </span>
            {product.originalPrice && product.originalPrice > displayPrice && product.price > 0 && (
              <span className={styles.original_price}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {isCallToOrder ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className={styles.add_to_cart}
              style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: 'white',
                textAlign: 'center',
                display: 'block',
                fontWeight: 700,
                width: '100%'
              }}
            >
              📞 Gọi Mua / Tư Vấn Ngay
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className={[styles.add_to_cart, inCart ? styles.in_cart : ''].filter(Boolean).join(' ')}
              disabled={product.availability === 'out_of_stock'}
              aria-label={product.availability === 'out_of_stock' ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
            >
              {product.availability === 'out_of_stock' ? 'Hết hàng' : inCart ? '✓ Đã thêm' : '+ Thêm vào giỏ'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
