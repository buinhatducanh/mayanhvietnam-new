export const ACCENT = "#FF6B35";
export const vnd = (n: number) => n.toLocaleString("vi-VN") + "₫";

export interface Product {
  id: number;
  brand: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  rating: number;
  reviews: number;
  img: string;
  thumbs: string[];
  specs: { label: string; value: string }[];
  desc: string;
  features: string[];
  inBox: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1, brand: "Canon", name: "Canon EOS R6 Mark II", category: "Mirrorless",
    price: 49990000, originalPrice: 54900000, badge: "HOT",
    rating: 4.9, reviews: 312,
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Cảm biến", value: "24.2MP Full-Frame CMOS" },
      { label: "Bộ xử lý", value: "DIGIC X" },
      { label: "Chụp liên tiếp", value: "40fps (electronic)" },
      { label: "Video", value: "6K RAW / 4K 60fps" },
      { label: "Hệ thống AF", value: "Dual Pixel CMOS AF II" },
      { label: "Màn hình", value: '3.0" LCD cảm ứng xoay' },
      { label: "Kết nối", value: "Wi-Fi 6, Bluetooth 5.0" },
      { label: "Pin", value: "LP-E6NH (~450 shots)" },
    ],
    desc: "Canon EOS R6 Mark II là máy ảnh mirrorless full-frame cao cấp, được thiết kế dành cho các nhiếp ảnh gia chuyên nghiệp và những người dùng đam mê sáng tạo. Với cảm biến 24.2MP và khả năng chụp liên tiếp lên tới 40fps, đây là công cụ hoàn hảo cho cả chụp ảnh thể thao, sự kiện lẫn video chuyên nghiệp.",
    features: ["AI Autofocus", "40fps Burst", "6K RAW Video", "8-stop IBIS", "Wi-Fi 6"],
    inBox: ["Thân máy Canon EOS R6 Mark II", "Pin LP-E6NH", "Sạc LC-E6E", "Dây đeo", "Nắp body RF", "Cáp USB-C"],
  },
  {
    id: 2, brand: "Sony", name: "Sony A7 IV Body", category: "Mirrorless",
    price: 64000000, originalPrice: null, badge: "NEW",
    rating: 4.8, reviews: 187,
    img: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1536632087471-3cf3f2986328?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Cảm biến", value: "33MP Full-Frame BSI CMOS" },
      { label: "Bộ xử lý", value: "BIONZ XR" },
      { label: "Chụp liên tiếp", value: "10fps" },
      { label: "Video", value: "4K 60fps / 10-bit 4:2:2" },
      { label: "Hệ thống AF", value: "759 điểm phase-detect" },
      { label: "Màn hình", value: '3.0" LCD cảm ứng lật' },
      { label: "Kết nối", value: "Wi-Fi 5 GHz, Bluetooth 5.0" },
      { label: "Pin", value: "NP-FZ100 (~520 shots)" },
    ],
    desc: "Sony A7 IV là máy ảnh mirrorless full-frame thế hệ mới nhất của Sony, cân bằng hoàn hảo giữa chụp ảnh và quay video chuyên nghiệp. Cảm biến 33MP BSI CMOS mang lại chất lượng ảnh xuất sắc trong mọi điều kiện ánh sáng.",
    features: ["33MP BSI CMOS", "4K 60fps 10-bit", "759-point AF", "5-axis IBIS", "Dual Card Slots"],
    inBox: ["Thân máy Sony A7 IV", "Pin NP-FZ100", "Sạc BC-QZ1", "Dây đeo", "Cáp USB-C"],
  },
  {
    id: 3, brand: "Canon", name: "Canon RF 24-70mm f/2.8L IS USM", category: "Ống kính",
    price: 73990000, originalPrice: 79000000, badge: null,
    rating: 4.7, reviews: 94,
    img: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1546434946-1185c1319364?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Tiêu cự", value: "24-70mm" },
      { label: "Khẩu độ tối đa", value: "f/2.8" },
      { label: "Ổn định hình ảnh", value: "IS (5 stop)" },
      { label: "Cấu tạo", value: "21 thấu kính / 15 nhóm" },
      { label: "AF", value: "Nano USM + Dual Sensing IS" },
      { label: "Đường kính lọc", value: "82mm" },
      { label: "Trọng lượng", value: "900g" },
      { label: "Tương thích", value: "Canon RF Mount" },
    ],
    desc: "Canon RF 24-70mm f/2.8L IS USM là ống kính zoom tiêu chuẩn đỉnh cao dành cho hệ thống RF. Với khẩu độ không đổi f/2.8 và hệ thống IS 5 stop, đây là lựa chọn lý tưởng cho nhiếp ảnh sự kiện, chân dung và phong cảnh.",
    features: ["f/2.8 cố định", "IS 5-stop", "Nano USM AF", "L-series optical quality", "Thời tiết kháng nước"],
    inBox: ["Ống kính Canon RF 24-70mm f/2.8L IS USM", "Nắp ống kính trước E-82", "Nắp sau RF", "Túi đựng ống kính", "Hood EW-88E"],
  },
  {
    id: 4, brand: "Sony", name: "Sony FE 200-600mm f/5.6-6.3G OSS", category: "Ống kính",
    price: 47000000, originalPrice: 52000000, badge: "SALE",
    rating: 4.8, reviews: 63,
    img: "https://images.unsplash.com/photo-1536632087471-3cf3f2986328?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1536632087471-3cf3f2986328?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Tiêu cự", value: "200-600mm" },
      { label: "Khẩu độ tối đa", value: "f/5.6-6.3" },
      { label: "Ổn định hình ảnh", value: "OSS (Optical SteadyShot)" },
      { label: "Cấu tạo", value: "24 thấu kính / 17 nhóm" },
      { label: "AF", value: "Linear AF Motor" },
      { label: "Đường kính lọc", value: "95mm" },
      { label: "Trọng lượng", value: "2,115g" },
      { label: "Tương thích", value: "Sony E-Mount Full Frame" },
    ],
    desc: "Sony FE 200-600mm f/5.6-6.3G OSS là ống kính tele siêu dài hoàn hảo cho nhiếp ảnh động vật hoang dã và thể thao. Tích hợp OSS và AF tốc độ cao, cho phép bắt trọn mọi khoảnh khắc chuyển động.",
    features: ["200-600mm tele", "OSS chống rung", "Fluorine Coating", "Weather-sealed", "Linear AF Motor"],
    inBox: ["Ống kính Sony FE 200-600mm", "Nắp ống kính trước", "Nắp sau", "Túi đựng", "Hood ALC-SH151", "Chân đỡ tháo rời"],
  },
  {
    id: 5, brand: "DJI", name: "DJI Mini 4 Pro Fly More Combo", category: "Drone",
    price: 20890000, originalPrice: null, badge: "NEW",
    rating: 4.9, reviews: 105,
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1541943201372-99066ec6a5c5?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Cảm biến", value: '1/1.3" CMOS 48MP' },
      { label: "Video", value: "4K/60fps HDR · 10-bit D-Log M" },
      { label: "Thời gian bay", value: "34 phút" },
      { label: "Tốc độ tối đa", value: "57 km/h (Sport mode)" },
      { label: "Tránh vật cản", value: "4 chiều (F/B/L/R)" },
      { label: "Phạm vi", value: "20km (O4 video transmission)" },
      { label: "Trọng lượng", value: "249g" },
      { label: "Kháng gió", value: "Cấp 7 (15m/s)" },
    ],
    desc: "DJI Mini 4 Pro là flycam nhỏ gọn nhất của DJI với tính năng tránh vật cản 4 chiều. Nặng chỉ 249g nhưng sở hữu camera 48MP, quay 4K/60fps HDR và thời gian bay 34 phút — lựa chọn hoàn hảo cho content creator và travel photographer.",
    features: ["249g siêu nhẹ", "4K 60fps HDR", "34 phút bay", "Tránh vật cản 4 chiều", "O4 transmission 20km"],
    inBox: ["DJI Mini 4 Pro", "RC2 Controller", "3× pin Intelligent Flight (Fly More)", "Túi đựng", "Chân hạ cánh", "Propeller guards"],
  },
  {
    id: 6, brand: "Nikon", name: "Nikon Z8 Body", category: "Mirrorless",
    price: 89990000, originalPrice: null, badge: "NEW",
    rating: 4.9, reviews: 56,
    img: "https://images.unsplash.com/photo-1616088886430-ccd86fef0713?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1616088886430-ccd86fef0713?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Cảm biến", value: "45.7MP Full-Frame BSI CMOS" },
      { label: "Bộ xử lý", value: "EXPEED 7" },
      { label: "Chụp liên tiếp", value: "20fps RAW / 120fps JPEG" },
      { label: "Video", value: "8K 60fps RAW / 4K 120fps" },
      { label: "Hệ thống AF", value: "AI Subject Detection" },
      { label: "Màn hình", value: '3.2" Tilting LCD' },
      { label: "Kết nối", value: "Wi-Fi 6E, Ethernet, USB-C" },
      { label: "Pin", value: "EN-EL18d (~300 shots)" },
    ],
    desc: "Nikon Z8 là chiếc máy ảnh mirrorless đỉnh cao nhất của Nikon, tích hợp tất cả công nghệ từ Z9 vào thân máy nhỏ gọn hơn. Với cảm biến 45.7MP và khả năng quay 8K RAW, Z8 là công cụ hoàn hảo cho nhiếp ảnh gia chuyên nghiệp.",
    features: ["45.7MP BSI CMOS", "8K 60fps RAW", "120fps burst JPEG", "AI Subject AF", "Đầu nối Ethernet"],
    inBox: ["Thân máy Nikon Z8", "Pin EN-EL18d", "Sạc MH-33", "Dây đeo", "Nắp body"],
  },
  {
    id: 7, brand: "Fujifilm", name: "Fujifilm X-T5 Body", category: "Mirrorless",
    price: 44990000, originalPrice: 49000000, badge: "SALE",
    rating: 4.8, reviews: 201,
    img: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=120&h=120&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Cảm biến", value: "40.2MP APS-C X-Trans V" },
      { label: "Bộ xử lý", value: "X-Processor 5" },
      { label: "Chụp liên tiếp", value: "15fps RAW" },
      { label: "Video", value: "6.2K 30fps / 4K 60fps" },
      { label: "Film Simulation", value: "20 chế độ Fujifilm" },
      { label: "Màn hình", value: '3.0" LCD 3-axis tilt' },
      { label: "Kết nối", value: "Wi-Fi, Bluetooth 5.0" },
      { label: "Pin", value: "NP-W235 (~580 shots)" },
    ],
    desc: "Fujifilm X-T5 mang thiết kế rangefinder cổ điển với công nghệ hiện đại nhất. Cảm biến X-Trans V 40.2MP kết hợp 20 Film Simulation độc đáo tạo ra màu sắc đặc trưng không thể nhầm lẫn của Fujifilm.",
    features: ["40.2MP X-Trans V", "20 Film Simulations", "6.2K RAW Video", "15fps burst", "Retro body design"],
    inBox: ["Thân máy Fujifilm X-T5", "Pin NP-W235", "Sạc BC-W235", "Dây đeo", "Nắp body XF"],
  },
  {
    id: 8, brand: "Godox", name: "Godox AD300Pro Outdoor Flash", category: "Phụ kiện",
    price: 8500000, originalPrice: 10200000, badge: "SALE",
    rating: 4.6, reviews: 143,
    img: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&h=800&fit=crop&auto=format",
    thumbs: [
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=120&h=120&fit=crop&auto=format",
    ],
    specs: [
      { label: "Công suất", value: "300Ws" },
      { label: "Số lần flash", value: "300+ lần/lần sạc" },
      { label: "Thời gian sạc lại", value: "0.01–1.8s" },
      { label: "TTL", value: "Canon / Nikon / Sony / Fujifilm" },
      { label: "HSS", value: "Hỗ trợ High Speed Sync" },
      { label: "Pin", value: "Li-ion 14.4V 2600mAh" },
      { label: "Kết nối", value: "Godox X-system 2.4GHz" },
      { label: "Trọng lượng", value: "1,265g" },
    ],
    desc: "Godox AD300Pro là đèn flash ngoại cảnh chuyên nghiệp công suất 300Ws, lý tưởng cho chụp ngoài trời. Tích hợp pin lithium cho phép chụp 300+ lần, hỗ trợ TTL và HSS, tương thích với tất cả hệ thống máy ảnh lớn.",
    features: ["300Ws power", "TTL & HSS", "300+ flashes/charge", "Godox X 2.4GHz", "2 đầu đèn tích hợp"],
    inBox: ["Đèn flash Godox AD300Pro", "Pin riêng", "Sạc", "Chân đỡ", "Đầu bulb & fresnel", "Túi đựng"],
  },
];

export const BRANDS = [
  { id: "canon",    name: "Canon",    logo: "🔴", country: "Nhật Bản", founded: 1937, products: 142, desc: "Thương hiệu máy ảnh hàng đầu thế giới, nổi tiếng với công nghệ Dual Pixel AF và hệ sinh thái ống kính RF phong phú.", color: "#CC0000", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=360&fit=crop&auto=format" },
  { id: "sony",     name: "Sony",     logo: "🔵", country: "Nhật Bản", founded: 1946, products: 98,  desc: "Pioneer của cảm biến BSI CMOS và hệ thống AF tiên tiến nhất. Sony Alpha là lựa chọn hàng đầu của content creator toàn cầu.", color: "#003087", img: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=600&h=360&fit=crop&auto=format" },
  { id: "nikon",    name: "Nikon",    logo: "🟡", country: "Nhật Bản", founded: 1917, products: 87,  desc: "Thương hiệu máy ảnh lâu đời nhất thế giới. Hệ thống Z-mount với đường kính lớn nhất ngành mang lại chất lượng quang học vượt trội.", color: "#1C3F94", img: "https://images.unsplash.com/photo-1616088886430-ccd86fef0713?w=600&h=360&fit=crop&auto=format" },
  { id: "fujifilm", name: "Fujifilm", logo: "🟢", country: "Nhật Bản", founded: 1934, products: 74,  desc: "Độc đáo với hệ thống Film Simulation tái tạo màu sắc phim analog. Fujifilm X-series được yêu thích bởi thiết kế retro và chất lượng ảnh tuyệt vời.", color: "#E4002B", img: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&h=360&fit=crop&auto=format" },
  { id: "dji",      name: "DJI",      logo: "⬛", country: "Trung Quốc", founded: 2006, products: 47, desc: "Dẫn đầu thị trường drone và gimbal toàn cầu. Các sản phẩm DJI mang lại trải nghiệm quay phim aerial chuyên nghiệp cho mọi đối tượng.", color: "#333", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=360&fit=crop&auto=format" },
  { id: "sigma",    name: "Sigma",    logo: "⚫", country: "Nhật Bản", founded: 1961, products: 63,  desc: "Chuyên gia về ống kính với triết lý Art, Contemporary và Sports. Sigma Art series được công nhận là tiêu chuẩn vàng về chất lượng quang học.", color: "#555", img: "https://images.unsplash.com/photo-1546434946-1185c1319364?w=600&h=360&fit=crop&auto=format" },
  { id: "tamron",   name: "Tamron",   logo: "🔷", country: "Nhật Bản", founded: 1950, products: 38,  desc: "Ống kính giá tốt, chất lượng cao. Dòng 17-70mm f/2.8 và 28-75mm f/2.8 là lựa chọn phổ biến nhất trong phân khúc.", color: "#0047AB", img: "https://images.unsplash.com/photo-1526556838038-5d9deb7998bd?w=600&h=360&fit=crop&auto=format" },
  { id: "godox",    name: "Godox",    logo: "🟠", country: "Trung Quốc", founded: 2004, products: 89, desc: "Thương hiệu đèn flash chuyên nghiệp phổ biến nhất tại Việt Nam. Hệ thống X 2.4GHz cho phép điều khiển không dây tất cả đèn cùng lúc.", color: "#FF6600", img: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&h=360&fit=crop&auto=format" },
];

export const NEWS = [
  {
    id: 1, category: "Review", tag: "HOT",
    title: "Canon EOS R6 Mark II: Đánh giá sau 3 tháng sử dụng thực tế",
    excerpt: "Sau 3 tháng cầm trên tay Canon EOS R6 Mark II, chúng tôi có đủ dữ liệu để đưa ra một đánh giá toàn diện nhất về chiếc máy ảnh này trong điều kiện thực tế tại Việt Nam.",
    author: "Minh Tuấn", authorRole: "Senior Reviewer",
    date: "10/06/2025", readTime: "12 phút đọc",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 2, category: "Hướng dẫn", tag: "NEW",
    title: "Chụp ảnh chân dung nghệ thuật với Sony A7 IV và FE 85mm f/1.4",
    excerpt: "Bộ đôi Sony A7 IV và ống kính FE 85mm f/1.4 GM II là combination hoàn hảo cho nhiếp ảnh chân dung. Hãy cùng tìm hiểu cách tận dụng tối đa bộ đôi này.",
    author: "Thu Hà", authorRole: "Portrait Photographer",
    date: "05/06/2025", readTime: "8 phút đọc",
    img: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 3, category: "Tin tức", tag: null,
    title: "DJI Mini 4 Pro ra mắt tại Việt Nam: Giá bán và nơi mua chính hãng",
    excerpt: "DJI chính thức ra mắt Mini 4 Pro tại thị trường Việt Nam với mức giá hấp dẫn. Đây là flycam nhỏ gọn nhất của DJI tích hợp tránh vật cản 4 chiều.",
    author: "Hoàng Phúc", authorRole: "Tech Journalist",
    date: "01/06/2025", readTime: "5 phút đọc",
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 4, category: "So sánh", tag: null,
    title: "Fujifilm X-T5 vs Canon EOS R7: Đâu là lựa chọn tốt hơn cho bạn?",
    excerpt: "Hai máy ảnh APS-C tốt nhất năm 2024 đối đầu trực tiếp. Chúng tôi so sánh chi tiết về cảm biến, tốc độ, video và đặc biệt là Film Simulation vs DPAF.",
    author: "Minh Tuấn", authorRole: "Senior Reviewer",
    date: "28/05/2025", readTime: "15 phút đọc",
    img: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 5, category: "Hướng dẫn", tag: null,
    title: "5 thiết lập giúp bạn chụp ảnh thiên hà đẹp nhất với máy ảnh mirrorless",
    excerpt: "Chụp ảnh thiên hà không còn là đặc quyền của chuyên gia. Với máy ảnh mirrorless hiện đại và vài thiết lập đúng, bạn hoàn toàn có thể chụp được dải Ngân Hà.",
    author: "Thu Hà", authorRole: "Landscape Photographer",
    date: "22/05/2025", readTime: "10 phút đọc",
    img: "https://images.unsplash.com/photo-1536632087471-3cf3f2986328?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 6, category: "Review", tag: null,
    title: "Sigma 35mm f/1.4 DG DN Art: Ống kính góc rộng tốt nhất cho Sony E-Mount",
    excerpt: "Sigma Art series tiếp tục gây ấn tượng với 35mm f/1.4 DN phiên bản mới. Chúng tôi test toàn diện trên Sony A7 IV để đưa ra đánh giá khách quan nhất.",
    author: "Hoàng Phúc", authorRole: "Gear Reviewer",
    date: "18/05/2025", readTime: "9 phút đọc",
    img: "https://images.unsplash.com/photo-1546434946-1185c1319364?w=700&h=420&fit=crop&auto=format",
  },
];

export const STORES = [
  { city: "TP. Hồ Chí Minh", address: "123 Điện Biên Phủ, P.15, Q.Bình Thạnh", phone: "028 3840 1234", hours: "8:00 – 21:00", map: "Q.Bình Thạnh, TP.HCM" },
  { city: "Hà Nội", address: "45 Thái Hà, P.Trung Liệt, Q.Đống Đa", phone: "024 3556 7890", hours: "8:00 – 21:00", map: "Q.Đống Đa, Hà Nội" },
  { city: "Đà Nẵng", address: "78 Nguyễn Văn Linh, P.Nam Dương, Q.Hải Châu", phone: "0236 3810 567", hours: "8:30 – 20:30", map: "Q.Hải Châu, Đà Nẵng" },
  { city: "Cần Thơ", address: "32 Trần Phú, P.Cái Khế, Q.Ninh Kiều", phone: "0292 3812 345", hours: "8:30 – 20:30", map: "Q.Ninh Kiều, Cần Thơ" },
];
