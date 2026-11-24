import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'IT Consultant & Wellness Advocate',
      location: 'Bengaluru',
      quote: 'The Tea Story replaced my afternoon sugary lattes. The Assam Golden Reserve feels like an unboxing experience from a luxury perfume house in Paris.',
      tea: 'Assam Golden Reserve STGFOP1',
      rating: 5
    },
    {
      name: 'Rahul Mehta',
      role: 'Tech Entrepreneur',
      location: 'Mumbai',
      quote: 'I sample tea across London, Tokyo, and Singapore. The First Flush Darjeeling here has muscatel clarity that rivals top European tea salons.',
      tea: 'Darjeeling First Flush',
      rating: 5
    },
    {
      name: 'Neha Kapoor',
      role: 'HR Director & Luxury Buyer',
      location: 'New Delhi',
      quote: 'We ordered 50 custom-engraved tins of Kashmiri Saffron Kahwa for our executive clients. The presentation and personalized tin labels were immaculate.',
      tea: 'Kashmiri Shahi Kahwa',
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-[#17271f] text-white relative overflow-hidden border-t border-[#c8a261]/30">
      
      {/* Decorative Gold Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c8a261]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#c8a261]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c8a261]">
            Connoisseur Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white">
            Loved by <span className="gold-gradient-text italic">Tea Aficionados</span> & Executives
          </h2>
          <p className="text-sm text-[#faf7f2]/80 font-light max-w-lg mx-auto">
            Discover why health professionals, luxury buyers, and corporate leaders choose The Tea Story.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#132218] p-8 rounded-3xl border border-[#c8a261]/30 flex flex-col justify-between space-y-6 hover:border-[#c8a261] transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#c8a261]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#c8a261]/20 group-hover:text-[#c8a261]/40 transition-colors" />
                </div>

                <p className="text-sm text-[#faf7f2]/90 font-light leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-semibold text-white text-base">{t.name}</h4>
                  <p className="text-xs text-gray-400 font-light">{t.role} • {t.location}</p>
                </div>
                <span className="text-[10px] text-[#c8a261] bg-[#c8a261]/10 px-2 py-1 rounded border border-[#c8a261]/30 font-mono">
                  {t.tea}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Press Badges */}
        <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap items-center justify-around text-xs text-[#faf7f2]/60 gap-6 uppercase tracking-widest font-serif text-center">
          <span>Featured in Vogue India</span>
          <span>•</span>
          <span>Architectural Digest Wellness</span>
          <span>•</span>
          <span>Economic Times Luxury</span>
          <span>•</span>
          <span>Forbes India Lifestyle</span>
        </div>

      </div>
    </section>
  );
};
