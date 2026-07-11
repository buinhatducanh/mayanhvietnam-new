# `@mayanhvietnam/mock-data`

**Bộ mock data thống nhất** cho 10 demo apps — import 1 nơi, sửa 1 chỗ, mọi demo đồng bộ.

## Cấu trúc

```
packages/mock-data/src/
├─ types.ts        # Schema: ProductSummary, Category, FlashSale, ...
├─ products.ts     # 12 sản phẩm + 10 helper functions
├─ categories.ts   # 11 categories (may-anh, ong-kinh, flycam, ...)
├─ banners.ts      # Hero slides + deal banners
├─ stores.ts       # 4 cửa hàng
├─ reviews.ts      # 5 reviews
└─ index.ts        # Re-export tất cả
```

## Cài đặt

Đã được khai báo là workspace dep trong các demo (02, 03, 04, 05, 06, 07, 08, 09, 10, demo-shell). Nếu demo nào chưa có, thêm vào `package.json`:

```json
"dependencies": {
  "@mayanhvietnam/mock-data": "workspace:*"
}
```

## Sử dụng cơ bản

```tsx
import {
  allProducts,
  categories,
  heroSlides,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getProductsByBrand,
  getCatalogStats,
} from '@mayanhvietnam/mock-data';

// Danh sách tất cả
const products = allProducts;          // ProductSummary[]

// Theo category
const cameras = getProductsByCategory('may-anh');

// Theo slug
const a7iv = getProductBySlug('may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang');

// Tìm kiếm
const results = searchProducts('canon');

// Top sản phẩm
const featured = getFeaturedProducts(6);

// Thống kê catalog
const stats = getCatalogStats();
// { total: 12, brands: [...], avgPrice: 38500000, byCategory: {...} }
```

## Helpers có sẵn

| Function | Mô tả | Dùng cho |
|---|---|---|
| `getProductsByCategory(slug)` | Lọc theo category slug | Tất cả demo |
| `getProductBySlug(slug)` | Tìm 1 sản phẩm theo slug | PDP page (demo-02, 03, 04, 05, 06) |
| `getRelatedProducts(product, limit)` | Sản phẩm liên quan cùng category | PDP page |
| `getProductsByBrand(brand)` | Lọc theo brand | demo-04, demo-06 |
| `getAllBrands()` | Danh sách brand duy nhất | Brand filter UI |
| `getProductsByMount(mount)` | Lọc lens theo mount | Lens checker (demo-01/02) |
| `getFeaturedProducts(limit)` | Top sản phẩm rating cao | Hero section |
| `getProductsByPriceRange(min, max)` | Lọc theo khoảng giá | Filter UI |
| `searchProducts(query)` | Tìm trong name/brand/specs | Search bar |
| `getProductsGroupedByCategory()` | Nhóm theo category | Category landing pages |
| `getCheapestProducts(limit)` | Top giá rẻ nhất | Homepage "Giá tốt" section |
| `getPremiumProducts(limit)` | Top cao cấp nhất | Homepage "Cao cấp" section |
| `getOnSaleProducts()` | Sản phẩm đang giảm giá | Flash sale, deals |
| `getCatalogStats()` | Thống kê tổng | Admin dashboard |

## Schema

```ts
interface ProductSummary {
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
}
```

## Demos đang dùng

| Demo | Trạng thái |
|---|---|
| demo-03 | ✅ Direct import |
| demo-04 | ✅ Direct import + adapters |
| demo-05 | ✅ Via re-export wrapper |
| demo-shell | ✅ (categories only) |
| demo-0, demo-01, demo-02, demo-06 | ❌ Đang dùng data local riêng |

Có thể migrate từng demo sang dùng `@mayanhvietnam/mock-data` để data đồng bộ tuyệt đối.

## Ngày cập nhật
2026-07-10 — Tăng từ 8 → 12 products, thêm 11 helpers, mở rộng categories.