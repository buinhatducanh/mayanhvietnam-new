import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Eye, Star, Camera, Aperture, Wind, Zap } from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";

/* ─── helpers ─────────────────────────────────────────────────── */
const fmt = (n: number) => n.toLocaleString("vi-VN") + "₫";

const cameras = PRODUCTS.filter((p) => p.category === "camera").slice(0, 10);
const lenses  = PRODUCTS.filter((p) => p.category === "lens").slice(0, 10);
const drones  = PRODUCTS.filter((p) => p.category === "drone").slice(0, 10);
const accs    = PRODUCTS.filter((p) => p.category === "acc").slice(0, 10);

/* ─── Banner slides ───────────────────────────────────────────── */
interface BannerImg {
  id: number;
  img: string;
  alt: string;
  link?: string;
  objectPosition?: string;
}

const CAM_SLIDES: BannerImg[] = [
  { id: 1, img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Canon EOS R5 Mark II", objectPosition: "center 30%" },
  { id: 2, img: "https://images.unsplash.com/photo-1549424163-0a584d010aed?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Sony Alpha Mirrorless", objectPosition: "center 40%" },
  { id: 3, img: "https://images.unsplash.com/photo-1614746480983-377658e91422?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Nikon Z8 Professional", objectPosition: "center 35%" },
];
const LENS_SLIDES: BannerImg[] = [
  { id: 1, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Canon RF Telephoto", objectPosition: "center 40%" },
  { id: 2, img: "https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Sigma Art Lens", objectPosition: "center 50%" },
  { id: 3, img: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Sony GM Lenses", objectPosition: "center 35%" },
];
const DRONE_SLIDES: BannerImg[] = [
  { id: 1, img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1400&h=500&fit=crop&auto=format&q=90", alt: "DJI Mavic 3 Pro", objectPosition: "center 45%" },
  { id: 2, img: "https://images.unsplash.com/photo-1488263590619-bc1fff43b6c1?w=1400&h=500&fit=crop&auto=format&q=90", alt: "DJI Air 3 Flight", objectPosition: "center 30%" },
  { id: 3, img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&h=500&fit=crop&auto=format&q=90", alt: "DJI Mini 4 Pro", objectPosition: "center 40%" },
];
const ACC_SLIDES: BannerImg[] = [
  { id: 1, img: "https://images.unsplash.com/photo-1648740678671-c37d78567ea8?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Godox Flash Studio", objectPosition: "center 40%" },
  { id: 2, img: "https://images.unsplash.com/photo-1617463874381-85b513b3e991?w=1400&h=500&fit=crop&auto=format&q=90", alt: "DJI RS3 Gimbal", objectPosition: "center 35%" },
  { id: 3, img: "https://images.unsplash.com/photo-1545254000-6c843440c5cd?w=1400&h=500&fit=crop&auto=format&q=90", alt: "Benro Carbon Tripod", objectPosition: "center 40%" },
];

/* ─── BannerSlider ────────────────────────────────────────────── */
function BannerSlider({ slides }: { slides: BannerImg[] }) {
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => go(1), 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const go = (dir: 1 | -1) => {
    setAnim(true);
    setTimeout(() => {
      setCur((c) => (c + dir + slides.length) % slides.length);
      setAnim(false);
    }, 280);
    startTimer();
  };

  const s = slides[cur];

  return (
    <div className="relative w-full h-[435px] overflow-hidden rounded-sm group">
      <img
        key={s.id}
        src={s.img}
        alt={s.alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${anim ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"}`}
        style={{ objectPosition: s.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-[35%] h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12"
          style={{ animation: "sectionSweep 5s ease-in-out infinite 0.5s" }} />
        <div className="absolute inset-0 w-[15%] h-full bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12"
          style={{ animation: "sectionSweep 5s ease-in-out infinite 1.8s" }} />
      </div>
      <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/10 pointer-events-none" />

      <button onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
        <ChevronLeft size={20} />
      </button>
      <button onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setCur(i); startTimer(); }}
            className={`h-1.5 rounded-full transition-all ${i === cur ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}

/* ─── Stars ───────────────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={10} className={i <= n ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"} />
      ))}
    </span>
  );
}

/* ─── ProductCard ─────────────────────────────────────────────── */
function ProductCard({ p, dark }: { p: Product; dark?: boolean }) {
  const [wished, setWished] = useState(false);
  const cardBg  = dark ? "bg-[#181d2a] border-[#2a3050]" : "bg-white border-gray-100";
  const nameClr = dark ? "text-gray-100" : "text-gray-800";
  const metaClr = dark ? "text-gray-400" : "text-gray-500";
  const priceClr = dark ? "text-orange-400" : "text-orange-600";
  const oldClr  = dark ? "text-gray-500" : "text-gray-400";

  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;

  return (
    <div className={`group relative flex flex-col border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${cardBg}`}>
      {p.badge && (
        <span className={`absolute top-2 left-2 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded
          ${p.badge === "NEW" ? "bg-emerald-500 text-white" :
            p.badge === "SALE" ? "bg-rose-500 text-white" :
            p.badge === "HOT" ? "bg-orange-500 text-white" :
            p.badge === "LIMITED" ? "bg-purple-600 text-white" :
            p.badge === "PRO" ? "bg-[#1a1a2e] text-white" :
            "bg-gray-500 text-white"}`}>
          {p.badge}
        </span>
      )}

      <button onClick={() => setWished(!wished)}
        className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
        <Heart size={13} className={wished ? "fill-rose-500 text-rose-500" : "text-gray-400"} />
      </button>

      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img src={p.img} alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity gap-2">
          <button className="flex items-center gap-1 text-[11px] font-semibold bg-white text-gray-800 px-3 py-1.5 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
            <Eye size={11} /> Xem nhanh
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-3 flex-1">
        <p className={`text-[10px] font-medium uppercase tracking-wide ${metaClr}`}>{p.categoryLabel}</p>
        <h3 className={`text-xs font-semibold leading-snug line-clamp-2 ${nameClr}`}>{p.name}</h3>

        <div className="flex items-center gap-1 mt-0.5">
          <Stars n={p.rating} />
          <span className={`text-[10px] ${metaClr}`}>({p.reviews})</span>
        </div>

        <div className="mt-auto pt-2 flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-bold ${priceClr}`}>{fmt(p.price)}</span>
          {p.oldPrice && (
            <>
              <span className={`text-[10px] line-through ${oldClr}`}>{fmt(p.oldPrice)}</span>
              {discount && <span className="text-[10px] font-bold text-rose-500">-{discount}%</span>}
            </>
          )}
        </div>

        <button className="mt-2 w-full flex items-center justify-center gap-1.5 text-[11px] font-bold bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors">
          <ShoppingCart size={12} /> Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

/* ─── ProductSection ──────────────────────────────────────────── */
interface SectionCfg {
  id: string;
  sectionNum: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  catLink: string;
  slides: BannerImg[];
  products: Product[];
  dark?: boolean;
}

function ProductSection({ id, sectionNum, title, subtitle, icon, catLink, slides, products, dark }: SectionCfg) {
  const bg     = dark ? "bg-[#0f1117]" : "bg-[#f5f5f7]";
  const numClr = dark ? "text-white/4"  : "text-black/4";
  const titleCl = dark ? "text-white"   : "text-[#1a1a2e]";
  const subCl   = dark ? "text-gray-400": "text-gray-500";
  const ruleCl  = dark ? "border-white/10" : "border-gray-200";

  return (
    <section id={id} className={`py-10 ${bg}`}>
      <div className="max-w-[1305px] mx-auto px-4">
        <div className="relative mb-8">
          <BannerSlider slides={slides} />
        </div>

        <div className={`flex items-center justify-between mb-6 border-b pb-4 ${ruleCl}`}>
          <div className="relative flex items-center gap-3">
            <span className={`absolute -left-1 -top-5 text-[88px] font-black leading-none select-none pointer-events-none ${numClr}`}>
              {sectionNum}
            </span>
            <div className="relative z-10 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-orange-500 rounded-md">
                {icon}
              </span>
              <div>
                <h2 className={`text-lg font-extrabold tracking-tight leading-none ${titleCl}`}>{title}</h2>
                <p className={`text-xs mt-0.5 ${subCl}`}>{subtitle}</p>
              </div>
            </div>
          </div>

          <Link to={catLink}
            className="text-xs font-semibold text-orange-500 hover:text-orange-600 border border-orange-500/40 hover:border-orange-500 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Hero Slider ─────────────────────────────────────────────── */
const HERO_SLIDES: BannerImg[] = [
  { id: 1, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&h=620&fit=crop&auto=format&q=90", alt: "Mirrorless Collection", objectPosition: "center 25%" },
  { id: 2, img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&h=620&fit=crop&auto=format&q=90", alt: "Drone Aerial", objectPosition: "center 35%" },
  { id: 3, img: "https://images.unsplash.com/photo-1648740678671-c37d78567ea8?w=1400&h=620&fit=crop&auto=format&q=90", alt: "Studio Lighting", objectPosition: "center 40%" },
];

function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (dir: 1 | -1) => {
    setAnim(true);
    setTimeout(() => { setCur((c) => (c + dir + HERO_SLIDES.length) % HERO_SLIDES.length); setAnim(false); }, 300);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => go(1), 6000);
  };

  useEffect(() => {
    timer.current = setInterval(() => go(1), 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const s = HERO_SLIDES[cur];

  return (
    <div className="relative w-full h-[480px] lg:h-[560px] overflow-hidden group">
      <img key={s.id} src={s.img} alt={s.alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${anim ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"}`}
        style={{ objectPosition: s.objectPosition ?? "center" }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-[35%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          style={{ animation: "sectionSweep 7s ease-in-out infinite 1s" }} />
      </div>

      <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
        <ChevronLeft size={22} />
      </button>
      <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`h-1.5 rounded-full transition-all ${i === cur ? "w-8 bg-orange-400" : "w-2 bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}

/* ─── Category Quick-Nav ──────────────────────────────────────── */
function QuickNav() {
  const items = [
    { label: "Máy ảnh", sub: "Mirrorless & DSLR", icon: <Camera size={22} />, link: "/san-pham?cat=camera", color: "from-orange-500 to-amber-500" },
    { label: "Ống kính", sub: "RF · FE · Z · Art",  icon: <Aperture size={22} />, link: "/san-pham?cat=lens", color: "from-sky-500 to-blue-600" },
    { label: "Drone",    sub: "DJI · Autel",         icon: <Wind size={22} />,     link: "/san-pham?cat=drone", color: "from-violet-500 to-purple-600" },
    { label: "Phụ kiện", sub: "Flash · Gimbal · Bag", icon: <Zap size={22} />,    link: "/san-pham?cat=acc", color: "from-emerald-500 to-green-600" },
  ];

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-[1305px] mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((it) => (
          <Link key={it.label} to={it.link}
            className="group flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
            <span className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${it.color} text-white flex-shrink-0 group-hover:scale-105 transition-transform`}>
              {it.icon}
            </span>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-tight">{it.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{it.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Home ────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div>
      <HeroSlider />
      <QuickNav />

      <ProductSection
        id="may-anh" sectionNum="01" title="MÁY ẢNH" subtitle="Mirrorless & DSLR · Top bán chạy"
        icon={<Camera size={14} className="text-white" />}
        catLink="/san-pham?cat=camera" slides={CAM_SLIDES} products={cameras}
      />

      <ProductSection
        id="ong-kinh" sectionNum="02" title="ỐNG KÍNH" subtitle="Canon RF · Sony FE · Sigma Art"
        icon={<Aperture size={14} className="text-white" />}
        catLink="/san-pham?cat=lens" slides={LENS_SLIDES} products={lenses} dark
      />

      <ProductSection
        id="drone" sectionNum="03" title="DRONE" subtitle="DJI Mavic · Mini · Air · FPV"
        icon={<Wind size={14} className="text-white" />}
        catLink="/san-pham?cat=drone" slides={DRONE_SLIDES} products={drones}
      />

      <ProductSection
        id="phu-kien" sectionNum="04" title="PHỤ KIỆN" subtitle="Đèn Flash · Gimbal · Túi · Rig"
        icon={<Zap size={14} className="text-white" />}
        catLink="/san-pham?cat=acc" slides={ACC_SLIDES} products={accs} dark
      />
    </div>
  );
}
