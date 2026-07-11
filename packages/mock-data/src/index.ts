// Types
export type {
  Category,
  ProductImage,
  ProductSummary,
  ProductSpecGroup,
  FlashSale,
  HeroSlide,
  DealBanner,
  StoreInfo,
  Review,
} from './types';

// Products
export {
  allProducts,
  flashSaleData,
  getProductsByCategory,
  getProductBySlug,
  getRelatedProducts,
  // New helpers — added 2026-07-10
  getProductsByBrand,
  getAllBrands,
  getProductsByMount,
  getFeaturedProducts,
  getProductsByPriceRange,
  searchProducts,
  getProductsGroupedByCategory,
  getCheapestProducts,
  getPremiumProducts,
  getOnSaleProducts,
  getCatalogStats,
} from './products';

// Categories
export { categories, getCategoryBySlug, getActiveCategories } from './categories';

// Stores
export { stores } from './stores';

// Reviews
export { reviews } from './reviews';

// Banners
export { heroSlides, dealBanners } from './banners';
