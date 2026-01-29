import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { PageView } from '../types';
import { useToast } from './ToastContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSubscribed(true);
      setEmail('');
      showToast('You are now subscribed to our newsletter.', 'success');
    } catch {
      showToast('Subscription failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-950 text-brand-100 py-20 border-t border-brand-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <h3
              className="font-serif text-3xl text-brand-100 tracking-tight cursor-pointer"
              onClick={() => onNavigate({ type: 'home' })}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate({ type: 'home' })}
              role="button"
              tabIndex={0}
            >
              Vinebreak
            </h3>
            <p className="text-sm font-light text-brand-300 leading-relaxed max-w-xs">
              Honoring the earth, the vine, and your natural skin barrier. Cultivating vitality through raw, unrefined ingredients.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-brand-50 mb-6 italic">Apothecary</h4>
            <ul className="space-y-3 text-sm font-light text-brand-300">
              <li>
                <button type="button" onClick={() => onNavigate({ type: 'catalog' })} className="hover:text-brand-50 transition-colors hover:translate-x-1 inline-block duration-300">
                  Bar Soaps
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ type: 'catalog' })} className="hover:text-brand-50 transition-colors hover:translate-x-1 inline-block duration-300">
                  Body Oils
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ type: 'catalog' })} className="hover:text-brand-50 transition-colors hover:translate-x-1 inline-block duration-300">
                  Linens
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-brand-50 mb-6 italic">Journal</h4>
            <ul className="space-y-3 text-sm font-light text-brand-300">
              <li>
                <button type="button" onClick={() => onNavigate({ type: 'story' })} className="hover:text-brand-50 transition-colors hover:translate-x-1 inline-block duration-300">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ type: 'about' })} className="hover:text-brand-50 transition-colors hover:translate-x-1 inline-block duration-300">
                  The Estate
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ type: 'contact' })} className="hover:text-brand-50 transition-colors hover:translate-x-1 inline-block duration-300">
                  Contact
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ type: 'faq' })} className="hover:text-brand-50 transition-colors hover:translate-x-1 inline-block duration-300">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-brand-50 mb-6 italic">Stay Rooted</h4>
            <p className="text-xs text-brand-400 mb-6">
              Join our community for seasonal harvest news and exclusive releases.
            </p>
            {subscribed ? (
              <p className="text-brand-300 text-sm font-light">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex border-b border-brand-800 pb-3 group focus-within:border-brand-400 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Email Address"
                    className="bg-transparent w-full focus:outline-none text-brand-100 placeholder-brand-700 text-sm font-light"
                    aria-label="Newsletter email"
                    aria-invalid={!!error}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-brand-400 hover:text-brand-100 uppercase text-xs tracking-widest font-bold disabled:opacity-60"
                  >
                    {isSubmitting ? '…' : 'Plant'}
                  </button>
                </div>
                {error && (
                  <p id="newsletter-error" className="text-red-400 text-xs">
                    {error}
                  </p>
                )}
              </form>
            )}
            <div className="flex gap-6 mt-8" role="list" aria-label="Social links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-100 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-100 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-100 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="mailto:concierge@vinebreak.com" className="text-brand-600 hover:text-brand-100 transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-brand-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-700 font-light">
            &copy; {new Date().getFullYear()} Vinebreak. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-brand-700 font-light uppercase tracking-wider">
            <button type="button" onClick={() => onNavigate({ type: 'privacy' })} className="hover:text-brand-400">
              Privacy
            </button>
            <button type="button" onClick={() => onNavigate({ type: 'terms' })} className="hover:text-brand-400">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
