import React, { useState } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../CartContext';
import { useToast } from './ToastContext';
import { SkeletonImage } from './Skeleton';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onNavigate: (view: any) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onNavigate }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ritual' | 'ingredients'>('ritual');
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [secondImageLoaded, setSecondImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${product.name} added to bag`);
  };

  return (
    <div className="bg-brand-50 min-h-screen pt-24 pb-20 animate-fadeIn">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-400 mb-8">
            <button onClick={() => onNavigate({ type: 'home' })} className="hover:text-brand-900 transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate({ type: 'catalog' })} className="hover:text-brand-900 transition-colors">Collection</button>
            <span>/</span>
            <span className="text-brand-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-brand-100 overflow-hidden relative group">
                {!mainImageLoaded && <SkeletonImage className="absolute inset-0 w-full h-full" />}
                <img
                    src={product.gallery[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onLoad={() => setMainImageLoaded(true)}
                />
            </div>
            {product.gallery[1] && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-brand-100 overflow-hidden relative">
                        {!secondImageLoaded && <SkeletonImage aspectRatio="aspect-square" className="absolute inset-0 w-full h-full" />}
                        <img
                            src={product.gallery[1]}
                            alt={`${product.name} detail`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            onLoad={() => setSecondImageLoaded(true)}
                        />
                    </div>
                    <div className="aspect-square bg-brand-200 flex items-center justify-center p-6 text-center">
                        <div>
                            <p className="font-serif text-brand-900 italic text-xl mb-2">"{product.scentProfile.heart}"</p>
                            <p className="text-[10px] uppercase tracking-widest text-brand-600">Key Note</p>
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="lg:sticky lg:top-32 h-fit">
             <h1 className="text-5xl md:text-6xl text-brand-950 font-serif mb-4">{product.name}</h1>
             <p className="text-2xl text-brand-900 font-light mb-8">${product.price}</p>
             
             <div className="h-px bg-brand-200 w-full mb-8"></div>
             
             <p className="text-brand-800 font-light leading-relaxed mb-8 text-lg">
                 {product.longDescription}
             </p>

             {/* Scent Profile */}
             <div className="bg-brand-100/50 p-6 mb-10 border border-brand-200">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-4">Olfactory Notes</h3>
                 <div className="grid grid-cols-3 gap-4 text-center">
                     <div>
                         <span className="block text-[10px] text-brand-400 uppercase mb-1">Top</span>
                         <span className="font-serif text-brand-900">{product.scentProfile.top}</span>
                     </div>
                     <div className="border-l border-brand-200 border-r">
                         <span className="block text-[10px] text-brand-400 uppercase mb-1">Heart</span>
                         <span className="font-serif text-brand-900">{product.scentProfile.heart}</span>
                     </div>
                     <div>
                         <span className="block text-[10px] text-brand-400 uppercase mb-1">Base</span>
                         <span className="font-serif text-brand-900">{product.scentProfile.base}</span>
                     </div>
                 </div>
             </div>

             {/* Actions */}
             <div className="flex gap-4 mb-12">
                 <div className="flex items-center border border-brand-300 w-32 justify-between px-4">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-brand-400 hover:text-brand-900 transition-colors"><Minus size={16}/></button>
                     <span className="font-serif text-brand-950 text-lg">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="text-brand-400 hover:text-brand-900 transition-colors"><Plus size={16}/></button>
                 </div>
                 <Button className="flex-1" onClick={handleAddToCart}>
                     Add to Bag — ${(product.price * quantity)}
                 </Button>
             </div>

             {/* Tabs */}
             <div className="border-t border-brand-200">
                 <div className="flex gap-8 mb-6 mt-4">
                     <button 
                        onClick={() => setActiveTab('ritual')}
                        className={`text-xs uppercase tracking-widest pb-1 transition-colors ${activeTab === 'ritual' ? 'text-brand-950 border-b border-brand-950' : 'text-brand-400'}`}
                     >
                         The Ritual
                     </button>
                     <button 
                        onClick={() => setActiveTab('ingredients')}
                        className={`text-xs uppercase tracking-widest pb-1 transition-colors ${activeTab === 'ingredients' ? 'text-brand-950 border-b border-brand-950' : 'text-brand-400'}`}
                     >
                         Benefits
                     </button>
                 </div>
                 <div className="min-h-[100px] text-brand-800 font-light leading-relaxed text-sm">
                     {activeTab === 'ritual' ? (
                         <p>{product.ritual}</p>
                     ) : (
                         <ul className="list-disc pl-5 space-y-2">
                             {product.benefits.map(b => <li key={b}>{b}</li>)}
                         </ul>
                     )}
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
