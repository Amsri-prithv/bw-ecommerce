import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export const Collection: React.FC<{ category?: string; title?: string }> = ({
  category = 'All',
  title = 'Collection',
}) => {
  const [filter, setFilter] = useState(category);
  const filtered =
    filter === 'All'
      ? products
      : products.filter((p) => p.category === filter || p.category === 'Unisex');

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h1 className="section-title mb-2">{title}</h1>
          <p className="text-sm text-brand-lightGray">{filtered.length} products</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-[11px] font-semibold tracking-widest uppercase rounded border transition-colors ${
                filter === cat
                  ? 'bg-white text-black border-white'
                  : 'border-brand-borderGray text-brand-lightGray hover:border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
