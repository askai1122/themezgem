import React, { useState, useEffect } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { useMenuStore, useCartStore, useUIStore } from '../stores';
import { Search, Plus, Sparkles, Flame, Check } from 'lucide-react';
import { HoverPlayVideo } from '../components/motion/HoverPlayVideo';

interface MenuPageProps {
  onSelectItem: (item: MenuItem) => void;
  initialCategory?: MenuCategory | 'All';
}

const CATEGORY_BANNERS: Record<string, { video: string; poster: string; subtitle: string }> = {
  'Appetizers': {
    video: '/video/categories/appetizers.mp4',
    poster: '/images/food/basket-o-fries.jpg',
    subtitle: 'Golden fries, beer-battered rings, crispy wings and sharable bites.',
  },
  'Mez Burger': {
    video: '/video/categories/burgers.mp4',
    poster: '/images/food/bacon-cheese-mez.jpg',
    subtitle: '100% beef patties seared on the scorching flat-top, toasted buns.',
  },
  'Hand-Held': {
    video: '/video/categories/handhelds.mp4',
    poster: '/images/food/erie-cheesesteak.jpg',
    subtitle: 'Steak cheesesteaks, beer-battered fish, and hearty pulled pork.',
  },
  'Plates': {
    video: '/video/categories/plates.mp4',
    poster: '/images/food/steak-on-the-rocks.jpg',
    subtitle: '8oz & 12oz steak on the rocks, fish & chips, and hearty plates.',
  },
  'Kids Menu': {
    video: '/video/categories/appetizers.mp4',
    poster: '/images/food/chicken-fingers.jpg',
    subtitle: 'All kids items include golden crispy fries.',
  },
  'Sides': {
    video: '/video/categories/appetizers.mp4',
    poster: '/images/food/basket-o-rings.jpg',
    subtitle: 'Fries, onion rings, sweet potato fries, and Caesar salad.',
  },
  'Add-ons': {
    video: '/video/categories/burgers.mp4',
    poster: '/images/food/single-mez.jpg',
    subtitle: 'Bacon, cheese, caramelized onions, and sauteed mushrooms.',
  },
  'Dessert': {
    video: '/video/categories/dessert.mp4',
    poster: '/images/food/cheesecake.jpg',
    subtitle: 'Official slices from The Cheesecake Factory, warm brownies & ice cream.',
  },
  'Drinks': {
    video: '/video/hero/hero-04.mp4',
    poster: '/images/gallery/gallery-01.jpg',
    subtitle: 'Niagara craft beers, cocktails & refreshments. [DEMO DATA]',
  },
};

export const MenuPage: React.FC<MenuPageProps> = ({ onSelectItem, initialCategory = 'All' }) => {
  const { items, loadMenu } = useMenuStore();
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegetarianOnly, setFilterVegetarianOnly] = useState(false);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  const categories: (MenuCategory | 'All')[] = [
    'All',
    'Appetizers',
    'Mez Burger',
    'Hand-Held',
    'Plates',
    'Kids Menu',
    'Sides',
    'Add-ons',
    'Dessert',
    'Drinks',
  ];

  const filteredItems = items.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (filterVegetarianOnly && !item.tags?.includes('Vegetarian')) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      return matchName || matchDesc;
    }
    return true;
  });

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      selectedAddons: [],
      quantity: 1,
      image: item.image,
    });
    addToast({
      type: 'success',
      title: 'ADDED TO BAG',
      message: `${item.name} added to your order.`,
    });
  };

  const currentBanner = activeCategory !== 'All' && CATEGORY_BANNERS[activeCategory]
    ? CATEGORY_BANNERS[activeCategory]
    : {
        video: '/video/hero/hero-01.mp4',
        poster: '/images/food/bacon-cheese-mez.jpg',
        subtitle: 'Fort Erie’s complete live kitchen menu — flat-top smash burgers, wings & plates.',
      };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-20">
      {/* Category Video Banner Header */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black flex items-center justify-center border-b border-white/10">
        <video
          key={currentBanner.video}
          src={currentBanner.video}
          poster={currentBanner.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-[#15100C]/60 to-black/40" />
        <div className="video-overlay-grain opacity-40" />

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--ember)] mb-2">
            THE MEZ OFFICIAL MENU
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
            {activeCategory === 'All' ? 'ALL KITCHEN ITEMS' : activeCategory}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--flour)]/80 mt-2 max-w-lg mx-auto">
            {currentBanner.subtitle}
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[68px] z-30 bg-[#2B1D14]/95 backdrop-blur-md border-b border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Horizontal Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? 'border-[var(--ember)] bg-[var(--ember)] text-white shadow-sm'
                    : 'border-white/10 text-[var(--smoke)] hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Vegetarian Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-[var(--smoke)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food, wings, burgers..."
                className="w-full bg-[#15100C] border border-white/15 pl-9 pr-3 py-1.5 text-xs text-[var(--flour)] placeholder:text-[var(--smoke)] focus:outline-none focus:border-[var(--ember)]"
              />
            </div>

            <button
              onClick={() => setFilterVegetarianOnly(!filterVegetarianOnly)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all ${
                filterVegetarianOnly
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : 'border-white/10 text-[var(--smoke)] hover:text-white'
              }`}
            >
              <Check className={`w-3 h-3 ${filterVegetarianOnly ? 'opacity-100' : 'opacity-30'}`} />
              <span>Veg Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#2B1D14] border border-white/10 p-8">
            <Flame className="w-10 h-10 text-[var(--ember)] mx-auto mb-3" />
            <h3 className="text-xl font-bold uppercase font-display text-[var(--flour)]">
              NO DISHES MATCH YOUR FILTER
            </h3>
            <p className="text-xs text-[var(--smoke)] mt-2">
              Try searching for something else or reset your category selection.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setFilterVegetarianOnly(false);
              }}
              className="mt-6 px-6 py-2.5 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-[#2B1D14] border border-white/10 hover:border-[var(--ember)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl"
              >
                {/* Media with Hover Category-Matched Video Loop */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <HoverPlayVideo
                    src={item.video || CATEGORY_BANNERS[item.category]?.video || '/video/hero/hero-01.mp4'}
                    poster={item.image}
                    alt={item.name}
                    className="w-full h-full"
                  />

                  {/* Top Tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--flour)] bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/10">
                      {item.category}
                    </span>
                    {item.tags?.includes('Vegetarian') && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-500/40">
                        Vegetarian
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-xl font-bold uppercase font-display text-[var(--flour)] group-hover:text-[var(--ember)] transition-colors leading-tight">
                        {item.name}
                      </h3>
                      <div className="text-lg font-mono font-bold text-[var(--flour)] whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>

                    <p className="text-xs text-[var(--smoke)] leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--smoke)] group-hover:text-[var(--flour)]">
                      CUSTOMIZE & ORDER →
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, item)}
                      className="p-2.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white shadow transition-all active:scale-95"
                      title="Quick Add to Order"
                      aria-label={`Quick add ${item.name}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
