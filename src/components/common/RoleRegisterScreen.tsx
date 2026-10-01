import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Sprout, 
  ShoppingCart, 
  Truck, 
  ArrowLeft, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  AlertCircle,
  Wheat,
  Car
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface RoleRegisterScreenProps {
  role: 'farmer' | 'customer' | 'delivery';
}

export const RoleRegisterScreen: React.FC<RoleRegisterScreenProps> = ({ role }) => {
  const { registerFarmer, registerCustomer, registerDelivery, setAuthScreen } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [district, setDistrict] = useState('Nashik');
  const [error, setError] = useState<string | null>(null);

  // Farmer specific
  const [farmName, setFarmName] = useState('');
  const [primaryCrop, setPrimaryCrop] = useState('Tomatoes & Vegetables');
  const [farmingType, setFarmingType] = useState<'Organic' | 'Natural' | 'Conventional' | 'Hydroponic'>('Organic');
  const [farmLocation, setFarmLocation] = useState('');

  // Customer specific
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Delivery specific
  const [vehicleType, setVehicleType] = useState<'Motorcycle' | 'Electric Scooter' | 'Pickup Van' | 'Three Wheeler Cargo'>('Motorcycle');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  const districts = ['Nashik', 'Pune', 'Ratnagiri', 'Nagpur', 'Kolhapur', 'Ahmednagar', 'Karnal', 'Guntur'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (role === 'farmer') {
      if (!farmName.trim() || !farmLocation.trim()) {
        setError('Please provide your farm name and location');
        return;
      }
      registerFarmer({
        name: fullName,
        farmName,
        district,
        phone,
        email,
        primaryCrop,
        farmingType,
        farmLocation,
        profileImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'
      });
    } else if (role === 'customer') {
      if (!deliveryAddress.trim()) {
        setError('Please provide your delivery address');
        return;
      }
      registerCustomer({
        name: fullName,
        district,
        phone,
        email,
        deliveryAddress
      });
    } else if (role === 'delivery') {
      if (!vehicleNumber.trim() || !licenseNumber.trim()) {
        setError('Please provide your vehicle number and driving license');
        return;
      }
      registerDelivery({
        name: fullName,
        phone,
        email,
        district,
        vehicleType,
        vehicleNumber,
        drivingLicenseNumber: licenseNumber,
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      });
    }
  };

  const titles = {
    farmer: { title: 'Farmer Registration', icon: Sprout, sub: 'Start selling directly to local families' },
    customer: { title: 'Customer Registration', icon: ShoppingCart, sub: 'Buy farm-fresh harvests directly' },
    delivery: { title: 'Delivery Partner Registration', icon: Truck, sub: 'Deliver farm produce with guaranteed payouts' }
  }[role];

  const Icon = titles.icon;

  return (
    <div className="min-h-screen bg-stone-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back button and Language Switcher */}
      <div className="max-w-2xl mx-auto mb-4 flex items-center justify-between">
        <button
          onClick={() => setAuthScreen('role-select')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Role Selection
        </button>
        <LanguageSelector variant="dark" />
      </div>

      <div className="max-w-2xl mx-auto bg-stone-950/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center text-white shadow">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{titles.title}</h2>
            <p className="text-xs text-stone-400">{titles.sub}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">District</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  {districts.map(d => (
                    <option key={d} value={d} className="bg-stone-900 text-white">{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98220 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Role-Specific Fields */}
          {role === 'farmer' && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Farm Credentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Farm Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sahyadri Organic Orchards"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Primary Crop</label>
                  <div className="relative">
                    <Wheat className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                    <input
                      type="text"
                      placeholder="e.g. Tomatoes, Alphonso Mangoes"
                      value={primaryCrop}
                      onChange={(e) => setPrimaryCrop(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Farming Type</label>
                  <select
                    value={farmingType}
                    onChange={(e) => setFarmingType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Organic">Organic (Certified / Natural)</option>
                    <option value="Natural">Natural (ZBNF / Subhash Palekar)</option>
                    <option value="Conventional">Conventional / GAP</option>
                    <option value="Hydroponic">Hydroponic / Protected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Farm Location / Village</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pimpalgaon Baswant Road, Sector 3"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {role === 'customer' && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">Delivery Address</h4>
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Full Delivery Address</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Flat/House No., Building Name, Street, Landmark, Pincode"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {role === 'delivery' && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">Vehicle & License Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Vehicle Type</label>
                  <div className="relative">
                    <Car className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value as any)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Motorcycle">Motorcycle / Bike</option>
                      <option value="Electric Scooter">Electric Scooter (EV)</option>
                      <option value="Pickup Van">Pickup Van / Mini Truck</option>
                      <option value="Three Wheeler Cargo">Three Wheeler Cargo</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Vehicle Registration No.</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MH 15 EZ 4590"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-300 mb-1">Driving License Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DL-MH15-202200192"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99]"
            >
              {role === 'farmer' && 'Create Farmer Account'}
              {role === 'customer' && 'Create Customer Account'}
              {role === 'delivery' && 'Create Delivery Account'}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-stone-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => {
              if (role === 'farmer') setAuthScreen('farmer-login');
              if (role === 'customer') setAuthScreen('customer-login');
              if (role === 'delivery') setAuthScreen('delivery-login');
            }}
            className="text-emerald-400 font-semibold hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};
