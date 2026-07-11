# `@mayanhvietnam/mock-data`

**Bộ mock data thống nhất** cho 10 demo apps — import 1 nơi, sửa 1 chỗ, mọi demo đồng bộ.

## Cấu trúc mới (2026-07-11)

```
packages/mock-data/src/
├─ types.ts            # Schema: ProductSummary, ProductArticle, CameraBody, ...
├─ products/
│   ├─ cameras.ts      # 4 máy ảnh (may-anh): Canon R6 II, Sony A7 IV, Canon R50, Nikon Z6 III
│   ├─ lenses.ts       # 4 ống kính (ong-kinh): Canon RF 24-70L, Canon RF 50, Sony 70-200 GM II, Nikon Z 24-70 S II
│   ├─ flycam.ts       # 4 flycam: DJI Mavic 4 Pro, DJI Mini 5 Pro, DJI Air 3S, DJI Mavic Air 2
│   ├─ action-cameras.ts # 4 action camera: GoPro Hero 13, DJI Action 4, DJI Pocket 4, DJI Osmo Nano
│   ├─ cinema.ts       # 4 máy quay phim: Sony FX30, Sony FX3, Canon C70, BMPCC 6K G2
│   ├─ studio.ts       # 4 thiết bị studio: Godox SL150W III, Aputure 600d Pro, Nanlite Forza 60C, Godox AD200 Pro
│   └─ index.ts        # allProducts + 15 helper functions
├─ categories.ts       # 11 categories
├─ banners.ts          # Hero slides + deal banners
├─ stores.ts           # 4 cửa hàng
├─ reviews.ts          # 5 reviews
├─ lens-checker.ts     # 14 bodies + 7 lenses + checkLensCompatibility()
├─ site-content.ts     # Hotline, policies, payment, social (từ mayanhvietnam.com)
└─ index.ts            # Re-export tất cả
```

## Quy tắc dữ liệu

- **Mỗi category → ≥4 sản phẩm**
- **Mỗi sản phẩm → ≥5 ảnh gallery** (1 avatar + gallery URLs từ mayanhvietnam.com CDN)
- **Mỗi sản phẩm → ≥1 bài viết review** (`article` field) — 5 sections: Tổng quan, Thiết kế, Hiệu năng, Ưu nhược điểm, Kết luận
- **Specs đầy đủ**: ≥3 groups, mỗi group ≥2 items
- **Giá & sourceUrl** scrape từ trang gốc 2026-07-09/10

## Cài đặt

```json
// package.json của demo
"dependencies": {
  "@mayanhvietnam/mock-data": "workspace:*"
}
```

## Sử dụng cơ bản

```tsx
import {
  allProducts,
  cameras,
  lenses,
  categories,
  heroSlides,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getProductsByBrand,
  getCatalogStats,
  // NEW: articles
  getProductWithArticle,
  getAllProductsWithArticles,
  // NEW: lens checker
  checkLensCompatibility,
  // NEW: site content
  siteContent,
  HOTLINE,
  footerPolicies,
  paymentIcons,
} from '@mayanhvietnam/mock-data';
```

## Export mới (2026-07-11)

| Export | Mô tả |
|---|---|
| `cameras` | 4 máy ảnh body (direct array) |
| `lenses` | 4 ống kính (direct array) |
| `flycam` | 4 flycam (direct array) |
| `actionCameras` | 4 action camera (direct array) |
| `cinema` | 4 máy quay phim (direct array) |
| `studio` | 4 thiết bị studio (direct array) |
| `getProductWithArticle(slug)` | Tìm SP + article theo slug |
| `getAllProductsWithArticles()` | Tất cả SP có article |
| `checkLensCompatibility(body, lens)` | Kiểm tra compat body ↔ lens |
| `cameraBodies` | Danh sách camera bodies (14 items) |
| `lensOptions` | Danh sách lenses (7 items) |
| `siteContent` | Toàn bộ site content (hotline, policies, payment, social) |
| `promotionalBanners` | 4 promotional banners |
| `HOTLINE` | Số hotline legacy |

## Demos đang dùng

| Demo | Trạng thái |
|---|---|
| demo-0 | ✅ Direct import (qua adapter.ts) |
| demo-01 | ❌ Đang dùng local — cần migrate |
| demo-02 – demo-10 | ✅ workspace dep |
| demo-shell | ✅ (categories only) |

## Ngày cập nhật
2026-07-11 — Tái cấu trúc: 24 products (6 categories × 4 SP), mỗi SP ≥5 ảnh + article + full specs. Thêm lens-checker, site-content, promotional-banners. Tách products thành modules theo category.