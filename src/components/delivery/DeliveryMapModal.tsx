import React, { useState } from 'react';
import { Order } from '../../types';
import { 
  MapPin, 
  Truck, 
  Navigation, 
  Phone, 
  Clock, 
  Compass, 
  X, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface DeliveryMapModalProps {
  order: Order;
  onClose: () => void;
  onAdvanceStatus?: () => void;
}

export const DeliveryMapModal: React.FC<DeliveryMapModalProps> = ({ order, onClose, onAdvanceStatus }) => {
  const [navigating, setNavigating] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full text-white shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Top Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Truck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm text-white">Live Route Navigation · Order #{order.id}</h3>
              <p className="text-[11px] text-stone-400">{order.productName} ({order.quantity} {order.unit})</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map Canvas / Simulated GIS Route Display */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden border-b border-stone-800 flex items-center justify-center">
          {/* Simulated Map Grid Lines */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Simulated Road Paths SVG */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Road lines */}
            <path
              d="M 60,180 Q 150,110 260,120 T 480,70"
              fill="none"
              stroke="#334155"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Active GPS Route */}
            <path
              d="M 60,180 Q 150,110 260,120 T 480,70"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="6 6"
              className={navigating ? "animate-[dash_1s_linear_infinite]" : ""}
            />
          </svg>

          {/* Point A: Farm Location Marker */}
          <div className="absolute left-8 bottom-12 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/60 ring-4 ring-emerald-500/20 animate-bounce">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-stone-900/90 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
              📍 PICKUP: {order.farmerName}
            </span>
          </div>

          {/* Delivery Boy Vehicle Indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="p-2.5 rounded-full bg-amber-500 text-stone-950 font-bold shadow-xl shadow-amber-500/30 ring-4 ring-amber-400/30">
              <Truck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-amber-950/90 text-[10px] font-bold text-amber-300 border border-amber-500/40">
              🚚 You: 4.2 km to drop
            </span>
          </div>

          {/* Point B: Customer Destination Marker */}
          <div className="absolute right-8 top-10 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-900/60 ring-4 ring-sky-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-stone-900/90 text-[10px] font-bold text-sky-400 border border-sky-500/30 whitespace-nowrap">
              📍 DROP: {order.customerName}
            </span>
          </div>

          {/* Live Speed / Compass Badge */}
          <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>34 km/h · ETA: 14 mins</span>
          </div>
        </div>

        {/* Route Details Panel */}
        <div className="p-5 space-y-4 text-xs">
          {/* Stops List */}
          <div className="space-y-3 relative pl-6 border-l-2 border-stone-800 ml-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">1. Farm Pickup Site</span>
              <p className="font-semibold text-white text-sm">{order.farmerName}</p>
              <p className="text-stone-400 text-[11px]">{order.farmLocation || 'Farm Site 1'}, {order.district}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-sky-400 block">2. Customer Delivery Point</span>
              <p className="font-semibold text-white text-sm">{order.customerName}</p>
              <p className="text-stone-400 text-[11px]">{order.deliveryAddress}</p>
            </div>
          </div>

          {/* Direct Communication Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${order.farmerPhone}`}
              className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-stone-700"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Farmer</span>
            </a>

            <a
              href={`tel:${order.customerPhone}`}
              className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-stone-700"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>Call Customer</span>
            </a>
          </div>

          {/* Navigation Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setNavigating(!navigating)}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4 fill-white" />
              <span>{navigating ? 'Pause GPS Voice Guidance' : 'Start Google Maps Turn-by-Turn'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
