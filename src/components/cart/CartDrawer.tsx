import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore, useUIStore } from '../../stores';

interface CartDrawerProps {
  onNavigate: (route: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { isCartOpen, setIsCartOpen } = useUIStore();
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCartStore();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    onNavigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-[#15100C] text-[#F3ECDD] h-full flex flex-col shadow-2xl border-l border-white/10 animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#2B1D14]/50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[var(--ember)]" />
            <h2 className="text-lg font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
              YOUR ORDER ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[var(--smoke)] hover:text-[var(--flour)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-[var(--umber)] flex items-center justify-center mb-4 text-[var(--smoke)]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold uppercase font-display text-[var(--flour)] mb-2">
                YOUR BAG IS EMPTY
              </h3>
              <p className="text-xs text-[var(--smoke)] mb-6 max-w-xs">
                Explore our sizzling smash burgers, wings, and hearty plates hot off the kitchen pass.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigate('/menu');
                }}
                className="px-6 py-3 bg-[var(--ember)] text-[var(--flour)] text-xs font-bold uppercase tracking-wider hover:bg-[var(--ember-deep)] transition-colors"
              >
                BROWSE MENU
              </button>
            </div>
          ) : (
            items.map((item) => {
              const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
              const itemTotal = (item.price + addonsTotal) * item.quantity;

              return (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-[var(--umber)]/60 border border-white/5 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover flex-shrink-0 bg-black"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold uppercase text-[var(--flour)] leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--smoke)] hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variantLabel && (
                        <div className="text-[11px] text-[var(--gold-line)] font-medium">
                          Option: {item.variantLabel}
                        </div>
                      )}

                      {item.selectedAddons.length > 0 && (
                        <div className="text-[10px] text-[var(--smoke)] mt-0.5">
                          + {item.selectedAddons.map((a) => a.name).join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/15 bg-black/30">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-[var(--smoke)] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-[var(--flour)] font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[var(--smoke)] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-sm font-bold font-mono text-[var(--flour)]">
                        ${itemTotal.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#2B1D14]/70 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[var(--smoke)]">
                <span>Subtotal</span>
                <span className="font-mono text-[var(--flour)]">${subtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--smoke)]">
                <span>Ontario HST (13%)</span>
                <span className="font-mono text-[var(--flour)]">${tax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[var(--flour)] pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="font-mono text-[var(--ember)]">${total().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-[var(--flour)] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all"
            >
              <span>PROCEED TO DEMO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-center text-[var(--smoke)]">
              Pickup at #9 – 1267 Garrison Road, Fort Erie · Ready in ~20–30 mins
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
