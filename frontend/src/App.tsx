import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';

import { Hero } from './components/home/Hero';
import { BrandStory } from './components/home/BrandStory';
import { CustomizerBanner } from './components/home/CustomizerBanner';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { Testimonials } from './components/home/Testimonials';
import { AiAdvisorQuiz } from './components/home/AiAdvisorQuiz';
import { BrewingTimer } from './components/home/BrewingTimer';

import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { TeaCustomizerModal } from './components/customizer/TeaCustomizerModal';

import { CheckoutModal } from './components/checkout/CheckoutModal';
import { AuthModal } from './components/customer/AuthModal';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toast } from './components/ui/Toast';

import { Search, X, SlidersHorizontal, Eye } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeView,
    products,
    openCustomizer,
    openDetailModal
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCollection, setSelectedCollection] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');

  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [quickSearchInput, setQuickSearchInput] = useState<string>('');

  const searchResults = quickSearchInput.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(quickSearchInput.toLowerCase()) ||
        p.category.toLowerCase().includes(quickSearchInput.toLowerCase()) ||
        p.tasteNotes.some((t) => t.toLowerCase().includes(quickSearchInput.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] font-sans antialiased text-[#1e2622]">
      
      {/* Sticky Header */}
      <Navbar onSearchOpen={() => setIsSearchModalOpen(true)} />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'shop' && (
          <>
            <Hero />
            <BrandStory />
            <CustomizerBanner />
            <FeaturedProducts
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <Testimonials />
          </>
        )}

        {activeView === 'dashboard' && <CustomerDashboard />}

        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <ProductDetailModal />
      <TeaCustomizerModal />
      <AiAdvisorQuiz />
      <BrewingTimer />
      <CheckoutModal />
      <AuthModal />
      <Toast />

      {/* Quick Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-[#faf7f2] max-w-xl w-full rounded-3xl p-6 shadow-2xl border border-[#c8a261]/30 space-y-4">
            
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-5 h-5 text-[#8c6747]" />
                <input
                  type="text"
                  autoFocus
                  value={quickSearchInput}
                  onChange={(e) => setQuickSearchInput(e.target.value)}
                  placeholder="Search Assam, Saffron, Matcha, Chamomile..."
                  className="w-full text-base bg-transparent border-none focus:outline-none text-[#17271f]"
                />
              </div>
              <button
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setQuickSearchInput('');
                }}
                className="p-1 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quickSearchInput.trim() && (
              <div className="max-h-80 overflow-y-auto space-y-2">
                {searchResults.length === 0 ? (
                  <p className="text-xs text-[#8c6747] text-center py-6">No teas found for "{quickSearchInput}".</p>
                ) : (
                  searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-white rounded-xl border border-black/5 hover:border-[#c8a261] flex items-center justify-between gap-3 group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#17271f] group-hover:text-[#c8a261]">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] text-gray-500">{prod.category} • ₹{prod.price}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            openCustomizer(prod);
                          }}
                          className="p-2 bg-[#17271f] text-[#c8a261] rounded-lg text-xs"
                          title="Customize"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            openDetailModal(prod);
                          }}
                          className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
};

export default App;
