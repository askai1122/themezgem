import React, { useState } from 'react';
import { useReservationStore, useUIStore } from '../stores';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface ReservationsPageProps {
  onNavigate: (route: string) => void;
}

const TIME_SLOTS = [
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
];

export const ReservationsPage: React.FC<ReservationsPageProps> = ({ onNavigate }) => {
  const { createReservation } = useReservationStore();
  const { addToast } = useUIStore();

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('6:30 PM');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name for the table reservation.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a phone number for SMS confirmation.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createReservation({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        date,
        time,
        guests,
        specialRequest: specialRequest.trim() || undefined,
      });

      addToast({
        type: 'success',
        title: 'TABLE RESERVED',
        message: `Reservation #${res.id} confirmed for ${guests} guests at ${time}.`,
      });

      onNavigate(`/reservation-confirmation/${res.id}`);
    } catch {
      setError('Could not complete reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-line)] font-bold mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>TABLE BOOKING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-tight">
            RESERVE YOUR TABLE
          </h1>
          <p className="text-sm text-[var(--smoke)] mt-3">
            Join us at #9 – 1267 Garrison Road. Open daily from 12:00 PM to 10:00 PM for dine-in comfort, game nights, and family dinners.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#2B1D14] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* 1. Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/10">
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-2 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                <span>Select Date *</span>
              </label>
              <input
                type="date"
                required
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                <span>Number of Guests *</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Time Slot Selection (Section 20: 5:00, 5:30, 6:00, 6:30, 7:00, 7:30 PM ember active state) */}
          <div className="pb-6 border-b border-white/10">
            <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--gold-line)]" />
              <span>Available Seating Times (Daily 12pm – 10pm)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`p-2.5 text-xs font-bold uppercase tracking-wider text-center border transition-all ${
                    time === slot
                      ? 'border-[var(--ember)] bg-[var(--ember)] text-white shadow-md'
                      : 'border-white/10 text-[var(--smoke)] hover:text-white hover:border-white/30'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Guest Information */}
          <div className="space-y-4 pb-6 border-b border-white/10">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[var(--smoke)]">
              Primary Guest Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[var(--smoke)] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kim Lewis"
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[var(--smoke)] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="289-555-0144"
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[var(--smoke)] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kim@example.com"
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-[var(--smoke)] mb-1">
                Special Requests (Booth, High Chair, Occasion)
              </label>
              <textarea
                rows={2}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. Window booth, birthday celebration, high chair needed..."
                className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)] resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-[var(--smoke)]">
              No deposit required. Instant confirmation saved to your local session.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-all"
            >
              <span>CONFIRM TABLE RESERVATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
