import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { 
  Package, 
  Search, 
  Trash2, 
  CheckCircle, 
  Ban, 
  MapPin, 
  IndianRupee, 
  Filter 
} from 'lucide-react';

export const AdminProductManagement: React.FC = () => {
  const { products, updateProduct, deleteProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filtered = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Produce Quality & Catalog Oversight
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review listed agricultural produce, approve farm offerings, and moderate listings for marketplace safety.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700">
          Total Products: {products.length}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by produce, farmer, district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-800 focus:outline-none focus:border-stone-900"
            >
              <option value="All">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500 border-b border-stone-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Produce</th>
                <th className="py-3 px-4">Farmer</th>
                <th className="py-3 px-4">Price / Unit</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-9 h-9 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-stone-900">{product.name}</p>
                        <p className="text-[11px] text-stone-400">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-stone-800">{product.farmerName}</td>
                  <td className="py-3 px-4 font-bold text-stone-900">₹{product.price} / {product.unit}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${product.quantity < 15 ? 'text-amber-600' : 'text-stone-800'}`}>
                      {product.quantity} {product.unit}
                    </span>
                  </td>
                  <td className="py-3 px-4">{product.district}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      product.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {product.status !== 'approved' ? (
                      <button
                        onClick={() => updateProduct(product.id, { status: 'approved' })}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => updateProduct(product.id, { status: 'suspended' })}
                        className="text-xs font-semibold text-amber-700 hover:underline"
                      >
                        Suspend
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${product.name}?`)) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
