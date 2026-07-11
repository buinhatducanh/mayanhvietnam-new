// ─── Types ──────────────────────────────────────────────────────────────────
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
  // NEW
  ProductArticle,
  ProductVariant,
  CameraBody,
  LensOption,
  PromotionalBanner,
  SiteContent,
} from './types';

// ─── Products (from category modules) ───────────────────────────────────────
export {
  allProducts,
  flashSaleData,
  // Category arrays (direct import)
  cameras,
  lenses,
  flycam,
  actionCameras,
  cinema,
  studio,
  // Lookups
  getProductsByCategory,
  getProductBySlug,
  getRelatedProducts,
  // Brand & Mount
  getProductsByBrand,
  getAllBrands,
  getProductsByMount,
  // Ranking & filtering
  getFeaturedProducts,
  getProductsByPriceRange,
  searchProducts,
  getProductsGroupedByCategory,
  getCheapestProducts,
  getPremiumProducts,
  getOnSaleProducts,
  // Stats
  getCatalogStats,
  // Articles
  getProductWithArticle,
  getAllProductsWithArticles,
  // New products
  getNewProducts,
} from './products';

// ─── Categories ─────────────────────────────────────────────────────────────
export { categories, getCategoryBySlug, getActiveCategories } from './categories';

// ─── Stores ─────────────────────────────────────────────────────────────────
export { stores } from './stores';

// ─── Reviews ────────────────────────────────────────────────────────────────
export { reviews } from './reviews';

// ─── Banners ────────────────────────────────────────────────────────────────
export { heroSlides, dealBanners } from './banners';

// ─── Lens checker ───────────────────────────────────────────────────────────
export {
  cameraBodies,
  lensOptions,
  checkLensCompatibility,
} from './lens-checker';

// ─── Site content ───────────────────────────────────────────────────────────
export {
  siteContent,
  promotionalBanners,
  // Legacy shorthand exports
  HOTLINE,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  TAX_ID,
  footerPolicies,
  paymentMethods,
  paymentIcons,
  socialLinks,
} from './site-content';

// ─── Brand banners ───────────────────────────────────────────────────────────
export {
  BRAND_META,
  getBrandBanners,
  getBrandBannerBySlug,
  formatBrandPrice,
  type BrandMeta,
  type BrandBanner,
} from './brand-banners';
