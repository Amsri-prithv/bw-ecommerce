import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useAppStore } from '../store/useStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { cartCount, toggleCart, isMobileMenuOpen, toggleMobileMenu } = useAppStore();
  const count = cartCount();

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/collection', label: 'COLLECTION' },
    { to: '/men', label: 'MEN' },
    { to: '/women', label: 'WOMEN' },
    { to: '/new', label: 'NEW ARRIVALS' },
    { to: '/bestsellers', label: 'BESTSELLERS' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-borderGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 border border-white flex items-center justify-center font-bold text-sm tracking-tighter group-hover:bg-white group-hover:text-black transition-all">
              B/W
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold tracking-[0.2em]">BLACK AND WHITE</div>
              <div className="text-[9px] text-brand-lightGray tracking-widest">TWO COLORS. INFINITE STYLE.</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] font-semibold tracking-[0.15em] transition-colors ${
                  location.pathname === link.to
                    ? 'text-white'
                    : 'text-brand-lightGray hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 text-brand-lightGray hover:text-white transition-colors" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="p-2 text-brand-lightGray hover:text-white transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart size={18} />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 text-brand-lightGray hover:text-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-brand-lightGray hover:text-white"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-borderGray bg-brand-darkGray">
          <nav className="flex flex-col py-4 px-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={toggleMobileMenu}
                className="py-3 text-sm font-semibold tracking-widest text-brand-lightGray hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
