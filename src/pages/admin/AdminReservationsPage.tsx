import React, { useState, useEffect } from 'react';
import { useReservationStore, useUIStore } from '../../stores';
import { Reservation, ReservationStatus } from '../../types';
import { Calendar as CalendarIcon, Clock, Users, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

export const AdminReservationsPage: React.FC = () => {
  const { reservations, loadReservations, updateStatus } = useReservationStore();
  const { addToast } = useUIStore();

  const [filterDate, setFilterDate] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const handleUpdate = async (id: string, status: ReservationStatus) => {
    await updateStatus(id, status);
    addToast({
      type: 'success',
      title: 'RESERVATION UPDATED',
      message: `Reservation #${id} updated to ${status}.`,
    });
  };

  const filtered = reservations.filter((r) => {
    if (filterStatus !== 'All' && r.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-line)]">
            HOST STAND & TABLE SEATING
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            RESERVATIONS ({reservations.length})
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all ${
                filterStatus === st
                  ? 'border-[var(--gold-line)] bg-[var(--gold-line)] text-black'
                  : 'border-white/10 text-[var(--smoke)] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reservation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center text-[var(--smoke)] bg-[#1C140F] border border-white/10">
            NO RESERVATIONS FOUND
          </div>
        ) : (
          filtered.map((res) => (
            <div
              key={res.id}
              className="bg-[#1C140F] border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-white/25 transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--smoke)] uppercase">
                      #{res.id}
                    </span>
                    <h3 className="text-lg font-bold uppercase font-display text-[var(--flour)] mt-0.5">
                      {res.name}
                    </h3>
                  </div>

                  <span
                    className={`text-[9px] uppercase font-bold px-2 py-0.5 border ${
                      res.status === 'SEATED'
                        ? 'border-[var(--ember)] text-[var(--ember)] bg-[var(--ember)]/10'
                        : res.status === 'CONFIRMED'
                        ? 'border-emerald-500 text-emerald-400 bg-emerald-950/30'
                        : res.status === 'COMPLETED'
                        ? 'border-white/20 text-[var(--smoke)]'
                        : 'border-red-500 text-red-400'
                    }`}
                  >
                    {res.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[var(--smoke)] mt-4">
                  <div className="flex items-center gap-2 text-[var(--flour)] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                    <span>{res.time} · {res.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[var(--smoke)]" />
                    <span>{res.guests} Guests (Table reserved)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[var(--smoke)]" />
                    <span>{res.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[var(--smoke)]" />
                    <span>{res.email}</span>
                  </div>

                  {res.specialRequest && (
                    <div className="p-2.5 bg-[#2B1D14] border border-white/10 text-[11px] text-[var(--gold-line)] italic mt-2">
                      “{res.specialRequest}”
                    </div>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                {res.status === 'CONFIRMED' && (
                  <button
                    onClick={() => handleUpdate(res.id, 'SEATED')}
                    className="w-full py-2 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Mark Seated
                  </button>
                )}

                {res.status === 'SEATED' && (
                  <button
                    onClick={() => handleUpdate(res.id, 'COMPLETED')}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Mark Completed
                  </button>
                )}

                {res.status !== 'CANCELLED' && res.status !== 'COMPLETED' && (
                  <button
                    onClick={() => handleUpdate(res.id, 'CANCELLED')}
                    className="px-3 py-2 bg-black hover:bg-red-950/40 text-red-400 border border-red-500/30 text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
