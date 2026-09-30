import { create } from 'zustand';
import { MenuItem, CartItem, Order, Reservation, MenuCategory, GalleryItem, EventItem, Promotion, RestaurantSettings, Customer, RewardItem } from '../types';
import { STORAGE_KEYS, getFromStorage, saveToStorage, removeFromStorage } from '../lib/storage';
import { menuService, orderService, reservationService, eventService, promotionService, galleryService, settingsService, customerService, rewardService } from '../services';

// UI & TOAST STORE
export interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'ember';
  title: string;
  message?: string;
}

interface UIStore {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeModal: string | null;
  modalData: unknown;
  openModal: (modal: string, data?: unknown) => void;
  closeModal: () => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  introSeen: boolean;
  setIntroSeen: (seen: boolean) => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),
  activeModal: null,
  modalData: null,
  openModal: (modal, data = null) => set({ activeModal: modal, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4500);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  introSeen: typeof window !== 'undefined' ? Boolean(sessionStorage.getItem(STORAGE_KEYS.INTRO_SEEN)) : false,
  setIntroSeen: (seen) => {
    if (typeof window !== 'undefined') sessionStorage.setItem(STORAGE_KEYS.INTRO_SEEN, seen ? '1' : '');
    set({ introSeen: seen });
  },
  currentRoute: '/',
  setCurrentRoute: (route) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
    }
    set({ currentRoute: route, mobileMenuOpen: false });
  },
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));

// CART STORE
interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  tax: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []),
  addItem: (item) => {
    const uniqueId = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newItem: CartItem = { ...item, id: uniqueId };
    set((state) => {
      const updated = [...state.items, newItem];
      saveToStorage(STORAGE_KEYS.CART, updated);
      return { items: updated };
    });
  },
  removeItem: (id) => {
    set((state) => {
      const updated = state.items.filter((i) => i.id !== id);
      saveToStorage(STORAGE_KEYS.CART, updated);
      return { items: updated };
    });
  },
  updateQuantity: (id, delta) => {
    set((state) => {
      const updated = state.items
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      saveToStorage(STORAGE_KEYS.CART, updated);
      return { items: updated };
    });
  },
  clearCart: () => {
    saveToStorage(STORAGE_KEYS.CART, []);
    set({ items: [] });
  },
  subtotal: () => {
    return get().items.reduce((sum, item) => {
      const addonSum = item.selectedAddons.reduce((a, b) => a + b.price, 0);
      return sum + (item.price + addonSum) * item.quantity;
    }, 0);
  },
  tax: () => {
    return Number((get().subtotal() * 0.13).toFixed(2));
  },
  total: () => {
    return Number((get().subtotal() + get().tax()).toFixed(2));
  },
}));

// MENU STORE
interface MenuStore {
  items: MenuItem[];
  loading: boolean;
  selectedCategory: MenuCategory | 'All';
  searchQuery: string;
  loadMenu: () => Promise<void>;
  setSelectedCategory: (cat: MenuCategory | 'All') => void;
  setSearchQuery: (query: string) => void;
  saveItem: (item: MenuItem) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  toggleAvailability: (id: string) => Promise<void>;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  items: [],
  loading: false,
  selectedCategory: 'All',
  searchQuery: '',
  loadMenu: async () => {
    set({ loading: true });
    const items = await menuService.getAll();
    set({ items, loading: false });
  },
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  saveItem: async (item) => {
    await menuService.save(item);
    await get().loadMenu();
  },
  deleteItem: async (id) => {
    await menuService.delete(id);
    await get().loadMenu();
  },
  toggleAvailability: async (id) => {
    await menuService.toggleAvailability(id);
    await get().loadMenu();
  },
}));

// ORDER STORE
interface OrderStore {
  orders: Order[];
  loading: boolean;
  loadOrders: () => Promise<void>;
  createOrder: (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  loading: false,
  loadOrders: async () => {
    set({ loading: true });
    const orders = await orderService.getAll();
    set({ orders, loading: false });
  },
  createOrder: async (data) => {
    const newOrder = await orderService.create(data);
    await get().loadOrders();
    return newOrder;
  },
  updateOrderStatus: async (id, status) => {
    await orderService.updateStatus(id, status);
    await get().loadOrders();
  },
}));

// RESERVATION STORE
interface ReservationStore {
  reservations: Reservation[];
  loading: boolean;
  loadReservations: () => Promise<void>;
  createReservation: (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Promise<Reservation>;
  updateStatus: (id: string, status: Reservation['status']) => Promise<void>;
}

export const useReservationStore = create<ReservationStore>((set, get) => ({
  reservations: [],
  loading: false,
  loadReservations: async () => {
    set({ loading: true });
    const res = await reservationService.getAll();
    set({ reservations: res, loading: false });
  },
  createReservation: async (data) => {
    const created = await reservationService.create(data);
    await get().loadReservations();
    return created;
  },
  updateStatus: async (id, status) => {
    await reservationService.updateStatus(id, status);
    await get().loadReservations();
  },
}));

// AUTH STORE
interface AuthUser {
  email: string;
  name: string;
  role: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: getFromStorage<boolean>(STORAGE_KEYS.AUTH, false),
  user: getFromStorage<AuthUser | null>('mez_auth_user', null),
  login: (email: string, pass: string) => {
    if (email === 'demo@zahriontech.com' && pass === 'demo123') {
      const user = { email, name: 'ZahrionTech Staff', role: 'General Manager' };
      saveToStorage(STORAGE_KEYS.AUTH, true);
      saveToStorage('mez_auth_user', user);
      set({ isAuthenticated: true, user });
      return true;
    }
    return false;
  },
  logout: () => {
    removeFromStorage(STORAGE_KEYS.AUTH);
    removeFromStorage('mez_auth_user');
    set({ isAuthenticated: false, user: null });
  },
}));

// GALLERY STORE
interface GalleryStore {
  items: GalleryItem[];
  isReelMode: boolean;
  setReelMode: (reel: boolean) => void;
  loadGallery: () => Promise<void>;
  saveItem: (item: GalleryItem) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  items: [],
  isReelMode: false,
  setReelMode: (reel) => set({ isReelMode: reel }),
  loadGallery: async () => {
    const items = await galleryService.getAll();
    set({ items });
  },
  saveItem: async (item) => {
    await galleryService.save(item);
    await get().loadGallery();
  },
  deleteItem: async (id) => {
    await galleryService.delete(id);
    await get().loadGallery();
  },
}));

// EVENTS STORE
interface EventStore {
  events: EventItem[];
  loadEvents: () => Promise<void>;
  saveEvent: (event: EventItem) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  loadEvents: async () => {
    const events = await eventService.getAll();
    set({ events });
  },
  saveEvent: async (event) => {
    await eventService.save(event);
    await get().loadEvents();
  },
  deleteEvent: async (id) => {
    await eventService.delete(id);
    await get().loadEvents();
  },
}));

// PROMOTIONS STORE
interface PromotionStore {
  promotions: Promotion[];
  loadPromotions: () => Promise<void>;
  savePromotion: (promo: Promotion) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
}

export const usePromotionStore = create<PromotionStore>((set, get) => ({
  promotions: [],
  loadPromotions: async () => {
    const promotions = await promotionService.getAll();
    set({ promotions });
  },
  savePromotion: async (promo) => {
    await promotionService.save(promo);
    await get().loadPromotions();
  },
  deletePromotion: async (id) => {
    await promotionService.delete(id);
    await get().loadPromotions();
  },
}));

// REWARDS STORE
interface RewardsStore {
  rewards: RewardItem[];
  customerPoints: number;
  loadRewards: () => Promise<void>;
  saveReward: (reward: RewardItem) => Promise<void>;
  deleteReward: (id: string) => Promise<void>;
}

export const useRewardsStore = create<RewardsStore>((set, get) => ({
  rewards: [],
  customerPoints: 1240, // demo customer Doug J. points
  loadRewards: async () => {
    const rewards = await rewardService.getAll();
    set({ rewards });
  },
  saveReward: async (reward) => {
    await rewardService.save(reward);
    await get().loadRewards();
  },
  deleteReward: async (id) => {
    await rewardService.delete(id);
    await get().loadRewards();
  },
}));

// CUSTOMERS STORE
interface CustomerStore {
  customers: Customer[];
  loadCustomers: () => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  loadCustomers: async () => {
    const customers = await customerService.getAll();
    set({ customers });
  },
}));

// SETTINGS STORE
interface SettingsStore {
  settings: RestaurantSettings;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: RestaurantSettings) => Promise<void>;
  resetAllDemoData: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    name: 'The Mez Bar & Grill',
    address: '#9 – 1267 Garrison Road',
    city: 'Fort Erie, Ontario',
    postalCode: 'L2A 1P2',
    phone: '289-320-9866',
    email: 'info@themez.ca',
    hours: 'Daily, 12:00 PM – 10:00 PM',
    isOpen: true,
    orderAccepting: true,
    reservationsOpen: true,
    taxRate: 0.13,
  },
  loadSettings: async () => {
    const s = await settingsService.get();
    set({ settings: s });
  },
  updateSettings: async (newSettings) => {
    const updated = await settingsService.update(newSettings);
    set({ settings: updated });
  },
  resetAllDemoData: async () => {
    await settingsService.resetAll();
  }
}));
