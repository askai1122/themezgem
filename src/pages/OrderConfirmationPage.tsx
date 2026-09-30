import React, { useState, useEffect } from 'react';
import { orderService } from '../services';
import { Order, OrderStatus } from '../types';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigate: (route: string) => void;
}

const STATUS_STEPS: OrderStatus[] = [
  'RECEIVED',
  'CONFIRMED',
  'READY FOR PICKUP',
  'COMPLETED',
];

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, onNavigate }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Poll for live status update from LocalStorage (Section 47)
  useEffect(() => {
    let isMounted = true;

    const fetchOrder = async () => {
      const found = await orderService.getById(orderId);
      if (isMounted && found) {
        setOrder(found);
        setLoading(false);
      }
    };

    fetchOrder();

    const interval = setInterval(fetchOrder, 1500); // 1.5s live polling
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-32 pb-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--ember)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-[var(--smoke)] font-bold">
          LOADING ORDER #{orderId}...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-extrabold uppercase font-display text-[var(--flour)] mb-2">
          ORDER NOT FOUND
        </h2>
        <p className="text-xs text-[var(--smoke)] mb-6">
          Could not locate order #{orderId}. It may have been cleared from demo storage.
        </p>
        <button
          onClick={() => onNavigate('/menu')}
          className="px-6 py-3 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider"
        >
          RETURN TO MENU
        </button>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Confirmation Banner */}
        <div className="bg-[#2B1D14] border border-[#D9622B]/40 p-6 sm:p-10 mb-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold">
                  ORDER CONFIRMED & TRANSMITTED
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
                  ORDER #{order.id}
                </h1>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[11px] text-[var(--smoke)] uppercase font-semibold">Estimated Pickup</div>
              <div className="text-base font-bold font-mono text-[var(--gold-line)]">{order.pickupTime}</div>
            </div>
          </div>

          {/* Animated Status Tracking Progress */}
          <div className="py-4">
            <div className="text-xs uppercase font-bold tracking-widest text-[var(--smoke)] mb-6 flex items-center justify-between">
              <span>ORDER STATUS</span>
              <span className="text-[var(--ember)] flex items-center gap-1 font-mono font-bold">
                STATUS: {order.status}
              </span>
            </div>

            {/* Stepper Bar */}
            <div className="relative">
              <div className="h-1 bg-white/10 w-full absolute top-1/2 -translate-y-1/2 z-0" />
              <div
                className="h-1 bg-[var(--ember)] absolute top-1/2 -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: `${(Math.max(0, currentStepIndex) / (STATUS_STEPS.length - 1)) * 100}%`,
                }}
              />

              <div className="relative z-10 flex justify-between">
                {STATUS_STEPS.map((step, i) => {
                  const isDone = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;

                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                          isDone
                            ? 'bg-[var(--ember)] border-[var(--ember)] text-white shadow-sm'
                            : 'bg-[#15100C] border-white/20 text-[var(--smoke)]'
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-[9px] uppercase tracking-wider font-bold mt-2 text-center max-w-[80px] hidden sm:block ${
                          isCurrent
                            ? 'text-[var(--ember)]'
                            : isDone
                            ? 'text-[var(--flour)]'
                            : 'text-[var(--smoke)]'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 p-3 bg-black/40 border border-white/10 text-xs text-[var(--smoke)] flex items-center justify-between">
              <span>💡 When staff update this in Admin Ops, this page reflects it immediately.</span>
              <button
                onClick={() => onNavigate('/admin/orders')}
                className="text-[var(--gold-line)] underline uppercase font-bold text-[10px]"
              >
                Open Admin Orders →
              </button>
            </div>
          </div>
        </div>

        {/* Order Details & Items Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer & Location */}
          <div className="bg-[#2B1D14] p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--flour)] border-b border-white/10 pb-2">
              PICKUP LOCATION & CUSTOMER
            </h3>
            <div className="text-xs text-[var(--smoke)] space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--ember)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--flour)]">The Mez Bar & Grill</div>
                  <div>#9 – 1267 Garrison Road, Fort Erie, ON L2A 1P2</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--ember)] flex-shrink-0" />
                <span>Call Kitchen: 289-320-9866</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs space-y-1">
              <div className="text-[var(--smoke)]">Customer: <strong className="text-[var(--flour)]">{order.customerName}</strong></div>
              <div className="text-[var(--smoke)]">Phone: <strong className="text-[var(--flour)]">{order.customerPhone}</strong></div>
              <div className="text-[var(--smoke)]">Email: <strong className="text-[var(--flour)]">{order.customerEmail}</strong></div>
              {order.specialInstructions && (
                <div className="text-[var(--gold-line)] pt-1 italic">“{order.specialInstructions}”</div>
              )}
            </div>
          </div>

          {/* Items & Payment */}
          <div className="bg-[#2B1D14] p-6 border border-white/10 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--flour)] border-b border-white/10 pb-2">
                ITEMS ORDERED
              </h3>
              <div className="space-y-2.5 mt-3 max-h-48 overflow-y-auto pr-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <div>
                      <span className="font-bold text-[var(--flour)]">{item.quantity}× {item.name}</span>
                      {item.variantLabel && (
                        <span className="text-[10px] text-[var(--gold-line)] ml-1">({item.variantLabel})</span>
                      )}
                      {item.selectedAddons.length > 0 && (
                        <div className="text-[10px] text-[var(--smoke)]">
                          + {item.selectedAddons.map((a) => a.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-[var(--flour)] font-bold">
                      ${((item.price + item.selectedAddons.reduce((s, a) => s + a.price, 0)) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-[var(--smoke)]">
                <span>Subtotal</span>
                <span className="font-mono text-[var(--flour)]">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--smoke)]">
                <span>Tax (HST 13%)</span>
                <span className="font-mono text-[var(--flour)]">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[var(--flour)] pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="font-mono text-[var(--ember)]">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-between items-center">
          <button
            onClick={() => onNavigate('/')}
            className="px-6 py-3 bg-transparent hover:bg-white/5 border border-white/20 text-[var(--flour)] text-xs font-bold uppercase tracking-wider"
          >
            ← BACK TO HOMEPAGE
          </button>

          <button
            onClick={() => onNavigate('/menu')}
            className="px-6 py-3 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            ORDER MORE FOOD
          </button>
        </div>
      </div>
    </div>
  );
};
