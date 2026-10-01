import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  IndianRupee, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  Calendar,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const FarmerEarnings: React.FC = () => {
  const { orders, currentUser, farmers } = useApp();

  const currentFarmerId = currentUser?.id || 'farmer-1';
  const myFarmer = farmers.find(f => f.id === currentFarmerId) || farmers[0];
  const myCompletedOrders = orders.filter(
    o => (o.farmerId === currentFarmerId || o.farmerName === (currentUser?.name || 'Suresh Patel')) && o.status === 'DELIVERED'
  );

  const totalCalculatedSales = myCompletedOrders.reduce((sum, o) => sum + o.subtotal, 0) + (myFarmer?.totalSales || 0);
  const commissionSaved = Math.round(totalCalculatedSales * 0.15); // 15% saved from middlemen

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Direct Account Settlement
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Farmer Revenue & Earnings
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Zero deductions. 100% of the customer's purchase value is credited directly into your verified bank account upon delivery.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Next Auto-Payout: Daily at 9:00 PM</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-700 to-green-800 text-white shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-emerald-100">Cumulative Realized Sales</span>
            <span className="p-2 rounded-xl bg-white/10">
              <IndianRupee className="w-5 h-5 text-white" />
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-display">
            ₹{totalCalculatedSales.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-100 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-lime-300" />
            <span>+18.4% compared to local APMC realization</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-stone-500">Broker Commissions Saved</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
            ₹{commissionSaved.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            Retained 100% margin by bypassing mandi agents
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-stone-500">Linked Bank Account (DBT)</span>
            <span className="p-2 rounded-xl bg-stone-100 text-stone-700">
              <Building2 className="w-5 h-5" />
            </span>
          </div>
          <div className="text-base font-bold text-stone-900">
            State Bank of India (SBI)
          </div>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            A/C: ••••••••••4819 · IFSC: SBIN0001824
          </p>
          <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            KYC Verified & Aadhaar Seeded
          </span>
        </div>
      </div>

      {/* Completed Orders / Payout History */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          Recent Delivered Orders & Payout Credit Slips
        </h3>

        {myCompletedOrders.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500">
            No completed deliveries yet. Once an order is delivered and verified with OTP, it will appear here.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {myCompletedOrders.map(order => (
              <div key={order.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">#{order.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Delivered & Settled
                    </span>
                  </div>
                  <p className="text-stone-600 mt-0.5 font-medium">
                    {order.productName} ({order.quantity} {order.unit})
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Buyer: {order.customerName} · Partner: {order.assignedDeliveryBoyName || 'Express'}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold text-emerald-700">
                    +₹{order.subtotal}
                  </div>
                  <span className="text-[11px] text-stone-400">Direct Farm Payout</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
