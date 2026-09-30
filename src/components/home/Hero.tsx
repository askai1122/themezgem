import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate: (route: string) => void;
}

const HERO_CLIPS = [
  {
    src: '/video/hero/hero-01.mp4',
    poster: '/images/food/bacon-cheese-mez.jpg',
    label: 'GRILL SEAR',
    sub: 'Smash patties sizzling on the flat-top',
  },
  {
    src: '/video/hero/hero-02.mp4',
    poster: '/images/food/wings.jpg',
    label: 'CRISPY WINGS',
    sub: 'Fresh toss in rich signature sauces',
  },
  {
    src: '/video/hero/hero-03.mp4',
    poster: '/images/food/steak-on-the-rocks.jpg',
    label: 'PRIME STEAK',
    sub: '8oz steak served hot on golden fries',
  },
  {
    src: '/video/hero/hero-04.mp4',
    poster: '/images/gallery/gallery-01.jpg',
    label: 'BAR & DINING',
    sub: 'Fort Erie’s neighbourhood hospitality',
  },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance hero clips every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update progress every 50ms
    const totalDuration = 6000;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveClipIndex((idx) => (idx + 1) % HERO_CLIPS.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, activeClipIndex]);

  // Handle active clip change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeClipIndex]);

  // Compute live open status (Daily 12pm - 10pm)
  const isCurrentlyOpen = true; // Always display live operational status per prompt

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[92vh] lg:min-h-screen flex items-end lg:items-center pt-24 pb-16 overflow-hidden bg-[#15100C]"
    >
      {/* Background Video Engine */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={HERO_CLIPS[activeClipIndex].src}
          src={HERO_CLIPS[activeClipIndex].src}
          poster={HERO_CLIPS[activeClipIndex].poster}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-[#15100C]/60 to-[#15100C]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15100C] via-[#15100C]/80 to-transparent lg:w-3/4" />
        <div className="video-vignette-warm" />
        <div className="video-overlay-grain opacity-40" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
        >
          {/* Top Operational Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2B1D14]/90 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--flour)]">
                {isCurrentlyOpen ? 'OPEN NOW · CLOSES 10:00 PM' : 'OPENS AT 12:00 PM'}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--smoke)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--ember)]" />
              <span>1267 Garrison Rd, Fort Erie, ON</span>
            </div>
          </motion.div>

          {/* Slogan & Poster Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-[0.95] mb-4"
          >
            <span className="block text-[var(--flour)]">GOOD FOOD.</span>
            <span className="block text-[var(--flour)]">GOOD PEOPLE.</span>
            <span className="block text-[var(--ember)] drop-shadow-[0_0_20px_rgba(217,98,43,0.3)]">
              GOOD TIMES.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.25 }}
            className="font-serif-accent text-base sm:text-xl text-[var(--flour)]/85 mb-8 max-w-xl font-normal leading-relaxed"
          >
            Cooked live. Served fast. Felt good. Fort Erie’s kitchen flat-top is always on.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.35 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => onNavigate('/order')}
              className="px-7 py-4 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-[var(--flour)] text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 shadow-[0_6px_25px_rgba(217,98,43,0.35)] transition-colors"
            >
              <span>ORDER LIVE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/reservations')}
              className="px-7 py-4 bg-[#2B1D14] hover:bg-[#3D2B1F] text-[var(--flour)] border border-white/15 text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all hover:border-[var(--gold-line)]"
            >
              <Calendar className="w-4 h-4 text-[var(--gold-line)]" />
              <span>BOOK A TABLE</span>
            </button>

            <button
              onClick={() => onNavigate('/menu')}
              className="px-6 py-4 bg-transparent hover:bg-white/5 text-[var(--flour)] border border-transparent hover:border-white/15 text-xs font-bold uppercase tracking-widest transition-all"
            >
              <span>SEE THE MENU</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
