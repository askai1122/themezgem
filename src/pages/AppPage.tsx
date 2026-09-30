import React from 'react';
import { AppShowcase } from '../components/home/AppShowcase';
import { ZahrionSalesCTA } from '../components/home/ZahrionSalesCTA';
import { Smartphone, Zap, Bell, Shield, Heart } from 'lucide-react';

interface AppPageProps {
  onNavigate: (route: string) => void;
}

export const AppPage: React.FC<AppPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-24 pb-20">
      {/* Interactive App Showcase */}
      <AppShowcase onNavigate={onNavigate} />

      {/* Feature Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase font-bold tracking-widest text-[var(--gold-line)] mb-2">
            MOBILE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-display text-[var(--flour)]">
            WHY A DEDICATED APP TRANSFORMS DINING
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#2B1D14] border border-white/10 space-y-3">
            <Zap className="w-8 h-8 text-[var(--ember)]" />
            <h3 className="text-lg font-bold uppercase font-display text-[var(--flour)]">
              ZERO-COMMISSION ORDERING
            </h3>
            <p className="text-xs text-[var(--smoke)] leading-relaxed">
              Bypass 30% third-party marketplace fees. Orders go straight from your guest's pocket to the kitchen pass with zero friction.
            </p>
          </div>

          <div className="p-8 bg-[#2B1D14] border border-white/10 space-y-3">
            <Bell className="w-8 h-8 text-[var(--gold-line)]" />
            <h3 className="text-lg font-bold uppercase font-display text-[var(--flour)]">
              DIRECT PUSH NOTIFICATIONS
            </h3>
            <p className="text-xs text-[var(--smoke)] leading-relaxed">
              Alert guests immediately when their order hits the grill, table is ready, or when Wednesday Wing specials go live.
            </p>
          </div>

          <div className="p-8 bg-[#2B1D14] border border-white/10 space-y-3">
            <Heart className="w-8 h-8 text-[var(--ember)]" />
            <h3 className="text-lg font-bold uppercase font-display text-[var(--flour)]">
              STICKY REPEAT PATRONAGE
            </h3>
            <p className="text-xs text-[var(--smoke)] leading-relaxed">
              Integrated loyalty points, favorite orders saved for 1-tap reordering, and exclusive community event access.
            </p>
          </div>
        </div>
      </div>

      <ZahrionSalesCTA />
    </div>
  );
};
