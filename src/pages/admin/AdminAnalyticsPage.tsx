import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Calendar, Users, Flame } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('7');

  const revenueData = [
    { day: 'Mon', revenue: 3420, orders: 62 },
    { day: 'Tue', revenue: 3890, orders: 74 },
    { day: 'Wed', revenue: 4250, orders: 81 },
    { day: 'Thu', revenue: 4610, orders: 88 },
    { day: 'Fri', revenue: 6120, orders: 115 },
    { day: 'Sat', revenue: 6940, orders: 132 },
    { day: 'Sun', revenue: 4820, orders: 86 },
  ];

  const popularItems = [
    { name: 'Bacon Cheese Mez', sold: 284, revenue: 4257.16, category: 'Burgers' },
    { name: 'Wings (1 LB / 2 LB)', sold: 246, revenue: 4425.54, category: 'Appetizers' },
    { name: 'Steak on the Rocks', sold: 198, revenue: 5146.02, category: 'Plates' },
    { name: 'Erie Cheesesteak', sold: 172, revenue: 2915.40, category: 'Hand-Held' },
    { name: 'The Cheesecake Factory Slice', sold: 165, revenue: 1648.35, category: 'Dessert' },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-line)]">
            PERFORMANCE & SALES INTELLIGENCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            RESTAURANT ANALYTICS
          </h1>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-[#2B1D14] border border-white/10">
          {(['7', '30', '90'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                timeRange === r
                  ? 'bg-[var(--ember)] text-white shadow'
                  : 'text-[var(--smoke)] hover:text-white'
              }`}
            >
              Last {r} Days
            </button>
          ))}
        </div>
      </div>

      <div className="p-3.5 bg-black/40 border border-white/10 text-xs text-[var(--smoke)]">
        <span className="text-[var(--gold-line)] font-bold uppercase mr-1">DEMO ANALYTICS:</span>
        All metric models are calculated from historical pattern simulation.
      </div>

      {/* Revenue Trend Chart Visualizer */}
      <div className="bg-[#1C140F] border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base font-bold uppercase font-display text-[var(--flour)]">
              DAILY REVENUE OVERVIEW ($CAD)
            </h2>
            <p className="text-xs text-[var(--smoke)] mt-0.5">
              Weekend spikes driven by Fort Erie patio & game-night wing orders
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase text-[var(--smoke)]">Week Total</span>
            <div className="text-xl font-bold font-mono text-emerald-400">$34,050.00</div>
          </div>
        </div>

        {/* Clean Bar Visualization */}
        <div className="pt-6 pb-2">
          <div className="h-56 flex items-end gap-3 sm:gap-6 justify-between">
            {revenueData.map((item) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);

              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="text-[10px] font-mono text-[var(--flour)] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-white/10 mb-1">
                    ${item.revenue}
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-[#2B1D14] h-full flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-[var(--ember-deep)] to-[var(--ember)] group-hover:to-[var(--gold-line)] transition-all duration-500 rounded-t-sm"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  {/* Label */}
                  <span className="text-[11px] font-bold uppercase text-[var(--smoke)] mt-2">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Items & Customer Loyalty Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Popular Dishes (7 cols) */}
        <div className="lg:col-span-7 bg-[#1C140F] border border-white/10 p-6 space-y-4">
          <h3 className="text-base font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-3">
            TOP SELLING DISHES (THIS PERIOD)
          </h3>

          <div className="space-y-3">
            {popularItems.map((dish, i) => (
              <div
                key={dish.name}
                className="p-3 bg-[#2B1D14] border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-[var(--gold-line)] w-5">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="font-bold text-[var(--flour)] uppercase">{dish.name}</div>
                    <div className="text-[10px] text-[var(--smoke)]">{dish.category} · {dish.sold} sold</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-[var(--flour)]">
                    ${dish.revenue.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">+14% velocity</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Highlights (5 cols) */}
        <div className="lg:col-span-5 bg-[#1C140F] border border-white/10 p-6 space-y-4">
          <h3 className="text-base font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-3">
            GUEST RETENTION METRICS
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#2B1D14] border border-white/5 space-y-1">
              <div className="flex justify-between text-[var(--smoke)] uppercase font-semibold">
                <span>Repeat Patron Rate</span>
                <span className="font-mono text-purple-400 font-bold">64.2%</span>
              </div>
              <div className="w-full h-1.5 bg-black overflow-hidden">
                <div className="h-full bg-purple-500 w-[64%]" />
              </div>
            </div>

            <div className="p-3 bg-[#2B1D14] border border-white/5 space-y-1">
              <div className="flex justify-between text-[var(--smoke)] uppercase font-semibold">
                <span>Average Kitchen Ticket Time</span>
                <span className="font-mono text-emerald-400 font-bold">18.4 mins</span>
              </div>
              <div className="w-full h-1.5 bg-black overflow-hidden">
                <div className="h-full bg-emerald-500 w-[72%]" />
              </div>
            </div>

            <div className="p-3 bg-[#2B1D14] border border-white/5 space-y-1">
              <div className="flex justify-between text-[var(--smoke)] uppercase font-semibold">
                <span>Table Booking Fulfillment</span>
                <span className="font-mono text-[var(--gold-line)] font-bold">96.8%</span>
              </div>
              <div className="w-full h-1.5 bg-black overflow-hidden">
                <div className="h-full bg-[var(--gold-line)] w-[96%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
