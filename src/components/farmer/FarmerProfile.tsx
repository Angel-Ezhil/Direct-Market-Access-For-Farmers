import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FarmerProfile as IFarmerProfile } from '../../types';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Wheat, 
  ShieldCheck, 
  Star, 
  Building, 
  Check, 
  Award,
  Calendar
} from 'lucide-react';

export const FarmerProfile: React.FC = () => {
  const { currentUser, farmers } = useApp();
  const currentFarmer = (currentUser as IFarmerProfile) || farmers[0];

  const [farmName, setFarmName] = useState(currentFarmer.farmName);
  const [primaryCrop, setPrimaryCrop] = useState(currentFarmer.primaryCrop);
  const [farmLocation, setFarmLocation] = useState(currentFarmer.farmLocation);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <img
          src={currentFarmer.profileImage}
          alt={currentFarmer.name}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0"
        />

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 font-display">
                {currentFarmer.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-800 font-semibold flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                {currentFarmer.farmName}
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Producer</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {currentFarmer.district}, Maharashtra
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              {currentFarmer.rating} Rating (48 reviews)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              Member since {currentFarmer.joinedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Farm Details Form */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center justify-between">
          <span>Farm Credentials & Operational Details</span>
          {savedMessage && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-4 h-4" /> Changes saved
            </span>
          )}
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Registered Farm Name</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Crops Grown</label>
              <input
                type="text"
                value={primaryCrop}
                onChange={(e) => setPrimaryCrop(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Phone</label>
              <input
                type="text"
                disabled
                value={currentFarmer.phone}
                className="w-full px-3 py-2 rounded-xl bg-stone-100 border border-stone-300 text-xs sm:text-sm text-stone-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
              <input
                type="text"
                disabled
                value={currentFarmer.email}
                className="w-full px-3 py-2 rounded-xl bg-stone-100 border border-stone-300 text-xs sm:text-sm text-stone-500 cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">Farm Pickup Address & Land Coordinates</label>
              <input
                type="text"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
