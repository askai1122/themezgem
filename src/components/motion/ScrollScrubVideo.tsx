import React, { useEffect, useRef, useState } from 'react';

interface CalloutItem {
  progress: number;
  badge: string;
  title: string;
  body: string;
}

const callouts: CalloutItem[] = [
  {
    progress: 0.15,
    badge: 'FORT ERIE ROOTED',
    title: 'THE PASS IS ALWAYS ACTIVE',
    body: 'Located at #9 – 1267 Garrison Road. Fresh ingredients, high-heat flat-top smashing, and honest hospitality every day from 12:00 PM to 10:00 PM.'
  },
  {
    progress: 0.5,
    badge: '100% REAL KITCHEN',
    title: 'MEET THE TEAM BEHIND THE GRILL',
    body: 'From our kitchen crew tossing fresh wings and searing prime 8oz steaks on the rocks, to the friendly staff making every guest feel like family.'
  },
  {
    progress: 0.8,
    badge: 'COMMUNITY FIRST',
    title: 'MORE THAN A MEAL. PART OF FORT ERIE.',
    body: 'A true Canadian neighbourhood anchor. Unpretentious, bold, and welcoming to friends, families, car meets, and game-night crowds alike.'
  }
];

export const ScrollScrubVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [duration, setDuration] = useState(8);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollProgress(progress);

      if (videoRef.current && videoRef.current.duration) {
        const targetTime = progress * videoRef.current.duration;
        // Fast seek without jitter
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.08) {
          videoRef.current.currentTime = targetTime;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active callout
  const activeCallout = callouts.reduce((prev, curr) => {
    return Math.abs(curr.progress - scrollProgress) < Math.abs(prev.progress - scrollProgress) ? curr : prev;
  }, callouts[0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[var(--char)]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Scrubbed Video */}
        <video
          ref={videoRef}
          src="/video/ambient/kitchen-scrub.mp4"
          poster="/images/restaurant/team-photo.jpg"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 8)}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--char)]/90 via-[var(--char)]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--char)] via-transparent to-[var(--char)]/80" />
        <div className="video-overlay-grain opacity-50" />

        {/* Story Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Header kicker */}
            <div className="flex items-center gap-3 text-xs tracking-widest text-[var(--smoke)] uppercase font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--ember)] animate-pulse" />
              <span>IN THE KITCHEN · SCROLL TO EXPLORE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-[1.08] mb-6">
              MORE THAN A MEAL. <br />
              <span className="text-[var(--ember)]">PART OF THE COMMUNITY.</span>
            </h2>

            {/* Dynamic Card based on Scroll Progress */}
            <div className="bg-[var(--umber)]/90 backdrop-blur-md p-6 sm:p-8 rounded-none border border-white/10 hairline-gold relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--ember)]" />
              
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[var(--ember)] mb-2">
                {activeCallout.badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[var(--flour)] mb-3">
                {activeCallout.title}
              </h3>
              <p className="text-sm sm:text-base text-[var(--flour)]/80 leading-relaxed">
                {activeCallout.body}
              </p>
            </div>
          </div>

          {/* Right Progress indicator & Team preview */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between h-full">
            <div className="p-4 bg-black/40 backdrop-blur-md border border-white/10 text-right w-full sm:w-auto">
              <div className="text-xs uppercase text-[var(--smoke)] mb-1">Kitchen Timeline</div>
              <div className="text-2xl font-mono text-[var(--flour)] font-bold">
                {Math.round(scrollProgress * 100)}%
              </div>
              <div className="w-32 h-1 bg-white/10 mt-2 ml-auto overflow-hidden">
                <div
                  className="h-full bg-[var(--ember)] transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-8 text-xs text-[var(--smoke)] tracking-wide">
              Official Team Photo & Kitchen Pass Footage · Fort Erie, ON
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
