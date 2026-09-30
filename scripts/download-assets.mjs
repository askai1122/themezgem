import fs from 'fs';
import path from 'path';
import https from 'https';

const downloads = [
  { url: 'https://static.wixstatic.com/media/1672a2_080a9a7da0ae47b89eed97797c735d24~mv2.jpg', dest: 'public/images/hero/logo.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_79b6a8b2032c43bda987590864e203e4~mv2.jpeg', dest: 'public/images/restaurant/team-photo.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_1173c7cc3bd74be7a9d7b1b8be5c20a5~mv2.jpeg', dest: 'public/images/gallery/gallery-01.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_ed53c8ece65f4758827a247310e6ab63~mv2.jpeg', dest: 'public/images/gallery/gallery-02.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_f207a86181344299a97fd94e0b907567~mv2.jpeg', dest: 'public/images/gallery/gallery-03.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_a04be9f3b71444fbb2f824731ff1604c~mv2.jpeg', dest: 'public/images/gallery/gallery-04.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_c5ca84f8767941daa0823e3e619c5a6f~mv2.jpeg', dest: 'public/images/gallery/gallery-05.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_5e75e2e3e86d40dda48f21c8e3055243~mv2.jpg', dest: 'public/images/gallery/gallery-06.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_6d49d4f8cf8c4a95b0746dc8af7cfb39~mv2.jpeg', dest: 'public/images/gallery/gallery-07.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_52c252678c394b8aa5471de9d6bc61b4~mv2.jpg', dest: 'public/images/gallery/gallery-08.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_110833e8f86e46a5a2e6a7f01dbd2d0a~mv2.jpeg', dest: 'public/images/food/basket-o-fries.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_10ffaefddf65439384684f502027c84c~mv2.jpg', dest: 'public/images/food/basket-o-rings.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_a9e4a40a2a7e4c41a4ceaf5434a45938~mv2.jpg', dest: 'public/images/food/chips-dip.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_f184d32644fb4cb888983ccc8c2bcbf6~mv2.jpeg', dest: 'public/images/food/mozza-sticks.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_d62c1d1be5eb46ac9057d7223cf58d4d~mv2.jpeg', dest: 'public/images/food/jalapeno-poppers.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_ead8a45ea7524aeb94f8a7f18d4b26b3~mv2.jpg', dest: 'public/images/food/wings.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_da4904fce0964fcba2aa0f957032e7c5~mv2.jpg', dest: 'public/images/food/boneless-wings.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_5006c4608841484ab83488c16fca9a1d~mv2.jpg', dest: 'public/images/food/single-mez.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_d2b36a9ed1eb4a7faafd0d0f9b1e7acd~mv2.jpg', dest: 'public/images/food/bacon-cheese-mez.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_c2a1db7af1f044b5bee6d13f459ed331~mv2.jpg', dest: 'public/images/food/super-mez.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_af0157fdea5648679028c7d024602030~mv2.jpg', dest: 'public/images/food/erie-cheesesteak.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_7113704fe1c14d0f857ea86445fb1bb4~mv2.jpg', dest: 'public/images/food/pulled-pork.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_1d56b4ab4b324e28a61644944eaafd59~mv2.jpg', dest: 'public/images/food/fish-sandwich.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_a381ce7928ad49e7b752a8fdc0d15b19~mv2.jpg', dest: 'public/images/food/steak-on-the-rocks.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_6027158245804b74b4c00ad414c5bba3~mv2.jpg', dest: 'public/images/food/chicken-fingers.jpg' },
  { url: 'https://static.wixstatic.com/media/1672a2_233b0b854306419a8de3c39710cf11df~mv2.jpeg', dest: 'public/images/food/cheesecake.jpg' },
];

function download(url, dest) {
  return new Promise((resolve) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(true); });
        }).on('error', () => resolve(false));
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve(false);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading official brand assets...');
  let successCount = 0;
  for (const item of downloads) {
    const ok = await download(item.url, item.dest);
    if (ok) {
      successCount++;
      console.log(`✓ ${item.dest}`);
    } else {
      console.log(`✗ Failed to download ${item.url}`);
    }
  }
  console.log(`Downloaded ${successCount}/${downloads.length} assets.`);
}

run();
