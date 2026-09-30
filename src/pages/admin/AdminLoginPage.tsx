import React, { useState } from 'react';
import { useAuthStore, useUIStore } from '../../stores';
import { Shield, KeyRound, AlertCircle, ArrowRight, Lock } from 'lucide-react';

interface AdminLoginPageProps {
  onNavigate: (route: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState('demo@zahriontech.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        addToast({
          type: 'success',
          title: 'ACCESS GRANTED',
          message: 'Welcome back to The Mez Kitchen Operations Dashboard.',
        });
        onNavigate('/admin');
      } else {
        setError('Invalid credentials. Please use demo@zahriontech.com / demo123');
      }
      setLoading(false);
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('demo@zahriontech.com');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1C140F] border border-white/10 p-8 sm:p-10 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[var(--ember)]/15 border border-[var(--ember)]/40 text-[var(--ember)] mx-auto flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[var(--gold-line)] mb-1">
            RESTAURANT OPERATIONS SUITE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
            THE MEZ ADMIN
          </h1>
          <p className="text-xs text-[var(--smoke)] mt-1">
            Sign in to manage live orders, reservations, menu items & analytics.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 p-3.5 bg-black/40 border border-[var(--gold-line)]/30 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold-line)]">
              DEMO ACCESS CREDENTIALS
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[10px] text-[var(--ember)] hover:underline uppercase font-bold"
            >
              Fill Credentials
            </button>
          </div>
          <div className="font-mono text-[11px] text-[var(--flour)]/85 space-y-0.5">
            <div>Email: <strong className="text-white">demo@zahriontech.com</strong></div>
            <div>Pass: <strong className="text-white">demo123</strong></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-1">
              Staff Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-[var(--smoke)] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>ENTER OPS DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[var(--smoke)] hover:text-white transition-colors"
          >
            ← Return to public website
          </button>
        </div>
      </div>
    </div>
  );
};
