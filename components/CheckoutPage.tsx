import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Button } from './Button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PageView } from '../types';

interface CheckoutPageProps {
  onNavigate: (view: PageView) => void;
}

interface FormErrors {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  });
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!shipping.fullName.trim()) next.fullName = 'Name is required';
    if (!shipping.address.trim()) next.address = 'Address is required';
    if (!shipping.city.trim()) next.city = 'City is required';
    if (!shipping.postalCode.trim()) next.postalCode = 'Postal code is required';
    if (!shipping.country.trim()) next.country = 'Country is required';
    const cardDigits = payment.cardNumber.replace(/\s/g, '');
    if (cardDigits.length < 13 || cardDigits.length > 19) next.cardNumber = 'Invalid card number';
    const [month, year] = payment.expiry.split('/').map((s) => s.trim());
    if (!month || !year || parseInt(month, 10) < 1 || parseInt(month, 10) > 12) next.expiry = 'Use MM/YY';
    if (payment.cvv.length < 3) next.cvv = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = `VB-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    setIsSubmitting(false);
    onNavigate({ type: 'orderConfirmation', orderId });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 19);
    return v.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) return `${v.slice(0, 2)}/${v.slice(2)}`;
    return v;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-brand-50 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-6">Your bag is empty</h1>
        <p className="text-brand-800 font-light mb-10 max-w-md">Add items to your bag to checkout.</p>
        <Button onClick={() => onNavigate({ type: 'catalog' })}>Explore Collection</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-50 animate-fadeIn">
      <div className="container mx-auto px-6 max-w-4xl">
        <button
          type="button"
          onClick={() => onNavigate({ type: 'cart' })}
          className="flex items-center gap-2 text-brand-600 hover:text-brand-950 text-sm uppercase tracking-widest mb-10 transition-colors"
          aria-label="Back to cart"
        >
          <ArrowLeft size={16} />
          Back to bag
        </button>

        <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-12 text-center">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-12">
          <section className="bg-brand-100 border border-brand-200 p-8 md:p-10">
            <h2 className="text-xl font-serif text-brand-950 mb-6">Shipping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">Full name</label>
                <input
                  type="text"
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.fullName ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                  placeholder="Jean Dupont"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-red-600 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">Address</label>
                <input
                  type="text"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.address ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                  placeholder="12 Route des Vignes"
                  aria-invalid={!!errors.address}
                />
                {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">City</label>
                <input
                  type="text"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.city ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                  placeholder="Bordeaux"
                  aria-invalid={!!errors.city}
                />
                {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">Postal code</label>
                <input
                  type="text"
                  value={shipping.postalCode}
                  onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                  className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.postalCode ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                  placeholder="33000"
                  aria-invalid={!!errors.postalCode}
                />
                {errors.postalCode && <p className="text-red-600 text-xs mt-1">{errors.postalCode}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">Country</label>
                <select
                  value={shipping.country}
                  onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                  className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.country ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                  aria-invalid={!!errors.country}
                >
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && <p className="text-red-600 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
          </section>

          <section className="bg-brand-100 border border-brand-200 p-8 md:p-10">
            <h2 className="text-xl font-serif text-brand-950 mb-6">Payment</h2>
            <p className="text-xs text-brand-500 mb-6 uppercase tracking-widest">Demo only — no real charges</p>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">Card number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={payment.cardNumber}
                  onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })}
                  className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.cardNumber ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                  placeholder="4242 4242 4242 4242"
                  aria-invalid={!!errors.cardNumber}
                />
                {errors.cardNumber && <p className="text-red-600 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                    className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.expiry ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                    placeholder="12/28"
                    aria-invalid={!!errors.expiry}
                  />
                  {errors.expiry && <p className="text-red-600 text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-500 mb-2">CVV</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={payment.cvv}
                    onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none font-light ${errors.cvv ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'}`}
                    placeholder="123"
                    aria-invalid={!!errors.cvv}
                  />
                  {errors.cvv && <p className="text-red-600 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-brand-100 border border-brand-200 p-8">
            <h2 className="text-xl font-serif text-brand-950 mb-6">Order summary</h2>
            <ul className="space-y-3 mb-6 text-sm text-brand-800">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center border-t border-brand-300 pt-6">
              <span className="font-bold text-brand-950 uppercase tracking-widest text-xs">Total</span>
              <span className="font-serif text-2xl text-brand-950">${cartTotal}</span>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate({ type: 'cart' })}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Back to bag
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing…
                </>
              ) : (
                `Place order — $${cartTotal}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
