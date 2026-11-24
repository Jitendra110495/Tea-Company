import React from 'react';
import type { Order } from '../../types';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Clock, Printer, RotateCcw, XCircle } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { cancelOrder, addToCart, showToast } = useStore();

  const statuses = ['Processing', 'Packed', 'Dispatched', 'Delivered'];
  const currentStepIdx = statuses.indexOf(order.status);

  const handleReorder = () => {
    order.items.forEach((item) => {
      addToCart(item.product, item.customizer, item.quantity);
    });
    showToast(`Items from order ${order.id} added to cart for reorder!`, 'success');
  };

  return (
    <div className="bg-white rounded-3xl border border-[#c8a261]/30 p-6 shadow-sm space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-black/5 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg text-[#17271f]">#{order.id}</span>
            <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md ${
              order.status === 'Delivered'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : order.status === 'Cancelled'
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {order.status}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-light block">Placed on {order.createdAt} • Total: ₹{order.totalAmount.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleReorder}
            className="px-3.5 py-2 bg-[#17271f] text-[#c8a261] hover:bg-[#223829] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Order</span>
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            title="Print Tax Invoice"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Order Timeline Progress Tracker */}
      {order.status !== 'Cancelled' && (
        <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#c8a261]/20 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#8c6747] font-medium">
            <span>Tracking: <strong>{order.trackingNumber}</strong> ({order.courierPartner})</span>
            <span>Est. Delivery: <strong>{order.estimatedDelivery}</strong></span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold pt-2">
            {statuses.map((st, idx) => {
              const isCompleted = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <div key={st} className="flex flex-col items-center space-y-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#17271f] text-[#c8a261] shadow'
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'ring-2 ring-[#c8a261]' : ''}`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <span className={isCompleted ? 'text-[#17271f]' : 'text-gray-400'}>{st}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded-lg border border-black/5"
              />
              <div>
                <h5 className="font-serif font-bold text-[#17271f]">{item.product.name}</h5>
                <p className="text-gray-500 text-[11px]">
                  {item.customizer.format} • {item.customizer.packageSize} • {item.customizer.sweetener}
                </p>
                {item.customizer.customEngraving && (
                  <p className="text-[11px] text-[#c8a261] italic">
                    Engraved Label: "{item.customizer.customEngraving}"
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-500">Qty: {item.quantity}</span>
              <span className="font-bold text-[#17271f] block">
                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      {order.status === 'Processing' && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => cancelOrder(order.id)}
            className="text-xs text-red-600 hover:text-red-800 underline font-medium flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Request Cancellation</span>
          </button>
        </div>
      )}

    </div>
  );
};
