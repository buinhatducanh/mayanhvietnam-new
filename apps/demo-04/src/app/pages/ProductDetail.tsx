import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ShoppingCart, Heart, ChevronRight, Star, Shield, Truck, RotateCcw, Zap, CheckCircle, Package } from "lucide-react";
import { useTheme } from "../context";
import { ACCENT, vnd, PRODUCTS } from "../data";
import { Stars, Chip, ProductCard } from "../components/ui";

const FAKE_REVIEWS = [
  { name: "Nguyễn Văn An", date: "10/06/2025", rating: 5, text: "Sản phẩm chính hãng, đóng gói cẩn thận. Giao hàng nhanh, nhân viên tư vấn nhiệt tình. Sẽ ủng hộ shop dài dài!", verified: true },
  { name: "Trần Thị Bích", date: "02/06/2025", rating: 5, text: "Mình mua lần 2 rồi, lần nào cũng hài lòng. Giá tốt hơn nhiều so với ngoài thị trường, có tem chính hãng đầy đủ.", verified: true },
  { name: "Lê Minh Khoa", date: "28/05/2025", rating: 4, text: "Sản phẩm ok, đúng như mô tả. Chỉ tiếc giao hàng hơi chậm 1 ngày so với dự kiến, nhưng nói chung vẫn ổn.", verified: false },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dark } = useTheme();
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [qty, setQty] = useState(1);

  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold">Không tìm thấy sản phẩm</p>
        <button onClick={() => navigate("/san-pham")} className="px-6 py-3 rounded-xl text-white font-semibold" style={{ background: ACCENT }}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const disc = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const related = PRODUCTS.filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category)).slice(0, 4);
  const TABS = ["Mô tả sản phẩm", "Thông số kỹ thuật", `Đánh giá (${product.reviews})`];

  const thumbs = product.thumbs.length > 0 ? product.thumbs : [product.img];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border" style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-3 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">Trang chủ</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate("/san-pham")} className="hover:text-foreground transition-colors">Sản phẩm</button>
          <ChevronRight size={12} />
          <span style={{ color: ACCENT }}>{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[60px_1fr_400px] gap-0 lg:gap-8">

            {/* Thumbnail strip — desktop */}
            <div className="hidden lg:flex flex-col gap-2 pt-2">
              {thumbs.map((src, i) => (
                <button key={i} onClick={() => setActiveThumb(i)}
                  className="w-12 h-12 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200"
                  style={i === activeThumb
                    ? { borderColor: ACCENT, boxShadow: dark ? "0 0 12px rgba(255,107,53,0.55)" : "0 0 8px rgba(255,107,53,0.3)" }
                    : { borderColor: "transparent", opacity: 0.38 }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Product image with pedestal */}
            <div className="relative flex items-center justify-center rounded-2xl border border-border overflow-hidden mb-6 lg:mb-0"
              style={{ minHeight: 420, background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.7)" }}>
              {/* Ambient glow */}
              {dark && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(255,107,53,0.16) 0%, transparent 70%)" }} />
              )}
              {/* Pedestal glow */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: 340, height: 80, background: dark ? "radial-gradient(ellipse, rgba(255,107,53,0.72) 0%, transparent 72%)" : "radial-gradient(ellipse, rgba(255,107,53,0.18) 0%, transparent 68%)", filter: "blur(22px)" }} />
              {dark && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ width: 230, height: 12, background: "radial-gradient(ellipse, rgba(255,150,60,1) 0%, rgba(255,100,20,0.6) 50%, transparent 100%)", filter: "blur(5px)" }} />
              )}
              <img
                key={activeThumb}
                src={thumbs[activeThumb].replace("w=120&h=120", "w=700&h=700")}
                alt={product.name}
                className="relative z-10 object-contain p-8 select-none"
                style={{
                  maxWidth: 480, width: "100%",
                  filter: dark ? "drop-shadow(0 20px 60px rgba(255,107,53,0.32)) drop-shadow(0 4px 20px rgba(255,80,20,0.2))" : "drop-shadow(0 20px 48px rgba(0,0,0,0.15))",
                  transition: "filter 0.3s ease",
                }}
              />
              {/* Thumbnail row — mobile */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {thumbs.map((src, i) => (
                  <button key={i} onClick={() => setActiveThumb(i)}
                    className="w-9 h-9 rounded-lg overflow-hidden border-2 transition-all"
                    style={i === activeThumb ? { borderColor: ACCENT } : { borderColor: "transparent", opacity: 0.4 }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right panel — info */}
            <div className="flex flex-col gap-5">
              {/* Badge + category */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.badge && <Chip label={product.badge} />}
                {disc && <Chip label={`-${disc}%`} />}
                <span className="text-[10px] font-mono text-muted-foreground border border-border rounded-sm px-2 py-0.5">{product.category}</span>
              </div>

              {/* Title */}
              <div>
                <p className="text-[11px] font-mono font-bold tracking-[0.18em] text-muted-foreground uppercase mb-1">{product.brand}</p>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2.5">
                <Stars rating={product.rating} size={13} />
                <span className="text-sm font-mono font-bold">{product.rating}</span>
                <span className="text-xs text-muted-foreground font-mono">({product.reviews} đánh giá)</span>
                <span className="text-[10px] font-mono text-emerald-500 font-semibold">· Còn hàng</span>
              </div>

              {/* Price */}
              <div className="p-4 rounded-2xl border border-border" style={{ background: dark ? "rgba(255,107,53,0.05)" : "rgba(255,107,53,0.04)" }}>
                <p className="text-3xl font-mono font-black" style={{ color: ACCENT }}>{vnd(product.price)}</p>
                {product.originalPrice && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-mono text-muted-foreground line-through">{vnd(product.originalPrice)}</span>
                    <span className="text-xs font-mono font-bold text-emerald-500">Tiết kiệm {vnd(product.originalPrice - product.price)}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5">
                {product.features.map(f => (
                  <span key={f} className="text-[10px] font-mono border border-border rounded-lg px-2.5 py-1 flex items-center gap-1">
                    <CheckCircle size={9} style={{ color: ACCENT }} /> {f}
                  </span>
                ))}
              </div>

              {/* Qty + CTAs */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-muted/50 transition-colors">−</button>
                  <span className="w-10 text-center text-sm font-mono font-bold">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-muted/50 transition-colors">+</button>
                </div>
                <button className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: ACCENT, boxShadow: dark ? "0 0 28px rgba(255,107,53,0.45)" : "0 4px 20px rgba(255,107,53,0.3)" }}>
                  <ShoppingCart size={15} /> Thêm vào giỏ
                </button>
                <button className="w-11 h-11 rounded-xl border border-border flex items-center justify-center hover:border-[rgba(255,107,53,0.5)] transition-colors flex-shrink-0">
                  <Heart size={16} />
                </button>
              </div>
              <button className="w-full py-3 rounded-xl font-bold text-sm border-2 hover:opacity-80 transition-all"
                style={{ borderColor: ACCENT, color: ACCENT }}>
                Mua ngay — {vnd(product.price * qty)}
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Shield,   text: "Bảo hành chính hãng 24T" },
                  { icon: Truck,    text: "Miễn phí giao hàng toàn quốc" },
                  { icon: RotateCcw,text: "Đổi trả trong 30 ngày" },
                  { icon: Zap,      text: "Thanh toán bảo mật 100%" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono p-2.5 rounded-xl border border-border"
                    style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)" }}>
                    <Icon size={12} style={{ color: ACCENT }} className="flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* In-box quick */}
              <div className="text-xs text-muted-foreground p-3 rounded-xl border border-border" style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.5)" }}>
                <p className="font-semibold text-foreground mb-2 flex items-center gap-1.5"><Package size={12} style={{ color: ACCENT }} />Trong hộp gồm</p>
                <ul className="flex flex-col gap-1">
                  {product.inBox.slice(0, 4).map(item => <li key={item} className="flex items-center gap-1.5"><span style={{ color: ACCENT }}>·</span>{item}</li>)}
                  {product.inBox.length > 4 && <li className="text-muted-foreground">+{product.inBox.length - 4} phụ kiện khác</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="pt-10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 text-xs font-semibold whitespace-nowrap rounded-full transition-all border ${activeTab === i ? 'border-transparent' : 'border-border/50 hover:border-border'}`}
                style={activeTab === i
                  ? { background: ACCENT, color: "#fff", boxShadow: dark ? "0 4px 14px rgba(255,107,53,0.35)" : "0 4px 12px rgba(255,107,53,0.2)" }
                  : { background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", color: dark ? "#a19cad" : "#5a4030" }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 0 && (
              <div className="max-w-3xl space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  {product.features.map(f => (
                    <div key={f} className="flex items-center gap-3 p-3 rounded-xl border border-border"
                      style={{ background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.65)" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,53,0.12)" }}>
                        <CheckCircle size={14} style={{ color: ACCENT }} />
                      </div>
                      <span className="text-xs font-semibold">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="max-w-2xl">
                <div className="rounded-2xl border border-border overflow-hidden">
                  {product.specs.map((spec, i) => (
                    <div key={spec.label} className="flex items-center border-b border-border last:border-0"
                      style={{ background: i % 2 === 0 ? (dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.018)") : "transparent" }}>
                      <div className="w-44 px-4 py-3 flex-shrink-0 border-r border-border">
                        <p className="text-[11px] font-mono font-semibold text-muted-foreground">{spec.label}</p>
                      </div>
                      <p className="px-4 py-3 text-xs font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-6 p-5 rounded-2xl border border-border mb-6"
                  style={{ background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.65)" }}>
                  <div className="text-center">
                    <p className="text-5xl font-mono font-black" style={{ color: ACCENT }}>{product.rating}</p>
                    <Stars rating={product.rating} size={14} />
                    <p className="text-[10px] font-mono text-muted-foreground mt-1">{product.reviews} đánh giá</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] font-mono w-2">{star}</span>
                        <Star size={10} fill={ACCENT} style={{ color: ACCENT }} />
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
                          <div className="h-full rounded-full" style={{ width: `${star===5?78:star===4?14:star===3?5:2}%`, background: ACCENT }} />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground w-6">{star===5?"78%":star===4?"14%":star===3?"5%":"2%"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {FAKE_REVIEWS.map((r, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-border" style={{ background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.65)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm text-white flex-shrink-0"
                          style={{ background: ACCENT }}>{r.name[0]}</div>
                        <div>
                          <p className="text-xs font-semibold flex items-center gap-1.5">
                            {r.name}
                            {r.verified && <span className="text-[9px] font-mono text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded-sm">Đã mua</span>}
                          </p>
                          <p className="text-[10px] font-mono text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      <Stars rating={r.rating} size={11} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Post / Article Section */}
      <section className="py-16 border-t border-border" style={{ background: dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" }}>
        <div className="max-w-[800px] mx-auto px-5 sm:px-8">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-3">Bài viết chi tiết</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">Khám phá sức mạnh của {product.name}</h2>
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1"><Star size={12} style={{ color: ACCENT }}/> Biên tập bởi Commerce Observer</span>
              <span>•</span>
              <span>10 phút đọc</span>
            </div>
          </div>
          
          <article className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm sm:text-base space-y-6">
            <p>
              Trong thế giới nhiếp ảnh không ngừng đổi mới, <strong>{product.name}</strong> từ thương hiệu <strong>{product.brand}</strong> xuất hiện như một minh chứng cho sự giao thoa hoàn hảo giữa công nghệ hiện đại và nghệ thuật kể chuyện. Được thiết kế dành cho cả dân chuyên nghiệp lẫn những người đam mê sáng tạo nội dung, thiết bị này không chỉ là một công cụ, mà là một người bạn đồng hành đáng tin cậy.
            </p>
            
            <div className="my-10 rounded-2xl overflow-hidden border border-border shadow-sm">
              <img src={product.img.replace("w=800", "w=1200")} alt="Product showcase" className="w-full h-auto object-cover max-h-[500px]" />
            </div>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Thiết kế công thái học và độ bền bỉ</h3>
            <p>
              Cảm giác cầm nắm {product.name} thực sự khác biệt. Khung máy được tinh chỉnh để ôm sát tay người dùng, giúp thao tác thoải mái trong suốt các buổi chụp dài. Hệ thống chống thời tiết được nâng cấp, cho phép bạn tự tin tác nghiệp dưới những cơn mưa phùn hay môi trường nhiều bụi bẩn.
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Hiệu suất lấy nét đỉnh cao</h3>
            <p>
              Điểm sáng giá nhất trên dòng sản phẩm này chính là hệ thống lấy nét tự động được AI hỗ trợ. Dù bạn đang chụp thể thao, động vật hoang dã hay chân dung nghệ thuật, thuật toán thông minh sẽ tự động nhận diện và theo sát chủ thể với độ chính xác kinh ngạc. Khả năng chụp liên tiếp tốc độ cao đảm bảo bạn không bỏ lỡ bất kỳ khoảnh khắc quý giá nào.
            </p>

            <blockquote className="my-8 p-6 border-l-4 rounded-r-xl" style={{ borderColor: ACCENT, background: dark ? "rgba(255,107,53,0.05)" : "rgba(255,107,53,0.04)" }}>
              <p className="text-lg italic font-medium text-foreground m-0">
                "Trải nghiệm Immersive Commerce cho thấy {product.name} không chỉ đẹp trên thông số, mà thực sự là một kiệt tác cơ khí."
              </p>
            </blockquote>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Chất lượng hình ảnh không khoan nhượng</h3>
            <p>
              Sự kết hợp giữa cảm biến thế hệ mới và chip xử lý hình ảnh mạnh mẽ mang lại dải nhạy sáng rộng và khả năng khử nhiễu tuyệt vời ở ISO cao. Màu sắc được tái tạo trung thực, giữ được độ sâu và chi tiết trong cả vùng tối lẫn vùng sáng. Dù quay video RAW hay chụp ảnh tĩnh, {product.name} đều đáp ứng những tiêu chuẩn khắt khe nhất của ngành công nghiệp.
            </p>
          </article>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-12 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
            <div className="mb-7">
              <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground uppercase mb-1.5">Gợi ý</p>
              <h2 className="text-2xl font-bold tracking-tight">Sản phẩm liên quan</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {related.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
