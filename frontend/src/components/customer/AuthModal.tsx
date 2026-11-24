import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Lock, Mail, User as UserIcon, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('priya.sharma@example.com');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, 'customer');
    setIsAuthModalOpen(false);
  };

  const handleAdminDemoLogin = () => {
    loginUser('admin@theteastory.in', 'admin');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-[#faf7f2] rounded-3xl shadow-2xl border border-[#c8a261]/30 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-1.5 text-[#17271f]/70 hover:text-[#17271f] hover:bg-black/5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-8 text-center bg-[#17271f] text-white space-y-2 border-b border-[#c8a261]/30">
          <div className="w-12 h-12 rounded-full bg-[#c8a261]/20 border border-[#c8a261] flex items-center justify-center text-[#c8a261] mx-auto mb-2">
            <UserIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-light">
            {isRegister ? 'Join The Tea Story Circle' : 'Welcome to The Tea Story'}
          </h2>
          <p className="text-xs text-[#faf7f2]/70 font-light">
            Sign in to access your order history, saved custom blends, and wishlist.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          
          {isRegister && (
            <div className="space-y-1 text-xs">
              <label className="text-[#8c6747] font-medium block">Full Name</label>
              <input
                type="text"
                required
                defaultValue="Priya Sharma"
                className="w-full px-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
              />
            </div>
          )}

          <div className="space-y-1 text-xs">
            <label className="text-[#8c6747] font-medium block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-[#8c6747] font-medium block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                defaultValue="password123"
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#17271f]/20 rounded-xl text-[#17271f] focus:outline-none focus:border-[#c8a261]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md"
          >
            {isRegister ? 'Create Luxury Account' : 'Sign In'}
          </button>

          {/* Quick Demo Login Shortcut */}
          <div className="pt-3 border-t border-black/10 text-center space-y-2">
            <span className="text-[11px] text-[#8c6747] block">Instant Demo Access</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  loginUser('priya.sharma@example.com', 'customer');
                  setIsAuthModalOpen(false);
                }}
                className="flex-1 py-2 bg-white border border-gray-300 hover:border-[#c8a261] text-[11px] font-medium rounded-lg"
              >
                Sign In as Customer
              </button>
              <button
                type="button"
                onClick={handleAdminDemoLogin}
                className="flex-1 py-2 bg-[#17271f] text-[#c8a261] text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-[#8c6747] hover:text-[#17271f] underline font-medium"
            >
              {isRegister ? 'Already have an account? Sign In' : 'New to The Tea Story? Create Account'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
