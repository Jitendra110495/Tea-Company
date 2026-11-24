import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl backdrop-blur-md border transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#17271f]/95 text-white border-[#c8a261]/40'
              : toast.type === 'warning'
              ? 'bg-[#4a3b32]/95 text-white border-amber-500/40'
              : 'bg-[#223829]/95 text-white border-emerald-500/40'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#c8a261] shrink-0" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-emerald-400 shrink-0" />}
          <p className="text-sm font-medium tracking-wide">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
