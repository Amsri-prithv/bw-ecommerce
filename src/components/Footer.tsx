import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darkGray border-t border-brand-borderGray mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border border-white flex items-center justify-center font-bold text-xs">
                B/W
              </div>
              <span className="text-xs font-bold tracking-widest">BLACK AND WHITE</span>
            </div>
            <p className="text-xs text-brand-lightGray leading-relaxed mb-4">
              Two colors. Infinite style. Premium 3D T-shirts crafted for the modern minimalist.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 border border-brand-borderGray rounded hover:border-white transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="p-2 border border-brand-borderGray rounded hover:border-white transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="p-2 border border-brand-borderGray rounded hover:border-white transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="p-2 border border-brand-borderGray rounded hover:border-white transition-colors">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-xs text-brand-lightGray">
              <li><Link to="/collection" className="hover:text-white">All Products</Link></li>
              <li><Link to="/men" className="hover:text-white">Men</Link></li>
              <li><Link to="/women" className="hover:text-white">Women</Link></li>
              <li><Link to="/new" className="hover:text-white">New Arrivals</Link></li>
              <li><Link to="/bestsellers" className="hover:text-white">Bestsellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-4">Help</h4>
            <ul className="space-y-2 text-xs text-brand-lightGray">
              <li><a href="#" className="hover:text-white">Track Order</a></li>
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-brand-lightGray">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-4">Policy</h4>
            <ul className="space-y-2 text-xs text-brand-lightGray">
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-borderGray flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-lightGray">
          <p>© 2026 BLACK AND WHITE. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>GPay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
