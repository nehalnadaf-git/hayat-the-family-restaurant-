const fs = require('fs');
const menuPath = 'src/data/menu.ts';

let content = fs.readFileSync(menuPath, 'utf8');

const fillMissing = (categorySlug, fallbackImage) => {
    const categoryRegex = new RegExp(`slug: '${categorySlug}',([\\s\\S]+?items: \\[)([\\s\\S]+?)\\]`, 'g');
    content = content.replace(categoryRegex, (match, head, items) => {
        const updatedItems = items.split('\n').map(line => {
            if (line.includes('{ name:') && !line.includes('image:')) {
                return line.replace(/ },/, `, image: '${fallbackImage}' },`);
            }
            return line;
        }).join('\n');
        return head + updatedItems + ']';
    });
};

// Fill gaps with respective category images or best matches
fillMissing('mutton-starters', '/images/food/03_mutton_barbeque.webp');
fillMissing('tandoori-kababs', '/images/food/07_tandoori_chicken.webp');
fillMissing('beef-mains', '/images/food/14_beef_kadai.webp');
fillMissing('bulk-orders', '/images/food/19_bulk_beef_biryani.webp');

fs.writeFileSync(menuPath, content);
console.log('Filled remaining gaps in menu images.');
