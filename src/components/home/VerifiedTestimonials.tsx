import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../data/seedData';

export const VerifiedTestimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#15100C] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-line)] font-bold mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>VERIFIED PATRON REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
            FORT ERIE VOICES
          </h2>
          <p className="text-sm text-[var(--smoke)] mt-3">
            Real feedback from local diners, families, and regulars at 1267 Garrison Road.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#2B1D14] p-8 border border-white/10 relative flex flex-col justify-between hover:border-[var(--gold-line)]/50 transition-colors"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-[var(--gold-line)] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="text-xs uppercase font-bold tracking-wider text-[var(--ember)] mb-3">
                  {t.highlight}
                </div>

                <p className="font-serif-accent text-lg text-[var(--flour)]/90 leading-relaxed italic mb-6">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold uppercase text-[var(--flour)]">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-[var(--smoke)]">
                    {t.role}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
