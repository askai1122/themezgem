import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Flame } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCartStore, useUIStore } from '../../stores';

interface OffTheGrillCarouselProps {
  onSelectItem: (item: MenuItem) => void;
  onNavigate: (route: string) => void;
}

const FEATURED_DISHES: MenuItem[] = [
  {
    id: 'burg-3',
    name: 'Bacon Cheese Mez',
    category: 'Mez Burger',
    price: 14.99,
    description: 'Two smashed 100% beef patties topped with cheese, bacon, lettuce, tomatoes, onions, on a toasted bun.',
    image: '/images/food/bacon-cheese-mez.jpg',
    video: '/video/hero/hero-01.mp4',
    tags: ['Signature Smash'],
    available: true,
    featured: true,
  },
  {
    id: 'hand-3',
    name: 'Erie Cheesesteak',
    category: 'Hand-Held',
    price: 16.95,
    description: 'Steak grilled with sauteed onions and cheese on a baguette, topped with garlic mayo, lettuce and pickles.',
    image: '/images/food/erie-cheesesteak.jpg',
    video: '/video/categories/handhelds.mp4',
    tags: ['Fort Erie Legend'],
    available: true,
    featured: true,
  },
  {
    id: 'plate-1',
    name: 'Steak on the Rocks',
    category: 'Plates',
    price: 25.99,
    description: '8oz steak cooked to your preference, served on a bed of golden fries.',
    image: '/images/food/steak-on-the-rocks.jpg',
    video: '/video/hero/hero-03.mp4',
    tags: ['Prime Steak'],
    available: true,
    featured: true,
  },
  {
    id: 'plate-4',
    name: 'Fish & Chips',
    category: 'Plates',
    price: 14.45,
    description: 'Beer-battered cod fried to golden perfection, served with fries and tartar sauce.',
    image: '/images/food/fish-sandwich.jpg',
    video: '/video/categories/plates.mp4',
    tags: ['Beer Battered Cod'],
    available: true,
    featured: true,
  },
  {
    id: 'des-1',
    name: 'Cheesecake (The Cheesecake Factory)',
    category: 'Dessert',
    price: 9.99,
    description: 'Choice of White Chocolate Raspberry, Godiva Double Chocolate, Oreo Cookies & Cream, or Dulce de Leche.',
    image: '/images/food/cheesecake.jpg',
    video: '/video/categories/dessert.mp4',
    tags: ['The Cheesecake Factory'],
    available: true,
    featured: true,
  },
  {
    id: 'app-8',
    name: 'Wings (1 LB)',
    category: 'Appetizers',
    price: 17.99,
    description: 'Breaded or non-breaded wings with your choice of sauce.',
    image: '/images/food/wings.jpg',
    video: '/video/hero/hero-02.mp4',
    tags: ['Sauce Tossed'],
    available: true,
    featured: true,
  },
];

export const OffTheGrillCarousel: React.FC<OffTheGrillCarouselProps> = ({ onSelectItem, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : FEATURED_DISHES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < FEATURED_DISHES.length - 1 ? prev + 1 : 0));
  };

  const handleQuickAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    addItem({
      menuItemId: dish.id,
      name: dish.name,
      price: dish.price,
      selectedAddons: [],
      quantity: 1,
      image: dish.image,
    });
    addToast({
      type: 'success',
      title: 'ADDED TO ORDER',
      message: `${dish.name} added to your bag.`,
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#15100C] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[rgba(217,98,43,0.06)] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--ember)] font-bold mb-2">
              <Flame className="w-4 h-4" />
              <span>THE GRILL IS FIRED UP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
              OFF THE GRILL
            </h2>
            <p className="text-sm text-[var(--smoke)] mt-2 max-w-lg">
              Signature smash patties, freshly crisped wings, and hearty plates seared live in Fort Erie.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 bg-[var(--umber)] hover:bg-[#3D2B1F] text-[var(--flour)] border border-white/10 hover:border-[var(--ember)] transition-all"
              aria-label="Previous dish"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-[var(--umber)] hover:bg-[#3D2B1F] text-[var(--flour)] border border-white/10 hover:border-[var(--ember)] transition-all"
              aria-label="Next dish"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('/menu')}
              className="ml-4 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[var(--flour)] hover:text-[var(--ember)] transition-colors border border-white/10 hover:border-white/30"
            >
              FULL MENU →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel View */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {FEATURED_DISHES.map((dish, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={dish.id}
                onClick={() => {
                  setActiveIndex(idx);
                  onSelectItem(dish);
                }}
                className={`group relative bg-[#2B1D14] border transition-colors duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? 'border-[var(--ember)] shadow-[0_12px_40px_rgba(217,98,43,0.18)]'
                    : 'border-white/10 hover:border-white/25 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Media Container: Active card plays video loop, inactive stays static */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  {isActive && dish.video ? (
                    <video
                      src={dish.video}
                      poster={dish.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D14] via-transparent to-black/30" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[var(--flour)] bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                    {dish.category}
                  </div>

                  {isActive && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[var(--ember)] bg-black/80 px-2.5 py-1 border border-[var(--ember)]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ember)] animate-pulse" />
                      <span>KINETIC PREVIEW</span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="text-xl font-bold uppercase font-display text-[var(--flour)] group-hover:text-[var(--ember)] transition-colors leading-tight">
                        {dish.name}
                      </h3>
                      <span className="text-lg font-mono font-bold text-[var(--flour)]">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--smoke)] leading-relaxed line-clamp-2 mb-4">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--smoke)] group-hover:text-[var(--flour)] transition-colors">
                      CUSTOMIZE DISH →
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, dish)}
                      className="p-2.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-[var(--flour)] shadow-md transition-all active:scale-95"
                      title="Quick Add to Order"
                      aria-label={`Quick add ${dish.name}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
