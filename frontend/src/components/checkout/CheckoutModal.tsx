import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Address, Order } from '../../types';
import { X, MapPin, Truck, CreditCard, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { RazorpayPaymentModal } from './RazorpayPaymentModal';
import { OrderConfirmationModal } from './OrderConfirmationModal';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    user,
    isCheckoutOpen,
    setIsCheckoutOpen,
    appliedCoupon,
    placeOrder
  } = useStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  
  // Address state
  const [shippingAddress, setShippingAddress] = useState<Address>({
    id: 'addr-new',
    name: user?.name || '',
    street: user?.addresses[0]?.street || '',
    city: user?.addresses[0]?.city || 'Bengaluru',
    state: user?.addresses[0]?.state || 'Karnataka',
    pincode: user?.addresses[0]?.pincode || '560103',
    phone: user?.phone || '+91 98765 43210',
    isDefault: true
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('UPI');
  
  const [isRazorpayOpen, setIsRazorpayOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const shippingCost = subtotal > 1500 || deliveryMethod === 'standard' ? 0 : 150;
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city || !shippingAddress.pincode) {
      alert('Please fill in all required shipping address fields.');
      return;
    }
    setStep('payment');
  };

  const handleProceedToRazorpay = () => {
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = (_paymentId: string, paymentMethodName: string) => {
    setIsRazorpayOpen(false);
    const order = placeOrder(shippingAddress, paymentMethodName);
    setCompletedOrder(order);
    setStep('confirmation');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
        
        <div className="relative w-full max-w-3xl bg-[#faf7f2] rounded-3xl shadow-2xl border border-[#c8a261]/40 overflow-hidden my-6">
          
          {/* Header */}
          <div className="p-6 bg-[#17271f] text-white flex items-center justify-between border-b border-[#c8a261]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c8a261]/20 border border-[#c8a261] flex items-center justify-center text-[#c8a261]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-semibold tracking-wider">Luxury Direct Checkout</h2>
                <p className="text-xs text-[#c8a261] font-light">Encrypted 256-Bit SSL Order Processing</p>
              </div>
            </div>
            
            {step !== 'confirmation' && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Checkout Steps Progress Bar */}
          {step !== 'confirmation' && (
            <div className="bg-[#f3efe6] px-8 py-3 border-b border-[#c8a261]/20 flex justify-between text-xs font-semibold text-[#8c6747]">
              <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-[#17271f] font-bold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'shipping' ? 'bg-[#17271f] text-[#c8a261]' : 'bg-emerald-700 text-white'}`}>
                  {step === 'payment' ? <Check className="w-3 h-3" /> : '1'}
                </span>
                <span>Shipping & Delivery</span>
              </div>
              <div className="h-0.5 w-12 bg-black/10 self-center hidden sm:block" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#17271f] font-bold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#17271f] text-[#c8a261]' : 'bg-gray-300 text-gray-700'}`}>
                  2
                </span>
                <span>Payment Method</span>
              </div>
            </div>
          )}

          {/* STEP 1: Shipping Address Form */}
          {step === 'shipping' && (
            <form onSubmit={handleAddressSubmit} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-[#17271f] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c8a261]" />
                  <span>Delivery Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[#8c6747] font-medium block">Full Recipient Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      placeholder="Priya Sharma"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#8c6747] font-medium block">Mobile Phone *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[#8c6747] font-medium block">Street Address & Apartment *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      placeholder="Flat / House No., Building Name, Street"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#8c6747] font-medium block">City *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="Bengaluru"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#8c6747] font-medium block">State *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      placeholder="Karnataka"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#8c6747] font-medium block">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      placeholder="560103"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="space-y-3 pt-4 border-t border-black/5">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-[#17271f] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#c8a261]" />
                  <span>Delivery Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      deliveryMethod === 'standard'
                        ? 'bg-[#17271f] text-white border-[#c8a261] shadow-sm'
                        : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                    }`}
                  >
                    <div className="flex justify-between font-semibold">
                      <span>Standard Luxury Delivery</span>
                      <span>FREE</span>
                    </div>
                    <span className="text-[11px] opacity-75 block mt-0.5">Delivery within 3-4 Business Days via Shiprocket</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      deliveryMethod === 'express'
                        ? 'bg-[#17271f] text-white border-[#c8a261] shadow-sm'
                        : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                    }`}
                  >
                    <div className="flex justify-between font-semibold">
                      <span>Express Courier Priority</span>
                      <span>₹150</span>
                    </div>
                    <span className="text-[11px] opacity-75 block mt-0.5">Air Priority Delivery within 24-48 Hours</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-black/10 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Payment Method Selection */}
          {step === 'payment' && (
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Order Summary Recap */}
              <div className="bg-[#17271f] text-white p-5 rounded-2xl border border-[#c8a261]/30 space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#c8a261] font-serif text-sm font-semibold border-b border-white/10 pb-2">
                  <span>Order Summary ({cart.length} items)</span>
                  <span>Grand Total: ₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping To:</span>
                  <span className="font-semibold text-white truncate max-w-xs">{shippingAddress.name}, {shippingAddress.city}</span>
                </div>
              </div>

              {/* Payment Methods Options */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-[#17271f] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#c8a261]" />
                  <span>Select Payment Gateway</span>
                </h3>

                <div className="space-y-3 text-xs">
                  {[
                    { id: 'UPI', name: 'Razorpay UPI (Google Pay, PhonePe, Paytm)', desc: 'Instant 1-click payment with zero transaction fee' },
                    { id: 'CARD', name: 'Credit / Debit Card (Visa, Mastercard, RuPay)', desc: 'Secure card checkout via Razorpay Gateway' },
                    { id: 'NETBANKING', name: 'Net Banking (HDFC, ICICI, SBI, Axis)', desc: 'Direct bank authorization' },
                    { id: 'COD', name: 'Pay on Delivery (Cash / UPI at Doorstep)', desc: 'Pay when your luxury package arrives' }
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(pm.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        selectedPaymentMethod === pm.id
                          ? 'bg-[#17271f] text-white border-[#c8a261] shadow-md'
                          : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-sm block">{pm.name}</span>
                        <span className="text-[11px] opacity-75 font-light">{pm.desc}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === pm.id ? 'border-[#c8a261] bg-[#c8a261]' : 'border-gray-300'}`}>
                        {selectedPaymentMethod === pm.id && <Check className="w-3 h-3 text-[#17271f]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-black/10 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#8c6747] font-semibold underline hover:text-[#17271f]"
                >
                  ← Back to Address
                </button>

                <button
                  type="button"
                  onClick={handleProceedToRazorpay}
                  className="px-8 py-3.5 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-xl flex items-center gap-2"
                >
                  <span>Pay ₹{grandTotal.toLocaleString('en-IN')} via Razorpay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 'confirmation' && completedOrder && (
            <OrderConfirmationModal order={completedOrder} onClose={() => setIsCheckoutOpen(false)} />
          )}

        </div>

      </div>

      {/* Simulated Razorpay Payment Gateway Drawer */}
      {isRazorpayOpen && (
        <RazorpayPaymentModal
          amount={grandTotal}
          paymentMethod={selectedPaymentMethod}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setIsRazorpayOpen(false)}
        />
      )}
    </>
  );
};
