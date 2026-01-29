import React from 'react';
import { useCart } from '../CartContext';
import { Button } from './Button';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface CartPageProps {
  onNavigate: (view: PageView) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-brand-50 flex flex-col items-center justify-center text-center px-6">
         <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-6">Your bag is empty</h1>
         <p className="text-brand-800 font-light mb-10 max-w-md">
           The harvest awaits. Discover our collection of cured soaps and linens.
         </p>
         <Button onClick={() => onNavigate({ type: 'catalog' })}>Explore Collection</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-50 animate-fadeIn">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-12 text-center">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-brand-50 border-t border-brand-200">
               {items.map((item) => (
                 <div key={item.id} className="py-8 border-b border-brand-200 flex gap-6 md:gap-10 items-center">
                    <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-brand-100 shadow-sm" />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-serif text-brand-950">{item.name}</h3>
                        <span className="font-serif text-lg text-brand-900">${item.price * item.quantity}</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-brand-500 mb-6">{item.scentProfile.top} & {item.scentProfile.heart}</p>
                      
                      <div className="flex justify-between items-center">
                         <div className="flex items-center border border-brand-300 w-28 justify-between px-3 py-1">
                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-brand-400 hover:text-brand-900 transition-colors"><Minus size={14}/></button>
                             <span className="font-serif text-brand-950 text-sm">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-brand-400 hover:text-brand-900 transition-colors"><Plus size={14}/></button>
                         </div>
                         <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-400 hover:text-red-900 transition-colors flex items-center gap-1 text-xs uppercase tracking-wider"
                         >
                            <Trash2 size={14} /> Remove
                         </button>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
            <button onClick={clearCart} className="text-xs text-brand-400 hover:text-brand-900 underline underline-offset-4">
                Remove all items
            </button>
          </div>

          {/* Summary */}
          <div className="bg-brand-100 p-8 border border-brand-200 lg:sticky lg:top-32">
             <h3 className="text-xl font-serif text-brand-950 mb-6">Order Summary</h3>
             
             <div className="space-y-4 mb-8 text-sm text-brand-800">
               <div className="flex justify-between">
                 <span>Subtotal</span>
                 <span>${cartTotal}</span>
               </div>
               <div className="flex justify-between">
                 <span>Shipping</span>
                 <span>Calculated at checkout</span>
               </div>
             </div>

             <div className="flex justify-between items-center border-t border-brand-300 pt-6 mb-8">
               <span className="font-bold text-brand-950 uppercase tracking-widest text-xs">Total</span>
               <span className="font-serif text-2xl text-brand-950">${cartTotal}</span>
             </div>

             <Button className="w-full justify-between group" onClick={() => onNavigate({ type: 'checkout' })}>
                Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
             </Button>
             
             <div className="mt-6 text-center">
                 <p className="text-[10px] text-brand-500 uppercase tracking-widest mb-2">Secure Transactions</p>
                 <p className="text-xs text-brand-400 leading-relaxed">
                    All shipments are packed in recycled linen and shipped carbon-neutral from Bordeaux.
                 </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
