'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRANDS = [
  { name:"Canon", color:"#CC0000", desc:"Hãng máy ảnh Nhật Bản uy tín nhất thế giới. Nổi tiếng với dòng EOS, hệ mount RF và lens L-Series.", count:45, img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop&auto=format" },
  { name:"Sony", color:"#000000", desc:"Tiên phong công nghệ mirrorless với dòng Alpha. Cảm biến BSI-CMOS và hệ thống AF theo dõi vật thể hàng đầu.", count:38, img:"https://images.unsplash.com/photo-1643962249999-34d12130763a?w=600&h=400&fit=crop&auto=format" },
  { name:"Nikon", color:"#FFDD00", textColor:"#1a1a2e", desc:"Thương hiệu 100 năm lịch sử. Dòng Z-Mount mirrorless với cảm biến stacked BSI-CMOS tiên tiến.", count:32, img:"https://images.unsplash.com/photo-1614746480983-377658e91422?w=600&h=400&fit=crop&auto=format" },
  { name:"DJI", color:"#1C1C1C", desc:"Số 1 thế giới về drone và gimbal. Từ Mini đến Mavic Pro, DJI định nghĩa lại nhiếp ảnh trên không.", count:24, img:"https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&h=400&fit=crop&auto=format" },
  { name:"Fujifilm", color:"#C41230", desc:"Phong cách retro, film simulation huyền thoại. Dòng X-Series là lựa chọn hàng đầu cho street photography.", count:28, img:"https://images.unsplash.com/photo-1547381825-525352bdaff9?w=600&h=400&fit=crop&auto=format" },
  { name:"Sigma", color:"#0066AA", desc:"Ống kính Art Series chất lượng cao với giá cạnh tranh. Độ nét và bokeh không thua kém hàng hãng chính gốc.", count:20, img:"https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?w=600&h=400&fit=crop&auto=format" },
  { name:"Godox", color:"#F26522", desc:"Đèn flash và đèn LED studio chất lượng chuyên nghiệp. TTL và HSS ở mức giá phù hợp mọi nhiếp ảnh gia.", count:35, img:"https://images.unsplash.com/photo-1648740678671-c37d78567ea8?w=600&h=400&fit=crop&auto=format" },
  { name:"Benro", color:"#333333", desc:"Chân máy và đầu ball head carbon chuyên nghiệp. Thiết kế công thái học, nhẹ mà chắc chắn cho mọi địa hình.", count:18, img:"https://images.unsplash.com/photo-1545254000-6c843440c5cd?w=600&h=400&fit=crop&auto=format" },
];

export default function Brands() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
          <nav className="text-xs text-gray-400 mb-3 flex gap-2">
            <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-700">Thương hiệu</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
            Thương Hiệu Chính Hãng
          </h1>
          <p className="text-gray-500 text-sm mt-1">Đối tác phân phối chính thức tại Việt Nam</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10">
        {/* Brand logos strip */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {BRANDS.map(b => (
              <div key={b.name}
                className="w-24 h-12 flex items-center justify-center border border-gray-200 rounded-xl px-3 hover:border-orange-400 hover:shadow-md transition-all cursor-pointer">
                <span className="font-extrabold text-sm tracking-tight"
                  style={{ color: b.color, fontFamily: "'Barlow Condensed',sans-serif" }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {BRANDS.map(b => (
            <div key={b.name}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 flex flex-col md:flex-row">
              <div className="md:w-52 shrink-0 overflow-hidden" style={{ aspectRatio:"4/3" }}>
                <img src={b.img} alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-extrabold"
                      style={{ color: b.color, fontFamily: "'Barlow Condensed',sans-serif" }}>{b.name}</span>
                    <span className="bg-orange-50 text-orange-500 text-[11px] font-bold px-2.5 py-1 rounded-full border border-orange-100">
                      {b.count} sản phẩm
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <Link href={`/san-pham?brand=${b.name}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:underline">
                  Xem sản phẩm {b.name} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
