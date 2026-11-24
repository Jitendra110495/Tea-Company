import React from 'react';
import type { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Star, Heart, SlidersHorizontal, Eye, Timer } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openCustomizer,
    openDetailModal,
    toggleWishlist,
    isInWishlist,
    setIsBrewingTimerOpen,
    setSelectedTimerProduct
  } = useStore();

  const isWishlisted = isInWishlist(product.id);

  const handleOpenBrewingTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTimerProduct(product);
    setIsBrewingTimerOpen(true);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#c8a261]/20 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c8a261]/60 transition-all duration-300 flex flex-col h-full">
      
      {/* Image Banner Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#faf7f2] cursor-pointer" onClick={() => openDetailModal(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-[#17271f] text-[#c8a261] border border-[#c8a261]/40 text-[10px] uppercase font-bold tracking-widest rounded-md shadow-md">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#c8a261] text-[#17271f] text-[10px] uppercase font-bold tracking-widest rounded-md shadow-md">
              Rare Harvest
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all z-10 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 border-red-200 shadow-md'
              : 'bg-white/80 text-gray-700 border-white/40 hover:bg-white hover:text-red-500'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openDetailModal(product);
            }}
            className="px-4 py-2 bg-white/90 text-[#17271f] text-xs font-semibold rounded-lg hover:bg-white transition-colors flex items-center gap-1.5 shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span>Story & Details</span>
          </button>
          
          <button
            onClick={handleOpenBrewingTimer}
            className="px-3 py-2 bg-[#17271f]/90 text-[#c8a261] border border-[#c8a261]/40 text-xs font-semibold rounded-lg hover:bg-[#17271f] transition-colors flex items-center gap-1.5 shadow-lg"
            title="Open Interactive Brewing Timer"
          >
            <Timer className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Collection & Rating */}
          <div className="flex items-center justify-between text-xs text-[#8c6747]">
            <span className="uppercase tracking-widest font-medium font-sans">
              {product.collection} • {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#c8a261] font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3
            onClick={() => openDetailModal(product)}
            className="font-serif text-xl font-semibold text-[#17271f] group-hover:text-[#c8a261] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#1e2622]/70 font-light line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Taste Notes Pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.tasteNotes.slice(0, 3).map((note, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-[#faf7f2] border border-[#c8a261]/20 text-[10px] text-[#8c6747] rounded-md font-sans"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-black/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-[#8c6747] block">Starts from</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-[#17271f]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => openCustomizer(product)}
              className="px-4 py-2.5 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold text-xs rounded-xl transition-all shadow flex items-center gap-1.5"
              title="Customize Tea Format, Sweetener & Packaging"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
