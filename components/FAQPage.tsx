import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'product' | 'shipping' | 'returns';
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    category: 'product',
    question: 'How are Vinebreak soaps made?',
    answer:
      'Each bar is handcrafted at our atelier in Bordeaux using traditional cold-process methods. We cure our soaps in linen for six weeks to achieve a harder, longer-lasting bar with a richer lather.',
  },
  {
    id: '2',
    category: 'product',
    question: 'Are your products suitable for sensitive skin?',
    answer:
      'Our Linen Pure bar is formulated for sensitive skin with cold-pressed flax oil and minimal fragrance. We recommend patch-testing any new product. If you have specific concerns, our AI concierge Terra can help guide you.',
  },
  {
    id: '3',
    category: 'product',
    question: 'Do you use natural ingredients?',
    answer:
      'Yes. We prioritize raw, vineyard-inspired ingredients: grape extracts, vine seeds, flax oil, and botanicals. See the Ingredients section on our homepage for full transparency.',
  },
  {
    id: '4',
    category: 'shipping',
    question: 'Where do you ship?',
    answer:
      'We ship from Bordeaux, France, to addresses within France, the EU, and selected international destinations. Shipping options and delivery times are shown at checkout.',
  },
  {
    id: '5',
    category: 'shipping',
    question: 'How is packaging handled?',
    answer:
      'All orders are packed in recycled linen and shipped carbon-neutral where possible. We avoid single-use plastics in our packaging.',
  },
  {
    id: '6',
    category: 'returns',
    question: 'What is your return policy?',
    answer:
      'We accept returns of unopened, unused products within 14 days of delivery. Contact concierge@vinebreak.com to initiate a return. Refunds are issued to the original payment method once we receive the item.',
  },
  {
    id: '7',
    category: 'returns',
    question: 'Can I exchange a product?',
    answer:
      'Yes. If you would like a different scent or product, contact our concierge. We will arrange an exchange subject to availability.',
  },
];

const CATEGORY_LABELS: Record<FAQItem['category'], string> = {
  product: 'Product',
  shipping: 'Shipping',
  returns: 'Returns & Refunds',
};

interface FAQPageProps {
  onNavigate: (view: PageView) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const byCategory = FAQ_DATA.reduce<Record<FAQItem['category'], FAQItem[]>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<FAQItem['category'], FAQItem[]>
  );

  const order: FAQItem['category'][] = ['product', 'shipping', 'returns'];

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
        <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-4">Frequently Asked Questions</h1>
        <p className="text-brand-600 font-light mb-12">
          Everything you need to know about our products, shipping, and returns.
        </p>

        <div className="space-y-10">
          {order.map((category) => (
            <section key={category}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-500 mb-6">
                {CATEGORY_LABELS[category]}
              </h2>
              <div className="space-y-2">
                {(byCategory[category] ?? []).map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="border border-brand-200 bg-brand-50 overflow-hidden transition-colors hover:border-brand-300"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left font-serif text-brand-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                        id={`faq-question-${item.id}`}
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          size={20}
                          className={`flex-shrink-0 text-brand-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden
                        />
                      </button>
                      <div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-question-${item.id}`}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-4 px-5 pt-0 text-brand-700 font-light leading-relaxed text-sm border-t border-brand-200">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
