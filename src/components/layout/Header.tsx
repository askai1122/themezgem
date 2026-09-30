import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Shield, Phone, Sparkles } from 'lucide-react';
import { useUIStore, useCartStore } from '../../stores';

interface HeaderProps {
  onNavigate: (route: string) => void;
  currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentRoute }) => {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, setIsCartOpen } = useUIStore();
  const { items } = useCartStore();

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'MENU', route: '/menu' },
    { label: 'ORDER', route: '/order' },
    { label: 'RESERVATIONS', route: '/reservations' },
    { label: 'EVENTS', route: '/events' },
    { label: 'ABOUT', route: '/about' },
    { label: 'GALLERY', route: '/gallery' },
    { label: 'REWARDS', route: '/rewards' },
    { label: 'CONTACT', route: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#15100C]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#15100C]/90 via-[#15100C]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#C79A55]/40 group-hover:border-[var(--ember)] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.6)] bg-black flex-shrink-0">
              <img
                src="/images/hero/logo.jpg"
                alt="The Mez Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-none group-hover:text-[var(--ember)] transition-colors">
                THE MEZ
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--smoke)] font-bold">
                BAR & GRILL · FORT ERIE
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = currentRoute === link.route || currentRoute.startsWith(link.route + '/');
              return (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`text-xs font-bold tracking-widest uppercase transition-colors relative py-1 focus:outline-none ${
                    active
                      ? 'text-[var(--ember)]'
                      : 'text-[var(--flour)]/80 hover:text-[var(--flour)]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--ember)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Admin Ops Portal Link */}
            <button
              onClick={() => onNavigate('/admin')}
              title="Restaurant Admin Operations Portal"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-[var(--smoke)] hover:text-[var(--flour)] border border-white/10 hover:border-white/30 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-[var(--gold-line)]" />
              <span>ADMIN OPS</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[var(--umber)] hover:bg-[#3D2B1F] text-[var(--flour)] border border-white/10 transition-colors focus:outline-none"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[var(--flour)]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--ember)] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Primary Order CTA */}
            <button
              onClick={() => onNavigate('/order')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-[var(--flour)] text-xs font-bold tracking-wider uppercase transition-colors shadow-[0_4px_15px_rgba(217,98,43,0.3)]"
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>ORDER LIVE</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[var(--flour)] hover:text-[var(--ember)] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#15100C] flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto animate-fadeIn">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="text-2xl font-extrabold uppercase font-display text-[var(--flour)]">
                THE MEZ
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[var(--smoke)] hover:text-[var(--flour)]"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(link.route);
                  }}
                  className="text-left text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] hover:text-[var(--ember)] transition-colors py-1 flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[var(--smoke)] group-hover:text-[var(--ember)]">→</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/admin');
                }}
                className="text-left text-xl font-bold uppercase tracking-tight text-[var(--gold-line)] py-2 mt-4 flex items-center gap-2 border-t border-white/10"
              >
                <Shield className="w-4 h-4" />
                <span>ADMIN OPERATIONS</span>
              </button>
            </nav>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/order');
              }}
              className="w-full py-4 bg-[var(--ember)] text-[var(--flour)] text-center font-bold uppercase tracking-wider text-sm shadow-xl"
            >
              START ONLINE ORDER
            </button>
            <div className="text-xs text-[var(--smoke)] text-center">
              1267 Garrison Road, Fort Erie · <a href="tel:2893209866" className="text-[var(--flour)] underline">289-320-9866</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
