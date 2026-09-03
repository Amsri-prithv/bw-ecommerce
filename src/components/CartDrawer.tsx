import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useStore';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useAppStore();

  const total = cartTotal();
  const discount = Math.round(total * 0.2);
  const finalTotal = total - discount;

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-50"
        onClick={() => setCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-darkGray border-l border-brand-borderGray z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-brand-borderGray">
          <h2 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            <ShoppingBag size={16} /> Cart ({cart.length})
          </h2>
          <button onClick={() => setCartOpen(false)} className="p-1 text-brand-lightGray hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-brand-lightGray">
              <ShoppingBag size={48} className="mb-4 opacity-30" />
              <p className="text-sm">Your cart is empty</p>
              <button onClick={() => setCartOpen(false)} className="mt-4 btn-secondary">
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-brand-midGray rounded-lg border border-brand-borderGray"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded bg-brand-borderGray"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate">{item.name}</h3>
                  <p className="text-xs text-brand-lightGray mt-0.5">
                    Size: {item.selectedSize}
                  </p>
                  <p className="text-sm font-mono mt-1">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-brand-borderGray rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-1.5 hover:bg-brand-borderGray"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="p-1.5 hover:bg-brand-borderGray"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-[10px] text-brand-lightGray hover:text-white uppercase tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-brand-borderGray space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-brand-lightGray">
                <span>Subtotal</span>
                <span className="font-mono">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-brand-lightGray">
                <span>Discount</span>
                <span className="font-mono text-green-400">-₹{discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-brand-lightGray">
                <span>Shipping</span>
                <span className="font-mono">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-brand-borderGray">
                <span>TOTAL</span>
                <span className="font-mono">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full btn-primary text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
