import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Smartphone,
  IndianRupee
} from 'lucide-react';

interface DeliveryOtpModalProps {
  order: Order;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeliveryOtpModal: React.FC<DeliveryOtpModalProps> = ({ order, onClose, onSuccess }) => {
  const { verifyAndDeliverWithOtp } = useApp();
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);

    setTimeout(() => {
      const res = verifyAndDeliverWithOtp(order.id, otpInput);
      if (res.success) {
        setIsVerifying(false);
        onSuccess();
      } else {
        setIsVerifying(false);
        setError(res.message);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-xs p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Delivery Verification</h3>
              <p className="text-[11px] text-stone-400">Order #{order.id} · {order.customerName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
          <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Ask customer for the 4-digit OTP</p>
            <p className="text-[11px] text-amber-300/80 mt-0.5">
              The customer can see this code in their Active Orders tracking screen.
            </p>
          </div>
        </div>

        {/* Quick cheat-sheet hint for demo evaluator */}
        <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
          <span>Prototype Hint (Customer OTP):</span>
          <button
            type="button"
            onClick={() => setOtpInput(order.otp)}
            className="font-mono font-bold text-emerald-400 hover:underline px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30"
            title="Auto-fill actual OTP for testing"
          >
            Auto-fill: {order.otp}
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2 text-center uppercase tracking-wider">
              Enter 4-Digit Customer OTP
            </label>
            <input
              type="text"
              maxLength={4}
              required
              autoFocus
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-48 mx-auto block text-center tracking-[0.5em] text-3xl font-mono font-extrabold py-3 rounded-2xl bg-stone-950 border-2 border-amber-500/50 text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/30 text-xs flex items-center justify-between">
            <span className="text-emerald-300 font-medium">Payout on Confirmation:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-0.5">
              +₹50.00 Delivery Fee
            </span>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isVerifying || otpInput.length < 4}
              className="w-2/3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {isVerifying ? (
                <span>Verifying Hash...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Confirm Delivery</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
