const fs = require('fs');
const path = require('path');

// Domain gốc của shop
const BASE_URL = 'https://mayanhvietnam.com';

// Danh sách các danh mục cần cào (Đã bổ sung đầy đủ tất cả danh mục của dự án)
const CATEGORIES = [
  { slug: 'may-anh', name: 'Máy ảnh', url: `${BASE_URL}/danh-muc/may-anh` },
  { slug: 'ong-kinh', name: 'Ống kính', url: `${BASE_URL}/danh-muc/ong-kinh` },
  { slug: 'may-quay-phim', name: 'Máy quay phim', url: `${BASE_URL}/danh-muc/may-quay-phim` }, // <-- THÊM MỚI
  { slug: 'action-camera', name: 'Action Camera', url: `${BASE_URL}/danh-muc/action-camera` }, // <-- THÊM MỚI
  { slug: 'flycam', name: 'Flycam', url: `${BASE_URL}/danh-muc/flycam` },
  { slug: 'phu-kien', name: 'Phụ kiện', url: `${BASE_URL}/danh-muc/phu-kien` },
  { slug: 'thiet-bi-studio', name: 'Thiết bị Studio', url: `${BASE_URL}/danh-muc/thiet-bi-studio` },
  { slug: '2nd-hand', name: 'Sản phẩm cũ', url: `${BASE_URL}/danh-muc-2nd/tat-ca-san-pham` }
];

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

// Nhận diện hãng sản xuất từ tên sản phẩm
function detectBrand(name) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('sony')) return 'Sony';
  if (lowerName.includes('canon')) return 'Canon';
  if (lowerName.includes('nikon')) return 'Nikon';
  if (lowerName.includes('fuji')) return 'Fujifilm';
  if (lowerName.includes('dji') || lowerName.includes('mavic') || lowerName.includes('phantom') || lowerName.includes('osmo') || lowerName.includes('pocket') || lowerName.includes('action')) return 'DJI';
  if (lowerName.includes('sigma')) return 'Sigma';
  if (lowerName.includes('tamron')) return 'Tamron';
  if (lowerName.includes('viltrox')) return 'Viltrox';
  if (lowerName.includes('gopro') || lowerName.includes('hero')) return 'GoPro';
  if (lowerName.includes('insta360')) return 'Insta360';
  return 'Khác';
}

// Chuyển đổi chuỗi giá tiếng Việt sang số
function parsePrice(priceStr) {
  if (!priceStr || priceStr.includes('Vui lòng gọi')) return 0;
  const cleaned = priceStr.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

async function crawlCategory(category) {
  console.log(`\n==================================================`);
  console.log(`Đang cào danh mục: ${category.name}...`);

  try {
    const response = await fetch(category.url, { headers: HEADERS });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const html = await response.text();
    const products = [];
    let match;

    if (category.slug === '2nd-hand') {
      // RegExp dành riêng cho hàng cũ (layout-product2nd)
      const product2ndRegex = /<a\s+href="([^"]+)"\s+class="layout-product2nd"[^>]*>([\s\S]*?)<\/a>/g;

      while ((match = product2ndRegex.exec(html)) !== null) {
        const relativeLink = match[1];
        const slug = relativeLink.replace('/san-pham-2nd/', '').replace('/san-pham/', '');
        const blockContent = match[2];

        const imgMatch = /<img\s+src="([^"]+)"/i.exec(blockContent);
        let thumbnail = imgMatch ? imgMatch[1] : '';
        if (thumbnail && !thumbnail.startsWith('http')) {
          thumbnail = thumbnail.startsWith('/') ? `${BASE_URL}${thumbnail}` : `${BASE_URL}/${thumbnail}`;
        }

        const titleMatch = /<h3\s+class="layout-product2nd-title">([\s\S]*?)<\/h3>/i.exec(blockContent);
        const name = titleMatch ? titleMatch[1].trim() : '';

        const priceMatch = /<div\s+class="layout-product2nd__price[^"]*">([\s\S]*?)<\/div>/i.exec(blockContent);
        const priceDisplay = priceMatch ? priceMatch[1].trim() : 'Vui lòng gọi';
        const price = parsePrice(priceDisplay);

        if (name) {
          products.push({
            id: `scraped-2nd-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            slug: slug,
            name,
            brand: detectBrand(name),
            price,
            priceText: price === 0 ? 'Vui lòng gọi' : undefined,
            originalPrice: price > 0 ? price : undefined,
            thumbnail,
            images: [{ url: thumbnail, alt: name, isPrimary: true }],
            badges: ['Hàng cũ giá tốt'],
            rating: { average: 4.8, count: 15 },
            availability: price === 0 ? 'call' : 'in_stock',
            category: category.slug,
            isUsed: true,
            shortSpecs: ['Sản phẩm cũ chất lượng cao, đã kiểm tra kỹ lưỡng'],
            description: `Sản phẩm cũ ${name} ngoại hình đẹp, giá tốt nhất thị trường tại Máy Ảnh Việt Nam.`,
            featured: false,
            soldCount: 5,
            sku: slug.split('_').pop() || '2ND'
          });
        }
      }
    } else {
      // Logic dành cho Hàng mới, Phụ kiện, Studio, Máy quay phim, Action Camera
      const productBlockRegex = /<a\s+href="([^"]+)"\s+class="layout-product"[^>]*>([\s\S]*?)<\/a>/g;

      while ((match = productBlockRegex.exec(html)) !== null) {
        const relativeLink = match[1];
        const slug = relativeLink.replace('/san-pham/', '');
        const blockContent = match[2];

        const imgMatch = /<img\s+src="([^"]+)"/i.exec(blockContent);
        let thumbnail = imgMatch ? imgMatch[1] : '';
        if (thumbnail && !thumbnail.startsWith('http')) {
          thumbnail = thumbnail.startsWith('/') ? `${BASE_URL}${thumbnail}` : `${BASE_URL}/${thumbnail}`;
        }

        const titleMatch = /<h3\s+class="layout-product-title">([\s\S]*?)<\/h3>/i.exec(blockContent);
        const name = titleMatch ? titleMatch[1].trim() : '';

        const priceMatch = /<div\s+class="layout-product__price[^"]*">([\s\S]*?)<\/div>/i.exec(blockContent);
        const priceDisplay = priceMatch ? priceMatch[1].trim() : 'Vui lòng gọi';
        const price = parsePrice(priceDisplay);

        if (name) {
          products.push({
            id: `scraped-new-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            slug,
            name,
            brand: detectBrand(name),
            price,
            priceText: price === 0 ? 'Vui lòng gọi' : undefined,
            originalPrice: price > 0 ? price : undefined,
            thumbnail,
            images: [{ url: thumbnail, alt: name, isPrimary: true }],
            badges: price > 0 ? ['Chính hãng'] : ['Đặt trước'],
            rating: { average: 5.0, count: 12 },
            availability: price === 0 ? 'call' : 'in_stock',
            category: category.slug,
            isUsed: false,
            shortSpecs: ['Sản phẩm chính hãng chất lượng cao'],
            description: `Sản phẩm ${name} chính hãng chất lượng cao tại Máy Ảnh Việt Nam.`,
            featured: false,
            soldCount: 10,
            sku: slug.split('_').pop() || 'SP'
          });
        }
      }
    }

    console.log(`=> Thu thập thành công ${products.length} sản phẩm.`);
    return products;

  } catch (error) {
    console.error(`❌ Lỗi danh mục ${category.name}:`, error.message);
    return [];
  }
}

async function main() {
  const allProducts = [];

  for (const category of CATEGORIES) {
    const categoryProducts = await crawlCategory(category);
    allProducts.push(...categoryProducts);
    // Delay nhẹ tránh làm nghẽn server shop
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  if (allProducts.length === 0) {
    console.log('\n❌ Không cào được dữ liệu nào.');
    return;
  }

  const outputPath = path.join(__dirname, '../src/data/scraped-products.json');
  fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), 'utf8');

  console.log(`\n==================================================`);
  console.log(`🎉 HOÀN THÀNH CÀO TOÀN BỘ DANH MỤC!`);
  console.log(`💾 Tổng số sản phẩm thu thập và lưu thành công: ${allProducts.length}`);
  console.log(`==================================================`);
}

main();