import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedCollection: string;
  setSelectedCollection: (col: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalResults: number;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Collections', value: 'ALL' },
  { label: 'Black Tea', value: 'Black Tea' },
  { label: 'Green Tea', value: 'Green Tea' },
  { label: 'Herbal Tea', value: 'Herbal Tea' },
  { label: 'White Tea', value: 'White Tea' },
  { label: 'Oolong Tea', value: 'Oolong Tea' },
  { label: 'Wellness Blend', value: 'Wellness Blend' }
];

const COLLECTIONS: { label: string; value: string }[] = [
  { label: 'All Curations', value: 'ALL' },
  { label: 'Signature', value: 'Signature' },
  { label: 'Single Origin', value: 'Single Origin' },
  { label: 'Wellness', value: 'Wellness' },
  { label: 'Royal Reserve', value: 'Royal Reserve' }
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedCollection,
  setSelectedCollection,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  totalResults
}) => {
  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedCollection('ALL');
    setSearchQuery('');
    setSortBy('popular');
  };

  return (
    <div className="space-y-6 mb-12">
      
      {/* Category Pills Bar */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-2 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 border ${
              selectedCategory === cat.value
                ? 'bg-[#17271f] text-[#c8a261] border-[#c8a261] shadow-md scale-102'
                : 'bg-white text-[#1e2622]/80 border-[#c8a261]/20 hover:border-[#c8a261]/50 hover:text-[#17271f]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-4 rounded-2xl border border-[#c8a261]/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c6747]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Assam, Matcha, Saffron..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#faf7f2] border border-[#17271f]/15 rounded-xl text-xs text-[#17271f] placeholder-[#8c6747]/60 focus:outline-none focus:border-[#c8a261]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Collection Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8c6747] font-medium hidden sm:inline">Collection:</span>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="px-3 py-2 bg-[#faf7f2] border border-[#17271f]/15 rounded-xl text-xs text-[#17271f] font-medium focus:outline-none focus:border-[#c8a261]"
            >
              {COLLECTIONS.map((col) => (
                <option key={col.value} value={col.value}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8c6747] font-medium hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-[#faf7f2] border border-[#17271f]/15 rounded-xl text-xs text-[#17271f] font-medium focus:outline-none focus:border-[#c8a261]"
            >
              <option value="popular">Most Popular & Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== 'ALL' || selectedCollection !== 'ALL' || searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="p-2 text-xs text-[#8c6747] hover:text-[#17271f] flex items-center gap-1 font-medium underline"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

      </div>

      {/* Filter Status summary */}
      <div className="text-xs text-[#8c6747] flex items-center justify-between px-1">
        <span>Showing <strong>{totalResults}</strong> organic tea selections</span>
        {searchQuery && (
          <span>Filtering by keyword: "<strong>{searchQuery}</strong>"</span>
        )}
      </div>

    </div>
  );
};
