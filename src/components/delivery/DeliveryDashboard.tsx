import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DeliveryPartnerProfile, Order, OrderStatus } from '../../types';
import { DeliveryMapModal } from './DeliveryMapModal';
import { DeliveryOtpModal } from './DeliveryOtpModal';
import { DeliveryEarnings } from './DeliveryEarnings';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { LanguageSelector } from '../common/LanguageSelector';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Key, 
  Navigation, 
  User, 
  IndianRupee, 
  LogOut, 
  ChevronRight, 
  Package, 
  Compass, 
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const DeliveryDashboard: React.FC = () => {
  const { 
    activeDeliveryTab, 
    setActiveDeliveryTab, 
    currentUser, 
    deliveryPartners, 
    orders, 
    acceptDeliveryAsPartner, 
    updateDeliveryProgress, 
    logout 
  } = useApp();

  const currentPartner = (currentUser as DeliveryPartnerProfile) || deliveryPartners[0];
  const partnerId = currentPartner?.id || 'del-1';

  // Modal states
  const [mapOrder, setMapOrder] = useState<Order | null>(null);
  const [otpOrder, setOtpOrder] = useState<Order | null>(null);

  // Filter orders assigned to this partner or waiting to be accepted
  const myAssignedOrders = orders.filter(
    o => o.assignedDeliveryBoyId === partnerId || o.assignedDeliveryBoyName === currentPartner?.name
  );

  const pendingPickups = myAssignedOrders.filter(
    o => o.status === 'DELIVERY_ASSIGNED' || o.status === 'ACCEPTED_BY_DELIVERY' || o.status === 'GOING_TO_FARM'
  );

  const outForDelivery = myAssignedOrders.filter(
    o => o.status === 'PRODUCT_PICKED_UP' || o.status === 'OUT_FOR_DELIVERY' || o.status === 'ARRIVED'
  );

  const completedToday = myAssignedOrders.filter(o => o.status === 'DELIVERED');

  const todayEarnings = currentPartner?.todayEarnings || (completedToday.length * 50);

  // Active uncompleted orders
  const activeTrips = myAssignedOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Truck },
    { id: 'new-deliveries', label: 'New Pickups', icon: Package, badge: pendingPickups.length > 0 ? pendingPickups.length : null },
    { id: 'my-deliveries', label: 'In Transit', icon: Navigation, badge: outForDelivery.length > 0 ? outForDelivery.length : null },
    { id: 'map', label: 'Map View', icon: Compass },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 pb-20">
      {/* Mobile-first Header */}
      <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Truck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5 font-display">
                DELIVERY PARTNER APP
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Online
                </span>
              </span>
              <p className="text-[11px] text-stone-400">
                {currentPartner.name} · {currentPartner.vehicleType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector variant="dark" />
            <NotificationDropdown />

            <div className="h-6 w-px bg-stone-800 mx-1" />

            <button
              onClick={logout}
              className="p-2 rounded-xl text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-4xl mx-auto px-4 border-t border-stone-800/80 flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeDeliveryTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDeliveryTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-stone-950 text-amber-400' : 'bg-amber-500 text-stone-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        {/* Render Tab Contents */}
        {activeDeliveryTab === 'earnings' && <DeliveryEarnings />}

        {activeDeliveryTab === 'map' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display text-white">Live Route & Assigned Deliveries</h2>
            {activeTrips.length === 0 ? (
              <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-3xl text-stone-400 text-xs">
                No active routes in transit right now. Check New Pickups to accept assigned orders.
              </div>
            ) : (
              <div className="space-y-4">
                {activeTrips.map(order => (
                  <div key={order.id} className="bg-stone-900 border border-stone-800 p-5 rounded-3xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-400 text-xs">#{order.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                        {order.status}
                      </span>
                    </div>
                    <p className="font-bold text-white text-base">{order.productName}</p>
                    <p className="text-xs text-stone-400">Pickup: {order.farmerName} → Drop: {order.customerName}</p>
                    <button
                      onClick={() => setMapOrder(order)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Open Full GPS Navigation Route</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeDeliveryTab === 'profile' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl flex items-center gap-4">
              <img
                src={currentPartner.profilePhoto}
                alt={currentPartner.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{currentPartner.name}</h2>
                <p className="text-xs text-amber-400 font-semibold">{currentPartner.vehicleType} · {currentPartner.vehicleNumber}</p>
                <p className="text-xs text-stone-400 mt-1">Driving License: {currentPartner.drivingLicenseNumber}</p>
              </div>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-3 text-xs text-stone-300">
              <h3 className="font-bold text-sm text-white pb-2 border-b border-stone-800">Partner Details</h3>
              <p><strong className="text-stone-400">Operating District:</strong> {currentPartner.district}</p>
              <p><strong className="text-stone-400">Phone Contact:</strong> {currentPartner.phone}</p>
              <p><strong className="text-stone-400">Email:</strong> {currentPartner.email}</p>
              <p><strong className="text-stone-400">Rating:</strong> ⭐ {currentPartner.rating} / 5.0</p>
              <p><strong className="text-stone-400">Total Deliveries:</strong> {currentPartner.completedDeliveries}</p>
            </div>
          </div>
        )}

        {/* Default 'dashboard' or 'new-deliveries' or 'my-deliveries' */}
        {(activeDeliveryTab === 'dashboard' || activeDeliveryTab === 'new-deliveries' || activeDeliveryTab === 'my-deliveries') && (
          <div className="space-y-6">
            {/* Header Greeting */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 text-stone-950 shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-stone-950/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Field Logistics Partner · Nashik Cluster
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Hello, Delivery Partner 👋
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-950/80 mt-1">
                Manage farm produce pickups, navigate delivery coordinates, and verify customer doorstep handovers with OTP.
              </p>
            </div>

            {/* Top 5 Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl">
                <span className="text-[11px] text-stone-400 block font-medium">Today's Deliveries</span>
                <span className="text-2xl font-extrabold text-white font-display mt-1 block">
                  {myAssignedOrders.length}
                </span>
                <span className="text-[10px] text-stone-500">Assigned trips</span>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl">
                <span className="text-[11px] text-stone-400 block font-medium">Pending Pickups</span>
                <span className={`text-2xl font-extrabold font-display mt-1 block ${pendingPickups.length > 0 ? 'text-amber-400' : 'text-white'}`}>
                  {pendingPickups.length}
                </span>
                <span className="text-[10px] text-stone-500">At farm site</span>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl">
                <span className="text-[11px] text-stone-400 block font-medium">Out for Delivery</span>
                <span className={`text-2xl font-extrabold font-display mt-1 block ${outForDelivery.length > 0 ? 'text-sky-400' : 'text-white'}`}>
                  {outForDelivery.length}
                </span>
                <span className="text-[10px] text-stone-500">On road</span>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl">
                <span className="text-[11px] text-stone-400 block font-medium">Completed</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-display mt-1 block">
                  {completedToday.length}
                </span>
                <span className="text-[10px] text-stone-500">OTP verified</span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-stone-900 border border-stone-800 p-4 rounded-2xl">
                <span className="text-[11px] text-stone-400 block font-medium">Today's Earnings</span>
                <span className="text-2xl font-extrabold text-amber-400 font-display mt-1 block">
                  ₹{todayEarnings}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">+₹50 / drop</span>
              </div>
            </div>

            {/* Quick Filter Sub-bar */}
            <div className="flex items-center justify-between pt-2">
              <h2 className="text-base font-bold text-white font-display">
                Assigned Orders & Route Progression
              </h2>
              <span className="text-xs text-stone-400">
                {myAssignedOrders.length} Trips Total
              </span>
            </div>

            {/* Assigned Orders Workflow Cards */}
            <div className="space-y-4">
              {myAssignedOrders.length === 0 ? (
                <div className="bg-stone-900 border border-stone-800 p-12 rounded-3xl text-center space-y-2">
                  <Package className="w-12 h-12 text-stone-700 mx-auto" />
                  <h3 className="font-bold text-sm text-stone-300">No Orders Assigned Yet</h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    When the platform Admin or automated matching assigns a farm pickup to you, it will appear here instantly.
                  </p>
                </div>
              ) : (
                myAssignedOrders.map(order => {
                  const isDelivered = order.status === 'DELIVERED';
                  return (
                    <div
                      key={order.id}
                      className="bg-stone-900 border border-stone-800 p-5 rounded-3xl shadow-sm space-y-4"
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                            #{order.id}
                          </span>
                          <span className="font-semibold text-stone-300">{order.productName}</span>
                          <span className="text-stone-500">({order.quantity} {order.unit})</span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                          isDelivered
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40 animate-pulse'
                        }`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      {/* Origin & Destination Stops */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {/* Farmer Stop */}
                        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                            📍 1. Farm Pickup
                          </span>
                          <p className="font-bold text-white text-sm">{order.farmerName}</p>
                          <p className="text-stone-400 text-[11px] truncate">
                            {order.farmLocation || 'Pimpalgaon Farm'}, {order.district}
                          </p>
                          <a
                            href={`tel:${order.farmerPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline pt-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Farmer ({order.farmerPhone})</span>
                          </a>
                        </div>

                        {/* Customer Stop */}
                        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-sky-400 block">
                            📍 2. Customer Delivery
                          </span>
                          <p className="font-bold text-white text-sm">{order.customerName}</p>
                          <p className="text-stone-400 text-[11px] truncate">{order.deliveryAddress}</p>
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:underline pt-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Customer ({order.customerPhone})</span>
                          </a>
                        </div>
                      </div>

                      {/* Route & Trip Metrics */}
                      <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 pt-1">
                        <span>Distance: <strong className="text-white">4.8 km</strong></span>
                        <span>Estimated Route Time: <strong className="text-white">18 mins</strong></span>
                        <span>Payout: <strong className="text-emerald-400 font-bold">+₹50.00</strong></span>
                      </div>

                      {/* Interactive Workflow Buttons */}
                      {!isDelivered ? (
                        <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-stone-800">
                          {/* Map view button */}
                          <button
                            onClick={() => setMapOrder(order)}
                            className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Navigation className="w-3.5 h-3.5 text-amber-400" />
                            <span>View Route Map</span>
                          </button>

                          {/* Step Transitions as specified in prompt:
                              NEW ORDER -> ACCEPTED -> GOING TO FARM -> PRODUCT PICKED UP -> OUT FOR DELIVERY -> ARRIVED -> DELIVERED (with OTP) */}
                          {order.status === 'DELIVERY_ASSIGNED' && (
                            <button
                              onClick={() => acceptDeliveryAsPartner(order.id)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Accept Delivery Assignment</span>
                            </button>
                          )}

                          {order.status === 'ACCEPTED_BY_DELIVERY' && (
                            <button
                              onClick={() => updateDeliveryProgress(order.id, 'GOING_TO_FARM')}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              <Navigation className="w-4 h-4" />
                              <span>Start Ride to Farm (Going to Farm)</span>
                            </button>
                          )}

                          {order.status === 'GOING_TO_FARM' && (
                            <button
                              onClick={() => updateDeliveryProgress(order.id, 'PRODUCT_PICKED_UP')}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              <Package className="w-4 h-4" />
                              <span>Mark Product Picked Up from Farmer</span>
                            </button>
                          )}

                          {order.status === 'PRODUCT_PICKED_UP' && (
                            <button
                              onClick={() => updateDeliveryProgress(order.id, 'OUT_FOR_DELIVERY')}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              <Truck className="w-4 h-4" />
                              <span>Start Ride to Customer (Out for Delivery)</span>
                            </button>
                          )}

                          {order.status === 'OUT_FOR_DELIVERY' && (
                            <button
                              onClick={() => updateDeliveryProgress(order.id, 'ARRIVED')}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              <MapPin className="w-4 h-4" />
                              <span>Mark Arrived at Customer Doorstep</span>
                            </button>
                          )}

                          {order.status === 'ARRIVED' && (
                            <button
                              onClick={() => setOtpOrder(order)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 ring-2 ring-emerald-400/40 animate-pulse"
                            >
                              <Key className="w-4 h-4" />
                              <span>Verify Customer OTP & Deliver</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Delivery Complete · OTP Verified
                          </span>
                          <span className="text-stone-400">
                            +₹50 Credited to Balance
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>

      {/* Map Route Modal */}
      {mapOrder && (
        <DeliveryMapModal
          order={mapOrder}
          onClose={() => setMapOrder(null)}
        />
      )}

      {/* OTP Delivery Verification Modal */}
      {otpOrder && (
        <DeliveryOtpModal
          order={otpOrder}
          onClose={() => setOtpOrder(null)}
          onSuccess={() => {
            setOtpOrder(null);
          }}
        />
      )}
    </div>
  );
};
