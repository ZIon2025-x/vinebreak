import React from 'react';
import { PageView } from '../types';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (view: PageView) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-brand-50 min-h-screen pt-32 pb-20 animate-fadeIn">
      <div className="container mx-auto px-6 max-w-3xl">
        <button
          type="button"
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center gap-2 text-brand-600 hover:text-brand-950 text-sm uppercase tracking-widest mb-10 transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft size={16} />
          Home
        </button>
        <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-4">Terms & Conditions</h1>
        <p className="text-brand-500 text-sm mb-12">Last updated: January 2025</p>

        <div className="space-y-8 text-brand-800 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Use of the Site</h2>
            <p>
              By using the Vinebreak website, you agree to these terms. The site and its content are for personal, non-commercial use. You may not reproduce, distribute, or use our imagery or text without written permission.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Orders & Payment</h2>
            <p>
              All orders are subject to availability. We reserve the right to refuse or cancel orders. Prices are in the currency displayed and include applicable taxes unless otherwise stated. Payment is processed securely; we do not store full card details.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Shipping</h2>
            <p>
              We ship from our atelier in Bordeaux, France. Delivery times and costs are shown at checkout. Shipments are packed in recycled linen and sent carbon-neutral where possible. Risk of loss passes to you upon delivery to the carrier.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Returns & Refunds</h2>
            <p>
              Due to the nature of our artisanal soap products, we accept returns of unopened, unused items within 14 days of delivery. Please contact concierge@vinebreak.com to arrange a return. Refunds will be issued to the original payment method once we receive the returned item.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Contact</h2>
            <p>
              For any questions regarding these terms, please contact concierge@vinebreak.com or 12 Route des Vignes, 33000 Bordeaux, France.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
