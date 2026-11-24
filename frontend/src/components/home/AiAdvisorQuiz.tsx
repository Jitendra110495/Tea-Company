import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Product } from '../../types';
import { Sparkles, X, RotateCcw, SlidersHorizontal, Eye } from 'lucide-react';

export const AiAdvisorQuiz: React.FC = () => {
  const {
    products,
    isAiAdvisorOpen,
    setIsAiAdvisorOpen,
    openCustomizer,
    openDetailModal
  } = useStore();

  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<string>('');
  const [_timeOfDay, setTimeOfDay] = useState<string>('');
  const [_flavorPreference, setFlavorPreference] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  if (!isAiAdvisorOpen) return null;

  const handleCalculateRecommendations = (selectedFlavor: string) => {
    setFlavorPreference(selectedFlavor);

    // Simple intelligent matching algorithm based on answers
    let matched = [...products];

    if (goal === 'Sleep & Relaxation') {
      matched = matched.filter((p) => p.caffeine === 'None' || p.category === 'Herbal Tea');
    } else if (goal === 'Morning Focus') {
      matched = matched.filter((p) => p.caffeine === 'High' || p.caffeine === 'Medium');
    } else if (goal === 'Saffron & Royalty') {
      matched = matched.filter((p) => p.name.includes('Kahwa') || p.name.includes('Reserve'));
    }

    if (matched.length === 0) matched = products.slice(0, 2);

    setRecommendations(matched.slice(0, 2));
    setStep(4); // Results step
  };

  const resetQuiz = () => {
    setStep(1);
    setGoal('');
    setTimeOfDay('');
    setFlavorPreference('');
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-[#17271f] text-white rounded-3xl shadow-2xl border border-[#c8a261]/40 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAiAdvisorOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 text-center border-b border-[#c8a261]/30 bg-[#132218] space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#c8a261]/20 border border-[#c8a261] flex items-center justify-center text-[#c8a261] mx-auto mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-wide">
            AI Sommelier <span className="gold-gradient-text italic">Tea Advisor</span>
          </h2>
          <p className="text-xs text-[#faf7f2]/70 max-w-md mx-auto font-light">
            Answer 3 quick sensory questions to discover your personalized organic tea blend.
          </p>
        </div>

        {/* Quiz Content Container */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Wellness Objective */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-[#c8a261] font-semibold block">
                Question 1 of 3
              </span>
              <h3 className="text-lg font-serif text-white font-medium">
                What is your primary wellness objective today?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Morning Focus & Energy', desc: 'High-altitude caffeine and polyphenols', value: 'Morning Focus' },
                  { title: 'Sleep & Relaxation', desc: 'Caffeine-free soothing botanical herbs', value: 'Sleep & Relaxation' },
                  { title: 'Royal Heritage & Spices', desc: 'Saffron, cardamom, and almond warmth', value: 'Saffron & Royalty' },
                  { title: 'Skin Radiance & Antioxidants', desc: 'Vitamin C, hibiscus, and white teas', value: 'Radiance' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setGoal(opt.value);
                      setStep(2);
                    }}
                    className="p-4 rounded-xl bg-[#132218] border border-[#c8a261]/30 hover:border-[#c8a261] text-left transition-all hover:scale-101 space-y-1 group"
                  >
                    <span className="font-semibold text-sm text-[#faf7f2] group-hover:text-[#c8a261] transition-colors block">
                      {opt.title}
                    </span>
                    <span className="text-xs text-[#faf7f2]/60 block font-light">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Time of Day */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-[#c8a261] font-semibold block">
                Question 2 of 3
              </span>
              <h3 className="text-lg font-serif text-white font-medium">
                When do you most enjoy your tea ritual?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Dawn / Early Morning', value: 'Morning' },
                  { title: 'Mid-Day Corporate Break', value: 'Mid-Day' },
                  { title: 'Evening Twilight', value: 'Evening' },
                  { title: 'Late Night Wind-Down', value: 'Night' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setTimeOfDay(opt.value);
                      setStep(3);
                    }}
                    className="p-4 rounded-xl bg-[#132218] border border-[#c8a261]/30 hover:border-[#c8a261] text-left transition-all hover:scale-101"
                  >
                    <span className="font-semibold text-sm text-[#faf7f2] block">{opt.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Flavor Preference */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-[#c8a261] font-semibold block">
                Question 3 of 3
              </span>
              <h3 className="text-lg font-serif text-white font-medium">
                Which aromatic note appeals most to your palate?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Malty & Honeyed Caramel', value: 'Malty' },
                  { title: 'Floral Muscatel & Jasmine', value: 'Floral' },
                  { title: 'Soothing Lavender & Chamomile', value: 'Lavender' },
                  { title: 'Intense Umami & Steamed Greens', value: 'Umami' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleCalculateRecommendations(opt.value)}
                    className="p-4 rounded-xl bg-[#132218] border border-[#c8a261]/30 hover:border-[#c8a261] text-left transition-all hover:scale-101"
                  >
                    <span className="font-semibold text-sm text-[#faf7f2] block">{opt.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Results Display */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#c8a261] font-semibold">
                  Your Signature Sommelier Matches
                </span>
                <h3 className="text-xl font-serif text-white font-light">
                  Tailored specifically for your <span className="italic text-[#c8a261]">{goal}</span> ritual
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-[#132218] p-4 rounded-2xl border border-[#c8a261]/40 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 object-cover rounded-xl border border-[#c8a261]/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#c8a261] font-medium uppercase tracking-wider block">
                          {prod.category}
                        </span>
                        <h4 className="font-serif font-bold text-white text-sm truncate">
                          {prod.name}
                        </h4>
                        <span className="text-xs font-bold text-[#c8a261] block mt-0.5">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#faf7f2]/70 font-light line-clamp-2">
                      {prod.subtitle}
                    </p>

                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          setIsAiAdvisorOpen(false);
                          openCustomizer(prod);
                        }}
                        className="flex-1 py-2 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Customize</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsAiAdvisorOpen(false);
                          openDetailModal(prod);
                        }}
                        className="p-2 bg-white/10 text-white hover:bg-white/20 rounded-lg text-xs"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 text-xs text-[#c8a261] hover:text-white flex items-center gap-1.5 underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Recommendation Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
