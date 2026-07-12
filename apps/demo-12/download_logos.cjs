const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'brands');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const brands = [
  { name: 'canon.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Canon_logotype.svg/1200px-Canon_logotype.svg.png' },
  { name: 'sony.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/1200px-Sony_logo.svg.png' },
  { name: 'nikon.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Nikon_Corporation_logo.svg/1200px-Nikon_Corporation_logo.svg.png' },
  { name: 'dji.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/DJI_Logo.svg/1200px-DJI_Logo.svg.png' },
  { name: 'gopro.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/GoPro_Logo.svg/1200px-GoPro_Logo.svg.png' },
  { name: 'insta360.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Insta360_logo.svg/1200px-Insta360_logo.svg.png' },
  { name: 'sigma.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sigma_Corporation_logo.svg/1200px-Sigma_Corporation_logo.svg.png' }
];

brands.forEach(brand => {
  const filePath = path.join(dir, brand.name);
  const file = fs.createWriteStream(filePath);
  
  const requestOptions = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  https.get(brand.url, requestOptions, response => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded ${brand.name}`);
      });
    } else {
      file.close();
      fs.unlinkSync(filePath);
      console.error(`Failed to download ${brand.name}: HTTP Status ${response.statusCode}`);
    }
  }).on('error', err => {
    file.close();
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error(`Error downloading ${brand.name}:`, err.message);
  });
});
