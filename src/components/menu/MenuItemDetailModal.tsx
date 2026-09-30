import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCartStore, useUIStore } from '../../stores';

interface MenuItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuItemDetailModal: React.FC<MenuItemDetailModalProps> = ({ item, onClose }) => {
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    item?.priceVariants ? item.priceVariants[0].label : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  const currentBasePrice = item.priceVariants && selectedVariant
    ? item.priceVariants.find((v) => v.label === selectedVariant)?.price || item.price
    : item.price;

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (currentBasePrice + addonsTotal) * quantity;

  const toggleAddon = (addon: { name: string; price: number }) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: currentBasePrice,
      variantLabel: selectedVariant,
      selectedAddons,
      specialInstructions: specialInstructions.trim() || undefined,
      quantity,
      image: item.image,
    });

    addToast({
      type: 'success',
      title: 'ADDED TO ORDER',
      message: `${quantity}× ${item.name} added to your bag.`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl bg-[#15100C] border border-white/15 text-[#F3ECDD] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black text-[var(--flour)] border border-white/20 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Video / Photo Crossfade (55%) */}
        <div className="md:col-span-6 lg:col-span-7 relative min-h-[260px] md:min-h-[460px] bg-black overflow-hidden group">
          {item.video ? (
            <video
              src={item.video}
              poster={item.image}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-transparent to-black/30 pointer-events-none" />
          <div className="video-overlay-grain opacity-50" />

          {/* Status Kicker */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[var(--flour)] bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/10">
            <Flame className="w-3.5 h-3.5 text-[var(--ember)]" />
            <span>KITCHEN FLAT-TOP SEAR</span>
          </div>
        </div>

        {/* Right Details & Customization (45%) */}
        <div className="md:col-span-6 lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--ember)] mb-1">
              {item.category}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-tight mb-2">
              {item.name}
            </h3>

            <div className="text-xl font-bold font-mono text-[var(--flour)] mb-4">
              ${currentBasePrice.toFixed(2)}
            </div>

            <p className="text-sm text-[var(--flour)]/80 leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Price Variants (if any, e.g. 1LB / 2LB) */}
            {item.priceVariants && (
              <div className="mb-6">
                <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-2">
                  Select Size / Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {item.priceVariants.map((v) => (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setSelectedVariant(v.label)}
                      className={`p-2.5 text-xs font-bold uppercase text-left border transition-all ${
                        selectedVariant === v.label
                          ? 'border-[var(--ember)] bg-[var(--ember)]/15 text-[var(--flour)] shadow-sm'
                          : 'border-white/10 text-[var(--smoke)] hover:border-white/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{v.label}</span>
                        <span className="font-mono">${v.price.toFixed(2)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization / Add-ons (e.g. Cheese, Bacon, Caramelized Onions) */}
            {item.toppings && item.toppings.length > 0 && (
              <div className="mb-6">
                <div className="text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                  <span>Customize / Add-Ons</span>
                </div>
                <div className="space-y-2">
                  {item.toppings.map((top) => {
                    const isSelected = selectedAddons.some((a) => a.name === top.name);
                    return (
                      <button
                        key={top.name}
                        type="button"
                        onClick={() => toggleAddon(top)}
                        className={`w-full flex items-center justify-between p-2.5 text-xs font-medium border transition-colors ${
                          isSelected
                            ? 'border-[var(--ember)] bg-[var(--ember)]/15 text-[var(--flour)]'
                            : 'border-white/10 text-[var(--smoke)] hover:border-white/25'
                        }`}
                      >
                        <span>{top.name}</span>
                        <span className="font-mono">
                          {top.price === 0 ? 'Included' : `+$${top.price.toFixed(2)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="mb-6">
              <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra napkins, sauce on the side..."
                rows={2}
                className="w-full bg-[#2B1D14] border border-white/15 p-2.5 text-xs text-[var(--flour)] placeholder:text-[var(--smoke)] focus:outline-none focus:border-[var(--ember)] resize-none"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[var(--smoke)]">
                Quantity
              </span>
              <div className="flex items-center border border-white/20 bg-black/40">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[var(--smoke)] hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold font-mono text-[var(--flour)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[var(--smoke)] hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-[var(--flour)] text-xs font-bold uppercase tracking-wider flex items-center justify-center justify-between px-6 shadow-xl transition-all"
            >
              <span>ADD TO ORDER</span>
              <span className="font-mono text-sm">${itemTotal.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
