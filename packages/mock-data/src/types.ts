/**
 * Shared types for mock data layer — mayanhvietnam.com
 *
 * Unified schema supporting all demo apps (0–10 + shell).
 * Backward-compatible: all existing fields preserved, new fields optional.
 */

// ─── Category ────────────────────────────────────────────────────────────────

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

// ─── Product images ──────────────────────────────────────────────────────────

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

// ─── Product variant ─────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
}

// ─── Product article / review ────────────────────────────────────────────────

export interface ProductArticle {
  /** Article title (e.g. "Đánh giá Canon EOS R50 — Chi tiết từ A đến Z") */
  title: string;
  /** Author display name */
  author?: string;
  /** Publication date ISO string */
  publishDate?: string;
  /** Estimated reading time in minutes */
  readTime?: number;
  /** Cover image for the article (if different from product main image) */
  coverImage?: string;
  /** Table of contents items (auto-generated from headings if omitted) */
  toc?: { id: string; label: string }[];
  /** Sections — array of content blocks rendered sequentially */
  sections: {
    /** Optional heading for this section */
    heading?: string;
    /** Markdown-ish body content */
    content: string;
    /** Optional images to show within this section */
    images?: string[];
  }[];
}

// ─── Spec groups ─────────────────────────────────────────────────────────────

export interface ProductSpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

// ─── Product (main) ──────────────────────────────────────────────────────────

export interface ProductSummary {
  // Core
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

  // Detail (PDP)
  shortSpecs?: string[];
  description?: string;
  highlights?: string[];
  specs?: ProductSpecGroup[];
  packageIncludes?: string[];
  sku?: string;
  scrapedAt?: string;
  sourceUrl?: string;
  callForPrice?: boolean;
  hotline?: string;
  isNew?: boolean;

  // ── NEW: Article / review content ──
  /** Long-form review article rendered on PDP as article/review section */
  article?: ProductArticle;

  // ── NEW: Variants ──
  /** Product variants (body-only, kit, etc.) */
  variants?: ProductVariant[];
}

// ─── Flash sale ──────────────────────────────────────────────────────────────

export interface FlashSale {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  products: (ProductSummary & { soldPercent: number })[];
}

// ─── Hero slide ──────────────────────────────────────────────────────────────

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

// ─── Deal banner ─────────────────────────────────────────────────────────────

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

// ─── Store ───────────────────────────────────────────────────────────────────

export interface StoreInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  city: string;
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}

// ─── Lens checker ────────────────────────────────────────────────────────────

export interface CameraBody {
  name: string;
  mountType: string;
  sensor: string;
}

export interface LensOption {
  name: string;
  mountType: string;
  focalRange: string;
  coverage: 'Full-frame' | 'APS-C';
}

// ─── Category Banner (carousel on homepage per section) ────────────────────
export interface CategoryBanner {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
}

// ─── Promotional banner ──────────────────────────────────────────────────────

export interface PromotionalBanner {
  label: string;
  title: string;
  description: string;
  link: string;
}

// ─── Site content ────────────────────────────────────────────────────────────

export interface SiteContent {
  hotline: string;
  hotlineFull: string;
  siteEmail: string;
  companyName: string;
  companyAddress: string;
  taxId: string;
  footerPolicies: { name: string; link: string }[];
  paymentMethods: string[];
  paymentIcons: { name: string; url: string }[];
  socialLinks: { platform: string; url: string }[];
}
