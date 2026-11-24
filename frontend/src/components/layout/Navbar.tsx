import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Heart, User as UserIcon, Sparkles, Timer, SlidersHorizontal, ShieldCheck, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  onSearchOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchOpen }) => {
  const {
    cart,
    wishlist,
    user,
    setIsCartOpen,
    setIsAuthModalOpen,
    setIsAiAdvisorOpen,
    setIsBrewingTimerOpen,
    activeView,
    setActiveView
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-[#c8a261]/20 bg-[#faf7f2]/90 backdrop-blur-md">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#17271f] text-[#faf7f2] text-xs py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-3 border-b border-[#c8a261]/30">
        <span className="inline-block w-2 h-2 rounded-full bg-[#c8a261] animate-pulse"></span>
        <span>Complimentary Express Shipping on Orders Above ₹1,500</span>
        <span className="hidden md:inline text-[#c8a261]">•</span>
        <span className="hidden md:inline text-white/80">Code: <strong className="text-[#c8a261]">LUXURY10</strong> for 10% Off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#17271f] hover:text-[#c8a261] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveView('shop')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-full bg-[#17271f] flex items-center justify-center text-[#c8a261] border border-[#c8a261]/40 group-hover:scale-105 transition-transform duration-300 shadow-md">
                <span className="text-xl font-serif font-bold tracking-tighter">TS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif tracking-wider font-semibold text-[#17271f] group-hover:text-[#c8a261] transition-colors">
                  The Tea Story
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#8c6747] uppercase font-sans">
                  Organic Luxury Estate
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => {
                setActiveView('shop');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#c8a261] transition-colors ${
                activeView === 'shop' ? 'text-[#17271f] font-semibold border-b-2 border-[#c8a261] pb-1' : 'text-[#17271f]/80'
              }`}
            >
              Collections
            </button>

            <button
              onClick={() => {
                setActiveView('shop');
                const el = document.getElementById('brand-story-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#17271f]/80 hover:text-[#c8a261] transition-colors"
            >
              Our Heritage
            </button>

            <button
              onClick={() => setIsAiAdvisorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17271f]/5 border border-[#c8a261]/40 text-[#17271f] hover:bg-[#17271f] hover:text-[#c8a261] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#c8a261]" />
              <span>AI Tea Advisor</span>
            </button>

            <button
              onClick={() => setIsBrewingTimerOpen(true)}
              className="flex items-center gap-1.5 text-[#17271f]/80 hover:text-[#c8a261] transition-colors"
            >
              <Timer className="w-4 h-4 text-[#8c6747]" />
              <span>Brewing Guide</span>
            </button>

            <button
              onClick={() => {
                setActiveView('shop');
                const el = document.getElementById('customizer-banner-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-[#17271f]/80 hover:text-[#c8a261] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8c6747]" />
              <span>Customizer</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Button */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-[#17271f]/80 hover:text-[#c8a261] transition-colors rounded-full hover:bg-black/5"
              title="Search Catalog"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                if (!user) {
                  setIsAuthModalOpen(true);
                } else {
                  setActiveView('dashboard');
                }
              }}
              className="p-2 text-[#17271f]/80 hover:text-[#c8a261] transition-colors rounded-full hover:bg-black/5 relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c8a261] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#17271f] hover:text-[#c8a261] transition-colors rounded-full hover:bg-black/5 relative"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#17271f] text-[#c8a261] border border-[#c8a261] text-[11px] font-bold rounded-full flex items-center justify-center shadow">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Account Dashboard Button */}
            <button
              onClick={() => {
                if (user) {
                  setActiveView(user.role === 'admin' ? 'admin' : 'dashboard');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-[#17271f]/80 hover:text-[#c8a261] transition-colors rounded-full hover:bg-black/5 hidden sm:flex items-center gap-1.5"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <UserIcon className="w-5 h-5" />
              <span className="text-xs font-medium max-w-[80px] truncate hidden md:inline">
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Quick Mode Switcher (Customer / Admin Switcher for Demoing F-011 and F-012) */}
            <button
              onClick={() => {
                if (activeView === 'admin') {
                  setActiveView('shop');
                } else {
                  setActiveView('admin');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider flex items-center gap-1.5 border transition-all ${
                activeView === 'admin'
                  ? 'bg-[#c8a261] text-[#17271f] border-[#c8a261]'
                  : 'bg-[#17271f] text-[#c8a261] border-[#17271f] hover:bg-[#223829]'
              }`}
              title="Toggle Admin Management Portal"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">
                {activeView === 'admin' ? 'Exit Admin' : 'Admin Portal'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf7f2] border-b border-[#c8a261]/20 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              setActiveView('shop');
              setMobileMenuOpen(false);
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 text-base font-medium text-[#17271f]"
          >
            Explore Collections
          </button>
          
          <button
            onClick={() => {
              setIsAiAdvisorOpen(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-base font-medium text-[#c8a261]"
          >
            <Sparkles className="w-5 h-5" />
            <span>AI Tea Advisor</span>
          </button>

          <button
            onClick={() => {
              setIsBrewingTimerOpen(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-base font-medium text-[#17271f]"
          >
            <Timer className="w-5 h-5 text-[#8c6747]" />
            <span>Interactive Brewing Guide</span>
          </button>

          <button
            onClick={() => {
              if (user) {
                setActiveView('dashboard');
              } else {
                setIsAuthModalOpen(true);
              }
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-[#17271f]"
          >
            My Account & Orders
          </button>
        </div>
      )}
    </header>
  );
};
