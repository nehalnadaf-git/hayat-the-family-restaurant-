const fs = require('fs');
const path = require('path');

const srcDir = 'e:/Developer/hayat-the-family-restaurant/New product images';
const destDir = 'e:/Developer/hayat-the-family-restaurant/public/images/food';
const menuFile = 'e:/Developer/hayat-the-family-restaurant/src/data/menu.ts';

// Mapping: filename in New product images -> MenuItem name(s) in menu.ts
const mapping = {
  // Soups
  "01_tomato_soup.webp": ["Tomato Soup"],
  "02_veg_manchow_soup.webp": ["Veg Manchow Soup"],
  "03_veg_hot_sour_soup.webp": ["Veg Hot & Sour Soup"],
  "04_veg_clear_soup.webp": ["Veg Clear Soup"],
  "05_mushroom_manchow_soup.webp": ["Mushroom Manchow Soup"],
  "06_lemon_coriander_soup.webp": ["Lemon Coriander Soup"],
  "07_beef_manchow_soup.webp": ["Beef Manchow Soup"],
  "08_beef_hot_sour_soup.webp": ["Beef Hot & Sour Soup"],
  "09_beef_clear_soup.webp": ["Beef Clear Soup"],
  "10_chicken_manchow_soup.webp": ["Chicken Manchow Soup"],
  "11_chicken_hot_sour_soup.webp": ["Chicken Hot & Sour Soup"],
  "12_chicken_clear_soup.webp": ["Chicken Clear Soup"],
  "13_mutton_manchow_soup.webp": ["Mutton Manchow Soup"],
  "14_mutton_hot_sour_soup.webp": ["Mutton Hot & Sour Soup"],
  "15_mutton_clear_soup.webp": ["Mutton Clear Soup"],

  // Mutton Starters
  "01_mutton_pepper.webp": ["Mutton Pepper"],
  "02_mutton_65.webp": ["Mutton 65"],
  "03_mutton_barbeque.webp": ["Mutton Barbeque"],
  "04_mutton_chilli.webp": ["Mutton Chilli"],
  "05_mutton_garlic.webp": ["Mutton Garlic"],
  "06_mutton_spanish.webp": ["Mutton Spanish"],

  // Tandoori
  "07_tandoori_chicken.webp": ["Tandoori Chicken Full", "Tandoori Chicken Half", "Tangadi Kabab (1 pc)"],
  "08_lazeez_kabab.webp": ["Lazeez Kabab"],
  "09_gulzari_kabab.webp": ["Gulzari Kabab"],
  "10_tikka_kabab.webp": ["Tikka Kabab"],
  "11_pahadi_kabab.webp": ["Pahadi Kabab"],
  "12_sholay_kabab.webp": ["Sholay Kabab"],

  // Beef Mains
  "13_beef_kolhapuri.webp": ["Beef Kolhapuri"],
  "14_beef_kadai.webp": ["Beef Kadai"],
  "15_beef_military.webp": ["Beef Military"],
  "16_beef_lahori.webp": ["Beef Lahori"],
  "17_beef_roghan_josh.webp": ["Beef Roghan Josh"],
  "18_beef_kheema.webp": ["Beef Kheema"],

  // Bulk Orders
  "19_bulk_beef_biryani.webp": ["Beef Biryani — Basmati (Per Kg)", "Beef Biryani — Jeera Rice (Per Kg)"],
  "20_bulk_chicken_biryani.webp": ["Chicken Biryani — Basmati (Per Kg)", "Chicken Biryani — Jeera Rice (Per Kg)"],
  "21_bulk_mutton_biryani.webp": ["Mutton Biryani — Basmati (Per Kg)", "Mutton Biryani — Jeera Rice (Per Kg)"],
  "22_bulk_veg_biryani.webp": ["Veg Biryani — Basmati (Per Kg)"],

  // Others (Direct base names)
  "beef_65.webp": ["Beef 65"],
  "beef_barbeque.webp": ["Beef Barbeque"],
  "beef_chilli.webp": ["Beef Chilli"],
  "beef_dragon.webp": ["Beef Dragon"],
  "beef_finger.webp": ["Beef Finger"],
  "beef_manchurian.webp": ["Beef Manchurian"],
  "beef_oil_dry.webp": ["Beef Oil Dry"],
  "beef_pepper.webp": ["Beef Pepper"],
  "beef_spanish.webp": ["Beef Spanish"],
  "chicken_65.webp": ["Chicken 65"],
  "chicken_chilli.webp": ["Chicken Chilli"],
  "chicken_dragon.webp": ["Chicken Dragon"],
  "chicken_fried_kabab.webp": ["Chicken Fried Kabab", "Chicken Fried Kabab (Full)", "Chicken Fried Kabab (Half)", "Chicken Fried Kabab (Per Kg)"],
  "chicken_lollipop.webp": ["Chicken Lollipop"],
  "chicken_manchurian.webp": ["Chicken Manchurian"],
  "chicken_popcorn.webp": ["Chicken Popcorn"],
  "chicken_satay.webp": ["Chicken Satay"],
  "chicken_wings.webp": ["Chicken Wings"],
  "curd_rice.webp": ["Curd Rice"],
  "ghee_rice.webp": ["Ghee Rice"],
  "jeera_rice.webp": ["Jeera Rice"],
  "masala_rice.webp": ["Masala Rice"],
  "paneer_biryani.webp": ["Paneer Biryani"],
  "paneer_fried_rice.webp": ["Paneer Fried Rice"],
  "veg_biryani.webp": ["Veg Biryani", "Veg Biryani (Half)"],
  "veg_chilli_garlic_rice.webp": ["Veg Chilli Garlic Fried Rice", "Veg Chilli Garlic Fried Rice (Schezwan)"],
  "veg_fried_rice.webp": ["Veg Fried Rice", "Veg Fried Rice (Schezwan)"]
};

// 1. Copy files to public/images/food with normalized names
console.log('--- Copying Files ---');
const fileUpdateMap = {}; // originalName -> newPublicPath

for (const [filename, itemNames] of Object.entries(mapping)) {
  const srcPath = path.join(srcDir, filename);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Warning: Source file not found: ${filename}`);
    continue;
  }
  
  // Clean filename for public: remove number prefix, replace underscores with hyphens
  const cleanName = filename.replace(/^\d+_/, '').replace(/_/g, '-');
  const destPath = path.join(destDir, cleanName);
  
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${filename} -> ${cleanName}`);
  
  fileUpdateMap[filename] = `/images/food/${cleanName}`;
}

// 2. Update menu.ts
console.log('\n--- Updating menu.ts ---');
let menuContent = fs.readFileSync(menuFile, 'utf8');

for (const [filename, itemNames] of Object.entries(mapping)) {
  const newPath = fileUpdateMap[filename];
  if (!newPath) continue;

  itemNames.forEach(itemName => {
    // Regex to find: name: 'Item Name', ... image: 'oldPath'
    // We look for name: 'itemName' then find the next image: 'path'
    // This is tricky with multiline regex. Let's use a more targeted approach.
    
    // Pattern matches the block starting with the name and capturing the image line
    // Escaping special characters in itemName for regex
    const escapedName = itemName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(name:\\s*['"]${escapedName}['"](?:.|\\n)*?image:\\s*['"])([^'"]+)(['"])`, 'g');
    
    if (menuContent.match(regex)) {
      menuContent = menuContent.replace(regex, `$1${newPath}$3`);
      console.log(`Updated image for: ${itemName} -> ${newPath}`);
    } else {
      console.warn(`Warning: Could not find item "${itemName}" in menu.ts`);
    }
  });
}

// Special case: Update Category Hero images if they match a prominent item
const categoryHeroMap = {
  'soups': '/images/food/veg-manchow-soup.webp', // Using Veg Manchow
  'mutton-starters': '/images/food/mutton-barbeque.webp',
  'tandoori-kababs': '/images/food/tandoori-chicken.webp',
  'beef-mains': '/images/food/beef-kadai.webp',
  'chicken-starters': '/images/food/chicken-65.webp',
  'beef-starters': '/images/food/beef-barbeque.webp',
  'veg-biryani-rice': '/images/food/veg-biryani.webp'
};

for (const [slug, newPath] of Object.entries(categoryHeroMap)) {
  const regex = new RegExp(`(slug:\\s*['"]${slug}['"](?:.|\\n)*?image:\\s*['"])([^'"]+)(['"])`);
  if (menuContent.match(regex)) {
    menuContent = menuContent.replace(regex, `$1${newPath}$3`);
    console.log(`Updated hero image for category: ${slug}`);
  }
}

// Signature Dishes update
const signatureMap = {
  'Beef Biryani': '/images/food/beef-biryani.webp',
  'Tandoori Chicken': '/images/food/tandoori-chicken.webp',
  'Beef Kadai': '/images/food/beef-kadai.webp',
  'Lazeez Kabab': '/images/food/lazeez-kabab.webp'
};

for (const [dishName, newPath] of Object.entries(signatureMap)) {
  const escapedDish = dishName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`({(?:.|\\n)*?name:\\s*['"]${escapedDish}['"](?:.|\\n)*?image:\\s*['"])([^'"]+)(['"])`, 'g');
  if (menuContent.match(regex)) {
    menuContent = menuContent.replace(regex, `$1${newPath}$3`);
    console.log(`Updated Signature Dish: ${dishName}`);
  }
}

fs.writeFileSync(menuFile, menuContent);
console.log('\nSUCCESS: menu.ts updated and images copied.');
