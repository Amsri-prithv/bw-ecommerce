import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { useAppStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useAppStore((s) => s.addToCart);

  return (
    <div className="group relative card">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-white text-black text-[9px] font-bold px-2 py-0.5 tracking-wider">NEW</span>
          )}
          {product.isSale && (
            <span className="bg-white text-black text-[9px] font-bold px-2 py-0.5 tracking-wider">SALE</span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 'M');
            }}
            className="flex-1 bg-white text-black text-[10px] font-bold tracking-widest uppercase py-2.5 flex items-center justify-center gap-1.5 hover:bg-brand-lightGray"
          >
            <ShoppingBag size={12} /> Add
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex-1 border border-white text-white text-[10px] font-bold tracking-widest uppercase py-2.5 text-center hover:bg-white hover:text-black transition-colors"
          >
            Try On
          </Link>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold tracking-wide">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-sm">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-brand-lightGray line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="text-[10px] text-green-400 font-semibold">{product.discount}</span>
              )}
            </div>
          </div>
          <button className="p-1.5 text-brand-lightGray hover:text-white transition-colors">
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
