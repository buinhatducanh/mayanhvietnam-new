import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import {
  Star, StarHalf, ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Zap, ShoppingCart, Phone, Heart, Share2, Shield, Truck, RotateCcw,
  CreditCard, Check, Maximize2, ZoomIn, RefreshCw, Eye, X,
  Package, Camera, Film, Headphones, BadgeCheck, Tag, Gift,
  ArrowRight, Minus, Plus, MessageCircle, MapPin, Clock, ThumbsUp,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1603208234872-619ffa1209cb?w=900&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614746480983-377658e91422?w=900&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599664223843-9349c75196bc?w=900&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509255806757-ca81636763ce?w=900&q=90&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1651922118429-9fad760bb430?w=900&q=90&auto=format&fit=crop",
];

const SPEC_STRIP = [
  { icon: "🎞", label: "24.2MP", sub: "APS-C CMOS" },
  { icon: "🎬", label: "4K UHD", sub: "30fps" },
  { icon: "⚡", label: "DPAF II", sub: "Dual Pixel AF" },
  { icon: "📷", label: "ISO 32000", sub: "Mở rộng" },
  { icon: "📡", label: "Wi-Fi 5GHz", sub: "Bluetooth 5.0" },
  { icon: "⚖️", label: "370g", sub: "Thân máy" },
];

const SPECS = [
  { group: "Cảm biến & Xử lý", rows: [
    ["Loại cảm biến", "APS-C CMOS 24.2 Megapixel"],
    ["Bộ vi xử lý ảnh", "DIGIC X tích hợp AI"],
    ["Tỉ lệ crop", "1.6×"],
    ["ISO gốc", "100 – 32000 (mở rộng 51200)"],
  ]},
  { group: "Lấy nét tự động", rows: [
    ["Hệ thống AF", "Dual Pixel CMOS AF II"],
    ["Vùng lấy nét", "100% (ngang) × 100% (dọc)"],
    ["AF thông minh", "Eye AF, Animal AF, Vehicle AF"],
    ["Tốc độ AF", "0.009 giây"],
  ]},
  { group: "Chụp ảnh", rows: [
    ["Tốc độ màn trập", "1/4000 – 30s"],
    ["Burst tốc độ cao", "Lên đến 15fps (AF/AE)"],
    ["HDR", "HDR PQ tích hợp"],
    ["Định dạng ảnh", "RAW (C-RAW), JPEG, HEIF"],
  ]},
  { group: "Quay phim", rows: [
    ["Độ phân giải tối đa", "4K UHD (3840×2160) 30p"],
    ["Cắt xén 4K", "Không cắt xén (1.0×)"],
    ["Full HD", "Lên đến 120fps"],
    ["Chống rung", "Dual Pixel IS II (5 trục)"],
  ]},
  { group: "Màn hình & Ngắm", rows: [
    ["Kích thước LCD", '3.0" Vari-angle Cảm ứng'],
    ["Độ phân giải LCD", "1.04 triệu điểm"],
    ["Ngắm quang học", "Không (mirrorless)"],
    ["Hỗ trợ Touch & Drag AF", "Có"],
  ]},
  { group: "Thân máy", rows: [
    ["Trọng lượng", "370g (chỉ thân máy)"],
    ["Kích thước", "116.3 × 87.4 × 68.8mm"],
    ["Pin", "LP-E17, ≈250 ảnh/lần sạc"],
    ["Thẻ nhớ", "SD / SDHC / SDXC (UHS-I)"],
  ]},
  { group: "Kết nối", rows: [
    ["Wi-Fi", "2.4GHz / 5GHz IEEE 802.11"],
    ["Bluetooth", "5.0"],
    ["USB", "USB Type-C (Hi-Speed USB)"],
    ["Cổng HDMI", "Micro HDMI (Type D)"],
  ]},
];

const IN_BOX = [
  { icon: <Camera size={22} />, name: "Thân máy Canon EOS R50 (Black)", qty: 1 },
  { icon: <Film size={22} />, name: "Ống kính RF-S 18-45mm F4.5-6.3 IS STM", qty: 1 },
  { icon: <Package size={22} />, name: "Pin sạc LP-E17", qty: 1 },
  { icon: <Headphones size={22} />, name: "Cáp nối USB Type-C", qty: 1 },
  { icon: <Shield size={22} />, name: "Dây đeo cổ", qty: 1 },
  { icon: <Package size={22} />, name: "Hộp đựng thân máy & nắp body", qty: 1 },
  { icon: <CreditCard size={22} />, name: "Phiếu bảo hành chính hãng (24 tháng)", qty: 1 },
];

const SAMPLE_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1466133633688-187f0b492390?w=800&q=80&auto=format&fit=crop", label: "Phong cảnh – ISO 100", ratio: "landscape" },
  { url: "https://images.unsplash.com/photo-1635713150362-ed0cd425e697?w=800&q=80&auto=format&fit=crop", label: "Chân dung – ISO 3200", ratio: "portrait" },
  { url: "https://images.unsplash.com/photo-1526927071144-dbe4c41835e4?w=800&q=80&auto=format&fit=crop", label: "Ngoại cảnh – ISO 400", ratio: "landscape" },
  { url: "https://images.unsplash.com/photo-1676732331165-61bd1e55494a?w=800&q=80&auto=format&fit=crop", label: "Ngoài trời – ISO 800", ratio: "portrait" },
  { url: "https://images.unsplash.com/photo-1518725522904-4b3939358342?w=800&q=80&auto=format&fit=crop", label: "Chân dung – Eye AF", ratio: "landscape" },
  { url: "https://images.unsplash.com/photo-1622842182823-28bfbfba47e3?w=800&q=80&auto=format&fit=crop", label: "4K Video Frame", ratio: "landscape" },
];

const ACCESSORIES = [
  { id: "a1", name: "Thẻ nhớ SanDisk Extreme Pro 256GB", price: 1290000, img: "https://images.unsplash.com/photo-1602526432604-029a709e131c?w=300&q=80&auto=format&fit=crop" },
  { id: "a2", name: "Túi Lowepro Flipside 300 II", price: 1890000, img: "https://images.unsplash.com/photo-1778854097425-7c937e40be0a?w=300&q=80&auto=format&fit=crop" },
  { id: "a3", name: "Lens Canon RF 50mm F1.8 STM", price: 6900000, img: "https://images.unsplash.com/photo-1580852300513-9b50125bf293?w=300&q=80&auto=format&fit=crop" },
  { id: "a4", name: "Pin phụ Canon LP-E17 (chính hãng)", price: 980000, img: "https://images.unsplash.com/photo-1610412988129-f042e5292703?w=300&q=80&auto=format&fit=crop" },
  { id: "a5", name: "Gimbal DJI RS 3 Mini", price: 4490000, img: "https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=300&q=80&auto=format&fit=crop" },
];

const RELATED = [
  { id: "r1", name: "Canon EOS R50 White Kit 18-45mm", price: 18500000, orig: 20500000, rating: 4.7, reviews: 89, img: "https://images.unsplash.com/photo-1599664223843-9349c75196bc?w=400&q=80&auto=format&fit=crop" },
  { id: "r2", name: "Canon EOS M50 Mark II Kit 15-45mm", price: 15500000, orig: 17000000, rating: 4.6, reviews: 142, img: "https://images.unsplash.com/photo-1580835719614-f302b70e19f9?w=400&q=80&auto=format&fit=crop" },
  { id: "r3", name: "Sony Alpha ZV-E10 Kit 16-50mm", price: 16900000, orig: 18500000, rating: 4.8, reviews: 211, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80&auto=format&fit=crop" },
  { id: "r4", name: "Fujifilm X-T30 II Body", price: 24900000, orig: 27000000, rating: 4.9, reviews: 78, img: "https://images.unsplash.com/photo-1651922118429-9fad760bb430?w=400&q=80&auto=format&fit=crop" },
];

const REVIEWS = [
  { name: "Nguyễn Minh Tuấn", avatar: "NMT", rating: 5, date: "22/11/2024", verified: true, helpful: 34, title: "Cực kỳ hài lòng với sản phẩm này!", body: "Mình đã dùng 2 tháng rồi, chụp chân dung rất đẹp. Eye AF hoạt động cực kỳ chính xác. Màn hình xoay lật tiện lắm khi quay clip. Đặc biệt nhẹ và nhỏ gọn, mang theo cả ngày không mệt. Highly recommend cho ai mới bắt đầu!" },
  { name: "Trần Thị Lan Anh", avatar: "TLA", rating: 5, date: "10/11/2024", verified: true, helpful: 21, title: "Mua cho vợ – vợ thích mê!", body: "Mua làm quà sinh nhật cho vợ. Từ ngày có chiếc này vợ mình trở thành photographer nghiệp dư chuyên nghiệp. Ảnh đẹp sắc nét, màu sắc tự nhiên. Giao hàng nhanh, đóng gói cẩn thận. Cảm ơn LensPro!" },
  { name: "Lê Hải Nam", avatar: "LHN", rating: 4, date: "03/11/2024", verified: true, helpful: 15, title: "Tốt nhưng pin hơi yếu", body: "Chất lượng ảnh xuất sắc cho phân khúc giá. Hơi tiếc là pin chỉ ~250 ảnh/lần. Mình hay phải mang pin dự phòng. Ngoài ra mọi thứ đều tốt, AF rất nhanh và mượt." },
];

const FAQS = [
  { q: "Máy có bao gồm thẻ nhớ không?", a: "Không, Canon EOS R50 không kèm theo thẻ nhớ. Máy hỗ trợ SD, SDHC, SDXC (UHS-I). Chúng tôi khuyến nghị sử dụng SanDisk Extreme Pro 64GB trở lên để khai thác tối đa hiệu năng." },
  { q: "Có hỗ trợ trả góp 0% không?", a: "Có! Chúng tôi hỗ trợ trả góp 0% qua thẻ tín dụng các ngân hàng: Techcombank, VPBank, Sacombank, HDBank với kỳ hạn 6-24 tháng. Liên hệ hotline 1800 9999 để biết thêm chi tiết." },
  { q: "Thời gian bảo hành chính hãng là bao lâu?", a: "Bảo hành 24 tháng chính hãng tại Canon Vietnam. Ngoài ra LensPro bổ sung thêm 6 tháng bảo hành mở rộng, tổng cộng 30 tháng bảo hành." },
  { q: "Máy có phù hợp cho người mới bắt đầu không?", a: "Hoàn toàn phù hợp. R50 có chế độ hướng dẫn trực tiếp (Guide Mode) và có thể shoot full Auto. Giao diện thân thiện, nhẹ tay, perfect cho người mới học nhiếp ảnh." },
  { q: "Giao hàng trong bao lâu?", a: "Tại Hà Nội và TP.HCM: giao trong ngày (đặt trước 15h). Các tỉnh thành khác: 1-3 ngày làm việc. Giao hàng miễn phí toàn quốc với đơn từ 500.000đ." },
];

const COMPARE_DATA = {
  cols: ["Canon EOS R50", "Sony ZV-E10", "Fujifilm X-T30 II"],
  rows: [
    { label: "Giá bán", vals: ["17.500.000đ", "16.900.000đ", "24.900.000đ"] },
    { label: "Cảm biến", vals: ["24.2MP APS-C", "24.2MP APS-C", "26.1MP APS-C"] },
    { label: "Quay phim 4K", vals: ["✓ 4K30p", "✓ 4K30p", "✓ 4K30p"] },
    { label: "Chống rung", vals: ["IS II 5 trục", "IS Điện tử", "IBIS 5 trục"] },
    { label: "Trọng lượng", vals: ["370g", "343g", "476g"] },
    { label: "Eye AF", vals: ["✓ Animal/Vehicle", "✓ Real-time", "✗"] },
    { label: "Touch LCD", vals: ["3.0\" Xoay lật", "3.0\" Nghiêng", "3.0\" Cố định"] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";
const discPct = (orig: number, sale: number) => Math.round((1 - sale / orig) * 100);

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} strokeWidth={1.5}
          className={i <= full ? "fill-amber-400 text-amber-400" : i === full+1 && half ? "fill-amber-200 text-amber-400" : "text-zinc-300"} />
      ))}
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#ff6b00] mb-2">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
      {children}
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════════════════════════

function Gallery() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(GALLERY_IMGS.length - 1, i + 1));

  return (
    <div className="flex flex-col gap-4">
      {/* Main gallery card */}
      <div className="bg-white rounded-2xl shadow-sm border border-black/[0.06] overflow-hidden">
        <div className="flex gap-0">
          {/* Vertical thumbnails */}
          <div className="flex flex-col gap-2 p-3 border-r border-black/[0.06] shrink-0">
            {GALLERY_IMGS.map((img, i) => (
              <button
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  active === i ? "border-[#ff6b00] shadow-md shadow-orange-100" : "border-transparent hover:border-zinc-200"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative flex-1 bg-zinc-50 aspect-square group">
            <img
              src={GALLERY_IMGS[active]}
              alt="Canon EOS R50"
              className="w-full h-full object-contain p-6"
            />

            {/* Discount badge */}
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              -12%
            </div>

            {/* Official badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
              <BadgeCheck size={12} /> Chính Hãng
            </div>

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-50"
            >
              <ChevronRight size={18} />
            </button>

            {/* Action tools */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {[
                { icon: <ZoomIn size={14} />, tip: "Zoom" },
                { icon: <RefreshCw size={14} />, tip: "360°" },
                { icon: <Eye size={14} />, tip: "AR" },
                { icon: <Maximize2 size={14} />, tip: "Fullscreen" },
              ].map(({ icon, tip }) => (
                <button
                  key={tip}
                  title={tip}
                  onClick={() => alert(`${tip} — chức năng demo`)}
                  className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg shadow flex items-center justify-center text-zinc-500 hover:text-[#ff6b00] transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* Slide indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {GALLERY_IMGS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${active === i ? "w-4 bg-[#ff6b00]" : "w-1.5 bg-zinc-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spec strip */}
      <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm px-4 py-3 grid grid-cols-3 xl:grid-cols-6 gap-1">
        {SPEC_STRIP.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl hover:bg-orange-50 transition-colors cursor-default text-center">
            <span className="text-xl leading-none">{s.icon}</span>
            <span className="text-xs font-bold text-zinc-900 mt-1">{s.label}</span>
            <span className="text-[10px] text-zinc-400 leading-tight">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PURCHASE CARD
// ═══════════════════════════════════════════════════════════════

function PurchaseCard() {
  const [color, setColor] = useState<"black" | "white">("black");
  const [kit, setKit] = useState<"body" | "kit1" | "kit2">("kit1");
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const priceMap = { body: 14900000, kit1: 17500000, kit2: 21900000 };
  const origMap  = { body: 16900000, kit1: 19900000, kit2: 24900000 };
  const price = priceMap[kit];
  const orig  = origMap[kit];

  const handleBuy = () => {
    addItem({ id: `r50-${color}-${kit}`, name: `Canon EOS R50 (${color === "black" ? "Black" : "White"})`, price, image: GALLERY_IMGS[0], variant: kit });
    navigate("/cart");
  };
  const handleAdd = () => {
    addItem({ id: `r50-${color}-${kit}`, name: `Canon EOS R50 (${color === "black" ? "Black" : "White"})`, price, image: GALLERY_IMGS[0], variant: kit });
  };

  return (
    <div className="sticky top-[128px] space-y-3 self-start max-h-[calc(100vh-148px)] overflow-y-auto pr-1">
      {/* Main card */}
      <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 space-y-5">

        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Canon</span>
              <span className="text-[10px] text-zinc-300">|</span>
              <span className="text-[10px] text-zinc-400">SKU: CAR50BLK1845</span>
            </div>
            <h1 className="text-[17px] font-bold text-zinc-900 leading-snug">
              Máy ảnh Canon EOS R50 (Black) kèm Lens RF-S 18-45mm
            </h1>
          </div>
          <button
            onClick={() => setWishlist(v => !v)}
            className={`mt-0.5 w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${wishlist ? "border-red-200 bg-red-50 text-red-500" : "border-zinc-200 text-zinc-400 hover:text-red-400 hover:border-red-200"}`}
          >
            <Heart size={16} fill={wishlist ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-3 flex-wrap">
          <Stars rating={4.8} size={14} />
          <span className="text-sm font-semibold text-amber-500">4.8</span>
          <span className="text-xs text-zinc-400">(124 đánh giá)</span>
          <div className="w-px h-4 bg-zinc-200" />
          <span className="text-xs text-zinc-500">Đã bán: <strong className="text-zinc-700">1.247</strong></span>
          <div className="w-px h-4 bg-zinc-200" />
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><Check size={11} /> Còn hàng</span>
        </div>

        {/* Price */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-50/20 border border-orange-100 rounded-2xl px-5 py-4">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-[28px] font-black text-[#ff6b00] tracking-tight leading-none">
              {fmt(price)}
            </span>
            <span className="text-sm text-zinc-400 line-through">{fmt(orig)}</span>
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
              -{discPct(orig, price)}%
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            hoặc <strong className="text-zinc-700">{fmt(Math.round(price / 6))}/tháng</strong> × 6 tháng (trả góp 0% lãi suất)
          </p>
        </div>

        {/* Color */}
        <div>
          <p className="text-xs font-semibold text-zinc-700 mb-2.5 uppercase tracking-wider">Màu sắc</p>
          <div className="flex gap-2">
            {(["black", "white"] as const).map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                  color === c ? "border-[#ff6b00] bg-orange-50 text-[#ff6b00]" : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border ${c === "black" ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-300"}`} />
                {c === "black" ? "Đen" : "Trắng"}
              </button>
            ))}
          </div>
        </div>

        {/* Kit */}
        <div>
          <p className="text-xs font-semibold text-zinc-700 mb-2.5 uppercase tracking-wider">Phiên bản</p>
          <div className="flex flex-col gap-2">
            {([
              { k: "body", label: "Body Only", sub: "Chỉ thân máy" },
              { k: "kit1", label: "Kit 18-45mm", sub: "RF-S 18-45mm F4.5-6.3 IS STM" },
              { k: "kit2", label: "Kit 18-150mm", sub: "RF-S 18-150mm F3.5-6.3 IS STM" },
            ] as const).map(({ k, label, sub }) => (
              <button
                key={k}
                onClick={() => setKit(k)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                  kit === k ? "border-[#ff6b00] bg-orange-50" : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${kit === k ? "border-[#ff6b00]" : "border-zinc-300"}`}>
                  {kit === k && <div className="w-2 h-2 bg-[#ff6b00] rounded-full" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{label}</p>
                  <p className="text-[11px] text-zinc-400">{sub} — {fmt(priceMap[k])}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Qty + add-to-cart */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border-2 border-zinc-200 rounded-xl overflow-hidden">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600" onClick={() => setQty(q => Math.max(1, q-1))}>
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-semibold">{qty}</span>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600" onClick={() => setQty(q => q+1)}>
              <Plus size={14} />
            </button>
          </div>
          <p className="text-xs text-zinc-400">Còn <strong className="text-zinc-600">12</strong> sản phẩm</p>
        </div>

        {/* CTA buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleBuy}
            className="w-full h-12 bg-[#ff6b00] hover:bg-[#e85f00] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-200 active:scale-[0.99]"
          >
            <Zap size={16} fill="white" strokeWidth={0} /> MUA NGAY
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleAdd}
              className="h-11 border-2 border-[#ff6b00] text-[#ff6b00] hover:bg-orange-50 font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingCart size={15} /> Thêm vào giỏ
            </button>
            <button
              onClick={() => window.open("tel:18009999")}
              className="h-11 border-2 border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone size={14} /> Tư vấn
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
          {[
            { icon: <Shield size={15} className="text-emerald-600" />, text: "Bảo hành 24 tháng" },
            { icon: <Truck size={15} className="text-blue-500" />, text: "Miễn phí giao hàng" },
            { icon: <CreditCard size={15} className="text-purple-500" />, text: "Trả góp 0% lãi" },
            { icon: <RotateCcw size={15} className="text-amber-500" />, text: "Đổi trả 30 ngày" },
          ].map(b => (
            <div key={b.text} className="flex items-center gap-2">
              <div className="w-7 h-7 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0">{b.icon}</div>
              <span className="text-[11px] text-zinc-600 font-medium leading-tight">{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Promo card */}
      <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Gift size={15} className="text-[#ff6b00]" />
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Quà tặng kèm</span>
        </div>
        <ul className="space-y-2">
          {["Thẻ nhớ SanDisk Extreme Pro 64GB", "Túi đựng máy ảnh cao cấp", "Ưu đãi khoá học nhiếp ảnh online"].map(item => (
            <li key={item} className="flex items-center gap-2 text-xs text-zinc-600">
              <Check size={12} className="text-[#ff6b00] shrink-0" /> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Delivery + info */}
      <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-4 space-y-3 text-xs">
        {[
          { icon: <Truck size={14} className="text-blue-500 shrink-0" />, text: "Giao trong ngày tại HN & HCM (đặt trước 15h)" },
          { icon: <Clock size={14} className="text-zinc-400 shrink-0" />, text: "Tỉnh thành khác 1-3 ngày làm việc" },
          { icon: <MapPin size={14} className="text-zinc-400 shrink-0" />, text: "Có thể nhận tại 32 cửa hàng toàn quốc" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-2 text-zinc-600">{icon}{text}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STICKY TABS
// ═══════════════════════════════════════════════════════════════

const TABS = [
  { id: "description", label: "Mô tả" },
  { id: "specs",       label: "Thông số KT" },
  { id: "inbox",       label: "Trong hộp" },
  { id: "photos",      label: "Ảnh mẫu" },
  { id: "reviews",     label: "Đánh giá (124)" },
  { id: "faq",         label: "Q&A" },
];

function StickyTabs({ activeTab, onTab }: { activeTab: string; onTab: (id: string) => void }) {
  return (
    <div className="bg-white border-b border-black/[0.06] sticky top-[128px] z-30 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => onTab(t.id)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === t.id
                  ? "border-[#ff6b00] text-[#ff6b00]"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTIONS
// ═══════════════════════════════════════════════════════════════

function DescSection() {
  return (
    <section id="description" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <SectionTag>Giới thiệu</SectionTag>
      <SectionTitle>Canon EOS R50 — Mirrorless kế thừa truyền thống EOS</SectionTitle>
      <div className="mt-6 grid md:grid-cols-2 gap-8 text-sm text-zinc-600 leading-relaxed">
        <div className="space-y-4">
          <p>
            Canon EOS R50 đánh dấu bước tiến quan trọng trong dòng mirrorless APS-C ngàm RF. Với khung nhỏ gọn chỉ 370g và thiết kế ergonomic tinh tế, R50 mang lại trải nghiệm cầm nắm thoải mái cho những buổi chụp dài ngày.
          </p>
          <p>
            Trái tim của R50 là cảm biến APS-C 24.2MP thế hệ mới kết hợp bộ vi xử lý DIGIC X tích hợp AI. Hệ thống Eye AF + Animal AF hoạt động real-time với độ chính xác cao, đảm bảo nét tuyệt đối ngay cả trong điều kiện ánh sáng thách thức.
          </p>
          <p>
            Burst shooting lên tới 15fps với AF/AE liên tục — hoàn hảo cho thể thao, trẻ em và thú cưng. Ra mắt với tính năng cách mạng <strong className="text-zinc-800">Dual Pixel IS II 5 trục</strong>, ảnh và video đều cực kỳ ổn định dù cầm tay.
          </p>
        </div>
        <div className="space-y-4">
          <p>
            Quay phim 4K không cắt xén với IS ổn định nâng cao. Màn hình 3" vari-angle cảm ứng giúp thực hiện mọi góc quay sáng tạo — selfie, overhead, low angle đều dễ dàng. Kết nối Wi-Fi 5GHz và Bluetooth 5.0 để truyền ảnh nhanh và điều khiển từ xa.
          </p>
          <div className="grid grid-cols-2 gap-2.5 mt-2">
            {[
              "24.2MP APS-C CMOS mới",
              "4K không crop + IS II 5 trục",
              "Eye AF / Animal AF / Vehicle AF",
              "Burst 15fps AF/AE liên tục",
              "3\" vari-angle touch LCD",
              "Wi-Fi 5GHz + Bluetooth 5.0",
            ].map(f => (
              <div key={f} className="flex items-start gap-2 bg-zinc-50 rounded-xl px-3 py-2.5">
                <Check size={13} className="text-[#ff6b00] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-zinc-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecsSection() {
  return (
    <section id="specs" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-zinc-100">
        <SectionTag>Kỹ thuật</SectionTag>
        <SectionTitle>Thông số kỹ thuật chi tiết</SectionTitle>
      </div>
      <div className="divide-y divide-zinc-100">
        {SPECS.map(group => (
          <div key={group.group}>
            <div className="bg-zinc-50 px-8 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{group.group}</span>
            </div>
            {group.rows.map(([label, val], i) => (
              <div key={label} className={`flex px-8 py-3 text-sm gap-4 ${i % 2 === 0 ? "" : "bg-zinc-50/40"}`}>
                <span className="w-[200px] shrink-0 font-medium text-zinc-600">{label}</span>
                <span className="text-zinc-800">{val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function InBoxSection() {
  return (
    <section id="inbox" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <SectionTag>Phụ kiện đi kèm</SectionTag>
      <SectionTitle>Trong hộp bao gồm</SectionTitle>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {IN_BOX.map((item, i) => (
          <div key={i} className="flex gap-3 items-start p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm text-zinc-500">
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-800 leading-snug">{item.name}</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">× {item.qty}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SamplePhotosSection() {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <section id="photos" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <SectionTag>Thực tế</SectionTag>
      <SectionTitle>Ảnh mẫu thực tế từ R50</SectionTitle>
      <p className="text-sm text-zinc-500 mt-1 mb-6">Chụp bằng Canon EOS R50 + RF-S 18-45mm, không qua xử lý hậu kỳ</p>

      <div className="grid grid-cols-3 gap-3">
        {SAMPLE_PHOTOS.map((p, i) => (
          <button
            key={i}
            onClick={() => setSel(p.url)}
            className={`relative rounded-2xl overflow-hidden bg-zinc-100 group ${i === 0 || i === 4 ? "col-span-2" : ""}`}
          >
            <img src={p.url} alt={p.label} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
              {p.label}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {sel && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center" onClick={() => setSel(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
            <X size={18} />
          </button>
          <img src={sel} alt="" className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl" />
        </div>
      )}
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-zinc-100">
        <SectionTag>So sánh</SectionTag>
        <SectionTitle>So sánh với đối thủ cùng phân khúc</SectionTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-8 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider w-[180px]">Thông số</th>
              {COMPARE_DATA.cols.map((col, i) => (
                <th key={col} className={`px-6 py-4 text-center text-sm font-bold ${i === 0 ? "text-[#ff6b00] bg-orange-50/60" : "text-zinc-700"}`}>
                  {i === 0 && <span className="inline-block text-[10px] bg-[#ff6b00] text-white px-1.5 py-0.5 rounded-full mb-1">Đang xem</span>}
                  <br />{col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_DATA.rows.map((row, ri) => (
              <tr key={row.label} className={ri % 2 === 0 ? "bg-zinc-50/60" : ""}>
                <td className="px-8 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{row.label}</td>
                {row.vals.map((val, vi) => (
                  <td key={vi} className={`px-6 py-3.5 text-center text-sm ${vi === 0 ? "font-semibold text-[#ff6b00] bg-orange-50/60" : "text-zinc-600"}`}>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AccessoriesSection() {
  const { addItem } = useCart();
  return (
    <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <SectionTag>Phụ kiện</SectionTag>
          <SectionTitle>Phụ kiện phổ biến cho R50</SectionTitle>
        </div>
        <a href="#" className="text-sm text-[#ff6b00] hover:underline flex items-center gap-1">Xem thêm <ArrowRight size={14} /></a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {ACCESSORIES.map(a => (
          <div key={a.id} className="group border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-orange-100 transition-all">
            <div className="aspect-square bg-zinc-50 overflow-hidden">
              <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
            </div>
            <div className="p-3">
              <p className="text-xs text-zinc-700 font-medium line-clamp-2 mb-2 min-h-[32px]">{a.name}</p>
              <p className="text-sm font-bold text-[#ff6b00] mb-2">{fmt(a.price)}</p>
              <button
                onClick={() => addItem({ id: a.id, name: a.name, price: a.price, image: a.img })}
                className="w-full text-xs py-1.5 border border-[#ff6b00] text-[#ff6b00] rounded-lg hover:bg-orange-50 transition-colors font-medium"
              >
                + Thêm giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedSection() {
  return (
    <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <SectionTag>Gợi ý</SectionTag>
          <SectionTitle>Sản phẩm liên quan</SectionTitle>
        </div>
        <a href="#" className="text-sm text-[#ff6b00] hover:underline flex items-center gap-1">Xem thêm <ArrowRight size={14} /></a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {RELATED.map(p => (
          <Link key={p.id} to="/product/canon-eos-r50" className="group border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-orange-100 transition-all">
            <div className="aspect-square bg-zinc-50 overflow-hidden relative">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
              <span className="absolute top-2.5 right-2.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                -{discPct(p.orig, p.price)}%
              </span>
            </div>
            <div className="p-3.5">
              <p className="text-xs font-medium text-zinc-800 line-clamp-2 mb-2 min-h-[32px]">{p.name}</p>
              <Stars rating={p.rating} size={11} />
              <p className="text-sm font-bold text-[#ff6b00] mt-1.5">{fmt(p.price)}</p>
              <p className="text-[11px] text-zinc-400 line-through">{fmt(p.orig)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection() {
  const total = REVIEWS.length;
  const avg = 4.8;
  const dist = [0, 2, 6, 22, 94];  // 1–5 stars

  return (
    <section id="reviews" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <SectionTag>Đánh giá</SectionTag>
      <SectionTitle>Đánh giá từ khách hàng (124)</SectionTitle>

      {/* Summary */}
      <div className="mt-6 flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-zinc-100">
        <div className="flex flex-col items-center justify-center gap-2 shrink-0 w-36">
          <span className="text-6xl font-black text-zinc-900">{avg}</span>
          <Stars rating={avg} size={16} />
          <span className="text-xs text-zinc-400">{total} đánh giá</span>
        </div>
        <div className="flex-1 space-y-2">
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs w-3 text-zinc-500 shrink-0">{star}</span>
              <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${(dist[star-1] / 124) * 100}%` }}
                />
              </div>
              <span className="text-xs text-zinc-400 w-7 text-right shrink-0">{dist[star-1]}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button className="h-10 px-5 bg-[#ff6b00] hover:bg-[#e85f00] text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2">
            <MessageCircle size={14} /> Viết đánh giá
          </button>
          <p className="text-[10px] text-zinc-400 text-center">Chỉ người mua mới được đánh giá</p>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {REVIEWS.map((r, i) => (
          <div key={i} className="pb-6 border-b border-zinc-100 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800">{r.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Stars rating={r.rating} size={11} />
                    {r.verified && (
                      <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                        <Check size={9} /> Đã mua
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs text-zinc-400 shrink-0">{r.date}</span>
            </div>
            <p className="text-sm font-semibold text-zinc-800 mb-1">{r.title}</p>
            <p className="text-sm text-zinc-500 leading-relaxed">{r.body}</p>
            <button className="mt-2.5 text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1">
              <ThumbsUp size={11} /> Hữu ích ({r.helpful})
            </button>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-3 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
        Xem thêm 121 đánh giá <ChevronDown size={14} />
      </button>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8">
      <SectionTag>Hỏi đáp</SectionTag>
      <SectionTitle>Câu hỏi thường gặp</SectionTitle>
      <div className="mt-6 space-y-2">
        {FAQS.map((f, i) => (
          <div key={i} className={`rounded-2xl border transition-colors ${open === i ? "border-orange-200 bg-orange-50/50" : "border-zinc-100 bg-zinc-50/50"}`}>
            <button
              className="w-full flex items-start justify-between gap-4 p-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-semibold text-zinc-800 leading-snug">{f.q}</span>
              <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${open === i ? "bg-[#ff6b00] text-white" : "bg-zinc-200 text-zinc-500"}`}>
                {open === i ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <p className="text-sm text-zinc-600 leading-relaxed">{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function GuaranteesSection() {
  return (
    <section className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,0,0.15),_transparent_60%)]" />
      <div className="relative z-10">
        <SectionTag><span className="text-orange-400">Cam kết</span></SectionTag>
        <SectionTitle><span className="text-white">Dịch vụ đi kèm từ LensPro</span></SectionTitle>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Shield size={24} />, title: "Bảo hành 24 tháng", sub: "Chính hãng Canon Vietnam\nThêm 6 tháng từ LensPro" },
            { icon: <RotateCcw size={24} />, title: "Đổi trả 30 ngày", sub: "Không câu hỏi\nHoàn tiền 100%" },
            { icon: <Truck size={24} />, title: "Ship nhanh trong ngày", sub: "HN & HCM đặt trước 15h\nGiao hàng miễn phí" },
            { icon: <Headphones size={24} />, title: "Hỗ trợ kỹ thuật", sub: "Hotline 1800 9999\nHỗ trợ trọn đời" },
          ].map(g => (
            <div key={g.title} className="bg-white/5 hover:bg-white/10 rounded-2xl p-5 transition-colors">
              <div className="w-10 h-10 bg-[#ff6b00]/20 rounded-xl flex items-center justify-center text-[#ff6b00] mb-4">
                {g.icon}
              </div>
              <p className="font-bold text-sm text-white mb-1.5">{g.title}</p>
              {g.sub.split("\n").map(line => (
                <p key={line} className="text-xs text-zinc-400 leading-relaxed">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandSection() {
  return (
    <section className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="p-8 flex flex-col justify-center">
          <SectionTag>Về thương hiệu</SectionTag>
          <SectionTitle>Canon — Tiên phong nhiếp ảnh 87 năm</SectionTitle>
          <p className="text-sm text-zinc-500 leading-relaxed mt-4">
            Từ 1937, Canon đã không ngừng tiên phong trong công nghệ quang học và điện tử tiêu dùng. Dòng EOS — ra mắt năm 1987 — trở thành hệ thống máy ảnh bán chạy nhất thế giới, vượt mốc 100 triệu máy vào 2021.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed mt-3">
            EOS R50 kế thừa tất cả DNA đó trong một thân máy hiện đại nhất, nhỏ nhất của hệ sinh thái ngàm RF — một hệ sinh thái đang tăng trưởng mạnh nhất trong phân khúc mirrorless hiện nay.
          </p>
          <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff6b00] hover:gap-3 transition-all">
            Khám phá Canon Vietnam <ArrowRight size={14} />
          </a>
        </div>
        <div className="bg-zinc-900 relative min-h-[280px]">
          <img
            src="https://images.unsplash.com/photo-1603208234872-619ffa1209cb?w=700&q=85&auto=format&fit=crop"
            alt="Canon cameras"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/60 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-1 text-white/60">Thống kê toàn cầu</p>
            <div className="flex gap-6">
              <div><p className="text-2xl font-black text-white">100M+</p><p className="text-xs text-white/60">Máy ảnh EOS</p></div>
              <div><p className="text-2xl font-black text-white">87</p><p className="text-xs text-white/60">Năm thành lập</p></div>
              <div><p className="text-2xl font-black text-white">#1</p><p className="text-xs text-white/60">Thị phần mirrorless</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// BREADCRUMB
// ═══════════════════════════════════════════════════════════════

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-zinc-400 py-4">
      <Link to="/" className="hover:text-[#ff6b00] transition-colors">Trang chủ</Link>
      <ChevronRight size={11} className="text-zinc-300" />
      <Link to="/" className="hover:text-[#ff6b00] transition-colors">Máy ảnh</Link>
      <ChevronRight size={11} className="text-zinc-300" />
      <Link to="/" className="hover:text-[#ff6b00] transition-colors">Canon</Link>
      <ChevronRight size={11} className="text-zinc-300" />
      <Link to="/" className="hover:text-[#ff6b00] transition-colors">Canon EOS R50</Link>
      <ChevronRight size={11} className="text-zinc-300" />
      <span className="text-zinc-700 font-medium">Canon EOS R50 (Black) Kit 18-45mm</span>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const scrollTo = useCallback((id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 200; // header + tabs
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="bg-[#f8f8f8] pb-16">
      <div className="max-w-[1440px] mx-auto px-8">
        <Breadcrumb />
      </div>

      {/* ── HERO: 55/45 grid ─────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-8 pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-[55fr_45fr] gap-6 items-start">
          <Gallery />
          <PurchaseCard />
        </div>
      </div>

      {/* ── STICKY TABS ──────────────────────────────── */}
      <StickyTabs activeTab={activeTab} onTab={scrollTo} />

      {/* ── SECTIONS ─────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-8 mt-8 space-y-4">
        <DescSection />
        <SpecsSection />
        <InBoxSection />
        <SamplePhotosSection />
        <ComparisonSection />
        <AccessoriesSection />
        <RelatedSection />
        <ReviewsSection />
        <FAQSection />
        <GuaranteesSection />
        <BrandSection />
      </div>
    </div>
  );
}
