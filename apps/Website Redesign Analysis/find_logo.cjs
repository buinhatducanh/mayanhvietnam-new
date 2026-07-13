const https = require('https');

https.get('https://mayanhvietnam.com', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src=["']([^"']*logo[^"']*)["'][^>]*>/gi);
    console.log(matches);
  });
});
