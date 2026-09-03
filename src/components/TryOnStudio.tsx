import React from 'react';
import { RefreshCw, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useStore';
import { TShirtCanvas } from './TShirtCanvas';
import type { Product } from '../types';

export const TryOnStudio: React.FC = () => {
  const {
    selectedAvatar,
    tryOnColor,
    tryOnSize,
    tryOnWorkflowStep,
    setSelectedAvatar,
    setTryOnColor,
    setTryOnSize,
    nextStep,
    prevStep,
    resetWorkflow,
    addToCart,
  } = useAppStore();

  const colors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#121212' },
    { name: 'Oversized Gray', value: '#4A4A4A' },
    { name: 'Street Green', value: '#1E2D24' },
  ];

  const handleAddToCart = () => {
    const customShirt: Product = {
      id: `custom-${tryOnColor.replace('#', '')}-${Date.now()}`,
      name: `B/W Studio Tee (${colors.find((c) => c.value === tryOnColor)?.name || 'Custom'})`,
      price: 2249,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop',
      category: selectedAvatar === 'Male' ? 'Men' : 'Women',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      color: tryOnColor,
    };
    addToCart(customShirt, tryOnSize);
    resetWorkflow();
  };

  return (
    <section className="py-16 border-t border-brand-borderGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="section-title mb-2">3D TRY-ON EXPERIENCE</h2>
          <p className="text-brand-lightGray text-sm">See it. Wear it. Own it.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <TShirtCanvas color={tryOnColor} autoRotate={tryOnWorkflowStep < 3} />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    tryOnWorkflowStep >= step ? 'bg-white' : 'bg-brand-borderGray'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 border border-brand-borderGray p-6 bg-brand-darkGray rounded-xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] text-brand-lightGray uppercase tracking-widest">
                WORKFLOW STEP {tryOnWorkflowStep} of 4
              </span>
              <button
                onClick={resetWorkflow}
                className="text-[10px] flex items-center gap-1 text-brand-lightGray hover:text-white"
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>

            <div className="flex-1">
              {tryOnWorkflowStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold tracking-wider">1. Select Avatar</h4>
                  <p className="text-xs text-brand-lightGray">Choose your virtual fit mannequin.</p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {(['Male', 'Female'] as const).map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`py-4 rounded border text-sm font-semibold uppercase tracking-widest transition-all ${
                          selectedAvatar === avatar
                            ? 'bg-white text-black border-white'
                            : 'bg-black border-brand-borderGray text-brand-lightGray hover:border-brand-lightGray'
                        }`}
                      >
                        {avatar} Model
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {tryOnWorkflowStep === 2 && (
                <div className="space-y-5">
                  <h4 className="text-lg font-semibold tracking-wider">2. Select Color & Size</h4>
                  <p className="text-xs text-brand-lightGray">Configure real-time textures and sizing.</p>
                  <div className="space-y-2">
                    <span className="text-[10px] text-brand-lightGray font-semibold uppercase tracking-wider">Color Swatch</span>
                    <div className="flex gap-3">
                      {colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setTryOnColor(c.value)}
                          style={{ backgroundColor: c.value }}
                          className={`w-10 h-10 rounded-full border-2 transition-transform ${
                            tryOnColor === c.value ? 'scale-110 border-white shadow-glow' : 'border-brand-borderGray'
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-brand-lightGray font-semibold uppercase tracking-wider">Size</span>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setTryOnSize(size)}
                          className={`w-10 h-10 border flex items-center justify-center text-xs font-semibold rounded transition-colors ${
                            tryOnSize === size
                              ? 'bg-white text-black border-white'
                              : 'bg-black border-brand-borderGray hover:border-brand-lightGray'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tryOnWorkflowStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold tracking-wider">3. Wear & Pose</h4>
                  <p className="text-xs text-brand-lightGray">Drag the model to inspect material under light.</p>
                  <div className="p-4 border border-brand-borderGray bg-black rounded text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-brand-lightGray">Avatar</span>
                      <span className="font-mono">{selectedAvatar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-lightGray">Size</span>
                      <span className="font-mono">{tryOnSize} Standard</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-lightGray">Material Tension</span>
                      <span className="font-mono text-green-400">98.4% Relaxed</span>
                    </div>
                  </div>
                </div>
              )}

              {tryOnWorkflowStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold tracking-wider">4. Ready to Wear</h4>
                  <p className="text-xs text-brand-lightGray">Your customized B/W layout is ready.</p>
                  <div className="p-4 bg-brand-midGray border border-brand-borderGray rounded text-center">
                    <p className="text-sm font-bold tracking-wider mb-1">Custom Mono-Tee</p>
                    <p className="text-xs text-brand-lightGray mb-3">
                      Color: {colors.find((c) => c.value === tryOnColor)?.name} | Size: {tryOnSize}
                    </p>
                    <p className="text-lg font-mono font-bold">₹2,249</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              {tryOnWorkflowStep > 1 && (
                <button onClick={prevStep} className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              {tryOnWorkflowStep < 4 ? (
                <button onClick={nextStep} className="flex-1 btn-primary flex items-center justify-center gap-2">
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Check size={14} /> Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
