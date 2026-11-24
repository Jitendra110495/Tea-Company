import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import type { TeaFormat, SweetenerOption, CustomizerOptions } from '../../types';
import { X, Check, ShoppingBag, Gift, Sparkles, SlidersHorizontal, Package, Leaf } from 'lucide-react';

export const TeaCustomizerModal: React.FC = () => {
  const {
    customizerProduct,
    isCustomizerOpen,
    setIsCustomizerOpen,
    addToCart
  } = useStore();

  const [format, setFormat] = useState<TeaFormat>('Loose Leaf');
  const [sweetener, setSweetener] = useState<SweetenerOption>('Unsweetened');
  const [packageSize, setPackageSize] = useState<string>('50g');
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Reset customizer state when product opens
  useEffect(() => {
    if (customizerProduct) {
      setFormat('Loose Leaf');
      setSweetener('Unsweetened');
      setPackageSize('50g');
      setCustomEngraving('');
      setQuantity(1);
      setCurrentStep(1);
    }
  }, [customizerProduct]);

  if (!isCustomizerOpen || !customizerProduct) return null;

  // Package size options based on format
  const looseLeafSizes = [
    { label: '50g Small Tin', value: '50g', multiplier: 1.0, desc: '~25 cups' },
    { label: '100g Reserve Tin', value: '100g', multiplier: 1.8, desc: '~50 cups (Save 10%)' },
    { label: '250g Connoisseur Pouch', value: '250g', multiplier: 4.0, desc: '~125 cups (Save 20%)' },
    { label: '500g Estate Supply', value: '500g', multiplier: 7.5, desc: '~250 cups (Save 25%)' }
  ];

  const teaBagSizes = [
    { label: '25 Pyramid Bags', value: '25 Tea Bags', multiplier: 1.0, desc: '25 individual silk pyramids' },
    { label: '50 Pyramid Bags', value: '50 Tea Bags', multiplier: 1.85, desc: '50 individual silk pyramids (Save 8%)' },
    { label: '100 Pyramid Bags', value: '100 Tea Bags', multiplier: 3.4, desc: '100 individual silk pyramids (Save 15%)' }
  ];

  const currentSizes = format === 'Loose Leaf' ? looseLeafSizes : teaBagSizes;

  // Dynamic Price Calculation
  const selectedSizeConfig = currentSizes.find((s) => s.value === packageSize) || currentSizes[0];
  const engravingExtra = customEngraving.trim().length > 0 ? 150 : 0;
  const calculatedUnitPrice = Math.round(
    customizerProduct.price * selectedSizeConfig.multiplier + engravingExtra
  );
  const totalPrice = calculatedUnitPrice * quantity;

  const handleAddToCart = () => {
    const options: CustomizerOptions = {
      format,
      sweetener,
      packageSize,
      customEngraving: customEngraving.trim() || undefined
    };
    addToCart(customizerProduct, options, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-[#faf7f2] rounded-3xl shadow-2xl border border-[#c8a261]/30 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-[#17271f] text-white flex items-center justify-between border-b border-[#c8a261]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c8a261]/20 border border-[#c8a261] flex items-center justify-center text-[#c8a261]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-semibold tracking-wider">Custom Blend Studio</h2>
              <p className="text-xs text-[#c8a261] font-light">Customizing {customizerProduct.name}</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-[#f3efe6] px-6 py-3 border-b border-[#c8a261]/20 flex justify-between text-xs font-semibold text-[#8c6747]">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-1.5 ${currentStep === 1 ? 'text-[#17271f] underline' : ''}`}
          >
            <span className="w-5 h-5 rounded-full bg-[#17271f] text-[#c8a261] flex items-center justify-center text-[10px]">1</span>
            <span>Format</span>
          </button>
          
          <button
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-1.5 ${currentStep === 2 ? 'text-[#17271f] underline' : ''}`}
          >
            <span className="w-5 h-5 rounded-full bg-[#17271f] text-[#c8a261] flex items-center justify-center text-[10px]">2</span>
            <span>Sweetener</span>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-1.5 ${currentStep === 3 ? 'text-[#17271f] underline' : ''}`}
          >
            <span className="w-5 h-5 rounded-full bg-[#17271f] text-[#c8a261] flex items-center justify-center text-[10px]">3</span>
            <span>Size</span>
          </button>

          <button
            onClick={() => setCurrentStep(4)}
            className={`flex items-center gap-1.5 ${currentStep === 4 ? 'text-[#17271f] underline' : ''}`}
          >
            <span className="w-5 h-5 rounded-full bg-[#17271f] text-[#c8a261] flex items-center justify-center text-[10px]">4</span>
            <span>Laser Engraving</span>
          </button>
        </div>

        {/* Customization Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* STEP 1: Format Selection */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#17271f] flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#c8a261]" />
              <span>Step 1: Select Tea Format</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormat('Loose Leaf');
                  setPackageSize('50g');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  format === 'Loose Leaf'
                    ? 'bg-[#17271f] text-white border-[#c8a261] shadow-lg scale-101'
                    : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-semibold text-lg">Whole Loose Leaf</span>
                  {format === 'Loose Leaf' && <Check className="w-5 h-5 text-[#c8a261]" />}
                </div>
                <p className="text-xs opacity-80 leading-relaxed font-light">
                  Traditional artisanal whole leaf for clay teapots, gaiwans, and strainers. Maximum flavor extraction.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormat('Tea Bags');
                  setPackageSize('25 Tea Bags');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  format === 'Tea Bags'
                    ? 'bg-[#17271f] text-white border-[#c8a261] shadow-lg scale-101'
                    : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-semibold text-lg">Pyramid Silk Tea Bags</span>
                  {format === 'Tea Bags' && <Check className="w-5 h-5 text-[#c8a261]" />}
                </div>
                <p className="text-xs opacity-80 leading-relaxed font-light">
                  100% biodegradable cornstarch mesh pyramids. Convenient steeping for office or travel.
                </p>
              </button>
            </div>
          </div>

          {/* STEP 2: Sweetener Selection */}
          <div className="space-y-3 pt-4 border-t border-black/5">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#17271f] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c8a261]" />
              <span>Step 2: Select Sweetener Option</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSweetener('Unsweetened')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  sweetener === 'Unsweetened'
                    ? 'bg-[#17271f] text-white border-[#c8a261] shadow'
                    : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Unsweetened (Pure Natural)</span>
                  {sweetener === 'Unsweetened' && <Check className="w-4 h-4 text-[#c8a261]" />}
                </div>
                <span className="text-[11px] opacity-75 block mt-0.5">0 Sugar, 0 Calories. Pure authentic estate taste.</span>
              </button>

              <button
                type="button"
                onClick={() => setSweetener('Natural Stevia')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  sweetener === 'Natural Stevia'
                    ? 'bg-[#17271f] text-white border-[#c8a261] shadow'
                    : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Natural Stevia Infused</span>
                  {sweetener === 'Natural Stevia' && <Check className="w-4 h-4 text-[#c8a261]" />}
                </div>
                <span className="text-[11px] opacity-75 block mt-0.5">Zero-calorie organic stevia leaves for subtle sweetness.</span>
              </button>
            </div>
          </div>

          {/* STEP 3: Size Selection */}
          <div className="space-y-3 pt-4 border-t border-black/5">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#17271f] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#c8a261]" />
              <span>Step 3: Select Package Size</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSizes.map((sizeObj) => (
                <button
                  key={sizeObj.value}
                  type="button"
                  onClick={() => setPackageSize(sizeObj.value)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    packageSize === sizeObj.value
                      ? 'bg-[#17271f] text-white border-[#c8a261] shadow-sm'
                      : 'bg-white text-[#17271f] border-[#c8a261]/20 hover:border-[#c8a261]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{sizeObj.label}</span>
                    <span className="font-serif font-bold text-sm text-[#c8a261]">
                      ₹{Math.round(customizerProduct.price * sizeObj.multiplier)}
                    </span>
                  </div>
                  <span className="text-[11px] opacity-75 block mt-0.5">{sizeObj.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: Personalization Engraving */}
          <div className="space-y-3 pt-4 border-t border-black/5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-[#17271f] flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#c8a261]" />
                <span>Step 4: Custom Laser Engraving (Optional)</span>
              </h3>
              <span className="text-xs text-[#c8a261] font-semibold">+₹150</span>
            </div>

            <input
              type="text"
              value={customEngraving}
              onChange={(e) => setCustomEngraving(e.target.value)}
              placeholder="e.g., 'Priya's Morning Blend' or 'Happy Birthday Dad'"
              maxLength={35}
              className="w-full px-4 py-3 bg-white border border-[#17271f]/20 rounded-xl text-xs text-[#17271f] placeholder-gray-400 focus:outline-none focus:border-[#c8a261]"
            />
            <p className="text-[11px] text-[#8c6747]">
              Laser-engraved on the brass lid of your airtight luxury storage tin. Max 35 characters.
            </p>
          </div>

        </div>

        {/* Dynamic Price Summary & Cart Footer */}
        <div className="p-6 bg-white border-t border-[#c8a261]/20 space-y-4 shadow-xl">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#8c6747] font-medium">Quantity:</span>
              <div className="flex items-center border border-[#17271f]/20 rounded-lg bg-[#faf7f2]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-[#17271f] hover:bg-[#17271f]/10 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-[#17271f]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-[#17271f] hover:bg-[#17271f]/10 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#8c6747] block">Calculated Total</span>
              <span className="text-2xl font-serif font-bold text-[#17271f]">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-4 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold text-sm tracking-widest uppercase rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Custom Blend to Tasting Cart</span>
          </button>

        </div>

      </div>

    </div>
  );
};
