import React from 'react';
import { PageView } from '../types';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (view: PageView) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
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
        <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-4">Privacy Policy</h1>
        <p className="text-brand-500 text-sm mb-12">Last updated: January 2025</p>

        <div className="prose prose-brand space-y-8 text-brand-800 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Data We Collect</h2>
            <p>
              Vinebreak collects information you provide when placing an order, contacting our concierge, or subscribing to our newsletter. This may include your name, email address, shipping address, and payment details. We use this information solely to process orders, respond to inquiries, and send relevant updates about our products and harvests.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">How We Use Your Data</h2>
            <p>
              Your data is used to fulfill orders, communicate with you about your order or inquiries, and—with your consent—to send our seasonal newsletter. We do not sell or share your personal information with third parties for marketing purposes.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Cookies</h2>
            <p>
              Our site may use cookies to improve your experience, such as remembering your cart and preferences. You can adjust your browser settings to limit or disable cookies if you prefer.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-serif text-brand-950 mb-3">Contact</h2>
            <p>
              For questions about this policy or your personal data, please contact us at concierge@vinebreak.com or write to 12 Route des Vignes, 33000 Bordeaux, France.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
