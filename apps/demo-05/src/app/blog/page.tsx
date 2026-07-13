import Link from 'next/link';
import { Cpu, Camera } from 'lucide-react';

const blogPosts = [
  { id: 1, title: 'Đánh giá Canon EOS R50: Mirrorless entry-level tốt nhất 2025', excerpt: 'Canon EOS R50 là lựa chọn hoàn hảo cho người mới bắt đầu với cảm biến APS-C 24.2MP, AF nhanh và video 4K không crop.', category: 'Đánh giá', date: '15/01/2025', readTime: '8 phút', image: 'blog-1', featured: true },
  { id: 2, title: 'Hướng dẫn chọn ống kính đầu tiên cho máy ảnh Canon RF', excerpt: '5 ống kính RF đáng mua nhất năm 2025 cho người mới bắt đầu nhiếp ảnh.', category: 'Hướng dẫn', date: '12/01/2025', readTime: '6 phút', image: 'blog-2', featured: false },
  { id: 3, title: 'Sony A7C II vs Sony A7 IV: Đâu là lựa chọn tốt hơn?', excerpt: 'So sánh chi tiết Sony A7C II và A7 IV — hai chiếc full-frame compact của Sony.', category: 'So sánh', date: '10/01/2025', readTime: '10 phút', image: 'blog-3', featured: false },
  { id: 4, title: 'DJI Osmo Action 4 vs GoPro Hero 12: Vua action cam?', excerpt: 'Cuộc đối đầu giữa DJI Osmo Action 4 và GoPro Hero 12 trên mọi khía cạnh.', category: 'So sánh', date: '08/01/2025', readTime: '12 phút', image: 'blog-4', featured: false },
  { id: 5, title: 'Setup phòng studio chụp ảnh với ngân sách 20 triệu', excerpt: 'Hướng dẫn chi tiết setup phòng studio tại nhà với ngân sách 20 triệu.', category: 'Hướng dẫn', date: '05/01/2025', readTime: '15 phút', image: 'blog-5', featured: false },
  { id: 6, title: 'Fujifilm X-T5: Máy ảnh APS-C tốt nhất năm 2025?', excerpt: 'Fujifilm X-T5 với 40.2MP, Film Simulation 19 modes và thiết kế retro.', category: 'Đánh giá', date: '03/01/2025', readTime: '9 phút', image: 'blog-6', featured: false },
];

const categories = ['Tất cả', 'Đánh giá', 'So sánh', 'Hướng dẫn', 'Tin tức'];

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link><span>/</span>
        <span className="text-foreground">Blog & Tin tức</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Blog & Tin tức</h1>
        <p className="text-sm text-muted-foreground">Tin tức, đánh giá và hướng dẫn nhiếp ảnh từ đội ngũ chuyên gia</p>
      </div>

      {/* Featured */}
      <Link href="/blog" className="group grid lg:grid-cols-2 gap-6 mb-10 bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 transition-all">
        <div className="aspect-video lg:aspect-auto overflow-hidden bg-elevated">
          <img src={`https://picsum.photos/seed/${featured.image}/800/500`} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">{featured.category}</span>
            <span className="text-[11px] text-muted-foreground font-mono">{featured.date} · {featured.readTime} đọc</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">{featured.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{featured.excerpt}</p>
        </div>
      </Link>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto mb-8 pb-1">
        {categories.map((cat, i) => (
          <button key={cat} className={`shrink-0 h-9 px-4 rounded-full text-xs font-semibold transition-colors ${i === 0 ? 'text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'}`} style={i === 0 ? { background: '#2563eb' } : {}}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {rest.map((post) => (
          <Link key={post.id} href="/blog" className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all">
            <div className="aspect-video overflow-hidden bg-elevated">
              <img src={`https://picsum.photos/seed/${post.image}/600/400`} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">{post.category}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{post.date}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter */}
      <section className="rounded-2xl bg-card border border-primary/20 p-8 lg:p-12 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
          <Cpu className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Đăng ký nhận tin mới nhất</h2>
        <p className="text-sm text-muted-foreground mb-5">Nhận thông tin sản phẩm mới, khuyến mãi qua email</p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input type="email" placeholder="Nhập email..." className="flex-1 h-11 px-4 rounded-lg bg-background border border-border text-sm text-foreground focus:border-primary focus:outline-none" />
          <button className="h-11 px-5 rounded-lg text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity shrink-0" style={{ background: '#2563eb' }}>Đăng ký</button>
        </div>
      </section>
    </div>
  );
}