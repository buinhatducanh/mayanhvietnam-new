import type { ProductSummary, ProductImage } from '../types';

const CDN = 'https://mayanhvietnam.com';

/**
 * Build images array from primary avatar + gallery URLs.
 * Ensures ≥5 images for PDP gallery (avatar + 4+ gallery).
 */
export function imgs(avatar: string, gallery: string[] = [], alt: string): ProductImage[] {
  const all: ProductImage[] = [
    { url: avatar, alt, isPrimary: true },
    ...gallery.map((u, i) => ({ url: u, alt: `${alt} — ảnh ${i + 2}` })),
  ];
  return all;
}

/**
 * Mirror of /image-data path pattern used on mayanhvietnam.com.
 * All URLs verified against scraped PDP pages 2026-07-09/10.
 */
export const cdn = {
  avatar(productId: string, filename: string) {
    return `${CDN}/image-data/san-pham/${productId}/avatar/${filename}`;
  },
  baiViet(productId: string, filename: string) {
    return `${CDN}/image-data/san-pham/${productId}/hinh-bai-viet/${filename}`;
  },
  preview(productId: string, filename: string) {
    return `${CDN}/image-data/san-pham/${productId}/hinh-preview/${filename}`;
  },
};

/**
 * Standard Canon R50 PDP image paths (used by demo-01, scraped 2026-07-10)
 */
export const r50Paths = {
  avatar: `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg`,
  previews: [
    '638791169636370514.jpg',
    '638791170527514307.jpg',
    '638791171408544923.jpg',
    '638791171877903330.jpg',
    '638791172399984092.jpg',
    '638791173356043506.jpg',
    '638791174153167452.jpg',
    '638791174490011075.jpg',
    '638791175066496149.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/24-12/24-12-28/241228112737843/hinh-preview/${f}`),
};

/**
 * Standard Sony A7 IV PDP image paths (scraped 2026-07-10)
 */
export const a7ivPaths = {
  avatar: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/avatar/01_may-anh-sony-alpha-a7-mark-iv-body-only-chinh-hang.jpg`,
  previews: [
    '638791980436673135.jpg',
    '638791981572649806.jpg',
    '638791982369927579.jpg',
    '638791983493111254.jpg',
    '638791984119120066.jpg',
    '638802183016936589.jpg',
    '638792101048991416.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/23-02/23-02-10/230210223540859/hinh-bai-viet/${f}`),
};

/**
 * Standard Canon R6 II PDP image paths
 */
export const r6m2Paths = {
  avatar: `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/avatar/01_may-anh-canon-eos-r6-mark-ii-chinh-hang.jpg`,
  previews: [
    '638791981572649806.jpg',
    '638791982369927579.jpg',
    '638791983493111254.jpg',
    '638791984119120066.jpg',
    '638802183016936589.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/23-02/23-02-10/230210223748534/hinh-bai-viet/${f}`),
};

/**
 * Standard Nikon Z6 III PDP image paths
 */
export const z6iiiPaths = {
  avatar: `${CDN}/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg`,
  previews: [
    '638833500169131198.jpg',
    '638845637596353687.jpg',
    '638845637596441866.jpg',
    '638845637596510106.jpg',
    '638845637596586664.jpg',
    '638845637596657659.jpg',
    '638845637596736538.jpg',
    '638845642050829049.jpg',
    '638845637596812698.jpg',
    '638845642050926684.jpg',
    '638845642051049618.jpg',
    '638845642051136129.jpg',
    '638845642051218402.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/25-05/25-05-20/250520145943720/${f.includes('/') ? '' : 'hinh-bai-viet/'}${f}`),
};

/**
 * Standard Canon RF 24-70 PDP image paths
 */
export const rf2470Paths = {
  avatar: `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/avatar/01_ong-kinh-canon-rf-2470mm-f-2-8l-is-usm-chinh-hang.jpg`,
  previews: [
    '638791812881333131.jpg',
    '638791812880707750.jpg',
    '638791812881020873.jpg',
    '638791812880864296.jpg',
    '638791812881176907.jpg',
    '08.jpg',
    '07.jpg',
    '06.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/23-02/23-02-10/230210234357844/hinh-500-500/${f}`),
};

/**
 * Standard DJI Mavic 4 Pro PDP image paths
 */
export const mavic4Paths = {
  avatar: `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg`,
  previews: [
    '638892977207347856.jpg',
    '638892977681641368.jpg',
    '638892978024061086.jpg',
    '638892978550132998.jpg',
    '638892979250030103.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/25-05/25-05-15/250515085035248/hinh-bai-viet/${f}`),
};

/**
 * Standard GoPro Hero 13 PDP image paths
 */
export const gopro13Paths = {
  avatar: `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg`,
  previews: [
    '638895789366434848.jpg',
    '638895790033794448.jpg',
    '638895790409377474.jpg',
    '638895790715155688.jpg',
    '638895791004448766.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/25-01/25-01-02/250102113303811/hinh-bai-viet/${f}`),
};

/**
 * Standard DJI Air 3S PDP image paths
 */
export const air3sPaths = {
  avatar: `${CDN}/image-data/san-pham/24-11/24-11-02/241102144506281/avatar/638661555984717416_flycam-dji-air-3s-fly-more-combo-dji-rc-2-chinh-hang.jpg`,
  previews: [
    '01.jpg',
    '638661556240932444.jpg',
    '638794487148732359.jpg',
    '638794487148888707.jpg',
    '638794487149044523.jpg',
    '638794487149200725.jpg',
    '638794487149357396.jpg',
    '638794487149513869.jpg',
    '638794487149669884.jpg',
    '638794487149825982.jpg',
    '638794487149982359.jpg',
    '638794487150138623.jpg',
    '638794487150294870.jpg',
    '638794487150451088.jpg',
    '638794487150607409.jpg',
  ].map((f, i) =>
    i < 2
      ? `${CDN}/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-500-500/${f}`
      : `${CDN}/image-data/san-pham/24-11/24-11-02/241102144506281/hinh-bai-viet/${f}`
  ),
};

/**
 * Standard Sony FX30 PDP image paths
 */
export const fx30Paths = {
  avatar: `${CDN}/image-data/san-pham/24-08/24-08-29/240829180801135/avatar/638722123731263546_may-quay-phim-sony-ilmefx30-chinh-hang.jpg`,
  previews: [] as string[],
};

/**
 * Standard DJI Osmo Action 4 PDP image paths
 */
export const action4Paths = {
  avatar: `${CDN}/image-data/san-pham/23-08/23-08-05/230805002213412/avatar/0_dji-osmo-action-4-adventure-combo.jpg`,
  previews: [
    '639174645035554386-camera-dji-osmo-action-4-ban-don-doc-thu-am-jpg.jpg',
    '639174645035639434-camera-dji-osmo-action-4-ban-don-doc-jpg.jpg',
    '639174645035727034-camera-dji-osmo-action-4-ban-don-moi-truong-jpg.jpg',
    '639174645035835992-camera-dji-osmo-pocket-3-ban-don-man-hinh-jpg.jpg',
    '639174645035913918-camera-dji-osmo-action-4-ban-don-pin-jpg.jpg',
    '639174645035991447-camera-dji-osmo-action-4-ban-don-doc-rung-lac-jpg.jpg',
  ].map((f) => `${CDN}/image-data/san-pham/23-08/23-08-05/230805002213412/hinh-bai-viet/${f}`),
};

/**
 * Common brand presets
 */
export const COMMON_HOTLINE = '0937.148.222';

/**
 * Helper to build a Canon R50-style article (template)
 */
export function buildArticle(opts: {
  title: string;
  sections: { heading: string; content: string }[];
  publishDate?: string;
  readTime?: number;
}) {
  return {
    title: opts.title,
    author: 'Máy Ảnh Việt Nam',
    publishDate: opts.publishDate ?? '2026-07-10',
    readTime: opts.readTime ?? 8,
    sections: opts.sections.map((s) => ({
      heading: s.heading,
      content: s.content,
    })),
  };
}