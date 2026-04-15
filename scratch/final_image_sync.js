const fs = require('fs');
const menuPath = 'src/data/menu.ts';

// Complete mapping of all newly added exact images
const NEW_MAPPINGS = {
  // Veg Mains
  'Paneer Kolhapuri':                        '01_paneer_kolhapuri.webp',
  'Paneer Handi':                            '02_paneer_handi.webp',
  'Kaju Paneer Masala':                      '03_kaju_paneer_masala.webp',
  'Paneer Tikka Masala':                     '04_paneer_tikka_masala.webp',
  'Mushroom Kolhapuri':                      '05_mushroom_kolhapuri.webp',

  // Veg Biryani & Rice
  'Mix Fried Rice':                          '06_mix_fried_rice.webp',
  'Mix Fried Rice (Schezwan)':               '07_mix_fried_rice_schezwan.webp',
  'Veg Fried Rice (Schezwan)':               '08_veg_fried_rice_schezwan.webp',
  'Veg Chilli Garlic Fried Rice (Schezwan)': '09_veg_chilli_garlic_fried_rice.webp',
  'Paneer Fried Rice (Schezwan)':            '10_paneer_fried_rice_schezwan.webp',

  // Chicken Starters
  'Chicken Don':                             '11_chicken_don.webp',
  'Chicken Finger':                          '12_chicken_finger.webp',
  'Chicken Pepper':                          '13_chicken_pepper.webp',
  'Chicken Oil Dry':                         '14_chicken_oil_dry.webp',
  'Chicken Hong Kong':                       '15_chicken_hong_kong.webp',
  'Chicken Honey Lemon':                     '16_chicken_honey_lemon.webp',
  'Chicken Barbeque':                        '17_chicken_barbeque.webp',
  'Chicken Oyster':                          '18_chicken_oyster.webp',
  'Chicken Schezwan':                        '19_chicken_schezwan.webp',
  'Chicken Crispy':                          '20_chicken_crispy.webp',
  'Chicken Pudina':                          '21_chicken_pudina.webp',
  'Chicken Garlic':                          '22_chicken_garlic.webp',
  'Chicken Spanish':                         '23_chicken_spanish.webp',
  'Chicken Doppler':                         '24_chicken_doppler.webp',
  'Chicken Chowchow':                        '25_chicken_chowchow.webp',
  'Chicken Sushmi':                          '26_chicken_sushmi.webp',
  'Chicken Lemon':                           '27_chicken_lemon.webp',

  // Mutton Starters
  'Mutton Honey Lemon':                      '28_mutton_honey_lemon.webp',
  'Mutton Oyster':                           '29_mutton_oyster.webp',
  'Mutton Schezwan':                         '30_mutton_schezwan.webp',
  'Mutton Manchurian':                       '31_mutton_manchurian.webp',
  'Mutton Crispy':                           '32_mutton_crispy.webp',
  'Mutton Pudina':                           '33_mutton_pudina.webp',
  'Mutton Dragon':                           '34_mutton_dragon.webp',
  'Mutton Lemon':                            '35_mutton_lemon.webp',
  'Mutton Doppler':                          '36_mutton_doppler.webp',
  'Mutton Hong Kong':                        '37_mutton_hong_kong.webp',

  // Beef Starters
  'Beef Hong Kong':                          '38_beef_hong_kong.webp',
  'Beef Oyster':                             '39_beef_oyster.webp',
  'Beef Schezwan':                           '40_beef_schezwan.webp',
  'Beef Pudina':                             '41_beef_pudina.webp',
  'Beef Garlic':                             '42_beef_garlic.webp',
  'Beef Lemon':                              '43_beef_lemon.webp',

  // Beef Mains
  'Beef Hyderabadi':                         '44_beef_hyderabadi.webp',
  'Beef Handi':                              '45_beef_handi.webp',
  'Beef Makhanwala':                         '46_beef_makhanwala.webp',
  'Beef Kaboli':                             '47_beef_kaboli.webp',
  'Beef Afghani':                            '48_beef_afghani.webp',
  'Beef Bhuna Masala':                       '49_beef_bhuna_masala.webp',
  'Beef Dopyaza':                            '50_beef_dopyaza.webp',
  'Beef Masala':                             '51_beef_masala.webp',
  'Beef Pasanda':                            '52_beef_pasanda.webp',
  'Beef Kudchan Masala':                     '53_beef_kudchan_masala.webp',
  'Beef Chatpata Masala':                    '54_beef_chatpata_masala.webp',
  'Beef Lababdar Masala':                    '55_beef_lababdar_masala.webp',
  'Kheema Dry':                              '56_kheema_dry.webp',
  'Beef Kheema Mutter':                      '57_beef_kheema_mutter.webp',

  // Kababs
  'Angara Kabab':                            'angara_kabab.webp',
  'Kasturi Kabab':                           'kasturi_kabab.webp',
  'Malwani Kabab':                           'malwani_kabab.webp',
  'Murg Banjara':                            'murg_banjara.webp',
  'Murg Cheese Kabab':                       'murg_cheese_kabab.webp',
  'Murg Hariyali':                           'murg_hariyali.webp',
  'Murg Lasooni Kabab':                      'murg_lasooni_kabab.webp',
  'Pakeeza Kabab':                           'pakeeza_kabab.webp',
  'Tangadi Kabab (1 pc)':                    'tangadi_kabab.webp',

  // Bulk Orders
  'Beef Biryani \u2014 Jeera Rice (Per Kg)':    'beef_biryani_jeera_rice.webp',
  'Chicken Biryani \u2014 Jeera Rice (Per Kg)': '20_bulk_chicken_biryani.webp', // already correct
  'Mutton Biryani \u2014 Jeera Rice (Per Kg)':  '21_bulk_mutton_biryani.webp',  // already correct
  'Khushka \u2014 Basmati (Per Kg)':            'khushka_basmati.webp',
  'Khushka \u2014 Jeera Rice (Per Kg)':         'khushka_jeera_rice.webp',
  'Beef Gravy (Per Kg)':                     'beef_gravy.webp',
  'Chicken Gravy (Per Kg)':                  'chicken_gravy.webp',
};

let content = fs.readFileSync(menuPath, 'utf8');
const lines = content.split('\n');
let updatedCount = 0;

const updated = lines.map(line => {
  const nameMatch = line.match(/{ name: '(.+?)'/);
  if (!nameMatch) return line;

  const itemName = nameMatch[1];
  const newImg = NEW_MAPPINGS[itemName];
  if (!newImg) return line;

  const imgPath = `/images/food/${newImg}`;

  if (line.includes('image:')) {
    updatedCount++;
    return line.replace(/image: '[^']*'/, `image: '${imgPath}'`);
  } else {
    updatedCount++;
    return line.replace(/ },\s*$/, `, image: '${imgPath}' },`);
  }
});

content = updated.join('\n');
fs.writeFileSync(menuPath, content);
console.log(`SUCCESS: Updated ${updatedCount} items with exact product images.`);
