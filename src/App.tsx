import React, { useState, useEffect } from 'react';
import { useUIStore, useAuthStore } from './stores';
import { MenuItem } from './types';

// Common Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { CustomCursor } from './components/common/CustomCursor';
import { ZahrionTechBadge } from './components/common/ZahrionTechBadge';
import { CinematicIntro } from './components/motion/CinematicIntro';
import { MenuItemDetailModal } from './components/menu/MenuItemDetailModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderPage } from './pages/OrderPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ReservationConfirmationPage } from './pages/ReservationConfirmationPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryGrid } from './components/gallery/GalleryGrid';
import { RewardsPage } from './pages/RewardsPage';
import { AppPage } from './pages/AppPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminReservationsPage } from './pages/admin/AdminReservationsPage';
import { AdminMenuPage } from './pages/admin/AdminMenuPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminPromotionsPage } from './pages/admin/AdminPromotionsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminRewardsPage } from './pages/admin/AdminRewardsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  const { currentRoute, setCurrentRoute, isCartOpen, setIsCartOpen } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  // Sync route with browser window.location on mount and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    setCurrentRoute(window.location.pathname || '/');

    return () => window.removeEventListener('popstate', handlePopState);
  }, [setCurrentRoute]);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = currentRoute.startsWith('/admin');

  // Handle protected admin routes
  if (isAdminRoute && currentRoute !== '/admin/login' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#15100C] text-[#F3ECDD]">
        <CustomCursor />
        <ToastContainer />
        <AdminLoginPage onNavigate={navigate} />
      </div>
    );
  }

  // Admin routing view
  if (isAdminRoute) {
    if (currentRoute === '/admin/login') {
      return (
        <div className="min-h-screen bg-[#15100C] text-[#F3ECDD]">
          <CustomCursor />
          <ToastContainer />
          <AdminLoginPage onNavigate={navigate} />
        </div>
      );
    }

    return (
      <AdminLayout currentAdminRoute={currentRoute} onNavigate={navigate}>
        <CustomCursor />
        <ToastContainer />
        {currentRoute === '/admin' && <AdminDashboardPage onNavigate={navigate} />}
        {currentRoute === '/admin/orders' && <AdminOrdersPage />}
        {currentRoute === '/admin/reservations' && <AdminReservationsPage />}
        {currentRoute === '/admin/menu' && <AdminMenuPage />}
        {currentRoute === '/admin/events' && <AdminEventsPage />}
        {currentRoute === '/admin/promotions' && <AdminPromotionsPage />}
        {currentRoute === '/admin/customers' && <AdminCustomersPage />}
        {currentRoute === '/admin/rewards' && <AdminRewardsPage />}
        {currentRoute === '/admin/gallery' && <AdminGalleryPage />}
        {currentRoute === '/admin/analytics' && <AdminAnalyticsPage />}
        {currentRoute === '/admin/settings' && <AdminSettingsPage />}
      </AdminLayout>
    );
  }

  // Public routing view
  const renderPublicPage = () => {
    // Dynamic order confirmation route /order-confirmation/:id
    if (currentRoute.startsWith('/order-confirmation/')) {
      const orderId = currentRoute.replace('/order-confirmation/', '');
      return <OrderConfirmationPage orderId={orderId} onNavigate={navigate} />;
    }

    // Dynamic reservation confirmation route /reservation-confirmation/:id
    if (currentRoute.startsWith('/reservation-confirmation/')) {
      const reservationId = currentRoute.replace('/reservation-confirmation/', '');
      return <ReservationConfirmationPage reservationId={reservationId} onNavigate={navigate} />;
    }

    switch (currentRoute) {
      case '/':
        return <HomePage onNavigate={navigate} onSelectItem={setSelectedMenuItem} />;
      case '/menu':
        return <MenuPage onSelectItem={setSelectedMenuItem} />;
      case '/order':
        return <OrderPage onSelectItem={setSelectedMenuItem} onNavigate={navigate} />;
      case '/cart':
        return <OrderPage onSelectItem={setSelectedMenuItem} onNavigate={navigate} />;
      case '/checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case '/reservations':
        return <ReservationsPage onNavigate={navigate} />;
      case '/events':
        return <EventsPage />;
      case '/about':
        return <AboutPage />;
      case '/gallery':
        return (
          <div className="pt-24 min-h-screen bg-[#15100C]">
            <GalleryGrid />
          </div>
        );
      case '/rewards':
        return <RewardsPage />;
      case '/app':
        return <AppPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] flex flex-col justify-between selection:bg-[#D9622B] selection:text-[#F3ECDD]">
      {/* Cinematic Intro (plays once per session) */}
      <CinematicIntro />

      {/* Custom Cursor on Desktop */}
      <CustomCursor />

      {/* Floating ZahrionTech Agency Attribution Badge */}
      <ZahrionTechBadge />

      {/* Global Toast Container */}
      <ToastContainer />

      {/* Header */}
      <Header onNavigate={navigate} currentRoute={currentRoute} />

      {/* Main Page Content */}
      <main className="flex-1">{renderPublicPage()}</main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Mobile Fixed Bottom Bar (ORDER | BOOK | CALL) */}
      <MobileBottomBar onNavigate={navigate} />

      {/* Global Cart Drawer */}
      <CartDrawer onNavigate={navigate} />

      {/* Split-Screen Menu Item Detail Modal */}
      <MenuItemDetailModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
      />
    </div>
  );
}

export default App;
