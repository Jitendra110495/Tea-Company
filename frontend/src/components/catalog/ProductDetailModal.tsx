import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Heart, SlidersHorizontal, Timer, Check, MapPin, Sparkles } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const {
    detailProduct,
    isDetailModalOpen,
    setIsDetailModalOpen,
    openCustomizer,
    toggleWishlist,
    isInWishlist,
    setIsBrewingTimerOpen,
    setSelectedTimerProduct
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!isDetailModalOpen || !detailProduct) return null;

  const isWishlisted = isInWishlist(detailProduct.id);
  const reviewsForProduct = INITIAL_REVIEWS.filter((r) => r.productId === detailProduct.id);

  const handleLaunchTimer = () => {
    setSelectedTimerProduct(detailProduct);
    setIsDetailModalOpen(false);
    setIsBrewingTimerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-[#faf7f2] rounded-3xl shadow-2xl border border-[#c8a261]/30 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsDetailModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 bg-[#17271f]/80 text-[#c8a261] hover:bg-[#17271f] hover:text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Media Gallery */}
          <div className="md:col-span-5 bg-[#17271f] p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden border border-[#c8a261]/30 shadow-lg">
                <img
                  src={detailProduct.gallery[activeImageIdx] || detailProduct.image}
                  alt={detailProduct.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              {detailProduct.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {detailProduct.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIdx === idx ? 'border-[#c8a261] scale-105' : 'border-white/20 opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Micro Estate Facts */}
            <div className="bg-[#132218] p-4 rounded-xl border border-[#c8a261]/20 space-y-2 text-xs text-[#faf7f2]/80">
              <div className="flex items-center gap-2 text-[#c8a261] font-semibold uppercase tracking-wider text-[10px]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Terroir & Origin</span>
              </div>
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400">Origin:</span>
                <span className="font-medium text-white">{detailProduct.origin}</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400">Elevation:</span>
                <span className="font-medium text-white">{detailProduct.elevation}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Harvest Flush:</span>
                <span className="font-medium text-white">{detailProduct.flush}</span>
              </p>
            </div>

          </div>

          {/* Right Product Details */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 bg-white overflow-y-auto">
            
            {/* Header badges & Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8c6747]">
                  {detailProduct.collection} • {detailProduct.category}
                </span>
                <div className="flex items-center gap-1 text-[#c8a261] font-semibold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{detailProduct.rating}</span>
                  <span className="text-gray-400 font-normal">({detailProduct.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17271f]">
                {detailProduct.name}
              </h2>
              <p className="text-xs text-[#8c6747] font-medium">
                {detailProduct.subtitle}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 border-y border-black/5 py-4">
              <span className="text-xs text-[#8c6747]">Base Price:</span>
              <span className="text-3xl font-serif font-bold text-[#17271f]">
                ₹{detailProduct.price.toLocaleString('en-IN')}
              </span>
              {detailProduct.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{detailProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 ml-auto font-medium">
                100% Organic Certified
              </span>
            </div>

            {/* Story Description */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-semibold text-[#8c6747] tracking-wider">The Tea Story</h4>
              <p className="text-sm text-[#1e2622]/80 leading-relaxed font-light">
                {detailProduct.description}
              </p>
            </div>

            {/* Taste Notes & Aroma */}
            <div className="grid grid-cols-2 gap-4 bg-[#faf7f2] p-4 rounded-xl border border-[#c8a261]/20">
              <div>
                <h4 className="text-xs uppercase font-semibold text-[#8c6747] tracking-wider mb-2">Taste Profile</h4>
                <div className="flex flex-wrap gap-1">
                  {detailProduct.tasteNotes.map((note, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white text-[11px] font-medium text-[#17271f] rounded border border-black/5">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs uppercase font-semibold text-[#8c6747] tracking-wider mb-2">Aromatics</h4>
                <p className="text-xs text-[#1e2622]/80 italic">"{detailProduct.aroma}"</p>
              </div>
            </div>

            {/* Ingredients & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <h4 className="font-semibold text-[#17271f] uppercase tracking-wider text-[11px]">Ingredients</h4>
                <ul className="space-y-1 text-[#1e2622]/80">
                  {detailProduct.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#c8a261]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-semibold text-[#17271f] uppercase tracking-wider text-[11px]">Wellness Benefits</h4>
                <ul className="space-y-1 text-[#1e2622]/80">
                  {detailProduct.benefits.map((ben, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c8a261]" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brewing Instructions Card */}
            <div className="bg-[#17271f] text-white p-4 rounded-xl space-y-3 border border-[#c8a261]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#c8a261] font-semibold text-xs">
                  <Timer className="w-4 h-4" />
                  <span>Sommelier Brewing Guide</span>
                </div>
                <button
                  onClick={handleLaunchTimer}
                  className="px-3 py-1 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] font-bold text-[11px] rounded-md transition-colors"
                >
                  Launch Live Timer
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/5 p-2 rounded">
                  <span className="text-gray-400 block text-[10px]">Water Temp</span>
                  <span className="font-bold text-[#c8a261]">{detailProduct.brewingGuide.waterTemp}</span>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <span className="text-gray-400 block text-[10px]">Steep Time</span>
                  <span className="font-bold text-[#c8a261]">{detailProduct.brewingGuide.steepTime}</span>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <span className="text-gray-400 block text-[10px]">Serving</span>
                  <span className="font-bold text-[#c8a261]">{detailProduct.brewingGuide.servingSize}</span>
                </div>
              </div>
            </div>

            {/* Reviews Highlight */}
            {reviewsForProduct.length > 0 && (
              <div className="border-t border-black/10 pt-4 space-y-3">
                <h4 className="text-xs uppercase font-semibold text-[#8c6747] tracking-wider">Connoisseur Reviews</h4>
                {reviewsForProduct.map((rev) => (
                  <div key={rev.id} className="bg-[#faf7f2] p-3 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#17271f]">{rev.author}</span>
                      <div className="flex text-[#c8a261]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="font-medium text-[#17271f]">"{rev.headline}"</p>
                    <p className="text-gray-600 font-light">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  openCustomizer(detailProduct);
                }}
                className="flex-1 py-4 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Customize & Order</span>
              </button>

              <button
                onClick={() => toggleWishlist(detailProduct.id)}
                className={`p-4 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
