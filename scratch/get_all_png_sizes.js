const fs = require('fs');

function getDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const width = buffer.readInt32BE(16);
    const height = buffer.readInt32BE(20);
    console.log(`${filePath.split('/').pop()}: ${width}x${height}`);
  } catch (e) {
    console.log(`Failed for ${filePath}: ${e.message}`);
  }
}

const dir = 'e:/Developer/hayat-the-family-restaurant/public/images/restaurant/';
getDimensions(dir + 'hero-banner-web3.png');
