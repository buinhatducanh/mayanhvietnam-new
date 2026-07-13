import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Sitemap trang — Máy Ảnh Việt Nam" };

const siteMap = [
  { group: "Chính", items: [
    { name: "Trang chủ", href: "/" },
    { name: "Tất cả sản phẩm", href: "/tat-ca" },
    { name: "Sản phẩm mới", href: "/san-pham-moi" },
    { name: "Sản phẩm cũ", href: "/san-pham-cu" },
    { name: "Khuyến mãi", href: "/khuyen-mai" },
    { name: "Flash Sale", href: "/flash-sale" },
    { name: "Tìm kiếm", href: "/tim-kiem" },
  ]},
  { group: "Danh mục sản phẩm", items: [
    { name: "Máy ảnh Mirrorless", href: "/may-anh" },
    { name: "Ống kính", href: "/ong-kinh" },
    { name: "Flycam / Drone", href: "/flycam" },
    { name: "Action Camera & Pocket", href: "/action-camera" },
    { name: "Thiết bị Studio", href: "/thiet-bi-studio" },
    { name: "Phụ kiện máy ảnh", href: "/phu-kien" },
    { name: "Máy quay phim", href: "/may-quay-phim" },
  ]},
  { group: "Dịch vụ", items: [
    { name: "Lắp phông Studio", href: "/dich-vu-lap-phong" },
    { name: "Thu cũ đổi mới", href: "/thu-cu-doi-moi" },
  ]},
  { group: "Tài khoản", items: [
    { name: "Đăng nhập", href: "/dang-nhap" },
    { name: "Đăng ký", href: "/dang-ky" },
    { name: "Giỏ hàng", href: "/gio-hang" },
  ]},
  { group: "Chính sách", items: [
    { name: "Bảo hành", href: "/chinh-sach-bao-hanh" },
    { name: "Thanh toán", href: "/chinh-sach-thanh-toan" },
    { name: "Vận chuyển", href: "/chinh-sach-van-chuyen" },
  ]},
  { group: "Liên hệ", items: [
    { name: "Hệ thống cửa hàng", href: "/thong-tin-lien-he" },
  ]},
];

export default function SiteMapPage() {
  return (
    <>
      <PageHeader
        title="Sitemap toàn bộ trang"
        subtitle="Danh sách đầy đủ các trang trong website"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Sitemap" }]}
      />
      <section className="bg-zinc-950 py-12 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteMap.map(g => (
            <div key={g.group} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3 border-b border-zinc-800 pb-2">{g.group}</h3>
              <ul className="space-y-1.5">
                {g.items.map(i => (
                  <li key={i.href}>
                    <a href={i.href} className="text-sm text-zinc-300 hover:text-orange-400 transition-colors flex items-center gap-1.5">
                      <span className="text-orange-500">→</span>
                      <span>{i.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
