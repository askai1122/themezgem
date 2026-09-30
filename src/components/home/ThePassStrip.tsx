import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HoverPlayVideo } from '../motion/HoverPlayVideo';

interface ThePassStripProps {
  onNavigate: (route: string) => void;
}

const PASS_ITEMS = [
  {
    title: 'ORDER ONLINE',
    sub: 'Pickup hot in 20–30 mins',
    route: '/order',
    video: '/video/categories/burgers.mp4',
    poster: '/images/food/bacon-cheese-mez.jpg',
  },
  {
    title: 'RESERVE A TABLE',
    sub: 'Daily seatings 12PM–10PM',
    route: '/reservations',
    video: '/video/ambient/dining-lounge.mp4',
    poster: '/images/gallery/gallery-02.jpg',
  },
  {
    title: "TONIGHT'S MENU",
    sub: 'Smash burgers, wings & plates',
    route: '/menu',
    video: '/video/categories/plates.mp4',
    poster: '/images/food/steak-on-the-rocks.jpg',
  },
  {
    title: 'FIND US',
    sub: '1267 Garrison Rd, Fort Erie',
    route: '/contact',
    video: '/video/hero/hero-04.mp4',
    poster: '/images/gallery/gallery-01.jpg',
  },
];

export const ThePassStrip: React.FC<ThePassStripProps> = ({ onNavigate }) => {
  return (
    <section className="relative z-20 bg-[#2B1D14] border-y border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {PASS_ITEMS.map((item) => (
          <button
            key={item.title}
            onClick={() => onNavigate(item.route)}
            className="group relative p-6 sm:p-7 flex items-center justify-between text-left overflow-hidden hover:bg-[#3D2B1F]/60 transition-colors focus:outline-none"
          >
            {/* Background Looped Video Thumbnail */}
            <div className="absolute top-0 right-0 w-28 h-full opacity-25 group-hover:opacity-45 transition-opacity overflow-hidden pointer-events-none">
              <HoverPlayVideo
                src={item.video}
                poster={item.poster}
                autoPlayInView={true}
                className="w-full h-full"
              />
            </div>

            <div className="relative z-10 pr-4">
              <div className="text-[10px] uppercase tracking-widest text-[var(--smoke)] mb-1 font-bold">
                THE PASS
              </div>
              <h3 className="text-base sm:text-lg font-extrabold uppercase font-display text-[var(--flour)] group-hover:text-[var(--ember)] transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--smoke)] mt-1">{item.sub}</p>
            </div>

            <div className="relative z-10 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[var(--flour)] group-hover:border-[var(--ember)] group-hover:bg-[var(--ember)] group-hover:text-white transition-all flex-shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
