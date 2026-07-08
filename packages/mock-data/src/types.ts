/**
 * Shared types for mock data layer — mayanhvietnam.com
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
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
  gradient: string;
  product: string;
}

export interface DealBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  gradient: string;
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
