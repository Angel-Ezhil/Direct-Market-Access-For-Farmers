import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Sprout, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Mail, 
  Phone, 
  Zap, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface RoleLoginScreenProps {
  role: UserRole;
}

export const RoleLoginScreen: React.FC<RoleLoginScreenProps> = ({ role }) => {
  const { login, setAuthScreen, quickDemoLogin } = useApp();
  
  const [identifier, setIdentifier] = useState(() => {
    if (role === 'farmer') return 'farmer@demo.com';
    if (role === 'customer') return 'customer@demo.com';
    if (role === 'delivery') return 'delivery@demo.com';
    return 'admin@demo.com';
  });
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleMeta = {
    farmer: {
      title: 'Farmer Login',
      hindi: 'किसान लॉगिन',
      icon: Sprout,
      color: 'emerald',
      tagline: 'Access your farm catalog, orders, and mandi prices.',
      demoEmail: 'farmer@demo.com',
      buttonText: 'Login as Farmer'
    },
    customer: {
      title: 'Customer Login',
      hindi: 'ग्राहक लॉगिन',
      icon: ShoppingCart,
      color: 'teal',
      tagline: 'Order farm-fresh vegetables, fruits, and grains directly.',
      demoEmail: 'customer@demo.com',
      buttonText: 'Login as Customer'
    },
    delivery: {
      title: 'Delivery Boy Login',
      hindi: 'डिलीवरी पार्टनर लॉगिन',
      icon: Truck,
      color: 'amber',
      tagline: 'View assigned pickups, map routes, and track daily earnings.',
      demoEmail: 'delivery@demo.com',
      buttonText: 'Login as Delivery Boy'
    },
    admin: {
      title: 'Admin Operations Login',
      hindi: 'प्रशासन लॉगिन',
      icon: ShieldCheck,
      color: 'slate',
      tagline: 'Platform oversight, user verification, order dispatch & complaints.',
      demoEmail: 'admin@demo.com',
      buttonText: 'Admin Login'
    }
  }[role];

  const Icon = roleMeta.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier.trim()) {
      setError('Please enter your email or phone number');
      return;
    }
    const success = login(role, identifier);
    if (!success) {
      setError('Invalid credentials. You can use the quick demo account or register.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back button and Language Switcher */}
      <div className="max-w-md w-full mx-auto px-4 mb-4 flex items-center justify-between">
        <button
          onClick={() => setAuthScreen('role-select')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </button>
        <LanguageSelector variant="dark" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-stone-950/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 mb-4">
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">{roleMeta.title}</h2>
              <span className="text-xs text-stone-400">{roleMeta.hindi}</span>
            </div>
            <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
              {roleMeta.tagline}
            </p>
          </div>

          {/* Quick Demo Pill */}
          <div className="mb-6 p-3 rounded-xl bg-stone-900/90 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-stone-300 font-medium">Demo Mode Active</p>
                <p className="text-[11px] text-stone-400">Pre-filled credentials ready</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => quickDemoLogin(role)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
            >
              1-Click Demo
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                {role === 'customer' ? 'Email / Phone Number' : role === 'admin' ? 'Admin Email' : 'Phone / Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                  {identifier.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={roleMeta.demoEmail}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs sm:text-sm placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs sm:text-sm placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] mt-2"
            >
              {roleMeta.buttonText}
            </button>
          </form>

          {/* Bottom Switcher */}
          {role !== 'admin' ? (
            <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-stone-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  if (role === 'farmer') setAuthScreen('farmer-register');
                  if (role === 'customer') setAuthScreen('customer-register');
                  if (role === 'delivery') setAuthScreen('delivery-register');
                }}
                className="text-emerald-400 font-semibold hover:underline"
              >
                Register here
              </button>
            </div>
          ) : (
            <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-stone-500">
              Administrative portal restricted to authorized personnel. Use <strong className="text-stone-400 font-medium">admin@demo.com</strong> for evaluation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
