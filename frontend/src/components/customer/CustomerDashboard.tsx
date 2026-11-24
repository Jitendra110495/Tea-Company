import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderCard } from './OrderCard';
import { ProductCard } from '../catalog/ProductCard';
import { Package, MapPin, Heart, LogOut, Shield } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    products,
    logoutUser,
    setActiveView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');

  if (!user) {
    return (
      <div className="py-24 max-w-md mx-auto text-center px-4 space-y-4">
        <h2 className="text-2xl font-serif text-[#17271f]">Please Sign In</h2>
        <p className="text-xs text-[#8c6747]">You need to be signed in to access your customer dashboard.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 bg-[#17271f] text-[#c8a261] text-xs font-semibold rounded-xl"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 bg-[#faf7f2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Banner Header */}
        <div className="bg-[#17271f] text-white p-6 sm:p-8 rounded-3xl border border-[#c8a261]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#c8a261]/20 border-2 border-[#c8a261] flex items-center justify-center text-[#c8a261] text-2xl font-serif font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-semibold text-white">{user.name}</h1>
                <span className="px-2.5 py-0.5 bg-[#c8a261]/20 border border-[#c8a261]/50 text-[#c8a261] text-[10px] uppercase font-bold tracking-wider rounded">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-light mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {user.role === 'admin' && (
              <button
                onClick={() => setActiveView('admin')}
                className="flex-1 md:flex-initial px-5 py-2.5 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Shield className="w-4 h-4" />
                <span>Open Admin Portal</span>
              </button>
            )}

            <button
              onClick={logoutUser}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center space-x-2 border-b border-[#c8a261]/20 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-2xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#17271f] text-[#c8a261] shadow'
                : 'bg-white text-[#17271f]/80 hover:bg-[#faf7f2]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders & Trackings ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-6 py-3 rounded-2xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'addresses'
                ? 'bg-[#17271f] text-[#c8a261] shadow'
                : 'bg-white text-[#17271f]/80 hover:bg-[#faf7f2]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Delivery Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-2xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'wishlist'
                ? 'bg-[#17271f] text-[#c8a261] shadow'
                : 'bg-white text-[#17271f]/80 hover:bg-[#faf7f2]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist Bookmarks ({wishlistedProducts.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-black/10 space-y-3">
                  <Package className="w-10 h-10 text-gray-400 mx-auto" />
                  <h3 className="font-serif text-lg font-semibold text-[#17271f]">No orders placed yet</h3>
                  <p className="text-xs text-[#8c6747]">Your luxury tea orders will appear here with live tracking updates.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {user.addresses.map((addr) => (
                <div key={addr.id} className="bg-white p-6 rounded-2xl border border-[#c8a261]/30 shadow-sm space-y-3 relative">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-200">
                      Default Delivery Address
                    </span>
                  )}
                  <h4 className="font-serif font-bold text-[#17271f] text-base">{addr.name}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {addr.street}<br />
                    {addr.city}, {addr.state} - {addr.pincode}<br />
                    Phone: {addr.phone}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistedProducts.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-black/10 space-y-3">
                  <Heart className="w-10 h-10 text-gray-400 mx-auto" />
                  <h3 className="font-serif text-lg font-semibold text-[#17271f]">Your Wishlist is Empty</h3>
                  <p className="text-xs text-[#8c6747]">Click the heart icon on any tea blend to save it for later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
