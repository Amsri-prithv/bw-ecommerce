import React from 'react';
import { Link } from 'react-router-dom';
import { TShirtCanvas } from '../components/TShirtCanvas';
import { ProductCard } from '../components/ProductCard';
import { TryOnStudio } from '../components/TryOnStudio';
import { products } from '../data/products';
import { ArrowRight, Box, Shirt, Shield, Truck, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const featured = products.slice(0, 5);
  const bestsellers = products.slice(5, 10);

  return (
    <div className="pt-16">
      <section className="relative min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12">
          <div className="space-y-6 order-2 lg:order-1">
            <p className="text-[11px] tracking-[0.3em] text-brand-lightGray uppercase">Premium 3D T-Shirts</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              TWO COLORS.<br /><span className="text-brand-lightGray">INFINITE STYLE.</span>
            </h1>
            <p className="text-brand-lightGray text-sm max-w-md leading-relaxed">
              Real-time 3D product experience. Try before you buy with our virtual fitting studio. 180 GSM premium cotton. Made in India.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/collection" className="btn-primary inline-flex items-center gap-2">
                Explore Collection <ArrowRight size={14} />
              </Link>
              <Link to="/#try-on" className="btn-secondary">Try It On</Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <TShirtCanvas color="#121212" height="h-[480px]" />
          </div>
        </div>
      </section>

      <section className="border-y border-brand-borderGray bg-brand-darkGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Box, label: '3D Experience', sub: 'Real-time Product View' },
            { icon: Shirt, label: 'Try On', sub: 'Virtual Fitting Studio' },
            { icon: Sparkles, label: 'Premium Quality', sub: 'Premium Fabric' },
            { icon: Shield, label: 'Secure Payment', sub: 'Safe Online Checkout' },
            { icon: Truck, label: 'Fast Delivery', sub: 'Track Your Order' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 py-2">
              <item.icon size={18} className="text-brand-lightGray shrink-0" />
              <div>
                <div className="text-[11px] font-semibold tracking-wider uppercase">{item.label}</div>
                <div className="text-[10px] text-brand-lightGray">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-brand-lightGray uppercase mb-1">03</p>
              <h2 className="section-title">Featured Collection</h2>
            </div>
            <Link to="/collection" className="text-[11px] tracking-widest uppercase text-brand-lightGray hover:text-white flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <div id="try-on">
        <TryOnStudio />
      </div>

      <section className="py-16 border-t border-brand-borderGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/men" className="group relative h-80 rounded-xl overflow-hidden border border-brand-borderGray">
              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop" alt="Men Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold tracking-widest mb-1">MEN COLLECTION</h3>
                <p className="text-sm text-brand-lightGray mb-4">Timeless. Minimal. You.</p>
                <span className="btn-secondary text-[10px]">Shop Men</span>
              </div>
            </Link>
            <Link to="/women" className="group relative h-80 rounded-xl overflow-hidden border border-brand-borderGray">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop" alt="Women Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold tracking-widest mb-1">WOMEN COLLECTION</h3>
                <p className="text-sm text-brand-lightGray mb-4">Effortless. Elegant. You.</p>
                <span className="btn-secondary text-[10px]">Shop Women</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-brand-borderGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-brand-lightGray uppercase mb-1">06</p>
              <h2 className="section-title">Bestsellers</h2>
            </div>
            <Link to="/bestsellers" className="text-[11px] tracking-widest uppercase text-brand-lightGray hover:text-white flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-brand-borderGray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border border-white mx-auto flex items-center justify-center font-bold mb-6">B/W</div>
          <h2 className="text-3xl font-bold tracking-widest mb-4">BLACK AND WHITE</h2>
          <p className="text-brand-lightGray leading-relaxed mb-6">
            It’s not just a brand. It’s a statement.<br />Simplicity. Quality. Confidence.<br />Two colors. Infinite style.
          </p>
          <Link to="/collection" className="btn-secondary inline-block">Discover More</Link>
        </div>
      </section>

      <section className="py-16 border-t border-brand-borderGray bg-brand-darkGray">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold tracking-widest mb-2">JOIN THE BLACK AND WHITE CLUB</h3>
          <p className="text-sm text-brand-lightGray mb-6">Be the first to know about new drops, offers and exclusive access.</p>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed! Welcome to the club.'); }}>
            <input type="email" placeholder="Enter your email" required className="flex-1 bg-black border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};
