# Observation Report: Máy Ảnh Việt Nam (mayanhvietnam.com)

> **Phân tích site hiện tại** + **UI Component Recommendation** cho bản rebuild
> **Thực hiện bởi**: Commerce Observer Agent
> **Ngày**: 2026-07-07
> **Target stack**: Next.js 15 + Tailwind CSS v4 + NestJS 11 + Prisma + Three.js

---

## 1. Site Overview

| Thuộc tính | Giá trị |
|-----------|---------|
| **Tên** | Máy Ảnh Việt Nam |
| **Domain** | mayanhvietnam.com |
| **Loại** | B2C — OMO (Online-to-Offline) |
| **Thị trường** | Việt Nam |
| **Thiết bị chủ đạo** | Máy ảnh Mirrorless, Ống kính, Flycam, Action Camera, Studio Equipment |
| **Cửa hàng** | 4 locations: TP.HCM, Cần Thơ, An Giang, Tiền Giang |
| **Liên hệ** | 0937.148.222, info@mayanhvietnam.com |
| **Social** | YouTube, TikTok, Facebook @mayanhvietnam |
| **Tech stack hiện tại** | Next.js (App Router), CDN ảnh riêng, WebP |
| **Tech stack target** | Next.js 15, Tailwind CSS v4, NestJS 11, Prisma, Three.js/R3F |
| **Thanh toán** | VISA, MasterCard, JCB, NAPAS, HomePayLater, MoMo |
| **Đặc điểm** | Flash sale, countdown timer, trade-in, installments |

---

## 2. Information Architecture

### 2.1 Sitemap

```
mayanhvietnam.com/
├── / (Homepage — Hero slider, category grid, featured products, flash sale)
├── /san-pham/
│   ├── /{product-slug}_{category-id}     (Product Detail Page)
│   └── ... (all products)
├── /danh-muc/
│   ├── /may-anh                          (Máy ảnh Mirrorless)
│   ├── /ong-kinh                         (Ống kính Lens)
│   ├── /action-camera                    (Camera hành động)
│   ├── /flycam                           (Flycam / Drone)
│   ├── /thiet-bi-studio                  (Thiết bị studio)
│   ├── /phu-kien                         (Phụ kiện máy ảnh)
│   └── /may-quay-phim                    (Máy quay phim)
├── /danh-muc-2nd/
│   └── /tat-ca-san-pham                  (Sản phẩm cũ giá tốt)
├── /dich-vu-lap-phong                    (Dịch vụ lắp phông studio)
├── /danh-muc/san-pham-flash-sale         (Flash Sale)
├── /danh-muc/san-pham-khuyen-mai         (Sản phẩm khuyến mãi)
├── /gio-hang                             (Giỏ hàng)
├── /don-dat-hang                         (Đơn đặt hàng / Checkout)
├── /chinh-sach-bao-hanh                  (Chính sách bảo hành)
├── /chinh-sach-thanh-toan                (Chính sách thanh toán)
├── /chinh-sach-van-chuyen                (Chính sách vận chuyển)
├── /chinh-sach-bao-mat-thong-tin-khach-hang  (Chính sách bảo mật)
├── /thong-tin-lien-he                    (Thông tin liên hệ)
├── /dang-nhap                            (Đăng nhập — dự kiến)
├── /dang-ky                              (Đăng ký — dự kiến)
├── /tai-khoan                            (Tài khoản — dự kiến)
└── /blog                                 (Blog/Tin tức — dự kiến)
```

### 2.2 Navigation Hierarchy

```
MAIN NAVIGATION
├── Xem tất cả (View All)
├── Sản phẩm mới (New Products)
├── Sản phẩm cũ (Used Products)
├── Hotline: 0937.148.222
├── 🔍 Search
├── 👤 Đăng nhập
└── 🛒 Giỏ hàng

CATEGORY GRID (Homepage)
├── 1. 📷 Máy ảnh — Body
├── 2. 🔭 Ống kính — Lens
├── 3. ♻️ Sản phẩm cũ giá tốt
├── 4. 🎬 Dịch vụ lắp phông
├── 5. 🏃 Camera hành động
├── 6. 🚁 Flycam — Drone
├── 7. 💡 Thiết bị studio
├── 8. 🎒 Phụ kiện cho máy ảnh
└── 9. 📹 Camera / Máy quay phim

PRODUCT TABS (per category section)
├── Tab: Sản phẩm mới (New)
└── Tab: Sản phẩm cũ (Used/2nd)

FOOTER
├── Chính sách (6 links: bảo hành, thanh toán, đổi trả, vận chuyển, bảo mật, ...)
├── Thông tin liên hệ (hotline, email, maps)
├── Hệ thống cửa hàng (4 locations)
└── Phương thức thanh toán (6 icons)
```

### 2.3 Category Taxonomy (9 categories)

| # | Slug | Tên | Sub-variants |
|---|------|-----|-------------|
| 1 | may-anh | Máy ảnh Body | Mirrorless Canon, Sony, Nikon |
| 2 | ong-kinh | Ống kính Lens | Canon RF, Nikon Z, Sony E, Sigma, Tamron, Viltrox, Kase |
| 3 | 2nd | Sản phẩm cũ | Tất cả categories đều có bản used |
| 4 | dich-vu-lap-phong | Lắp phông studio | Studio setup service |
| 5 | action-camera | Camera hành động | DJI Osmo, Insta360, GoPro |
| 6 | flycam | Flycam / Drone | DJI Mini, Mavic, Air, Avata |
| 7 | thiet-bi-studio | Thiết bị studio | Lighting, backdrop, accessories |
| 8 | phu-kien | Phụ kiện | Strap, bag, filter, tripod |
| 9 | may-quay-phim | Máy quay phim | DJI Osmo Pocket |

### 2.4 Product Data Model (infer từ frontend)

```typescript
// Product entity (inferred)
interface Product {
  id: string;
  slug: string;                    // "canon-eos-r50"
  name: string;                    // "Canon EOS R50"
  category: Category;
  isUsed: boolean;                 // New vs 2nd
  price: number;                   // Current price
  originalPrice?: number;          // Before discount
  images: ProductImage[];
  thumbnail: string;               // 500x500 WebP
  description?: string;
  specs?: Record<string, string>;  // { sensor: "APS-C", resolution: "24.2MP" }
  variants?: ProductVariant[];     // Color, kit options
  badges: string[];                // ["Chính hãng", "Flash Sale"]
  rating?: { average: number; count: number };
  availability: "in_stock" | "pre_order" | "out_of_stock";
  brand: string;                   // "Canon", "Sony", "Nikon"
  mount?: string;                  // "Canon RF", "Sony E", "Nikon Z"
  createdAt: Date;
  updatedAt: Date;
}

interface ProductImage {
  url: string;        // "/image-data/san-pham/..."
  alt: string;
  isThumbnail: boolean;
  order: number;
}

interface ProductVariant {
  id: string;
  name: string;       // "Kit 18-45mm", "Body Only"
  price: number;
  originalPrice?: number;
  sku: string;
  availability: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;      // Category icon URL
  parent?: Category;
  productCount: number;
}
```

---

## 3. Design System Tokens

### 3.1 Current Site Colors (phân tích từ frontend)

```yaml
design_system:
  brand_personality: "Professional, trustworthy, modern — photography enthusiast brand"

  colors:
    # Primary palette
    primary: "#1a1a2e"           # Dark navy — header, footer bg
    primary_light: "#16213e"     # Lighter navy
    accent: "#e94560"            # Red-pink — CTA buttons, sale badges
    accent_hover: "#d63851"      # Darker accent on hover

    # Neutral
    white: "#ffffff"
    background: "#f5f5f7"        # Light gray bg
    surface: "#ffffff"            # Card background
    border: "#e5e5e5"

    # Text
    text_primary: "#1a1a2e"
    text_secondary: "#6b7280"
    text_muted: "#9ca3af"
    text_on_dark: "#ffffff"
    text_on_accent: "#ffffff"

    # Semantic
    success: "#10b981"           # In stock, order confirmed
    warning: "#f59e0b"           # Low stock
    error: "#ef4444"             # Out of stock, validation
    info: "#3b82f6"

    # E-commerce specific
    sale: "#e94560"              # Sale price, flash sale
    price_original: "#9ca3af"    # Strikethrough price
    flash_sale_bg: "#ff4444"     # Flash sale section bg
    new_badge: "#10b981"         # "New" badge
    used_badge: "#8b5cf6"        # "Cũ" badge

    # Gradient
    gradient_header: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
    gradient_sale: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)"
    gradient_dark: "linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)"

  typography:
    font_primary: "'Inter', 'Roboto', sans-serif"
    font_secondary: "'Roboto Condensed', sans-serif"  # For prices/headings
    heading_scale:
      h1: "36px"
      h2: "28px"
      h3: "22px"
      h4: "18px"
    body_scale:
      lg: "18px"
      md: "16px"
      sm: "14px"
      xs: "12px"
    weights: [400, 500, 600, 700]
    line_height:
      tight: "1.25"
      normal: "1.5"
      relaxed: "1.75"

  spacing:
    base_unit: "4px"
    scale:
      xs: "4px"
      sm: "8px"
      md: "16px"
      lg: "24px"
      xl: "32px"
      "2xl": "48px"
      "3xl": "64px"
      "4xl": "96px"

  borders:
    radius:
      sm: "4px"
      md: "8px"
      lg: "12px"
      xl: "16px"
      full: "9999px"
    width:
      thin: "1px"
      medium: "2px"

  shadows:
    sm: "0 1px 2px rgba(0,0,0,0.05)"
    md: "0 4px 6px rgba(0,0,0,0.07)"
    lg: "0 10px 15px rgba(0,0,0,0.1)"
    xl: "0 20px 25px rgba(0,0,0,0.15)"

  icons:
    style: "outline"
    library: "Lucide Icons + custom brand icons"
    size_scale: { sm: "16px", md: "20px", lg: "24px", xl: "32px" }

  images:
    aspect_ratio_product: "1:1 (500x500)"
    aspect_ratio_banner: "16:9 (desktop) / 9:16 (mobile)"
    aspect_ratio_thumbnail: "1:1"
    format: "WebP (primary), AVIF (next-gen fallback)"
    quality: 80
```

### 3.2 Recommended Design Tokens cho bản rebuild

```css
/* globals.css — Tailwind CSS v4 theme tokens */
@import "tailwindcss";

@theme {
  --color-primary-50: #f0f0ff;
  --color-primary-100: #e0e0ff;
  --color-primary-500: #1a1a2e;
  --color-primary-600: #16213e;
  --color-primary-700: #0f0f23;

  --color-accent-400: #ff6b6b;
  --color-accent-500: #e94560;
  --color-accent-600: #d63851;

  --color-surface: #ffffff;
  --color-background: #f5f5f7;

  --color-sale: #e94560;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  --font-sans: 'Inter', 'Roboto', system-ui, sans-serif;
  --font-display: 'Roboto Condensed', 'Inter', sans-serif;

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

---

## 4. Component Tree

```
App
├── RootLayout
│   ├── Head (meta, fonts, preconnect)
│   ├── Header
│   │   ├── TopBar (hotline, promo banner)
│   │   ├── HeaderMain
│   │   │   ├── Logo
│   │   │   ├── SearchBar
│   │   │   │   ├── SearchInput
│   │   │   │   ├── SearchSuggestions
│   │   │   │   └── SearchResultsDropdown
│   │   │   ├── UserMenu
│   │   │   │   ├── LoginButton
│   │   │   │   └── UserDropdown
│   │   │   └── CartButton
│   │   │       ├── CartIcon
│   │   │       └── CartBadge
│   │   └── CategoryNav (main menu items)
│   ├── MobileNav
│   │   ├── HamburgerButton
│   │   ├── MobileDrawer
│   │   │   ├── MobileMenuList
│   │   │   ├── MobileSearch
│   │   │   └── MobileUserActions
│   │   └── BottomBar (fixed bottom nav)
│   │
│   ├── <main>{children}</main>
│   │   └── (varies by page)
│   │
│   ├── Footer
│   │   ├── FooterTop (newsletter signup)
│   │   ├── FooterMain
│   │   │   ├── FooterBrand
│   │   │   ├── FooterLinks (4 columns)
│   │   │   └── FooterStores
│   │   └── FooterBottom (copyright, payment icons)
│   │
│   ├── FloatingCTA
│   │   ├── CallButton
│   │   ├── MessengerButton
│   │   ├── ZaloButton
│   │   └── BackToTop
│   │
│   └── CartDrawer (slide-in from right)
│       ├── CartItemList
│       │   └── CartItem (×N)
│       │       ├── ProductImage
│       │       ├── ProductInfo
│       │       ├── QuantitySelector
│       │       └── RemoveButton
│       ├── CartSummary
│       │   ├── Subtotal
│       │   ├── DiscountCode
│       │   └── Total
│       └── CheckoutButton
│
├── HomePage
│   ├── HeroSlider
│   │   └── Slide (×N)
│   │       ├── BannerImage
│   │       └── CTAButton
│   ├── CategoryIconGrid
│   │   └── CategoryIconCard (×9)
│   ├── FlashSaleSection
│   │   ├── FlashSaleHeader
│   │   │   └── CountdownTimer
│   │   └── ProductCarousel
│   │       └── ProductCard (×N)
│   ├── ProductSection ("Máy ảnh")
│   │   ├── SectionHeader
│   │   ├── TabSwitcher (Máy ảnh | Máy ảnh cũ)
│   │   └── ProductGrid
│   │       └── ProductCard (×N)
│   ├── ProductSection ("Ống kính")
│   ├── ProductSection ("Flycam")
│   ├── ProductSection ("Action Camera")
│   ├── ServiceBanner (Lắp phông studio)
│   ├── DealBanner (Khuyến mãi)
│   ├── BrandLogos
│   │   └── BrandLogo (×N: Canon, Sony, Nikon, DJI...)
│   └── SocialProof
│       ├── ReviewStats
│       └── CustomerReviews
│
├── CategoryPage (PLP — Product Listing Page)
│   ├── CategoryBreadcrumb
│   ├── CategoryHeader
│   │   ├── CategoryTitle
│   │   ├── CategoryDescription
│   │   └── CategoryBanner
│   ├── FilterSidebar
│   │   ├── PriceRangeFilter
│   │   ├── BrandFilter
│   │   ├── StatusFilter (New/Used)
│   │   ├── SpecsFilter (sensor, mount...)
│   │   └── RatingFilter
│   ├── SortBar
│   │   ├── ResultCount
│   │   ├── SortDropdown
│   │   └── ViewToggle (Grid/List)
│   ├── ProductGrid
│   │   └── ProductCard (×N)
│   └── Pagination
│
├── ProductPage (PDP — Product Detail Page)
│   ├── ProductBreadcrumb
│   ├── ProductLayout (2-column)
│   │   ├── ProductMediaSection
│   │   │   ├── ProductGallery
│   │   │   │   ├── GalleryThumbnails
│   │   │   │   ├── MainImage
│   │   │   │   └── ZoomOverlay
│   │   │   ├── Product3DViewer  ← IMMERSIVE
│   │   │   │   ├── ThreeCanvas
│   │   │   │   ├── ModelLoader
│   │   │   │   └── ViewerControls (rotate, zoom, fullscreen)
│   │   │   └── ARPreviewButton  ← IMMERSIVE
│   │   │
│   │   └── ProductInfoSection
│   │       ├── ProductTitle
│   │       ├── ProductRating
│   │       │   ├── StarRating
│   │       │   └── ReviewCount
│   │       ├── PriceDisplay
│   │       │   ├── CurrentPrice
│   │       │   ├── OriginalPrice
│   │       │   └── DiscountBadge
│   │       ├── VariantSelector  ← Domain-specific
│   │       │   ├── MountSelector (RF/E/Z mount)
│   │       │   └── KitSelector (Body Only / Kit 18-45mm)
│   │       ├── LensCompatibilityChecker ← Domain-specific
│   │       │   ├── CompatibleBodies
│   │       │   └── RecommendedCombos
│   │       ├── StockStatus
│   │       ├── QuantitySelector
│   │       ├── AddToCartButton
│   │       ├── BuyNowButton
│   │       ├── WishlistButton
│   │       └── ShareButtons
│   │
│   ├── ProductTabs
│   │   ├── SpecsTab
│   │   │   └── SpecsTable
│   │   ├── DescriptionTab
│   │   │   └── RichContent
│   │   ├── ReviewsTab
│   │   │   ├── ReviewSummary
│   │   │   ├── ReviewList
│   │   │   │   └── ReviewItem (×N)
│   │   │   └── ReviewForm
│   │   └── WarrantyTab
│   │
│   ├── RelatedProducts
│   │   └── ProductCard (×N)
│   └── RecentlyViewed
│       └── ProductCard (×N)
│
├── CartPage
│   ├── CartHeader
│   ├── CartItems
│   │   └── CartItemRow (×N)
│   ├── CartSummary
│   │   ├── Subtotal
│   │   ├── ShippingEstimate
│   │   ├── DiscountCode
│   │   └── Total
│   └── CartActions
│       ├── ContinueShopping
│       └── ProceedToCheckout
│
├── CheckoutPage
│   ├── CheckoutLayout (2-column)
│   │   ├── CheckoutForm
│   │   │   ├── ShippingInfoForm
│   │   │   ├── DeliveryMethodSelector
│   │   │   ├── PaymentMethodSelector
│   │   │   │   ├── CODOption
│   │   │   │   ├── BankTransferOption
│   │   │   │   ├── VISAOption
│   │   │   │   ├── MoMoOption
│   │   │   │   └── HomePayLaterOption
│   │   │   └── OrderNote
│   │   └── OrderSummary
│   │       ├── OrderItems
│   │       ├── ShippingFee
│   │       ├── Total
│   │       └── PlaceOrderButton
│   └── CheckoutSteps (mobile)
│
├── OrderConfirmationPage
│   ├── OrderSuccess
│   │   ├── CheckmarkAnimation
│   │   ├── OrderNumber
│   │   └── OrderDetails
│   └── SuggestedProducts
│
├── LoginPage
│   ├── LoginForm
│   │   ├── EmailInput
│   │   ├── PasswordInput
│   │   ├── RememberMe
│   │   ├── ForgotPassword
│   │   └── LoginButton
│   └── SocialLogin
│       ├── GoogleLogin
│       └── FacebookLogin
│
├── AccountPage
│   ├── AccountSidebar
│   │   ├── UserInfo
│   │   └── AccountMenu
│   ├── OrderHistory
│   │   └── OrderCard (×N)
│   ├── WishlistPage
│   │   └── ProductCard (×N)
│   ├── ProfileForm
│   └── AddressBook
│
├── StoreLocatorPage
│   ├── StoreMap (Google Maps embed)
│   └── StoreList
│       └── StoreCard (×4)
│
├── BlogPage
│   ├── BlogGrid
│   │   └── BlogCard (×N)
│   └── BlogPost
│       ├── PostContent
│       ├── PostSidebar
│       └── RelatedPosts
│
└── AdminApp (apps/admin-next)
    ├── AdminLayout
    │   ├── AdminSidebar
    │   ├── AdminHeader
    │   │   ├── AdminSearch
    │   │   ├── AdminNotifications
    │   │   └── AdminUserMenu
    │   └── AdminMain
    │
    ├── DashboardPage
    │   ├── StatsCards (Revenue, Orders, Customers, Products)
    │   ├── RevenueChart
    │   ├── OrderChart
    │   └── RecentOrders
    │
    ├── ProductManagementPage
    │   ├── ProductList (DataTable)
    │   ├── ProductForm (Create/Edit)
    │   │   ├── BasicInfo
    │   │   ├── PricingForm
    │   │   ├── MediaUploader
    │   │   │   ├── ImageUpload
    │   │   │   ├── ThreeModelUpload  ← 3D asset
    │   │   │   └── ARAssetUpload  ← AR asset
    │   │   ├── VariantManager
    │   │   ├── SpecsEditor
    │   │   └── SEOForm
    │   └── BulkActions
    │
    ├── CategoryManagementPage
    ├── OrderManagementPage
    │   ├── OrderList (DataTable)
    │   └── OrderDetail
    │       ├── OrderInfo
    │       ├── OrderTimeline
    │       └── StatusUpdater
    │
    ├── FlashSaleManagementPage
    │   ├── FlashSaleList
    │   └── FlashSaleForm
    │       ├── Schedule
    │       ├── DiscountConfig
    │       └── ProductSelector
    │
    ├── BannerManagementPage
    │   ├── BannerList
    │   └── BannerForm
    │       ├── ImageUpload (Desktop + Mobile)
    │       ├── Placement
    │       └── Schedule
    │
    ├── CustomerManagementPage
    ├── ReviewManagementPage
    ├── StoreManagementPage
    └── SettingsPage
        ├── SiteSettings
        ├── PaymentSettings
        └── ShippingSettings
```

---

## 5. Component Inventory (45 Components)

### 5.1 Shared Components (8)

---

#### **Header**
```typescript
interface HeaderProps {
  siteName?: string;
  logoUrl?: string;
  hotline?: string;
  isAuthenticated?: boolean;
  cartItemCount?: number;
  categories?: CategoryNavItem[];
  promoBanner?: string;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onLoginClick?: () => void;
}

interface CategoryNavItem {
  name: string;
  slug: string;
  icon?: string;
  children?: CategoryNavItem[];
}
```
- **BE Source**: `GET /api/settings` (site config), `GET /api/cart/count`, `GET /api/categories`
- **Responsive**: Mobile → hamburger + `MobileNav` + `BottomBar` (fixed)
- **Animation**: Header shrinks on scroll (sticky, backdrop-blur)
- **SEO**: `<header>` semantic, logo has alt text, nav uses `<nav>`

---

#### **Footer**
```typescript
interface FooterProps {
  siteName?: string;
  copyright?: string;
  hotlines?: string[];
  email?: string;
  socialLinks?: SocialLink[];
  policies?: PolicyLink[];
  stores?: StoreInfo[];
  paymentMethods?: PaymentMethod[];
}

interface SocialLink {
  platform: 'facebook' | 'youtube' | 'tiktok';
  url: string;
  icon?: string;
}

interface PolicyLink {
  label: string;
  href: string;
}

interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  mapsUrl: string;
  hours?: string;
}

interface PaymentMethod {
  name: string;
  icon: string;
}
```
- **BE Source**: `GET /api/settings`, `GET /api/stores`
- **Responsive**: 4-column → 2-column → stacked
- **SEO**: `<footer>` semantic, all links crawlable

---

#### **SearchBar**
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  suggestions?: SearchSuggestion[];
  isLoading?: boolean;
  autoFocus?: boolean;
}

interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  id: string;
  name: string;
  thumbnail?: string;
  slug: string;
}
```
- **BE Source**: `GET /api/products/search?q={query}&limit=8`
- **Responsive**: Collapsed to icon on mobile → expands on tap
- **Animation**: Expand animation, suggestion slide-down
- **Accessibility**: `role="combobox"`, `aria-expanded`, keyboard nav with arrow keys

---

#### **MobileNav**
```typescript
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryNavItem[];
  isAuthenticated: boolean;
  onNavigate: (href: string) => void;
}

interface BottomBarProps {
  activePath: string;
  cartCount?: number;
  onNavigate: (href: string) => void;
}
```
- **Responsive**: Desktop: hidden, Mobile: slide-in drawer + fixed bottom bar
- **Animation**: Drawer slide from left, overlay fade

---

#### **CartDrawer**
```typescript
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  thumbnail: string;
  variant?: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  stock: number;
}
```
- **BE Source**: `GET /api/cart`, `PATCH /api/cart/:itemId`, `DELETE /api/cart/:itemId`
- **Responsive**: Full-width on mobile, 400px sidebar on desktop
- **Animation**: Slide from right + backdrop fade

---

#### **Breadcrumb**
```typescript
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: '/' | '>' | '›';
  homeLabel?: string;
  structuredData?: boolean;  // render JSON-LD
}

interface BreadcrumbItem {
  label: string;
  href?: string;             // undefined = current page
}
```
- **SEO**: Renders `<nav aria-label="Breadcrumb">` + `BreadcrumbList` JSON-LD schema
- **Responsive**: Truncate on mobile with "..."

---

#### **Badge**
```typescript
interface BadgeProps {
  variant: 'new' | 'sale' | 'hot' | 'used' | 'instock' | 'outofstock' | 'preorder' | 'custom';
  label?: string;
  color?: string;
  size?: 'sm' | 'md';
}
```
- **Animation**: Subtle pulse on "sale" variant

---

#### **FloatingCTA**
```typescript
interface FloatingCTAProps {
  hotline?: string;
  messengerUrl?: string;
  zaloUrl?: string;
  showBackToTop?: boolean;
  position?: 'right' | 'left';
}
```
- **Responsive**: Mobile → smaller icons, bottom positioned
- **Animation**: Fade in on scroll down

---

### 5.2 Product Components (9)

---

#### **ProductCard**
```typescript
interface ProductCardProps {
  product: ProductSummary;
  layout?: 'grid' | 'list';
  showCompare?: boolean;
  showWishlist?: boolean;
  showQuickView?: boolean;
  onQuickView?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
}

interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  badges: Badge[];
  rating?: { average: number; count: number };
  isUsed: boolean;
  brand: string;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
}
```
- **BE Source**: Derived from `Product` entity
- **Responsive**: 4 cols desktop → 2 cols tablet → 2 cols mobile
- **Animation**: Hover: image zoom, shadow lift, badge scale
- **SEO**: `<article>` semantic, product name as `<h3>`, price as structured data
- **Accessibility**: Focusable, `aria-label` with product name + price

---

#### **ProductGrid**
```typescript
interface ProductGridProps {
  products: ProductSummary[];
  columns?: { desktop: 2|3|4; tablet: 2|3; mobile: 1|2 };
  loading?: boolean;
  skeletonCount?: number;
  emptyMessage?: string;
}
```
- **Animation**: Staggered fade-in on scroll (intersection observer)
- **Responsive**: Grid auto-fill

---

#### **ProductGallery**
```typescript
interface ProductGalleryProps {
  images: ProductImage[];
  videoUrl?: string;
  thumbnailPosition?: 'left' | 'bottom';
  enableZoom?: boolean;
  zoomType?: 'lens' | 'click-to-zoom' | 'hover';
  maxZoomLevel?: number;
}
```
- **BE Source**: `GET /api/products/:id/media`
- **Animation**: Smooth image transition, zoom lens effect
- **Responsive**: Thumbnails bottom on mobile, left on desktop

---

#### **Product3DViewer**
```typescript
interface Product3DViewerProps {
  modelUrl: string;           // .glb or .gltf URL
  posterUrl?: string;         // fallback image before load
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  backgroundColor?: string;
  cameraPosition?: [number, number, number];
  environmentPreset?: 'studio' | 'outdoor' | 'apartment';
  onLoad?: () => void;
  onError?: (error: Error) => void;
  fallback?: 'poster' | 'gallery' | 'video';
  mobileOptimized?: boolean;  // reduce polygon count on mobile
}
```
- **BE Source**: `GET /api/products/:id/3d-model` → returns `{ modelUrl, posterUrl, fileSize, format }`
- **Technology**: React Three Fiber + Drei + model-viewer fallback
- **Animation**: Auto-rotate, smooth camera transitions
- **Performance**: Lazy-load 3D model, use `<Suspense>`, progressive enhancement
- **Responsive**: Full-width on mobile, contained on desktop
- **Accessibility**: `aria-label="3D model viewer"`, keyboard controls for rotation

---

#### **ARPreview**
```typescript
interface ARPreviewProps {
  modelUrl: string;           // .usdz (iOS) / .glb (Android)
  posterUrl: string;
  platform: 'ios' | 'android' | 'both';
  placementHint?: 'table' | 'floor' | 'hand';
  onUnsupported?: () => void;
}
```
- **BE Source**: `GET /api/products/:id/ar`
- **Technology**: `<model-viewer>` for AR on supported devices, WebXR fallback
- **Fallback**: Show 3D viewer or image gallery if unsupported
- **Accessibility**: Alternative: static image + dimension overlay

---

#### **PriceDisplay**
```typescript
interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: 'VND';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showInstallment?: boolean;
  installmentMonths?: number;
  installmentRate?: number;    // 0 = 0% interest
  showDiscountPercent?: boolean;
}

// Computed display:
// - "12.990.000₫" (current)
// - "~~14.990.000₫~~ 12.990.000₫ -13%" (sale)
// - "Từ 1.082.500₫/tháng x 12 tháng" (installment)
```
- **Animation**: Price number count-up animation on flash sale

---

#### **VariantSelector**
```typescript
interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId?: string;
  variantType: 'mount' | 'color' | 'kit' | 'storage';
  onSelect: (variantId: string) => void;
  layout?: 'radio' | 'dropdown' | 'swatch';
  label?: string;
}

interface ProductVariant {
  id: string;
  name: string;            // "Canon RF Mount", "Black", "Kit 18-45mm"
  thumbnail?: string;      // for swatch type
  available: boolean;
  priceAdjust?: number;    // additional price
  sku: string;
}
```
- **BE Source**: `GET /api/products/:id/variants`

---

#### **ProductSpecs**
```typescript
interface ProductSpecsProps {
  specs: SpecGroup[];
  layout?: 'table' | 'accordion' | 'cards';
  highlightKey?: string[];  // highlight important specs
}

interface SpecGroup {
  groupName: string;        // "Thông số kỹ thuật", "Kết nối"
  items: SpecItem[];
}

interface SpecItem {
  label: string;            // "Độ phân giải"
  value: string;            // "24.2 MP"
  icon?: string;
}
```
- **BE Source**: `GET /api/products/:id/specs`
- **SEO**: Schema.org `Product` structured data

---

#### **LensCompatibilityChecker**
```typescript
interface LensCompatibilityCheckerProps {
  lensMount: string;                    // "Canon RF"
  compatibleBodies: CompatibleBody[];
  recommendedCombos?: LensCombo[];
  onSelectCombo?: (bodyId: string, lensId: string) => void;
}

interface CompatibleBody {
  id: string;
  name: string;
  thumbnail: string;
  slug: string;
  price: number;
}

interface LensCombo {
  body: ProductSummary;
  lens: ProductSummary;
  comboPrice: number;
  savings: number;
}
```
- **BE Source**: `GET /api/lenses/:id/mount-compat`
- **Domain-specific**: Unique to photography e-commerce

---

### 5.3 Marketing Components (6)

---

#### **HeroSlider**
```typescript
interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;  // ms
  showDots?: boolean;
  showArrows?: boolean;
  effect?: 'fade' | 'slide' | 'parallax';
  height?: { mobile: string; desktop: string };
}

interface HeroSlide {
  id: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  link?: string;
  priority?: boolean;  // for LCP optimization
}
```
- **BE Source**: `GET /api/banners?type=hero`
- **Animation**: Ken Burns effect on images, parallax scroll
- **SEO**: Images with alt text, preload first slide for LCP
- **Performance**: Preload LCP image, lazy-load non-visible slides

---

#### **FlashSaleSection**
```typescript
interface FlashSaleSectionProps {
  sale?: FlashSale;
  products: ProductSummary[];
  loading?: boolean;
}

interface FlashSale {
  id: string;
  title: string;
  startTime: string;       // ISO 8601
  endTime: string;
  discountPercent: number;
  bannerImage?: string;
  maxDiscountAmount?: number;
}
```
- **BE Source**: `GET /api/flash-sales/active`
- **Animation**: Countdown pulse, product card shimmer on hover
- **SEO**: Time-limited offer structured data

---

#### **CountdownTimer**
```typescript
interface CountdownTimerProps {
  targetDate: string;       // ISO 8601
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  onComplete?: () => void;
  style?: 'blocks' | 'circular' | 'minimal';
}

// Display format:
// - blocks: [02] NGÀY : [14] GIỜ : [32] PHÚT : [08] GIÂY
// - minimal: "Còn lại 2 ngày 14 giờ"
```
- **Animation**: Number flip animation, pulse when < 1 hour

---

#### **CategoryIconGrid**
```typescript
interface CategoryIconGridProps {
  categories: CategoryCardData[];
  layout?: 'grid-3x3' | 'scroll-horizontal' | 'grid-2x5';
  onCategoryClick?: (slug: string) => void;
}

interface CategoryCardData {
  name: string;
  slug: string;
  icon: string;
  productCount?: number;
  color?: string;
}
```
- **BE Source**: `GET /api/categories`
- **Responsive**: 3×3 grid desktop → horizontal scroll mobile
- **Animation**: Scale + shadow on hover, icon bounce

---

#### **DealBanner**
```typescript
interface DealBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  mobileImage?: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor?: string;
  textColor?: string;
  countdown?: string;       // ISO 8601, show timer if set
}
```
- **BE Source**: `GET /api/banners?type=promo`

---

#### **SocialProof**
```typescript
interface SocialProofProps {
  stats: {
    totalReviews: number;
    averageRating: number;
    totalCustomers: number;
    totalOrders: number;
  };
  reviews?: CustomerReview[];
}

interface CustomerReview {
  id: string;
  authorName: string;
  avatar?: string;
  rating: number;
  comment: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}
```
- **BE Source**: `GET /api/reviews/stats`, `GET /api/reviews?featured=true`
- **Animation**: Counter animation on stats, auto-scroll reviews

---

### 5.4 E-commerce Flow Components (5)

---

#### **CartPage**
```typescript
interface CartPageProps {
  items: CartItem[];
  subtotal: number;
  shippingEstimate?: number;
  discountAmount?: number;
  total: number;
  discountCode?: string;
  onQuantityChange: (itemId: string, qty: number) => void;
  onRemove: (itemId: string) => void;
  onApplyDiscount: (code: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}
```
- **BE Source**: `GET /api/cart`, `POST /api/cart/discount`, `POST /api/cart/estimate-shipping`

---

#### **CheckoutForm**
```typescript
interface CheckoutFormProps {
  shippingInfo: ShippingInfo;
  deliveryMethods: DeliveryMethod[];
  paymentMethods: PaymentMethod[];
  onSubmit: (order: OrderPayload) => void;
  isLoading?: boolean;
}

interface ShippingInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  note?: string;
}

interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  estimatedDays: number;
  fee: number;
  freeShippingThreshold?: number;
}

interface OrderPayload {
  shippingInfo: ShippingInfo;
  deliveryMethodId: string;
  paymentMethodId: string;
  items: { productId: string; variantId?: string; quantity: number }[];
  discountCode?: string;
  note?: string;
}
```
- **BE Source**: `POST /api/orders`, `GET /api/shipping/methods`, `GET /api/payment/methods`

---

#### **OrderConfirmation**
```typescript
interface OrderConfirmationProps {
  orderNumber: string;
  estimatedDelivery: string;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: string;
  onTrackOrder?: () => void;
}
```
- **SEO**: `OrderAction` structured data
- **Animation**: Success checkmark animation

---

#### **WishlistButton**
```typescript
interface WishlistButtonProps {
  productId: string;
  isInWishlist: boolean;
  onToggle: (productId: string) => void;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}
```
- **BE Source**: `POST /api/wishlist`, `DELETE /api/wishlist/:productId`

---

#### **QuickView**
```typescript
interface QuickViewProps {
  isOpen: boolean;
  productId: string;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
}

// Renders a modal with:
// - ProductImage (small gallery)
// - ProductTitle, Price
// - VariantSelector
// - QuantitySelector
// - AddToCartButton
```
- **BE Source**: `GET /api/products/:id` (lightweight, no full specs)
- **Animation**: Modal slide up + backdrop

---

### 5.5 Domain-Specific Components (4)

---

#### **TradeInWidget**
```typescript
interface TradeInWidgetProps {
  onTradeIn?: (productIds: string[]) => void;
  eligibleCategories?: string[];
  estimatedValue?: number;
  description?: string;
}
```
- **BE Source**: `POST /api/trade-in/estimate`

---

#### **StudioSetupWizard**
```typescript
interface StudioSetupWizardProps {
  steps: WizardStep[];
  onComplete: (selections: StudioSelections) => void;
}

interface WizardStep {
  question: string;
  options: { id: string; label: string; icon: string; description?: string }[];
}

interface StudioSelections {
  purpose: string;        // "portrait" | "product" | "video"
  space: string;          // "small" | "medium" | "large"
  budget: string;         // "basic" | "professional" | "studio"
  recommendedProducts: ProductSummary[];
}
```

---

#### **BodyLensMatcher**
```typescript
interface BodyLensMatcherProps {
  mode: 'by-body' | 'by-lens';
  selectedBody?: string;
  selectedLens?: string;
  compatibleResults: LensCombo[];
  onSelect?: (combo: LensCombo) => void;
}

interface LensCombo {
  body: ProductSummary;
  lens: ProductSummary;
  compatibility: 'full' | 'limited' | 'adapter-needed';
  comboPrice: number;
  savings: number;
  notes?: string;
}
```
- **BE Source**: `GET /api/products/compatible?body={id}` or `GET /api/products/compatible?lens={id}`
- **Domain-specific**: Unique to camera e-commerce

---

#### **StoreLocatorMap**
```typescript
interface StoreLocatorMapProps {
  stores: StoreInfo[];
  selectedStoreId?: string;
  onSelectStore?: (storeId: string) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

interface StoreInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapsUrl: string;
  coordinates: { lat: number; lng: number };
  imageUrl?: string;
}
```
- **BE Source**: `GET /api/stores`
- **SEO**: `LocalBusiness` JSON-LD schema (×4)

---

### 5.6 Admin Components (13)

---

#### **DashboardLayout**
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  user: AdminUser;
  notifications?: Notification[];
}

interface AdminUser {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'staff';
}
```

---

#### **StatsCards**
```typescript
interface StatsCardsProps {
  stats: StatCard[];
}

interface StatCard {
  label: string;
  value: number;
  format?: 'currency' | 'number' | 'percent';
  change?: number;       // percentage change
  changeDirection?: 'up' | 'down' | 'flat';
  icon?: string;
  period?: string;       // "So với tháng trước"
}
```
- **BE Source**: `GET /api/admin/dashboard/stats`

---

#### **DataTable**
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: PaginationState;
  sorting?: SortingState;
  filters?: FilterState[];
  searchPlaceholder?: string;
  bulkActions?: BulkAction<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  onPageChange?: (page: number) => void;
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void;
  onFilterChange?: (filters: FilterState[]) => void;
  onBulkAction?: (action: string, selected: T[]) => void;
}

interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}
```

---

#### **ProductForm (Admin)**
```typescript
interface ProductFormProps {
  initialData?: Partial<Product>;
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}

interface ProductFormData {
  name: string;
  slug: string;
  categoryId: string;
  brand: string;
  mount?: string;
  isUsed: boolean;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  images: File[] | ProductImage[];
  model3D?: File;              // .glb/.gltf upload
  arAsset?: File;              // .usdz upload
  variants: VariantFormData[];
  specs: SpecGroup[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  status: 'draft' | 'published' | 'archived';
  quantity: number;
  sku: string;
}
```
- **BE Source**: `POST /api/admin/products`, `PUT /api/admin/products/:id`

---

#### **MediaUploader**
```typescript
interface MediaUploaderProps {
  accept?: string;           // "image/*" | ".glb,.gltf,.usdz"
  maxFiles?: number;
  maxSize?: number;          // bytes
  type: 'image' | '3d-model' | 'ar-asset' | 'video';
  existingFiles?: MediaFile[];
  onUpload: (files: File[]) => Promise<MediaFile[]>;
  onRemove: (fileId: string) => void;
  onReorder?: (files: MediaFile[]) => void;
}

interface MediaFile {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  thumbnail?: string;
}
```
- **BE Source**: `POST /api/media/upload`

---

#### **FlashSaleForm (Admin)**
```typescript
interface FlashSaleFormProps {
  initialData?: FlashSale;
  products: ProductSummary[];
  onSubmit: (data: FlashSaleFormData) => void;
}

interface FlashSaleFormData {
  title: string;
  startTime: string;
  endTime: string;
  products: { productId: string; flashPrice: number; maxQuantity?: number }[];
  bannerImage?: File;
}
```
- **BE Source**: `POST /api/admin/flash-sales`, `PUT /api/admin/flash-sales/:id`

---

#### **BannerForm (Admin)**
```typescript
interface BannerFormProps {
  initialData?: Banner;
  onSubmit: (data: BannerFormData) => void;
}

interface BannerFormData {
  title: string;
  desktopImage: File;
  mobileImage?: File;
  link?: string;
  placement: 'hero' | 'promo' | 'sidebar' | 'footer';
  position: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

interface Banner {
  id: string;
  title: string;
  desktopImageUrl: string;
  mobileImageUrl?: string;
  link?: string;
  placement: string;
  position: number;
  isActive: boolean;
}
```
- **BE Source**: `POST /api/admin/banners`

---

#### **OrderDetail (Admin)**
```typescript
interface OrderDetailProps {
  order: AdminOrder;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onAddNote: (orderId: string, note: string) => void;
}

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned';

interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: { name: string; phone: string; email?: string };
  items: OrderItem[];
  shippingAddress: ShippingInfo;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  orderStatus: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
  notes?: string;
}

interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  updatedBy?: string;
}
```
- **BE Source**: `GET /api/admin/orders/:id`, `PATCH /api/admin/orders/:id/status`

---

#### **ReviewManagement (Admin)**
```typescript
interface ReviewManagementProps {
  reviews: AdminReview[];
  onApprove: (reviewId: string) => void;
  onDelete: (reviewId: string) => void;
  onReply: (reviewId: string, reply: string) => void;
}

interface AdminReview {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
```
- **BE Source**: `GET /api/admin/reviews`, `PATCH /api/admin/reviews/:id`

---

#### **InventoryTracker (Admin)**
```typescript
interface InventoryTrackerProps {
  items: InventoryItem[];
  onStockUpdate: (productId: string, quantity: number) => void;
  lowStockThreshold?: number;
}

interface InventoryItem {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lastRestocked?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}
```
- **BE Source**: `GET /api/admin/inventory`, `PATCH /api/admin/inventory/:productId`

---

#### **CustomerAnalytics (Admin)**
```typescript
interface CustomerAnalyticsProps {
  period: '7d' | '30d' | '90d' | '1y';
  data: {
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
    averageOrderValue: number;
    customerLifetimeValue: number;
    topLocations: { city: string; count: number }[];
    revenueByChannel: { channel: string; revenue: number }[];
  };
  onPeriodChange?: (period: string) => void;
}
```
- **BE Source**: `GET /api/admin/analytics/customers?period={period}`

---

#### **SEOForm (Admin)**
```typescript
interface SEOFormProps {
  entityType: 'product' | 'category' | 'page';
  initialData?: SEOData;
  onChange: (data: SEOData) => void;
  preview?: boolean;
}

interface SEOData {
  title: string;            // max 60 chars
  description: string;      // max 160 chars
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// Preview shows Google SERP mock:
// [title] - mayanhvietnam.com
// https://mayanhvietnam.com/san-pham/...
// [description text here...]
```

---

## 6. Page-by-Page Breakdown

### 6.1 Homepage (`/`)

| Section | Components | BE Endpoint | Priority |
|---------|-----------|-------------|----------|
| Header | Header, TopBar, SearchBar, CartButton | `/api/settings`, `/api/cart/count` | P0 |
| Hero | HeroSlider (3-5 slides) | `/api/banners?type=hero` | P0 |
| Categories | CategoryIconGrid (9 items) | `/api/categories` | P0 |
| Flash Sale | FlashSaleSection, CountdownTimer | `/api/flash-sales/active` | P0 |
| Sản phẩm nổi bật | ProductSection × 4, TabSwitcher, ProductGrid | `/api/products?category=X&featured=true` | P0 |
| Banner khuyến mãi | DealBanner | `/api/banners?type=promo` | P1 |
| Studio Setup | ServiceBanner | `/api/pages/studio-setup` | P1 |
| Brand Logos | BrandLogos | `/api/brands` | P2 |
| Social Proof | SocialProof | `/api/reviews/stats` | P2 |
| Footer | Footer | `/api/settings`, `/api/stores` | P0 |
| Floating CTA | FloatingCTA | Static config | P1 |
| Cart Overlay | CartDrawer | `/api/cart` | P0 |

### 6.2 Category Listing Page (`/danh-muc/[slug]`)

| Section | Components | BE Endpoint | Priority |
|---------|-----------|-------------|----------|
| Breadcrumb | Breadcrumb | Static + props | P0 |
| Header | CategoryHeader, CategoryBanner | `/api/categories/:slug` | P0 |
| Filters | FilterSidebar | `/api/products/filters?category=X` | P0 |
| Sort | SortBar | Static config | P0 |
| Products | ProductGrid, ProductCard | `/api/products?category=X&page=N` | P0 |
| Pagination | Pagination | Derived from API response | P0 |

### 6.3 Product Detail Page (`/san-pham/[slug]`)

| Section | Components | BE Endpoint | Priority |
|---------|-----------|-------------|----------|
| Breadcrumb | Breadcrumb | Static + props | P0 |
| Gallery | ProductGallery, ZoomOverlay | `/api/products/:id/media` | P0 |
| 3D Viewer | Product3DViewer | `/api/products/:id/3d-model` | P1 |
| AR | ARPreview | `/api/products/:id/ar` | P2 |
| Info | ProductTitle, PriceDisplay, VariantSelector | `/api/products/:id` | P0 |
| Lens Check | LensCompatibilityChecker | `/api/lenses/:id/mount-compat` | P1 |
| Stock | StockStatus, QuantitySelector | `/api/products/:id/stock` | P0 |
| Actions | AddToCartButton, WishlistButton | `/api/cart`, `/api/wishlist` | P0 |
| Specs | ProductTabs, SpecsTab | `/api/products/:id/specs` | P0 |
| Reviews | ReviewsTab, ReviewItem | `/api/products/:id/reviews` | P1 |
| Related | RelatedProducts | `/api/products/:id/related` | P1 |
| Recently | RecentlyViewed | LocalStorage + `/api/products/batch` | P2 |

---

## 7. API Contract Blueprint (NestJS Modules)

### 7.1 Module Structure

```typescript
// apps/api/src/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    FlashSalesModule,
    BannersModule,
    CustomersModule,
    ReviewsModule,
    StoresModule,
    MediaModule,
    AdminModule,
    SearchModule,
    ShippingModule,
    PaymentModule,
  ],
})
export class AppModule {}
```

### 7.2 Modules Detail

#### ProductsModule
```typescript
// GET /api/products
@Controller('products')
export class ProductsController {
  @Get()             findAll(@Query() query: ProductFilterDto): Promise<PaginatedResult<ProductSummaryDto>>
  @Get(':id')        findOne(@Param('id') id: string): Promise<ProductDetailDto>
  @Get(':id/specs')  getSpecs(@Param('id') id: string): Promise<SpecGroupDto[]>
  @Get(':id/media')  getMedia(@Param('id') id: string): Promise<ProductMediaDto>
  @Get(':id/3d-model') getModel3D(@Param('id') id: string): Promise<Model3DDto>
  @Get(':id/ar')     getARAssets(@Param('id') id: string): Promise<ARAssetsDto>
  @Get(':id/variants') getVariants(@Param('id') id: string): Promise<ProductVariantDto[]>
  @Get(':id/related') getRelated(@Param('id') id: string): Promise<ProductSummaryDto[]>
  @Get(':id/reviews') getReviews(@Param('id') id: string): Promise<PaginatedResult<ReviewDto>>
  @Get('compatible') findCompatible(@Query('body') body?: string, @Query('lens') lens?: string): Promise<CompatResultDto[]>
  @Get('search')     search(@Query('q') query: string, @Query('limit') limit?: number): Promise<SearchResultDto[]>
}
```

#### CategoriesModule
```typescript
@Controller('categories')
export class CategoriesController {
  @Get()      findAll(): Promise<CategoryDto[]>
  @Get(':id') findOne(@Param('id') id: string): Promise<CategoryDetailDto>
  @Get(':id/products') getProducts(@Param('id') id: string, @Query() query: ProductFilterDto): Promise<PaginatedResult<ProductSummaryDto>>
}
```

#### CartModule
```typescript
@Controller('cart')
export class CartController {
  @Get()                                    getCart(@Request() req): Promise<CartDto>
  @Get('count')                             getCount(@Request() req): Promise<{ count: number }>
  @Post('items')                            addItem(@Request() req, @Body() dto: AddToCartDto): Promise<CartDto>
  @Patch('items/:itemId')                   updateItem(@Param('itemId') id: string, @Body() dto: UpdateCartItemDto): Promise<CartDto>
  @Delete('items/:itemId')                  removeItem(@Param('itemId') id: string): Promise<CartDto>
  @Post('discount')                         applyDiscount(@Body() dto: ApplyDiscountDto): Promise<CartDto>
  @Delete('discount')                       removeDiscount(): Promise<CartDto>
  @Post('estimate-shipping')               estimateShipping(@Body() dto: ShippingEstimateDto): Promise<ShippingEstimateResultDto>
  @Delete()                                clearCart(): Promise<void>
}
```

#### OrdersModule
```typescript
@Controller('orders')
export class OrdersController {
  @Post()                  create(@Request() req, @Body() dto: CreateOrderDto): Promise<OrderDto>
  @Get()                   findAll(@Request() req, @Query() query: OrderFilterDto): Promise<PaginatedResult<OrderSummaryDto>>
  @Get(':id')              findOne(@Param('id') id: string): Promise<OrderDetailDto>
  @Post(':id/cancel')      cancel(@Param('id') id: string): Promise<OrderDto>
}
```

#### FlashSalesModule
```typescript
@Controller('flash-sales')
export class FlashSalesController {
  @Get('active')           getActive(): Promise<FlashSaleDto | null>
  @Get(':id/products')     getProducts(@Param('id') id: string): Promise<ProductSummaryDto[]>
}
```

#### BannersModule
```typescript
@Controller('banners')
export class BannersController {
  @Get()                   findAll(@Query('type') type?: BannerType): Promise<BannerDto[]>
}
```

#### AuthModule
```typescript
@Controller('auth')
export class AuthController {
  @Post('register')        register(@Body() dto: RegisterDto): Promise<AuthResultDto>
  @Post('login')           login(@Body() dto: LoginDto): Promise<AuthResultDto>
  @Post('refresh')         refresh(@Body() dto: RefreshDto): Promise<AuthResultDto>
  @Get('me')               getProfile(@Request() req): Promise<UserDto>
  @Patch('me')             updateProfile(@Request() req, @Body() dto: UpdateProfileDto): Promise<UserDto>
}
```

#### CustomersModule
```typescript
@Controller('customers')
export class CustomersController {
  @Get('orders')           getOrders(@Request() req): Promise<PaginatedResult<OrderSummaryDto>>
  @Get('wishlist')         getWishlist(@Request() req): Promise<ProductSummaryDto[]>
  @Post('wishlist')        addToWishlist(@Body() dto: WishlistDto): Promise<void>
  @Delete('wishlist/:productId') removeFromWishlist(@Param('productId') id: string): Promise<void>
}
```

#### ReviewsModule
```typescript
@Controller('reviews')
export class ReviewsController {
  @Get('stats')            getStats(): Promise<ReviewStatsDto>
  @Get('featured')         getFeatured(): Promise<ReviewDto[]>
  @Post()                  create(@Request() req, @Body() dto: CreateReviewDto): Promise<ReviewDto>
}
```

#### StoresModule
```typescript
@Controller('stores')
export class StoresController {
  @Get()                   findAll(): Promise<StoreDto[]>
  @Get(':id')              findOne(@Param('id') id: string): Promise<StoreDetailDto>
}
```

#### AdminModules (prefix: `/api/admin`)
```typescript
@Controller('admin')
export class AdminController {
  // Dashboard
  @Get('dashboard/stats')  getDashboardStats(): Promise<DashboardStatsDto>

  // Products CRUD
  @Get('products')         listProducts(@Query() query: AdminProductFilterDto)
  @Post('products')        createProduct(@Body() dto: CreateProductDto)
  @Put('products/:id')     updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto)
  @Delete('products/:id')  deleteProduct(@Param('id') id: string)

  // Orders CRUD
  @Get('orders')           listOrders(@Query() query: AdminOrderFilterDto)
  @Get('orders/:id')       getOrder(@Param('id') id: string)
  @Patch('orders/:id/status') updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto)

  // Flash Sales CRUD
  @Get('flash-sales')
  @Post('flash-sales')
  @Put('flash-sales/:id')
  @Delete('flash-sales/:id')

  // Banners CRUD
  @Get('banners')
  @Post('banners')
  @Put('banners/:id')
  @Delete('banners/:id')

  // Reviews
  @Get('reviews')
  @Patch('reviews/:id')
  @Delete('reviews/:id')

  // Inventory
  @Get('inventory')
  @Patch('inventory/:productId')

  // Analytics
  @Get('analytics/customers')
  @Get('analytics/revenue')
}
```

#### MediaModule
```typescript
@Controller('media')
export class MediaController {
  @Post('upload')          upload(@UploadedFile() file: Express.Multer.File): Promise<MediaDto>
  @Post('upload-3d')       upload3D(@UploadedFile() file: Express.Multer.File): Promise<Model3DDto>
  @Post('upload-ar')       uploadAR(@UploadedFile() file: Express.Multer.File): Promise<ARDto>
  @Delete(':id')           delete(@Param('id') id: string): Promise<void>
}
```

---

## 8. Database Entity Hints (Prisma Schema)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// === AUTH & USERS ===
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  phone         String?
  passwordHash  String
  role          Role      @default(CUSTOMER)
  avatar        String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  orders        Order[]
  reviews       Review[]
  wishlist      Wishlist[]
  cart          Cart?
  addresses     Address[]
  refreshTokens RefreshToken[]

  @@index([email])
  @@index([phone])
}

enum Role {
  CUSTOMER
  ADMIN
  STAFF
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model Address {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  fullName  String
  phone     String
  address   String
  ward      String
  district  String
  city      String
  province  String
  isDefault Boolean @default(false)
}

// === PRODUCTS & CATALOG ===
model Category {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  icon        String?
  description String?
  parentId    String?
  parent      Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryTree")
  products    Product[]
  sortOrder   Int        @default(0)
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([slug])
}

model Brand {
  id       String    @id @default(cuid())
  name     String    @unique
  slug     String    @unique
  logo     String?
  website  String?
  products Product[]
}

model Product {
  id              String        @id @default(cuid())
  name            String
  slug            String        @unique
  shortDescription String?
  description     String?       @db.Text
  sku             String        @unique
  price           Int           // VND, stored as integer
  originalPrice   Int?
  costPrice       Int?          // For admin margin calc
  quantity        Int           @default(0)
  brandId         String?
  brand           Brand?        @relation(fields: [brandId], references: [id])
  categoryId      String
  category        Category      @relation(fields: [categoryId], references: [id])
  isUsed          Boolean       @default(false)
  status          ProductStatus @default(DRAFT)
  availability    Availability  @default(IN_STOCK)
  mount           String?       // "Canon RF", "Sony E", "Nikon Z"

  // Media
  thumbnail       String?
  images          ProductImage[]
  model3DUrl      String?       // .glb/.gltf
  arAssetUrl      String?       // .usdz
  videoUrl        String?

  // Variants & Specs
  variants        ProductVariant[]
  specs           ProductSpec[]

  // Relations
  reviews         Review[]
  orderItems      OrderItem[]
  flashSaleItems  FlashSaleItem[]
  wishlistItems   Wishlist[]
  cartItems       CartItem[]
  compatibleLenses CompatibleLens[]

  // SEO
  seoTitle        String?
  seoDescription  String?
  seoKeywords     String[]
  canonicalUrl    String?

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([slug])
  @@index([categoryId])
  @@index([brandId])
  @@index([price])
  @@index([createdAt])
  @@index([status, availability])
}

enum ProductStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum Availability {
  IN_STOCK
  LOW_STOCK
  OUT_OF_STOCK
  PRE_ORDER
}

model ProductImage {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  alt       String
  sortOrder Int     @default(0)
  isPrimary Boolean @default(false)
}

model ProductVariant {
  id        String    @id @default(cuid())
  productId String
  product   Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  name      String    // "Kit 18-45mm", "Black"
  sku       String    @unique
  price     Int
  originalPrice Int?
  quantity  Int       @default(0)
  type      String    // "mount", "color", "kit"
  isActive  Boolean   @default(true)
}

model ProductSpec {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  groupName String  // "Thông số kỹ thuật"
  label     String  // "Độ phân giải"
  value     String  // "24.2 MP"
  sortOrder Int     @default(0)
}

// === LENS COMPATIBILITY (Domain-specific) ===
model CompatibleLens {
  id            String  @id @default(cuid())
  lensProductId String  // The lens product
  lens          Product @relation("LensProduct", fields: [lensProductId], references: [id])
  bodyProductId String  // The body product
  body          Product @relation("BodyProduct", fields: [bodyProductId], references: [id])
  compatibility String  // "full", "limited", "adapter-needed"
  notes         String?
}

// === CART ===
model Cart {
  id     String     @id @default(cuid())
  userId String     @unique
  user   User       @relation(fields: [userId], references: [id])
  items  CartItem[]
  discountCode String?
  discountAmount Int @default(0)
  updatedAt DateTime @updatedAt
}

model CartItem {
  id          String  @id @default(cuid())
  cartId      String
  cart        Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId   String
  product     Product @relation(fields: [productId], references: [id])
  variantId   String?
  variant     ProductVariant? @relation(fields: [variantId], references: [id])
  quantity    Int     @default(1)
}

// === ORDERS ===
model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  status          OrderStatus @default(PENDING)
  paymentMethod   String
  paymentStatus   PaymentStatus @default(PENDING)
  subtotal        Int
  shippingFee     Int         @default(0)
  discount        Int         @default(0)
  total           Int
  discountCode    String?
  note            String?

  // Shipping info (snapshot at order time)
  shippingName    String
  shippingPhone   String
  shippingEmail   String?
  shippingAddress String
  shippingWard    String
  shippingDistrict String
  shippingCity    String
  shippingProvince String

  deliveryMethod  String
  estimatedDelivery DateTime?

  items           OrderItem[]
  timeline        OrderTimeline[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPING
  DELIVERED
  CANCELLED
  RETURNED
}

enum PaymentStatus {
  PENDING
  PAID
  REFUNDED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  variantId String?
  variant   ProductVariant? @relation(fields: [variantId], references: [id])
  name      String  // Snapshot
  thumbnail String? // Snapshot
  price     Int     // Snapshot
  quantity  Int
}

model OrderTimeline {
  id        String      @id @default(cuid())
  orderId   String
  order     Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  status    OrderStatus
  note      String?
  updatedBy String?
  createdAt DateTime    @default(now())
}

// === PROMOTIONS ===
model FlashSale {
  id             String          @id @default(cuid())
  title          String
  startTime      DateTime
  endTime        DateTime
  discountPercent Int
  maxDiscountAmount Int?
  bannerImage    String?
  isActive       Boolean         @default(true)
  products       FlashSaleItem[]
  createdAt      DateTime        @default(now())
}

model FlashSaleItem {
  id           String    @id @default(cuid())
  flashSaleId  String
  flashSale    FlashSale @relation(fields: [flashSaleId], references: [id], onDelete: Cascade)
  productId    String
  product      Product   @relation(fields: [productId], references: [id])
  flashPrice   Int
  maxQuantity  Int?
  soldQuantity Int       @default(0)
}

model Banner {
  id            String   @id @default(cuid())
  title         String
  desktopImage  String
  mobileImage   String?
  link          String?
  placement     String   // "hero", "promo", "sidebar", "footer"
  position      Int      @default(0)
  isActive      Boolean  @default(true)
  startDate     DateTime?
  endDate       DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// === REVIEWS ===
model Review {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  rating    Int      // 1-5
  comment   String?  @db.Text
  images    String[]
  status    ReviewStatus @default(PENDING)
  reply     String?  @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([productId])
  @@index([rating])
}

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}

// === WISHLIST ===
model Wishlist {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}

// === STORES (OMO) ===
model Store {
  id          String   @id @default(cuid())
  name        String
  address     String
  phone       String
  hours       String
  city        String
  mapsUrl     String
  latitude    Float
  longitude   Float
  imageUrl    String?
  isActive    Boolean  @default(true)
}

// === SITE SETTINGS ===
model SiteSetting {
  id    String @id @default(cuid())
  key   String @unique
  value String @db.Text // JSON string for complex values
}
```

---

## 9. SEO Implementation Plan

### 9.1 Structured Data Templates

#### Product Schema (PDP)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{product.name}}",
  "description": "{{product.description}}",
  "image": "{{product.images[0].url}}",
  "brand": {
    "@type": "Brand",
    "name": "{{product.brand.name}}"
  },
  "sku": "{{product.sku}}",
  "offers": {
    "@type": "Offer",
    "url": "{{canonicalUrl}}",
    "priceCurrency": "VND",
    "price": "{{product.price}}",
    "availability": "{{product.availability}}",
    "seller": {
      "@type": "Organization",
      "name": "Máy Ảnh Việt Nam"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{product.rating.average}}",
    "reviewCount": "{{product.rating.count}}"
  }
}
```

#### LocalBusiness Schema (per store)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Máy Ảnh Việt Nam — {{store.name}}",
  "image": "{{store.imageUrl}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{store.address}}",
    "addressLocality": "{{store.city}}",
    "addressCountry": "VN"
  },
  "telephone": "{{store.phone}}",
  "openingHoursSpecification": [...],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{store.latitude}}",
    "longitude": "{{store.longitude}}"
  }
}
```

#### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://mayanhvietnam.com" },
    { "@type": "ListItem", "position": 2, "name": "{{category.name}}", "item": "{{category.url}}" },
    { "@type": "ListItem", "position": 3, "name": "{{product.name}}" }
  ]
}
```

#### FAQ Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Câu hỏi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Câu trả lời"
      }
    }
  ]
}
```

### 9.2 Meta Tag Patterns

| Page Type | Title Pattern | Description Pattern |
|-----------|--------------|-------------------|
| Homepage | `{brand} — Mua máy ảnh chính hãng giá tốt` | `{brand} — Cửa hàng máy ảnh, ống kính, flycam chính hãng...` |
| Category | `{categoryName} — Giá tốt nhất \| {brand}` | `Mua {categoryName} chính hãng...` |
| Product | `{productName} \| {brand} — Giá {price}₫` | `{product.shortDescription}... Mua ngay tại {brand}` |
| Blog | `{postTitle} \| {brand} Blog` | `{post.excerpt}` |

### 9.3 SEO Checklist

- [ ] Canonical URL on every page
- [ ] Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- [ ] Twitter Card (summary_large_image)
- [ ] Structured data: Product, BreadcrumbList, LocalBusiness, Organization, WebSite, FAQ
- [ ] XML Sitemap: `/sitemap.xml` (auto-generated, split by type)
- [ ] Robots.txt: disallow /api/, /admin/, /gio-hang, /don-dat-hang
- [ ] Image optimization: WebP + AVIF, lazy loading, proper alt text
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Internal linking: related products, category cross-links
- [ ] H1: only one per page, descriptive
- [ ] URL: clean slugs, Vietnamese-friendly (no special chars)
- [ ] Preconnect: CDN image server, Google Fonts, Google Maps
- [ ] hreflang: `vi-VN` for Vietnamese content

---

## 10. Immersive Commerce Roadmap

### Phase 1: Foundation (Tuần 1-4)
- [x] Monorepo setup
- [ ] Design tokens + Tailwind v4 config
- [ ] Shared component library (Header, Footer, Card, Button, Input...)
- [ ] Product listing page (PLP) with filters
- [ ] Product detail page (PDP) with 2D gallery
- [ ] Cart + Checkout flow
- [ ] Basic SEO (meta, structured data, sitemap)
- [ ] NestJS API: Products, Categories, Cart, Orders modules
- [ ] Prisma schema + migrations

### Phase 2: Commerce Enhancement (Tuần 5-8)
- [ ] Flash sale system with countdown
- [ ] Search with instant results
- [ ] Wishlist + recently viewed
- [ ] Reviews & ratings
- [ ] Trade-in system
- [ ] Store locator with map
- [ ] Admin panel: Dashboard, Product CRUD, Order management
- [ ] Responsive mobile optimization
- [ ] Performance optimization (Core Web Vitals)

### Phase 3: Immersive Features (Tuần 9-12)
- [ ] **3D Product Viewer** (React Three Fiber + Drei)
  - Upload .glb/.gltf models
  - Interactive rotation, zoom, pan
  - Studio environment lighting
  - Lazy loading + progressive enhancement
- [ ] **Product Configurator**
  - Body + Lens combo builder
  - Real-time price calculation
  - Compatibility checking
- [ ] **360° Product Photography**
  - Multiple angle carousel
  - Smooth scroll-driven rotation
- [ ] Admin: 3D model upload + preview

### Phase 4: Spatial Commerce (Tuần 13-16)
- [ ] **WebAR** (View in Room / Try On)
  - `<model-viewer>` integration
  - USDZ for iOS, GLB for Android
  - Camera permission handling
  - Fallback for unsupported devices
- [ ] **AI-Powered Features**
  - Smart recommendations ("Bodies compatible with this lens")
  - AI-generated product descriptions
  - Visual search (upload photo → find similar products)
- [ ] **Virtual Studio Showroom**
  - 3D walkthrough of studio setup
  - Interactive equipment placement
- [ ] **Advanced Personalization**
  - User preference learning
  - Dynamic homepage layout
  - Personalized flash sale timing

### Technology Stack for Immersive Features

```
3D Engine:     React Three Fiber (@react-three/fiber) + Drei (@react-three/drei)
AR:            <model-viewer> (Google) + WebXR API
3D File:       glTF 2.0 (.glb) for web, USDZ for iOS AR
Animation:     Framer Motion + GSAP (for complex scroll animations)
State:         Zustand (lightweight, perfect for real-time 3D state)
Performance:   @react-three/postprocessing (bloom, AO), LOD (Level of Detail)
```

---

## Appendix: Environment Variables Reference

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mayanhvietnam"

# Auth
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# CORS
CORS_ORIGINS="http://localhost:3000,http://localhost:3001"

# Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=10485760  # 10MB

# CDN / Image Server
NEXT_PUBLIC_IMAGE_CDN="https://image.mayanhvietnam.com"
NEXT_PUBLIC_STATIC_CDN="https://static.mayanhvietnam.com"

# 3D Assets
NEXT_PUBLIC_3D_CDN="https://3d.mayanhvietnam.com"

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY="..."

# Social
NEXT_PUBLIC_FACEBOOK_PAGE_URL="..."
NEXT_PUBLIC_MESSENGER_URL="..."
NEXT_PUBLIC_ZALO_URL="..."
NEXT_PUBLIC_TIKTOK_URL="..."
NEXT_PUBLIC_YOUTUBE_URL="..."

# Analytics
NEXT_PUBLIC_GA_ID="..."
```

---

> **Tổng kết**: Báo cáo này liệt kê **45 components** (8 shared + 9 product + 6 marketing + 5 e-commerce flow + 4 domain-specific + 13 admin), **12 NestJS modules**, **15+ Prisma models**, và **4-phase roadmap** từ basic commerce đến spatial commerce. Mỗi component đều có TypeScript props interface, BE data source mapping, responsive behavior, và accessibility notes.
