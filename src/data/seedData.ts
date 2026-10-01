import {
  FarmerProfile,
  CustomerProfile,
  DeliveryPartnerProfile,
  AdminProfile,
  Product,
  Order,
  Complaint,
  NotificationItem,
  MandiPriceItem,
  SchemeItem
} from '../types';

export const SEED_FARMERS: FarmerProfile[] = [
  {
    id: 'farmer-1',
    name: 'Suresh Patel',
    farmName: 'Green Acres Agro Farm',
    district: 'Nashik',
    phone: '+91 98220 12345',
    email: 'farmer@demo.com',
    primaryCrop: 'Tomatoes & Grapes',
    farmingType: 'Organic',
    farmLocation: 'Pimpalgaon Road, Nashik, Maharashtra',
    profileImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    rating: 4.9,
    totalSales: 84500,
    joinedDate: '2024-03-15'
  },
  {
    id: 'farmer-2',
    name: 'Ramesh Patil',
    farmName: 'Sahyadri Organic Orchard',
    district: 'Ratnagiri',
    phone: '+91 98450 67890',
    email: 'ramesh.patil@agri.com',
    primaryCrop: 'Alphonso Mangoes',
    farmingType: 'Natural',
    farmLocation: 'Dapoli Valley, Ratnagiri, Maharashtra',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    rating: 4.8,
    totalSales: 132000,
    joinedDate: '2024-01-10'
  },
  {
    id: 'farmer-3',
    name: 'Harpreet Singh',
    farmName: 'Golden Grain Fields',
    district: 'Karnal',
    phone: '+91 98120 44556',
    email: 'harpreet@agri.com',
    primaryCrop: 'Basmati Rice & Wheat',
    farmingType: 'Conventional',
    farmLocation: 'Taraori belt, Karnal, Haryana',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    rating: 4.7,
    totalSales: 210000,
    joinedDate: '2023-11-20'
  }
];

export const SEED_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    name: 'Priya Sharma',
    district: 'Nashik',
    phone: '+91 98901 22334',
    email: 'customer@demo.com',
    deliveryAddress: 'Flat 402, Sai Heritage, College Road, Nashik 422005',
    status: 'active',
    ordersCount: 8,
    joinedDate: '2024-04-02'
  },
  {
    id: 'cust-2',
    name: 'Amit Verma',
    district: 'Pune',
    phone: '+91 97654 33210',
    email: 'amit.verma@example.com',
    deliveryAddress: 'B-12, Green Palms, Baner Pashan Link Rd, Pune 411045',
    status: 'active',
    ordersCount: 3,
    joinedDate: '2024-05-14'
  }
];

export const SEED_DELIVERY_PARTNERS: DeliveryPartnerProfile[] = [
  {
    id: 'del-1',
    name: 'Rahul Kumar',
    phone: '+91 99700 88776',
    email: 'delivery@demo.com',
    district: 'Nashik',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'MH 15 EZ 4590',
    drivingLicenseNumber: 'DL-MH15-202200192',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    status: 'available',
    rating: 4.9,
    todayEarnings: 680,
    completedDeliveries: 34,
    totalDistanceKm: 142.5,
    joinedDate: '2024-02-18'
  },
  {
    id: 'del-2',
    name: 'Deepak Shinde',
    phone: '+91 98233 44112',
    email: 'deepak.delivery@agri.com',
    district: 'Nashik',
    vehicleType: 'Pickup Van',
    vehicleNumber: 'MH 15 BD 8821',
    drivingLicenseNumber: 'DL-MH15-202000881',
    profilePhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    status: 'available',
    rating: 4.8,
    todayEarnings: 450,
    completedDeliveries: 28,
    totalDistanceKm: 98.0,
    joinedDate: '2024-03-01'
  }
];

export const SEED_ADMIN: AdminProfile = {
  id: 'admin-1',
  name: 'Platform Operations Admin',
  email: 'admin@demo.com',
  role: 'admin'
};

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    farmerId: 'farmer-1',
    farmerName: 'Suresh Patel',
    name: 'Vine-Ripened Country Tomatoes',
    category: 'Vegetables',
    description: 'Juicy, farm-fresh organic red tomatoes grown naturally without synthetic pesticides. Rich in Lycopene and naturally sun-ripened on our Nashik farm.',
    quantity: 100,
    initialQuantity: 100,
    unit: 'kg',
    price: 35,
    harvestDate: '2026-09-29',
    district: 'Nashik',
    farmLocation: 'Pimpalgaon Farm Sector 4',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 42,
    isOrganic: true,
    status: 'approved',
    createdAt: '2026-09-29T08:00:00.000Z'
  },
  {
    id: 'prod-2',
    farmerId: 'farmer-2',
    farmerName: 'Ramesh Patil',
    name: 'Authentic Devgad Alphonso Mangoes (GI Tag)',
    category: 'Fruits',
    description: 'Directly sourced from coastal Ratnagiri orchards. Golden hue, naturally carb-free ripening, intensely sweet aroma and fiberless pulp.',
    quantity: 60,
    initialQuantity: 60,
    unit: 'dozen',
    price: 650,
    harvestDate: '2026-09-28',
    district: 'Ratnagiri',
    farmLocation: 'Dapoli Hills Block B',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 78,
    isOrganic: true,
    status: 'approved',
    createdAt: '2026-09-28T09:30:00.000Z'
  },
  {
    id: 'prod-3',
    farmerId: 'farmer-1',
    farmerName: 'Suresh Patel',
    name: 'Crisp Green Bell Peppers (Capsicum)',
    category: 'Vegetables',
    description: 'Plump, glossy green capsicum harvested early morning. Perfect for salads, stir fry, and curries.',
    quantity: 50,
    initialQuantity: 50,
    unit: 'kg',
    price: 45,
    harvestDate: '2026-09-29',
    district: 'Nashik',
    farmLocation: 'Green Acres Polyhouse 2',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 19,
    isOrganic: true,
    status: 'approved',
    createdAt: '2026-09-29T10:15:00.000Z'
  },
  {
    id: 'prod-4',
    farmerId: 'farmer-3',
    farmerName: 'Harpreet Singh',
    name: 'Traditional 1121 Extra Long Basmati Rice',
    category: 'Grains',
    description: 'Aged 18 months in traditional jute sacks. Unpolished aromatic grain that elongates up to 2.5x upon cooking.',
    quantity: 150,
    initialQuantity: 150,
    unit: 'kg',
    price: 110,
    harvestDate: '2026-09-20',
    district: 'Karnal',
    farmLocation: 'Taraori Farm Complex',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 65,
    isOrganic: false,
    status: 'approved',
    createdAt: '2026-09-20T11:00:00.000Z'
  },
  {
    id: 'prod-5',
    farmerId: 'farmer-1',
    farmerName: 'Suresh Patel',
    name: 'Fresh Farm Spinach (Palak)',
    category: 'Leafy Vegetables',
    description: 'Tender baby spinach leaves picked at sunrise. Washed with clean well water, rich in iron and dietary fiber.',
    quantity: 80,
    initialQuantity: 80,
    unit: 'bunch',
    price: 20,
    harvestDate: '2026-09-30',
    district: 'Nashik',
    farmLocation: 'Green Acres River Bed',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewsCount: 28,
    isOrganic: true,
    status: 'approved',
    createdAt: '2026-09-30T05:30:00.000Z'
  },
  {
    id: 'prod-6',
    farmerId: 'farmer-2',
    farmerName: 'Ramesh Patil',
    name: 'Salem Pure High-Curcumin Turmeric (Haldi)',
    category: 'Spices',
    description: 'Sun-dried pure whole finger turmeric. Tested 5.2% natural curcumin content, stone ground without adulteration.',
    quantity: 40,
    initialQuantity: 40,
    unit: 'kg',
    price: 240,
    harvestDate: '2026-09-15',
    district: 'Ratnagiri',
    farmLocation: 'Sahyadri Organic Drying Yard',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 34,
    isOrganic: true,
    status: 'approved',
    createdAt: '2026-09-15T09:00:00.000Z'
  }
];

export const SEED_ORDERS: Order[] = [
  {
    id: 'ORD-7290',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98901 22334',
    deliveryAddress: 'Flat 402, Sai Heritage, College Road, Nashik 422005',
    district: 'Nashik',
    farmerId: 'farmer-1',
    farmerName: 'Suresh Patel',
    farmerPhone: '+91 98220 12345',
    farmLocation: 'Pimpalgaon Road, Nashik',
    productId: 'prod-3',
    productName: 'Crisp Green Bell Peppers (Capsicum)',
    productImage: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    quantity: 5,
    unit: 'kg',
    unitPrice: 45,
    subtotal: 225,
    deliveryFee: 40,
    totalAmount: 265,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'DELIVERED',
    assignedDeliveryBoyId: 'del-1',
    assignedDeliveryBoyName: 'Rahul Kumar',
    deliveryBoyPhone: '+91 99700 88776',
    vehicleInfo: 'Motorcycle - MH 15 EZ 4590',
    otp: '5192',
    createdAt: '2026-09-29T14:20:00.000Z',
    updatedAt: '2026-09-29T16:15:00.000Z',
    estimatedDeliveryTime: 'Delivered at 4:15 PM',
    review: {
      rating: 5,
      comment: 'Super fresh capsicum, directly from farm! Delivery was quick and respectful.',
      date: '2026-09-29'
    }
  }
];

export const SEED_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-104',
    orderId: 'ORD-6810',
    customerId: 'cust-2',
    customerName: 'Amit Verma',
    type: 'Late Delivery',
    description: 'The delivery partner arrived 45 minutes past estimated slot due to heavy rain.',
    status: 'Resolved',
    createdAt: '2026-09-26T17:00:00.000Z',
    adminResponse: 'We have compensated customer with ₹50 credit and notified delivery team regarding monsoon rerouting.'
  }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    targetRole: 'farmer',
    targetUserId: 'farmer-1',
    title: 'Platform Welcome',
    message: 'Welcome to Direct Market Access! Your KYC is verified. You can now publish fresh produce directly.',
    timestamp: '2026-09-30T06:00:00.000Z',
    read: false
  },
  {
    id: 'notif-2',
    targetRole: 'customer',
    targetUserId: 'cust-1',
    title: 'Fresh Harvest Today',
    message: 'Farmer Suresh Patel just harvested vine-ripened tomatoes in Nashik. Check the marketplace!',
    timestamp: '2026-09-30T06:10:00.000Z',
    read: false
  },
  {
    id: 'notif-3',
    targetRole: 'admin',
    title: 'System Operational',
    message: 'Real-time order synchronization active across 3 farmers and 2 delivery partners.',
    timestamp: '2026-09-30T06:15:00.000Z',
    read: false
  }
];

export const SEED_MANDI_PRICES: MandiPriceItem[] = [
  {
    id: 'mp-1',
    commodity: 'Tomato (Tamatar)',
    variety: 'Hybrid / Country Red',
    mandi: 'Pimpalgaon APMC',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: 28,
    maxPrice: 38,
    modalPrice: 34,
    unit: '₹ / kg',
    trend: 'up',
    changePercent: 6.2,
    date: '30 Sep 2026'
  },
  {
    id: 'mp-2',
    commodity: 'Onion (Pyaaz)',
    variety: 'Nashik Red',
    mandi: 'Lasalgaon APMC',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: 19,
    maxPrice: 26,
    modalPrice: 23,
    unit: '₹ / kg',
    trend: 'stable',
    changePercent: 0.5,
    date: '30 Sep 2026'
  },
  {
    id: 'mp-3',
    commodity: 'Alphonso Mango (Hapus)',
    variety: 'Devgad A-Grade',
    mandi: 'Ratnagiri APMC',
    district: 'Ratnagiri',
    state: 'Maharashtra',
    minPrice: 550,
    maxPrice: 750,
    modalPrice: 650,
    unit: '₹ / dozen',
    trend: 'up',
    changePercent: 4.8,
    date: '30 Sep 2026'
  },
  {
    id: 'mp-4',
    commodity: 'Basmati Rice',
    variety: '1121 Raw Traditional',
    mandi: 'Karnal Grain Market',
    district: 'Karnal',
    state: 'Haryana',
    minPrice: 95,
    maxPrice: 125,
    modalPrice: 110,
    unit: '₹ / kg',
    trend: 'stable',
    changePercent: 0.0,
    date: '30 Sep 2026'
  },
  {
    id: 'mp-5',
    commodity: 'Potato (Aloo)',
    variety: 'Jyoti / Kufri',
    mandi: 'Pune Gultekdi APMC',
    district: 'Pune',
    state: 'Maharashtra',
    minPrice: 16,
    maxPrice: 22,
    modalPrice: 19,
    unit: '₹ / kg',
    trend: 'down',
    changePercent: -3.2,
    date: '30 Sep 2026'
  },
  {
    id: 'mp-6',
    commodity: 'Green Chilli (Hari Mirch)',
    variety: 'Jwala Teja',
    mandi: 'Guntur APMC',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    minPrice: 42,
    maxPrice: 58,
    modalPrice: 50,
    unit: '₹ / kg',
    trend: 'up',
    changePercent: 8.5,
    date: '30 Sep 2026'
  }
];

export const SEED_SCHEMES: SchemeItem[] = [
  {
    id: 'sch-1',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    category: 'Direct Income Support',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefit: '₹6,000 per year in 3 equal installments of ₹2,000 directly credited to Aadhaar-linked bank accounts.',
    eligibility: 'All landholding farmer families with cultivable land in their names.',
    deadline: 'Open year-round',
    link: 'https://pmkisan.gov.in',
    status: 'Open'
  },
  {
    id: 'sch-2',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Crop Insurance',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefit: 'Comprehensive risk insurance from pre-sowing to post-harvest loss at nominal premium (1.5% - 2%).',
    eligibility: 'All farmers growing notified crops in notified areas including sharecroppers and tenant farmers.',
    deadline: 'Kharif: July 31 | Rabi: Dec 31',
    link: 'https://pmfby.gov.in',
    status: 'Ongoing'
  },
  {
    id: 'sch-3',
    title: 'Agriculture Infrastructure Fund (AIF)',
    category: 'Post-Harvest Infrastructure Financing',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefit: 'Interest subvention of 3% per annum up to ₹2 Crore loan for setting up cold storage, packhouses, sorting units.',
    eligibility: 'Farmers, FPOs, PACS, Agri-entrepreneurs, Startups.',
    deadline: 'Valid up to FY 2032',
    link: 'https://agriinfra.dac.gov.in',
    status: 'Open'
  },
  {
    id: 'sch-4',
    title: 'National Mission on Natural Farming (NMNF)',
    category: 'Organic & Natural Farming Subsidy',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefit: 'Financial assistance of ₹15,000 per hectare for 3 years for inputs and certification.',
    eligibility: 'Farmers willing to practice chemical-free natural farming certified through PGS-India.',
    deadline: 'Ongoing FY 2026-27',
    link: 'https://naturalfarming.dac.gov.in',
    status: 'Ongoing'
  },
  {
    id: 'sch-5',
    title: 'Soil Health Card Scheme',
    category: 'Soil Testing & Nutrient Advisory',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefit: 'Free soil test reports every 2 years indicating 12 chemical & physical parameters with custom fertilizer advice.',
    eligibility: 'All farm landholders across India.',
    deadline: 'Rolling cycles',
    link: 'https://soilhealth.dac.gov.in',
    status: 'Open'
  }
];
