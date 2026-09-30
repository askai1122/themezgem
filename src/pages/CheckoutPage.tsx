import React, { useState } from 'react';
import { useCartStore, useOrderStore, useUIStore } from '../stores';
import { ShieldCheck, CreditCard, Clock, MapPin, ArrowRight, ShoppingBag, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutPageProps {
  onNavigate: (route: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, subtotal, tax, total, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const { addToast } = useUIStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP (~20-25 mins)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 rounded-full bg-[#2B1D14] flex items-center justify-center text-[var(--smoke)] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold uppercase font-display text-[var(--flour)] mb-2">
          YOUR ORDER BAG IS EMPTY
        </h2>
        <p className="text-xs text-[var(--smoke)] mb-6 text-center max-w-sm">
          Please add your favorite items from our live kitchen menu before proceeding to checkout.
        </p>
        <button
          onClick={() => onNavigate('/menu')}
          className="px-6 py-3 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--ember-deep)] transition-colors"
        >
          BROWSE MENU
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name for order pickup.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number so we can text order updates.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrder = await createOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        pickupTime,
        specialInstructions: specialInstructions.trim() || undefined,
        items,
        subtotal: subtotal(),
        tax: tax(),
        total: total(),
        status: 'RECEIVED',
      });

      // Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D9622B', '#C79A55', '#F3ECDD'],
      });

      clearCart();

      addToast({
        type: 'success',
        title: 'ORDER PLACED SUCCESSFULLY',
        message: `Order #${newOrder.id} has been sent to The Mez kitchen pass.`,
      });

      onNavigate(`/order-confirmation/${newOrder.id}`);
    } catch {
      setErrorMessage('Could not place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-[11px] uppercase font-bold tracking-widest text-[var(--ember)] mb-2">
            STEP 2 OF 2 · FINAL ORDER CONFIRMATION
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
            CHECKOUT
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Details & Demo Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Details */}
            <div className="bg-[#2B1D14] p-6 sm:p-8 border border-white/10 space-y-4">
              <h2 className="text-lg font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-3 flex items-center gap-2">
                <span>1. PICKUP CONTACT</span>
              </h2>

              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Doug Johnson"
                    className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="289-555-0182"
                    className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-1">
                  Email Address (Receipt & Status) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doug@example.com"
                  className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-1">
                  Estimated Pickup Time
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                >
                  <option value="ASAP (~20-25 mins)">ASAP (~20-25 mins)</option>
                  <option value="In 45 minutes">In 45 minutes</option>
                  <option value="In 1 hour">In 1 hour</option>
                  <option value="Tonight at 6:30 PM">Tonight at 6:30 PM</option>
                  <option value="Tonight at 7:00 PM">Tonight at 7:00 PM</option>
                  <option value="Tonight at 7:30 PM">Tonight at 7:30 PM</option>
                  <option value="Tonight at 8:00 PM">Tonight at 8:00 PM</option>
                </select>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-1">
                  Kitchen Notes / Special Requests
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Extra cutlery, sauce on the side, allergies..."
                  className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)] resize-none"
                />
              </div>
            </div>

            {/* Payment Section (SECURE DEMO CHECKOUT per Section 18) */}
            <div className="bg-[#2B1D14] p-6 sm:p-8 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold uppercase font-display text-[var(--flour)] flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[var(--gold-line)]" />
                  <span>2. PAYMENT METHOD</span>
                </h2>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SECURE DEMO CHECKOUT</span>
                </div>
              </div>

              <div className="p-3.5 bg-black/40 border border-white/10 text-xs text-[var(--smoke)] leading-relaxed">
                <span className="text-[var(--gold-line)] font-bold uppercase mr-1">DEMO ENVIRONMENT:</span>
                No real payments will be charged. This demonstrates the seamless high-converting customer ordering experience.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#15100C] border border-[var(--ember)] flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--ember)]" />
                  <span className="text-xs font-bold uppercase text-[var(--flour)]">Demo Card / Pay at Pickup</span>
                </div>
                <div className="p-3 bg-[#15100C] border border-white/10 opacity-70 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="text-xs font-bold uppercase text-[var(--smoke)]">Apple Pay (Demo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#2B1D14] p-6 sm:p-8 border border-white/10 space-y-6 sticky top-28">
              <h2 className="text-lg font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-3">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between items-start text-xs border-b border-white/5 pb-2">
                    <div>
                      <div className="font-bold text-[var(--flour)] uppercase">
                        {i.quantity}× {i.name}
                      </div>
                      {i.variantLabel && (
                        <div className="text-[10px] text-[var(--gold-line)]">{i.variantLabel}</div>
                      )}
                      {i.selectedAddons.length > 0 && (
                        <div className="text-[10px] text-[var(--smoke)]">
                          + {i.selectedAddons.map((a) => a.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="font-mono text-[var(--flour)] font-bold">
                      ${((i.price + i.selectedAddons.reduce((s, a) => s + a.price, 0)) * i.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs pt-2 border-t border-white/10">
                <div className="flex justify-between text-[var(--smoke)]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[var(--flour)]">${subtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--smoke)]">
                  <span>Ontario HST (13%)</span>
                  <span className="font-mono text-[var(--flour)]">${tax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[var(--flour)] pt-3 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="font-mono text-[var(--ember)]">${total().toFixed(2)}</span>
                </div>
              </div>

              {/* Pickup location indicator */}
              <div className="text-xs text-[var(--smoke)] bg-black/40 p-3 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[var(--flour)] uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[var(--ember)]" />
                  <span>The Mez Bar & Grill</span>
                </div>
                <div>#9 – 1267 Garrison Road, Fort Erie, ON</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING ORDER...</span>
                ) : (
                  <>
                    <span>PLACE DEMO ORDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
