import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  AlertTriangle, 
  Plus, 
  Minus, 
  ArrowUpDown, 
  CheckCircle2, 
  IndianRupee 
} from 'lucide-react';

export const FarmerStock: React.FC = () => {
  const { products, currentUser, updateProduct } = useApp();

  const currentFarmerId = currentUser?.id || 'farmer-1';
  const myProducts = products.filter(p => p.farmerId === currentFarmerId || p.farmerName === (currentUser?.name || 'Suresh Patel'));

  const totalStockKg = myProducts.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = myProducts.filter(p => p.quantity < 20).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Live Stock & Inventory Control
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time synchronization prevents customers from ordering quantities exceeding your physical farm stock.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Total In Stock</span>
            <span className="text-lg font-bold text-stone-900">{totalStockKg} Units</span>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Low Stock Alerts</span>
            <span className={`text-lg font-bold ${lowStockCount > 0 ? 'text-amber-600' : 'text-emerald-700'}`}>
              {lowStockCount} Items
            </span>
          </div>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProducts.map(product => {
          const percentRemaining = Math.min(100, Math.round((product.quantity / (product.initialQuantity || 100)) * 100));
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-stone-900 truncate">{product.name}</h3>
                  <p className="text-xs text-stone-500">{product.category} · {product.district}</p>
                  <p className="text-xs font-semibold text-emerald-700 mt-1">₹{product.price} / {product.unit}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-500">Stock Availability:</span>
                  <span className="font-bold text-stone-900">
                    {product.quantity} / {product.initialQuantity || 100} {product.unit}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      product.quantity < 20 ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${percentRemaining}%` }}
                  />
                </div>
              </div>

              {/* Quick Stock Controls */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-600">Quick Adjust</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateProduct(product.id, { quantity: Math.max(0, product.quantity - 10) })}
                    className="w-8 h-8 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs"
                    title="Decrease by 10"
                  >
                    -10
                  </button>
                  <span className="font-bold text-sm text-stone-900 min-w-12 text-center">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => updateProduct(product.id, { quantity: product.quantity + 10 })}
                    className="w-8 h-8 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs"
                    title="Increase by 10"
                  >
                    +10
                  </button>
                </div>
              </div>

              {product.quantity < 20 ? (
                <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Low stock: Consider harvesting or updating inventory.</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Healthy stock available for immediate checkout.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
