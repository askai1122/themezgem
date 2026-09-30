import React, { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export const ZahrionTechBadge: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      aria-label="Agency attribution"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-[80] transition-all duration-300 pointer-events-auto"
    >
      <a
        href="https://zahriontech.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2 bg-[#2B1D14]/95 hover:bg-[#3D2B1F] text-[#F3ECDD] border border-[#D9622B]/40 shadow-2xl backdrop-blur-md transition-all duration-300 group"
      >
        <span className="w-2 h-2 rounded-full bg-[#D9622B] shadow-[0_0_8px_#D9622B]" />
        
        <div className="flex flex-col text-left">
          <div className="text-[9px] uppercase tracking-widest text-[#8A7A6B] font-bold leading-tight">
            {expanded ? 'Custom Digital Experience' : 'Demo Built By'}
          </div>
          <div className="text-xs font-bold tracking-wider text-[#F3ECDD] flex items-center gap-1">
            <span>ZahrionTech</span>
            <ExternalLink className="w-3 h-3 text-[#D9622B] opacity-75 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {expanded && (
          <div className="hidden sm:flex items-center pl-2 border-l border-white/10 text-[11px] text-[#8A7A6B]">
            <Sparkles className="w-3 h-3 text-[#D9622B] mr-1" />
            <span>Hospitality Platform</span>
          </div>
        )}
      </a>
    </aside>
  );
};
