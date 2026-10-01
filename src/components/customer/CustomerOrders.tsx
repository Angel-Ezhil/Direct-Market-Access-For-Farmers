import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Truck, 
  Star, 
  ShieldAlert, 
  ChevronRight, 
  Phone, 
  Key, 
  Check, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export const CustomerOrders: React.FC = () => {
  const { orders, currentUser, submitOrderReview, submitComplaint } = useApp();
  
  const [filterTab, setFilterTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('Farm produce was exceptionally fresh and arrived crisp!');

  const [complaintOrder, setComplaintOrder] = useState<Order | null>(null);
  const [complaintType, setComplaintType] = useState<any>('Late Delivery');
  const [complaintText, setComplaintText] = useState('');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  const currentCustomerId = currentUser?.id || 'cust-1';
  const myOrders = orders.filter(o => o.customerId === currentCustomerId || o.customerName === (currentUser?.name || 'Priya Sharma'));

  const activeOrders = myOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const completedOrders = myOrders.filter(o => o.status === 'DELIVERED');
  const cancelledOrders = myOrders.filter(o => o.status === 'CANCELLED');

  const displayedOrders = 
    filterTab === 'active' ? activeOrders :
    filterTab === 'completed' ? completedOrders :
    cancelledOrders;

  // Timeline Steps
  const timelineSteps = [
    { key: 'ORDER_PLACED', label: 'Order Placed' },
    { key: 'FARMER_CONFIRMED', label: 'Farmer Confirmed' },
    { key: 'PRODUCT_PICKED_UP', label: 'Product Collected' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { key: 'DELIVERED', label: 'Delivered' }
  ];

  const getStepStatus = (orderStatus: OrderStatus, stepKey: string) => {
    const statusOrder = [
      'ORDER_PLACED',
      'FARMER_CONFIRMED',
      'DELIVERY_ASSIGNED',
      'ACCEPTED_BY_DELIVERY',
      'GOING_TO_FARM',
      'PRODUCT_PICKED_UP',
      'OUT_FOR_DELIVERY',
      'ARRIVED',
      'DELIVERED'
    ];

    const currentIndex = statusOrder.indexOf(orderStatus);

    if (stepKey === 'ORDER_PLACED') {
      return currentIndex >= 0 ? 'completed' : 'pending';
    }
    if (stepKey === 'FARMER_CONFIRMED') {
      return currentIndex >= 1 ? 'completed' : 'pending';
    }
    if (stepKey === 'PRODUCT_PICKED_UP') {
      return currentIndex >= 5 ? 'completed' : currentIndex >= 2 ? 'active' : 'pending';
    }
    if (stepKey === 'OUT_FOR_DELIVERY') {
      return currentIndex >= 6 ? 'completed' : currentIndex === 5 ? 'active' : 'pending';
    }
    if (stepKey === 'DELIVERED') {
      return currentIndex >= 8 ? 'completed' : currentIndex >= 6 ? 'active' : 'pending';
    }
    return 'pending';
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewOrder) return;
    submitOrderReview(reviewOrder.id, reviewRating, reviewComment);
    setReviewOrder(null);
  };

  const handleSaveComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintOrder || !complaintText.trim()) return;
    submitComplaint(complaintOrder.id, complaintType, complaintText);
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintSubmitted(false);
      setComplaintOrder(null);
      setComplaintText('');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            My Farm Orders & Tracking
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time live progress tracking from the local field to your kitchen.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterTab('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === 'active' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === 'completed' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Delivered ({completedOrders.length})
          </button>
          <button
            onClick={() => setFilterTab('cancelled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === 'cancelled' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Cancelled ({cancelledOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {displayedOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No {filterTab} orders found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Your farm-fresh orders and live delivery tracking will appear here.
            </p>
          </div>
        ) : (
          displayedOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-6"
            >
              {/* Order Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-start gap-4">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                        #{order.id}
                      </span>
                      <span className="text-xs text-stone-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-stone-900">{order.productName}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Farmer: <strong className="text-stone-800">{order.farmerName}</strong> ({order.district})
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-lg font-extrabold text-teal-800">
                    ₹{order.totalAmount}
                  </div>
                  <span className="text-[11px] text-stone-400 block">
                    {order.quantity} {order.unit} · {order.paymentMethod} ({order.paymentStatus})
                  </span>
                </div>
              </div>

              {/* Delivery OTP & Partner Banner for Active Orders */}
              {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-amber-900">
                    <Key className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold block">Delivery Verification OTP:</span>
                      <span className="text-[11px] text-amber-800">
                        Share this code with delivery partner upon doorstep arrival to complete verification:
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 rounded-xl bg-amber-600 text-white font-mono font-extrabold text-base tracking-widest shadow-xs text-center">
                    {order.otp}
                  </div>
                </div>
              )}

              {/* Visual 5-Step Tracking Timeline */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
                  Live Dispatch & Delivery Timeline
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
                  {timelineSteps.map((step, idx) => {
                    const status = getStepStatus(order.status, step.key);
                    return (
                      <div key={step.key} className="flex flex-col items-center text-center p-2 rounded-xl">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                            status === 'completed'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : status === 'active'
                              ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                              : 'bg-stone-100 text-stone-400 border border-stone-200'
                          }`}
                        >
                          {status === 'completed' ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-xs font-semibold leading-tight ${
                            status === 'completed'
                              ? 'text-emerald-900'
                              : status === 'active'
                              ? 'text-amber-800 font-bold'
                              : 'text-stone-400'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Logistics & Address Info */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div>
                  <span className="font-bold text-stone-900 block mb-0.5">Delivery Address:</span>
                  <p className="flex items-start gap-1.5 text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{order.deliveryAddress}</span>
                  </p>
                </div>

                <div>
                  <span className="font-bold text-stone-900 block mb-0.5">Assigned Logistics Partner:</span>
                  <p className="flex items-center gap-1.5 text-stone-600">
                    <Truck className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>
                      {order.assignedDeliveryBoyName 
                        ? `${order.assignedDeliveryBoyName} (${order.vehicleInfo || 'Express'}) · ${order.deliveryBoyPhone || ''}`
                        : 'Dispatch coordinator assigning local partner...'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Card Actions (Review & Complaints) */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                <span className="text-xs text-stone-500">
                  Estimated Delivery: <strong className="text-stone-800">{order.estimatedDeliveryTime}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {order.status === 'DELIVERED' && (
                    <>
                      {order.review ? (
                        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                          <span>Rated {order.review.rating}/5</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReviewOrder(order)}
                          className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>Leave Review</span>
                        </button>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => setComplaintOrder(order)}
                    className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold flex items-center gap-1"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />
                    <span>Raise Concern</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {reviewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              Rate Order #{reviewOrder.id}
            </h3>
            <p className="text-xs text-stone-500">
              How was the freshness of <strong className="text-stone-800">{reviewOrder.productName}</strong> from farmer {reviewOrder.farmerName}?
            </p>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= reviewRating
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-teal-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewOrder(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Modal */}
      {complaintOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>Report Issue on Order #{complaintOrder.id}</span>
            </h3>

            {complaintSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Complaint registered! Admin team has been notified for resolution.</span>
              </div>
            ) : (
              <form onSubmit={handleSaveComplaint} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Issue Category</label>
                  <select
                    value={complaintType}
                    onChange={(e) => setComplaintType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-teal-700"
                  >
                    <option value="Wrong Product">Wrong Product</option>
                    <option value="Damaged Product">Damaged Product</option>
                    <option value="Missing Quantity">Missing Quantity</option>
                    <option value="Late Delivery">Late Delivery</option>
                    <option value="Delivery Issue">Delivery Issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Details of Concern</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the issue with the produce or delivery..."
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setComplaintOrder(null)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Submit Issue to Admin
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
