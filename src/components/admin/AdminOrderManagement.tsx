import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { 
  Package, 
  Search, 
  Eye, 
  MapPin, 
  Calendar, 
  Truck, 
  IndianRupee,
  X
} from 'lucide-react';

export const AdminOrderManagement: React.FC = () => {
  const { orders } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Centralized Order Ledger
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time audit log of all direct marketplace transactions, payments, and delivery statuses.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search Order ID, customer, farmer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500 border-b border-stone-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Farmer</th>
                <th className="py-3 px-4">Delivery Partner</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Delivery Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-stone-900">#{order.id}</td>
                  <td className="py-3 px-4 font-medium text-stone-800">{order.customerName}</td>
                  <td className="py-3 px-4 font-medium text-stone-800">{order.farmerName}</td>
                  <td className="py-3 px-4 text-stone-600">
                    {order.assignedDeliveryBoyName || <span className="text-amber-600 font-medium">Unassigned</span>}
                  </td>
                  <td className="py-3 px-4 font-extrabold text-stone-900">₹{order.totalAmount}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {order.paymentStatus} ({order.paymentMethod})
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      order.status === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setInspectedOrder(order)}
                      className="p-1 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                      title="Inspect order"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {inspectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900">
                Inspect Transaction #{inspectedOrder.id}
              </h3>
              <button
                onClick={() => setInspectedOrder(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-stone-50">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Status</span>
                  <span className="font-bold text-stone-900">{inspectedOrder.status}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">OTP Hash</span>
                  <span className="font-mono font-bold text-amber-600">{inspectedOrder.otp}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p><strong className="text-stone-900">Item: </strong> {inspectedOrder.productName} ({inspectedOrder.quantity} {inspectedOrder.unit})</p>
                <p><strong className="text-stone-900">Farmer: </strong> {inspectedOrder.farmerName} ({inspectedOrder.district})</p>
                <p><strong className="text-stone-900">Customer: </strong> {inspectedOrder.customerName} ({inspectedOrder.customerPhone})</p>
                <p><strong className="text-stone-900">Destination: </strong> {inspectedOrder.deliveryAddress}</p>
                <p><strong className="text-stone-900">Partner: </strong> {inspectedOrder.assignedDeliveryBoyName || 'None assigned yet'}</p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900">
                <span>Total Amount:</span>
                <span className="text-teal-800 text-sm">₹{inspectedOrder.totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => setInspectedOrder(null)}
              className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
