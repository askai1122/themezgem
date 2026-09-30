import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Calendar,
  UtensilsCrossed,
  Sparkles,
  Ticket,
  Users,
  Award,
  Image as ImageIcon,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Power,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuthStore, useSettingsStore, useUIStore } from '../../stores';

interface AdminLayoutProps {
  currentAdminRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentAdminRoute,
  onNavigate,
  children,
}) => {
  const { user, logout } = useAuthStore();
  const { settings, updateSettings } = useSettingsStore();
  const { addToast } = useUIStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Dashboard', route: '/admin', icon: LayoutDashboard },
    { label: 'Orders', route: '/admin/orders', icon: ShoppingBag },
    { label: 'Reservations', route: '/admin/reservations', icon: Calendar },
    { label: 'Menu CMS', route: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Events CMS', route: '/admin/events', icon: Sparkles },
    { label: 'Promotions', route: '/admin/promotions', icon: Ticket },
    { label: 'Customers', route: '/admin/customers', icon: Users },
    { label: 'Rewards & Loyalty', route: '/admin/rewards', icon: Award },
    { label: 'Media Gallery', route: '/admin/gallery', icon: ImageIcon },
    { label: 'Analytics', route: '/admin/analytics', icon: BarChart3 },
    { label: 'Store Settings', route: '/admin/settings', icon: SettingsIcon },
  ];

  const handleToggleStoreStatus = () => {
    const nextStatus = !settings.isOpen;
    updateSettings({ ...settings, isOpen: nextStatus });
    addToast({
      type: 'info',
      title: nextStatus ? 'RESTAURANT OPEN' : 'RESTAURANT CLOSED',
      message: nextStatus
        ? 'Live kitchen is now actively taking orders and reservations.'
        : 'Restaurant marked closed for new incoming orders.',
    });
  };

  const handleLogout = () => {
    logout();
    addToast({
      type: 'info',
      title: 'SIGNED OUT',
      message: 'You have been logged out of The Mez Admin.',
    });
    onNavigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] flex flex-col lg:flex-row">
      {/* Sidebar for Desktop */}
      <aside
        className={`hidden lg:flex flex-col justify-between bg-[#1C140F] border-r border-white/10 transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="/images/hero/logo.jpg"
                alt="The Mez Logo"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-[#C79A55]/40"
              />
              {!sidebarCollapsed && (
                <div>
                  <div className="text-sm font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
                    THE MEZ
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-[var(--ember)] font-bold">
                    ADMIN OPERATIONS
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-[var(--smoke)] hover:text-white"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.route === '/admin'
                  ? currentAdminRoute === '/admin'
                  : currentAdminRoute.startsWith(item.route);

              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors relative text-left ${
                    isActive
                      ? 'bg-[var(--ember)] text-white shadow-md'
                      : 'text-[var(--smoke)] hover:text-[var(--flour)] hover:bg-[#2B1D14]'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {/* Back to public site */}
          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--smoke)] hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0 text-[var(--gold-line)]" />
            {!sidebarCollapsed && <span>Public Website</span>}
          </button>

          {/* Staff User & Logout */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold text-[var(--flour)] truncate">
                  {user?.name || 'Staff Manager'}
                </div>
                <div className="text-[9px] text-[var(--smoke)] truncate">
                  {user?.email || 'demo@zahriontech.com'}
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-1.5 text-[var(--smoke)] hover:text-red-400"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-[#1C140F]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[var(--flour)]"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Quick Status Pill */}
            <button
              onClick={handleToggleStoreStatus}
              className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-bold uppercase tracking-wider transition-all ${
                settings.isOpen
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                  : 'border-red-500/40 bg-red-950/40 text-red-400'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{settings.isOpen ? 'KITCHEN: OPEN' : 'KITCHEN: CLOSED'}</span>
            </button>

            <span className="hidden sm:inline-block text-xs text-[var(--smoke)]">
              #9 – 1267 Garrison Rd
            </span>
          </div>

          {/* Right Topbar Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-[#15100C] border border-white/10 px-3 py-1.5 text-xs text-[var(--flour)]">
              <Search className="w-3.5 h-3.5 text-[var(--smoke)]" />
              <input
                type="text"
                placeholder="Global admin lookup (/)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-[var(--flour)] placeholder:text-[var(--smoke)] focus:outline-none w-48"
              />
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#2B1D14] border border-white/10 text-[10px] font-bold uppercase tracking-wider text-[var(--gold-line)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--ember)]" />
              <span className="hidden sm:inline">Powered by ZahrionTech</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex">
          <div className="w-72 bg-[#1C140F] h-full flex flex-col justify-between p-4 border-r border-white/10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="text-sm font-bold uppercase font-display text-[var(--flour)]">
                  THE MEZ ADMIN
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[var(--smoke)] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.route}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.route);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-left ${
                      currentAdminRoute === item.route
                        ? 'bg-[var(--ember)] text-white'
                        : 'text-[var(--smoke)] hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/');
                }}
                className="w-full py-2 bg-[#2B1D14] text-xs font-bold uppercase tracking-wider text-center"
              >
                PUBLIC WEBSITE
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-950/40 text-red-300 text-xs font-bold uppercase tracking-wider text-center"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
