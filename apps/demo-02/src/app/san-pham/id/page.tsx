'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star, Heart, ShoppingCart, Phone, CreditCard, Share2,
  ChevronLeft, ChevronRight, Minus, Plus, Check, Shield,
  Truck, RotateCcw, Headphones, Package, ZoomIn,
  MessageSquare, Search, ChevronDown, ChevronUp, X,
  Camera, Maximize2, Download, GitCompare, BadgeCheck,
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useCart } from "@/app/context/CartContext";

const FMT = (n: number) => n.toLocaleString("vi-VN") + " ₫";

/* ───────── helpers ───────────────────────────────────── */
function RatingStars({ n, size = 13 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size}
          className={i <= n ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
      ))}
    </span>
  );
}

/* ───────── mock data ─────────────────────────────────── */
const SPEC_STRIP = [
  { label: "Cảm biến",    key: "Cảm biến" },
  { label: "Độ phân giải", key: "Độ phân giải" },
  { label: "Video",       key: "Video" },
  { label: "Lấy nét",     key: "Lấy nét" },
  { label: "Kết nối",     key: "Kết nối" },
  { label: "Khối lượng",  key: "Khối lượng" },
];

const COLORS = [
  { name: "Đen",  hex: "#1a1a1a" },
  { name: "Bạc",  hex: "#c0c0c0" },
  { name: "Xám",  hex: "#6b7280" },
];

const KITS = ["Body Only", "Kit 24-105mm f/4", "Kit 24-70mm f/2.8L"];

const TABS = [
  { id: "overview",   label: "Tổng quan" },
  { id: "desc",       label: "Mô tả" },
  { id: "specs",      label: "Thông số" },
  { id: "inbox",      label: "Trong hộp" },
  { id: "samples",    label: "Ảnh mẫu" },
  { id: "reviews",    label: "Đánh giá" },
  { id: "qa",         label: "Hỏi đáp" },
];

/* Sample ảnh chụp thực tế từ các sản phẩm mayanhvietnam.com */
const GALLERY_SAMPLES = [
  { url: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101451137/avatar/638692749614202751_ong-kinh-canon-rf-70-200mm-f2-8-l-is-usm.jpg", tag: "Chân dung" },
  { url: "https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-15/250515085035248/avatar/638828964891489787_dji-mavic-4-pro-512gb-creator-combo.jpg", tag: "Phong cảnh trên cao" },
  { url: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802101137/avatar/638692749614202751_ong-kinh-canon-rf-70-200mm-f2-8-l-is-usm.jpg", tag: "Phong cảnh" },
  { url: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-03/240803094242227/avatar/638692469929544019_ong-kinh-sony-fe-70-200mm-f2-8-gm-ii-oss.jpg", tag: "Thời trang" },
  { url: "https://mayanhvietnam.com/image-data/san-pham/26-02/26-02-26/260226105739670/avatar/639077003951312982_dji-osmo-action-5-pro-adventure-combo.jpg", tag: "Action / Thể thao" },
  { url: "https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-30/260330085702564/avatar/639120324002834549-dji-pocket-4-4-2000x2000-jpg_may-quay-dji-osmo-pocket-4-creator-combo.jpg", tag: "Vlog / Cinema" },
];

/* Phụ kiện gợi ý — ảnh thật từ mayanhvietnam.com */
const ACCESSORIES = [
  { id: 1, name: "DJI RS3 Pro Gimbal",       price: 11_490_000, rating: 4.9, img: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-07/240807150216916/avatar/638692682554257580_gimbal-dji-rs3-pro.jpg" },
  { id: 2, name: "Godox V1 for Nikon",        price: 5_490_000,  rating: 4.8, img: "https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-09/240809154551397/avatar/638708171396818780_den-flash-godox-v1-for-nikon.jpg" },
  { id: 3, name: "Billingham 335 MKII Black", price: 11_490_000, rating: 5.0, img: "https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714115219429/avatar/638881651497354295_tui-may-anh-billingham-335-mkii-black-fibrenyte-black.jpg" },
  { id: 4, name: "Godox LA200D LED 230W",     price: 9_990_000,  rating: 4.7, img: "https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-14/230214175317364/avatar/01_den-godox-la200d-daylight-led-light-230w.jpeg" },
  { id: 5, name: "GoPro Hero 13 Black",       price: 11_990_000, rating: 4.9, img: "https://mayanhvietnam.com/image-data/san-pham/25-01/25-01-02/250102113303811/avatar/638714152413009638_gopro-hero-13-black.jpg" },
];

const QA_DATA = [
  { q: "Máy có quay được video 4K không?", a: "Có, Canon EOS R50 quay video 4K ở 30fps, Full HD 60fps với chống rung điện tử IS." },
  { q: "Pin sử dụng bao lâu?", a: "Pin LP-E17 cho khoảng 350 khung theo CIPA. Nên mua thêm 1 pin dự phòng cho các chuyến đi dài." },
  { q: "Máy có chống nước không?", a: "EOS R50 không có chống thấm/bụi. Không nên dùng dưới mưa. Nếu cần chống nước hãy xem dòng R7 trở lên." },
  { q: "Kết nối được máy tính qua USB không?", a: "Có, qua USB-C. Hỗ trợ sạc pin qua USB-C và kết nối Wi-Fi/Bluetooth qua app Canon Camera Connect." },
];

const REVIEWS_DATA = [
  { name: "Nguyễn Minh Tuấn", stars: 5, date: "12/06/2026", verified: true, text: "Sản phẩm chất lượng tuyệt vời, màu sắc chụp ra cực đẹp. Shop đóng gói cẩn thận, giao đúng hẹn. Sẽ quay lại.", imgs: ["https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=120&h=120&fit=crop"], avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop" },
  { name: "Trần Thu Hà", stars: 5, date: "05/06/2026", verified: true, text: "Mua lần 2 rồi. Giá tốt nhất thị trường, hàng chính hãng đầy đủ giấy tờ. Chụp xoá phông đẹp lắm. Strongly recommend!", imgs: [], avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop" },
  { name: "Phạm Đức Anh", stars: 4, date: "28/05/2026", verified: false, text: "Máy ngon, nhẹ cầm. Lấy nét eye-tracking nhanh hơn mình nghĩ. Chỉ hơi tiếc buffer bị đầy khi chụp liên tục nhiều.", imgs: ["https://images.unsplash.com/photo-1601934025804-c631e2777f26?w=120&h=120&fit=crop"], avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop" },
];

const RECENTLY = PRODUCTS.slice(0, 5);

const SPECS_GROUPS: { group: string; keys: string[] }[] = [
  { group: "Cảm biến & Hình ảnh", keys: ["Cảm biến", "Cảm biến chính", "Độ phân giải", "ISO", "IBIS", "Tốc độ chụp", "Film Simulation"] },
  { group: "Video & Quay phim",   keys: ["Video", "HSS", "Recycle", "Flash", "Modifier"] },
  { group: "Lấy nét",             keys: ["Lấy nét", "AF"] },
  { group: "Màn hình & Finder",   keys: ["Màn hình", "Viewfinder"] },
  { group: "Kết nối & Lưu trữ",  keys: ["Kết nối", "Pin", "Thẻ nhớ"] },
  { group: "Kích thước & Trọng lượng", keys: ["Khối lượng", "Trọng lượng", "Kích thước", "Chiều cao max", "Chiều cao min", "Số đoạn chân", "Vật liệu"] },
  { group: "Thông số ống kính",   keys: ["Tiêu cự", "Khẩu độ tối đa", "IS", "Filter", "Khoảng lấy nét", "Tải trọng"] },
  { group: "Drone / Bay",         keys: ["Camera tele", "Tầm bay", "Tầm hoạt động", "Thời gian bay", "Chống gió", "Chống va chạm", "Góc quay dọc"] },
];

/* ═══════════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════════ */
function Gallery({ imgs, name }: { imgs: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoom, setZoom] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const next = () => setActive(a => (a + 1) % imgs.length);
  const prev = () => setActive(a => (a - 1 + imgs.length) % imgs.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !isZoomed) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y });
  };

  return (
    <>
      <div className="flex gap-3 h-full">
        {/* Vertical thumbs */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[520px] pr-1 scrollbar-none">
          {imgs.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-[68px] h-[68px] shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                active === i
                  ? "border-orange-500 shadow-sm shadow-orange-200 scale-105"
                  : "border-gray-200 hover:border-orange-300 opacity-70 hover:opacity-100"
              }`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main viewer */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div
            ref={imgRef}
            className={`relative bg-gray-50 rounded-2xl overflow-hidden flex-1 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
            style={{ aspectRatio: "4/3" }}
            onClick={() => setIsZoomed(z => !z)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={imgs[active]}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-100"
              style={isZoomed ? {
                transform: "scale(2.2)",
                transformOrigin: `${zoom.x}% ${zoom.y}%`,
              } : {}}
            />

            {/* Nav arrows */}
            {imgs.length > 1 && (
              <>
                <button onClick={e => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white hover:shadow-lg transition-all z-10">
                  <ChevronLeft size={16} className="text-gray-700" />
                </button>
                <button onClick={e => { e.stopPropagation(); next(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white hover:shadow-lg transition-all z-10">
                  <ChevronRight size={16} className="text-gray-700" />
                </button>
              </>
            )}

            {/* Top toolbar */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
              <button onClick={e => { e.stopPropagation(); setIsFullscreen(true); }}
                className="w-8 h-8 bg-white/90 rounded-lg shadow flex items-center justify-center hover:bg-white transition-colors">
                <Maximize2 size={13} className="text-gray-600" />
              </button>
              <button onClick={e => e.stopPropagation()}
                className="w-8 h-8 bg-white/90 rounded-lg shadow flex items-center justify-center hover:bg-white transition-colors">
                <ZoomIn size={13} className="text-gray-600" />
              </button>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {imgs.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setActive(i); }}
                  className={`rounded-full transition-all duration-200 ${active === i ? "w-5 h-1.5 bg-orange-500" : "w-1.5 h-1.5 bg-black/30 hover:bg-black/50"}`} />
              ))}
            </div>

            {/* Zoom hint */}
            {!isZoomed && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[9px] px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100">
                Click để phóng to
              </div>
            )}
          </div>

          {/* 360 / AR buttons */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-500 rounded-xl py-2 transition-all">
              <Camera size={12} /> 360° Preview
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-500 rounded-xl py-2 transition-all">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z" /><path d="M12 2 L12 22" /><path d="M2 8 L22 8" /><path d="M2 16 L22 16" /></svg>
              AR Preview
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <X size={18} className="text-white" />
          </button>
          <img src={imgs[active]} alt={name} className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl" />
          <button onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <ChevronLeft size={22} className="text-white" />
          </button>
          <button onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <ChevronRight size={22} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SPEC STRIP — 6 thẻ với icon + fallback thông minh
═══════════════════════════════════════════════════════ */
const STRIP_CFG = [
  { label: "Cảm biến",     keys: ["Cảm biến", "Cảm biến chính"], icon: "📷", fallback: "Full Frame" },
  { label: "Độ phân giải", keys: ["Độ phân giải", "Camera"],     icon: "🔢", fallback: "—" },
  { label: "Video",        keys: ["Video"],                       icon: "🎬", fallback: "—" },
  { label: "Lấy nét",      keys: ["Lấy nét", "AF"],              icon: "🎯", fallback: "Auto AF" },
  { label: "Kết nối",      keys: ["Kết nối"],                    icon: "📡", fallback: "Wi-Fi / BT" },
  { label: "Khối lượng",   keys: ["Khối lượng", "Trọng lượng"],  icon: "⚖️", fallback: "—" },
];

function SpecStrip({ specs }: { specs: { label: string; value: string }[] }) {
  const specMap = Object.fromEntries(specs.map(s => [s.label, s.value]));

  const resolved = STRIP_CFG.map(cfg => {
    const val = cfg.keys.map(k => specMap[k]).find(Boolean) ?? cfg.fallback;
    return { label: cfg.label, value: val, icon: cfg.icon };
  });

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {resolved.map(s => (
        <div key={s.label} className="bg-white px-2 py-3 text-center hover:bg-orange-50 transition-colors cursor-default">
          <div className="text-lg leading-none mb-1">{s.icon}</div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{s.label}</div>
          <div className="text-[10px] font-extrabold text-gray-800 leading-tight line-clamp-2">{s.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STICKY NAV TABS
═══════════════════════════════════════════════════════ */
function StickyTabs({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById("section-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="sticky top-[112px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-none gap-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => scrollTo(t.id)}
              className={`px-4 py-3.5 text-[13px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                active === t.id
                  ? "border-[#FF6B00] text-[#FF6B00]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════ */
function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-3"
        style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
        <span className="w-1 h-6 bg-[#FF6B00] rounded-full inline-block" />
        {title}
      </h2>
      {sub && <p className="text-sm text-gray-500 mt-1 ml-4">{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PRODUCT CARD (reusable)
═══════════════════════════════════════════════════════ */
function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const { add } = useCart();
  const [liked, setLiked] = useState(false);
  const disc = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : null;
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-200/70 transition-all duration-300 hover:-translate-y-1 flex flex-col shrink-0 w-[200px] snap-start">
      <Link href={`/san-pham/${p.id}`}>
        <div className="relative bg-gray-50 rounded-t-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
          <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {disc && <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">-{disc}%</span>}
          <button onClick={e => { e.preventDefault(); setLiked(v => !v); }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center">
            <Heart size={12} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[9px] text-[#FF6B00] font-extrabold uppercase mb-0.5">{p.brand}</p>
        <Link href={`/san-pham/${p.id}`}>
          <p className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-snug mb-1.5 hover:text-[#FF6B00] transition-colors">{p.name}</p>
        </Link>
        <RatingStars n={p.rating} size={10} />
        <div className="flex items-baseline gap-1.5 mt-1.5 mb-2">
          <span className="text-sm font-extrabold text-[#FF6B00]">{FMT(p.price)}</span>
          {p.oldPrice && <span className="text-[9px] text-gray-400 line-through">{FMT(p.oldPrice)}</span>}
        </div>
        <button onClick={() => add({ id: p.id, name: p.name, price: p.price, img: p.img })}
          className="mt-auto w-full bg-[#FF6B00] hover:bg-orange-600 text-white text-[10px] font-extrabold py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors">
          <ShoppingCart size={10} /> Thêm giỏ
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { add } = useCart();

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [activeKit, setActiveKit] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandDesc, setExpandDesc] = useState(false);
  const [sampleModal, setSampleModal] = useState<number | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [qaSearch, setQaSearch] = useState("");

  if (!product) return <Navigate to="/san-pham" replace />;

  const disc   = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;
  const savings = product.oldPrice ? product.oldPrice - product.price : null;
  const instalment = Math.round(product.price / 12);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);

  const handleBuy = () => {
    for (let i = 0; i < qty; i++) add({ id: product.id, name: product.name, price: product.price, img: product.imgs[0] });
  };

  /* ── scroll-based tab tracking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id.replace("section-", ""));
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );
    TABS.forEach(t => {
      const el = document.getElementById("section-" + t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const specMap = Object.fromEntries(product.specs.map(s => [s.label, s.value]));

  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Nunito Sans',sans-serif" }}>

      {/* ── Breadcrumb ────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-2.5">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            {[
              { label: "Trang chủ", to: "/" },
              { label: "Sản phẩm", to: "/san-pham" },
              { label: product.categoryLabel, to: `/san-pham?cat=${product.category}` },
            ].map(b => (
              <span key={b.label} className="flex items-center gap-1.5">
                <Link href={b.to} className="hover:text-[#FF6B00] transition-colors">{b.label}</Link>
                <ChevronRight size={10} className="text-gray-300" />
              </span>
            ))}
            <span className="text-gray-700 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product Hero ─────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-6">
          <div className="grid lg:grid-cols-[55%_45%] gap-8 items-start">

            {/* LEFT — Gallery */}
            <div className="flex flex-col gap-4">
              <div className="h-[440px]">
                <Gallery imgs={product.imgs} name={product.name} />
              </div>
              <SpecStrip specs={product.specs} />
            </div>

            {/* RIGHT — Sticky purchase panel */}
            <div className="lg:sticky lg:top-[120px]">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">

                {/* Status badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check size={9} /> Chính hãng
                  </span>
                  {product.badge && (
                    <span className="bg-orange-50 text-[#FF6B00] border border-orange-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full">{product.badge}</span>
                  )}
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full">Bảo hành 24T</span>
                </div>

                {/* Title */}
                <div>
                  <p className="text-[10px] text-[#FF6B00] font-extrabold uppercase tracking-widest mb-1">{product.brand}</p>
                  <h1 className="text-[22px] font-extrabold text-gray-900 leading-tight"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                    {product.name}
                  </h1>
                </div>

                {/* Rating row */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <RatingStars n={product.rating} size={14} />
                  <span className="text-sm font-bold text-gray-700">{product.rating}.0</span>
                  <span className="text-xs text-gray-400">({product.reviews} đánh giá)</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span className="text-xs text-gray-400">Đã bán 1.2k+</span>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[32px] font-black text-[#FF6B00] leading-none">{FMT(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-base text-gray-400 line-through">{FMT(product.oldPrice)}</span>
                    )}
                    {disc && (
                      <span className="bg-red-100 text-red-600 text-xs font-extrabold px-2 py-0.5 rounded-full">-{disc}%</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Trả góp 0%: <span className="font-bold text-gray-700">{FMT(instalment)}/tháng × 12 kỳ</span>
                  </p>
                </div>

                {/* Promotion card */}
                {savings && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-lg">🎁</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-red-700">Tiết kiệm {FMT(savings)}</p>
                      <p className="text-[10px] text-red-500">Khuyến mãi trong tháng 7/2026</p>
                    </div>
                  </div>
                )}

                {/* Color selector */}
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2">Màu sắc: <span className="text-gray-400 font-normal">{COLORS[activeColor].name}</span></p>
                  <div className="flex gap-2">
                    {COLORS.map((c, i) => (
                      <button key={c.name} onClick={() => setActiveColor(i)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${activeColor === i ? "border-[#FF6B00] scale-110 shadow-md" : "border-gray-300 hover:border-gray-400"}`}
                        style={{ background: c.hex }} title={c.name} />
                    ))}
                  </div>
                </div>

                {/* Kit selector */}
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2">Phiên bản:</p>
                  <div className="flex flex-col gap-1.5">
                    {KITS.map((k, i) => (
                      <button key={k} onClick={() => setActiveKit(i)}
                        className={`text-left px-3.5 py-2.5 rounded-xl border text-[12px] font-semibold transition-all ${
                          activeKit === i
                            ? "border-[#FF6B00] bg-orange-50 text-[#FF6B00]"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}>
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] pt-3 border-t border-gray-100">
                  {[
                    ["Thương hiệu", product.brand],
                    ["SKU", `SKU-${product.id.toString().padStart(6, "0")}`],
                    ["Tình trạng", "Còn hàng"],
                    ["Bảo hành", "24 tháng chính hãng"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span className="text-gray-400">{k}:</span>{" "}
                      <span className="font-semibold text-gray-700">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping */}
                <div className="flex items-center gap-2 text-[11px] text-gray-600 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                  <Truck size={13} className="text-green-600 shrink-0" />
                  Giao miễn phí HCM & HN • Dự kiến <span className="font-bold ml-1">15/07 – 18/07</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">Số lượng:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-9">
                    <button onClick={() => setQty(v => Math.max(1, v - 1))}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Minus size={12} className="text-gray-600" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{qty}</span>
                    <button onClick={() => setQty(v => v + 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Plus size={12} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <button onClick={handleBuy}
                    className="w-full bg-[#FF6B00] hover:bg-orange-600 active:scale-[0.98] text-white font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-200">
                    <ShoppingCart size={16} /> Mua ngay
                  </button>
                  <button onClick={handleBuy}
                    className="w-full bg-orange-50 hover:bg-orange-100 text-[#FF6B00] font-extrabold py-3 rounded-2xl text-sm border border-orange-200 flex items-center justify-center gap-2 transition-all">
                    <ShoppingCart size={15} /> Thêm vào giỏ hàng
                  </button>
                  <button
                    className="w-full border border-gray-200 hover:border-[#FF6B00] text-gray-700 hover:text-[#FF6B00] font-bold py-2.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all">
                    <Phone size={15} /> Tư vấn trực tuyến
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <button onClick={() => setLiked(v => !v)}
                    className={`flex items-center gap-1.5 text-[11px] font-bold transition-colors ${liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}>
                    <Heart size={14} className={liked ? "fill-red-500" : ""} /> Yêu thích
                  </button>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-blue-500 transition-colors">
                    <GitCompare size={14} /> So sánh
                  </button>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-gray-800 transition-colors ml-auto">
                    <Share2 size={14} /> Chia sẻ
                  </button>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100">
                  {[
                    { Icon: BadgeCheck, label: "Chính hãng 100%", color: "text-green-600 bg-green-50" },
                    { Icon: Truck,      label: "Giao hàng miễn phí",  color: "text-blue-600 bg-blue-50" },
                    { Icon: Shield,     label: "Thanh toán an toàn", color: "text-purple-600 bg-purple-50" },
                    { Icon: RotateCcw,  label: "Đổi trả 15 ngày",   color: "text-orange-600 bg-orange-50" },
                  ].map(b => (
                    <div key={b.label} className="text-center flex flex-col items-center gap-1.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${b.color}`}>
                        <b.Icon size={15} />
                      </div>
                      <p className="text-[8.5px] font-bold text-gray-600 leading-tight text-center">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Tab Navigation ─────────────────────────── */}
      <StickyTabs active={activeTab} />

      {/* ── Content sections ─────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8 space-y-6">

        {/* ░░ OVERVIEW ░░ */}
        <section id="section-overview" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Tổng Quan Sản Phẩm" />
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div>
              <p className={`text-sm text-gray-600 leading-relaxed transition-all ${expandDesc ? "" : "line-clamp-6"}`}>
                {product.desc} {product.desc} {/* intentionally doubled for length demo */}
              </p>
              <button onClick={() => setExpandDesc(v => !v)}
                className="mt-3 flex items-center gap-1 text-sm font-bold text-[#FF6B00] hover:text-orange-700 transition-colors">
                {expandDesc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {expandDesc ? "Thu gọn" : "Xem thêm"}
              </button>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {product.specs.slice(0, 6).map(s => (
                  <div key={s.label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <span className="w-5 h-5 rounded-full bg-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-white" />
                    </span>
                    <div className="text-xs">
                      <span className="font-bold text-gray-800">{s.label}: </span>
                      <span className="text-gray-600">{s.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <img src={product.imgs[0]} alt={product.name} className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
              </div>
              <div className="bg-[#FF6B00]/5 border border-orange-100 rounded-2xl p-4 space-y-2.5">
                {product.specs.slice(0, 4).map(s => (
                  <div key={s.label} className="flex justify-between text-xs border-b border-orange-100 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-500">{s.label}</span>
                    <span className="font-bold text-gray-800">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold border border-gray-200 hover:border-[#FF6B00] hover:text-[#FF6B00] text-gray-600 py-2.5 rounded-xl transition-all">
                  <Download size={12} /> Tải brochure
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold border border-gray-200 hover:border-[#FF6B00] hover:text-[#FF6B00] text-gray-600 py-2.5 rounded-xl transition-all">
                  <GitCompare size={12} /> So sánh dòng
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ░░ DESCRIPTION ░░ */}
        <section id="section-desc" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Mô Tả Chi Tiết" />
          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>{product.desc}</p>
            <p>Với thiết kế nhỏ gọn, hiệu suất ấn tượng và hệ thống lấy nét thông minh, đây là lựa chọn lý tưởng cho cả nhiếp ảnh gia chuyên nghiệp lẫn người mới bắt đầu muốn nâng cấp thiết bị.</p>
            <p>Sản phẩm được phân phối chính hãng tại Việt Nam, kèm theo đầy đủ phụ kiện và giấy tờ bảo hành 24 tháng từ Canon Việt Nam.</p>
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100">
            <img src={product.imgs[1] ?? product.imgs[0]} alt="" className="w-full object-cover" style={{ aspectRatio: "21/9", objectPosition: "center" }} />
          </div>
        </section>

        {/* ░░ SPECIFICATIONS ░░ */}
        <section id="section-specs" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Thông Số Kỹ Thuật" />
          <div className="space-y-4">
            {(() => {
              const allUsedKeys = new Set<string>();
              const sections: { group: string; rows: { label: string; value: string }[] }[] = [];

              for (const group of SPECS_GROUPS) {
                const rows = group.keys
                  .map(k => product.specs.find(s => s.label === k))
                  .filter((s): s is { label: string; value: string } => !!s);
                rows.forEach(s => allUsedKeys.add(s.label));
                if (rows.length > 0) sections.push({ group: group.group, rows });
              }

              /* any spec not matched by any group → append to "Thông tin thêm" */
              const leftover = product.specs.filter(s => !allUsedKeys.has(s.label));
              if (leftover.length > 0) sections.push({ group: "Thông tin thêm", rows: leftover });

              return sections.map(({ group, rows }) => (
                <div key={group} className="rounded-2xl overflow-hidden border border-gray-100">
                  <div className="bg-gray-900 px-4 py-2.5">
                    <h3 className="text-[11px] font-extrabold text-white uppercase tracking-widest">{group}</h3>
                  </div>
                  {rows.map((s, i) => (
                    <div key={s.label} className={`flex items-start gap-4 py-3 px-4 text-xs border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                      <span className="w-44 shrink-0 text-gray-500 font-semibold pt-0.5">{s.label}</span>
                      <span className="text-gray-900 font-bold flex-1">{s.value}</span>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        </section>

        {/* ░░ IN BOX ░░ */}
        <section id="section-inbox" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Sản Phẩm Bao Gồm" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: product.name, desc: "Máy ảnh chính" },
              { name: "Pin LP-E17", desc: "Pin sạc chính hãng" },
              { name: "Sạc pin LC-E17", desc: "Bộ sạc pin" },
              { name: "Dây đeo cổ", desc: "Đai đeo vai / cổ" },
              { name: "Cáp USB-C", desc: "Kết nối máy tính" },
              { name: "Nắp thân EF-EOS R", desc: "Bảo vệ ngàm" },
              { name: "Hộp đựng", desc: "Hộp sản phẩm gốc" },
              { name: "Thẻ bảo hành 24T", desc: "Bảo hành chính hãng" },
            ].map(item => (
              <div key={item.name}
                className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all">
                <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center mb-3">
                  <Package size={18} className="text-[#FF6B00]" />
                </div>
                <p className="text-[11px] font-extrabold text-gray-800 leading-snug">{item.name}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ░░ SAMPLE GALLERY ░░ */}
        <section id="section-samples" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Ảnh Chụp Mẫu" sub="Ảnh thực tế chụp từ sản phẩm — không chỉnh sửa" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GALLERY_SAMPLES.map((s, i) => (
              <button key={i} onClick={() => setSampleModal(i)}
                className="group relative rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
                style={{ aspectRatio: i === 0 ? "16/10" : "4/3" }}>
                <img src={s.url} alt={s.tag} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {s.tag}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ░░ ACCESSORIES CAROUSEL ░░ */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Phụ Kiện Phù Hợp" />
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {ACCESSORIES.map(a => (
              <div key={a.id}
                className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-200/70 transition-all duration-300 hover:-translate-y-1 flex flex-col shrink-0 w-[200px] snap-start">
                <div className="bg-gray-50 rounded-t-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-snug mb-1.5 flex-1">{a.name}</p>
                  <RatingStars n={Math.floor(a.rating)} size={10} />
                  <p className="text-sm font-extrabold text-[#FF6B00] mt-1.5 mb-2">{FMT(a.price)}</p>
                  <button className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white text-[10px] font-extrabold py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors">
                    <ShoppingCart size={10} /> Thêm giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ░░ RELATED PRODUCTS ░░ */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-3"
              style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
              <span className="w-1 h-6 bg-[#FF6B00] rounded-full" />Sản Phẩm Liên Quan
            </h2>
            <Link href={`/san-pham?cat=${product.category}`}
              className="text-sm font-bold text-[#FF6B00] hover:text-orange-700 flex items-center gap-1">
              Xem tất cả <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {related.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        {/* ░░ REVIEWS ░░ */}
        <section id="section-reviews" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Đánh Giá Khách Hàng" />
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 mb-8">
            {/* Rating summary */}
            <div className="text-center bg-orange-50 rounded-2xl p-5">
              <div className="text-5xl font-black text-[#FF6B00] mb-1">4.9</div>
              <RatingStars n={5} size={16} />
              <p className="text-[11px] text-gray-500 mt-2">{product.reviews} đánh giá</p>
              {[5,4,3,2,1].map(n => (
                <div key={n} className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-gray-500 w-2">{n}</span>
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full"
                      style={{ width: n === 5 ? "78%" : n === 4 ? "15%" : n === 3 ? "5%" : "1%" }} />
                  </div>
                  <span className="text-[10px] text-gray-400 w-5 text-right">{n===5?"78%":n===4?"15%":n===3?"5%":"1%"}</span>
                </div>
              ))}
            </div>

            {/* Review cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {["Tất cả", "5 sao", "4 sao", "Có ảnh"].map((f, i) => (
                  <button key={f}
                    className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                      i === 0 ? "bg-[#FF6B00] text-white border-[#FF6B00]" : "border-gray-200 text-gray-600 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    }`}>{f}</button>
                ))}
              </div>
              {REVIEWS_DATA.map(r => (
                <div key={r.name} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-orange-100" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{r.name}</span>
                        {r.verified && (
                          <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <Check size={8} /> Đã mua
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{r.date}</span>
                    </div>
                    <RatingStars n={r.stars} size={11} />
                    <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{r.text}</p>
                    {r.imgs.length > 0 && (
                      <div className="flex gap-2 mt-2.5">
                        {r.imgs.map((img, i) => (
                          <img key={i} src={img} alt="" className="w-16 h-16 rounded-xl object-cover border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full border border-gray-200 hover:border-[#FF6B00] hover:text-[#FF6B00] text-gray-500 text-sm font-bold py-3 rounded-xl transition-all">
                Xem thêm đánh giá
              </button>
            </div>
          </div>
        </section>

        {/* ░░ Q&A ░░ */}
        <section id="section-qa" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Hỏi & Đáp" />
          <div className="flex gap-3 mb-5">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 hover:border-gray-300 transition-colors">
              <Search size={14} className="text-gray-400" />
              <input
                value={qaSearch}
                onChange={e => setQaSearch(e.target.value)}
                placeholder="Tìm câu hỏi..."
                className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
            <button className="bg-[#FF6B00] hover:bg-orange-600 text-white text-sm font-bold px-4 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap">
              <MessageSquare size={14} /> Đặt câu hỏi
            </button>
          </div>
          <div className="space-y-2">
            {QA_DATA.filter(q => qaSearch === "" || q.q.toLowerCase().includes(qaSearch.toLowerCase())).map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenQA(openQA === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-bold text-gray-800">{item.q}</span>
                  {openQA === i ? <ChevronUp size={16} className="text-[#FF6B00] shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </button>
                {openQA === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    <p className="mt-3">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ░░ SERVICE BENEFITS ░░ */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { Icon: Truck,     title: "Giao Toàn Quốc",     body: "Miễn phí nội thành HCM, Hà Nội. Tốc độ nhanh.", color: "bg-blue-50 text-blue-600" },
            { Icon: BadgeCheck, title: "Bảo Hành Chính Hãng", body: "12–24 tháng bảo hành trực tiếp từ hãng.", color: "bg-green-50 text-green-600" },
            { Icon: CreditCard, title: "Thanh Toán Linh Hoạt", body: "Trả góp 0% 6–24 kỳ, hỗ trợ nhiều cổng TT.", color: "bg-purple-50 text-purple-600" },
            { Icon: Headphones, title: "Hỗ Trợ 24/7",         body: "Kỹ thuật viên nhiếp ảnh sẵn sàng tư vấn.", color: "bg-orange-50 text-[#FF6B00]" },
          ].map(b => (
            <div key={b.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${b.color}`}>
                <b.Icon size={22} />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-sm mb-1">{b.title}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{b.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ░░ RECENTLY VIEWED ░░ */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <SectionHead title="Đã Xem Gần Đây" />
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {RECENTLY.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        {/* ░░ NEWSLETTER ░░ */}
        <section className="bg-gradient-to-br from-[#FF6B00] to-orange-600 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white" />
          </div>
          <div className="relative">
            <p className="text-orange-100 text-[10px] font-extrabold uppercase tracking-widest mb-2">Ưu đãi độc quyền</p>
            <h2 className="text-3xl font-black text-white mb-2"
              style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
              Giảm ngay 20% đơn đầu tiên
            </h2>
            <p className="text-orange-100 text-sm mb-6 max-w-md mx-auto">Đăng ký nhận bản tin — cập nhật sản phẩm mới, tips nhiếp ảnh và ưu đãi riêng mỗi tuần.</p>
            <div className="flex gap-3 max-w-sm mx-auto">
              <input type="email" placeholder="Email của bạn..."
                className="flex-1 bg-white text-gray-900 placeholder:text-gray-400 text-sm px-4 py-3 rounded-xl outline-none" />
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-extrabold px-5 py-3 rounded-xl text-sm transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ── Sample photo modal ───────────────────────────── */}
      {sampleModal !== null && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSampleModal(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <X size={18} className="text-white" />
          </button>
          <button onClick={e => { e.stopPropagation(); setSampleModal(i => i === null ? null : (i - 1 + GALLERY_SAMPLES.length) % GALLERY_SAMPLES.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <ChevronLeft size={22} className="text-white" />
          </button>
          <img
            src={GALLERY_SAMPLES[sampleModal].url.replace("w=800", "w=1200")}
            alt={GALLERY_SAMPLES[sampleModal].tag}
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={e => { e.stopPropagation(); setSampleModal(i => i === null ? null : (i + 1) % GALLERY_SAMPLES.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <ChevronRight size={22} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            {GALLERY_SAMPLES[sampleModal].tag} • {sampleModal + 1}/{GALLERY_SAMPLES.length}
          </div>
        </div>
      )}
    </div>
  );
}
