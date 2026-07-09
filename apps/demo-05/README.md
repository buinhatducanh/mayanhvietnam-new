# demo-05 — E-commerce Full Flow

Landing page + e-commerce hoàn chỉnh cho **mayanhvietnam.com** (mock data, no backend).

## Cổng chạy
- **Dev:** `http://localhost:8005` — `pnpm dev:demo-05`
- **Build:** `pnpm build:demo-05`

## Routes chính

| Route | Mô tả |
|-------|--------|
| `/` | Landing page — hero banners, 9 danh mục, 7 featured sections, BCT/payment trust |
| `/danh-muc/[slug]` | Category landing — 9 slugs pre-rendered |
| `/san-pham` | Product listing với filter/sort |
| `/san-pham/[slug]` | Product detail — gallery, specs, reviews (8 SSG slugs) |
| `/gio-hang` | Cart page + mini drawer |
| `/thanh-toan` | Checkout 3-step (shipping → payment → confirm) |
| `/account/login`, `/account/register` | Auth forms |
| `/blog` | Blog listing + newsletter |

## Design System
- **Background:** `#0a0a0f` (OLED darkroom)
- **Accent:** `#00d4aa` (teal, ≤10% surface)
- **Sale CTA:** `#ff6b35` (orange)
- **Typography:** Inter (UI) + JetBrains Mono (prices/specs)

## Tách bạch dự án

- **Local data:** Ảnh thật từ mayanhvietnam.com CDN trong `src/lib/images.ts`
- **Shared data:** Products, categories, stores, reviews từ `@mayanhvietnam/mock-data` (workspace package)
- **Shared utils:** `formatVND, calcDiscountPercent, calcInstallment, slugify` từ `@mayanhvietnam/shared-utils`
- **Local state:** Cart (useReducer + localStorage) chỉ trong demo-05
- **No cross-imports** với demo-01–10 khác

## Stack
- Next.js 16.2.10 (App Router, RSC)
- React 19.2.4
- Tailwind CSS v4
- TypeScript 5 strict
- Lucide React icons

## Cấu trúc

```
src/
├── app/                     # Routes
│   ├── page.tsx             # Landing
│   ├── danh-muc/[slug]/     # Category landing
│   ├── san-pham/            # Product listing + detail
│   ├── gio-hang/            # Cart
│   ├── thanh-toan/          # Checkout
│   ├── account/             # Auth
│   └── blog/                # Blog
├── components/
│   ├── layout/              # Header, Footer
│   ├── product/             # ProductCard, ProductGrid
│   ├── cart/                # CartDrawer
│   └── ui/                  # Badge, Rating, Breadcrumb, Section
├── lib/
│   ├── utils.ts             # cn() + re-exports shared-utils
│   ├── mock-data.ts         # re-exports @mayanhvietnam/mock-data
│   ├── cart-context.tsx     # useReducer + localStorage
│   └── images.ts            # mayanhvietnam.com CDN URLs
└── styles/
    └── globals.css          # Tailwind v4 @theme + design tokens
```

## Image Source
Tất cả ảnh sản phẩm load trực tiếp từ `mayanhvietnam.com` CDN — chỉ dùng cho mục đích demo nội bộ, không public.
