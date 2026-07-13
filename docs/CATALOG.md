# CATALOG THAM CHIẾU — mayanhvietnam.com

> **Mục đích**: Mô tả chính xác nội dung từng file để AI agents biết file nào có gì, dùng khi nào, và giới hạn dữ liệu.
>
> **⚠️ QUY TẮC SỬ DỤNG**: Khi agent cần thông tin về mayanhvietnam.com, PHẢI tra file này TRƯỚC để biết file nguồn. KHÔNG tự suy đoán dữ liệu nếu không tìm thấy trong catalog.
>
> **Cập nhật lần cuối**: 2026-07-10 — đã bổ sung scraped data (homepage, PLP x3, PDP x2, chính sách BH)

---

## 📍 Vị trí files

```
D:\LOOP_COMPANY\mayanhvietnam-new\docs\         (source gốc — KHÔNG EDIT)
D:\MAYANHVIETNAM\PROJECT\                       (copy làm việc)
D:\LOOP_COMPANY\mayanhvietnam-new\docs\scraped\ (data scraped thực tế từ site)
D:\MAYANHVIETNAM\PROJECT\scraped\               (copy của scraped/)
```

---

## 🆕 SECTION SCRAPED DATA (2026-07-10)

### 📊 Danh sách scraped files

| File | Loại | Có gì |
|------|------|------|
| `scraped/homepage.json` | Homepage | 5 hero banners + 9 categories + Top 10 cameras/lenses/flycams/action + footer + payment icons SVG + store addresses + company info |
| `scraped/plp-may-anh.json` | PLP | 29 sản phẩm máy ảnh với prices, brands, thumbnails, slugs |
| `scraped/plp-ong-kinh.json` | PLP | 31 sản phẩm ống kính với brands, mount types (RF/EF/Z/FE/L/Tamron...) |
| `scraped/plp-flycam.json` | PLP | 29 sản phẩm flycam (DJI Mavic/Mini/Air/Avata/Fimi...) |
| `scraped/pdp-canon-r50.json` | PDP | Canon EOS R50: 10 gallery images, full specs, variants, promotions, included items |
| `scraped/pdp-sony-a7iv.json` | PDP | Sony A7 IV: 6 images, full specs 33MP, kit variant, package includes |
| `scraped/policy-warranty.md` | Policy | Full nội dung chính sách BH + đổi trả + 4 store addresses + hotline |

### Đặc điểm scraped data
- **Tất cả giá**: VNĐ format `X,XXX,XXXđ`, "Vui lòng gọi" cho SP chưa niêm yết (DJI flycam ~90%)
- **Specs**: Tiếng Việt, đầy đủ `sensor_format`, `iso`, `video_resolution`, `weight`, `battery`...
- **Variants**: Canon R50 có 3 điều kiện (Mới/Like new/Đẹp); Sony A7 IV có kit variant
- **Promotions**: Canon R50 kèm "Tặng thẻ nhớ 32Gb" + "Dán màn hình free trọn đời"

### Giới hạn scraped data
- ⚠️ Flash sale page: **dynamic load qua JS** — không scrape được sản phẩm
- ⚠️ Một số giá "Vui lòng gọi" thay vì giá số
- ⚠️ Reviews/ratings: chưa scrape
- ⚠️ Store coordinates (lat/lng) KHÔNG có trong HTML

---

## 1. `mayanhvietnam-observation-report.md` (72 KB / 2,598 dòng)

**Loại**: Báo cáo quan sát site mayanhvietnam.com hiện tại + thiết kế rebuild
**Độ tin cậy**: ⭐⭐⭐⭐⭐ CAO NHẤT — phân tích trực tiếp từ frontend site thật
**Ngày tạo**: 2026-07-07

### Nội dung chi tiết theo section

| Section | Dòng | Nội dung cụ thể |
|---------|------|-----------------|
| **§1 Site Overview** | 1–25 | 1 bảng thông tin: tên, domain, loại (B2C-OMO), thị trường (VN), 4 cửa hàng (TP.HCM, Cần Thơ, An Giang, Tiền Giang), hotline 0937.148.222, social channels, tech stack hiện tại vs target, cổng thanh toán (VISA/MC/JCB/NAPAS/HomePayLater/MoMo) |
| **§2 Information Architecture** | 27–162 | Sitemap đầy đủ URLs (homepage, /san-pham/, /danh-muc/ [7 sub], /danh-muc-2nd/, /dich-vu-lap-phong, flash sale, khuyến mãi, giỏ hàng, checkout, chính sách, liên hệ, login, blog). Navigation hierarchy (main nav, category grid 9 items, product tabs new/used, footer). Category taxonomy 9 categories với slug + sub-variants. **Product Data Model** — TypeScript interfaces: Product, ProductImage, ProductVariant, Category |
| **§3 Design System Tokens** | 166–308 | Design tokens YAML: colors (primary #1a1a2e, accent #e94560), typography (Inter + Roboto Condensed), spacing (4px base), borders, shadows, icons (Lucide), images aspect ratios. Recommended Tailwind v4 theme CSS variables |
| **§4 Component Tree** | 312–604 | Cây component hoàn chỉnh cho TOÀN BỘ trang: RootLayout (Header → Footer → FloatingCTA → CartDrawer), HomePage (HeroSlider → CategoryIconGrid → FlashSaleSection → 4 ProductSections → BrandLogos → SocialProof), CategoryPage (FilterSidebar → SortBar → ProductGrid → Pagination), ProductPage (Gallery → 3DViewer → ARPreview → VariantSelector → LensChecker → Tabs → RelatedProducts), CartPage, CheckoutPage, LoginPage, AccountPage, StoreLocator, BlogPage, **AdminApp** (Dashboard → Product/Order/FlashSale/Banner/Review/Inventory/Analytics Management) |
| **§5 Component Inventory** | 608–1703 | **45 components** với TypeScript props interface chi tiết + BE source endpoint + responsive behavior + animation + SEO notes. Chia 6 nhóm: Shared (8: Header, Footer, SearchBar, MobileNav, CartDrawer, Breadcrumb, Badge, FloatingCTA), Product (9: ProductCard, ProductGrid, ProductGallery, Product3DViewer, ARPreview, PriceDisplay, VariantSelector, ProductSpecs, LensCompatibilityChecker), Marketing (6: HeroSlider, FlashSaleSection, CountdownTimer, CategoryIconGrid, DealBanner, SocialProof), E-commerce Flow (5: CartPage, CheckoutForm, OrderConfirmation, WishlistButton, QuickView), Domain-Specific (4: TradeInWidget, StudioSetupWizard, BodyLensMatcher, StoreLocatorMap), Admin (13: DashboardLayout, StatsCards, DataTable, ProductForm, MediaUploader, FlashSaleForm, BannerForm, OrderDetail, ReviewManagement, InventoryTracker, CustomerAnalytics, SEOForm) |
| **§6 Page-by-Page Breakdown** | 1705–1751 | Bảng chi tiết từng page (Homepage, Category Listing, Product Detail) với section → component mapping + BE endpoint + priority (P0/P1/P2) |
| **§7 API Contract Blueprint** | 1754–1955 | NestJS module structure + 12 modules (Products, Categories, Cart, Orders, FlashSales, Banners, Auth, Customers, Reviews, Stores, Media, Admin) với controller methods, HTTP verbs, params, DTO names |
| **§8 Prisma Schema** | 1959–2364 | **15+ models** đầy đủ: User, RefreshToken, Address, Category (self-referencing tree), Brand, Product (với SEO fields, mount, 3D/AR URLs), ProductImage, ProductVariant, ProductSpec, CompatibleLens (domain-specific), Cart, CartItem, Order (với 7 statuses + shipping snapshot), OrderItem, OrderTimeline, FlashSale, FlashSaleItem, Banner, Review, Wishlist, Store, SiteSetting. Bao gồm indexes, enums (Role, ProductStatus, Availability, OrderStatus, PaymentStatus, ReviewStatus) |
| **§9 SEO Implementation** | 2368–2482 | Structured data templates (Product, LocalBusiness, BreadcrumbList, FAQ schemas), meta tag patterns cho 4 page types, SEO checklist 14 items |
| **§10 Roadmap** | 2485–2551 | 4-phase roadmap: Foundation (t1-4), Commerce Enhancement (t5-8), Immersive Features (t9-12), Spatial Commerce (t13-16). Tech stack cho immersive: R3F, Drei, model-viewer, Framer Motion, GSAP, Zustand |
| **Appendix** | 2555–2598 | Environment variables reference (database, auth, CORS, upload, CDN, 3D assets, maps, social, analytics) |

### Khi nào dùng file này
- Cần biết **sitemap/URL structure** của site hiện tại
- Cần **data model** (TypeScript interfaces hoặc Prisma schema)
- Cần **component inventory** với props interfaces
- Cần **API endpoint mapping** cho NestJS modules
- Cần **SEO implementation** plan (structured data, meta tags)
- Cần **roadmap** phát triển

### Giới hạn
- Product data model là **"infer từ frontend"** — không phải từ DB thật
- Design tokens là phân tích từ frontend, không phải từ brand guideline chính thức
- API endpoints là **blueprint thiết kế**, chưa implement

---

## 2. `mayanhvietnam-image-urls.md` (56 KB / 634 dòng)

**Loại**: Inventory URL ảnh trực tiếp từ CDN mayanhvietnam.com
**Độ tin cậy**: ⭐⭐⭐⭐⭐ — URL ảnh thật, trích xuất từ source code site
**Ngày tạo**: 2026-07-08

### Nội dung chi tiết

| Section | Số lượng | Chi tiết |
|---------|----------|---------|
| **Logo & Brand** | 3 | Logo trắng icon, logo trắng full, logo Bộ Công Thương (PNG) |
| **Banner** | 9 | Banner Tết (PNG/WebP), banner khuyến mãi desktop/mobile, banner EOS R50 — URLs dạng `/asset/imgs/...` |
| **Danh mục thumbnails** | 9 | Ảnh đại diện 9 danh mục (Webp): máy ảnh, ống kính, sản phẩm cũ, setup phòng, action camera, flycam, thiết bị studio, phụ kiện, máy quay phim |
| **UI Icons** | 6 | high-quality, truck (giao hàng), tick (bảo hành), setting (tư vấn), payment, search |
| **📷 Máy ảnh** | ~40 | Canon (EOS R50/R8/R7/R3/RP/PowerShot V1), Sony (A7IV/A7III/A7RV/ZV-E10/ZV-1 II/A6700/A6400/A1), Nikon (Z30/Z50/Z5/Z6III/Z8/Z9), Fujifilm (X-S20/X-T5/X-T50) |
| **🔭 Ống kính** | ~40 | Canon RF (18-45/50mm/24-105/100-500), Sony FE (24-70/50mm/70-200), Nikon Z (24-70/50mm), Sigma, Tamron, Viltrox, Kase |
| **🚁 Flycam** | ~30 | DJI Mavic 3 Pro, Mini 4 Pro, Air 3, Avata 2, Inspire 3, Phantom 4, Fimi X8 |
| **🏃 Action Camera** | ~40 | GoPro (Hero 13/12), DJI Osmo (Action 5 Pro/Pocket 3), Insta360 (X4/GO 3S/Ace Pro 2), Sony, Nikon |
| **🎒 Phụ kiện** | ~30 | Túi Billingham (nhiều mẫu), phụ kiện chung |
| **💡 Thiết bị Studio** | ~30 | Đèn Godox (SL/FV series), Nanlite (Forza/Pavotube), Jinbei, Gimbal DJI (RS4/Mavic) |
| **📹 Máy quay phim** | ~30 | Sony FX30/FX3, Canon Cinema, Blackmagic, Panasonic, DJI Ronin 4D |
| **Payment Icons** | 6 | SVG icons cho các cổng thanh toán |
| **TỔNG CỘNG** | **~264 ảnh** | |

### Format URL
```
Product:  /image-data/san-pham/{yy-MM}/{yy-MM-dd}/{timestamp}/avatar/{filename}.jpg
Banner:   /asset/imgs/img/{filename}.{png|webp}
Icon:     /asset/imgs/icon/{filename}.{png|webp}
Category: /asset/imgs/img/danhMuc_{tenDanhMuc}.webp
```

### Khi nào dùng file này
- Cần **ảnh sản phẩm thật** cho demo/prototype ( Canon, Sony, Nikon, DJI...)
- Cần **logo, banner, icon** thật từ CDN mayanhvietnam
- Cần **thumbnail category** cho PLP
- Cần URL ảnh theo format CDN để build `<Image>` components

### Giới hạn
- Đây là **danh sách URL**, KHÔNG download ảnh về
- Có thể URL bị **404/hết hạn** theo thời gian — nên verify trước khi dùng
- Chỉ có **avatar image** (500x500), không có ảnh gallery chi tiết
- KHÔNG có data: giá, tên sản phẩm, mô tả — chỉ có URL ảnh

---

## 3. `design-analysis.md` (37 KB / 800 dòng)

**Loại**: Phân tích xu hướng thiết kế + competitor + đề xuất design direction
**Độ tin cậy**: ⭐⭐⭐⭐ — phân tích + recommendations (chứ không phải data site thật)
**Ngày tạo**: 2026-07-07

### Nội dung chi tiết

| Section | Dòng | Nội dung cụ thể |
|---------|------|-----------------|
| **§1 Bức Tranh Thiết Kế 2026** | 1–41 | 3 xu hướng lớn: Premium Product Presentation, Immersive Commerce, Conversion-Focused UX. Phân tích tại sao camera e-commerce khác với e-commerce thông thường (giá cao, specs quan trọng, visual-first, OMO) |
| **§2 Phân Tích Competitor** | 44–107 | **4 đối thủ**: FPTShop (layout, color #E3000B, UX pattern FOMO, mobile-first, không 3D), B&H Photo (mega menu, comparison tools, 360° view, expert reviews), Apple Store (scroll storytelling, 3D/AR native, premium feel). **Gap Analysis** bảng so sánh 10 features (Flash Sale, Product Depth, 3D Viewer, AR, Lens Compatibility, Body+Lens Config, Dark Mode, Premium Feel, Vietnamese UX). Kết luận: mayanhvietnam = combo FOMO VN + B&H depth + Apple immersive + unique 3D/AR |
| **§3 Ba Direction Thiết Kế** | 109–177 | **Direction A: "Dark Professional" (Recommended)** — rich black #0a0a0f, teal accent #00d4aa, orange sale #ff6b35. **Direction B: "Clean Minimal White"** — white #fafafa, blue accent. **Direction C: "Photography Film Noir"** — warm #f5f0eb, Kodak red. Mỗi direction có visual references + pros/cons |
| **§4 Khuyến Nghị Direction A** | 181–698 | Layout philosophy ("Less chrome, more product"). **Homepage Layout** ASCII wireframe chi tiết (TopBar → Nav → Hero 80vh → Category Grid → Flash Sale → Product Sections → Body+Lens Configurator → Flycam → Community → Store Locator → Footer). **PDP Layout** ASCII wireframe (Gallery + 3D/AR viewer, Product Info, Mount/Kit Selector, Lens Compatibility, Specs Tabs, Related Products). **Color System** CSS variables dark + light theme. **Typography** system (Inter + JetBrains Mono cho prices, modular ratio 1.25). **Component Design Patterns** — ASCII specs cho Product Card (dark theme + hover states), Glassmorphism Card, Flash Sale Card, Price Display (3 layouts). **Animation & Motion Design** — Framer Motion code patterns (7 patterns: page entrance, card hover, Ken Burns, countdown pulse, drawer slide, icon bounce, 3D load). **Responsive Breakpoints** table (10 components × 3 breakpoints). **Glassmorphism & Special Effects** — CSS cho glass, glow-accent, glow-sale, noise texture, gradient text, scroll indicator |
| **§5 Visual Direction Summary** | 713–739 | Mood board keywords (DARK/PROFESSIONAL/CINEMATIC/IMMERSIVE/TECHNICAL/CONFIDENT). 5 items "Tránh" + 10 items "Nên" |
| **§6 Design Tokens cho Tailwind v4** | 742–796 | CSS @theme block đầy đủ: dark theme colors, typography vars, spacing scale, border-radius scale |

### Khi nào dùng file này
- Cần **competitor analysis** (FPTShop, B&H, Apple)
- Cần **design direction recommendations** + lý do
- Cần **layout wireframes** (ASCII) cho Homepage & PDP
- Cần **color system, typography, animation patterns**
- Cần **responsive breakpoint table**
- Cần **Tailwind CSS v4 @theme tokens**

### Giới hạn
- Đây là **phân tích + đề xuất**, KHÔNG phải data từ site mayanhvietnam thật
- Wireframe ở dạng ASCII, không phải HTML/image
- Color tokens là đề xuất rebuild, KHÔNG phải màu hiện tại của site

---

## 4. `observation-prompt-template.md` (14 KB / 391 dòng)

**Loại**: Prompt template ~4800 từ để chạy AI Commerce Observer Agent
**Độ tin cậy**: ⭐⭐⭐⭐ — prompt template có cấu trúc tốt, đã test
**Ngày tạo**: 2026-07-08

### Nội dung chi tiết

| Section | Nội dung |
|---------|---------|
| **Hướng dẫn sử dụng** | 3 bước: Copy prompt → Paste vào AI kèm URL → AI trả Structured Observation Report |
| **DOMAIN CONTEXT** | Ngành máy ảnh VN, OMO, currency VND, tech target, inspiration reference |
| **DESIGN REFERENCE** | Dual-mode tokens (Light: warm cream #FFF8F0, orange #FF6B35; Dark: rich black #0a0a0f, orange glow) |
| **LAYER 1: Information Architecture** | Yêu cầu AI map site type, sitemap URLs, nav hierarchy, URL routing, category/product taxonomy, search/filters, user journeys. Output format: YAML |
| **LAYER 2: Visual Design System** | Yêu cầu extract design tokens: colors (light + dark modes), typography, spacing, borders, shadows, icons, images. Output format: YAML |
| **LAYER 3: Component Architecture** | Yêu cầu inventory component tree + props interfaces + responsive behavior |
| **LAYER 4: Interaction & Animation** | Yêu cầu catalog hover states, scroll effects, transitions, loading states |
| **LAYER 5: Business Logic** | Yêu cầu map user journeys, cart flow, checkout flow, payment methods |
| **LAYER 6: SEO & Performance** | Yêu cầu structured data, meta tags, Core Web Vitals, image optimization |
| **LAYER 7: Content Strategy** | Yêu cầu categorize content types, content hierarchy, tone of voice |
| **Output Format** | JSON schema chi tiết cho Structured Observation Report |

### Khi nào dùng file này
- Cần **tạo prompt** để AI phân tích bất kỳ website e-commerce camera nào
- Cần **biết cấu trúc Observation Report** tiêu chuẩn
- Cần **reference** cho cách thiết kế prompt AI observation

### Giới hạn
- Đây là **prompt**, không phải kết quả phân tích
- Cần kết hợp với 1 AI model + URL target để chạy

---

## 5. `opensource-design-repositories.md` (15 KB / 271 dòng)

**Loại**: Danh sách GitHub repos design system / UI library
**Độ tin cậy**: ⭐⭐⭐⭐ — số liệu lấy từ GitHub API, nhưng stars có thể thay đổi
**Ngày tạo**: 2026-07-08

### Nội dung chi tiết

| Section | Nội dung |
|---------|---------|
| **Bảng tổng hợp** | 22 repos ranked by stars: Next.js (140k), Bootstrap (174k), MUI (118k), Ant Design (98.6k), Mantine (98.6k), Tailwind (95.8k), awesome-design-systems (55.3k), tldraw (48.6k), Chakra UI (41.4k), Element Plus (41k), DaisyUI (40.5k), shadcn/ui (31.4k), HeroUI (29.8k), React Spectrum (27.6k), Magic UI (27.3k), Lucide (23.3k), Recharts (21.5k), Radix (19k), Vuetify (15.6k), PrimeNG (12.5k), Tremor (3.5k) |
| **Chi tiết top 10** | Mỗi repo: stars, license, stack, description, **phù hợp mayanhvietnam?** assessment |

### Khi nào dùng file này
- Cần **lựa chọn UI library** cho project mayanhvietnam
- Cần **so sánh stars, license, stack** giữa các design system
- Cần **recommendation** library nào phù hợp camera e-commerce

### Giới hạn
- Stars có thể đã thay đổi từ 2026-07-08
- Chỉ cover 22 repos, không exhaustive

---

## 6. `📌 NOTE RESEARCH SEO.docx` (208 KB)

**Loại**: File Word — notes nghiên cứu SEO
**Độ tin cậy**: ⭐⭐⭐ — cần verify nội dung (không đọc được bằng text tool)

### Khi nào dùng
- Cần **reference SEO** nghiên cứu từ mayanhvietnam.com
- ⚠️ Nên convert sang .md trước khi agent dùng

---

## 7. `insta360-page.html` (274 KB)

**Loại**: HTML file đã scrape 1 trang Product Detail Page (PDP) của Insta360 trên mayanhvietnam.com
**Độ tin cậy**: ⭐⭐⭐⭐⭐ — HTML thô lấy trực tiếp từ site
**Vị trí**: Chỉ có trong `D:\LOOP_COMPANY\mayanhvietnam-new\docs\`

### Nội dung chi tiết
- **Product**: Insta360 (một trong các action camera trên mayanhvietnam.com)
- **Bao gồm**: HTML structure đầy đủ của 1 PDP — header, gallery, product info, specs, related products, footer
- **Format**: Raw HTML với inline styles, images CDN URLs thật

### Khi nào dùng
- Cần **biết structure HTML** thật của 1 PDP trên mayanhvietnam.com
- Cần **extract CSS patterns**, layout, component structure từ HTML thật
- Cần **reference** cho cách site thật render product page
- Cần **scrape thêm data** (prices, specs, descriptions) từ HTML này

### Giới hạn
- Chỉ có **1 PDP** (Insta360), không phải toàn bộ catalog
- HTML cũ — có thể có thay đổi layout từ ngày scrape
- Không có JavaScript interaction states

---

## 📊 Tổng kết nhanh: Có gì / Không có gì

### ✅ ĐÃ CÓ (dùng được ngay)

| Dữ liệu | File nguồn |
|---------|-----------|
| Sitemap + URL structure | observation-report §2.1 |
| Navigation hierarchy | observation-report §2.2 |
| Category taxonomy (9 categories) | observation-report §2.3 |
| Product Data Model (TypeScript + Prisma) | observation-report §2.4 + §8 |
| Design tokens (current + rebuild) | observation-report §3 + design-analysis §6 |
| Component inventory (45 components + props) | observation-report §5 |
| Component tree (full app) | observation-report §4 |
| Page-by-page section mapping | observation-report §6 |
| API contracts (12 NestJS modules) | observation-report §7 |
| Prisma schema (15+ models) | observation-report §8 |
| SEO structured data templates | observation-report §9 |
| 4-phase roadmap | observation-report §10 |
| Competitor analysis (FPTShop/B&H/Apple) | design-analysis §2 |
| Layout wireframes (ASCII) | design-analysis §4 |
| Color system (dark + light) | design-analysis §4.4 |
| Typography system | design-analysis §4.5 |
| Animation patterns (Framer Motion) | design-analysis §4.7 |
| Responsive breakpoint table | design-analysis §4.8 |
| ~264 URLs ảnh thật từ CDN | image-urls.md |
| 1 PDP HTML thật (Insta360) | insta360-page.html |
| UI library recommendations | opensource-design-repositories.md |
| **Homepage thật (5 banners + 9 categories + top products)** | **scraped/homepage.json** |
| **PLP may-anh (29 products với giá + brand)** | **scraped/plp-may-anh.json** |
| **PLP ong-kinh (31 products với mount types)** | **scraped/plp-ong-kinh.json** |
| **PLP flycam (29 DJI/Fimi products)** | **scraped/plp-flycam.json** |
| **PDP Canon R50 (full specs + 10 images + variants)** | **scraped/pdp-canon-r50.json** |
| **PDP Sony A7 IV (full specs + kit variant)** | **scraped/pdp-sony-a7iv.json** |
| **Policy bảo hành/đổi trả (full text)** | **scraped/policy-warranty.md** |

### ❌ CHƯA CÓ (cần scrape thêm nếu cần)

| Dữ liệu | Mô tả | File cần tạo |
|---------|-------|-------------|
| **Flash sale data** | Products trong `/danh-muc/san-pham-flash-sale` — dynamic JS, cần browser automation | `plp-flash-sale.json` |
| **Action camera PLP** | Top 10 action cameras chỉ có trên homepage, chưa scrape PLP riêng | `plp-action-camera.json` |
| **Phụ kiện + studio PLP** | Chưa scrape 2 danh mục còn lại | `plp-phu-kien.json`, `plp-thiet-bi-studio.json` |
| **PDP DJI Mini 5 Pro** | Top flycam #1, chưa có PDP chi tiết | `pdp-dji-mini-5-pro.json` |
| **PDP Sony A7C II, Nikon Z6 II** | Top cameras nhưng chưa có PDP | nhiều files |
| **PDP ống kính Canon RF 24-70mm** | Top lens, chưa có PDP | `pdp-canon-rf-2470.json` |
| **Reviews/ratings** | Cả PDP scrape không có review count/rating | n/a (cần scroll trigger JS) |
| **Store coordinates** | Lat/lng 4 cửa hàng — không có trong HTML | `stores-geo.json` |
| **Brand list riêng** | Danh sách thương hiệu + logo + slug — chỉ lấy được qua category filter | `brands.json` |
| **PLP pagination** | Trang 2, 3,... chỉ mới scrape page 1 | `plp-*-page2.json` |
| **Chính sách thanh toán** | `/chinh-sach-thanh-toan` | `policy-payment.md` |
| **Chính sách vận chuyển** | `/chinh-sach-van-chuyen` | `policy-shipping.md` |
| **Liên hệ page** | `/thong-tin-lien-he` | `contact.md` |

---

> **⚠️ LƯU Ý CHO AI AGENTS**:
>
> 1. **Observation/design files** chứa dữ liệu **phân tích + thiết kế** (KHÔNG có data sản phẩm thật).
> 2. **`scraped/*` files** chứa **data thật từ site** — đã verify URLs/giá/specs. Dùng file này khi cần data thực tế.
> 3. **`image-urls.md`** là URL ảnh (KHÔNG có metadata sản phẩm).
> 4. Khi cần data không có trong catalog: scrape thêm HOẶC nói rõ "chưa có trong nguồn tham chiếu".
> 5. **KHÔNG SUY ĐOÁN** dữ liệu.
