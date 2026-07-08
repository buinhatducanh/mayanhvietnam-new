# Design Analysis: Thiết kế web e-commerce máy ảnh 2026

> **Mục đích**: Phân tích xu hướng thiết kế ngành, competitor, và đề xuất design direction cụ thể cho mayanhvietnam.com
> **Ngày**: 2026-07-07

---

## 1. Bức Tranh Thiết Kế E-commerce Máy Ảnh 2026

### Ngành nào đang hot trong design?

E-commerce máy ảnh 2026 nằm ở giao điểm của **3 xu hướng lớn**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   PREMIUM PRODUCT        IMMERSIVE          CONVERSION-     │
│   PRESENTATION           COMMERCE           FOCUSED UX      │
│   ─────────────          ───────────        ──────────────  │
│   - Cinematic hero       - 3D viewer        - Flash sale    │
│   - Lifestyle imagery    - AR preview       - FOMO timer    │
│   - Minimal chrome       - Configurator     - Quick checkout│
│   - Storytelling         - Spatial UI       - Social proof  │
│                                                             │
│                    ▼ MAYANHVIETNAM.COM ▼                    │
│              "Professional + Immersive + Local"             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tại sao máy ảnh khác với e-commerce thông thường?

Máy ảnh là sản phẩm **đắt tiền + kỹ thuật + cảm xúc**:
- **Giá cao**: 5-50 triệu → khách research kỹ, cần tin tưởng
- **Technical specs quan trọng**: sensor, ISO, mount system, focal length
- **Domain-specific UX**: body+lens compatibility checker, mount selector
- **Visual-first**: sản phẩm tạo ra ảnh → website PHẢI đẹp
- **Community-driven**: photographer community, reviews, comparison
- **OMO model**: khách xem online → mua offline hoặc ngược lại

→ Website camera không thể là "catalog + giỏ hàng" đơn giản. Nó cần là **showroom kỹ thuật số**.

---

## 2. Phân Tích Competitor

### 2.1 FPTShop.com.vn (Thị trường Việt Nam)

| Thuộc tính | Đánh giá |
|-----------|----------|
| **Layout** | Flat, block-based, scroll dài — standard VN e-commerce |
| **Color** | Đỏ (#E3000B) + Cam (#FF6600) + Xanh dương (#0055A4) — urgency-focused |
| **Typography** | Roboto/Arial, bold prices, functional — không có personality |
| **Product Card** | Ảnh vuông + giá đỏ + badge giảm% + 3 icon spec |
| **UX Pattern** | Flash sale + countdown + "Còn X/30 suất" — FOMO-driven |
| **Mobile** | Responsive tốt, bottom nav, touch-friendly |
| **3D/AR** | ❌ Không có |
| **Photography-specific** | ❌ General electronics — không có mount selector, lens compatibility |

**Điểm mạnh**: Conversion-focused, hiểu tâm lý mua VN, mobile-first
**Điểm yếu**: Generic, không premium, không domain-specific, không immersive

### 2.2 B&H Photo (Toàn cầu)

| Thuộc tính | Xu hướng |
|-----------|---------|
| **Layout** | Clean grid, mega menu depth 3+, comparison tools |
| **Color** | Navy (#0060A9) + Orange (#F47920) + White — professional + trustworthy |
| **Product Detail** | Tabs chi tiết (overview, specs, reviews, Q&A), bulk pricing, 360° view |
| **Domain UX** | "What's in the Box", lens comparison matrix, filter by mount |
| **Mobile** | App-first, barcode scan |
| **Trust signals** | Expert reviews, awards, "B&H Pick" badges |

**Điểm mạnh**: Depth thông tin, expert positioning, comparison tools
**Điểm yếu**: Dense layout, overwhelming cho casual shopper

### 2.3 Apple Store (Reference cho premium photography UX)

| Thuộc tính | Xu hướng |
|-----------|---------|
| **Layout** | Full-bleed, single-focus, scroll storytelling |
| **Color** | Monochrome + product accent — black/white dominant |
| **Product Detail** | Cinematic hero → scroll-reveal specs → 3D rotate → buy |
| **3D/AR** | Native AR try-on, product rotation |
| **Typography** | SF Pro, huge headings, whitespace luxurious |
| **Motion** | Scroll-triggered animations, parallax, fade-in |

**Điểm mạnh**: Premium feel, emotional connection, immersive
**Điểm yếu**: Không phù hợp cho high-volume e-commerce

### 2.4 So sánh & Gap Analysis

| Feature | FPTShop | B&H Photo | Apple | mayanhvietnam (target) |
|---------|---------|-----------|-------|----------------------|
| Flash Sale + FOMO | ✅ Strong | ❌ Minimal | ❌ None | ✅ Keep |
| Product Depth | ⚠️ Shallow | ✅ Deep | ✅ Deep | ✅ Deep |
| 3D Viewer | ❌ | ⚠️ Basic | ✅ Native | ✅ **Full** |
| AR Preview | ❌ | ❌ | ✅ | ✅ **Full** |
| Lens Compatibility | ❌ | ✅ Filter | N/A | ✅ **Interactive** |
| Body+Lens Configurator | ❌ | ❌ | N/A | ✅ **Unique** |
| Dark Mode | ❌ | ❌ | ✅ Auto | ✅ **Auto** |
| Premium Feel | ❌ Budget | ⚠️ Medium | ✅ Luxury | 🎯 **Professional** |
| Vietnamese UX | ✅ Strong | ❌ None | ❌ None | ✅ **Native** |

**→ Design Opportunity**: mayanhvietnam.com có thể kết hợp **FOMO conversion VN** + **B&H technical depth** + **Apple immersive feel** + **3D/AR unique feature** — không competitor nào làm được combo này.

---

## 3. Ba Direction Thiết Kế

### Direction A: "Dark Professional" (Recommended ⭐)

```
Concept: Showroom ảnh tối — sản phẩm nổi bật trên nền đen
Tone: Nghiêm túc, chuyên nghiệp, cao cấp
Target audience: Photographers, content creators, professionals
```

| Token | Value |
|-------|-------|
| **Background** | `#0a0a0f` (rich black) → `#111118` (surface) |
| **Surface** | `#1a1a24` (cards, drawers) |
| **Text Primary** | `#f0f0f5` (white-ish) |
| **Text Secondary** | `#8888a0` (muted purple-gray) |
| **Accent** | `#00d4aa` (teal/cyan) — cho CTAs, badges, highlights |
| **Accent Secondary** | `#ff6b35` (warm orange) — cho sale, flash deals |
| **Border** | `#2a2a35` (subtle dark borders) |
| **Gradient** | `linear-gradient(135deg, #0a0a0f 0%, #14141f 50%, #1a1a28 100%)` |
| **Card** | `#13131c` với `border: 1px solid #1e1e2a` + `backdrop-filter: blur(20px)` |

**Visual References**: Apple Store dark mode, Adobe Creative Cloud, Figma dark theme

**Tại sao phù hợp**:
- Sản phẩm camera (màu đen/silver) SÁNG trên nền tối → dramatic contrast
- Tạo cảm giác premium, studio-like
- Photo gallery trên nền tối giống Lightroom/Capture One → quen thuộc với photographers
- Dark mode đang là standard cho creative tools
- OLED-friendly trên mobile

### Direction B: "Clean Minimal White"

```
Concept: Gallery trắng — sản phẩm như tranh trong viện bảo tàng
Tone: Sạch sẽ, tối giản, modern
Target audience: Broader audience, lifestyle photographers
```

| Token | Value |
|-------|-------|
| **Background** | `#fafafa` (warm white) |
| **Surface** | `#ffffff` |
| **Text Primary** | `#111827` |
| **Accent** | `#2563eb` (blue) hoặc `#dc2626` (red) |
| **Muted** | `#6b7280` |

**Visual References**: Uniqlo, Muji, Kinfolk Magazine

**Ưu điểm**: An toàn, accessible, load nhanh trên mọi device
**Nhược điểm**: Generic, không tạo wow factor, dễ nhầm với hàng nghìn template

### Direction C: "Photography Film Noir"

```
Concept: Nhiếp ảnh đen trắng — tribute to analog photography
Tone: Artistic, nostalgic, authentic
Target audience: Film photography enthusiasts, artistic photographers
```

| Token | Value |
|-------|-------|
| **Background** | `#f5f0eb` (film paper warm) |
| **Accent** | `#c41e3a` (Kodak red) hoặc `#d4a853` (film gold) |
| **Typography** | Serif + monospace mix (film feel) |
| **Texture** | Film grain overlay, paper texture |

**Ưu điểm**: Unique, memorable, storytelling power
**Nhược điểm**: Too niche, khó scale cho mass market

---

## 4. Khuyến Nghị: Direction A — "Dark Professional"

### 4.1 Layout Philosophy

```
┌──────────────────────────────────────────────────────────────────┐
│  PHILOSOPHY: "Less chrome, more product"                         │
│                                                                  │
│  1. Product is the hero — UI disappears                          │
│  2. Generous whitespace (or "darkspace")                         │
│  3. Scroll = story — not scrolling through a catalog             │
│  4. Every interaction is smooth — Framer Motion animations       │
│  5. 3D/AR is native, not bolted on                               │
└──────────────────────────────────────────────────────────────────┘
```

### 4.2 Homepage Layout Concept

```
┌─────────────────────────────────────────────────┐
│ ░░░░░ TOP BAR: Hotline | Promo banner ░░░░░░░░░ │  ← Thin, 32px
├─────────────────────────────────────────────────┤
│ Logo    [🔍 Search everything...]    👤 🛒(2)  │  ← 64px, sticky, backdrop-blur
├─────────────────────────────────────────────────┤
│ Máy ảnh | Lens | Flycam | Action | Studio |... │  ← Underline nav, not mega-menu
├─────────────────────────────────────────────────┤
│                                                  │
│  █████████████████████████████████████████████   │
│  █                                             █   │
│  █      HERO: Cinematic full-bleed             █   │  ← 80vh, product in focus
│  █      Product hero shot + tagline            █   │     Ken Burns animation
│  █      [Khám phá Canon EOS R5 →]             █   │     Gradient overlay bottom
│  █                                             █   │
│  █████████████████████████████████████████████   │
│                                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ 📷   │ │ 🔭   │ │ 🚁   │ │ 🏃   │ × 9      │  ← Horizontal scroll (mobile)
│  │Body  │ │Lens  │ │Drone │ │Action│           │     3×3 grid (desktop)
│  └──────┘ └──────┘ └──────┘ └──────┘           │     Glassmorphism cards
│                                                  │
│  ⚡ FLASH SALE    ⏱ 02:14:32                  │  ← Dark red accent
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │     Product cards glow
│  │     │ │     │ │     │ │     │ │     │     │
│  │ -30%│ │ -25%│ │ -20%│ │ -15%│ │ -40%│     │
│  │ 9.9M│ │ 24M │ │ 32M │ │ 15M │ │ 7.5M│     │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘     │
│                                                  │
│  ═══ MÁY ẢNH NỔI BẬT ═══                       │  ← Section with dark bg
│                                                  │
│  ┌─────────────┐  ┌─────────────┐               │
│  │             │  │             │               │  ← Large product cards
│  │   [PRODUCT  │  │   [PRODUCT  │               │     Hover: subtle zoom
│  │    IMAGE]   │  │    IMAGE]   │               │     + glow effect
│  │             │  │             │               │
│  │ Canon R50   │  │ Sony A7IV   │               │
│  │ 12.990.000₫│  │ 35.990.000₫│               │
│  │ [Xem 3D →] │  │ [Xem 3D →] │               │  ← 3D badge on card
│  └─────────────┘  └─────────────┘               │
│                                                  │
│  ═══ BỘT ĐẦU TIÊN CỦA BẠN ═══                  │  ← Interactive configurator
│                                                  │     Chọn body → gợi ý lens
│  ┌────────────────────────────────────────┐     │
│  │  [BODY SELECTOR]     → [LENS MATCHER] │     │
│  │   Canon R50    ──────►  RF 18-45mm    │     │
│  │   Sony A7IV    ──────►  FE 28-70mm   │     │
│  │                               Combo:    │     │
│  │                          45.990.000₫   │     │
│  │                          [Tiết kiệm 2M] │     │
│  └────────────────────────────────────────┘     │
│                                                  │
│  ═══ FLYCAM / DRONE ═══                         │
│  ... (similar product sections)                  │
│                                                  │
│  ═══ TỪ COMMUNITY ═══                           │  ← Social proof
│  ★★★★★  "Canon R50 quá tuyệt..." — @dung_anh  │
│  ★★★★☆  "DJI Air 3S bay siêu ổn..." — @minh   │
│                                                  │
│  ═══ HỆ THỐNG CỬA HÀNG ═══                     │  ← Map preview
│  ┌─────┐ 4 locations with mini map              │
│                                                  │
├─────────────────────────────────────────────────┤
│ FOOTER: Dark bg, clean 4-column layout          │
└─────────────────────────────────────────────────┘
```

### 4.3 Product Detail Page Concept

```
┌──────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Trang chủ > Máy ảnh > Canon EOS R50                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────┐  ┌────────────────────────────┐   │
│  │                          │  │  CANON EOS R50              │   │
│  │                          │  │  Mirrorless APS-C           │   │
│  │     PRODUCT GALLERY      │  │  ★★★★★ (128 đánh giá)      │   │
│  │                          │  │                             │   │
│  │     [Main Image]         │  │  12.990.000₫                │   │
│  │     or 3D Viewer         │  │  ~~14.990.000₫~~  -13%     │   │
│  │     or AR Preview        │  │                             │   │
│  │                          │  │  ── Chọn mount ──           │   │
│  │                          │  │  [Canon RF] [Sony E] [Nikon]│   │
│  │     [📷] [📷] [📷] [3D] │  │                             │   │
│  │                          │  │  ── Chọn kit ──             │   │
│  │  [🌐 Xem trong AR →]    │  │  [Body Only] [Kit 18-45mm] │   │
│  │                          │  │  [Kit 18-150mm]            │   │
│  └──────────────────────────┘  │                             │   │
│                                │  ✅ Còn hàng (15 sản phẩm)  │   │
│  ┌──────────────────────────┐  │                             │   │
│  │  🔮 XEM 3D MODEL         │  │  [  -  ]  1  [  +  ]      │   │
│  │  ┌────────────────────┐ │  │                             │   │
│  │  │                    │ │  │  [🛒 THÊM VÀO GIỎ]        │   │
│  │  │   [Interactive     │ │  │  [⚡ MUA NGAY]             │   │
│  │  │    3D Model]       │ │  │                             │   │
│  │  │   Rotate • Zoom    │ │  │  🔄 Thu cũ đổi mới          │   │
│  │  │                    │ │  │  💳 Trả góp từ 1.082K/tháng │   │
│  │  └────────────────────┘ │  │                             │   │
│  │  [📷 Gallery] [🔮 3D]   │  └────────────────────────────┘   │
│  └──────────────────────────┘                                    │
│                                                                  │
│  ──── TABS ────────────────────────────────────────────────────  │
│  [Thông số] [Mô tả] [Đánh giá] [Bảo hành]                     │
│                                                                  │
│  ┌── Thông số kỹ thuật ─────────────────────────────────────┐   │
│  │  Sensor          │ APS-C CMOS, 24.2 MP                     │   │
│  │  ISO             │ 100-32000 (mở rộng 51200)               │   │
│  │  Video           │ 4K 30fps, 1080p 120fps                  │   │
│  │  Stabilization   │ Electronic IS                            │   │
│  │  Autofocus       │ Dual Pixel CMOS AF II, 651 điểm         │   │
│  │  Mount           │ Canon RF                                 │   │
│  │  Weight          │ 375g (body only)                         │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ──── ỐNG KÍNH TƯƠNG THÍCH ──────────────────────────────────  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ RF      │ │ RF      │ │ RF      │ │ RF-S    │              │
│  │ 50mm    │ │ 18-45mm │ │ 18-150  │ │ 55-210  │              │
│  │ f/1.8   │ │ Kit     │ │ All-in  │ │ Tele    │              │
│  │ 7.490K  │ │ 3.490K  │ │ 9.990K  │ │ 8.990K  │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                  │
│  ──── SẢN PHẨM LIÊN QUAN ────────────────────────────────────  │
│  [Product cards carousel]                                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 4.4 Color System Chi Tiết

```css
/* === DARK THEME (Default) === */
:root {
  /* Backgrounds */
  --bg-primary:     #0a0a0f;    /* Main background — rich black */
  --bg-secondary:   #111118;    /* Section alternating bg */
  --bg-surface:     #16161f;    /* Cards, drawers */
  --bg-elevated:    #1c1c28;    /* Modals, dropdowns */
  --bg-glass:       rgba(22, 22, 31, 0.8);  /* Glassmorphism */

  /* Borders */
  --border-subtle:  #1e1e2a;
  --border-default: #2a2a38;
  --border-strong:  #3a3a4a;

  /* Text */
  --text-primary:   #f0f0f5;
  --text-secondary: #8888a0;
  --text-muted:     #55556a;
  --text-inverse:   #0a0a0f;

  /* Brand */
  --accent:         #00d4aa;    /* Teal — CTAs, highlights */
  --accent-hover:   #00b894;
  --accent-glow:    rgba(0, 212, 170, 0.15);

  /* Commerce */
  --sale:           #ff6b35;    /* Orange — flash sale, discounts */
  --sale-glow:      rgba(255, 107, 53, 0.15);
  --price:          #ffffff;
  --price-original: #55556a;
  --discount-badge: #ff4444;

  /* Status */
  --success:        #00d4aa;
  --warning:        #ffc107;
  --error:          #ff4757;
  --info:           #5b9aff;

  /* Glow effects */
  --glow-accent:    0 0 20px rgba(0, 212, 170, 0.2);
  --glow-sale:      0 0 20px rgba(255, 107, 53, 0.2);
  --glow-card:      0 4px 24px rgba(0, 0, 0, 0.4);
}

/* === LIGHT THEME (Auto / User toggle) === */
[data-theme="light"] {
  --bg-primary:     #fafafa;
  --bg-secondary:   #f0f0f5;
  --bg-surface:     #ffffff;
  --bg-elevated:    #ffffff;
  --border-subtle:  #e5e5ea;
  --border-default: #d0d0d8;
  --text-primary:   #111118;
  --text-secondary: #666680;
  --accent:         #00a885;
  --sale:           #e85d2a;
  /* ... */
}
```

### 4.5 Typography System

```css
/* === HEADINGS: Inter (professional, techy) === */
/* === PRICES: JetBrains Mono hoặc DM Mono (technical feel) === */
/* === BODY: Inter (clean, readable) === */

:root {
  --font-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;  /* For prices & specs */
  --font-display: 'Inter', sans-serif;  /* For hero text */

  /* Scale — modular ratio 1.25 (Major Third) */
  --text-xs:    0.75rem;    /* 12px */
  --text-sm:    0.875rem;   /* 14px */
  --text-base:  1rem;       /* 16px */
  --text-lg:    1.125rem;   /* 18px */
  --text-xl:    1.25rem;    /* 20px */
  --text-2xl:   1.5rem;     /* 24px */
  --text-3xl:   1.875rem;   /* 30px */
  --text-4xl:   2.25rem;    /* 36px */
  --text-5xl:   3rem;       /* 48px */
  --text-hero:  4rem;       /* 64px — hero only, mobile: 2.5rem */

  /* Weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* Line heights */
  --leading-tight:   1.2;
  --leading-normal:  1.5;
  --leading-relaxed: 1.7;

  /* Letter spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;    /* Uppercase labels */
  --tracking-wider:   0.1em;     /* Category labels */
}
```

**Typography Rules**:
- **Hero text**: `text-hero`, `font-bold`, `tracking-tight`, `leading-tight`
- **Product name**: `text-xl`, `font-semibold`, `text-primary`
- **Price**: `font-mono`, `text-2xl`, `font-bold`, `text-price`
- **Price (sale)**: `text-sale`, strikethrough original `text-muted`
- **Section heading**: `text-3xl`, `font-bold`, `tracking-tight`
- **Category nav**: `text-sm`, `font-medium`, `tracking-wider`, uppercase
- **Specs table label**: `text-sm`, `text-secondary`
- **Specs table value**: `text-base`, `text-primary`, `font-medium`
- **Badges/Tags**: `text-xs`, `font-semibold`, `tracking-wide`, uppercase

### 4.6 Component Design Patterns

#### Product Card (Dark Theme)

```
┌──────────────────────────────┐
│  bg-surface                  │  border: 1px solid border-subtle
│  border-radius: 12px         │  transition: all 0.3s ease
│  overflow: hidden            │
│                              │
│  ┌────────────────────────┐  │
│  │ ██████████████████████ │  │  aspect-ratio: 1/1
│  │ █                    █ │  │  bg: #0d0d14
│  │ █   [PRODUCT IMAGE]  █ │  │  hover: scale(1.05) + 0.5s
│  │ █                    █ │  │
│  │ ██████████████████████ │  │
│  │ ┌─────┐               │  │  Badges overlay
│  │ │-13% │   [🔮 3D]     │  │  ────────
│  │ │SALE │               │  │  - Sale badge: bg-sale, text-white
│  │ └─────┘               │  │  - 3D badge: bg-accent/20, text-accent
│  └────────────────────────┘  │     (only shown if 3D model available)
│                              │
│  Padding: 16px               │
│                              │
│  Canon EOS R50               │  text-sm, text-secondary
│  Mirrorless APS-C            │  text-xs, text-muted
│                              │
│  ┌──────────────────────┐   │  Price block
│  │ 12.990.000₫          │   │  text-xl, font-mono, font-bold, text-price
│  │ ~~14.990.000₫~~ -13% │   │  original: line-through, text-muted
│  └──────────────────────┘   │
│                              │
│  ★★★★☆ (128)               │  star rating, small
│                              │
│  [🛒 Thêm vào giỏ]          │  Hover: glow-accent shadow
│                              │
└──────────────────────────────┘

Hover state:
- Card lifts: transform: translateY(-4px)
- Border: border-default
- Shadow: glow-card
- Image zooms: scale(1.05)
- "Thêm vào giỏ" button appears (hidden on default for minimal look)
```

#### Glassmorphism Card (Categories, Quick Links)

```
┌──────────────────────────────┐
│  bg: rgba(22, 22, 31, 0.6)  │
│  backdrop-filter: blur(16px) │
│  border: 1px solid           │
│    rgba(255,255,255,0.08)    │
│  border-radius: 16px         │
│                              │
│       📷 (32px icon)         │  icon: text-accent
│                              │
│    Máy ảnh Body              │  text-sm, font-medium
│    (124 sản phẩm)            │  text-xs, text-muted
│                              │
└──────────────────────────────┘

Hover: border-color → accent, subtle glow
```

#### Flash Sale Card

```
┌──────────────────────────────┐
│  bg-surface                  │
│  border: 1px solid sale/30   │  Subtle red border
│  glow: glow-sale             │  Red glow
│                              │
│  ┌────────────────────────┐  │
│  │ ██████████████████████ │  │
│  │ █                    █ │  │
│  │ █   [PRODUCT IMAGE]  █ │  │
│  │ █                    █ │  │
│  │ ██████████████████████ │  │
│  │ ┌─────────┐           │  │
│  │ │ ⚡ -30% │           │  │  Flash badge: bg-sale, pulse animation
│  │ └─────────┘           │  │
│  └────────────────────────┘  │
│                              │
│  DJI Mini 4 Pro              │
│                              │
│  ⚡ 12.990.000₫              │  sale color
│  ~~18.990.000₫~~            │
│                              │
│  ─────░░░░░░░░░ 60% ──────  │  Progress bar: "Đã bán 60%"
│                              │  bar-bg: sale/20, bar-fill: sale
│  ⏱ Còn lại 02:14:32         │  countdown: font-mono, sale color
│                              │
│  [🛒 Mua ngay]              │  bg: sale, hover: darker
│                              │
└──────────────────────────────┘
```

#### Price Display Component

```
Layout A — Normal price:
┌──────────────────────┐
│ 12.990.000₫          │  font-mono, text-2xl, font-bold
└──────────────────────┘

Layout B — Sale price:
┌──────────────────────────────┐
│ 12.990.000₫  -13%           │  sale price + discount badge
│ ~~14.990.000₫~~              │  strikethrough, text-muted
└──────────────────────────────┘

Layout C — Installment:
┌──────────────────────────────────┐
│ 12.990.000₫                     │
│ Từ 1.082.500₫/tháng × 12 tháng │  text-sm, text-secondary
│ Trả góp 0% qua thẻ tín dụng      │  text-xs, text-accent
└──────────────────────────────────┘

Format: Vietnamese format — `XX.XXX.XXX₫`
- Dot separator for thousands
- ₫ symbol at end
- Bold for sale price
- Line-through for original
```

### 4.7 Animation & Motion Design

```typescript
// Framer Motion patterns

// 1. Page entrance — staggered fade-in
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// 2. Product card hover
const cardHover = {
  rest: { scale: 1, boxShadow: 'var(--glow-card)' },
  hover: {
    scale: 1.02,
    boxShadow: 'var(--glow-accent)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// 3. Hero image Ken Burns
const heroKenBurns = {
  scale: [1, 1.08],
  transition: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
};

// 4. Flash sale countdown pulse
const countdownPulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 1, repeat: Infinity, repeatDelay: 59 }
};

// 5. Cart drawer slide
const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } }
};

// 6. Category icon hover bounce
const iconBounce = {
  hover: { y: -4, scale: 1.1, transition: { type: 'spring', stiffness: 400 } }
};

// 7. 3D Viewer load transition
const viewerLoad = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }
};
```

### 4.8 Responsive Breakpoints & Patterns

```css
/* Breakpoints */
--bp-sm:  640px;    /* Large phone */
--bp-md:  768px;    /* Tablet */
--bp-lg:  1024px;   /* Small desktop */
--bp-xl:  1280px;   /* Desktop */
--bp-2xl: 1536px;   /* Large desktop */
```

| Component | Mobile (<768) | Tablet (768-1024) | Desktop (>1024) |
|-----------|--------------|-------------------|-----------------|
| **Header** | Hamburger + bottom bar | Condensed nav | Full nav + mega menu |
| **Hero** | 50vh, single CTA | 60vh | 80vh, parallax |
| **Category Grid** | Horizontal scroll | 3×3 | 3×3 |
| **Product Grid** | 2 columns | 3 columns | 4 columns |
| **Product Card** | Full width (2-col) | 1/3 width | 1/4 width |
| **PDP Gallery** | Stacked (image top) | 2-column | 2-column (wider gallery) |
| **PDP 3D Viewer** | Full width, swipe | 50% width | 50% width |
| **Filter Sidebar** | Bottom sheet | Collapsible sidebar | Fixed sidebar |
| **Cart Drawer** | Full screen | 400px sidebar | 400px sidebar |
| **Footer** | 2 columns | 4 columns | 4 columns + map |

### 4.9 Glassmorphism & Special Effects

```css
/* Glassmorphism — cho category cards, header trên hero */
.glass {
  background: rgba(22, 22, 31, 0.6);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

/* Glow effect — cho accent elements */
.glow-accent {
  box-shadow: 0 0 20px rgba(0, 212, 170, 0.15),
              0 0 60px rgba(0, 212, 170, 0.05);
}

.glow-sale {
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.15),
              0 0 60px rgba(255, 107, 53, 0.05);
}

/* Noise texture overlay — subtle grain cho dark bg */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/noise.svg');
  opacity: 0.03;
  pointer-events: none;
}

/* Gradient text — cho hero heading */
.gradient-text {
  background: linear-gradient(135deg, #00d4aa 0%, #5b9aff 50%, #ff6b35 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Scroll indicator */
.scroll-indicator {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
```

---

## 5. Visual Direction Summary

### Mood Board Keywords

```
DARK, PROFESSIONAL, CINEMATIC, IMMERSIVE, TECHNICAL, CONFIDENT
```

### Tránh
- ❌ Red-heavy design (FPTShop-style) — quá budget, không premium
- ❌ Cluttered layout — camera shoppers muốn xem sản phẩm, không phải banner
- ❌ Generic template look — ngành nhiếp ảnh đòi hỏi visual excellence
- ❌ Animation overload — subtle > flashy
- ❌ Stock photos — dùng ảnh sản phẩm thật, lifestyle photography

### Nên
- ✅ Dark theme mặc định, light theme optional
- ✅ Product photography = hero của mọi section
- ✅ 3D viewer tích hợp nativer trong product card và PDP
- ✅ Mono font cho prices & specs — tạo technical feel
- ✅ Glow effects subtles cho accents
- ✅ Scroll-triggered animations — reveal content as user scrolls
- ✅ Generous "darkspace" — products breathe
- ✅ Vietnamese currency format chuẩn: `XX.XXX.XXX₫`
- ✅ Flash sale section với urgency (countdown + progress bar)
- ✅ Body+lens configurator — unique feature không competitor nào có

---

## 6. Design Tokens cho Tailwind CSS v4

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* === DARK THEME === */
  --color-bg-primary:     #0a0a0f;
  --color-bg-secondary:   #111118;
  --color-bg-surface:     #16161f;
  --color-bg-elevated:    #1c1c28;
  --color-bg-glass:       rgba(22, 22, 31, 0.6);

  --color-border-subtle:  #1e1e2a;
  --color-border-default: #2a2a38;

  --color-text-primary:   #f0f0f5;
  --color-text-secondary: #8888a0;
  --color-text-muted:     #55556a;

  --color-accent:         #00d4aa;
  --color-accent-hover:   #00b894;

  --color-sale:           #ff6b35;
  --color-sale-hover:     #e85d2a;

  --color-success:        #00d4aa;
  --color-warning:        #ffc107;
  --color-error:          #ff4757;

  /* === TYPOGRAPHY === */
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;

  /* === SPACING === */
  --spacing-xs:  0.25rem;
  --spacing-sm:  0.5rem;
  --spacing-md:  1rem;
  --spacing-lg:  1.5rem;
  --spacing-xl:  2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;

  /* === RADII === */
  --radius-sm:   0.375rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-2xl:  1.5rem;
  --radius-full: 9999px;
}
```

---

> **Tóm lại**: mayanhvietnam.com nên theo **Direction A: "Dark Professional"** — kết hợp dark cinematic UI + 3D immersive features + Vietnamese conversion UX (flash sale, FOMO, installment). Đây là combination mà **khcompetitor nào tại VN đang làm**, tạo lợi thế cạnh tranh rõ ràng.
