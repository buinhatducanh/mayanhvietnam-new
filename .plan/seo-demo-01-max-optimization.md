# Plan: Tối Đa SEO cho Demo 01 — Máy Ảnh Việt Nam

**Project:** `apps/demo-01` (Next.js App Router)
**Goal:** Triển khai đầy đủ các yêu cầu SEO từ tài liệu "📌 NOTE RESEARCH SEO"

---

## Tổng Quan Audit (Gaps So với Tài liệu SEO)

| # | Lỗ hổng | Ưu tiên | Tài liệu tham chiếu |
|---|---------|---------|---------------------|
| 1 | Chưa dùng `next/font` — load font Google qua `<link>`, gây FOUT/FOIT CLS | CRITICAL | Mục [7] — FOIT/FOUT |
| 2 | Không có `<link rel="canonical">` ở bất kỳ trang nào | CRITICAL | Mục [12] Tier 1-2 |
| 3 | Thiếu Organization/WebSite/LocalBusiness JSON-LD ở Homepage | CRITICAL | Mục [12] — Schema |
| 4 | Product JSON-LD thiếu `priceValidUntil`, `itemCondition`, `seller.url` | CRITICAL | Mục [12] — Rich Snippet |
| 5 | Ảnh sản phẩm dùng raw `<img>` thay vì Next.js `<Image />` | HIGH | Mục [10] — WebP/AVIF |
| 6 | `product-gallery.tsx` thiếu `width/height` → CLS | HIGH | Mục [10] — CLS |
| 7 | Hero section dùng `'use client'` → không SSR, ảnh hưởng LCP | HIGH | Mục [7] — LCP |
| 8 | Footer social links dùng `href="#"` | MEDIUM | Mục [8] — Trust |
| 9 | Breadcrumb chỉ có microdata, thiếu JSON-LD script | MEDIUM | Mục [12] — Breadcrumb |
| 10 | Sitemap dùng `now` cho mọi lastModified (không đúng bản chất) | MEDIUM | Mục [14] — Sitemap |
| 11 | Product detail OG image thiếu dimensions | LOW | Mục [12] — OG |
| 12 | `not-found.tsx` dùng `dynamic = 'force-static'` không cần thiết | LOW | Mục [9] — Error page |

---

## Tier 1 — CRITICAL (Ranking Impact)

### 1.1 Chuyển sang `next/font` — Triệt tiêu CLS Font
- **Files:** `src/app/layout.tsx`
- **Thay đổi:** Bỏ `<link>` Google Fonts trong `<head>`, import `next/font/google` cho Outfit, Playfair Display, JetBrains Mono.
- **Tại sao:** Google đánh giá CLS > 0.1 là rớt hạng. `next/font` tự tính `size-adjust` để font system ≈ font Google, loại bỏ 100% CLS font.

### 1.2 Thêm Canonical Tags cho tất cả trang
- **Files:** `src/app/layout.tsx`, `src/app/san-pham/[slug]/page.tsx`, `src/app/danh-muc/[slug]/page.tsx`
- **Thay đổi:** Export `alternates.canonical` trong metadata của mỗi page.
- **Tại sao:** Tránh duplicate content, đặc biệt với query params `?page=2`, `?brand=...`. Google xác nhận canonical self-referencing cho trang phân trang.

### 1.3 Organization + LocalBusiness + WebSite JSON-LD Homepage
- **Files:** Tạo `src/components/seo/homepage-schema.tsx`, thêm vào `src/app/page.tsx`
- **Thay đổi:** render JSON-LD script chứa `@type: Organization` + `LocalBusiness` + `WebSite` (với `SearchAction` cho sitelinks search box).
- **Tại sao:** Google hiển thị Brand Knowledge Panel, Sitelinks Searchbox trên SERP.

### 1.4 Nâng cấp Product JSON-LD
- **Files:** `src/components/product/product-jsonld.tsx`
- **Thay đổi:** Thêm `priceValidUntil`, `itemCondition`, `seller.url`, `image: [array]`, `sku`, `mpn`, `gtin` (nếu có).
- **Tại sao:** Đạt điều kiện Rich Snippets (Giá, Tình trạng, Đánh giá) trên Google Search.

### 1.5 Hoàn thiện `generateMetadata` cho tất cả trang
- **Files:** `src/app/san-pham/page.tsx` (tối ưu title/description)
- **Thay đổi:** Tối ưu title chứa từ khóa chính, mô tả meta có CTA.

---

## Tier 2 — HIGH IMPACT (Core Web Vitals)

### 2.1 Hero Section SSR + Preload cho LCP
- **Files:** `src/components/home/hero-pedestal.tsx`
- **Thay đổi:** Tách hero thành Server Component wrapper (hiển thị HTML tĩnh), chỉ phần gallery interactive là client. Thêm `<link rel="preload">` cho ảnh hero.
- **Tại sao:** Hero là LCP element #1. Nếu SSR, Googlebot thấy ngay nội dung trong HTML → index ngay lập tức.

### 2.2 Migrate Product Images sang Next.js `<Image />`
- **Files:** `src/components/product/product-gallery.tsx`, `src/components/product/product-card.tsx`, `src/components/home/hero-pedestal.tsx`
- **Thay đổi:** `<img>` → `<Image width={500} height={500} alt="..." />` với alt text chuẩn E-commerce.
- **Tại sao:** Auto WebP/AVIF conversion, responsive srcset, automatic lazy loading, CLS prevention.

### 2.3 Fix CLS trên Product Gallery
- **Files:** `src/components/product/product-gallery.tsx`
- **Thay đổi:** Thêm `width/height` vào `<img>` hoặc dùng `<Image>` có aspect-square container với aspect-ratio CSS.
- **Tại sao:** Ảnh không có dimensions → browser coi là 0px → khi load xong → giật layout toàn trang.

---

## Tier 3 — MEDIUM IMPACT (Crawlability)

### 3.1 Category Breadcrumb JSON-LD
- **Files:** Tạo `src/components/seo/breadcrumb-jsonld.tsx`
- **Thay đổi:** Render `<script type="application/ld+json">` chứa `BreadcrumbList` cho mỗi trang danh mục.
- **Tại sao:** Google hiển thị breadcrumb thay vì URL dài trên SERP.

### 3.2 Canonical cho Category Filter URLs
- **Files:** `src/app/danh-muc/[slug]/page.tsx`
- **Thay đổi:** Khi URL có query params (brand, price), canonical trỏ về URL gốc `/danh-muc/[slug]`.
- **Tại sao:** Tránh hàng trăm filter URLs bị đánh giá là duplicate content.

### 3.3 Open Graph Image cho Homepage
- **Files:** `src/app/layout.tsx`, tạo `public/og-homepage.jpg`
- **Thay đổi:** Thêm `openGraph.images` trong root metadata.
- **Tại sao:** Link share lên Facebook/Zalo hiện ảnh thay vì "trần truồng".

### 3.4 Sitemap Timestamps Chính Xác
- **Files:** `src/app/sitemap.ts`
- **Thay đổi:** Dùng `product.updatedAt` hoặc giá trị mock hợp lý thay vì `new Date()`.
- **Tại sao:** Google dùng `<lastmod>` để quyết định có crawl lại không. Nếu "giả", Google mất niềm tin vào sitemap.

---

## Tier 4 — POLISH

### 4.1 Fix Footer Social Links
- **Files:** `src/components/layout/footer.tsx`
- **Thay đổi:** Thay `href="#"` bằng URL thực: YouTube, TikTok, Facebook của Máy Ảnh Việt Nam.

### 4.2 FloatingCTA — Lazy Load cho Scripts bên thứ 3
- **Files:** `src/components/layout/floating-cta.tsx`
- **Thay đổi:** Đảm bảo Zalo/Messenger links là `<a>` tĩnh, KHÔNG nhúng widget JS bên thứ ba.
- **Tại sao:** Nhúng Tawk.to/Zalo Chat JS trực tiếp làm sập LCP và tăng INP (Mục [8]).

### 4.3 Product OG Image Dimensions
- **Files:** `src/app/san-pham/[slug]/page.tsx`
- **Thay đổi:** Thêm `width`, `height` vào `openGraph.images`.
- **Tại sao:** Facebook/Zalo cần dimensions để render preview đúng.

### 4.4 Bỏ `dynamic = 'force-static'` ở 404
- **Files:** `src/app/not-found.tsx`
- **Thay đổi:** Xóa dòng `export const dynamic = 'force-static';`
- **Tại sao:** Không cần thiết, Next.js đã xử lý 404 đúng cách.

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/app/layout.tsx` | Modify (next/font, canonical, OG images, theme-color) |
| `src/app/page.tsx` | Modify (thêm HomepageSchema) |
| `src/app/san-pham/page.tsx` | Modify (tối ưu metadata) |
| `src/app/san-pham/[slug]/page.tsx` | Modify (canonical, OG dimensions, Image component) |
| `src/app/danh-muc/[slug]/page.tsx` | Modify (canonical, filter canonical) |
| `src/app/not-found.tsx` | Modify (bỏ force-static) |
| `src/app/sitemap.ts` | Modify (realistic timestamps) |
| `src/components/home/hero-pedestal.tsx` | Modify (preload hero image) |
| `src/components/product/product-jsonld.tsx` | Modify (nâng cấp schema) |
| `src/components/product/product-gallery.tsx` | Modify (Next.js Image, alt, width/height) |
| `src/components/product/product-card.tsx` | Modify (Next.js Image) |
| `src/components/layout/footer.tsx` | Modify (social links) |
| `src/components/seo/homepage-schema.tsx` | **CREATE** |
| `src/components/seo/breadcrumb-jsonld.tsx` | **CREATE** |
| `next.config.ts` | Modify (Image domains config) |
