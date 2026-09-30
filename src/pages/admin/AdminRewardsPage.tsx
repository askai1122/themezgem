import React, { useState, useEffect } from 'react';
import { useRewardsStore, useUIStore } from '../../stores';
import { RewardItem } from '../../types';
import { Award, Plus, Trash2, Edit2, X } from 'lucide-react';

export const AdminRewardsPage: React.FC = () => {
  const { rewards, loadRewards, saveReward, deleteReward } = useRewardsStore();
  const { addToast } = useUIStore();

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<RewardItem | null>(null);

  useEffect(() => {
    loadRewards();
  }, [loadRewards]);

  const handleOpenNew = () => {
    setEditing({
      id: `rew-${Date.now()}`,
      title: 'Free Appetizer or Dessert',
      pointsRequired: 500,
      description: 'Redeem for any standard appetizer basket or cheesecake slice.',
      active: true,
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveReward(editing);
    setIsOpen(false);
    setEditing(null);
    addToast({
      type: 'success',
      title: 'REWARD UPDATED',
      message: `"${editing.title}" saved.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-line)]">
            LOYALTY PROGRAM CONFIGURATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            REWARDS MANAGEMENT ({rewards.length})
          </h1>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>ADD REWARD TIER</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((r) => (
          <div
            key={r.id}
            className="bg-[#1C140F] border border-white/10 p-6 flex items-start justify-between gap-4 hover:border-white/20 transition-colors shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--gold-line)]" />
                <span className="text-sm font-bold font-mono text-[var(--gold-line)]">
                  {r.pointsRequired} POINTS REQUIRED
                </span>
              </div>

              <h3 className="text-base font-bold uppercase font-display text-[var(--flour)]">
                {r.title}
              </h3>

              <p className="text-xs text-[var(--smoke)] leading-relaxed">
                {r.description}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setEditing({ ...r });
                  setIsOpen(true);
                }}
                className="p-1.5 text-[var(--smoke)] hover:text-white"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('Delete this reward tier?')) {
                    await deleteReward(r.id);
                  }
                }}
                className="p-1.5 text-[var(--smoke)] hover:text-red-400"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              EDIT REWARD TIER
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

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Points Required
                </label>
                <input
                  type="number"
                  required
                  value={editing.pointsRequired}
                  onChange={(e) =>
                    setEditing({ ...editing, pointsRequired: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] font-mono"
                />
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
                  Save Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
