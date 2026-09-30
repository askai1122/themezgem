import { MenuItem, Order, Reservation, EventItem, Promotion, Customer, GalleryItem, RewardItem, RestaurantSettings } from '../types';
import { STORAGE_KEYS, getFromStorage, saveToStorage } from '../lib/storage';
import {
  INITIAL_MENU,
  INITIAL_EVENTS,
  INITIAL_PROMOTIONS,
  INITIAL_CUSTOMERS,
  INITIAL_GALLERY,
  INITIAL_REWARDS,
  INITIAL_SETTINGS,
} from '../data/seedData';

const delay = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));

// MENU SERVICE
export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    await delay();
    return getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU);
  },
  async getById(id: string): Promise<MenuItem | undefined> {
    await delay();
    const list = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU);
    return list.find((item) => item.id === id);
  },
  async save(item: MenuItem): Promise<MenuItem> {
    await delay();
    const list = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU);
    const index = list.findIndex((i) => i.id === item.id);
    let updated: MenuItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = item;
    } else {
      updated = [item, ...list];
    }
    saveToStorage(STORAGE_KEYS.MENU, updated);
    return item;
  },
  async delete(id: string): Promise<boolean> {
    await delay();
    const list = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU);
    const updated = list.filter((i) => i.id !== id);
    saveToStorage(STORAGE_KEYS.MENU, updated);
    return true;
  },
  async toggleAvailability(id: string): Promise<MenuItem | undefined> {
    await delay();
    const list = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU);
    const index = list.findIndex((i) => i.id === id);
    if (index >= 0) {
      list[index] = { ...list[index], available: !list[index].available };
      saveToStorage(STORAGE_KEYS.MENU, list);
      return list[index];
    }
    return undefined;
  },
};

// ORDER SERVICE
export const orderService = {
  async getAll(): Promise<Order[]> {
    await delay();
    return getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, [
      {
        id: 'MEZ-4820',
        customerName: 'Doug J.',
        customerEmail: 'doug.j@example.com',
        customerPhone: '289-555-0182',
        pickupTime: '6:30 PM',
        specialInstructions: 'Extra napkins please.',
        items: [
          {
            id: 'cart-1',
            menuItemId: 'burg-3',
            name: 'Bacon Cheese Mez',
            price: 14.99,
            quantity: 2,
            selectedAddons: [{ name: 'Extra Cheese', price: 1.50 }],
            image: '/images/food/bacon-cheese-mez.jpg'
          },
          {
            id: 'cart-2',
            menuItemId: 'app-8',
            name: 'Wings',
            variantLabel: '1 LB',
            price: 17.99,
            quantity: 1,
            selectedAddons: [],
            image: '/images/food/wings.jpg'
          }
        ],
        subtotal: 49.47,
        tax: 6.43,
        total: 55.90,
        status: 'CONFIRMED',
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'MEZ-4819',
        customerName: 'Tabath C.',
        customerEmail: 'tabath.c@example.com',
        customerPhone: '289-555-0199',
        pickupTime: '7:00 PM',
        items: [
          {
            id: 'cart-3',
            menuItemId: 'hand-3',
            name: 'Erie Cheesesteak',
            price: 16.95,
            quantity: 1,
            selectedAddons: [],
            image: '/images/food/erie-cheesesteak.jpg'
          },
          {
            id: 'cart-4',
            menuItemId: 'des-1',
            name: 'Cheesecake (The Cheesecake Factory)',
            variantLabel: 'Dulce de Leche',
            price: 9.99,
            quantity: 1,
            selectedAddons: [],
            image: '/images/food/cheesecake.jpg'
          }
        ],
        subtotal: 26.94,
        tax: 3.50,
        total: 30.44,
        status: 'CONFIRMED',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]);
  },
  async getById(id: string): Promise<Order | undefined> {
    await delay();
    const orders = await this.getAll();
    return orders.find((o) => o.id === id);
  },
  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    await delay();
    const orders = await this.getAll();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...order,
      id: `MEZ-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    saveToStorage(STORAGE_KEYS.ORDERS, updated);
    return newOrder;
  },
  async updateStatus(id: string, status: Order['status']): Promise<Order | undefined> {
    await delay();
    const orders = await this.getAll();
    const index = orders.findIndex((o) => o.id === id);
    if (index >= 0) {
      orders[index] = {
        ...orders[index],
        status,
        updatedAt: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.ORDERS, orders);
      return orders[index];
    }
    return undefined;
  },
};

// RESERVATION SERVICE
export const reservationService = {
  async getAll(): Promise<Reservation[]> {
    await delay();
    return getFromStorage<Reservation[]>(STORAGE_KEYS.RESERVATIONS, [
      {
        id: 'MEZ-RES-1042',
        name: 'Doug J.',
        email: 'doug.j@example.com',
        phone: '289-555-0182',
        date: new Date().toISOString().split('T')[0],
        time: '6:30 PM',
        guests: 4,
        specialRequest: 'Booth seating preferred near the window.',
        status: 'CONFIRMED',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'MEZ-RES-1041',
        name: 'Kim F. L.',
        email: 'kim.fl@example.com',
        phone: '289-555-0144',
        date: new Date().toISOString().split('T')[0],
        time: '7:30 PM',
        guests: 2,
        specialRequest: 'Steak dinner celebration.',
        status: 'CONFIRMED',
        createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      }
    ]);
  },
  async create(reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Promise<Reservation> {
    await delay();
    const list = await this.getAll();
    const newRes: Reservation = {
      ...reservation,
      id: `MEZ-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };
    saveToStorage(STORAGE_KEYS.RESERVATIONS, [newRes, ...list]);
    return newRes;
  },
  async updateStatus(id: string, status: Reservation['status']): Promise<Reservation | undefined> {
    await delay();
    const list = await this.getAll();
    const index = list.findIndex((r) => r.id === id);
    if (index >= 0) {
      list[index] = { ...list[index], status };
      saveToStorage(STORAGE_KEYS.RESERVATIONS, list);
      return list[index];
    }
    return undefined;
  },
};

// EVENT SERVICE
export const eventService = {
  async getAll(): Promise<EventItem[]> {
    await delay();
    return getFromStorage<EventItem[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },
  async save(event: EventItem): Promise<EventItem> {
    await delay();
    const list = await this.getAll();
    const index = list.findIndex((e) => e.id === event.id);
    let updated: EventItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = event;
    } else {
      updated = [event, ...list];
    }
    saveToStorage(STORAGE_KEYS.EVENTS, updated);
    return event;
  },
  async delete(id: string): Promise<boolean> {
    await delay();
    const list = await this.getAll();
    saveToStorage(STORAGE_KEYS.EVENTS, list.filter((e) => e.id !== id));
    return true;
  }
};

// PROMOTION SERVICE
export const promotionService = {
  async getAll(): Promise<Promotion[]> {
    await delay();
    return getFromStorage<Promotion[]>(STORAGE_KEYS.PROMOTIONS, INITIAL_PROMOTIONS);
  },
  async save(promo: Promotion): Promise<Promotion> {
    await delay();
    const list = await this.getAll();
    const index = list.findIndex((p) => p.id === promo.id);
    let updated: Promotion[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = promo;
    } else {
      updated = [promo, ...list];
    }
    saveToStorage(STORAGE_KEYS.PROMOTIONS, updated);
    return promo;
  },
  async delete(id: string): Promise<boolean> {
    await delay();
    const list = await this.getAll();
    saveToStorage(STORAGE_KEYS.PROMOTIONS, list.filter((p) => p.id !== id));
    return true;
  }
};

// CUSTOMER SERVICE
export const customerService = {
  async getAll(): Promise<Customer[]> {
    await delay();
    return getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  },
};

// REWARDS SERVICE
export const rewardService = {
  async getAll(): Promise<RewardItem[]> {
    await delay();
    return getFromStorage<RewardItem[]>(STORAGE_KEYS.REWARDS, INITIAL_REWARDS);
  },
  async save(reward: RewardItem): Promise<RewardItem> {
    await delay();
    const list = await this.getAll();
    const index = list.findIndex((r) => r.id === reward.id);
    let updated: RewardItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = reward;
    } else {
      updated = [reward, ...list];
    }
    saveToStorage(STORAGE_KEYS.REWARDS, updated);
    return reward;
  },
  async delete(id: string): Promise<boolean> {
    await delay();
    const list = await this.getAll();
    saveToStorage(STORAGE_KEYS.REWARDS, list.filter((r) => r.id !== id));
    return true;
  }
};

// GALLERY SERVICE
export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    await delay();
    return getFromStorage<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  },
  async save(item: GalleryItem): Promise<GalleryItem> {
    await delay();
    const list = await this.getAll();
    const index = list.findIndex((g) => g.id === item.id);
    let updated: GalleryItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = item;
    } else {
      updated = [item, ...list];
    }
    saveToStorage(STORAGE_KEYS.GALLERY, updated);
    return item;
  },
  async delete(id: string): Promise<boolean> {
    await delay();
    const list = await this.getAll();
    saveToStorage(STORAGE_KEYS.GALLERY, list.filter((g) => g.id !== id));
    return true;
  }
};

// SETTINGS SERVICE
export const settingsService = {
  async get(): Promise<RestaurantSettings> {
    await delay();
    return getFromStorage<RestaurantSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },
  async update(settings: RestaurantSettings): Promise<RestaurantSettings> {
    await delay();
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },
  async resetAll(): Promise<void> {
    await delay();
    saveToStorage(STORAGE_KEYS.MENU, INITIAL_MENU);
    saveToStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    saveToStorage(STORAGE_KEYS.PROMOTIONS, INITIAL_PROMOTIONS);
    saveToStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    saveToStorage(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
    saveToStorage(STORAGE_KEYS.REWARDS, INITIAL_REWARDS);
    saveToStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    saveToStorage(STORAGE_KEYS.ORDERS, []);
    saveToStorage(STORAGE_KEYS.RESERVATIONS, []);
  }
};
