import React, { useState } from 'react';
import { Smartphone, Sparkles, ExternalLink, ArrowRight, Flame, Bell, Award, Calendar } from 'lucide-react';

interface AppShowcaseProps {
  onNavigate: (route: string) => void;
}

export const AppShowcase: React.FC<AppShowcaseProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Order' | 'Reservations' | 'Rewards'>('Home');

  return (
    <section className="py-20 sm:py-28 bg-[#15100C] border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[var(--ember)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-line)] font-bold">
              <Smartphone className="w-4 h-4" />
              <span>DIGITAL ECOSYSTEM VISION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-[1.02]">
              THE MEZ IN <br />
              <span className="text-[var(--ember)]">YOUR POCKET.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--flour)]/80 leading-relaxed max-w-xl">
              Imagine your guests ordering smash burgers with a single thumb-tap, booking tables for hockey night in seconds, and redeeming rewards on the patio.
            </p>

            <div className="p-4 bg-[#2B1D14] border border-white/10 text-xs text-[var(--smoke)] leading-relaxed">
              <span className="font-bold text-[var(--gold-line)] uppercase mr-1">
                CONCEPT DEMONSTRATION:
              </span>
              This showcases what a dedicated custom mobile app designed by ZahrionTech could deliver for The Mez’s patrons.
            </div>

            {/* Interactive Screen Tabs */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(['Home', 'Order', 'Reservations', 'Rewards'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                    activeTab === tab
                      ? 'border-[var(--ember)] bg-[var(--ember)] text-white shadow-md'
                      : 'border-white/10 text-[var(--smoke)] hover:border-white/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate('/app')}
                className="px-6 py-3.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-[var(--flour)] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all"
              >
                <span>EXPLORE THE APP VISION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://zahriontech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/20 text-[var(--flour)] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <span>TALK TO ZAHRIONTECH</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--gold-line)]" />
              </a>
            </div>
          </div>

          {/* Right Realistic iPhone Mockup Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-[300px] sm:w-[320px] aspect-[9/19] bg-[#000] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)] border-4 border-[#2B1D14]">
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111]" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-950/60" />
              </div>

              {/* Inner Screen */}
              <div className="w-full h-full bg-[#15100C] rounded-[40px] overflow-hidden flex flex-col justify-between pt-10 pb-6 px-4 text-[#F3ECDD] relative">
                {/* Screen Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <div className="text-[10px] text-[var(--smoke)] uppercase font-bold">THE MEZ APP</div>
                    <div className="text-xs font-extrabold text-[var(--flour)] uppercase">1267 Garrison Rd</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[var(--ember)]/20 flex items-center justify-center text-[var(--ember)]">
                    <Bell className="w-3 h-3" />
                  </div>
                </div>

                {/* Simulated Screen Content based on activeTab */}
                <div className="flex-1 py-4 overflow-hidden flex flex-col justify-center">
                  {activeTab === 'Home' && (
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                        <img
                          src="/images/food/bacon-cheese-mez.jpg"
                          alt="Bacon Cheese Mez"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[var(--ember)]">
                            Flat-Top Sizzle
                          </span>
                          <span className="text-xs font-bold uppercase text-white leading-tight">
                            Bacon Cheese Mez
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#2B1D14] rounded-lg border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[var(--smoke)] uppercase">Loyalty Balance</div>
                          <div className="text-sm font-bold font-mono text-[var(--gold-line)]">1,240 PTS</div>
                        </div>
                        <span className="text-[9px] font-bold text-[var(--ember)] uppercase">Redeem →</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Order' && (
                    <div className="space-y-2">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--ember)]">
                        Fast Reorder
                      </div>
                      <div className="p-2 bg-[#2B1D14] rounded border border-white/10 flex gap-2 items-center">
                        <img src="/images/food/wings.jpg" alt="Wings" className="w-10 h-10 object-cover rounded" />
                        <div className="flex-1">
                          <div className="text-[11px] font-bold uppercase">1 LB Wings</div>
                          <div className="text-[10px] text-[var(--smoke)]">$17.99</div>
                        </div>
                        <span className="text-xs font-bold text-[var(--ember)]">+</span>
                      </div>
                      <div className="p-2 bg-[#2B1D14] rounded border border-white/10 flex gap-2 items-center">
                        <img src="/images/food/erie-cheesesteak.jpg" alt="Steak" className="w-10 h-10 object-cover rounded" />
                        <div className="flex-1">
                          <div className="text-[11px] font-bold uppercase">Erie Cheesesteak</div>
                          <div className="text-[10px] text-[var(--smoke)]">$16.95</div>
                        </div>
                        <span className="text-xs font-bold text-[var(--ember)]">+</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Reservations' && (
                    <div className="p-4 bg-[#2B1D14] rounded-lg border border-white/10 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--gold-line)]/20 mx-auto flex items-center justify-center text-[var(--gold-line)]">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--smoke)] uppercase font-mono">TABLE BOOKING</div>
                        <div className="text-sm font-bold uppercase text-[var(--flour)] mt-0.5">Tonight at 6:30 PM</div>
                        <div className="text-[10px] text-emerald-400 font-semibold mt-1">Confirmed for 2 Guests · Booth</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Rewards' && (
                    <div className="space-y-2">
                      <div className="p-3 bg-gradient-to-br from-[#2B1D14] to-[var(--ember)]/20 rounded border border-[var(--gold-line)]/30 text-center">
                        <Award className="w-6 h-6 mx-auto text-[var(--gold-line)] mb-1" />
                        <div className="text-sm font-bold font-mono">1,240 POINTS</div>
                        <div className="text-[9px] text-[var(--smoke)]">Tier: Garrison VIP Club</div>
                      </div>
                      <div className="text-[9px] text-center text-[var(--smoke)]">
                        Next perk: Free Cheesecake Factory Slice at 1,500 pts
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom App Nav Bar */}
                <div className="pt-2 border-t border-white/10 flex justify-around text-[9px] text-[var(--smoke)] uppercase font-bold">
                  <span className={activeTab === 'Home' ? 'text-[var(--ember)]' : ''}>Home</span>
                  <span className={activeTab === 'Order' ? 'text-[var(--ember)]' : ''}>Order</span>
                  <span className={activeTab === 'Reservations' ? 'text-[var(--ember)]' : ''}>Book</span>
                  <span className={activeTab === 'Rewards' ? 'text-[var(--ember)]' : ''}>Perks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
