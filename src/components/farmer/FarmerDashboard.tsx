import React from 'react';
import { useApp } from '../../context/AppContext';
import { FarmerProfile } from '../../types';
import { FarmerProducts } from './FarmerProducts';
import { FarmerOrders } from './FarmerOrders';
import { FarmerStock } from './FarmerStock';
import { FarmerEarnings } from './FarmerEarnings';
import { FarmerCropScan } from './FarmerCropScan';
import { FarmerWeather } from './FarmerWeather';
import { FarmerMandiPrices } from './FarmerMandiPrices';
import { FarmerSchemes } from './FarmerSchemes';
import { FarmerProfile as FarmerProfileView } from './FarmerProfile';
import { FarmerVideoTutorial } from './FarmerVideoTutorial';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { LanguageSelector } from '../common/LanguageSelector';
import { 
  Sprout, 
  Package, 
  ShoppingCart, 
  IndianRupee, 
  CloudSun, 
  ScanLine, 
  TrendingUp, 
  Building2, 
  User, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  LogOut,
  Camera,
  Layers,
  PlayCircle
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { 
    activeFarmerTab, 
    setActiveFarmerTab, 
    currentUser, 
    products, 
    orders, 
    farmers,
    language,
    t,
    logout 
  } = useApp();

  const currentFarmer = (currentUser as FarmerProfile) || farmers[0];
  const currentFarmerId = currentFarmer?.id || 'farmer-1';

  // Metrics for Farmer
  const myProducts = products.filter(p => p.farmerId === currentFarmerId || p.farmerName === currentFarmer?.name);
  const totalStockKg = myProducts.reduce((sum, p) => sum + p.quantity, 0);

  const myOrders = orders.filter(o => o.farmerId === currentFarmerId || o.farmerName === currentFarmer?.name);
  const activeOrdersCount = myOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const completedOrdersCount = myOrders.filter(o => o.status === 'DELIVERED').length;
  const completedSalesTotal = myOrders
    .filter(o => o.status === 'DELIVERED')
    .reduce((sum, o) => sum + o.subtotal, 0) + (currentFarmer?.totalSales || 0);

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: Sprout },
    { id: 'tutorial-video', label: language === 'ta' ? '🎥 வீடியோ வழிகாட்டி' : language === 'hi' ? '🎥 वीडियो गाइड' : '🎥 Demo Video', icon: PlayCircle, highlight: true },
    { id: 'products', label: t.products, icon: Package },
    { id: 'orders', label: t.orders, icon: ShoppingCart, badge: activeOrdersCount > 0 ? activeOrdersCount : null },
    { id: 'stock', label: t.stock, icon: Layers },
    { id: 'earnings', label: t.earnings, icon: IndianRupee },
    { id: 'crop-scan', label: t.cropScan, icon: ScanLine },
    { id: 'weather', label: t.weather, icon: CloudSun },
    { id: 'mandi-price', label: t.mandiPrice, icon: TrendingUp },
    { id: 'schemes', label: t.schemes, icon: Building2 },
    { id: 'profile', label: t.profile, icon: User }
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-600 flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-stone-900 tracking-tight flex items-center gap-1.5 font-display">
                {t.appTitle}
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                  {t.farmer}
                </span>
              </span>
              <p className="text-[11px] text-stone-500">
                {currentFarmer.farmName} · {currentFarmer.district}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multilingual Switcher: English / தமிழ் / हिन्दी */}
            <LanguageSelector variant="light" />

            <NotificationDropdown />

            <div className="h-6 w-px bg-stone-200 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <img
                src={currentFarmer.profileImage}
                alt={currentFarmer.name}
                className="w-8 h-8 rounded-full object-cover border border-emerald-500/50"
              />
              <span className="text-xs font-semibold text-stone-800 hidden sm:inline">
                {currentFarmer.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-stone-50 transition-colors ml-1"
              title={t.logout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Farmer Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100 flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeFarmerTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveFarmerTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Render Tab Contents */}
        {activeFarmerTab === 'tutorial-video' && <FarmerVideoTutorial />}
        {activeFarmerTab === 'products' && <FarmerProducts />}
        {activeFarmerTab === 'orders' && <FarmerOrders />}
        {activeFarmerTab === 'stock' && <FarmerStock />}
        {activeFarmerTab === 'earnings' && <FarmerEarnings />}
        {activeFarmerTab === 'crop-scan' && <FarmerCropScan />}
        {activeFarmerTab === 'weather' && <FarmerWeather />}
        {activeFarmerTab === 'mandi-price' && <FarmerMandiPrices />}
        {activeFarmerTab === 'schemes' && <FarmerSchemes />}
        {activeFarmerTab === 'profile' && <FarmerProfileView />}

        {/* Default 'dashboard' Tab */}
        {activeFarmerTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Header Greeting */}
            <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold mb-2">
                  Verified Organic Producer · {currentFarmer.district}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
                  {t.goodMorningFarmer}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  {t.farmerWelcomeSub}
                </p>
              </div>

              {/* Quick Actions in Banner */}
              <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
                <button
                  onClick={() => setActiveFarmerTab('products')}
                  className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow transition-all active:scale-95 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-700" />
                  <span>{t.listNewProduce}</span>
                </button>

                <button
                  onClick={() => setActiveFarmerTab('tutorial-video')}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-md active:scale-95"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{t.watchDemoVideo}</span>
                </button>

                <button
                  onClick={() => setActiveFarmerTab('crop-scan')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border border-emerald-500/30"
                >
                  <ScanLine className="w-4 h-4" />
                  <span>{t.aiCropScan}</span>
                </button>
              </div>
            </div>

            {/* 5 Required Metric KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Total Products */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-medium text-stone-500">{t.totalProducts}</span>
                <div className="my-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                    {myProducts.length}
                  </span>
                  <span className="text-xs text-stone-400 block mt-0.5">Active in marketplace</span>
                </div>
                <button
                  onClick={() => setActiveFarmerTab('products')}
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  Manage items <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Available Stock */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-medium text-stone-500">{t.availableStock}</span>
                <div className="my-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                    {totalStockKg}
                  </span>
                  <span className="text-xs text-stone-400 block mt-0.5">kg / units total</span>
                </div>
                <button
                  onClick={() => setActiveFarmerTab('stock')}
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  Adjust stock <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Active Orders */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-medium text-stone-500">{t.activeOrders}</span>
                <div className="my-2">
                  <span className={`text-2xl sm:text-3xl font-extrabold font-display ${activeOrdersCount > 0 ? 'text-amber-600' : 'text-stone-900'}`}>
                    {activeOrdersCount}
                  </span>
                  <span className="text-xs text-stone-400 block mt-0.5">Pending confirmation/dispatch</span>
                </div>
                <button
                  onClick={() => setActiveFarmerTab('orders')}
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  View queue <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Completed Orders */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-medium text-stone-500">{t.completedOrders}</span>
                <div className="my-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                    {completedOrdersCount}
                  </span>
                  <span className="text-xs text-stone-400 block mt-0.5">Delivered to customers</span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Fulfilled
                </span>
              </div>

              {/* Total Earnings */}
              <div className="col-span-2 sm:col-span-1 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-medium text-stone-500">{t.totalEarnings}</span>
                <div className="my-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display">
                    ₹{completedSalesTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-stone-400 block mt-0.5">Settled to bank account</span>
                </div>
                <button
                  onClick={() => setActiveFarmerTab('earnings')}
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  Payout history <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Main Feature Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-stone-900 font-display">
                  Farming Operations & Agri-Services
                </h2>
                <span className="text-xs text-stone-500">Role-specific tools</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 🎥 Farmer Video Tutorial Card */}
                <div
                  onClick={() => setActiveFarmerTab('tutorial-video')}
                  className="group bg-gradient-to-br from-amber-50 to-orange-50/70 p-6 rounded-2xl border-2 border-amber-300 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                      <PlayCircle className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      {language === 'ta' ? 'வீடியோ வழிகாட்டி' : language === 'hi' ? 'डेमो वीडियो' : 'Interactive Guide'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-900">
                      🎥 {language === 'ta' ? 'விவசாயிகளுக்கான வீடியோ விளக்கம்' : language === 'hi' ? 'किसान वीडियो ट्यूटोरियल' : 'Farmer How-To Video Tutorial'}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      {language === 'ta'
                        ? 'தக்காளி சேர்க்க, வாடிக்கையாளர் ஆர்டரை ஏற்க, AI பயிர் ஸ்கேன் செய்ய மற்றும் நேரடி வங்கிப் பணம் பெற எளிய விளக்கம்.'
                        : language === 'hi'
                        ? 'फसल जोड़ना, स्टॉक अपडेट, AI स्कैन एवं सीधे बैंक खाते में भुगतान की पूरी जानकारी।'
                        : 'Watch 5 interactive video chapters showing how to list tomatoes, confirm orders, run AI scans, and get paid.'}
                    </p>
                  </div>
                </div>

                {/* 🌱 Add Product */}
                <div
                  onClick={() => setActiveFarmerTab('products')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-emerald-700 flex items-center gap-1">
                      Go to tool <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800">
                      🌱 Add Product
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Publish newly harvested tomatoes, mangoes, grains, or vegetables with photos and harvest dates.
                    </p>
                  </div>
                </div>

                {/* 📦 Products & Stock */}
                <div
                  onClick={() => setActiveFarmerTab('stock')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Package className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-blue-700 flex items-center gap-1">
                      View stock <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-blue-800">
                      📦 Products & Stock
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Manage active stock levels, set prices, and monitor low inventory warnings.
                    </p>
                  </div>
                </div>

                {/* 🛒 Orders */}
                <div
                  onClick={() => setActiveFarmerTab('orders')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-amber-700 flex items-center gap-1">
                      Fulfill orders <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800">
                      🛒 Orders
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Confirm incoming orders, view customer drop locations, and hand over to assigned delivery partners.
                    </p>
                  </div>
                </div>

                {/* 💰 Earnings */}
                <div
                  onClick={() => setActiveFarmerTab('earnings')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <IndianRupee className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-teal-700 flex items-center gap-1">
                      Account ledger <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-800">
                      💰 Earnings
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Review direct payouts, track commissions saved, and check linked bank account settlement slips.
                    </p>
                  </div>
                </div>

                {/* 🌿 Crop Detection / 📷 Photo Analyzer / 📱 Crop Scan */}
                <div
                  onClick={() => setActiveFarmerTab('crop-scan')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <ScanLine className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-emerald-700 flex items-center gap-1">
                      Run AI scan <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800">
                      🌿 AI Crop Scan & Photo Analyzer
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Scan infected plant leaves to get instant fungal/bacterial diagnoses and organic bio-remedies.
                    </p>
                  </div>
                </div>

                {/* 🌦 Weather */}
                <div
                  onClick={() => setActiveFarmerTab('weather')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <CloudSun className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-sky-700 flex items-center gap-1">
                      Spray advisory <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-sky-800">
                      🌦 Weather & Field Conditions
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      5-day agricultural microclimate forecasts and bio-spray suitability windows.
                    </p>
                  </div>
                </div>

                {/* 📊 Mandi Price */}
                <div
                  onClick={() => setActiveFarmerTab('mandi-price')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-indigo-700 flex items-center gap-1">
                      Market ticker <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-indigo-800">
                      📊 Mandi Price
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      APMC daily benchmark prices across Maharashtra and neighboring mandis.
                    </p>
                  </div>
                </div>

                {/* 🏛 Government Schemes */}
                <div
                  onClick={() => setActiveFarmerTab('schemes')}
                  className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center group-hover:bg-stone-800 group-hover:text-white transition-colors">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-stone-400 group-hover:text-stone-700 flex items-center gap-1">
                      Direct apply <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-stone-800">
                      🏛 Government Schemes
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      PM-KISAN, PMFBY crop insurance, Soil Health Card, and Agri Infrastructure Fund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
