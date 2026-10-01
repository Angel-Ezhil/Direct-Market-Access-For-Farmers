import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { 
  Truck, 
  UserCheck, 
  MapPin, 
  Check, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AdminDeliveryManagement: React.FC = () => {
  const { orders, deliveryPartners, assignDeliveryPartner } = useApp();

  const [selectedPartnerId, setSelectedPartnerId] = useState<Record<string, string>>({});
  const [assignSuccess, setAssignSuccess] = useState<string | null>(null);

  // Orders waiting for delivery assignment (e.g. FARMER_CONFIRMED or ORDER_PLACED)
  const pendingOrders = orders.filter(
    o => o.status === 'FARMER_CONFIRMED' || (o.status === 'ORDER_PLACED' && !o.assignedDeliveryBoyId)
  );

  const activeDeliveries = orders.filter(
    o => o.assignedDeliveryBoyId && o.status !== 'DELIVERED' && o.status !== 'CANCELLED'
  );

  const completedDeliveries = orders.filter(o => o.status === 'DELIVERED');

  const handleAssign = (orderId: string) => {
    const partnerId = selectedPartnerId[orderId] || deliveryPartners[0]?.id;
    if (!partnerId) return;

    assignDeliveryPartner(orderId, partnerId);
    setAssignSuccess(`Delivery partner assigned to Order #${orderId}`);
    setTimeout(() => setAssignSuccess(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Delivery Operations & Fleet Dispatch Control
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Assign delivery partners to confirmed farm orders, monitor live en-route transit, and track OTP completion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200">
            {deliveryPartners.filter(d => d.status === 'available').length} Partners Online & Ready
          </span>
        </div>
      </div>

      {/* Success Alert */}
      {assignSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{assignSuccess}</span>
        </div>
      )}

      {/* Pending Dispatch Section (Requires Admin Action) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-base font-bold text-stone-900">
              Orders Pending Dispatch Assignment ({pendingOrders.length})
            </h3>
          </div>
          <span className="text-xs text-stone-500">Requires fleet coordinator assignment</span>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-400 bg-stone-50 rounded-xl border border-stone-100">
            All confirmed farm orders are currently dispatched. New customer orders will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingOrders.map(order => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-xs text-stone-900">#{order.id}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {order.status === 'FARMER_CONFIRMED' ? 'Farmer Harvest Confirmed' : 'Order Placed'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-stone-900">{order.productName}</p>
                  <p className="text-xs text-stone-600">
                    Pickup: <strong className="text-stone-800">{order.farmerName}</strong> ({order.district}) → Customer: <strong className="text-stone-800">{order.customerName}</strong>
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Quantity: {order.quantity} {order.unit} · Total: ₹{order.totalAmount}</p>
                </div>

                {/* Assignment Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={selectedPartnerId[order.id] || deliveryPartners[0]?.id}
                    onChange={(e) => setSelectedPartnerId({ ...selectedPartnerId, [order.id]: e.target.value })}
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 focus:outline-none focus:border-stone-900"
                  >
                    {deliveryPartners.map(partner => (
                      <option key={partner.id} value={partner.id}>
                        {partner.name} ({partner.vehicleType} - {partner.district})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleAssign(order.id)}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs shadow-xs transition-colors whitespace-nowrap"
                  >
                    Assign Delivery Partner
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active En-Route Deliveries */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-purple-600" />
          Active En-Route Deliveries ({activeDeliveries.length})
        </h3>

        {activeDeliveries.length === 0 ? (
          <div className="py-6 text-center text-xs text-stone-400">
            No orders currently in transit.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {activeDeliveries.map(order => (
              <div key={order.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">#{order.id}</span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold text-[10px]">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="font-semibold text-stone-800 mt-1">{order.productName}</p>
                  <p className="text-stone-500">
                    Partner: <strong className="text-stone-900">{order.assignedDeliveryBoyName}</strong> ({order.vehicleInfo || 'Motorcycle'})
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-stone-500">Drop Address:</span>
                  <p className="font-medium text-stone-800 truncate max-w-xs">{order.deliveryAddress}</p>
                  <span className="text-[11px] text-amber-700 font-bold block mt-0.5">
                    Customer OTP: {order.otp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
