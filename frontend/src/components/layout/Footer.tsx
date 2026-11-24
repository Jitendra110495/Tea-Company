import React, { useState } from 'react';
import { Leaf, Award, Shield, Sparkles, Send } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { showToast, setIsAiAdvisorOpen, setIsBrewingTimerOpen, setActiveView } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    showToast('Thank you for joining The Tea Story Circle. Check your inbox for your welcome invitation!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#17271f] text-[#faf7f2] border-t border-[#c8a261]/30">
      
      {/* Luxury Badges Strip */}
      <div className="border-b border-[#c8a261]/20 py-10 px-4 sm:px-6 lg:px-8 bg-[#132218]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#c8a261]/10 border border-[#c8a261]/40 flex items-center justify-center text-[#c8a261] mb-3">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-white font-medium">100% Certified Organic</h4>
            <p className="text-xs text-[#faf7f2]/70 mt-1">Single-estate handpicked whole leaves without synthetic additives.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#c8a261]/10 border border-[#c8a261]/40 flex items-center justify-center text-[#c8a261] mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-white font-medium">Perfumer-Grade Quality</h4>
            <p className="text-xs text-[#faf7f2]/70 mt-1">Crafted with fragrance-level sensory precision and small-batch care.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#c8a261]/10 border border-[#c8a261]/40 flex items-center justify-center text-[#c8a261] mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-white font-medium">Direct Ethical Trade</h4>
            <p className="text-xs text-[#faf7f2]/70 mt-1">Direct partnership supporting high-altitude Himalayan tea artisans.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#c8a261]/10 border border-[#c8a261]/40 flex items-center justify-center text-[#c8a261] mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-white font-medium">Luxury Gift Packaging</h4>
            <p className="text-xs text-[#faf7f2]/70 mt-1">Custom engraved tins & recyclable presentation boxes for memorable gifting.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c8a261]/20 border border-[#c8a261] flex items-center justify-center text-[#c8a261]">
                <span className="text-xl font-serif font-bold">TS</span>
              </div>
              <span className="text-2xl font-serif tracking-wider font-semibold text-white">
                The Tea Story
              </span>
            </div>
            <p className="text-sm text-[#faf7f2]/80 leading-relaxed font-light">
              Redefining tea as a ritual of wellness, craftsmanship, and quiet luxury. Sourced from the world’s most pristine high-altitude tea gardens.
            </p>
            <div className="pt-2 text-xs text-[#c8a261] font-mono">
              Designed according to The Tea Story Brand Principles v1.0
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-widest text-[#c8a261] uppercase">Collections</h3>
            <ul className="space-y-2 text-sm text-[#faf7f2]/80">
              <li><button onClick={() => { setActiveView('shop'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="hover:text-[#c8a261] transition-colors">Assam Black Teas</button></li>
              <li><button onClick={() => { setActiveView('shop'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="hover:text-[#c8a261] transition-colors">Darjeeling First Flush</button></li>
              <li><button onClick={() => { setActiveView('shop'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="hover:text-[#c8a261] transition-colors">Ceremonial Uji Matcha</button></li>
              <li><button onClick={() => { setActiveView('shop'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="hover:text-[#c8a261] transition-colors">Kashmiri Saffron Kahwa</button></li>
              <li><button onClick={() => { setActiveView('shop'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="hover:text-[#c8a261] transition-colors">Royal White & Oolong</button></li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-widest text-[#c8a261] uppercase">Experiences</h3>
            <ul className="space-y-2 text-sm text-[#faf7f2]/80">
              <li><button onClick={() => setIsAiAdvisorOpen(true)} className="hover:text-[#c8a261] transition-colors flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#c8a261]" /> AI Tea Advisor</button></li>
              <li><button onClick={() => setIsBrewingTimerOpen(true)} className="hover:text-[#c8a261] transition-colors">Interactive Brewing Guide</button></li>
              <li><button onClick={() => { setActiveView('shop'); const el = document.getElementById('customizer-banner-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#c8a261] transition-colors">Custom Blend Studio</button></li>
              <li><button onClick={() => setActiveView('dashboard')} className="hover:text-[#c8a261] transition-colors">Order Tracking</button></li>
              <li><button onClick={() => setActiveView('admin')} className="hover:text-[#c8a261] transition-colors">Admin Portal</button></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-[#c8a261] uppercase">The Sommelier’s Letter</h3>
            <p className="text-sm text-[#faf7f2]/80 leading-relaxed font-light">
              Receive private invitations to micro-harvest releases, seasonal flush announcements, and sommelier tasting notes.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-4 py-3 bg-[#132218] border border-[#c8a261]/30 rounded-lg text-sm text-white placeholder-[#faf7f2]/40 focus:outline-none focus:border-[#c8a261]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] font-semibold rounded-lg transition-colors flex items-center justify-center shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] text-[#faf7f2]/50">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        <div className="border-t border-[#c8a261]/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#faf7f2]/60 gap-4">
          <p>© {new Date().getFullYear()} The Tea Story Commerce Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy: All customer data is secured according to ISO standards.', 'info'); }} className="hover:text-[#c8a261] transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service: Luxury guarantee applies to all shipments.', 'info'); }} className="hover:text-[#c8a261] transition-colors">Terms of Service</a>
            <a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Shipments delivered via Shiprocket Express across India.', 'info'); }} className="hover:text-[#c8a261] transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
