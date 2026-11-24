import React from 'react';
import type { Order } from '../../types';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Printer, ArrowRight, Truck } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const { setActiveView } = useStore();

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto bg-white text-[#17271f]">
      
      {/* Success Header */}
      <div className="text-center space-y-3 pb-6 border-b border-black/10">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8c6747] block">
          Order Confirmed & Paid
        </span>

        <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#17271f]">
          Thank You, <span className="italic font-normal text-[#c8a261]">{order.customerName}</span>
        </h2>

        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Your order <strong>#{order.id}</strong> has been received and sent to our tea estate artisans for small-batch packing.
        </p>
      </div>

      {/* Live Courier Tracking Strip */}
      <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#c8a261]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#17271f] text-[#c8a261] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Courier Partner</span>
            <span className="font-bold text-[#17271f]">{order.courierPartner}</span>
            <span className="text-[11px] text-gray-500 block font-mono">AWB: {order.trackingNumber}</span>
          </div>
        </div>

        <div className="text-right sm:text-right">
          <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Est. Delivery</span>
          <span className="font-bold text-emerald-700 text-sm">{order.estimatedDelivery}</span>
        </div>
      </div>

      {/* Itemized Invoice Details */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8c6747]">
          Itemized Order Receipt
        </h3>

        <div className="divide-y divide-gray-100 border border-black/10 rounded-2xl overflow-hidden bg-[#faf7f2]/50">
          {order.items.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between text-xs gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg border border-black/5"
                />
                <div>
                  <h4 className="font-serif font-bold text-[#17271f]">{item.product.name}</h4>
                  <p className="text-[11px] text-gray-500">
                    {item.customizer.format} • {item.customizer.packageSize} • {item.customizer.sweetener}
                  </p>
                  {item.customizer.customEngraving && (
                    <p className="text-[11px] text-[#c8a261] italic">
                      Label: "{item.customizer.customEngraving}"
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="font-semibold text-gray-700 block">Qty: {item.quantity}</span>
                <span className="font-serif font-bold text-[#17271f]">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Calculation */}
      <div className="bg-gray-50 p-4 rounded-xl text-xs space-y-1.5 border border-black/5">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Promo Discount</span>
            <span>-₹{order.discount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>GST (5%)</span>
          <span>₹{order.tax.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost}`}</span>
        </div>
        <div className="flex justify-between text-sm font-serif font-bold text-[#17271f] pt-2 border-t border-gray-200">
          <span>Total Paid ({order.paymentMethod})</span>
          <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrintInvoice}
          className="w-full sm:w-auto px-5 py-3 border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Tax Invoice</span>
        </button>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              onClose();
              setActiveView('dashboard');
            }}
            className="flex-1 sm:flex-initial px-6 py-3 bg-[#17271f] text-[#c8a261] text-xs font-semibold rounded-xl hover:bg-[#223829] transition-colors"
          >
            Track in Dashboard
          </button>

          <button
            onClick={() => {
              onClose();
              setActiveView('shop');
            }}
            className="flex-1 sm:flex-initial px-6 py-3 bg-[#c8a261] text-[#17271f] text-xs font-bold rounded-xl hover:bg-[#b89251] transition-colors flex items-center justify-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
