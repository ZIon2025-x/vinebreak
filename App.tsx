import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Ingredients } from './components/Ingredients';
import { AIConcierge } from './components/AIConcierge';
import { Footer } from './components/Footer';
import { Catalog } from './components/Catalog';
import { ProductDetail } from './components/ProductDetail';
import { StoryPage } from './components/StoryPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { FAQPage } from './components/FAQPage';
import { Toast } from './components/Toast';
import { ToastProvider } from './components/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEOHead } from './components/SEOHead';
import { PageView } from './types';
import { PRODUCTS as PRODUCT_DATA } from './data/products';
import { CartProvider } from './CartContext';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>({ type: 'home' });

  // Smooth scroll behavior for hash links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [currentView.type]);

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView.type) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            
            {/* Seamless Story Intro */}
            <div id="story" className="pt-32 pb-16 bg-brand-100 text-center px-6 relative z-10">
               {/* Gradient to blend with Hero */}
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-200 to-brand-100 opacity-50 pointer-events-none"></div>
               
               <div className="max-w-4xl mx-auto">
                 <div className="flex justify-center mb-8 text-brand-400 opacity-60">
                    <Sparkles size={24} strokeWidth={1} />
                 </div>
                 <p className="font-serif italic text-3xl md:text-5xl text-brand-950 leading-tight mb-10 reveal-element is-visible">
                   "To break the vine is to release its vitality."
                 </p>
                 <div className="max-w-lg mx-auto">
                   <p className="text-brand-800 font-light leading-relaxed mb-6">
                     We believe true luxury is found in the raw, unrefined energy of the earth. 
                     Our formulas are not made in a lab, but harvested from the soil.
                   </p>
                   <button 
                     onClick={() => handleNavigate({ type: 'story' })}
                     className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs border-b border-transparent hover:border-brand-600 transition-colors pb-1"
                   >
                     Read Our Philosophy
                   </button>
                 </div>
               </div>
            </div>

            {/* Products with seamless transition from Story */}
            <Products onProductClick={(id) => handleNavigate({ type: 'product', productId: id })} />
            
            <Ingredients />
            <AIConcierge />
          </>
        );
      case 'catalog':
        return <Catalog onProductClick={(id) => handleNavigate({ type: 'product', productId: id })} />;
      case 'product':
        const product = PRODUCT_DATA.find(p => p.id === currentView.productId);
        if (!product) return <div>Product not found</div>;
        return <ProductDetail product={product} onBack={() => handleNavigate({ type: 'catalog' })} onNavigate={handleNavigate} />;
      case 'story':
        return <StoryPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'orderConfirmation':
        return 'orderId' in currentView ? (
          <OrderConfirmationPage orderId={currentView.orderId} onNavigate={handleNavigate} />
        ) : (
          <div>Not found</div>
        );
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      default:
        return <div>Not found</div>;
    }
  };

  const viewKey =
    currentView.type === 'product' && 'productId' in currentView
      ? `product-${currentView.productId}`
      : currentView.type;

  const seoByView: Record<string, { title?: string; description?: string }> = {
    home: { title: 'Natural Vitality Skincare', description: 'Honoring the earth, the vine, and your natural skin barrier. Artisanal soaps and skincare from Bordeaux.' },
    catalog: { title: 'Collection', description: 'Every bar is a condensed story of the vineyard. Cured soaps and linens from Vinebreak.' },
    story: { title: 'Our Philosophy', description: 'To break the vine is to release its vitality. Our philosophy on raw, earth-inspired skincare.' },
    about: { title: 'The Estate', description: 'Meet the founders and our atelier in Bordeaux.' },
    contact: { title: 'Contact', description: 'Get in touch with the Vinebreak concierge.' },
    cart: { title: 'Shopping Bag', description: 'Your Vinebreak shopping bag.' },
    checkout: { title: 'Checkout', description: 'Complete your Vinebreak order.' },
    privacy: { title: 'Privacy Policy', description: 'Vinebreak privacy policy and data practices.' },
    terms: { title: 'Terms & Conditions', description: 'Vinebreak terms of use, shipping, and returns.' },
    faq: { title: 'FAQ', description: 'Frequently asked questions about Vinebreak products, shipping, and returns.' },
    orderConfirmation: { title: 'Order Confirmation', description: 'Thank you for your order.' },
  };

  const productView = currentView.type === 'product' && 'productId' in currentView;
  const product = productView ? PRODUCT_DATA.find((p) => p.id === currentView.productId) : null;
  const seo = product
    ? { title: product.name, description: product.description }
    : seoByView[currentView.type] ?? {};

  return (
    <ErrorBoundary>
      <CartProvider>
        <ToastProvider>
          <SEOHead title={seo.title} description={seo.description} />
          <div className="min-h-screen bg-brand-50 selection:bg-brand-950 selection:text-brand-100 relative">
            <a
              href="#main-content"
              className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-brand-950 focus:text-brand-50 focus:outline-none focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip:auto]"
            >
              Skip to main content
            </a>
            <div className="bg-grain" aria-hidden="true" />
            <Navigation onNavigate={handleNavigate} activeView={currentView.type} />
            <main id="main-content" tabIndex={-1}>
              <div key={viewKey} className="animate-fadeIn">
                {renderView()}
              </div>
            </main>
            <Footer onNavigate={handleNavigate} />
            <Toast />
          </div>
        </ToastProvider>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App;