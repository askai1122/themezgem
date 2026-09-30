export type MenuCategory =
  | 'Appetizers'
  | 'Mez Burger'
  | 'Hand-Held'
  | 'Plates'
  | 'Kids Menu'
  | 'Sides'
  | 'Add-ons'
  | 'Dessert'
  | 'Drinks';

export interface PriceVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  priceVariants?: PriceVariant[];
  description: string;
  image: string;
  video?: string;
  tags?: string[];
  available: boolean;
  featured: boolean;
  customizable?: boolean;
  toppings?: { name: string; price: number }[];
}

export interface CartItem {
  id: string; // unique item uuid in cart
  menuItemId: string;
  name: string;
  price: number;
  variantLabel?: string;
  selectedAddons: { name: string; price: number }[];
  specialInstructions?: string;
  quantity: number;
  image: string;
}

export type OrderStatus =
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'READY FOR PICKUP'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Order {
  id: string; // e.g. MEZ-4892
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupTime: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type ReservationStatus = 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED';

export interface Reservation {
  id: string; // e.g. MEZ-RES-1042
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Community' | 'Sports' | 'Live Events' | 'Car Meets' | 'Special Events';
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  video?: string;
  isDemo: boolean;
  status: 'Draft' | 'Published' | 'Archived';
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  startDate: string;
  endDate: string;
  active: boolean;
  isDemo: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  rewardsPoints: number;
  lastOrderDate: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Food' | 'Restaurant' | 'Drinks' | 'Events' | 'Community';
  imageUrl: string;
  videoUrl?: string;
  featured: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsRequired: number;
  description: string;
  active: boolean;
}

export interface RestaurantSettings {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  isOpen: boolean;
  orderAccepting: boolean;
  reservationsOpen: boolean;
  taxRate: number; // e.g. 0.13 for Ontario HST
}
