import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminProductManagement } from './AdminProductManagement';
import { AdminOrderManagement } from './AdminOrderManagement';
import { AdminDeliveryManagement } from './AdminDeliveryManagement';
import { AdminComplaints } from './AdminComplaints';
import { AdminAnalytics } from './AdminAnalytics';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { LanguageSelector } from '../common/LanguageSelector';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Sprout, 
  ShoppingCart, 
  Truck, 
  Package, 
  Clock, 
  ShieldAlert, 
  Star, 
  FileBarChart, 
  TrendingUp, 
  Settings, 
  LogOut, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    activeAdminTab, 
    setActiveAdminTab, 
    farmers, 
    customers, 
    deliveryPartners, 
    products, 
    orders, 
    complaints, 
    logout 
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Top metric counters
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const completedOrdersCount = orders.filter(o => o.status === 'DELIVERED').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 426500;
  const openComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'farmers', label: 'Farmers', icon: Sprout, count: farmers.length },
    { id: 'customers', label: 'Customers', icon: ShoppingCart, count: customers.length },
    { id: 'delivery-partners', label: 'Delivery Partners', icon: Truck, count: deliveryPartners.length },
    { id: 'products', label: 'Products', icon: Package, count: products.length },
    { id: 'orders', label: 'Orders', icon: Clock, count: orders.length },
    { id: 'deliveries', label: 'Deliveries', icon: Truck, count: activeOrdersCount > 0 ? activeOrdersCount : null },
    { id: 'complaints', label: 'Complaints', icon: ShieldAlert, count: openComplaintsCount > 0 ? openComplaintsCount : null },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col lg:flex-row selection:bg-purple-600 selection:text-white pb-20 lg:pb-0">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm tracking-tight font-display">AgriOps SaaS Admin</span>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector variant="dark" />
          <NotificationDropdown />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-stone-800 text-stone-300"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SaaS Admin Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 bg-stone-900 text-stone-300 z-40 flex flex-col justify-between border-r border-stone-800 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Platform Name */}
          <div className="p-5 border-b border-stone-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-tight block font-display">
                DIRECT MARKET ACCESS
              </span>
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                Admin Control Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {sidebarLinks.map(item => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count !== null && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-purple-900' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Logout */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-900 text-purple-200 font-bold flex items-center justify-center text-[11px]">
              AD
            </div>
            <div className="truncate">
              <p className="font-semibold text-white truncate max-w-28">Super Admin</p>
              <p className="text-[10px] text-stone-500">Operations Control</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
            title="Sign out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Admin View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex bg-white border-b border-stone-200 h-16 items-center justify-between px-8 sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-base font-bold text-stone-900 font-display capitalize">
              {activeAdminTab.replace(/-/g, ' ')}
            </h1>
            <p className="text-xs text-stone-400">Agricultural Direct Market Access Management Platform</p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector variant="light" />
            <NotificationDropdown />

            <div className="h-6 w-px bg-stone-200 mx-1" />

            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700">
              Environment: Production
            </span>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Top 8 Cards Required in Section 17 */}
          {activeAdminTab === 'overview' && (
            <div className="space-y-8">
              {/* Metric KPI Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveAdminTab('farmers')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Total Farmers</span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-stone-900 font-display">{farmers.length}</span>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Sprout className="w-3.5 h-3.5" /> 100% KYC Verified
                  </span>
                </div>

                <div 
                  onClick={() => setActiveAdminTab('customers')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Total Customers</span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-stone-900 font-display">{customers.length}</span>
                  </div>
                  <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5" /> Active Buyers
                  </span>
                </div>

                <div 
                  onClick={() => setActiveAdminTab('delivery-partners')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Total Delivery Partners</span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-stone-900 font-display">{deliveryPartners.length}</span>
                  </div>
                  <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Fleet Ready
                  </span>
                </div>

                <div 
                  onClick={() => setActiveAdminTab('products')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Total Products</span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-stone-900 font-display">{products.length}</span>
                  </div>
                  <span className="text-xs text-stone-500">Live in catalog</span>
                </div>

                <div 
                  onClick={() => setActiveAdminTab('orders')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Active Orders</span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-amber-600 font-display">{activeOrdersCount}</span>
                  </div>
                  <span className="text-xs text-stone-500">Pending or in-transit</span>
                </div>

                <div 
                  onClick={() => setActiveAdminTab('orders')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Completed Orders</span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-emerald-700 font-display">{completedOrdersCount}</span>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified OTP
                  </span>
                </div>

                <div 
                  onClick={() => setActiveAdminTab('analytics')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Gross Platform GMV</span>
                  <div className="my-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500">Cumulative value</span>
                </div>

                <div 
                  onClick={() => setActiveAdminTab('complaints')}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-purple-300 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-stone-500 font-medium">Quality Complaints</span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-red-600 font-display">{complaints.length}</span>
                  </div>
                  <span className="text-xs text-red-600 font-semibold">
                    {openComplaintsCount} Unresolved
                  </span>
                </div>
              </div>

              {/* Quick Action Dispatch Shortcut */}
              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm text-purple-950">
                    Live Dispatch & Fleet Assignment Desk
                  </h3>
                  <p className="text-xs text-purple-900/80 mt-0.5">
                    Orders confirmed by farmers need a delivery boy assigned for pickup.
                  </p>
                </div>
                <button
                  onClick={() => setActiveAdminTab('deliveries')}
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-xs flex items-center gap-2"
                >
                  <span>Open Dispatch Board</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Recent Orders Overview */}
              <AdminOrderManagement />
            </div>
          )}

          {/* Sub Views */}
          {(activeAdminTab === 'farmers' || activeAdminTab === 'customers' || activeAdminTab === 'delivery-partners') && (
            <AdminUserManagement />
          )}

          {activeAdminTab === 'products' && <AdminProductManagement />}
          {activeAdminTab === 'orders' && <AdminOrderManagement />}
          {activeAdminTab === 'deliveries' && <AdminDeliveryManagement />}
          {activeAdminTab === 'complaints' && <AdminComplaints />}
          {activeAdminTab === 'analytics' && <AdminAnalytics />}

          {/* Reviews tab */}
          {activeAdminTab === 'reviews' && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900 font-display">Customer Produce Reviews</h2>
              <div className="divide-y divide-stone-100">
                {orders.filter(o => o.review).map(order => (
                  <div key={order.id} className="py-4 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{order.customerName} on #{order.id}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {order.review?.rating} / 5
                      </span>
                    </div>
                    <p className="text-stone-700 italic">"{order.review?.comment}"</p>
                    <p className="text-[11px] text-stone-400">Produce: {order.productName} · Farmer: {order.farmerName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports tab */}
          {activeAdminTab === 'reports' && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-stone-900 font-display">Audited Operational Reports</h2>
              <p className="text-xs text-stone-500">Download compliance summaries for DBT subsidies and APMC cess exemptions.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer flex items-center justify-between">
                  <div>
                    <p className="font-bold text-stone-900">Monthly Farmer Direct Payout Audit</p>
                    <p className="text-stone-400">PDF Report · 30 Sep 2026</p>
                  </div>
                  <span className="text-purple-700 font-bold hover:underline">Download</span>
                </div>
                <div className="p-4 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer flex items-center justify-between">
                  <div>
                    <p className="font-bold text-stone-900">Logistics & Route Efficiency Breakdown</p>
                    <p className="text-stone-400">CSV Sheet · 30 Sep 2026</p>
                  </div>
                  <span className="text-purple-700 font-bold hover:underline">Download</span>
                </div>
              </div>
            </div>
          )}

          {/* Settings tab */}
          {activeAdminTab === 'settings' && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 max-w-xl">
              <h2 className="text-xl font-bold text-stone-900 font-display">Platform Operations Settings</h2>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200">
                  <div>
                    <span className="font-bold text-stone-900 block">Automatic Delivery Assignment</span>
                    <span className="text-stone-500">Auto-dispatch closest delivery boy upon farmer order confirmation</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200">
                  <div>
                    <span className="font-bold text-stone-900 block">OTP Verification Enforcement</span>
                    <span className="text-stone-500">Require customer OTP before allowing delivery completion</span>
                  </div>
                  <input type="checkbox" defaultChecked disabled className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-not-allowed" />
                </label>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
