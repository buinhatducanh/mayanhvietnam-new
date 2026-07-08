/**
 * Mock Data Layer — mayanhvietnam.com
 *
 * Re-exports from @mayanhvietnam/mock-data.
 * Keeps existing @/lib/mock-data imports working across all components.
 */

// Re-export all types
export type {
  Category,
  ProductImage,
  ProductSummary,
  FlashSale,
  HeroSlide,
  DealBanner,
  StoreInfo,
  Review,
} from '@mayanhvietnam/mock-data';

// Re-export all data
export {
  allProducts,
  flashSaleData,
  getProductsByCategory,
  getProductBySlug,
  getRelatedProducts,
} from '@mayanhvietnam/mock-data';

export { categories, getCategoryBySlug } from '@mayanhvietnam/mock-data';
export { stores } from '@mayanhvietnam/mock-data';
export { reviews } from '@mayanhvietnam/mock-data';
export { heroSlides, dealBanners } from '@mayanhvietnam/mock-data';
