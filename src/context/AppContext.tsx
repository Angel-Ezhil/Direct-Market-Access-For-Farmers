import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language, Translations, translations } from '../utils/translations';
import {
  UserRole,
  FarmerProfile,
  CustomerProfile,
  DeliveryPartnerProfile,
  AdminProfile,
  Product,
  CartItem,
  Order,
  OrderStatus,
  Complaint,
  NotificationItem,
  MandiPriceItem,
  SchemeItem
} from '../types';
import {
  SEED_FARMERS,
  SEED_CUSTOMERS,
  SEED_DELIVERY_PARTNERS,
  SEED_ADMIN,
  SEED_PRODUCTS,
  SEED_ORDERS,
  SEED_COMPLAINTS,
  SEED_NOTIFICATIONS,
  SEED_MANDI_PRICES,
  SEED_SCHEMES
} from '../data/seedData';

interface AppContextType {
  // Navigation & Auth
  currentRole: UserRole | null;
  authScreen: 'role-select' | 'farmer-login' | 'farmer-register' | 'customer-login' | 'customer-register' | 'delivery-login' | 'delivery-register' | 'admin-login' | 'app';
  activeFarmerTab: string;
  activeCustomerTab: string;
  activeDeliveryTab: string;
  activeAdminTab: string;
  currentUser: FarmerProfile | CustomerProfile | DeliveryPartnerProfile | AdminProfile | null;

  // Navigation Setters
  setAuthScreen: (screen: 'role-select' | 'farmer-login' | 'farmer-register' | 'customer-login' | 'customer-register' | 'delivery-login' | 'delivery-register' | 'admin-login' | 'app') => void;
  setActiveFarmerTab: (tab: string) => void;
  setActiveCustomerTab: (tab: string) => void;
  setActiveDeliveryTab: (tab: string) => void;
  setActiveAdminTab: (tab: string) => void;

  // Actions
  selectRoleForAuth: (role: UserRole, mode: 'login' | 'register') => void;
  login: (role: UserRole, emailOrPhone: string) => boolean;
  quickDemoLogin: (role: UserRole) => void;
  logout: () => void;
  registerFarmer: (data: Omit<FarmerProfile, 'id' | 'rating' | 'totalSales' | 'status' | 'joinedDate'>) => void;
  registerCustomer: (data: Omit<CustomerProfile, 'id' | 'ordersCount' | 'status' | 'joinedDate'>) => void;
  registerDelivery: (data: Omit<DeliveryPartnerProfile, 'id' | 'rating' | 'todayEarnings' | 'completedDeliveries' | 'totalDistanceKm' | 'status' | 'joinedDate'>) => void;

  // Data Collections
  farmers: FarmerProfile[];
  customers: CustomerProfile[];
  deliveryPartners: DeliveryPartnerProfile[];
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  complaints: Complaint[];
  notifications: NotificationItem[];
  mandiPrices: MandiPriceItem[];
  schemes: SchemeItem[];

  // Product Actions
  addProduct: (product: Omit<Product, 'id' | 'farmerId' | 'farmerName' | 'rating' | 'reviewsCount' | 'status' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart Actions
  addToCart: (product: Product, quantity: number) => { success: boolean; message: string };
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Order & Delivery Workflow Actions
  placeOrder: (deliveryAddress: string, paymentMethod: 'UPI' | 'Cash on Delivery' | 'Card') => Order | null;
  confirmOrderByFarmer: (orderId: string) => void;
  assignDeliveryPartner: (orderId: string, partnerId: string) => void;
  acceptDeliveryAsPartner: (orderId: string) => void;
  updateDeliveryProgress: (orderId: string, status: OrderStatus) => void;
  verifyAndDeliverWithOtp: (orderId: string, otp: string) => { success: boolean; message: string };
  submitOrderReview: (orderId: string, rating: number, comment: string) => void;

  // Complaints & Users Management
  submitComplaint: (orderId: string, type: Complaint['type'], description: string) => void;
  updateComplaintStatus: (id: string, status: Complaint['status'], response?: string) => void;
  updateUserStatus: (role: UserRole, id: string, status: 'active' | 'suspended' | 'pending') => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadCount: number;

  // Language & Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;

  // System Reset
  resetToDemoDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'agri_market_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Localization State
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}lang`);
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}lang`, lang);
  };

  const t = translations[language] || translations.en;

  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [authScreen, setAuthScreen] = useState<AppContextType['authScreen']>('role-select');
  const [activeFarmerTab, setActiveFarmerTab] = useState<string>('dashboard');
  const [activeCustomerTab, setActiveCustomerTab] = useState<string>('home');
  const [activeDeliveryTab, setActiveDeliveryTab] = useState<string>('dashboard');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');

  // Persistence Initializers
  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}farmers`);
    return saved ? JSON.parse(saved) : SEED_FARMERS;
  });

  const [customers, setCustomers] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}customers`);
    return saved ? JSON.parse(saved) : SEED_CUSTOMERS;
  });

  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartnerProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}delivery`);
    return saved ? JSON.parse(saved) : SEED_DELIVERY_PARTNERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}products`);
    return saved ? JSON.parse(saved) : SEED_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}orders`);
    return saved ? JSON.parse(saved) : SEED_ORDERS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}complaints`);
    return saved ? JSON.parse(saved) : SEED_COMPLAINTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}cart`);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<AppContextType['currentUser']>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}farmers`, JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}customers`, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}delivery`, JSON.stringify(deliveryPartners));
  }, [deliveryPartners]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}orders`, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}complaints`, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}cart`, JSON.stringify(cart));
  }, [cart]);

  // Push notifications helper
  const addNotification = (
    title: string,
    message: string,
    targetRole: UserRole | 'all',
    targetUserId?: string,
    orderId?: string
  ) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      targetRole,
      targetUserId,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      orderId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Role Selection & Navigation
  const selectRoleForAuth = (role: UserRole, mode: 'login' | 'register') => {
    if (role === 'admin') {
      setAuthScreen('admin-login');
      return;
    }
    const screenName = `${role}-${mode}` as AppContextType['authScreen'];
    setAuthScreen(screenName);
  };

  const login = (role: UserRole, emailOrPhone: string): boolean => {
    const cleanInput = emailOrPhone.trim().toLowerCase();
    
    if (role === 'farmer') {
      const match = farmers.find(f => f.email.toLowerCase() === cleanInput || f.phone.includes(cleanInput)) || farmers[0];
      if (match) {
        setCurrentUser(match);
        setCurrentRole('farmer');
        setAuthScreen('app');
        setActiveFarmerTab('dashboard');
        return true;
      }
    } else if (role === 'customer') {
      const match = customers.find(c => c.email.toLowerCase() === cleanInput || c.phone.includes(cleanInput)) || customers[0];
      if (match) {
        setCurrentUser(match);
        setCurrentRole('customer');
        setAuthScreen('app');
        setActiveCustomerTab('home');
        return true;
      }
    } else if (role === 'delivery') {
      const match = deliveryPartners.find(d => d.email.toLowerCase() === cleanInput || d.phone.includes(cleanInput)) || deliveryPartners[0];
      if (match) {
        setCurrentUser(match);
        setCurrentRole('delivery');
        setAuthScreen('app');
        setActiveDeliveryTab('dashboard');
        return true;
      }
    } else if (role === 'admin') {
      setCurrentUser(SEED_ADMIN);
      setCurrentRole('admin');
      setAuthScreen('app');
      setActiveAdminTab('overview');
      return true;
    }
    return false;
  };

  // Instant 1-Click Demo Login for hackathons
  const quickDemoLogin = (role: UserRole) => {
    if (role === 'farmer') {
      const demoFarmer = farmers[0] || SEED_FARMERS[0];
      setCurrentUser(demoFarmer);
      setCurrentRole('farmer');
      setAuthScreen('app');
      setActiveFarmerTab('dashboard');
    } else if (role === 'customer') {
      const demoCustomer = customers[0] || SEED_CUSTOMERS[0];
      setCurrentUser(demoCustomer);
      setCurrentRole('customer');
      setAuthScreen('app');
      setActiveCustomerTab('home');
    } else if (role === 'delivery') {
      const demoDelivery = deliveryPartners[0] || SEED_DELIVERY_PARTNERS[0];
      setCurrentUser(demoDelivery);
      setCurrentRole('delivery');
      setAuthScreen('app');
      setActiveDeliveryTab('dashboard');
    } else if (role === 'admin') {
      setCurrentUser(SEED_ADMIN);
      setCurrentRole('admin');
      setAuthScreen('app');
      setActiveAdminTab('overview');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    setAuthScreen('role-select');
  };

  // Registrations
  const registerFarmer = (data: Omit<FarmerProfile, 'id' | 'rating' | 'totalSales' | 'status' | 'joinedDate'>) => {
    const newFarmer: FarmerProfile = {
      ...data,
      id: `farmer-${Date.now()}`,
      rating: 5.0,
      totalSales: 0,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setFarmers(prev => [newFarmer, ...prev]);
    setCurrentUser(newFarmer);
    setCurrentRole('farmer');
    setAuthScreen('app');
    setActiveFarmerTab('dashboard');
    addNotification('New Farmer Registration', `${newFarmer.name} joined from ${newFarmer.district}`, 'admin');
  };

  const registerCustomer = (data: Omit<CustomerProfile, 'id' | 'ordersCount' | 'status' | 'joinedDate'>) => {
    const newCustomer: CustomerProfile = {
      ...data,
      id: `cust-${Date.now()}`,
      status: 'active',
      ordersCount: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setCurrentUser(newCustomer);
    setCurrentRole('customer');
    setAuthScreen('app');
    setActiveCustomerTab('home');
    addNotification('New Customer Registration', `${newCustomer.name} joined from ${newCustomer.district}`, 'admin');
  };

  const registerDelivery = (data: Omit<DeliveryPartnerProfile, 'id' | 'rating' | 'todayEarnings' | 'completedDeliveries' | 'totalDistanceKm' | 'status' | 'joinedDate'>) => {
    const newDelivery: DeliveryPartnerProfile = {
      ...data,
      id: `del-${Date.now()}`,
      status: 'available',
      rating: 5.0,
      todayEarnings: 0,
      completedDeliveries: 0,
      totalDistanceKm: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setDeliveryPartners(prev => [newDelivery, ...prev]);
    setCurrentUser(newDelivery);
    setCurrentRole('delivery');
    setAuthScreen('app');
    setActiveDeliveryTab('dashboard');
    addNotification('New Delivery Partner', `${newDelivery.name} joined with ${newDelivery.vehicleType}`, 'admin');
  };

  // Products
  const addProduct = (productData: Omit<Product, 'id' | 'farmerId' | 'farmerName' | 'rating' | 'reviewsCount' | 'status' | 'createdAt'>) => {
    const farmer = (currentUser as FarmerProfile) || farmers[0];
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      farmerId: farmer.id,
      farmerName: farmer.name,
      rating: 5.0,
      reviewsCount: 0,
      status: 'approved',
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    addNotification(
      'New Produce Available!',
      `${farmer.name} just listed ${newProduct.quantity} ${newProduct.unit} of fresh ${newProduct.name} at ₹${newProduct.price}/${newProduct.unit}`,
      'customer'
    );
    addNotification(
      'Product Published',
      `"${newProduct.name}" is now live in the marketplace with ${newProduct.quantity} ${newProduct.unit} available.`,
      'farmer',
      farmer.id
    );
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart
  const addToCart = (product: Product, quantity: number): { success: boolean; message: string } => {
    const existing = cart.find(item => item.product.id === product.id);
    const existingQty = existing ? existing.quantity : 0;
    const requestedTotal = existingQty + quantity;

    if (requestedTotal > product.quantity) {
      return {
        success: false,
        message: `Only ${product.quantity} ${product.unit} available in stock!`
      };
    }

    if (existing) {
      setCart(prev =>
        prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: requestedTotal }
            : item
        )
      );
    } else {
      setCart(prev => [...prev, { product, quantity }]);
    }
    return { success: true, message: `Added ${quantity} ${product.unit} to cart!` };
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find(p => p.id === productId);
    if (product && quantity > product.quantity) {
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Place Order Flow
  const placeOrder = (
    deliveryAddress: string,
    paymentMethod: 'UPI' | 'Cash on Delivery' | 'Card'
  ): Order | null => {
    if (cart.length === 0) return null;

    const customer = (currentUser as CustomerProfile) || customers[0];
    const firstItem = cart[0];
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryFee = 40;
    const totalAmount = subtotal + deliveryFee;
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    // Decrement stock in real-time
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const cartItem = cart.find(c => c.product.id === p.id);
        if (cartItem) {
          const updatedQty = Math.max(0, p.quantity - cartItem.quantity);
          return { ...p, quantity: updatedQty };
        }
        return p;
      });
    });

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryAddress,
      district: customer.district,
      farmerId: firstItem.product.farmerId,
      farmerName: firstItem.product.farmerName,
      farmerPhone: '+91 98220 12345',
      farmLocation: firstItem.product.farmLocation || 'Farm Site 1',
      productId: firstItem.product.id,
      productName: cart.length > 1 ? `${firstItem.product.name} + ${cart.length - 1} more` : firstItem.product.name,
      productImage: firstItem.product.image,
      quantity: firstItem.quantity,
      unit: firstItem.product.unit,
      unitPrice: firstItem.product.price,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      status: 'ORDER_PLACED',
      otp: randomOtp,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDeliveryTime: 'Today, within 2-3 hours'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if unavailable
    }

    // Role notifications
    addNotification(
      'New Order Received! 🛒',
      `Order #${newOrder.id} for ${newOrder.quantity} ${newOrder.unit} ${newOrder.productName} by ${customer.name}. Please confirm harvest availability.`,
      'farmer',
      newOrder.farmerId,
      newOrder.id
    );

    addNotification(
      'Order Placed Successfully! 🎉',
      `Order #${newOrder.id} placed. Delivery OTP is ${newOrder.otp}. Estimated delivery: Today.`,
      'customer',
      customer.id,
      newOrder.id
    );

    addNotification(
      'New Marketplace Order',
      `Order #${newOrder.id} created (₹${newOrder.totalAmount}). Pending farmer confirmation and delivery assignment.`,
      'admin',
      undefined,
      newOrder.id
    );

    return newOrder;
  };

  // Farmer confirms order
  const confirmOrderByFarmer = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'FARMER_CONFIRMED',
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      })
    );

    const order = orders.find(o => o.id === orderId);
    if (order) {
      addNotification(
        'Farmer Confirmed Your Order 🌱',
        `${order.farmerName} has verified your harvest. Direct packaging in progress.`,
        'customer',
        order.customerId,
        orderId
      );
      addNotification(
        'Order Ready For Delivery Assignment',
        `Farmer confirmed Order #${orderId}. Ready for dispatch assignment.`,
        'admin',
        undefined,
        orderId
      );
    }
  };

  // Admin assigns delivery partner
  const assignDeliveryPartner = (orderId: string, partnerId: string) => {
    const partner = deliveryPartners.find(p => p.id === partnerId);
    if (!partner) return;

    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'DELIVERY_ASSIGNED',
            assignedDeliveryBoyId: partner.id,
            assignedDeliveryBoyName: partner.name,
            deliveryBoyPhone: partner.phone,
            vehicleInfo: `${partner.vehicleType} (${partner.vehicleNumber})`,
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      })
    );

    // Update partner status
    setDeliveryPartners(prev =>
      prev.map(p => (p.id === partnerId ? { ...p, status: 'on_delivery' } : p))
    );

    const order = orders.find(o => o.id === orderId);
    if (order) {
      addNotification(
        'New Delivery Assigned! 🚚',
        `Order #${order.id}: Pick up from ${order.farmerName} and deliver to ${order.customerName}.`,
        'delivery',
        partner.id,
        orderId
      );
      addNotification(
        'Delivery Partner Assigned 🛵',
        `${partner.name} (${partner.vehicleType}) has been assigned to your order #${orderId}.`,
        'customer',
        order.customerId,
        orderId
      );
    }
  };

  // Delivery Partner Workflow
  const acceptDeliveryAsPartner = (orderId: string) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, status: 'ACCEPTED_BY_DELIVERY', updatedAt: new Date().toISOString() }
          : o
      )
    );
  };

  const updateDeliveryProgress = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return { ...o, status, updatedAt: new Date().toISOString() };
        }
        return o;
      })
    );

    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (status === 'PRODUCT_PICKED_UP') {
      addNotification(
        'Product Picked Up from Farm 📦',
        `Delivery partner collected fresh ${order.productName} from ${order.farmerName}.`,
        'customer',
        order.customerId,
        orderId
      );
      addNotification(
        'Produce Collected by Delivery',
        `Order #${orderId} was collected and is heading to customer.`,
        'farmer',
        order.farmerId,
        orderId
      );
    } else if (status === 'OUT_FOR_DELIVERY') {
      addNotification(
        'Out for Delivery! 🚚💨',
        `Your fresh farm produce is on its way to ${order.deliveryAddress}. Keep OTP ${order.otp} ready.`,
        'customer',
        order.customerId,
        orderId
      );
    } else if (status === 'ARRIVED') {
      addNotification(
        'Delivery Partner has Arrived 📍',
        `Delivery partner is at your doorstep. Please share OTP ${order.otp} to verify.`,
        'customer',
        order.customerId,
        orderId
      );
    }
  };

  // Delivery verification with OTP
  const verifyAndDeliverWithOtp = (
    orderId: string,
    otpInput: string
  ): { success: boolean; message: string } => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    if (order.otp !== otpInput.trim()) {
      return {
        success: false,
        message: 'Invalid OTP! Please check with customer (OTP is visible in Customer Orders tab).'
      };
    }

    // Complete order
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'DELIVERED',
            paymentStatus: 'Paid',
            updatedAt: new Date().toISOString(),
            estimatedDeliveryTime: 'Delivered'
          };
        }
        return o;
      })
    );

    // Update Delivery Partner stats (+₹50 delivery payout, +1 delivery)
    if (order.assignedDeliveryBoyId) {
      setDeliveryPartners(prev =>
        prev.map(dp => {
          if (dp.id === order.assignedDeliveryBoyId) {
            return {
              ...dp,
              todayEarnings: dp.todayEarnings + 50,
              completedDeliveries: dp.completedDeliveries + 1,
              status: 'available'
            };
          }
          return dp;
        })
      );
    }

    // Update Farmer sales stats (+subtotal)
    setFarmers(prev =>
      prev.map(f => {
        if (f.id === order.farmerId) {
          return {
            ...f,
            totalSales: f.totalSales + order.subtotal
          };
        }
        return f;
      })
    );

    // Notifications across all 4 roles
    addNotification(
      'Order Delivered Successfully! 🎉',
      `Order #${orderId} was delivered. Enjoy your farm-fresh produce! Please rate your experience.`,
      'customer',
      order.customerId,
      orderId
    );

    addNotification(
      'Payout Credited: ₹' + order.subtotal,
      `Order #${orderId} delivered! Sale amount ₹${order.subtotal} has been credited to your farm balance.`,
      'farmer',
      order.farmerId,
      orderId
    );

    addNotification(
      'Delivery Completed! +₹50 Earned',
      `Order #${orderId} successfully completed. Delivery fee ₹50 added to your daily earnings.`,
      'delivery',
      order.assignedDeliveryBoyId,
      orderId
    );

    addNotification(
      'Order Completed',
      `Order #${orderId} delivered and closed successfully.`,
      'admin',
      undefined,
      orderId
    );

    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 }
      });
    } catch {
      // Ignore
    }

    return { success: true, message: 'Delivery successfully verified and marked as DELIVERED!' };
  };

  // Reviews
  const submitOrderReview = (orderId: string, rating: number, comment: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const review = {
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, review } : o))
    );

    // Update product rating
    setProducts(prev =>
      prev.map(p => {
        if (p.id === order.productId) {
          const newReviewsCount = p.reviewsCount + 1;
          const newRating = Number(((p.rating * p.reviewsCount + rating) / newReviewsCount).toFixed(1));
          return { ...p, reviewsCount: newReviewsCount, rating: newRating };
        }
        return p;
      })
    );

    addNotification(
      'New Customer Review Received ⭐',
      `Customer rated ${rating}/5 for Order #${orderId}: "${comment}"`,
      'farmer',
      order.farmerId,
      orderId
    );
  };

  // Complaints
  const submitComplaint = (orderId: string, type: Complaint['type'], description: string) => {
    const customer = (currentUser as CustomerProfile) || customers[0];
    const newComplaint: Complaint = {
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      orderId,
      customerId: customer.id,
      customerName: customer.name,
      type,
      description,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    setComplaints(prev => [newComplaint, ...prev]);
    addNotification(
      'New Complaint Registered ⚠️',
      `Complaint #${newComplaint.id} regarding Order #${orderId} (${type}). Admin review required.`,
      'admin'
    );
  };

  const updateComplaintStatus = (id: string, status: Complaint['status'], response?: string) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status, ...(response ? { adminResponse: response } : {}) }
          : c
      )
    );
  };

  const updateUserStatus = (role: UserRole, id: string, status: 'active' | 'suspended' | 'pending') => {
    if (role === 'farmer') {
      setFarmers(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    } else if (role === 'customer') {
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: status === 'pending' ? 'active' : status } : c));
    } else if (role === 'delivery') {
      const deliveryStatus = status === 'suspended' ? 'suspended' : 'available';
      setDeliveryPartners(prev => prev.map(d => d.id === id ? { ...d, status: deliveryStatus } : d));
    }
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => {
    if (!currentRole) return false;
    if (n.read) return false;
    if (n.targetRole === 'all') return true;
    if (n.targetRole === currentRole) {
      if (n.targetUserId && currentUser) {
        return n.targetUserId === currentUser.id;
      }
      return true;
    }
    return false;
  }).length;

  const resetToDemoDefaults = () => {
    localStorage.clear();
    setFarmers(SEED_FARMERS);
    setCustomers(SEED_CUSTOMERS);
    setDeliveryPartners(SEED_DELIVERY_PARTNERS);
    setProducts(SEED_PRODUCTS);
    setOrders(SEED_ORDERS);
    setComplaints(SEED_COMPLAINTS);
    setNotifications(SEED_NOTIFICATIONS);
    setCart([]);
    logout();
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        authScreen,
        activeFarmerTab,
        activeCustomerTab,
        activeDeliveryTab,
        activeAdminTab,
        currentUser,
        setAuthScreen,
        setActiveFarmerTab,
        setActiveCustomerTab,
        setActiveDeliveryTab,
        setActiveAdminTab,
        selectRoleForAuth,
        login,
        quickDemoLogin,
        logout,
        registerFarmer,
        registerCustomer,
        registerDelivery,
        farmers,
        customers,
        deliveryPartners,
        products,
        orders,
        cart,
        complaints,
        notifications,
        mandiPrices: SEED_MANDI_PRICES,
        schemes: SEED_SCHEMES,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        confirmOrderByFarmer,
        assignDeliveryPartner,
        acceptDeliveryAsPartner,
        updateDeliveryProgress,
        verifyAndDeliverWithOtp,
        submitOrderReview,
        submitComplaint,
        updateComplaintStatus,
        updateUserStatus,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
        language,
        setLanguage,
        t,
        resetToDemoDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
