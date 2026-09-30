import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#15100C] border-t border-white/10 text-[var(--flour)] pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C79A55]/40 shadow-lg bg-black flex-shrink-0">
                <img
                  src="/images/hero/logo.jpg"
                  alt="The Mez Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-2xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
                  THE MEZ
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--smoke)] font-bold">
                  BAR & GRILL · FORT ERIE
                </div>
              </div>
            </div>

            <p className="font-serif-accent text-base text-[var(--flour)]/80 italic max-w-sm">
              Good Food. Good People. Good Times. Cooked live, served fast, felt good.
            </p>

            <div className="text-xs text-[var(--smoke)] space-y-2 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--ember)] flex-shrink-0 mt-0.5" />
                <span>#9 – 1267 Garrison Road, Fort Erie, Ontario, Canada, L2A 1P2</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--ember)] flex-shrink-0" />
                <a href="tel:2893209866" className="hover:text-[var(--flour)] transition-colors">
                  289-320-9866
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--ember)] flex-shrink-0" />
                <a href="mailto:info@themez.ca" className="hover:text-[var(--flour)] transition-colors">
                  info@themez.ca
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--gold-line)] flex-shrink-0" />
                <span>Daily, 12:00 PM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase font-bold tracking-widest text-[var(--smoke)] mb-2">
              EXPLORE
            </div>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              {['/menu', '/order', '/reservations', '/events', '/about', '/gallery', '/rewards', '/app', '/contact'].map((r) => (
                <li key={r}>
                  <button
                    onClick={() => onNavigate(r)}
                    className="hover:text-[var(--ember)] transition-colors text-left"
                  >
                    {r.replace('/', '').toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Operations & Administration */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-[var(--smoke)] mb-2">
              OPERATIONS
            </div>
            <p className="text-xs text-[var(--smoke)] leading-relaxed">
              Live kitchen digital operations suite for managers and staff. Track live orders, seats, menu availability, and promotions in real time.
            </p>
            <div className="pt-1">
              <button
                onClick={() => onNavigate('/admin')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2B1D14] hover:bg-[#3D2B1F] text-[var(--flour)] border border-white/15 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Shield className="w-4 h-4 text-[var(--gold-line)]" />
                <span>ACCESS ADMIN PORTAL</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--smoke)] gap-4">
          <div>
            © 2026 The Takawy Organization Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Website & Digital Experience by</span>
            <a
              href="https://zahriontech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--flour)] font-bold hover:text-[var(--ember)] flex items-center gap-1 transition-colors"
            >
              <span>ZahrionTech</span>
              <ExternalLink className="w-3 h-3 text-[var(--ember)]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
