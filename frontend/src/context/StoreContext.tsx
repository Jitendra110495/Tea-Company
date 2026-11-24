import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, User, Order, Coupon, CustomizerOptions } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_COUPONS, MOCK_USER } from '../data/mockData';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  
  // UI Modals & State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAiAdvisorOpen: boolean;
  setIsAiAdvisorOpen: (open: boolean) => void;
  isBrewingTimerOpen: boolean;
  setIsBrewingTimerOpen: (open: boolean) => void;
  selectedTimerProduct: Product | null;
  setSelectedTimerProduct: (product: Product | null) => void;
  
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  customizerProduct: Product | null;
  openCustomizer: (product: Product) => void;
  
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (open: boolean) => void;
  detailProduct: Product | null;
  openDetailModal: (product: Product) => void;
  
  activeView: 'shop' | 'dashboard' | 'admin';
  setActiveView: (view: 'shop' | 'dashboard' | 'admin') => void;
  
  // Actions
  addToCart: (product: Product, customizerOptions: CustomizerOptions, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  placeOrder: (shippingAddress: any, paymentMethod: string) => Order;
  cancelOrder: (orderId: string) => void;
  
  loginUser: (email: string, role?: 'customer' | 'admin') => void;
  logoutUser: () => void;
  
  // Admin Operations
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string, courierPartner?: string) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  saveCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (couponId: string) => void;
  
  // Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state (persisted to localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('tts_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tts_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tts_wishlist');
    return saved ? JSON.parse(saved) : ['tea-001', 'tea-003'];
  });

  // User Auth state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tts_user');
    return saved ? JSON.parse(saved) : MOCK_USER;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('tts_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Coupons state
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('tts_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals & Navigation state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isBrewingTimerOpen, setIsBrewingTimerOpen] = useState(false);
  const [selectedTimerProduct, setSelectedTimerProduct] = useState<Product | null>(null);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  
  const [activeView, setActiveView] = useState<'shop' | 'dashboard' | 'admin'>('shop');
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('tts_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tts_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tts_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tts_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tts_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('tts_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const openCustomizer = (product: Product) => {
    setCustomizerProduct(product);
    setIsCustomizerOpen(true);
  };

  const openDetailModal = (product: Product) => {
    setDetailProduct(product);
    setIsDetailModalOpen(true);
  };

  // Dynamic price calculator multiplier based on size / format
  const calculateUnitPrice = (product: Product, options: CustomizerOptions): number => {
    let base = product.price;
    // Multipliers for package sizes
    let multiplier = 1;
    if (options.format === 'Loose Leaf') {
      if (options.packageSize === '100g') multiplier = 1.8; // 10% volume saving
      else if (options.packageSize === '250g') multiplier = 4.0; // 20% volume saving
      else if (options.packageSize === '500g') multiplier = 7.5; // 25% volume saving
    } else {
      if (options.packageSize === '50 Tea Bags') multiplier = 1.85;
      else if (options.packageSize === '100 Tea Bags') multiplier = 3.4;
    }
    
    // Add custom gift tin engraving extra fee
    let extra = 0;
    if (options.customEngraving && options.customEngraving.trim().length > 0) {
      extra += 150;
    }
    
    return Math.round(base * multiplier + extra);
  };

  const addToCart = (product: Product, customizerOptions: CustomizerOptions, quantity = 1) => {
    const unitPrice = calculateUnitPrice(product, customizerOptions);
    const cartItemId = `${product.id}-${customizerOptions.format}-${customizerOptions.packageSize}-${customizerOptions.sweetener}-${customizerOptions.customEngraving || ''}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          customizer: customizerOptions,
          unitPrice,
          quantity
        }
      ];
    });

    showToast(`Added ${quantity}x ${product.name} (${customizerOptions.packageSize}) to your cart.`);
    setIsCustomizerOpen(false);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleaned && c.active);
    if (!found) {
      showToast('Invalid or expired promotional code.', 'warning');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Promo code "${found.code}" applied!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promotional code removed', 'info');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = (shippingAddress: any, paymentMethod: string): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = appliedCoupon.value;
      }
    }

    const shippingCost = subtotal > 1500 ? 0 : 99;
    const tax = Math.round((subtotal - discount) * 0.05); // 5% tax
    const totalAmount = Math.max(0, subtotal - discount + shippingCost + tax);

    const newOrder: Order = {
      id: `TS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      userId: user?.id || 'guest-001',
      customerName: shippingAddress.name || user?.name || 'Valued Tea Aficionado',
      customerEmail: user?.email || 'customer@theteastory.in',
      items: [...cart],
      subtotal,
      discount,
      tax,
      shippingCost,
      totalAmount,
      status: 'Processing',
      shippingAddress,
      paymentMethod,
      paymentId: `pay_${Math.random().toString(36).substring(2, 12)}`,
      trackingNumber: `SRK-${Math.floor(100000 + Math.random() * 900000)}-IN`,
      courierPartner: 'Shiprocket Luxury Express',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' as const } : o))
    );
    showToast(`Order ${orderId} has been cancelled.`, 'info');
  };

  const loginUser = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: User = {
      id: role === 'admin' ? 'adm-001' : 'usr-001',
      name: role === 'admin' ? 'Master Sommelier (Admin)' : 'Priya Sharma',
      email,
      role,
      phone: '+91 98765 43210',
      addresses: MOCK_USER.addresses
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    setActiveView('shop');
    showToast('Signed out successfully.', 'info');
  };

  // Admin Actions
  const updateOrderStatus = (
    orderId: string,
    status: Order['status'],
    trackingNumber?: string,
    courierPartner?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              ...(trackingNumber ? { trackingNumber } : {}),
              ...(courierPartner ? { courierPartner } : {})
            }
          : o
      )
    );
    showToast(`Order ${orderId} status updated to ${status}.`, 'success');
  };

  const saveProduct = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [product, ...prev];
    });
    showToast(`Product "${product.name}" saved!`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog.', 'info');
  };

  const saveCoupon = (coupon: Coupon) => {
    setCoupons((prev) => {
      const exists = prev.some((c) => c.id === coupon.id);
      if (exists) return prev.map((c) => (c.id === coupon.id ? coupon : c));
      return [coupon, ...prev];
    });
    showToast(`Coupon ${coupon.code} updated.`, 'success');
  };

  const toggleCouponActive = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        wishlist,
        user,
        orders,
        coupons,
        appliedCoupon,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAiAdvisorOpen,
        setIsAiAdvisorOpen,
        isBrewingTimerOpen,
        setIsBrewingTimerOpen,
        selectedTimerProduct,
        setSelectedTimerProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        customizerProduct,
        openCustomizer,
        isDetailModalOpen,
        setIsDetailModalOpen,
        detailProduct,
        openDetailModal,
        activeView,
        setActiveView,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        cancelOrder,
        loginUser,
        logoutUser,
        updateOrderStatus,
        saveProduct,
        deleteProduct,
        saveCoupon,
        toggleCouponActive,
        toasts,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
