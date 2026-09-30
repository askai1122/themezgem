export const STORAGE_KEYS = {
  CART: 'mez_cart',
  ORDERS: 'mez_orders',
  RESERVATIONS: 'mez_reservations',
  MENU: 'mez_menu',
  EVENTS: 'mez_events',
  PROMOTIONS: 'mez_promotions',
  CUSTOMERS: 'mez_customers',
  REWARDS: 'mez_rewards',
  GALLERY: 'mez_gallery',
  AUTH: 'mez_auth',
  SETTINGS: 'mez_settings',
  INTRO_SEEN: 'mez_intro_seen',
} as const;

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving to localStorage key "${key}":`, error);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}
