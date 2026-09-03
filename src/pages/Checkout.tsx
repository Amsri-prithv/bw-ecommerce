import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useStore';
import { Check } from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useAppStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const total = cartTotal();
  const discount = Math.round(total * 0.2);
  const finalTotal = total - discount;

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="pt-32 text-center">
        <p className="text-brand-lightGray mb-4">Your cart is empty</p>
        <button onClick={() => navigate('/collection')} className="btn-primary">Shop Now</button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      clearCart();
      setStep(3);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-4 mb-10">
          {['Information', 'Payment', 'Confirmation'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1 || step === i + 1 ? 'bg-white text-black' : 'border border-brand-borderGray text-brand-lightGray'
              }`}>
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-[11px] tracking-widest uppercase hidden sm:block ${
                step >= i + 1 ? 'text-white' : 'text-brand-lightGray'
              }`}>{label}</span>
              {i < 2 && <div className="w-8 h-px bg-brand-borderGray mx-2" />}
            </div>
          ))}
        </div>

        {step === 3 ? (
          <div className="text-center py-12 card p-10">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={28} />
            </div>
            <h2 className="text-2xl font-bold tracking-widest mb-2">Order Confirmed!</h2>
            <p className="text-brand-lightGray mb-6">Thank you for shopping with B/W. Your order is being processed.</p>
            <p className="font-mono text-sm mb-8">Order ID: BW-ORD-{Date.now().toString().slice(-6)}</p>
            <button onClick={() => navigate('/')} className="btn-primary">Continue Shopping</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
              {step === 1 && (
                <>
                  <h2 className="text-lg font-bold tracking-widest mb-4">Shipping Information</h2>
                  <input required placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full bg-brand-midGray border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-brand-midGray border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
                    <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-brand-midGray border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
                  </div>
                  <input required placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full bg-brand-midGray border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
                  <div className="grid grid-cols-3 gap-3">
                    <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full bg-brand-midGray border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
                    <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full bg-brand-midGray border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
                    <input required placeholder="PIN" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="w-full bg-brand-midGray border border-brand-borderGray rounded px-4 py-3 text-sm focus:outline-none focus:border-white" />
                  </div>
                  <button type="submit" className="w-full btn-primary mt-4">Continue to Payment</button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-lg font-bold tracking-widest mb-4">Payment</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-brand-borderGray rounded cursor-pointer hover:border-white">
                      <input type="radio" name="pay" defaultChecked className="accent-white" />
                      <span className="text-sm">UPI (GPay / PhonePe / Paytm)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-brand-borderGray rounded cursor-pointer hover:border-white">
                      <input type="radio" name="pay" className="accent-white" />
                      <span className="text-sm">Cards (Visa / Mastercard / RuPay)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-brand-borderGray rounded cursor-pointer hover:border-white">
                      <input type="radio" name="pay" className="accent-white" />
                      <span className="text-sm">Net Banking</span>
                    </label>
                  </div>
                  <p className="text-xs text-brand-lightGray mt-4">
                    Payable Amount: <span className="text-white font-mono font-bold">₹{finalTotal.toLocaleString()}</span>
                  </p>
                  <button type="submit" className="w-full btn-primary mt-4">Pay ₹{finalTotal.toLocaleString()} Securely</button>
                  <button type="button" onClick={() => setStep(1)} className="w-full btn-secondary mt-2">Back</button>
                </>
              )}
            </form>

            <div className="lg:col-span-2">
              <div className="card p-5 sticky top-24">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 text-xs">
                      <img src={item.image} alt="" className="w-12 h-14 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-brand-lightGray">{item.selectedSize} × {item.quantity}</p>
                      </div>
                      <p className="font-mono">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-brand-borderGray pt-3 space-y-1.5 text-sm">
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
                  <div className="flex justify-between font-bold pt-2">
                    <span>Total</span>
                    <span className="font-mono">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
