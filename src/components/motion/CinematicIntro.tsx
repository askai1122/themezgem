import React, { useEffect, useState } from 'react';
import { useUIStore } from '../../stores';

export const CinematicIntro: React.FC = () => {
  const { introSeen, setIntroSeen } = useUIStore();
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion or already seen intro, skip immediately
    if (introSeen || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      setDismissed(true);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 300); // Reveal "THE MEZ"
    const t2 = setTimeout(() => setStep(2), 900); // Slogan ignite
    const t3 = setTimeout(() => setStep(3), 1600); // Hero ignite
    const t4 = setTimeout(() => {
      setDismissed(true);
      setIntroSeen(true);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [introSeen, setIntroSeen]);

  if (dismissed) return null;

  return (
    <div
      onClick={() => {
        setDismissed(true);
        setIntroSeen(true);
      }}
      className={`fixed inset-0 z-[9999] bg-[#15100C] flex flex-col items-center justify-center transition-opacity duration-700 cursor-pointer ${
        step === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background warm ember flare */}
      <div className="absolute inset-0 bg-radial from-[rgba(217,98,43,0.18)] to-transparent pointer-events-none opacity-60" />

      <div className="text-center px-6 relative z-10 max-w-2xl">
        {/* Brand name */}
        <div
          className={`transition-all duration-700 transform ${
            step >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="text-xs tracking-[0.35em] uppercase text-[var(--smoke)] mb-2 font-semibold">
            FORT ERIE, ONTARIO
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-none">
            THE MEZ
          </h1>
          <div className="text-sm sm:text-base tracking-[0.25em] uppercase text-[var(--smoke)] mt-1 font-bold">
            BAR & GRILL
          </div>
        </div>

        {/* Gold hairline */}
        <div
          className={`h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-line)] to-transparent my-6 mx-auto transition-all duration-700 ${
            step >= 2 ? 'w-48 opacity-70' : 'w-0 opacity-0'
          }`}
        />

        {/* Slogan */}
        <div
          className={`transition-all duration-700 ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-serif-accent text-lg sm:text-2xl text-[var(--flour)] font-medium tracking-wide">
            Good Food. Good People. Good Times.
          </p>
        </div>

        <div className="mt-8 text-[11px] uppercase tracking-widest text-[var(--smoke)]/70">
          Click anywhere to skip
        </div>
      </div>
    </div>
  );
};
