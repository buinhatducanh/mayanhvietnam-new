'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ShieldCheck, Wrench, Truck, RotateCcw, MapPin } from 'lucide-react';
import { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { StarRating } from '@/components/ui/StarRating';
import { BadgeList } from '@/components/ui/Badge';
import styles from './ProductDetailClient.module.css';

/* Logo Zalo chuẩn xác */
const ZaloLogoSvg = () => (
  <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#0068FF" />
    <path d="M11 13.5H18.5L11.5 22.5H19M23 13.5V23M23 18.5H27M27 13.5V23" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Logo Facebook Messenger chuẩn sắc nét */
const MessengerLogoSvg = () => (
  <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#0084FF" />
    <path d="M10 21.5L14.5 16.5L18 19L24.5 13L20 18L16.5 15.5L10 21.5Z" fill="white" />
  </svg>
);

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addItem, isInCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews'>('description');

  const inCart = isInCart(product.id, selectedVariant);
  const inWishlist = isInWishlist(product.id);
  const currentVariant = product.variants?.find(v => v.id === selectedVariant);

  const displayPrice = currentVariant?.price ?? product.flashSalePrice ?? product.price;
  const displayOriginal = currentVariant?.originalPrice ?? product.originalPrice;
  const isCallToOrder = !displayPrice || displayPrice === 0 || !!product.priceText;

  // FIX LẠI ĐOẠN NÀY: Gom ảnh thumbnail và toàn bộ ảnh góc quay một cách chuẩn xác, loại bỏ url trống rỗng
  const images = [
    product.thumbnail,
    ...(product.images?.map(img => img.url) || [])
  ].filter((url, index, self) => Boolean(url) && self.indexOf(url) === index);

  const handleAddToCart = useCallback(() => {
    if (isCallToOrder) {
      window.location.href = 'tel:0937148222';
      return;
    }
    addItem(product, qty, selectedVariant);
  }, [addItem, product, qty, selectedVariant, isCallToOrder]);

  return (
    <div className={styles.wrap}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumb_link}>Trang chủ</Link>
          <span>›</span>
          <Link href={`/danh-muc/${product.categorySlug}`}>{product.categoryName}</Link>
          <span>›</span>
          <span className={styles.bc_current}>{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className={styles.product_main}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.main_img_wrap}>
              <img
                src={images[activeImage] || product.thumbnail}
                alt={product.name}
                className={styles.main_img}
                width={600}
                height={600}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85';
                }}
              />
              {product.availability === 'out_of_stock' && (
                <div className={styles.sold_out_overlay}>Hết hàng</div>
              )}
            </div>

            {/* HIỂN THỊ CÁC BỨC ẢNH NHỎ GÓC QUAY KHÁC NHAU */}
            {images.length > 1 && (
              <div className={styles.thumbnails}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={[styles.thumb, idx === activeImage ? styles.thumb_active : ''].join(' ')}
                    onClick={() => setActiveImage(idx)}
                    onMouseEnter={() => setActiveImage(idx)} // Thêm tính năng: Rê chuột qua là đổi góc quay ảnh to lập tức
                    aria-label={`Ảnh góc quay ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} góc quay ${idx + 1}`}
                      className={styles.thumb_img}
                      width={72}
                      height={72}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Thông số nổi bật */}
            <div className={styles.highlight_specs}>
              <h3 className={styles.highlight_specs_title}>Thông số nổi bật</h3>
              <ul className={styles.highlight_specs_list}>
                {product.specs && product.specs.length > 0 ? product.specs.flatMap(g => g.items).slice(0, 5).map((spec, idx) => (
                  <li key={idx}>- {spec.label}: {spec.value}</li>
                )) : (
                  <>
                    <li>- Cảm biến độ phân giải cao chính hãng</li>
                    <li>- Bộ xử lý hình ảnh thế hệ mới, lấy nét siêu mượt</li>
                    <li>- Quay video độ nét cao chuẩn 4K/6K sắc nét</li>
                    <li>- Thiết kế gọn nhẹ, kháng bụi và chống chịu thời tiết</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Info Panel — Chuẩn Ảnh 2 */}
          <div className={styles.info_panel}>
            {/* Hàng 1: Status pills */}
            <div className={styles.status_pills_row}>
              <span className={styles.pill_new}>MỚI 100%</span>
              <span className={styles.pill_likenew}>Like new (2)</span>
              <span className={styles.pill_good}>Ngoại hình Đẹp (1)</span>
            </div>

            {/* Hàng 2: Tên sản phẩm */}
            <h1 className={styles.product_title}>{product.name}</h1>

            {/* Hàng 3: Khối Đơn giá + Giá tốt */}
            <div className={styles.price_wrap}>
              <div className={styles.price_label_sub}>Đơn giá:</div>
              <div className={styles.price_main_row}>
                <span className={styles.price_number}>
                  {formatPrice(displayPrice, product.priceText)}
                </span>
              </div>
              <div className={styles.good_price_row}>
                <span>Giá tốt:</span>
                <span className={styles.good_price_highlight}>Vui lòng gọi 📞</span>
              </div>
            </div>

            {/* Hàng 4: Màu sắc / Phiên bản dạng Card ảnh */}
            {product.variants && product.variants.length > 0 ? (
              <div>
                <span className={styles.variant_label}>Màu sắc / Phiên bản:</span>
                <div className={styles.variant_cards_grid}>
                  {product.variants.map(variant => {
                    const isSelected = selectedVariant === variant.id;
                    return (
                      <div
                        key={variant.id}
                        className={[styles.variant_card, isSelected ? styles.variant_card_active : ''].filter(Boolean).join(' ')}
                        onClick={() => setSelectedVariant(variant.id)}
                      >
                        {isSelected && <div className={styles.variant_check_icon}>✓</div>}
                        <img src={product.thumbnail} alt={variant.name} className={styles.variant_card_thumb} />
                        <div className={styles.variant_card_info}>
                          <span className={styles.variant_card_name}>{variant.name}</span>
                          <span className={styles.variant_card_price}>
                            {formatPrice(variant.price ?? displayPrice)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <span className={styles.variant_label}>Phiên bản:</span>
                <div className={styles.variant_cards_grid}>
                  <div className={[styles.variant_card, styles.variant_card_active].join(' ')} >
                    <div className={styles.variant_check_icon}>✓</div>
                    <img src={product.thumbnail} alt="Chính hãng" className={styles.variant_card_thumb} />
                    <div className={styles.variant_card_info}>
                      <span className={styles.variant_card_name}>Chính hãng {product.brand}</span>
                      <span className={styles.variant_card_price}>
                        {formatPrice(displayPrice, product.priceText)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hàng 5: Thương hiệu + Trạng thái */}
            <div className={styles.meta_row}>
              <div>Thương hiệu: <span className={styles.meta_highlight}>{product.brand}</span></div>
              <div>Trạng thái: <span className={styles.meta_highlight}>Còn hàng</span></div>
            </div>

            {/* Hàng 6: Nút action */}
            <div className={styles.action_buttons_row}>
              <button type="button" className={styles.btn_order_main} onClick={handleAddToCart}>
                ĐẶT HÀNG
              </button>
              <a href="tel:0903148222" className={styles.btn_contact_main}>
                LIÊN HỆ
              </a>
            </div>

            {/* Hàng 7: Hotline */}
            <div className={styles.hotline_order_row}>
              Hotline đặt hàng: <strong>📱 0903.148-222</strong> (08:00-20:00)
            </div>

            {/* Hàng 8: Showrooms */}
            <div className={styles.showroom_list}>
              <div className={styles.showroom_item}>
                <div className={styles.showroom_header_row}>
                  <div className={styles.showroom_title_wrap}>
                    <MapPin size={17} color="#e11d48" />
                    <strong className={styles.showroom_title}>TP. Hồ Chí Minh</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href="https://zalo.me/0907215252" target="_blank" rel="noopener noreferrer" className={styles.social_pill_btn}>
                      <ZaloLogoSvg /> <span>Zalo</span>
                    </a>
                    <a href="https://m.me/mayanhvietnam" target="_blank" rel="noopener noreferrer" className={styles.social_pill_btn}>
                      <MessengerLogoSvg /> <span>Messenger</span>
                    </a>
                  </div>
                </div>
                <div style={{ paddingLeft: '23px' }}>
                  Liên Hệ: <span className={styles.showroom_contact}>090 721 5252</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }} className={styles.showroom_item}>
                <div className={styles.showroom_title_wrap}>
                  <MapPin size={17} color="#e11d48" />
                  <strong className={styles.showroom_title}>Cần Thơ</strong>
                </div>
                <div style={{ paddingLeft: '23px' }}>
                  Liên Hệ: <span className={styles.showroom_contact}>090 721 5252</span>
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => toggle(product.id)}
              className={[styles.wishlist_btn, inWishlist ? styles.wishlist_active : ''].join(' ')}
              aria-label={inWishlist ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            >
              {inWishlist ? '♥ Đã yêu thích' : '♡ Thêm vào yêu thích'}
            </button>

            {/* Trust features */}
            <div className={styles.trust_grid}>
              {[
                { icon: <ShieldCheck size={20} color="#3b82f6" />, label: 'Hàng chính hãng 100%' },
                { icon: <Wrench size={20} color="#f59e0b" />, label: 'Bảo hành tại nhà' },
                { icon: <Truck size={20} color="#10b981" />, label: 'Miễn phí vận chuyển' },
                { icon: <RotateCcw size={20} color="#8b5cf6" />, label: '7 ngày đổi trả' },
              ].map(item => (
                <div key={item.label} className={styles.trust_item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Specs / Description / Reviews */}
        <div className={styles.tabs_section}>
          <div className={styles.tabs}>
            {([
              { id: 'specs', label: '📋 Thông số kỹ thuật' },
              { id: 'description', label: '📝 Mô tả sản phẩm' },
              { id: 'reviews', label: `⭐ Đánh giá (${product.rating.count})` },
            ] as const).map(tab => (
              <button
                key={tab.id}
                className={[styles.tab, activeTab === tab.id ? styles.tab_active : ''].join(' ')}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={styles.tab_content}>
            {activeTab === 'specs' && product.specs && (
              <div className={styles.specs_grid}>
                {product.specs.flatMap(group => group.items).map((item, idx) => (
                  <div key={idx} className={styles.spec_row}>
                    <span className={styles.spec_key}>{item.label}</span>
                    <span className={styles.spec_val}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'description' && (
              <div className={styles.description}>
                <p className={styles.short_desc}>{product.shortDescription}</p>
                {product.description && (
                  <div className={styles.full_desc}>{product.description}</div>
                )}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className={styles.reviews_section}>
                <div className={styles.reviews_summary}>
                  <div className={styles.rating_big}>{product.rating.average}</div>
                  <StarRating rating={product.rating.average} size="lg" showCount={false} />
                  <div className={styles.rating_sub}>{product.rating.count} đánh giá</div>
                </div>
                <p className={styles.review_cta}>Hãy là người đầu tiên đánh giá sản phẩm này!</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.related_title}>Sản phẩm liên quan</h2>
            <div className={styles.related_grid}>
              {relatedProducts.slice(0, 4).map(rp => (
                <Link key={rp.id} href={`/san-pham/${rp.slug}`} className={styles.related_card}>
                  <img src={rp.thumbnail} alt={rp.name} className={styles.related_img} width={120} height={120} />
                  <div className={styles.related_info}>
                    <span className={styles.related_name}>{rp.name}</span>
                    <span className={styles.related_price}>{formatPrice(rp.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}