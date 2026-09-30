import React from 'react';
import { Flame, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-[#2B1D14] border border-white/10 p-10 shadow-2xl relative">
        <div className="w-16 h-16 rounded-full bg-[var(--ember)]/20 text-[var(--ember)] mx-auto flex items-center justify-center mb-6">
          <Flame className="w-8 h-8 animate-pulse" />
        </div>

        <div className="text-xs uppercase tracking-widest text-[var(--ember)] font-bold mb-2">
          ERROR 404
        </div>

        <h1 className="text-4xl font-extrabold uppercase font-display text-[var(--flour)] mb-3">
          NOT FOUND.
        </h1>

        <p className="text-xs text-[var(--smoke)] leading-relaxed mb-8">
          Looks like you took a wrong turn off the Garrison Road. Let’s get you back to the grill.
        </p>

        <button
          onClick={() => onNavigate('/')}
          className="w-full py-3.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO THE MEZ</span>
        </button>
      </div>
    </div>
  );
};
