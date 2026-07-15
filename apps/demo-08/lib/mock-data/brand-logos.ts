/**
 * Brand Logos — central registry of official brand logo image URLs.
 *
 * Mỗi brand được map tới một logo URL thực tế (Wikimedia Commons / official CDN / press kit).
 * Dùng `https://commons.wikimedia.org/wiki/Special:FilePath/...` — server tự redirect 301
 * sang `upload.wikimedia.org` cho file hiện hành. Nếu URL hỏng thì `<BrandLogo>` component
 * fallback về styled-text logo (textLogo) để không bao giờ vỡ layout.
 *
 * Nếu một brand không có trong bảng này → trả về undefined, caller tự xử lý.
 */

export type BrandName =
  // ── Camera brands
  | 'Canon'
  | 'Sony'
  | 'Nikon'
  | 'Fujifilm'
  | 'Leica'
  | 'Panasonic'
  | 'OM System'
  | 'Olympus'
  | 'Lumix'
  | 'Hasselblad'
  // ── Lens brands
  | 'Sigma'
  | 'Tamron'
  | 'Viltrox'
  | 'Zeiss'
  | 'Kase'
  // ── Drone / Action brands
  | 'DJI'
  | 'GoPro'
  | 'Insta360'
  // ── Lighting brands
  | 'Godox'
  | 'Aputure'
  | 'Nanlite'
  | 'Blackmagic'
  // ── Bag / accessory brands
  | 'Peak Design'
  | 'Lowepro'
  | 'Opteka';

export interface BrandLogoEntry {
  /** Display name — chính xác theo tên brand */
  name: BrandName;
  /** URL slug */
  slug: string;
  /** Brand primary color (hex) — dùng cho tagline / chips */
  color: string;
  /** Primary logo URL — Wikimedia / Brandfetch / official press kit */
  logoUrl: string;
  /** White / mono version (dùng trên dark bg). Nếu thiếu → dùng CSS filter */
  logoUrlLight?: string;
  /** 1-line marketing tagline */
  tagline: string;
  /** 2-3 line description tiếng Việt */
  description: string;
  /** Font family stack chuẩn của logo (text fallback) */
  fontFamily?: string;
  /** Font weight (text fallback) */
  fontWeight?: number;
  /** Letter spacing (text fallback) */
  letterSpacing?: string;
  /** Text hiển thị — fallback khi image lỗi hoặc trên nền đặc biệt */
  textLogo: string;
}

const WIKI = 'https://commons.wikimedia.org/wiki/Special:FilePath';

/**
 * Bảng chính — tên brand → entry.
 *
 * Logo URL ưu tiên:
 * 1. Wikimedia Commons (đã verify một số URL bằng HEAD 301 redirect)
 * 2. Wikipedia article image (fallback nếu file chưa có trên Commons)
 * 3. Nếu brand chưa có logo chính thức trên Wikimedia → dùng Wikipedia article image
 */
export const BRAND_LOGOS: Record<string, BrandLogoEntry> = {
  /* ── Camera brands ─────────────────────────────────────── */
  Canon: {
    name: 'Canon',
    slug: 'canon',
    color: '#CC0000',
    logoUrl: `${WIKI}/Canon_wordmark.svg`,
    tagline: 'Delighting You Always',
    description:
      'Máy ảnh mirrorless, DSLR và ống kính RF chính hãng từ Canon — từ R50 entry đến R5 Mark II flagship.',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    textLogo: 'Canon',
  },
  Sony: {
    name: 'Sony',
    slug: 'sony',
    color: '#000000',
    logoUrl: `${WIKI}/Sony_logo.svg`,
    tagline: 'BE MOVED',
    description:
      'Alpha mirrorless full-frame — A7R V, A7 IV, ZV-E10 II cho cả ảnh tĩnh và quay phim chuyên nghiệp.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textLogo: 'SONY',
  },
  Nikon: {
    name: 'Nikon',
    slug: 'nikon',
    color: '#FFCC00',
    logoUrl: `${WIKI}/Nikon_Logo.svg`,
    tagline: 'I AM Nikon',
    description:
      'Z-mount mirrorless thế hệ mới — Z6 III, Z50 II với EXPEED 7 và công nghệ Partially Stacked CMOS.',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    textLogo: 'Nikon',
  },
  Fujifilm: {
    name: 'Fujifilm',
    slug: 'fujifilm',
    color: '#009639',
    logoUrl: `${WIKI}/Fujifilm_logo.svg`,
    tagline: 'Value from Innovation',
    description:
      'X-series mirrorless APS-C với 19 Film Simulation đặc trưng — X-T5, X-H2S cho phong cách retro.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textLogo: 'FUJIFILM',
  },
  Leica: {
    name: 'Leica',
    slug: 'leica',
    color: '#E20612',
    logoUrl: `${WIKI}/Leica_Logo.svg`,
    tagline: 'Das Wesentliche',
    description:
      'Leica — biểu tượng nhiếp ảnh cao cấp của Đức. M-series rangefinder, Q-series compact full-frame.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textLogo: 'Leica',
  },
  Panasonic: {
    name: 'Panasonic',
    slug: 'panasonic',
    color: '#0F58A0',
    logoUrl: `${WIKI}/Panasonic_logo.svg`,
    tagline: 'A Better Life, A Better World',
    description:
      'Lumix S full-frame và GH series M4/3 — hybrid chuyên nghiệp với video recording đỉnh cao.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    textLogo: 'Panasonic',
  },
  'OM System': {
    name: 'OM System',
    slug: 'om-system',
    color: '#1B1B1B',
    logoUrl: `${WIKI}/OM_System_logo.svg`,
    tagline: 'Capture Your Story',
    description:
      'OM System (tiền thân Olympus) — M4/3 mirrorless nhỏ gọn, OM-1 Mark II flagship.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    textLogo: 'OM SYSTEM',
  },
  Olympus: {
    name: 'Olympus',
    slug: 'olympus',
    color: '#1B1B1B',
    logoUrl: `${WIKI}/Olympus_Corporation_logo.svg`,
    tagline: 'Your Vision, Our Future',
    description:
      'Olympus — micro 4/3 hệ thống và ống kính M.Zuiko chuyên nghiệp.',
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    textLogo: 'OLYMPUS',
  },
  Lumix: {
    name: 'Lumix',
    slug: 'lumix',
    color: '#0F58A0',
    logoUrl: `${WIKI}/Lumix_logo.svg`,
    tagline: 'Lumix — Capture the Moment',
    description:
      'Lumix — dòng camera của Panasonic quy tụ nhiều công nghệ quay phim chuyên nghiệp trong thân máy nhỏ gọn.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    textLogo: 'LUMIX',
  },
  Hasselblad: {
    name: 'Hasselblad',
    slug: 'hasselblad',
    color: '#000000',
    logoUrl: `${WIKI}/Hasselblad_logo.svg`,
    tagline: 'Creators Meet',
    description:
      'Hasselblad — medium format huyền thoại Thụy Điển. X2D, X1D mirrorless 100MP.',
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
    letterSpacing: '0em',
    textLogo: 'HASSELBLAD',
  },

  /* ── Lens brands ───────────────────────────────────────── */
  Sigma: {
    name: 'Sigma',
    slug: 'sigma',
    color: '#000000',
    logoUrl: `${WIKI}/Sigma-logo.svg`,
    tagline: 'Sigma — Art, Contemporary, Sports',
    description:
      'Ống kính Sigma cho Sony E, Canon RF, Nikon Z, L-mount — chất lượng quang học đỉnh cao, giá tốt.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textLogo: 'SIGMA',
  },
  Tamron: {
    name: 'Tamron',
    slug: 'tamron',
    color: '#0047AB',
    logoUrl: `${WIKI}/Tamron_logo.svg`,
    tagline: 'Discover the World',
    description:
      'Ống kính Tamron — dòng 17-70mm f/2.8, 28-75mm f/2.8 nổi tiếng cho Sony và Nikon mount.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textLogo: 'TAMRON',
  },
  Viltrox: {
    name: 'Viltrox',
    slug: 'viltrox',
    color: '#E30613',
    logoUrl: `${WIKI}/Viltrox_logo.svg`,
    tagline: 'Viltrox — Creative Vision',
    description:
      'Viltrox — ống kính AF giá tốt cho Sony E, Fuji X, Nikon Z, Canon RF-M.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 800,
    letterSpacing: '0.02em',
    textLogo: 'VILTROX',
  },
  Zeiss: {
    name: 'Zeiss',
    slug: 'zeiss',
    color: '#0F2F70',
    logoUrl: `${WIKI}/Zeiss_logo.svg`,
    tagline: 'We Make It Visible',
    description:
      'Zeiss — ống kính cinema Supreme Prime, Loxia, Batis cho mirrorless full-frame.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 800,
    letterSpacing: '0.02em',
    textLogo: 'ZEISS',
  },
  Kase: {
    name: 'Kase',
    slug: 'kase',
    color: '#000000',
    logoUrl: `${WIKI}/Kase_logo.svg`,
    tagline: 'Professional Filters & Lenses',
    description:
      'Kase — filter chuyên nghiệp, ống kính AF cao cấp cho nhiếp ảnh gia.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 900,
    letterSpacing: '0.06em',
    textLogo: 'KASE',
  },

  /* ── Drone / Action brands ──────────────────────────────── */
  DJI: {
    name: 'DJI',
    slug: 'dji',
    color: '#0066FF',
    logoUrl: `${WIKI}/DJI_Logo.svg`,
    tagline: 'Future of Possible',
    description:
      'DJI — drone, action camera và gimbal: Mavic 4 Pro, Mini 5 Pro, Osmo Pocket 4 cho filmmaker.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 900,
    letterSpacing: '0.08em',
    textLogo: 'DJI',
  },
  GoPro: {
    name: 'GoPro',
    slug: 'gopro',
    color: '#5B9BD5',
    logoUrl: `${WIKI}/GoPro_logo.svg`,
    tagline: 'Be a Hero',
    description:
      'GoPro Hero 13 Black — action camera flagship 5.3K 60fps, HyperSmooth 6.0, chống nước 10m.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    textLogo: 'GoPro',
  },
  Insta360: {
    name: 'Insta360',
    slug: 'insta360',
    color: '#FF6A00',
    logoUrl: `${WIKI}/Insta360_logo.svg`,
    tagline: 'Think bold.',
    description:
      'Insta360 — camera 360° và action GO series, X-series panoramic chuyên nghiệp.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    textLogo: 'Insta360',
  },

  /* ── Lighting brands ────────────────────────────────────── */
  Godox: {
    name: 'Godox',
    slug: 'godox',
    color: '#FF6600',
    logoUrl: `${WIKI}/Godox_logo.svg`,
    tagline: 'Lighting Your Vision',
    description:
      'Godox — flash studio và LED AD series phổ biến nhất Việt Nam, hệ thống X 2.4GHz.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textLogo: 'Godox',
  },
  Aputure: {
    name: 'Aputure',
    slug: 'aputure',
    color: '#9900FF',
    logoUrl: `${WIKI}/Aputure_logo.svg`,
    tagline: 'Lights. Camera. Action.',
    description:
      'Aputure — đèn LED cinema LS series, Amaran cho film production.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.02em',
    textLogo: 'Aputure',
  },
  Nanlite: {
    name: 'Nanlite',
    slug: 'nanlite',
    color: '#00CC99',
    logoUrl: `${WIKI}/Nanlite_logo.svg`,
    tagline: 'Brighter, Smarter',
    description:
      'Nanlite — RGBWW LED nhỏ gọn Forza, PavoTube II cho studio và location shooting.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0em',
    textLogo: 'Nanlite',
  },
  Blackmagic: {
    name: 'Blackmagic',
    slug: 'blackmagic',
    color: '#FFAA00',
    logoUrl: `${WIKI}/Blackmagic_Design_logo.svg`,
    tagline: 'Cinematic Freedom',
    description:
      'Blackmagic — cinema camera Pocket 6K G2, Blackmagic RAW, dynamic range 13 stops.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    textLogo: 'Blackmagic Design',
  },

  /* ── Bag / accessory brands ─────────────────────────────── */
  'Peak Design': {
    name: 'Peak Design',
    slug: 'peak-design',
    color: '#2D3748',
    logoUrl: `${WIKI}/Peak_Design_logo.svg`,
    tagline: 'Made for Adventure',
    description:
      'Peak Design — túi máy ảnh, strap Anchor Link, Everyday Backpack huyền thoại.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0em',
    textLogo: 'Peak Design',
  },
  Lowepro: {
    name: 'Lowepro',
    slug: 'lowepro',
    color: '#005F2B',
    logoUrl: `${WIKI}/Lowepro_logo.svg`,
    tagline: 'The Pro\'s Choice',
    description:
      'Lowepro — balo và túi chuyên dụng cho photographer, dòng ProTactic, Slingshot.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0em',
    textLogo: 'Lowepro',
  },
  Opteka: {
    name: 'Opteka',
    slug: 'opteka',
    color: '#1A1A1A',
    logoUrl: `${WIKI}/Opteka_logo.svg`,
    tagline: 'Opteka',
    description:
      'Opteka — phụ kiện máy ảnh giá tốt, ống kính và filter.',
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontWeight: 700,
    letterSpacing: '0em',
    textLogo: 'Opteka',
  },
};

/**
 * Helper: lookup brand entry theo tên (case-insensitive).
 * Trả về undefined nếu không có — caller tự xử lý.
 */
export function getBrandLogo(name: string | undefined | null): BrandLogoEntry | undefined {
  if (!name) return undefined;
  // exact match
  if (BRAND_LOGOS[name]) return BRAND_LOGOS[name];
  // case-insensitive
  const lower = name.toLowerCase();
  for (const key of Object.keys(BRAND_LOGOS)) {
    if (key.toLowerCase() === lower) return BRAND_LOGOS[key];
  }
  return undefined;
}

/**
 * Helper: list tất cả brand name (cho UI "chọn hãng").
 */
export function getAllBrandNames(): string[] {
  return Object.keys(BRAND_LOGOS);
}

/**
 * Helper: chỉ trả về URL logo (compact cho inline render).
 */
export function getBrandLogoUrl(name: string | undefined | null): string | undefined {
  return getBrandLogo(name)?.logoUrl;
}
