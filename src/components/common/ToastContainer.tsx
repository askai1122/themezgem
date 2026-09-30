import React from 'react';
import { useUIStore } from '../../stores';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-[120] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#2B1D14] border border-[#D9622B]/40 shadow-2xl text-[#F3ECDD] backdrop-blur-md transition-all animate-slideLeft"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
          {(toast.type === 'info' || toast.type === 'ember') && <Info className="w-5 h-5 text-[var(--ember)] flex-shrink-0 mt-0.5" />}

          <div className="flex-1">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--flour)]">
              {toast.title}
            </h5>
            {toast.message && (
              <p className="text-[11px] text-[var(--smoke)] mt-0.5 leading-snug">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[var(--smoke)] hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
