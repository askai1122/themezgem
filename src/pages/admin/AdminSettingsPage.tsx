import React, { useState, useEffect } from 'react';
import { useSettingsStore, useUIStore } from '../../stores';
import { RestaurantSettings } from '../../types';
import { Settings, Save, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, loadSettings, updateSettings, resetAllDemoData } = useSettingsStore();
  const { addToast } = useUIStore();

  const [form, setForm] = useState<RestaurantSettings>(settings);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(form);
    addToast({
      type: 'success',
      title: 'SETTINGS PERSISTED',
      message: 'Restaurant configuration updated across all services.',
    });
  };

  const handleExecuteReset = async () => {
    await resetAllDemoData();
    setShowResetConfirm(false);
    addToast({
      type: 'info',
      title: 'DEMO DATA RESTORED',
      message: 'All menu items, orders, reservations and gallery assets have been restored to initial seed.',
    });
    window.location.reload();
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-5">
        <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-line)]">
          GLOBAL CONFIGURATION & DEMO CONTROL
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
          RESTAURANT SETTINGS
        </h1>
      </div>

      <form onSubmit={handleSave} className="bg-[#1C140F] border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
              Telephone Line
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
              Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
              City / Province / Postal
            </label>
            <input
              type="text"
              value={`${form.city}, ${form.postalCode}`}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
              Operational Hours Display
            </label>
            <input
              type="text"
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <label className="flex items-center gap-3 text-xs font-bold uppercase text-[var(--flour)] cursor-pointer">
            <input
              type="checkbox"
              checked={form.isOpen}
              onChange={(e) => setForm({ ...form, isOpen: e.target.checked })}
              className="w-4 h-4 accent-[var(--ember)]"
            />
            <span>Kitchen Open for Business</span>
          </label>

          <label className="flex items-center gap-3 text-xs font-bold uppercase text-[var(--flour)] cursor-pointer">
            <input
              type="checkbox"
              checked={form.orderAccepting}
              onChange={(e) => setForm({ ...form, orderAccepting: e.target.checked })}
              className="w-4 h-4 accent-[var(--ember)]"
            />
            <span>Accepting Online Orders</span>
          </label>

          <label className="flex items-center gap-3 text-xs font-bold uppercase text-[var(--flour)] cursor-pointer">
            <input
              type="checkbox"
              checked={form.reservationsOpen}
              onChange={(e) => setForm({ ...form, reservationsOpen: e.target.checked })}
              className="w-4 h-4 accent-[var(--ember)]"
            />
            <span>Accepting Table Reservations</span>
          </label>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CONFIGURATION</span>
          </button>
        </div>
      </form>

      {/* Demo Reset Section (Section 48) */}
      <div className="bg-[#1C140F] border border-red-500/30 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs">
          <AlertTriangle className="w-4 h-4" />
          <span>SALES DEMO RESET CONTROL</span>
        </div>
        <h2 className="text-xl font-bold uppercase font-display text-[var(--flour)]">
          RESET DEMO DATA TO INITIAL SEED
        </h2>
        <p className="text-xs text-[var(--smoke)] leading-relaxed">
          Restore all real menu categories, original orders, reservations, events, and gallery assets to their pristine state. Useful for repeating live sales demonstrations for restaurant owners.
        </p>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="px-5 py-2.5 bg-red-950/40 hover:bg-red-950 text-red-300 border border-red-500/50 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET ALL DEMO DATA</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#1C140F] border border-red-500/50 w-full max-w-md p-6 space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
            <h3 className="text-lg font-bold uppercase font-display text-[var(--flour)]">
              CONFIRM DEMO REINITIALIZATION?
            </h3>
            <p className="text-xs text-[var(--smoke)] leading-relaxed">
              This will erase any custom orders or changes you made during this test session and restore the original verified menu and assets.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-transparent text-xs text-[var(--smoke)] hover:text-white uppercase font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteReset}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
