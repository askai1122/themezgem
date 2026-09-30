import React from 'react';
import { Award, Gift, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { useRewardsStore, useUIStore } from '../stores';

export const RewardsPage: React.FC = () => {
  const { customerPoints, rewards } = useRewardsStore();
  const { addToast } = useUIStore();

  const nextTierPoints = 1500;
  const progressPercent = Math.min(100, Math.round((customerPoints / nextTierPoints) * 100));

  const handleRedeem = (title: string, cost: number) => {
    if (customerPoints < cost) {
      addToast({
        type: 'error',
        title: 'NOT ENOUGH POINTS',
        message: `You need ${cost} points to redeem this perk.`,
      });
      return;
    }

    addToast({
      type: 'success',
      title: 'REWARD CLAIMED [DEMO]',
      message: `Voucher for "${title}" has been saved to your demo rewards wallet!`,
    });
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-line)] font-bold mb-3">
            <Award className="w-4 h-4" />
            <span>LOYALTY & PERKS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
            THE MEZ REWARDS
          </h1>
          <p className="text-sm text-[var(--smoke)] mt-2">
            Earn 10 points for every dollar spent on dine-in and online orders. Redeem for wings, smash burgers, and dessert slices.
          </p>
        </div>

        {/* Demo Customer Loyalty Card */}
        <div className="bg-gradient-to-br from-[#2B1D14] via-[#15100C] to-[#2B1D14] border border-[#D9622B]/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)] bg-black/40 px-2 py-0.5 border border-[var(--ember)]/30">
                  DEMO ACCOUNT · DOUG J.
                </span>
                <span className="text-xs text-[var(--smoke)]">Member since 2024</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
                GARRISON GOLD VIP
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs uppercase text-[var(--smoke)] font-bold">Current Balance</span>
              <div className="text-4xl font-extrabold font-mono text-[var(--gold-line)] leading-none mt-1">
                {customerPoints} <span className="text-sm text-[var(--flour)]">PTS</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="py-6 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--smoke)]">Progress to Diamond VIP (1,500 pts)</span>
              <span className="font-mono text-[var(--flour)] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-black/60 border border-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--ember)] to-[var(--gold-line)] transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-[var(--smoke)]">
              Just 260 more points until your complimentary full-size The Cheesecake Factory reward!
            </div>
          </div>
        </div>

        {/* Available Rewards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold uppercase font-display text-[var(--flour)]">
              AVAILABLE REWARDS TO REDEEM
            </h3>
            <span className="text-xs text-[var(--smoke)]">[DEMO REDEMPTION]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((rew) => (
              <div
                key={rew.id}
                className="bg-[#2B1D14] border border-white/10 p-6 flex items-start justify-between gap-4 hover:border-[var(--gold-line)]/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[var(--ember)]" />
                    <span className="text-xs font-bold font-mono text-[var(--gold-line)]">
                      {rew.pointsRequired} POINTS
                    </span>
                  </div>

                  <h4 className="text-base font-bold uppercase font-display text-[var(--flour)] leading-snug">
                    {rew.title}
                  </h4>

                  <p className="text-xs text-[var(--smoke)] leading-relaxed">
                    {rew.description}
                  </p>
                </div>

                <button
                  onClick={() => handleRedeem(rew.title, rew.pointsRequired)}
                  className="px-4 py-2 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider flex-shrink-0 shadow-md transition-all active:scale-95"
                >
                  REDEEM
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
