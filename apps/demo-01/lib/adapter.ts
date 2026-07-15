/**
 * Adapter — bridge `mock-data` (ProductSummary) → demo-01 local Product type
 *
 * Demo-01 PDP uses `Product` type with local-only fields:
 * - `specs: Record<string,string>` (flat) instead of `specs: ProductSpecGroup[]`
 * - `includedItems` (alias for packageIncludes)
 * - `thumbnails` (string[]) for image gallery
 * - `relatedSlugs`
 *
 * This adapter derives those fields from the shared schema so we keep ONE source of truth.
 */

import type { ProductSummary } from './mock-data';

// ─── Demo-01 local types (preserved for backward compat) ─────────────────────

export type ProductStatus = 'ACTIVE' | 'INACTIVE';
export type Availability = 'IN_STOCK' | 'OUT_OF_STOCK' | 'PRE_ORDER';
export type Condition = 'NEW' | 'USED';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
}

export interface Product {
  name: string;
  slug: string;
  brand: string;
  categorySlug: string;
  price: number;
  discountPrice?: number;
  status: ProductStatus;
  availability: Availability;
  condition: Condition;
  mountType?: string;
  specs: Record<string, string>;
  model3dUrl?: string;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  description: string;
  variants: ProductVariant[];
  thumbnails?: string[];
  highlights?: string[];
  overviewSections?: { title: string; content: string }[];
  includedItems?: string[];
  relatedSlugs?: string[];
  ratingBreakdown?: { stars: number; percentage: number }[];
  article?: {
    title: string;
    author?: string;
    publishDate?: string;
    readTime?: number;
    coverImage?: string;
    toc?: { id: string; label: string }[];
    sections: {
      heading?: string;
      content: string;
      images?: string[];
    }[];
  };
}

// ─── Category type ───────────────────────────────────────────────────────────

export interface Category {
  name: string;
  slug: string;
  image?: string;
}

// ─── Adapter: ProductSummary → Product ───────────────────────────────────────

function flattenSpecs(p: ProductSummary): Record<string, string> {
  const out: Record<string, string> = {};
  if (!p.specs) return out;
  for (const group of p.specs) {
    for (const item of group.items) {
      // Prefix group name to avoid label collisions across groups
      out[`${group.group} — ${item.label}`] = item.value;
    }
  }
  return out;
}

function deriveRatingBreakdown(): { stars: number; percentage: number }[] {
  // Heuristic distribution based on a 4.8-4.9 typical average
  return [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 16 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];
}

export function adaptProduct(p: ProductSummary): Product {
  return {
    name: p.name,
    slug: p.slug,
    brand: p.brand,
    categorySlug: p.category,
    price: p.price,
    discountPrice: p.originalPrice && p.originalPrice > p.price ? p.price : undefined,
    status: 'ACTIVE',
    availability:
      p.availability === 'in_stock'
        ? 'IN_STOCK'
        : p.availability === 'pre_order'
          ? 'PRE_ORDER'
          : 'OUT_OF_STOCK',
    condition: p.isUsed ? 'USED' : 'NEW',
    mountType: p.mount,
    specs: flattenSpecs(p),
    image: p.thumbnail,
    rating: p.rating?.average ?? 0,
    reviewCount: p.rating?.count ?? 0,
    isNew: p.isNew,
    description: p.description ?? '',
    variants: (p.variants ?? []).map((v) => ({
      id: v.id,
      name: v.name,
      price: v.price,
      discountPrice: v.discountPrice,
    })),
    thumbnails: p.images.map((img) => img.url),
    highlights: p.highlights,
    includedItems: p.packageIncludes,
    overviewSections: p.description
      ? [{ title: 'Mô tả sản phẩm', content: p.description }]
      : undefined,
    article: p.article
      ? {
          title: p.article.title,
          author: p.article.author,
          publishDate: p.article.publishDate,
          readTime: p.article.readTime,
          coverImage: p.article.coverImage,
          toc: p.article.toc,
          sections: p.article.sections,
        }
      : undefined,
    ratingBreakdown: deriveRatingBreakdown(),
  };
}

// ─── Adapt allProducts → Product[] ───────────────────────────────────────────

import {
  allProducts as _allProducts,
  cameras,
  lenses,
  flycam,
  actionCameras,
  cinema,
  studio,
  getProductsByCategory as _getProductsByCategory,
  getProductBySlug as _getProductBySlug,
  categories as _categories,
  stores as _stores,
  // Site content
  HOTLINE,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  TAX_ID,
  footerPolicies,
  paymentIcons,
  paymentMethods,
  socialLinks,
  promotionalBanners,
  // Lens checker
  cameraBodies,
  lensOptions,
} from './mock-data';

// Re-export all of them for local use
export {
  HOTLINE,
  HOTLINE_FULL,
  SITE_EMAIL,
  COMPANY_NAME,
  COMPANY_ADDRESS,
  TAX_ID,
  footerPolicies,
  paymentIcons,
  paymentMethods,
  socialLinks,
  promotionalBanners,
  cameraBodies,
  lensOptions,
};

export const products: Product[] = _allProducts.map(adaptProduct);
export const productsByCategory = {
  mayAnh: cameras.map(adaptProduct),
  ongKinh: lenses.map(adaptProduct),
  flycam: flycam.map(adaptProduct),
  actionCamera: actionCameras.map(adaptProduct),
  mayQuayPhim: cinema.map(adaptProduct),
  thietBiStudio: studio.map(adaptProduct),
};

// ─── Categories adapter ──────────────────────────────────────────────────────

export const categories: Category[] = _categories.map((c) => ({
  name: c.name,
  slug: c.slug,
  image: c.image,
}));

// ─── Backward-compatible helpers ─────────────────────────────────────────────

// Store locations (from shared stores.ts)
export const storeLocations = _stores.map((s) => ({
  city: s.city,
  address: s.address,
}));

export function getProductBySlug(slug: string): Product | undefined {
  const p = _getProductBySlug(slug);
  return p ? adaptProduct(p) : undefined;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return _getProductsByCategory(categorySlug).map(adaptProduct);
}

// ─── Currency formatter ──────────────────────────────────────────────────────

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}