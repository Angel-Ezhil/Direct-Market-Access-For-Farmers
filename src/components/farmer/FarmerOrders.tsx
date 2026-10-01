import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Truck, 
  AlertCircle,
  IndianRupee,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';

export const FarmerOrders: React.FC = () => {
  const { orders, currentUser, confirmOrderByFarmer } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const currentFarmerId = currentUser?.id || 'farmer-1';
  const myOrders = orders.filter(o => o.farmerId === currentFarmerId || o.farmerName === (currentUser?.name || 'Suresh Patel'));

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'ORDER_PLACED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            Action Required: Confirm Order
          </span>
        );
      case 'FARMER_CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed · Awaiting Dispatch
          </span>
        );
      case 'DELIVERY_ASSIGNED':
      case 'ACCEPTED_BY_DELIVERY':
      case 'GOING_TO_FARM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" />
            Delivery Boy Heading to Farm
          </span>
        );
      case 'PRODUCT_PICKED_UP':
      case 'OUT_FOR_DELIVERY':
      case 'ARRIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" />
            In Transit to Customer
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered · Funds Credited
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Incoming Farm Orders
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review customer orders, confirm crop harvest availability, and hand over produce to assigned delivery partners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold">
            Total Orders: {myOrders.length}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {myOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No orders received yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              When customers order your farm produce from the Marketplace, their orders will appear here immediately.
            </p>
          </div>
        ) : (
          myOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-start gap-4">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                        #{order.id}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <h3 className="text-base font-bold text-stone-900">{order.productName}</h3>
                    <p className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                      <span>Quantity: <strong className="text-stone-800">{order.quantity} {order.unit}</strong></span>
                      <span>·</span>
                      <span>Rate: ₹{order.unitPrice}/{order.unit}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-bold">Sale: ₹{order.subtotal}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:self-center">
                  {order.status === 'ORDER_PLACED' && (
                    <button
                      onClick={() => confirmOrderByFarmer(order.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Order Availability</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Order Meta Footer */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>Customer: <strong className="text-stone-800">{order.customerName}</strong> ({order.customerPhone})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span className="truncate">Destination: {order.deliveryAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    Partner:{' '}
                    <strong className="text-stone-800">
                      {order.assignedDeliveryBoyName || 'Awaiting assignment'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                Order #{selectedOrder.id} Details
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-stone-400 uppercase font-bold">Current Status</p>
                  <p className="font-bold text-stone-900 mt-0.5">{selectedOrder.status}</p>
                </div>
                {selectedOrder.status === 'ORDER_PLACED' && (
                  <button
                    onClick={() => {
                      confirmOrderByFarmer(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs"
                  >
                    Confirm Now
                  </button>
                )}
              </div>

              <div>
                <p className="font-bold text-stone-800 mb-1">Produce Information</p>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedOrder.productImage}
                    alt={selectedOrder.productName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-stone-900">{selectedOrder.productName}</p>
                    <p className="text-stone-500">
                      {selectedOrder.quantity} {selectedOrder.unit} @ ₹{selectedOrder.unitPrice}/{selectedOrder.unit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-3">
                <p className="font-bold text-stone-800 mb-1">Customer & Delivery</p>
                <p className="text-stone-600">Name: {selectedOrder.customerName}</p>
                <p className="text-stone-600">Phone: {selectedOrder.customerPhone}</p>
                <p className="text-stone-600">Address: {selectedOrder.deliveryAddress}</p>
              </div>

              <div className="border-t border-stone-100 pt-3 flex justify-between font-bold text-sm text-stone-900">
                <span>Farmer Payout:</span>
                <span className="text-emerald-700">₹{selectedOrder.subtotal}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
