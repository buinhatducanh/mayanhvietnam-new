/**
 * Mock Data Layer — mayanhvietnam.com
 * Re-exports từ ../../lib/mock-data cho demo-05.
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
} from '../../lib/mock-data';

export {
  allProducts,
  flashSaleData,
  getProductsByCategory,
  getProductBySlug,
  getRelatedProducts,
} from '../../lib/mock-data';

export { categories, getCategoryBySlug } from '../../lib/mock-data';
export { stores } from '../../lib/mock-data';
export { reviews } from '../../lib/mock-data';
export { heroSlides, dealBanners } from '../../lib/mock-data';