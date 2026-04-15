const fs = require('fs');
const path = require('path');

const srcDir = 'e:/Developer/hayat-the-family-restaurant/New product images';
const menuFile = 'e:/Developer/hayat-the-family-restaurant/src/data/menu.ts';

const files = fs.readdirSync(srcDir);
const menuContent = fs.readFileSync(menuFile, 'utf8');

console.log('--- Unused Files in Folder ---');
files.forEach(file => {
  const cleanName = file.replace(/^\d+_/, '').replace(/_/g, '-');
  if (!menuContent.includes(cleanName)) {
    console.log(file);
  }
});

console.log('\n--- Items with NO Image Property ---');
const itemsWithNoImage = [];
const lines = menuContent.split('\n');
let currentItem = '';
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const nameMatch = line.match(/name:\s*['"](.*?)['"]/);
  if (nameMatch) {
    currentItem = nameMatch[1];
    // Check next few lines for image:
    let found = false;
    for (let j = 1; j < 5; j++) {
      if (lines[i+j] && lines[i+j].includes('image:')) {
        found = true;
        break;
      }
      if (lines[i+j] && lines[i+j].includes('}')) break;
    }
    if (!found && currentItem && !line.includes('export type')) {
      itemsWithNoImage.push(currentItem);
    }
  }
}
itemsWithNoImage.forEach(name => console.log(name));
