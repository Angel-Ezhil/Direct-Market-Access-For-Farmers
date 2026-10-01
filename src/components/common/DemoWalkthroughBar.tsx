import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Sprout, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  LogOut, 
  ChevronUp, 
  ChevronDown, 
  Layers,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Globe
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

export const DemoWalkthroughBar: React.FC = () => {
  const { 
    currentRole, 
    quickDemoLogin, 
    logout, 
    orders, 
    products, 
    resetToDemoDefaults,
    setActiveFarmerTab,
    setActiveCustomerTab,
    setActiveDeliveryTab,
    setActiveAdminTab
  } = useApp();

  const [expanded, setExpanded] = useState(false);

  // Identify latest order in test scenario
  const latestOrder = orders[0];

  const getWorkflowStep = () => {
    if (!latestOrder) return { step: 1, title: 'Step 1: Farmer lists product (e.g. Tomato 100kg)' };
    if (latestOrder.status === 'ORDER_PLACED') {
      return { 
        step: 3, 
        title: `Step 4: Farmer confirms incoming Order #${latestOrder.id}`, 
        targetRole: 'farmer', 
        actionName: 'Switch to Farmer to Confirm' 
      };
    }
    if (latestOrder.status === 'FARMER_CONFIRMED') {
      return { 
        step: 4, 
        title: `Step 5: Admin assigns Delivery Boy for Order #${latestOrder.id}`, 
        targetRole: 'admin', 
        actionName: 'Switch to Admin to Assign' 
      };
    }
    if (latestOrder.status === 'DELIVERY_ASSIGNED' || latestOrder.status === 'ACCEPTED_BY_DELIVERY') {
      return { 
        step: 6, 
        title: `Step 6: Delivery Boy picks up from Farm for Order #${latestOrder.id}`, 
        targetRole: 'delivery', 
        actionName: 'Switch to Delivery Boy to Pickup' 
      };
    }
    if (latestOrder.status === 'GOING_TO_FARM' || latestOrder.status === 'PRODUCT_PICKED_UP' || latestOrder.status === 'OUT_FOR_DELIVERY' || latestOrder.status === 'ARRIVED') {
      return { 
        step: 7, 
        title: `Step 7: Delivery Boy completes with Customer OTP (${latestOrder.otp})`, 
        targetRole: 'delivery', 
        actionName: 'Switch to Delivery to Enter OTP' 
      };
    }
    if (latestOrder.status === 'DELIVERED' && !latestOrder.review) {
      return { 
        step: 8, 
        title: `Step 8: Customer leaves review for Order #${latestOrder.id}`, 
        targetRole: 'customer', 
        actionName: 'Switch to Customer to Review' 
      };
    }
    return { step: 8, title: 'Demo Flow Completed! Direct Market Access loop verified.', targetRole: null, actionName: null };
  };

  const currentStepInfo = getWorkflowStep();

  return (
    <div className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:max-w-2xl z-50 print:hidden font-sans">
      <div className="bg-stone-900/95 text-white border border-emerald-500/40 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300">
        {/* Compact Bar */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-stone-200">Hackathon Mode:</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 font-bold uppercase tracking-wider text-[11px] border border-emerald-600/40">
              {currentRole || 'SELECT ROLE'}
            </span>
          </div>

          {/* Quick 1-click persona switch buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <button
              onClick={() => { quickDemoLogin('farmer'); setActiveFarmerTab('dashboard'); }}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                currentRole === 'farmer' 
                  ? 'bg-emerald-600 text-white font-bold shadow' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Switch to Farmer persona"
            >
              <Sprout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Farmer</span>
            </button>

            <button
              onClick={() => { quickDemoLogin('customer'); setActiveCustomerTab('marketplace'); }}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                currentRole === 'customer' 
                  ? 'bg-teal-600 text-white font-bold shadow' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Switch to Customer persona"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Customer</span>
            </button>

            <button
              onClick={() => { quickDemoLogin('delivery'); setActiveDeliveryTab('dashboard'); }}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                currentRole === 'delivery' 
                  ? 'bg-amber-600 text-white font-bold shadow' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Switch to Delivery Boy persona"
            >
              <Truck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Delivery</span>
            </button>

            <button
              onClick={() => { quickDemoLogin('admin'); setActiveAdminTab('overview'); }}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                currentRole === 'admin' 
                  ? 'bg-purple-600 text-white font-bold shadow' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Switch to Admin persona"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <LanguageSelector variant="dark" />
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
              title="Toggle Live Demo Scenario Guide"
            >
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-950/60 text-stone-400 hover:text-red-400 transition-colors"
              title="Logout to First Screen"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Interactive Scenario Tracker */}
        {expanded && (
          <div className="p-4 bg-stone-950/90 border-t border-white/10 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  End-to-End Live Hackathon Demonstration Flow
                </span>
              </div>
              <button
                onClick={resetToDemoDefaults}
                className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-white"
                title="Reset all demo state to fresh default"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Data
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="text-emerald-300 font-semibold">{currentStepInfo.title}</p>
                {latestOrder && (
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Order ID: <strong className="text-stone-200">{latestOrder.id}</strong> | Status: <strong className="text-emerald-400">{latestOrder.status}</strong> {latestOrder.otp && `| Delivery OTP: ${latestOrder.otp}`}
                  </p>
                )}
              </div>

              {currentStepInfo.targetRole && (
                <button
                  onClick={() => quickDemoLogin(currentStepInfo.targetRole as UserRole)}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow"
                >
                  <span>{currentStepInfo.actionName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-stone-400">
              <div className="p-2 rounded bg-stone-900 border border-white/5">
                <span className="text-emerald-400 font-bold block">1. FARMER</span>
                Add Tomato & publish
              </div>
              <div className="p-2 rounded bg-stone-900 border border-white/5">
                <span className="text-teal-400 font-bold block">2. CUSTOMER</span>
                Order 10kg & checkout
              </div>
              <div className="p-2 rounded bg-stone-900 border border-white/5">
                <span className="text-purple-400 font-bold block">3. ADMIN</span>
                Assign Delivery Partner
              </div>
              <div className="p-2 rounded bg-stone-900 border border-white/5">
                <span className="text-amber-400 font-bold block">4. DELIVERY</span>
                Pickup & Verify with OTP
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
