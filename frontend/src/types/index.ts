export type TeaCategory = 'Black Tea' | 'Green Tea' | 'Herbal Tea' | 'White Tea' | 'Oolong Tea' | 'Wellness Blend';

export type TeaCollection = 'Signature' | 'Single Origin' | 'Wellness' | 'Royal Reserve';

export type TeaFormat = 'Loose Leaf' | 'Tea Bags';
export type SweetenerOption = 'Unsweetened' | 'Natural Stevia';

export interface BrewingGuide {
  waterTemp: string;
  steepTime: string;
  timerSeconds: number;
  servingSize: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: TeaCategory;
  collection: TeaCollection;
  price: number; // Base price (50g loose leaf or 25 tea bags)
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  origin: string;
  elevation: string;
  flush: string;
  ingredients: string[];
  tasteNotes: string[];
  aroma: string;
  caffeine: 'None' | 'Low' | 'Medium' | 'High';
  benefits: string[];
  brewingGuide: BrewingGuide;
  inStock: boolean;
  stockQuantity: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CustomizerOptions {
  format: TeaFormat;
  sweetener: SweetenerOption;
  packageSize: string; // '50g' | '100g' | '250g' | '500g' | '25 Tea Bags' | '50 Tea Bags' | '100 Tea Bags'
  customEngraving?: string;
  giftNote?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  customizer: CustomizerOptions;
  unitPrice: number;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verified: boolean;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: Address[];
}

export interface Order {
  id: string;
  createdAt: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  status: 'Processing' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentId: string;
  trackingNumber?: string;
  courierPartner?: string;
  estimatedDelivery: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  active: boolean;
}
