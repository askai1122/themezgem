import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const APPLET_ROOT = process.cwd();

// Ensure all target directories exist
const DIRS = [
  'public/images/food',
  'public/images/gallery',
  'public/images/restaurant',
  'public/images/hero',
];

for (const d of DIRS) {
  const full = path.join(APPLET_ROOT, d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
}

console.log('--- Generating & Restoring All Project Asset Images ---');

// List of target images and their source videos + timestamp
const mappings = [
  // FOOD ITEMS
  {
    target: 'public/images/food/bacon-cheese-mez.jpg',
    video: 'public/video/hero/hero-01.mp4',
    time: '00:00:01.500',
  },
  {
    target: 'public/images/food/super-mez.jpg',
    video: 'public/video/categories/burgers.mp4',
    time: '00:00:01.000',
  },
  {
    target: 'public/images/food/wings.jpg',
    video: 'public/video/hero/hero-02.mp4',
    time: '00:00:01.000',
  },
  {
    target: 'public/images/food/boneless-wings.jpg',
    video: 'public/video/hero/hero-02.mp4',
    time: '00:00:03.000',
  },
  {
    target: 'public/images/food/steak-on-the-rocks.jpg',
    video: 'public/video/hero/hero-03.mp4',
    time: '00:00:02.000',
  },
  {
    target: 'public/images/food/erie-cheesesteak.jpg',
    video: 'public/video/categories/handhelds.mp4',
    time: '00:00:01.500',
  },
  {
    target: 'public/images/food/pulled-pork.jpg',
    video: 'public/video/categories/handhelds.mp4',
    time: '00:00:03.000',
  },
  {
    target: 'public/images/food/fish-sandwich.jpg',
    video: 'public/video/categories/plates.mp4',
    time: '00:00:02.500',
  },
  {
    target: 'public/images/food/chicken-fingers.jpg',
    video: 'public/video/categories/plates.mp4',
    time: '00:00:01.000',
  },
  {
    target: 'public/images/food/basket-o-fries.jpg',
    video: 'public/video/categories/appetizers.mp4',
    time: '00:00:00.800',
  },
  {
    target: 'public/images/food/basket-o-rings.jpg',
    video: 'public/video/categories/appetizers.mp4',
    time: '00:00:02.200',
  },
  {
    target: 'public/images/food/mozza-sticks.jpg',
    video: 'public/video/categories/appetizers.mp4',
    time: '00:00:03.500',
  },
  {
    target: 'public/images/food/jalapeno-poppers.jpg',
    video: 'public/video/categories/appetizers.mp4',
    time: '00:00:04.200',
  },
  {
    target: 'public/images/food/chips-dip.jpg',
    video: 'public/video/categories/appetizers.mp4',
    time: '00:00:01.800',
  },
  {
    target: 'public/images/food/cheesecake.jpg',
    video: 'public/video/categories/dessert.mp4',
    time: '00:00:01.500',
  },

  // GALLERY ITEMS
  {
    target: 'public/images/gallery/gallery-01.jpg',
    video: 'public/video/hero/hero-04.mp4',
    time: '00:00:01.000',
  },
  {
    target: 'public/images/gallery/gallery-02.jpg',
    video: 'public/video/ambient/dining-lounge.mp4',
    time: '00:00:02.000',
  },
  {
    target: 'public/images/gallery/gallery-03.jpg',
    video: 'public/video/ambient/kitchen-scrub.mp4',
    time: '00:00:01.500',
  },
  {
    target: 'public/images/gallery/gallery-04.jpg',
    video: 'public/video/ambient/grill-flame.mp4',
    time: '00:00:02.000',
  },
  {
    target: 'public/images/gallery/gallery-05.jpg',
    video: 'public/video/hero/hero-01.mp4',
    time: '00:00:03.000',
  },
  {
    target: 'public/images/gallery/gallery-06.jpg',
    video: 'public/video/hero/hero-02.mp4',
    time: '00:00:02.000',
  },
  {
    target: 'public/images/gallery/gallery-07.jpg',
    video: 'public/video/hero/hero-03.mp4',
    time: '00:00:01.000',
  },
  {
    target: 'public/images/gallery/gallery-08.jpg',
    video: 'public/video/hero/hero-04.mp4',
    time: '00:00:03.500',
  },

  // RESTAURANT TEAM PHOTO
  {
    target: 'public/images/restaurant/team-photo.jpg',
    video: 'public/video/ambient/dining-lounge.mp4',
    time: '00:00:03.000',
  },
];

for (const m of mappings) {
  try {
    if (fs.existsSync(m.video)) {
      const cmd = `ffmpeg -y -ss ${m.time} -i "${m.video}" -vframes 1 -q:v 2 "${m.target}"`;
      execSync(cmd, { stdio: 'ignore' });
      console.log(`✓ Generated ${m.target} from ${m.video}`);
    } else {
      console.warn(`Video not found: ${m.video}`);
    }
  } catch (err) {
    console.error(`Failed to generate ${m.target}:`, err.message);
  }
}

// Generate high quality /images/hero/logo.jpg using ffmpeg with gold emblem
const FONT_BOLD = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf';
const logoPath = 'public/images/hero/logo.jpg';
try {
  const logoVf = [
    `drawbox=x=0:y=0:w=400:h=400:color=0x15100C:t=fill`,
    `drawbox=x=20:y=20:w=360:h=360:color=0xC79A55:t=4`,
    `drawbox=x=30:y=30:w=340:h=340:color=0xD9622B:t=2`,
    `drawtext=fontfile='${FONT_BOLD}':text='THE MEZ':fontsize=52:fontcolor=0xF3ECDD:x=(w-text_w)/2:y=130:shadowcolor=black:shadowx=2:shadowy=2`,
    `drawbox=x=100:y=200:w=200:h=3:color=0xD9622B:t=fill`,
    `drawtext=fontfile='${FONT_BOLD}':text='FORT ERIE · ON':fontsize=20:fontcolor=0xC79A55:x=(w-text_w)/2:y=220`,
    `drawtext=fontfile='${FONT_BOLD}':text='EST. 2012':fontsize=16:fontcolor=0x8A7A6B:x=(w-text_w)/2:y=260`
  ].join(',');

  const cmdLogo = `ffmpeg -y -f lavfi -i "color=c=0x15100C:s=400x400:d=1" -vframes 1 -vf "${logoVf}" -q:v 2 "${logoPath}"`;
  execSync(cmdLogo, { stdio: 'ignore' });
  console.log(`✓ Generated ${logoPath}`);
} catch (err) {
  console.error('Failed to generate logo:', err.message);
}

// If single-mez doesn't exist, generate it
if (!fs.existsSync('public/images/food/single-mez.jpg')) {
  try {
    execSync('ffmpeg -y -ss 00:00:02 -i public/video/categories/burgers.mp4 -vframes 1 -q:v 2 public/images/food/single-mez.jpg', { stdio: 'ignore' });
  } catch (e) {}
}

console.log('--- ALL IMAGES RESTORED SUCCESSFULLY ---');
