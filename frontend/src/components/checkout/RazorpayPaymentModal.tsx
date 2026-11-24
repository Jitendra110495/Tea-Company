import React, { useState } from 'react';
import { QrCode, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RazorpayPaymentModalProps {
  amount: number;
  paymentMethod: string;
  onSuccess: (paymentId: string, paymentMethodName: string) => void;
  onCancel: () => void;
}

export const RazorpayPaymentModal: React.FC<RazorpayPaymentModalProps> = ({
  amount,
  paymentMethod,
  onSuccess,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiVpa, setUpiVpa] = useState('priya@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8891');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti failed:', e);
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      triggerConfetti();
      onSuccess(`pay_${Math.random().toString(36).substring(2, 12)}`, `Razorpay (${paymentMethod})`);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      {/* Authentic Razorpay Style Popup */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-200">
        
        {/* Razorpay Blue Header */}
        <div className="bg-[#0c2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">The Tea Story</h3>
              <p className="text-[11px] text-blue-200">Razorpay Verified Merchant</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-blue-200 uppercase block">Amount Payable</span>
            <span className="text-xl font-bold text-[#00d285]">
              ₹{amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Payment Body */}
        <div className="p-6 space-y-5">
          
          <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl flex items-center gap-3 text-xs text-blue-900">
            <Lock className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-semibold block">Secured by Razorpay Payment Gateway</span>
              <span className="text-[11px] text-blue-700">256-Bit SSL Encryption • PCI-DSS Level 1 Compliant</span>
            </div>
          </div>

          {paymentMethod === 'UPI' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-blue-600" />
                <span>Enter VPA / UPI ID or Scan QR</span>
              </label>
              <input
                type="text"
                value={upiVpa}
                onChange={(e) => setUpiVpa(e.target.value)}
                placeholder="username@bank"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-800 font-mono focus:outline-none focus:border-blue-600"
              />
              <div className="flex justify-around pt-2 text-[11px] text-gray-500 font-medium">
                <span className="bg-gray-100 px-2 py-1 rounded">Google Pay</span>
                <span className="bg-gray-100 px-2 py-1 rounded">PhonePe</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Paytm UPI</span>
              </div>
            </div>
          )}

          {paymentMethod === 'CARD' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-mono focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    defaultValue="08/29"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">CVV</label>
                  <input
                    type="password"
                    defaultValue="•••"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod !== 'UPI' && paymentMethod !== 'CARD' && (
            <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-700 space-y-1">
              <span className="font-semibold text-gray-900 block">Method: {paymentMethod}</span>
              <p>Authorize payment authorization with your banking credentials.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#00d285] hover:bg-[#00b874] text-[#0c2340] font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0c2340] border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <span>Complete Payment (₹{amount.toLocaleString('en-IN')})</span>
              )}
            </button>

            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="w-full py-2 text-xs text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancel Payment
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
