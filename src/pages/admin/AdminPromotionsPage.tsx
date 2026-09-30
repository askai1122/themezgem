import React, { useState, useEffect } from 'react';
import { usePromotionStore, useUIStore } from '../../stores';
import { Promotion } from '../../types';
import { Ticket, Plus, Trash2, Power, X } from 'lucide-react';

export const AdminPromotionsPage: React.FC = () => {
  const { promotions, loadPromotions, savePromotion, deletePromotion } = usePromotionStore();
  const { addToast } = useUIStore();

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Promotion | null>(null);

  useEffect(() => {
    loadPromotions();
  }, [loadPromotions]);

  const handleToggleActive = async (p: Promotion) => {
    const updated = { ...p, active: !p.active };
    await savePromotion(updated);
    addToast({
      type: 'info',
      title: updated.active ? 'PROMOTION ACTIVATED' : 'PROMOTION PAUSED',
      message: `${updated.title} is now ${updated.active ? 'active' : 'inactive'}.`,
    });
  };

  const handleOpenNew = () => {
    setEditing({
      id: `promo-${Date.now()}`,
      title: 'BURGER COMBO DEAL [DEMO PROMOTION]',
      description: 'DEMO PROMOTION — $2 off any burger and side combo.',
      code: 'BURGER2',
      discount: '$2.00 OFF',
      startDate: '2026-10-01',
      endDate: '2026-12-31',
      active: true,
      isDemo: true,
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await savePromotion(editing);
    setIsOpen(false);
    setEditing(null);
    addToast({
      type: 'success',
      title: 'PROMOTION SAVED',
      message: `"${editing.title}" saved.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-line)]">
            SPECIAL OFFERS & DISCOUNT CODES
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            PROMOTIONS ({promotions.length})
          </h1>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>NEW PROMOTION</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((p) => (
          <div
            key={p.id}
            className="bg-[#1C140F] border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-white/20 transition-colors shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--ember)] bg-black/40 px-2.5 py-0.5 border border-[var(--ember)]/30">
                  DEMO PROMOTION
                </span>
                <span
                  className={`text-[9px] uppercase font-bold px-2 py-0.5 border ${
                    p.active
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40'
                      : 'border-white/20 text-[var(--smoke)]'
                  }`}
                >
                  {p.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <h3 className="text-lg font-bold uppercase font-display text-[var(--flour)] leading-snug">
                {p.title}
              </h3>

              <div className="flex items-center gap-3 my-3">
                <div className="p-2 bg-[#15100C] border border-dashed border-[var(--gold-line)] text-xs font-mono font-bold text-[var(--gold-line)]">
                  CODE: {p.code}
                </div>
                <div className="text-sm font-bold font-mono text-[var(--ember)]">
                  {p.discount}
                </div>
              </div>

              <p className="text-xs text-[var(--smoke)] leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[var(--smoke)]">
              <span>Valid: {p.startDate} to {p.endDate}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(p)}
                  className="px-3 py-1.5 bg-[#2B1D14] hover:bg-black text-[var(--flour)] text-[10px] font-bold uppercase border border-white/10"
                >
                  {p.active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm('Delete this promotion?')) {
                      await deletePromotion(p.id);
                    }
                  }}
                  className="p-1.5 text-[var(--smoke)] hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promotion Modal */}
      {isOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C140F] border border-white/15 w-full max-w-md p-6 sm:p-8 space-y-4 text-[#F3ECDD] shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--smoke)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold uppercase font-display">
              CREATE PROMOTION
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    required
                    value={editing.code}
                    onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })}
                    className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Discount Label
                  </label>
                  <input
                    type="text"
                    required
                    value={editing.discount}
                    onChange={(e) => setEditing({ ...editing, discount: e.target.value })}
                    className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs uppercase font-bold text-[var(--smoke)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Promo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
