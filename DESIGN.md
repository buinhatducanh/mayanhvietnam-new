---
name: Máy Ảnh Việt Nam
description: Dark Professional design system — cinematic camera retail for professional photographers in Vietnam
colors:
  primary-bg: "#0a0a0f"
  primary-bg-alt: "#111118"
  surface: "#16161f"
  elevated: "#1c1c28"
  accent: "#00d4aa"
  accent-deep: "#00b894"
  sale: "#ff6b35"
  sale-deep: "#e85d2a"
  text-primary: "#f0f0f5"
  text-secondary: "#8888a0"
  text-muted: "#55556a"
  border-subtle: "#1e1e2a"
  border-default: "#2a2a38"
  error: "#ff4757"
  success: "#00d4aa"
  warning: "#ffc107"
  info: "#5b9aff"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
    textTransform: "uppercase"
  mono:
    fontFamily: "JetBrains Mono, Fira Code, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 700
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary-bg}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-border: "1px solid {colors.border-subtle}"
  input:
    backgroundColor: "{colors.primary-bg}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 12px"
    border: "1px solid {colors.border-default}"
---

# Design System: Máy Ảnh Việt Nam

## 1. Overview

**Creative North Star: "The Dark Room Studio"**

This is a cinematic digital showroom — every page should feel like stepping into a high-end camera studio where the product is lit perfectly against a dark background. The design is **Confident · Technical · Cinematic**: expert voice, data-forward layouts, and smooth exponential motion. It deliberately rejects the cluttered, red-heavy FPTShop/Shopee aesthetic that dominates Vietnamese electronics retail, and avoids the generic AI-generated cream/sand/gradient-text monoculture.

The system uses restrained color: a rich black canvas (`#0a0a0f`) with a single teal accent (`#00d4aa`) at ≤10% of any given surface, and a warm sale-orange (`#ff6b35`) reserved strictly for commerce urgency. Depth is conveyed through tonal layering and subtle box-shadows rather than heavy borders. Typography is deliberately technical: Inter for UI copy, JetBrains Mono for prices and specs, creating a "lab instrument" feel appropriate for camera equipment.

**Key Characteristics:**
- Rich black canvas, not cream or navy — OLED-friendly, camera-native darkroom aesthetic
- One accent color (teal) used sparingly; its rarity is the point
- JetBrains Mono for prices and specs — creates technical credibility
- Smooth exponential easing only; no bounce, no elastic, no spring
- Vietnamese-first: VND currency, local payment methods, Vietnamese copy
- Semantic HTML, keyboard-navigable, reduced-motion respected

## 2. Colors

The palette is a single-accent restraint: one saturated teal carries all accent duties, one warm orange carries commerce urgency. Every other color is a step in the neutral dark ramp. The effect is a camera studio: everything recedes so the product can shine.

### Primary
- **Studio Black** (#0a0a0f): The dominant surface. Not pure black (#000) — it has a faint blue-purple bias (`L=5%`, `hue=260`) that prevents the dead CRT feeling and matches OLED subpixel rendering. Used as the body background on every page.

### Secondary (Commerce Accent)
- **Flash Orange** (#ff6b35): Reserved exclusively for commerce urgency — flash sale badges, countdown timers, sale prices, "Mua ngay" buttons. Never used for general accent or decoration. Its presence must feel like an event, not a default.
- **Flash Orange Deep** (#e85d2a): Hover state for the orange accent.

### Tertiary (Brand Accent)
- **Showroom Teal** (#00d4aa): The brand accent. Used on CTAs, navigation highlights, price emphasis on cards, focus rings, and selection states. Capped at ~10% of any given viewport.
- **Showroom Teal Deep** (#00b894): Hover state for teal.

### Neutral
- **Deep Surface** (#111118): Alternating section backgrounds, footer background.
- **Card Surface** (#16161f): Product cards, drawers, floating panels.
- **Elevated Surface** (#1c1c28): Modals, dropdown menus, sticky elements.
- **Subtle Border** (#1e1e2a): Dividers, card borders — barely visible, purely structural.
- **Default Border** (#2a2a38): Active borders, input strokes, focused elements.
- **Strong Border** (#3a3a4a): Emphasis borders, selected states.
- **Text Primary** (#f0f0f5): Body text, headings. Near-white with a faint cool bias — not pure white, which is too harsh on OLED.
- **Text Secondary** (#8888a0): Descriptions, secondary info, timestamps.
- **Text Muted** (#55556a): Captions, hints, disabled text. **Not** for body copy — only for truly decorative or auxiliary labels.

### Named Rules

**The Teal Restraint Rule.** Showroom Teal appears on ≤10% of any given screen. Its power comes from scarcity. If teal is everywhere, it's not an accent — it's wallpaper.

**The Surface Ramp Rule.** Every background step is the same hue (260° purple-blue) at increasing lightness. Never mix warm-tinted surfaces with the dark palette — that breaks the studio atmosphere.

**The Muted Text Ban.** Text Muted (#55556a) is never used for body copy. Body text is always Text Secondary (#8888a0) minimum, or Text Primary (#f0f0f5). Muted is for hints, timestamps, and decorative labels only.

## 3. Typography

**Display Font:** Inter (with system fallback stack)
**Body Font:** Inter (with system fallback stack)
**Price/Spec Font:** JetBrains Mono (with Fira Code fallback)

**Character:** Inter is a workhorse sans that reads as "technical tool, not decorative font." It has the right weight distribution for Vietnamese diacritics. JetBrains Mono for prices and specs creates a data-instrument feel — prices look like readouts, not marketing copy.

### Hierarchy
- **Display** (700, clamp(2.5rem, 6vw, 4rem), 1.1): Hero headings. Single-focus, cinematic. Max width ~65ch.
- **Headline** (700, 2rem, 1.2): Section headings. Clear, confident, never decorative.
- **Title** (600, 1.5rem, 1.25): Card headings, product names. Readable at a glance.
- **Body** (400, 1rem, 1.5): Descriptions, paragraphs. Max line length: 65ch.
- **Label** (600, 0.75rem, 0.05em letter-spacing, uppercase): Category nav, badges, eyebrows. Use sparingly — max one per section.
- **Mono** (700, 0.875rem): Prices, specs, order numbers, countdown digits. Tabular-nums always.

### Named Rules

**The Mono Prices Rule.** All prices are rendered in JetBrains Mono at font-weight 700 with tabular-nums. This is non-negotiable — it's the visual signature of a technical camera retailer.

**The No-Gradient-Text Rule.** Text is never colored with a gradient background-clip. Emphasis is via color (teal or orange), weight, or size. Gradient text is an AI-slop tell per PRODUCT.md anti-references.

## 4. Elevation

Depth is conveyed through tonal layering (darker → lighter surface steps) plus three shadow roles. Shadows are ambient, not structural — they suggest floating rather than physical lifting.

### Shadow Vocabulary
- **Card ambient** (`box-shadow: 0 4px 24px rgba(0,0,0,0.4)`): Applied on card hover. Suggests the card lifts off the surface. Never at rest.
- **Glow accent** (`box-shadow: 0 0 20px rgba(0,212,170,0.15), 0 0 60px rgba(0,212,170,0.05)`): Subtle teal glow under focused or active accent elements. Used on primary button hover and focused inputs.
- **Glow sale** (`box-shadow: 0 0 20px rgba(255,107,53,0.15), 0 0 60px rgba(255,107,53,0.05)`): Orange glow under flash sale elements. Event-only.

### Named Rules

**The Flat-By-Default Rule.** All surfaces are flat at rest. Shadows appear only on hover, focus, or active state. This keeps the dark canvas clean and prevents visual noise.

## 5. Components

### Buttons
- **Shape:** Gently rounded (8px radius), min-height 44px (touch target), font-weight 600.
- **Primary (Teal):** Background `#00d4aa`, text `#0a0a0f`. The brand CTA. Used for "Thêm vào giỏ", navigation highlights.
- **Sale (Orange):** Background `#ff6b35`, text `#ffffff`. Reserved for "Mua ngay" and flash sale CTAs. Never used for general navigation.
- **Secondary:** Transparent background, `#2a2a38` border, white text. For secondary actions like "Xem chi tiết".
- **Ghost:** Transparent, no border, `#8888a0` text. For tertiary actions: "Xem thêm", "Tiếp tục mua sắm".
- **Focus:** 2px teal ring at 2px offset from button edge, using `ring-offset-color: #0a0a0f`.
- **Active:** Scale 0.98. No bounce — instant deceleration.

### Product Cards
- **Corner Style:** Gently rounded (12px radius).
- **Background:** `#16161f` (Card Surface).
- **Border:** 1px solid `#1e1e2a` at rest; transitions to `#00d4aa` at 40% opacity on hover.
- **Shadow:** None at rest → Card ambient on hover.
- **Image:** 1:1 aspect ratio, `#0d0d14` fill background, scale 1.05 on hover (transform only, no layout shift).
- **Hover Lift:** `translateY(-4px)` on card container.
- **Internal Padding:** 16px.

### Price Display
- **Font:** JetBrains Mono, font-weight 700, tabular-nums.
- **Current Price:** `#ffffff` (full white, highest contrast).
- **Sale Price:** `#ff6b35` (orange — the urgency signal).
- **Original (strikethrough):** `#55556a` with line-through. Font-size reduced 1 step.
- **Discount Badge:** `#ff4444` background, white text, uppercase, 10px font-size, `border-radius: 9999px`.

### Navigation
- **Header:** Fixed top, 32px top bar (links) + 64px main bar (logo, search, cart) + 44px category bar.
- **Glass effect:** On scroll — `backdrop-filter: blur(24px) saturate(180%)`, background `rgba(22,22,31,0.85)`.
- **Category links:** 12px, font-weight 500, `#8888a0` → `#00d4aa` on hover, with emoji icon.
- **Mobile:** Hamburger toggle → slide-in drawer from left, not overlay modal.

### Inputs / Fields
- **Style:** `#0a0a0f` background, `#2a2a38` border, `#f0f0f5` text, 12px radius.
- **Focus:** Border shifts to teal at 50% opacity, 1px teal ring added.
- **Placeholder:** `#55556a` — same as Text Muted, never used for body.
- **Touch Target:** Min 48px height on mobile.

### Search Bar
- **Shape:** Full-width, 40px height, 12px radius, left-aligned search icon.
- **Background:** `#16161f` (Card Surface).
- **Focus:** Border transitions to teal, expand animation (0.2s ease-out).
- **Mobile:** Collapsed to icon-only button, expands on tap.

## 6. Do's and Don'ts

### Do:
- **Do** use JetBrains Mono for all prices, specs, order numbers, and countdown digits — it's the visual signature.
- **Do** use the flat-by-default approach: surfaces at rest have no shadow; shadows appear only on hover/focus.
- **Do** keep teal accent at ≤10% of any viewport. Its power is in its scarcity.
- **Do** use exponential easing (ease-out-quart/quint/expo) for all motion. Never bounce or elastic.
- **Do** respect `prefers-reduced-motion` — every animation must have a reduced-motion alternative.
- **Do** keep body text at a minimum of Text Secondary (#8888a0) contrast against dark backgrounds.
- **Do** render Vietnamese currency as `XX.XXX.XXX₫` with dot separators and the ₫ symbol at end.
- **Do** use semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`.
- **Do** make every interactive element keyboard-focusable with a visible teal focus ring.
- **Do** keep touch targets ≥ 48×48px on mobile.

### Don't:
- **Don't** use FPTShop / Shopee patterns: red-heavy palette, banner overload, cluttered grids, flash-sale-everywhere approach. Per PRODUCT.md: *"FPTShop.com.vn: red-heavy, cluttered layout, flash-sale spam, banner overload — budget electronics retail, not premium photography."*
- **Don't** use gradient text (`background-clip: text`). Per PRODUCT.md and impeccable detector: it's an AI-slop tell. Use solid colors for emphasis.
- **Don't** use bounce or elastic easing. Real objects decelerate smoothly. Use exponential curves only.
- **Don't** apply glassmorphism (blur + glass cards) decoratively. It is reserved exclusively for the sticky header on scroll. Everywhere else it is noise.
- **Don't** use numbered section markers (01/02/03) as scaffolding. Numbers earn their place only in actual ordered sequences (checkout steps, process flows).
- **Don't** put tiny uppercase tracked eyebrow labels above every section. One category nav eyebrow is a system; an eyebrow on every heading is AI grammar.
- **Don't** use Text Muted (#55556a) for body copy. It fails the 4.5:1 contrast requirement for body text.
- **Don't** nest cards inside cards. Cards sit on surfaces, not on other cards.
- **Don't** animate layout properties (width, height, margin, padding) unless truly necessary. Use transform and opacity only.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe. It's an immediate tell of template-generated UI.
