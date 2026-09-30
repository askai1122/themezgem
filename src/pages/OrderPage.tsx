import React from 'react';
import { MenuPage } from './MenuPage';
import { MenuItem } from '../types';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore, useUIStore } from '../stores';

interface OrderPageProps {
  onSelectItem: (item: MenuItem) => void;
  onNavigate: (route: string) => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({ onSelectItem, onNavigate }) => {
  const { items, subtotal } = useCartStore();
  const { setIsCartOpen } = useUIStore();

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="relative">
      {/* Top Banner Notice */}
      <div className="bg-[#2B1D14] border-b border-white/10 pt-24 pb-4 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[var(--flour)] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>KITCHEN IS ACCEPTING ORDERS · PICKUP AT 1267 GARRISON RD</span>
          </div>

          {totalCount > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[var(--ember)] text-white font-bold uppercase tracking-wider rounded-sm shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{totalCount} ITEMS IN BAG (${subtotal().toFixed(2)})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>
      </div>

      <MenuPage onSelectItem={onSelectItem} />
    </div>
  );
};
