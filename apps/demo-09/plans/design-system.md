# Design System — mayanhvietnam.com
## Version 1.0 — Single Source of Truth

---

> **Mục đích:** Tài liệu này là nguồn sự thật duy nhất cho mọi quyết định thiết kế trong dự án. Mọi component, page, và interaction đều phải tuân theo hệ thống này. Không có ngoại lệ.

---

## 1. Brand Design Principles

Mười nguyên tắc này không phải là gợi ý. Chúng là luật.

---

### P1 — Photography Before Product
Mọi layout đều phải ưu tiên hình ảnh nhiếp ảnh hơn thông tin sản phẩm. Người dùng phải *cảm nhận* thế giới của nhiếp ảnh trước khi họ được giới thiệu về một chiếc máy ảnh cụ thể.

**Biểu hiện:** Hero sections dùng ảnh đời thực. Product cards dùng ảnh chất lượng cao. Không bao giờ dùng ảnh stock generic.

---

### P2 — Silence Is Structure
Khoảng trắng không phải là "khoảng trống." Nó là thiết kế. Mỗi phần tử trên trang phải có đủ không gian để thở. Sự tĩnh lặng tạo ra cảm giác sang trọng — sự hỗn loạn thì không.

**Biểu hiện:** Section padding tối thiểu 96px. Card padding rộng rãi. Text không bao giờ đặt sát mép.

---

### P3 — Story Before Sale
Người dùng không sẵn sàng mua cho đến khi họ đã được dẫn dắt qua một câu chuyện. Mọi trang đều phải tạo bối cảnh và cảm xúc trước khi đặt CTA mua hàng.

**Biểu hiện:** Headings mang ngữ nghĩa cảm xúc. CTAs nói "Khám phá" trước khi nói "Mua ngay." Specs xuất hiện sau khi ảnh đã thu hút sự chú ý.

---

### P4 — Light as a Recurring Motif
Ánh sáng là ngôn ngữ của nhiếp ảnh. Nó phải có mặt trong thiết kế dưới mọi hình thức: gradient chuyển tông từ tối sang sáng, photography được chiếu sáng đẹp, hover effects mô phỏng ánh sáng tiếp cận bề mặt.

**Biểu hiện:** Sections mở đầu trong bóng tối và dần chuyển sang sáng. Hover states mô phỏng ánh sáng chiếu lên bề mặt.

---

### P5 — Typography Is Architecture
Kiểu chữ không phải để điền vào chỗ trống. Nó là cấu trúc tạo nên nhịp điệu của trang. Contrast giữa Display ExtraBold và Body Light là âm nhạc thị giác.

**Biểu hiện:** Không bao giờ dùng nhiều hơn 3 kích thước font trong một section. Contrast weight (Black vs Light) được dùng có chủ ý. Vietnamese diacritical marks luôn được render hoàn hảo.

---

### P6 — One Accent, Used Sparingly
Màu accent chỉ xuất hiện ở những khoảnh khắc quan trọng nhất: một badge, một giá đặc biệt, một CTA chính. Khi mọi thứ đều là accent, không có gì là accent.

**Biểu hiện:** Màu accent không xuất hiện quá 2–3 lần trên một viewport. Nền trắng và đen là dominant.

---

### P7 — Editorial Asymmetry
Lưới đối xứng tạo ra bố cục nhàm chán. Composition tốt luôn có sự mất cân bằng có chủ ý — một ảnh lớn hơn ảnh kia, text lệch trái thay vì căn giữa, một phần tử "phá vỡ" lưới để tạo điểm nhấn.

**Biểu hiện:** Grid không bao giờ hoàn toàn đối xứng ở tầng trang. Cards có thể có kích thước khác nhau. Text alignment mặc định là left-aligned.

---

### P8 — Motion Like Breathing
Mọi animation đều phải mô phỏng thế giới vật lý: chậm, mượt, và chỉ xuất hiện khi cần thiết. Animation không bao giờ được phép làm người dùng bị phân tâm. Nếu phải hỏi "có nên thêm animation không?" — câu trả lời là không.

**Biểu hiện:** Easing curves luôn là ease-out hoặc ease-in-out. Không có bounce. Không có spring. Duration không quá 400ms.

---

### P9 — Vietnamese First
Tất cả thiết kế phải được kiểm tra với văn bản tiếng Việt thực tế, không phải placeholder. Line-height phải đủ rộng cho diacritical marks. Không bao giờ truncate tiếng Việt ở giữa dấu thanh điệu.

**Biểu hiện:** Line-height tối thiểu 1.6 cho body text. Font luôn là Be Vietnam Pro hoặc Plus Jakarta Sans. Test với strings dài như "Máy ảnh không gương lật Sony Alpha A7 IV".

---

### P10 — Confidence Through Restraint
Thương hiệu premium không giải thích bản thân quá nhiều. Họ tin rằng người dùng sẽ hiểu. Ít copy hơn, ít element hơn, ít màu sắc hơn — nhưng mỗi thứ còn lại phải hoàn hảo.

**Biểu hiện:** Không có microcopy thừa. Không có icon giải thích thứ đã rõ ràng. Không có decoration không mang nghĩa. Mỗi pixel phải có lý do tồn tại.

---

---

## 2. Color System

### Philosophy
Nền trắng chiếm ưu thế. Bóng tối được dùng có chủ ý. Một màu accent duy nhất được dùng rất tiết kiệm. Hệ thống màu này không có nhiều màu — nó có rất ít màu, được dùng rất chính xác.

---

### Primary Palette

#### `--color-ink` — Photographic Black
```
Value:     #0D0D0D
Usage:     Headings lớn nhất, nền dark sections, text chính trên background sáng
NOT:       Pure #000000 — quá cứng, thiếu tính nhiếp ảnh
Feel:      Trong phòng tối, trước khi đèn đỏ được bật
```

#### `--color-paper` — Archival White
```
Value:     #F8F6F2
Usage:     Background chính của toàn trang, surface của cards trên nền tối
NOT:       Pure #FFFFFF — quá lạnh, giống màn hình bệnh viện
Feel:      Giấy ảnh chất lượng cao, tường phòng triển lãm
```

#### `--color-void` — Deep Dark (Dark Mode Surface)
```
Value:     #0A0909
Usage:     Nền của dark sections (hero, footer, featured areas)
NOT:       Background tổng thể — chỉ dùng cho dark surfaces
Feel:      Phim chưa được phơi sáng
```

---

### Accent

#### `--color-gold` — Champagne Gold
```
Value:     #B89A5E
Usage:     Price highlights, active states, sale badges, primary CTA buttons
Character: Muted, warm — không phải orange, không phải yellow. Ánh sáng cuối buổi chiều.
NOT:       Background fills — chỉ dùng trên text, borders, icons, badges nhỏ
Contrast:  Luôn kiểm tra WCAG AA khi dùng trên white
Frequency: Tối đa 2–3 instances per viewport. Không nhiều hơn.
```

#### `--color-steel` — Technical Blue-Gray
```
Value:     #8AABB8
Usage:     Technical specs, sensor labels, mount type indicators, IBM Plex Mono context
Character: Lạnh, chính xác — màu của kính ống kính, màu của kim loại
NOT:       Decorative use. Chỉ trong context kỹ thuật.
```

---

### Neutral Scale

```
--color-n900:  #111111   →  Body text chính, subheadings
--color-n700:  #3A3A3A   →  Secondary text, descriptions dài
--color-n500:  #6B6B6B   →  Meta information, dates, view counts
--color-n400:  #8C8C8C   →  Disabled states, placeholder text
--color-n200:  #D4D4D4   →  Dividers, subtle borders
--color-n100:  #EBEBEB   →  Card borders, input outlines, subtle backgrounds
--color-n50:   #F4F3F0   →  Hover backgrounds, alternating rows
```

---

### Semantic Colors

```
--color-success:   #2D7A4F   →  Còn hàng, xác nhận đơn hàng, bảo hành active
--color-warning:   #8A6A1A   →  Sắp hết hàng, giao dịch đang xử lý
--color-error:     #8A1A1A   →  Hết hàng, lỗi form, cảnh báo
--color-sale:      #B89A5E   →  Giá khuyến mãi (dùng --color-gold)
```
> Semantic colors được thiết kế là muted, dark — không phải các màu neon sáng. Chúng truyền đạt thông tin mà không la hét.

---

### Usage Rules

| Màu | Nền tổng thể | Section tối | Text | CTA | Badge | Border |
|---|---|---|---|---|---|---|
| `paper` #F8F6F2 | ✓ Primary | ✗ | ✗ | ✗ | ✗ | ✗ |
| `ink` #0D0D0D | ✗ | ✓ | ✓ headings | ✗ | ✗ | ✗ |
| `void` #0A0909 | ✗ | ✓ hero/footer | ✗ | ✗ | ✗ | ✗ |
| `gold` #B89A5E | ✗ | ✗ | ✓ price | ✓ primary | ✓ | ✓ accent |
| `steel` #8AABB8 | ✗ | ✗ | ✓ specs | ✗ | ✓ tech | ✗ |
| `n900` #111111 | ✗ | ✗ | ✓ body | ✗ | ✗ | ✗ |
| `n200` #D4D4D4 | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ dividers |

---

---

## 3. Typography System

### Font Families

```
Display & Editorial:  Be Vietnam Pro
                      Weights: 300 (Light), 400 (Regular), 600 (SemiBold),
                               700 (Bold), 800 (ExtraBold), 900 (Black)
                      Usage: All headings, manifesto text, category titles,
                             hero statements

UI & Functional:      Plus Jakarta Sans
                      Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
                      Usage: Body text, navigation, buttons, labels,
                             product names, prices, form inputs

Technical:            IBM Plex Mono
                      Weights: 400 (Regular), 500 (Medium)
                      Usage: Sensor specs, aperture values, ISO ranges,
                             model numbers, SKUs, technical data tables
```

> **Vietnamese rule:** Tất cả ba font đều có đầy đủ Vietnamese glyph set. Be Vietnam Pro được thiết kế riêng cho tiếng Việt — đây là lý do chính chọn nó cho display text.

---

### Type Scale

#### Display XL — Khoảnh khắc đặc biệt
```
Font:           Be Vietnam Pro Black (900)
Size:           80px / 5rem       (desktop)
                56px / 3.5rem     (tablet)
                40px / 2.5rem     (mobile)
Line height:    1.05
Letter spacing: -0.03em
Usage:          Hero statement, manifesto opening line
Example:        "Ánh sáng không ở lại."
                "Máy ảnh. Khoảnh khắc. Ký ức."
NEVER:          Body copy, product names, navigation
```

#### Display L — Section Heroes
```
Font:           Be Vietnam Pro ExtraBold (800)
Size:           56px / 3.5rem     (desktop)
                40px / 2.5rem     (tablet)
                32px / 2rem       (mobile)
Line height:    1.1
Letter spacing: -0.025em
Usage:          Category hero titles, page hero headings, editorial large text
Example:        "Ống kính. Điểm nhìn mới."
```

#### Display M — Section Titles
```
Font:           Be Vietnam Pro Bold (700)
Size:           40px / 2.5rem     (desktop)
                32px / 2rem       (tablet)
                26px / 1.625rem   (mobile)
Line height:    1.15
Letter spacing: -0.02em
Usage:          Section headings, featured collection titles
Example:        "Được chọn lọc kỹ càng"
```

#### Heading — Content Hierarchy
```
Font:           Be Vietnam Pro SemiBold (600)
Size:           28px / 1.75rem    (desktop)
                24px / 1.5rem     (tablet)
                20px / 1.25rem    (mobile)
Line height:    1.3
Letter spacing: -0.015em
Usage:          Product group headings, article headings, card group titles
```

#### Title — Component Level
```
Font:           Plus Jakarta Sans SemiBold (600)
Size:           20px / 1.25rem    (desktop/tablet)
                18px / 1.125rem   (mobile)
Line height:    1.4
Letter spacing: -0.01em
Usage:          Product card names, modal titles, sidebar headings
```

#### Body L — Primary Reading
```
Font:           Plus Jakarta Sans Regular (400)
Size:           18px / 1.125rem
Line height:    1.75
Letter spacing: 0em
Usage:          Product descriptions, article body, manifesto body text
Note:           1.75 line height là bắt buộc cho Vietnamese — diacritical marks
                trên chữ thường cần không gian phía trên
```

#### Body M — Standard UI
```
Font:           Plus Jakarta Sans Regular (400)
Size:           16px / 1rem
Line height:    1.65
Letter spacing: 0em
Usage:          Default body text, form labels, list items
```

#### Body S — Supporting Text
```
Font:           Plus Jakarta Sans Regular (400)
Size:           14px / 0.875rem
Line height:    1.6
Letter spacing: 0.005em
Usage:          Meta text, timestamps, secondary descriptions
```

#### Caption — Minimal Information
```
Font:           Plus Jakarta Sans Regular (400)
Size:           12px / 0.75rem
Line height:    1.5
Letter spacing: 0.01em
Usage:          Image captions, fine print, footnotes
NEVER:          Primary navigation, product names
```

#### Button — Actions
```
Font:           Plus Jakarta Sans SemiBold (600)
Size:           15px / 0.9375rem
Line height:    1
Letter spacing: 0.02em
Case:           Sentence case (không phải ALL CAPS — too aggressive)
Usage:          All buttons, clickable pills, tab labels
```

#### Label — Form & UI
```
Font:           Plus Jakarta Sans Medium (500)
Size:           13px / 0.8125rem
Line height:    1.4
Letter spacing: 0.01em
Usage:          Form field labels, section eyebrow labels, filter labels
```

#### Technical — Specs & Data
```
Font:           IBM Plex Mono Regular (400)
Size:           13px / 0.8125rem
Line height:    1.5
Letter spacing: 0em
Color:          Always --color-steel (#8AABB8)
Usage:          "24.2MP", "f/1.4–22", "ISO 100–51200", "Sony E-Mount"
```

#### Eyebrow — Context Setting
```
Font:           Plus Jakarta Sans SemiBold (600)
Size:           11px / 0.6875rem
Line height:    1
Letter spacing: 0.12em
Case:           ALL CAPS
Color:          --color-gold hoặc --color-n500
Usage:          "MÁY ẢNH MỚI", "BÁN CHẠY", "ĐỀ XUẤT"
                Section category labels: "ỐNG KÍNH", "PHỤ KIỆN"
```

---

### Typography Rules — Không Được Phép

- Không dùng font-size nhỏ hơn 12px cho bất cứ text nào
- Không dùng line-height nhỏ hơn 1.5 cho tiếng Việt
- Không dùng font-weight 400 (Regular) cho headings
- Không center-align body text dài hơn 2 dòng
- Không dùng quá 2 font families trong một component
- Không dùng Be Vietnam Pro cho body text dài (chỉ dùng cho display)
- Không tạo heading hierarchy bị skip (H1 → H3 không có H2)

---

---

## 4. Spacing System

**Base unit: 4px.** Tất cả spacing là bội số của 4. Các giá trị chính là bội số của 8 (8pt grid).

### Spacing Scale

```
--space-1:    4px    →  Khoảng cách micro: icon cạnh text, badge padding
--space-2:    8px    →  Compact: tag padding, tight list items
--space-3:    12px   →  Small gap: icon-to-text, label-to-input
--space-4:    16px   →  Base: default padding, list items, form fields
--space-5:    20px   →  Slightly loose: card internal padding (compact)
--space-6:    24px   →  Medium: default card padding, form group spacing
--space-8:    32px   →  Large: between related sections within a component
--space-10:   40px   →  XL: component group separation
--space-12:   48px   →  2XL: major component separation
--space-16:   64px   →  3XL: between major sections (narrow)
--space-20:   80px   →  4XL: section separation (standard)
--space-24:   96px   →  5XL: section separation (generous)
--space-30:   120px  →  6XL: hero section internal padding
--space-40:   160px  →  7XL: full-page hero padding (desktop)
```

### Semantic Spacing Tokens

```
Section Padding (desktop):    120px top / 120px bottom     →  --section-padding-lg
Section Padding (tablet):     80px top / 80px bottom       →  --section-padding-md
Section Padding (mobile):     60px top / 60px bottom       →  --section-padding-sm

Container Max Width:          1320px                        →  --container-max
Container Padding (desktop):  80px left / 80px right       →  --container-gutter-lg
Container Padding (tablet):   40px left / 40px right       →  --container-gutter-md
Container Padding (mobile):   20px left / 20px right       →  --container-gutter-sm

Content Max Width:            720px (for text blocks)      →  --content-max
                              960px (for content + aside)  →  --content-wide-max

Card Padding (standard):      32px                         →  --card-padding
Card Padding (compact):       20px                         →  --card-padding-sm
Card Gap (grid):              24px                         →  --card-gap
Card Gap (compact):           16px                         →  --card-gap-sm

Grid Gutter (desktop):        32px                         →  --grid-gutter-lg
Grid Gutter (tablet):         24px                         →  --grid-gutter-md
Grid Gutter (mobile):         16px                         →  --grid-gutter-sm
```

---

---

## 5. Grid System

### Desktop — 1320px Container

```
Breakpoint:      ≥ 1280px
Container:       1320px max-width, centered
Columns:         12
Gutter:          32px
Margin:          80px (outside container)
Column width:    (1320 - 11×32) / 12 = 80.3px per column
```

**Common column patterns:**
```
Full width:      12 col   →  Heroes, editorial full-bleed
Wide content:    10 col (offset 1)  →  Manifesto text, featured content
Two halves:      6 + 6   →  Feature split (image | text)
Editorial:       7 + 5   →  Asymmetric (image | content)
Three cards:     4 + 4 + 4  →  Category grid
Four cards:      3 + 3 + 3 + 3  →  Product grid (compact)
Sidebar layout:  8 + 4 (content | sidebar)
```

### Tablet — 768px–1279px

```
Breakpoint:      768px – 1279px
Container:       100% - 80px (40px each side)
Columns:         8
Gutter:          24px
Margin:          40px
```

**Common patterns:**
```
Two columns:     4 + 4
One + sidebar:   5 + 3
Full:            8
Three equal:     col-span-full, displayed as 2+1 or 3 compressed
```

### Mobile — < 768px

```
Breakpoint:      < 768px
Container:       100% - 40px (20px each side)
Columns:         4
Gutter:          16px
Margin:          20px
```

**Common patterns:**
```
Full width:      4 col   →  Single column, most content
Two half:        2 + 2   →  Only for compact cards, tags
```

### Breakpoint Summary

```
xs:    < 480px    →  Small mobile (minimal layout changes)
sm:    480–767px  →  Large mobile
md:    768–1023px →  Tablet
lg:    1024–1279px →  Small desktop / large tablet landscape
xl:    1280px+    →  Full desktop
2xl:   1536px+    →  Large desktop (container stays 1320px, more margin)
```

---

---

## 6. Border Radius

### Philosophy
Radius phải phản ánh tính cách của từng component. Buttons mang tính quyết đoán — radius nhỏ. Images thì tự nhiên — không có radius. Cards thì thân thiện — radius vừa.

```
--radius-none:   0px     →  Product images (full, uncut), hero images, dividers
--radius-sm:     4px     →  Badges, tags, small pills
--radius-md:     8px     →  Buttons, inputs, small cards, dropdowns
--radius-lg:     12px    →  Standard cards, product cards, modal dialogs
--radius-xl:     16px    →  Large feature cards, image cards với overlay
--radius-2xl:    24px    →  Category cards (lớn, editorial), drawer panels
--radius-full:   9999px  →  Pills, avatar circles, toggle switches, loaders
```

### Per-Component Rules

```
Buttons (standard):      8px  (--radius-md)
Buttons (pill/CTA):      9999px  (--radius-full)  — chỉ cho button nổi bật nhất
Cards (product):         12px (--radius-lg)
Cards (category, large): 16px (--radius-xl)
Images trong cards:      0px  (--radius-none) — ảnh không nên bị cắt góc
Images standalone:       0px  (--radius-none) — luôn giữ nguyên bản
Inputs, Select:          8px  (--radius-md)
Modals, Dialogs:         16px (--radius-xl)
Bottom Sheet (mobile):   24px top corners only (--radius-2xl)
Badges, Labels:          4px  (--radius-sm)
Search bar:              8px  (--radius-md) — không dùng full radius
Tooltips:                6px
Avatar:                  9999px (--radius-full)
```

---

---

## 7. Elevation & Shadow System

### Philosophy
Shadow trong hệ thống này không tạo ra depth giả tạo. Nó tạo ra *focus* — chỉ ra element nào đang được tương tác, element nào đang float, element nào quan trọng hơn.

### Shadow Scale

```
--shadow-none:
  none
  Usage: Default state của hầu hết elements

--shadow-sm:
  0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)
  Usage: Cards ở default state, inputs

--shadow-md:
  0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)
  Usage: Dropdown menus, popovers, floating elements

--shadow-lg:
  0 10px 30px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)
  Usage: Modals, dialogs, sticky nav khi scrolled

--shadow-xl:
  0 20px 50px rgba(0,0,0,0.14), 0 8px 16px rgba(0,0,0,0.08)
  Usage: Product image hover lift, featured card highlight

--shadow-product:
  0 24px 64px rgba(0,0,0,0.12)
  Usage: Product photography trên background trắng — soft, realistic
```

### Hover Elevation

Cards không thêm shadow khi hover — chúng *lift* bằng `transform: translateY(-4px)` kết hợp với `--shadow-xl`. Shadow tự nhiên theo vật lý.

```
Default card:    --shadow-sm    + translateY(0)
Hovered card:    --shadow-xl    + translateY(-4px)
Transition:      400ms ease-out
```

### Glass Effect

Dùng cho: sticky navbar khi scrolled, mega menu overlay, image overlay text areas.

```
--glass-light:
  background: rgba(248, 246, 242, 0.85)
  backdrop-filter: blur(20px) saturate(180%)
  border: 1px solid rgba(255,255,255,0.6)

--glass-dark:
  background: rgba(13, 13, 13, 0.85)
  backdrop-filter: blur(20px) saturate(150%)
  border: 1px solid rgba(255,255,255,0.08)
```

### Layer Hierarchy (Z-index)

```
z-0:    Content, cards, images
z-10:   Sticky elements (sidebar filters)
z-20:   Floating action buttons
z-30:   Dropdown menus, mega menu
z-40:   Sticky navigation bar
z-50:   Modals, dialogs
z-60:   Bottom sheets (mobile)
z-70:   Tooltips
z-80:   Toast notifications
z-90:   Full-screen overlays (search)
```

---

---

## 8. Components

### 8.1 Buttons

**Hierarchy: Có 3 cấp độ. Không nhiều hơn.**

```
PRIMARY — Gold Fill
Background:    --color-gold (#B89A5E)
Text:          #FFFFFF
Border:        none
Radius:        8px (--radius-md)
Padding:       14px 28px
Font:          Plus Jakarta Sans SemiBold 15px, letter-spacing 0.02em
Hover:         Background darkens to #9A7D47, translateY(-1px)
Use for:       "Mua ngay", "Thêm vào giỏ hàng", "Đặt hàng"
Max per page:  1–2 visible at a time

SECONDARY — Ghost / Outline
Background:    transparent
Text:          --color-n900 (#111111)
Border:        1.5px solid --color-n900
Radius:        8px
Padding:       13px 27px (1px less to account for border)
Font:          Plus Jakarta Sans SemiBold 15px
Hover:         Background fills with --color-n900, text becomes white
Use for:       "Khám phá", "Xem thêm", secondary actions

GHOST — Minimal
Background:    transparent
Text:          --color-n700 (#3A3A3A)
Border:        none
Underline:     Appears on hover only
Font:          Plus Jakarta Sans Medium 14px
Use for:       Inline text actions, "Xem tất cả →", tertiary navigation
```

**Icon Buttons:**
```
Size:     40px × 40px (touch target minimum)
Radius:   8px
Border:   1px solid --color-n100
Hover:    Background --color-n50
Use for:  Wishlist, Compare, Share
```

**Forbidden:**
- Không dùng nền đỏ cho CTA chính
- Không dùng ALL CAPS trên buttons
- Không dùng nhiều hơn 2 primary buttons trong một section

---

### 8.2 Cards

**Product Card — Standard**
```
Background:    --color-paper (#F8F6F2) hoặc #FFFFFF
Border:        1px solid --color-n100
Radius:        12px (--radius-lg)
Padding:       0 (image full-bleed top) + 20px nội dung dưới
Shadow:        --shadow-sm (default), --shadow-xl + translateY(-4px) (hover)
Transition:    400ms ease-out

Image area:    Aspect ratio 4:3 hoặc 1:1. Không có radius — flush với card corners trên.
               overflow: hidden trên card để clip ảnh.
               Image scale: 1.0 default, 1.04 on hover (400ms)

Content area:
  Eyebrow:     Tên thương hiệu (Canon, Sony, Nikon) — Eyebrow style, muted
  Name:        Title style — Plus Jakarta Sans SemiBold 18px
  Specs line:  IBM Plex Mono 13px, --color-steel — "24MP · E-Mount · 4K"
  Price:       Plus Jakarta Sans Bold 20px, --color-n900
  Sale price:  --color-gold, original price strikethrough in --color-n400
  Installment: Body S, --color-n500 — "Từ 3.200.000đ/tháng"
  CTA:         Secondary button hoặc ghost, xuất hiện on hover (desktop)
               Always visible (mobile)
```

**Product Card — Featured (lớn)**
```
Aspect ratio ảnh:  3:2 (wider)
Name font size:    22px
Padding:           24px
Có thêm:           Short description 2 dòng (Body S)
```

**Category Card**
```
Aspect ratio:      16:9 hoặc 21:9 (cinematic)
Radius:            16px (--radius-xl)
Overlay:           Gradient linear từ transparent (top) → rgba(0,0,0,0.6) (bottom)
Text:              Đặt trên overlay, màu trắng
Title:             Display M — Be Vietnam Pro Bold
Subtitle:          Eyebrow style — số lượng sản phẩm
Hover:             Ảnh scale 1.04, overlay đậm hơn nhẹ
```

---

### 8.3 Navbar

```
Height:            72px (desktop), 64px (mobile)
Background:        --color-paper khi scroll = 0
                   --glass-light khi scrolled (backdrop-blur)
Border-bottom:     none khi top; 1px solid --color-n100 khi scrolled
Transition:        300ms ease

Logo:              Left-aligned. Text hoặc SVG wordmark. Không icon đơn thuần.
Navigation links:  Plus Jakarta Sans Medium 15px, --color-n700
                   Hover: --color-n900
                   Active: --color-n900 + underline dot hoặc underline line
CTA button:        Secondary small ở right: "Giỏ hàng (2)"
                   Plus một icon wishlist / search

Mobile:            Logo center, hamburger left, cart icon right
                   Menu opens as full-screen overlay (không phải sidebar)
```

---

### 8.4 Mega Menu

```
Trigger:     Hover trên navigation category link (desktop)
Style:       Full-width dropdown, flush với navbar bottom
Background:  --color-paper, --shadow-lg
Padding:     48px 80px
Transition:  200ms ease-out (fade + translateY -8px → 0)

Layout:
  Column 1 (30%): Category list với icons
  Column 2 (45%): Subcategories trong 2–3 cột
  Column 3 (25%): Editorial feature — ảnh + "Sản phẩm nổi bật" + link

Typography:
  Section header:  Eyebrow style
  Links:           Body M, Plus Jakarta Sans Medium
  Featured:        Title style + Body S description
```

---

### 8.5 Badges

```
--badge-new:
  "MỚI"
  Background: --color-ink (#0D0D0D)
  Text: white, Eyebrow style 10px
  Radius: 4px, Padding: 3px 8px

--badge-sale:
  "-20%"
  Background: --color-gold (#B89A5E)
  Text: white
  Same size/padding as above

--badge-hot:
  "HOT"
  Background: #8A1A1A (error-dark)
  Text: white

--badge-used:
  "CŨ 95%"  /  "CŨ 90%"
  Background: --color-n100
  Text: --color-n700, Eyebrow style
  Border: 1px solid --color-n200

--badge-stock:
  "CÒN HÀNG" / "HẾT HÀNG" / "SẮP HẾT"
  Variations: success / error / warning semantic colors
  Style: Dot indicator (6px circle) + Label text, no fill background
```

---

### 8.6 Inputs & Search

```
Input standard:
  Height:     48px
  Background: #FFFFFF
  Border:     1.5px solid --color-n200
  Radius:     8px (--radius-md)
  Padding:    0 16px
  Font:       Plus Jakarta Sans Regular 15px
  Placeholder: --color-n400
  Focus:      Border --color-n700, shadow 0 0 0 3px rgba(13,13,13,0.08)
  Error:      Border --color-error

Search bar:
  Height:     48px (desktop), 44px (mobile)
  Background: --color-n50
  Border:     1px solid --color-n100
  Radius:     8px
  Icon:       Search icon left (20px, --color-n400)
  Transition: Border --color-n700 on focus, background white on focus
  Full-screen overlay:
    Triggered on focus mobile, option on desktop
    Background: rgba(248,246,242,0.98) blur
    Results appear below instantly
```

---

### 8.7 Tabs

```
Style:       Underline tabs — không có background fills, không có bordered boxes
Track:       1px line full width, --color-n100
Active tab:  2px underline, --color-ink
Font:        Plus Jakarta Sans SemiBold 15px
Inactive:    --color-n500
Hover:       --color-n700
Transition:  Underline slides: 200ms ease
Padding:     16px 0, 24px gap between tabs
```

---

### 8.8 Accordion

```
Trigger:     Full-width, 56px height
Border:      Bottom 1px --color-n100 only
Font:        Plus Jakarta Sans SemiBold 15px, --color-n900
Icon:        Plus/Minus (16px, --color-n400) — không dùng chevron
Transition:  Height animates 250ms ease-out
Content:     Padding 16px 0 24px, Body M, --color-n700
```

---

### 8.9 Pagination

```
Style:       Minimal dots + prev/next
Numbers:     Plus Jakarta Sans Medium 14px
Active:      Background --color-ink, text white, radius 6px
Inactive:    --color-n500, hover --color-n900
Prev/Next:   Ghost button style với arrow icon
```

---

### 8.10 Carousel

```
Navigation:  Arrow buttons — không nằm trên ảnh. Bên ngoài carousel, dưới ảnh.
             Hoặc: Chỉ swipe, không có arrows (mobile-first approach)
Dots:        Small, --color-n200 inactive, --color-ink active
Peek:        20–40px của slide tiếp theo visible — signals scrollability
Draggable:   Desktop cũng drag được (Embla default)
Autoplay:    Không. Không bao giờ autoplay mà không có user intent.
```

---

### 8.11 Footer

```
Background:     --color-ink (#0D0D0D) hoặc --color-void
Text:           --color-n200 (links), --color-n400 (meta)
Logo:           White version
Structure:      4 columns (desktop): Brand | Products | Support | Connect
                2 columns (mobile): stacked
Divider:        1px --color-n700 trước bottom bar
Bottom bar:     Copyright, policies — Body S, --color-n500
                Không có cookie banners hoặc newsletter popup ở đây
```

---

---

## 9. Motion Language

### Philosophy
Motion trong hệ thống này là **bằng chứng của vật lý** — không phải entertainment. Mỗi element có trọng lượng, mỗi chuyển động phản ánh trọng lượng đó. Một card nhỏ di chuyển nhanh hơn một hero image. Một modal nặng hơn một tooltip.

**The rule:** Nếu xóa animation đi, người dùng không nhận ra sự mất mát lớn — thì animation đó không nên tồn tại.

---

### Easing Curves

```
Standard (ease-out):
  cubic-bezier(0.22, 1, 0.36, 1)
  Dùng cho: elements xuất hiện, cards lift, menus open
  Character: Bắt đầu nhanh, dừng mượt — như đặt vật xuống bàn

Decelerate (ease-in):
  cubic-bezier(0.4, 0, 1, 1)
  Dùng cho: elements biến mất, menus close, toasts dismiss

Smooth (ease-in-out):
  cubic-bezier(0.45, 0, 0.55, 1)
  Dùng cho: page transitions, progress bars, continuous motion

NEVER:
  linear — cứng, robotic
  bounce (spring) — không phù hợp với tone premium
  elastic — tương tự
```

---

### Duration Scale

```
Instant:        0ms       →  State changes không có visible transition
                              (active states, checked states)
Micro:          100ms     →  Button press feedback, toggle
Fast:           150ms     →  Hover color changes, badge appears
Base:           250ms     →  Default — dropdowns, tooltips
Moderate:       350ms     →  Card hover lift, image scale
Standard:       400ms     →  Menus open/close, accordion expand
Deliberate:     500ms     →  Modal appear, page element enter
Slow:           700ms     →  Hero text fade-in, section reveals
Cinematic:      1000ms+   →  Opening frame crossfade ONLY
```

---

### Hover Behavior

```
Product card:
  Image:        scale(1.04), 400ms ease-out
  Card:         translateY(-4px) + shadow-xl, 400ms ease-out
  CTA button:   opacity 0 → 1, translateY(4px → 0), 200ms

Category card:
  Image:        scale(1.04), 400ms ease-out
  Overlay:      Tối hơn 10%, 300ms

Navigation links:
  Color:        150ms ease-out
  Underline:    width 0% → 100%, 200ms ease-out (left to right)

Buttons:
  Primary:      Background darkens, translateY(-1px), 150ms
  Secondary:    Background fill from border-in, 200ms
  Ghost:        Underline appears, 150ms

Images (standalone):
  No hover effect on editorial images — họ không nên bị "transformed"
```

---

### Scroll Reveal

```
Philosophy:     Elements reveal on scroll — không phải fly in từ left/right
                Chỉ có: opacity 0→1 và translateY(24px→0)
                Không có: rotations, scale từ 0, slide từ sides

Standard reveal:
  opacity:      0 → 1
  translateY:   24px → 0
  duration:     500ms ease-out
  trigger:      Khi 15% của element đi vào viewport

Staggered cards:
  Cùng properties
  delay:        0ms, 80ms, 160ms, 240ms (tối đa 4 items stagger)

Section headings:
  translateY:   32px → 0
  opacity:      0 → 1
  duration:     600ms ease-out

Hero text:
  opacity:      0 → 1
  duration:     800ms ease-out
  delay:        300ms sau khi image loaded
```

---

### Page Transitions

```
Between routes:
  Exit:    opacity 1→0, 200ms ease-in
  Enter:   opacity 0→1, 300ms ease-out
  Overlap: 100ms — tổng thời gian cảm nhận ~400ms

No sliding, no scaling pages.
Just: fade out → fade in.
Like a film cut through black.
```

---

### Image Motion

```
Hero/Editorial images:
  On load:      opacity 0→1, scale(1.02→1.0), 800ms ease-out
  On scroll:    Parallax rate: 0.15 (image moves 15% slower than scroll)
                Applied only to full-bleed heroes — không áp dụng rộng rãi

Product images:
  On hover:     scale(1.04), 400ms ease-out
                overflow:hidden trên container để clip

Gallery:
  Swipe:        Đồng bộ với Embla — native feel, no custom animation needed
```

---

### Animation Intensity Scale

```
Level 0 — None:        State-only changes (color, opacity instant)
Level 1 — Subtle:      Hover colors, border changes (100–150ms)
Level 2 — Present:     Card lifts, menu opens (250–400ms) ← DEFAULT
Level 3 — Deliberate:  Modals, page reveals (400–600ms)
Level 4 — Cinematic:   Hero transitions only (700ms–1000ms)
Level 5 — Reserved:    Opening frame black-to-image crossfade (1000ms+)
```

---

---

## 10. Photography Direction

### Core Philosophy
Ảnh trên website này là **editorial photography** — không phải commercial photography. Sự khác biệt:

```
Commercial:    Sản phẩm nổi bật. Nền trắng. Lighting hoàn hảo. Call to action.
Editorial:     Khoảnh khắc thật. Context. Cảm xúc. Câu chuyện.
```

Trang web này dùng **cả hai** — nhưng biết khi nào dùng loại nào.

---

### Lighting Direction

```
Editorial / Lifestyle photography:
  Source:      Single light source, strong directional
  Quality:     Soft, diffused — không phải harsh studio light
  Direction:   Side-lit hoặc back-lit preferred — creates depth
  Time:        Golden hour, blue hour, overcast days — avoiding harsh noon sun
  Contrast:    High — deep shadows, bright highlights
  Feel:        "Ánh sáng tự nhiên bắt được đúng lúc"

Product photography:
  Source:      Controlled studio, usually single overhead + reflector
  Background:  --color-paper (#F8F6F2) hoặc flat dark (#0D0D0D)
  Direction:   Top-left at 45° — tiêu chuẩn luxury product
  Shadow:      Long, soft shadow phía dưới-phải của sản phẩm
  Feel:        "Đồ vật này được làm ra rất kỹ lưỡng"
```

---

### Composition Rules

```
Rule of thirds:       Không phải luôn trung tâm. Subject thường ở 1/3 frame.
Negative space:       Luôn có đủ không gian để ảnh "thở"
Horizon line:         Thường thấp — cho sky space hoặc environment context
Leading lines:        Đường phố, hành lang, ống kính — dẫn mắt vào subject
Frame within frame:   Cửa, cửa sổ, vòm — tạo depth
Depth of field:       Shallow DOF cho lifestyle, deep DOF cho landscape/architecture
```

---

### Cropping Standards

```
Hero full-bleed:      No crop — image fills entire container, object-cover center
Category card:        16:9 — cinematic, wide
Product card:         4:3 — standard, slightly portrait
Product detail:       1:1 (square) cho gallery, hoặc 4:3 — consistency
Feature split:        3:2 — editorial split layout
Portrait/story:       2:3 — vertical mobile moments
```

---

### Color Grading

```
Overall tone:   Slightly desaturated — not Instagram-vibrant.
                Colors should feel "real" not "filtered."

Shadows:        Warm (slight amber/brown tint in deep shadows)
Highlights:     Neutral-to-cool (slight blue in blown-out areas)
Midtones:       Neutral, true-to-life

Avoid:
  - Heavy VSCo-style presets
  - Teal-orange Hollywood grade (overused)
  - Overly desaturated matte finish
  - Over-sharpened edges

Target:         Fujifilm film simulation aesthetic — Provia hoặc Classic Chrome
                Timeless, not trendy
```

---

### Vietnamese Lifestyle Photography

```
Subjects:
  - Nhiếp ảnh gia Việt Nam — không phải người nước ngoài
  - Các ngành nghề: nhiếp ảnh gia đường phố, wedding photographer,
    travel photographer, content creator, nhà báo ảnh
  - Age range: 20–45
  - Authentic moments — không phải posed corporate shots

Environments:
  - Hà Nội: phố cổ buổi sáng, Hồ Tây sương mù, kiến trúc Pháp
  - TP.HCM: phố đêm, café góc đường, chợ sáng
  - Đà Lạt: pine forests, misty mornings
  - Nông thôn: đồng lúa, thuyền trên sông, chợ quê
  - Studio: creative workspaces, photography studios

What to avoid:
  - Stock photos từ US/European models
  - Generic "lifestyle" shots (person on laptop in coffee shop)
  - Overly happy/posed group photos
  - Clothing that doesn't feel Vietnamese
```

---

### Product Photography Standards

```
Hero product shot:
  Background:   --color-paper OR --color-void (dark backgrounds for dark bodies)
  Angle:        3/4 front view — shows depth and form
  Scale:        Product fills 60–70% of frame
  Props:        Minimal — một ống kính bên cạnh, một dây đeo có thể
                Không có hoa, không có bàn gỗ giả tạo

Spec detail shots:
  Focus on:     Mount ring, control dials, grip texture, lens elements
  Style:        Macro, sharp focus, neutral background
  Purpose:      Justify the price through craft

In-use shots:
  Context:      Máy ảnh được cầm trên tay, nằm trên ba chân,
                đặt trên bề mặt tự nhiên (đá, gỗ thật)
  Không:        Nằm trên bàn phím laptop, cạnh tách cà phê generic
```

---

---

## 11. Iconography

### Library
**Lucide React** — đã có trong project. Không dùng thêm library icon khác.

### Style Rules

```
Style:          Outline — không phải filled. Nhất quán toàn bộ.
Stroke width:   1.5px — không phải 2px (quá nặng), không phải 1px (quá mỏng)
Corner style:   Round joins, round caps — thân thiện nhưng không childish
Size grid:      16px, 20px, 24px — luôn là bội số của 4
                16px → trong text, badges, compact UI
                20px → navigation, buttons, standard UI
                24px → standalone icons, large CTAs
Color:          Inherit từ text color — không hardcode màu riêng cho icon
                Exception: --color-gold cho cart/wishlist active state

Consistency rules:
  Luôn dùng same icon cho same action xuyên suốt site
  Giỏ hàng:    ShoppingCart (không dùng ShoppingBag ở một số nơi, Cart ở nơi khác)
  Tìm kiếm:    Search (không dùng Magnifier variant)
  Yêu thích:   Heart (outline → filled khi active)
  Chia sẻ:     Share2
  So sánh:     GitCompareArrows hoặc SlidersHorizontal
  Menu:        Menu (hamburger)
  Đóng:        X
  Back:        ArrowLeft (không dùng ChevronLeft cho navigation)
  Forward:     ArrowRight
  External:    ExternalLink
  Down/Up:     ChevronDown / ChevronUp (cho accordion, dropdowns)
```

---

### Icon + Text Pairing

```
Gap:            6px (--space-1 + 2px) giữa icon và text
Alignment:      Vertical center
Color sync:     Icon luôn cùng màu với text đi kèm, hoặc slightly muted
```

---

---

## 12. UI Rules — Không Được Phép

Đây là danh sách những gì **không bao giờ** được phép xuất hiện trong bất kỳ page nào.

---

### Layout

```
✗  Crowded layouts — không có breathing room giữa các elements
✗  Full-width text blocks — body text tối đa 65 characters per line
✗  Symmetric grids cho editorial sections — luôn phải có asymmetry
✗  More than 4 columns trên mobile
✗  Horizontal scroll ẩn không có visual indicator
✗  Sections không có đủ padding — tối thiểu 96px vertical desktop
✗  Pop-ups xuất hiện ngay khi trang load (exit-intent OK, nhưng trễ)
✗  Sticky elements chồng chéo lên nhau (ví dụ: sticky nav + sticky sidebar + cookie bar)
```

---

### Typography

```
✗  Font size dưới 12px cho bất kỳ visible text nào
✗  Line-height dưới 1.5 cho tiếng Việt
✗  ALL CAPS cho đoạn văn dài hơn 3 từ (chỉ eyebrow labels)
✗  Center-aligned body text dài hơn 2 dòng
✗  Quá nhiều font weights trong một section (tối đa 3)
✗  Decorative fonts không hỗ trợ đầy đủ tiếng Việt
✗  Text trên ảnh không có đủ contrast ratio (tối thiểu WCAG AA)
✗  Heading cấp thấp hơn Heading cấp cao trong visual hierarchy
```

---

### Colors

```
✗  Orange màu sáng như #FF6B00, #F97316 — không phù hợp tone premium
✗  Gradient neon
✗  Quá nhiều màu trong một section — tối đa 3 màu visible
✗  Red CTA buttons — quá aggressive
✗  Yellow highlights cho text thông thường
✗  Màu accent (#B89A5E) xuất hiện quá 3 lần trong một viewport
✗  Dark text trên dark background không đủ contrast
✗  Flash sale red banners trong hero area
```

---

### Components

```
✗  Auto-rotating carousels (autoplay)
✗  Countdown timers trên hero section
✗  Chatbot popup xuất hiện trong 10 giây đầu
✗  Cookie banner che viewport chính
✗  "Mua ngay" như CTA đầu tiên trên homepage
✗  Rating stars với fake reviews (0 reviews hiển thị 5 sao)
✗  Price comparison bảng phức tạp trên mobile
✗  More than 5 items trong một navigation dropdown column
✗  Breadcrumb hiển thị trên hero/landing sections
✗  Skeleton loading cho hơn 3 giây
```

---

### Photography

```
✗  Stock photos từ Shutterstock/Getty không liên quan đến nhiếp ảnh
✗  Ảnh chụp người mô hình generic (không phải nhiếp ảnh gia)
✗  Ảnh chất lượng thấp, pixelated, hoặc stretched
✗  Ảnh màu sắc sặc sỡ không phù hợp tone editorial
✗  Product photos trên nền gradient màu hoặc pattern
✗  Watermark hoặc logo của thương hiệu khác trong ảnh
✗  Ảnh bị crop sai — người bị cut ngang mặt, sản phẩm bị cut
```

---

### Motion

```
✗  Bounce/spring animations
✗  Elements sliding in từ sides (left/right) — chỉ fade + translateY
✗  Animation duration quá 600ms cho bất cứ UI interaction nào
✗  Parallax quá mạnh (rate > 0.3)
✗  Hover effects trên mobile (không reliable)
✗  Animation chạy khi prefers-reduced-motion: reduce được set
✗  Loading spinner xoay mãi không có fallback state
```

---

---

## Appendix: Design Checklist

Trước khi approve bất kỳ component hoặc page nào, kiểm tra:

```
Typography:
  □ Font render đúng với dấu tiếng Việt
  □ Line-height đủ cho diacritical marks
  □ Không có text nào dưới 12px
  □ Heading hierarchy logic

Color:
  □ Contrast ratio ≥ 4.5:1 cho body text
  □ Contrast ratio ≥ 3:1 cho large text và UI
  □ Màu accent không quá 3 instances
  □ Không có màu cấm

Spacing:
  □ Tất cả spacing là bội số của 4
  □ Section padding ≥ 80px mobile, ≥ 96px desktop
  □ Cards có đủ breathing room

Responsive:
  □ Test trên 375px (iPhone SE)
  □ Test trên 768px (iPad)
  □ Test trên 1440px (standard desktop)
  □ No horizontal overflow

Motion:
  □ Không có animation quá 600ms (trừ cinematic)
  □ prefers-reduced-motion được respect
  □ Không có autoplay
```
