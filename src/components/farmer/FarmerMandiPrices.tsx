import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  MapPin, 
  Calendar, 
  Info, 
  Filter 
} from 'lucide-react';

export const FarmerMandiPrices: React.FC = () => {
  const { mandiPrices } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const filteredPrices = mandiPrices.filter(item => {
    const matchesSearch = 
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mandi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            National APMC Electronic Ticker (e-NAM Benchmark)
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Live Mandi Prices & Market Trends
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Official daily modal price reports to help you price your farm harvest competitively and avoid distressed sales.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Calendar className="w-4 h-4 text-stone-400" />
          <span>Updated: Today, 30 Sep 2026</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search crop, mandi or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-700 focus:outline-none focus:border-emerald-600 w-full sm:w-auto"
          >
            <option value="All">All States</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Haryana">Haryana</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>
      </div>

      {/* Mandi Price Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500 border-b border-stone-200 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Commodity & Variety</th>
                <th className="py-3.5 px-4">Mandi & District</th>
                <th className="py-3.5 px-4">Min Price</th>
                <th className="py-3.5 px-4">Max Price</th>
                <th className="py-3.5 px-4">Modal Price (Benchmark)</th>
                <th className="py-3.5 px-4">Daily Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredPrices.map(item => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-stone-900 text-sm">{item.commodity}</p>
                    <p className="text-[11px] text-stone-500">{item.variety}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-stone-800">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.mandi}</span>
                    </div>
                    <span className="text-[11px] text-stone-400">{item.district}, {item.state}</span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-stone-600">
                    ₹{item.minPrice} <span className="text-[10px] text-stone-400">{item.unit}</span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-stone-600">
                    ₹{item.maxPrice} <span className="text-[10px] text-stone-400">{item.unit}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 inline-block">
                      ₹{item.modalPrice} <span className="text-[10px] font-normal text-emerald-800">{item.unit}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {item.trend === 'up' && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        +{item.changePercent}%
                      </span>
                    )}
                    {item.trend === 'down' && (
                      <span className="inline-flex items-center gap-1 text-red-600 font-bold">
                        <TrendingDown className="w-3.5 h-3.5" />
                        {item.changePercent}%
                      </span>
                    )}
                    {item.trend === 'stable' && (
                      <span className="inline-flex items-center gap-1 text-stone-500 font-medium">
                        <Minus className="w-3.5 h-3.5" />
                        Stable
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-stone-50/60 border-t border-stone-200 flex items-center gap-2 text-xs text-stone-500">
          <Info className="w-4 h-4 text-stone-400 shrink-0" />
          <span>
            Note: On <strong>Direct Market Access</strong>, farmers sell directly to retail consumers and typically achieve 25% to 40% higher realization than APMC wholesale modal rates by eliminating intermediary cuts.
          </span>
        </div>
      </div>
    </div>
  );
};
