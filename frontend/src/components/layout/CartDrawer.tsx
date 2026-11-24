import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Truck, Gift } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    user,
    setIsAuthModalOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const freeShippingThreshold = 1500;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 99;
  
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf7f2] shadow-2xl flex flex-col border-l border-[#c8a261]/30">
          
          {/* Header */}
          <div className="p-6 bg-[#17271f] text-white flex items-center justify-between border-b border-[#c8a261]/30">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#c8a261]" />
              <h2 className="text-xl font-serif font-semibold tracking-wider">Your Tasting Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#f3efe6] px-6 py-3 border-b border-[#c8a261]/20">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-[#1e2622]">
              <span className="flex items-center gap-1.5 text-[#8c6747]">
                <Truck className="w-4 h-4 text-[#c8a261]" />
                {amountForFreeShipping === 0 ? (
                  <strong className="text-emerald-700 font-semibold">Congratulations! You unlocked Free Luxury Shipping.</strong>
                ) : (
                  <span>Add <strong>₹{amountForFreeShipping}</strong> more for Free Shipping</span>
                )}
              </span>
            </div>
            <div className="w-full bg-[#17271f]/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#c8a261] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#17271f]/5 border border-[#c8a261]/30 flex items-center justify-center mx-auto text-[#c8a261]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-medium text-[#17271f]">Your cart is empty</h3>
                <p className="text-xs text-[#8c6747] max-w-xs mx-auto">
                  Explore our handcrafted tea collections or take the AI Tea Advisor quiz to discover your signature blend.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#17271f] text-[#c8a261] text-xs font-semibold tracking-wider rounded-lg hover:bg-[#223829] transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-white border border-[#c8a261]/20 shadow-sm relative group hover:border-[#c8a261]/50 transition-all"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg shrink-0 border border-black/5"
                  />
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-serif font-semibold text-[#17271f] text-sm leading-snug truncate">
                      {item.product.name}
                    </h4>
                    
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#8c6747]">
                      <span className="bg-[#faf7f2] px-2 py-0.5 rounded border border-black/5">
                        {item.customizer.format}
                      </span>
                      <span className="bg-[#faf7f2] px-2 py-0.5 rounded border border-black/5">
                        {item.customizer.packageSize}
                      </span>
                      <span className="bg-[#faf7f2] px-2 py-0.5 rounded border border-black/5">
                        {item.customizer.sweetener}
                      </span>
                    </div>

                    {item.customizer.customEngraving && (
                      <p className="text-[11px] text-[#c8a261] italic flex items-center gap-1 mt-1">
                        <Gift className="w-3 h-3" />
                        Label: "{item.customizer.customEngraving}"
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#17271f]/20 rounded-md bg-[#faf7f2]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#17271f]/10 text-[#17271f] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#17271f]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#17271f]/10 text-[#17271f] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-[#17271f] text-base">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#c8a261]/20 space-y-4 shadow-lg">
              
              {/* Promo Code Entry */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs text-emerald-800">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    Coupon {appliedCoupon.code} applied ({appliedCoupon.value}% OFF)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 font-semibold underline hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (e.g. LUXURY10)"
                    className="flex-1 px-3 py-2 text-xs bg-[#faf7f2] border border-[#17271f]/20 rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#c8a261]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#17271f] text-[#c8a261] text-xs font-semibold rounded-lg hover:bg-[#223829] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-[#1e2622]">
                <div className="flex justify-between">
                  <span className="text-[#8c6747]">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8c6747]">Estimated GST (5%)</span>
                  <span>₹{estimatedTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c6747]">Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#17271f] pt-2 border-t border-black/10">
                  <span>Grand Total</span>
                  <span className="text-[#17271f]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold text-sm tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-[#8c6747]">
                🔒 256-Bit SSL Encrypted & Razorpay Verified Payment Security
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
