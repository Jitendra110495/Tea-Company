import React from 'react';
import { Compass, Sparkles, Heart, Sun } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story-section" className="py-24 bg-[#faf7f2] relative overflow-hidden border-b border-[#c8a261]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8c6747]">
            Our Heritage & Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#17271f] font-light">
            Why Tea Should Feel Like <span className="italic gold-gradient-text">Luxury Perfume</span>
          </h2>
          <p className="text-base text-[#1e2622]/80 leading-relaxed font-light">
            Traditional tea brands treat tea as an everyday bulk commodity. We believe tea is a sensory ritual—a moment of quiet pause, wellness, and refined indulgence.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Imagery Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80"
                alt="Fresh organic tea leaves"
                className="rounded-2xl shadow-lg border border-[#c8a261]/20 object-cover h-64 w-full transform hover:scale-[1.02] transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1563822249510-04678c787b47?auto=format&fit=crop&w=600&q=80"
                alt="Saffron spices and tea preparation"
                className="rounded-2xl shadow-lg border border-[#c8a261]/20 object-cover h-48 w-full transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"
                alt="Glass teapot with steam"
                className="rounded-2xl shadow-lg border border-[#c8a261]/20 object-cover h-48 w-full transform hover:scale-[1.02] transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80"
                alt="Chamomile lavender flowers"
                className="rounded-2xl shadow-lg border border-[#c8a261]/20 object-cover h-64 w-full transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Philosophy Cards */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="flex gap-5 p-6 rounded-2xl bg-white border border-[#c8a261]/20 shadow-sm hover:border-[#c8a261]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#17271f] text-[#c8a261] flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-semibold text-[#17271f]">Pristine Estate Sourcing</h3>
                <p className="text-sm text-[#1e2622]/80 font-light leading-relaxed">
                  We partner directly with family-owned micro-estates in Assam, Darjeeling, Kyoto, and Taiwan. Every harvest is plucked during peak flush season for maximum aromatic notes.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-6 rounded-2xl bg-white border border-[#c8a261]/20 shadow-sm hover:border-[#c8a261]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#17271f] text-[#c8a261] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-semibold text-[#17271f]">Sensory Flavor Profiles</h3>
                <p className="text-sm text-[#1e2622]/80 font-light leading-relaxed">
                  Like fine perfumery, each blend features Top Notes (aroma upon opening), Heart Notes (taste while sipping), and Base Notes (lingering finish). Zero artificial flavorings or synthetic oils.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-6 rounded-2xl bg-white border border-[#c8a261]/20 shadow-sm hover:border-[#c8a261]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#17271f] text-[#c8a261] flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-semibold text-[#17271f]">Bespoke Customization</h3>
                <p className="text-sm text-[#1e2622]/80 font-light leading-relaxed">
                  Select your preferred leaf format, natural stevia sweetener preference, canister size, and personalize with custom tin laser-engraving for yourself or executive gifting.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-6 rounded-2xl bg-white border border-[#c8a261]/20 shadow-sm hover:border-[#c8a261]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#17271f] text-[#c8a261] flex items-center justify-center shrink-0">
                <Sun className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-semibold text-[#17271f]">Mindful Daily Wellness</h3>
                <p className="text-sm text-[#1e2622]/80 font-light leading-relaxed">
                  Designed to replace sugary sodas and heavy cafe drinks with pure botanical hydration, antioxidant-rich polyphenols, and natural calming L-theanine.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
