import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerProfile } from '../../types';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CreditCard, 
  IndianRupee,
  CheckCircle2,
  Package,
  Sparkles
} from 'lucide-react';

export const CustomerCart: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    placeOrder, 
    currentUser, 
    customers,
    setActiveCustomerTab 
  } = useApp();

  const currentCustomer = (currentUser as CustomerProfile) || customers[0];

  // Checkout modal/view state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentCustomer?.deliveryAddress || 'Flat 402, Sai Heritage, College Road, Nashik 422005'
  );
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cash on Delivery' | 'Card'>('UPI');
  const [orderPlacedSuccessId, setOrderPlacedSuccessId] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) return;

    const newOrder = placeOrder(deliveryAddress, paymentMethod);
    if (newOrder) {
      setOrderPlacedSuccessId(newOrder.id);
    }
  };

  if (orderPlacedSuccessId) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-xl text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Confirmed Direct from Farm
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-2 font-display">
            Order #{orderPlacedSuccessId} Placed!
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
            The farmer has been notified to harvest and pack your fresh produce. Delivery partner assignment is initiated.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-stone-500">Total Paid:</span>
            <span className="font-bold text-stone-900">₹{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Payment Mode:</span>
            <span className="font-medium text-stone-700">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Destination:</span>
            <span className="font-medium text-stone-700 truncate max-w-xs">{deliveryAddress}</span>
          </div>
          <div className="pt-2 border-t border-stone-200 flex justify-between text-emerald-800 font-bold">
            <span>Estimated Delivery:</span>
            <span>Today, within 2-3 hours</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => {
              setOrderPlacedSuccessId(null);
              setIsCheckingOut(false);
              setActiveCustomerTab('orders');
            }}
            className="w-full sm:flex-1 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow transition-colors flex items-center justify-center gap-2"
          >
            <span>Track Order Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setOrderPlacedSuccessId(null);
              setIsCheckingOut(false);
              setActiveCustomerTab('marketplace');
            }}
            className="w-full sm:w-auto px-4 py-3 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !isCheckingOut) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center max-w-lg mx-auto shadow-sm">
        <ShoppingCart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-stone-900 font-display">Your Basket is Empty</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
          Explore harvest-ready vegetables, fruits, and grains listed directly by local farmers.
        </p>
        <button
          onClick={() => setActiveCustomerTab('marketplace')}
          className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Farm Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Shopping Cart ({cart.length} unique produce)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Produce will be harvested and bundled directly from farm plots.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-red-600 transition-colors"
        >
          Empty Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cart Item Rows */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-100 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-stone-900 truncate">{item.product.name}</h3>
                  <p className="text-xs text-stone-500">
                    Farmer: <span className="font-medium text-stone-700">{item.product.farmerName}</span> ({item.product.district})
                  </p>
                  <p className="text-xs font-semibold text-teal-800 mt-0.5">
                    ₹{item.product.price} / {item.product.unit}
                  </p>
                </div>
              </div>

              {/* Quantity and Subtotal */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2 bg-stone-50 p-1 rounded-xl border border-stone-200">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-lg bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-xs text-stone-900 min-w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    disabled={item.quantity >= item.product.quantity}
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-lg bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right min-w-16">
                  <span className="text-sm font-extrabold text-stone-900">
                    ₹{item.product.price * item.quantity}
                  </span>
                  <span className="text-[10px] text-stone-400 block">{item.quantity} {item.product.unit}</span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary / Checkout Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5 h-fit">
          <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
            Order & Delivery Summary
          </h3>

          <div className="space-y-2.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Produce Subtotal:</span>
              <span className="font-bold text-stone-900">₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-400" />
                Direct Farm Logistics Fee:
              </span>
              <span className="font-semibold text-stone-800">₹{deliveryFee}</span>
            </div>

            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Middlemen Commission Bypassed:</span>
              <span>-₹0 (Zero Cut)</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-extrabold text-stone-900">
              <span>Total Payable:</span>
              <span className="text-teal-800 font-display">₹{total}</span>
            </div>
          </div>

          {/* Delivery & Payment Selection */}
          <form onSubmit={handlePlaceOrder} className="space-y-4 pt-3 border-t border-stone-100">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                Delivery Address
              </label>
              <textarea
                rows={2}
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="House/Apartment, Street name, Area, City, Pincode"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-teal-700" />
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['UPI', 'Cash on Delivery', 'Card'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      paymentMethod === method
                        ? 'border-teal-700 bg-teal-50 text-teal-900 font-bold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Place Order (₹{total})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="p-3 rounded-xl bg-stone-50 text-[11px] text-stone-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed fresh. Produce harvested within 24h of dispatch.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
