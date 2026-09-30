import React from 'react';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';

export const ZahrionSalesCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#2B1D14] border-t border-white/10 relative overflow-hidden text-center">
      {/* Background ambient loop */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <video
          src="/video/ambient/dining-lounge.mp4"
          poster="/images/gallery/gallery-02.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2B1D14]/80" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#15100C]/80 border border-[#D9622B]/40 text-xs font-bold uppercase tracking-wider text-[var(--flour)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--gold-line)]" />
          <span>BESPOKE HOSPITALITY DIGITAL ECOSYSTEM</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-tight">
          READY TO TAKE THE MEZ <br />
          <span className="text-[var(--ember)]">DIGITAL?</span>
        </h2>

        <p className="text-sm sm:text-base text-[var(--flour)]/85 max-w-2xl mx-auto leading-relaxed">
          A connected digital experience can bring your restaurant's menu, live ordering, table reservations, events, loyalty rewards, and customer relationships into one cohesive, high-converting platform.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://zahriontech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-[var(--flour)] text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>REQUEST A QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://zahriontech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#15100C] hover:bg-black text-[var(--flour)] border border-white/20 text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all"
          >
            <span>TALK TO ZAHRIONTECH</span>
            <ExternalLink className="w-4 h-4 text-[var(--gold-line)]" />
          </a>
        </div>
      </div>
    </section>
  );
};
