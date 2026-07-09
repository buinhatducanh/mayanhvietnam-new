/**
 * Mock Data Layer — mayanhvietnam.com
 * Re-exports từ @mayanhvietnam/mock-data cho demo-05.
 */

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