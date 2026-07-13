/**
 * @mayanhvietnam/mock-data — Products barrel
 *
 * Combines all category-specific product arrays into one unified catalog.
 * Every product has ≥5 gallery images + article + full specs.
 *
 * Category distribution:
 *   cameras       — 4 products (may-anh)
 *   lenses        — 4 products (ong-kinh)
 *   flycam        — 4 products (flycam)
 *   action-cameras— 4 products (action-camera)
 *   cinema        — 4 products (may-quay-phim)
 *   studio        — 4 products (thiet-bi-studio)
 *   Total: 24 products
 */

import type { ProductSummary, FlashSale, ProductSpecGroup } from '../types';
import { cameras } from './cameras';
import { lenses } from './lenses';
import { flycam } from './flycam';
import { actionCameras } from './action-cameras';
import { cinema } from './cinema';
import { studio } from './studio';
import { accessories } from './accessories';
import { used } from './used';

// ─── Unified catalog ────────────────────────────────────────────────────────

export const allProducts: ProductSummary[] = [
  ...cameras,
  ...lenses,
  ...flycam,
  ...actionCameras,
  ...cinema,
  ...studio,
  ...accessories,
  ...used,
];

// ─── Flash sale ─────────────────────────────────────────────────────────────

export const flashSaleData: FlashSale = {
  id: 'fs1',
  title: '⚡ Flash Sale — Ưu đãi cực sốc',
  startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  endTime: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
  products: allProducts
    .filter((p) => p.price < 20000000)
    .slice(0, 6)
    .map((p, i) => ({
      ...p,
      soldPercent: [60, 45, 30, 75, 85, 20][i],
    })),
};

// ─── Re-export category arrays for direct import ────────────────────────────

export { cameras } from './cameras';
export { lenses } from './lenses';
export { flycam } from './flycam';
export { actionCameras } from './action-cameras';
export { cinema } from './cinema';
export { studio } from './studio';
export { accessories } from './accessories';
export { used } from './used';

// ─── Helper: basic lookups ──────────────────────────────────────────────────

export const getProductsByCategory = (categorySlug: string, onlyNew = true) =>
  allProducts.filter(
    (p) => p.category === categorySlug && onlyNew !== p.isUsed,
  );

export const getProductBySlug = (slug: string) =>
  allProducts.find((p) => p.slug === slug) ?? null;

export const getRelatedProducts = (product: ProductSummary, limit = 4) =>
  allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

// ─── Helper: brand & mount ──────────────────────────────────────────────────

export const getProductsByBrand = (brand: string) =>
  allProducts.filter(
    (p) => p.brand.toLowerCase() === brand.toLowerCase(),
  );

export const getAllBrands = (): string[] =>
  Array.from(new Set(allProducts.map((p) => p.brand))).sort();

export const getProductsByMount = (mount: string) =>
  allProducts.filter(
    (p) =>
      p.mount?.toLowerCase() === mount.toLowerCase(),
  );

// ─── Helper: ranking & filtering ────────────────────────────────────────────

export const getFeaturedProducts = (limit = 6) =>
  [...allProducts]
    .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
    .slice(0, limit);

export const getProductsByPriceRange = (min: number, max: number) =>
  allProducts.filter((p) => p.price >= min && p.price <= max);

export const searchProducts = (query: string): ProductSummary[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return allProducts.filter((p) => {
    if (p.name.toLowerCase().includes(q)) return true;
    if (p.brand.toLowerCase().includes(q)) return true;
    if (p.category.toLowerCase().includes(q)) return true;
    if (p.shortSpecs?.some((s) => s.toLowerCase().includes(q))) return true;
    if (p.description?.toLowerCase().includes(q)) return true;
    return false;
  });
};

export const getProductsGroupedByCategory = (): Record<string, ProductSummary[]> =>
  allProducts.reduce<Record<string, ProductSummary[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

export const getCheapestProducts = (limit = 6) =>
  [...allProducts].sort((a, b) => a.price - b.price).slice(0, limit);

export const getPremiumProducts = (limit = 6) =>
  [...allProducts].sort((a, b) => b.price - a.price).slice(0, limit);

export const getOnSaleProducts = () =>
  allProducts.filter((p) => p.originalPrice && p.price < p.originalPrice);

// ─── Helper: catalog stats ──────────────────────────────────────────────────

export const getCatalogStats = () => ({
  total: allProducts.length,
  byCategory: getProductsGroupedByCategory(),
  brands: getAllBrands(),
  avgPrice: Math.round(
    allProducts.reduce((s, p) => s + p.price, 0) / allProducts.length,
  ),
  productCountByCategory: Object.fromEntries(
    Object.entries(getProductsGroupedByCategory()).map(([k, v]) => [k, v.length]),
  ),
});

// ─── Helper: article lookup ─────────────────────────────────────────────────

export const getProductWithArticle = (slug: string) => {
  const product = getProductBySlug(slug);
  if (!product?.article) return null;
  return { product, article: product.article };
};

export const getAllProductsWithArticles = () =>
  allProducts.filter((p) => p.article).map((p) => ({ product: p, article: p.article! }));

// ─── Helper: new products (marked as isNew) ────────────────────────────────

export const getNewProducts = (limit = 6) =>
  allProducts.filter((p) => p.isUsed === false).slice(0, limit);
