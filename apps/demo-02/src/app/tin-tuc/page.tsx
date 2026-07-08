import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";

const POSTS = [
  { id:1, tag:"Đánh giá", date:"05/07/2026", title:"Canon EOS R5 Mark II – Siêu phẩm 45MP đáng mong đợi nhất năm 2026", excerpt:"Canon vừa chính thức ra mắt EOS R5 Mark II với cảm biến 45MP, video 8K RAW và khả năng lấy nét AI vượt trội hơn người tiền nhiệm.", img:"https://images.unsplash.com/photo-1549424163-0a584d010aed?w=800&h=500&fit=crop&auto=format", featured:true },
  { id:2, tag:"Hướng dẫn", date:"28/06/2026", title:"5 thiết lập máy ảnh quan trọng giúp ảnh sắc nét hơn ngay lập tức", excerpt:"Dù bạn dùng máy ảnh nào, những thiết lập cơ bản này sẽ giúp ảnh cải thiện đáng kể chỉ trong vài phút.", img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=500&fit=crop&auto=format", featured:false },
  { id:3, tag:"Tin tức", date:"20/06/2026", title:"DJI Mavic 4 Pro lộ diện – Drone tiêu dùng đầu tiên có Hasselblad 1-inch", excerpt:"Theo thông tin rò rỉ, DJI chuẩn bị ra mắt Mavic 4 Pro với khả năng chụp ảnh chuyên nghiệp ở phân khúc tiêu dùng.", img:"https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&h=500&fit=crop&auto=format", featured:false },
  { id:4, tag:"So sánh", date:"15/06/2026", title:"Sony A7 IV vs Canon R6 Mark II: Đâu là lựa chọn tốt hơn trong 2026?", excerpt:"Hai chiếc mirrorless Full Frame phổ biến nhất được so sánh trực tiếp về hiệu năng, video và giá trị.", img:"https://images.unsplash.com/photo-1643962249999-34d12130763a?w=800&h=500&fit=crop&auto=format", featured:false },
  { id:5, tag:"Hướng dẫn", date:"10/06/2026", title:"Cách chọn ống kính đầu tiên phù hợp cho máy ảnh mirrorless", excerpt:"Từ 50mm f/1.8 đến kit lens 24-70mm, đây là những lựa chọn phổ biến nhất cho người mới bắt đầu.", img:"https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=800&h=500&fit=crop&auto=format", featured:false },
  { id:6, tag:"Trải nghiệm", date:"02/06/2026", title:"Một tuần dùng Fujifilm X-T5 cho chuyến du lịch Đà Lạt", excerpt:"Cảm biến 40MP X-Trans kết hợp film simulation, X-T5 tạo ra những bức ảnh chân thực và đẹp mà không cần chỉnh sửa nhiều.", img:"https://images.unsplash.com/photo-1547381825-525352bdaff9?w=800&h=500&fit=crop&auto=format", featured:false },
];

const TAGS = ["Tất cả", "Đánh giá", "Hướng dẫn", "Tin tức", "So sánh", "Trải nghiệm"];

const TAG_COLOR: Record<string,string> = {
  "Đánh giá":"bg-blue-100 text-blue-700",
  "Hướng dẫn":"bg-green-100 text-green-700",
  "Tin tức":"bg-orange-100 text-orange-700",
  "So sánh":"bg-purple-100 text-purple-700",
  "Trải nghiệm":"bg-rose-100 text-rose-700",
};

export default function News() {
  const [active, setActive] = useState("Tất cả");
  const [q, setQ] = useState("");

  const filtered = POSTS.filter(p =>
    (active === "Tất cả" || p.tag === active) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()))
  );

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || active !== "Tất cả" || q);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
          <nav className="text-xs text-gray-400 mb-3 flex gap-2">
            <Link to="/" className="hover:text-orange-500">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-700">Tin tức</span>
          </nav>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                Tin Tức & Đánh Giá
              </h1>
              <p className="text-gray-500 text-sm mt-1">Cập nhật kiến thức nhiếp ảnh và tin tức mới nhất</p>
            </div>
            <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2 border border-transparent focus-within:border-orange-300 focus-within:bg-white transition-all">
              <Search size={13} className="text-gray-400" />
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm bài viết..."
                className="bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400 w-48" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
        {/* Tags */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TAGS.map(t => (
            <button key={t} onClick={() => setActive(t)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                active===t ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}>{t}</button>
          ))}
        </div>

        {/* Featured */}
        {featured && active === "Tất cả" && !q && (
          <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 mb-8">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
              <div className="overflow-hidden" style={{ minHeight:"280px" }}>
                <img src={featured.img} alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${TAG_COLOR[featured.tag]||"bg-gray-100 text-gray-700"}`}>{featured.tag}</span>
                  <span className="text-xs text-gray-400">{featured.date}</span>
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">NỔI BẬT</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 leading-snug mb-3 group-hover:text-orange-500 transition-colors"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{featured.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:underline">
                  Đọc đầy đủ <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {rest.length === 0 && !featured ? (
          <div className="text-center py-16 text-gray-400">
            <p className="font-semibold">Không tìm thấy bài viết phù hợp</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(post => (
              <article key={post.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="overflow-hidden aspect-[16/9]">
                  <img src={post.img} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${TAG_COLOR[post.tag]||"bg-gray-100 text-gray-700"}`}>{post.tag}</span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:text-orange-500 transition-colors line-clamp-2"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{post.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                  <a href="#" className="mt-4 text-xs font-bold text-orange-500 flex items-center gap-1 hover:underline">
                    Đọc tiếp <ArrowRight size={11} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
