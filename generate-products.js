const fs = require('fs');

const camData = JSON.parse(fs.readFileSync('d:/LOOP_COMPANY/mayanhvietnam-new/docs/scraped/plp-may-anh.json','utf8'));
const flyData = JSON.parse(fs.readFileSync('d:/LOOP_COMPANY/mayanhvietnam-new/docs/scraped/plp-flycam.json','utf8'));
const lensData = JSON.parse(fs.readFileSync('d:/LOOP_COMPANY/mayanhvietnam-new/docs/scraped/plp-ong-kinh.json','utf8'));

const imgUrls = {
  'Sony Alpha A7R VI': 'https://mayanhvietnam.com/image-data/san-pham/26-03/26-03-28/260328143107303/avatar/638793224974270876_may-anh-sony-alpha-a7r-vi.jpg',
  'Fujifilm X-H2S': 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg',
  'Sony A7S III': 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084518870/avatar/01_may-anh-sony-alpha-a7s-mark-iii-ilce7sm3.jpg',
  'Sony A7R V': 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-02/240802084419498/avatar/01_may-anh-sony-alpha-a7r-mark-v-chinh-hang.jpg',
  'Sony A7R IV': 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-24/240824141547867/avatar/01_may-anh-sony-alpha-a7r-mark-iv-chinh-hang.jpg',
  'Sony A6400': 'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-11/250711141506840/avatar/638881656606793712_sony-a6400-kem-lens-1650-f3556-oss-ii-black-chinh-hang.jpg',
  'Sony A7M5': 'https://mayanhvietnam.com/image-data/san-pham/25-11/25-11-26/251126090035598/avatar/638936853224070951_may-anh-sony-a7-mark-v-a7m5-chinh-hang.jpg',
  'Sony A9 III': 'https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/638943606240170785_may-anh-sony-a9-iii-chinh-hang.jpg',
  'Canon PowerShot V1': 'https://mayanhvietnam.com/image-data/san-pham/25-04/25-04-01/250401154750200/avatar/638840004640276812_may-anh-canon-powershell-v1-chinh-hang.jpg',
  'Canon EOS R7': 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-01/240801175147151/avatar/01_may-anh-canon-eos-r7-chinh-hang.jpg',
  'Canon EOS R3': 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223530566/avatar/01_may-anh-canon-eos-r3-body-only.jpg',
  'Canon EOS RP': 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210224704223/avatar/01_may-anh-canon-eos-rp-body-only.jpg',
  'Sony A7IV': 'https://mayanhvietnam.com/image-data/san-pham/25-03/25-03-08/250308101803437/avatar/638812897337170871_may-anh-sony-alpha-a7-mark-iv-body-sony-fe-2470-f28-gm-ii.jpg',
  'Sony ZV-E1': 'https://mayanhvietnam.com/image-data/san-pham/24-08/24-08-25/240825103429290/avatar/638719930695532876_may-anh-sony-zve1-body-only-chinh-hang.jpg',
  'Sony A7C II': 'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-30/230830134714949/avatar/01_may-anh-sony-alpha-a7c-ii-body-only-silver-chinh-hang.jpg',
  'Sony ZV-E10 II White': 'https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-07/251007153637860/avatar/638912940096226637_may-anh-sony-zve10-ii-white-body-only-chinh-hang.jpg',
  'Nikon Z50 II Kit': 'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-13/250913094447340/avatar/638932658774154853_may-anh-nikon-z50-mark-ii-kem-lens-nikon-z-dx-1650-f3563-vr.jpg',
  'Nikon Z30': 'https://mayanhvietnam.com/image-data/san-pham/25-06/25-06-20/250620115535850/avatar/638889641077470341_may-anh-nikon-z30-den-kem-lens-nikkor-z-dx-16-50mm-f-3-5-6-3-vr-chinh-hang.jpg',
  'Nikon Z50 II Body': 'https://mayanhvietnam.com/image-data/san-pham/25-02/25-02-06/250206095656295/avatar/638787325232930989_may-anh-nikon-z50-ii-body.jpg',
  'Nikon Z6 III': 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-20/250520145943720/avatar/638833501469480006_nikon-z6-mark-iii-kem-lens-z-24-70-mm-f-4-s-chinh-hang-vic.jpg',
  'Nikon Zf Kit': 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-30/250530073748218/avatar/638872253355062960_may-anh-nikon-zf-kit-z-40-f2-se.jpg',
  'Nikon ZR': 'https://mayanhvietnam.com/image-data/san-pham/25-09/25-09-11/250911084045444/avatar/638932652030706891_nikon-zr-chinh-hang.jpg',
  'Nikon Z5 II': 'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-04/250704114217939/avatar/638872262359118095_may-anh-nikon-z5-ii-hang.jpg',
  'Nikon Zf Silver': 'https://mayanhvietnam.com/image-data/san-pham/25-10/25-10-13/251013142244128/avatar/638938030373276930_may-anh-nikon-zf-body-only-silver-chinh-hang.jpg',
};

function bestImage(name, urls) {
  for (const [k,v] of Object.entries(urls)) {
    if (name.includes(k)) return v;
  }
  return '';
}

function parsePrice(p) {
  if (!p) return 0;
  return parseInt(p.replace(/[^\d]/g,'')) || 0;
}

function getCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('sony') || n.includes('canon') || n.includes('nikon') || n.includes('fuji') || n.includes('panasonic') || n.includes('lumix'))
    return 'may-anh';
  if (n.includes('ong kinh') || n.includes('len') || n.includes('fujifilm xf') || n.includes('nikkor') || n.includes('sigma') || n.includes('tamron') || n.includes('viltrox') || n.includes('canon ef') || n.includes('canon rf'))
    return 'ong-kinh';
  if (n.includes('flycam') || n.includes('dji') || n.includes('mavic') || n.includes('mini') || n.includes('phantom') || n.includes('air') || n.includes('avata') || n.includes('fimi') || n.includes('inspire') || n.includes('neo'))
    return 'flycam';
  return 'may-anh';
}

function getBrand(name) {
  const n = name.toLowerCase();
  if (n.includes('sony')) return 'Sony';
  if (n.includes('canon')) return 'Canon';
  if (n.includes('nikon')) return 'Nikon';
  if (n.includes('fuji')) return 'Fujifilm';
  if (n.includes('dji')) return 'DJI';
  if (n.includes('sigma')) return 'Sigma';
  if (n.includes('tamron')) return 'Tamron';
  if (n.includes('viltrox')) return 'Viltrox';
  return 'Khác';
}

function getMount(name) {
  const n = name.toLowerCase();
  if (n.includes('sony e') || n.includes(' for sony') || n.includes('fe ') || n.includes('alpha')) return 'Sony E';
  if (n.includes('canon rf') || n.includes('rf ')) return 'Canon RF';
  if (n.includes('nikon z') || n.includes('nikkor')) return 'Nikon Z';
  if (n.includes(' l-mount') || n.includes('ngàm l')) return 'L-Mount';
  if (n.includes('canon ef') || n.includes('ef ')) return 'Canon EF';
  return undefined;
}

// Output cameras
console.log('=== CAMERAS ===');
camData.products.forEach(p => {
  const slug = p.slug ? p.slug.replace('/san-pham/','') : '';
  const img = bestImage(p.name, imgUrls) || p.images ? p.images[0] : '';
  const price = parsePrice(p.price_display);
  const brand = getBrand(p.name);
  const category = 'may-anh';
  console.log(JSON.stringify({slug, name: p.name, brand, category, price, image: img}));
});

// Output flycams
console.log('=== FLYCAMS ===');
flyData.products.forEach(p => {
  const slug = p.slug ? p.slug.replace('/san-pham/','') : '';
  const price = parsePrice(p.price_display);
  const brand = getBrand(p.name);
  const category = 'flycam';
  console.log(JSON.stringify({slug, name: p.name, brand, category, price}));
});

// Output lenses
console.log('=== LENSES ===');
lensData.products.forEach(p => {
  const slug = p.slug ? p.slug.replace('/san-pham/','') : '';
  const price = parsePrice(p.price_display);
  const brand = getBrand(p.name);
  const category = 'ong-kinh';
  const mount = getMount(p.name);
  console.log(JSON.stringify({slug, name: p.name, brand, category, price, mount}));
});
