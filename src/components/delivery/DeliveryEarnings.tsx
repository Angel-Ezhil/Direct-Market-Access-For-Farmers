import React from 'react';
import { useApp } from '../../context/AppContext';
import { DeliveryPartnerProfile } from '../../types';
import { 
  IndianRupee, 
  TrendingUp, 
  Truck, 
  CheckCircle2, 
  Calendar, 
  Navigation, 
  Building2, 
  CreditCard 
} from 'lucide-react';

export const DeliveryEarnings: React.FC = () => {
  const { currentUser, deliveryPartners, orders } = useApp();
  const currentPartner = (currentUser as DeliveryPartnerProfile) || deliveryPartners[0];

  const myDeliveredOrders = orders.filter(
    o => (o.assignedDeliveryBoyId === currentPartner?.id || o.assignedDeliveryBoyName === currentPartner?.name) &&
         o.status === 'DELIVERED'
  );

  const totalTodayEarnings = currentPartner.todayEarnings || (myDeliveredOrders.length * 50);
  const weeklyEarnings = totalTodayEarnings + 2450;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            Fast Daily Logistics Settlement
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display">
            Delivery Partner Payouts
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Guaranteed ₹50 base fee per completed direct farm delivery, paid instantly into your UPI bank handle.
          </p>
        </div>

        <div className="bg-amber-950/60 border border-amber-500/30 px-3.5 py-2 rounded-2xl text-amber-300 text-xs font-semibold">
          Daily Auto-Settlement Active
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl text-white shadow-sm">
          <span className="text-xs text-stone-400 font-medium">Today's Earnings</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-amber-400 font-display">
              ₹{totalTodayEarnings}
            </span>
          </div>
          <span className="text-[11px] text-stone-400">Paid per delivery</span>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl text-white shadow-sm">
          <span className="text-xs text-stone-400 font-medium">Weekly Total</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-display">
              ₹{weeklyEarnings}
            </span>
          </div>
          <span className="text-[11px] text-stone-400">Direct deposit</span>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl text-white shadow-sm">
          <span className="text-xs text-stone-400 font-medium">Completed Trips</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-white font-display">
              {currentPartner.completedDeliveries}
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% On-time
          </span>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl text-white shadow-sm">
          <span className="text-xs text-stone-400 font-medium">Distance Covered</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-white font-display">
              {currentPartner.totalDistanceKm} km
            </span>
          </div>
          <span className="text-[11px] text-stone-400">Fuel allowance active</span>
        </div>
      </div>

      {/* Deliveries History Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden text-white shadow-sm">
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            Recent Fulfilled Farm Deliveries
          </h3>
          <span className="text-xs text-stone-400">
            {myDeliveredOrders.length} Completed Orders
          </span>
        </div>

        <div className="divide-y divide-stone-800">
          {myDeliveredOrders.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-400">
              No completed deliveries on record. Accept and verify active orders to log earnings!
            </div>
          ) : (
            myDeliveredOrders.map(order => (
              <div key={order.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">#{order.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold text-[10px] border border-emerald-500/30">
                      Delivered
                    </span>
                  </div>
                  <p className="text-stone-300 mt-1 font-medium">
                    {order.productName} ({order.quantity} {order.unit})
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Pickup: {order.farmerName} ({order.district}) → Drop: {order.customerName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-amber-400">
                    +₹50.00
                  </span>
                  <span className="text-[10px] text-stone-400 block">Payout Credited</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
