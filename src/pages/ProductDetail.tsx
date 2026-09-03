import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { TShirtCanvas } from '../components/TShirtCanvas';
import { useAppStore } from '../store/useStore';
import { ArrowLeft, Star } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const addToCart = useAppStore((s) => s.addToCart);
  const [selectedSize, setSelectedSize] = useState('M');
  const [color, setColor] = useState(product?.color || '#FFFFFF');

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <p className="text-brand-lightGray">Product not found</p>
        <Link to="/collection" className="btn-secondary mt-4 inline-block">Back to Collection</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Link to="/collection" className="inline-flex items-center gap-1 text-xs text-brand-lightGray hover:text-white mb-6">
          <ArrowLeft size={14} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <TShirtCanvas color={color} autoRotate height="h-[500px]" />
            <div className="flex gap-2 justify-center">
              {['FRONT', 'BACK', 'LEFT', 'RIGHT', 'ZOOM', 'RESET'].map((label) => (
                <button key={label} className="text-[9px] tracking-widest text-brand-lightGray hover:text-white px-2 py-1 border border-brand-borderGray rounded">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} fill={i <= 4 ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-xs text-brand-lightGray">4.8 (120 reviews)</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-mono font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg font-mono text-brand-lightGray line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {product.discount && (
                  <span className="text-sm text-green-400 font-semibold">{product.discount}</span>
                )}
              </div>
            </div>

            <p className="text-sm text-brand-lightGray leading-relaxed">
              {product.description || '180 GSM Premium Cotton. Bio Washed. Pre Shrunk. Oversized Fit. Unisex. Made in India.'}
            </p>

            <div>
              <span className="text-[11px] tracking-widest uppercase text-brand-lightGray block mb-2">
                Color: {color === '#FFFFFF' ? 'Optic White' : color === '#121212' ? 'Black' : 'Custom'}
              </span>
              <div className="flex gap-2">
                {['#FFFFFF', '#121212', '#4A4A4A'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-white scale-110' : 'border-brand-borderGray'}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] tracking-widest uppercase text-brand-lightGray block mb-2">Size</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 border text-sm font-semibold rounded transition-colors ${
                      selectedSize === size ? 'bg-white text-black border-white' : 'border-brand-borderGray hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="text-[10px] text-brand-lightGray underline mt-2">Size Guide</button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => addToCart({ ...product, color }, selectedSize)} className="flex-1 btn-primary">
                Add to Cart
              </button>
              <button className="flex-1 btn-secondary">Try It On</button>
            </div>

            <div className="pt-4 border-t border-brand-borderGray grid grid-cols-2 gap-3 text-xs text-brand-lightGray">
              <div>• 180 GSM Premium Cotton</div>
              <div>• Bio Washed</div>
              <div>• Pre Shrunk</div>
              <div>• Oversized Fit</div>
              <div>• Unisex</div>
              <div>• Made in India</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
