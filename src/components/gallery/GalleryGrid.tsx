import React, { useState } from 'react';
import { Camera, Film, ChevronLeft, ChevronRight, X, Play, Pause, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../../types';
import { INITIAL_GALLERY } from '../../data/seedData';

export const GalleryGrid: React.FC = () => {
  const [items] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isReelMode, setIsReelMode] = useState<boolean>(false);
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isReelPaused, setIsReelPaused] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Restaurant', 'Food', 'Events', 'Drinks', 'Community'];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const videoItems = items.filter((item) => item.videoUrl);

  const handleNextReel = () => {
    setActiveReelIndex((prev) => (prev < videoItems.length - 1 ? prev + 1 : 0));
    setIsReelPaused(false);
  };

  const handlePrevReel = () => {
    setActiveReelIndex((prev) => (prev > 0 ? prev - 1 : videoItems.length - 1));
    setIsReelPaused(false);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#15100C] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--ember)] font-bold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>THE MEZ VISUAL VAULT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
              GALLERY & REELS
            </h2>
            <p className="text-sm text-[var(--smoke)] mt-2">
              Inside our dining lounge, open flat-top grill, and Fort Erie gatherings.
            </p>
          </div>

          {/* Mode Switcher: PHOTOS vs REEL */}
          <div className="flex items-center p-1 bg-[#2B1D14] border border-white/10 self-start md:self-end">
            <button
              onClick={() => setIsReelMode(false)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                !isReelMode
                  ? 'bg-[var(--ember)] text-white shadow-md'
                  : 'text-[var(--smoke)] hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>PHOTOS</span>
            </button>

            <button
              onClick={() => setIsReelMode(true)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                isReelMode
                  ? 'bg-[var(--ember)] text-white shadow-md'
                  : 'text-[var(--smoke)] hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>REELS MODE</span>
            </button>
          </div>
        </div>

        {/* REELS MODE (TikTok / Reels style full-screen-ish kinetic player) */}
        {isReelMode ? (
          <div className="relative max-w-lg mx-auto aspect-[9/16] bg-black border border-white/20 shadow-2xl overflow-hidden rounded-md group">
            {videoItems[activeReelIndex] && (
              <>
                <video
                  key={videoItems[activeReelIndex].videoUrl}
                  src={videoItems[activeReelIndex].videoUrl}
                  poster={videoItems[activeReelIndex].imageUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onClick={() => setIsReelPaused(!isReelPaused)}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Info */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white z-10">
                  <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[var(--ember)] animate-pulse" />
                    <span className="font-bold uppercase tracking-wider">
                      REEL {activeReelIndex + 1} / {videoItems.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsReelMode(false)}
                    className="p-1.5 bg-black/60 hover:bg-black text-white border border-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Story Info */}
                <div className="absolute bottom-6 left-5 right-5 z-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ember)]">
                    {videoItems[activeReelIndex].category}
                  </span>
                  <h4 className="text-xl font-bold uppercase font-display mt-0.5">
                    {videoItems[activeReelIndex].title}
                  </h4>
                  <p className="text-xs text-[var(--smoke)] mt-1">
                    Tap video to pause / resume · Swipe or use arrows to skip
                  </p>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevReel}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-black text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Previous reel"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNextReel}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-black text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Next reel"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        ) : (
          /* PHOTO MODE (Masonry Grid) */
          <>
            {/* Category Filter Pills (unboxed text style) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-bold uppercase tracking-wider">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 border transition-all ${
                    activeCategory === cat
                      ? 'border-[var(--ember)] bg-[var(--ember)]/15 text-[var(--flour)]'
                      : 'border-white/10 text-[var(--smoke)] hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry / Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-square overflow-hidden bg-[#2B1D14] border border-white/10 cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ember)]">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold uppercase font-display text-[var(--flour)] leading-snug">
                      {item.title}
                    </h4>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--flour)]/70">
                      <Maximize2 className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                      <span>Click to expand</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Lightbox Modal (Photo Mode) */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-20"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
                )
              }
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-white/10"
              />
              <div className="text-center mt-4">
                <div className="text-xs uppercase tracking-widest text-[var(--ember)] font-bold">
                  {filteredItems[lightboxIndex].category}
                </div>
                <div className="text-lg font-bold uppercase text-[var(--flour)] font-display mt-0.5">
                  {filteredItems[lightboxIndex].title}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
