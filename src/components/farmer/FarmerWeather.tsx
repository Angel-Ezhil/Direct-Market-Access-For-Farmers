import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sun, 
  Compass, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Sparkles
} from 'lucide-react';

export const FarmerWeather: React.FC = () => {
  const forecastDays = [
    { day: 'Today (Wed)', date: '30 Sep', temp: '29°C / 21°C', condition: 'Partly Cloudy', rainChance: '15%', sprayCondition: 'Optimal' },
    { day: 'Tomorrow (Thu)', date: '01 Oct', temp: '30°C / 20°C', condition: 'Sunny & Clear', rainChance: '5%', sprayCondition: 'Optimal' },
    { day: 'Friday', date: '02 Oct', temp: '28°C / 22°C', condition: 'Scattered Showers', rainChance: '65%', sprayCondition: 'Avoid Spray' },
    { day: 'Saturday', date: '03 Oct', temp: '27°C / 21°C', condition: 'Moderate Rain', rainChance: '70%', sprayCondition: 'Avoid Spray' },
    { day: 'Sunday', date: '04 Oct', temp: '29°C / 20°C', condition: 'Clear Skies', rainChance: '10%', sprayCondition: 'Optimal' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <CloudSun className="w-4 h-4 text-emerald-600" />
            Micro-Agro Climate Station · Nashik District
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Field Weather & Spray Advisory
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time agro-meteorological indices calculated for solanaceous and horticultural crops.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Optimal Spray Window: Today 06:30 AM - 10:30 AM</span>
        </div>
      </div>

      {/* Current Conditions Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-emerald-100 block">Current Temperature</span>
            <span className="text-3xl font-extrabold font-display">28.4°C</span>
            <p className="text-[11px] text-emerald-100 mt-1">Feels like 30°C · High: 31°C</p>
          </div>
          <Sun className="w-12 h-12 text-yellow-300 opacity-90 stroke-1" />
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-stone-500 block">Relative Humidity</span>
            <span className="text-3xl font-bold text-stone-900 font-display">64%</span>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Low fungal risk window</p>
          </div>
          <Droplets className="w-10 h-10 text-blue-500 opacity-80 stroke-1" />
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-stone-500 block">Wind Velocity</span>
            <span className="text-3xl font-bold text-stone-900 font-display">8 km/h</span>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Safe for drone/knapsack spray</p>
          </div>
          <Wind className="w-10 h-10 text-teal-500 opacity-80 stroke-1" />
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-stone-500 block">Soil Moisture (15cm)</span>
            <span className="text-3xl font-bold text-stone-900 font-display">42%</span>
            <p className="text-[11px] text-stone-500 mt-1">Drip irrigation recommended in 24h</p>
          </div>
          <Thermometer className="w-10 h-10 text-amber-500 opacity-80 stroke-1" />
        </div>
      </div>

      {/* 5-Day Agricultural Advisory Forecast */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          5-Day Field Operational Forecast & Spray Advisory
        </h3>

        <div className="divide-y divide-stone-100">
          {forecastDays.map((day, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="w-36">
                <p className="font-bold text-stone-900">{day.day}</p>
                <p className="text-[11px] text-stone-400">{day.date}</p>
              </div>

              <div className="flex items-center gap-2 w-32">
                <CloudSun className="w-4 h-4 text-stone-500" />
                <span className="text-stone-700 font-medium">{day.condition}</span>
              </div>

              <div className="w-28">
                <span className="font-bold text-stone-900">{day.temp}</span>
              </div>

              <div className="w-28 text-stone-600">
                Rain: <strong className={day.rainChance === '5%' ? 'text-stone-700' : 'text-blue-600'}>{day.rainChance}</strong>
              </div>

              <div>
                {day.sprayCondition === 'Optimal' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    Ideal Spray Day
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold">
                    <AlertCircle className="w-3 h-3" />
                    Postpone Spraying (Rain)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
