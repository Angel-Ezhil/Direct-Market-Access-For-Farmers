import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  IndianRupee, 
  Users, 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight,
  PieChart,
  BarChart3
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { orders, products, farmers, customers, deliveryPartners } = useApp();

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 426500;
  const platformFee = Math.round(totalGMV * 0.03); // 3% nominal tech convenience fee
  const farmerRealizedVolume = totalGMV - platformFee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Ecosystem Analytics & Platform Metrics
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Macro insights on Gross Merchandise Value (GMV), district demand clusters, and fair farmer payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>+24.6% MoM Growth</span>
          </span>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-950 to-stone-900 text-white shadow-md">
          <span className="text-xs font-medium text-purple-200">Gross Merchandise Value (GMV)</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-display my-2">
            ₹{totalGMV.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-purple-200/80 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct value transacted across 4 districts</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Direct Farmer Payout Realization</span>
          <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display my-2">
            ₹{farmerRealizedVolume.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-600 font-medium">
            97% of checkout value directly retained by cultivators
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Platform Logistics & Ops Revenue</span>
          <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display my-2">
            ₹{platformFee.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-stone-500">
            Self-sustaining tech & dispatch operations fee
          </p>
        </div>
      </div>

      {/* District Volume Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            District-wise Harvest Order Volume
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Nashik Region (Tomatoes, Grapes, Onions)</span>
                <span>48% (₹204,720)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full w-[48%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Ratnagiri (Alphonso Mangoes & Turmeric)</span>
                <span>31% (₹132,215)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-[31%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Karnal & Haryana Belt (Basmati Grains)</span>
                <span>14% (₹59,710)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full w-[14%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Pune Rural & Kolhapur (Vegetables)</span>
                <span>7% (₹29,855)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[7%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Satisfaction & Delivery Proof Metrics */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Quality & Fulfillment Reliability
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-400 block text-[10px] font-bold uppercase">Average Delivery Time</span>
              <span className="text-2xl font-extrabold text-stone-900 font-display mt-1 block">1h 48m</span>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">Farm to doorstep direct</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-400 block text-[10px] font-bold uppercase">Produce Freshness Rating</span>
              <span className="text-2xl font-extrabold text-stone-900 font-display mt-1 block">4.92 / 5</span>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">Across 180+ verified reviews</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-400 block text-[10px] font-bold uppercase">OTP Verification Rate</span>
              <span className="text-2xl font-extrabold text-stone-900 font-display mt-1 block">100%</span>
              <p className="text-[11px] text-stone-500 mt-1">Zero unverified deliveries</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-400 block text-[10px] font-bold uppercase">Grievance Rate</span>
              <span className="text-2xl font-extrabold text-stone-900 font-display mt-1 block">&lt; 0.4%</span>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">Industry benchmark is 3.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
