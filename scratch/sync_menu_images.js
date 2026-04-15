const fs = require('fs');
const path = require('path');

const menuPath = 'src/data/menu.ts';
const foodImagesDir = 'public/images/food';

const files = fs.readdirSync(foodImagesDir);

let content = fs.readFileSync(menuPath, 'utf8');

// Helper to find a matching file
const findFile = (name) => {
    const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Check for exact matches with different extensions/separators
    const variants = [
        normalized + '.webp',
        name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') + '.webp',
        name.toLowerCase().replace(/ /g, '_').replace(/&/g, 'and') + '.webp'
    ];

    for (const v of variants) {
        if (files.includes(v)) return v;
    }

    // Check for numbered matches
    const numberedMatch = files.find(f => f.toLowerCase().includes(normalized) && /^\d+/.test(f));
    if (numberedMatch) return numberedMatch;

    // Check for partial matches
    const partialMatch = files.find(f => f.toLowerCase().includes(normalized));
    if (partialMatch) return partialMatch;

    return null;
};

// Precise mappings for known items based on the file list
const manualMappings = {
    'Tomato Soup': '01_tomato_soup.webp',
    'Veg Manchow Soup': '02_veg_manchow_soup.webp',
    'Veg Hot & Sour Soup': '03_veg_hot_sour_soup.webp',
    'Veg Clear Soup': '04_veg_clear_soup.webp',
    'Mushroom Manchow Soup': '05_mushroom_manchow_soup.webp',
    'Lemon Coriander Soup': '06_lemon_coriander_soup.webp',
    'Beef Manchow Soup': '07_beef_manchow_soup.webp',
    'Beef Hot & Sour Soup': '08_beef_hot_sour_soup.webp',
    'Beef Clear Soup': '09_beef_clear_soup.webp',
    'Chicken Manchow Soup': '10_chicken_manchow_soup.webp',
    'Chicken Hot & Sour Soup': '11_chicken_hot_sour_soup.webp',
    'Chicken Clear Soup': '12_chicken_clear_soup.webp',
    'Mutton Manchow Soup': '13_mutton_manchow_soup.webp',
    'Mutton Hot & Sour Soup': '14_mutton_hot_sour_soup.webp',
    'Mutton Clear Soup': '15_mutton_clear_soup.webp',
    
    'Mutton Pepper': '01_mutton_pepper.webp',
    'Mutton Oil Dry': '02_mutton_65.webp',
    'Mutton Chilli': '04_mutton_chilli.webp',
    'Mutton 65': '02_mutton_65.webp',
    'Mutton Hong Kong': '04_mutton_chilli.webp',
    'Mutton Barbeque': '03_mutton_barbeque.webp',
    'Mutton Garlic': '05_mutton_garlic.webp',
    'Mutton Spanish': '06_mutton_spanish.webp',
    
    'Tandoori Chicken Full': '07_tandoori_chicken.webp',
    'Tandoori Chicken Half': '07_tandoori_chicken.webp',
    'Gulzari Kabab': '09_gulzari_kabab.webp',
    'Lazeez Kabab': '08_lazeez_kabab.webp',
    'Tikka Kabab': '10_tikka_kabab.webp',
    'Pahadi Kabab': '11_pahadi_kabab.webp',
    'Sholay Kabab': '12_sholay_kabab.webp',
    
    'Beef Kolhapuri': '13_beef_kolhapuri.webp',
    'Beef Kadai': '14_beef_kadai.webp',
    'Beef Military': '15_beef_military.webp',
    'Beef Lahori': '16_beef_lahori.webp',
    'Beef Roghan Josh': '17_beef_roghan_josh.webp',
    'Beef Kheema': '18_beef_kheema.webp',

    'Beef Biryani \u2014 Basmati (Per Kg)': '19_bulk_beef_biryani.webp',
    'Chicken Biryani \u2014 Basmati (Per Kg)': '20_bulk_chicken_biryani.webp',
    'Mutton Biryani \u2014 Basmati (Per Kg)': '21_bulk_mutton_biryani.webp',
    'Veg Biryani \u2014 Basmati (Per Kg)': '22_bulk_veg_biryani.webp',
    'Beef Biryani \u2014 Jeera Rice (Per Kg)': '19_bulk_beef_biryani.webp',
    'Chicken Biryani \u2014 Jeera Rice (Per Kg)': '20_bulk_chicken_biryani.webp',
    'Mutton Biryani \u2014 Jeera Rice (Per Kg)': '21_bulk_mutton_biryani.webp',
};

// Parse categories and items
const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Update category images
    if (line.includes('slug: \'soups\'')) {
        let j = i;
        while (!lines[j].includes('image:')) j++;
        lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/02_veg_manchow_soup.webp');
    }
    if (line.includes('slug: \'mutton-starters\'')) {
        let j = i;
        while (!lines[j].includes('image:')) j++;
        lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/03_mutton_barbeque.webp');
    }
    if (line.includes('slug: \'tandoori-kababs\'')) {
        let j = i;
        while (!lines[j].includes('image:')) j++;
        lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/07_tandoori_chicken.webp');
    }
    if (line.includes('slug: \'beef-mains\'')) {
        let j = i;
        while (!lines[j].includes('image:')) j++;
        lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/14_beef_kadai.webp');
    }
    if (line.includes('slug: \'bulk-orders\'')) {
        let j = i;
        while (!lines[j].includes('image:')) j++;
        lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/19_bulk_beef_biryani.webp');
    }

    // Update item images
    const itemMatch = line.match(/{ name: '(.+?)',/);
    if (itemMatch) {
        const itemName = itemMatch[1];
        let mapped = manualMappings[itemName];
        
        if (!mapped) {
            mapped = findFile(itemName);
        }

        if (mapped) {
            if (line.includes('image:')) {
                line = line.replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, `/images/food/${mapped}`);
            } else {
                line = line.replace(/ },/, `, image: '/images/food/${mapped}' },`);
            }
        } else if (line.includes('image:')) {
            // Remove missing images to avoid 404s, but keep those we know might exist or are generic
            // For now, let's just see what's missing
        }
    }

    // Special cases for signature dishes
    if (i > 275) {
        if (line.includes('name: \'Beef Biryani\'')) {
            let j = i; while (!lines[j].includes('image:')) j++;
            lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/19_bulk_beef_biryani.webp');
        }
        if (line.includes('name: \'Tandoori Chicken\'')) {
            let j = i; while (!lines[j].includes('image:')) j++;
            lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/07_tandoori_chicken.webp');
        }
        if (line.includes('name: \'Beef Kadai\'')) {
            let j = i; while (!lines[j].includes('image:')) j++;
            lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/14_beef_kadai.webp');
        }
        if (line.includes('name: \'Lazeez Kabab\'')) {
            let j = i; while (!lines[j].includes('image:')) j++;
            lines[j] = lines[j].replace(/\/images\/food\/[a-zA-Z0-9_-]+\.webp/, '/images/food/08_lazeez_kabab.webp');
        }
    }

    newLines.push(line);
}

fs.writeFileSync(menuPath, newLines.join('\n'));
console.log('Menu images updated successfully.');
