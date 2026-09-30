import { execSync } from 'child_process';
import fs from 'fs';

const clips = [
  // Hero clips - clean, rock solid, zero-shake
  {
    input: 'public/images/food/bacon-cheese-mez.jpg',
    output: 'public/video/hero/hero-01.mp4',
    duration: 6,
    filter: 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/food/wings.jpg',
    output: 'public/video/hero/hero-02.mp4',
    duration: 6,
    filter: 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/food/steak-on-the-rocks.jpg',
    output: 'public/video/hero/hero-03.mp4',
    duration: 6,
    filter: 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/gallery/gallery-01.jpg',
    output: 'public/video/hero/hero-04.mp4',
    duration: 6,
    filter: 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,eq=contrast=1.05:saturation=1.05'
  },
  // Category loops - clean, perfectly steady, NO SHAKE
  {
    input: 'public/images/food/basket-o-fries.jpg',
    output: 'public/video/categories/appetizers.mp4',
    duration: 5,
    filter: 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/food/super-mez.jpg',
    output: 'public/video/categories/burgers.mp4',
    duration: 5,
    filter: 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/food/erie-cheesesteak.jpg',
    output: 'public/video/categories/handhelds.mp4',
    duration: 5,
    filter: 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/food/steak-on-the-rocks.jpg',
    output: 'public/video/categories/plates.mp4',
    duration: 5,
    filter: 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/food/cheesecake.jpg',
    output: 'public/video/categories/dessert.mp4',
    duration: 5,
    filter: 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:saturation=1.05'
  },
  // Ambient & scrub loops - perfectly stable
  {
    input: 'public/images/restaurant/team-photo.jpg',
    output: 'public/video/ambient/kitchen-scrub.mp4',
    duration: 6,
    filter: 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,eq=contrast=1.05:saturation=1.05'
  },
  {
    input: 'public/images/food/single-mez.jpg',
    output: 'public/video/ambient/grill-flame.mp4',
    duration: 5,
    filter: 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:saturation=1.1'
  },
  {
    input: 'public/images/gallery/gallery-02.jpg',
    output: 'public/video/ambient/dining-lounge.mp4',
    duration: 5,
    filter: 'scale=960:540:force_original_aspect_ratio=increase,crop=960:540,eq=contrast=1.05:saturation=1.05'
  }
];

console.log('Generating steady, stable video loops with zero shake...');

for (const clip of clips) {
  if (!fs.existsSync(clip.input)) {
    console.log(`Skipping: ${clip.input}`);
    continue;
  }
  
  // Clean, perfectly still H.264 video with 0 shake
  const cmd = `ffmpeg -loop 1 -i "${clip.input}" -t ${clip.duration} -vf "${clip.filter}" -c:v libx264 -pix_fmt yuv420p -preset veryfast -crf 20 -movflags +faststart -an -y "${clip.output}"`;
  try {
    execSync(cmd, { stdio: 'ignore' });
    console.log(`✓ Stable ${clip.output}`);
  } catch (err) {
    console.error(`Error ${clip.output}:`, err.message);
  }
}

console.log('Zero-shake video generation complete.');
