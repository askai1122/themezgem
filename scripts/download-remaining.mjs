import fs from 'fs';
import path from 'path';
import https from 'https';

const downloads = [
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
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
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
    });
    req.on('error', () => resolve(false));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function run() {
  for (const item of downloads) {
    if (fs.existsSync(item.dest)) {
      console.log(`already exists: ${item.dest}`);
      continue;
    }
    const ok = await download(item.url, item.dest);
    console.log(`${ok ? '✓' : '✗'} ${item.dest}`);
  }
}

run();
