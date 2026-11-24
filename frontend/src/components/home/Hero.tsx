import React from 'react';
import { ArrowRight, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Hero: React.FC = () => {
  const { setIsAiAdvisorOpen } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer-banner-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#17271f] text-white">
      {/* Background Editorial Image with Luxury Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1920&q=80"
          alt="High altitude tea garden"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 font-sans"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17271f] via-[#17271f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17271f]/80 via-transparent to-[#17271f]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
        
        {/* Subtle Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c8a261]/15 border border-[#c8a261]/40 text-[#c8a261] text-xs uppercase tracking-[0.3em] font-medium backdrop-blur-sm animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Handcrafted Organic Estate Teas</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] text-white font-light max-w-4xl mx-auto">
          The Art of <span className="italic font-normal gold-gradient-text">Mindful Sipping</span> & Luxury Wellness
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#faf7f2]/80 font-light max-w-2xl mx-auto leading-relaxed">
          Inspired by high-end perfume houses and centuries-old Himalayan tea heritage. Discover single-origin Whole Leaf teas personalized to your taste.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={scrollToCatalog}
            className="w-full sm:w-auto px-8 py-4 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] font-semibold text-sm tracking-widest uppercase rounded-xl transition-all shadow-xl hover:shadow-[#c8a261]/20 flex items-center justify-center gap-2 group"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setIsAiAdvisorOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-[#c8a261]/50 font-medium text-sm tracking-wider rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#c8a261]" />
            <span>AI Tea Advisor Quiz</span>
          </button>

          <button
            onClick={scrollToCustomizer}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-[#faf7f2]/90 border border-white/20 font-medium text-sm tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#c8a261]" />
            <span>Create Custom Blend</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#faf7f2]/70 max-w-3xl mx-auto border-t border-white/10">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c8a261]" />
            <span>Single-Estate Harvest</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c8a261]" />
            <span>100% Organic & Non-GMO</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c8a261]" />
            <span>Bespoke Tin Engraving</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c8a261]" />
            <span>Fast Express Courier</span>
          </div>
        </div>

      </div>
    </section>
  );
};
