import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SlidersHorizontal, Check, Gift, Sparkles } from 'lucide-react';

export const CustomizerBanner: React.FC = () => {
  const { products, openCustomizer } = useStore();

  return (
    <section id="customizer-banner-section" className="py-24 bg-[#f3efe6] border-y border-[#c8a261]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#17271f] text-white rounded-3xl p-8 sm:p-14 border border-[#c8a261]/40 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Background Decorative Graphic */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8a261]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a261]/20 border border-[#c8a261] text-[#c8a261] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Feature Highlight: F-004 Customization Engine</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-light leading-tight">
              Design Your <span className="gold-gradient-text italic">Bespoke Tea Tin</span>
            </h2>

            <p className="text-sm sm:text-base text-[#faf7f2]/80 font-light leading-relaxed">
              Every palate is unique. Tailor your tea leaves, choose natural stevia sweetness, pick custom weight sizes, and add custom laser engraving to the brass lid.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs text-[#faf7f2]/90 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c8a261]" />
                <span>Loose Leaf vs Silk Pyramids</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c8a261]" />
                <span>Unsweetened or Stevia Infused</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c8a261]" />
                <span>50g to 500g Canisters</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c8a261]" />
                <span>Laser Engraved Name or Gift Note</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openCustomizer(products[0])}
                className="px-8 py-4 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] font-bold text-sm tracking-widest uppercase rounded-xl transition-all shadow-xl flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Launch Custom Blend Studio</span>
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative z-10 flex justify-center">
            <div className="bg-[#132218] p-6 rounded-2xl border border-[#c8a261]/30 max-w-sm w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between text-xs text-[#c8a261] border-b border-white/10 pb-3">
                <span className="font-serif font-semibold">Customization Preview</span>
                <Gift className="w-4 h-4" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Blend:</span>
                  <span className="font-semibold text-white">Assam Golden Reserve</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Format:</span>
                  <span className="font-semibold text-white">Whole Loose Leaf</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sweetener:</span>
                  <span className="font-semibold text-white">Unsweetened Pure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Canister Size:</span>
                  <span className="font-semibold text-white">100g Reserve Tin</span>
                </div>
                <div className="flex justify-between text-[#c8a261] pt-1">
                  <span>Custom Engraving:</span>
                  <span className="font-semibold italic">"Priya's Morning Ritual"</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="text-xs text-gray-400">Calculated Price</span>
                <span className="font-serif font-bold text-xl text-white">₹1,680</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
