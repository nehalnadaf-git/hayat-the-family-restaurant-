const fs = require('fs');
const buffer = fs.readFileSync('e:/Developer/hayat-the-family-restaurant/public/images/restaurant/hero-banner-web2.png');
const width = buffer.readInt32BE(16);
const height = buffer.readInt32BE(20);
console.log(`${width}x${height}`);
