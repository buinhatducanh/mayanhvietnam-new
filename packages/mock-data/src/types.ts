/**
 * Shared types for mock data layer — mayanhvietnam.com
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  /** Real category thumbnail from mayanhvietnam.com */
  image?: string;
  productCount: number;
  description?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  images: ProductImage[];
  price: number;
  originalPrice?: number;
  badges: { type: string; label: string }[];
  rating?: { average: number; count: number };
  isUsed: boolean;
  brand: string;
  mount?: string;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  category: string;
  shortSpecs?: string[];
  /** Long-form description (markdown/plain) */
  description?: string;
  /** Highlight bullets shown on the product page */
  highlights?: string[];
  /** Grouped specs (used by the Specs tab on the product page) */
  specs?: ProductSpecGroup[];
  /** What's in the box */
  packageIncludes?: string[];
  /** SKU identifier */
  sku?: string;
  /** ISO date when scraped */
  scrapedAt?: string;
  /** Original product URL on mayanhvietnam.com */
  sourceUrl?: string;
  /** True when merchant displays "Vui lòng gọi" (call for price) */
  callForPrice?: boolean;
  /** Phone number on the merchant's source page */
  hotline?: string;
}

export interface ProductSpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

export interface FlashSale {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  products: (ProductSummary & { soldPercent: number })[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  /** CSS inline gradient for background (use as style={{ background: slide.gradient }}) */
  gradient: string;
  product: string;
  /** Optional: real banner image URL from mayanhvietnam.com */
  image?: string;
}

export interface DealBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  /** CSS inline gradient for background (use as style={{ background: banner.gradient }}) */
  gradient: string;
  /** Optional: real banner image URL from mayanhvietnam.com */
  image?: string;
}

export interface StoreInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  city: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}
