import React, { useState, useEffect } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { PageView } from '../types';
import { useCart } from '../CartContext';
import { Button } from './Button';

interface NavigationProps {
  onNavigate: (view: PageView) => void;
  activeView: PageView['type'];
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, activeView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const { cartCount, items, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync manual open state (e.g. from adding to cart) with hover state logic if needed
  // primarily used to show feedback when adding items
  useEffect(() => {
    if (isCartOpen) {
      setCartHover(true);
      const timer = setTimeout(() => {
          setIsCartOpen(false);
          // Only auto-close if not currently hovering
          if (!document.querySelector(':hover > .cart-container')) {
             setCartHover(false);
          }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen, setIsCartOpen]);

  const handleLinkClick = (viewType: PageView['type']) => {
    onNavigate({ type: viewType } as PageView);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    setCartHover(false);
    onNavigate({ type: 'cart' });
  };

  const isCartOpenState = cartHover || isCartOpen;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setCartHover(false);
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setIsCartOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled || activeView !== 'home'
          ? 'bg-brand-100/90 backdrop-blur-md py-4 border-brand-200 shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
          : 'bg-transparent py-8 border-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div
          className="text-2xl font-serif font-bold tracking-[0.2em] cursor-pointer transition-colors text-brand-950"
          onClick={() => handleLinkClick('home')}
          onKeyDown={(e) => e.key === 'Enter' && handleLinkClick('home')}
          role="button"
          tabIndex={0}
          aria-label="Vinebreak home"
        >
          VINEBREAK
        </div>

        <div className="hidden md:flex space-x-12 font-sans text-xs font-bold tracking-[0.15em] uppercase">
          <button
            type="button"
            onClick={() => handleLinkClick('catalog')}
            className={`transition-colors relative group ${activeView === 'catalog' ? 'text-brand-600' : 'text-brand-900/80 hover:text-brand-600'}`}
            aria-current={activeView === 'catalog' ? 'page' : undefined}
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('story')}
            className={`transition-colors relative group ${activeView === 'story' ? 'text-brand-600' : 'text-brand-900/80 hover:text-brand-600'}`}
            aria-current={activeView === 'story' ? 'page' : undefined}
          >
            Philosophy
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('about')}
            className={`transition-colors relative group ${activeView === 'about' ? 'text-brand-600' : 'text-brand-900/80 hover:text-brand-600'}`}
            aria-current={activeView === 'about' ? 'page' : undefined}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className={`transition-colors relative group ${activeView === 'contact' ? 'text-brand-600' : 'text-brand-900/80 hover:text-brand-600'}`}
            aria-current={activeView === 'contact' ? 'page' : undefined}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div
            className="relative cart-container group"
            onMouseEnter={() => setCartHover(true)}
            onMouseLeave={() => setCartHover(false)}
          >
            <button
              type="button"
              className="text-brand-900 hover:text-brand-600 transition-colors relative py-2"
              onClick={handleCartClick}
              aria-expanded={isCartOpenState}
              aria-haspopup="true"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} aria-hidden />
              {cartCount > 0 && (
                <span className="absolute top-0 -right-2 bg-brand-700 text-brand-50 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-serif animate-[scaleIn_0.2s_ease-out]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {isCartOpenState && (
                <div className="absolute top-full right-0 w-80 bg-brand-50 border border-brand-200 shadow-xl rounded-sm overflow-hidden animate-fadeIn" role="dialog" aria-label="Shopping bag summary">
                    <div className="p-4 border-b border-brand-200 flex justify-between items-center bg-brand-100/50">
                        <span className="text-xs uppercase tracking-widest text-brand-950 font-bold">Shopping Bag</span>
                        <span className="text-xs text-brand-500">{cartCount} items</span>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto scrollbar-hide p-4 space-y-4">
                        {items.length === 0 ? (
                            <div className="text-center py-8">
                                <span className="block text-brand-400 mb-2">Your bag is empty.</span>
                                <button onClick={() => {setCartHover(false); handleLinkClick('catalog');}} className="text-xs border-b border-brand-400 text-brand-600">Browse Collection</button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <img src={item.image} alt="" className="w-12 h-16 object-cover bg-brand-200" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-serif text-brand-950 text-sm">{item.name}</h4>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                                className="text-brand-300 hover:text-brand-900 transition-colors"
                                                aria-label={`Remove ${item.name} from bag`}
                                            >
                                                <X size={14} aria-hidden />
                                            </button>
                                        </div>
                                        <p className="text-[10px] uppercase text-brand-500 mb-1">{item.scentProfile.top}</p>
                                        <div className="flex justify-between items-end text-xs text-brand-800">
                                            <span>Qty: {item.quantity}</span>
                                            <span>${item.price * item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="p-4 bg-brand-100/30 border-t border-brand-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs uppercase tracking-widest text-brand-500">Subtotal</span>
                                <span className="font-serif text-lg text-brand-950">${cartTotal}</span>
                            </div>
                            <Button
                                type="button"
                                className="w-full py-3 text-xs"
                                onClick={handleCartClick}
                            >
                                Checkout
                            </Button>
                        </div>
                    )}
                </div>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-brand-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden fixed top-0 left-0 w-full h-screen bg-brand-100/95 backdrop-blur-xl border-t border-brand-200 z-40 flex flex-col justify-center items-center space-y-8 animate-fadeIn" role="dialog" aria-label="Mobile menu">
            <button
                type="button"
                className="absolute top-8 right-6 text-brand-900"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
            >
                <X size={24} aria-hidden />
            </button>
            <button onClick={() => handleLinkClick('catalog')} className="text-brand-950 uppercase tracking-[0.2em] text-2xl font-serif">Collection</button>
            <button onClick={() => handleLinkClick('story')} className="text-brand-950 uppercase tracking-[0.2em] text-2xl font-serif">Philosophy</button>
            <button onClick={() => handleLinkClick('about')} className="text-brand-950 uppercase tracking-[0.2em] text-2xl font-serif">About</button>
            <button onClick={() => handleLinkClick('contact')} className="text-brand-950 uppercase tracking-[0.2em] text-2xl font-serif">Contact</button>
            <button onClick={() => handleLinkClick('cart')} className="text-brand-950 uppercase tracking-[0.2em] text-2xl font-serif">Bag ({cartCount})</button>
        </div>
      )}
    </nav>
  );
};
