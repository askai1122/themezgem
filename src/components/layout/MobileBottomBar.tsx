import React from 'react';
import { ShoppingBag, Calendar, Phone } from 'lucide-react';

interface MobileBottomBarProps {
  onNavigate: (route: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onNavigate }) => {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#15100C]/95 backdrop-blur-md border-t border-white/10 px-3 py-2 flex items-center justify-around pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <button
        onClick={() => onNavigate('/order')}
        className="flex-1 flex flex-col items-center justify-center py-1.5 text-[var(--ember)] hover:text-white transition-colors"
      >
        <ShoppingBag className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">ORDER</span>
      </button>

      <button
        onClick={() => onNavigate('/reservations')}
        className="flex-1 flex flex-col items-center justify-center py-1.5 text-[var(--flour)] hover:text-[var(--ember)] transition-colors"
      >
        <Calendar className="w-5 h-5 mb-1 text-[var(--gold-line)]" />
        <span className="text-[10px] font-bold uppercase tracking-wider">BOOK</span>
      </button>

      <a
        href="tel:2893209866"
        className="flex-1 flex flex-col items-center justify-center py-1.5 text-[var(--flour)] hover:text-[var(--ember)] transition-colors"
      >
        <Phone className="w-5 h-5 mb-1 text-[var(--smoke)]" />
        <span className="text-[10px] font-bold uppercase tracking-wider">CALL</span>
      </a>
    </nav>
  );
};
