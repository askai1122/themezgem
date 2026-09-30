import React, { useEffect } from 'react';
import { useOrderStore, useReservationStore, useMenuStore } from '../../stores';
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { orders, loadOrders, updateOrderStatus } = useOrderStore();
  const { reservations, loadReservations } = useReservationStore();
  const { items, loadMenu } = useMenuStore();

  useEffect(() => {
    loadOrders();
    loadReservations();
    loadMenu();
  }, [loadOrders, loadReservations, loadMenu]);

  const recentOrders = orders.slice(0, 5);
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

      {/* Main Split: Live Order Queue & Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Live Kitchen Order Pass (7 cols) */}
        <div className="lg:col-span-7 bg-[#2B1D14] border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold uppercase font-display text-[var(--flour)] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[var(--ember)]" />
                <span>LIVE KITCHEN PASS (RECENT ORDERS)</span>
              </h2>
              <p className="text-xs text-[var(--smoke)] mt-0.5">
                Update status below to reflect live on customer tracking screen
              </p>
            </div>
            <button
              onClick={() => onNavigate('/admin/orders')}
              className="text-xs font-bold text-[var(--ember)] hover:underline uppercase"
            >
              All Orders →
            </button>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-[#15100C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[var(--flour)]">
                      #{order.id}
                    </span>
                    <span className="text-xs font-bold text-[var(--flour)] uppercase">
                      · {order.customerName}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 border ${
                        order.status === 'CONFIRMED'
                          ? 'border-[var(--ember)] text-[var(--ember)] bg-[var(--ember)]/10'
                          : order.status === 'READY FOR PICKUP'
                          ? 'border-emerald-500 text-emerald-400 bg-emerald-950/30'
                          : order.status === 'COMPLETED'
                          ? 'border-white/20 text-[var(--smoke)]'
                          : 'border-blue-400 text-blue-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="text-xs text-[var(--smoke)] mt-1">
                    {order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                  </div>
                  <div className="text-[11px] text-[var(--smoke)] mt-0.5">
                    Pickup: {order.pickupTime} · <strong className="font-mono text-[var(--flour)]">${order.total.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Quick Status Advance Actions */}
                <div className="flex items-center gap-2">
                  {order.status === 'RECEIVED' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                      className="px-3 py-1.5 bg-[#2B1D14] hover:bg-black text-[var(--gold-line)] border border-[var(--gold-line)]/40 text-[10px] font-bold uppercase"
                    >
                      Confirm
                    </button>
                  )}
                  {order.status === 'CONFIRMED' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'READY FOR PICKUP')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase shadow"
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.status === 'READY FOR PICKUP' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                      className="px-3 py-1.5 bg-black text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Table Bookings & Popular Items (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reservation List */}
          <div className="bg-[#2B1D14] border border-white/10 p-6 space-y-4">
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

            <div className="space-y-2.5">
              {recentReservations.map((res) => (
                <div
                  key={res.id}
                  className="p-3 bg-[#15100C] border border-white/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[var(--flour)] uppercase">
                      {res.name} ({res.guests} Guests)
                    </div>
                    <div className="text-[11px] text-[var(--smoke)]">
                      {res.date} at <strong className="text-[var(--gold-line)]">{res.time}</strong>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/30">
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Menu Overview */}
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
        </div>
      </div>
    </div>
  );
};
