import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { LanguageSelector } from './LanguageSelector';
import { FarmerVideoTutorial } from '../farmer/FarmerVideoTutorial';
import { 
  Sprout, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  PackageCheck,
  PlayCircle,
  X
} from 'lucide-react';

export const RoleSelectionScreen: React.FC = () => {
  const { selectRoleForAuth, quickDemoLogin, products, orders, farmers, t, language } = useApp();
  const [showVideoModal, setShowVideoModal] = useState(false);

  const roleCards = [
    {
      role: 'farmer' as UserRole,
      title: t.farmer,
      nativeSubtitle: language === 'ta' ? 'விவசாயி' : language === 'hi' ? 'किसान' : 'Sell Direct',
      icon: Sprout,
      tagline: t.farmerDesc,
      description: language === 'ta' 
        ? 'தரகர் கமிஷன் இன்றி விளைபொருட்களை நேரிடையாக விற்பனை செய்து கூடுதல் லாபம் பெறுங்கள்.'
        : language === 'hi'
        ? 'बिना किसी दलाल या बिचौलिये के अपनी फसल सीधे ग्राहकों को उचित मूल्य पर बेचें।'
        : 'Zero commission middlemen. List crops, manage stock, check mandi rates & AI crop health.',
      badge: t.farmerBadge,
      demoEmail: 'farmer@demo.com'
    },
    {
      role: 'customer' as UserRole,
      title: t.customer,
      nativeSubtitle: language === 'ta' ? 'வாடிக்கையாளர்' : language === 'hi' ? 'ग्राहक' : 'Buy Fresh',
      icon: ShoppingCart,
      tagline: t.customerDesc,
      description: language === 'ta'
        ? 'அறுவடை செய்த 24 மணிநேரத்தில் இயற்கை காய்கறி, பழங்களை வாங்குங்கள்.'
        : language === 'hi'
        ? 'खेतों से ताज़ी तोड़ी गई सब्जियां, फल और अनाज सीधे अपने घर मंगाएं।'
        : 'Harvested fresh within 24 hours. Track from farm to doorstep with transparent pricing.',
      badge: t.customerBadge,
      demoEmail: 'customer@demo.com'
    },
    {
      role: 'delivery' as UserRole,
      title: t.delivery,
      nativeSubtitle: language === 'ta' ? 'டெலிவரி பார்ட்னர்' : language === 'hi' ? 'डिलीवरी' : 'Fast Logistics',
      icon: Truck,
      tagline: t.deliveryDesc,
      description: language === 'ta'
        ? 'நிலத்திலிருந்து பெற்று வாடிக்கையாளரிடம் OTP சரிபார்த்து ஒப்படைக்கவும்.'
        : language === 'hi'
        ? 'खेत से पिकअप करें, मैप से रास्ता देखें और OTP से डिलीवरी पूरी करें।'
        : 'Real-time farm route navigation, verified OTP deliveries, and instant daily payout credits.',
      badge: t.deliveryBadge,
      demoEmail: 'delivery@demo.com'
    },
    {
      role: 'admin' as UserRole,
      title: t.admin,
      nativeSubtitle: language === 'ta' ? 'நிர்வாகி' : language === 'hi' ? 'प्रशासन' : 'Governance',
      icon: ShieldCheck,
      tagline: t.adminDesc,
      description: language === 'ta'
        ? 'முழு சந்தை இயக்கம், பயனர்கள், ஆர்டர்கள் மற்றும் தரக் குறைகளை கண்காணிக்கவும்.'
        : language === 'hi'
        ? 'उपयोगकर्ताओं, उत्पादों, डिलीवरी और शिकायतों की केंद्रीय निगरानी करें।'
        : 'Centralized oversight for users, product quality approval, order flow, complaints & analytics.',
      badge: t.adminBadge,
      demoEmail: 'admin@demo.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 text-white flex flex-col justify-between relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header Bar */}
      <header className="relative z-10 w-full border-b border-white/10 backdrop-blur-md bg-stone-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-stone-950">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {t.appTitle}
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t.appSubtitle}
                </span>
              </span>
              <p className="text-xs text-stone-400 font-medium">{t.tagline}</p>
            </div>
          </div>

          {/* Right Header Controls: Language Switcher & Farmer Video Button */}
          <div className="flex items-center gap-3">
            {/* Multilingual Selector: English / தமிழ் / हिन्दी */}
            <LanguageSelector variant="dark" />

            {/* Farmer Demo Video Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-sm"
              title="Watch Farmer How-To Video Tutorial"
            >
              <PlayCircle className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ta' ? 'விவசாயி வீடியோ வழிகாட்டி' : language === 'hi' ? 'किसान वीडियो गाइड' : 'Farmer Video Guide'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col justify-center">
        {/* Title & Tagline Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {language === 'ta' 
                ? 'தமிழ்நாடு & இந்திய விவசாயிகளுக்கான நேரடி தளம்' 
                : language === 'hi'
                ? 'भारतीय किसानों के लिए सीधा डिजिटल बाज़ार'
                : 'Empowering 140M+ Indian Smallholder Farmers'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
            {t.appTitle} <br />
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-lime-300 bg-clip-text text-transparent">
              {t.appSubtitle.toUpperCase()}
            </span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-semibold text-emerald-200/90 font-display">
            “{t.tagline}”
          </p>

          <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.subTagline}
          </p>

          {/* Mobile Video Tutorial trigger */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowVideoModal(true)}
              className="inline-flex sm:hidden items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{language === 'ta' ? 'விவசாயி வீடியோ வழிகாட்டி' : language === 'hi' ? 'किसान वीडियो गाइड' : 'Watch Farmer Video'}</span>
            </button>
          </div>

          <div className="mt-6 text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            {t.selectRoleTitle}
          </div>
        </div>

        {/* 4 Role Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.role}
                className="group relative bg-stone-900/80 hover:bg-stone-900 border border-white/10 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/50 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-stone-800 to-stone-700 group-hover:from-emerald-600 group-hover:to-lime-600 text-white flex items-center justify-center shadow transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-300/90 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded">
                      {card.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
                  </div>

                  <p className="text-emerald-400 font-semibold text-xs mb-2 leading-snug">
                    {card.nativeSubtitle}
                  </p>

                  <p className="text-xs text-stone-400 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <button
                    onClick={() => selectRoleForAuth(card.role, 'login')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
                  >
                    <span>{t.login}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {card.role !== 'admin' ? (
                    <button
                      onClick={() => selectRoleForAuth(card.role, 'register')}
                      className="w-full py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold border border-stone-700 hover:border-emerald-500/60 text-stone-300 hover:text-white hover:bg-stone-800/60 transition-colors"
                    >
                      {t.register}
                    </button>
                  ) : (
                    <div className="py-2 text-center text-[11px] text-stone-500 font-medium">
                      Managed by Organization
                    </div>
                  )}

                  {/* 1-Click Fast Demo Login for this role */}
                  <button
                    onClick={() => quickDemoLogin(card.role)}
                    className="w-full text-[11px] text-stone-400 hover:text-emerald-300 pt-1 flex items-center justify-center gap-1 group/btn"
                    title={`Instant login as ${card.demoEmail}`}
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{t.oneClickDemo}: <strong className="text-stone-300 font-medium">{card.demoEmail}</strong></span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live AgriTech Ecosystem Metrics */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-2xl font-bold text-white">{farmers.length}</span>
            </div>
            <p className="text-xs text-stone-400">
              {language === 'ta' ? 'பதிவுசெய்த விவசாயிகள்' : language === 'hi' ? 'पंजीकृत किसान' : 'Verified Farmers'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-lime-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-2xl font-bold text-white">{products.length}</span>
            </div>
            <p className="text-xs text-stone-400">
              {language === 'ta' ? 'சந்தையில் உள்ள விளைபொருட்கள்' : language === 'hi' ? 'सक्रिय फसलें' : 'Harvest Crops'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-teal-400 mb-1">
              <PackageCheck className="w-4 h-4" />
              <span className="text-2xl font-bold text-white">{orders.length}</span>
            </div>
            <p className="text-xs text-stone-400">
              {language === 'ta' ? 'டெலிவரி ஆர்டர்கள்' : language === 'hi' ? 'सक्रिय ऑर्डर्स' : 'Live Orders'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-2xl font-bold text-white">0%</span>
            </div>
            <p className="text-xs text-stone-400">
              {language === 'ta' ? 'தரகர் கமிஷன் இல்லை' : language === 'hi' ? 'बिचौलियों की 0% दलाली' : 'Zero Middlemen Cut'}
            </p>
          </div>
        </div>
      </main>

      {/* Farmer Demo Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full my-auto">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-stone-300 flex items-center gap-1 text-xs font-bold"
            >
              <X className="w-5 h-5" />
              <span>மூடு / Close</span>
            </button>
            <FarmerVideoTutorial />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Direct Market Access for Farmers. Built for Fair Trade & Digital Agritech.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>🌾 தமிழ் / हिन्दी / English</span>
            <span>·</span>
            <span>📱 Smart Crop AI</span>
            <span>·</span>
            <span>🚚 Express Delivery</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
