import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Timer, Play, Pause, RotateCcw, X, Volume2, Flame, Droplet } from 'lucide-react';

export const BrewingTimer: React.FC = () => {
  const {
    products,
    selectedTimerProduct,
    setSelectedTimerProduct,
    isBrewingTimerOpen,
    setIsBrewingTimerOpen,
    showToast
  } = useStore();

  const activeProduct = selectedTimerProduct || products[0];
  const totalDuration = activeProduct.brewingGuide.timerSeconds || 180;

  const [timeLeft, setTimeLeft] = useState<number>(totalDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Update timer duration when active product changes
  useEffect(() => {
    setTimeLeft(activeProduct.brewingGuide.timerSeconds || 180);
    setIsRunning(false);
  }, [activeProduct]);

  // Countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playChime();
      showToast(`✨ Your ${activeProduct.name} is steeped to perfection! Enjoy your ritual.`, 'success');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, activeProduct]);

  // Play audio chime using Web Audio API synth
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.6); // G5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (err) {
      console.log('Audio chime error:', err);
    }
  };

  if (!isBrewingTimerOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-[#17271f] text-white rounded-3xl shadow-2xl border border-[#c8a261]/40 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsBrewingTimerOpen(false);
            setIsRunning(false);
          }}
          className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-[#c8a261]/30 bg-[#132218] space-y-1">
          <div className="flex items-center justify-center gap-2 text-[#c8a261] font-semibold text-xs uppercase tracking-widest">
            <Timer className="w-4 h-4" />
            <span>Interactive Sommelier Timer</span>
          </div>
          <h2 className="text-xl font-serif font-light text-white">
            Precision Steeping Companion
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          
          {/* Tea Selection Dropdown */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs text-[#c8a261] font-semibold uppercase tracking-wider block">
              Select Tea Blend:
            </label>
            <select
              value={activeProduct.id}
              onChange={(e) => {
                const found = products.find((p) => p.id === e.target.value);
                if (found) setSelectedTimerProduct(found);
              }}
              className="w-full px-4 py-3 bg-[#132218] border border-[#c8a261]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#c8a261]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.brewingGuide.waterTemp}, {p.brewingGuide.steepTime})
                </option>
              ))}
            </select>
          </div>

          {/* Brewing Parameters Card */}
          <div className="grid grid-cols-3 gap-3 bg-[#132218] p-4 rounded-2xl border border-[#c8a261]/20 text-xs">
            <div className="flex flex-col items-center">
              <Flame className="w-4 h-4 text-[#c8a261] mb-1" />
              <span className="text-gray-400 text-[10px]">Water Temp</span>
              <span className="font-bold text-white text-sm">{activeProduct.brewingGuide.waterTemp}</span>
            </div>
            
            <div className="flex flex-col items-center border-x border-white/10">
              <Timer className="w-4 h-4 text-[#c8a261] mb-1" />
              <span className="text-gray-400 text-[10px]">Target Time</span>
              <span className="font-bold text-white text-sm">{activeProduct.brewingGuide.steepTime}</span>
            </div>

            <div className="flex flex-col items-center">
              <Droplet className="w-4 h-4 text-[#c8a261] mb-1" />
              <span className="text-gray-400 text-[10px]">Ratio</span>
              <span className="font-bold text-white text-sm">{activeProduct.brewingGuide.servingSize.split('/')[0]}</span>
            </div>
          </div>

          {/* Large Countdown Display */}
          <div className="relative py-8 flex flex-col items-center justify-center">
            
            {/* Progress Bar Circle Ring representation */}
            <div className="w-48 h-48 rounded-full border-4 border-white/10 flex items-center justify-center relative shadow-inner">
              <div
                className="absolute inset-0 rounded-full border-4 border-[#c8a261] transition-all duration-1000"
                style={{
                  clipPath: `inset(0 ${100 - progressPercent}% 0 0)`
                }}
              />
              
              <div className="space-y-1 text-center z-10">
                <span className="text-5xl font-serif font-bold text-white tracking-wider block font-mono">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
                <span className="text-xs text-[#c8a261] uppercase tracking-widest font-semibold block">
                  {isRunning ? 'Steeping Leaves...' : timeLeft === 0 ? 'Steep Completed!' : 'Ready to Steep'}
                </span>
              </div>
            </div>

          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setTimeLeft(totalDuration);
                setIsRunning(false);
              }}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 py-3.5 bg-[#c8a261] hover:bg-[#b89251] text-[#17271f] font-bold text-sm tracking-wider uppercase rounded-full shadow-xl transition-all flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Steeping</span>
                </>
              )}
            </button>

            <button
              onClick={playChime}
              className="p-3 bg-white/10 hover:bg-white/20 text-[#c8a261] rounded-full transition-colors"
              title="Test Chime Sound"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
