import React, { useState, useEffect } from 'react';
import { reservationService } from '../services';
import { Reservation } from '../types';
import { CheckCircle2, Calendar, Clock, Users, MapPin, Phone, ArrowRight } from 'lucide-react';

interface ReservationConfirmationPageProps {
  reservationId: string;
  onNavigate: (route: string) => void;
}

export const ReservationConfirmationPage: React.FC<ReservationConfirmationPageProps> = ({
  reservationId,
  onNavigate,
}) => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRes = async () => {
      const all = await reservationService.getAll();
      const found = all.find((r) => r.id === reservationId);
      if (found) setReservation(found);
      setLoading(false);
    };
    fetchRes();
  }, [reservationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-32 pb-20 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--ember)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-[var(--smoke)]">Confirming booking...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold uppercase font-display text-[var(--flour)] mb-2">
          RESERVATION NOT FOUND
        </h2>
        <button
          onClick={() => onNavigate('/reservations')}
          className="mt-4 px-6 py-2.5 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider"
        >
          BOOK A TABLE
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-[#2B1D14] border border-[#D9622B]/40 p-8 sm:p-10 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">
            TABLE RESERVED
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)] mb-2">
            RESERVATION #{reservation.id}
          </h1>
          <p className="text-xs text-[var(--smoke)] mb-8">
            We look forward to welcoming you to The Mez Bar & Grill in Fort Erie!
          </p>

          {/* Details Box */}
          <div className="bg-[#15100C] p-6 border border-white/10 text-left space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Date</span>
                <span className="font-bold text-[var(--flour)] text-sm">{reservation.date}</span>
              </div>
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Time</span>
                <span className="font-bold font-mono text-[var(--gold-line)] text-sm">{reservation.time}</span>
              </div>
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Party Size</span>
                <span className="font-bold text-[var(--flour)] text-sm">{reservation.guests} Guests</span>
              </div>
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Status</span>
                <span className="font-bold text-emerald-400 text-sm uppercase">{reservation.status}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs text-[var(--smoke)]">
              <div>Guest: <strong className="text-[var(--flour)]">{reservation.name}</strong></div>
              <div>Phone: <strong className="text-[var(--flour)]">{reservation.phone}</strong></div>
              <div>Email: <strong className="text-[var(--flour)]">{reservation.email}</strong></div>
              {reservation.specialRequest && (
                <div className="mt-1 text-[var(--gold-line)] italic">“{reservation.specialRequest}”</div>
              )}
            </div>
          </div>

          {/* Location & Directions */}
          <div className="p-4 bg-black/40 border border-white/10 text-xs text-left text-[var(--smoke)] space-y-2 mb-8">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[var(--ember)] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--flour)]">#9 – 1267 Garrison Road, Fort Erie, ON L2A 1P2</strong>
                <p className="text-[11px] text-[var(--smoke)] mt-0.5">Free parking available on site.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--ember)] flex-shrink-0" />
              <span>Questions or delays? Call us at 289-320-9866</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('/')}
              className="px-6 py-3 bg-[#15100C] hover:bg-black text-[var(--flour)] border border-white/20 text-xs font-bold uppercase tracking-wider"
            >
              BACK TO HOME
            </button>
            <button
              onClick={() => onNavigate('/menu')}
              className="px-6 py-3 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              EXPLORE OUR MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
