# Observation Prompt Template — Camera E-commerce

> **Mục đích**: Prompt ngắn gọn (~4800 từ) để phân tích website e-commerce máy ảnh theo style "Dual-mode: Light Warm + Dark Immersive" với 3D product viewer.

---

## 🚀 Cách Dùng

1. Copy toàn bộ prompt bên dưới
2. Paste vào AI kèm URL cần phân tích
3. AI trả về **Structured Observation Report** → dùng để generate code

---

## --- PROMPT BẮT ĐẦU ---

```
You are a **Commerce Observer Agent** — full-stack architect chuyên Immersive Commerce (3D, AR, spatial). Phân tích {URL} và xuất **Structured Observation Report** theo đúng format dưới đây.

## DOMAIN CONTEXT (cho camera e-commerce VN)
- Ngành: Máy ảnh, ống kính, flycam, action camera, studio gear
- Thị trường: Việt Nam, OMO (4 cửa hàng offline)
- Currency: VND, format `XX.XXX.XXX₫`
- Tech target: Next.js 15 + Tailwind v4 + NestJS 11 + Prisma + Three.js/R3F
- Inspiration: Camera Store (light warm) + Camera Store Dark Pro (dark immersive)
- Unique features: Body+Lens configurator, 3D viewer, mount selector, AR preview

## DESIGN REFERENCE (Dual-mode)
**Light Mode**: Warm cream bg `#FFF8F0`, accent orange `#FF6B35`, soft shadows
**Dark Mode**: Rich black `#0a0a0f`, accent orange `#FF6B35` glow, immersive glow effects
**Common**: Cinematic hero với product on pedestal, side thumbnail gallery, glow accents, product card với badge "NEW/HOT/-%", clean mono font cho prices

---

### LAYER 1: Information Architecture
Map đầy đủ: site type (B2C/OMO), positioning, sitemap đầy đủ URLs, nav hierarchy (mega-menu/sidebar/footer), URL routing pattern, category taxonomy (9 main: máy ảnh/lens/flycam/action/studio/phụ kiện/cũ/lắp phòng/camera), product taxonomy (variants: mount, kit, color), search & filters, user journeys (browse → compare → cart → checkout).

Output:
```yaml
sitemap: [{url, type, title, parent}]
categories: [{name, slug, icon, subcategories, count}]
navigation: {main, mega, footer, mobile_bottom_bar}
user_journeys: [{name, steps}]
```

### LAYER 2: Visual Design System
Extract đầy đủ tokens:
```yaml
design_system:
  brand_personality: "Professional camera retailer với dual-mode UI"
  mode: "dual-light-dark"
  
  # === LIGHT MODE (Warm) ===
  light:
    bg_primary: "#FFF8F0"
    bg_surface: "#FFFFFF"
    bg_elevated: "#FFFCF7"
    text_primary: "#1a1a1a"
    text_secondary: "#666666"
    accent: "#FF6B35"          # Orange CTA
    accent_hover: "#E55A2B"
    border: "#E8E0D5"
    sale: "#FF4444"
    
  # === DARK MODE (Immersive) ===
  dark:
    bg_primary: "#0a0a0f"      # Rich black
    bg_surface: "#16161f"
    bg_elevated: "#1c1c28"
    text_primary: "#f0f0f5"
    text_secondary: "#8888a0"
    accent: "#FF6B35"          # Orange glow
    accent_glow: "rgba(255,107,53,0.25)"
    border: "#2a2a38"
    sale: "#FF6B35"
    glow_card: "0 0 30px rgba(255,107,53,0.15)"
    
  # === COMMON TOKENS ===
  typography:
    font_primary: "Inter, sans-serif"
    font_heading: "Inter, sans-serif"
    font_mono: "JetBrains Mono, monospace"  # Prices & specs
    heading: {h1:"48-64px", h2:"36px", h3:"24px", h4:"20px"}
    body: {lg:"18px", md:"16px", sm:"14px", xs:"12px"}
    weights: [400, 500, 600, 700]
    
  spacing: {xs:"4px", sm:"8px", md:"16px", lg:"24px", xl:"32px", "2xl":"48px"}
  radius: {sm:"6px", md:"12px", lg:"16px", xl:"24px", full:"9999px"}
  shadows:
    light: {sm:"0 1px 3px rgba(0,0,0,0.08)", md:"0 4px 12px rgba(0,0,0,0.08)", lg:"0 12px 32px rgba(0,0,0,0.1)"}
    dark:  {sm:"0 1px 3px rgba(0,0,0,0.4)", md:"0 4px 12px rgba(0,0,0,0.4)", lg:"0 12px 32px rgba(0,0,0,0.6)"}
    
  images:
    product: {aspect:"1:1", bg:"gradient pedestal", format:"WebP+AVIF"}
    hero:    {aspect:"16:9 desktop / 9:16 mobile", style:"cinematic"}
    lifestyle: {style:"warm tone light / moody dark"}
    
  icons:
    style: "outline"
    library: "Lucide React"
    size: {sm:"16", md:"20", lg:"24", xl:"32"}
    
  mode_toggle:
    default: "light"
    trigger: "manual toggle + prefers-color-scheme"
    transition: "300ms ease-in-out"
```

### LAYER 3: UI Components Inventory
Catalog mỗi component với:
```yaml
component:
  name: "PascalCase"
  category: "layout|navigation|display|form|commerce|immersive|marketing"
  description: "..."
  visual_pattern: "grid|card|carousel|modal|drawer|hero|gallery"
  responsive:
    mobile: "stack|hide|scroll"
    tablet: "..."
    desktop: "..."
  states: ["default","hover","active","loading","empty","error"]
  animation: "fade|slide|scale|parallax|3d-rotate|glow"
  a11y: {aria_role, keyboard_nav, focus_ring}
  seo: "high|medium|low"
  children: [...]
```

**Core Components cần catalog**:
- Header (logo, search, nav, cart badge, user, mode toggle)
- MobileNav + BottomBar
- Footer (4-col + map preview)
- HeroSlider (cinematic full-bleed, ken-burns)
- CategoryIconGrid (9 categories)
- ProductCard (badge NEW/HOT/-%, glow on hover, mono price)
- ProductGrid (4-col desktop / 2-col mobile)
- FlashSaleSection (countdown + progress bar + sale badge glow)
- ProductGallery (side thumbnails + main zoom)
- Product3DViewer (interactive rotate/zoom, pedestal bg)
- ARPreviewButton (model-viewer fallback)
- PriceDisplay (mono font, sale strikethrough)
- VariantSelector (mount, kit, color swatches)
- QuantitySelector (- + stepper)
- AddToCartButton (orange accent + cart icon)
- LensCompatibilityChecker (body+lens matcher)
- BodyLensConfigurator (interactive builder)
- CountdownTimer (flash sale)
- DealBanner (full-width promotional)
- BrandLogos (Canon, Sony, Nikon, DJI...)
- SocialProof (star ratings + review count)
- FloatingCTA (call/messenger/zalo)
- CartDrawer (slide-in)
- Breadcrumb (with schema)
- Badge (NEW, HOT, -%, SALE, NEW ARRIVAL)
- TrustBar (4-column: shipping/authentic/warranty/payment)
- SearchBar (instant suggestions)

### LAYER 4: E-commerce Features
Checklist:
- Product display: gallery + 360° + 3D
- Pricing: original + sale + installment ("Từ X/tháng × 12 tháng")
- Variants: mount (RF/E/Z), kit (body only/kit lens), color
- Cart: drawer + page + mini-cart
- Checkout: guest/registered, multiple payment methods
- Payment: VISA, MasterCard, JCB, COD, MoMo, ZaloPay, HomePayLater, Kredivo, bank transfer
- Shipping: nationwide, free > 2tr, tracking
- Promotions: flash sale, coupon, trade-in (Thu cũ đổi mới), bundle (body+lens combo), installment 0%
- Wishlist, compare, recently viewed
- Reviews & ratings (5-star, photo reviews)
- Order tracking
- 30-day return policy

### LAYER 5: Immersive Commerce Features
Map features này với tech stack:
```yaml
immersive_features:
  - name: "3D Product Viewer"
    technology: "react-three-fiber + drei"
    file_format: "glb"
    interactions: ["rotate","zoom","pan","auto-rotate"]
    mobile: true
    fallback: "high-res image gallery"
    perf: "lazy-load, draco compression, LOD"
    
  - name: "AR Preview"
    technology: "model-viewer + WebXR"
    file_format: "usdz (iOS) + glb (Android)"
    interactions: ["place-in-room","scale-check"]
    fallback: "3D viewer or image"
    
  - name: "360° Product Spin"
    technology: "image sequence + CSS transform"
    interactions: ["drag-rotate"]
    
  - name: "Body+Lens Configurator"
    technology: "react state machine"
    inputs: [{body, lens, combo}]
    output: {price, savings, compatibility, total}
    
  - name: "Interactive Hero"
    technology: "CSS ken-burns + scroll parallax"
    interactions: ["auto-play","hover-pause"]
    
  - name: "Glow Effects"
    technology: "CSS box-shadow + filter:drop-shadow"
    triggers: ["hover","active-state","flash-sale"]
```

### LAYER 6: SEO & Performance
- Title per page type: `{ProductName} | Camera Store`, `{Category} chính hãng giá tốt`
- Meta description: 150-160 chars, include price + USP
- OG tags: og:image (1200x630), og:type (product|website)
- Structured data: Product (price, availability, brand, sku), BreadcrumbList, LocalBusiness × 4 stores, Organization, FAQ, Review
- Sitemap.xml: products + categories + pages + images
- Robots: disallow /admin/, /api/, /cart, /checkout
- Image: WebP+AVIF, lazy load except LCP, descriptive alt
- Core Web Vitals: LCP < 2.5s (hero preload), CLS < 0.1 (aspect-ratio), INP < 200ms
- Preconnect: CDN, Google Fonts, Maps API

### LAYER 7: Backend API Surface
NestJS modules cần design:
```yaml
api_modules:
  products:        # GET /api/products (filter: brand, price, mount, isUsed, inStock)
                   # GET /api/products/:slug
                   # GET /api/products/:id/3d-model
                   # GET /api/products/:id/ar-asset
                   # GET /api/products/:id/compatible-bodies
                   # GET /api/products/search?q=
                   # POST /api/admin/products (CRUD)
  
  categories:      # GET /api/categories
                   # GET /api/categories/:slug/products
  
  cart:            # GET/POST/PATCH/DELETE /api/cart/items
                   # GET /api/cart
                   # POST /api/cart/apply-coupon
                   # POST /api/cart/estimate-shipping
  
  orders:          # POST /api/orders
                   # GET /api/orders (user history)
                   # GET /api/orders/:id
                   # POST /api/orders/:id/cancel
  
  flash-sales:     # GET /api/flash-sales/active
                   # GET /api/flash-sales/:id/products
                   # POST /api/admin/flash-sales (CRUD)
  
  banners:         # GET /api/banners?type=hero|promo
                   # POST /api/admin/banners (CRUD)
  
  auth:            # POST /api/auth/register
                   # POST /api/auth/login
                   # POST /api/auth/refresh
                   # GET /api/auth/me
  
  customers:       # GET /api/customers/orders
                   # GET /api/customers/wishlist
                   # POST /api/customers/wishlist
                   # DELETE /api/customers/wishlist/:productId
  
  reviews:         # GET /api/products/:id/reviews
                   # POST /api/reviews
                   # GET /api/reviews/stats
  
  stores:          # GET /api/stores (4 locations)
                   # GET /api/stores/:id
  
  media:           # POST /api/media/upload (images)
                   # POST /api/media/upload-3d (glb, gltf)
                   # POST /api/media/upload-ar (usdz)
                   # DELETE /api/media/:id
  
  shipping:        # GET /api/shipping/methods
                   # POST /api/shipping/calculate
  
  payment:         # GET /api/payment/methods
                   # POST /api/payment/process
  
  admin:           # GET /api/admin/dashboard/stats
                   # CRUD cho tất cả entities
                   # GET /api/admin/analytics/*
```

### LAYER 8: Mobile & Responsive
- Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536
- Mobile nav: hamburger + slide drawer + bottom bar (Home/Categories/Cart/Account)
- Touch: swipe carousel, pull-to-refresh, long-press quick view
- PWA: add to home screen, offline cache, push notifications
- Mobile AR: gyroscope sensor, camera access
- Performance: 3D model degrade (lower poly), image CDN with WebP fallback

---

## OUTPUT FORMAT

Sau khi phân tích, output theo cấu trúc này:

# 📋 Observation Report: {Site Name}

## 1. Site Overview (3-5 dòng)
## 2. Information Architecture (YAML sitemap + categories)
## 3. Design System Tokens (YAML — dual light/dark mode)
## 4. Component Inventory (table với name, props, BE mapping)
## 5. Page Breakdown (Homepage/PLP/PDP/Cart/Checkout/Admin)
## 6. Component Props Contract (TypeScript interfaces cho mỗi component)
## 7. API Contract (NestJS modules + endpoints)
## 8. Database Schema (Prisma hints — 10+ models)
## 9. SEO Plan (structured data + meta patterns)
## 10. Immersive Roadmap (3D → AR → Spatial phases)
## 11. Visual Style Guide (color usage, typography rules, spacing, animation patterns)
## 12. Tailwind CSS v4 Config (@theme tokens)

## COMPONENT PROPS — cho mỗi component:
```typescript
interface ProductCardProps {
  product: ProductSummary;
  variant?: 'default' | 'compact' | 'flash-sale';
  showWishlist?: boolean;
  showQuickView?: boolean;
  show3DBadge?: boolean;
  onQuickView?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string, qty: number) => void;
}

interface ProductGalleryProps {
  images: ProductImage[];
  model3DUrl?: string;
  arAssetUrl?: string;
  thumbnailsPosition?: 'left' | 'bottom';
  enableZoom?: boolean;
  enable3DToggle?: boolean;
  enableARToggle?: boolean;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
  effect?: 'fade' | 'slide' | 'ken-burns';
  showDots?: boolean;
  showArrows?: boolean;
  height?: { mobile: string; desktop: string };
}

interface BodyLensConfiguratorProps {
  mode: 'by-body' | 'by-lens';
  selectedBodyId?: string;
  selectedLensId?: string;
  availableBodies: ProductSummary[];
  availableLenses: ProductSummary[];
  compatibleCombos: LensCombo[];
  onSelectCombo?: (bodyId: string, lensId: string) => void;
}
```

## --- PROMPT KẾT THÚC ---
```

---

## 📝 Tips sử dụng

| Tip | Chi tiết |
|-----|----------|
| **URL mẫu** | `https://mayanhvietnam.com` hoặc bất kỳ camera e-commerce nào |
| **Bước 1** | `"Phân tích {URL} theo prompt observer"` |
| **Bước 2** | Nếu thiếu → `"Tiếp tục Layer X, bạn chưa có"` |
| **Bước 3** | `"Generate code từ report này cho Next.js 15 + Tailwind v4"` |
| **Bước 4** | `"Tạo Prisma schema + NestJS modules từ API contract"` |
| **Custom** | Thêm context riêng vào phần DOMAIN CONTEXT |

## 🎯 Domain-specific keywords để AI hiểu sâu

Khi paste vào AI, thêm nếu cần:
- `"Mount system: Canon RF, Sony E, Nikon Z"`
- `"Bundle product: body+lens combo giảm giá"`
- `"Trade-in: thu cũ đổi mới"`
- `"Installment: trả góp 0% qua thẻ tín dụng"`
- `"Studio service: dịch vụ lắp phông"`
- `"OMO: 4 cửa hàng tại HCM, Cần Thơ, An Giang, Tiền Giang"`

---

## 🔄 Phiên bản riêng cho mayanhvietnam.com

```
Phân tích https://mayanhvietnam.com theo prompt observer.

Context: Camera e-commerce VN, OMO model, 9 categories, dual-mode UI.
Mục tiêu: generate code cho Next.js 15 + Tailwind v4 + NestJS + Three.js.
Unique features: 3D product viewer, AR preview, body+lens configurator, 360° spin.
```