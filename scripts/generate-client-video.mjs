import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const APPLET_ROOT = process.cwd();
const OUT_DIR = path.join(APPLET_ROOT, 'public/video/presentation');
const TEMP_DIR = path.join(APPLET_ROOT, 'temp_video_build');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const FONT_BOLD = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf';
const FONT_REG = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf';

console.log('=== STARTING 1080p CLIENT PRESENTATION VIDEO COMPILATION ===');

const scenes = [
  {
    id: '01_intro',
    duration: 7,
    videoSrc: null, // color background
    badge: 'ZAHRIONTECH DIGITAL PRESENTATION',
    title: 'THE MEZ  ·  FORT ERIE',
    subtitle: 'Bespoke Hospitality Digital Platform & Mobile Ecosystem',
    detail1: '1267 Garrison Road · Fort Erie, Ontario, Canada',
    detail2: 'Interactive Client Proposal & Platform Walkthrough',
  },
  {
    id: '02_brand',
    duration: 8,
    videoSrc: 'public/video/hero/hero-01.mp4', // Flat-top smash burger
    badge: 'CHAPTER 01  ·  BRAND & STOREFRONT',
    title: 'GOOD FOOD. GOOD PEOPLE. GOOD TIMES.',
    subtitle: 'Cinematic visual presence tailored to Fort Erie local culture',
    detail1: '• Live Restaurant Operating Hours (12:00 PM – 10:00 PM)',
    detail2: '• Instant 1-Click Action Flow (Order / Reserve / Menu)',
  },
  {
    id: '03_menu',
    duration: 8,
    videoSrc: 'public/video/hero/hero-02.mp4', // Wings & sauce
    badge: 'CHAPTER 02  ·  INTERACTIVE MENU',
    title: 'FULL LIVE KITCHEN MENU & SPECIALS',
    subtitle: 'High-res culinary catalog with real-time filtering & custom modifiers',
    detail1: '• 10 Distinct Categories (Smash Burgers, Wings, Plates, Sides)',
    detail2: '• Dietary Badges, Add-ons & Sauce Customizer',
  },
  {
    id: '04_ordering',
    duration: 8,
    videoSrc: 'public/video/categories/handhelds.mp4', // Cheesesteak
    badge: 'CHAPTER 03  ·  COMMISSION-FREE ORDERING',
    title: 'SEAMLESS ONLINE ORDERING PASS',
    subtitle: 'Keeps 100% of revenue direct without third-party marketplace fees',
    detail1: '• 15-Minute Pickup Scheduling & Instructions Box',
    detail2: '• Preset 10%/15%/20% Tip Matrix & Live Checkout',
  },
  {
    id: '05_reservations',
    duration: 8,
    videoSrc: 'public/video/ambient/dining-lounge.mp4', // Dining lounge
    badge: 'CHAPTER 04  ·  TABLE RESERVATIONS',
    title: 'REAL-TIME TABLE & EVENT BOOKING',
    subtitle: 'Frictionless table reservation engine for dining room & sports nights',
    detail1: '• Live Time Slots (12:00 PM – 9:30 PM) & Party Size',
    detail2: '• Special Request Management & Instant Confirmation',
  },
  {
    id: '06_rewards',
    duration: 8,
    videoSrc: 'public/video/categories/plates.mp4', // Steak
    badge: 'CHAPTER 05  ·  VIP RETENTION & LOYALTY',
    title: 'GARRISON VIP REWARDS ENGINE',
    subtitle: 'Tiered patron retention program that drives recurring visits',
    detail1: '• Earn 10 Points per $1 Spent on Food & Drinks',
    detail2: '• Tier Progression: Fort Member -> Garrison VIP',
  },
  {
    id: '07_app',
    duration: 8,
    videoSrc: 'public/video/categories/burgers.mp4', // Burger
    badge: 'CHAPTER 06  ·  MOBILE APP ECOSYSTEM',
    title: 'THE MEZ IN YOUR POCKET',
    subtitle: 'Dedicated mobile app vision engineered for regular patrons',
    detail1: '• 1-Thumb Reordering for Fort Erie Regulars',
    detail2: '• Instant Digital Perks & Push-Ready Architecture',
  },
  {
    id: '08_admin',
    duration: 8,
    videoSrc: 'public/video/ambient/kitchen-scrub.mp4', // Kitchen scrub
    badge: 'CHAPTER 07  ·  OPERATIONAL CONTROL HUB',
    title: 'KITCHEN PASS & LIVE ADMIN DASHBOARD',
    subtitle: 'Complete back-of-house operational control for management',
    detail1: '• Real-Time Order Pipeline (Received -> Confirmed -> Ready -> Done)',
    detail2: '• Menu Item Inventory, Pricing & Live Status Controls',
  },
  {
    id: '09_outro',
    duration: 8,
    videoSrc: null, // Outro
    badge: 'ENGINEERED BY ZAHRIONTECH',
    title: 'READY FOR FULL PRODUCTION LAUNCH',
    subtitle: 'Delivering Next-Generation Digital Experiences for Hospitality',
    detail1: '• Custom Tailored for The Mez (Fort Erie, Ontario)',
    detail2: '• Agency Portal: https://zahriontech.com',
  },
];

const clipFiles = [];

for (let i = 0; i < scenes.length; i++) {
  const s = scenes[i];
  const outClip = path.join(TEMP_DIR, `scene_${s.id}.mp4`);
  clipFiles.push(outClip);

  console.log(`[${i + 1}/${scenes.length}] Compiling scene: ${s.title}`);

  // Create text files for each text element to avoid escaping issues
  const fBadge = path.join(TEMP_DIR, `badge_${s.id}.txt`);
  const fTitle = path.join(TEMP_DIR, `title_${s.id}.txt`);
  const fSub = path.join(TEMP_DIR, `sub_${s.id}.txt`);
  const fDet1 = path.join(TEMP_DIR, `det1_${s.id}.txt`);
  const fDet2 = path.join(TEMP_DIR, `det2_${s.id}.txt`);

  fs.writeFileSync(fBadge, s.badge);
  fs.writeFileSync(fTitle, s.title);
  fs.writeFileSync(fSub, s.subtitle);
  fs.writeFileSync(fDet1, s.detail1);
  fs.writeFileSync(fDet2, s.detail2);

  let inputArg = '';
  let baseVf = '';

  if (s.videoSrc && fs.existsSync(s.videoSrc)) {
    // Loop the source video clip for the scene duration
    inputArg = `-stream_loop -1 -i "${s.videoSrc}" -t ${s.duration}`;
    baseVf = `scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,drawbox=x=0:y=0:w=1920:h=1080:color=black@0.62:t=fill,drawbox=x=0:y=0:w=1920:h=120:color=black@0.4:t=fill,drawbox=x=0:y=960:w=1920:h=120:color=black@0.4:t=fill`;
  } else {
    inputArg = `-f lavfi -i "color=c=0x15100C:s=1920x1080:d=${s.duration}:r=30"`;
    baseVf = `drawbox=x=0:y=0:w=1920:h=1080:color=0x2B1D14@0.3:t=fill`;
  }

  const vf = [
    baseVf,
    // Top ember accent line
    `drawbox=x=120:y=175:w=80:h=4:color=0xD9622B:t=fill`,
    // Category/Chapter Badge
    `drawtext=fontfile='${FONT_BOLD}':textfile='${fBadge}':fontsize=22:fontcolor=0xC79A55:x=220:y=166:shadowcolor=black@0.9:shadowx=2:shadowy=2`,
    // Headline
    `drawtext=fontfile='${FONT_BOLD}':textfile='${fTitle}':fontsize=54:fontcolor=0xF3ECDD:x=120:y=240:shadowcolor=black@0.9:shadowx=3:shadowy=3`,
    // Subtitle
    `drawtext=fontfile='${FONT_REG}':textfile='${fSub}':fontsize=26:fontcolor=0xCCCCCC:x=120:y=330:shadowcolor=black@0.8:shadowx=2:shadowy=2`,
    // Feature Highlight Box
    `drawbox=x=120:y=420:w=1680:h=230:color=0x2B1D14@0.88:t=fill`,
    `drawbox=x=120:y=420:w=1680:h=230:color=0xC79A55@0.25:t=2`,
    `drawbox=x=120:y=420:w=10:h=230:color=0xD9622B:t=fill`,
    // Feature Bullet 1
    `drawtext=fontfile='${FONT_BOLD}':textfile='${fDet1}':fontsize=32:fontcolor=0xF3ECDD:x=170:y=480:shadowcolor=black@0.8:shadowx=2:shadowy=2`,
    // Feature Bullet 2
    `drawtext=fontfile='${FONT_BOLD}':textfile='${fDet2}':fontsize=32:fontcolor=0xC79A55:x=170:y=550:shadowcolor=black@0.8:shadowx=2:shadowy=2`,
    // Footer Watermark
    `drawtext=fontfile='${FONT_REG}':text='THE MEZ FORT ERIE  ·  DIGITAL ECOSYSTEM':fontsize=18:fontcolor=0x8A7A6B:x=120:y=990`,
    `drawtext=fontfile='${FONT_BOLD}':text='DELIVERED BY ZAHRIONTECH':fontsize=18:fontcolor=0xD9622B:x=1520:y=990`,
    // Smooth fade in / out
    `fade=t=in:st=0:d=0.5,fade=t=out:st=${s.duration - 0.5}:d=0.5`
  ].join(',');

  const cmd = `ffmpeg -y ${inputArg} -vf "${vf}" -c:v libx264 -pix_fmt yuv420p -preset veryfast -crf 19 -r 30 -an "${outClip}"`;
  execSync(cmd, { stdio: 'ignore' });
}

console.log('All individual scene clips rendered successfully.');

// Create concat list
const concatListPath = path.join(TEMP_DIR, 'concat_list.txt');
const listContent = clipFiles.map(f => `file '${f}'`).join('\n');
fs.writeFileSync(concatListPath, listContent);

// Generate gentle ambient soundtrack
const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);
const audioFile = path.join(TEMP_DIR, 'presentation_audio.aac');

console.log(`Generating harmonic soundscape (${totalDuration}s)...`);
const audioCmd = `ffmpeg -y -f lavfi -i "sine=frequency=110:duration=${totalDuration}[b1]; sine=frequency=220:duration=${totalDuration}[b2]; sine=frequency=330:duration=${totalDuration}[b3]; [b1][b2][b3]amix=inputs=3,volume=0.12,lowpass=f=750,afade=t=in:st=0:d=2,afade=t=out:st=${totalDuration - 2}:d=2" -c:a aac -b:a 192k "${audioFile}"`;
execSync(audioCmd, { stdio: 'ignore' });

// Final concatenation
const finalOutput = path.join(OUT_DIR, 'the-mez-client-presentation-1080p.mp4');
console.log(`Merging final 1080p landscape master: ${finalOutput}`);

const mergeCmd = `ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -i "${audioFile}" -c:v copy -c:a aac -movflags +faststart "${finalOutput}"`;
execSync(mergeCmd, { stdio: 'ignore' });

console.log('=== VIDEO MASTER GENERATION COMPLETE! ===');
const stats = fs.statSync(finalOutput);
console.log(`Final File: ${finalOutput} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);

// Clean up temp build folder
fs.rmSync(TEMP_DIR, { recursive: true, force: true });
console.log('Temporary build files cleaned up.');
