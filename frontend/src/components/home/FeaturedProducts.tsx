import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../catalog/ProductCard';
import { ProductFilters } from '../catalog/ProductFilters';
import { Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedCollection: string;
  setSelectedCollection: (col: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedCollection,
  setSelectedCollection,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy
}) => {
  const { products } = useStore();

  // Filter products based on selected criteria
  let filtered = products.filter((product) => {
    if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
      return false;
    }
    if (selectedCollection !== 'ALL' && product.collection !== selectedCollection) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSubtitle = product.subtitle.toLowerCase().includes(q);
      const matchOrigin = product.origin.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchNotes = product.tasteNotes.some((n) => n.toLowerCase().includes(q));
      if (!matchName && !matchSubtitle && !matchOrigin && !matchCategory && !matchNotes) {
        return false;
      }
    }
    return true;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default: Sort by rating & best seller status
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="catalog-section" className="py-20 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17271f]/5 border border-[#c8a261]/30 text-[#8c6747] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#c8a261]" />
            <span>Curated Reserve Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#17271f] font-light">
            Handpicked <span className="italic gold-gradient-text">Organic Blends</span>
          </h2>
          <p className="text-sm text-[#1e2622]/80 font-light max-w-xl mx-auto">
            Discover single-estate black teas, ceremonial matcha, royal saffron kahwa, and calming botanical flowers.
          </p>
        </div>

        {/* Filters Bar */}
        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={filtered.length}
        />

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#c8a261]/20 p-8 max-w-md mx-auto space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-semibold text-[#17271f]">No Tea Blends Found</h3>
            <p className="text-xs text-[#8c6747]">
              No products match your current search query "{searchQuery}". Try clearing filters or searching for another tea type.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedCollection('ALL');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#17271f] text-[#c8a261] text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
