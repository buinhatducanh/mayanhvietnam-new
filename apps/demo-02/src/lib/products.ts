/**
 * Adapter — bridge `../../lib/mock-data` (ProductSummary) → demo-02 local Product type
 *
 * Demo-02 PDP uses local Product + ProductArticle shapes with custom fields.
 * This adapter derives those fields from the shared schema.
 */

import type { ProductSummary } from '../../lib/mock-data';

// ─── Demo-02 local types ────────────────────────────────────────────────────

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
  gallery?: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  description: string;
  variants: ProductVariant[];
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ProductArticle {
  title: string;
  intro: string;
  sections: ArticleSection[];
  faqs?: { q: string; a: string }[];
}

export interface Category {
  name: string;
  slug: string;
  image?: string;
}

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

// ─── Import shared data ──────────────────────────────────────────────────────

import {
  allProducts as _allProducts,
  categories as _categories,
  getProductBySlug as _getProductBySlug,
  getProductsByCategory as _getProductsByCategory,
  cameraBodies,
  lensOptions,
  stores as _stores,
  HOTLINE_FULL,
} from '../../lib/mock-data';

export { cameraBodies, lensOptions };
export const HOTLINE = '0907.215.252';
export const HOTLINE_ALT = HOTLINE_FULL;

// ─── Adapter: ProductSummary → Product ───────────────────────────────────────

function flattenSpecs(p: ProductSummary): Record<string, string> {
  const out: Record<string, string> = {};
  if (!p.specs) return out;
  for (const group of p.specs) {
    for (const item of group.items) {
      out[item.label] = item.value;
    }
  }
  return out;
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
    gallery: p.images.map((img) => img.url),
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
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export const products: Product[] = _allProducts.map(adaptProduct);

export const categories: Category[] = _categories.map((c) => ({
  name: c.name,
  slug: c.slug,
  image: c.image,
}));

export const storeLocations = _stores.map((s) => ({
  city: s.city,
  address: s.address,
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

export function getProductBySlug(slug: string): Product | undefined {
  const p = _getProductBySlug(slug);
  return p ? adaptProduct(p) : undefined;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return _getProductsByCategory(categorySlug).map(adaptProduct);
}

export function getProductGallery(product: Product): string[] {
  return product.gallery ?? [product.image];
}

// ─── Articles (legacy support) ───────────────────────────────────────────────

import { getProductWithArticle as _getProductWithArticle } from '../../lib/mock-data';

export const productArticles: Record<string, ProductArticle> = Object.fromEntries(
  _allProducts
    .filter((p) => p.article)
    .map((p) => [
      p.slug,
      {
        title: p.article!.title,
        intro: p.article!.sections[0]?.content ?? p.description ?? '',
        sections:
          p.article!.sections.slice(1).map((s) => ({
            heading: s.heading ?? '',
            body: s.content,
          })) ?? [],
      },
    ]),
);

export function getProductArticle(slug: string): ProductArticle | undefined {
  const result = _getProductWithArticle(slug);
  if (!result) return undefined;
  const { article } = result;
  return {
    title: article.title,
    intro: article.sections[0]?.content ?? '',
    sections: article.sections.slice(1).map((s) => ({
      heading: s.heading ?? '',
      body: s.content,
    })),
  };
}