import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerProfile } from '../../types';
import { CustomerMarketplace } from './CustomerMarketplace';
import { CustomerCart } from './CustomerCart';
import { CustomerOrders } from './CustomerOrders';
import { FarmerSchemes } from '../farmer/FarmerSchemes';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { LanguageSelector } from '../common/LanguageSelector';
import { 
  ShoppingCart, 
  Store, 
  Clock, 
  User, 
  Building2, 
  LogOut, 
  MapPin, 
  Phone, 
  Mail, 
  Check, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const { 
    activeCustomerTab, 
    setActiveCustomerTab, 
    currentUser, 
    customers, 
    cart, 
    orders,
    logout 
  } = useApp();

  const currentCustomer = (currentUser as CustomerProfile) || customers[0];
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const activeCustomerOrders = orders.filter(
    o => (o.customerId === currentCustomer?.id || o.customerName === currentCustomer?.name) &&
         o.status !== 'DELIVERED' && o.status !== 'CANCELLED'
  );

  const [savedMessage, setSavedMessage] = useState(false);
  const [address, setAddress] = useState(currentCustomer?.deliveryAddress || '');

  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount > 0 ? cartItemCount : null },
    { id: 'orders', label: 'My Orders', icon: Clock, badge: activeCustomerOrders.length > 0 ? activeCustomerOrders.length : null },
    { id: 'schemes', label: 'Direct Schemes', icon: Building2 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col selection:bg-teal-600 selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white shadow-sm">
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-stone-900 tracking-tight flex items-center gap-1.5 font-display">
                DIRECT MARKET ACCESS
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                  Consumer Portal
                </span>
              </span>
              <p className="text-[11px] text-stone-500">
                Fresh Harvests Delivered Direct to {currentCustomer.district}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector variant="light" />
            <NotificationDropdown />

            {/* Cart Button Shortcut */}
            <button
              onClick={() => setActiveCustomerTab('cart')}
              className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-700 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-stone-200 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                {currentCustomer.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-stone-800 hidden sm:inline">
                {currentCustomer.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-stone-50 transition-colors ml-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customer Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100 flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeCustomerTab === item.id || (item.id === 'marketplace' && activeCustomerTab === 'home');
            return (
              <button
                key={item.id}
                onClick={() => setActiveCustomerTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-teal-900' : 'bg-teal-100 text-teal-800'
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(activeCustomerTab === 'home' || activeCustomerTab === 'marketplace') && <CustomerMarketplace />}
        {activeCustomerTab === 'cart' && <CustomerCart />}
        {activeCustomerTab === 'orders' && <CustomerOrders />}
        {activeCustomerTab === 'schemes' && <FarmerSchemes />}

        {activeCustomerTab === 'profile' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-teal-800 text-white font-bold text-2xl flex items-center justify-center shadow-md">
                {currentCustomer.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display">
                  {currentCustomer.name}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Direct Market Consumer · {currentCustomer.district}
                </p>
                <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                  Verified Local Buyer
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
                <span>Account & Delivery Address</span>
                {savedMessage && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Address saved
                  </span>
                )}
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Email</label>
                  <input
                    type="text"
                    disabled
                    value={currentCustomer.email}
                    className="w-full px-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    disabled
                    value={currentCustomer.phone}
                    className="w-full px-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Default Delivery Address</label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-800 focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setSavedMessage(true);
                      setTimeout(() => setSavedMessage(false), 2500);
                    }}
                    className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
