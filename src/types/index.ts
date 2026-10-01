export type UserRole = 'farmer' | 'customer' | 'delivery' | 'admin';

export interface FarmerProfile {
  id: string;
  name: string;
  farmName: string;
  district: string;
  phone: string;
  email: string;
  primaryCrop: string;
  farmingType: 'Organic' | 'Natural' | 'Conventional' | 'Hydroponic';
  farmLocation: string;
  profileImage: string;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalSales: number;
  joinedDate: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  district: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  status: 'active' | 'suspended';
  ordersCount: number;
  joinedDate: string;
}

export interface DeliveryPartnerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  district: string;
  vehicleType: 'Motorcycle' | 'Electric Scooter' | 'Pickup Van' | 'Three Wheeler Cargo';
  vehicleNumber: string;
  drivingLicenseNumber: string;
  profilePhoto: string;
  status: 'available' | 'on_delivery' | 'offline' | 'suspended';
  rating: number;
  todayEarnings: number;
  completedDeliveries: number;
  totalDistanceKm: number;
  joinedDate: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export type ProductCategory = 
  | 'Vegetables'
  | 'Fruits'
  | 'Grains'
  | 'Pulses'
  | 'Spices'
  | 'Leafy Vegetables'
  | 'Organic Products';

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  category: ProductCategory;
  description: string;
  quantity: number; // current available stock
  initialQuantity: number;
  unit: 'kg' | 'quintal' | 'bunch' | 'box' | 'dozen';
  price: number; // in INR per unit
  harvestDate: string;
  district: string;
  farmLocation: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isOrganic: boolean;
  status: 'approved' | 'pending' | 'suspended';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'ORDER_PLACED'
  | 'FARMER_CONFIRMED'
  | 'DELIVERY_ASSIGNED'
  | 'ACCEPTED_BY_DELIVERY'
  | 'GOING_TO_FARM'
  | 'PRODUCT_PICKED_UP'
  | 'OUT_FOR_DELIVERY'
  | 'ARRIVED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderReview {
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  district: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmLocation: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Cash on Delivery' | 'Card';
  paymentStatus: 'Paid' | 'Pending';
  status: OrderStatus;
  assignedDeliveryBoyId?: string;
  assignedDeliveryBoyName?: string;
  deliveryBoyPhone?: string;
  vehicleInfo?: string;
  otp: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime: string;
  review?: OrderReview;
}

export interface Complaint {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  type: 'Wrong Product' | 'Damaged Product' | 'Missing Quantity' | 'Late Delivery' | 'Delivery Issue' | 'Other';
  description: string;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Rejected';
  createdAt: string;
  adminResponse?: string;
}

export interface NotificationItem {
  id: string;
  targetRole: UserRole | 'all';
  targetUserId?: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  orderId?: string;
}

export interface MandiPriceItem {
  id: string;
  commodity: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  date: string;
}

export interface SchemeItem {
  id: string;
  title: string;
  category: string;
  ministry: string;
  benefit: string;
  eligibility: string;
  deadline: string;
  link: string;
  status: 'Open' | 'Ongoing' | 'Upcoming';
}
