import React, { useEffect } from 'react';
import { useReservationStore, useMenuStore } from '../../stores';
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Users,
  TrendingUp,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { reservations, loadReservations } = useReservationStore();
  const { items, loadMenu } = useMenuStore();

  useEffect(() => {
    loadReservations();
    loadMenu();
  }, [loadReservations, loadMenu]);

  const recentReservations = reservations.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Banner Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2B1D14] p-5 border border-white/10">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)]">
            KITCHEN OPERATIONS · FORT ERIE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            LIVE KITCHEN DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold-line)] bg-black/40 px-3 py-1.5 border border-white/10">
            DEMO DATA METRICS
          </span>
          <button
            onClick={() => onNavigate('/admin/orders')}
            className="px-4 py-2 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--ember-deep)] transition-colors"
          >
            LIVE ORDER PASS →
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (Section 28.4: Today's Revenue $4,820, Orders 86, Reservations 32, New Customers 27, Repeat 64%) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#2B1D14] p-5 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start text-xs text-[var(--smoke)] uppercase font-semibold">
            <span>Today's Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--flour)] mt-2">
            $4,820
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        <div className="bg-[#2B1D14] p-5 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start text-xs text-[var(--smoke)] uppercase font-semibold">
            <span>Orders Completed</span>
            <ShoppingBag className="w-4 h-4 text-[var(--ember)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--flour)] mt-2">
            86
          </div>
          <div className="text-[11px] text-[var(--smoke)] mt-2">
            Avg order size $38.50
          </div>
        </div>

        <div className="bg-[#2B1D14] p-5 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start text-xs text-[var(--smoke)] uppercase font-semibold">
            <span>Table Bookings</span>
            <Calendar className="w-4 h-4 text-[var(--gold-line)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--flour)] mt-2">
            32
          </div>
          <div className="text-[11px] text-[var(--smoke)] mt-2">
            84 guests seated
          </div>
        </div>

        <div className="bg-[#2B1D14] p-5 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start text-xs text-[var(--smoke)] uppercase font-semibold">
            <span>New Customers</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--flour)] mt-2">
            27
          </div>
          <div className="text-[11px] text-emerald-400 mt-2">
            +12 rewards enrolled
          </div>
        </div>

        <div className="bg-[#2B1D14] p-5 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-start text-xs text-[var(--smoke)] uppercase font-semibold">
            <span>Repeat Patrons</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--flour)] mt-2">
            64%
          </div>
          <div className="text-[11px] text-[var(--smoke)] mt-2">
            High neighbourhood loyalty
          </div>
        </div>
      </div>

      {/* Main Split: Reservations & Menu Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Reservations Overview (7 cols) */}
        <div className="lg:col-span-7 bg-[#2B1D14] border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold uppercase font-display text-[var(--flour)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--gold-line)]" />
              <span>UPCOMING RESERVATIONS</span>
            </h2>
            <button
              onClick={() => onNavigate('/admin/reservations')}
              className="text-xs font-bold text-[var(--ember)] hover:underline uppercase"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {recentReservations.map((res) => (
              <div
                key={res.id}
                className="p-4 bg-[#15100C] border border-white/10 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[var(--flour)] uppercase text-sm">
                    {res.name} ({res.guests} Guests)
                  </div>
                  <div className="text-xs text-[var(--smoke)] mt-1">
                    {res.date} at <strong className="text-[var(--gold-line)]">{res.time}</strong> · {res.phone}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1 border border-emerald-500/30">
                  {res.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Menu Catalog Status & Operations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#2B1D14] border border-white/10 p-6 space-y-3">
            <h2 className="text-base font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-3">
              MENU CATALOG STATUS
            </h2>
            <div className="text-xs text-[var(--smoke)] space-y-1">
              <div>Total Menu Items: <strong className="text-[var(--flour)]">{items.length} dishes</strong></div>
              <div>Available for Ordering: <strong className="text-emerald-400">{items.filter(i => i.available).length} dishes</strong></div>
            </div>
            <button
              onClick={() => onNavigate('/admin/menu')}
              className="w-full mt-3 py-2.5 bg-[#15100C] hover:bg-black text-[var(--flour)] border border-white/15 text-xs font-bold uppercase tracking-wider"
            >
              MANAGE MENU & VIDEO ASSETS →
            </button>
          </div>

          <div className="bg-[#2B1D14] border border-white/10 p-6 space-y-3">
            <h2 className="text-base font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-3">
              OPERATIONS SHORTCUTS
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigate('/admin/orders')}
                className="p-3 bg-[#15100C] hover:bg-black text-[var(--flour)] border border-white/15 text-xs font-bold uppercase text-center"
              >
                Orders Manager
              </button>
              <button
                onClick={() => onNavigate('/admin/reservations')}
                className="p-3 bg-[#15100C] hover:bg-black text-[var(--flour)] border border-white/15 text-xs font-bold uppercase text-center"
              >
                Reservations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
